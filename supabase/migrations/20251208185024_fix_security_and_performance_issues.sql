/*
  # Fix Security and Performance Issues

  ## Summary
  Addresses Supabase security scanner findings to improve database security
  and performance. Resolves foreign key indexing, unused indexes, function
  search paths, and extension placement.

  ## Changes

  ### 1. Foreign Key Indexes
  - Add index on reviews.invitation_id foreign key

  ### 2. Unused Index Cleanup
  - Drop unused indexes to reduce overhead

  ### 3. Function Security Hardening
  - Add SET search_path to SECURITY DEFINER functions

  ### 4. Extension Schema Management
  - Move pg_net extension to extensions schema
*/

-- ============================================================================
-- 1. ADD MISSING FOREIGN KEY INDEX
-- ============================================================================

CREATE INDEX IF NOT EXISTS idx_reviews_invitation_id 
  ON reviews(invitation_id);

-- ============================================================================
-- 2. DROP UNUSED INDEXES
-- ============================================================================

DROP INDEX IF EXISTS idx_scraper_logs_name_created;
DROP INDEX IF EXISTS idx_scraper_logs_status;
DROP INDEX IF EXISTS idx_geocoding_cache_address;
DROP INDEX IF EXISTS idx_geocoding_cache_location;

-- ============================================================================
-- 3. MOVE PG_NET EXTENSION TO EXTENSIONS SCHEMA
-- ============================================================================

CREATE SCHEMA IF NOT EXISTS extensions;
GRANT USAGE ON SCHEMA extensions TO postgres, service_role;

DROP EXTENSION IF EXISTS pg_net CASCADE;
CREATE EXTENSION IF NOT EXISTS pg_net WITH SCHEMA extensions;

-- ============================================================================
-- 4. FIX FUNCTION SEARCH PATH SECURITY
-- ============================================================================

-- Drop and recreate functions with proper search_path

DROP FUNCTION IF EXISTS increment_geocoding_cache_hit(uuid);
CREATE FUNCTION increment_geocoding_cache_hit(cache_id uuid)
RETURNS void
SECURITY DEFINER
SET search_path = ''
LANGUAGE plpgsql
AS $$
BEGIN
  UPDATE public.geocoding_cache
  SET 
    hit_count = COALESCE(hit_count, 0) + 1,
    updated_at = now()
  WHERE id = cache_id;
END;
$$;

DROP FUNCTION IF EXISTS cleanup_old_scraper_logs();
CREATE FUNCTION cleanup_old_scraper_logs()
RETURNS void
SECURITY DEFINER
SET search_path = ''
LANGUAGE plpgsql
AS $$
BEGIN
  DELETE FROM public.scraper_logs
  WHERE created_at < now() - interval '30 days';
END;
$$;

DROP FUNCTION IF EXISTS trigger_checkpoint_scraper_now();
CREATE FUNCTION trigger_checkpoint_scraper_now()
RETURNS void
SECURITY DEFINER
SET search_path = ''
LANGUAGE plpgsql
AS $$
DECLARE
  response record;
BEGIN
  SELECT * INTO response
  FROM extensions.http_post(
    url := current_setting('app.supabase_url') || '/functions/v1/checkpoint-scraper',
    headers := jsonb_build_object(
      'Authorization', 'Bearer ' || current_setting('app.supabase_service_role_key'),
      'Content-Type', 'application/json'
    ),
    body := '{}'::jsonb
  );
END;
$$;

DROP FUNCTION IF EXISTS invoke_checkpoint_scraper();
CREATE FUNCTION invoke_checkpoint_scraper()
RETURNS void
SECURITY DEFINER
SET search_path = ''
LANGUAGE plpgsql
AS $$
BEGIN
  PERFORM trigger_checkpoint_scraper_now();
END;
$$;
