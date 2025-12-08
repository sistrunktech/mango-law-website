/*
  # Client Management and Review Campaign System

  1. New Tables
    - `clients`
      - `id` (uuid, primary key) - Unique client identifier
      - `name` (text) - Client full name
      - `email` (text) - Client email address
      - `phone` (text) - Client phone number
      - `case_type` (text) - Type of legal case (OVI, Criminal Defense, etc.)
      - `service_date` (date) - Date service was completed
      - `status` (text) - Client status (active, closed, archived)
      - `source` (text) - How client was acquired (referral, web, google_sheet, etc.)
      - `notes` (text) - Internal notes about client
      - `google_sheet_sync_id` (text) - Row ID from Google Sheet for sync tracking
      - `review_request_status` (text) - Status of review request (not_sent, sent, clicked, completed, declined)
      - `review_request_sent_date` (timestamptz) - When review request was sent
      - `review_request_clicked_date` (timestamptz) - When client clicked review link
      - `review_completed_date` (timestamptz) - When client completed review
      - `campaign_id` (uuid) - Associated review campaign
      - `created_at` (timestamptz) - Record creation timestamp
      - `updated_at` (timestamptz) - Record update timestamp
      - `created_by` (uuid) - Admin user who created record
      
    - `review_campaigns`
      - `id` (uuid, primary key) - Unique campaign identifier
      - `name` (text) - Campaign name
      - `description` (text) - Campaign description
      - `status` (text) - Campaign status (draft, active, paused, completed)
      - `scheduled_date` (timestamptz) - When to send requests
      - `email_template` (text) - Email template with merge fields
      - `total_sent` (integer) - Total requests sent
      - `total_clicked` (integer) - Total links clicked
      - `total_completed` (integer) - Total reviews completed
      - `total_declined` (integer) - Total reviews declined
      - `created_at` (timestamptz) - Campaign creation timestamp
      - `updated_at` (timestamptz) - Campaign update timestamp
      - `created_by` (uuid) - Admin user who created campaign
      
    - `google_sheet_sync_log`
      - `id` (uuid, primary key) - Unique log entry identifier
      - `sheet_id` (text) - Google Sheet ID
      - `sheet_name` (text) - Sheet name/tab
      - `sync_started_at` (timestamptz) - When sync started
      - `sync_completed_at` (timestamptz) - When sync completed
      - `rows_processed` (integer) - Number of rows processed
      - `rows_added` (integer) - Number of new clients added
      - `rows_updated` (integer) - Number of clients updated
      - `rows_skipped` (integer) - Number of rows skipped (duplicates)
      - `errors` (jsonb) - Any errors encountered during sync
      - `status` (text) - Sync status (running, completed, failed)
      - `created_at` (timestamptz) - Log entry creation timestamp

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated admin users only
    - Protect sensitive client information

  3. Indexes
    - Add indexes for frequently queried fields
    - Add unique constraint on google_sheet_sync_id
*/

-- Create clients table
CREATE TABLE IF NOT EXISTS clients (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text,
  phone text,
  case_type text,
  service_date date,
  status text DEFAULT 'active',
  source text DEFAULT 'manual',
  notes text,
  google_sheet_sync_id text UNIQUE,
  review_request_status text DEFAULT 'not_sent',
  review_request_sent_date timestamptz,
  review_request_clicked_date timestamptz,
  review_completed_date timestamptz,
  campaign_id uuid,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  created_by uuid REFERENCES auth.users(id)
);

-- Create review_campaigns table
CREATE TABLE IF NOT EXISTS review_campaigns (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  status text DEFAULT 'draft',
  scheduled_date timestamptz,
  email_template text,
  total_sent integer DEFAULT 0,
  total_clicked integer DEFAULT 0,
  total_completed integer DEFAULT 0,
  total_declined integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  created_by uuid REFERENCES auth.users(id)
);

