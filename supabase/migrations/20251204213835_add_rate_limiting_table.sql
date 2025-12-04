/*
  # Add Rate Limiting Table

  1. New Tables
    - `rate_limit_requests`
      - `id` (uuid, primary key)
      - `ip_address` (text) - Client IP address
      - `endpoint` (text) - API endpoint being accessed
      - `created_at` (timestamptz) - Request timestamp
      - Index on (ip_address, endpoint, created_at) for efficient queries

  2. Security
    - Enable RLS on `rate_limit_requests` table
    - Add policy for service_role to INSERT and DELETE
    - Deny all other operations by default

  3. Notes
    - This table tracks API requests for rate limiting
    - Old records should be cleaned up periodically (e.g., records older than 1 hour)
    - Rate limiting logic implemented in Edge Functions
*/

CREATE TABLE IF NOT EXISTS rate_limit_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  ip_address text NOT NULL,
  endpoint text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- Create index for efficient rate limit queries
CREATE INDEX IF NOT EXISTS idx_rate_limit_lookup 
  ON rate_limit_requests(ip_address, endpoint, created_at DESC);

-- Enable Row Level Security
ALTER TABLE rate_limit_requests ENABLE ROW LEVEL SECURITY;

-- Allow service_role to INSERT request logs
CREATE POLICY "Service role can insert rate limit records"
  ON rate_limit_requests
  FOR INSERT
  TO service_role
  WITH CHECK (true);

-- Allow service_role to DELETE old records (cleanup)
CREATE POLICY "Service role can delete rate limit records"
  ON rate_limit_requests
  FOR DELETE
  TO service_role
  USING (true);

-- Allow service_role to SELECT for rate limit checks
CREATE POLICY "Service role can select rate limit records"
  ON rate_limit_requests
  FOR SELECT
  TO service_role
  USING (true);