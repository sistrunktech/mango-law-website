# Blog Requirements (Single Source of Truth)

This document consolidates the rules and guardrails for Mango Law blog posts so humans and agents have one place to check before editing content. It links to the deeper docs where needed.

## Scope
Applies to:
- `src/data/blogPosts.ts` (file-based public content)
- Any CMS-driven blog content in `blog_posts` (Supabase)

## Required Content Standards
1) Word count
- Target range: 750 to 4000 words depending on the post type and intent.
- Short drafts are allowed only when explicitly marked as draft in the CMS.

2) ORC and statutory references
- Include ORC links where statutes are discussed.
- Preferred sources are official Ohio codes or official state sites.
- Use the existing ORC references checker: `scripts/check-orc-references.mjs` (runs in `npm run prebuild`).

3) Trust metadata
- Every post must include:
  - `lastVerified` (date string)
  - `sources` (structured list)
- Sources must be credible and primary when possible (official statutes, court rules, government agencies).
- Avoid aggregator citations for numeric/legal claims.

4) Visual components
- Visuals are inserted via markers in the content:
  - `[VISUAL:COMPONENT_NAME]`
- Do not include hard numeric claims in visuals unless sourced and verified.
- See the visual component guide for allowed components and examples.

5) Accuracy and maintenance
- Follow the "no drift" language rules for penalties, costs, and timelines.
- Use conservative phrasing and note variability by county/court when applicable.
- If legal facts change, update sources + `lastVerified` and log the change.

## Governance and Change Control
- Finalized posts are read-only unless an approval token is provided.
- Every protected content change must be logged in `docs/CONTENT_CHANGELOG.md`.
- Approval token format:
  - `APPROVED: <slug> -- <what changed> -- <minor|major> -- <timestamp>`

## Required Files and References
- Content governance rules: `docs/CONTENT_GOVERNANCE.md`
- Protected content registry: `docs/PROTECTED_CONTENT.md`
- Content change log: `docs/CONTENT_CHANGELOG.md`
- Penalty language style guide: `docs/PENALTY-LANGUAGE-STYLE-GUIDE.md`
- Visual component guide: `docs/BLOG-VISUAL-COMPONENTS.md`

## Automated Checks
- `scripts/check-protected-content.mjs` enforces changelog entries for protected content edits.
- `scripts/check-orc-references.mjs` checks ORC link usage for content changes.

## When in doubt
- Do not remove images, links, headings, or metadata without calling it out in the change log.
- If accuracy is uncertain, mark the claim as variable and cite a source.
- If content is near-final, use the approval token workflow.
