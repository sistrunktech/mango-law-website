/*
  Harden admin/OAuth/SEO RLS without changing public lead capture inserts.
*/

CREATE OR REPLACE FUNCTION public.is_admin_user(required_roles text[] DEFAULT ARRAY['owner', 'super_admin', 'admin']::text[])
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public, auth, pg_temp
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.admin_users au
    WHERE lower(au.email) = lower(coalesce(auth.jwt() ->> 'email', ''))
      AND au.is_active IS TRUE
      AND (
        required_roles IS NULL
        OR au.role = ANY(required_roles)
      )
  );
$$;

REVOKE ALL ON FUNCTION public.is_admin_user(text[]) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.is_admin_user(text[]) TO authenticated;
GRANT EXECUTE ON FUNCTION public.is_admin_user(text[]) TO service_role;

CREATE TABLE IF NOT EXISTS public.google_oauth_states (
  nonce_hash text PRIMARY KEY,
  integration_type text NOT NULL CHECK (
    integration_type IN ('business_profile', 'analytics', 'search_console', 'tag_manager')
  ),
  requested_by_user_id uuid,
  requested_by_email text NOT NULL,
  expires_at timestamptz NOT NULL,
  consumed_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.google_oauth_states ENABLE ROW LEVEL SECURITY;

CREATE INDEX IF NOT EXISTS idx_google_oauth_states_expires_at
  ON public.google_oauth_states (expires_at);

DO $$
DECLARE
  tbl text;
  pol text;
  admin_tables text[] := ARRAY[
    'admin_users',
    'allowed_domains',
    'admin_activity_log',
    'google_integrations',
    'google_oauth_states',
    'seo_keywords',
    'seo_rankings',
    'contact_submissions',
    'contact_leads',
    'chat_leads',
    'leads'
  ];
  lead_tables text[] := ARRAY[
    'contact_submissions',
    'contact_leads',
    'chat_leads',
    'leads'
  ];
BEGIN
  FOREACH tbl IN ARRAY admin_tables LOOP
    IF to_regclass('public.' || quote_ident(tbl)) IS NOT NULL THEN
      EXECUTE format('ALTER TABLE public.%I ENABLE ROW LEVEL SECURITY', tbl);

      FOR pol IN
        SELECT policyname
        FROM pg_policies
        WHERE schemaname = 'public'
          AND tablename = tbl
      LOOP
        EXECUTE format('DROP POLICY IF EXISTS %I ON public.%I', pol, tbl);
      END LOOP;

      EXECUTE format(
        'CREATE POLICY "admin_select" ON public.%I FOR SELECT TO authenticated USING (public.is_admin_user())',
        tbl
      );
      EXECUTE format(
        'CREATE POLICY "admin_insert" ON public.%I FOR INSERT TO authenticated WITH CHECK (public.is_admin_user())',
        tbl
      );
      EXECUTE format(
        'CREATE POLICY "admin_update" ON public.%I FOR UPDATE TO authenticated USING (public.is_admin_user()) WITH CHECK (public.is_admin_user())',
        tbl
      );
      EXECUTE format(
        'CREATE POLICY "admin_delete" ON public.%I FOR DELETE TO authenticated USING (public.is_admin_user())',
        tbl
      );
    END IF;
  END LOOP;

  FOREACH tbl IN ARRAY lead_tables LOOP
    IF to_regclass('public.' || quote_ident(tbl)) IS NOT NULL THEN
      EXECUTE format(
        'CREATE POLICY "public_insert_leads" ON public.%I FOR INSERT TO anon, authenticated WITH CHECK (true)',
        tbl
      );
    END IF;
  END LOOP;
END $$;
