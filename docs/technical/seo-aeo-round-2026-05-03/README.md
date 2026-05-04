# SEO/AEO Round Execution Workbook

Date: 2026-05-03
Source context: `../seo-keyword-research-tracking-2026-04/`

## Purpose

This folder is the execution workbook for the next SEO/AEO round after the April 2026 keyword and tracking package. It keeps the next operator focused on measurable gaps: Google Ads Keyword Planner evidence, GSC indexing requests, GA4/GTM live-event validation, BrightLocal 50-keyword alignment, and the next two weeks of onsite content/optimization work.

## Files

| File | Use |
|---|---|
| `google-ads-keyword-planner-results-capture.csv` | Captured Planner volume, competition, and bid data for the validated 50-keyword set from Mango Ads account `133-925-6176`. |
| `google-ads-keyword-planner-historical-metrics-export-2026-05-03.csv` | UTF-8 normalized evidence export from the saved Google Ads Keyword Planner plan. |
| `gsc-indexing-submission-log.csv` | Submit and track the April live-test-valid but not-indexed URLs plus the new May owner/support posts after deployment and live-test confirmation. |
| `ga4-gtm-live-event-validation-checklist.md` | Validate live `page_view`, `cta_click`, and `generate_lead` behavior after consent acceptance and deployment. |
| `ga4-gtm-live-network-validation-2026-05-03.json` | Live public-site network capture after GTM Version 5 publish showing GA4 collect events for `page_view`, `cta_click`, and synthetic `generate_lead`. |
| `brightlocal-50-keyword-alignment-checklist.csv` | Reconcile BrightLocal tracker rows against the validated 50-keyword April recommendation; includes Planner metric columns for prioritization before any admin write. |
| `onsite-content-optimization-queue-2026-05-03.csv` | Two-week onsite queue from 2026-05-03 through 2026-05-17 with ROI rationale and dependencies. |
| `live-content-keyword-alignment-qa-2026-05-03.md` | Owner-page/content QA after Planner evidence; confirms priority shifts toward criminal defense, first-offense OVI, checkpoints, DV, and suppression links. |
| `ovi-checkpoint-cinco-de-mayo-live-pass-2026-05-03.md` | Cinco de Mayo checkpoint freshness pass and production scraper-health risk review. |
| `ovi-checkpoint-source-evidence-2026-05-03.csv` | Source evidence rows used by the checkpoint live pass. |
| `checkpoint-scraper-cron-health-followup-2026-05-03.md` | Follow-up checkpoint scraper execution log after the Solon/Cinco source appeared; includes Edge Function deploy, manual scraper runs, and DB verification. |
| `ga4-real-path-duplicate-risk-qa-2026-05-03.md` | Source-level duplicate-risk QA for real form/phone/email/chat lead paths after GTM Version 5 publish. |
| `admin-execution-status-2026-05-03.md` | Production QA plus authenticated BrightLocal and GSC execution status after the CPO/drug-possession release. |
| `gbp-post-schedule-2026-05.md` | BrightLocal/Google Business Profile posting calendar for the May 2026 content cluster, including UTM URLs, copy, CTA settings, landing-page QA, and execution boundary. |
| `monthly-report-agent-handoff-2026-05-04.md` | Read-only handoff for a separate agent to run BrightLocal, Ahrefs, GA4, and GSC monthly trend reporting and draft the next Sistrunk-hosted private client report. |
| `monthly-report-live-trend-memo-2026-05-04.md` | Live read-only trend memo after GBP scheduling, BrightLocal export review, GSC/GA4 checks, and Ahrefs Site Explorer/Site Audit review. |

## 2026-05-03 Google Ads Execution Result

- Account used: Mango Law Google Ads `133-925-6176`.
- Saved plan: `Mango SEO 50 keyword validation 2026-05-03`, plan ID `1419725226`.
- Scope: 50 validated SEO keywords, date range April 1, 2025 through March 31, 2026, targeting United States, all languages, Google.
- Metrics returned: 12 of 50 keywords had row-level volume/competition data; 38 returned blank row-level metrics under current account access.
- Boundary: no campaign was created, no billing/payment action was taken, and no spend action was launched.
- Interpretation: the export provides directional bucketed Planner evidence. The strongest quick-ROI lanes from this pass are criminal defense, first-offense OVI, checkpoint resources, high-tier OVI, motion-to-suppress OVI, and local domestic-violence terms.

