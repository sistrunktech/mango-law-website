# SEO Keyword Research, Tracking, and Reporting Setup

Date: 2026-04-24
Owner: Sistrunk Tech / Mango Law
Workstream: SEO keyword research, tracking, and reporting setup
Primary repo/worktree: `mango-law-website.wt/brightlocal-handoff-2026-04`

## Purpose

This brief adapts the Sistrunk Tech `SEO Keyword Research & Tracking SOP` to Mango Law's criminal-defense SEO campaign. It defines the execution path for keyword research, rank tracking, BrightLocal, Ahrefs, Google Search Console, GA4/GTM reporting validation, and follow-up work that can start today without billing access or destructive admin changes.

The named prior thread, `Audit docs and next steps`, was not directly available in this environment. This brief is based on the local Mango docs, the BrightLocal handoff packet, the January 2026 Search Console audit, and the reusable Sistrunk Tech SOP.

## Current Source Documents

- `docs/technical/SEO-STRATEGY-2025.md`
- `docs/technical/SEO-CRAWL-STRATEGY.md`
- `docs/technical/brightlocal-handoff/BRIGHTLOCAL_FINISH_SCOPE_2026-04-08.md`
- `docs/technical/brightlocal-handoff/BRIGHTLOCAL_OPERATOR_PROMPT_2026-04-08.md`
- `docs/technical/brightlocal-handoff/NAP_AUDIT_2026-04-06.md`
- `docs/technical/HANDOFF_GLOSSARY.md`
- `docs/audits/gsc-2026-01-27/REPORT.md`
- Sistrunk Tech SOP: `/Users/sistech_tim/Dev/workspaces/sistech_tim/internal/sistrunk_tech_2025111/docs/kb/sops/seo-keyword-research-tracking.md`

## Operating Rules

- Do not touch billing.
- Do not use the signed-in browser for live admin changes unless the user or parent agent explicitly assigns browser ownership.
- Only one primary agent should own authenticated changes in BrightLocal, Ahrefs, Google Search Console, Google Tag Manager, GA4, Google Ads, Gmail, GBP, and citation dashboards at a time.
- Repo and docs analysis can run in subagents when it does not require authenticated browser state.
- Live BrightLocal, Ahrefs, GSC, GTM, GA4, GBP, or Google Ads changes must be primary-agent owned or explicitly coordinated in writing before work starts.
- Treat `Mango Law LLC` as the legal business name and `Mango Law` as an acceptable display variant.
- Treat `(740) 417-6191` as the public office/default phone and `(740) 602-2155` as Nick's direct cell.
- Do not broaden BrightLocal cleanup into low-value citations until the BrightLocal core and Citation Builder records are aligned.
- Do not invent legal claims or practice-area positioning. Verify legal statements against primary sources before they become public copy.

## Workstream Outputs

The workstream should produce:

1. Keyword evidence ledger with source and confidence for every tracked term.
2. Recommended tracked keyword set sized to the live BrightLocal limit.
3. Watchlist for terms that are useful but should not consume live tracker slots yet.
4. Page-to-keyword ownership map for practice, local, conversion, resource, and watchlist pages.
5. BrightLocal keyword tracking and location/campaign update plan.
6. Ahrefs validation notes and competitor/opportunity gaps.
7. GSC indexing and enhancement review notes.
8. GA4/GTM reporting validation note for SEO lead events.
9. On-site support map for copy, internal links, schema, sitemap, and indexing follow-up.
10. Off-site support map for GBP, citations, reviews, backlinks, and entity reinforcement.

## Evidence Rules

Every tracked keyword should have at least one evidence tier:

- `Direct Planner`: exact term found in Google Ads Keyword Planner.
- `Close-variant Planner`: exact term absent, but close commercial variant has measurable demand.
- `Current-track carryover`: already tracked and still tied to a live Mango page.
- `GSC support`: impressions/clicks support a live page or near-term page improvement.
- `Ahrefs support`: competitor or gap data supports the term, but page fit still controls.

Do not use Ahrefs or GSC alone to force a term into the live tracker if there is no clear page owner or legal-service fit.

## Mango Page-to-Keyword Ownership Model

### Core Practice-Area Owners

