# Trouble Tickets

This document tracks known issues and problems that require resolution.

---

## TICKET-001: Logo Generation Failure

**Priority:** High
**Status:** Closed
**Date Created:** 2025-12-05
**Assigned To:** TBD

### Issue Summary
Generated logo assets did not match the required brand specifications provided in the original design file.

### Problem Details
- Attempted to generate SVG versions of the Mango Law LLC logo using AI/automated tools
- Generated assets in `/public/images/brand/generated/` directory do not accurately represent the brand
- Multiple iterations failed to match:
  - Mango fruit shape and proportions (teardrop vs. realistic mango)
  - Gold gradient colors and shading (incorrect color values and gradient direction)
  - Leaf design and positioning (simplified vs. detailed original)
  - Overall professional quality and polish
  - Text layout for full logo variations (horizontal, vertical layouts)
  - Font styling for "Mango Law LLC" text
  - "CRIMINAL & OVI/DUI DEFENSE" tagline positioning

### Impact
- Brand identity compromised across the website
- Temporary reversion to original PNG file required
- Inconsistent asset quality between header and footer
- Loss of scalability benefits of SVG format

### Current Workaround
- Resolved by replacing placeholder/generated assets with the official, designer-provided assets in `public/images/brand/`.
- Header now uses the cropped tagline logo asset; footer uses the official vertical full-color logo.

### Files Affected
```
/src/components/SiteHeader.tsx
/src/components/Footer.tsx
/public/images/brand/mango-logo-tagline-cropped.png
/public/images/brand/mango-logo-vertical-fullcolor.svg
/public/images/brand/mango-icon-fullcolor.svg
```

### Required Resolution Options

#### Option 1: Professional Logo Design Service
- Hire professional designer to create proper vector versions
- Cost: $200-500
- Timeline: 1-2 weeks
- Quality: Guaranteed professional result

#### Option 2: Manual Vector Tracing
- Use Adobe Illustrator or Inkscape to manually trace PNG
- Requires design skills and software access
- Timeline: 4-8 hours of work
- Quality: Depends on skill level

#### Option 3: Keep Current Workaround
- Continue using PNG in header
- Use inline SVG icon components elsewhere
- Accept compromise on scalability
- Cost: $0
- Quality: Acceptable but not ideal

