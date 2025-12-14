import assert from 'node:assert/strict';
import { getDisplayStatus, type DUICheckpoint } from '../src/data/checkpoints.ts';
import { parseDateTime as parseOVICheckpointDateTime } from '../supabase/functions/checkpoint-scraper/ovicheckpoint-scraper.ts';

function run() {
  const checkpoint = {
    start_date: '2025-12-10T00:00:00.000Z',
    end_date: '2025-12-10T01:00:00.000Z',
    status: 'cancelled',
  } satisfies Pick<DUICheckpoint, 'start_date' | 'end_date' | 'status'>;

  assert.equal(getDisplayStatus(checkpoint, new Date('2025-12-11T00:00:00.000Z')), 'cancelled');

  const timedCheckpoint = {
    start_date: '2025-12-10T10:00:00.000Z',
    end_date: '2025-12-10T12:00:00.000Z',
    status: 'active', // DB may be stale; display uses dates
  } satisfies Pick<DUICheckpoint, 'start_date' | 'end_date' | 'status'>;

  assert.equal(getDisplayStatus(timedCheckpoint, new Date('2025-12-10T09:59:00.000Z')), 'upcoming');
  assert.equal(getDisplayStatus(timedCheckpoint, new Date('2025-12-10T10:00:00.000Z')), 'active');
  assert.equal(getDisplayStatus(timedCheckpoint, new Date('2025-12-10T11:00:00.000Z')), 'active');
  assert.equal(getDisplayStatus(timedCheckpoint, new Date('2025-12-10T12:01:00.000Z')), 'completed');

  const invalidDates = {
    start_date: 'not-a-date',
    end_date: 'not-a-date',
    status: 'active',
  } satisfies Pick<DUICheckpoint, 'start_date' | 'end_date' | 'status'>;

  assert.equal(getDisplayStatus(invalidDates, new Date()), 'active');

  const midnightFrom = parseOVICheckpointDateTime('Friday, June 6, 2025 From 6 PM to Midnight');
  assert.ok(midnightFrom);
  assert.ok(new Date(midnightFrom.end).getTime() > new Date(midnightFrom.start).getTime());

  const midnightEvening = parseOVICheckpointDateTime('Saturday, March 15, 2025 Evening to Midnight');
  assert.ok(midnightEvening);
  assert.ok(new Date(midnightEvening.end).getTime() > new Date(midnightEvening.start).getTime());

  const commaBeforeFrom = parseOVICheckpointDateTime('June 13, 2025, From 11:00 PM to 3:00 AM');
  assert.ok(commaBeforeFrom);
  assert.ok(new Date(commaBeforeFrom.end).getTime() > new Date(commaBeforeFrom.start).getTime());
}

run();
