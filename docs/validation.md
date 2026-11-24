# Validation Guide

## Scope

This document describes the checks applied to the repository package before publication. It does not certify legal compliance, accessibility, security, or production readiness of any website produced with the Skill.

## Automated checks

Run from the repository root:

```sh
node scripts/validate-package.mjs
```

The dependency-free validator checks:

- Expected repository files and installable Skill structure.
- `SKILL.md` frontmatter delimiters.
- Hyphen-case Skill name and folder-name match.
- Single-line description of at most 1024 characters.
- `SKILL.md` length below 500 lines.
- Relative Markdown links.
- Absence of unresolved placeholder markers.
- English-language Markdown content using a CJK-character screen.
- Common email, local user-path, token, private-key, and access-key patterns in Markdown.

The script exits with a nonzero status when any check fails and prints a JSON summary.

## Manual review

Automated pattern matching cannot prove that content contains no personal or sensitive information. Before each publication, manually review:

- Names, usernames, account identifiers, email addresses, and profile links.
- Absolute user-profile paths and machine-specific paths.
- Credentials, tokens, private keys, pairing codes, PINs, and secrets.
- Private URLs, internal hostnames, network details, and database exports.
- Source-session records, chat transcripts, local logs, and temporary output paths.
- Product-specific facts that do not belong in a reusable Skill.
- Git commit author metadata and repository settings.

Also confirm that:

- All repository documentation is in English.
- The installable Skill directory contains only `SKILL.md` and its required reference.
- The copied Skill matches the validated source byte-for-byte.
- No generated dependencies, build output, editor files, or operating-system metadata are included.

## Revalidate after changes

```sh
node scripts/validate-package.mjs
git status --short
git diff --check
```

Review the complete diff before every push. Do not rely on the validator alone for privacy or secrecy.

## Publication record

| Check | Result |
|---|---|
| Package structure | PASS |
| Skill frontmatter and naming | PASS |
| Relative links | PASS |
| Unresolved placeholders | PASS |
| English Markdown content | PASS |
| Sensitive-data pattern scan | PASS |
| Manual content review | PASS |
| Git diff review | PASS |

Update this table with observed results before publishing. A pending row is not a pass.
