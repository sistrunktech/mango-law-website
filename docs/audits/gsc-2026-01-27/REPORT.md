# Google Search Console Audit — Mango Law

Audit date: **January 27, 2026**

Properties audited (both):
- **Domain**: `sc-domain:mango.law`
- **URL-prefix**: `https://mango.law/`

## A) Executive summary

Across both Search Console properties, the site is **sitemap-submitted and error-free at the sitemap level**, but **indexing coverage is low** relative to discovered URLs. The URL-prefix property reports **6 indexed / 32 not indexed**, and the domain property reports **6 indexed / 34 not indexed** (last update shown as **1/23/26** on both properties).

The dominant bottleneck appears to be **discovery → crawl scheduling → indexing** rather than technical blocking: the top exclusion is **“Discovered – currently not indexed” (29 URLs)** in both properties, and multiple “not on Google / URL unknown to Google” URLs pass **Live Test (“URL is available to Google”)**. There are also **2 URLs with Server error (5xx)** in the URL-prefix property, which should be treated as a P0 because they can stall crawling/indexing signals.

## B) Property parity findings (domain vs URL-prefix)

**Both properties exist and are accessible** (screenshots in attachments).

**Coverage parity (high-level):**
- URL-prefix Pages summary: **6 indexed / 32 not indexed** (3 reasons).
- Domain Pages summary: **6 indexed / 34 not indexed** (5 reasons).
- The domain property includes additional non-indexed reasons not present in the URL-prefix property totals:
  - **Blocked due to access forbidden (403)**: 1 URL (example shows `https://api.mango.law/`).
  - **Page with redirect**: 1 URL (example shows `http://mango.law/` → redirect).

**Risk/implication:**
- The domain property will surface **subdomain + protocol variants** (e.g., `api.mango.law`, `http://mango.law`) that the URL-prefix property cannot. These can create noise in coverage reporting, but also reveal real crawl waste (e.g., bots spending cycles on 403 endpoints).

**Preferred host / scheme (observed on Jan 27, 2026):**
- `https://www.mango.law` redirects to `https://mango.law/` (non-`www` preferred).
- `http://mango.law` redirects to `https://mango.law/` (HTTPS preferred).
- The homepage `<link rel="canonical">` is `https://mango.law` (no trailing slash).

## C) Sitemap status findings (include discovered vs submitted counts)

**URL-prefix property (`https://mango.law/`)**
- Submitted sitemap: `https://mango.law/sitemap.xml`
- Status: **Success**
- Submitted: **Dec 13, 2025**
- Last read: **Jan 24, 2026**
- Discovered pages: **38**

**Domain property (`sc-domain:mango.law`)**
- Submitted sitemap: `https://mango.law/sitemap.xml`
- Status: **Success**
- Submitted: **Dec 13, 2025**
- Last read: **Jan 24, 2026**
- Discovered pages: **38**

**Sitemap contents (fetched on Jan 27, 2026):**
- `https://mango.law/sitemap.xml` currently contains **39 URLs** (Search Console “Discovered pages” shows **38** as of last read **Jan 24, 2026** — likely due to last-read timing and/or de-duplication).
- Blog coverage is present: **17** sitemap URLs contain `/blog`.
- Example URLs from the sitemap:
  - Core: `https://mango.law`, `https://mango.law/about`, `https://mango.law/practice-areas`, `https://mango.law/contact`, `https://mango.law/reviews`
  - Intent/practice: `https://mango.law/ovi-dui-defense-delaware-oh`, `https://mango.law/criminal-defense-delaware-oh`
  - Blog: `https://mango.law/blog`, `https://mango.law/blog/motion-practice-criminal-defense`, `https://mango.law/blog/ohio-dui-lookback-period`

**Notable observation:**
- In URL Inspection, some pages show **“Sitemaps: No referring sitemaps detected”** while also showing a **Referring page** of `https://mango.law/sitemap.xml` (e.g., homepage/contact). Treat “Referring sitemaps detected” as informational rather than authoritative.

