# Checkpoint public-view release gate — updated 2026-08-04

Internal only. This is not proof that the migration or Edge function is live.

## Read-only preflight

- August 4 base tables: 513 checkpoint rows and 198 announcement rows.
- Staged view predicate: 56 checkpoint rows and 56 direct, relevant announcement rows using the same public fields the application receives.
- Staged application surface: 56 checkpoint rows and 56 announcements at the same cutoff.
- All three July aggregator rows remain in the admin/base table and remain hidden publicly.
- The SQL public boundary intentionally accepts DNS hostnames on default HTTP/S ports only. This is stricter than the application URL parser and avoids malformed or authority-obscured source URLs reaching anonymous REST reads.
- Deployed `checkpoint-scraper` revision 57 is active but predates the staged shared relevance code. The August 4 8:17 p.m. EDT run succeeded in 31.8s with 353 found, 355 updated, and zero errors.
- Repository and linked production migration history now pair through May 20; `supabase db push --dry-run --linked` reports only `20260801023000_harden_public_checkpoint_read_views.sql` pending.

## Release order

1. Record current base/view counts, definitions, Edge revision, and latest completed scraper log.
2. Merge the shared ingestion predicate, then the application filter, then this migration; keep each PR below the repository size limit.
3. Apply `20260801023000_harden_public_checkpoint_read_views.sql` from clean `origin/main`.
4. With the public anon key, prove base-table reads are denied and both public views exclude cancelled, TSA, airport, PreCheck, generic-safety, rideshare, aggregator, and non-Ohio fixtures.
5. Verify anonymous counts, page list/map/hotspots/latest cards, and the feed-derived `Latest source check` value.
6. Deploy `checkpoint-scraper` from the same reviewed source, verify its new revision and one completed scheduled/manual run, then rebuild/promote the Cloudflare application candidate.
7. Keep the three July rows hidden. If a direct agency/news source is later found, correct and verify their Eastern timestamps before promotion.

## Safe rollback

- Roll back the application or Edge version independently while leaving the narrowed views in place; the view column contract is unchanged.
- Never restore the former 513/198 anonymous surface as a routine rollback.
- If the view predicate itself is proven unsafe, replace each public view with the same explicit column list and `WHERE FALSE`, preserve the grants, and serve the application's honest no-data state while correcting the predicate. This containment rollback favors privacy/relevance over stale or contaminated data.
- Authenticated base-table reads remain limited by the recovered active-admin RLS predicate (`public.is_admin_user()`); verify one authorized admin read separately. This migration changes the anonymous curation boundary, not admin authorization.

Containment SQL, to use only if the new predicate itself is unsafe:

```sql
BEGIN;

CREATE OR REPLACE VIEW public.public_dui_checkpoints AS
SELECT
  id, title, location_address, location_city, location_county,
  latitude, longitude, start_date, end_date, status,
  source_url, source_name, description, created_at, updated_at,
  is_verified, views_count, announcement_date, geocoding_confidence
FROM public.dui_checkpoints
WHERE FALSE;

CREATE OR REPLACE VIEW public.public_dui_checkpoint_announcements AS
SELECT
  id, title, source_url, source_name, announcement_date, event_date,
  start_date, end_date, location_text, location_city, location_county,
  status, linked_checkpoint_id, last_checked_at,
  NULL::text AS raw_text, created_at, updated_at
FROM public.dui_checkpoint_announcements
WHERE FALSE;

REVOKE ALL ON public.dui_checkpoints FROM anon;
REVOKE ALL ON public.dui_checkpoint_announcements FROM anon;
REVOKE ALL ON public.public_dui_checkpoints FROM anon, authenticated;
REVOKE ALL ON public.public_dui_checkpoint_announcements FROM anon, authenticated;
GRANT SELECT ON public.public_dui_checkpoints TO anon, authenticated;
GRANT SELECT ON public.public_dui_checkpoint_announcements TO anon, authenticated;

COMMIT;
```

After containment, verify both public views return zero rows with the anon key and both base-table requests remain denied. Do not treat an authenticated session as an anonymous-boundary test.

## Done evidence

- Migration row exists in production migration history.
- Anonymous base reads fail; anonymous view reads return only the reviewed surface.
- Edge revision differs from 57 and the completed run has zero errors.
- Public list, 56-marker map, hotspots, latest announcement, and source-check timestamp pass without TSA/cancelled/aggregator noise.
- Rollback Worker version, prior Edge revision, and containment SQL are recorded before release.
