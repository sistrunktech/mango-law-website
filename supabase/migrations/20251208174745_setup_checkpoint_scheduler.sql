/*
  # Setup Checkpoint Scraper Scheduler

  ## Summary
  Configures pg_cron extension and creates a daily scheduled job to run the
  checkpoint scraper automatically.

  ## Changes
  
  1. **Enable pg_cron Extension**
     - Enables the pg_cron extension for scheduled job management
     - Required for automated scraper execution
  
  2. **Create Scheduled Job**
     - Job name: `run_checkpoint_scraper`
     - Schedule: Daily at 2:00 AM EST (7:00 AM UTC)
     - Action: HTTP POST to checkpoint-scraper Edge function
     - Purpose: Automatically scrape and update checkpoint data

  3. **Create Helper Function**
     - Function: `invoke_checkpoint_scraper()`
     - Executes HTTP request to Edge function
     - Uses Supabase service role for authentication
     - Returns success/failure status

  ## Notes
  - pg_cron jobs run in UTC timezone
  - 2:00 AM EST = 7:00 AM UTC (accounting for daylight savings)
  - The scraper will log all execution details to `scraper_logs` table
  - Manual execution is still available via Edge function endpoint
*/

-- Enable pg_cron extension
CREATE EXTENSION IF NOT EXISTS pg_cron;

-- Grant usage on cron schema to postgres role
GRANT USAGE ON SCHEMA cron TO postgres;

-- Create helper function to invoke checkpoint scraper
CREATE OR REPLACE FUNCTION invoke_checkpoint_scraper()
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  result jsonb;
  function_url text;
  api_key text;
BEGIN
  function_url := current_setting('app.settings.supabase_url', true) || '/functions/v1/checkpoint-scraper';
  api_key := current_setting('app.settings.service_role_key', true);

  SELECT content::jsonb INTO result
  FROM http((
    'POST',
    function_url,
    ARRAY[
      http_header('Authorization', 'Bearer ' || api_key),
      http_header('Content-Type', 'application/json')
    ],
    'application/json',
    '{}'
  )::http_request);

  RETURN result;
EXCEPTION
  WHEN OTHERS THEN
    RETURN jsonb_build_object(
      'success', false,
      'error', SQLERRM
    );
END;
$$;

-- Schedule daily checkpoint scraper job
-- Runs at 2:00 AM EST (7:00 AM UTC) every day
SELECT cron.schedule(
  'run_checkpoint_scraper',
  '0 7 * * *',
  $$SELECT invoke_checkpoint_scraper();$$
);

-- Create function to manually trigger scheduled job (for testing)
CREATE OR REPLACE FUNCTION trigger_checkpoint_scraper_now()
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  RETURN invoke_checkpoint_scraper();
END;
$$;

-- Grant execute permissions
GRANT EXECUTE ON FUNCTION invoke_checkpoint_scraper() TO service_role;
GRANT EXECUTE ON FUNCTION trigger_checkpoint_scraper_now() TO service_role;
