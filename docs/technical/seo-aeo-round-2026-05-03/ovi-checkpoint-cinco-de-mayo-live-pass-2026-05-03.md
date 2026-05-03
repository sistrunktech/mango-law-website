# OVI Checkpoint / Cinco de Mayo Live Pass

Date checked: 2026-05-03
Workstream: Independent checkpoint freshness and Cinco de Mayo readiness pass

## Executive Status

The public checkpoint page is not showing a false upcoming Cinco de Mayo checkpoint as of this pass, but the checkpoint pipeline is not healthy enough to treat the dataset as current without intervention.

Key finding: production has no upcoming public checkpoints and no May 1-7, 2026 checkpoint rows. That is consistent with the public-source checks performed here, which found no specific Ohio Cinco de Mayo checkpoint announcement for May 3-6. However, the scraper has no visible production log after the manual April 24 recovery run, despite the documented every-four-hours schedule, and OVICheckpoint now contains two April 30 Stark County rows that are missing from production.

## Scope Reviewed

- `docs/technical/seo-keyword-research-tracking-2026-04/OVI_CHECKPOINT_CINCO_DE_MAYO_PASS_2026-04-24.md`
- `docs/technical/SEO-CRAWL-STRATEGY.md`
- `docs/technical/SEO_KEYWORD_RESEARCH_TRACKING_TASK_QUEUE_2026-04.md`
- `docs/OPERATIONS.md`
- `src/app/(site)/resources/dui-checkpoints/page.tsx`
- `src/views/DUICheckpointsPage.tsx`
- `src/lib/checkpointService.ts`
- `src/lib/checkpointAnnouncementsService.ts`
- `src/data/checkpoints.ts`
- `src/lib/supabaseClient.ts`
- `supabase/functions/checkpoint-scraper/*`
- `supabase/functions/checkpoint-scraper/rss_sources_master.csv`
- `supabase/functions/checkpoint-scraper/checkpoint_rss_sources.csv`
- checkpoint scheduler migrations, including `20260405163946_increase_checkpoint_scraper_frequency.sql`

## Production Dataset Evidence

Queried production Supabase project `rgucewewminsevbjgcad` through the public anon key shipped in `src/lib/supabaseClient.ts`.

Command shape:

```bash
node --input-type=module - <<'NODE'
import fs from 'fs';
import { createClient } from '@supabase/supabase-js';
const text = fs.readFileSync('src/lib/supabaseClient.ts', 'utf8');
const url = text.match(/const PROD_SUPABASE_URL = '([^']+)'/)?.[1];
const key = text.match(/const PROD_SUPABASE_ANON_KEY =\n  '([^']+)'/)?.[1];
const supabase = createClient(url, key, { auth: { persistSession: false, autoRefreshToken: false } });
// Queried dui_checkpoints, dui_checkpoint_announcements, and scraper_logs.
NODE
```

Results at `2026-05-03T14:42:23.887Z`:

| Check | Result |
|---|---|
| Upcoming public checkpoints | `0` rows where `source_url IS NOT NULL`, status in `upcoming, active`, and `end_date >= now` |
| May window rows | `0` rows from `2026-05-01` through `2026-05-07` |
| Rows since April 24 | Only the four April 24 Canton/Trotwood rows from the prior recovery pass |
| Latest scraper log | `2026-04-24T23:26:22.753Z`, trigger `manual`, status `partial`, `305 found`, `45 new`, `261 updated`, `16 skipped` |
| Scheduled scraper evidence | No visible `checkpoint-scraper` log after April 24, despite the documented every-four-hours schedule |
| Recent pending announcements | Three Google News pending-detail rows from April 19-21 remain visible; no parsed event date/location |

Production rows present from the prior pass:

| County | City | Address | Start UTC | Status |
|---|---|---|---|---|
| Stark | Canton | `1801 Mahoning Road NE` | `2026-04-24T22:00:00+00:00` | completed |
| Montgomery | Trotwood | `4800 block of Salem Avenue` | `2026-04-24T22:30:00+00:00` | completed |
| Montgomery | Trotwood | `5100 block of Salem Avenue` | `2026-04-24T22:30:00+00:00` | completed |
| Stark | Canton | `3700 block of Tuscarawas Street West` | `2026-04-25T00:30:00+00:00` | completed |

