/*
  # Add Announcement Date to Checkpoints

  1. New Columns
    - `announcement_date`: The date the checkpoint was officially announced.
*/

DO $$ BEGIN
  ALTER TABLE public.dui_checkpoints 
  ADD COLUMN IF NOT EXISTS announcement_date timestamptz;
EXCEPTION
  WHEN others THEN null;
END $$;
