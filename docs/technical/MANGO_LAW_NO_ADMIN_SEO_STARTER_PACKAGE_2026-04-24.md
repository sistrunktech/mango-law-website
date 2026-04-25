# Mango Law No-Admin SEO Starter Package

Date: 2026-04-24
Scope: KW-001 through KW-010 from `docs/technical/SEO_KEYWORD_RESEARCH_TRACKING_TASK_QUEUE_2026-04.md`
Access used: repo/docs only
Admin status: no live browser, no admin tools, no billing, no uploads

## Status

This is a starter package, not a final tracker upload. Every keyword decision below is provisional and unvalidated until Google Ads Keyword Planner, GSC, Ahrefs, and BrightLocal exports are reviewed by the assigned browser/admin owner.

Primary sources used:

- `src/app/sitemap.ts`
- `src/data/navigation.ts`
- `src/data/practiceAreas.ts`
- `src/data/serviceAreas.ts`
- `src/app/(site)/**/page.tsx` route inventory
- `docs/technical/SEO_KEYWORD_RESEARCH_TRACKING_TASK_QUEUE_2026-04.md`
- `docs/technical/SEO_KEYWORD_RESEARCH_TRACKING_REPORTING_SETUP_2026-04.md`
- `docs/technical/SEO-STRATEGY-2025.md`
- `docs/audits/gsc-2026-01-27/REPORT.md`
- `docs/technical/brightlocal-handoff/NAP_AUDIT_2026-04-06.md`
- `docs/technical/brightlocal-handoff/BRIGHTLOCAL_FINISH_SCOPE_2026-04-08.md`

## Summary Decisions

| Decision | Status | Notes | Next action |
|---|---|---|---|
| Use `/ovi-dui-defense-delaware-oh` as the OVI/DUI commercial owner | Provisional track candidate | Sitemap includes the page; `/delaware-ohio-ovi-lawyer` redirects to it in source. | Validate GSC state and Planner demand. |
| Use `/criminal-defense-delaware-oh` as the criminal-defense commercial owner | Provisional track candidate | Sitemap/nav/practice area page all point here; January GSC audit listed it in 5xx examples. | Reinspect before relying on rank tracking. |
| Treat `/drug-crime-lawyer-delaware-oh` and `/protection-order-lawyer-delaware-oh` as commercial owners | Provisional track candidate | Sitemap/nav/practice area inventory supports ownership. | Validate demand and indexing. |
| Treat domestic violence ownership as split | Watchlist until confirmed | `/domestic-violence-lawyer-delaware-oh` is the commercial owner; `/domestic-violence-first-offense-ohio-defense` is a support page. | Confirm which terms each page should own after data review. |
| Keep county expansion terms on watchlist | Watchlist | Existing strategy says county pages are preferred expansion units and suburb pages should not be thin. | Promote only with Planner/GSC/Ahrefs evidence and page plan. |
| Do not use `/contact`, `/reviews`, `/about`, or `/practice-areas` as broad keyword owners | Drop as owners | These are conversion/trust/hub pages, not primary commercial search owners. | Use them for reporting and internal linking support. |
| BrightLocal import remains draft-only | Not uploaded/not final | No BrightLocal access used. Tracker limit/current keywords unknown. | Browser/admin owner must export current tracker and confirm limit before upload. |

## Page Inventory and Ownership Map

### Sitemap-Owned Public Routes

