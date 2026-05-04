import type { DUICheckpoint } from '../data/checkpoints';
import {
  isAnnouncementFreshForPublic,
  type CheckpointAnnouncement,
} from './checkpointAnnouncementsService';

type ApproximateCoordinate = {
  latitude: number;
  longitude: number;
  geocodingConfidence: 'city_centroid' | 'county_centroid';
};

const CITY_COORDINATES: Record<string, ApproximateCoordinate> = {
  'solon|cuyahoga': {
    latitude: 41.385105,
    longitude: -81.442627,
    geocodingConfidence: 'city_centroid',
  },
};

const COUNTY_COORDINATES: Record<string, ApproximateCoordinate> = {
  cuyahoga: {
    latitude: 41.433923,
    longitude: -81.67582,
    geocodingConfidence: 'county_centroid',
  },
  summit: {
    latitude: 41.08088,
    longitude: -81.51757,
    geocodingConfidence: 'county_centroid',
  },
};

function normalizePlaceKey(value: string | null | undefined): string | null {
  const normalized = value?.trim().toLowerCase();
  return normalized || null;
}

function getApproximateCoordinate(announcement: CheckpointAnnouncement): ApproximateCoordinate | null {
  const cityKey = normalizePlaceKey(announcement.location_city);
  const countyKey = normalizePlaceKey(announcement.location_county);

  if (cityKey && countyKey) {
    const cityCoordinate = CITY_COORDINATES[`${cityKey}|${countyKey}`];
    if (cityCoordinate) return cityCoordinate;
  }

  if (countyKey) {
    return COUNTY_COORDINATES[countyKey] ?? null;
  }

  return null;
}

function addDaysToDateOnly(value: string, days: number): string | null {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return null;
  const date = new Date(`${value}T00:00:00.000Z`);
  if (Number.isNaN(date.getTime())) return null;
  date.setUTCDate(date.getUTCDate() + days);
  return date.toISOString().slice(0, 10);
}

function pendingStartDate(announcement: CheckpointAnnouncement): string {
  if (announcement.start_date) return announcement.start_date;
  if (announcement.event_date) return `${announcement.event_date}T00:00:00-04:00`;
  return announcement.announcement_date ?? announcement.created_at;
}

function pendingEndDate(announcement: CheckpointAnnouncement): string {
  if (announcement.end_date) return announcement.end_date;
  if (announcement.event_date) {
    const nextDate = addDaysToDateOnly(announcement.event_date, 1) ?? announcement.event_date;
    return `${nextDate}T03:59:59-04:00`;
  }
  return announcement.announcement_date ?? announcement.created_at;
}

function pendingLocationAddress(announcement: CheckpointAnnouncement): string {
  const locationText = announcement.location_text?.trim();
  if (locationText) return locationText;

  const city = announcement.location_city?.trim();
  const county = announcement.location_county?.trim();

  if (city && county) return `${city}, ${county} County - exact checkpoint location pending`;
  if (county) return `${county} County - exact checkpoint location pending`;
  return 'Ohio checkpoint announcement - exact location pending';
}

export function buildPendingAnnouncementMapCheckpoint(
  announcement: CheckpointAnnouncement,
  now: Date = new Date(),
): DUICheckpoint | null {
  if (announcement.status !== 'pending_details') return null;
  if (!announcement.source_url) return null;
  if (!isAnnouncementFreshForPublic(announcement, now)) return null;

  const coordinate = getApproximateCoordinate(announcement);
  if (!coordinate) return null;

  const county = announcement.location_county?.trim() ?? '';
  const city = announcement.location_city?.trim() ?? '';

  return {
    id: `announcement-${announcement.id}`,
    title: announcement.title,
    location_address: pendingLocationAddress(announcement),
    location_city: city,
    location_county: county,
    latitude: coordinate.latitude,
    longitude: coordinate.longitude,
    start_date: pendingStartDate(announcement),
    end_date: pendingEndDate(announcement),
    status: 'upcoming',
    source_url: announcement.source_url,
    source_name: announcement.source_name,
    description:
      'Pending public announcement: exact checkpoint time and street-level location have not been published. This marker shows only the named city or county area from the source.',
    created_at: announcement.created_at,
    updated_at: announcement.updated_at,
    is_verified: true,
    views_count: 0,
    announcement_date: announcement.announcement_date,
    geocoding_confidence: coordinate.geocodingConfidence,
    is_pending_announcement: true,
    pending_announcement_event_date: announcement.event_date,
  };
}

export function buildPendingAnnouncementMapCheckpoints(
  announcements: CheckpointAnnouncement[],
  now: Date = new Date(),
): DUICheckpoint[] {
  return announcements.flatMap((announcement) => {
    const checkpoint = buildPendingAnnouncementMapCheckpoint(announcement, now);
    return checkpoint ? [checkpoint] : [];
  });
}
