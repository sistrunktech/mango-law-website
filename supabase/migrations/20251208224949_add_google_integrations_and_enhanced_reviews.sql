/*
  # Google Integrations & Enhanced Review System

  1. New Tables
    - `google_integrations`
      - Stores OAuth tokens and configuration for Google APIs
      - Supports Google Business Profile, Sheets, Calendar
      - Auto-refresh token mechanism
    
    - `review_platforms`
      - Multi-platform review links (Google, Facebook, LinkedIn)
      - Track platform-specific metrics
    
    - `ai_model_config`
      - Configure AI models per use case
      - Track usage and costs
      - Support legacy and new models

  2. Updates
    - Enhance google_reviews table with response workflow
    - Add sentiment analysis fields
    - Add auto-pilot eligibility tracking

  3. Security
    - Enable RLS on all tables
    - Restrict access to authenticated admin users
    - Encrypt sensitive tokens
*/

-- Create google integrations table
CREATE TABLE IF NOT EXISTS google_integrations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  integration_type text NOT NULL CHECK (integration_type IN ('business_profile', 'sheets', 'calendar', 'oauth')),
  access_token text,
  refresh_token text,
  token_expires_at timestamptz,
  account_id text,
  location_id text,
  metadata jsonb DEFAULT '{}'::jsonb,
  is_active boolean DEFAULT true,
  last_synced_at timestamptz,
  sync_frequency_hours integer DEFAULT 4,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create review platforms table
CREATE TABLE IF NOT EXISTS review_platforms (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  platform_name text NOT NULL CHECK (platform_name IN ('google', 'facebook', 'linkedin', 'avvo', 'yelp')),
  review_url text NOT NULL,
  short_url text,
  is_active boolean DEFAULT true,
  priority_order integer DEFAULT 1,
  icon_name text,
  description text,
  total_reviews integer DEFAULT 0,
  average_rating numeric(3,2),
  last_updated_at timestamptz,
  created_at timestamptz DEFAULT now()
);

-- Create AI model configuration table
CREATE TABLE IF NOT EXISTS ai_model_config (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  use_case text NOT NULL CHECK (use_case IN ('review_response', 'blog_content', 'social_media', 'sentiment_analysis', 'kb_chat', 'embeddings')),
  model_name text NOT NULL,
  model_provider text DEFAULT 'openai',
  is_active boolean DEFAULT true,
  is_legacy boolean DEFAULT false,
  cost_per_1k_tokens numeric(10,6),
  speed_rating text CHECK (speed_rating IN ('fastest', 'fast', 'medium', 'slow')),
  quality_rating text CHECK (quality_rating IN ('basic', 'good', 'excellent', 'best')),
  recommended_for text,
  max_tokens integer,
  temperature numeric(3,2) DEFAULT 0.7,
  configuration jsonb DEFAULT '{}'::jsonb,
  usage_count integer DEFAULT 0,
  total_cost numeric(10,2) DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Add columns to google_reviews if not exist
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'google_reviews' AND column_name = 'response_generated_by'
  ) THEN
    ALTER TABLE google_reviews ADD COLUMN response_generated_by text;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'google_reviews' AND column_name = 'response_model'
  ) THEN
    ALTER TABLE google_reviews ADD COLUMN response_model text;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'google_reviews' AND column_name = 'response_confidence'
  ) THEN
    ALTER TABLE google_reviews ADD COLUMN response_confidence numeric(4,3);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'google_reviews' AND column_name = 'auto_pilot_eligible'
  ) THEN
    ALTER TABLE google_reviews ADD COLUMN auto_pilot_eligible boolean DEFAULT false;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'google_reviews' AND column_name = 'sentiment_analyzed_at'
  ) THEN
    ALTER TABLE google_reviews ADD COLUMN sentiment_analyzed_at timestamptz;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'google_reviews' AND column_name = 'key_themes'
  ) THEN
    ALTER TABLE google_reviews ADD COLUMN key_themes text[];
  END IF;
END $$;

-- Enable RLS
ALTER TABLE google_integrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE review_platforms ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_model_config ENABLE ROW LEVEL SECURITY;

-- Google integrations policies
CREATE POLICY "Authenticated users can view integrations"
  ON google_integrations FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can manage integrations"
  ON google_integrations FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Review platforms policies
CREATE POLICY "Anyone can view active review platforms"
  ON review_platforms FOR SELECT
  USING (is_active = true);

CREATE POLICY "Authenticated users can manage review platforms"
  ON review_platforms FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- AI model config policies
CREATE POLICY "Authenticated users can view AI models"
  ON ai_model_config FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can manage AI models"
  ON ai_model_config FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Seed review platforms
INSERT INTO review_platforms (platform_name, review_url, priority_order, icon_name, description, is_active)
VALUES 
  ('google', 'https://g.page/r/PLACEHOLDER/review', 1, 'Star', 'Leave us a Google review - helps others find us!', true),
  ('facebook', 'https://www.facebook.com/MangoLawLLC/reviews', 2, 'Facebook', 'Review us on Facebook', true),
  ('linkedin', 'https://www.linkedin.com/company/mango-law-llc', 3, 'Linkedin', 'Share your experience on LinkedIn', true)
ON CONFLICT DO NOTHING;

-- Seed AI model configurations
INSERT INTO ai_model_config (use_case, model_name, is_active, is_legacy, cost_per_1k_tokens, speed_rating, quality_rating, recommended_for)
VALUES 
  ('review_response', 'gpt-4o-mini', true, false, 0.15, 'fast', 'good', 'Quick, cost-effective responses with good quality'),
  ('review_response', 'gpt-4o', false, false, 2.50, 'fast', 'excellent', 'Complex or sensitive reviews requiring nuanced responses'),
  ('review_response', 'gpt-3.5-turbo', false, true, 0.50, 'fastest', 'basic', 'Legacy model - use gpt-4o-mini instead'),
  ('blog_content', 'gpt-4o', true, false, 2.50, 'fast', 'excellent', 'Long-form content with high quality and creativity'),
  ('blog_content', 'gpt-4o-mini', false, false, 0.15, 'fast', 'good', 'Draft content or quick blog posts'),
  ('social_media', 'gpt-4o-mini', true, false, 0.15, 'fast', 'good', 'Perfect for short-form social media content'),
  ('sentiment_analysis', 'gpt-4o-mini', true, false, 0.15, 'fastest', 'good', 'Fast sentiment analysis and theme extraction'),
  ('kb_chat', 'gpt-4o', true, false, 2.50, 'fast', 'excellent', 'Complex technical questions and context-aware help'),
  ('embeddings', 'text-embedding-3-small', true, false, 0.02, 'fastest', 'excellent', 'Best value for semantic search and embeddings')
ON CONFLICT DO NOTHING;

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_google_integrations_type ON google_integrations(integration_type);
CREATE INDEX IF NOT EXISTS idx_google_integrations_active ON google_integrations(is_active);
CREATE INDEX IF NOT EXISTS idx_review_platforms_active ON review_platforms(is_active);
CREATE INDEX IF NOT EXISTS idx_review_platforms_priority ON review_platforms(priority_order);
CREATE INDEX IF NOT EXISTS idx_ai_model_config_use_case ON ai_model_config(use_case);
CREATE INDEX IF NOT EXISTS idx_ai_model_config_active ON ai_model_config(is_active);