| Page owner | Primary intent | Example tracked targets | Notes |
|---|---|---|---|
| `/ovi-dui-defense-delaware-oh` | Delaware OVI/DUI defense | `delaware ohio ovi lawyer`, `dui lawyer delaware ohio`, `ovi attorney delaware ohio` | Highest commercial priority; should connect to SFST, refusal, ALS, checkpoints, and DataMaster proof points. |
| `/delaware-ohio-ovi-lawyer` | Historical local Delaware OVI signal | `delaware ohio ovi lawyer`, `ovi lawyer near delaware ohio` | Current code redirects this URL to `/ovi-dui-defense-delaware-oh`; do not treat it as a separate owner page. |
| `/criminal-defense-delaware-oh` | Delaware criminal defense | `criminal defense attorney delaware ohio`, `criminal lawyer delaware ohio` | P0 commercial page; was listed as a prior GSC 5xx example and should be rechecked. |
| `/drug-crime-lawyer-delaware-oh` | Drug charge defense | `drug crime lawyer delaware ohio`, `drug possession attorney delaware ohio` | Tie to possession vs trafficking and search/seizure support content. |
| `/protection-order-lawyer-delaware-oh` | Protection order defense | `protection order lawyer delaware ohio`, `cpo defense attorney ohio` | Connect to domestic violence/no-contact/CPO informational pages. |
| `/sex-crime-defense-lawyer-delaware-oh` | Sex crime defense | `sex crime lawyer delaware ohio`, `sexual battery defense ohio` | Track cautiously; strong page ownership and reputation sensitivity required. |
| `/white-collar-crimes-attorney-delaware-oh` | White collar defense | `white collar crime attorney delaware ohio`, `theft fraud defense lawyer ohio` | Likely lower volume; include if Planner or Ahrefs supports. |
| `/personal-injury-lawyer-delaware-oh` | Personal injury | `personal injury lawyer delaware ohio` | Secondary only. Do not let PI consume slots needed for criminal-defense priorities. |

### Local Intent Owners

| Geo lane | Owner strategy | Track-now examples | Watchlist examples |
|---|---|---|---|
| Delaware / Delaware County | Existing Delaware-focused practice pages | `delaware ohio criminal defense attorney`, `delaware county ovi lawyer` | court-specific and judge-specific phrases unless evidence supports. |
| Columbus / Franklin County | Current pages plus future county page if justified | `columbus ovi lawyer`, `franklin county criminal defense attorney` | `dublin dui lawyer`, `westerville criminal defense lawyer`, `new albany ovi attorney`. |
| Ohio statewide | Informational/legal resource pages | `ohio ovi lookback period`, `ohio field sobriety test refusal`, `ohio dui checkpoints` | statewide commercial head terms if no local page owner exists. |
| Union / Morrow / Marion | Future county pages from SEO strategy | `union county ovi lawyer`, `marion county criminal defense attorney` | low-volume rural variants until Planner/GSC evidence justifies pages. |

### Intake and Conversion Owners

| Page owner | Intent | Tracking use |
|---|---|---|
| `/contact` | Consultation and lead conversion | Do not use as owner for broad commercial search. Validate lead events and call/email click reporting. |
| `/reviews` | Trust and decision support | Support conversion reporting and local trust, not primary keyword ownership. |
| `/about` | Attorney trust and credentials | Support branded and E-E-A-T queries; reinforce former prosecutor, SFST, and DataMaster credentials where verified. |
| `/practice-areas` | Discovery hub | Internal-link support for all tracked practice pages; not the owner for specific high-intent practice terms. |

### Informational Legal Content Owners

| Content lane | Owner examples | Keyword role |
|---|---|---|
| OVI process | `/blog/ohio-dui-lookback-period`, `/blog/refuse-field-sobriety-test-ohio`, `/blog/physical-control-parked-car-ohio-kevin-mcguff` | Capture problem-aware long tail and route to OVI pages. |
| Checkpoints | `/resources/dui-checkpoints`, `/ovi-checkpoints-ohio`, checkpoint-related blog posts | Track recency and Ohio/local checkpoint queries only when the content stays current. |
| Criminal process | `/blog/motion-practice-criminal-defense`, bond/jail posts | Support criminal-defense pillar and court/process questions. |
| Glossary/statutes | `/glossary` and future `/glossary/:slug` pages | Long-tail ORC and legal-definition ownership; should not replace commercial practice pages. |

### Watchlist Topics

Use watchlist instead of live tracker slots until evidence or page ownership improves:

- `first ovi court date delaware county`
- `als suspension ohio lawyer`
- `ohio datamaster breath test`
- `nhtsa sfst certified attorney ohio`
- `delaware county municipal court ovi`
- `columbus dui checkpoints`
- `domestic violence defense attorney delaware ohio`
- `no contact order lawyer ohio`
- `drug possession vs trafficking ohio`
- `improper handling firearm motor vehicle ohio`
- `ccw charge lawyer ohio`
- `expungement lawyer delaware ohio` unless confirmed as a current service priority
- suburb terms for Dublin, Powell, Westerville, and New Albany
- rural county variants for Union, Morrow, and Marion
- personal injury variants unless separately approved as a secondary campaign

