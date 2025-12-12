/*
  # Fix announcements upsert target

  PostgREST upsert requires a non-partial unique constraint for on_conflict.
*/

DO $$
BEGIN
  IF EXISTS (
    SELECT 1
    FROM pg_indexes
    WHERE schemaname = 'public'
      AND tablename = 'dui_checkpoint_announcements'
      AND indexname = 'idx_dui_checkpoint_announcements_source_url_unique'
  ) THEN
    EXECUTE 'DROP INDEX IF EXISTS public.idx_dui_checkpoint_announcements_source_url_unique';
  END IF;
END $$;

ALTER TABLE public.dui_checkpoint_announcements
  ADD CONSTRAINT dui_checkpoint_announcements_source_url_key UNIQUE (source_url);

