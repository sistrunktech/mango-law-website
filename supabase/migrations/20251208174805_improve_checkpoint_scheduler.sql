/*
  # Improve Checkpoint Scheduler with pg_net

  ## Summary
  Updates the checkpoint scraper scheduler to use pg_net extension for HTTP
  requests, which is the recommended approach for Supabase Edge Functions.

  ## Changes
  
  1. **Enable pg_net Extension**
     - Supabase's extension for making HTTP requests from Postgres
     - More reliable than http extension
  
  2. **Update Helper Function**
     - Uses pg_net.http_post() for async HTTP requests
     - Properly configured for Supabase Edge Functions
     - Better error handling and logging

  ## Notes
  - pg_net makes async HTTP requests that don't block
  - Results are stored in net.http_request_queue table
  - The scraper logs execution details independently
*/

-- Enable pg_net extension (Supabase's HTTP client)
CREATE EXTENSION IF NOT EXISTS pg_net;

-- Drop old function if exists
DROP FUNCTION IF EXISTS invoke_checkpoint_scraper();

-- Create improved helper function using pg_net
CREATE OR REPLACE FUNCTION invoke_checkpoint_scraper()
RETURNS bigint
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  request_id bigint;
  function_url text;
  service_key text;
BEGIN
  SELECT 
    COALESCE(current_setting('app.settings.supabase_url', true), 
             current_setting('app.supabase_url', true),
             '')
  INTO function_url;
  
  SELECT 
    COALESCE(current_setting('app.settings.service_role_key', true),
             current_setting('app.service_role_key', true),
             '')
  INTO service_key;

  IF function_url = '' THEN
    function_url := 'https://' || current_setting('request.headers')::json->>'host';
  END IF;

  function_url := function_url || '/functions/v1/checkpoint-scraper';

  SELECT net.http_post(
    url := function_url,
    headers := jsonb_build_object(
      'Content-Type', 'application/json',
      'Authorization', 'Bearer ' || service_key
    ),
    body := '{}'::jsonb
  ) INTO request_id;

  RETURN request_id;
EXCEPTION
  WHEN OTHERS THEN
    RAISE WARNING 'Failed to invoke checkpoint scraper: %', SQLERRM;
    RETURN -1;
END;
$$;

-- Update scheduled job to use new function
SELECT cron.unschedule('run_checkpoint_scraper');

SELECT cron.schedule(
  'run_checkpoint_scraper',
  '0 7 * * *',
  $$SELECT invoke_checkpoint_scraper();$$
);

-- Update manual trigger function
DROP FUNCTION IF EXISTS trigger_checkpoint_scraper_now();

CREATE OR REPLACE FUNCTION trigger_checkpoint_scraper_now()
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  request_id bigint;
BEGIN
  request_id := invoke_checkpoint_scraper();
  
  RETURN jsonb_build_object(
    'success', request_id > 0,
    'request_id', request_id,
    'message', CASE 
      WHEN request_id > 0 THEN 'Checkpoint scraper triggered successfully'
      ELSE 'Failed to trigger checkpoint scraper'
    END
  );
END;
$$;

-- Grant necessary permissions
GRANT EXECUTE ON FUNCTION invoke_checkpoint_scraper() TO service_role;
GRANT EXECUTE ON FUNCTION trigger_checkpoint_scraper_now() TO service_role;