## 2026-05-03 BrightLocal Execution Result

- Authenticated BrightLocal location: `Mango Law LLC (MANGOLAWLLC-43015)`, location ID `3937875`.
- Export downloaded: `/Users/sistech_tim/Downloads/rank-tracker-mango-law-llc-2026-05-04-00-41-03.csv`.
- Pre-update tracker count: 49 unique keywords.
- Added keyword: `delaware county criminal defense attorney`, selected because it was the strongest missing validated P0/P1 term with Planner support.
- Post-update tracker count shown by BrightLocal UI: `50/50 keywords`.
- Name-tracking phone corrected in the Rank Tracker report from `+1 740-602-2155` to the public office line `+1 740-417-6191`.
- Boundary: no current tracker keywords were removed because full replacement would delete existing rank-tracking terms/history and needs action-time confirmation.
- Remaining risk: BrightLocal's connected Google Business Profile card still displays `+1 740-602-2155`, so GBP/Citation Builder NAP cleanup remains open.

## 2026-05-03 GSC Production Inspection Result

- Production URLs for `/blog/civil-protection-order-hearing-delaware-county-ohio` and `/blog/drug-possession-in-car-ohio` return HTTP 200, load their generated images, and are present in `/sitemap.xml`.
- Search Console inspection for both new posts reports `URL is not on Google` and `Page is not indexed: URL is unknown to Google`.
- Request-indexing buttons were available for both inspected URLs.
- Boundary: request-indexing clicks were not submitted because that sends explicit crawl requests to Google and requires action-time confirmation.

## 2026-05-03 GA4/GTM Execution Result

- GTM container: `GTM-WLJQZKB5`, Mango Law / `mango.law`.
- Published version: Version 5, `Fix Mango GA4 event tags 2026-05-03`, published 2026-05-03 11:09 EDT by `tim@sistrunktech.com`.
- Changes: `GA4 - Event - page_view`, `GA4 - Event - cta_click`, and `GA4 - Event - generate_lead` were converted/saved as GA4 Event tags using measurement ID `G-NJZD79GGFG`.
- Preview evidence: Tag Assistant preview confirmed `page_view` fired twice and `cta_click` fired once on the OVI owner-to-contact flow; `generate_lead` did not fire because no live lead form/chat/phone/email submission was completed.
- Live evidence: public-site Puppeteer network capture after publish observed GA4 collect events for `page_view`, `cta_click`, and `generate_lead`; `generate_lead` was triggered by a synthetic `lead_submitted` dataLayer event labelled `gtm_generate_lead_validation_2026_05_03`.
- Boundary: no contact form was submitted, no phone call was placed, no email was sent, no chat lead was created, and no billing/campaign/spend action was taken.

## 2026-05-03 Checkpoint / Cinco de Mayo Result

- Initial pass found no confirmed Ohio Cinco de Mayo checkpoint announcement and showed stale production scraper evidence.
- Follow-up public source review found Cleveland19/WOIO reporting Solon Police sobriety checkpoints for Tuesday, May 5, 2026, in the Aurora Road area.
- The production `checkpoint-scraper` Edge Function was manually triggered, then updated with a curated Solon pending announcement seed, deployed to Supabase project `rgucewewminsevbjgcad`, and triggered again.
- Production DB now contains the two May-window Lake Township/Stark rows and one Solon/Cinco pending announcement row with source `Cleveland19/WOIO`.
- Boundary: no exact Solon time window was published by the source, so Solon was intentionally kept as a pending announcement rather than a precise checkpoint map row.
- Remaining risk: manual trigger works, but unattended `pg_cron` / `pg_net` scheduler health still needs confirmation.
- Frontend deployment note: local `http://localhost:3023/resources/dui-checkpoints` shows Solon/Aurora Road after client hydration; production display depends on deploying the hydration refresh patch in the next release.

## 2026-05-03 Next Onsite/AEO Release Result

- Fixed Article JSON-LD image URLs so relative blog image paths are emitted as absolute `https://mango.law/images/...` schema URLs.
- Updated sitemap generation so current posts and changed owner/resource pages use May 3, 2026 `lastmod` values instead of the stale March static date.
- Added the `Domestic Violence Defense` blog filter category so the new DV arrest post is browsable by topic.
- Added inbound links from `/ovi-dui-defense-delaware-oh` to `/blog/high-tier-ovi-ohio-17-test`.
- Added the next criminal-defense support article: `/blog/delaware-county-criminal-case-timeline`.
- Linked the new timeline article from `/criminal-defense-delaware-oh`.
- Added a matching watercolor blog image at `/images/generated/blog-delaware-county-criminal-case-timeline.png`.
- Local QA confirmed Solon/Aurora appears on the checkpoint page after hydration, sitemap May 3 lastmods render, Article schema image URLs are absolute, and the new post/owner-page/category paths render.

