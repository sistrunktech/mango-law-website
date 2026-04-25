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
| `ga4-gtm-status.csv` | Reporting and event validation map | Draft complete |
| `on-site-support-map.csv` | Internal links, sitemap, canonical, schema, and owner-page support | Draft complete |
| `off-site-local-seo.csv` | GBP, citation, review, and local authority queue | Draft complete |
| `account-status.csv` | Tool access, browser ownership, and billing-risk register | Draft complete |
| `final-tracked-keywords.csv` | Validated 50-keyword tracking alignment and recommended tracker set | Complete |
| `google-ads-keyword-planner-seed-list-50.txt` | 50-keyword Google Ads Keyword Planner seed list for upload once Mango Ads access is active | Complete; account upload blocked |
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

1. Add Google Ads Planner volume/bid evidence after the Mango Ads customer is active; the current setup path stops at payment confirmation with temporary authorization and automatic-payment language.
2. Request indexing for the five live-test-valid but not-indexed P1 URLs in `gsc-indexing-queue.csv` after action-time approval.
3. Deploy the source tracking patch and validate `page_view`, `cta_click`, and `generate_lead` in GA4 DebugView/Realtime after consent acceptance.
4. Use GA4 `generate_lead` as the primary organic lead key event after a live test lead confirms the GTM `lead_submitted` mapping.
5. Update BrightLocal tracked keywords to match the validated 50-keyword set only after admin-write approval.
6. Clean BrightLocal/Citation Builder legacy 740-602-2155 phone references only after admin-write approval.

## Current Recommendation

Use `final-tracked-keywords.csv` as the working tracker recommendation until authenticated tool data is added. Use `blog-publishing-plan-2026-04.csv` for the next 10 posts over 5 weeks.

The current plan is aligned to repo routes, public search validation, official legal/court sources, GSC property-level evidence, source-code reporting instrumentation, GA4 property/stream validation, GTM container validation, BrightLocal rank/citation baselines, Ahrefs baseline metrics, and the production OVI checkpoint refresh.

Google Ads upload/metrics are blocked by the payment-confirmation boundary: Mango setup reached a saved-card screen with temporary authorization and automatic-payment language, and the account still does not appear as an active Keyword Planner customer. GA4 is accessible and `generate_lead` is configured as a key event, but conversion reporting is not fully live until source `lead_submitted` activity is confirmed as GA4 `generate_lead` in live stream data.
