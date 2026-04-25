# SEO Keyword Research, Tracking, and Reporting Task Queue

Date: 2026-04-24
Workstream: SEO keyword research, tracking, and reporting setup
Companion brief: `docs/technical/SEO_KEYWORD_RESEARCH_TRACKING_REPORTING_SETUP_2026-04.md`

## Purpose

This is the first execution artifact for the Mango Law SEO keyword research, tracking, and reporting setup. It converts the execution brief into a task queue that can be worked today without billing access or uncoordinated live admin changes.

## Access Labels

- `No admin`: repo, public site, local docs, or public SERP research only.
- `Browser read`: authenticated tool review only; no save/publish/submit actions.
- `Admin write`: creates, edits, uploads, requests indexing, saves settings, publishes tags, or changes tracked keywords.
- `Primary browser owner`: the single assigned agent for authenticated browser/admin changes.
- `Billing risk`: any payment method, subscription, plan, spend, campaign budget, or invoice surface. Do not touch.

## Coordination Rules

- Do not use the live authenticated browser unless explicitly assigned browser ownership.
- Do not touch billing.
- One primary agent owns BrightLocal, Ahrefs, GSC, GTM, GA4, Google Ads, GBP, and citation dashboard changes at a time.
- Subagents may do repo/doc/public research if they do not access authenticated admin surfaces.
- Any live `Admin write` task must be explicitly assigned before execution.

## Page Ownership Assumptions

| Lane | Current owner page | Status | Notes |
|---|---|---|---|
| Delaware OVI/DUI defense | `/ovi-dui-defense-delaware-oh` | Live owner | Primary commercial owner for OVI/DUI terms. Current code redirects `/delaware-ohio-ovi-lawyer` here, so do not treat that redirected URL as a separate owner. |
| Criminal defense | `/criminal-defense-delaware-oh` | Live owner | Primary owner for Delaware criminal-defense terms; recheck GSC because prior audit listed it in 5xx examples. |
| Drug crimes | `/drug-crime-lawyer-delaware-oh` | Live owner | Commercial owner for Delaware drug charge and possession/trafficking terms. |
| Protection orders | `/protection-order-lawyer-delaware-oh` | Live owner | Delaware protection-order owner; connect to civil-protection and no-contact informational assets. |
| Domestic violence | `/domestic-violence-lawyer-delaware-oh` and `/domestic-violence-first-offense-ohio-defense` | Live/support owners | Confirm which route should own commercial local terms after Planner/Ahrefs validation. |
| License suspension / ALS | `/als-license-suspension-ohio` | Live support owner | Likely OVI-support term set; promote only if Planner/GSC support exists. |
| OVI test refusal | `/ovi-test-refusal-lawyer-ohio` | Live support owner | Support page for refusal/SFST/BMV consequences, not broader OVI owner. |
| Motion to suppress | `/motion-to-suppress-ovi-ohio` | Live support owner | Use for problem-aware OVI defense queries and internal-link support. |
| First offense OVI | `/first-offense-ovi-ohio` | Live support owner | Track only if demand supports a dedicated live slot. |
| Felony OVI | `/felony-ovi-lawyer-ohio` | Live support owner | Track if evidence supports high-value felony OVI intent. |
| Checkpoints | `/resources/dui-checkpoints` and `/ovi-checkpoints-ohio` | Live resource owners | Track only while update/recency process is maintained. |
| Glossary / statutes | `/glossary` | Live informational owner | Long-tail ORC/legal definition support; avoid cannibalizing commercial pages. |
| White collar | `/white-collar-crimes-attorney-delaware-oh` | Live owner | Lower-priority commercial lane unless research shows demand. |
| Sex crimes | `/sex-crime-defense-lawyer-delaware-oh` | Live owner | Sensitive commercial lane; track cautiously with strong evidence. |
| Personal injury | `/personal-injury-lawyer-delaware-oh` | Secondary owner | Do not spend core tracker capacity on PI unless explicitly approved. |
| Intake/conversion | `/contact`, phone links, forms, chat/contact options | Conversion support | Validate reporting, not keyword ownership. |
| Trust/support | `/about`, `/reviews`, `/practice-areas`, `/locations` | Support pages | Use for internal linking, trust, and local discovery support. |

## Workbook Schema

Use this tab set for the first Mango SEO workbook or CSV package:

