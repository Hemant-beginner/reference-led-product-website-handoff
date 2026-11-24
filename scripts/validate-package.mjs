import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const skillNames = [
  'chat-session-evidence-extraction',
  'chat-session-skill-extraction',
  'reference-led-product-website-handoff',
  'evidence-driven-session-to-deliverable',
];
const expectedFiles = [
  '.gitignore',
  'README.md',
  'docs/usage-guide.md',
  'docs/validation.md',
  'scripts/validate-package.mjs',
  'chat-session-evidence-extraction/SKILL.md',
  'chat-session-evidence-extraction/references/evidence-report-template.md',
  'chat-session-evidence-extraction/references/session-source-adapters.md',
  'chat-session-evidence-extraction/scripts/inspect-session.mjs',
  'chat-session-skill-extraction/SKILL.md',
  'chat-session-skill-extraction/references/skill-proposal-template.md',
  'chat-session-skill-extraction/scripts/validate-skill.mjs',
  'reference-led-product-website-handoff/SKILL.md',
  'reference-led-product-website-handoff/references/handoff-templates.md',
  'evidence-driven-session-to-deliverable/SKILL.md',
  'evidence-driven-session-to-deliverable/references/pipeline-contract.md',
].sort();
const failures = [];
const check = (condition, message) => {
  if (!condition) failures.push(message);
};

const files = [];
function walk(directory) {
  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    if (entry.name === '.git') continue;
    const fullPath = path.join(directory, entry.name);
    if (entry.isDirectory()) walk(fullPath);
    else files.push(path.relative(root, fullPath).split(path.sep).join('/'));
  }
}
walk(root);
check(JSON.stringify([...files].sort()) === JSON.stringify(expectedFiles), `Unexpected file set: ${files.join(', ')}`);

const marker = ['TO', 'DO:'].join('');
const sensitivePatterns = [
  ['email', /\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/i],
  ['local user path', /(?:[A-Z]:[\\/]Users[\\/]|\/Users\/|\/home\/|\/c\/Users\/)/i],
  ['GitHub token', /\bgh[pousr]_[A-Z0-9]{20,}\b/i],
  ['GitHub fine-grained token', /\bgithub_pat_[A-Z0-9_]{20,}\b/i],
  ['private key', /-----BEGIN [A-Z ]*PRIVATE KEY-----/],
  ['AWS access key', /\bAKIA[0-9A-Z]{16}\b/],
  ['API-style secret', /\bsk-[A-Z0-9]{20,}\b/i],
  ['CJK text', /[\u3040-\u30ff\u3400-\u9fff\uac00-\ud7af]/],
];

const markdownFiles = files.filter((file) => file.endsWith('.md'));
for (const file of markdownFiles) {
  const content = readFileSync(path.join(root, file), 'utf8');
  check(!content.includes(marker), `Unresolved placeholder marker in ${file}`);
  for (const [label, pattern] of sensitivePatterns) check(!pattern.test(content), `${label} pattern found in ${file}`);
  const links = [...content.matchAll(/\[[^\]]+\]\(([^)]+)\)/g)]
    .map((match) => match[1])
    .filter((href) => !/^(?:https?:|mailto:|#)/.test(href));
  for (const href of links) {
    const target = href.split('#')[0];
    if (target) check(existsSync(path.resolve(root, path.dirname(file), target)), `Broken relative link in ${file}: ${href}`);
  }
}

const skills = [];
for (const name of skillNames) {
  const skillRoot = path.join(root, name);
  const skillPath = path.join(skillRoot, 'SKILL.md');
  check(existsSync(skillRoot), `Missing Skill directory: ${name}`);
  check(existsSync(skillPath), `Missing SKILL.md: ${name}`);
  if (!existsSync(skillRoot) || !existsSync(skillPath)) continue;
  check(statSync(skillRoot).isDirectory(), `Skill path is not a directory: ${name}`);
  for (const entry of readdirSync(skillRoot)) check(['SKILL.md', 'scripts', 'references', 'assets'].includes(entry), `Unexpected top-level entry in ${name}: ${entry}`);
  const skill = readFileSync(skillPath, 'utf8');
  const frontmatter = skill.match(/^---\n([\s\S]*?)\n---\n/);
  check(Boolean(frontmatter), `Invalid YAML frontmatter delimiters: ${name}`);
  let descriptionLength = 0;
  if (frontmatter) {
    const frontmatterName = frontmatter[1].match(/^name:\s*(.+)$/m)?.[1]?.trim();
    const description = frontmatter[1].match(/^description:\s*(.+)$/m)?.[1]?.trim();
    descriptionLength = (description || '').length;
    check(frontmatterName === name, `Skill name/folder mismatch: ${frontmatterName}`);
    check(/^[a-z0-9-]+$/.test(frontmatterName || ''), `Invalid Skill name: ${frontmatterName}`);
    check(Boolean(description), `Description is missing: ${name}`);
    check(descriptionLength <= 1024, `Description exceeds 1024 characters: ${name}`);
    check(frontmatter[1].split('\n').filter((line) => line.startsWith('description:')).length === 1, `Description must occupy one line: ${name}`);
  }
  const skillLines = skill.split('\n').length - 1;
  check(skillLines < 500, `SKILL.md exceeds 499 lines: ${name} (${skillLines})`);
  skills.push({ name, skillLines, descriptionLength });
}

const scriptChecks = [];
for (const file of files.filter((entry) => entry.endsWith('.mjs'))) {
  const result = spawnSync(process.execPath, ['--check', path.join(root, file)], { encoding: 'utf8' });
  const passed = result.status === 0;
  check(passed, `JavaScript syntax check failed: ${file}${result.stderr ? ` (${result.stderr.trim()})` : ''}`);
  scriptChecks.push({ file, status: passed ? 'PASS' : 'FAIL' });
}

console.log(JSON.stringify({
  status: failures.length ? 'FAIL' : 'PASS',
  repository: path.basename(root),
  files,
  markdownFiles,
  skills,
  scriptChecks,
  failures,
}, null, 2));
process.exitCode = failures.length ? 1 : 0;
