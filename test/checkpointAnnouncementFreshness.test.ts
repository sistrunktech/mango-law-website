import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { formatEasternDateTime } from '../src/lib/formatting.ts';
import {
  isAnnouncementFreshForPublic,
  type CheckpointAnnouncement,
} from '../src/lib/checkpointAnnouncementsService.ts';

function announcement(overrides: Partial<CheckpointAnnouncement>): CheckpointAnnouncement {
  return {
    id: 'test',
    title: 'Test announcement',
    source_url: 'https://example.com',
    source_name: 'Test source',
    announcement_date: '2026-05-01T12:00:00.000Z',
    event_date: null,
    start_date: null,
    end_date: null,
    location_text: null,
    location_city: null,
    location_county: null,
    status: 'pending_details',
    linked_checkpoint_id: null,
    last_checked_at: null,
    raw_text: null,
    created_at: '2026-05-01T12:00:00.000Z',
    updated_at: '2026-05-01T12:00:00.000Z',
    ...overrides,
  };
}

const now = new Date('2026-05-03T18:00:00.000Z');

assert.equal(
  isAnnouncementFreshForPublic(
    announcement({
      title: 'Solon Police announced Cinco de Mayo sobriety checkpoints in the Aurora Road area',
      event_date: '2026-05-05',
      location_text: 'Aurora Road area',
      location_city: 'Solon',
      location_county: 'Cuyahoga',
    }),
    now,
  ),
  true,
);

assert.equal(
  isAnnouncementFreshForPublic(
    announcement({
      title: 'Summit County OVI Task Force announced May sobriety checkpoints',
      event_date: '2026-05-05',
      location_text: 'Summit County; exact checkpoint city, location, and time details not published in source',
      location_county: 'Summit',
    }),
    now,
  ),
  true,
);

assert.equal(
  isAnnouncementFreshForPublic(
    announcement({
      title: "Video of Correspondents' Dinner incident shows K9 may have noticed the suspect before he rushed security",
      raw_text: 'Security checkpoint coverage unrelated to Ohio OVI enforcement.',
      announcement_date: '2026-05-01T22:08:17.000Z',
    }),
    now,
  ),
  false,
);

assert.equal(
  isAnnouncementFreshForPublic(
    announcement({
      title: 'Local sobriety checkpoint tonight',
      raw_text: 'Public notice reported a sobriety checkpoint tonight.',
      announcement_date: '2026-04-28T23:26:16.000Z',
      created_at: '2026-04-28T23:26:16.000Z',
    }),
    now,
  ),
  false,
);

assert.equal(
  isAnnouncementFreshForPublic(
    announcement({
      title: 'PSP to conduct sobriety checkpoint in Erie County',
      raw_text: 'Pennsylvania State Police announced a sobriety checkpoint.',
      announcement_date: '2026-05-03T12:00:00.000Z',
      created_at: '2026-05-03T12:00:00.000Z',
    }),
    now,
  ),
  false,
);

assert.equal(
  isAnnouncementFreshForPublic(
    announcement({
      title: 'Police announce more sobriety checkpoints in Northeast Ohio',
      source_name: 'FOX8 Cleveland',
      announcement_date: '2026-05-03T12:00:00.000Z',
      created_at: '2026-05-03T12:00:00.000Z',
    }),
    now,
  ),
  false,
);

assert.equal(
  isAnnouncementFreshForPublic(
    announcement({
      title: 'Ohio OVI checkpoint confirmed for Friday night',
      status: 'confirmed',
      announcement_date: '2026-05-03T12:00:00.000Z',
    }),
    now,
  ),
  true,
);

assert.equal(
  isAnnouncementFreshForPublic(
    announcement({
      title: 'Ohio OVI checkpoint confirmed for Friday night',
      status: 'cancelled',
      location_city: 'Columbus',
    }),
    now,
  ),
  false,
);

assert.equal(
  isAnnouncementFreshForPublic(
    announcement({
      title: 'Ohio OVI checkpoint notice',
      source_name: 'OVICheckpoint.com',
      source_url: 'https://example.com/redirected-source',
      location_city: 'Columbus',
    }),
    now,
  ),
  false,
);

// A UTC-rendered server and browsers outside Ohio must hydrate the same label.
const checkpointPageSource = readFileSync(
  new URL('../src/views/DUICheckpointsPage.tsx', import.meta.url),
  'utf8',
);
const sourceCheckFormatter = checkpointPageSource.match(
  /function formatSourceCheckLabel[\s\S]*?\n}/,
)?.[0];
assert.ok(sourceCheckFormatter);
assert.match(sourceCheckFormatter, /formatEasternDateTime\(parsed,/);
assert.doesNotMatch(sourceCheckFormatter, /toLocaleString|timeZone:/);
assert.match(sourceCheckFormatter, /if \(!value\) return 'not available'/);
assert.match(sourceCheckFormatter, /Number\.isNaN\(parsed\.getTime\(\)\)/);

const sourceCheckOptions: Intl.DateTimeFormatOptions = {
  month: 'short', day: 'numeric', year: 'numeric',
  hour: 'numeric', minute: '2-digit', timeZoneName: 'short',
};
const originalTimeZone = process.env.TZ;
try {
  for (const timeZone of ['UTC', 'America/New_York', 'America/Los_Angeles', 'Asia/Kathmandu']) {
    process.env.TZ = timeZone;
    for (const [timestamp, expected] of [
      ['2026-09-13T08:17:00Z', 'Sep 13, 2026, 4:17 AM EDT'],
      ['2026-11-08T13:17:00Z', 'Nov 8, 2026, 8:17 AM EST'],
      ['2026-11-01T05:17:00Z', 'Nov 1, 2026, 1:17 AM EDT'],
      ['2026-11-01T06:17:00Z', 'Nov 1, 2026, 1:17 AM EST'],
    ]) {
      assert.equal(formatEasternDateTime(timestamp, sourceCheckOptions), expected, timeZone);
    }
  }
} finally {
  if (originalTimeZone === undefined) delete process.env.TZ;
  else process.env.TZ = originalTimeZone;
}
