/*
  # Fix Database Security Issues

  This migration addresses security concerns identified in the database audit:

  1. **Remove Unused Indexes**
     - Drop `idx_reviews_invitation_id` on reviews table (not being used)
     - Drop `idx_checkpoints_status` on dui_checkpoints table (not being used)
     - Drop `idx_checkpoints_county` on dui_checkpoints table (not being used)
     - Drop `idx_checkpoints_start_date` on dui_checkpoints table (not being used)
     - Drop `idx_checkpoints_status_date` on dui_checkpoints table (not being used)

  2. **Fix Multiple Permissive RLS Policies**
     - Remove authenticated role from "Public can view active and upcoming checkpoints" policy
     - This eliminates the conflict with "Authenticated users can view all checkpoints"
     - Anon users can see active/upcoming checkpoints
     - Authenticated users can see all checkpoints (separate policy)

  3. **Fix Function Security (Search Path)**
     - Add `SECURITY DEFINER` and `SET search_path = ''` to update_checkpoint_timestamp()
     - Add `SECURITY DEFINER` and `SET search_path = ''` to update_checkpoint_status()
     - This prevents search_path manipulation attacks

  ## Important Notes
  - These changes improve security without affecting functionality
  - Unused indexes are removed to reduce maintenance overhead
  - RLS policies remain restrictive and properly segmented by role
  - Functions are now protected against search_path manipulation
*/

-- ============================================================================
-- 1. DROP UNUSED INDEXES
-- ============================================================================

-- Drop unused index on reviews table
DROP INDEX IF EXISTS idx_reviews_invitation_id;

-- Drop unused indexes on dui_checkpoints table
DROP INDEX IF EXISTS idx_checkpoints_status;
DROP INDEX IF EXISTS idx_checkpoints_county;
DROP INDEX IF EXISTS idx_checkpoints_start_date;
DROP INDEX IF EXISTS idx_checkpoints_status_date;

-- ============================================================================
-- 2. FIX MULTIPLE PERMISSIVE RLS POLICIES
-- ============================================================================

-- Drop the conflicting policy that allows both anon and authenticated
DROP POLICY IF EXISTS "Public can view active and upcoming checkpoints" ON dui_checkpoints;

-- Recreate it for anon users only (authenticated users have their own policy)
CREATE POLICY "Public can view active and upcoming checkpoints"
  ON dui_checkpoints
  FOR SELECT
  TO anon
  USING (status IN ('upcoming', 'active'));

-- The existing "Authenticated users can view all checkpoints" policy remains
-- This creates proper separation: anon sees active/upcoming, authenticated sees all

-- ============================================================================
-- 3. FIX FUNCTION SECURITY (SEARCH PATH)
-- ============================================================================

-- Recreate update_checkpoint_timestamp with proper security settings
CREATE OR REPLACE FUNCTION update_checkpoint_timestamp()
RETURNS TRIGGER
SECURITY DEFINER
SET search_path = ''
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

-- Recreate update_checkpoint_status with proper security settings
CREATE OR REPLACE FUNCTION update_checkpoint_status()
RETURNS void
SECURITY DEFINER
SET search_path = ''
LANGUAGE plpgsql
AS $$
BEGIN
  -- Set to active if current time is between start and end date
  UPDATE public.dui_checkpoints
  SET status = 'active'
  WHERE status = 'upcoming'
    AND start_date <= now()
    AND end_date > now();

  -- Set to completed if end date has passed
  UPDATE public.dui_checkpoints
  SET status = 'completed'
  WHERE status IN ('upcoming', 'active')
    AND end_date <= now();
END;
$$;

-- ============================================================================
-- VERIFICATION
-- ============================================================================

-- All security issues should now be resolved:
-- ✓ Unused indexes removed
-- ✓ No conflicting RLS policies for authenticated role
-- ✓ Functions protected with SECURITY DEFINER and SET search_path