## 2026-05-03 Round Three Onsite/AEO Result

- Added the next criminal-defense support article: `/blog/ohio-misdemeanor-vs-felony-charges-delaware-county`.
- Linked the new misdemeanor/felony article from `/criminal-defense-delaware-oh`.
- Added a matching neutral watercolor blog image at `/images/generated/blog-ohio-misdemeanor-vs-felony-charges-delaware-county.png`.
- Refreshed `/blog/ohio-ovi-driving-privileges-als` with Delaware County filing context, ALS appeal timing, limited privileges, ignition interlock, updated FAQs, and current official sources.
- Applied high-signal internal links from older arrest, bond, motion-practice, checkpoint, drug, domestic-violence, first-OVI-date, no-contact, and CPO articles into the validated owner/support pages.

## 2026-05-03 Owner-Page Indexing Prep Result

- Optimized `/drug-crime-lawyer-delaware-oh` for the seven validated drug-crime tracker terms, tightened current Ohio drug-law wording, added the possession-vs-trafficking blog support link, and refreshed sitemap `lastmod`.
- Optimized `/protection-order-lawyer-delaware-oh` for the six validated protection-order/CPO tracker terms, tightened CPO/firearm/counter-petition legal language against official sources, added stronger CPO/no-contact/DV support links, and refreshed sitemap `lastmod`.
- Optimized `/domestic-violence-lawyer-delaware-oh` for the validated local DV owner terms, added exact "domestic violence lawyer in Delaware, Ohio" phrasing to the visible hero/intro, added a defense-review section linking arrest/no-contact/protection-order support, routed glossary DV links to the DV owner, and tightened ORC 2919.25/firearm language against official sources.
- Added `/blog/ovi-refusal-vs-failed-test-ohio` and `/blog/domestic-violence-arrest-delaware-county-ohio` to the GSC indexing submission log so the admin-browser queue matches the latest live content.

## 2026-05-03 Drug-OVI Support Article Result

- Added `/blog/drug-ovi-ohio` for the validated `drug ovi ohio`, marijuana OVI, prescription-drug OVI, blood/urine testing, and oral-fluid testing query lane.
- Grounded the article in current ORC 4511.19, ORC 4511.191, ORC 4511.192, ORC 4511.197, ORC 3701.143, OAC Chapter 3701-53, Ohio BMV ALS guidance, ORC 3796.221, and the H.B. 37 final analysis.
- Linked the post from `/ovi-dui-defense-delaware-oh`, `/drug-crime-lawyer-delaware-oh` support links, and the Liv's Law oral-fluid section; the article links back to OVI, drug-crime, suppression, refusal, ALS, first-offense, Liv's Law, drug possession, and contact paths.
- Added a matching watercolor legal-tabletop image at `/images/generated/blog-drug-ovi-ohio.png` and updated image-generation guidance so future blog assets avoid DC/courthouse/location drift.
- Added `/blog/drug-ovi-ohio` to the GSC indexing submission log for post-deployment live inspection.

## 2026-05-03 CPO and Vehicle Drug-Possession Support Article Result

- Added `/blog/civil-protection-order-hearing-delaware-county-ohio` for the validated `civil protection order lawyer delaware ohio`, `cpo hearing delaware county ohio`, and related protection-order query lane.
- Grounded the CPO article in current ORC 3113.31, ORC 2919.27, ORC 2919.26, ORC 2903.214, Civil Rule 65.1, Supreme Court of Ohio CPO resources, Felton, and Delaware County Domestic Relations sources.
- Linked the CPO post from `/protection-order-lawyer-delaware-oh`, `/civil-protection-order-defense-ohio`, and domestic-violence support surfaces; the article links back to protection-order, CPO, ex parte, no-contact, domestic-violence, criminal-defense, and contact paths.
- Added `/blog/drug-possession-in-car-ohio` for the validated `drug possession in car ohio`, traffic-stop possession, constructive-possession, and passenger-possession query lane.
- Grounded the drug-possession article in current ORC 2925.11, ORC 2925.01, ORC 2901.22, ORC 2925.03, ORC 2925.14, ORC 3796.062, ORC 3796.221, ORC 4511.19, ORC 2951.041, Ohio Criminal Rule 12, and current Ohio Supreme Court stop/search sources.
- Linked the vehicle drug-possession post from `/drug-crime-lawyer-delaware-oh`; the article links back to drug-crime, possession/trafficking, motion-practice, criminal-defense, drug-OVI, OVI, and contact paths.
- Added matching watercolor legal-tabletop images at `/images/generated/blog-civil-protection-order-hearing-delaware-county-ohio.png` and `/images/generated/blog-drug-possession-in-car-ohio.png`.
- Added both new posts to the GSC indexing submission log for post-deployment live inspection.

