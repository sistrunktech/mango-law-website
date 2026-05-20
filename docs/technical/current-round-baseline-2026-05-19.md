# Current Round Baseline and Follow-Through

Date prepared: 2026-05-19
Last updated: 2026-05-20
Owner: Sistrunk Tech internal
Client: Mango Law

## Scope Covered

This baseline covers the approved and pushed work from the current conversation, plus the new support content added in this round.

### Merged and live before this content follow-through

- PR #142 / `a9f0797`: summer checkpoint announcements and verified Ohio OVI checkpoint updates.
- PR #143 / `1f0539b`: checkpoint conversion hardening, public map/list fallback, and the after-stop checklist post.
- PR #144 / `ae59ea5`: homepage/blog discovery, blog pillar routing, category-aware CTAs, consumer UX fixes, phone labeling, and checkpoint map trust improvements.
- Phone source of truth: `(740) 602-2155` is the primary public call/text line; `(740) 417-6191` is the secondary office line only where intentionally labeled.

### Merged and live in this content follow-through

- PR #145 / `894ca50`: no-contact bond terms guide, DV/protection internal routing, generated image, SEO override, and benchmark documentation.
- PR #147 / `34d07ec`: CDL and out-of-state driver OVI guide.
- PR #148 / `7abb92b`: summons vs. arrest guide, criminal-defense internal routing, generated image, SEO override, and benchmark documentation.
- PR #149 / pending from this final pass: tracked May 20 client one-sheet, email preview, internal executive report, and final benchmark reconciliation.
- New post: `/blog/no-contact-bond-terms-domestic-violence-ohio`
- New post: `/blog/cdl-out-of-state-driver-ovi-ohio`
- New post: `/blog/summons-vs-arrest-delaware-county-ohio`
- New image: `/images/generated/blog-no-contact-bond-terms-domestic-violence-ohio.png`
- New image: `/images/generated/blog-cdl-out-of-state-driver-ovi-ohio.png`
- New image: `/images/generated/blog-summons-vs-arrest-delaware-county-ohio.png`
- Blog SEO overrides for the new support posts.
- OVI/CDL support routing from the OVI pillar and related-post surfaces.
- Criminal-defense issue-path, related-post, CTA, owner-page, and glossary support for the summons/arrest post.
- DV/protection cluster links from:
  - blog issue paths,
  - related-post selection,
  - category-aware blog CTAs,
  - domestic violence owner-page related guides,
  - protection-order owner-page related guides,
  - domestic support-link data.
- Current-round verification notes: production-mode local build and HTTP smoke checks passed for the baseline URL set; the in-app browser was unavailable in this Codex session and Chromium/Puppeteer crashed before screenshots, so rendered browser screenshots remain a follow-up verification item after deployment/CI.
- Post-deploy live smoke on 2026-05-20 confirmed `200` responses and expected content on `/`, `/blog`, `/blog/no-contact-bond-terms-domestic-violence-ohio`, `/blog/cdl-out-of-state-driver-ovi-ohio`, `/blog/summons-vs-arrest-delaware-county-ohio`, `/criminal-defense-delaware-oh`, `/blog/delaware-county-criminal-case-timeline`, `/resources/dui-checkpoints`, and `/contact`.

### Report Artifacts

- Client one-sheet: `docs/reports/mango-law-local-search-one-sheet-2026-05-20.html`
- Client email preview: `docs/reports/mango-law-local-search-one-sheet-email-preview-2026-05-20.md`
- Internal executive report: `docs/reports/mango-law-internal-executive-status-report-2026-05-20.html`

## Checkpoint Freshness Pass

Last checked: 2026-05-19.

