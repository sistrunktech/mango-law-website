import assert from 'node:assert/strict';
import { getDisplayStatus, type DUICheckpoint } from '../src/data/checkpoints.ts';
import {
  isUsableOVICheckpointLocationRow,
  scrapeOVICheckpoint,
  parseDateTime as parseOVICheckpointDateTime,
} from '../supabase/functions/checkpoint-scraper/ovicheckpoint-scraper.ts';
import { parseAddress } from '../supabase/functions/checkpoint-scraper/geocoding.ts';

async function run() {
  const originalFetch = globalThis.fetch;
  const requested: string[] = [];
  globalThis.fetch = async (input, init) => {
    assert.ok(init?.signal, 'aggregator fetches must have a deadline');
    requested.push(String(input));
    if (String(input).includes('/wp-json/')) return new Response(null, { status: 404 });
    return new Response(`<table id="tablepress-1"><tbody><tr>
      <td>Franklin</td><td>Columbus</td><td>100 Main Street</td>
      <td>Friday, October 30, 2026 | 8 PM to 11 PM</td>
    </tr></tbody></table>`);
  };
  try {
    const recovered = await scrapeOVICheckpoint();
    assert.equal(recovered.length, 1, 'a missing API page must fall back to the homepage');
    assert.equal(recovered[0].locationCity, 'Columbus');
    assert.deepEqual(requested, [
      'https://www.ovicheckpoint.com/wp-json/wp/v2/pages/1078',
      'https://www.ovicheckpoint.com/',
    ]);
    globalThis.fetch = async (input) => String(input).includes('/wp-json/')
      ? new Response(null, { status: 404 })
      : new Response('<html>Homepage template changed</html>');
    await assert.rejects(scrapeOVICheckpoint(), /missing checkpoint table/);
  } finally {
    globalThis.fetch = originalFetch;
  }

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

  const lowerCaseFromWithComma = parseOVICheckpointDateTime('Friday, October 18, 2024 , from 8 PM to 2 AM');
  assert.ok(lowerCaseFromWithComma);
  assert.ok(new Date(lowerCaseFromWithComma.end).getTime() > new Date(lowerCaseFromWithComma.start).getTime());

  const aprilOhioLocalTime = parseOVICheckpointDateTime('Friday, April 24, 2026 | 6:30 PM to 9 PM');
  assert.ok(aprilOhioLocalTime);
  assert.equal(aprilOhioLocalTime.start, '2026-04-24T22:30:00.000Z');
  assert.equal(aprilOhioLocalTime.end, '2026-04-25T01:00:00.000Z');

  const decemberOhioLocalTime = parseOVICheckpointDateTime('Friday, December 5, 2025 | 10 PM to 2 AM');
  assert.ok(decemberOhioLocalTime);
  assert.equal(decemberOhioLocalTime.start, '2025-12-06T03:00:00.000Z');
  assert.equal(decemberOhioLocalTime.end, '2025-12-06T07:00:00.000Z');

  const superBowlLabel = parseOVICheckpointDateTime('Sunday February 11, 2024 Super Bowl 2024');
  assert.ok(superBowlLabel);
  const superBowlDurationMs = new Date(superBowlLabel.end).getTime() - new Date(superBowlLabel.start).getTime();
  assert.equal(superBowlDurationMs, 3 * 60 * 60 * 1000);

  assert.deepEqual(
    parseAddress('Dixie Highway, OH 45011, Fairfield, Butler County'),
    {
      address: 'Dixie Highway',
      city: 'Fairfield',
      county: 'Butler',
    }
  );

  assert.deepEqual(
    parseAddress('Pearl Road, Brunswick, Medina County'),
    {
      address: 'Pearl Road',
      city: 'Brunswick',
      county: 'Medina',
    }
  );

  assert.deepEqual(
    parseAddress(
      'In Canton, drivers can expect an OVI checkpoint at 1801 Mahoning Road NE, with enforcement extending to nearby intersections and connecting routes., Canton, Stark County'
    ),
    {
      address: '1801 Mahoning Road NE',
      city: 'Canton',
      county: 'Stark',
    }
  );

  assert.deepEqual(
    parseAddress(
      'Another OVI checkpoint will be set up near the 4800 block of Salem Avenue, impacting traffic in adjacent residential and commercial zones., Trotwood, Montgomery County'
    ),
    {
      address: '4800 block of Salem Avenue',
      city: 'Trotwood',
      county: 'Montgomery',
    }
  );

  assert.equal(
    isUsableOVICheckpointLocationRow({
      county: 'Allen',
      city: 'Bellefontaine',
      locationText: 'DUI checkpoint operation expected on Main Street north of Avon Lake in Bellefontaine',
    }),
    false
  );

  assert.equal(
    isUsableOVICheckpointLocationRow({
      county: 'Hancock',
      city: 'Findlay',
      locationText: 'Tiffin Avenue',
    }),
    true
  );
}

await run();