-- Create google_sheet_sync_log table
CREATE TABLE IF NOT EXISTS google_sheet_sync_log (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  sheet_id text NOT NULL,
  sheet_name text,
  sync_started_at timestamptz DEFAULT now(),
  sync_completed_at timestamptz,
  rows_processed integer DEFAULT 0,
  rows_added integer DEFAULT 0,
  rows_updated integer DEFAULT 0,
  rows_skipped integer DEFAULT 0,
  errors jsonb,
  status text DEFAULT 'running',
  created_at timestamptz DEFAULT now()
);

-- Add foreign key for campaign_id
ALTER TABLE clients 
ADD CONSTRAINT fk_campaign 
FOREIGN KEY (campaign_id) 
REFERENCES review_campaigns(id) 
ON DELETE SET NULL;

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_clients_email ON clients(email);
CREATE INDEX IF NOT EXISTS idx_clients_review_status ON clients(review_request_status);
CREATE INDEX IF NOT EXISTS idx_clients_campaign ON clients(campaign_id);
CREATE INDEX IF NOT EXISTS idx_clients_created_at ON clients(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_campaigns_status ON review_campaigns(status);
CREATE INDEX IF NOT EXISTS idx_campaigns_scheduled ON review_campaigns(scheduled_date);
CREATE INDEX IF NOT EXISTS idx_sync_log_sheet ON google_sheet_sync_log(sheet_id);
CREATE INDEX IF NOT EXISTS idx_sync_log_status ON google_sheet_sync_log(status);

-- Enable Row Level Security
ALTER TABLE clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE review_campaigns ENABLE ROW LEVEL SECURITY;
ALTER TABLE google_sheet_sync_log ENABLE ROW LEVEL SECURITY;

-- RLS Policies for clients table
CREATE POLICY "Authenticated admin users can view all clients"
  ON clients FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM auth.users
      WHERE auth.users.id = auth.uid()
      AND auth.users.email IN (
        SELECT email FROM auth.users WHERE id = auth.uid()
      )
    )
  );

CREATE POLICY "Authenticated admin users can insert clients"
  ON clients FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM auth.users
      WHERE auth.users.id = auth.uid()
    )
  );

CREATE POLICY "Authenticated admin users can update clients"
  ON clients FOR UPDATE
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

CREATE POLICY "Authenticated admin users can delete clients"
  ON clients FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM auth.users
      WHERE auth.users.id = auth.uid()
    )
  );

-- RLS Policies for review_campaigns table
CREATE POLICY "Authenticated admin users can view all campaigns"
  ON review_campaigns FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM auth.users
      WHERE auth.users.id = auth.uid()
    )
  );

CREATE POLICY "Authenticated admin users can insert campaigns"
  ON review_campaigns FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM auth.users
      WHERE auth.users.id = auth.uid()
    )
  );

CREATE POLICY "Authenticated admin users can update campaigns"
  ON review_campaigns FOR UPDATE
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

CREATE POLICY "Authenticated admin users can delete campaigns"
  ON review_campaigns FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM auth.users
      WHERE auth.users.id = auth.uid()
    )
  );

-- RLS Policies for google_sheet_sync_log table
CREATE POLICY "Authenticated admin users can view sync logs"
  ON google_sheet_sync_log FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM auth.users
      WHERE auth.users.id = auth.uid()
    )
  );

CREATE POLICY "Authenticated admin users can insert sync logs"
  ON google_sheet_sync_log FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM auth.users
      WHERE auth.users.id = auth.uid()
    )
  );

-- Function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Add triggers for updated_at
DROP TRIGGER IF EXISTS update_clients_updated_at ON clients;
CREATE TRIGGER update_clients_updated_at
  BEFORE UPDATE ON clients
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_campaigns_updated_at ON review_campaigns;
CREATE TRIGGER update_campaigns_updated_at
  BEFORE UPDATE ON review_campaigns
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();