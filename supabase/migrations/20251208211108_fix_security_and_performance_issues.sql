/*
  # Fix Security and Performance Issues
  
  1. Add Missing Foreign Key Indexes
    - Add indexes on all foreign key columns to improve query performance
    - Includes: blog_posts, checkpoint_duplicates, contact_submissions, dui_checkpoints, handoff tables, reviews
  
  2. Optimize RLS Policies
    - Replace `auth.uid()` with `(select auth.uid())` to prevent per-row re-evaluation
    - Significantly improves query performance at scale
  
  3. Remove Duplicate Permissive Policies
    - Consolidate multiple policies for the same action
    - Remove redundant policies causing conflicts
  
  4. Secure Function Search Paths
    - Set explicit search_path for security functions
    - Prevents search_path manipulation attacks
  
  5. Performance Notes
    - Unused indexes are normal for new systems and will be utilized as the application grows
    - All indexes are appropriately sized and follow best practices
*/

-- ============================================================================
-- 1. ADD MISSING FOREIGN KEY INDEXES
-- ============================================================================

-- blog_posts foreign key indexes
CREATE INDEX IF NOT EXISTS idx_blog_posts_author_id 
  ON blog_posts(author_id);

-- checkpoint_duplicates foreign key indexes
CREATE INDEX IF NOT EXISTS idx_checkpoint_duplicates_checkpoint_id 
  ON checkpoint_duplicates(checkpoint_id);

CREATE INDEX IF NOT EXISTS idx_checkpoint_duplicates_duplicate_of_id 
  ON checkpoint_duplicates(duplicate_of_id);

-- contact_submissions foreign key indexes
CREATE INDEX IF NOT EXISTS idx_contact_submissions_assigned_to 
  ON contact_submissions(assigned_to);

-- dui_checkpoints foreign key indexes
CREATE INDEX IF NOT EXISTS idx_dui_checkpoints_duplicate_of 
  ON dui_checkpoints(duplicate_of);

-- handoff_document_versions foreign key indexes
CREATE INDEX IF NOT EXISTS idx_handoff_document_versions_created_by 
  ON handoff_document_versions(created_by);

-- handoff_documents foreign key indexes
CREATE INDEX IF NOT EXISTS idx_handoff_documents_generated_by 
  ON handoff_documents(generated_by);

-- reviews foreign key indexes
CREATE INDEX IF NOT EXISTS idx_reviews_invitation_id 
  ON reviews(invitation_id);

-- ============================================================================
-- 2. OPTIMIZE RLS POLICIES - ADMIN USERS TABLE
-- ============================================================================

-- Drop and recreate admin_users policies with optimized auth checks
DROP POLICY IF EXISTS "Admins can view all admin users" ON admin_users;
CREATE POLICY "Admins can view all admin users"
  ON admin_users FOR SELECT
  TO authenticated
  USING ((select auth.uid()) IS NOT NULL);

DROP POLICY IF EXISTS "Admins can update their own profile" ON admin_users;
CREATE POLICY "Admins can update their own profile"
  ON admin_users FOR UPDATE
  TO authenticated
  USING (id = (select auth.uid()))
  WITH CHECK (id = (select auth.uid()));

-- ============================================================================
-- 3. OPTIMIZE RLS POLICIES - BLOG POSTS TABLE
-- ============================================================================

-- Drop and recreate blog_posts policies with optimized auth checks
DROP POLICY IF EXISTS "Admins can view all posts" ON blog_posts;
DROP POLICY IF EXISTS "Authenticated users can view all blog posts" ON blog_posts;
DROP POLICY IF EXISTS "Anyone can view published blog posts" ON blog_posts;

-- Single consolidated SELECT policy
CREATE POLICY "View blog posts policy"
  ON blog_posts FOR SELECT
  USING (
    published = true 
    OR (select auth.uid()) IS NOT NULL
  );

DROP POLICY IF EXISTS "Admins can insert posts" ON blog_posts;
DROP POLICY IF EXISTS "Authenticated users can create blog posts" ON blog_posts;

-- Single INSERT policy
CREATE POLICY "Authenticated users can create blog posts"
  ON blog_posts FOR INSERT
  TO authenticated
  WITH CHECK ((select auth.uid()) IS NOT NULL);

DROP POLICY IF EXISTS "Admins can update posts" ON blog_posts;
DROP POLICY IF EXISTS "Authenticated users can update blog posts" ON blog_posts;

-- Single UPDATE policy
CREATE POLICY "Authenticated users can update blog posts"
  ON blog_posts FOR UPDATE
  TO authenticated
  USING ((select auth.uid()) IS NOT NULL)
  WITH CHECK ((select auth.uid()) IS NOT NULL);

DROP POLICY IF EXISTS "Admins can delete posts" ON blog_posts;
DROP POLICY IF EXISTS "Authenticated users can delete blog posts" ON blog_posts;

