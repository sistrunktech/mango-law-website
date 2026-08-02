# Checkpoint public-view release gate — 2026-08-01

Internal only. This is not approval to run the migration or deploy code.

## Read-only preflight

- Current public views: 513 checkpoint rows and 196 announcement rows.
- Staged view migration: 56 checkpoint rows and 59 announcement rows before the application relevance predicate.
- Staged application predicate: 56 checkpoint rows and 56 announcements at the August 1 cutoff.
- All three July aggregator rows remain in the admin/base table and remain hidden publicly.
- One generic Super Bowl enforcement row and one unverified syndicated Brunswick row remain available for review but are not promoted.

## Release order

1. Record current view counts and definitions in the Supabase dashboard.
2. Verify the deployed Edge revision and latest completed scraper log.
3. Apply `20260801023000_harden_public_checkpoint_read_views.sql` only after Tim approves the production migration.
4. Verify anonymous counts, checkpoint page list/map/hotspots/latest cards, and `Latest source check`.
5. Deploy the staged application commits only under their separate deployment approval.

## Rollback SQL

Use only if the post-migration anonymous surface or application smoke test fails.

```sql
CREATE OR REPLACE VIEW public.public_dui_checkpoints AS
SELECT
  id, title, location_address, location_city, location_county,
  latitude, longitude, start_date, end_date, status,
  source_url, source_name, description, created_at, updated_at,
  is_verified, views_count, announcement_date, geocoding_confidence
FROM public.dui_checkpoints
WHERE source_url IS NOT NULL;

CREATE OR REPLACE VIEW public.public_dui_checkpoint_announcements AS
SELECT
  id, title, source_url, source_name, announcement_date, event_date,
  start_date, end_date, location_text, location_city, location_county,
  status, linked_checkpoint_id, last_checked_at,
  NULL::text AS raw_text, created_at, updated_at
FROM public.dui_checkpoint_announcements
WHERE source_url IS NOT NULL;

REVOKE ALL ON public.dui_checkpoints FROM anon;
REVOKE ALL ON public.dui_checkpoint_announcements FROM anon;
GRANT SELECT ON public.public_dui_checkpoints TO anon, authenticated;
GRANT SELECT ON public.public_dui_checkpoint_announcements TO anon, authenticated;
```

After rollback, confirm counts return to 513 and 196 at the same data cutoff, then keep the application deployment blocked pending review.
