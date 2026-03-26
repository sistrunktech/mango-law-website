export type CuratedAnnouncementStatus = 'pending_details' | 'confirmed' | 'cancelled';

export interface CuratedAnnouncementSeed {
  id: string;
  title: string;
  sourceUrl: string;
  sourceName: string;
  announcementDate: string | null;
  eventDate: string | null;
  startDate: string | null;
  endDate: string | null;
  locationText: string | null;
  locationCity: string | null;
  locationCounty: string | null;
  status: CuratedAnnouncementStatus;
  rawText: string;
  promoteToCheckpoint: boolean;
  checkpointTitle?: string;
}

// Curated seeds capture high-confidence public notices that may not appear in RSS feeds.
// Keep sourceUrl values unique per item because announcements are deduped by source_url.
const CURATED_ANNOUNCEMENT_SEEDS: CuratedAnnouncementSeed[] = [
  {
    id: '2025-08-29-brunswick-pearl-road-checkpoint',
    title: 'Sobriety checkpoint planned on Pearl Road in Brunswick',
    checkpointTitle: 'OVI Checkpoint - Brunswick, Medina County',
    sourceUrl:
      'https://www.msn.com/en-us/news/us/sobriety-checkpoints-this-week-in-northeast-ohio/ar-AA1LbcHK#brunswick-pearl-road',
    sourceName: 'WJW-TV Cleveland (MSN syndication)',
    announcementDate: '2025-08-29T00:00:00-04:00',
    eventDate: '2025-08-29',
    startDate: '2025-08-29T20:00:00-04:00',
    endDate: '2025-08-29T23:00:00-04:00',
    locationText: 'Pearl Road',
    locationCity: 'Brunswick',
    locationCounty: 'Medina',
    status: 'confirmed',
    rawText:
      'Article reported a Friday checkpoint on Pearl Road in Brunswick from 8 p.m. to 11 p.m., with nearby saturation patrols.',
    promoteToCheckpoint: true,
  },
  {
    id: '2025-08-30-strongsville-location-pending',
    title: 'Strongsville OVI checkpoint planned (location pending release)',
    sourceUrl:
      'https://www.msn.com/en-us/news/us/sobriety-checkpoints-this-week-in-northeast-ohio/ar-AA1LbcHK#strongsville-location-pending',
    sourceName: 'WJW-TV Cleveland (MSN syndication)',
    announcementDate: '2025-08-29T00:00:00-04:00',
    eventDate: '2025-08-30',
    startDate: null,
    endDate: null,
    locationText: 'Strongsville (exact checkpoint location announced day-of)',
    locationCity: 'Strongsville',
    locationCounty: 'Cuyahoga',
    status: 'pending_details',
    rawText:
      'Article reported Strongsville and the Cuyahoga County OVI Task Force planned a Saturday checkpoint, with exact location to be announced the same day.',
    promoteToCheckpoint: false,
  },
  {
    id: '2026-02-08-stark-county-super-bowl-enforcement',
    title: 'Super Bowl weekend impaired-driving enforcement in Stark County',
    sourceUrl:
      'https://www.facebook.com/StarkCountySheriff/posts/designated-drivers-are-the-real-mvps-on-super-bowl-weekendcanton-ohio-january-28/1222195866685058/',
    sourceName: "Stark County Sheriff's Office (Facebook)",
    announcementDate: '2026-01-28T13:37:00-05:00',
    eventDate: '2026-02-08',
    startDate: null,
    endDate: null,
    locationText: 'Countywide Super Bowl enforcement patrols (Feb 8-9, 2026)',
    locationCity: 'Canton',
    locationCounty: 'Stark',
    status: 'pending_details',
    rawText:
      'Sheriff office post announced increased countywide patrols for Super Bowl weekend and encouraged designated drivers.',
    promoteToCheckpoint: false,
  },
  {
    id: '2026-03-17-stark-county-st-patricks-day-enforcement',
    title: "St. Patrick's Day OVI enforcement noted in Stark County",
    sourceUrl: 'https://www.ovicheckpoint.com/#2026-03-17-stark-county-st-patricks-day-enforcement',
    sourceName: 'OVICheckpoint.com',
    announcementDate: '2026-03-17T00:00:00-04:00',
    eventDate: '2026-03-17',
    startDate: '2026-03-17T20:00:00+00:00',
    endDate: '2026-03-17T23:00:00+00:00',
    locationText: 'Stark County (exact street-level location not preserved in the upstream listing)',
    locationCity: 'Stark',
    locationCounty: 'Stark',
    status: 'confirmed',
    rawText:
      "Historical March 17, 2026 OVICheckpoint listing captured during the March 26 refresh. This preserves St. Patrick's Day-period enforcement coverage in the repo-backed record even though the opportunity was missed in real time.",
    promoteToCheckpoint: false,
  },
  {
    id: '2026-03-17-summit-county-st-patricks-day-enforcement',
    title: "St. Patrick's Day OVI enforcement noted in Summit County",
    sourceUrl: 'https://www.ovicheckpoint.com/#2026-03-17-summit-county-st-patricks-day-enforcement',
    sourceName: 'OVICheckpoint.com',
    announcementDate: '2026-03-17T00:00:00-04:00',
    eventDate: '2026-03-17',
    startDate: '2026-03-17T20:00:00+00:00',
    endDate: '2026-03-17T23:00:00+00:00',
    locationText: 'Summit County (exact street-level location not preserved in the upstream listing)',
    locationCity: 'Summit',
    locationCounty: 'Summit',
    status: 'confirmed',
    rawText:
      "Historical March 17, 2026 OVICheckpoint listing captured during the March 26 refresh. This preserves St. Patrick's Day-period enforcement coverage in the repo-backed record even though the opportunity was missed in real time.",
    promoteToCheckpoint: false,
  },
  {
    id: '2026-03-17-montgomery-county-st-patricks-day-enforcement',
    title: "St. Patrick's Day OVI enforcement noted in Montgomery County",
    sourceUrl: 'https://www.ovicheckpoint.com/#2026-03-17-montgomery-county-st-patricks-day-enforcement',
    sourceName: 'OVICheckpoint.com',
    announcementDate: '2026-03-17T00:00:00-04:00',
    eventDate: '2026-03-17',
    startDate: '2026-03-17T18:30:00+00:00',
    endDate: '2026-03-17T22:30:00+00:00',
    locationText: 'Washington Township / Montgomery County (exact street-level location not preserved in the upstream listing)',
    locationCity: 'Washington Township',
    locationCounty: 'Montgomery',
    status: 'confirmed',
    rawText:
      "Historical March 17, 2026 OVICheckpoint listing captured during the March 26 refresh. This preserves St. Patrick's Day-period enforcement coverage in the repo-backed record even though the opportunity was missed in real time.",
    promoteToCheckpoint: false,
  },
];

export function loadCuratedAnnouncementSeeds(): CuratedAnnouncementSeed[] {
  return CURATED_ANNOUNCEMENT_SEEDS;
}
