# Reference-Led Product Website Handoff

A portable Skill for Qoder, Claude Code, Codex, OpenCode, and other coding agents. It turns a visual reference into an original, evidence-backed product website handoff, verifies release and license facts, inventories real features and media, inspects references without copying them, and carries authorized work through build and launch verification.

## Package contents

```text
reference-led-product-website-handoff/
├── README.md
├── docs/
│   ├── usage-guide.md
│   └── validation.md
├── scripts/
│   └── validate-package.mjs
└── reference-led-product-website-handoff/
    ├── SKILL.md
    └── references/
        └── handoff-templates.md
```

The nested `reference-led-product-website-handoff/` directory is the installable Skill. Repository documentation and validation tooling stay outside it so the Skill remains valid and self-contained.

## Install

Copy the nested Skill directory into the Qoder user Skill directory:

- Windows: `%USERPROFILE%\.qoder\skills\`
- macOS/Linux: `~/.qoder/skills/`

Reload Skills if Qoder does not discover the new folder automatically, then invoke:

```text
/reference-led-product-website-handoff
```

Node.js is not required to use the Skill. It is required only to run the package validator.

## When to use it

Use this Skill when a request involves:

- A marketing or product website inspired by an external visual reference.
- IDE-ready documentation, asset manifests, capture plans, or implementation specifications.
- Release, download, platform, signing, or license verification.
- Original brand direction and product-specific information architecture.
- Screenshot, clip, font, logo, or social-image provenance and sanitization.
- Accessibility, SEO, legal, privacy, deployment, or launch gates.

## Workflow at a glance

1. Confirm scope, evidence roots, output location, and approval boundaries.
2. Build a claim ledger and verify release/download/license facts.
3. Inventory implemented features, media, provenance, and sensitive data.
4. Inspect the reference through REA or equivalent browser tooling.
5. Define an original product-specific visual and narrative direction.
6. Prepare the handoff documents and asset/capture records.
7. Implement without overwriting existing work.
8. Verify generated output, browser behavior, accessibility, SEO, and downloads.
9. Report verified, failed, blocked, and unverified items separately.

## Core safeguards

- Treat reference sites as design research, not product evidence or an asset license.
- Never copy unsupported pricing, platform promises, security claims, brand assets, or testimonials.
- Prefer authoritative release artifacts over stale package metadata.
- Keep legacy screenshots and clips version-honest.
- Scan full-resolution images and every video frame for sensitive data.
- Do not call a site live, accessible, secure, or legally approved without evidence.
- Preserve existing work and obtain approval before public deployment.

## Documentation

- [Usage guide](docs/usage-guide.md)
- [Validation guide](docs/validation.md)
- [Skill definition](reference-led-product-website-handoff/SKILL.md)
- [Handoff templates](reference-led-product-website-handoff/references/handoff-templates.md)

## Validate the package

```sh
node scripts/validate-package.mjs
```

The validator checks Skill structure, frontmatter, relative links, unresolved placeholders, English content, and common sensitive-data patterns. See [validation.md](docs/validation.md) for scope and limitations.