### Required Deliverables (if pursuing Option 1 or 2)
- Icon-only versions (mango fruit with leaf)
- Horizontal logo (icon + "Mango Law LLC")
- Vertical logo (icon above text)
- Color variants for each:
  - Original (gold gradient #E8C060 to #A8863A)
  - White (for dark backgrounds)
  - Black (for light backgrounds)
- SVG format, optimized and clean
- Maintain exact proportions from original design

### Notes
- Original logo file shows high-quality gradient work and detailed styling
- AI generation tools consistently failed to capture the nuanced design
- Manual professional work likely required for acceptable results
- Consider this an investment in brand consistency and quality

### Next Steps
1. Optional cleanup (low priority): remove/archival of older placeholder/generated assets once confirmed unused.
2. Optional (recommended): add proper PNG favicons (16×16, 32×32, apple-touch-icon) and wire in `index.html`.

---

## TICKET-002: Floating Chat Progressive Disclosure + Chooser

**Priority:** Medium
**Status:** Closed
**Date Created:** 2025-12-12
**Assigned To:** TBD

### Issue Summary
Floating chat launcher is currently always “expanded label” and does not implement the intended progressive disclosure / chooser (Chat / Call / Consult).

### Desired Behavior
- Expanded (icon + label) for first ~10 seconds or until scroll.
- Collapsed (icon-only) after user has “seen it”.
- Tap opens chooser with: Chat now, Call (office), Request consult (lead modal).
- Must not overlap map controls on `/resources/dui-checkpoints` (add per-page offset override).

### Files Likely Involved
`src/components/ChatIntakeLauncher.tsx`, `src/components/Layout.tsx`, `src/components/chat/ConversationWindow.tsx`, `src/components/LeadCaptureModal.tsx`

---

## TICKET-003: Favicon Assets (16/32) Not Wired

**Priority:** Low
**Status:** Open
**Date Created:** 2025-12-12
**Assigned To:** TBD

### Issue Summary
Site currently uses `public/favicon.svg` only. We should add standard PNG favicon assets (`favicon-16x16.png`, `favicon-32x32.png`, optional `apple-touch-icon.png`) and update `index.html`.

---

## TICKET-004: Admin Login / Password Reset Email Not Arriving

**Priority:** High  
**Status:** Mitigated  
**Date Created:** 2025-12-13  
**Assigned To:** TBD

### Issue Summary
Admin cannot sign in at `/admin/login`. Password reset is requested at `/admin/forgot-password`, UI reports success, but the email does not arrive.

### Most likely root causes
- Admin user was created in a different Supabase project earlier (project drift), so the user does not exist in the current auth backend.
- Supabase Auth email deliverability is failing (SMTP not configured, suppressed, or landing in spam).
- Redirect URL allowlist in Supabase Auth does not include the current site origin.

### Required checks / fix
1. In Supabase Dashboard (project `rgucewewminsevbjgcad`) → Authentication → Users:
   - Confirm the admin email exists (create/invite it if missing).
2. Supabase Dashboard → Authentication → URL Configuration:
   - Ensure redirect URLs include `https://mango.law/admin/reset-password` (and any staging/preview host you actively use).
3. Supabase Dashboard → Authentication → Email (or SMTP):
   - Confirm email sending is enabled and review deliverability logs/suppression.

### Mitigation / current state
- Admin access is tied to **Supabase Auth** (not “Bolt user accounts”). If an admin can’t log in, first confirm the user exists in Supabase Auth for `rgucewewminsevbjgcad`.

---

## TICKET-005: Public DUI Checkpoints Page Shows Seed/Demo Rows

**Priority:** High  
**Status:** Closed  
**Date Created:** 2025-12-13  
**Assigned To:** TBD

### Issue Summary
`/resources/dui-checkpoints` shows “fake”/seed checkpoints (e.g., Delaware County “today”) and other legacy placeholder rows.

### Root cause
Seed/demo rows exist in the production `dui_checkpoints` table.

### Fix
- Clean production data by deleting seed rows from `dui_checkpoints` (preferred).
- Keep the public page conservative: show only rows with a real `source_url` (mitigation).

### Resolution notes
- Deleted the seed batch created on `2025-12-09` (UTC) from production.
- Verified scraper repopulates real rows from OVICheckpoint and geocoding populates `latitude/longitude` when Mapbox token is valid.

---

## TICKET-006: Google OAuth redirect_uri_mismatch (creshr… vs rguce…)

**Priority:** High  
**Status:** Mitigated  
**Date Created:** 2025-12-13  
**Assigned To:** TBD

### Issue Summary
Google OAuth still errors with `redirect_uri_mismatch`, showing a stale Supabase project callback:
`https://creshrkavuyjzutatjfh.supabase.co/functions/v1/google-oauth-callback`

### Likely root causes
- Frontend is still calling the wrong Supabase project for `google-oauth-connect` (env drift or an older build).
- Google Cloud Console OAuth client is missing the production callback URL, or still includes stale ones.

### Required checks / fix
1. Confirm the site is calling:
   - `https://rgucewewminsevbjgcad.supabase.co/functions/v1/google-oauth-connect`
2. Google Cloud Console → OAuth Client → Authorized redirect URIs must include:
   - `https://rgucewewminsevbjgcad.supabase.co/functions/v1/google-oauth-callback`
3. Remove stale redirect URIs after verification (including `creshr…`).

### Also check: google_integrations integration type constraint
If OAuth redirects back with a brief “success” toast but no persistent “Connected” status, the callback may be failing to save.
The original DB constraint only allowed `business_profile`, `sheets`, `calendar`, `oauth`, but the current connectors use
`analytics`, `search_console`, and `tag_manager`. Apply migration
`supabase/migrations/20251213050000_fix_google_integrations_integration_type_check.sql`.

### Mitigation / current state
- The frontend Supabase client is pinned to the production project (prevents calling stale projects even if Bolt env vars drift).
- `google-oauth-connect` currently returns `redirectUri=https://rgucewewminsevbjgcad.supabase.co/functions/v1/google-oauth-callback`.
- Remaining requirement is Google Cloud Console: ensure that exact redirect URI is present on the correct OAuth client.

---

## TICKET-007: Bolt Publish Failure — Unsupported Filename Character

**Priority:** High  
**Status:** Mitigated  
**Date Created:** 2025-12-13  
**Assigned To:** TBD

### Issue Summary
Publishing fails with: “Publication failed due to a filename with an unsupported character.”

### Most common trigger
Local publishing tools sometimes include `node_modules/` (which contains scoped packages like `@scope/...`) even though it is not required for deploy.

### Fix
- Ensure publishes exclude install artifacts:
  - `node_modules/`, `dist/`, local output folders, and large binary bundles.
- Repo includes `mango-law-website/.boltignore` and a `prebuild` filename safety check (`scripts/check-filenames.mjs`) to prevent regressions.
- If Bolt publish/build fails with a missing module error for dev-only tooling (example: `rollup-plugin-visualizer`), ensure the Vite config only loads it in analyze mode via dynamic import (`vite.config.ts`).
- Ensure `.boltignore` does not exclude required source folders (example: `og/`) even if OG generation is disabled at runtime.

---

## TICKET-008: Schema.org Validator Errors — LegalService Structured Data

**Priority:** High  
**Status:** Closed  
**Date Created:** 2025-12-13  
**Assigned To:** TBD

### Issue Summary
Schema.org Validator reports errors on the homepage structured data (`LegalService`) and/or the attorney schema. This reduces trust in structured data and may prevent eligible rich results.

### Root cause (likely)
- Invalid or nonstandard properties on `LegalService` (e.g., `attorney` is not a canonical Schema.org property for `LegalService` / `LocalBusiness`).
- `@type: "Attorney"` can be inconsistently supported by validators; safer to represent the attorney as `Person` with `hasOccupation`.
- `OpeningHoursSpecification.dayOfWeek` format may not match enum expectations.

### Fix (recommended)
1. Refactor the homepage structured data to a single `@graph` containing:
   - `LegalService` node (firm)
   - `Person` node (attorney)
   - Link via `founder` or `employee` using `@id` references.
2. Remove invalid properties (e.g., `attorney`) from the `LegalService` node.
3. Change attorney schema to `@type: 'Person'` and include `hasOccupation` = `Attorney`.
4. Normalize `OpeningHoursSpecification.dayOfWeek` to Schema.org enum URLs:
   - `https://schema.org/Monday`, etc.

### Files Likely Involved
`src/lib/seo.tsx`, `src/pages/HomePage.tsx`, `src/pages/AboutPage.tsx`

### Resolution notes
- Refactored homepage schema to a single `@graph` (`LegalService` + `Person`) linked via `founder`.
- Removed nonstandard `attorney` property from the `LegalService` node.
- Converted About page schema to `Person` + `hasOccupation` (instead of `@type: Attorney`).
- Normalized `OpeningHoursSpecification.dayOfWeek` to Schema.org enum URLs.

### Verification
- Validate the rendered JSON-LD on https://validator.schema.org/ and the Rich Results Test.

---

## TICKET-009: Stale Pending DUI Checkpoint Announcements (Outdated Links)

**Priority:** High  
**Status:** Mitigated  
**Date Created:** 2025-12-13  
**Assigned To:** TBD

### Issue Summary
The public DUI checkpoints page (`/resources/dui-checkpoints`) shows "Pending checkpoint announcements" that are no longer relevant (e.g., old 2019 articles). These reduce credibility and create a poor UX.

### Root cause
`dui_checkpoint_announcements` rows with `status='pending_details'` have no expiration rules or cleanup job, so stale announcements remain publicly visible indefinitely.

### Fix (phased)
#### Phase 0 (Immediate)
- Apply a frontend filter to exclude stale pending announcements based on age.
  - Keep `pending_details` only when any of these are recent:
    - `event_date` (>= today - 1 day)
    - `start_date` (>= now - 24h)
    - `announcement_date` (>= now - 14 days)
    - fallback (only if `announcement_date` is missing): `created_at` (>= now - 14 days)

#### Phase 1 (Durable)
- Add explicit expiry semantics:
  - Option A: add `expires_at` + optional `expired` status.
  - Option B (simpler): mark stale pending rows as `cancelled`.
- Update public read behavior to hide expired/cancelled pending rows.
- Add daily pg_cron cleanup to expire old `pending_details` rows.

#### Phase 2 (Admin UX)
- Add admin actions to:
  - expire/cancel
  - convert pending announcement into a fully specified checkpoint (`linked_checkpoint_id`)
  - view age/expires date

### Files Likely Involved
`src/pages/DUICheckpointsPage.tsx`, `src/lib/checkpointAnnouncementsService.ts`, new supabase migration(s), optional cron SQL.

### Verification
- Public page no longer shows old "planned this weekend" items.
- Admin can still see/correct old items.
- Confirm after publish: pending list hides 2019-era rows.

---

## TICKET-010: Faster Crawl / "Instant Indexing" for SPA (Vite + React)

**Priority:** High  
**Status:** Open  
**Date Created:** 2025-12-13  
**Assigned To:** TBD

### Issue Summary
SPA pages can be crawled slower and updates can take longer to surface in Search results. We want the fastest practical indexing behavior for new/updated pages (especially blog posts and new resources) without a full rewrite.

### Recommended approach (phased)
#### Phase 1 (MVP, minimal architecture change)
1. Pre-render critical routes (static HTML output at build time):
   - Home, About, Practice Areas, Blog index, Blog posts, key landing pages.
2. Generate/serve sitemap + robots:
   - Build-time sitemap generation that includes all blog routes.
   - Ensure canonical URLs and structured data are valid.
3. Hook on publish:
   - When a new blog post is published in the CMS/admin, trigger:
     - sitemap regeneration (or ensure it is already dynamic)
     - ping mechanisms (see below)

#### Phase 2 (Optional)
- Add SSR (framework migration) if the site grows into highly dynamic content needs.
  - Consider moving to an SSR-capable framework (e.g., Next.js or Remix).

#### Phase 3 (Optional, with policy caveats)
- Integrate Google Indexing API for specific content types.
  - Note: Officially intended for `JobPosting` / `BroadcastEvent` content. If used more broadly, implement guardrails and allowlist which routes are submitted.

### Required Deliverables
- A documented SEO crawl strategy:
  - which routes are pre-rendered
  - how sitemaps are generated/updated
  - how URL submissions are triggered (if any)
- A lightweight publish hook:
  - on new/updated blog post, automatically submit or ping.

### Verification
- Sitemap submitted in GSC and contains all canonical blog URLs.
- "URL inspection" in GSC reflects faster discovery for new posts compared to current baseline.

### Current MVP implementation
- `robots.txt` already references `https://mango.law/sitemap.xml`.
- `npm run build` generates `dist/sitemap.xml` via `scripts/generate-sitemap.mjs` (runs in `postbuild`).
- The sitemap includes all static marketing routes plus `/blog/:slug` entries sourced from `src/data/blogPosts.ts`.

---

## TICKET-011: sitemap.xml Serving SPA HTML (Not XML)

**Priority:** High  
**Status:** Closed  
**Date Created:** 2025-12-14  
**Assigned To:** TBD

### Issue Summary
`https://mango.law/sitemap.xml` is returning the SPA HTML (index.html) instead of XML. This prevents sitemap validation/submission and blocks the “instant indexing” MVP.

### Root cause (likely)
- The publish pipeline is not deploying `dist/sitemap.xml` reliably (or it is not being generated in the deployed build artifact).

### Fix (implemented)
- Added a Vite build plugin that writes `dist/sitemap.xml` during the build step (`closeBundle()`), so it works even if the host runs `vite build` directly.

### Verification
- After publish, `https://mango.law/sitemap.xml` starts with `<?xml` and has `Content-Type: application/xml` (or `text/xml`).

---

## TICKET-012: DUI Checkpoint Map Shows Out-of-State Pins (NY/CA)

**Priority:** High  
**Status:** Closed  
**Date Created:** 2025-12-14  
**Assigned To:** TBD

### Issue Summary
The public map on `/resources/dui-checkpoints` sometimes shows markers far outside Ohio (e.g., New York / California). This breaks trust and causes the map to auto-zoom out due to `fitBounds` including these outliers.

### Root cause
- Scraper geocoding accepted the first Mapbox result without validating it resolves to Ohio.
- Bad results could be cached in `geocoding_cache`, making the issue persistent.
- The map fit bounds to all coordinates that existed, amplifying outliers.

### Fix (implemented)
- Scraper geocoding now requests multiple candidates and selects the best Ohio-valid result; non-Ohio results are not cached.
- Cache poisoning defense: cached geocodes outside Ohio are ignored and removed.
- Frontend safety net: map ignores non-Ohio coordinates for marker creation and `fitBounds`.

### Verification
- After publish, public map shows no pins outside Ohio even if DB contains outlier coordinates.

---

## TICKET-013: Checkpoint Status Incorrect ("Active" After End Date)

**Priority:** High  
**Status:** Closed  
**Date Created:** 2025-12-14  
**Assigned To:** TBD

### Issue Summary
Some checkpoints display `status='active'` even though the checkpoint ended days ago.

### Root cause
- **Primary:** corrupted `start_date/end_date` in `dui_checkpoints` (many rows were overwritten to “today” due to a historical scraper parsing fallback).
- **Secondary:** the persisted `status` column can become stale if pg_cron status updates are not running reliably (but public UI should not depend on it).

### Fix status
- **UI mitigation exists:** the public page derives `displayStatus` from `start_date/end_date` (cancelled stays cancelled) and uses it for cards/markers/popups, with a regression test.
- **Still required:** restore correct historical dates in Supabase and prevent overwrites going forward.

### Required remediation (data)
1. Run a report-only scan to identify corrupt rows and what would be repaired:
   - `npx ts-node --esm scripts/backfill-ovicheckpoint-dates.ts --mode scan`
2. Decide remediation path (prefer smallest blast radius):
   - **Replace OVICheckpoint rows only (recommended):**
     - `npx ts-node --esm scripts/backfill-ovicheckpoint-dates.ts --mode replace-ovicheckpoint --apply`
   - or targeted updates only (slower; requires higher-confidence matching).
3. Re-verify `/resources/dui-checkpoints`:
   - past checkpoints show `completed`
   - “Active” view contains only checkpoints whose end time is in the future.

### Resolution notes
- Re-ran the backfill script in `scan` mode against production credentials; no corrupt candidates detected and no inserts/updates needed.
- Hardened the script so it can load local `.env` automatically, supports `VITE_*` env fallbacks, and requires `--confirm-replace` before running `replace-ovicheckpoint` in `--apply` mode.

### Verification
- After backfill, a checkpoint with an `end_date` in the past displays as `completed` on the public page and is not shown in “Active”.

---

## TICKET-014: Mobile Floating Buttons Misaligned + Header CTA Layout

**Priority:** High  
**Status:** Mitigated  
**Date Created:** 2025-12-14  
**Assigned To:** TBD

### Issue Summary
On mobile, the accessibility widget button and the chat widget button appear misaligned (different sides/offsets) and can overlap content. The floating buttons should be visually aligned and reduce footprint after the user has started scrolling or after a short delay.

Additionally, the mobile header CTA currently shows a phone icon next to the Consult button; the preferred layout is to show the phone number as click-to-call text with the Consult button, neatly aligned.

### Root cause
- Accessibility launcher and chat launcher were positioned independently with different anchors/offset logic.
- Chat launcher only hid the label when “collapsed” but did not shrink its hitbox, so the footprint remained large.
- Mobile header CTA used a phone icon button rather than click-to-call text, leading to cramped alignment.

### Fix (implemented)
- Mobile floating buttons are aligned on the bottom-right and respect shared bottom offsets (including DUI checkpoint pages).
- Both floating buttons shrink after scroll/10s to reduce footprint while remaining accessible.
- Mobile header CTA now shows the phone number as click-to-call text stacked with the Consult button.

### Verification
- On mobile, the accessibility and chat buttons remain aligned and do not overlap key content.
- After ~10s or on scroll, both buttons shrink to compact circles.
- Mobile header shows a tappable phone number and Consult button aligned cleanly.

---

## TICKET-015: Checkpoint Source Attribution Uses Aggregator Feeds (OVICheckpoint/DUIBlock)

**Priority:** High  
**Status:** Mitigated  
**Date Created:** 2025-12-14  
**Assigned To:** TBD

### Issue Summary
The public DUI checkpoint map/cards display `Source: OVICheckpoint.com` for many checkpoints. OVICheckpoint/DUIBlock are aggregator feeds and should not be publicly credited as the canonical source.

The desired attribution is to cite the underlying credible sources (local news outlets and official LEA posts such as sheriff’s offices, OSHP, municipal PD social posts, etc.).

### Root cause
- The OVICheckpoint scraper persists `source_name='OVICheckpoint.com'` and `source_url='https://www.ovicheckpoint.com/'` into `dui_checkpoints` for new rows.
- The public UI renders `dui_checkpoints.source_name/source_url` directly.
- When a checkpoint is later manually corrected to an official source, subsequent scraper runs can overwrite the curated source fields.

### Fix (scoped)
- Immediate: hide aggregator attribution on public UI while keeping data internally for traceability.
- Prevent future regression: scraper should not overwrite non-aggregator source fields on existing rows.
- Backfill: update existing checkpoint rows to point `source_name/source_url` at the researched official/news sources.
- Long-term: support multiple sources per checkpoint (official + corroborating) without losing ingestion traceability.

### Next-phase scope (track as follow-up PRs)
**Goal:** treat OVICheckpoint/DUIBlock as ingestion leads, not public citations.

1) **Data model: store ingestion lead separately from public citations**
   - Add `ingestion_source_name` / `ingestion_source_url` fields (or similar) to `dui_checkpoints`, and/or
   - Add a `dui_checkpoint_citations` table to support multiple credible citations per checkpoint.
