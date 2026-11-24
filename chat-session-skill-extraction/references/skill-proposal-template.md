# Skill Proposal Template

Replace bracketed fields with proposed values. Do not write the Skill until the user approves the proposal.

## 1. Request Summary

| Field | Value |
|---|---|
| Source evidence | [report path, session ID, or verified notes] |
| Requested action | [create / update / combine / rename / package] |
| Target harness | [Qoder / Claude Code / Codex / OpenCode / other / unknown] |
| Install root | [approved path or unresolved] |
| Approval boundary | [what is authorized now] |
| Language and privacy constraints | [constraints] |

## 2. Duplicate Check

| Candidate | Source | Match type | Gap | Decision |
|---|---|---|---|---|
| [name] | [local / marketplace / remote] | [exact / overlap / complementary / none] | [difference] | [extend / create / defer] |

## 3. Proposed Skills

| Name | Trigger | Purpose | Action | Target path |
|---|---|---|---|---|
| [hyphen-case] | [when to use] | [outcome] | [create / update] | [path] |

## 4. Architecture

- Component Skills: [names and responsibilities].
- Unified orchestrator: [name or none].
- Shared contracts: [statuses, evidence objects, approval gates].
- Standalone behavior: [how each component remains usable alone].

## 5. File Tree

```text
skill-name/
├── SKILL.md
├── scripts/          [only if needed]
├── references/       [only if needed]
└── assets/           [only if needed]
```

## 6. Resource Plan

| Resource | Type | Purpose | Deterministic input/output | Test |
|---|---|---|---|---|
| [path] | [script / reference / asset] | [why needed] | [contract] | [command or review] |

## 7. Existing Content Disposition

| Existing file or rule | Keep | Change | Remove | Reason |
|---|---|---|---|---|
| [path or rule] | [yes/no] | [change] | [reason] | [evidence] |

## 8. Workflow Summary

1. [stage].
2. [stage].
3. [stage].

## 9. Validation Plan

- Frontmatter and naming checks.
- Line-count and placeholder checks.
- Relative-link checks.
- Script execution tests.
- Privacy and portability review.
- Current-harness load test.
- Untested harnesses marked unverified.

## 10. Approval Record

| Decision | Approver | Scope | Date | Evidence |
|---|---|---|---|---|
| [approved / changes requested] | [name] | [files and actions] | [date] | [message or ticket] |

## 11. Publication Drift Record

| Artifact | Authoritative source | Installed hash | Staged hash | Remote hash | Status |
|---|---|---|---|---|---|
| [file or Skill] | [path] | [hash] | [hash] | [hash] | [current / stale / missing / unverified] |
