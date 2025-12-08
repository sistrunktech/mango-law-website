/*
  # AI Learning and Feedback System

  1. New Tables
    - `content_feedback`
      - `id` (uuid, primary key) - Unique feedback identifier
      - `content_type` (text) - Type (blog_post, social_post, review_response, email)
      - `content_id` (uuid) - Related content ID
      - `original_content` (text) - Original AI-generated content
      - `edited_content` (text) - Content after human edits
      - `edit_type` (text) - Type of edit (tone, length, structure, facts, style)
      - `edit_percentage` (decimal) - Percentage of content changed
      - `character_changes` (integer) - Number of characters changed
      - `specific_changes` (jsonb) - Detailed change tracking
      - `feedback_rating` (integer) - Rating of AI quality (1-5)
      - `feedback_notes` (text) - Human feedback comments
      - `was_approved` (boolean) - Whether content was approved
      - `time_spent_editing_seconds` (integer) - Time spent on edits
      - `improvement_areas` (text[]) - Areas AI should improve
      - `what_worked_well` (text[]) - What AI did well
      - `created_by` (uuid) - Admin user who provided feedback
      - `created_at` (timestamptz) - Feedback timestamp
      
    - `ai_preferences`
      - `id` (uuid, primary key) - Unique preference identifier
      - `preference_type` (text) - Type (tone, style, structure, vocabulary, topics)
      - `content_type` (text) - What content this applies to
      - `preference_key` (text) - Specific preference identifier
      - `preference_value` (jsonb) - Preference settings/data
      - `confidence_level` (decimal) - How confident we are (0-1)
      - `times_observed` (integer) - How many times pattern seen
      - `times_confirmed` (integer) - How many times explicitly confirmed
      - `last_confirmed_at` (timestamptz) - When last confirmed
      - `examples` (jsonb) - Example content showing preference
      - `is_active` (boolean) - Whether preference is currently used
      - `created_at` (timestamptz) - When preference was learned
      - `updated_at` (timestamptz) - When preference was updated
      
    - `auto_pilot_settings`
      - `id` (uuid, primary key) - Unique settings identifier
      - `content_type` (text) - What content type (social_posts, review_responses)
      - `is_enabled` (boolean) - Whether auto-pilot is on
      - `minimum_confidence_score` (decimal) - Min score for auto-approval (0-1)
      - `minimum_approvals_required` (integer) - Min human approvals before enabling
      - `current_approval_count` (integer) - Current human approval count
      - `auto_pilot_enabled_at` (timestamptz) - When auto-pilot was enabled
      - `last_auto_approval_at` (timestamptz) - Last automatic approval
      - `total_auto_approvals` (integer) - Total auto-approved items
      - `total_auto_rejections` (integer) - Total items that failed auto-approval
      - `platform_specific_settings` (jsonb) - Platform-specific configs
      - `created_at` (timestamptz) - Settings creation timestamp
      - `updated_at` (timestamptz) - Settings update timestamp
      
    - `ai_learning_metrics`
      - `id` (uuid, primary key) - Unique metrics identifier
      - `metric_date` (date) - Date for metrics
      - `content_type` (text) - Content type being measured
      - `total_generated` (integer) - Total AI generations
      - `total_used` (integer) - Total generations actually used
      - `total_approved_as_is` (integer) - Approved without edits
      - `total_approved_with_edits` (integer) - Approved after edits
      - `total_rejected` (integer) - Rejected generations
      - `average_edit_percentage` (decimal) - Avg % of content edited
      - `average_quality_rating` (decimal) - Avg human quality rating
      - `average_confidence_score` (decimal) - Avg AI confidence
      - `top_improvement_areas` (jsonb) - Most common improvement needs
      - `learned_preferences_count` (integer) - New preferences learned
      - `created_at` (timestamptz) - Metrics creation timestamp

  2. Security
    - Enable RLS on all tables
    - Admin-only access policies
    - Protect learning data

  3. Indexes
    - Add indexes for feedback analysis
    - Index on preference types for quick lookup
    - Index on metrics dates for reporting
*/

-- Create content_feedback table
CREATE TABLE IF NOT EXISTS content_feedback (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  content_type text NOT NULL,
  content_id uuid NOT NULL,
  original_content text NOT NULL,
  edited_content text NOT NULL,
  edit_type text,
  edit_percentage decimal(5,2),
  character_changes integer,
  specific_changes jsonb,
  feedback_rating integer CHECK (feedback_rating >= 1 AND feedback_rating <= 5),
  feedback_notes text,
  was_approved boolean DEFAULT false,
  time_spent_editing_seconds integer,
  improvement_areas text[],
  what_worked_well text[],
  created_by uuid REFERENCES auth.users(id),
  created_at timestamptz DEFAULT now()
);

-- Create ai_preferences table
CREATE TABLE IF NOT EXISTS ai_preferences (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  preference_type text NOT NULL,
  content_type text NOT NULL,
  preference_key text NOT NULL,
  preference_value jsonb NOT NULL,
  confidence_level decimal(3,2) DEFAULT 0.5,
  times_observed integer DEFAULT 1,
  times_confirmed integer DEFAULT 0,
  last_confirmed_at timestamptz,
  examples jsonb,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(content_type, preference_type, preference_key)
);