## D) Indexing findings

### Indexing counts

**URL-prefix property**
- Indexed: **6**
- Not indexed: **32**
- Reasons observed (top shown in screenshots):
  - **Discovered – currently not indexed**: 29
  - **Crawled – currently not indexed**: 1
  - **Server error (5xx)**: 2

**Domain property**
- Indexed: **6**
- Not indexed: **34**
- Reasons observed (top shown in screenshots):
  - **Discovered – currently not indexed**: 29 (validation started **1/26/26**)
  - **Crawled – currently not indexed**: 1 (validation started **1/26/26**)
  - **Server error (5xx)**: 2
  - **Blocked due to access forbidden (403)**: 1 (`https://api.mango.law/`, last crawled shown as **Jan 17, 2026**)
  - **Page with redirect**: 1 (`http://mango.law/`, last crawled shown as **Jan 21, 2026**)

### Example URLs per “Not indexed” reason (from GSC)

**URL-prefix property examples**
- **Server error (5xx)**: `https://mango.law/about` (last crawled **Jan 14, 2026**), `https://mango.law/criminal-defense-delaware-oh` (last crawled **Dec 15, 2025**).
- **Crawled – currently not indexed**: `https://mango.law/blog/motion-practice-criminal-defense` (last crawled **Jan 18, 2026**).
- **Discovered – currently not indexed** (examples; “Last crawled” shown as N/A in the list): `https://mango.law/blog`, `https://mango.law/blog/ohio-dui-lookback-period`, `https://mango.law/blog/bond-jail-information-delaware-county-ohio`, `https://mango.law/blog/holiday-ovi-enforcement-ohio-delaware-dublin-columbus`, `https://mango.law/blog/refuse-field-sobriety-test-ohio`.

**Domain property examples**
- **Server error (5xx)**: `https://mango.law/about` (last crawled **Jan 14, 2026**), `https://mango.law/criminal-defense-delaware-oh` (last crawled **Dec 15, 2025**).
- **Blocked due to access forbidden (403)**: `https://api.mango.law/` (last crawled **Jan 17, 2026**).
- **Page with redirect**: `http://mango.law/` (last crawled **Jan 21, 2026**).
- **Crawled – currently not indexed**: `https://mango.law/blog/motion-practice-criminal-defense` (last crawled **Jan 18, 2026**).
- **Discovered – currently not indexed**: same pattern as URL-prefix (examples list shows many blog URLs with “Last crawled” shown as N/A).

### What the top exclusions likely mean

- **Discovered – currently not indexed (29)**: Google knows these URLs exist (from sitemap and/or internal discovery), but hasn’t crawled and/or decided to index them yet. For newer/smaller sites this often reflects **crawl prioritization**, **internal link strength**, and **overall site trust** rather than a single technical blocker.
- **URL is unknown to Google** in URL Inspection for multiple important pages (e.g., `/locations`, `/privacy`, `/terms`, `/ovi-dui-defense-delaware-oh`, and the blog post `/blog/ohio-dui-lookback-period`) suggests **weak internal discovery signals or insufficient crawl prioritization** despite sitemap submission.
- `/reviews` is a good example of state transition: it was captured once as **URL unknown** and later as **indexed** on the same day (see the two `/reviews` overview screenshots in attachments).
- **Server error (5xx) (2 URLs)**: Google has encountered server failures on these URLs; repeated 5xx responses can suppress crawl frequency and delay indexing.
- **403 for `api.mango.law` (domain property only)**: Googlebot is attempting to crawl this host; if it’s not intended for indexing, consider preventing discovery (or explicitly disallow in robots) to reduce crawl waste.
- **Page with redirect (`http://mango.law/`)**: Normal if HTTP is redirecting to HTTPS, but it indicates Google still discovers/crawls the old scheme; ensure canonical and internal links always point to HTTPS to minimize this over time.

### Suspected primary bottleneck

**Primary bottleneck: crawl/index prioritization** (discovery is present via sitemap, but Google frequently treats key URLs as unknown/not on Google, while Live Test shows they are fetchable and indexable).

