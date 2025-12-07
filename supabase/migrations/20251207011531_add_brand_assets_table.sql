/*
  # Brand Assets Management System

  ## Purpose
  Creates infrastructure for managing brand assets (logos, images) stored in Supabase Storage.
  This enables dynamic loading of brand assets with metadata tracking and version control.

  ## New Tables
  
  ### `brand_assets`
  Stores metadata about brand assets with the following columns:
  - `id` (uuid, primary key) - Unique identifier for each asset
  - `file_path` (text, required) - Path to asset in Supabase Storage
  - `variant_type` (text, required) - Asset type (e.g., 'logo-horizontal', 'logo-vertical', 'icon', 'favicon')
  - `color_variant` (text) - Color version (e.g., 'full-color', 'white', 'black', 'gradient')
  - `file_format` (text) - File format (e.g., 'svg', 'png', 'jpg')
  - `dimensions` (text) - Asset dimensions (e.g., '400x100', '512x512')
  - `usage_notes` (text) - Guidelines for proper usage
  - `is_active` (boolean, default true) - Whether asset is currently in use
  - `created_at` (timestamptz) - Timestamp of creation
  - `updated_at` (timestamptz) - Timestamp of last update

  ## Security
  
  ### Row Level Security (RLS)
  - RLS is ENABLED on the brand_assets table (table is locked down by default)
  - Public users can SELECT (read) active brand assets for website display
  - Only authenticated users can INSERT, UPDATE, or DELETE assets (admin operations)
  
  ### RLS Policies
  1. "Public can view active brand assets" - SELECT policy for anonymous users
  2. "Authenticated users can insert brand assets" - INSERT policy for admin operations
  3. "Authenticated users can update brand assets" - UPDATE policy for admin operations
  4. "Authenticated users can delete brand assets" - DELETE policy for admin operations

  ## Indexes
  - Index on `variant_type` for fast filtering by asset type
  - Index on `is_active` for filtering active vs. archived assets
  - Combined index on `variant_type, color_variant` for specific asset lookups

  ## Notes
  - All brand assets should be uploaded to Supabase Storage first
  - The `file_path` should reference the storage bucket path
  - Use `is_active = false` to archive old assets instead of deleting them
  - The `updated_at` timestamp is automatically maintained via trigger
*/

-- Create the brand_assets table
CREATE TABLE IF NOT EXISTS brand_assets (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  file_path text NOT NULL,
  variant_type text NOT NULL,
  color_variant text,
  file_format text,
  dimensions text,
  usage_notes text,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE brand_assets ENABLE ROW LEVEL SECURITY;

-- Create RLS policies

-- Public users can view active brand assets (for website display)
CREATE POLICY "Public can view active brand assets"
  ON brand_assets
  FOR SELECT
  TO anon
  USING (is_active = true);

-- Authenticated users can also view all brand assets (including archived)
CREATE POLICY "Authenticated users can view all brand assets"
  ON brand_assets
  FOR SELECT
  TO authenticated
  USING (true);

-- Authenticated users can insert new brand assets
CREATE POLICY "Authenticated users can insert brand assets"
  ON brand_assets
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Authenticated users can update brand assets
CREATE POLICY "Authenticated users can update brand assets"
  ON brand_assets
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Authenticated users can delete brand assets
CREATE POLICY "Authenticated users can delete brand assets"
  ON brand_assets
  FOR DELETE
  TO authenticated
  USING (true);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_brand_assets_variant_type 
  ON brand_assets(variant_type);

CREATE INDEX IF NOT EXISTS idx_brand_assets_is_active 
  ON brand_assets(is_active);

CREATE INDEX IF NOT EXISTS idx_brand_assets_variant_color 
  ON brand_assets(variant_type, color_variant);

-- Create function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_brand_assets_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to call the function before updates
DROP TRIGGER IF EXISTS update_brand_assets_updated_at_trigger ON brand_assets;
CREATE TRIGGER update_brand_assets_updated_at_trigger
  BEFORE UPDATE ON brand_assets
  FOR EACH ROW
  EXECUTE FUNCTION update_brand_assets_updated_at();
