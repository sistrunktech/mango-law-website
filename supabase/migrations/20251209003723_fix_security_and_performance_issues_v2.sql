/*
  # Fix Security and Performance Issues

  1. Missing Foreign Key Indexes
    - Add indexes for foreign key columns to improve JOIN performance:
      - ai_generations.created_by
      - blog_posts_cms.author_id
      - blog_posts_cms.created_by
      - clients.created_by
      - content_feedback.created_by
      - google_reviews.responded_by
      - review_campaigns.created_by
      - review_responses.created_by
      - social_posts.approved_by
      - social_posts.created_by

  2. RLS Policy Performance Optimization
    - Update all RLS policies to use (select auth.uid()) instead of auth.uid()
    - This prevents re-evaluation of the auth function for each row
    - Affects tables: clients, review_campaigns, google_sheet_sync_log,
      review_responses, review_sync_log, google_reviews, social_posts,
      ai_generations, blog_posts_cms, content_feedback, ai_learning_metrics,
      ai_preferences, auto_pilot_settings

  3. Function Security
    - Fix search_path for update_updated_at_column function

  4. Security Note
    - Leaked password protection should be enabled in Supabase Dashboard
      under Authentication > Settings > Security
*/

-- 1. Add missing foreign key indexes
CREATE INDEX IF NOT EXISTS idx_ai_generations_created_by ON ai_generations(created_by);
CREATE INDEX IF NOT EXISTS idx_blog_posts_cms_author_id ON blog_posts_cms(author_id);
CREATE INDEX IF NOT EXISTS idx_blog_posts_cms_created_by ON blog_posts_cms(created_by);
CREATE INDEX IF NOT EXISTS idx_clients_created_by ON clients(created_by);
CREATE INDEX IF NOT EXISTS idx_content_feedback_created_by ON content_feedback(created_by);
CREATE INDEX IF NOT EXISTS idx_google_reviews_responded_by ON google_reviews(responded_by);
CREATE INDEX IF NOT EXISTS idx_review_campaigns_created_by ON review_campaigns(created_by);
CREATE INDEX IF NOT EXISTS idx_review_responses_created_by ON review_responses(created_by);
CREATE INDEX IF NOT EXISTS idx_social_posts_approved_by ON social_posts(approved_by);
CREATE INDEX IF NOT EXISTS idx_social_posts_created_by ON social_posts(created_by);

-- 2. Fix RLS policies to use (select auth.uid()) for better performance
-- Drop and recreate policies for clients table
DROP POLICY IF EXISTS "Authenticated admin users can view all clients" ON clients;
DROP POLICY IF EXISTS "Authenticated admin users can insert clients" ON clients;
DROP POLICY IF EXISTS "Authenticated admin users can update clients" ON clients;
DROP POLICY IF EXISTS "Authenticated admin users can delete clients" ON clients;

CREATE POLICY "Authenticated admin users can view all clients"
  ON clients FOR SELECT
  TO authenticated
  USING ((select auth.uid()) IS NOT NULL);

CREATE POLICY "Authenticated admin users can insert clients"
  ON clients FOR INSERT
  TO authenticated
  WITH CHECK ((select auth.uid()) IS NOT NULL);

CREATE POLICY "Authenticated admin users can update clients"
  ON clients FOR UPDATE
  TO authenticated
  USING ((select auth.uid()) IS NOT NULL)
  WITH CHECK ((select auth.uid()) IS NOT NULL);

CREATE POLICY "Authenticated admin users can delete clients"
  ON clients FOR DELETE
  TO authenticated
  USING ((select auth.uid()) IS NOT NULL);

-- Drop and recreate policies for review_campaigns table
DROP POLICY IF EXISTS "Authenticated admin users can view all campaigns" ON review_campaigns;
DROP POLICY IF EXISTS "Authenticated admin users can insert campaigns" ON review_campaigns;
DROP POLICY IF EXISTS "Authenticated admin users can update campaigns" ON review_campaigns;
DROP POLICY IF EXISTS "Authenticated admin users can delete campaigns" ON review_campaigns;

CREATE POLICY "Authenticated admin users can view all campaigns"
  ON review_campaigns FOR SELECT
  TO authenticated
  USING ((select auth.uid()) IS NOT NULL);

