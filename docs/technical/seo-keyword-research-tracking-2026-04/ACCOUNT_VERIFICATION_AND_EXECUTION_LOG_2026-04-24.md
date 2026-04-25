# Account Verification and Execution Log

Date: 2026-04-24
Workstream: Mango Law SEO keyword research, tracking, reporting, Google account checks, and OVI checkpoint readiness

## Status

Executed the authenticated Google, BrightLocal, Ahrefs, source-tracking, GSC URL Inspection, and production OVI checkpoint pass. The keyword set and 5-week blog plan are ready for implementation review after tracking deployment and live GA4 lead-event validation. Two measurement blockers remain before the setup can be treated as fully live:

- Google Ads Keyword Planner is reachable through the Sistrunk MCC, but no active Mango Law Google Ads customer is available for Keyword Planner work. Mango Ads setup was advanced to the payment-confirmation boundary and stopped before any payment submission.
- Mango GA4 is accessible and collecting data, and `generate_lead` is now configured as a key event; however, no live `generate_lead` stream data was visible yet.

No billing, campaign, payment, or GTM publish actions were taken.

## Google Ads

Authenticated status: partially accessible; non-billing setup advanced; blocked at payment confirmation.

Findings:

- Sistrunk MCC `779-598-3633` can reach Google Ads Keyword Planner.
- Keyword Planner requires selecting an active customer account.
- The visible managed accounts were Ascent Roofing `996-359-8902` plus removed/non-usable accounts. Mango Law was not available as an active customer.
- A Mango setup account `133-925-6176` exists in first-campaign setup with website `https://www.mango.law` and product/service chips for Attorneys & Law Firms, Criminal Law, and DUI.
- The setup account was advanced through the account-only / leave-campaign flow without creating a campaign.
- Account settings shown before the payment boundary: billing country United States, timezone `(GMT-04:00) New York Time`, and currency `US Dollar (USD)`.
- The next screen showed a saved payments profile, a Visa ending `7795`, temporary `$50.00` authorization language, and automatic-payment language. I stopped there.

Execution result:

- Created the local 50-keyword Keyword Planner seed list at `google-ads-keyword-planner-seed-list-50.txt`.
- Rechecked Keyword Planner after advancing account-only setup. Mango still was not selectable as an active customer in the Sistrunk MCC; visible accounts remained Ascent Roofing plus two removed accounts.
- Did not upload or save a Google Ads keyword plan because the remaining account activation path requires payment confirmation.

Required next account action:

- Finish or attach an active Mango Law Google Ads customer that can use Keyword Planner without launching a campaign. The current path requires payment confirmation, so do not proceed unless the account owner intentionally accepts the temporary authorization and automatic-payment terms. Then upload the 50-keyword seed list and capture volume, competition, and top-of-page bid ranges.

## Google Search Console

Authenticated status: checked.

Property checked: domain property `mango.law`.

Visible 3-month performance snapshot:

- Web search clicks: 192.
- Impressions: 5.85K.
- CTR: 3.3%.
- Average position: 24.1.

Visible top query/page signals:

- Top branded queries: `mango law`, `dominic mango`, `mango law llc`.
- Non-brand opportunities visible in the sample: `civil law attorney`, `dui lawyer`, `dui attorney`, `domestic violence attorney delaware`.
- Top pages by visible performance included `/`, `/about`, `/contact`, `/reviews`, `/personal-injury-lawyer-delaware-oh`, `/blog`, `/blog/first-ovi-court-date-delaware-county-ohio`, `/first-offense-ovi-ohio`, and `/criminal-defense-delaware-oh`.

Visible indexing/enhancement snapshot:

- Page indexing: 18 indexed, 86 not indexed.
- Not-indexed categories visible: Page with redirect, Crawled - currently not indexed, Server error 5xx, and Discovered - currently not indexed.
- HTTPS report: 16 HTTPS URLs visible in the overview.
- Breadcrumbs: 15 valid.
- FAQ: 6 valid.
- Warning shown for unused verification tokens.

Execution result:

- GSC access is confirmed and should be used for monthly baseline reporting.
- URL Inspection was completed for the immediate P0/P1 owner pages and checkpoint resources.
- Indexed/currently valid pages: `/ovi-dui-defense-delaware-oh`, `/criminal-defense-delaware-oh`, `/about`, `/contact`, `/resources/dui-checkpoints`, and `/ovi-checkpoints-ohio`.
- Not indexed but live-test valid and indexable: `/drug-crime-lawyer-delaware-oh`, `/protection-order-lawyer-delaware-oh`, `/domestic-violence-lawyer-delaware-oh`, `/als-license-suspension-ohio`, and `/ovi-test-refusal-lawyer-ohio`.
- No request-indexing submission was clicked in this pass.