| Page | Source | Role | Owns keywords | Supports keywords | Status | Risk/notes |
|---|---|---|---|---|---|---|
| `/` | Sitemap | Trust/local entry | Branded and local discovery only | OVI, criminal defense, contact | Live | Do not assign as owner for practice terms. |
| `/about` | Sitemap/nav | Trust support | Attorney/branded trust terms | All commercial lanes | Live | January GSC audit showed prior 5xx example but indexed at inspection time. |
| `/practice-areas` | Sitemap/nav | Hub support | Practice-area discovery only | All practice pages | Live | Internal-link support page, not final owner for specific terms. |
| `/ovi-dui-defense-delaware-oh` | Sitemap/nav/practice area | Commercial owner | Delaware OVI/DUI defense | ALS, refusal, motion, checkpoints, first/felony OVI | Live owner | P0 GSC queue; Jan audit showed URL unknown but live test passed. |
| `/criminal-defense-delaware-oh` | Sitemap/nav/practice area | Commercial owner | Delaware criminal defense | Drug, DV, protection, sex, white collar, process posts | Live owner | P0 GSC queue; Jan audit listed as 5xx example. |
| `/drug-crime-lawyer-delaware-oh` | Sitemap/nav/practice area | Commercial owner | Drug charges, possession, trafficking | Drug possession vs trafficking support | Live owner | P1 GSC queue. |
| `/sex-crime-defense-lawyer-delaware-oh` | Sitemap/nav/practice area | Commercial owner | Sex crime defense | Criminal-defense pillar | Live owner | Sensitive lane; track only with evidence. |
| `/white-collar-crimes-attorney-delaware-oh` | Sitemap/nav/practice area | Commercial owner | White collar, fraud, embezzlement | Criminal-defense pillar | Live owner | Lower-priority unless demand exists. |
| `/protection-order-lawyer-delaware-oh` | Sitemap/nav/practice area | Commercial owner | Protection order/CPO defense | DV, civil protection order support | Live owner | P1 GSC queue. |
| `/domestic-violence-lawyer-delaware-oh` | Sitemap/nav/practice area | Commercial owner | Domestic violence defense | First offense DV support, protection order | Live owner | P1 GSC queue; confirm commercial ownership split. |
| `/personal-injury-lawyer-delaware-oh` | Sitemap/practice area | Secondary commercial owner | Personal injury Delaware Ohio | Trust/contact | Live secondary | Keep out of core tracker unless approved. |
| `/reviews` | Sitemap/nav | Trust support | Review/branded trust terms | Conversion and local trust | Live | P2 GSC queue; state flipped during Jan audit. |
| `/contact` | Sitemap/nav | Conversion support | Contact/branded contact terms only | Lead reporting | Live | P0 GSC queue; validate events, not rank ownership. |
| `/blog` | Sitemap/nav | Informational hub | Blog/discovery terms | Practice support | Live | P2 GSC queue; use to strengthen post discovery. |
| `/glossary` | Sitemap/nav | Informational owner | ORC/legal definitions | OVI, DV/CPO, drug, criminal process | Live | P1 GSC queue; avoid cannibalizing commercial pages. |
| `/of-counsel` | Sitemap/nav | Trust support | Of counsel/branded terms | Complex matter trust | Live | Not a rank-tracker priority. |
| `/locations` | Sitemap/nav | Local support | Service area discovery | Delaware/Franklin/county terms | Live | P2 GSC queue; Jan audit showed URL unknown and indexing requested. |
| `/resources/dui-checkpoints` | Sitemap/nav | Resource owner | DUI checkpoints, Ohio checkpoint terms | OVI pillar | Live | P1 GSC queue; track only if recency process is maintained. |
| `/ovi-checkpoints-ohio` | Sitemap/docs | Resource/support owner | Ohio OVI checkpoint terms | OVI pillar, checkpoint map | Live | Support page; avoid duplicating `/resources/dui-checkpoints`. |
| `/holiday-ovi-enforcement-ohio` | Sitemap/docs | Informational support | Holiday enforcement OVI terms | OVI pillar/checkpoints | Live | Seasonal watchlist only. |
| `/first-offense-ovi-ohio` | Sitemap/nav | OVI support owner | First offense OVI | Main OVI owner | Live | Watchlist/track candidate depending demand. |
| `/felony-ovi-lawyer-ohio` | Sitemap/nav | OVI support owner | Felony OVI | Main OVI owner | Live | Track if high-value evidence exists. |
| `/ovi-test-refusal-lawyer-ohio` | Sitemap/nav | OVI support owner | OVI refusal, test refusal | Main OVI owner, ALS | Live | P1 GSC queue. |
| `/als-license-suspension-ohio` | Sitemap/nav | OVI support owner | ALS/license suspension | Main OVI owner | Live | P1 GSC queue. |
| `/motion-to-suppress-ovi-ohio` | Sitemap/nav | OVI support owner | Motion to suppress OVI | Main OVI owner | Live | Strong problem-aware support page. |
| `/domestic-violence-first-offense-ohio-defense` | Sitemap/docs | DV support owner | First offense domestic violence | DV commercial owner | Live | Support owner, not broad local commercial owner by default. |
| `/civil-protection-order-defense-ohio` | Sitemap/docs | Protection-order support owner | Civil protection order defense | Protection-order commercial owner | Live | Could support CPO/no-contact watchlist. |
| `/drug-possession-vs-trafficking-ohio-defense` | Sitemap/docs | Drug support owner | Possession vs trafficking | Drug commercial owner | Live | Informational/problem-aware support. |
| `/privacy` | Sitemap | Legal/no SEO | None | Trust/compliance | Live | Not a tracker owner. |
| `/terms` | Sitemap | Legal/no SEO | None | Trust/compliance | Live | Not a tracker owner. |
| `/blog/[slug]` | Dynamic sitemap | Informational support | Post-specific long tail | Practice pages | Dynamic | Actual inclusion depends on publishable CMS/legacy slugs. |

