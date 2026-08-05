/*
  # Public checkpoint read surface

  Public visitors need map/list data, but they do not need scraper raw text,
  geocoding internals, duplicate tracking, or hidden operational metadata.
  These views become the anon-readable checkpoint surface; base tables remain
  admin/service-only through RLS.
*/

CREATE OR REPLACE VIEW public.public_dui_checkpoints AS
SELECT
  id,
  title,
  location_address,
  location_city,
  location_county,
  latitude,
  longitude,
  start_date,
  end_date,
  status,
  source_url,
  source_name,
  description,
  created_at,
  updated_at,
  is_verified,
  views_count,
  announcement_date,
  geocoding_confidence
FROM public.dui_checkpoints
WHERE source_url IS NOT NULL;
CREATE OR REPLACE VIEW public.public_dui_checkpoint_announcements AS
SELECT
  id,
  title,
  source_url,
  source_name,
  announcement_date,
  event_date,
  start_date,
  end_date,
  location_text,
  location_city,
  location_county,
  status,
  linked_checkpoint_id,
  last_checked_at,
  NULL::text AS raw_text,
  created_at,
  updated_at
FROM public.dui_checkpoint_announcements
WHERE source_url IS NOT NULL;
DROP POLICY IF EXISTS "public_read_source_backed_checkpoints" ON public.dui_checkpoints;
DROP POLICY IF EXISTS "public_read_source_backed_checkpoint_announcements" ON public.dui_checkpoint_announcements;
REVOKE ALL ON public.dui_checkpoints FROM anon;
REVOKE ALL ON public.dui_checkpoint_announcements FROM anon;
GRANT SELECT ON public.public_dui_checkpoints TO anon, authenticated;
GRANT SELECT ON public.public_dui_checkpoint_announcements TO anon, authenticated;