- New search pass looked for Memorial Day, Dublin/Memorial Tournament, and other near-term Ohio checkpoint announcements.
- The new near-term checkpoint notice found in that pass was Stark County / Memorial Day weekend / May 23, 2026. That notice is already represented in the approved checkpoint scraper curated seeds as two confirmed Stark County May 23 rows and is covered by `test/checkpointCuratedAnnouncements.test.ts` and `test/checkpointAnnouncementMapMarkers.test.ts`.
- No specific Dublin/Memorial Tournament OVI checkpoint announcement was found in the current search pass. Event context remains relevant because the Memorial Tournament is scheduled for June 1-7, 2026 at Muirfield Village in Dublin.
- Local production HTTP smoke confirmed `/resources/dui-checkpoints` returns `200`, shows `Last refreshed`, and keeps the primary call/text CTA visible. A direct local Supabase read was attempted, but DNS resolution for the production Supabase host failed from this machine; production/Vercel data availability should be rechecked after deploy.

Reference URLs from the checkpoint freshness pass:

- `https://www.cleveland19.com/2026/05/16/stark-county-sheriff-conduct-ovi-checkpoints-during-memorial-day-weekend/`
- `https://www.visitdublinohio.com/events/memorial-tournament/`
- `https://www.thememorialtournament.com/`

## Baseline URLs

Watch these as the current round's measurement set.

### Conversion and discovery surfaces

- `https://mango.law/`
- `https://mango.law/blog`
- `https://mango.law/contact`
- `https://mango.law/resources/dui-checkpoints`

### OVI / checkpoint cluster

- `https://mango.law/blog/what-to-do-after-dui-checkpoint-stop-ohio`
- `https://mango.law/blog/ohio-dui-checkpoint-hotspots`
- `https://mango.law/blog/cdl-out-of-state-driver-ovi-ohio`
- `https://mango.law/ovi-dui-defense-delaware-oh`
- `https://mango.law/first-offense-ovi-ohio`
- `https://mango.law/als-license-suspension-ohio`
- `https://mango.law/motion-to-suppress-ovi-ohio`

### Domestic violence / protection cluster

- `https://mango.law/blog/no-contact-bond-terms-domestic-violence-ohio`
- `https://mango.law/blog/domestic-violence-arrest-delaware-county-ohio`
- `https://mango.law/blog/no-contact-order-vs-civil-protection-order-ohio`
- `https://mango.law/blog/civil-protection-order-hearing-delaware-county-ohio`
- `https://mango.law/domestic-violence-lawyer-delaware-oh`
- `https://mango.law/protection-order-lawyer-delaware-oh`
- `https://mango.law/civil-protection-order-defense-ohio`

### Criminal-defense cluster

- `https://mango.law/blog/summons-vs-arrest-delaware-county-ohio`
- `https://mango.law/blog/delaware-county-criminal-case-timeline`
- `https://mango.law/blog/bond-jail-information-delaware-county-ohio`
- `https://mango.law/blog/ohio-misdemeanor-vs-felony-charges-delaware-county`
- `https://mango.law/criminal-defense-delaware-oh`

## Current Known Performance Baseline

The most recent full cross-tool baseline in the repo is `docs/technical/seo-aeo-round-2026-05-03/monthly-report-live-trend-memo-2026-05-04.md`.

### GSC, last validated 2026-05-04

- Last 28 days: 78 clicks, 3.11K impressions, 2.5% CTR, average position 32.4.
- `/resources/dui-checkpoints`: 23 clicks and 1,008 impressions in the last 28 days.
- Checkpoint discovery queries were already visible, including DUI checkpoint tonight variants.

The latest prepared client one-sheet uses the newer GSC snapshot from the May 18 reporting pass:

- Last 28 days: 238 clicks, up 367% from the prior 28-day period.
- Impressions: 9,576, up 264%.
- Average organic position: 9.8, improved from 35.6.
- `/resources/dui-checkpoints`: 172 clicks and 5,967 impressions in the last 28 days.

### GA4, last validated 2026-05-04

- Last 30 days: 19 active users, 152 events, 16 new users, 0 key events.
- Boundary: lead-path event plumbing was validated, but real GA4 key events were not yet showing in the reporting surface.

### BrightLocal, last validated 2026-05-04

