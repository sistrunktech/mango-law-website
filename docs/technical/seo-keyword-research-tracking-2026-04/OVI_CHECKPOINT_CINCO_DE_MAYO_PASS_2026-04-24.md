# OVI Checkpoint / Cinco de Mayo Research Checkpoint Pass

Date: 2026-04-24

## Status

Resolved for the current late-April checkpoint window. The production checkpoint database was stale at the start of the pass, but the scraper was fixed, deployed, triggered, and verified against current OVICheckpoint rows.

Remaining risk: the scheduled daily scraper/cron path should be monitored through Cinco de Mayo to confirm future rows continue to arrive without another manual trigger.

## Scope Checked

- `src/views/DUICheckpointsPage.tsx`
- `src/lib/checkpointService.ts`
- `src/lib/checkpointAnnouncementsService.ts`
- `src/lib/supabaseClient.ts`
- `supabase/functions/checkpoint-scraper/*`
- `docs/OPERATIONS.md`
- Production Supabase project `rgucewewminsevbjgcad`, queried through the production URL/key already used by the site
- OVICheckpoint WordPress JSON page: `https://www.ovicheckpoint.com/wp-json/wp/v2/pages/1078`
- OVICheckpoint public page: `https://www.ovicheckpoint.com/`

## Initial Finding

At the start of the pass on 2026-04-24, production Supabase had no current late-April rows even though OVICheckpoint listed April 24, 2026 Ohio activity.

Initial production state:

- Upcoming public checkpoints: `0` rows matching the public page query pattern.
- Late-April 2026 public checkpoint rows: `0` rows with `start_date >= 2026-04-20` and `< 2026-05-01`.
- Latest public checkpoint row found: Toledo, Lucas County, `start_date=2026-04-03T20:00:00+00:00`, created `2026-04-06T14:48:33.420669+00:00`.
- Latest visible `scraper_logs` row: `checkpoint-scraper`, status `partial`, completed `2026-04-06T14:49:26.397+00:00`, `checkpoints_found=297`, `checkpoints_new=2`, `checkpoints_updated=295`, trigger `manual`.

Current OVICheckpoint rows visible upstream:

- Stark County / Canton: `1801 Mahoning Road NE`, Friday, April 24, 2026, `6 PM to 8:30 PM`.
- Stark County / Canton: `3700 block of Tuscarawas Street West`, Friday, April 24, 2026, `8:30 PM to 11 PM`.
- Montgomery County / Trotwood: `5100 block of Salem Avenue`, Friday, April 24, 2026, `6:30 PM to 9 PM`.
- Montgomery County / Trotwood: `4800 block of Salem Avenue`, Friday, April 24, 2026, `6:30 PM to 9 PM`.

These remain aggregator rows from OVICheckpoint.com. They should be framed as third-party/aggregator signals unless independently confirmed by police agency releases.

## Root Causes Fixed

The production stale-data issue was not just that the scraper had not run recently. A manual run exposed three implementation problems that could keep current rows from displaying correctly.

Fixes made:

- Ohio local-time conversion: `parseDateTime` now converts checkpoint table times from America/New_York into UTC instants instead of relying on the Edge runtime's UTC local timezone.
- Duplicate matching: upsert matching now uses address/city/start-date for exact matches and requires same normalized address for heuristic matches, preventing same-day same-city rows from overwriting each other.
- Geocoding input: verbose OVICheckpoint location descriptions are reduced to concise street/block addresses before geocoding, so rows like `4800 block of Salem Avenue` and `3700 block of Tuscarawas Street West` receive usable map coordinates.

Files changed:

- `supabase/functions/checkpoint-scraper/ovicheckpoint-scraper.ts`
- `supabase/functions/checkpoint-scraper/index.ts`
- `supabase/functions/checkpoint-scraper/geocoding.ts`
- `src/views/DUICheckpointsPage.tsx`
- `test/checkpointStatus.test.ts`

## Production Execution

Production action completed:

- Deployed `checkpoint-scraper` to Supabase project `rgucewewminsevbjgcad`.
- Triggered the scraper manually after deployment.
- Final scraper run completed with `45 new` and `261 updated` rows from the OVICheckpoint source set.
- Verified current late-April rows were present in production after deployment.

Final production verification for rows with `start_date >= 2026-04-20`:

| County | City | Address | Start UTC | End UTC | Status | Lat/Lng |
|---|---|---|---|---|---|---|
| Stark | Canton | `1801 Mahoning Road NE` | `2026-04-24T22:00:00+00:00` | `2026-04-25T00:30:00+00:00` | `active` | `40.808774, -81.353193` |
| Montgomery | Trotwood | `4800 block of Salem Avenue` | `2026-04-24T22:30:00+00:00` | `2026-04-25T01:00:00+00:00` | `active` | `39.814031, -84.270479` |
| Montgomery | Trotwood | `5100 block of Salem Avenue` | `2026-04-24T22:30:00+00:00` | `2026-04-25T01:00:00+00:00` | `active` | `39.817009, -84.276448` |
| Stark | Canton | `3700 block of Tuscarawas Street West` | `2026-04-25T00:30:00+00:00` | `2026-04-25T03:00:00+00:00` | `upcoming` | `40.797357, -81.417835` |

As time passes, the public query will naturally drop rows whose `end_date` is in the past. That is expected behavior, not a freshness failure.

## Public Page Update

The checkpoint page now includes Cinco de Mayo and early-May weekends in the seasonal enforcement watch language:

- Existing seasonal language covered holidays, summer travel, Ohio State football weekends, and year-end enforcement periods.
- Added "Cinco de Mayo and early May weekends" so the page reflects the current late-April to May 5 monitoring window.

## Verification

Passed:

- Direct Node verification for Ohio local-time parsing:
  - `Friday, April 24, 2026 | 6 PM to 8:30 PM` -> `2026-04-24T22:00:00.000Z` to `2026-04-25T00:30:00.000Z`.
  - `Friday, April 24, 2026 | 8:30 PM to 11 PM` -> `2026-04-25T00:30:00.000Z` to `2026-04-25T03:00:00.000Z`.
  - `Friday, April 24, 2026 | 6:30 PM to 9 PM` -> `2026-04-24T22:30:00.000Z` to `2026-04-25T01:00:00.000Z`.
- Direct Node verification for verbose address extraction:
  - `1801 Mahoning Road NE`
  - `4800 block of Salem Avenue`
  - `3700 block of Tuscarawas Street West`
- Production Supabase verification confirmed four current late-April rows with coordinates.

Blocked:

- Full `npm test` is blocked in this worktree because `ts-node` is missing: `Error [ERR_MODULE_NOT_FOUND]: Cannot find package 'ts-node'`.

## Monitoring Recommendations

- Check `scraper_logs` daily through May 6, 2026 to confirm the scheduled job is firing.
- Re-run the scraper manually if OVICheckpoint publishes new Cinco de Mayo rows and production does not show them within the expected schedule window.
- Keep public wording conservative: treat OVICheckpoint rows as aggregator signals unless a police agency release or official checkpoint announcement is also captured.
- Add any official agency releases to `dui_checkpoint_announcements` or the source ledger before describing a checkpoint as agency-confirmed.
