# Usage Guide

## 1. Prepare the request

Provide the Skill with:

- Product name and repository or evidence root.
- Reference URL and the qualities to borrow.
- Current release or artifact record, if known.
- Target audience and desired visitor outcome.
- Output directory and target IDE or stack.
- Requested scope: research, documentation, implementation, deployment, or all four.
- Approval boundaries and files that must remain unchanged.

If a fact is unavailable, say so. The Skill is designed to mark it unresolved rather than invent it.

## 2. Example prompts

### Documentation-only handoff

```text
Use reference-led-product-website-handoff to inspect the reference URL and my product repository. Produce an evidence-backed website brief, claim ledger, reference analysis, design system, asset manifest, capture plan, build specification, QA plan, SEO checklist, and legal review. Do not implement or deploy.
```

### End-to-end implementation

```text
Use reference-led-product-website-handoff for the reference URL and product repository. Verify the release and license facts, prepare the handoff, implement the static site in a new output directory, sanitize the media, run browser and accessibility QA, and stop before public deployment.
```

### Existing draft repair

```text
Use reference-led-product-website-handoff to audit my existing website draft against the product source and release artifact. Identify unsupported claims, stale versions, broken asset paths, copied reference content, privacy risks, and launch blockers. Preserve existing work and propose fixes before editing.
```

## 3. Understand the stages

### Evidence and claim control

The Skill separates:

- `verified`: directly supported by authoritative evidence.
- `bounded`: supported only with a stated qualifier.
- `prohibited`: contradicted by evidence, license, rights, or owner instruction.
- `unresolved`: insufficient evidence; omit or escalate.

Use the claim ledger before writing public copy. One row should represent one independently checkable statement.

### Reference inspection

Record tool, mode, viewport, date, and evidence ID. Keep desktop runtime, passive DOM/CSS, accessibility, network, and mobile evidence separate. If capture fails, retain the failure and use lower-level evidence without pretending a screenshot exists.

Borrow abstract patterns only. Reimplement hierarchy, pacing, tabs, disclosures, dialogs, and motion with original product content and brand assets.

### Product direction

Define the product metaphor, audience problem, message hierarchy, section order, palette, typography, imagery, and motion from the product itself. Map every section to evidence and a visitor question.

### Handoff production

Use the bundled templates for:

- Claim ledger.
- Release fact record.
- Reference evidence log.
- Asset manifest.
- Capture plan.
- Section-to-evidence map.
- Handoff folder checklist.
- QA evidence record.
- Launch sign-off.

Copy only the sections the task needs. Blank fields are not approval.

### Implementation and verification

Keep release facts in one authoritative data source. Preserve semantic HTML, keyboard behavior, focus management, reduced-motion support, and version-honest captions.

Test generated output rather than source alone. Include assets, links, download identity, browser console/network, responsive layouts, accessibility, metadata, canonical URLs, structured data, sitemap, robots, and deployment smoke checks.

## 4. Approval boundaries

The Skill defaults to planning before implementation and requires separate approval before public deployment. If the user explicitly authorizes end-to-end execution, continue through implementation and verification within that scope.

Stop and ask before:

- Expanding the requested scope.
- Changing hosting or public configuration.
- Adding analytics, forms, accounts, payments, or third-party embeds.
- Publishing legal or privacy text.
- Deploying or sending externally visible content.

## 5. Interpreting results

Use the same status vocabulary in reports and templates:

- `verified`: observed evidence supports the result.
- `failed`: a check reproduced a failure.
- `blocked`: progress requires an owner decision or missing input.
- `unverified`: the check was not run or evidence is unavailable.

Do not convert a successful build into a claim of accessibility, security, legal readiness, or production readiness.

## 6. Common failure modes

- Using a stale package version as the shipped-release authority.
- Reusing an old screenshot under a new version label.
- Treating a reference site as evidence of product capability.
- Copying reference copy, artwork, badges, pricing, or source code.
- Publishing internal documents only to make links resolve.
- Scanning thumbnails instead of full-resolution images and video frames.
- Testing only development mode instead of generated output.
- Reporting completion while browser, legal, privacy, or deployment gates remain unresolved.

## 7. Customize safely

Add project-specific rules only when they are durable and evidence-backed. Keep the Skill generic; put product facts, release records, and owner decisions in the handoff output rather than hardcoding them into the Skill.

After changes, run the package validator and repeat the manual privacy review described in [validation.md](validation.md).
