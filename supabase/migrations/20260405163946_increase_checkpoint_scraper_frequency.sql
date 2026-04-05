/*
  # Increase checkpoint scraper freshness

  ## Summary
  Moves the automated checkpoint scraper from a once-daily schedule to an
  every-four-hours cadence so fresh announcement feeds are revisited
  throughout the day.
*/

SELECT cron.unschedule('run_checkpoint_scraper');

SELECT cron.schedule(
  'run_checkpoint_scraper',
  '17 */4 * * *',
  $$SELECT invoke_checkpoint_scraper();$$
);