2) **Scraper/pipeline**
   - Write ingestion lead fields for new rows.
   - Never overwrite curated public citation fields on existing rows.
3) **Backfill + normalization**
   - Backfill credible citations for existing rows where available.
   - Normalize `source_name` strings so aggregator detection is consistent.
4) **UI semantics**
   - Public pages show only “Verified by …” citations.
   - Ingestion lead fields show only in admin (never public).

### Verification
- Public DUI checkpoint page does not display `Source: OVICheckpoint.com` / `DUIBlock`.
- Checkpoints with official sources display the correct source name/link.
- Curated source fields are not overwritten by scheduled scraper runs.

---

*Add additional trouble tickets below using the same format*

---

## TICKET-016: Blog System — Add `lastVerified` + `sources` Trust Metadata

**Priority:** High  
**Status:** Closed  
**Date Created:** 2025-12-14  
**Assigned To:** TBD

### Issue Summary
Blog posts currently make legal/procedural and sometimes numeric claims without a consistent, structured way to show what was checked, when it was checked, and what sources support it.

### Desired Outcome
- Add a `lastVerified` date string and structured `sources` list to the BlogPost model.
- Render “Last verified” and “Sources” on blog post pages (and optionally on blog cards).

### Acceptance Criteria
- TypeScript model updated and all posts include the required fields.
- Blog post page renders trust metadata consistently without layout regressions.