### Routes Found But Not Sitemap Owners

| Route | Source | Ownership decision | Notes |
|---|---|---|---|
| `/delaware-ohio-ovi-lawyer` | Route source | Drop as separate owner | Source now `permanentRedirect('/ovi-dui-defense-delaware-oh')`; do not assign as a separate keyword owner. |
| `/admin/checkpoints` | Route source | No SEO ownership | Admin/internal route; not in sitemap. |
| `/client-updates/2026-02` | Route source | No SEO ownership | Client update/internal-ish route; not in sitemap. |
| `/brand-guide`, `/brand-guidelines` | Route source | No SEO ownership | Brand/support pages; not in sitemap. |
| `/admin/**`, `/handoff/**` | Route source | No SEO ownership | Internal routes excluded by sitemap private prefix. |

## Geo Modifier Matrix

| Geo modifier | Current owner strategy | Starter decision | Notes |
|---|---|---|---|
| Delaware | Existing Delaware practice pages | Track candidate | Strongest current fit. |
| Delaware Ohio | Existing Delaware practice pages | Track candidate | Use on core commercial terms. |
| Delaware County | Existing Delaware pages and `/locations` support | Track candidate/watchlist | Track county variants where owner fit is clear. |
| Columbus | Existing pages plus future Franklin County strategy | Watchlist | No dedicated Columbus commercial page. |
| Franklin County | `/locations` support plus future county page | Watchlist | Promote if evidence supports county page. |
| Dublin | `/locations` support only | Watchlist | Do not build thin city page by default. |
| Powell | `/locations` support only | Watchlist | Do not build thin city page by default. |
| Westerville | `/locations` support only | Watchlist | Do not build thin city page by default. |
| New Albany | `/locations` support only | Watchlist | Do not build thin city page by default. |
| Union County | Future county-page roadmap | Watchlist | Expansion lane. |
| Morrow County | Future county-page roadmap | Watchlist | Expansion lane. |
| Marion County | Future county-page roadmap | Watchlist | Expansion lane. |
| Ohio | Statewide informational/support pages | Watchlist/track candidate | Use for support pages such as ALS, refusal, checkpoints, statutes. |

## Seed Keyword Groups

All rows below use `source=Seed`, `evidence_tier=Unvalidated seed`, and must not be treated as final until tool data is added.

