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
