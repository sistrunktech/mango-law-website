-- Content governance guardrails v1

-- 1) Blog post lifecycle fields
ALTER TABLE blog_posts
  ADD COLUMN IF NOT EXISTS status text DEFAULT 'draft',
  ADD COLUMN IF NOT EXISTS finalized_at timestamptz,
  ADD COLUMN IF NOT EXISTS finalized_by uuid REFERENCES auth.users(id),
  ADD COLUMN IF NOT EXISTS last_approved_at timestamptz,
  ADD COLUMN IF NOT EXISTS last_approved_by uuid REFERENCES auth.users(id),
  ADD COLUMN IF NOT EXISTS last_approved_note text,
  ADD COLUMN IF NOT EXISTS last_change_reason text,
  ADD COLUMN IF NOT EXISTS last_change_type text,
  ADD COLUMN IF NOT EXISTS content_version int DEFAULT 1;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'blog_posts_status_check'
  ) THEN
    ALTER TABLE blog_posts
      ADD CONSTRAINT blog_posts_status_check
      CHECK (status IN ('draft', 'published', 'finalized'));
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'blog_posts_change_type_check'
  ) THEN
    ALTER TABLE blog_posts
      ADD CONSTRAINT blog_posts_change_type_check
      CHECK (last_change_type IS NULL OR last_change_type IN ('minor', 'major'));
  END IF;
END $$;

UPDATE blog_posts
SET status = CASE WHEN published THEN 'published' ELSE 'draft' END
WHERE status IS NULL OR status NOT IN ('draft', 'published', 'finalized');

-- 2) Version history table
CREATE TABLE IF NOT EXISTS blog_post_versions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  blog_post_id uuid REFERENCES blog_posts(id) ON DELETE SET NULL,
  version int NOT NULL,
  snapshot jsonb NOT NULL,
  created_at timestamptz DEFAULT now(),
  created_by uuid REFERENCES auth.users(id),
  change_reason text,
  approval_token text,
  change_type text CHECK (change_type IN ('minor', 'major'))
);

-- 3) Change request table
CREATE TABLE IF NOT EXISTS blog_post_change_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  blog_post_id uuid REFERENCES blog_posts(id) ON DELETE SET NULL,
  proposed_title text,
  proposed_content text,
  proposed_meta_description text,
  proposed_featured_image text,
  change_type text NOT NULL CHECK (change_type IN ('minor', 'major')),
  change_reason text NOT NULL,
  created_by uuid NOT NULL REFERENCES auth.users(id),
  created_at timestamptz DEFAULT now(),
  status text NOT NULL DEFAULT 'open' CHECK (status IN ('open', 'accepted', 'rejected')),
  reviewed_by uuid REFERENCES auth.users(id),
  reviewed_at timestamptz,
  approval_token text
);

-- 4) Indexes
CREATE INDEX IF NOT EXISTS idx_blog_posts_status ON blog_posts(status);
CREATE INDEX IF NOT EXISTS idx_blog_post_versions_blog_post_id ON blog_post_versions(blog_post_id);
CREATE INDEX IF NOT EXISTS idx_blog_post_change_requests_status ON blog_post_change_requests(status);

-- 5) Admin role helpers
CREATE OR REPLACE FUNCTION get_admin_role(user_email text)
RETURNS text
LANGUAGE sql
STABLE
AS $$
  SELECT role
  FROM admin_users
  WHERE email = user_email
    AND is_active = true
  LIMIT 1;
$$;

CREATE OR REPLACE FUNCTION is_privileged_admin(user_email text)
RETURNS boolean
LANGUAGE sql
STABLE
AS $$
  SELECT get_admin_role(user_email) IN ('owner', 'super_admin');
$$;

-- 6) Triggers for versioning + guardrails
CREATE OR REPLACE FUNCTION blog_posts_before_update_guardrails()
RETURNS trigger
LANGUAGE plpgsql
AS $$
DECLARE
  current_version int;
  user_id uuid;
BEGIN
  current_version := COALESCE(OLD.content_version, 1);
  user_id := auth.uid();

  INSERT INTO blog_post_versions (
    blog_post_id,
    version,
    snapshot,
    created_at,
    created_by,
    approval_token,
    change_reason,
    change_type
  ) VALUES (
    OLD.id,
    current_version,
    to_jsonb(OLD),
    now(),
    user_id,
    NEW.last_approved_note,
    NEW.last_change_reason,
    NEW.last_change_type
  );

  IF (OLD.status = 'finalized' OR NEW.status = 'finalized')
    AND (NEW.last_approved_note IS NULL OR btrim(NEW.last_approved_note) = '') THEN
    RAISE EXCEPTION 'approval token required for finalized content';
  END IF;

  IF NEW.status IS NULL THEN
    NEW.status := COALESCE(OLD.status, 'draft');
  END IF;

  IF NEW.published IS TRUE AND NEW.status = 'draft' THEN
    NEW.status := 'published';
  END IF;

  IF NEW.status IN ('published', 'finalized') THEN
    NEW.published := TRUE;
    IF NEW.published_date IS NULL THEN
      NEW.published_date := COALESCE(OLD.published_date, now());
    END IF;
  END IF;

  IF NEW.status = 'finalized' THEN
    NEW.finalized_at := COALESCE(NEW.finalized_at, now());
    NEW.finalized_by := COALESCE(NEW.finalized_by, user_id);
    NEW.last_approved_at := COALESCE(NEW.last_approved_at, now());
    NEW.last_approved_by := COALESCE(NEW.last_approved_by, user_id);
  END IF;

  NEW.content_version := current_version + 1;
  RETURN NEW;