**Secondary bottleneck: intermittent server errors (5xx)** for a small set of URLs.

## E) URL Inspection table

Notes:
- Property used for inspection: **URL-prefix** (`https://mango.law/`).
- Page Title, H1, and user canonical were captured by fetching each URL and extracting the first `<title>`, first `<h1>`, and `<link rel="canonical">`.
- “Live test result” is based on the **LIVE TEST** tab screenshots.
- “Indexing allowed?”, “Crawl allowed?”, and Google-selected canonical are only filled when they were visible in captured GSC panels. Otherwise, they are marked as **(not captured)**.

| URL | Page title | H1 | On Google? | Indexing allowed? | Crawl allowed? | Canonical (user vs Google) | Live test result | Notes / recommended action |
|---|---|---|---|---|---|---|---|---|
| https://mango.law/ | Criminal Defense & OVI Attorney Delaware, OH \| Mango Law | Arrested? Get Clear Next Steps Today. | Yes | Yes | Yes | User: `https://mango.law` (Google canonical not captured) | URL is available to Google | Requested indexing on **Jan 27, 2026**. |
| https://mango.law/about | About Dominic Mango \| Criminal Defense Attorney Delaware, OH \| Mango Law | Dominic Mango — focused on clear, assertive defense in Delaware, Ohio. | Yes | Yes | Yes | User: `https://mango.law/about` (Google canonical not captured) | URL is available to Google | Indexed; monitor for crawl consistency. |
| https://mango.law/contact | Contact Mango Law LLC \| Delaware, OH Criminal Defense Attorney \| Mango Law | Schedule a consult with Mango Law. | Yes | Yes | Yes | User: `https://mango.law/contact` (Google canonical not captured) | URL is available to Google | Indexed. |
| https://mango.law/reviews | Client Reviews \| Mango Law | What clients say about working with Mango Law. | Yes (indexed as of 10:47 AM; earlier capture showed “URL unknown”) | (not captured) | (not captured) | User: `https://mango.law/reviews` (Google canonical not captured) | URL is available to Google | Monitor: this page flipped states on Jan 27, 2026; suggests crawl/indexing churn. |
| https://mango.law/practice-areas | Criminal Defense Practice Areas \| Mango Law | Focused on criminal defense and OVI in Delaware, Ohio. | Yes | (not captured) | (not captured) | User: `https://mango.law/practice-areas` (Google canonical not captured) | URL is available to Google | Indexed. |
| https://mango.law/locations | Areas We Serve \| Criminal Defense Attorney in Delaware & Franklin Counties, Ohio \| Mango Law | Areas We Serve in Central Ohio | No (“URL unknown”) | (not captured) | (not captured) | User: `https://mango.law/locations` (Google canonical not captured) | URL is available to Google | Requested indexing on **Jan 27, 2026** (confirmation modal captured). |
| https://mango.law/privacy | Privacy Policy \| Ohio Criminal Defense Attorney - Mango Law LLC \| Mango Law | Privacy Policy | No (“URL unknown”) | (not captured) | (not captured) | User: `https://mango.law/privacy` (Google canonical not captured) | URL is available to Google | Live test passes; candidate for stronger internal linking. |
| https://mango.law/terms | Terms of Use \| Mango Law - Ohio Criminal Defense | Terms of Use | No (“URL unknown”) | (not captured) | (not captured) | User: `https://mango.law/terms` (Google canonical not captured) | URL is available to Google | Live test passes; candidate for stronger internal linking. |
| https://mango.law/blog | Mango Law Blog \| Legal Insights & Ohio Criminal Defense Updates \| Mango Law | Legal insights and updates | Yes | (not captured) | (not captured) | User: `https://mango.law/blog` (Google canonical not captured) | URL is available to Google | Indexed; use as hub to improve discovery of posts. |
| https://mango.law/delaware-ohio-ovi-lawyer | Delaware Ohio OVI Lawyer - Local Defense \| Mango Law | OVI defense built for Delaware County courts | Yes | (not captured) | (not captured) | User: `https://mango.law/delaware-ohio-ovi-lawyer` (Google canonical not captured) | URL is available to Google | Indexed; keep it strongly internally linked. |
| https://mango.law/ovi-dui-defense-delaware-oh | OVI/DUI Defense Lawyer Delaware, OH \| Mango Law | OVI and DUI defense with targeted motion practice and local insight | No (“URL unknown”) | (not captured) | (not captured) | User: `https://mango.law/ovi-dui-defense-delaware-oh` (Google canonical not captured) | URL is available to Google | High-value intent page; good candidate for stronger internal linking and a future request-indexing run if still “URL unknown”. |
| https://mango.law/blog/motion-practice-criminal-defense | The Power of Motion Practice in Criminal Defense \| Mango Law Blog | The Power of Motion Practice in Criminal Defense | Yes | (not captured) | (not captured) | User: `https://mango.law/blog/motion-practice-criminal-defense` (Google canonical not captured) | URL is available to Google | Indexed blog post. |
| https://mango.law/blog/ohio-dui-lookback-period | Ohio DUI Lookback Period: How Prior Convictions Can Affect Your Case \| Mango Law Blog | Ohio DUI Lookback Period: How Prior Convictions Can Affect Your Case | No (“URL unknown”) | (not captured) | (not captured) | User: `https://mango.law/blog/ohio-dui-lookback-period` (Google canonical not captured) | URL is available to Google | Live test passes; candidate for stronger internal linking and a future request-indexing run. |