| Tab | Purpose | Minimum columns |
|---|---|---|
| `Summary` | Decisions, blockers, and next actions | date, owner, status, decision, blocker, next_action |
| `Recommended Tracked Keywords` | Final live tracker candidates | keyword, lane, owner_page, geo, decision, evidence_tier, priority, notes |
| `Evidence Ledger` | Raw research data | source, keyword, avg_monthly_searches, competition, low_bid, high_bid, gsc_clicks, gsc_impressions, ahrefs_metric, notes |
| `Current BrightLocal Keywords` | Export and keep/replace notes | current_keyword, current_location, keep_replace, reason, replacement_keyword |
| `Watchlist` | Deferred keywords | keyword, lane, reason_deferred, required_page_or_evidence, review_date |
| `Page Ownership Map` | One owner per tracked term | page, lane, geo, owns_keywords, supports_keywords, status, risk |
| `GSC Indexing Queue` | URL inspection/recheck list | url, priority, expected_owner_role, jan_2026_status, current_status, action_needed |
| `Ahrefs Validation` | Competitive/gap review | keyword_or_page, competitor_url, opportunity, difficulty_signal, action |
| `GA4 GTM Status` | Measurement validation | event, source_code_event, gtm_trigger, ga4_event, key_event, status, notes |
| `On-Site Support Map` | Follow-up for site work | page, issue, recommended_change, dependency, risk |
| `Off-Site Local SEO` | GBP/citation/review/link work | platform, issue, owner, access_needed, risk, next_action |
| `Account Status` | Access and ownership record | tool, account_or_property, access_level, browser_owner_required, billing_risk, notes |

## Task Queue

### No-Admin Tasks Ready Today

| ID | Task | Owner | Access | Output | Risk notes |
|---|---|---|---|---|---|
| KW-001 | Build page inventory from `src/app/sitemap.ts`, navigation, and existing SEO docs. | Repo/docs agent | No admin | `Page Ownership Map` rows | No live site changes. |
| KW-002 | Create initial seed keyword list by lane: OVI, criminal defense, drug crimes, protection orders, domestic violence, ALS/license suspension, sex crimes, white collar, checkpoints, glossary/statutes, PI secondary. | SEO research agent | No admin | `Evidence Ledger` draft rows with source=`Seed` | Mark all as unvalidated until Planner/GSC/Ahrefs evidence exists. |
| KW-003 | Create geo modifier matrix: Delaware, Delaware County, Columbus, Franklin County, Dublin, Powell, Westerville, New Albany, Union County, Morrow County, Marion County, Ohio. | SEO research agent | No admin | Geo column values and watchlist candidates | County pages remain preferred expansion unit; do not propose thin city pages by default. |
| KW-004 | Split draft terms into `Track candidate`, `Watchlist`, and `Drop` before tool data. | SEO research agent | No admin | Draft `Recommended Tracked Keywords` and `Watchlist` tabs | Decisions are provisional until Planner/tool evidence is added. |
| KW-005 | Prepare BrightLocal tracked-keyword import template but do not upload. | SEO research agent | No admin | Import-ready keyword list draft | Requires later BrightLocal owner review before upload. |
| KW-006 | Extract January 2026 GSC audit priority URLs and issue notes into `GSC Indexing Queue`. | Repo/docs agent | No admin | URL queue | Do not request indexing. |
| KW-007 | Review source code analytics events and map current dataLayer events to GA4/GTM expected events. | Repo/docs agent | No admin | `GA4 GTM Status` draft | Current source events include `mango_page_view`, `cta_click`, `experiment_exposure`, and `lead_submitted`. |
| KW-008 | Prepare on-site support tasks for internal links, sitemap presence, canonical checks, schema checks, and owner-page clarity. | Repo/docs agent | No admin | `On-Site Support Map` draft | No code edits unless separately assigned. |
| KW-009 | Prepare off-site local SEO queue from the BrightLocal NAP audit. | Repo/docs agent | No admin | `Off-Site Local SEO` draft | Do not log into vendor dashboards. |
| KW-010 | Identify terms with no owner page and mark whether they need a new county page, support page, or watchlist. | SEO research agent | No admin | Missing-owner report | Avoid recommending new pages solely from intuition. |

### Google Ads Keyword Planner

