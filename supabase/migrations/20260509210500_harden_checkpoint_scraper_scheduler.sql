/*
  # Harden checkpoint scraper scheduler

  Makes the pg_cron -> pg_net invocation deterministic and observable:
  - never falls back to request.headers, which is absent in pg_cron workers
  - sends the expected scheduler trigger payload
  - includes the service-role Authorization and apikey headers for Edge Function auth
  - exposes a small scheduler/log status helper for production checks

  Required database settings:
    app.settings.supabase_url
    app.settings.service_role_key
*/

CREATE EXTENSION IF NOT EXISTS pg_cron;
CREATE EXTENSION IF NOT EXISTS pg_net;
CREATE OR REPLACE FUNCTION invoke_checkpoint_scraper()
RETURNS bigint
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, extensions, net, pg_temp
AS $$
DECLARE
  request_id bigint;
  function_base_url text;
  access_key text;
BEGIN
  function_base_url := NULLIF(TRIM(TRAILING '/' FROM COALESCE(
    NULLIF(current_setting('app.settings.supabase_url', true), ''),
    NULLIF(current_setting('app.supabase_url', true), ''),
    ''
  )), '');

  access_key := NULLIF(COALESCE(
    NULLIF(current_setting('app.settings.service_role_key', true), ''),
    NULLIF(current_setting('app.service_role_key', true), ''),
    ''
  ), '');

  IF function_base_url IS NULL THEN
    RAISE WARNING 'Cannot invoke checkpoint scraper: app.settings.supabase_url is not configured';
    RETURN -1;
  END IF;

  IF access_key IS NULL THEN
    RAISE WARNING 'Cannot invoke checkpoint scraper: service_role_key setting is not configured';
    RETURN -1;
  END IF;

  SELECT net.http_post(
    url := function_base_url || '/functions/v1/checkpoint-scraper',
    headers := jsonb_build_object(
      'Content-Type', 'application/json',
      'Authorization', 'Bearer ' || access_key,
      'apikey', access_key
    ),
    body := jsonb_build_object(
      'trigger', 'scheduler',
      'mode', 'core'
    )
  ) INTO request_id;

  RETURN request_id;
EXCEPTION
  WHEN OTHERS THEN
    RAISE WARNING 'Failed to invoke checkpoint scraper: %', SQLERRM;
    RETURN -1;
END;
$$;
DO $$
DECLARE
  existing_job record;
BEGIN
  FOR existing_job IN
    SELECT jobid FROM cron.job WHERE jobname = 'run_checkpoint_scraper'
  LOOP
    PERFORM cron.unschedule(existing_job.jobid);
  END LOOP;
END $$;
SELECT cron.schedule(
  'run_checkpoint_scraper',
  '17 */4 * * *',
  $$SELECT invoke_checkpoint_scraper();$$
);
CREATE OR REPLACE FUNCTION trigger_checkpoint_scraper_now()
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, extensions, net, pg_temp
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
CREATE OR REPLACE FUNCTION checkpoint_scraper_scheduler_status()
RETURNS jsonb
LANGUAGE sql
SECURITY DEFINER
SET search_path = public, cron, pg_temp
AS $$
  SELECT jsonb_build_object(
    'jobs',
    COALESCE(
      (
        SELECT jsonb_agg(
          jsonb_build_object(
            'jobid', jobid,
            'jobname', jobname,
            'schedule', schedule,
            'active', active,
            'command', command
          )
          ORDER BY jobid
        )
        FROM cron.job
        WHERE jobname = 'run_checkpoint_scraper'
      ),
      '[]'::jsonb
    ),
    'latest_log',
    (
      SELECT to_jsonb(latest)
      FROM (
        SELECT
          id,
          status,
          started_at,
          completed_at,
          duration_ms,
          checkpoints_found,
          checkpoints_new,
          checkpoints_updated,
          errors,
          metadata,
          created_at
        FROM scraper_logs
        WHERE scraper_name = 'checkpoint-scraper'
        ORDER BY created_at DESC
        LIMIT 1
      ) latest
    )
  );
$$;
GRANT EXECUTE ON FUNCTION invoke_checkpoint_scraper() TO service_role;
GRANT EXECUTE ON FUNCTION trigger_checkpoint_scraper_now() TO service_role;
GRANT EXECUTE ON FUNCTION checkpoint_scraper_scheduler_status() TO service_role;