Indexing requests submitted during this audit (Jan 27, 2026):
- `https://mango.law/` (before: `gsc-urlinspect-home-overview.png`; confirmation: `gsc-urlinspect-home-request-indexing.png`; post-state: `gsc-urlinspect-home-request-indexing-done.png`)
- `https://mango.law/locations` (before: `gsc-urlinspect-locations-overview.png`; confirmation: `gsc-urlinspect-locations-request-indexing.png`)

## F) Priority actions (ranked P0/P1/P2)

**P0 (do first)**
- Fix and verify the **2 Server error (5xx)** URLs shown in Search Console (URL-prefix property). After fixing, use “Validate fix” in GSC for that issue set.
- Reduce “URL unknown to Google” for key pages by ensuring strong internal linking from:
  - homepage → practice/intents
  - practice areas → all intent pages
  - blog index → latest posts
  - footer nav includes `/privacy`, `/terms`, `/reviews`, `/locations` (already present publicly; confirm they are crawlable and not JS-gated).

**P1 (next)**
- Consider requesting indexing (up to 5 total per run) for high-priority URLs that remain “URL unknown” but pass Live Test. Suggested candidates (not all executed in this run): `/reviews`, `/privacy`, `/terms`, `/ovi-dui-defense-delaware-oh`, `/blog/ohio-dui-lookback-period`.
- Audit **canonical consistency** at scale: several pages in “URL unknown” state did not expose canonical fields in the UI (N/A). Confirm every page outputs a self-referencing canonical and uses the preferred host/scheme in all internal links (HTTPS, non-www).

**P2 (cleanup)**
- Domain property: decide whether `api.mango.law` should be discoverable by Google at all. If not, prevent discovery (robots + noindex headers where applicable, or remove public links).
- Domain property: keep HTTP → HTTPS redirects in place; ensure all published links and sitemap entries are HTTPS.

## G) Attachments list (screenshots)

All screenshots are in: `docs/audits/gsc-2026-01-27/`

### Properties / Coverage
- `gsc-domain-pages-summary.png`: Domain property Pages summary (6 indexed / 34 not indexed).
- `gsc-urlprefix-pages-summary.png`: URL-prefix property Pages summary (6 indexed / 32 not indexed).