-- Create auto_pilot_settings table
CREATE TABLE IF NOT EXISTS auto_pilot_settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  content_type text UNIQUE NOT NULL,
  is_enabled boolean DEFAULT false,
  minimum_confidence_score decimal(3,2) DEFAULT 0.85,
  minimum_approvals_required integer DEFAULT 20,
  current_approval_count integer DEFAULT 0,
  auto_pilot_enabled_at timestamptz,
  last_auto_approval_at timestamptz,
  total_auto_approvals integer DEFAULT 0,
  total_auto_rejections integer DEFAULT 0,
  platform_specific_settings jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create ai_learning_metrics table
CREATE TABLE IF NOT EXISTS ai_learning_metrics (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  metric_date date NOT NULL,
  content_type text NOT NULL,
  total_generated integer DEFAULT 0,
  total_used integer DEFAULT 0,
  total_approved_as_is integer DEFAULT 0,
  total_approved_with_edits integer DEFAULT 0,
  total_rejected integer DEFAULT 0,
  average_edit_percentage decimal(5,2),
  average_quality_rating decimal(3,2),
  average_confidence_score decimal(3,2),
  top_improvement_areas jsonb,
  learned_preferences_count integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  UNIQUE(metric_date, content_type)
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_content_feedback_type ON content_feedback(content_type);
CREATE INDEX IF NOT EXISTS idx_content_feedback_content_id ON content_feedback(content_id);
CREATE INDEX IF NOT EXISTS idx_content_feedback_rating ON content_feedback(feedback_rating);
CREATE INDEX IF NOT EXISTS idx_content_feedback_created ON content_feedback(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_ai_preferences_type ON ai_preferences(preference_type);
CREATE INDEX IF NOT EXISTS idx_ai_preferences_content_type ON ai_preferences(content_type);
CREATE INDEX IF NOT EXISTS idx_ai_preferences_active ON ai_preferences(is_active);
CREATE INDEX IF NOT EXISTS idx_ai_preferences_confidence ON ai_preferences(confidence_level DESC);
CREATE INDEX IF NOT EXISTS idx_auto_pilot_content_type ON auto_pilot_settings(content_type);
CREATE INDEX IF NOT EXISTS idx_auto_pilot_enabled ON auto_pilot_settings(is_enabled);
CREATE INDEX IF NOT EXISTS idx_learning_metrics_date ON ai_learning_metrics(metric_date DESC);
CREATE INDEX IF NOT EXISTS idx_learning_metrics_type ON ai_learning_metrics(content_type);

-- Enable Row Level Security
ALTER TABLE content_feedback ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_preferences ENABLE ROW LEVEL SECURITY;
ALTER TABLE auto_pilot_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_learning_metrics ENABLE ROW LEVEL SECURITY;

-- RLS Policies for content_feedback table
CREATE POLICY "Authenticated admin users can view all feedback"
  ON content_feedback FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM auth.users
      WHERE auth.users.id = auth.uid()
    )
  );

CREATE POLICY "Authenticated admin users can insert feedback"
  ON content_feedback FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM auth.users
      WHERE auth.users.id = auth.uid()
    )
  );

CREATE POLICY "Authenticated admin users can update feedback"
  ON content_feedback FOR UPDATE
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

-- RLS Policies for ai_preferences table
CREATE POLICY "Authenticated admin users can view all preferences"
  ON ai_preferences FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM auth.users
      WHERE auth.users.id = auth.uid()
    )
  );

CREATE POLICY "Authenticated admin users can insert preferences"
  ON ai_preferences FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM auth.users
      WHERE auth.users.id = auth.uid()
    )
  );

CREATE POLICY "Authenticated admin users can update preferences"
  ON ai_preferences FOR UPDATE
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

CREATE POLICY "Authenticated admin users can delete preferences"
  ON ai_preferences FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM auth.users
      WHERE auth.users.id = auth.uid()
    )
  );

-- RLS Policies for auto_pilot_settings table
CREATE POLICY "Authenticated admin users can view autopilot settings"
  ON auto_pilot_settings FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM auth.users
      WHERE auth.users.id = auth.uid()
    )
  );

CREATE POLICY "Authenticated admin users can insert autopilot settings"
  ON auto_pilot_settings FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM auth.users
      WHERE auth.users.id = auth.uid()
    )
  );

CREATE POLICY "Authenticated admin users can update autopilot settings"
  ON auto_pilot_settings FOR UPDATE
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

-- RLS Policies for ai_learning_metrics table
CREATE POLICY "Authenticated admin users can view learning metrics"
  ON ai_learning_metrics FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM auth.users
      WHERE auth.users.id = auth.uid()
    )
  );

CREATE POLICY "Authenticated admin users can insert learning metrics"
  ON ai_learning_metrics FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM auth.users
      WHERE auth.users.id = auth.uid()
    )
  );

CREATE POLICY "Authenticated admin users can update learning metrics"
  ON ai_learning_metrics FOR UPDATE
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

-- Add triggers for updated_at
DROP TRIGGER IF EXISTS update_ai_preferences_updated_at ON ai_preferences;
CREATE TRIGGER update_ai_preferences_updated_at
  BEFORE UPDATE ON ai_preferences
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_auto_pilot_settings_updated_at ON auto_pilot_settings;
CREATE TRIGGER update_auto_pilot_settings_updated_at
  BEFORE UPDATE ON auto_pilot_settings
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Initialize auto-pilot settings for common content types
INSERT INTO auto_pilot_settings (content_type, is_enabled, minimum_confidence_score, minimum_approvals_required)
VALUES 
  ('social_posts', false, 0.85, 20),
  ('review_responses', false, 0.90, 30)
ON CONFLICT (content_type) DO NOTHING;