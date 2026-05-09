# Admin Execution Status

Date: 2026-05-03

## Production QA

- `https://mango.law/blog/civil-protection-order-hearing-delaware-county-ohio` returned `200`.
- `https://mango.law/blog/drug-possession-in-car-ohio` returned `200`.
- Both generated blog images returned `200`.
- Owner/support routes for protection orders, drug crimes, domestic violence, and CPO defense returned `200`.
- `https://mango.law/sitemap.xml` returned `200` and contains both new post URLs.

## BrightLocal

- Exported the current Mango Law Rank Tracker CSV from BrightLocal.
- Current export before edit had 49 unique tracked keywords.
- Added `delaware county criminal defense attorney`, bringing the UI to `50/50 keywords`.
- Corrected the Rank Tracker name-tracking phone to `+1 740-417-6191`.
- Did not remove/replace existing tracker terms. Full 50-keyword replacement would remove existing tracker terms/history and needs action-time confirmation.
- Remaining NAP issue: the connected GBP card inside BrightLocal still shows `+1 740-602-2155`.

## Search Console

- Inspected both new post URLs in the `mango.law` domain property.
- Both show `URL is not on Google` and `Page is not indexed: URL is unknown to Google`.
- Request-indexing controls are available.
- Request indexing was not clicked because it submits crawl requests to Google and needs action-time confirmation.

## Checkpoints

- Fresh public-source checks still did not find exact mappable time/location details for Solon or Summit County May 5, 2026 checkpoints.
- The existing Solon/Summit monitor remains the right path: keep pending rows pending until exact time windows and street-level or mappable locations publish.

## 2026-05-09 Follow-Up

- Production has been redeployed and `https://mango.law/sitemap.xml` now returns `200` with 59 URLs, including the previously blocked May blog routes.
- The nine blog URLs that were pending because production returned `404` are now live; GSC API follow-up shows those rows are indexed or do not need a new request.
- Browser GSC requests submitted on 2026-05-09:
  - `https://mango.law/blog/no-contact-order-vs-civil-protection-order-ohio`
  - `https://mango.law/blog/ohio-dui-checkpoint-hotspots`
  - `https://mango.law/protection-order-lawyer-delaware-oh`
  - `https://mango.law/sex-crime-defense-lawyer-delaware-oh`
- Browser GSC request not confirmed:
  - `https://mango.law/white-collar-crimes-attorney-delaware-oh` was opened for the next request, but the browser changed focus before a Search Console confirmation was observed. Treat it as pending until the 2026-05-16 recheck or the next browser-owned pass.
- Low-value unknown URL skipped:
  - `https://mango.law/privacy` remains low SEO value and was not submitted.
- Detailed row-level status lives in `gsc-indexing-submission-log.csv`; broader queue and reporting-overhaul notes live in `seo-ops-hardening-and-next-queue-2026-05-09.md`.