END;
$$;

CREATE OR REPLACE FUNCTION blog_posts_before_delete_guardrails()
RETURNS trigger
LANGUAGE plpgsql
AS $$
DECLARE
  current_version int;
BEGIN
  IF OLD.status = 'finalized' THEN
    RAISE EXCEPTION 'cannot delete finalized content';
  END IF;

  current_version := COALESCE(OLD.content_version, 1);

  INSERT INTO blog_post_versions (
    blog_post_id,
    version,
    snapshot,
    created_at,
    created_by,
    change_reason,
    change_type
  ) VALUES (
    OLD.id,
    current_version,
    to_jsonb(OLD),
    now(),
    auth.uid(),
    'delete',
    'major'
  );

  RETURN OLD;
END;
$$;

DROP TRIGGER IF EXISTS blog_posts_guardrails_update ON blog_posts;
CREATE TRIGGER blog_posts_guardrails_update
  BEFORE UPDATE ON blog_posts
  FOR EACH ROW
  EXECUTE FUNCTION blog_posts_before_update_guardrails();

DROP TRIGGER IF EXISTS blog_posts_guardrails_delete ON blog_posts;
CREATE TRIGGER blog_posts_guardrails_delete
  BEFORE DELETE ON blog_posts
  FOR EACH ROW
  EXECUTE FUNCTION blog_posts_before_delete_guardrails();

-- 7) RLS policies
ALTER TABLE blog_post_versions ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_post_change_requests ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "View blog posts policy" ON blog_posts;
DROP POLICY IF EXISTS "Authenticated users can create blog posts" ON blog_posts;
DROP POLICY IF EXISTS "Authenticated users can update blog posts" ON blog_posts;
DROP POLICY IF EXISTS "Authenticated users can delete blog posts" ON blog_posts;

CREATE POLICY "Public can view published/finalized blog posts"
  ON blog_posts FOR SELECT
  USING (status IN ('published', 'finalized'));

CREATE POLICY "Admins can view all blog posts"
  ON blog_posts FOR SELECT
  TO authenticated
  USING (get_admin_role((current_setting('request.jwt.claims', true)::jsonb ->> 'email')) IS NOT NULL);

CREATE POLICY "Admins can insert blog posts"
  ON blog_posts FOR INSERT
  TO authenticated
  WITH CHECK (get_admin_role((current_setting('request.jwt.claims', true)::jsonb ->> 'email')) IS NOT NULL);

CREATE POLICY "Admins can update blog posts"
  ON blog_posts FOR UPDATE
  TO authenticated
  USING (
    status <> 'finalized'
    OR is_privileged_admin((current_setting('request.jwt.claims', true)::jsonb ->> 'email'))
  )
  WITH CHECK (
    status <> 'finalized'
    OR is_privileged_admin((current_setting('request.jwt.claims', true)::jsonb ->> 'email'))
  );

CREATE POLICY "Admins can delete blog posts"
  ON blog_posts FOR DELETE
  TO authenticated
  USING (
    status <> 'finalized'
    OR get_admin_role((current_setting('request.jwt.claims', true)::jsonb ->> 'email')) = 'owner'
  );

DROP POLICY IF EXISTS "Admins can view blog post versions" ON blog_post_versions;
DROP POLICY IF EXISTS "Admins can insert blog post versions" ON blog_post_versions;

CREATE POLICY "Admins can view blog post versions"
  ON blog_post_versions FOR SELECT
  TO authenticated
  USING (get_admin_role((current_setting('request.jwt.claims', true)::jsonb ->> 'email')) IS NOT NULL);

CREATE POLICY "Admins can insert blog post versions"
  ON blog_post_versions FOR INSERT
  TO authenticated
  WITH CHECK (get_admin_role((current_setting('request.jwt.claims', true)::jsonb ->> 'email')) IS NOT NULL);

DROP POLICY IF EXISTS "Admins can view blog post change requests" ON blog_post_change_requests;
DROP POLICY IF EXISTS "Admins can create blog post change requests" ON blog_post_change_requests;
DROP POLICY IF EXISTS "Privileged admins can update blog post change requests" ON blog_post_change_requests;

CREATE POLICY "Admins can view blog post change requests"
  ON blog_post_change_requests FOR SELECT
  TO authenticated
  USING (get_admin_role((current_setting('request.jwt.claims', true)::jsonb ->> 'email')) IS NOT NULL);

CREATE POLICY "Admins can create blog post change requests"
  ON blog_post_change_requests FOR INSERT
  TO authenticated
  WITH CHECK (get_admin_role((current_setting('request.jwt.claims', true)::jsonb ->> 'email')) IS NOT NULL);

CREATE POLICY "Privileged admins can update blog post change requests"
  ON blog_post_change_requests FOR UPDATE
  TO authenticated
  USING (is_privileged_admin((current_setting('request.jwt.claims', true)::jsonb ->> 'email')))
  WITH CHECK (is_privileged_admin((current_setting('request.jwt.claims', true)::jsonb ->> 'email')));
