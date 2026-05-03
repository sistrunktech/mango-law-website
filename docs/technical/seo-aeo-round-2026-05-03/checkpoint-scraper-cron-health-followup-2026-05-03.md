# Checkpoint Scraper Cron Health Follow-up

Date checked: 2026-05-03
Workstream: Cinco de Mayo checkpoint freshness, source-of-truth, and scraper health follow-up
Initial write scope was documentation-only. Later execution in the same workstream deployed the production `checkpoint-scraper` Edge Function and triggered two manual scraper runs after the Solon/Cinco public source was found.

## Execution Addendum

Executed on 2026-05-03 after the read-only follow-up:

- Triggered the existing production `checkpoint-scraper` Edge Function once. Result: `2 new`, `306 updated`, `7` announcements upserted.
- Verified the two May-window Stark/Lake Township checkpoint rows now exist in production with `completed` status.
- Added a curated pending announcement seed for the Solon/Cinco de Mayo public source in `supabase/functions/checkpoint-scraper/curated-announcements.ts`.
- Deployed `checkpoint-scraper` to production project `rgucewewminsevbjgcad`.
- Triggered the deployed function again. Result: `0 new`, `308 updated`, `15` announcements upserted.
- Verified production `dui_checkpoint_announcements` now contains one Solon/Cinco row:
  - title: `Solon Police announced Cinco de Mayo sobriety checkpoints in the Aurora Road area`
  - event date: `2026-05-05`
  - status: `pending_details`
  - city/county: `Solon`, `Cuyahoga`
  - source: `Cleveland19/WOIO`
  - source URL: `https://www.cleveland19.com/2026/05/02/solon-police-conduct-sobriety-checkpoints-cinco-de-mayo/`
- Local frontend validation at `http://localhost:3023/resources/dui-checkpoints` shows Solon/Aurora Road in the checkpoint page output.
- Production frontend fetch still did not show Solon before frontend deployment, indicating the live site was still serving older frontend code/data wiring.

## Executive Status

Production checkpoint freshness moved from stale to partially recovered for the Cinco de Mayo window.

The prior May 3 pass found no confirmed Ohio Cinco de Mayo checkpoint at that time. A current public check later found a new public report from Cleveland19/WOIO, updated May 2, 2026, saying Solon Police announced sobriety checkpoints for Tuesday, May 5, 2026, in the Aurora Road area: <https://www.cleveland19.com/2026/05/02/solon-police-conduct-sobriety-checkpoints-cinco-de-mayo/>.

Post-execution production checks show:

- `0` upcoming public checkpoint rows.
- `2` checkpoint rows from `2026-05-01` through `2026-05-07`, both Lake Township/Stark rows now backfilled as completed.
- `1` Solon/Cinco matching pending announcement row.
- Latest visible `checkpoint-scraper` log is the manual 2026-05-03 run started at `2026-05-03T16:34:28.962+00:00` and completed at `2026-05-03T16:35:38.288+00:00`.

Before frontend deployment, the public page at <https://mango.law/resources/dui-checkpoints> still did not contain "Solon" or "Aurora Road" even though the production DB row existed. Local frontend output did contain it. Treat that as frontend deployment drift, not a remaining database gap.

## Source-of-Truth Path

The public checkpoint page is database-driven, not repo-file driven:

- `src/lib/supabaseClient.ts` pins the app to production Supabase project `rgucewewminsevbjgcad`.
- `src/app/(site)/resources/dui-checkpoints/page.tsx` is `force-dynamic` and preloads from `dui_checkpoints` and `dui_checkpoint_announcements` using the production anon key.
- `src/lib/checkpointService.ts` shows public upcoming rows only when `source_url IS NOT NULL`, status is `upcoming` or `active`, and `end_date >= now`.
- `supabase/functions/checkpoint-scraper/index.ts` writes `dui_checkpoints`, `dui_checkpoint_announcements`, and `scraper_logs`, but only after the Edge Function body starts and inserts a `scraper_logs` row.

Implication: after the manual scraper runs and curated seed deployment, the production database has the needed May-window records. The remaining public-page freshness gap is frontend deployment/source drift.

## Evidence

| Evidence | Result | Interpretation |
|---|---|---|
| Prior repo report `ovi-checkpoint-cinco-de-mayo-live-pass-2026-05-03.md` | Found no confirmed May 3-6 Ohio Cinco de Mayo checkpoint then; found stale scraper logs and missing April 30 Stark/Lake Township rows | The stale-cron concern was already present before the new Solon public source appeared |
| Current production read-only query after manual runs | `0` upcoming rows; `2` rows from `2026-05-01` through `2026-05-07`; one Solon/Cinco pending announcement row | DB is no longer missing the May-window evidence captured in this pass |
| `scraper_logs` read-only query after manual runs | Latest `checkpoint-scraper` log is `2026-05-03T16:34:28.962+00:00` to `2026-05-03T16:35:38.288+00:00`, trigger `manual`, status `partial` | Edge Function path is callable manually; scheduled cron health still needs later confirmation |
| Local safe OVICheckpoint scrape | Parsed `307` rows; first rows are Stark/Lake Township April 30 local checkpoints, represented as `2026-05-01T00:30:00.000Z` to `2026-05-01T03:00:00.000Z` | The local parser can see the missing OVICheckpoint rows; their absence from production points toward scheduler/invocation/deploy/secret health, not the table parser |
| Current public web check | Cleveland19 reports Solon Police announced Cinco de Mayo checkpoints Tuesday in the Aurora Road area | There is now a confirmed public May 5 monitoring item to capture or manually curate |
| Google News RSS checks | Configured statewide RSS and Solon/Cinco queries returned `0` items | Existing RSS discovery is not sufficient for this Solon item |
| Current OVICheckpoint scrape | No May 5 Solon row found; only older Solon history | OVICheckpoint alone will not fix the Cinco de Mayo Solon gap unless the upstream aggregator updates |
| Mango public page fetch before frontend deploy | Page returns 200 but no Solon/Aurora text | User-facing state needs frontend deployment from the corrected worktree |
| Local frontend fetch | `http://localhost:3023/resources/dui-checkpoints` contains Solon and Aurora Road | Source changes and production DB row render correctly in the current worktree |

