/*
  # Add DUI Checkpoints Table

  1. New Tables
    - `dui_checkpoints`
      - `id` (uuid, primary key) - Unique identifier for each checkpoint
      - `title` (text) - Short descriptive title
      - `location_address` (text) - Street address or intersection
      - `location_city` (text) - City name
      - `location_county` (text) - County name
      - `latitude` (numeric) - Latitude coordinate for mapping
      - `longitude` (numeric) - Longitude coordinate for mapping
      - `start_date` (timestamptz) - When checkpoint begins
      - `end_date` (timestamptz) - When checkpoint ends
      - `status` (text) - upcoming, active, completed, cancelled
      - `source_url` (text) - Link to official announcement
      - `source_name` (text) - Name of source (e.g., "Ohio State Highway Patrol")
      - `description` (text) - Additional details about the checkpoint
      - `created_at` (timestamptz) - Record creation timestamp
      - `updated_at` (timestamptz) - Record update timestamp
      - `is_verified` (boolean) - Whether checkpoint has been officially verified
      - `views_count` (integer) - Number of times checkpoint was viewed

  2. Security
    - Enable RLS on `dui_checkpoints` table
    - Add policy for public read access to active/upcoming checkpoints
    - Add policy for authenticated admin users to manage checkpoints

  3. Indexes
    - Index on status for filtering
    - Index on location_county for geographic filtering
    - Index on start_date for chronological queries
    - Composite index on (status, start_date) for common queries

  4. Functions
    - Function to automatically update status based on dates
    - Trigger to update updated_at timestamp
*/

-- Create enum type for checkpoint status
DO $$ BEGIN
  CREATE TYPE checkpoint_status AS ENUM ('upcoming', 'active', 'completed', 'cancelled');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

-- Create the checkpoints table
CREATE TABLE IF NOT EXISTS dui_checkpoints (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  location_address text NOT NULL,
  location_city text NOT NULL,
  location_county text NOT NULL,
  latitude numeric(10, 7),
  longitude numeric(10, 7),
  start_date timestamptz NOT NULL,
  end_date timestamptz NOT NULL,
  status text NOT NULL DEFAULT 'upcoming',
  source_url text,
  source_name text,
  description text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  is_verified boolean DEFAULT false,
  views_count integer DEFAULT 0,
  CONSTRAINT valid_dates CHECK (end_date > start_date),
  CONSTRAINT valid_status CHECK (status IN ('upcoming', 'active', 'completed', 'cancelled'))
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_checkpoints_status ON dui_checkpoints(status);
CREATE INDEX IF NOT EXISTS idx_checkpoints_county ON dui_checkpoints(location_county);
CREATE INDEX IF NOT EXISTS idx_checkpoints_start_date ON dui_checkpoints(start_date);
CREATE INDEX IF NOT EXISTS idx_checkpoints_status_date ON dui_checkpoints(status, start_date);

-- Function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_checkpoint_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for updated_at
DROP TRIGGER IF EXISTS update_checkpoint_timestamp_trigger ON dui_checkpoints;
CREATE TRIGGER update_checkpoint_timestamp_trigger
  BEFORE UPDATE ON dui_checkpoints
  FOR EACH ROW
  EXECUTE FUNCTION update_checkpoint_timestamp();

-- Function to auto-update checkpoint status based on current time
CREATE OR REPLACE FUNCTION update_checkpoint_status()
RETURNS void AS $$
BEGIN
  -- Set to active if current time is between start and end date
  UPDATE dui_checkpoints
  SET status = 'active'
  WHERE status = 'upcoming'
    AND start_date <= now()
    AND end_date > now();

  -- Set to completed if end date has passed
  UPDATE dui_checkpoints
  SET status = 'completed'
  WHERE status IN ('upcoming', 'active')
    AND end_date <= now();
END;
$$ LANGUAGE plpgsql;

-- Enable Row Level Security
ALTER TABLE dui_checkpoints ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can view active and upcoming checkpoints
CREATE POLICY "Public can view active and upcoming checkpoints"
  ON dui_checkpoints
  FOR SELECT
  TO anon, authenticated
  USING (status IN ('upcoming', 'active'));

-- Policy: Authenticated users can view all checkpoints
CREATE POLICY "Authenticated users can view all checkpoints"
  ON dui_checkpoints
  FOR SELECT
  TO authenticated
  USING (true);

-- Policy: Authenticated users can insert checkpoints (for admin interface)
CREATE POLICY "Authenticated users can insert checkpoints"
  ON dui_checkpoints
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Policy: Authenticated users can update checkpoints (for admin interface)
CREATE POLICY "Authenticated users can update checkpoints"
  ON dui_checkpoints
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Policy: Authenticated users can delete checkpoints (for admin interface)
CREATE POLICY "Authenticated users can delete checkpoints"
  ON dui_checkpoints
  FOR DELETE
  TO authenticated
  USING (true);

-- Insert some sample data for testing
INSERT INTO dui_checkpoints (
  title,
  location_address,
  location_city,
  location_county,
  latitude,
  longitude,
  start_date,
  end_date,
  status,
  source_name,
  description,
  is_verified
) VALUES
  (
    'US-23 Sobriety Checkpoint',
    'US-23 near SR-229',
    'Delaware',
    'Delaware',
    40.2986,
    -83.0682,
    now() + interval '3 days',
    now() + interval '3 days 4 hours',
    'upcoming',
    'Delaware County Sheriff''s Office',
    'DUI checkpoint planned for Friday evening. Expect delays.',
    true
  ),
  (
    'Downtown Columbus DUI Checkpoint',
    'High Street and Broad Street',
    'Columbus',
    'Franklin',
    39.9612,
    -82.9988,
    now() + interval '1 day',
    now() + interval '1 day 3 hours',
    'upcoming',
    'Columbus Police Department',
    'Weekend sobriety checkpoint in downtown area.',
    true
  )
ON CONFLICT DO NOTHING;
