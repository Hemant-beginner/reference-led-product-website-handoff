---
name: chat-session-skill-extraction
description: Extract durable, portable Skills from large coding-agent chat sessions using bounded evidence, failure-aware tracing, duplicate checks, approval-gated creation or update, and post-write validation. Use across Qoder, Claude Code, Codex, OpenCode, and other harnesses when a user wants to turn verified session work into reusable agent guidance.
---

# Chat Session Skill Extraction

## Overview

Convert a bounded evidence report into a reusable, portable Skill package. Preserve valid existing rules, separate durable workflow from one-off facts, propose before writing, and validate the actual files after creation or update.

## Operating Contract

- Use `chat-session-evidence-extraction` or an equivalent evidence report when the source is a large or evolving session.
- Never create a Skill from an unread transcript summary.
- Treat suggested names and automatic recommendations as proposals, not instructions.
- Check for exact and overlapping Skills before creating.
- Read an existing Skill fully before updating it.
- On create, never overwrite a same-name directory.
- On update, preserve still-valid rules and explain removals or replacements.
- Wait for explicit approval before writing, renaming, deleting, publishing, or installing into a new location.
- Keep the package portable across Qoder, Claude Code, Codex, OpenCode, and other coding agents.

## Inputs

- Evidence report or verified source notes.
- Requested action: create, update, combine, rename, or package.
- Candidate Skill names and intended triggers.
- Target harness and installation root, if known.
- Output or repository destination, if packaging is requested.
- Approval boundaries and content constraints.

If the target harness or install root is unknown, ask before installation. Do not guess a platform-specific path.

## Portable Skill Standard

Use the common `SKILL.md` format:

```markdown
---
name: hyphen-case-name
description: Single-line description of what the Skill does and when to use it.
---

# Skill Title

Imperative instructions and required resources.
```

Keep `SKILL.md` below 500 lines. Use `scripts/` only for deterministic repeatable operations, `references/` for material loaded on demand, and `assets/` only for files used in outputs.

Avoid harness-only frontmatter unless the target harness requires it. Do not hardcode tool names, permission settings, session paths, or model identifiers into a portable Skill.

## Workflow

### 1. Confirm the Extraction Request

Record:

- Source session or evidence report.
- Desired outcome and audience.
- Create, update, combine, rename, or package action.
- Target harness and install location.
- Approval gates.
- Language, privacy, and publication constraints.

Restate the proposed scope before writing.

### 2. Verify the Evidence

Check that the evidence report includes:

- Source boundary and unread areas.
- User requests and corrections.
- Failure traces and recoveries.
- Verified steps with concrete outputs.
- Current artifact checks when state may have changed.
- Reusable workflow candidates.

Mark unsupported claims as unresolved. Do not convert plans into verified steps.

### 3. Search for Duplicates and Overlap

Search installed Skills by:

- Exact folder and frontmatter name.
- Description keywords and synonyms.
- Workflow steps, scripts, and reference names.
- Local marketplace or plugin catalogs.
- Remote sources only when useful and authorized.

Classify matches:

- `exact`: same name and purpose.
- `overlap`: same domain but different scope or harness.
- `complementary`: useful adjacent workflow.
- `none`: no close match.

Prefer extending a complementary Skill when the user wants integration. Create fresh when the scope is meaningfully different.

### 4. Read Existing Targets in Full

For an update or combine request:

- Read `SKILL.md` and every bundled reference or script that affects behavior.
- Identify durable rules, stale facts, duplicated sections, and broken references.
- Compare current files with the evidence report.
- Preserve valid rules even when their original source session is no longer available.
- Propose removals or replacements explicitly.

For a create request, confirm the target path does not already exist.

### 5. Extract the Durable Workflow

For each candidate Skill, define:

- Trigger conditions.
- Required inputs.
- Ordered procedure.
- Decision points and fallback behavior.
- Failure modes and stop conditions.
- Output artifacts.
- Validation gates.
- Approval boundaries.
- Portability constraints.