### Pages → Not indexed (reasons)
- `gsc-domain-pages-not-indexed-discovered-currently-not-indexed.png`: Domain “Discovered – currently not indexed” (29).
- `gsc-domain-pages-not-indexed-discovered-currently-not-indexed-examples.png`: Domain “Discovered – currently not indexed” examples list (URL table with last crawled values).
- `gsc-domain-pages-not-indexed-crawled-currently-not-indexed.png`: Domain “Crawled – currently not indexed” (1).
- `gsc-domain-pages-not-indexed-crawled-currently-not-indexed-examples.png`: Domain “Crawled – currently not indexed” examples list.
- `gsc-domain-pages-not-indexed-server-error-5xx.png`: Domain “Server error (5xx)” (2).
- `gsc-domain-pages-not-indexed-server-error-5xx-examples.png`: Domain “Server error (5xx)” examples list.
- `gsc-domain-pages-not-indexed-blocked-403.png`: Domain “Blocked due to access forbidden (403)” (1, `api.mango.law`).
- `gsc-domain-pages-not-indexed-blocked-403-examples.png`: Domain “Blocked due to access forbidden (403)” examples list.
- `gsc-domain-pages-not-indexed-page-with-redirect.png`: Domain “Page with redirect” (1, `http://mango.law/`).
- `gsc-domain-pages-not-indexed-page-with-redirect-examples.png`: Domain “Page with redirect” examples list.
- `gsc-urlprefix-pages-not-indexed-discovered-currently-not-indexed.png`: URL-prefix “Discovered – currently not indexed” (29).
- `gsc-urlprefix-pages-not-indexed-discovered-currently-not-indexed-examples.png`: URL-prefix “Discovered – currently not indexed” examples list (URL table with last crawled values).
- `gsc-urlprefix-pages-not-indexed-crawled-currently-not-indexed.png`: URL-prefix “Crawled – currently not indexed” (1).
- `gsc-urlprefix-pages-not-indexed-crawled-currently-not-indexed-examples.png`: URL-prefix “Crawled – currently not indexed” examples list.
- `gsc-urlprefix-pages-not-indexed-server-error-5xx.png`: URL-prefix “Server error (5xx)” (2).
- `gsc-urlprefix-pages-not-indexed-server-error-5xx-examples.png`: URL-prefix “Server error (5xx)” examples list.

### Sitemaps
- `gsc-domain-sitemaps-overview.png`: Domain property sitemaps overview.
- `gsc-domain-sitemap-detail.png`: Domain sitemap detail (`/sitemap.xml`, discovered 38, last read 1/24/26).
- `gsc-urlprefix-sitemaps-overview.png`: URL-prefix sitemaps overview.
- `gsc-urlprefix-sitemap-detail.png`: URL-prefix sitemap detail (`/sitemap.xml`, discovered 38, last read 1/24/26).

### Manual actions & Security issues
- `gsc-domain-manual-actions.png`: Domain property manual actions (no issues).
- `gsc-domain-security-issues.png`: Domain property security issues (no issues).
- `gsc-urlprefix-manual-actions.png`: URL-prefix property manual actions (no issues).
- `gsc-urlprefix-security-issues.png`: URL-prefix property security issues (no issues).

### Enhancements
- `gsc-domain-enhancements-breadcrumbs.png`: Domain Breadcrumbs enhancement report.
- `gsc-domain-enhancements-faq.png`: Domain FAQ enhancement report.
- `gsc-urlprefix-enhancements-breadcrumbs.png`: URL-prefix Breadcrumbs enhancement report.
- `gsc-urlprefix-enhancements-faq.png`: URL-prefix FAQ enhancement report.

### Links
- `gsc-domain-links.png`: Domain Links report.
- `gsc-urlprefix-links.png`: URL-prefix Links report.