### Resolution notes
- Implemented in PR #22 (trust metadata + rendering).

---

## TICKET-017: SOP — Penalty/Cost Language Style Guide (“No Drift” Rules)

**Priority:** High  
**Status:** Closed  
**Date Created:** 2025-12-14  
**Assigned To:** TBD

### Issue Summary
Penalty ranges, costs, timelines, and “absolute” claims can drift over time and create accuracy risk unless governed by a clear SOP.

### Desired Outcome
Create a style guide defining:
- How to write about penalties/costs conservatively (avoid absolutes; include “what varies”).
- How to cite sources (primary where possible) and how to handle tables/visuals with numbers.
- A “last verified” discipline for content maintenance.

### Acceptance Criteria
- `docs/PENALTY-LANGUAGE-STYLE-GUIDE.md` exists and is actionable.

### Resolution notes
- Added `docs/PENALTY-LANGUAGE-STYLE-GUIDE.md`.

---

## TICKET-018: Blog Visuals — De-risk `[VISUAL:*]` Components With Numeric Claims

**Priority:** High  
**Status:** Closed  
**Date Created:** 2025-12-14  
**Assigned To:** TBD

### Issue Summary
Blog visuals referenced via `[VISUAL:*]` can embed hard-coded numeric claims (fines, thresholds, suspension durations). These can silently drift as laws change.