## Setup Workflow

### 1. Public Page and Repo Baseline

Start without admin access:

- Export or list current sitemap routes from `src/app/sitemap.ts`.
- Confirm which practice, resource, blog, glossary, and conversion pages are live.
- Mark each page as `Commercial owner`, `Local owner`, `Informational support`, `Conversion support`, `Trust support`, or `No SEO ownership`.
- Reconcile the current page inventory against `SEO-STRATEGY-2025.md`.
- Preserve the no-thin-city-page rule. County pages are the preferred expansion unit.

### 2. Google Ads Keyword Planner Research

Use Google Ads Keyword Planner only when browser/tool ownership is assigned.

Research seed groups:

- OVI/DUI: OVI lawyer, DUI attorney, drunk driving lawyer, field sobriety test, breath test, ALS, refusal, checkpoints.
- Criminal defense: criminal defense attorney, criminal lawyer, misdemeanor, felony, traffic violations.
- Domestic violence/protection orders: domestic violence defense, assault defense, CPO, protection order, no-contact order.
- Drug charges: drug possession, trafficking, controlled substance, search and seizure.
- Weapons: CCW, improper handling, weapons disability.
- White collar: fraud, theft, embezzlement, white collar defense.
- Local modifiers: Delaware, Delaware County, Columbus, Franklin County, Dublin, Powell, Westerville, New Albany, Union County, Morrow County, Marion County, Ohio.

Capture for each row:

- keyword
- lane
- owner page
- geo strategy
- average monthly searches
- three-month change
- year-over-year change
- competition
- low and high top-of-page bid
- evidence tier
- decision: `Track now`, `Watchlist`, or `Drop`
- notes

### 3. BrightLocal Tracked Keyword Setup

BrightLocal has two related but separate concerns for Mango:

1. The unfinished local SEO cleanup in `brightlocal-handoff`.
2. The tracked keyword set for monthly SEO reporting.

Before making any live BrightLocal change:

- Confirm a single agent owns BrightLocal browser/admin work.
- Export the current tracked keyword list if available.
- Confirm the tracker limit, search engine, location, and device settings.
- Keep the location/campaign NAP source of truth aligned with the BrightLocal finish scope.

Recommended live keyword mix once research is complete:

- majority OVI/DUI and criminal-defense terms
- Delaware/Delaware County terms as the core local set
- limited Columbus/Franklin terms if the page ownership is clear
- limited DV/drug/license-suspension terms because those are current BrightLocal campaign priorities
- no personal-injury expansion unless explicitly approved

Known BrightLocal operations that remain separate from keyword tracking:

- core service set still needs alignment to OVI / DUI Defense, Criminal Defense, Domestic Violence Defense, Drug Charge Defense, and License Suspension Defense
- Citation Builder campaign still needs phone and description alignment
- Citation Builder should not be assumed to inherit from the core record without rechecking

### 4. Ahrefs Validation

Use Ahrefs after the initial Planner and page ownership pass.

Validate:

- competitor pages ranking for Delaware/Columbus OVI and criminal-defense terms
- whether Mango has missing commercial topics with clear page fit
- backlink and local citation gaps tied to trustworthy legal/local sources
- whether checkpoint, glossary, and blog resources are attracting or eligible for links
- whether terms should be demoted to watchlist due to unrealistic SERPs or missing page fit

Ahrefs should refine the set, not replace the Planner/page ownership model.

### 5. Google Search Console Review

Start from the January 27, 2026 GSC audit baseline:

- both `sc-domain:mango.law` and `https://mango.law/` properties existed
- sitemap submission was successful
- indexed coverage was low relative to discovered URLs
- dominant issue was `Discovered - currently not indexed`
- examples included high-value pages that were URL unknown but live-testable
- prior 5xx examples included `/about` and `/criminal-defense-delaware-oh`

Review today:

- Pages report in both properties
- sitemap last read and discovered URL count
- high-priority owner pages in URL Inspection
- Breadcrumb and FAQ enhancement reports
- manual actions and security reports
- query/page performance for owner pages

Priority URLs to inspect or record:

