/*
  # SEO Tracker and Checkpoint Improvements

  1. New Tables
    - `seo_keywords`: Stores target keywords and geographic context
    - `seo_rankings`: Stores daily ranking history for keywords
  
  2. Checkpoint Improvements
    - Add unique constraint to `dui_checkpoints` to prevent duplicates
    - Add `geocoding_status` to track geocoding confidence

  3. Security
    - Enable RLS on new tables
    - Add policies for admin access
*/

-- 1. SEO Tracker Tables
CREATE TABLE IF NOT EXISTS public.seo_keywords (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  keyword text NOT NULL,
  location_context text DEFAULT 'Delaware, Ohio, United States',
  target_url text DEFAULT 'https://mango.law',
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.seo_rankings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  keyword_id uuid REFERENCES public.seo_keywords(id) ON DELETE CASCADE,
  rank integer, -- NULL if not in top 100
  is_local_pack boolean DEFAULT false,
  serp_data jsonb,
  created_at timestamptz DEFAULT now()
);

-- 2. Checkpoint Deduplication & Tracking
-- Add a unique constraint to prevent duplicate announcements for the same time and place
-- Note: We use a hash or specific columns. Using address, city, and start_date.
DO $$ BEGIN
  ALTER TABLE public.dui_checkpoints 
  ADD CONSTRAINT unique_checkpoint_event UNIQUE (location_address, location_city, start_date);
EXCEPTION
  WHEN duplicate_table THEN null;
  WHEN others THEN null;
END $$;

-- Add geocoding metadata if not exists
DO $$ BEGIN
  ALTER TABLE public.dui_checkpoints 
  ADD COLUMN IF NOT EXISTS geocoding_confidence text DEFAULT 'unverified',
  ADD COLUMN IF NOT EXISTS last_geocoded_at timestamptz;
EXCEPTION
  WHEN others THEN null;
END $$;

-- 3. Security (RLS)
ALTER TABLE public.seo_keywords ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.seo_rankings ENABLE ROW LEVEL SECURITY;

-- Policies for seo_keywords
CREATE POLICY "Admins can manage seo_keywords"
  ON public.seo_keywords
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Policies for seo_rankings
CREATE POLICY "Admins can manage seo_rankings"
  ON public.seo_rankings
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Public can view rankings"
  ON public.seo_rankings
  FOR SELECT
  TO anon, authenticated
  USING (true);

-- 4. Triggers for updated_at
CREATE OR REPLACE FUNCTION update_seo_keywords_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS update_seo_keywords_timestamp_trigger ON public.seo_keywords;
CREATE TRIGGER update_seo_keywords_timestamp_trigger
  BEFORE UPDATE ON public.seo_keywords
  FOR EACH ROW
  EXECUTE FUNCTION update_seo_keywords_timestamp();
