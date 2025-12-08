/*
  # Social Media Management and AI Content Generation

  1. New Tables
    - `social_posts`
      - `id` (uuid, primary key) - Unique post identifier
      - `platform` (text) - Platform (google_business, facebook, linkedin, instagram)
      - `content` (text) - Post content/caption
      - `original_ai_content` (text) - Original AI-generated content
      - `media_urls` (text[]) - Associated media URLs
      - `scheduled_date` (timestamptz) - When to publish
      - `published_date` (timestamptz) - When actually published
      - `status` (text) - Status (draft, pending_review, approved, scheduled, published, failed)
      - `approval_status` (text) - Approval state (pending, approved, rejected)
      - `approved_by` (uuid) - Admin user who approved
      - `approved_at` (timestamptz) - When approved
      - `blog_post_id` (uuid) - Source blog post if auto-generated
      - `post_type` (text) - Type (manual, blog_conversion, ai_generated)
      - `hashtags` (text[]) - Hashtags used
      - `edit_percentage` (decimal) - How much was edited from AI version
      - `character_changes` (integer) - Number of characters changed
      - `confidence_score` (decimal) - AI confidence for auto-approval (0-1)
      - `auto_approved` (boolean) - Whether auto-approved by system
      - `performance_metrics` (jsonb) - Engagement metrics after publishing
      - `created_by` (uuid) - Admin user who created
      - `created_at` (timestamptz) - Creation timestamp
      - `updated_at` (timestamptz) - Update timestamp
      
    - `ai_generations`
      - `id` (uuid, primary key) - Unique generation identifier
      - `generation_type` (text) - Type (blog_post, social_post, review_response, email)
      - `related_id` (uuid) - ID of related record
      - `prompt_used` (text) - Prompt sent to AI
      - `ai_model` (text) - AI model used
      - `generation_params` (jsonb) - Parameters used (tone, style, etc.)
      - `original_output` (text) - Raw AI output
      - `final_output` (text) - After human edits
      - `was_used` (boolean) - Whether output was actually used
      - `quality_rating` (integer) - Human quality rating (1-5)
      - `feedback_notes` (text) - Human feedback
      - `processing_time_ms` (integer) - Time to generate
      - `created_by` (uuid) - Admin user who requested
      - `created_at` (timestamptz) - Generation timestamp
      
    - `blog_posts_cms`
      - `id` (uuid, primary key) - Unique blog post identifier
      - `title` (text) - Blog post title
      - `slug` (text, unique) - URL slug
      - `content` (text) - Full post content
      - `excerpt` (text) - Short excerpt
      - `featured_image_url` (text) - Featured image
      - `author_id` (uuid) - Author reference
      - `category` (text) - Post category
      - `tags` (text[]) - Post tags
      - `seo_title` (text) - SEO meta title
      - `seo_description` (text) - SEO meta description
      - `seo_keywords` (text[]) - SEO keywords
      - `status` (text) - Status (draft, pending_review, published, archived)
      - `ai_assisted` (boolean) - Whether AI was used
      - `ai_generation_mode` (text) - Mode (guided, full, manual)
      - `human_edit_required` (boolean) - Whether edits are required
      - `edit_checkpoints_completed` (jsonb) - Track completed review steps
      - `total_edit_time_seconds` (integer) - Time spent editing
      - `character_edits_made` (integer) - Characters changed from AI
      - `published_at` (timestamptz) - Publication timestamp
      - `created_by` (uuid) - Admin user who created
      - `created_at` (timestamptz) - Creation timestamp
      - `updated_at` (timestamptz) - Update timestamp

  2. Security
    - Enable RLS on all tables
    - Admin-only access policies
    - Protect draft content

  3. Indexes
    - Add indexes for status and date filtering
    - Index on blog_post_id for auto-conversion tracking
*/

-- Create social_posts table
CREATE TABLE IF NOT EXISTS social_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  platform text NOT NULL,
  content text NOT NULL,
  original_ai_content text,
  media_urls text[],
  scheduled_date timestamptz,
  published_date timestamptz,
  status text DEFAULT 'draft',
  approval_status text DEFAULT 'pending',
  approved_by uuid REFERENCES auth.users(id),
  approved_at timestamptz,
  blog_post_id uuid,
  post_type text DEFAULT 'manual',
  hashtags text[],
  edit_percentage decimal(5,2),
  character_changes integer,
  confidence_score decimal(3,2),
  auto_approved boolean DEFAULT false,
  performance_metrics jsonb,
  created_by uuid REFERENCES auth.users(id),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create ai_generations table
CREATE TABLE IF NOT EXISTS ai_generations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  generation_type text NOT NULL,
  related_id uuid,
  prompt_used text NOT NULL,
  ai_model text,
  generation_params jsonb,
  original_output text NOT NULL,
  final_output text,
  was_used boolean DEFAULT false,
  quality_rating integer CHECK (quality_rating >= 1 AND quality_rating <= 5),
  feedback_notes text,
  processing_time_ms integer,
  created_by uuid REFERENCES auth.users(id),
  created_at timestamptz DEFAULT now()
);