### URL Inspection — core pages
- `gsc-urlinspect-home-overview.png`: URL Inspection for homepage (overview).
- `gsc-urlinspect-home-page-indexing.png`: Homepage Page indexing details (shows crawl allowed/indexing allowed/last crawl).
- `gsc-urlinspect-home-live-test.png`: Homepage Live Test result.
- `gsc-urlinspect-home-request-indexing.png`: Homepage “Indexing requested” modal.
- `gsc-urlinspect-home-request-indexing-done.png`: Homepage post-request state (“Indexing requested / Request again”).
- `gsc-urlinspect-about-overview.png`: `/about` overview.
- `gsc-urlinspect-about-page-indexing.png`: `/about` Page indexing details.
- `gsc-urlinspect-about-live-test.png`: `/about` Live Test result.
- `gsc-urlinspect-contact-overview.png`: `/contact` overview.
- `gsc-urlinspect-contact-live-test.png`: `/contact` Live Test result.
- `gsc-urlinspect-practice-areas-overview.png`: `/practice-areas` overview.
- `gsc-urlinspect-practice-areas-live-test.png`: `/practice-areas` Live Test.
- `gsc-urlinspect-locations-overview.png`: `/locations` overview (URL unknown).
- `gsc-urlinspect-locations-live-test.png`: `/locations` Live Test.
- `gsc-urlinspect-locations-request-indexing.png`: `/locations` “Indexing requested” modal.
- `gsc-urlinspect-privacy-overview.png`: `/privacy` overview (URL unknown).
- `gsc-urlinspect-privacy-live-test.png`: `/privacy` Live Test.
- `gsc-urlinspect-terms-overview.png`: `/terms` overview (URL unknown).
- `gsc-urlinspect-terms-live-test.png`: `/terms` Live Test.

### URL Inspection — intent + blog
- `gsc-urlinspect-delaware-ohio-ovi-lawyer-overview.png`: `/delaware-ohio-ovi-lawyer` overview (on Google).
- `gsc-urlinspect-delaware-ohio-ovi-lawyer-live-test.png`: `/delaware-ohio-ovi-lawyer` Live Test.
- `gsc-urlinspect-ovi-dui-defense-delaware-oh-overview.png`: `/ovi-dui-defense-delaware-oh` overview (URL unknown).
- `gsc-urlinspect-ovi-dui-defense-delaware-oh-live-test.png`: `/ovi-dui-defense-delaware-oh` Live Test.
- `gsc-urlinspect-blog-overview.png`: `/blog` overview (on Google).
- `gsc-urlinspect-blog-live-test.png`: `/blog` Live Test.
- `gsc-urlinspect-blog-motion-practice-criminal-defense-overview.png`: Blog post overview (on Google).
- `gsc-urlinspect-blog-motion-practice-criminal-defense-live-test.png`: Blog post Live Test.
- `gsc-urlinspect-blog-ohio-dui-lookback-period-overview-2.png`: Blog post overview (URL unknown).
- `gsc-urlinspect-blog-ohio-dui-lookback-period-live-test-2.png`: Blog post Live Test.

### URL Inspection — reviews (evidence refresh)
- `gsc-urlinspect-reviews-overview.png`: `/reviews` overview (URL unknown at time captured).
- `gsc-urlinspect-reviews-live-test.png`: `/reviews` Live Test.
- `gsc-urlinspect-reviews-overview-2.png`: `/reviews` overview (on Google at time captured).
- `gsc-urlinspect-reviews-live-test-2.png`: `/reviews` Live Test (tested 10:47 AM).

### Invalid / intermediate screenshots (kept for traceability)
- `gsc-urlinspect-blog-ohio-dui-lookback-period-overview.png`: Invalid capture (extension reconnect page); superseded by `gsc-urlinspect-blog-ohio-dui-lookback-period-overview-2.png`.
- `gsc-urlinspect-reviews-request-indexing-done.png`: Invalid capture (extension reconnect page). No valid request-indexing evidence for `/reviews` in this audit.
- `tmp-current-view.png`: Intermediate capture (GSC URL Inspection LIVE TEST view).
- `tmp-reviews-live-view.png`: Intermediate capture (GSC URL Inspection LIVE TEST view for `/reviews`).
- `tmp-about-live-view.png`: Intermediate capture (public page view used to confirm title/H1 extraction).
- `tmp-contact-live-view.png`: Intermediate capture (public page view used to confirm title/H1 extraction).
