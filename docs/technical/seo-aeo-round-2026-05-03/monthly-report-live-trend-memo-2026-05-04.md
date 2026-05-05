# Monthly Report Live Trend Memo - Mango Law

Date prepared: 2026-05-04

Scope: read-only pull from BrightLocal, Ahrefs, GA4, and GSC after the May keyword/tracking/content execution pass. This is not the client-facing Sistrunk Tech report; use it as the evidence memo for the next private monthly report draft.

## Executive Read

- GBP posts are now scheduled in BrightLocal: `All posts (18)`, `Live (10)`, `Scheduled (8)`, `Expired (0)`, `Rejected (0)`.
- Search Console visibility is expanding quickly: last 28 days show `78` clicks vs `64` previous, and `3.11K` impressions vs `1.93K` previous.
- The checkpoint resource page is the clearest near-term SEO win: GSC shows `23` clicks and `1,008` impressions in the last 28 days, and Ahrefs now sees all current organic traffic/keywords on `/resources/dui-checkpoints`.
- GA4 remains low-volume and conversion-cautious: last 30 days show `19` active users, `152` events, `16` new users, and `0` key events.
- Ahrefs Site Audit is technically healthy but not clean: latest crawl is `99%` health, `148` crawled URLs, `3` errors, `49` warnings, `79` notices.

## BrightLocal

Source: `rank-tracker-mango-law-llc-2026-05-04-00-41-03.csv` plus live GBP scheduler verification.

### GBP Scheduler

BrightLocal now shows:

- `All posts (18)`
- `Live (10)`
- `Scheduled (8)`
- `Expired (0)`
- `Rejected (0)`

The final scheduled post is visible in the scheduler with copy beginning "A criminal charge in Delaware County can move from arraignment..." and scheduled for `May 28, 2026`, `10:00 (GMT -4:00)`.

Scheduled cadence:

| Date | Time | Topic |
|---|---:|---|
| 2026-05-05 | 8:15 AM | DUI checkpoint map / Cinco de Mayo relevance |
| 2026-05-07 | 10:00 AM | High-tier OVI |
| 2026-05-12 | 10:00 AM | Drugs found in a vehicle |
| 2026-05-14 | 10:00 AM | CPO hearing |
| 2026-05-19 | 10:00 AM | OVI refusal vs. failed test |
| 2026-05-21 | 10:00 AM | Memorial Day / holiday OVI enforcement |
| 2026-05-26 | 10:00 AM | Drug OVI cases |
| 2026-05-28 | 10:00 AM | Delaware County criminal case timeline |

### Rank Tracker

Export notes:

- Export rows: `196`
- Unique exported keyword labels: `49`
- Ranked rows: `37`
- BrightLocal UI previously showed the tracker at `50/50 keywords` after adding `delaware county criminal defense attorney`; the export still only surfaced 49 unique labels, so keep the UI/export mismatch as a reporting caveat until the next export confirms the new row.

Ranked-row summary:

| Engine | Ranked rows | Top 10 | Top 20 | Avg. rank |
|---|---:|---:|---:|---:|
| Google Places | 23 | 8 | 15 | 16.9 |
| Bing | 7 | 7 | 7 | 3.3 |
| Google organic | 3 | 0 | 3 | 15.3 |
| Google mobile | 4 | 0 | 2 | 27.0 |

Strongest current positions:

- Google Places: `delaware ohio dui attorney` at `#6`.
- Google Places: `delaware county ohio ovi lawyer` and `delaware ohio ovi lawyer` at `#7`.
- Google Places: `delaware ohio criminal defense attorney` at `#8`.
- Google Places: `delaware county ohio criminal defense lawyer` and `delaware ohio drug charges attorney` at `#9`.
- Google Places: `delaware municipal court ovi lawyer` and `dui lawyer` at `#10`.
- Bing: multiple core Delaware OVI/criminal-defense terms ranking `#2` to `#5`.

