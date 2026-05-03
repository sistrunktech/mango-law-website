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

## 2026-05-03 Google Ads Execution Result

- Account used: Mango Law Google Ads `133-925-6176`.
- Saved plan: `Mango SEO 50 keyword validation 2026-05-03`, plan ID `1419725226`.
- Scope: 50 validated SEO keywords, date range April 1, 2025 through March 31, 2026, targeting United States, all languages, Google.
- Metrics returned: 12 of 50 keywords had row-level volume/competition data; 38 returned blank row-level metrics under current account access.
- Boundary: no campaign was created, no billing/payment action was taken, and no spend action was launched.
- Interpretation: the export provides directional bucketed Planner evidence. The strongest quick-ROI lanes from this pass are criminal defense, first-offense OVI, checkpoint resources, high-tier OVI, motion-to-suppress OVI, and local domestic-violence terms.

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