## Public Source Checks

Public web checks performed without browser/account sessions:

| Source | Result | Implication |
|---|---|---|
| OVICheckpoint WordPress JSON `https://www.ovicheckpoint.com/wp-json/wp/v2/pages/1078` | Contains two newer April 30, 2026 Stark/Lake Township rows and no `Cinco` or `May 5` hit | Upstream aggregator advanced after the April 24 manual run; production did not ingest those rows |
| OVICheckpoint public page `https://www.ovicheckpoint.com/` | Same two April 30 Stark/Lake Township rows; no May 2026 row beyond April 30 found in parsed table | Missing historical/current-week rows in production |
| Google News RSS query for Ohio checkpoint + Cinco/May 3-6 terms | `0` items | No RSS-confirmed Ohio Cinco de Mayo checkpoint announcement found |
| Google News RSS query for Ohio OVI/DUI/sobriety checkpoint in last 7 days | `0` items | Existing Google News RSS path did not surface the April 30 Stark article during this check |
| Cleveland19 article, updated Apr. 29, 2026 | Reports Stark County Sheriff's Office planned Lake Township sobriety checkpoints through end of April | Confirms April 30 event from a public media source citing the sheriff's office/Facebook post |
| AOL/Canton Repository article, Apr. 30, 2026 | Gives April 30 Lake Township locations/times: 3300 block State Street NW and 9900 block Cleveland Avenue NW | Stronger location/time detail for missing April 30 rows |
| Ohio Traffic Safety Office FFY2026 OVI Task Force proposal PDF | Lists Stark and other counties with FFY2026 checkpoint minimums | Supports checkpoint-program context, not a specific event announcement |

Parsed OVICheckpoint current first rows:

| County | City | Location text | Time/date |
|---|---|---|---|
| Stark | Lake Township | Around the `3300 block of State Street NW` | Thursday, April 30, 2026, `8:30 PM to 11 PM` |
| Stark | Lake Township | Near the `9900 block of Cleveland Avenue NW` | Thursday, April 30, 2026, `8:30 PM to 11 PM` |

Important gotcha: the AOL/Canton Repository detail says the April 30 checkpoints were from `6 to 8:30` at the 3300 block of State Street NW and `8:30 to 11` at the 9900 block of Cleveland Avenue NW. OVICheckpoint currently lists both at `8:30 PM to 11 PM`. If these rows are backfilled, the media/source detail should be preferred or flagged for manual review rather than blindly copying the aggregator time for both rows.

## Public Page State

Public page check:

```bash
node --input-type=module - <<'NODE'
const res = await fetch('https://mango.law/resources/dui-checkpoints');
const html = await res.text();
// Text search for "No announced", "Cinco de Mayo", Lake Township, Canton, Trotwood.
NODE
```

Observed public text:

- Page shows "Currently announced checkpoints" followed by "No announced checkpoints at this time."
- Page includes the seasonal watch language "Cinco de Mayo and early May weekends."
- Page still exposes three pending-detail announcement cards from April 19-21.
- Page does not show Lake Township April 30 rows because they are not in production.

This is acceptable for today's live public state only if there truly are no active/upcoming announcements. It is not acceptable as proof the automated feed is current.

## Stale Rows / Missing Data

Missing from production:

| Priority | Missing row | Evidence |
|---|---|---|
| P1 historical/current-week completeness | Stark County / Lake Township / `3300 block of State Street NW` / April 30, 2026 | OVICheckpoint, Cleveland19, AOL/Canton Repository |
| P1 historical/current-week completeness | Stark County / Lake Township / `9900 block of Cleveland Avenue NW` / April 30, 2026 | OVICheckpoint, Cleveland19, AOL/Canton Repository |

No confirmed missing May 3-6 or May 5 row was found in public checks during this pass.

## Scraper / Cron Risk

The runbook says the checkpoint scraper runs every four hours through pg_cron/pg_net. The latest visible production `checkpoint-scraper` log is still the manual run from April 24. That creates two possibilities that need admin-side confirmation:

1. The `run_checkpoint_scraper` cron job is not firing.
2. The cron job fires, but the Edge Function invocation fails before inserting a `scraper_logs` row.

