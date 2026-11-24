import { readFileSync } from 'node:fs';
import path from 'node:path';

const args = process.argv.slice(2);
const file = args.find((arg) => !arg.startsWith('--'));
if (!file) {
  console.error(JSON.stringify({ status: 'FAIL', error: 'Usage: node inspect-session.mjs <session-file> [--mode summary|messages|failures|writes|tools] [--max-chars 2000] [--limit 20] [--redact-paths]' }));
  process.exit(1);
}

function option(name, fallback) {
  const index = args.indexOf(name);
  return index >= 0 ? args[index + 1] : fallback;
}

const mode = option('--mode', 'summary');
const maxChars = Math.max(200, Number.parseInt(option('--max-chars', '2000'), 10) || 2000);
const limit = Math.max(1, Number.parseInt(option('--limit', '20'), 10) || 20);
const redactPaths = args.includes('--redact-paths');
const accountName = process.env.USERNAME || process.env.USER || '';
const accountPattern = accountName ? new RegExp(`\\b${accountName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'gi') : null;
const validModes = new Set(['summary', 'messages', 'failures', 'writes', 'tools']);
if (!validModes.has(mode)) {
  console.error(JSON.stringify({ status: 'FAIL', error: `Unknown mode: ${mode}` }));
  process.exit(1);
}

function parseSource(raw) {
  try {
    return { format: 'json', data: JSON.parse(raw) };
  } catch {
    const lines = raw.split(/\r?\n/).filter((line) => line.trim());
    const records = [];
    for (let index = 0; index < lines.length; index += 1) {
      try {
        records.push(JSON.parse(lines[index]));
      } catch {
        throw new Error(`Line ${index + 1} is not valid JSON and the file is not a single JSON document.`);
      }
    }
    return { format: 'jsonl', data: records };
  }
}

function asText(value) {
  if (typeof value === 'string') return value;
  if (value == null) return '';
  if (Array.isArray(value)) return value.map(asText).filter(Boolean).join('\n');
  if (typeof value === 'object') {
    for (const key of ['text', 'message', 'content', 'output', 'result']) {
      if (value[key] != null) return asText(value[key]);
    }
  }
  return '';
}

function redactPathsInText(value) {
  let text = asText(value)
    .replace(/[A-Z]:[\\/]Users[\\/][^\\/\s]+/gi, (match) => match.replace(/[^\\/\s]+$/, '[USER]'))
    .replace(/\/c\/Users\/[^/\s]+/gi, (match) => match.replace(/[^/\s]+$/, '[USER]'))
    .replace(/\/Users\/[^/\s]+/g, (match) => match.replace(/[^/\s]+$/, '[USER]'))
    .replace(/\/home\/[^/\s]+/g, (match) => match.replace(/[^/\s]+$/, '[USER]'));
  if (accountPattern) text = text.replace(accountPattern, '[USER]');
  return text;
}

function normalizeMessages(data) {
  if (Array.isArray(data)) return data;
  if (data && Array.isArray(data.messages)) return data.messages;
  if (data && Array.isArray(data.turns)) return data.turns;
  if (data && Array.isArray(data.events)) return data.events;
  throw new Error('No messages, turns, events, or top-level array was found.');
}

function normalizeTools(message) {
  const tools = message.tools || message.toolCalls || message.toolUse || message.toolUses || [];
  if (!Array.isArray(tools)) return [];
  return tools.map((tool, index) => ({
    index,
    name: tool.name || tool.toolName || tool.tool || tool.type || 'unknown',
    status: tool.status || tool.state || (tool.error ? 'failed' : 'unknown'),
    output: asText(tool.output ?? tool.result ?? tool.content ?? tool.error),
  }));
}

function clip(value, length = maxChars) {
  const source = redactPaths ? redactPathsInText(value) : asText(value);
  const text = source.replace(/\s+/g, ' ').trim();
  return text.length > length ? `${text.slice(0, length)}… [truncated ${text.length - length} chars]` : text;
}

try {
  const absolute = path.resolve(file);
  const raw = readFileSync(absolute, 'utf8');
  const { format, data } = parseSource(raw);
  const messages = normalizeMessages(data).map((message, index) => ({
    index,
    id: message.id || message.messageId || `message-${index + 1}`,
    turnId: message.turnId || message.turn_id || null,
    role: message.role || message.type || 'unknown',
    status: message.status || message.state || 'unknown',
    text: asText(message.text ?? message.message ?? message.content),
    tools: normalizeTools(message),
  }));
  const toolCounts = {};
  const statusCounts = {};
  const roleCounts = {};
  for (const message of messages) {
    roleCounts[message.role] = (roleCounts[message.role] || 0) + 1;
    statusCounts[message.status] = (statusCounts[message.status] || 0) + 1;
    for (const tool of message.tools) toolCounts[tool.name] = (toolCounts[tool.name] || 0) + 1;
  }
  const metadata = Array.isArray(data) ? {} : {
    title: data.title || data.name || null,
    runtimeState: data.runtimeState || data.status || null,
    revision: data.revision || data.snapshot || null,
    hasMoreBefore: data.hasMoreBefore ?? null,
    queuedTurnCount: data.queuedTurnCount ?? null,
    pendingInteractionCount: data.pendingInteractionCount ?? null,
  };
  const selected = messages.slice(-limit);
  let result;
  if (mode === 'summary') {
    result = {
      status: 'PASS',
      source: { file: redactPaths ? redactPathsInText(absolute) : absolute, format, bytes: Buffer.byteLength(raw) },
      metadata,
      counts: { messages: messages.length, roles: roleCounts, statuses: statusCounts, tools: toolCounts },
      messageIndex: selected.map((message) => ({
        index: message.index,
        id: message.id,
        turnId: message.turnId,
        role: message.role,
        status: message.status,
        textLength: message.text.length,
        tools: message.tools.map((tool) => ({ index: tool.index, name: tool.name, status: tool.status })),
      })),
    };
  } else if (mode === 'messages') {
    result = {
      status: 'PASS',
      messages: selected.map((message) => ({
        index: message.index,
        id: message.id,
        turnId: message.turnId,
        role: message.role,
        status: message.status,
        text: clip(message.text, message.role === 'user' ? Math.max(maxChars, 8000) : maxChars),
        toolCount: message.tools.length,
      })),
    };
  } else if (mode === 'failures') {
    const failures = [];
    for (const message of messages) {
      for (const tool of message.tools) {
        if (/fail|error|interrupt/i.test(String(tool.status))) {
          failures.push({ messageId: message.id, turnId: message.turnId, ...tool, output: clip(tool.output) });
        }
      }
    }
    result = { status: 'PASS', failures: failures.slice(-limit) };
  } else if (mode === 'writes') {
    const writes = [];
    for (const message of messages) {
      for (const tool of message.tools) {
        if (/write|edit|apply|patch/i.test(String(tool.name))) {
          writes.push({ messageId: message.id, turnId: message.turnId, ...tool, output: clip(tool.output) });
        }
      }
    }
    result = { status: 'PASS', writes: writes.slice(-limit) };
  } else {
    const tools = [];
    for (const message of messages) {
      for (const tool of message.tools) tools.push({ messageId: message.id, turnId: message.turnId, ...tool, output: clip(tool.output) });
    }
    result = { status: 'PASS', tools: tools.slice(-limit) };
  }
  console.log(JSON.stringify(result, null, 2));
} catch (error) {
  console.error(JSON.stringify({ status: 'FAIL', error: error.message }, null, 2));
  process.exit(1);
}