- `/`
- `/ovi-dui-defense-delaware-oh`
- `/delaware-ohio-ovi-lawyer`
- `/criminal-defense-delaware-oh`
- `/drug-crime-lawyer-delaware-oh`
- `/protection-order-lawyer-delaware-oh`
- `/practice-areas`
- `/locations`
- `/resources/dui-checkpoints`
- `/glossary`
- `/blog`
- `/contact`
- `/reviews`

Do not request indexing from the browser unless browser/admin ownership is assigned. Without browser ownership, prepare the inspection/request-indexing queue only.

### 6. GA4 and GTM Reporting Validation

Validate reporting without changing tags unless admin ownership is assigned.

Minimum reporting questions:

- Is the site using direct GA, GTM, or both?
- Are phone clicks, form submissions, email clicks, and consultation CTAs recorded?
- Are lead events normalized for monthly reporting?
- Are duplicate tracking paths present?
- Can SEO landing pages be tied to conversion events?
- Are consent or script-loading conditions blocking expected events?

Recommended event standard for Mango SEO reporting:

- `generate_lead`: successful contact form or consultation request
- `contact`: phone click, email click, or primary contact CTA click
- `click_to_call`: phone click with destination metadata
- `email_click`: email link click with destination metadata
- `form_submit`: raw form submit event if useful for debugging

Reporting dimensions to preserve:

- landing page
- page path
- session source / medium
- campaign when available
- device category
- event name
- conversion status

### 7. Reporting Workbook

Create or update the Mango SEO operating workbook with these tabs:

- `Summary`
- `Recommended Tracked Keywords`
- `Evidence Ledger`
- `Current BrightLocal Keywords`
- `Watchlist`
- `Page Ownership Map`
- `GSC Indexing Queue`
- `Ahrefs Validation`
- `GA4 GTM Status`
- `On-Site Support Map`
- `Off-Site Local SEO`
- `Account Status`

If no workbook access is available, prepare the tab schemas and rows in a local CSV or Markdown handoff first.

## Today-Ready Actions Without Billing or Destructive Admin Changes

These can be worked immediately:

1. Build the public page inventory from the repo and sitemap source.
2. Draft the keyword seed list by lane and geo modifier.
3. Create the page ownership map and mark missing or weak owner pages.
4. Build a draft `Track now` vs `Watchlist` framework before live tool data is added.
5. Prepare the BrightLocal tracked-keyword import template without uploading it.
6. Prepare the BrightLocal admin checklist for the primary browser owner.
7. Prepare the GSC URL Inspection queue and enhancement-review checklist.
8. Prepare the GA4/GTM validation checklist and expected event taxonomy.
9. Extract the January 2026 GSC audit URLs into a recheck queue.
10. Draft on-site support tasks for internal links from `/practice-areas`, `/blog`, `/glossary`, `/resources/dui-checkpoints`, and conversion pages.
11. Draft off-site support tasks from the BrightLocal NAP audit without logging into vendor dashboards.
12. Identify terms that should not be tracked yet because they lack page ownership.

## On-Site Follow-Up Map

Create follow-up tasks only after the keyword/page map is clear:

- strengthen internal links to OVI and criminal-defense owner pages
- verify high-value pages are in the sitemap and render server HTML
- recheck canonical tags and titles for owner pages
- ensure glossary/statute pages support, not cannibalize, practice pages
- add or refine FAQ/Breadcrumb schema only where supported by page content
- request indexing for updated high-value pages after copy/schema/link changes
- keep legal accuracy reviews tied to ORC and official sources

## Off-Site Follow-Up Map

Use the BrightLocal handoff as the local SEO operating packet:

- finish BrightLocal core service set and Citation Builder campaign alignment before lower-value citations
- keep GBP categories/services aligned with criminal defense, OVI/DUI, domestic violence, drug charges, and license suspension
- continue citation cleanup only after BrightLocal is stable
- prioritize YellowPages, ReachAttorneys, Yelp category pruning, Justia, ezlocal, and old-address/domain directories according to the NAP audit
- build review and backlink opportunities around trustworthy legal/local/community sources
- avoid broad personal-injury category drift unless intentionally approved

## Acceptance Criteria

This workstream is ready for execution when:

- every proposed tracked keyword has evidence tier, owner page, lane, and geo strategy
- every owner page is marked as live, needs improvement, or missing
- BrightLocal tracked-keyword changes are prepared and coordinated with the browser/admin owner
- GSC recheck queue is ready with priority URLs and issue categories
- GA4/GTM validation checklist defines expected lead events and reporting gaps
- watchlist terms are separated from live tracker terms
- no billing, destructive settings, or uncoordinated admin changes were made