| Lane | Seed keyword group | Primary owner | Geo modifiers to combine | Provisional decision | Notes |
|---|---|---|---|---|---|
| OVI/DUI | ovi lawyer; dui lawyer; ovi attorney; dui attorney; drunk driving lawyer | `/ovi-dui-defense-delaware-oh` | Delaware, Delaware Ohio, Delaware County | Track candidate | Core commercial set. |
| OVI/DUI | ovi lawyer near me; dui lawyer near me | `/ovi-dui-defense-delaware-oh` | Delaware, Delaware County | Watchlist | Local-pack sensitive; BrightLocal location settings matter. |
| OVI/DUI support | first offense ovi; first dui offense; first offense dui lawyer | `/first-offense-ovi-ohio` | Ohio, Delaware County | Watchlist | Promote only with demand or existing impressions. |
| OVI/DUI support | felony ovi lawyer; felony dui lawyer | `/felony-ovi-lawyer-ohio` | Ohio, Delaware County, Columbus | Watchlist | High-value but narrower. |
| OVI/DUI support | ovi test refusal; breath test refusal; field sobriety refusal | `/ovi-test-refusal-lawyer-ohio` | Ohio, Delaware County | Watchlist | Strong support-owner fit. |
| OVI/DUI support | als suspension; administrative license suspension; license suspension lawyer | `/als-license-suspension-ohio` | Ohio, Delaware County | Watchlist | Support term unless tool demand is strong. |
| OVI/DUI support | motion to suppress ovi; suppress ovi evidence | `/motion-to-suppress-ovi-ohio` | Ohio, Delaware County | Watchlist | Problem-aware; likely content-support tracker. |
| Checkpoints | dui checkpoints; ovi checkpoints; ohio dui checkpoints | `/resources/dui-checkpoints` | Ohio, Columbus, Delaware County, Franklin County | Watchlist | Track only while recency process is maintained. |
| Criminal defense | criminal defense attorney; criminal defense lawyer; criminal lawyer | `/criminal-defense-delaware-oh` | Delaware, Delaware Ohio, Delaware County | Track candidate | Core commercial set. |
| Criminal defense | misdemeanor lawyer; felony defense attorney; assault defense lawyer | `/criminal-defense-delaware-oh` | Delaware, Delaware County, Ohio | Watchlist | Some terms may need more specific owner pages. |
| Drug crimes | drug crime lawyer; drug possession lawyer; drug trafficking attorney | `/drug-crime-lawyer-delaware-oh` | Delaware, Delaware County, Ohio | Track candidate | Commercial owner exists. |
| Drug crimes support | possession vs trafficking; drug possession vs trafficking ohio | `/drug-possession-vs-trafficking-ohio-defense` | Ohio | Watchlist | Informational support, not local commercial. |
| Protection orders | protection order lawyer; cpo defense attorney; civil protection order defense | `/protection-order-lawyer-delaware-oh` | Delaware, Delaware County, Ohio | Track candidate | Commercial owner plus support page. |
| Domestic violence | domestic violence lawyer; domestic violence defense attorney | `/domestic-violence-lawyer-delaware-oh` | Delaware, Delaware County, Ohio | Track candidate | Confirm owner split with first-offense page. |
| Domestic violence support | first offense domestic violence; first domestic violence charge | `/domestic-violence-first-offense-ohio-defense` | Ohio, Delaware County | Watchlist | Support owner. |
| Sex crimes | sex crime lawyer; sex crime defense attorney; sexual battery defense | `/sex-crime-defense-lawyer-delaware-oh` | Delaware, Delaware County, Ohio | Watchlist | Sensitive lane; validate before tracking. |
| White collar | white collar crime attorney; fraud defense lawyer; embezzlement lawyer | `/white-collar-crimes-attorney-delaware-oh` | Delaware, Delaware County, Ohio | Watchlist | Lower-priority unless demand supports. |
| Glossary/statutes | ovi definition; als meaning; cpo meaning; possession vs trafficking; probable cause | `/glossary` | Ohio | Watchlist | Useful for content reporting, not BrightLocal core by default. |
| Personal injury | personal injury lawyer; car accident lawyer | `/personal-injury-lawyer-delaware-oh` | Delaware, Delaware County | Drop/watchlist | Secondary service; do not spend core tracker capacity without approval. |
| Weapons gap | ccw charge lawyer; improper handling firearm motor vehicle; weapons disability | Missing owner | Ohio, Delaware County | Watchlist | No clear current commercial owner; likely new support page only after evidence. |
| Expungement gap | expungement lawyer; record sealing lawyer | Missing owner | Delaware, Delaware County, Ohio | Drop/watchlist | Not confirmed as active service priority. |

## Provisional Recommended Tracked Keywords

These are candidate rows for the future `Recommended Tracked Keywords` tab. They are unvalidated and should be resized after BrightLocal tracker limit/current keyword export is known.

