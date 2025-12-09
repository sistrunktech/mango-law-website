/*
  # Fix Database Security Issues

  ## Changes

  1. **Add Missing Index**
     - Add index on `reviews.invitation_id` (foreign key) to improve query performance

  2. **Remove Unused Indexes**
     - Drop indexes that have not been used and are consuming resources:
       - `idx_brand_assets_variant_type`
       - `idx_brand_assets_is_active`
       - `idx_brand_assets_variant_color`
       - `idx_review_invitations_status`
       - `idx_review_invitations_sent_at`
       - `idx_review_invitations_email`
       - `idx_reviews_platform`
       - `idx_reviews_rating`
       - `idx_reviews_featured`
       - `idx_reviews_date`
       - `idx_analytics_date`
       - `idx_analytics_platform`
       - `contact_leads_email_idx`
       - `contact_leads_created_at_idx`
       - `chat_leads_email_idx`
       - `chat_leads_created_at_idx`
       - `idx_rate_limit_lookup`

  3. **Fix Function Search Paths**
     - Recreate functions with immutable search paths to prevent security vulnerabilities:
       - `update_brand_assets_updated_at()`
       - `expire_old_invitations()`
       - `calculate_review_stats()`

  ## Security Improvements

  - Foreign key now has proper index for optimal performance
  - Unused indexes removed to improve write performance
  - Functions now have secure search paths preventing injection attacks
*/

-- Add missing index for foreign key (guarded if table exists)
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.tables 
    WHERE table_schema = 'public' AND table_name = 'reviews'
  ) THEN
    CREATE INDEX IF NOT EXISTS idx_reviews_invitation_id ON public.reviews(invitation_id);
  END IF;
END;
$$;

-- Drop unused indexes to improve write performance
DROP INDEX IF EXISTS public.idx_brand_assets_variant_type;
DROP INDEX IF EXISTS public.idx_brand_assets_is_active;
DROP INDEX IF EXISTS public.idx_brand_assets_variant_color;
DROP INDEX IF EXISTS public.idx_review_invitations_status;
DROP INDEX IF EXISTS public.idx_review_invitations_sent_at;
DROP INDEX IF EXISTS public.idx_review_invitations_email;
DROP INDEX IF EXISTS public.idx_reviews_platform;
DROP INDEX IF EXISTS public.idx_reviews_rating;
DROP INDEX IF EXISTS public.idx_reviews_featured;
DROP INDEX IF EXISTS public.idx_reviews_date;
DROP INDEX IF EXISTS public.idx_analytics_date;
DROP INDEX IF EXISTS public.idx_analytics_platform;
DROP INDEX IF EXISTS public.contact_leads_email_idx;
DROP INDEX IF EXISTS public.contact_leads_created_at_idx;
DROP INDEX IF EXISTS public.chat_leads_email_idx;
DROP INDEX IF EXISTS public.chat_leads_created_at_idx;
DROP INDEX IF EXISTS public.idx_rate_limit_lookup;

-- Recreate functions with secure search paths

-- 1. update_brand_assets_updated_at() - Trigger function for brand_assets
CREATE OR REPLACE FUNCTION public.update_brand_assets_updated_at()
RETURNS trigger
LANGUAGE plpgsql
SET search_path = ''
AS $function$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$function$;

-- 2. expire_old_invitations() - Utility function to expire old review invitations
CREATE OR REPLACE FUNCTION public.expire_old_invitations()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $function$
BEGIN
  UPDATE public.review_invitations
  SET status = 'expired'
  WHERE status = 'pending'
    AND sent_at < NOW() - INTERVAL '30 days';
END;
$function$;

-- 3. calculate_review_stats() - Analytics function for review statistics
CREATE OR REPLACE FUNCTION public.calculate_review_stats(p_platform text)
RETURNS TABLE(
  total_reviews bigint,
  average_rating numeric,
  five_star_count bigint,
  reviews_this_month bigint,
  response_rate numeric
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $function$
BEGIN
  RETURN QUERY
  SELECT 
    COUNT(*)::bigint as total_reviews,
    ROUND(AVG(rating), 2) as average_rating,
    COUNT(*) FILTER (WHERE rating = 5)::bigint as five_star_count,
    COUNT(*) FILTER (WHERE review_date >= DATE_TRUNC('month', CURRENT_DATE))::bigint as reviews_this_month,
    ROUND(
      (COUNT(*) FILTER (WHERE response_text IS NOT NULL)::numeric / NULLIF(COUNT(*), 0) * 100),
      2
    ) as response_rate
  FROM public.reviews
  WHERE platform = p_platform;
END;
$function$;
