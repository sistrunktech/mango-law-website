# Current Round Baseline and Follow-Through

Date prepared: 2026-05-19
Owner: Sistrunk Tech internal
Client: Mango Law

## Scope Covered

This baseline covers the approved and pushed work from the current conversation, plus the new support content added in this round.

### Already merged and live before this branch

- PR #142 / `a9f0797`: summer checkpoint announcements and verified Ohio OVI checkpoint updates.
- PR #143 / `1f0539b`: checkpoint conversion hardening, public map/list fallback, and the after-stop checklist post.
- PR #144 / `ae59ea5`: homepage/blog discovery, blog pillar routing, category-aware CTAs, consumer UX fixes, phone labeling, and checkpoint map trust improvements.
- Phone source of truth: `(740) 602-2155` is the primary public call/text line; `(740) 417-6191` is the secondary office line only where intentionally labeled.

### Added in this branch

- New post: `/blog/no-contact-bond-terms-domestic-violence-ohio`
- New image: `/images/generated/blog-no-contact-bond-terms-domestic-violence-ohio.png`
- Blog SEO override for the new post.
- DV/protection cluster links from:
  - blog issue paths,
  - related-post selection,
  - category-aware blog CTAs,
  - domestic violence owner-page related guides,
  - protection-order owner-page related guides,
  - domestic support-link data.
- Current-round verification notes: production-mode local build and HTTP smoke checks passed for the baseline URL set; the in-app browser was unavailable in this Codex session and Chromium/Puppeteer crashed before screenshots, so rendered browser screenshots remain a follow-up verification item after deployment/CI.

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

## Current Known Performance Baseline

The most recent full cross-tool baseline in the repo is `docs/technical/seo-aeo-round-2026-05-03/monthly-report-live-trend-memo-2026-05-04.md`.

### GSC, last validated 2026-05-04

- Last 28 days: 78 clicks, 3.11K impressions, 2.5% CTR, average position 32.4.
- `/resources/dui-checkpoints`: 23 clicks and 1,008 impressions in the last 28 days.
- Checkpoint discovery queries were already visible, including DUI checkpoint tonight variants.

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

- New no-contact bond post is live, indexed or submitted for indexing, and internally linked from DV/protection surfaces.
- Checkpoint cluster continues to hold live map/list trust state and visible after-stop paths.
- GSC starts showing impressions for the new DV/protection support URL or adjacent DV/protection queries.
- GA4 shows at least page_view/user_engagement for new and touched URLs; conversion claims remain conservative unless real lead events appear.
- No regression in build, structured data, content governance, sitemap, or live HTTP checks.

## Follow-Up Content Queue

After this post, the next scoped pieces remain:

1. CDL or out-of-state driver charged with OVI in Ohio. Completed in follow-up branch on 2026-05-19 as `/blog/cdl-out-of-state-driver-ovi-ohio`.
2. Summons vs. arrest in Delaware County.
3. Lab testing and chain of custody in Ohio drug possession cases.
4. What to do if police contact you about a sex-offense investigation in Ohio.
