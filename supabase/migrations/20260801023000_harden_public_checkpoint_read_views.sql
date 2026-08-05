/*
  Keep scraper/admin history in the base tables while limiting anonymous reads
  to direct, reviewed, Ohio OVI checkpoint records. Application code applies
  the same relevance contract again before rendering.
*/

CREATE OR REPLACE FUNCTION public.is_public_ohio_ovi_checkpoint(
  candidate_title text,
  candidate_description text,
  candidate_source_name text,
  candidate_source_url text,
  candidate_location_text text,
  candidate_location_city text,
  candidate_location_county text
)
RETURNS boolean
LANGUAGE sql
IMMUTABLE
PARALLEL SAFE
SET search_path = pg_catalog
AS $function$
  WITH candidate AS (
    SELECT
      regexp_replace(
        lower(concat_ws(
          ' ',
          candidate_title,
          candidate_description,
          candidate_source_name,
          candidate_source_url,
          candidate_location_text,
          candidate_location_city,
          candidate_location_county
        )),
        '[[:space:]]+',
        ' ',
        'g'
      ) AS relevance_text,
      regexp_replace(
        lower(btrim(coalesce(candidate_location_county, ''))),
        '[[:space:]]+county$',
        ''
      ) AS normalized_county
  )
  SELECT
    relevance_text <> ''
    AND (
      relevance_text ~ '\m(sobriety|ovi|dui|impaired[- ]driving|traffic safety)[[:space:]]+checkpoints?\M'
      OR relevance_text ~ '\mcheckpoints?\M.{0,80}\m(sobriety|ovi|dui|impaired[- ]driving)\M'
    )
    AND (
      normalized_county IN (
        'adams', 'allen', 'ashland', 'ashtabula', 'athens', 'auglaize', 'belmont',
        'brown', 'butler', 'carroll', 'champaign', 'clark', 'clermont', 'clinton',
        'columbiana', 'coshocton', 'crawford', 'cuyahoga', 'darke', 'defiance',
        'delaware', 'erie', 'fairfield', 'fayette', 'franklin', 'fulton', 'gallia',
        'geauga', 'greene', 'guernsey', 'hamilton', 'hancock', 'hardin', 'harrison',
        'henry', 'highland', 'hocking', 'holmes', 'huron', 'jackson', 'jefferson',
        'knox', 'lake', 'lawrence', 'licking', 'logan', 'lorain', 'lucas', 'madison',
        'mahoning', 'marion', 'medina', 'meigs', 'mercer', 'miami', 'monroe',
        'montgomery', 'morgan', 'morrow', 'muskingum', 'noble', 'ottawa', 'paulding',
        'perry', 'pickaway', 'pike', 'portage', 'preble', 'putnam', 'richland',
        'ross', 'sandusky', 'scioto', 'seneca', 'shelby', 'stark', 'summit',
        'trumbull', 'tuscarawas', 'union', 'van wert', 'vinton', 'warren',
        'washington', 'wayne', 'williams', 'wood', 'wyandot'
      )
      OR relevance_text ~ '\m(ohio|ovi|oshp)\M'
      OR relevance_text ~ '\mohio (state )?highway patrol\M'
      OR relevance_text ~ '\m(cleveland|columbus|cincinnati|dayton|akron|toledo|youngstown)\M'
      OR relevance_text ~ '\m(adams|allen|ashland|ashtabula|athens|auglaize|belmont|brown|butler|carroll|champaign|clark|clermont|clinton|columbiana|coshocton|crawford|cuyahoga|darke|defiance|delaware|erie|fairfield|fayette|franklin|fulton|gallia|geauga|greene|guernsey|hamilton|hancock|hardin|harrison|henry|highland|hocking|holmes|huron|jackson|jefferson|knox|lake|lawrence|licking|logan|lorain|lucas|madison|mahoning|marion|medina|meigs|mercer|miami|monroe|montgomery|morgan|morrow|muskingum|noble|ottawa|paulding|perry|pickaway|pike|portage|preble|putnam|richland|ross|sandusky|scioto|seneca|shelby|stark|summit|trumbull|tuscarawas|union|van wert|vinton|warren|washington|wayne|williams|wood|wyandot) county\M'
    )
    AND NOT (
      relevance_text ~ '\m(tsa|precheck|global entry)\M'
      OR relevance_text ~ '\m(airport|aviation|border|security)[[:space:]]+checkpoints?\M'
      OR relevance_text ~ '\mcheckpoints?\M.{0,40}\m(airport|aviation|border|security)\M'
      OR relevance_text ~ '\m(free|discounted)[[:space:]]+(lyft|uber|rides?)\M'
      OR relevance_text ~ '\m(lyft|uber)\M.{0,30}\m(free|discounted)\M'
      OR relevance_text ~ '\mdesignated driver\M'
      OR relevance_text ~ '\m(road|traffic) safety (campaign|message|tips?)\M'
      OR relevance_text ~ '\m(stopdrinking|sobriety journey|addiction recovery|sober living|aa meeting|rehab|alcoholic)\M'
      OR relevance_text ~ '\mcheckpoint inhibitor\M'
      OR relevance_text ~ $regex$\mcorrespondents'? dinner\M$regex$
      OR relevance_text ~ '\m(pennsylvania|michigan|indiana|kentucky|west virginia|california|chula vista|sacramento|stockton|barstow|somerset|psp|pa state police)\M'
    )
  FROM candidate;
