import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import path from 'node:path';

const root = path.resolve(process.argv[2] || '.');
const redactPath = process.argv.includes('--redact-path');
const failures = [];
const check = (condition, message) => {
  if (!condition) failures.push(message);
};

check(existsSync(root), `Skill directory does not exist: ${root}`);
if (!existsSync(root)) {
  console.error(JSON.stringify({ status: 'FAIL', failures }, null, 2));
  process.exit(1);
}
check(statSync(root).isDirectory(), `Skill path is not a directory: ${root}`);

const skillPath = path.join(root, 'SKILL.md');
check(existsSync(skillPath), 'SKILL.md is missing');
const topLevel = readdirSync(root);
const allowedTopLevel = new Set(['SKILL.md', 'scripts', 'references', 'assets']);
for (const entry of topLevel) check(allowedTopLevel.has(entry), `Unexpected top-level entry: ${entry}`);

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

const skill = existsSync(skillPath) ? readFileSync(skillPath, 'utf8') : '';
const frontmatter = skill.match(/^---\n([\s\S]*?)\n---\n/);
check(Boolean(frontmatter), 'Invalid YAML frontmatter delimiters');
let name;
let descriptionLength = 0;
if (frontmatter) {
  name = frontmatter[1].match(/^name:\s*(.+)$/m)?.[1]?.trim();
  const description = frontmatter[1].match(/^description:\s*(.+)$/m)?.[1]?.trim();
  descriptionLength = (description || '').length;
  check(name === path.basename(root), `Skill name/folder mismatch: ${name}`);
  check(/^[a-z0-9-]+$/.test(name || ''), `Invalid Skill name: ${name}`);
  check(Boolean(description), 'Description is missing');
  check(descriptionLength <= 1024, `Description exceeds 1024 characters: ${descriptionLength}`);
  check(frontmatter[1].split('\n').filter((line) => line.startsWith('description:')).length === 1, 'Description must occupy one line');
}
check(skill.split('\n').length - 1 < 500, `SKILL.md exceeds 499 lines: ${skill.split('\n').length - 1}`);

const textExtensions = new Set(['.md', '.mjs', '.js', '.cjs', '.py', '.sh', '.json', '.yaml', '.yml', '.txt']);
const marker = ['TO', 'DO:'].join('');
const sensitivePatterns = [
  ['email', /\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/i],
  ['local user path', /(?:[A-Z]:[\\/]Users[\\/]|\/Users\/|\/home\/|\/c\/Users\/)/i],
  ['GitHub token', /\bgh[pousr]_[A-Z0-9]{20,}\b/i],
  ['GitHub fine-grained token', /\bgithub_pat_[A-Z0-9_]{20,}\b/i],
  ['private key', /-----BEGIN [A-Z ]*PRIVATE KEY-----/],
  ['AWS access key', /\bAKIA[0-9A-Z]{16}\b/],
  ['API-style secret', /\bsk-[A-Z0-9]{20,}\b/i],
];

for (const file of files) {
  if (!textExtensions.has(path.extname(file))) continue;
  const content = readFileSync(path.join(root, file), 'utf8');
  check(!content.includes(marker), `Unresolved placeholder marker in ${file}`);
  for (const [label, pattern] of sensitivePatterns) check(!pattern.test(content), `${label} pattern found in ${file}`);
  if (!file.endsWith('.md')) continue;
  const links = [...content.matchAll(/\[[^\]]+\]\(([^)]+)\)/g)]
    .map((match) => match[1])
    .filter((href) => !/^(?:https?:|mailto:|#)/.test(href));
  for (const href of links) {
    const target = href.split('#')[0];
    if (target) check(existsSync(path.resolve(root, path.dirname(file), target)), `Broken relative link in ${file}: ${href}`);
  }
}

console.log(JSON.stringify({
  status: failures.length ? 'FAIL' : 'PASS',
  root: redactPath ? path.basename(root) : root,
  name,
  files,
  skillLines: skill.split('\n').length - 1,
  descriptionLength,
  failures,
}, null, 2));
process.exitCode = failures.length ? 1 : 0;
