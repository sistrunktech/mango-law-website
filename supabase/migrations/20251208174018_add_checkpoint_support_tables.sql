/*
  # Add Checkpoint System Support Tables

  ## Summary
  Adds support tables for the DUI checkpoint map system including geocoding cache
  and scraper activity logs.

  ## New Tables

  ### `geocoding_cache`
  Caches geocoding results to minimize external API calls and improve performance.
  - `id` (uuid, primary key) - Unique identifier
  - `address` (text, unique, not null) - Original address string (normalized)
  - `latitude` (numeric, not null) - Geocoded latitude
  - `longitude` (numeric, not null) - Geocoded longitude
  - `formatted_address` (text) - Normalized address from geocoding service
  - `confidence` (text) - Geocoding confidence level (high, medium, low)
  - `provider` (text) - Geocoding provider used (mapbox, google, nominatim)
  - `metadata` (jsonb) - Additional geocoding metadata
  - `created_at` (timestamptz) - Cache creation timestamp
  - `updated_at` (timestamptz) - Last cache update timestamp
  - `hit_count` (integer) - Number of times this cache entry was used

  ### `scraper_logs`
  Tracks checkpoint scraper execution for monitoring and debugging.
  - `id` (uuid, primary key) - Unique identifier
  - `scraper_name` (text, not null) - Name of scraper (ovicheckpoint, duiblock)
  - `status` (text, not null) - Execution status (success, partial, failed)
  - `started_at` (timestamptz, not null) - Scraper start time
  - `completed_at` (timestamptz) - Scraper completion time
  - `duration_ms` (integer) - Execution duration in milliseconds
  - `checkpoints_found` (integer) - Number of checkpoints discovered
  - `checkpoints_new` (integer) - Number of new checkpoints added
  - `checkpoints_updated` (integer) - Number of existing checkpoints updated
  - `errors` (jsonb) - Array of error objects encountered
  - `metadata` (jsonb) - Additional execution metadata
  - `created_at` (timestamptz) - Log creation timestamp

  ## Security
  - Enable RLS on both tables
  - Public read-only access to geocoding_cache
  - Admin-only write access to geocoding_cache
  - Admin-only access to scraper_logs

  ## Indexes
  - Index on geocoding_cache.address for fast lookups
  - Index on scraper_logs.scraper_name and created_at for monitoring queries
*/

-- Create geocoding_cache table
CREATE TABLE IF NOT EXISTS geocoding_cache (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  address text UNIQUE NOT NULL,
  latitude numeric(10, 7) NOT NULL,
  longitude numeric(10, 7) NOT NULL,
  formatted_address text,
  confidence text CHECK (confidence IN ('high', 'medium', 'low')),
  provider text NOT NULL DEFAULT 'mapbox',
  metadata jsonb DEFAULT '{}'::jsonb,
  hit_count integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create index on address for fast lookups
CREATE INDEX IF NOT EXISTS idx_geocoding_cache_address ON geocoding_cache (address);

-- Create index on location for spatial queries
CREATE INDEX IF NOT EXISTS idx_geocoding_cache_location ON geocoding_cache (latitude, longitude);

-- Create scraper_logs table
CREATE TABLE IF NOT EXISTS scraper_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  scraper_name text NOT NULL,
  status text NOT NULL CHECK (status IN ('success', 'partial', 'failed')),
  started_at timestamptz NOT NULL,
  completed_at timestamptz,
  duration_ms integer,
  checkpoints_found integer DEFAULT 0,
  checkpoints_new integer DEFAULT 0,
  checkpoints_updated integer DEFAULT 0,
  errors jsonb DEFAULT '[]'::jsonb,
  metadata jsonb DEFAULT '{}'::jsonb,
  created_at timestamptz DEFAULT now()
);

-- Create indexes for monitoring queries
CREATE INDEX IF NOT EXISTS idx_scraper_logs_name_created ON scraper_logs (scraper_name, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_scraper_logs_status ON scraper_logs (status);

-- Enable RLS
ALTER TABLE geocoding_cache ENABLE ROW LEVEL SECURITY;
ALTER TABLE scraper_logs ENABLE ROW LEVEL SECURITY;

-- Geocoding cache policies (public read, admin write)
CREATE POLICY "Public can view geocoding cache"
  ON geocoding_cache
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Service role can insert geocoding cache"
  ON geocoding_cache
  FOR INSERT
  TO service_role
  WITH CHECK (true);

CREATE POLICY "Service role can update geocoding cache"
  ON geocoding_cache
  FOR UPDATE
  TO service_role
  USING (true)
  WITH CHECK (true);

-- Scraper logs policies (admin only)
CREATE POLICY "Service role can view scraper logs"
  ON scraper_logs
  FOR SELECT
  TO service_role
  USING (true);

CREATE POLICY "Service role can insert scraper logs"
  ON scraper_logs
  FOR INSERT
  TO service_role
  WITH CHECK (true);

CREATE POLICY "Service role can update scraper logs"
  ON scraper_logs
  FOR UPDATE
  TO service_role
  USING (true)
  WITH CHECK (true);

-- Function to update geocoding cache hit count
CREATE OR REPLACE FUNCTION increment_geocoding_cache_hit(cache_id uuid)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  UPDATE geocoding_cache
  SET
    hit_count = hit_count + 1,
    updated_at = now()
  WHERE id = cache_id;
END;
$$;

-- Function to clean old scraper logs (keep last 90 days)
CREATE OR REPLACE FUNCTION cleanup_old_scraper_logs()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  DELETE FROM scraper_logs
  WHERE created_at < now() - interval '90 days';
END;
$$;