Notable movement:

- `delaware municipal court ovi lawyer`: Bing `#2`, up from `#21`.
- `drunk driving lawyer`: Google Places `#24`, up from `#36`.
- `delaware county ohio ovi lawyer`: Google organic `#13`, up from `#21`.
- `criminal defense attorney`, `ovi lawyer near me`, `criminal defense attorney near me`, and `dui lawyer` all improved in Google Places.
- `delaware ohio drug charges attorney`: Google mobile `#43`, down from `#16`; keep this as a drug-owner-page follow-up.

## GSC

Property: `mango.law` domain property.

Window: last 28 days vs previous 28 days.

| Metric | Current | Previous | Direction |
|---|---:|---:|---|
| Clicks | 78 | 64 | Up 14 |
| Impressions | 3.11K | 1.93K | Up 1.18K |
| CTR | 2.5% | 3.3% | Down |
| Avg. position | 32.4 | 11.2 | Down |

Interpretation: impressions are expanding faster than clicks, so CTR and average position are being diluted by newer, lower-ranking query exposure. This is acceptable early discovery behavior, but the next optimization target is moving the new checkpoint and owner/support content from impression growth into more top-10/top-20 click capture.

Top page movement:

- `/resources/dui-checkpoints`: `23` clicks vs `0`, `1,008` impressions vs `0`.
- Homepage: `41` clicks vs `56`, `1,621` impressions vs `1,012`.
- `/about`: `4` clicks vs `5`, `303` impressions vs `727`.
- `/of-counsel`: `4` clicks vs `2`, `92` impressions vs `132`.
- `/first-offense-ovi-ohio`: `1` click vs `0`, `51` impressions vs `39`.
- `/criminal-defense-delaware-oh`: `0` clicks, `112` impressions vs `104`.

Top query notes:

- Branded clicks are down: `dominic mango` `6` clicks vs `8`; `mango law` `5` clicks vs `14`.
- Checkpoint discovery queries are now visible: `dui checkpoints tonight near hamilton oh`, `dui checkpoints ohio tonight`, `dui checkpoints tonight`, and `how to check for dui checkpoints`.
- Very broad legal discovery is appearing: `civil law attorney` generated `737` impressions and no clicks; this is not a primary target but explains part of the average-position drop.

## GA4 / GTM

Property confirmed in GA4 UI: `All accounts > Mango Law > Mango Law GA4`.

GA4 home, last 30 days:

| Metric | Current | GA4 direction |
|---|---:|---|
| Active users | 19 | Down 36.7% |
| Event count | 152 | Down 50.0% |
| Key events | 0 | Flat / none |
| New users | 16 | Down 42.9% |

Realtime showed `0` active users during the check.

Short-window channel/event cards visible in GA4:

- Last 7 days sessions by channel: Organic Search `2`, Direct `2`, Referral `3`, Unassigned `1`.
- Event counts shown: `page_view` `15`, `session_start` `8`, `user_engagement` `4`, `first_visit` `5`, `scroll` `3`, `click` `1`, `cta_click` `1`.

Reporting boundary: GTM Version 5 was published and live network validation saw `page_view`, `cta_click`, and synthetic `generate_lead`, but GA4 still shows `0` key events in the current reporting surface. Do not report conversion wins until real form/phone/email/chat lead-path events are observed in GA4.

## Ahrefs

Project: `Mango` / `mango.law/`.

Dashboard summary:

- Health Score: `99`.
- Domain Rating: `0`.
- Referring domains: `36`, change `+23`.
- Total visitors: `27`, change `-10`.
- Organic traffic: `2.9`, change `+0.47`.
- Organic keywords: `2`.
- Rank Tracker is not available on the current Ahrefs plan.

Site Explorer:

- AI citations: `0` for AI Overview, ChatGPT, Perplexity, Gemini, and Copilot.
- DR: `0`; UR: `4.5`.
- Backlinks: `38`, all-time `48`.
- Referring domains: `37`, all-time `45`.
- Organic keywords: `2`; Top 3: `0`.
- Organic traffic: `3`.
- Paid keywords, ads, and paid traffic: `0`.

Ahrefs organic keywords:

| Keyword | Volume | KD | Traffic | Position | URL |
|---|---:|---:|---:|---:|---|
| `ohio dui checkpoints tonight` | 150 | 0 | 3 | 12 | `/resources/dui-checkpoints` |
| `sobriety checkpoint finder ohio` | 10 | 0 | 0 | 8 | `/resources/dui-checkpoints` |

Top pages:

| URL | UR | Traffic | Keywords | Top keyword | Position |
|---|---:|---:|---:|---|---:|
| `/resources/dui-checkpoints` | 4.5 | 3 | 2 | `ohio dui checkpoints tonight` | 12 |

Backlink quality caveat:

- Followed referring domains: `0`.
- Not-followed referring domains: `37`.
- Followed backlinks: `0`.
- Nofollow backlinks: `38`.

Site Audit:

- Latest crawl date: `2026-05-01`.
- Crawl schedule: weekly, Friday, `06:00-06:59 PM (GMT-04:00)`.
- Health score: `99%`.
- Total URLs crawled: `148`.
- Internal pages: `55`.
- Total resources: `91`.
- Internal URLs with errors: `2`.
- Issues distribution: `3` errors, `49` warnings, `79` notices.
- HTTP status distribution: `144` success, `3` redirects, `1` client error.
- Image references without alt text: `0`.

Three-month crawl trend:

| Date | Health | URLs | Internal pages | Resources | Internal URLs with errors |
|---|---:|---:|---:|---:|---:|
| 2026-02-06 | 100% | 127 | 45 | 80 | 0 |
| 2026-02-27 | 100% | 135 | 47 | 86 | 0 |
| 2026-03-06 | 100% | 146 | 54 | 90 | 0 |
| 2026-03-13 | 100% | 146 | 54 | 90 | 0 |
| 2026-03-20 | 91% | 141 | 53 | 86 | 13 |
| 2026-03-27 | 98% | 125 | 54 | 69 | 2 |
| 2026-04-03 | 99% | 146 | 54 | 90 | 2 |
| 2026-04-10 | 99% | 146 | 54 | 90 | 2 |
| 2026-04-17 | 99% | 146 | 54 | 90 | 2 |
| 2026-04-24 | 99% | 146 | 54 | 90 | 2 |
| 2026-05-01 | 99% | 148 | 55 | 91 | 2 |

Top issue themes:

- Slow page: `1` crawled URL.
- Meta description too long: `16` URLs.
- Title too long: `27` URLs.
- Pages to submit to IndexNow: `12`.
- Page and SERP titles do not match: `1`.
- Structured data schema.org validation error: `23`.

## Reporting Positioning

Recommended client-facing framing:

- February: foundation and crawl hygiene were stable.
- March: temporary crawl/indexing quality dipped, then recovered.
- April: tracking, keyword alignment, sitemap/schema, and support-content production accelerated.
- May-to-date: checkpoint content is already showing the fastest search-response loop; GBP scheduling is now live for the content cluster; conversion reporting still needs real lead-path confirmation.

Recommended next actions:

1. Keep monitoring Solon/Summit and the checkpoint source feed through May 5, 2026; promote pending rows only if exact public details appear.
2. Inspect/request indexing only after action-time approval for the May post cluster and priority owner/support URLs.
3. Fix the Ahrefs Site Audit priority items that are likely to affect SERP presentation: long titles, long meta descriptions, and structured-data validation errors.
4. QA real lead paths in GA4: form submit, phone click, email click, and chat if available.
5. Use the scheduled GBP posts to drive clicks into the checkpoint and support-content cluster, then compare GSC page/query movement after each weekly batch.
