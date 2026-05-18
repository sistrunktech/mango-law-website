import assert from 'node:assert/strict';
import { buildPendingAnnouncementMapCheckpoints } from '../src/lib/checkpointAnnouncementMapMarkers.ts';
import type { CheckpointAnnouncement } from '../src/lib/checkpointAnnouncementsService.ts';

function announcement(overrides: Partial<CheckpointAnnouncement>): CheckpointAnnouncement {
  return {
    id: 'test',
    title: 'Test sobriety checkpoint announcement',
    source_url: 'https://example.com/checkpoint',
    source_name: 'Test source',
    announcement_date: '2026-05-02T12:00:00.000Z',
    event_date: '2026-05-05',
    start_date: null,
    end_date: null,
    location_text: null,
    location_city: null,
    location_county: null,
    status: 'pending_details',
    linked_checkpoint_id: null,
    last_checked_at: null,
    raw_text: null,
    created_at: '2026-05-02T12:00:00.000Z',
    updated_at: '2026-05-02T12:00:00.000Z',
    ...overrides,
  };
}

const now = new Date('2026-05-04T18:00:00.000Z');

const markers = buildPendingAnnouncementMapCheckpoints(
  [
    announcement({
      id: 'solon',
      title: 'Solon Police announced Cinco de Mayo sobriety checkpoints in the Aurora Road area',
      location_text: 'Aurora Road area; exact checkpoint time and location details not published in source',
      location_city: 'Solon',
      location_county: 'Cuyahoga',
    }),
    announcement({
      id: 'summit',
      title: 'Summit County OVI Task Force announced May sobriety checkpoints',
      location_text: 'Summit County; exact checkpoint city, location, and time details not published in source',
      location_county: 'Summit',
    }),
    announcement({
      id: 'stark',
      title: 'Stark County OVI Task Force announced Memorial Day weekend sobriety checkpoints',
      event_date: '2026-05-23',
      location_text: 'Stark County; exact checkpoint time and location details pending',
      location_county: 'Stark',
    }),
    announcement({
      id: 'noise',
      title: "Video of Correspondents' Dinner incident shows a security checkpoint",
      event_date: null,
      raw_text: 'Security checkpoint coverage unrelated to Ohio OVI enforcement.',
    }),
  ],
  now,
);

assert.equal(markers.length, 3);

const solon = markers.find((marker) => marker.id === 'announcement-solon');
assert.ok(solon);
assert.equal(solon.is_pending_announcement, true);
assert.equal(solon.location_city, 'Solon');
assert.equal(solon.location_county, 'Cuyahoga');
assert.equal(solon.geocoding_confidence, 'city_centroid');
assert.equal(solon.latitude, 41.385105);
assert.equal(solon.longitude, -81.442627);
assert.equal(solon.pending_announcement_event_date, '2026-05-05');

const summit = markers.find((marker) => marker.id === 'announcement-summit');
assert.ok(summit);
assert.equal(summit.location_city, '');
assert.equal(summit.location_county, 'Summit');
assert.equal(summit.geocoding_confidence, 'county_centroid');
assert.equal(summit.latitude, 41.08088);
assert.equal(summit.longitude, -81.51757);

const stark = markers.find((marker) => marker.id === 'announcement-stark');
assert.ok(stark);
assert.equal(stark.location_city, '');
assert.equal(stark.location_county, 'Stark');
assert.equal(stark.geocoding_confidence, 'county_centroid');
assert.equal(stark.latitude, 40.813292);
assert.equal(stark.longitude, -81.365667);
assert.equal(stark.pending_announcement_event_date, '2026-05-23');