- GBP scheduler: 18 posts total, 10 live, 8 scheduled, 0 expired, 0 rejected.
- Rank tracker export: 196 rows, 49 unique exported keyword labels, 37 ranked rows.
- Strongest positions were primarily Google Places and Bing for Delaware OVI/criminal-defense terms.

### Ahrefs, last validated 2026-05-04/05

- Health Score: 99.
- Domain Rating: 0.
- Referring domains: 36-37 range.
- Organic keywords: 2, both tied to `/resources/dui-checkpoints`.
- Ahrefs Rank Tracker was not available on the current plan.

### Current API/export boundary, checked 2026-05-20

- Live site deployment and HTTP/content checks were completed directly against production.
- Local GSC, GA4, BrightLocal, and Ahrefs API pulls were not run in this worktree because the required credentials or exports are not present in the local environment.
- The benchmark set is still ready for a 10-day comparison as soon as Search Console/GA4 data has time to populate and BrightLocal/Ahrefs exports are available.

## 10-Day Measurement Plan

Use lightweight checks daily and deeper tool pulls only when useful.

### Daily quick checks

- Live HTTP 200 for all baseline URLs added or touched in this round.
- Homepage and blog roll still surface the checkpoint and DV/protection support paths.
- Checkpoint map shows `Last refreshed`, filters obvious non-Ohio noise, and either renders map UI or a list fallback.
- Primary phone remains `(740) 602-2155`; secondary office line remains `(740) 417-6191` only where intentionally labeled.

### GSC checks

Use GSC if credentials are available and there is enough time for data to populate:

- Inspect new and recently changed URLs after deployment.
- Submit sitemap if the new URL is live and the script has credentials.
- Compare 10-day search performance for the baseline URL set against the prior 10 days.
- Watch impressions first, clicks second, CTR only after meaningful impressions accrue.

### GA4 checks

Use GA4 only for directional conversion signals:

- page_view and user_engagement on new/support URLs,
- click / cta_click events for primary phone and form surfaces,
- generate_lead or configured key-event equivalents,
- no conversion claim unless real lead-path events appear.

### BrightLocal checks

Use BrightLocal when a rank export is available:

- DV/protection terms: domestic violence lawyer Delaware Ohio, no-contact order Ohio, protection order lawyer Delaware Ohio, civil protection order lawyer Delaware Ohio.
- OVI/checkpoint terms: Ohio DUI checkpoints tonight, DUI checkpoints Ohio tonight, Delaware Ohio OVI lawyer, Delaware County Ohio OVI lawyer.
- Treat Places movement separately from organic movement.

### Ahrefs checks

Use Ahrefs when a crawl/export is available:

- Site Audit health and errors after new content deploy.
- Top pages and organic keywords for checkpoint and DV/protection URLs.
- Metadata/schema warnings for new post.
- Do not expect rank tracker data unless the plan changes.

## Success Signals by 2026-05-29

- New no-contact bond, CDL/out-of-state OVI, and summons-vs-arrest posts are live, indexed or submitted for indexing, and internally linked from their pillar surfaces.
- Checkpoint cluster continues to hold live map/list trust state and visible after-stop paths.
- GSC starts showing impressions for the new DV/protection support URL or adjacent DV/protection queries.
- GA4 shows at least page_view/user_engagement for new and touched URLs; conversion claims remain conservative unless real lead events appear.
- No regression in build, structured data, content governance, sitemap, or live HTTP checks.

## Follow-Up Content Queue

After this round, the next scoped pieces remain:

1. CDL or out-of-state driver charged with OVI in Ohio. Completed in follow-up branch on 2026-05-19 as `/blog/cdl-out-of-state-driver-ovi-ohio`.
2. Summons vs. arrest in Delaware County. Completed in follow-up branch on 2026-05-20 as `/blog/summons-vs-arrest-delaware-county-ohio`.
3. Lab testing and chain of custody in Ohio drug possession cases.
4. What to do if police contact you about a sex-offense investigation in Ohio.