## Likely Root Cause Area

Primary likely failure boundary for unattended OVICheckpoint freshness remains: `pg_cron` / `pg_net` invocation into the `checkpoint-scraper` Edge Function.

Why this is the leading area:

- `supabase/migrations/20260405163946_increase_checkpoint_scraper_frequency.sql` schedules `run_checkpoint_scraper` at `17 */4 * * *`.
- `supabase/migrations/20251208174805_improve_checkpoint_scheduler.sql` invokes the Edge Function with `net.http_post()` and reads `app.settings.supabase_url` / `app.supabase_url` plus `app.settings.service_role_key` / `app.service_role_key`.
- If the schedule is not present/enabled, no function call occurs.
- If `supabase_url` is missing, the fallback uses `request.headers`, which may not be available in a cron context.
- If the service-role setting is missing/empty, the Edge Function can reject the request before the scraper body inserts a `scraper_logs` row.
- If pg_net queues the call but the HTTP response is 401/404/5xx, the only evidence may be in `cron.job_run_details`, `net._http_response`, or Supabase Edge Function logs, not in `scraper_logs`.

Secondary source-coverage gap for Cinco de Mayo:

- The new Solon item is visible through general web search and Cleveland19, but not through the configured Google News RSS feed, targeted RSS checks, or OVICheckpoint at the time of this pass.
- `supabase/functions/checkpoint-scraper/search-discovery.ts` may catch this class of item only if `SERPER_API_KEY` is set and a scheduled/core scraper run actually executes.
- For this specific May 5 item, manual announcement/checkpoint curation is safer than waiting for aggregator/RSS propagation.

## Safe Next Operational Steps

Recommended admin/ops sequence:

1. In Supabase SQL editor, inspect scheduler health:
   - `SELECT * FROM cron.job WHERE jobname = 'run_checkpoint_scraper';`
   - `SELECT * FROM cron.job_run_details WHERE jobid = (SELECT jobid FROM cron.job WHERE jobname = 'run_checkpoint_scraper') ORDER BY start_time DESC LIMIT 20;`
2. Inspect pg_net responses for recent function calls, if retained:
   - Check `net._http_response` / pg_net response tables for `checkpoint-scraper` requests, HTTP status, and response body.
3. Verify app settings used by `invoke_checkpoint_scraper()`:
   - Confirm production DB has the correct Supabase URL setting.
   - Confirm production DB has a non-empty service role key setting.
   - Confirm the Edge Function is deployed to `rgucewewminsevbjgcad`.
4. Check Supabase Edge Function logs for `checkpoint-scraper` after April 24:
   - A 401/404 before the function body would explain absent `scraper_logs`.
   - Runtime errors after the initial log insert should still leave a partial/failed row.
5. Continue monitoring scheduled scraper health. Manual trigger works, but cron still needs proof.
6. If exact Solon timing/location is published later, promote the pending Solon announcement to a confirmed checkpoint row. Until then, keep it as `pending_details`.
7. Review the April 30 Stark/Lake Township timing against public media if the historical record must be exact; the scraper backfilled aggregator timing.

## Cinco de Mayo Monitoring Recommendation

Through Wednesday, May 6, 2026:

- Check Cleveland19/WOIO, Solon Police public channels, OVICheckpoint, and general web search at least morning and afternoon.
- Do not rely on Google News RSS as the sole monitor; it returned `0` items for both statewide and targeted Solon/Cinco queries during this pass.
- If Solon publishes exact time/location detail later on May 5, update the operational source of truth before public copy claims "no announced checkpoints."
- If production still shows no May rows after a successful scheduled or manual scraper run, treat source coverage/manual curation as the blocker for Solon and cron health as the blocker for OVICheckpoint April 30 rows.

## Read-only Checks Run

- `git status --short`
- `sed`/`rg` review of the prior checkpoint report, source evidence CSV, operations doc, checkpoint service/page source, scraper source, RSS/source configuration, and scheduler migrations.
- Read-only production Supabase queries against `dui_checkpoints`, `dui_checkpoint_announcements`, and `scraper_logs` using the public anon key already shipped in `src/lib/supabaseClient.ts`.
- Public fetch of `https://mango.law/resources/dui-checkpoints`.
- Safe local-only OVICheckpoint scrape through `scrapeOVICheckpoint()` with no database writes.
- Public web search/open for the current Solon/Cinco de Mayo checkpoint source.
- Public Google News RSS fetches for configured statewide and targeted Solon/Cinco queries.

## Files Owned In This Follow-up

- `docs/technical/seo-aeo-round-2026-05-03/checkpoint-scraper-cron-health-followup-2026-05-03.md`
- `supabase/functions/checkpoint-scraper/curated-announcements.ts`
