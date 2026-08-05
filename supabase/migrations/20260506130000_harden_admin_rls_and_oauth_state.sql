/*
  # Harden admin RLS and Google OAuth state

  This migration narrows broad `authenticated` / `true` policies to a
  reusable admin predicate. Public read policies are preserved only for
  intentionally public content surfaces.
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
  all_policy_tables text[] := ARRAY[
    'admin_users',
    'allowed_domains',
    'admin_activity_log',
    'google_integrations',
    'google_oauth_states',
    'ai_model_config',
    'blog_posts',
    'blog_posts_cms',
    'blog_post_change_requests',
    'social_posts',
    'contact_submissions',
    'contact_leads',
    'chat_leads',
    'leads',
    'clients',
    'review_campaigns',
    'google_reviews',
    'review_responses',
    'review_sync_log',
    'google_sheet_sync_log',
    'dui_checkpoints',
    'dui_checkpoint_announcements',
    'checkpoint_duplicates',
    'scraper_logs',
    'geocoding_cache',
    'handoff_documents',
    'handoff_document_versions',
    'handoff_shares',
    'handoff_gaps',
    'seo_keywords',
    'seo_rankings',
    'content_feedback',
    'ai_preferences',
    'auto_pilot_settings',
    'ai_learning_metrics'
  ];
  admin_tables text[] := ARRAY[
    'admin_users',
    'allowed_domains',
    'admin_activity_log',
    'google_integrations',
    'ai_model_config',
    'blog_posts',
    'blog_posts_cms',
    'blog_post_change_requests',
    'social_posts',
    'contact_submissions',
    'contact_leads',
    'chat_leads',
    'leads',
    'clients',
    'review_campaigns',
    'google_reviews',
    'review_responses',
    'review_sync_log',
    'google_sheet_sync_log',
    'dui_checkpoints',
    'dui_checkpoint_announcements',
    'checkpoint_duplicates',
    'scraper_logs',
    'geocoding_cache',
    'handoff_documents',
    'handoff_document_versions',
    'handoff_shares',
    'handoff_gaps',
    'seo_keywords',
    'seo_rankings',
    'content_feedback',
    'ai_preferences',
    'auto_pilot_settings',
    'ai_learning_metrics'
  ];
  lead_tables text[] := ARRAY[
    'contact_submissions',
    'contact_leads',
    'chat_leads',
    'leads'
  ];
BEGIN
  FOREACH tbl IN ARRAY all_policy_tables LOOP
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
    END IF;
  END LOOP;

  FOREACH tbl IN ARRAY admin_tables LOOP
    IF to_regclass('public.' || quote_ident(tbl)) IS NOT NULL THEN
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

  IF to_regclass('public.dui_checkpoints') IS NOT NULL THEN
    EXECUTE 'CREATE POLICY "public_read_source_backed_checkpoints" ON public.dui_checkpoints FOR SELECT TO anon, authenticated USING (source_url IS NOT NULL)';
  END IF;

  IF to_regclass('public.dui_checkpoint_announcements') IS NOT NULL THEN
    EXECUTE 'CREATE POLICY "public_read_source_backed_checkpoint_announcements" ON public.dui_checkpoint_announcements FOR SELECT TO anon, authenticated USING (source_url IS NOT NULL)';
  END IF;

  IF to_regclass('public.blog_posts') IS NOT NULL THEN
    EXECUTE 'CREATE POLICY "public_read_published_blog_posts" ON public.blog_posts FOR SELECT TO anon, authenticated USING (published IS TRUE)';
  END IF;

  FOREACH tbl IN ARRAY lead_tables LOOP
    IF to_regclass('public.' || quote_ident(tbl)) IS NOT NULL THEN
      EXECUTE format(
        'CREATE POLICY "public_insert_leads" ON public.%I FOR INSERT TO anon, authenticated WITH CHECK (true)',
        tbl
      );
    END IF;
  END LOOP;

  -- Shared handoff documents remain publicly reachable only through
  -- public.get_shared_handoff_document(share_token, password), not table reads.
END $$;