### Risk
Accuracy drift + credibility risk (numbers appear authoritative even when outdated).

### Desired Outcome
For each visual that includes hard numbers:
- Either remove the numeric claim, or
- Add explicit adjacent citations + “Last verified”, or
- Ensure the numbers are sourced in the post’s `sources` and governed by the verification SOP.

### Acceptance Criteria
- No numeric visual remains without sources + last verified (or explicit removal).

### Resolution notes
- Implemented in PR #22 by removing hard-coded numeric claims from the riskiest visuals and adding per-post sources + last verified.

---

## TICKET-019: Content Tracking — P0 Batch 1 (5 Slugs)

**Priority:** High  
**Status:** Open  
**Date Created:** 2025-12-14  
**Assigned To:** TBD

### Scope (slugs)
- `understanding-ovi-dui-charges-ohio`
- `refuse-field-sobriety-test-ohio`
- `drug-possession-vs-trafficking-ohio`
- `motion-practice-criminal-defense`
- `assault-domestic-violence-defense-ohio`

### Acceptance Criteria (per slug)
- Remove absolutes and add “What varies…” section(s) where needed.
- Add `lastVerified` + credible sources; reconcile any numeric claims to sources.

---

## TICKET-020: Content Tracking — P1 Batch 2 (5 Slugs)

