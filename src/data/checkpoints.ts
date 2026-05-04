import { formatCalendarDate, formatEasternTime } from '../lib/formatting';

export type CheckpointStatus = 'upcoming' | 'active' | 'completed' | 'cancelled';
export type CheckpointLocationPrecision = 'exact' | 'city_centroid' | 'county_centroid' | 'undisclosed' | 'missing';

export const checkpointGeocodingConfidenceOptions = [
  { value: 'exact_high', label: 'Exact location · high confidence' },
  { value: 'exact_medium', label: 'Exact location · medium confidence' },
  { value: 'exact_low', label: 'Exact location · low confidence' },
  { value: 'city_centroid', label: 'Approximate city center' },
  { value: 'county_centroid', label: 'Approximate county center' },
  { value: 'undisclosed', label: 'Undisclosed / no public street address' },
  { value: 'none', label: 'Not geocoded yet' },
] as const;

export interface DUICheckpoint {
  id: string;
  title: string;
  location_address: string;
  location_city: string;
  location_county: string;
  latitude: number | null;
  longitude: number | null;
  start_date: string;
  end_date: string;
  status: CheckpointStatus;
  source_url: string | null;
  source_name: string | null;
  description: string | null;
  created_at: string;
  updated_at: string;
  is_verified: boolean;
  views_count: number;
  announcement_date?: string | null;
  geocoding_confidence?: string | null;
  is_pending_announcement?: boolean;
  pending_announcement_event_date?: string | null;
}

const UNDISCLOSED_LOCATION_PATTERNS = [
  /\bundisclosed\b/i,
  /\bconfidential\b/i,
  /\bcountywide\b/i,
  /\bdetails?\s+(?:to\s+be\s+)?announced\b/i,
  /\blocation\s+(?:to\s+be\s+)?announced\b/i,
  /\bexact checkpoints?\s+undisclosed\b/i,
  /\bmultiple locations\b/i,
  /\bvarious locations\b/i,
  /\bthroughout the county\b/i,
] as const;

function normalizeText(value: string | null | undefined): string {
  return value?.trim().toLowerCase() || '';
}

function cityLooksRedundant(city: string | null | undefined, county: string | null | undefined): boolean {
  const normalizedCity = normalizeText(city);
  const normalizedCounty = normalizeText(county);
  return Boolean(normalizedCity) && normalizedCity === normalizedCounty;
}

export function locationTextSuggestsUndisclosed(locationText: string | null | undefined): boolean {
  const normalized = normalizeText(locationText);
  if (!normalized) return false;
  return UNDISCLOSED_LOCATION_PATTERNS.some((pattern) => pattern.test(normalized));
}

export function checkpointHasCoordinates(
  checkpoint: Pick<DUICheckpoint, 'latitude' | 'longitude'>
): checkpoint is Pick<DUICheckpoint, 'latitude' | 'longitude'> & { latitude: number; longitude: number } {
  return typeof checkpoint.latitude === 'number' && typeof checkpoint.longitude === 'number';
}

export function getCheckpointLocationPrecision(
  checkpoint: Pick<
    DUICheckpoint,
    'latitude' | 'longitude' | 'location_address' | 'location_city' | 'location_county' | 'geocoding_confidence'
  >
): CheckpointLocationPrecision {
  const normalizedConfidence = normalizeText(checkpoint.geocoding_confidence);

  if (!checkpointHasCoordinates(checkpoint)) {
    return normalizedConfidence === 'undisclosed' ? 'undisclosed' : 'missing';
  }

  if (normalizedConfidence.startsWith('city_centroid')) return 'city_centroid';
  if (normalizedConfidence.startsWith('county_centroid')) return 'county_centroid';
  if (normalizedConfidence === 'undisclosed') return 'undisclosed';
  if (normalizedConfidence.startsWith('exact_')) return 'exact';
  if (normalizedConfidence === 'high' || normalizedConfidence === 'medium' || normalizedConfidence === 'low') {
    if (!locationTextSuggestsUndisclosed(checkpoint.location_address)) return 'exact';
  }

  if (locationTextSuggestsUndisclosed(checkpoint.location_address)) {
    return cityLooksRedundant(checkpoint.location_city, checkpoint.location_county)
      ? 'county_centroid'
      : 'city_centroid';
  }

  if (
    normalizeText(checkpoint.location_address) === normalizeText(checkpoint.location_city) ||
    normalizeText(checkpoint.location_address) === normalizeText(checkpoint.location_county)
  ) {
    return cityLooksRedundant(checkpoint.location_city, checkpoint.location_county)
      ? 'county_centroid'
      : 'city_centroid';
  }

  return 'exact';
}

export function isApproximateCheckpointLocation(
  checkpoint: Pick<
    DUICheckpoint,
    'latitude' | 'longitude' | 'location_address' | 'location_city' | 'location_county' | 'geocoding_confidence'
  >
): boolean {
  const precision = getCheckpointLocationPrecision(checkpoint);
  return precision === 'city_centroid' || precision === 'county_centroid' || precision === 'undisclosed';
}

export function getCheckpointLocationPrecisionLabel(
  precision: CheckpointLocationPrecision
): string {
  switch (precision) {
    case 'exact':
      return 'Street-level location';
    case 'city_centroid':
      return 'Approximate city area';
    case 'county_centroid':
      return 'Approximate county area';
    case 'undisclosed':
      return 'Undisclosed location';
    case 'missing':
    default:
      return 'Map point unavailable';
  }
}

