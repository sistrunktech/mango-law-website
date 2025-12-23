/*
  # Cancel stale DUI checkpoint announcements (pending_details)

  Pending announcements are for “date announced, details pending” items.
  Old items (e.g., 2019 articles ingested via RSS) should not remain visible indefinitely.

  Policy: mark as cancelled when no longer fresh:
  - Keep pending_details if:
    - event_date >= today - 1 day, OR
    - start_date >= now - 24h, OR
    - announcement_date >= now - 14 days, OR
    - announcement_date is null AND created_at >= now - 14 days (manual/admin entries)
  - Otherwise set status = cancelled
*/

CREATE OR REPLACE FUNCTION cancel_stale_checkpoint_announcements()
RETURNS integer
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  updated_count integer;
BEGIN
  UPDATE dui_checkpoint_announcements
  SET status = 'cancelled',
      updated_at = now()
  WHERE status = 'pending_details'
    AND (event_date IS NULL OR event_date < (current_date - 1))
    AND (start_date IS NULL OR start_date < (now() - interval '24 hours'))
    AND (announcement_date IS NULL OR announcement_date < (now() - interval '14 days'))
    AND (announcement_date IS NOT NULL OR created_at < (now() - interval '14 days'));

  GET DIAGNOSTICS updated_count = ROW_COUNT;
  RETURN updated_count;
END;
$$;

-- Run daily at 08:15 UTC (safe off-hours). Unschedule first for idempotency.
DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM pg_extension WHERE extname = 'pg_cron') THEN
    PERFORM cron.unschedule(jobid)
    FROM cron.job
    WHERE jobname = 'cancel_stale_checkpoint_announcements';

    PERFORM cron.schedule(
      'cancel_stale_checkpoint_announcements',
      '15 8 * * *',
      $$SELECT cancel_stale_checkpoint_announcements();$$
    );
  END IF;
END $$;

GRANT EXECUTE ON FUNCTION cancel_stale_checkpoint_announcements() TO service_role;
