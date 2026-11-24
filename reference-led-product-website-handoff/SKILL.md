---
name: reference-led-product-website-handoff
description: Produce an evidence-backed marketing-site handoff from a visual reference without copying unsupported claims or brand assets. Use in Qoder, Claude Code, Codex, OpenCode, or other coding agents when a user wants a reference-inspired product website, IDE-ready documentation and asset package, release/download verification, original design direction, sanitized product media, or staged build and launch QA.
---

# Reference-Led Product Website Handoff

## Overview

Turn a visual reference into an original, product-specific website plan and handoff. Verify product and release facts before writing copy, inspect the reference without copying it, preserve existing work, and carry authorized work through build and launch verification.

## Operating Contract

- Confirm the product repository or evidence root, reference URL, output directory, intended audience, and requested deliverable before writing.
- Treat the reference as design research, not as product evidence, an asset license, or permission to copy.
- Default to presenting a plan before implementation. Obtain separate approval before public deployment or other externally visible actions.
- If the user explicitly authorizes end-to-end execution, continue through implementation and verification within that scope; do not stop after documentation unless the user asks for documentation only.
- Preserve existing files and repositories. Create a new output directory or make reversible copies; never overwrite a same-name Skill, draft, release artifact, or user work without explicit approval.
- Report observed, inferred, failed, and unverified items separately. A successful build is not proof of accessibility, legal readiness, or production readiness.

## Upstream Chat Evidence (Optional)

- When product facts originate in a chat session, use `chat-session-evidence-extraction` or an equivalent bounded evidence report before writing copy.
- Treat the report as an index to evidence, not as product truth. Verify release, feature, license, and platform claims against current source files and authoritative artifacts.
- Record the source snapshot, unread boundaries, contradictions, and unresolved owner decisions in the handoff.
- Do not import raw transcripts, tool logs, personal data, or machine-specific paths into website documents.
- Use `chat-session-skill-extraction` only when maintaining this Skill itself, not as a substitute for product verification.
- Use `evidence-driven-session-to-deliverable` when the user wants the full chat-to-Skill-to-website pipeline orchestrated across stages.

## Workflow

### 1. Frame the Work

Record:

- Product name, current release, supported platforms, and intended audience.
- Reference URL and the specific qualities the user wants: structure, pacing, interaction, imagery, or motion.
- Output location and target IDE or implementation stack.
- Whether the request covers research, documentation, implementation, deployment, or all four.
- Approval boundaries and any prohibited changes.

Inspect repository instructions and current project state before editing. Identify frozen versions, generated output, existing drafts, and files that must remain untouched.

### 2. Establish Evidence and Claim Control

Create a claim ledger with one row per substantive public statement. Classify each claim as:

- `verified`: directly supported by an authoritative artifact or implementation.
- `bounded`: supported only with an explicit scope or qualifier.
- `prohibited`: contradicted by evidence, license, owner instruction, or rights constraints.
- `unresolved`: insufficient evidence; omit or mark as an owner decision.

Use this evidence order unless the owner supplies a stronger authority:

1. Owner-verified release artifact and publication metadata.
2. Official release notes for that exact version.
3. Relevant implementation source for the behavior being described.
4. Current product documentation, boundary documents, and governing license.
5. Existing website copy, screenshots, and demos as presentation evidence only.
6. Drafts, roadmap notes, old release notes, and package-version fields as non-authoritative context.

When sources conflict, narrow or omit the claim. Never select the more marketable interpretation.

### 3. Verify Release, Download, Platform, and License Facts

Before using a version in public copy, verify:

- Exact version and publication timestamp.
- Supported operating systems and architectures.
- Exact installer or download filename and URL.
- Byte size and SHA-256 from the published artifact.
- Signing status and any platform warning users will encounter.
- Trial, evaluation, redistribution, commercial-use, warranty, and safety-critical limits.
- Whether source and release links are accessible to the intended audience.

Do not infer the shipped version from a stale package manifest, Cargo file, UI badge, or screenshot. Record source-tree drift separately and never modify the product repository merely to make website metadata agree.

Verify download integrity against the trusted release record. If a downloaded artifact does not match, stop and investigate; do not change the displayed checksum to match an untrusted file.

### 4. Inventory Features, Media, and Sensitive Data

Build a current inventory from actual files and behavior:

- Implemented features and their source evidence.
- Existing screenshots, clips, logos, icons, fonts, and social images.
- Visible version labels, capture dates, provenance, licenses, and intended use.
- Missing assets, broken paths, duplicate files, and stale documentation.
- Publication-sensitive data in source, images, video frames, metadata, and generated output.

Use synthetic identities for demos. Inspect full-resolution images and every video frame for credentials, tokens, API keys, pairing codes, PINs, private paths, private IPs, database exports, notifications, and real personal data. Cropping or blurring is insufficient if the original remains downloadable.

Record each asset with source, destination, web path, bytes, dimensions or duration, product version, creator/license, sanitization reviewer, and approval status. Record hashes only when required by owner policy; never invent them.

### 5. Inspect the Reference Through REA

Use REA or an equivalent browser inspection tool to collect retained evidence:

- Reference URL, inspection date, tool, mode, viewport, and evidence ID.
- Desktop runtime observations.
- Passive DOM, CSS, and accessibility observations.
- Network assets and third-party dependencies.
- Mobile evidence collected separately from desktop evidence.
- Capture failures, timeouts, and unavailable surfaces.

Extract abstract patterns before implementation details. Separate structural and interaction ideas from brand expression. Validate all accessibility, responsive, and performance behavior on the new site; the reference is not proof that those behaviors transfer.

If animated or heavyweight content prevents screenshots, use retained DOM/CSS/accessibility evidence and label visual capture as failed or incomplete. Do not reconstruct a screenshot from memory.

Never copy or adapt:

- Copy, slogans, headings, FAQ answers, feature descriptions, pricing, plans, testimonials, metrics, or product claims.
- Brand names, logos, color systems, typography pairings as a brand signature, illustrations, icons, badges, or endorsement marks.
- Source CSS, component code, animation choreography, screenshot assets, or other protected artwork without permission.

Borrow only common patterns such as hierarchy, pacing, tabs, disclosures, dialog behavior, and restrained motion. Implement them with original product content and brand assets.

### 6. Define an Original Product Direction

Derive the visual and narrative direction from the product itself:

- Product metaphor and positioning.
- Audience problems and desired visitor outcome.
- Original headline, message hierarchy, and section order.
- Brand palette, typography, imagery, motion, and accessibility constraints.
- A section-to-evidence map showing why each section exists and what proves its claims.

Prefer real, sanitized product evidence over generic AI artwork. Keep legal, platform, download, and safety qualifications near the relevant action rather than hiding them in a footer.

Do not reshape the product into the reference product merely to increase visual similarity.

### 7. Prepare the Handoff Package

Create only the documents and directories the task needs. For a complete website handoff, use this structure:

```text
output-directory/
├── README.md
├── docs/
│   ├── website-brief.md
│   ├── content-and-claims.md
│   ├── reference-analysis.md
│   ├── design-system.md
│   ├── asset-manifest.md
│   ├── capture-plan.md
│   ├── build-spec.md
│   ├── qa-test-plan.md
│   ├── seo-launch-checklist.md
│   └── legal-review.md
├── assets-source/
└── public/
    └── assets/
```

Use [handoff templates](references/handoff-templates.md) for the claim ledger, reference evidence log, asset manifest, capture plan, section evidence map, QA record, and launch sign-off.

Keep release facts in one authoritative data object or generated source. Document any unavoidable duplication and add a consistency check. Keep image alt text, captions, version labels, and media paths beside their asset records.

Treat documentation links as publication decisions. Publish reviewed static copies, use an approved external location, or remove the link. Never expose internal review notes or draft policies merely to eliminate a 404.

### 8. Implement Without Erasing Existing Work

- Prefer editing existing files when the task authorizes modification.
- Create a sibling project or reversible backup when scope is uncertain.
- Keep the implementation stack consistent with the approved handoff.
- Use local assets unless a remote dependency is explicitly approved.
- Keep release data, content arrays, and media paths deterministic.
- Preserve semantic HTML, keyboard behavior, focus management, reduced-motion support, and version-honest captions.
- Stop and ask before expanding scope, changing hosting, adding analytics/forms, publishing legal text, or deploying publicly.

### 9. Verify the Built Output

Test the generated output, not only source files:

- Build from a clean dependency state using the documented command.
- Inspect `dist/` or the equivalent deployable output.
- Resolve every referenced image, font, clip, icon, legal file, documentation link, sitemap, and robots file.
- Compare visible version, metadata, structured data, download URL, filename, byte size, and checksum against the verified release record.
- Search for prohibited claims, stale versions, placeholder origins, copied reference content, and sensitive data.
- Test desktop and mobile layouts, keyboard-only flows, focus visibility/restoration, target size, contrast, screen-reader semantics, 400% reflow, text spacing, reduced motion, and forced colors.
- Check browser console, failed requests, mixed content, unexpected third-party requests, media fallback behavior, and download integrity.
- Validate canonical URLs, Open Graph/Twitter metadata, structured data, sitemap, robots, staging noindex behavior, and production indexation intent.
- Verify the final deployed URL, redirects, MIME types, caching, security headers, privacy links, and rollback path after authorized deployment.

Record environment, build identifier, steps, expected result, actual result, evidence, severity, owner, and retest status for each failed check.

### 10. Report Status and Launch Gates

Use explicit statuses:

- `verified`: supported by observed evidence.
- `failed`: reproduced with evidence.
- `blocked`: cannot proceed without an owner decision or missing input.
- `unverified`: not tested or evidence unavailable.

Do not call the website live, ready to host, accessible, secure, or legally approved unless the corresponding gates passed and required owner approvals were recorded.

## Completion Criteria

Consider the handoff complete only when:

- Every substantive claim maps to evidence or is omitted.
- Release, platform, download, signing, and license facts are verified.
- The reference contributes abstract patterns only.
- Assets have provenance, version honesty, sanitization, and working paths.
- The handoff is IDE-ready and preserves existing work.
- Build and browser verification results are recorded.
- Legal, privacy, accessibility, SEO, deployment, and rollback gates are either passed or explicitly marked unresolved.

## Resources

- [Handoff templates](references/handoff-templates.md): copyable records for evidence, assets, capture, QA, and sign-off.
