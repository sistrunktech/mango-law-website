# GSC / Indexing Remediation Run

Date: 2026-02-11  
Primary canonical domain: `https://mango.law`  
GSC properties in scope:
- Domain: `sc-domain:mango.law`
- URL-prefix: `https://mango.law/`

## 1) Baseline (from latest captured GSC evidence)

Reference snapshot: `docs/audits/gsc-2026-01-27/REPORT.md` (historical baseline only).

Top not-indexed buckets and representative URLs:
- `Discovered - currently not indexed` (29): `/blog`, `/blog/ohio-dui-lookback-period`, `/blog/bond-jail-information-delaware-county-ohio`
- `Crawled - currently not indexed` (1): `/blog/motion-practice-criminal-defense`
- `Server error (5xx)` (2): `/about`, `/criminal-defense-delaware-oh`
- `Blocked due to access forbidden (403)` (1): `https://api.mango.law/` (domain property)
- `Page with redirect` (1): `http://mango.law/` (domain property)

Classification:
- Intentional/expected:
  - `Page with redirect` for `http://mango.law/` (HTTP to HTTPS canonicalization)
- Legacy URL to redirect (implemented in this run):
  - `/dui-checkpoints`, `/checkpoints`, `/criminal-defense`, `/practice-area`, `/blog/ohio-dui-look-back-period`, `/blog/understanding-ovi-dui-charges`, and related aliases
- Broken internal link/content issue:
  - Not confirmed in this run (no direct internal link source captured for the legacy aliases)
- Platform/app behavior outside marketing-site scope:
  - `api.mango.law` host behavior appears platform-level and independent from marketing app routes

## 2) Changes implemented

### Canonical / host normalization and redirect hygiene
- Added Next.js redirect rules in `next.config.mjs`:
  - enforce `www` host to apex (`https://mango.law/:path*`)
  - enforce HTTP to HTTPS using forwarded protocol header
  - permanent redirects for legacy noisy URLs to current canonical routes

### Robots + sitemap consistency
- Updated `src/app/robots.ts`:
  - added `Disallow: /handoff-preview/` to avoid private/share preview crawl
- Updated `src/app/sitemap.ts`:
  - added missing canonical page `/domestic-violence-lawyer-delaware-oh`

### Repeatable validation utility
- Added `scripts/check-indexing-surface.sh`
- Added npm command: `npm run seo:smoke`

## 3) Post-deploy live validation (production)

Production alias completed to `https://mango.law` after deployment.

Validated:
- Canonical domain behavior
  - `http://mango.law/` -> `308` -> `https://mango.law/`
  - `https://www.mango.law/` -> redirect -> `https://mango.law/`
- Key canonical pages: `200` on `/about`, `/privacy`, `/locations`
- Legacy URLs now permanently redirect:
  - `/dui-checkpoints` -> `/resources/dui-checkpoints`
  - `/criminal-defense` -> `/criminal-defense-delaware-oh`
  - `/practice-area` -> `/practice-areas`
  - `/blog/ohio-dui-look-back-period` -> `/blog/ohio-dui-lookback-period`
  - `/blog/understanding-ovi-dui-charges` -> `/blog/understanding-ovi-dui-charges-ohio`
- True missing URL behavior:
  - `/non-existent-404-check-20260211` returns `404` (no soft-404 fallback)
- Robots:
  - `https://mango.law/robots.txt` returns `200` with sitemap reference to `https://mango.law/sitemap.xml`
- Sitemap:
  - `https://mango.law/sitemap.xml` returns `200` XML and includes canonical apex URLs including `/domestic-violence-lawyer-delaware-oh`
- Canonical tag consistency:
  - self-referencing apex canonical + `og:url` verified on `/`, `/locations`, `/privacy`

## 4) What is fixed now vs pending recrawl

Fixed now (server behavior):
- Redirect/canonical normalization and legacy redirect mapping are live.
- robots/sitemap consistency updates are live.
- 404 behavior remains correct.

Pending Google recrawl/reprocessing:
- GSC bucket reductions for historical exclusions.
- Reclassification/clearance of any stale `5xx` or `URL unknown` observations once Google recrawls.

## 5) Risks / dependencies

- GSC reporting is asynchronous; count deltas can lag live fixes by days/weeks.
- `api.mango.law` indexing behavior depends on platform-level response/robots controls outside this app repo.

## 6) Recheck cadence (required)

Schedule:
- Mondays and Fridays, local timezone.

Each report must include:
- Bucket deltas vs prior check
- Newly surfaced URLs
- Resolved URLs
- Next corrective actions

Stop condition:
- Expected/stable state with no unexpected regressions for at least 2 consecutive rechecks.
