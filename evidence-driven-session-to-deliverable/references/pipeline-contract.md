# Pipeline Contract

Use these records to move evidence, proposals, approvals, and validation results between stages. Replace bracketed fields with observed values.

## 1. Pipeline Intake

| Field | Value |
|---|---|
| Request type | [evidence-only / skill-only / product-only / skills-and-product / full-pipeline] |
| Source sessions | [IDs, exports, or verified notes] |
| Requested outcomes | [deliverables] |
| Target harnesses | [names or unknown] |
| Install roots | [approved paths or unresolved] |
| Product inputs | [repository, reference URL, output directory] |
| Approval boundary | [authorized stages] |
| Language and privacy constraints | [constraints] |

## 2. Dependency Preflight

| Component | Required | Installed path | Load status | Validation status | Fallback |
|---|---|---|---|---|---|
| [Skill name] | [yes/no] | [path] | [verified / failed / unverified] | [verified / failed / unverified] | [inline procedure or blocked] |

## 3. Evidence Handoff

| Field | Value |
|---|---|
| Evidence report | [path or identifier] |
| Source boundary | [snapshot and coverage] |
| User corrections | [IDs] |
| Failure traces | [IDs] |
| Verified steps | [IDs] |
| Surviving artifacts | [paths and status] |
| Unresolved questions | [IDs] |
| Reusable workflow candidates | [IDs] |

The evidence report is an index, not a replacement for source verification.

## 4. Component Skill Proposal

| Name | Action | Trigger | Inputs | Outputs | Validation | Target path |
|---|---|---|---|---|---|---|
| [name] | [create / update / preserve] | [when used] | [inputs] | [outputs] | [checks] | [path] |

## 5. Integration Map

| From stage | To stage | Contract | Failure behavior |
|---|---|---|---|
| Evidence extraction | Skill extraction | Bounded evidence report | Mark unsupported candidates unresolved |
| Skill extraction | Orchestrator | Approved proposals and validation | Stop before writes if approval is missing |
| Evidence extraction | Product handoff | Verified claim inputs | Verify against source and artifacts |
| Product handoff | Orchestrator | Build and launch-gate results | Report failed or blocked gates explicitly |

## 6. Approval Record

| Gate | Scope | Decision | Approver | Date | Evidence |
|---|---|---|---|---|---|
| Plan | [stages and files] | [approved / changes requested] | [name] | [date] | [message] |
| Write | [files] | [approved / blocked] | [name] | [date] | [message] |
| Publish or deploy | [destination] | [approved / blocked] | [name] | [date] | [message] |

## 7. Validation Report

| Component | Command or review | Observed result | Status | Evidence |
|---|---|---|---|---|
| Session inspector | [command] | [result] | [verified / failed / unverified] | [output] |
| Skill package | [command] | [result] | [verified / failed / unverified] | [output] |
| Current-harness load | [invocation] | [result] | [verified / failed / unverified] | [output] |
| Product build | [command] | [result] | [verified / failed / unverified] | [output] |
| Browser and accessibility | [checks] | [result] | [verified / failed / unverified] | [evidence] |
| Legal, privacy, SEO, launch | [review] | [result] | [verified / failed / blocked / unverified] | [record] |

## 8. Artifact Drift Register

| Artifact | Authoritative source | Installed hash | Staged hash | Remote hash | Status |
|---|---|---|---|---|---|
| [file or Skill] | [path] | [hash] | [hash] | [hash] | [current / stale / missing / unverified] |

## 9. Final Pipeline Summary

- Created Skills: [names and paths].
- Updated Skills: [names and preserved rules].
- Product deliverables: [paths and status].
- Verified gates: [IDs].
- Failed gates: [IDs].
- Blocked decisions: [IDs].
- Unverified harnesses or checks: [list].
- Approved next action: [action or none].