| ID | Task | Owner | Access | Output | Risk notes |
|---|---|---|---|---|---|
| GKP-001 | Confirm Google Ads access and that Keyword Planner is available. | Primary browser owner | Browser read | Account status note | Do not enter billing, campaigns, budgets, or payment settings. |
| GKP-002 | Research OVI/DUI seed groups with Delaware, Columbus, and Ohio modifiers. | Primary browser owner | Browser read | Planner rows in `Evidence Ledger` | Export/read only. No campaign creation. |
| GKP-003 | Research criminal-defense, domestic-violence, protection-order, drug, weapons, sex-crime, white-collar, and PI secondary terms. | Primary browser owner | Browser read | Planner rows by lane | Keep PI secondary unless approved. |
| GKP-004 | Export Planner results or manually capture avg monthly searches, competition, and bid ranges. | Primary browser owner | Browser read | Evidence ledger update | No billing or ad launch. |
| GKP-005 | Promote only evidence-backed terms into `Recommended Tracked Keywords`. | SEO lead | No admin | Draft tracked set | Requires tracker limit before final sizing. |

### BrightLocal

| ID | Task | Owner | Access | Output | Risk notes |
|---|---|---|---|---|---|
| BL-001 | Confirm BrightLocal browser/admin ownership before entering the account. | Workstream lead | Coordination | Owner note | Blocked until owner is assigned. |
| BL-002 | Export current tracked keywords, location settings, search engine, location, and device assumptions. | Primary browser owner | Browser read | `Current BrightLocal Keywords` tab | Read/export only. |
| BL-003 | Confirm tracker keyword limit. | Primary browser owner | Browser read | Limit recorded in `Summary` | Do not upgrade plan or touch billing. |
| BL-004 | Compare current tracked terms against new draft tracked set. | SEO lead | No admin | keep/replace notes | No account changes. |
| BL-005 | Upload/update final tracked keyword set only after approval. | Primary browser owner | Admin write | Updated BrightLocal tracker | Requires explicit assignment. Do not touch billing. |
| BL-006 | Coordinate separately with BrightLocal handoff owner for core service set and Citation Builder phone/description cleanup. | Primary browser owner | Admin write | BrightLocal cleanup note | This is separate from keyword tracking and remains governed by BrightLocal finish scope. |

### Ahrefs

| ID | Task | Owner | Access | Output | Risk notes |
|---|---|---|---|---|---|
| AH-001 | Confirm Ahrefs access and project/site context. | Primary browser owner | Browser read | Account status note | Do not change subscription or billing. |
| AH-002 | Validate commercial keyword candidates for OVI and criminal defense against competitor pages. | SEO lead or browser owner | Browser read | `Ahrefs Validation` rows | Use as validation, not sole evidence. |
| AH-003 | Review gap opportunities for domestic violence, drug charges, ALS, refusal, checkpoints, and glossary/statute content. | SEO lead or browser owner | Browser read | opportunity rows | Demote terms without page fit. |
| AH-004 | Capture backlink/local citation opportunities relevant to legal/local authority. | SEO lead or browser owner | Browser read | `Off-Site Local SEO` rows | No outreach from authenticated accounts unless separately assigned. |

### Google Search Console

| ID | Task | Owner | Access | Output | Risk notes |
|---|---|---|---|---|---|
| GSC-001 | Confirm access to `sc-domain:mango.law` and `https://mango.law/`. | Primary browser owner | Browser read | Account status note | Read only. |
| GSC-002 | Recheck Pages report totals and top not-indexed reasons. | Primary browser owner | Browser read | `GSC Indexing Queue` status update | No validation/request actions. |
| GSC-003 | Reinspect priority owner URLs from this queue. | Primary browser owner | Browser read | URL inspection rows | Do not request indexing unless assigned. |
| GSC-004 | Review Breadcrumb and FAQ enhancement reports. | Primary browser owner | Browser read | Enhancement notes | Read only. |
| GSC-005 | Request indexing for approved high-priority URLs after on-site changes. | Primary browser owner | Admin write | Request-indexing log | Requires explicit authorization. |
| GSC-006 | Validate fix for any remaining 5xx issue set only after production behavior is verified. | Primary browser owner | Admin write | Validation log | Requires explicit authorization. |

Priority GSC URL queue:

| Priority | URL | Reason |
|---|---|---|
| P0 | `/ovi-dui-defense-delaware-oh` | Primary OVI owner; prior audit showed important OVI URLs with weak/unknown indexing states. |
| P0 | `/criminal-defense-delaware-oh` | Primary criminal-defense owner; prior audit listed it in 5xx examples. |
| P0 | `/contact` | Conversion page and reporting endpoint. |
| P1 | `/drug-crime-lawyer-delaware-oh` | Commercial owner. |
| P1 | `/protection-order-lawyer-delaware-oh` | Commercial owner. |
| P1 | `/domestic-violence-lawyer-delaware-oh` | Commercial/support owner requiring ownership confirmation. |
| P1 | `/als-license-suspension-ohio` | OVI support owner. |
| P1 | `/ovi-test-refusal-lawyer-ohio` | OVI support owner. |
| P1 | `/resources/dui-checkpoints` | Resource owner and local recency asset. |
| P1 | `/glossary` | Informational/statute hub. |
| P2 | `/reviews` | Trust/conversion support. |
| P2 | `/locations` | Local discovery support. |
| P2 | `/blog` | Discovery hub for supporting content. |