**Priority:** Medium  
**Status:** Open  
**Date Created:** 2025-12-14  
**Assigned To:** TBD

### Scope (slugs)
- `ohio-dui-lookback-period`
- `ohio-dui-checkpoint-hotspots`
- `white-collar-crime-defense-ohio`
- `ohio-weapons-charges-ccw-defense`
- `sex-crimes-defense-ohio-what-you-need-to-know`

### Acceptance Criteria (per slug)
- Add `lastVerified` + credible sources; avoid unsourced numbers.
- Add county/court variation notes where relevant.
- Avoid “hotspot” framing; keep tone conservative and rights-focused.

---

## TICKET-021: Desktop UX — Mega Menu Panel Centering

**Priority:** Medium  
**Status:** Closed  
**Date Created:** 2025-12-14  
**Assigned To:** TBD

### Issue Summary
On desktop, the mega menu dropdown panel is positioned relative to the trigger, causing it to feel visually off-center compared to the header container.

### Desired Outcome
Center the dropdown panel to the site header container (not viewport; not trigger) while keeping the internal columns left-aligned.

### Acceptance Criteria
- Desktop panel feels centered/balanced; mobile behavior unchanged.

### Resolution notes
- Implemented in PR #18 (center panel to header container).

---

## TICKET-022: Blog UX — Move Checkpoint CTA Bar Content Into “About Data” Card