| Keyword | Lane | Owner page | Geo | Decision | Evidence tier | Priority | Notes |
|---|---|---|---|---|---|---|---|
| delaware ohio ovi lawyer | OVI/DUI | `/ovi-dui-defense-delaware-oh` | Delaware Ohio | Track candidate | Unvalidated seed | P0 | Core commercial intent. |
| dui lawyer delaware ohio | OVI/DUI | `/ovi-dui-defense-delaware-oh` | Delaware Ohio | Track candidate | Unvalidated seed | P0 | Core commercial variant. |
| ovi attorney delaware ohio | OVI/DUI | `/ovi-dui-defense-delaware-oh` | Delaware Ohio | Track candidate | Unvalidated seed | P0 | Core commercial variant. |
| delaware county ovi lawyer | OVI/DUI | `/ovi-dui-defense-delaware-oh` | Delaware County | Track candidate | Unvalidated seed | P0 | County variant with current owner fit. |
| criminal defense attorney delaware ohio | Criminal defense | `/criminal-defense-delaware-oh` | Delaware Ohio | Track candidate | Unvalidated seed | P0 | Core commercial intent. |
| criminal lawyer delaware ohio | Criminal defense | `/criminal-defense-delaware-oh` | Delaware Ohio | Track candidate | Unvalidated seed | P0 | Core commercial variant. |
| delaware county criminal defense attorney | Criminal defense | `/criminal-defense-delaware-oh` | Delaware County | Track candidate | Unvalidated seed | P0 | County variant with current owner fit. |
| drug crime lawyer delaware ohio | Drug crimes | `/drug-crime-lawyer-delaware-oh` | Delaware Ohio | Track candidate | Unvalidated seed | P1 | Commercial owner exists. |
| drug possession lawyer delaware ohio | Drug crimes | `/drug-crime-lawyer-delaware-oh` | Delaware Ohio | Track candidate | Unvalidated seed | P1 | Commercial owner exists. |
| protection order lawyer delaware ohio | Protection orders | `/protection-order-lawyer-delaware-oh` | Delaware Ohio | Track candidate | Unvalidated seed | P1 | Commercial owner exists. |
| cpo defense attorney ohio | Protection orders | `/protection-order-lawyer-delaware-oh` | Ohio | Watchlist | Unvalidated seed | P2 | May be statewide/support term. |
| domestic violence lawyer delaware ohio | Domestic violence | `/domestic-violence-lawyer-delaware-oh` | Delaware Ohio | Track candidate | Unvalidated seed | P1 | Confirm split with first-offense support. |
| domestic violence defense attorney delaware ohio | Domestic violence | `/domestic-violence-lawyer-delaware-oh` | Delaware Ohio | Track candidate | Unvalidated seed | P1 | Confirm demand. |
| als suspension ohio lawyer | OVI support | `/als-license-suspension-ohio` | Ohio | Watchlist | Unvalidated seed | P2 | Support page; likely not top BrightLocal slot. |
| ovi test refusal lawyer ohio | OVI support | `/ovi-test-refusal-lawyer-ohio` | Ohio | Watchlist | Unvalidated seed | P2 | Support page. |
| felony ovi lawyer ohio | OVI support | `/felony-ovi-lawyer-ohio` | Ohio | Watchlist | Unvalidated seed | P2 | Promote with evidence. |
| sex crime lawyer delaware ohio | Sex crimes | `/sex-crime-defense-lawyer-delaware-oh` | Delaware Ohio | Watchlist | Unvalidated seed | P2 | Sensitive lane; validate carefully. |
| white collar crime attorney delaware ohio | White collar | `/white-collar-crimes-attorney-delaware-oh` | Delaware Ohio | Watchlist | Unvalidated seed | P2 | Lower-priority commercial lane. |

## Watchlist

| Keyword or group | Lane | Required page/evidence | Reason deferred | Review date |
|---|---|---|---|---|
| columbus ovi lawyer | OVI/DUI | Planner/GSC/Ahrefs plus owner strategy | No dedicated Columbus or Franklin County OVI owner. | After tool validation |
| franklin county ovi lawyer | OVI/DUI | County page decision | Current `/locations` support is not a strong commercial owner. | After tool validation |
| dublin dui lawyer; powell ovi lawyer; westerville criminal defense lawyer; new albany ovi attorney | Local/suburb | Evidence for non-thin city pages | Strategy says avoid thin city pages; use county pages first. | After county evidence |
| union county ovi lawyer; morrow county ovi lawyer; marion county ovi lawyer | Expansion counties | Future county pages | SEO strategy has county roadmap, but pages are not live. | After demand validation |
| union county criminal defense attorney; morrow county criminal defense attorney; marion county criminal defense attorney | Expansion counties | Future county pages | No live commercial owner yet. | After demand validation |
| first ovi court date delaware county | OVI/process | Blog/support evidence | Useful problem-aware query but likely not BrightLocal core. | After GSC review |
| delaware county municipal court ovi | OVI/local court | Support/court content evidence | Court-specific term needs evidence and careful legal content. | After GSC/Ahrefs review |
| ohio datamaster breath test; nhtsa sfst certified attorney ohio | OVI technical | Proof point/page fit | Could reinforce differentiation but may be low-volume. | After Planner/Ahrefs |
| no contact order lawyer ohio | DV/protection | Owner fit between DV and protection pages | Overlaps with protection orders and DV. | After demand validation |
| improper handling firearm motor vehicle ohio; ccw charge lawyer ohio | Weapons | Missing owner page | No clear current owner. | After service-priority confirmation |
| expungement lawyer delaware ohio | Record sealing | Missing owner and service priority | Not confirmed as a current service priority. | Only if approved |
| personal injury lawyer delaware ohio; car accident lawyer delaware ohio | PI secondary | Approval for PI campaign | PI is secondary in strategy. | Only if approved |