### GA4 and GTM

| ID | Task | Owner | Access | Output | Risk notes |
|---|---|---|---|---|---|
| GA-001 | Confirm production GA4 property and web stream naming. | Primary browser owner | Browser read | `Account Status` row | Do not change settings. |
| GA-002 | Confirm GTM container `GTM-WLJQZKB5` and production workspace. | Primary browser owner | Browser read | `Account Status` row | Do not publish. |
| GA-003 | Verify source events map to GA4 events: `mango_page_view`, `cta_click`, `lead_submitted`, `experiment_exposure`. | Analytics lead | Browser read | `GA4 GTM Status` rows | Read/debug only unless assigned. |
| GA-004 | Confirm `lead_submitted` is treated as the core SEO lead event or mapped to GA4 key events. | Analytics lead | Browser read | Reporting note | No key-event changes unless assigned. |
| GA-005 | Validate phone, email, contact form, chat, and CTA events in Realtime/DebugView. | Primary browser owner | Browser read | Event validation note | Debug only. |
| GA-006 | Publish GTM/GA4 event fixes if gaps are found and approved. | Primary browser owner | Admin write | Published tag/version note | Requires explicit authorization; do not publish casually. |

### On-Site Support

| ID | Task | Owner | Access | Output | Risk notes |
|---|---|---|---|---|---|
| SITE-001 | Confirm every track-now owner page is in `src/app/sitemap.ts`. | Repo/docs agent | No admin | On-site support row | Current sitemap includes major practice/support pages. |
| SITE-002 | Confirm redirected URLs are not assigned as separate keyword owners. | Repo/docs agent | No admin | Ownership note | `/delaware-ohio-ovi-lawyer` redirects to OVI owner. |
| SITE-003 | Audit internal links from `/practice-areas`, `/blog`, `/glossary`, `/resources/dui-checkpoints`, and footer navigation to owner pages. | Repo/docs agent | No admin | Internal-link task list | Do not edit code unless separately assigned. |
| SITE-004 | Mark pages needing metadata/schema/canonical review after keyword map is final. | SEO lead | No admin | On-site support map | Avoid public content edits without approval. |
| SITE-005 | Identify missing page candidates from validated keyword gaps. | SEO lead | No admin | Missing-page list | County pages preferred over thin city pages. |

### Off-Site Local SEO

| ID | Task | Owner | Access | Output | Risk notes |
|---|---|---|---|---|---|
| OFF-001 | Convert BrightLocal NAP audit priorities into local SEO queue rows. | Repo/docs agent | No admin | `Off-Site Local SEO` rows | No vendor login. |
| OFF-002 | Keep BrightLocal core/Citation Builder cleanup as the first local SEO admin priority. | Workstream lead | Coordination | Summary note | Governed by BrightLocal finish scope. |
| OFF-003 | Queue GBP category/service review for OVI, criminal defense, domestic violence, drug charges, and license suspension alignment. | Primary browser owner | Browser read/admin write if saving | GBP row | Do not save changes unless assigned. |
| OFF-004 | Queue citation cleanup after BrightLocal is stable: YellowPages, ReachAttorneys, Yelp category pruning, Justia, ezlocal, LawyerLand, LocalStack, Yahoo Local, DexKnows. | Local SEO owner | Browser/admin varies | Citation queue | Authenticated vendor changes require owner assignment. |
| OFF-005 | Build legal/local backlink opportunity watchlist from Ahrefs and current resources. | SEO lead | Browser read or No admin | Backlink queue | Outreach requires separate approval. |

## Immediate Next Actions

1. Create the workbook or CSV package using the schema above.
2. Populate `Page Ownership Map` from the sitemap and ownership assumptions in this file.
3. Populate `GSC Indexing Queue` from the priority URL queue and January 2026 audit.
4. Draft the seed keyword list and mark every row as unvalidated.
5. Wait for explicit browser ownership before entering Google Ads, BrightLocal, Ahrefs, GSC, GA4, or GTM.