export function getCheckpointAreaLabel(
  checkpoint: Pick<
    DUICheckpoint,
    'location_address' | 'location_city' | 'location_county' | 'latitude' | 'longitude' | 'geocoding_confidence'
  >
): string {
  const precision = getCheckpointLocationPrecision(checkpoint);

  if (precision === 'exact') {
    return `${checkpoint.location_address}, ${checkpoint.location_city}`;
  }

  if (precision === 'city_centroid' && checkpoint.location_city) {
    return `Approximate area near ${checkpoint.location_city}, ${checkpoint.location_county} County`;
  }

  if (checkpoint.location_county) {
    return `Approximate area in ${checkpoint.location_county} County`;
  }

  return 'Approximate Ohio location';
}

export function getCheckpointLocationGuidance(
  checkpoint: Pick<
    DUICheckpoint,
    'location_address' | 'location_city' | 'location_county' | 'latitude' | 'longitude' | 'geocoding_confidence'
  >
): string | null {
  const precision = getCheckpointLocationPrecision(checkpoint);

  switch (precision) {
    case 'city_centroid':
      return 'This pin is centered on the named city because the public source did not publish a street address.';
    case 'county_centroid':
      return 'This pin is centered on the county because the public source did not publish a street address.';
    case 'undisclosed':
      return 'The public source described enforcement activity but did not publish a precise checkpoint location.';
    default:
      return null;
  }
}

export function isAggregatorSourceName(sourceName: string | null | undefined): boolean {
  if (!sourceName) return false;
  const normalized = sourceName.trim().toLowerCase();
  return normalized === 'ovicheckpoint.com' || normalized === 'duiblock' || normalized === 'duiblock.com';
}

export function isAggregatorSourceUrl(sourceUrl: string | null | undefined): boolean {
  if (!sourceUrl) return false;
  const normalized = sourceUrl.trim().toLowerCase();
  return normalized.includes('ovicheckpoint.com') || normalized.includes('duiblock');
}

export function shouldShowPublicCheckpointSource(
  checkpoint: Pick<DUICheckpoint, 'source_name' | 'source_url'>
): boolean {
  return Boolean(checkpoint.source_name) && !isAggregatorSourceName(checkpoint.source_name);
}

export const ohioCounties = [
  'Adams', 'Allen', 'Ashland', 'Ashtabula', 'Athens', 'Auglaize', 'Belmont', 'Brown', 'Butler',
  'Carroll', 'Champaign', 'Clark', 'Clermont', 'Clinton', 'Columbiana', 'Coshocton', 'Crawford',
  'Cuyahoga', 'Darke', 'Defiance', 'Delaware', 'Erie', 'Fairfield', 'Fayette', 'Franklin',
  'Fulton', 'Gallia', 'Geauga', 'Greene', 'Guernsey', 'Hamilton', 'Hancock', 'Hardin', 'Harrison',
  'Henry', 'Highland', 'Hocking', 'Holmes', 'Huron', 'Jackson', 'Jefferson', 'Knox', 'Lake',
  'Lawrence', 'Licking', 'Logan', 'Lorain', 'Lucas', 'Madison', 'Mahoning', 'Marion', 'Medina',
  'Meigs', 'Mercer', 'Miami', 'Monroe', 'Montgomery', 'Morgan', 'Morrow', 'Muskingum', 'Noble',
  'Ottawa', 'Paulding', 'Perry', 'Pickaway', 'Pike', 'Portage', 'Preble', 'Putnam', 'Richland',
  'Ross', 'Sandusky', 'Scioto', 'Seneca', 'Shelby', 'Stark', 'Summit', 'Trumbull', 'Tuscarawas',
  'Union', 'Van Wert', 'Vinton', 'Warren', 'Washington', 'Wayne', 'Williams', 'Wood', 'Wyandot'
];

export function getStatusColor(status: CheckpointStatus): string {
  switch (status) {
    case 'upcoming':
      return 'text-blue-700 bg-blue-50 border-blue-200';
    case 'active':
      return 'text-red-700 bg-red-50 border-red-200';
    case 'completed':
      return 'text-gray-700 bg-gray-50 border-gray-200';
    case 'cancelled':
      return 'text-orange-700 bg-orange-50 border-orange-200';
    default:
      return 'text-gray-700 bg-gray-50 border-gray-200';
  }
}

export function getStatusLabel(status: CheckpointStatus): string {
  switch (status) {
    case 'upcoming':
      return 'Upcoming';
    case 'active':
      return 'Active Now';
    case 'completed':
      return 'Completed';
    case 'cancelled':
      return 'Cancelled';
    default:
      return status;
  }
}

export function getDisplayStatus(checkpoint: Pick<DUICheckpoint, 'start_date' | 'end_date' | 'status'>, now = new Date()): CheckpointStatus {
  if (checkpoint.status === 'cancelled') return 'cancelled';

  const start = new Date(checkpoint.start_date);
  const end = new Date(checkpoint.end_date);

  if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) {
    return checkpoint.status;
  }

  if (now < start) return 'upcoming';
  if (now <= end) return 'active';
  return 'completed';
}

export function formatCheckpointDate(dateString: string): string {
  return formatCalendarDate(dateString, {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

export function formatCheckpointTime(dateString: string): string {
  return formatEasternTime(dateString, {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });
}

export function formatCheckpointDateRange(startDate: string, endDate: string): string {
  const dateStr = formatCheckpointDate(startDate);
  const startTime = formatCheckpointTime(startDate);
  const endTime = formatCheckpointTime(endDate);

  return `${dateStr} from ${startTime} to ${endTime}`;
}