## Drop List

| Keyword or group | Reason |
|---|---|
| Any term assigned to `/delaware-ohio-ovi-lawyer` as a separate owner | Route redirects to `/ovi-dui-defense-delaware-oh`; keep only as historical signal. |
| Broad statewide commercial head terms with no local/page fit, such as `ohio criminal defense attorney` | Too broad for current local tracker unless tool evidence and owner strategy support it. |
| Generic legal dictionary terms without service fit | Use glossary reporting if relevant; do not spend BrightLocal slots. |
| PI terms beyond a small approved secondary set | Strategy says PI is secondary and should not consume criminal-defense capacity. |
| City-page terms for suburbs without distinct content plan | Avoid thin city pages. |
| Admin/internal/brand-guide route terms | No SEO ownership. |

## GSC Priority URL Queue

Do not request indexing from this package. These rows are for later browser-owner review.

| Priority | URL | Expected owner role | January 2026 status/issue | Current status | Action needed |
|---|---|---|---|---|---|
| P0 | `/ovi-dui-defense-delaware-oh` | Primary OVI owner | URL unknown in inspection; live test passed. | Not rechecked | Reinspect; request indexing only if assigned. |
| P0 | `/criminal-defense-delaware-oh` | Primary criminal-defense owner | Listed in 5xx examples. | Not rechecked | Verify production response; reinspect; validate fix only if assigned. |
| P0 | `/contact` | Conversion support | Indexed in audit; live test passed. | Not rechecked | Confirm lead event reporting. |
| P1 | `/drug-crime-lawyer-delaware-oh` | Commercial owner | Priority from task queue. | Not rechecked | Reinspect after owner map approval. |
| P1 | `/protection-order-lawyer-delaware-oh` | Commercial owner | Priority from task queue. | Not rechecked | Reinspect after owner map approval. |
| P1 | `/domestic-violence-lawyer-delaware-oh` | Commercial/support owner | Ownership confirmation needed. | Not rechecked | Reinspect and confirm owner split. |
| P1 | `/als-license-suspension-ohio` | OVI support owner | Priority from task queue. | Not rechecked | Reinspect if promoted. |
| P1 | `/ovi-test-refusal-lawyer-ohio` | OVI support owner | Priority from task queue. | Not rechecked | Reinspect if promoted. |
| P1 | `/resources/dui-checkpoints` | Resource owner | Priority from task queue. | Not rechecked | Reinspect and confirm recency process. |
| P1 | `/glossary` | Informational/statute hub | Priority from task queue. | Not rechecked | Reinspect and review internal links. |
| P2 | `/reviews` | Trust support | State flipped from URL unknown to indexed during Jan audit. | Not rechecked | Monitor; no tracker ownership. |
| P2 | `/locations` | Local discovery support | URL unknown in audit; indexing requested Jan 27. | Not rechecked | Reinspect; use as support, not thin owner. |
| P2 | `/blog` | Discovery hub | Indexed in audit. | Not rechecked | Use to support post discovery. |

## GA4/GTM Status Draft

| Event | Source code event | GTM/GA4 expectation | Status | Notes |
|---|---|---|---|---|
| Page view | `mango_page_view` in `src/lib/analytics.ts` | GTM trigger should map to GA4 page_view or named page event | Source present | Includes `page_title`, `page_location`, `page_path`, `traffic_origin_type`, `traffic_origin_source`. |
| CTA click | `cta_click` in `src/lib/analytics.ts` | GTM trigger should map to GA4 `cta_click` | Source present | Used for phone/email/chat/modal interactions through helper calls. |
| Experiment exposure | `experiment_exposure` in `src/lib/analytics.ts` | GTM trigger should map to GA4 event if experiments remain active | Source present | Validate reporting need before making key event. |
| Lead submitted | `lead_submitted` in `src/lib/analytics.ts` | GTM trigger should map to GA4 lead event and key event if approved | Source present | Includes `lead_source` and `checkpoint_id`; core SEO lead candidate. |
| GTM container | `GTM-WLJQZKB5` in `src/app/layout.tsx` | Production container should match browser/admin account | Source present | No GTM admin access used. |

## On-Site Support Map

