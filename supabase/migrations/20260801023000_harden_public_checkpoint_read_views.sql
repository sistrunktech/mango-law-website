/*
  Keep scraper/admin history in the base tables while limiting anonymous reads
  to direct, reviewed checkpoint records. Application code applies the shared
  Ohio OVI relevance predicate as a second, user-facing safety layer.
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
WHERE source_url IS NOT NULL
  AND status <> 'cancelled'
  AND is_verified IS TRUE
  AND lower(coalesce(source_name, '')) !~
    '(ovicheckpoint|duiblock|reddit|facebook|nextdoor|twitter|google news)'
  AND lower(source_url) !~
    '^https?://([^/]+\.)?(ovicheckpoint\.com|duiblock\.com|reddit\.com|facebook\.com|nextdoor\.com|x\.com|twitter\.com|news\.google\.com)([:/]|$)';

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
WHERE source_url IS NOT NULL
  AND status <> 'cancelled'
  AND lower(coalesce(source_name, '')) !~
    '(ovicheckpoint|duiblock|reddit|facebook|nextdoor|twitter|google news)'
  AND lower(source_url) !~
    '^https?://([^/]+\.)?(ovicheckpoint\.com|duiblock\.com|reddit\.com|facebook\.com|nextdoor\.com|x\.com|twitter\.com|news\.google\.com)([:/]|$)'
  AND (
    status <> 'pending_details'
    OR nullif(
      trim(concat_ws(' ', location_text, location_city, location_county)),
      ''
    ) IS NOT NULL
  );

REVOKE ALL ON public.dui_checkpoints FROM anon;
REVOKE ALL ON public.dui_checkpoint_announcements FROM anon;

GRANT SELECT ON public.public_dui_checkpoints TO anon, authenticated;
GRANT SELECT ON public.public_dui_checkpoint_announcements TO anon, authenticated;
