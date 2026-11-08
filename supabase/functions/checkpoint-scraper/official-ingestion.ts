import type { SupabaseClient } from 'npm:@supabase/supabase-js@2';
import { fetchOfficialCheckpointIndex, fetchOfficialCheckpointNotice, type OfficialNoticeResult } from './official-announcements.ts';
import type { CuratedAnnouncementSeed } from './curated-announcements.ts';
import { geocodeCheckpointLocation } from './geocoding.ts';

type Evidence = NonNullable<OfficialNoticeResult['evidence']>;
type Status = 'upcoming' | 'active' | 'completed' | 'cancelled';
type Stats = {
  checkpointsFound: number; checkpointsNew: number; checkpointsUpdated: number;
  announcementsFound: number; announcementsUpserted: number;
  errors: { checkpoint: string; error: string }[];
};

// Franklin County Auditor LBRS road centerlines, MapServer/1. The points are
// crossings of the named roads, not assertions of an exact enforcement position.
// Source: https://gis.franklincountyohio.gov/hosting/rest/services/Addressing/LBRS/MapServer/1
const references = [
  { city: 'Jackson Township', road: 'US-62, south of Rensch Road', latitude: 39.871764, longitude: -83.102562 }, // 49185 × 24458
  { city: 'Jackson Township', road: 'Columbus Street, west of Hoover Road', latitude: 39.881160, longitude: -83.069527 }, // 25785 × 34299
  { city: 'Sharon Township', road: 'St. Rte. 161 w/o IR. 71', latitude: 40.087608, longitude: -82.987285 }, // 51014/38054 × 22164/36839
  { city: 'Sharon Township', road: 'Morse Rd. e/o IR 71', latitude: 40.061627, longitude: -82.997935 }, // 29299/59589/47816 × 59942/38575
];

async function saveEvent(db: SupabaseClient, token: string | undefined, seed: CuratedAnnouncementSeed,
  evidence: Evidence, stats: Stats, statusAt: (start: string, end: string) => Status) {
  const { locationText: road, locationCity: city, locationCounty: county, startDate: start, endDate: end } = seed;
  if (!road || !city || !county || !start || !end || !seed.promoteToCheckpoint) throw new Error('Incomplete official checkpoint');
  const prior = await db.from('dui_checkpoints').select('id,location_address,location_city,latitude,longitude').eq('source_url', seed.sourceUrl).maybeSingle();
  if (prior.error) throw prior.error;
  const reference = references.find(r => county === 'Franklin' && r.city === city && r.road.toLowerCase() === road.toLowerCase());
  const point = reference ? { ...reference, confidence: 'nearby_intersection' }
    : await geocodeCheckpointLocation({ address: road, city, county }, db, token);
  const keepPoint = !point && prior.data?.location_address === road && prior.data.location_city === city
    && prior.data.latitude != null && prior.data.longitude != null;
  const checkpoint = {
    title: seed.title, location_address: road, location_city: city, location_county: county,
    start_date: start, end_date: end, status: seed.status === 'cancelled' ? 'cancelled' : statusAt(start, end),
    source_name: seed.sourceName, source_url: seed.sourceUrl, is_verified: true,
    description: reference ? 'The map pin marks the nearby intersection. The sheriff published the road and direction, without an exact street number.' : seed.rawText.split(' Source fetched ')[0],
    // Preserve any previously geocoded point when a provider temporarily fails.
    ...(point ? { latitude: point.latitude, longitude: point.longitude, geocoding_confidence: point.confidence,
      last_geocoded_at: evidence.fetchedAt } : keepPoint ? {} : { latitude: null, longitude: null, geocoding_confidence: 'none', last_geocoded_at: null }),
    updated_at: evidence.fetchedAt,
  };
  const write = prior.data ? db.from('dui_checkpoints').update(checkpoint).eq('id', prior.data.id)
    : db.from('dui_checkpoints').upsert(checkpoint, { onConflict: 'location_address,location_city,start_date' });
  const saved = await write.select('id').single();
  if (saved.error) throw saved.error;
  const announcement = await db.from('dui_checkpoint_announcements').upsert({
    source_url: seed.sourceUrl, source_name: seed.sourceName, title: seed.title, event_date: seed.eventDate,
    start_date: start, end_date: end, location_text: road, location_city: city, location_county: county,
    status: seed.status, raw_text: seed.rawText, linked_checkpoint_id: saved.data.id, last_checked_at: evidence.fetchedAt,
  }, { onConflict: 'source_url' });
  if (announcement.error) throw announcement.error;
  if (prior.data) stats.checkpointsUpdated++;
  else stats.checkpointsNew++;
  stats.announcementsUpserted++;
  if (!point && !keepPoint) stats.errors.push({ checkpoint: seed.title, error: 'Official notice saved; map point could not be verified' });
}

export async function ingestOfficialNotices(db: SupabaseClient, token: string | undefined, stats: Stats,
  statusAt: (start: string, end: string) => Status) {
  const index = await fetchOfficialCheckpointIndex();
  const pages: { url: string; fetchedAt?: string; sha256?: string; published?: string; discovered: number; saved: number; pending?: string }[] = [];
  const indexFailure = index.pendingReason || (!index.urls.length ? 'No checkpoint notice links found on the county index' : undefined);
  if (indexFailure) stats.errors.push({ checkpoint: 'Franklin County notice index', error: indexFailure });
  // At most eight allowlisted URLs; each fetch has its own timeout and body cap.
  const notices = await Promise.all(index.urls.map(url => fetchOfficialCheckpointNotice(url)));
  for (const [i, notice] of notices.entries()) {
    const { evidence } = notice;
    const page = { url: index.urls[i], fetchedAt: evidence?.fetchedAt, sha256: evidence?.bodySha256,
      published: notice.publicationDate, discovered: notice.events.length, saved: 0, pending: notice.pendingReason };
    pages.push(page);
    if (notice.pendingReason || !evidence) {
      stats.errors.push({ checkpoint: page.url, error: notice.pendingReason || 'Missing official evidence' });
      continue;
    }
    for (const seed of notice.events) {
      stats.announcementsFound++;
      stats.checkpointsFound++;
      try {
        await saveEvent(db, token, seed, evidence, stats, statusAt);
        page.saved++;
      } catch (error) {
        const message = (error as { message?: string })?.message || String(error);
        stats.errors.push({ checkpoint: seed.sourceUrl, error: message });
      }
    }
  }
  return { index: index.evidence, indexFailure, pages };
}