CREATE POLICY "Authenticated admin users can insert campaigns"
  ON review_campaigns FOR INSERT
  TO authenticated
  WITH CHECK ((select auth.uid()) IS NOT NULL);

CREATE POLICY "Authenticated admin users can update campaigns"
  ON review_campaigns FOR UPDATE
  TO authenticated
  USING ((select auth.uid()) IS NOT NULL)
  WITH CHECK ((select auth.uid()) IS NOT NULL);

CREATE POLICY "Authenticated admin users can delete campaigns"
  ON review_campaigns FOR DELETE
  TO authenticated
  USING ((select auth.uid()) IS NOT NULL);

-- Drop and recreate policies for google_sheet_sync_log table
DROP POLICY IF EXISTS "Authenticated admin users can view sync logs" ON google_sheet_sync_log;
DROP POLICY IF EXISTS "Authenticated admin users can insert sync logs" ON google_sheet_sync_log;

CREATE POLICY "Authenticated admin users can view sync logs"
  ON google_sheet_sync_log FOR SELECT
  TO authenticated
  USING ((select auth.uid()) IS NOT NULL);

CREATE POLICY "Authenticated admin users can insert sync logs"
  ON google_sheet_sync_log FOR INSERT
  TO authenticated
  WITH CHECK ((select auth.uid()) IS NOT NULL);

-- Drop and recreate policies for review_responses table
DROP POLICY IF EXISTS "Authenticated admin users can view all responses" ON review_responses;
DROP POLICY IF EXISTS "Authenticated admin users can insert responses" ON review_responses;
DROP POLICY IF EXISTS "Authenticated admin users can update responses" ON review_responses;
DROP POLICY IF EXISTS "Authenticated admin users can delete responses" ON review_responses;

CREATE POLICY "Authenticated admin users can view all responses"
  ON review_responses FOR SELECT
  TO authenticated
  USING ((select auth.uid()) IS NOT NULL);

CREATE POLICY "Authenticated admin users can insert responses"
  ON review_responses FOR INSERT
  TO authenticated
  WITH CHECK ((select auth.uid()) IS NOT NULL);

CREATE POLICY "Authenticated admin users can update responses"
  ON review_responses FOR UPDATE
  TO authenticated
  USING ((select auth.uid()) IS NOT NULL)
  WITH CHECK ((select auth.uid()) IS NOT NULL);

CREATE POLICY "Authenticated admin users can delete responses"
  ON review_responses FOR DELETE
  TO authenticated
  USING ((select auth.uid()) IS NOT NULL);

-- Drop and recreate policies for review_sync_log table
DROP POLICY IF EXISTS "Authenticated admin users can view sync logs" ON review_sync_log;
DROP POLICY IF EXISTS "Authenticated admin users can insert sync logs" ON review_sync_log;

CREATE POLICY "Authenticated admin users can view sync logs"
  ON review_sync_log FOR SELECT
  TO authenticated
  USING ((select auth.uid()) IS NOT NULL);

CREATE POLICY "Authenticated admin users can insert sync logs"
  ON review_sync_log FOR INSERT
  TO authenticated
  WITH CHECK ((select auth.uid()) IS NOT NULL);

-- Drop and recreate policies for google_reviews table
DROP POLICY IF EXISTS "Authenticated admin users can view all reviews" ON google_reviews;
DROP POLICY IF EXISTS "Authenticated admin users can insert reviews" ON google_reviews;
DROP POLICY IF EXISTS "Authenticated admin users can update reviews" ON google_reviews;
DROP POLICY IF EXISTS "Authenticated admin users can delete reviews" ON google_reviews;

CREATE POLICY "Authenticated admin users can view all reviews"
  ON google_reviews FOR SELECT
  TO authenticated
  USING ((select auth.uid()) IS NOT NULL);

CREATE POLICY "Authenticated admin users can insert reviews"
  ON google_reviews FOR INSERT
  TO authenticated
  WITH CHECK ((select auth.uid()) IS NOT NULL);

CREATE POLICY "Authenticated admin users can update reviews"
  ON google_reviews FOR UPDATE
  TO authenticated
  USING ((select auth.uid()) IS NOT NULL)
  WITH CHECK ((select auth.uid()) IS NOT NULL);

CREATE POLICY "Authenticated admin users can delete reviews"
  ON google_reviews FOR DELETE
  TO authenticated
  USING ((select auth.uid()) IS NOT NULL);