| Page | Issue | Recommended change | Dependency | Risk |
|---|---|---|---|---|
| `/ovi-dui-defense-delaware-oh` | P0 owner had prior URL-unknown status in GSC audit. | Strengthen internal links from homepage, practice areas, OVI support pages, checkpoints, and relevant blog posts if still weak. | GSC reinspection and link audit. | High commercial priority. |
| `/criminal-defense-delaware-oh` | Prior 5xx example in GSC audit. | Verify response stability and internal links before tracker reliance. | Browser/GSC owner or production verification. | High commercial priority. |
| `/delaware-ohio-ovi-lawyer` | Historical route now redirects. | Keep it out of owner map; confirm no tracker row points to it. | BrightLocal export. | Cannibalization/reporting confusion. |
| `/domestic-violence-lawyer-delaware-oh` and `/domestic-violence-first-offense-ohio-defense` | Ownership split not final. | Assign commercial local terms to DV page and first-offense/problem-aware terms to support page unless data indicates otherwise. | Planner/GSC validation. | Cannibalization. |
| `/resources/dui-checkpoints` and `/ovi-checkpoints-ohio` | Two checkpoint-related owners. | Decide map/resource owner versus static statewide support page before tracking. | Recency maintenance process. | Stale checkpoint content can hurt trust. |
| `/locations` | Local support but not a commercial owner. | Use as local-discovery/internal-link support while county pages are evaluated. | County-page demand evidence. | Thin local targeting if overused. |
| `/glossary` | Informational hub can overlap commercial terms. | Keep legal definition terms here and link to commercial owners. | Glossary link review. | Cannibalization if glossary targets lawyer terms. |
| Expansion counties | No live county commercial pages. | Use watchlist until validated; prefer county pages over city pages. | Planner/GSC/Ahrefs evidence and content approval. | Thin-page risk. |
| All track candidate pages | Sitemap presence confirmed for current owners. | Later review canonicals/schema/metadata after keyword map is final. | Separate code/content task. | Do not edit finalized content without approval. |

## Off-Site Local SEO Queue

No vendor dashboards were opened. Rows below are converted from the BrightLocal handoff/NAP audit.

| Platform | Issue | Owner/access needed | Risk | Next action |
|---|---|---|---|---|
| BrightLocal core location | Core phone/category mostly corrected; service set still needs cleanup. | BrightLocal browser/admin owner | Admin write/billing-adjacent UI; do not touch billing. | Finish core service alignment only when assigned. |
| BrightLocal Citation Builder campaign | Campaign layer still stale with `602` as business/default phone and blank description. | BrightLocal browser/admin owner | High NAP inconsistency risk. | Align to `(740) 417-6191` public office phone when assigned. |
| YellowPages | Correct address but mixed phone clutter and legacy domain signals. | Citation owner | Authenticated vendor change. | Continue claim/verification only after BrightLocal core/Citation Builder are clean. |
| ReachAttorneys | Old domain/email, `602` public phone, PI positioning; owner edit path structurally broken. | Citation owner/support escalation | Public NAP and positioning risk. | Escalate broken owner edit path after BrightLocal is stable. |
| Yelp | Owner-side phone correction verified; category pruning still queued. | Citation owner | Authenticated vendor change. | Review categories after BrightLocal alignment. |
| Justia | Old Columbus address and `614` phone; proof submitted and awaiting verification path. | Citation owner | Legal directory visibility. | Continue verification follow-up separately. |
| Avvo | `P.O. Box 483`; profile claimed by different account. | Citation owner | Account ownership blocker. | Resolve account ownership separately. |
| LawyerLand / LocalStack | Old `46 N Sandusky` address variants. | Citation owner | NAP inconsistency. | Queue after BrightLocal and high-priority legal directories. |
| Yahoo Local / DexKnows | Business-name variants flagged. | Citation owner | Lower-priority consistency issue. | Queue after primary NAP conflicts. |
| GBP | Category/service alignment for OVI, criminal defense, domestic violence, drug charges, license suspension. | GBP browser/admin owner | Do not save unless explicitly assigned. | Read/review only when owner is assigned. |

## Missing-Owner and Weak-Owner Notes