Required next account action:

- Request indexing for the five live-test-valid P1 pages only after explicit action-time confirmation, because that submits a recrawl/indexing request to Google.

## Google Tag Manager

Authenticated status: checked.

Container:

- Account/container: Mango Law / `mango.law`.
- Container ID: `GTM-WLJQZKB5`.
- Account path: `/accounts/6329801864/containers/238390186`.
- Workspace: Default Workspace.
- Container quality: Good.
- Workspace changes: 0.
- Live/latest version visible: Version 4.

Tags confirmed:

- `GA4 - Google tag - mango.law`, tag ID `G-NJZD79GGFG`, Initialization - All Pages, `send_page_view=false`.
- `GA4 - Event - page_view`, trigger `CE - mango_page_view`.
- `GA4 - Event - cta_click`, trigger `CE - cta_click`.
- `GA4 - Event - generate_lead`, trigger `CE - lead_submitted`.
- `Ahrefs Analytics - Mango - Prod`, trigger `Page View - All Pages - Mango Production`.

Execution result:

- Source-code events and GTM mapping are aligned for reporting design.
- No GTM changes were published.

## Google Analytics 4

Authenticated status: checked; `generate_lead` key event created; live lead data validation pending.

Property and stream:

- Account/property: `All accounts > Mango Law > Mango Law GA4`.
- Property URL context: `a378386817p517166804`.
- Data stream: `Mango Law CX Website`.
- Stream URL: `https://mango.law`.
- Stream ID: `13173376535`.
- Measurement ID: `G-NJZD79GGFG`.
- Data collection: active in the last 48 hours.
- Enhanced measurement: on, including Page views, Scrolls, Outbound clicks, and additional enhanced-measurement events.

Findings:

- Recent GA4 events visible in the property included `click`, `first_visit`, `form_start`, `page_view`, `scroll`, `session_start`, and `user_engagement`.
- No recent `generate_lead` or `lead_submitted` event was visible during this pass.
- Current key events visible after setup were `close_convert_lead`, `generate_lead`, `purchase`, and `qualify_lead`; all showed no stream data.
- GTM maps source `lead_submitted` into GA4 event `generate_lead`, so reporting docs should treat `generate_lead` as the GA4-side lead event, not `lead_submitted`.

Execution result:

- Mango GA4 access is verified.
- Created `generate_lead` as a GA4 key event using the code-based event path, with no default monetary value and once-per-event counting.
- Monthly SEO reporting can use this GA4 property for traffic/landing-page context after deployment, but lead conversion reporting is not fully live until a test lead confirms source `lead_submitted` reaches GA4 as `generate_lead`.

Required next account action:

- Deploy the source tracking patch.
- Accept consent in a test session and submit/click a controlled lead path.
- Confirm `generate_lead` appears in DebugView/Realtime with `lead_source=form`, `phone`, `email`, or `chat`.
- Use `generate_lead` as the primary lead key event in SEO reporting only after live stream data confirms the mapping.

## Source Tracking Patch

Local source status: patched; deployment and live GA4 validation still pending.

Execution result:

- Centralized source page-view emission in `src/app/providers.tsx`.
- Removed duplicate page-view emission from `src/lib/seo.tsx`.
- Added PageHero primary CTA tracking in `src/components/PageHero.tsx` so primary hero CTAs emit `cta_click`; `tel:` hero CTAs also emit source `lead_submitted` with `lead_source=phone`, and `mailto:` hero CTAs emit source `lead_submitted` with `lead_source=email`.

Reporting impact:

- Reduces the prior duplicate page-view risk from provider-level plus SEO-level tracking.
- Closes a lead-tracking gap where primary hero phone/email CTAs could contribute leads without source `lead_submitted` attribution.
- Still requires live GA4 DebugView validation after deployment and consent acceptance.

## BrightLocal

Authenticated status: checked read-only; admin-write cleanup pending.

Core location:

