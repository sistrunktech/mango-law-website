/*
  # Fix Scraper Logs Access and Add Increment Function

  ## Summary
  Fixes critical issues preventing proper operation of admin dashboard
  and checkpoint view counting.

  ## Changes

  ### 1. Scraper Logs RLS Policy
  - Add public read access to `scraper_logs` table
  - Allows ScraperLogsViewer component to display logs
  - Write access remains restricted to service_role only

  ### 2. Generic Increment Function
  - Creates `increment_column` function for atomic counter updates
  - Supports incrementing any numeric column in dui_checkpoints table
  - Used for tracking checkpoint views and other metrics
  - Includes proper security with DEFINER and search_path protection

  ## Security
  - Public can read scraper logs (monitoring/transparency)
  - Only service_role can write scraper logs
  - Increment function validates table and column names
  - SECURITY DEFINER with search_path protection

  ## Impact
  - Fixes ScraperLogsViewer component in admin dashboard
  - Enables checkpoint views counting
  - No breaking changes
*/

-- ============================================================================
-- 1. ADD PUBLIC READ ACCESS TO SCRAPER LOGS
-- ============================================================================

-- Allow anonymous users to view scraper logs for transparency
CREATE POLICY "Public can view scraper logs"
  ON scraper_logs
  FOR SELECT
  TO anon
  USING (true);

-- Allow authenticated users to view scraper logs
CREATE POLICY "Authenticated users can view scraper logs"
  ON scraper_logs
  FOR SELECT
  TO authenticated
  USING (true);

-- ============================================================================
-- 2. CREATE GENERIC INCREMENT FUNCTION
-- ============================================================================

-- Generic function to increment numeric columns in dui_checkpoints table
-- Used for views_count and other counters
CREATE OR REPLACE FUNCTION increment_column(
  p_table_name text,
  p_row_id uuid,
  p_column_name text
)
RETURNS void
SECURITY DEFINER
SET search_path = ''
LANGUAGE plpgsql
AS $$
BEGIN
  -- Validate table name (only allow dui_checkpoints)
  IF p_table_name != 'dui_checkpoints' THEN
    RAISE EXCEPTION 'Invalid table name: %', p_table_name;
  END IF;

  -- Validate column name (only allow specific columns)
  IF p_column_name NOT IN ('views_count') THEN
    RAISE EXCEPTION 'Invalid column name: %', p_column_name;
  END IF;

  -- Perform the increment
  EXECUTE format(
    'UPDATE public.%I SET %I = COALESCE(%I, 0) + 1, updated_at = now() WHERE id = $1',
    p_table_name,
    p_column_name,
    p_column_name
  ) USING p_row_id;
END;
$$;

-- Create simpler increment function for compatibility with existing code
-- Maps to the generic function with table='dui_checkpoints'
CREATE OR REPLACE FUNCTION increment(
  row_id uuid,
  table_name text,
  column_name text
)
RETURNS void
SECURITY DEFINER
SET search_path = ''
LANGUAGE plpgsql
AS $$
BEGIN
  -- Call the generic increment function
  PERFORM increment_column(table_name, row_id, column_name);
END;
$$;

-- ============================================================================
-- VERIFICATION
-- ============================================================================

-- Changes applied:
-- ✓ Public read access to scraper_logs
-- ✓ Generic increment_column function created
-- ✓ Backward-compatible increment function created
-- ✓ Proper security with DEFINER and search_path
-- ✓ Input validation for table and column names
