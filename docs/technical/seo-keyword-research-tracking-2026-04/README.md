# SEO Keyword Research Tracking Workbook Package

Date: 2026-04-24
Workstream: SEO keyword research, tracking, and reporting setup
Primary brief: `../SEO_KEYWORD_RESEARCH_TRACKING_REPORTING_SETUP_2026-04.md`
Task queue: `../SEO_KEYWORD_RESEARCH_TRACKING_TASK_QUEUE_2026-04.md`

## Purpose

This folder contains the execution workbook package for Mango Law's SEO keyword research, rank tracking, BrightLocal, Ahrefs, Google Search Console, and GA4/GTM reporting setup.

The files are intentionally split so agents can work in parallel without touching the same artifact.

## Files

| File | Owner slice | Status |
|---|---|---|
| `summary.csv` | Coordination, blockers, and decisions | Draft complete |
| `page-ownership-map.csv` | Page inventory and keyword ownership | Draft complete |
| `evidence-ledger-seed.csv` | Seed keyword evidence rows | Draft complete |
| `recommended-tracked-keywords-draft.csv` | Initial tracked keyword candidates | Draft complete |
| `watchlist.csv` | Deferred keyword candidates | Draft complete |
| `gsc-indexing-queue.csv` | GSC inspection and indexing queue | Priority URL Inspection pass complete |
| `ga4-gtm-status.csv` | Reporting and event validation map | Live mapping validated 2026-05-03 |
| `on-site-support-map.csv` | Internal links, sitemap, canonical, schema, and owner-page support | Draft complete |
| `off-site-local-seo.csv` | GBP, citation, review, and local authority queue | Draft complete |
| `account-status.csv` | Tool access, browser ownership, and billing-risk register | Updated through 2026-05-03 |
| `final-tracked-keywords.csv` | Validated 50-keyword tracking alignment and recommended tracker set | Complete |
| `google-ads-keyword-planner-seed-list-50.txt` | 50-keyword Google Ads Keyword Planner seed list used for the 2026-05-03 Planner plan | Complete; uploaded/exported |
| `blog-publishing-plan-2026-04.csv` | 10-post, 5-week publishing plan tied to keyword/ROI priorities | Complete |
| `ACCOUNT_VERIFICATION_AND_EXECUTION_LOG_2026-04-24.md` | Authenticated Google, BrightLocal, Ahrefs, source-tracking, Ads payment-boundary blocker, GA4 lead-event alignment, GSC URL Inspection/GTM confirmations, and OVI execution log | Complete |
| `OVI_CHECKPOINT_CINCO_DE_MAYO_PASS_2026-04-24.md` | Production checkpoint data pass, scraper fixes, deploy result, and Cinco de Mayo readiness notes | Complete |
| `VALIDATED_ALIGNMENT_REPORT_2026-04-24.md` | Narrative validation report, reporting alignment, and remaining authenticated-tool blockers | Complete |

## Coordination Rules

- Do not use authenticated browser or admin surfaces unless assigned as the primary browser owner.
- Do not touch billing, campaigns, plans, payment methods, or subscription surfaces.
- Keep Google Ads Keyword Planner, BrightLocal, Ahrefs, GSC, GA4, GTM, GBP, and citation dashboard activity read-only until explicitly assigned.
- Treat `/ovi-dui-defense-delaware-oh` as the owner page for Delaware OVI terms because `/delaware-ohio-ovi-lawyer` redirects there.
- Keep personal injury secondary unless separately approved.
- Mark Planner, GSC, Ahrefs, and BrightLocal data blank or blocked until a primary browser owner captures it.

## Next Sequence

1. Use the 2026-05-03 Google Ads Planner export in `../seo-aeo-round-2026-05-03/` as the current volume/bid evidence for BrightLocal alignment and onsite priority.
2. Request indexing for the five live-test-valid but not-indexed P1 URLs in `gsc-indexing-queue.csv` after action-time approval.
3. Use GA4 `generate_lead` as the primary organic lead key event after the 2026-05-03 GTM Version 5 publish; keep real form/phone/email/chat duplicate QA pending before final conversion reporting.
4. Keep `/criminal-defense-delaware-oh`, `/first-offense-ovi-ohio`, and checkpoint resources at the front of the onsite queue because Planner returned the strongest row-level volume there.
5. Update BrightLocal tracked keywords to match the validated 50-keyword set only after admin-write approval.
6. Clean BrightLocal/Citation Builder legacy 740-602-2155 phone references only after admin-write approval.

## Current Recommendation

Use `final-tracked-keywords.csv` as the working tracker recommendation until authenticated tool data is added. Use `blog-publishing-plan-2026-04.csv` for the next 10 posts over 5 weeks.

The current plan is aligned to repo routes, public search validation, official legal/court sources, GSC property-level evidence, source-code reporting instrumentation, GA4 property/stream validation, GTM container validation, BrightLocal rank/citation baselines, Ahrefs baseline metrics, and the production OVI checkpoint refresh.

The 2026-05-03 execution round added Google Ads Keyword Planner evidence from Mango Ads account `133-925-6176`, published GTM Version 5 for GA4 event mapping, and live-validated public GA4 collect calls for `page_view`, `cta_click`, and synthetic `generate_lead`. Conversion reporting should still avoid treating lead totals as final until real form, phone, email, and chat paths are checked for duplicate counting risk.
