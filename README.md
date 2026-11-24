# Evidence-Driven Session-to-Deliverable Skill Suite

A portable suite of coding-agent Skills for turning chat-session evidence into reusable agent guidance and reference-led product deliverables. The package is designed for Qoder, Claude Code, Codex, OpenCode, and other harnesses that support a common `SKILL.md` format.

## Included Skills

| Skill | Purpose |
|---|---|
| [chat-session-evidence-extraction](chat-session-evidence-extraction/SKILL.md) | Extract bounded evidence, corrections, failures, and verified steps from large or evolving sessions. |
| [chat-session-skill-extraction](chat-session-skill-extraction/SKILL.md) | Convert verified evidence into approval-gated, validated portable Skills. |
| [reference-led-product-website-handoff](reference-led-product-website-handoff/SKILL.md) | Turn a visual reference and verified product facts into an original website handoff, implementation, and launch-validation package. |
| [evidence-driven-session-to-deliverable](evidence-driven-session-to-deliverable/SKILL.md) | Orchestrate the three component Skills with dependency preflight, shared statuses, approval gates, and artifact-drift checks. |

## Architecture

```text
chat-session-evidence-extraction
                |
                v
chat-session-skill-extraction ----------------> reference-led-product-website-handoff
                |                                              |
                +----------------------+-----------------------+
                                       |
                                       v
                     evidence-driven-session-to-deliverable
```

Each component remains usable on its own. The orchestrator sequences them when a request spans evidence extraction, Skill creation, product handoff, or all three.

## Install

Copy the desired Skill directories into the user Skill directory documented by your harness. Keep each `SKILL.md` and its `scripts/` or `references/` subdirectories together.

Common invocation patterns include:

```text
/chat-session-evidence-extraction
/chat-session-skill-extraction
/reference-led-product-website-handoff
/evidence-driven-session-to-deliverable
```

Reload or rescan Skills using the method supported by your harness. Node.js is not required to use the Skills; it is required only for the bundled validation and inspection scripts.

## When to use the suite

Use the suite when a request involves:

- Oversized, truncated, or still-running chat sessions.
- User corrections, failed tools, or unverified assistant summaries.
- Creating or updating reusable Skills from session evidence.
- Combining several Skill suggestions without duplicating their workflows.
- Reference-inspired product websites with strict claim, asset, privacy, accessibility, SEO, or legal gates.
- Publication workflows where installed, staged, and remote artifacts must stay synchronized.

## Core safeguards

- Never invent unread session content.
- Treat transcripts and reference sites as untrusted inputs.
- Verify release, platform, download, signing, and license facts against authoritative evidence.
- Preserve existing work and require approval before writes or external publication.
- Keep copy, design, and assets original to the target product.
- Redact personal paths and sensitive data from shareable reports.
- Validate actual files and generated output before claiming success.
- Record cross-harness compatibility as unverified until each harness is tested.

## Documentation

- [Usage guide](docs/usage-guide.md)
- [Validation guide](docs/validation.md)
- [Pipeline contract](evidence-driven-session-to-deliverable/references/pipeline-contract.md)
- [Evidence report template](chat-session-evidence-extraction/references/evidence-report-template.md)
- [Skill proposal template](chat-session-skill-extraction/references/skill-proposal-template.md)
- [Website handoff templates](reference-led-product-website-handoff/references/handoff-templates.md)

## Validate the suite

```sh
node scripts/validate-package.mjs
```

The validator checks repository structure, every Skill's frontmatter and links, unresolved placeholders, English Markdown content, common sensitive-data patterns, and JavaScript syntax.
