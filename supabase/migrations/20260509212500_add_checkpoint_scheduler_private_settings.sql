/*
  # Persist checkpoint scheduler private settings

  Supabase custom Postgres config overrides do not allow arbitrary
  `app.settings.*` keys, so the checkpoint cron invoker stores the Edge
  Function URL and service-role token in a locked table instead of relying
  on unavailable database GUCs.
*/

CREATE TABLE IF NOT EXISTS public.private_app_settings (
  key text PRIMARY KEY,
  value text NOT NULL,
  updated_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.private_app_settings ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "service_role_manage_private_app_settings" ON public.private_app_settings;
CREATE POLICY "service_role_manage_private_app_settings"
  ON public.private_app_settings
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);
CREATE OR REPLACE FUNCTION public.touch_private_app_settings_updated_at()
RETURNS trigger
LANGUAGE plpgsql
SET search_path = public, pg_temp
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;
DROP TRIGGER IF EXISTS touch_private_app_settings_updated_at ON public.private_app_settings;
CREATE TRIGGER touch_private_app_settings_updated_at
  BEFORE UPDATE ON public.private_app_settings
  FOR EACH ROW
  EXECUTE FUNCTION public.touch_private_app_settings_updated_at();
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
  SELECT value INTO function_base_url
  FROM public.private_app_settings
  WHERE key = 'supabase_url';

  SELECT value INTO access_key
  FROM public.private_app_settings
  WHERE key = 'service_role_key';

  function_base_url := NULLIF(TRIM(TRAILING '/' FROM COALESCE(
    function_base_url,
    NULLIF(current_setting('app.settings.supabase_url', true), ''),
    NULLIF(current_setting('app.supabase_url', true), ''),
    ''
  )), '');

  access_key := NULLIF(COALESCE(
    access_key,
    NULLIF(current_setting('app.settings.service_role_key', true), ''),
    NULLIF(current_setting('app.service_role_key', true), ''),
    ''
  ), '');

  IF function_base_url IS NULL THEN
    RAISE WARNING 'Cannot invoke checkpoint scraper: supabase_url is not configured';
    RETURN -1;
  END IF;

  IF access_key IS NULL THEN
    RAISE WARNING 'Cannot invoke checkpoint scraper: service_role_key is not configured';
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
GRANT EXECUTE ON FUNCTION invoke_checkpoint_scraper() TO service_role;