**Priority:** Medium  
**Status:** Closed  
**Date Created:** 2025-12-14  
**Assigned To:** TBD

### Issue Summary
On the DUI checkpoint-related blog post layout, a thin top bar shows a checkpoint CTA (“Stopped at a checkpoint? Need help now?”) alongside the phone number and “Free consult” button. This is visually separated from (and competes with) the “About Ohio DUI Checkpoint Data” card immediately below.

### Desired Outcome
Move the CTA headline + phone number + consult button + any supporting copy currently shown in the top bar into the “About Ohio DUI Checkpoint Data” content card (just underneath it), so all checkpoint-specific context and calls-to-action are consolidated in one place.

### Acceptance Criteria
- The top bar no longer renders this checkpoint-specific CTA/phone/consult block for the affected layout.
- The “About Ohio DUI Checkpoint Data” card includes the CTA headline + phone number + consult button content in a cohesive layout.
- Mobile and desktop layout remain clean (no crowding; buttons remain tappable).
- No CLS regression on initial render.

### Resolution notes
- Implemented in PR #19 for `/resources/dui-checkpoints` (moved call/consult CTAs into the “About Ohio DUI Checkpoint Data” card).

---

## Collaboration Notes (Codex / Agents)

**Goal:** keep the repo moving without requiring the site owner to use terminal or GitHub UI for routine work.

**Rules**
- One branch per ticket/intent (e.g., `codex/fix-schema-legalservice`).
- One agent per branch at a time.
- If a PR hits merge conflicts, the agent that owns the branch resolves and re-pushes (owner should not be required to do conflict resolution).
- Prefer branch → PR → merge-on-green CI. If PR automation is unavailable, agents may merge via git CLI (no GitHub UI) after tests pass; the owner should only need to click “Publish” in Bolt after confirmation.

**Before pushing**
- Run the project checks (`npm ci`, `npm test`, `npm run build`; lint if/when available).
- Include PR notes: Summary, Changes, Testing, Risk & rollback.
