import { existsSync, readFileSync, readdirSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const skillName = 'reference-led-product-website-handoff';
const skillRoot = path.join(root, skillName);
const skillPath = path.join(skillRoot, 'SKILL.md');
const templatePath = path.join(skillRoot, 'references', 'handoff-templates.md');
const expectedFiles = [
  '.gitignore',
  'README.md',
  'docs/usage-guide.md',
  'docs/validation.md',
  'scripts/validate-package.mjs',
  `${skillName}/SKILL.md`,
  `${skillName}/references/handoff-templates.md`,
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

check(existsSync(skillPath), 'SKILL.md is missing');
check(existsSync(templatePath), 'references/handoff-templates.md is missing');
check(JSON.stringify([...files].sort()) === JSON.stringify(expectedFiles), `unexpected file set: ${files.join(', ')}`);

const markdownFiles = files.filter((file) => file.endsWith('.md'));
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

for (const file of markdownFiles) {
  const content = readFileSync(path.join(root, file), 'utf8');
  check(!content.includes('TODO:'), `unresolved TODO: in ${file}`);
  for (const [label, pattern] of sensitivePatterns) {
    check(!pattern.test(content), `${label} pattern found in ${file}`);
  }
  const links = [...content.matchAll(/\[[^\]]+\]\(([^)]+)\)/g)]
    .map((match) => match[1])
    .filter((href) => !/^(?:https?:|mailto:|#)/.test(href));
  for (const href of links) {
    const target = href.split('#')[0];
    if (target) check(existsSync(path.resolve(root, path.dirname(file), target)), `broken relative link in ${file}: ${href}`);
  }
}

const skill = existsSync(skillPath) ? readFileSync(skillPath, 'utf8') : '';
const frontmatter = skill.match(/^---\n([\s\S]*?)\n---\n/);
check(Boolean(frontmatter), 'invalid YAML frontmatter delimiters');
let descriptionLength = 0;
if (frontmatter) {
  const name = frontmatter[1].match(/^name:\s*(.+)$/m)?.[1]?.trim();
  const description = frontmatter[1].match(/^description:\s*(.+)$/m)?.[1]?.trim();
  descriptionLength = (description || '').length;
  check(name === skillName, `Skill name/folder mismatch: ${name}`);
  check(/^[a-z0-9-]+$/.test(name || ''), `invalid Skill name: ${name}`);
  check(Boolean(description), 'description is missing');
  check(descriptionLength <= 1024, `description exceeds 1024 characters: ${descriptionLength}`);
  check(frontmatter[1].split('\n').filter((line) => line.startsWith('description:')).length === 1, 'description must be one line');
}
check(skill.split('\n').length - 1 < 500, `SKILL.md exceeds 499 lines: ${skill.split('\n').length - 1}`);

const result = {
  status: failures.length ? 'FAIL' : 'PASS',
  files,
  markdownFiles,
  skillLines: skill.split('\n').length - 1,
  descriptionLength,
  failures,
};
console.log(JSON.stringify(result, null, 2));
process.exitCode = failures.length ? 1 : 0;
