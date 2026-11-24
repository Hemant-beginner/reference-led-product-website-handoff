# Evidence Report Template

Replace bracketed fields with observed values. Do not fill gaps from memory.

## 1. Source Boundary

| Field | Value |
|---|---|
| Session title or ID | [identifier] |
| Source type | [native reader / JSON / JSONL / Markdown] |
| Snapshot marker | [revision, timestamp, or hash] |
| Runtime state | [running / completed / interrupted / failed / unknown] |
| Covered messages or turns | [range] |
| Older history | [available / unavailable / unknown] |
| Truncation limits | [details] |
| Parser or script | [name and mode] |

## 2. Coverage Statement

- Content read in full: [message IDs or ranges].
- Content read in bounded excerpts: [message IDs or ranges and limits].
- Tool outputs inspected: [tool indexes or IDs].
- Content not read: [explicit ranges or unknown areas].
- Freshness limits: [snapshot age or later changes].

## 3. User Requests and Corrections

| ID | Message ID | Exact phrase or requirement | Effect on scope | Status |
|---|---|---|---|---|
| REQ-001 | [ID] | [request] | [impact] | [active / superseded] |
| COR-001 | [ID] | [short exact quote] | [changed behavior] | [applied / unresolved] |

## 4. Failure Trace

| ID | Failed step or tool | Error evidence | Preceding context | Recovery or workaround | Final status |
|---|---|---|---|---|---|
| FAIL-001 | [step] | [exact bounded error] | [context] | [recovery] | [resolved / unresolved / superseded] |

## 5. Verified Steps

| ID | Claim | Evidence tool or artifact | Observed result | Limits | Status |
|---|---|---|---|---|---|
| VER-001 | [claim] | [tool output, file, hash, build log] | [result] | [scope] | [verified / bounded] |

## 6. Surviving Artifact Check

| Artifact | Expected from session | Current observation | Evidence | Status |
|---|---|---|---|---|
| [path or resource] | [expected state] | [current state] | [read, hash, listing, or test] | [matches / changed / missing] |

## 7. Contradictions and Open Questions

| ID | Conflict or question | Competing evidence | Conservative interpretation | Required owner input |
|---|---|---|---|---|
| OQ-001 | [question] | [sources] | [bounded conclusion] | [decision] |

## 8. Reusable Workflow Candidates

| Candidate | Trigger | Durable steps | Failure modes | Validation gate |
|---|---|---|---|---|
| SKILL-001 | [when it applies] | [repeatable sequence] | [observed failures] | [pass/fail check] |

## 9. Confidence Summary

- Verified facts: [count and IDs].
- Bounded facts: [count and IDs].
- Failed or unresolved items: [count and IDs].
- Claims intentionally omitted: [reasons].
- Recommended next read or check: [action].
