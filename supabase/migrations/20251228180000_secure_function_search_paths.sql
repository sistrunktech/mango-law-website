-- Hardening for cancel_stale_checkpoint_announcements
ALTER FUNCTION public.cancel_stale_checkpoint_announcements() SET search_path = public, pg_temp;

-- Hardening for scraper and geocoding logs
ALTER FUNCTION public.cleanup_old_scraper_logs() SET search_path = public, pg_temp;
ALTER FUNCTION public.increment_geocoding_cache_hit(uuid) SET search_path = public, pg_temp;

-- Hardening for checkpoint scraper triggers
ALTER FUNCTION public.invoke_checkpoint_scraper() SET search_path = public, pg_temp;
ALTER FUNCTION public.trigger_checkpoint_scraper_now() SET search_path = public, pg_temp;

-- Hardening for admin role helpers
ALTER FUNCTION public.get_admin_role(text) SET search_path = public, pg_temp;
ALTER FUNCTION public.is_privileged_admin(text) SET search_path = public, pg_temp;

-- Hardening for timestamp update triggers
ALTER FUNCTION public.update_seo_keywords_timestamp() SET search_path = public, pg_temp;
ALTER FUNCTION public.update_checkpoint_announcement_timestamp() SET search_path = public, pg_temp;

-- Hardening for share tokens
ALTER FUNCTION public.generate_share_token() SET search_path = public, pg_temp;
ALTER FUNCTION public.increment_share_view_count(text) SET search_path = public, pg_temp;

-- Hardening for blog guardrails
ALTER FUNCTION public.blog_posts_before_delete_guardrails() SET search_path = public, pg_temp;
ALTER FUNCTION public.blog_posts_before_update_guardrails() SET search_path = public, pg_temp;
