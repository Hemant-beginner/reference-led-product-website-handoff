# Suite Usage Guide

## 1. Choose an entry point

| Need | Skill |
|---|---|
| Read a large or evolving session safely | `chat-session-evidence-extraction` |
| Turn verified evidence into one or more Skills | `chat-session-skill-extraction` |
| Produce a reference-inspired product website handoff | `reference-led-product-website-handoff` |
| Sequence several stages or combine suggestions | `evidence-driven-session-to-deliverable` |

Use the orchestrator when the request crosses component boundaries. Use a component directly when only one capability is needed.

## 2. Prepare the inputs

Provide the relevant subset:

- Session ID, export path, or verified notes.
- Product repository or authoritative evidence root.
- Reference URL and desired visual or interaction qualities.
- Candidate Skill names and requested actions.
- Output directory and target implementation stack.
- Target harness and installation root.
- Approval boundaries.
- Language, privacy, and publication constraints.

Do not guess missing session paths, install roots, production domains, or repository destinations.

## 3. Example prompts

### Evidence-only

```text
Use chat-session-evidence-extraction on this session. Return a bounded evidence report with user corrections, failure traces, verified steps, surviving artifacts, and unread boundaries. Do not modify files.
```

### Skill-only

```text
Use chat-session-skill-extraction on the verified evidence report. Check for duplicate Skills, propose a portable package, wait for approval, then create and validate it.
```

### Product-only

```text
Use reference-led-product-website-handoff with the product repository and reference URL. Verify release and license facts, prepare the handoff and media plan, implement only after approval, and stop before public deployment.
```

### Full pipeline

```text
Use evidence-driven-session-to-deliverable on this conversation. Extract evidence, propose reusable Skills, combine them with the existing website-handoff Skill, validate every layer, and stop before publishing unless I approve the destination.
```

## 4. Understand the pipeline

1. **Intake and scope** — classify the request and record approval boundaries.
2. **Dependency preflight** — verify required component Skills and artifact state.
3. **Evidence extraction** — separate observed facts from summaries and unread material.
4. **Component planning** — check duplicates and propose focused Skills.
5. **Approval gate** — wait before writes, installation, publication, or deployment.
6. **Build or update** — preserve valid existing rules and avoid duplication.
7. **Validation** — check scripts, references, privacy, portability, and generated output.
8. **Product application** — implement only the authorized deliverable.
9. **Report** — distinguish verified, failed, blocked, and unverified gates.

## 5. Approval boundaries

The suite defaults to planning before implementation. Obtain separate approval before:

- Creating, updating, renaming, or deleting Skills.
- Installing into a new harness or location.
- Publishing a repository or package.
- Deploying a website or changing public configuration.
- Adding analytics, forms, accounts, payments, or third-party embeds.

An approval for one stage does not automatically authorize later externally visible stages.

## 6. Portable harness behavior

The Skills use capability detection rather than hardcoded tool paths. They describe preferred sources and fallbacks for Qoder, Claude Code, Codex, OpenCode, and other agents.

Only Qoder has been load-tested in the current validation record. Treat other harnesses as `unverified` until they are actually exercised.

## 7. Status vocabulary

| Status | Meaning |
|---|---|
| `verified` | Directly supported by observed evidence |
| `bounded` | Supported only within a stated scope |
| `prohibited` | Excluded by evidence, rights, or owner instruction |
| `unresolved` | Missing, conflicting, or unread evidence |
| `failed` | Reproduced validation or execution failure |
| `blocked` | Requires user input or external state |
| `unverified` | Not tested or evidence unavailable |
| `superseded` | Replaced by later evidence |

## 8. Common failure modes

- Treating an assistant summary as proof without checking tool output.
- Reconstructing session turns that were not returned.
- Copying reference-site claims, brand assets, or source code.
- Relabeling older screenshots as a newer release.
- Publishing internal documents merely to remove broken links.
- Assuming a successful build proves accessibility, legality, or launch readiness.
- Forgetting to compare installed, staged, and remote artifacts after publication.

## 9. Customize safely

Keep product-specific facts and owner decisions in handoff outputs, not in the reusable Skills. Add resources only when they solve a concrete repeated problem. Revalidate the complete suite after changes.
