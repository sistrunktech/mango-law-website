# Detailed Agent Prompt: Sanity CMS Setup (Mango Law)

Copy/paste this prompt to assign full Sanity CMS setup to an implementation agent.

---

You are implementing Sanity CMS integration for Mango Law website with production-safe governance.

## Objective

Design and implement a robust Sanity CMS foundation for editorial workflows (blogs, SEO metadata, authoring governance, publishing controls) while preserving no-drift rules in the existing codebase.

## Existing constraints (must follow)

- Canonical governance docs are in `docs/technical/MASTER_PRD_AGENT_OPERATIONS.md` and annexes.
- Protected/finalized content controls cannot be bypassed.
- Existing SEO and structured-data rules remain authoritative.
- No unsourced numeric trust claims.
- Any schema/SEO-sensitive changes must pass `check:structured-data` and `seo:smoke`.

## Scope

### In scope

1. Sanity project integration into Next.js app.
2. Content schemas for:
   - Blog post
   - Author
   - Category/tag
   - Reusable SEO fields
   - Optional legal source/citation references
3. Draft/published workflow + lifecycle state support aligned with governance.
4. Frontend data fetching for CMS-driven blog pages.
5. Migration/compat plan from file-based blog data to Sanity content.
6. Validation, preview flow, and publish safeguards.

### Out of scope

- Replatforming unrelated site areas.
- Removing governance/audit requirements.
- Rewriting all historic content in one pass.

## Deliverables

1. Technical design note (`docs/technical/...`) describing architecture and data flow.
2. Sanity schema definitions with validation rules.
3. CMS client integration in app code.
4. Preview/draft mode implementation.
5. Data access layer with fallback strategy (if migration is phased).
6. Migration utility/scripts for initial content import (if applicable).
7. Updated runbook for editors/admins.
8. Evidence bundle: commands run, checks, sample content render verification.

## Required implementation detail

### 1) Sanity structure and schema design

Define schemas with strict validation:

- **blogPost**:
  - slug (required, unique)
  - title (required)
  - excerpt/meta description (required length constraints)
  - body/content (portable text)
  - featured image (required policy-compliant)
  - status/lifecycle (`draft|published|finalized`)
  - `lastVerified` date
  - `sources` array (primary sources preferred)
  - optional `approvalToken` metadata for finalized/major edits
- **author**:
  - name, role, bio, image
- **category/tag**:
  - name, slug
- **seoFields** object:
  - title, description, canonical URL, OG image, noindex flag

Validation requirements:

- Block publish when required trust metadata is missing.
- Block publish when finalized content is edited without required approval metadata.
- Enforce slug and featured-image policies.

### 2) Governance alignment

Implement lifecycle and approval behavior so CMS edits cannot violate:

- `docs/CONTENT_GOVERNANCE.md`
- `docs/PROTECTED_CONTENT.md`
- `docs/CONTENT_CHANGELOG.md`

Expected behavior:

- Draft content editable by agents/editors.
- Finalized content requires approval path.
- Major changes require token-compatible record.

### 3) Frontend integration

Implement Sanity client and query layer for Next.js routes:

- Blog index page
- Blog detail page (`/blog/[slug]`)
- Metadata and JSON-LD compatibility

Requirements:

- Keep URL structure stable.
- Preserve SEO metadata quality and canonical behavior.
- Keep structured-data generation compatible with existing gates.

### 4) Preview and publishing workflow

Implement preview/draft mode:

- Secure preview route
- Draft content view for admins
- Clear separation between preview and public content

### 5) Migration strategy

Propose and implement phased migration from current file-based posts:

- Step 1: dual-read capability (file + CMS)
- Step 2: import core existing posts
- Step 3: switch primary source to CMS for designated posts
- Step 4: deprecate file-based entries once parity is verified

Include rollback strategy for each phase.

### 6) Analytics and reporting compatibility

Ensure content events and reporting hooks remain compatible with existing analytics model.

If changing any event contracts, provide migration notes and validation evidence.

## Acceptance criteria

1. Sanity schemas compile and validate as expected.
2. CMS blog content renders correctly on site routes.
3. Preview mode works for draft content and is access-controlled.
4. Governance gates remain enforceable (no bypass introduced).
5. SEO/structured-data outputs remain valid and consistent.
6. Build, lint, typecheck, and governance checks pass.
7. Documentation is complete enough for another engineer to operate without assumptions.

## Testing and verification requirements

Run and report:

- `npm run lint`
- `npm run typecheck`
- `npm run build`
- `npm run content:check`
- `npm run check:structured-data`
- `npm run seo:smoke`

Manual verification checklist:

- create draft post in Sanity and verify preview
- publish post and verify public route
- verify metadata and structured data for published post
- verify finalized content guard behavior

## Output format required from agent

1. Summary of architecture decisions
2. Files changed (grouped by purpose)
3. Migration plan and rollback plan
4. Verification evidence (commands + outputs summary)
5. Open risks and follow-up tasks

## Non-negotiables

- No secrets in repo.
- No destructive changes to unrelated site features.
- No weakening of governance controls.
- If blocked by unknowns, pause and list assumptions explicitly before continuing.

---

Prompt end.