Remove one-off versions, URLs, usernames, local paths, credentials, and temporary project state unless they are generic examples approved by the user.

### 6. Choose the Smallest Resource Set

Add resources only when they solve a concrete problem:

- `scripts/`: repeated parsing, validation, transformation, or deterministic checks.
- `references/`: long templates, schemas, adapter matrices, or domain details.
- `assets/`: files copied into generated outputs.

Do not add empty directories, README files, changelogs, or speculative abstractions to the installable Skill.

### 7. Design the Combined Architecture

When combining multiple candidates:

- Keep focused component Skills independently reusable.
- Add a thin orchestrator when sequencing, routing, or shared gates are needed.
- Put shared contracts in one reference file.
- Avoid copying component instructions into the orchestrator.
- Define how evidence, statuses, and approvals move between stages.
- Preserve standalone behavior for every component.

Prefer this over a single monolithic Skill unless the user explicitly requests one.

### 8. Present the Proposal

Use [Skill proposal template](references/skill-proposal-template.md). Include:

- Names, triggers, and target paths.
- Proposed file tree.
- Workflow summary.
- Scripts and references with their purpose.
- Existing content to preserve or change.
- Validation plan.
- Privacy and portability checks.

Wait for user confirmation before writing.

### 9. Create or Update the Package

- Use imperative, concise instructions.
- Keep frontmatter `name` and `description` complete and single-line.
- Keep the folder name equal to `name`.
- Use relative links for bundled resources.
- Test every script by running it.
- Preserve file encoding and line endings consistent with the target repository.
- Do not publish or push unless separately authorized.

For rename operations, update all references and verify that no duplicate name remains.

### 10. Validate the Actual Files

Run:

```sh
node scripts/validate-skill.mjs <skill-directory>
node scripts/validate-skill.mjs <skill-directory> --redact-path
```

Use `--redact-path` when sharing validator output outside the local machine.

Then manually verify:

- The instructions match the approved proposal.
- Relative references resolve.
- Scripts produce bounded, useful output.
- No secrets, personal paths, or unsupported claims remain.
- Existing valid rules were preserved.
- The Skill can be loaded by the current harness.

A successful write operation is not validation.

### 11. Install or Package for the Target Harness

- Confirm the documented install root for the selected harness.
- Copy the Skill folder without flattening its resources.
- Reload or rescan Skills using the harness-supported method.
- Invoke the Skill by name when supported.
- If packaging for source control, keep repository documentation outside the installable Skill directory.

Do not claim cross-harness compatibility from format checks alone. State which harnesses were actually tested.

### 12. Verify Publication Drift

After any package or repository update:

- Identify the authoritative local Skill directory.
- Compare installed, staged, and remote file hashes or blob IDs.
- Record each artifact as `current`, `stale`, `missing`, or `unverified`.
- Rebuild and revalidate the package after copying files.
- Verify the remote default branch and commit after an authorized push.
- Never assume a successful earlier publication includes later local edits.

Treat repository synchronization as a separate approval-gated stage.

## Status Vocabulary

Use consistent labels in proposals and reports:

- `verified`: supported by observed evidence.
- `bounded`: supported within a stated scope.
- `prohibited`: excluded by evidence, rights, or owner instruction.
- `unresolved`: insufficient evidence or decision.
- `failed`: validation or execution failed.
- `blocked`: requires user input or external state.
- `unverified`: not tested.

## Completion Criteria

The extraction is complete only when:

- The proposal was approved before writes.
- Existing same-name work was not overwritten.
- Valid existing rules were preserved.
- The package follows the portable Skill standard.
- Scripts and references were validated.
- The current harness loaded the Skill successfully.
- Untested harness compatibility is explicitly marked unverified.

## Resources

- [Skill proposal template](references/skill-proposal-template.md)
- [Portable Skill validator](scripts/validate-skill.mjs)
