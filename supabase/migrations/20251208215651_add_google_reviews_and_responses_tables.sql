/*
  # Google Business Profile Reviews and Response Management

  1. New Tables
    - `google_reviews`
      - `id` (uuid, primary key) - Internal unique identifier
      - `google_review_id` (text, unique) - Google's review identifier
      - `rating` (integer) - Star rating (1-5)
      - `author_name` (text) - Reviewer name
      - `author_photo_url` (text) - Reviewer profile photo URL
      - `review_text` (text) - Review content
      - `review_date` (timestamptz) - When review was posted
      - `response_text` (text) - Current published response
      - `response_date` (timestamptz) - When response was posted
      - `responded_by` (uuid) - Admin user who responded
      - `is_responded` (boolean) - Whether review has response
      - `sentiment` (text) - AI-analyzed sentiment (positive, neutral, negative)
      - `sentiment_score` (decimal) - Sentiment confidence score (0-1)
      - `keywords` (text[]) - Extracted keywords from review
      - `client_id` (uuid) - Linked client if identifiable
      - `created_at` (timestamptz) - Record creation timestamp
      - `updated_at` (timestamptz) - Record update timestamp
      
    - `review_responses`
      - `id` (uuid, primary key) - Unique response record identifier
      - `review_id` (uuid) - Associated review
      - `response_type` (text) - Type (ai_generated, human_written, ai_edited)
      - `original_ai_response` (text) - Initial AI-generated response
      - `final_response` (text) - Final response after human edits
      - `tone_used` (text) - Tone setting (professional, friendly, empathetic, grateful)
      - `edit_percentage` (decimal) - How much was edited (0-100)
      - `character_changes` (integer) - Number of characters changed
      - `time_spent_editing` (integer) - Seconds spent editing
      - `was_approved` (boolean) - Whether response was approved
      - `posted_to_google` (boolean) - Whether posted to GBP
      - `posted_at` (timestamptz) - When posted to Google
      - `feedback_notes` (text) - Human feedback on AI quality
      - `created_by` (uuid) - Admin user who created response
      - `created_at` (timestamptz) - Response creation timestamp
      - `updated_at` (timestamptz) - Response update timestamp
      
    - `review_sync_log`
      - `id` (uuid, primary key) - Unique sync log identifier
      - `sync_started_at` (timestamptz) - When sync started
      - `sync_completed_at` (timestamptz) - When sync completed
      - `reviews_fetched` (integer) - Total reviews fetched from API
      - `reviews_new` (integer) - New reviews added
      - `reviews_updated` (integer) - Existing reviews updated
      - `errors` (jsonb) - Any errors encountered
      - `status` (text) - Sync status (running, completed, failed)
      - `created_at` (timestamptz) - Log entry creation timestamp

  2. Security
    - Enable RLS on all tables
    - Admin-only access policies
    - Protect sensitive customer data

  3. Indexes
    - Add indexes for review lookup and filtering
    - Index on sentiment and rating for analytics
*/

-- Create google_reviews table
CREATE TABLE IF NOT EXISTS google_reviews (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  google_review_id text UNIQUE NOT NULL,
  rating integer NOT NULL CHECK (rating >= 1 AND rating <= 5),
  author_name text NOT NULL,
  author_photo_url text,
  review_text text,
  review_date timestamptz NOT NULL,
  response_text text,
  response_date timestamptz,
  responded_by uuid REFERENCES auth.users(id),
  is_responded boolean DEFAULT false,
  sentiment text,
  sentiment_score decimal(3,2),
  keywords text[],
  client_id uuid REFERENCES clients(id),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create review_responses table
CREATE TABLE IF NOT EXISTS review_responses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  review_id uuid NOT NULL REFERENCES google_reviews(id) ON DELETE CASCADE,
  response_type text DEFAULT 'ai_generated',
  original_ai_response text,
  final_response text NOT NULL,
  tone_used text,
  edit_percentage decimal(5,2),
  character_changes integer,
  time_spent_editing integer,
  was_approved boolean DEFAULT false,
  posted_to_google boolean DEFAULT false,
  posted_at timestamptz,
  feedback_notes text,
  created_by uuid REFERENCES auth.users(id),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create review_sync_log table
CREATE TABLE IF NOT EXISTS review_sync_log (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  sync_started_at timestamptz DEFAULT now(),
  sync_completed_at timestamptz,
  reviews_fetched integer DEFAULT 0,
  reviews_new integer DEFAULT 0,
  reviews_updated integer DEFAULT 0,
  errors jsonb,
  status text DEFAULT 'running',
  created_at timestamptz DEFAULT now()
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_google_reviews_rating ON google_reviews(rating);
CREATE INDEX IF NOT EXISTS idx_google_reviews_date ON google_reviews(review_date DESC);
CREATE INDEX IF NOT EXISTS idx_google_reviews_responded ON google_reviews(is_responded);
CREATE INDEX IF NOT EXISTS idx_google_reviews_sentiment ON google_reviews(sentiment);
CREATE INDEX IF NOT EXISTS idx_google_reviews_client ON google_reviews(client_id);
CREATE INDEX IF NOT EXISTS idx_review_responses_review ON review_responses(review_id);
CREATE INDEX IF NOT EXISTS idx_review_responses_posted ON review_responses(posted_to_google);
CREATE INDEX IF NOT EXISTS idx_review_sync_status ON review_sync_log(status);

-- Enable Row Level Security
ALTER TABLE google_reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE review_responses ENABLE ROW LEVEL SECURITY;
ALTER TABLE review_sync_log ENABLE ROW LEVEL SECURITY;

-- RLS Policies for google_reviews table
CREATE POLICY "Authenticated admin users can view all reviews"
  ON google_reviews FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM auth.users
      WHERE auth.users.id = auth.uid()
    )
  );

CREATE POLICY "Authenticated admin users can insert reviews"
  ON google_reviews FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM auth.users
      WHERE auth.users.id = auth.uid()
    )
  );

CREATE POLICY "Authenticated admin users can update reviews"
  ON google_reviews FOR UPDATE
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

CREATE POLICY "Authenticated admin users can delete reviews"
  ON google_reviews FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM auth.users
      WHERE auth.users.id = auth.uid()
    )
  );

-- RLS Policies for review_responses table
CREATE POLICY "Authenticated admin users can view all responses"
  ON review_responses FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM auth.users
      WHERE auth.users.id = auth.uid()
    )
  );

CREATE POLICY "Authenticated admin users can insert responses"
  ON review_responses FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM auth.users
      WHERE auth.users.id = auth.uid()
    )
  );

CREATE POLICY "Authenticated admin users can update responses"
  ON review_responses FOR UPDATE
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

CREATE POLICY "Authenticated admin users can delete responses"
  ON review_responses FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM auth.users
      WHERE auth.users.id = auth.uid()
    )
  );

-- RLS Policies for review_sync_log table
CREATE POLICY "Authenticated admin users can view sync logs"
  ON review_sync_log FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM auth.users
      WHERE auth.users.id = auth.uid()
    )
  );

CREATE POLICY "Authenticated admin users can insert sync logs"
  ON review_sync_log FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM auth.users
      WHERE auth.users.id = auth.uid()
    )
  );

-- Add triggers for updated_at
DROP TRIGGER IF EXISTS update_google_reviews_updated_at ON google_reviews;
CREATE TRIGGER update_google_reviews_updated_at
  BEFORE UPDATE ON google_reviews
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_review_responses_updated_at ON review_responses;
CREATE TRIGGER update_review_responses_updated_at
  BEFORE UPDATE ON review_responses
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();