## 2026-05-04 GBP Post Scheduler Prep Result

- Prepared an 8-post BrightLocal/Google Business Profile calendar for May 5 through May 28, 2026, at a recommended two-posts-per-week cadence.
- Prioritized the live checkpoint map first for Cinco de Mayo relevance, then the keyword-backed OVI, drug, CPO/protection-order, Memorial Day enforcement, and Delaware County criminal-defense support assets.
- Added `google_business_profile / organic / gbp_posts_may_2026` UTM URLs with unique `utm_content` values for each post.
- Verified all eight target URLs returned HTTP `200` with UTM parameters attached on 2026-05-04.
- Boundary: final BrightLocal scheduling/posting clicks still require action-time approval because they create public/scheduled Google Business Profile communications.

## 2026-05-04 Monthly Report Agent Handoff Result

- Added a separate-agent handoff for Mango Law monthly reporting across BrightLocal, Ahrefs, GA4, and GSC.
- Pointed the next agent to the Sistrunk Tech private report source, existing `mango-law-2026-02` and `mango-law-2026-03` records, live client-report surfaces, and the expected `mango-law-2026-04` report shape.
- Included report boundaries: read-only first, no email sends/access changes/GSC indexing requests/public posts/admin writes without action-time approval, and do not interrupt the active BrightLocal GBP scheduling modal.

## 2026-05-04 Live Reporting Pull Result

- BrightLocal GBP Scheduler now shows `All posts (18)`, `Live (10)`, `Scheduled (8)`, `Expired (0)`, and `Rejected (0)`.
- Verified the last scheduled GBP post is set for May 28, 2026 at 10:00 AM ET, completing the two-posts-per-week May GBP calendar.
- BrightLocal rank export shows the strongest current traction in Google Places and Bing, with Google Places top-10 visibility for core Delaware OVI, DUI, criminal-defense, and drug-charge terms.
- GSC last-28-days performance is up to `78` clicks and `3.11K` impressions; `/resources/dui-checkpoints` is the clearest new search winner with `23` clicks and `1,008` impressions.
- GA4 last-30-days traffic remains low and down, with `19` active users, `152` events, and `0` key events; real lead-path conversion reporting remains pending.
- Ahrefs shows the checkpoint page as the only current organic-traffic page, ranking for `ohio dui checkpoints tonight` and `sobriety checkpoint finder ohio`; Site Audit health is `99%` with `3` errors, `49` warnings, and `79` notices.

## Execution Rules

- Do not submit billing, payment, paid campaign, subscription, or spend actions in Google Ads.
- Request indexing only after action-time approval in GSC.
- Do not write to BrightLocal until admin-write approval is explicit; use the checklist for preflight alignment first.
- Use `/ovi-dui-defense-delaware-oh` as the owner for Delaware OVI/DUI terms. Do not assign tracker ownership to redirected `/delaware-ohio-ovi-lawyer`.
- Treat personal injury as out of scope unless separately approved.

## Round Priorities

1. Keep the 50-keyword Planner workbook as the tracking source of truth; BrightLocal write alignment still needs explicit admin-write approval.
2. Prioritize owner-page optimizations for `/criminal-defense-delaware-oh` and `/first-offense-ovi-ohio` because both have 500-volume Planner support.
3. Keep checkpoint freshness/cron verification active before leaning on checkpoint rankings or AEO answers.
4. Submit indexing requests for the P1 owner/support pages that were live-test-valid but not indexed in April, plus the new OVI support posts after live testing.
5. Use GA4 `generate_lead` cautiously in SEO reporting until at least one real form/phone/email/chat lead path is observed after the synthetic mapping validation.