| Topic/term family | Current owner | Gap type | Recommendation |
|---|---|---|---|
| Columbus OVI/criminal defense | `/locations` support only | Weak owner | Keep watchlist until Franklin County/Columbus demand justifies a county page. |
| Franklin County OVI/criminal defense | `/locations` support only | Weak owner | Prefer future county page over thin city page. |
| Dublin/Powell/Westerville/New Albany lawyer terms | `/locations` support only | Weak owner | Keep on watchlist; no thin suburb pages without material differentiation. |
| Union/Morrow/Marion OVI and criminal defense | No live commercial county page | Missing owner | SEO strategy already identifies county-page roadmap; validate before build. |
| Weapons/CCW/improper handling | Criminal-defense pillar only | Weak/missing owner | Watchlist pending service-priority and demand validation. |
| Expungement/record sealing | No clear owner | Missing owner/service-priority gap | Drop or watchlist until confirmed as current service. |
| No-contact order | DV/protection pages overlap | Weak split | Assign after query intent review; likely protection-order or DV support. |
| Technical OVI proof points: SFST, DataMaster | OVI pillar/support pages | Weak owner | Use as page proof/support unless search demand supports dedicated content. |
| PI variants | PI page exists | Secondary priority | Keep out of core criminal-defense tracker unless approved. |

## BrightLocal Import Draft

Status: not uploaded, not final, tracker limit unknown, current BrightLocal keyword export unknown.

Assumptions for later owner review:

- Search engine/location/device settings must be copied from the existing BrightLocal campaign, not guessed here.
- Keep the public business phone source of truth as `(740) 417-6191`; do not touch billing or plan limits.
- Upload only after the BrightLocal owner exports current tracked keywords and approves replacements.

Draft import rows:

| Keyword | Location modifier | Landing page | Decision | Upload status | Notes |
|---|---|---|---|---|---|
| delaware ohio ovi lawyer | Delaware, OH | `/ovi-dui-defense-delaware-oh` | Track candidate | Not uploaded | Unvalidated seed. |
| dui lawyer delaware ohio | Delaware, OH | `/ovi-dui-defense-delaware-oh` | Track candidate | Not uploaded | Unvalidated seed. |
| ovi attorney delaware ohio | Delaware, OH | `/ovi-dui-defense-delaware-oh` | Track candidate | Not uploaded | Unvalidated seed. |
| delaware county ovi lawyer | Delaware County, OH | `/ovi-dui-defense-delaware-oh` | Track candidate | Not uploaded | Unvalidated seed. |
| criminal defense attorney delaware ohio | Delaware, OH | `/criminal-defense-delaware-oh` | Track candidate | Not uploaded | Unvalidated seed. |
| criminal lawyer delaware ohio | Delaware, OH | `/criminal-defense-delaware-oh` | Track candidate | Not uploaded | Unvalidated seed. |
| delaware county criminal defense attorney | Delaware County, OH | `/criminal-defense-delaware-oh` | Track candidate | Not uploaded | Unvalidated seed. |
| drug crime lawyer delaware ohio | Delaware, OH | `/drug-crime-lawyer-delaware-oh` | Track candidate | Not uploaded | Unvalidated seed. |
| drug possession lawyer delaware ohio | Delaware, OH | `/drug-crime-lawyer-delaware-oh` | Track candidate | Not uploaded | Unvalidated seed. |
| protection order lawyer delaware ohio | Delaware, OH | `/protection-order-lawyer-delaware-oh` | Track candidate | Not uploaded | Unvalidated seed. |
| domestic violence lawyer delaware ohio | Delaware, OH | `/domestic-violence-lawyer-delaware-oh` | Track candidate | Not uploaded | Unvalidated seed; ownership split pending. |
| domestic violence defense attorney delaware ohio | Delaware, OH | `/domestic-violence-lawyer-delaware-oh` | Track candidate | Not uploaded | Unvalidated seed; ownership split pending. |
| als suspension ohio lawyer | Ohio | `/als-license-suspension-ohio` | Watchlist | Not uploaded | Promote only with evidence/space. |
| ovi test refusal lawyer ohio | Ohio | `/ovi-test-refusal-lawyer-ohio` | Watchlist | Not uploaded | Promote only with evidence/space. |
| sex crime lawyer delaware ohio | Delaware, OH | `/sex-crime-defense-lawyer-delaware-oh` | Watchlist | Not uploaded | Sensitive lane. |
| white collar crime attorney delaware ohio | Delaware, OH | `/white-collar-crimes-attorney-delaware-oh` | Watchlist | Not uploaded | Lower-priority lane. |

## Next Owner Actions

1. BrightLocal owner exports current tracked keywords, search engine/location/device settings, and tracker limit.
2. GSC owner rechecks the P0/P1 URL queue without requesting indexing unless assigned.
3. Keyword Planner owner validates seed groups and adds search volume, competition, and bid ranges.
4. Ahrefs owner validates competitor/gap terms, especially county expansion and support pages.
5. SEO lead promotes only evidence-backed rows from `Track candidate` into the final live tracker set.
