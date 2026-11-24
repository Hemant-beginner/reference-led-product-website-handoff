# Suite Validation Guide

## Scope

This document describes the checks applied to the four-Skill repository before publication. It does not certify legal compliance, accessibility, security, or production readiness of any website produced with the Skills.

## Automated checks

Run from the repository root:

```sh
node scripts/validate-package.mjs
```

The dependency-free validator checks:

- Exact repository file set and installable Skill structure.
- `SKILL.md` frontmatter delimiters.
- Hyphen-case names and folder-name matches.
- Single-line descriptions of at most 1024 characters.
- `SKILL.md` length below 500 lines.
- Relative Markdown links.
- Absence of unresolved placeholder markers.
- English-language Markdown content using a CJK-character screen.
- Common email, local user-path, token, private-key, and access-key patterns.
- JavaScript syntax for every bundled `.mjs` script.

The script exits with a nonzero status when any check fails and prints a JSON summary without exposing the local repository path.

## Script behavior tests

The suite inspector and Skill validator also require direct execution tests:

```sh
node chat-session-evidence-extraction/scripts/inspect-session.mjs <session-file> --mode summary
node chat-session-evidence-extraction/scripts/inspect-session.mjs <session-file> --mode failures
node chat-session-evidence-extraction/scripts/inspect-session.mjs <session-file> --mode writes --redact-paths
node chat-session-skill-extraction/scripts/validate-skill.mjs chat-session-evidence-extraction --redact-path
```

Use a representative session export and confirm that redacted output removes the current account name and user-profile segments.

## Manual review

Automated pattern matching cannot prove that content contains no personal or sensitive information. Before each publication, manually review:

- Names, usernames, account identifiers, email addresses, and profile links.
- Absolute user-profile paths and machine-specific paths.
- Credentials, tokens, private keys, pairing codes, PINs, and secrets.
- Private URLs, internal hostnames, network details, and database exports.
- Source-session records, chat transcripts, local logs, and temporary output paths.
- Git commit author metadata and repository settings.
- Claims that one harness is compatible when only another harness was tested.

Also confirm that:

- Every Skill remains independently installable.
- Component references resolve inside their own directories.
- The orchestrator does not duplicate component instructions.
- No generated dependencies, build output, editor files, or operating-system metadata are included.
- Installed, staged, and remote hashes match after an authorized push.

## Publication drift record

| Artifact | Authoritative source | Installed hash | Staged hash | Remote hash | Status |
|---|---|---|---|---|---|
| chat-session-evidence-extraction | local Skill directory | [hash] | [hash] | [hash] | [status] |
| chat-session-skill-extraction | local Skill directory | [hash] | [hash] | [hash] | [status] |
| reference-led-product-website-handoff | local Skill directory | [hash] | [hash] | [hash] | [status] |
| evidence-driven-session-to-deliverable | local Skill directory | [hash] | [hash] | [hash] | [status] |

Update this record after every publication. A pending or unverified row is not a pass.

## Revalidate after changes

```sh
node scripts/validate-package.mjs
node --check chat-session-evidence-extraction/scripts/inspect-session.mjs
node --check chat-session-skill-extraction/scripts/validate-skill.mjs
git status --short
git diff --check
```

Review the complete diff before every push. Do not rely on the validator alone for privacy or secrecy.

## Publication record

| Check | Result |
|---|---|
| Repository structure | PASS |
| Skill frontmatter and naming | PASS |
| Relative links | PASS |
| Unresolved placeholders | PASS |
| English Markdown content | PASS |
| Sensitive-data pattern scan | PASS |
| JavaScript syntax | PASS |
| Manual content review | PASS |
| Git diff review | PASS |
| Remote synchronization | Pending push |

Update this table with observed results before publishing. A pending row is not a pass.