-- Drop and recreate policies for social_posts table
DROP POLICY IF EXISTS "Authenticated admin users can view all social posts" ON social_posts;
DROP POLICY IF EXISTS "Authenticated admin users can insert social posts" ON social_posts;
DROP POLICY IF EXISTS "Authenticated admin users can update social posts" ON social_posts;
DROP POLICY IF EXISTS "Authenticated admin users can delete social posts" ON social_posts;

CREATE POLICY "Authenticated admin users can view all social posts"
  ON social_posts FOR SELECT
  TO authenticated
  USING ((select auth.uid()) IS NOT NULL);

CREATE POLICY "Authenticated admin users can insert social posts"
  ON social_posts FOR INSERT
  TO authenticated
  WITH CHECK ((select auth.uid()) IS NOT NULL);

CREATE POLICY "Authenticated admin users can update social posts"
  ON social_posts FOR UPDATE
  TO authenticated
  USING ((select auth.uid()) IS NOT NULL)
  WITH CHECK ((select auth.uid()) IS NOT NULL);

CREATE POLICY "Authenticated admin users can delete social posts"
  ON social_posts FOR DELETE
  TO authenticated
  USING ((select auth.uid()) IS NOT NULL);

-- Drop and recreate policies for ai_generations table
DROP POLICY IF EXISTS "Authenticated admin users can view all AI generations" ON ai_generations;
DROP POLICY IF EXISTS "Authenticated admin users can insert AI generations" ON ai_generations;
DROP POLICY IF EXISTS "Authenticated admin users can update AI generations" ON ai_generations;

CREATE POLICY "Authenticated admin users can view all AI generations"
  ON ai_generations FOR SELECT
  TO authenticated
  USING ((select auth.uid()) IS NOT NULL);

CREATE POLICY "Authenticated admin users can insert AI generations"
  ON ai_generations FOR INSERT
  TO authenticated
  WITH CHECK ((select auth.uid()) IS NOT NULL);

CREATE POLICY "Authenticated admin users can update AI generations"
  ON ai_generations FOR UPDATE
  TO authenticated
  USING ((select auth.uid()) IS NOT NULL)
  WITH CHECK ((select auth.uid()) IS NOT NULL);

-- Drop and recreate policies for blog_posts_cms table
DROP POLICY IF EXISTS "Authenticated admin users can view all blog posts" ON blog_posts_cms;
DROP POLICY IF EXISTS "Authenticated admin users can insert blog posts" ON blog_posts_cms;
DROP POLICY IF EXISTS "Authenticated admin users can update blog posts" ON blog_posts_cms;
DROP POLICY IF EXISTS "Authenticated admin users can delete blog posts" ON blog_posts_cms;

CREATE POLICY "Authenticated admin users can view all blog posts"
  ON blog_posts_cms FOR SELECT
  TO authenticated
  USING ((select auth.uid()) IS NOT NULL);

CREATE POLICY "Authenticated admin users can insert blog posts"
  ON blog_posts_cms FOR INSERT
  TO authenticated
  WITH CHECK ((select auth.uid()) IS NOT NULL);

CREATE POLICY "Authenticated admin users can update blog posts"
  ON blog_posts_cms FOR UPDATE
  TO authenticated
  USING ((select auth.uid()) IS NOT NULL)
  WITH CHECK ((select auth.uid()) IS NOT NULL);

CREATE POLICY "Authenticated admin users can delete blog posts"
  ON blog_posts_cms FOR DELETE
  TO authenticated
  USING ((select auth.uid()) IS NOT NULL);

-- Drop and recreate policies for content_feedback table
DROP POLICY IF EXISTS "Authenticated admin users can view all feedback" ON content_feedback;
DROP POLICY IF EXISTS "Authenticated admin users can insert feedback" ON content_feedback;
DROP POLICY IF EXISTS "Authenticated admin users can update feedback" ON content_feedback;

CREATE POLICY "Authenticated admin users can view all feedback"
  ON content_feedback FOR SELECT
  TO authenticated
  USING ((select auth.uid()) IS NOT NULL);

CREATE POLICY "Authenticated admin users can insert feedback"
  ON content_feedback FOR INSERT
  TO authenticated
  WITH CHECK ((select auth.uid()) IS NOT NULL);

