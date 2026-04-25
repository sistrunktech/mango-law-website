# SEO Keyword, Tracking, Reporting, and Blog Alignment Report

Date: 2026-04-24
Workstream: SEO keyword research, tracking, reporting, and 5-week content plan

## Executive Decision

Use the first reporting cycle to focus on Delaware / Delaware County OVI and criminal-defense terms, then limited drug, domestic-violence, and protection-order terms where live owner pages already exist.

Do not spend core tracker capacity on personal injury, thin suburb pages, rural county expansion, or broad Columbus terms until Google Ads Keyword Planner, GSC, and Ahrefs evidence supports those moves.

## Validation Status

Completed from repo/public/official sources:

- Repo route and sitemap validation.
- Public SERP validation for Mango's indexed pages and competitor/topic presence.
- Official-source validation for OVI law-change, ALS/refusal, Delaware Municipal Court OVI docket, CPO, and drug-possession support topics.
- Tracking ownership alignment against live owner pages.
- Reporting event alignment against source instrumentation.
- Five-week blog plan focused on high-intent and fast-ROI support topics.

Completed with authenticated account/browser access:

- Google Search Console domain-property access for `mango.law`.
- GSC 3-month performance snapshot and Pages/enhancement overview.
- GSC URL Inspection on the priority P0/P1 commercial owner pages and checkpoint resource pages.
- Google Tag Manager container `GTM-WLJQZKB5`, including GA4 Google tag and key event tags.
- Google Analytics 4 property and stream verification for Mango Law.
- GA4 `generate_lead` key-event creation with no default monetary value and once-per-event counting.
- Google Ads account path and Keyword Planner access state.
- BrightLocal core location, Rank Tracker, and Citation Tracker read-only baseline.
- Ahrefs Site Explorer baseline.
- Production OVI checkpoint database and scraper execution state.

Still blocked:

- Google Ads Keyword Planner volume, competition, and bid ranges because no active Mango Ads customer is available in Keyword Planner. Non-billing setup was advanced to the payment-confirmation boundary, where the next Submit would use a saved payment method and temporary authorization.
- GA4 lead conversion validation because source `lead_submitted` maps to GA4 `generate_lead`, but no recent `generate_lead` stream data was visible yet.
- BrightLocal 50-keyword tracker remapping and citation cleanup because those are admin-write actions.
- Ahrefs competitor/gap exports and Keyword Explorer metrics beyond the baseline.
- Any billing, campaign, payment, GTM publish, or citation admin-write action.
- GSC request-indexing submissions for the five live-test-valid but not-indexed P1 pages until an explicit action-time approval is given.

## Final Tracking Alignment

Use `final-tracked-keywords.csv` as the working live-tracker set.

Core live-tracking group:

- Delaware OVI/DUI: `delaware ohio ovi lawyer`, `dui lawyer delaware ohio`, `ovi attorney delaware ohio`, `delaware county ovi lawyer`, `delaware county dui lawyer`.
- Criminal defense: `criminal defense attorney delaware ohio`, `criminal lawyer delaware ohio`, `delaware ohio criminal defense attorney`, `delaware county criminal defense attorney`, `criminal defense lawyer delaware county ohio`.
- Secondary criminal-defense lanes with owner pages: drug crimes, protection orders, and domestic violence.

Capacity-dependent support terms:

- `ovi test refusal lawyer ohio`
- `als suspension ohio lawyer`
- `felony ovi lawyer ohio`
- `high tier ovi ohio`

Watchlist / monitor only:

- `ohio liv's law ovi`
- `ohio dui checkpoints`
- `columbus ovi lawyer`
- `personal injury lawyer delaware ohio`

## Owner-Page Rules

- `/ovi-dui-defense-delaware-oh` owns Delaware OVI/DUI commercial tracking.
- `/delaware-ohio-ovi-lawyer` must not be treated as a separate owner because it redirects to `/ovi-dui-defense-delaware-oh`.
- `/criminal-defense-delaware-oh` owns broad Delaware criminal-defense terms.
- `/drug-crime-lawyer-delaware-oh`, `/protection-order-lawyer-delaware-oh`, and `/domestic-violence-lawyer-delaware-oh` are valid secondary owner pages.
- `/contact`, `/reviews`, `/about`, `/practice-areas`, `/locations`, and `/blog` support conversion, trust, or discovery. They should not own high-intent practice terms.