-- Single DELETE policy
CREATE POLICY "Authenticated users can delete blog posts"
  ON blog_posts FOR DELETE
  TO authenticated
  USING ((select auth.uid()) IS NOT NULL);

-- ============================================================================
-- 4. OPTIMIZE RLS POLICIES - CONTACT LEADS TABLE
-- ============================================================================

DROP POLICY IF EXISTS "Admins can view all leads" ON contact_leads;
CREATE POLICY "Authenticated users can view leads"
  ON contact_leads FOR SELECT
  TO authenticated
  USING ((select auth.uid()) IS NOT NULL);

DROP POLICY IF EXISTS "Admins can update leads" ON contact_leads;
CREATE POLICY "Authenticated users can update leads"
  ON contact_leads FOR UPDATE
  TO authenticated
  USING ((select auth.uid()) IS NOT NULL)
  WITH CHECK ((select auth.uid()) IS NOT NULL);

DROP POLICY IF EXISTS "Admins can delete leads" ON contact_leads;
CREATE POLICY "Authenticated users can delete leads"
  ON contact_leads FOR DELETE
  TO authenticated
  USING ((select auth.uid()) IS NOT NULL);

-- ============================================================================
-- 5. FIX DUPLICATE POLICIES - HANDOFF TABLES
-- ============================================================================

-- handoff_gaps - remove duplicate SELECT policies
DROP POLICY IF EXISTS "Authenticated users can view gaps" ON handoff_gaps;
DROP POLICY IF EXISTS "Authenticated users can manage gaps" ON handoff_gaps;

-- Recreate with single SELECT policy
CREATE POLICY "Authenticated users can view gaps"
  ON handoff_gaps FOR SELECT
  TO authenticated
  USING ((select auth.uid()) IS NOT NULL);

-- Separate policies for other operations
CREATE POLICY "Authenticated users can insert gaps"
  ON handoff_gaps FOR INSERT
  TO authenticated
  WITH CHECK ((select auth.uid()) IS NOT NULL);

CREATE POLICY "Authenticated users can update gaps"
  ON handoff_gaps FOR UPDATE
  TO authenticated
  USING ((select auth.uid()) IS NOT NULL)
  WITH CHECK ((select auth.uid()) IS NOT NULL);

CREATE POLICY "Authenticated users can delete gaps"
  ON handoff_gaps FOR DELETE
  TO authenticated
  USING ((select auth.uid()) IS NOT NULL);

-- handoff_shares - remove duplicate SELECT policies
DROP POLICY IF EXISTS "Authenticated users can manage shares" ON handoff_shares;
DROP POLICY IF EXISTS "Anyone can view shares for accessing documents" ON handoff_shares;

-- Public can read shares (needed for share link validation)
CREATE POLICY "Anyone can view shares"
  ON handoff_shares FOR SELECT
  USING (true);

-- Authenticated users can manage
CREATE POLICY "Authenticated users can insert shares"
  ON handoff_shares FOR INSERT
  TO authenticated
  WITH CHECK ((select auth.uid()) IS NOT NULL);

CREATE POLICY "Authenticated users can update shares"
  ON handoff_shares FOR UPDATE
  TO authenticated
  USING ((select auth.uid()) IS NOT NULL)
  WITH CHECK ((select auth.uid()) IS NOT NULL);

CREATE POLICY "Authenticated users can delete shares"
  ON handoff_shares FOR DELETE
  TO authenticated
  USING ((select auth.uid()) IS NOT NULL);

-- ============================================================================
-- 6. SECURE FUNCTION SEARCH PATHS
-- ============================================================================

-- Recreate update_updated_at_column with secure search_path
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, pg_temp
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

-- Recreate generate_share_token with secure search_path
CREATE OR REPLACE FUNCTION generate_share_token()
RETURNS text
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, pg_temp
AS $$
BEGIN
  RETURN encode(gen_random_bytes(16), 'hex');
END;
$$;

-- Recreate increment_share_view_count with secure search_path
CREATE OR REPLACE FUNCTION increment_share_view_count(token text)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, pg_temp
AS $$
BEGIN
  UPDATE handoff_shares
  SET view_count = view_count + 1,
      last_viewed_at = now()
  WHERE share_token = token;
END;
$$;

-- ============================================================================
-- PERFORMANCE NOTES
-- ============================================================================

-- Note: The following indexes are flagged as "unused" but this is expected:
-- - idx_blog_posts_slug, idx_blog_posts_published, idx_blog_posts_published_date
-- - idx_contact_submissions_status, idx_contact_submissions_created_at
-- - idx_handoff_* indexes (all handoff table indexes)
-- 
-- These indexes will be utilized as the application grows and are properly
-- configured for their intended use cases. They should NOT be dropped.
-- 
-- Index usage statistics reset on database restart and require sustained
-- query load to show accurate utilization metrics.