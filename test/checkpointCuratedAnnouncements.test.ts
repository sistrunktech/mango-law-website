import assert from 'node:assert/strict';
import { loadCuratedAnnouncementSeeds } from '../supabase/functions/checkpoint-scraper/curated-announcements.ts';

const seeds = loadCuratedAnnouncementSeeds();

const ids = seeds.map((seed) => seed.id);
assert.equal(new Set(ids).size, ids.length);

const sourceUrls = seeds.map((seed) => seed.sourceUrl);
assert.equal(new Set(sourceUrls).size, sourceUrls.length);

const solonCinco = seeds.find((seed) => seed.id === '2026-05-05-solon-cinco-de-mayo-aurora-road-pending');
assert.ok(solonCinco);
assert.equal(solonCinco.status, 'pending_details');
assert.equal(solonCinco.eventDate, '2026-05-05');
assert.equal(solonCinco.locationCity, 'Solon');
assert.equal(solonCinco.locationCounty, 'Cuyahoga');
assert.equal(solonCinco.startDate, null);
assert.equal(solonCinco.promoteToCheckpoint, false);

const summitMay = seeds.find((seed) => seed.id === '2026-05-05-summit-county-may-checkpoints-pending');
assert.ok(summitMay);
assert.equal(summitMay.status, 'pending_details');
assert.equal(summitMay.eventDate, '2026-05-05');
assert.equal(summitMay.locationCity, null);
assert.equal(summitMay.locationCounty, 'Summit');
assert.equal(summitMay.startDate, null);
assert.equal(summitMay.promoteToCheckpoint, false);

const may14Statewide = seeds.filter((seed) => seed.id.startsWith('2026-05-14-'));
assert.equal(may14Statewide.length, 14);
assert.ok(may14Statewide.every((seed) => seed.status === 'confirmed'));
assert.ok(may14Statewide.every((seed) => seed.promoteToCheckpoint));

const may15Statewide = seeds.filter((seed) => seed.id.startsWith('2026-05-15-'));
assert.equal(may15Statewide.length, 21);
assert.ok(may15Statewide.every((seed) => seed.status === 'confirmed'));
assert.ok(may15Statewide.every((seed) => seed.promoteToCheckpoint));

const may16Statewide = seeds.filter((seed) => seed.id.startsWith('2026-05-16-'));
assert.equal(may16Statewide.length, 17);
assert.ok(may16Statewide.every((seed) => seed.status === 'confirmed'));
assert.ok(may16Statewide.every((seed) => seed.promoteToCheckpoint));

const starkMemorialLeadIn = seeds.filter((seed) => seed.id.startsWith('2026-05-23-stark-'));
assert.equal(starkMemorialLeadIn.length, 2);
assert.ok(starkMemorialLeadIn.every((seed) => seed.locationCounty === 'Stark'));
assert.ok(starkMemorialLeadIn.every((seed) => seed.status === 'confirmed'));
assert.ok(starkMemorialLeadIn.every((seed) => seed.promoteToCheckpoint));

const hamiltonMemorialCheckpoint = seeds.find(
  (seed) => seed.id === '2026-05-22-hamilton-mariemont-wooster-pike',
);
assert.ok(hamiltonMemorialCheckpoint);
assert.equal(hamiltonMemorialCheckpoint.status, 'confirmed');
assert.equal(hamiltonMemorialCheckpoint.locationCounty, 'Hamilton');
assert.equal(hamiltonMemorialCheckpoint.promoteToCheckpoint, true);

const brookParkCheckpoint = seeds.find(
  (seed) => seed.id === '2026-05-28-brook-park-west-130th-street',
);
assert.ok(brookParkCheckpoint);
assert.equal(brookParkCheckpoint.status, 'confirmed');
assert.equal(brookParkCheckpoint.eventDate, '2026-05-28');
assert.equal(brookParkCheckpoint.startDate, '2026-05-28T19:00:00-04:00');
assert.equal(brookParkCheckpoint.locationText, 'West 130th Street');
assert.equal(brookParkCheckpoint.promoteToCheckpoint, true);
