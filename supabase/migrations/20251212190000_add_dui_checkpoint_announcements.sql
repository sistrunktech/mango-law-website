/*
  # Add DUI checkpoint announcements (pending details)

  Supports publicly announced checkpoint "heads up" posts where date is known
  but location/time are still pending, plus a lifecycle to link/promote to a
  fully specified `dui_checkpoints` row later.
*/

DO $$ BEGIN
  CREATE TYPE checkpoint_announcement_status AS ENUM ('pending_details', 'confirmed', 'cancelled');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

CREATE TABLE IF NOT EXISTS dui_checkpoint_announcements (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  source_url text,
  source_name text,
  announcement_date timestamptz,
  event_date date,
  start_date timestamptz,
  end_date timestamptz,
  location_text text,
  location_city text,
  location_county text,
  status text NOT NULL DEFAULT 'pending_details',
  linked_checkpoint_id uuid REFERENCES dui_checkpoints(id) ON DELETE SET NULL,
  last_checked_at timestamptz,
  raw_text text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  CONSTRAINT valid_status CHECK (status IN ('pending_details', 'confirmed', 'cancelled')),
  CONSTRAINT valid_dates CHECK (end_date IS NULL OR start_date IS NULL OR end_date > start_date)
);

-- Uniqueness for dedupe where URL is known
CREATE UNIQUE INDEX IF NOT EXISTS idx_dui_checkpoint_announcements_source_url_unique
  ON dui_checkpoint_announcements(source_url)
  WHERE source_url IS NOT NULL;

CREATE INDEX IF NOT EXISTS idx_dui_checkpoint_announcements_status
  ON dui_checkpoint_announcements(status);

CREATE INDEX IF NOT EXISTS idx_dui_checkpoint_announcements_event_date
  ON dui_checkpoint_announcements(event_date);

CREATE INDEX IF NOT EXISTS idx_dui_checkpoint_announcements_last_checked_at
  ON dui_checkpoint_announcements(last_checked_at);

-- updated_at trigger
CREATE OR REPLACE FUNCTION update_checkpoint_announcement_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS update_checkpoint_announcement_timestamp_trigger ON dui_checkpoint_announcements;
CREATE TRIGGER update_checkpoint_announcement_timestamp_trigger
  BEFORE UPDATE ON dui_checkpoint_announcements
  FOR EACH ROW
  EXECUTE FUNCTION update_checkpoint_announcement_timestamp();

ALTER TABLE dui_checkpoint_announcements ENABLE ROW LEVEL SECURITY;

-- Public read: pending + confirmed
CREATE POLICY "Public can view pending and confirmed announcements"
  ON dui_checkpoint_announcements
  FOR SELECT
  TO anon, authenticated
  USING (status IN ('pending_details', 'confirmed'));

-- Authenticated users (admin UI) can manage
CREATE POLICY "Authenticated users can insert announcements"
  ON dui_checkpoint_announcements
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update announcements"
  ON dui_checkpoint_announcements
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete announcements"
  ON dui_checkpoint_announcements
  FOR DELETE
  TO authenticated
  USING (true);