## Reporting Alignment

Source instrumentation already exists for:

- `mango_page_view`
- `cta_click`
- `lead_submitted`
- `experiment_exposure`

Monthly SEO reporting should use:

- Organic sessions and landing pages by owner page.
- Organic leads from GA4 `generate_lead`, sourced from source `lead_submitted` and split by `lead_source=form`, `phone`, `email`, and `chat`.
- Organic CTA assists from `cta_click`.
- Tracker movement for core commercial terms only.
- Content assist for blog/support terms, not as a replacement for owner-page ranking.

Authenticated GTM validation confirmed:

- GTM container `GTM-WLJQZKB5` is accessible under Mango Law / `mango.law`.
- The GA4 Google tag uses measurement ID `G-NJZD79GGFG` and `send_page_view=false`.
- `mango_page_view`, `cta_click`, and `lead_submitted` are mapped to GA4 event tags.
- Workspace changes were `0`; no GTM publish action was taken.

GA4 still needs to confirm:

- Whether source `lead_submitted` reaches GA4 as `generate_lead` after deployment and consent acceptance.
- Whether live `generate_lead` events arrive with expected lead-source parameters after deployment.
- Whether consent behavior blocks or delays expected SEO reporting.
- Whether organic landing-page and lead reports line up with GSC once a live test lead is visible.

Source tracking patch completed locally:

- Page-view tracking is now centralized in `src/app/providers.tsx`.
- The duplicate page-view call was removed from `src/lib/seo.tsx`.
- PageHero primary CTAs now emit `cta_click`; hero `tel:` CTAs also emit source `lead_submitted` with `lead_source=phone`, and hero `mailto:` CTAs emit source `lead_submitted` with `lead_source=email`.

## Authenticated Account Findings

Google Search Console:

- Domain property `mango.law` was accessible.
- Visible 3-month snapshot: 192 clicks, 5.85K impressions, 3.3% CTR, average position 24.1.
- Pages overview showed 18 indexed and 86 not indexed.
- Non-brand opportunity signals visible in the sample included `dui lawyer`, `dui attorney`, and `domestic violence attorney delaware`.
- URL Inspection confirmed the P0 OVI and criminal-defense owner pages are indexed and valid.
- URL Inspection also confirmed `/about`, `/contact`, `/resources/dui-checkpoints`, and `/ovi-checkpoints-ohio` are indexed.
- Five important P1 owner/support pages are not yet indexed but pass live test and can be indexed: `/drug-crime-lawyer-delaware-oh`, `/protection-order-lawyer-delaware-oh`, `/domestic-violence-lawyer-delaware-oh`, `/als-license-suspension-ohio`, and `/ovi-test-refusal-lawyer-ohio`.

Google Ads:

- Keyword Planner is reachable through Sistrunk MCC `779-598-3633`.
- No active Mango Ads customer was visible for Planner work.
- Mango setup account `133-925-6176` was advanced through the account-only/leave-campaign path with United States, New York Time, and USD settings.
- The next visible Ads setup step is payment confirmation with a saved Visa ending `7795`, temporary `$50.00` authorization language, and automatic-payment terms, so no Submit/payment action was taken.
- `google-ads-keyword-planner-seed-list-50.txt` is ready for upload once Mango Ads access is active.

Google Analytics:

- Mango GA4 property and stream were verified: `Mango Law > Mango Law GA4`, stream `Mango Law CX Website`, stream ID `13173376535`, measurement ID `G-NJZD79GGFG`.
- Data collection was active in the last 48 hours and enhanced measurement was on.
- Recent GA4 events included `click`, `first_visit`, `form_start`, `page_view`, `scroll`, `session_start`, and `user_engagement`.
- `generate_lead` was created as a GA4 key event with no default monetary value and once-per-event counting.
- No recent `generate_lead` stream data was visible yet; the visible key events were `close_convert_lead`, `generate_lead`, `purchase`, and `qualify_lead`.

