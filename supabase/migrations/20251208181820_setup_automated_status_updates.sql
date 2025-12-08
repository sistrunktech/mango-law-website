/*
  # Setup Automated Checkpoint Status Updates

  ## Summary
  Creates a scheduled job to automatically update checkpoint statuses
  based on current time. Checkpoints transition from 'upcoming' to 'active'
  to 'completed' automatically.

  ## Changes

  ### 1. pg_cron Scheduled Job
  - Runs every hour at minute 0 (HH:00:00)
  - Calls `update_checkpoint_status()` function
  - Automatically transitions checkpoint statuses
  - No manual intervention required

  ### 2. Job Configuration
  - Job name: 'update_checkpoint_statuses_hourly'
  - Schedule: '0 * * * *' (every hour)
  - Timezone: UTC
  - Enabled by default

  ## Status Transitions
  - `upcoming` → `active`: When current time >= start_date
  - `active` → `completed`: When current time >= end_date
  - `cancelled`: Never auto-transitions (manual only)

  ## Monitoring
  - Check pg_cron.job_run_details for execution history
  - Logs available in scraper_logs table if enhanced logging added
  - Errors logged to pg_cron.job_run_details

  ## Manual Execution
  - Can still be called manually: `SELECT update_checkpoint_status();`
  - Admin dashboard should have manual trigger button
  - Useful for immediate updates without waiting for cron

  ## Impact
  - Checkpoints automatically stay current
  - Reduces manual maintenance
  - Improves user experience with real-time status
*/

-- ============================================================================
-- CREATE SCHEDULED JOB FOR CHECKPOINT STATUS UPDATES
-- ============================================================================

-- First, check if pg_cron extension is enabled (should be from previous migration)
CREATE EXTENSION IF NOT EXISTS pg_cron;

-- Unschedule existing job if it exists (idempotent)
DO $$
BEGIN
  PERFORM cron.unschedule('update_checkpoint_statuses_hourly');
EXCEPTION
  WHEN OTHERS THEN
    -- Job doesn't exist, ignore error
    NULL;
END $$;

-- Schedule the job to run every hour
-- This updates checkpoint statuses based on current time
SELECT cron.schedule(
  'update_checkpoint_statuses_hourly',
  '0 * * * *',  -- Every hour at minute 0
  $$SELECT update_checkpoint_status();$$
);

-- ============================================================================
-- VERIFICATION QUERY
-- ============================================================================

-- View scheduled jobs
-- SELECT * FROM cron.job WHERE jobname = 'update_checkpoint_statuses_hourly';

-- View job execution history
-- SELECT * FROM cron.job_run_details 
-- WHERE jobid = (SELECT jobid FROM cron.job WHERE jobname = 'update_checkpoint_statuses_hourly')
-- ORDER BY start_time DESC LIMIT 10;

-- Manual execution for testing
-- SELECT update_checkpoint_status();

-- ============================================================================
-- NOTES
-- ============================================================================

-- Changes applied:
-- ✓ pg_cron extension enabled
-- ✓ Scheduled job created (runs hourly)
-- ✓ Automatically updates checkpoint statuses
-- ✓ Safe for repeated execution (idempotent)
