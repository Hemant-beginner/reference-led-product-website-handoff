# Handoff Templates

Copy only the sections needed for the task. Replace bracketed fields with observed values. Blank fields are not approval.

## 1. Claim Ledger

| ID | Proposed public statement | Placement | Status | Evidence source | Scope or required qualifier | Reviewer / date |
|---|---|---|---|---|---|---|
| CL-001 | [sentence] | [section] | [verified / bounded / prohibited / unresolved] | [artifact, source file, or owner statement] | [caveat] | [name, date] |

Rules:

- Use one row per independently checkable statement.
- Prefer exact behavior over broad adjectives.
- Omit `prohibited` and unresolved claims from public copy unless the owner supplies new evidence.
- Record the next review trigger, such as a new release, license, platform, or implementation change.

## 2. Release Fact Record

| Field | Verified value | Authority | Verification method | Date |
|---|---|---|---|---|
| Product version | [version] | [release artifact or owner record] | [inspection or hash check] | [date] |
| Published at | [timestamp] | [source] | [method] | [date] |
| Platform / architecture | [values] | [source] | [method] | [date] |
| Installer filename | [filename] | [source] | [method] | [date] |
| Installer URL | [URL] | [source] | [method] | [date] |
| Bytes | [count] | [source] | [method] | [date] |
| SHA-256 | [digest] | [source] | [method] | [date] |
| Signing status | [status] | [source] | [method] | [date] |
| License / trial limits | [summary] | [license] | [section review] | [date] |
| Source-tree drift | [difference or none] | [manifest and release record] | [comparison] | [date] |

## 3. Reference Evidence Log

| Evidence ID | Reference URL | Date | Tool / mode | Viewport | Surface | Supported observation | Limit or failure |
|---|---|---|---|---|---|---|---|
| REF-001 | [URL] | [date] | [REA mode] | [width × height] | [runtime / DOM / CSS / accessibility / network] | [pattern] | [timeout, missing capture, or scope limit] |

Reuse boundary:

- Borrowed pattern: [abstract structure or interaction].
- Product-specific implementation: [original implementation].
- Rejected reference elements: [copy, brand, artwork, pricing, claims, badges, code, or assets].
- Independent validation required: [mobile, accessibility, performance, or behavior].

## 4. Asset Manifest

| ID | Source path | Destination / web path | Type | Bytes | Dimensions / duration | Product version | Provenance / license | Sanitization reviewer | Approval |
|---|---|---|---|---:|---|---|---|---|---|
| AS-001 | [path] | [path] | [image / clip / font / icon / legal] | [count] | [values] | [version or evergreen] | [creator and license] | [name, date] | [status] |

For video assets, record codec, audio-stream presence, poster path, fallback order, looping behavior, and frame-review result.

## 5. Capture Plan

| Capture ID | Feature or state | Authoritative surface | Required version evidence | Viewport / state | Synthetic data setup | Sanitization checks | Output path | Owner |
|---|---|---|---|---|---|---|---|---|
| CAP-001 | [feature] | [shipped build / fixture / source-backed mock] | [visible label or provenance record] | [viewport and state] | [setup] | [secrets, paths, IPs, PINs, notifications, personal data] | [path] | [name] |

Do not relabel an older screenshot as a newer release. If a fixture is used, label it as a fixture and state what it does and does not prove.

## 6. Section-to-Evidence Map

| Section | Visitor question | Proposed message | Evidence IDs | Asset IDs | Required qualifier | CTA |
|---|---|---|---|---|---|---|
| [section] | [question] | [message] | [CL / REF / CAP IDs] | [AS IDs] | [qualifier] | [action] |

## 7. Handoff Folder Checklist

- [ ] Output directory is new or existing work is preserved.
- [ ] Product repositories and frozen versions are unchanged unless explicitly authorized.
- [ ] Brief defines audience, outcome, information architecture, and non-goals.
- [ ] Claim ledger covers every substantive public statement.
- [ ] Reference analysis records evidence and reuse boundaries.
- [ ] Design system defines original brand-specific tokens and interaction rules.
- [ ] Asset manifest records provenance, version, sanitization, and approval.
- [ ] Capture plan distinguishes shipped evidence from fixtures and legacy assets.
- [ ] Build specification states stack, data contracts, accessibility, and definition of done.
- [ ] QA plan defines environments, evidence, severity, and exit criteria.
- [ ] SEO checklist covers canonical, social, structured data, sitemap, robots, and staging.
- [ ] Legal review records license, privacy, contact, distribution, and asset-rights decisions.
- [ ] Public documentation links are intentional and contain no internal drafts.

## 8. QA Evidence Record

| Field | Value |
|---|---|
| Test ID and title | [ID, title] |
| Build / commit | [identifier] |
| Date and tester | [values] |
| URL and environment | [preview / staging / production] |
| OS / browser / device | [exact versions] |
| Viewport / input / preferences | [values] |
| Preconditions | [values] |
| Steps | [ordered actions] |
| Expected result | [result] |
| Actual result | [result] |
| Status | [verified / failed / blocked / unverified] |
| Evidence | [sanitized screenshot, trace, console, network, or hash output] |
| Severity | [blocker / high / medium / low] |
| Owner and retest | [name, date, result] |

Minimum coverage:

- Build and generated-output inspection.
- Broken assets and links.
- Release and download identity.
- Prohibited-claim and sensitive-data search.
- Desktop and mobile visual review.
- Keyboard-only operation and focus management.
- Screen-reader semantics, contrast, target size, reflow, text spacing, reduced motion, and forced colors.
- Console, network, mixed-content, and third-party request checks.
- Metadata, canonical, structured data, sitemap, robots, and staging noindex behavior.
- Deployed smoke test and rollback verification after authorized launch.

## 9. Launch Sign-Off

| Gate | Owner | Evidence | Status / date |
|---|---|---|---|
| Release and download integrity | [name] | [record] | [status] |
| Assets, provenance, and privacy scan | [name] | [record] | [status] |
| Product claims and copy | [name] | [claim ledger] | [status] |
| Accessibility and browser QA | [name] | [QA record] | [status] |
| License and distribution authority | [name] | [approval] | [status] |
| Privacy and contact | [name] | [approval] | [status] |
| SEO and metadata | [name] | [validation] | [status] |
| Host, HTTPS, headers, and caching | [name] | [validation] | [status] |
| Production deploy and rollback | [name] | [deployment record] | [status] |

Do not mark a gate approved from this template alone. Record the actual decision, scope, owner, date, and evidence reference.