CREATE POLICY "Authenticated admin users can update feedback"
  ON content_feedback FOR UPDATE
  TO authenticated
  USING ((select auth.uid()) IS NOT NULL)
  WITH CHECK ((select auth.uid()) IS NOT NULL);

-- Drop and recreate policies for ai_learning_metrics table
DROP POLICY IF EXISTS "Authenticated admin users can view learning metrics" ON ai_learning_metrics;
DROP POLICY IF EXISTS "Authenticated admin users can insert learning metrics" ON ai_learning_metrics;
DROP POLICY IF EXISTS "Authenticated admin users can update learning metrics" ON ai_learning_metrics;

CREATE POLICY "Authenticated admin users can view learning metrics"
  ON ai_learning_metrics FOR SELECT
  TO authenticated
  USING ((select auth.uid()) IS NOT NULL);

CREATE POLICY "Authenticated admin users can insert learning metrics"
  ON ai_learning_metrics FOR INSERT
  TO authenticated
  WITH CHECK ((select auth.uid()) IS NOT NULL);

CREATE POLICY "Authenticated admin users can update learning metrics"
  ON ai_learning_metrics FOR UPDATE
  TO authenticated
  USING ((select auth.uid()) IS NOT NULL)
  WITH CHECK ((select auth.uid()) IS NOT NULL);

-- Drop and recreate policies for ai_preferences table
DROP POLICY IF EXISTS "Authenticated admin users can view all preferences" ON ai_preferences;
DROP POLICY IF EXISTS "Authenticated admin users can insert preferences" ON ai_preferences;
DROP POLICY IF EXISTS "Authenticated admin users can update preferences" ON ai_preferences;
DROP POLICY IF EXISTS "Authenticated admin users can delete preferences" ON ai_preferences;

CREATE POLICY "Authenticated admin users can view all preferences"
  ON ai_preferences FOR SELECT
  TO authenticated
  USING ((select auth.uid()) IS NOT NULL);

CREATE POLICY "Authenticated admin users can insert preferences"
  ON ai_preferences FOR INSERT
  TO authenticated
  WITH CHECK ((select auth.uid()) IS NOT NULL);

CREATE POLICY "Authenticated admin users can update preferences"
  ON ai_preferences FOR UPDATE
  TO authenticated
  USING ((select auth.uid()) IS NOT NULL)
  WITH CHECK ((select auth.uid()) IS NOT NULL);

CREATE POLICY "Authenticated admin users can delete preferences"
  ON ai_preferences FOR DELETE
  TO authenticated
  USING ((select auth.uid()) IS NOT NULL);

-- Drop and recreate policies for auto_pilot_settings table
DROP POLICY IF EXISTS "Authenticated admin users can view autopilot settings" ON auto_pilot_settings;
DROP POLICY IF EXISTS "Authenticated admin users can insert autopilot settings" ON auto_pilot_settings;
DROP POLICY IF EXISTS "Authenticated admin users can update autopilot settings" ON auto_pilot_settings;

CREATE POLICY "Authenticated admin users can view autopilot settings"
  ON auto_pilot_settings FOR SELECT
  TO authenticated
  USING ((select auth.uid()) IS NOT NULL);

CREATE POLICY "Authenticated admin users can insert autopilot settings"
  ON auto_pilot_settings FOR INSERT
  TO authenticated
  WITH CHECK ((select auth.uid()) IS NOT NULL);

CREATE POLICY "Authenticated admin users can update autopilot settings"
  ON auto_pilot_settings FOR UPDATE
  TO authenticated
  USING ((select auth.uid()) IS NOT NULL)
  WITH CHECK ((select auth.uid()) IS NOT NULL);

-- 3. Fix function search_path for update_updated_at_column
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

-- 4. Clean up duplicate/overlapping policies
-- Remove redundant SELECT policies where a more specific one exists

-- For google_integrations: keep only the authenticated management policy
DROP POLICY IF EXISTS "Authenticated users can view integrations" ON google_integrations;

-- For ai_model_config: keep only the authenticated management policy  
DROP POLICY IF EXISTS "Authenticated users can view AI models" ON ai_model_config;

-- For admin_users: keep the role-based policy
DROP POLICY IF EXISTS "Anyone can view admin users" ON admin_users;

-- For allowed_domains: keep the management policy
DROP POLICY IF EXISTS "Anyone can view allowed domains" ON allowed_domains;