- Location: Mango Law LLC, location ID `3937875`, campaign/location code `MANGOLAWLLC-43015`.
- Core NAP visible in BrightLocal: Mango Law LLC, 43 S Franklin St, Delaware, OH 43015.
- Primary phone: `+1 740-417-6191`.
- Website: `https://mango.law`.
- SMS phone: `+17404176191`.
- Formation/opening date: `02/2009`.
- Google Business Profile connected; Google Customer ID `6665341811827014748`.
- Active Sync last requested: 2026-04-15 07:43.
- GBP and Yelp sync were on; Facebook connect was available; Bing and Apple Maps sync were off.
- Primary category: Lawyer.
- Additional categories: Criminal justice attorney and Personal injury attorney.

Rank Tracker:

- Report generated 2026-04-07 19:27 EDT for Delaware, OH.
- Average Google Position: 44.
- Google Local Pack Coverage: 0%.
- Movement summary visible: 11 keyword changes up and 34 positional changes up.
- Current tracked keywords include Delaware OVI, Delaware criminal defense, domestic violence, drug-charge, and broad OVI/DUI terms, but do not yet match the validated 50-keyword workbook set.

Citation Tracker:

- Report generated 2026-02-07 21:07:46.
- Key Citation Score: 46/100.
- Key citations: 23.
- Live citations: 36.
- Pending citations: 0.
- Competitor citations: 40.
- Found/not found: 23 found, 16 not found.
- Correct/NAP-error split: 9 correct, 8 with NAP errors.
- Main defect: phone mismatch. Many citations still show `740-602-2155` instead of canonical `740-417-6191`.

Execution result:

- No BrightLocal save, sync, citation fix, subscription, or billing action was taken.
- BrightLocal validates the local-rank/citation baseline and confirms that the next admin-write step is tracker keyword mapping plus legacy-phone cleanup.

## Ahrefs

Authenticated status: checked read-only.

Project/site:

- Target: `https://mango.law/`.
- Project ID/context visible: `9325481`.
- Ahrefs page title: `Criminal Defense & OVI Attorney Delaware, OH | Mango Law`.

Visible metrics:

- AI citations: 0.
- Domain Rating: 0.
- URL Rating: 4.5.
- Backlinks: 19.
- Referring domains: 18.
- Organic keywords: 0.
- Organic traffic: 0.
- Paid keywords: 0.
- Paid traffic: 0.

Execution result:

- Ahrefs is usable for baseline/gap checks, but currently provides no Mango-owned keyword footprint to validate the 50-keyword set.
- Treat Ahrefs as a gap/risk signal for now; topic priority remains grounded in GSC, SERP validation, official-source intent, live owner pages, and BrightLocal local-ranking context until Keyword Explorer/competitor exports are captured.

## OVI Checkpoint Execution

Authenticated/admin status: production data refresh completed through the Supabase Edge Function path.

Execution result:

- Fixed the OVI checkpoint scraper's Ohio local-time conversion, duplicate-match logic, and verbose-address geocoding.
- Deployed `checkpoint-scraper` to production project `rgucewewminsevbjgcad`.
- Triggered the scraper manually.
- Verified four current late-April OVICheckpoint rows in production with coordinates for Canton/Stark and Trotwood/Montgomery.
- Added Cinco de Mayo / early-May weekend language to the public checkpoint page watch window.

See `OVI_CHECKPOINT_CINCO_DE_MAYO_PASS_2026-04-24.md` for the detailed production findings.

## Research Outputs

Completed:

- `final-tracked-keywords.csv`: 50 validated tracked keywords, all mapped to existing owner pages.
- `google-ads-keyword-planner-seed-list-50.txt`: 50-keyword upload/seed list for Keyword Planner once Mango Ads access is ready.
- `blog-publishing-plan-2026-04.csv`: 10 posts over 5 weeks, prioritized for fast OVI/criminal-defense ROI.
- First post drafted in `src/data/blogPosts.ts` as `/blog/ohio-livs-law-ovi-changes`, sourced to official Ohio HB 37, LSC, ORC, and BMV materials.

Remaining paid-tool evidence:

- Google Ads volume/competition/bid data: blocked by missing active Mango Ads customer.
- BrightLocal tracker remapping and citation phone cleanup: checked read-only, but admin-write approval is required before changes.
- Ahrefs competitor/gap exports and keyword-volume evidence: baseline checked, but deeper exports are still pending.
- GA4 lead conversion evidence: property verified and `generate_lead` key event created, but live test validation is still required before conversion counts are used for monthly SEO reporting.