$function$;

REVOKE ALL ON FUNCTION public.is_public_ohio_ovi_checkpoint(
  text, text, text, text, text, text, text
) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.is_public_ohio_ovi_checkpoint(
  text, text, text, text, text, text, text
) TO anon, authenticated, service_role;

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
WHERE source_url ~* '^https?://(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+(?:[a-z]{2,63}|xn--[a-z0-9-]{2,59})(?:[/?#]|$)'
  AND status <> 'cancelled'
  AND is_verified IS TRUE
  AND lower(coalesce(source_name, '')) !~
    '(ovicheckpoint|duiblock|reddit|facebook|nextdoor|twitter|google news)'
  AND source_url !~*
    '^https?://(?:[a-z0-9-]+\.)*(?:ovicheckpoint\.com|duiblock\.com|reddit\.com|facebook\.com|nextdoor\.com|x\.com|twitter\.com|news\.google\.com)(?:[/?#]|$)'
  AND public.is_public_ohio_ovi_checkpoint(
    title,
    description,
    source_name,
    source_url,
    location_address,
    location_city,
    location_county
  );

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
WHERE source_url ~* '^https?://(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+(?:[a-z]{2,63}|xn--[a-z0-9-]{2,59})(?:[/?#]|$)'
  AND status <> 'cancelled'
  AND lower(coalesce(source_name, '')) !~
    '(ovicheckpoint|duiblock|reddit|facebook|nextdoor|twitter|google news)'
  AND source_url !~*
    '^https?://(?:[a-z0-9-]+\.)*(?:ovicheckpoint\.com|duiblock\.com|reddit\.com|facebook\.com|nextdoor\.com|x\.com|twitter\.com|news\.google\.com)(?:[/?#]|$)'
  AND public.is_public_ohio_ovi_checkpoint(
    title,
    NULL::text,
    source_name,
    source_url,
    location_text,
    location_city,
    location_county
  )
  AND (
    status <> 'pending_details'
    OR nullif(
      trim(concat_ws(' ', location_text, location_city, location_county)),
      ''
    ) IS NOT NULL
  );

REVOKE ALL ON public.dui_checkpoints FROM anon;
REVOKE ALL ON public.dui_checkpoint_announcements FROM anon;

REVOKE ALL ON public.public_dui_checkpoints FROM anon, authenticated;
REVOKE ALL ON public.public_dui_checkpoint_announcements FROM anon, authenticated;
GRANT SELECT ON public.public_dui_checkpoints TO anon, authenticated;
GRANT SELECT ON public.public_dui_checkpoint_announcements TO anon, authenticated;
