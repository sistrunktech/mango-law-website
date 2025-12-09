/*
  # Make All DUI Checkpoints Publicly Viewable

  1. Changes
    - Drop the restrictive RLS policy that only allows anon users to see 'upcoming' and 'active' checkpoints
    - Create a new policy that allows ALL users (anon and authenticated) to view ALL checkpoints regardless of status
    - This makes past, current, and upcoming checkpoints fully public
  
  2. Security
    - Read access is now completely public (no authentication required)
    - Write access remains restricted to authenticated admin users only
    - This aligns with the product requirement that checkpoint information should be freely accessible to the public
*/

-- Drop the restrictive policy
DROP POLICY IF EXISTS "Public can view active and upcoming checkpoints" ON dui_checkpoints;

-- Create a new unrestricted read policy for all users
CREATE POLICY "Anyone can view all checkpoints"
  ON dui_checkpoints
  FOR SELECT
  TO anon, authenticated
  USING (true);