BrightLocal:

- Mango Law location `3937875` and campaign `MANGOLAWLLC-43015` were checked read-only.
- Core BrightLocal NAP uses canonical `+1 740-417-6191`, but Citation Builder and multiple citation rows still show legacy `740-602-2155`.
- Rank Tracker report generated 2026-04-07 showed Average Google Position 44 and Google Local Pack Coverage 0%.
- Citation Tracker report generated 2026-02-07 showed Key Citation Score 46/100, 36 live citations, 9 correct citations, and 8 NAP-error citations.

Ahrefs:

- Mango project/site context was checked for `https://mango.law/`.
- Baseline metrics showed DR 0, UR 4.5, 19 backlinks, 18 referring domains, 0 organic keywords, and 0 organic traffic.
- Ahrefs does not yet provide owned-keyword evidence for Mango; use it as a gap signal, not a validation source for publishing priority.

OVI checkpoint:

- Production checkpoint data was stale at the start of the pass.
- The scraper was fixed, deployed, triggered, and production verified with four current late-April rows and map coordinates.
- Cinco de Mayo and early-May weekends were added to the checkpoint page's seasonal watch language.

## Five-Week Publishing Plan

Use `blog-publishing-plan-2026-04.csv` for the 10-post schedule.

Execution note: the first planned article has been added to `src/data/blogPosts.ts` as `/blog/ohio-livs-law-ovi-changes` with a 2026-04-24 publish date so it can go live immediately in the site timezone.

The plan intentionally favors:

- 2025 OVI law-change freshness.
- High-intent OVI charge modifiers.
- Delaware County local procedure.
- Domestic violence and protection-order support for current owner pages.
- Drug-defense scenarios with search-and-seizure intent.
- Criminal-defense process content that supports the P0 criminal-defense page.

## Sources Used

- Mango owner pages and blog inventory from the local repository and public indexed pages.
- Ohio HB 37 / Liv's Law, effective April 9, 2025: https://www.legislature.ohio.gov/legislation/135/hb37
- Ohio BMV first-offense OVI and ALS suspension page: https://www.bmv.ohio.gov/susp-ad-first-offense.aspx
- Ohio Revised Code 4511.191 implied consent / ALS: https://codes.ohio.gov/ohio-revised-code/section-4511.191
- Ohio Revised Code 2925.11 possession of controlled substances: https://codes.ohio.gov/ohio-revised-code/section-2925.11
- Delaware Municipal Court OVI Docket: https://www.delawareohio.net/government/departments/municipal-court/court-services/specialized-dockets/ovi-docket
- Delaware Municipal Court local rules: https://www.delawareohio.net/government/departments/municipal-court/about/resources/court-rules
- Supreme Court of Ohio domestic violence / protection-order resource: https://www.supremecourt.ohio.gov/courts/services-to-courts/domestic-relations-resource-guide/domestic-violence-and-protection-orders/

## Next Execution Step

Finish the remaining blockers before treating reporting as fully live:

1. Activate or attach a Mango Law Google Ads customer that can use Keyword Planner without launching a campaign; upload `google-ads-keyword-planner-seed-list-50.txt` and capture Planner metrics for all 50 keywords.
2. Request indexing for the five live-test-valid but not-indexed P1 pages after action-time approval.
3. Deploy the source tracking patch, then validate `page_view`, `cta_click`, and `generate_lead` in GA4 DebugView/Realtime after consent acceptance.
4. Use GA4 `generate_lead` as the primary lead key event once the live test proves the GTM mapping.
5. Map the validated 50-keyword set into BrightLocal only after admin-write approval, then clean the legacy phone citation defects.
6. Add Ahrefs competitor/gap metrics for the 10 planned blog topics.
7. Monitor `checkpoint-scraper` scheduled logs through May 6, 2026 so the Cinco de Mayo checkpoint window stays current.