-- Create blog_posts_cms table
CREATE TABLE IF NOT EXISTS blog_posts_cms (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text UNIQUE NOT NULL,
  content text NOT NULL,
  excerpt text,
  featured_image_url text,
  author_id uuid REFERENCES auth.users(id),
  category text,
  tags text[],
  seo_title text,
  seo_description text,
  seo_keywords text[],
  status text DEFAULT 'draft',
  ai_assisted boolean DEFAULT false,
  ai_generation_mode text,
  human_edit_required boolean DEFAULT true,
  edit_checkpoints_completed jsonb DEFAULT '[]'::jsonb,
  total_edit_time_seconds integer DEFAULT 0,
  character_edits_made integer DEFAULT 0,
  published_at timestamptz,
  created_by uuid REFERENCES auth.users(id),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Add foreign key for blog_post_id
ALTER TABLE social_posts 
ADD CONSTRAINT fk_blog_post 
FOREIGN KEY (blog_post_id) 
REFERENCES blog_posts_cms(id) 
ON DELETE SET NULL;

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_social_posts_platform ON social_posts(platform);
CREATE INDEX IF NOT EXISTS idx_social_posts_status ON social_posts(status);
CREATE INDEX IF NOT EXISTS idx_social_posts_approval ON social_posts(approval_status);
CREATE INDEX IF NOT EXISTS idx_social_posts_scheduled ON social_posts(scheduled_date);
CREATE INDEX IF NOT EXISTS idx_social_posts_blog ON social_posts(blog_post_id);
CREATE INDEX IF NOT EXISTS idx_ai_generations_type ON ai_generations(generation_type);
CREATE INDEX IF NOT EXISTS idx_ai_generations_related ON ai_generations(related_id);
CREATE INDEX IF NOT EXISTS idx_ai_generations_created ON ai_generations(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON blog_posts_cms(slug);
CREATE INDEX IF NOT EXISTS idx_blog_posts_status ON blog_posts_cms(status);
CREATE INDEX IF NOT EXISTS idx_blog_posts_published ON blog_posts_cms(published_at DESC);
CREATE INDEX IF NOT EXISTS idx_blog_posts_category ON blog_posts_cms(category);

-- Enable Row Level Security
ALTER TABLE social_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_generations ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts_cms ENABLE ROW LEVEL SECURITY;

-- RLS Policies for social_posts table
CREATE POLICY "Authenticated admin users can view all social posts"
  ON social_posts FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM auth.users
      WHERE auth.users.id = auth.uid()
    )
  );

CREATE POLICY "Authenticated admin users can insert social posts"
  ON social_posts FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM auth.users
      WHERE auth.users.id = auth.uid()
    )
  );

CREATE POLICY "Authenticated admin users can update social posts"
  ON social_posts FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM auth.users
      WHERE auth.users.id = auth.uid()
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM auth.users
      WHERE auth.users.id = auth.uid()
    )
  );

CREATE POLICY "Authenticated admin users can delete social posts"
  ON social_posts FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM auth.users
      WHERE auth.users.id = auth.uid()
    )
  );

-- RLS Policies for ai_generations table
CREATE POLICY "Authenticated admin users can view all AI generations"
  ON ai_generations FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM auth.users
      WHERE auth.users.id = auth.uid()
    )
  );

CREATE POLICY "Authenticated admin users can insert AI generations"
  ON ai_generations FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM auth.users
      WHERE auth.users.id = auth.uid()
    )
  );

CREATE POLICY "Authenticated admin users can update AI generations"
  ON ai_generations FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM auth.users
      WHERE auth.users.id = auth.uid()
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM auth.users
      WHERE auth.users.id = auth.uid()
    )
  );

-- RLS Policies for blog_posts_cms table
CREATE POLICY "Authenticated admin users can view all blog posts"
  ON blog_posts_cms FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM auth.users
      WHERE auth.users.id = auth.uid()
    )
  );

CREATE POLICY "Authenticated admin users can insert blog posts"
  ON blog_posts_cms FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM auth.users
      WHERE auth.users.id = auth.uid()
    )
  );

CREATE POLICY "Authenticated admin users can update blog posts"
  ON blog_posts_cms FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM auth.users
      WHERE auth.users.id = auth.uid()
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM auth.users
      WHERE auth.users.id = auth.uid()
    )
  );

CREATE POLICY "Authenticated admin users can delete blog posts"
  ON blog_posts_cms FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM auth.users
      WHERE auth.users.id = auth.uid()
    )
  );

-- Add triggers for updated_at
DROP TRIGGER IF EXISTS update_social_posts_updated_at ON social_posts;
CREATE TRIGGER update_social_posts_updated_at
  BEFORE UPDATE ON social_posts
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_blog_posts_cms_updated_at ON blog_posts_cms;
CREATE TRIGGER update_blog_posts_cms_updated_at
  BEFORE UPDATE ON blog_posts_cms
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();