Likely inspection points:

- `cron.job` for `run_checkpoint_scraper`
- `cron.job_run_details` for recent failures
- `net._http_response` or Supabase pg_net request/response tables, if retained
- Supabase Edge Function logs for `checkpoint-scraper`
- app setting values used by `invoke_checkpoint_scraper()`, especially Supabase URL and service role key

Do not treat the April 24 manual recovery as durable until one scheduled run logs successfully after May 3.

## Source Coverage Gaps

Current active source coverage is serviceable but brittle:

- The scraper's direct OVICheckpoint source should have captured the April 30 rows if it had run after the upstream page changed.
- Google News RSS returned no current items in this pass, even though web search found Cleveland19/AOL coverage. This means RSS discovery cannot be the only freshness safety net.
- `rss_sources_master.csv` does not include Cleveland19/WOIO directly. It includes other Northeast Ohio sources, but some Gray/Sinclair/TEGNA feeds are disabled or known to fail.
- Facebook is referenced by media coverage as the sheriff source, but no account/browser session was used here and Facebook should not be the only source of record.

## SEO / AEO / Internal-Link Implications

- Keep tracking `ohio dui checkpoints` and `ohio ovi checkpoints` only if the scheduled update path is fixed or manually monitored through May 6.
- The public page's no-current-checkpoint state is defensible for May 3, but the missing April 30 rows weaken freshness and hotspot/history credibility.
- The seasonal "Cinco de Mayo and early May weekends" block is already live on `/resources/dui-checkpoints`; no design change is needed.
- If new May 5 rows appear, they should link users toward `/ovi-checkpoints-ohio`, `/ovi-dui-defense-delaware-oh`, `/ovi-test-refusal-lawyer-ohio`, and `/als-license-suspension-ohio` from existing checkpoint card/guide paths rather than creating a new thin holiday page.
- The companion `/ovi-checkpoints-ohio` page does not mention Cinco de Mayo; adding a small seasonal sentence later would be low risk, but it is outside this workstream's allowed outputs.

## Recommended Next Actions

1. Admin/ops owner should manually trigger `checkpoint-scraper` now and verify a new `scraper_logs` row appears.
2. Inspect `cron.job` and recent `cron.job_run_details` for `run_checkpoint_scraper`; fix the schedule/function invocation if no runs are firing.
3. Backfill or manually curate the two April 30 Stark/Lake Township rows with source review, preferring the AOL/Canton Repository timing detail over OVICheckpoint if confirmed.
4. Add Cleveland19/WOIO or an equivalent Northeast Ohio media feed/search source to the source watchlist if a stable RSS/search endpoint is available.
5. Recheck public sources daily through May 6, 2026. If a May 5 checkpoint appears upstream and production does not update within the expected cadence, treat that as a production incident for the checkpoint resource pair.

## Verification Commands Run

- `rg -n "Cinco|checkpoint|OVI checkpoint|DUI checkpoint|rss|scraper|cron|announcement|ovi-checkpoint" docs src supabase scripts test`
- `sed -n '1,260p' docs/technical/seo-keyword-research-tracking-2026-04/OVI_CHECKPOINT_CINCO_DE_MAYO_PASS_2026-04-24.md`
- `sed -n '1,260p' src/app/(site)/resources/dui-checkpoints/page.tsx`
- `sed -n '1,280p' supabase/functions/checkpoint-scraper/index.ts`
- `node --input-type=module` Supabase public data query against `dui_checkpoints`, `dui_checkpoint_announcements`, and `scraper_logs`
- `node --input-type=module` public fetch of OVICheckpoint JSON/page, Mango checkpoint pages, and Google News RSS queries
- Public web search/open for Cleveland19, AOL/Canton Repository, OVICheckpoint, and Ohio Traffic Safety Office FFY2026 OVI Task Force proposal information

## Files Owned In This Pass

- `docs/technical/seo-aeo-round-2026-05-03/ovi-checkpoint-cinco-de-mayo-live-pass-2026-05-03.md`
- `docs/technical/seo-aeo-round-2026-05-03/ovi-checkpoint-source-evidence-2026-05-03.csv`
