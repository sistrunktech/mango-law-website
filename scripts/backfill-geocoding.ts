import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import {
  geocodeCheckpointLocation,
  hasStreetLevelHint,
  locationTextSuggestsUndisclosed,
  type CheckpointGeocodingConfidence,
} from '../supabase/functions/checkpoint-scraper/geocoding.ts';

dotenv.config();

const supabaseUrl =
  process.env.SUPABASE_URL ||
  process.env.NEXT_PUBLIC_SUPABASE_URL ||
  process.env.VITE_SUPABASE_URL;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const MAPBOX_TOKEN =
  process.env.MAPBOX_PUBLIC_TOKEN ||
  process.env.NEXT_PUBLIC_MAPBOX_PUBLIC_TOKEN ||
  process.env.VITE_MAPBOX_PUBLIC_TOKEN;

if (!supabaseUrl || !supabaseServiceRoleKey) {
  throw new Error('Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY env vars.');
}

const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);

const DAYS_BACK = process.env.DAYS_BACK ? Number(process.env.DAYS_BACK) : null;
const BACKFILL_LIMIT = process.env.BACKFILL_LIMIT ? Number(process.env.BACKFILL_LIMIT) : null;

if (DAYS_BACK !== null && (Number.isNaN(DAYS_BACK) || DAYS_BACK <= 0)) {
  throw new Error('DAYS_BACK must be a positive number if set.');
}

if (BACKFILL_LIMIT !== null && (Number.isNaN(BACKFILL_LIMIT) || BACKFILL_LIMIT <= 0)) {
  throw new Error('BACKFILL_LIMIT must be a positive number if set.');
}

type CheckpointRow = {
  id: string;
  title: string;
  location_address: string;
  location_city: string;
  location_county: string;
  start_date: string;
  latitude: number | null;
  longitude: number | null;
  geocoding_confidence: string | null;
};

function normalizeConfidence(value: string | null | undefined): string {
  return value?.trim().toLowerCase() || 'none';
}

function cityLooksRedundant(city: string | null | undefined, county: string | null | undefined): boolean {
  return Boolean(city) && Boolean(county) && city.trim().toLowerCase() === county.trim().toLowerCase();
}

function needsPrecisionBackfill(row: CheckpointRow): boolean {
  const normalizedConfidence = normalizeConfidence(row.geocoding_confidence);
  const missingCoordinates = row.latitude === null || row.longitude === null;

  if (missingCoordinates) return true;

  if (normalizedConfidence === 'exact_high' || normalizedConfidence === 'exact_medium' || normalizedConfidence === 'exact_low') {
    return false;
  }

  if (
    (normalizedConfidence === 'city_centroid' || normalizedConfidence === 'county_centroid') &&
    hasStreetLevelHint(row.location_address) &&
    !locationTextSuggestsUndisclosed(row.location_address)
  ) {
    return true;
  }

  if (normalizedConfidence === 'city_centroid' || normalizedConfidence === 'county_centroid') {
    return false;
  }

  if (locationTextSuggestsUndisclosed(row.location_address)) {
    return normalizedConfidence !== 'county_centroid' && normalizedConfidence !== 'city_centroid';
  }

  if (
    (normalizeConfidence(row.location_address) === normalizeConfidence(row.location_city) ||
      normalizeConfidence(row.location_address) === normalizeConfidence(row.location_county)) &&
    cityLooksRedundant(row.location_city, row.location_county)
  ) {
    return true;
  }

  return normalizedConfidence === 'none' || normalizedConfidence === 'unverified';
}

async function backfillGeocode() {
  let query = supabase
    .from('dui_checkpoints')
    .select('id, title, location_address, location_city, location_county, start_date, latitude, longitude, geocoding_confidence')
    .order('start_date', { ascending: false });

  if (DAYS_BACK !== null) {
    const cutoff = new Date(Date.now() - DAYS_BACK * 24 * 60 * 60 * 1000).toISOString();
    query = query.gte('start_date', cutoff);
    console.log(`Filtering to checkpoints with start_date >= ${cutoff} (last ${DAYS_BACK} days)`);
  }

  if (BACKFILL_LIMIT !== null) {
    query = query.limit(BACKFILL_LIMIT);
    console.log(`Limiting backfill to ${BACKFILL_LIMIT} rows`);
  }

  const { data: rows, error } = await query;

  if (error) {
    console.error('Error fetching checkpoints:', error);
    return;
  }

  const checkpoints = (rows || []).filter(needsPrecisionBackfill);
  console.log(`Found ${checkpoints?.length || 0} checkpoints needing geocoding`);

  for (const cp of checkpoints || []) {
    console.log(
      `Geocoding: ${cp.title} — ${cp.location_address || cp.location_city || cp.location_county} (${cp.location_city}, ${cp.location_county})`
    );

    const geocoded = await geocodeCheckpointLocation(
      {
        address: cp.location_address || cp.location_city || cp.location_county,
        city: cp.location_city || cp.location_county,
        county: cp.location_county || cp.location_city,
      },
      supabase,
      MAPBOX_TOKEN
    );

    if (geocoded) {
      const updatePayload: {
        latitude: number | null;
        longitude: number | null;
        geocoding_confidence: CheckpointGeocodingConfidence;
        last_geocoded_at: string;
      } = {
        latitude: geocoded.latitude,
        longitude: geocoded.longitude,
        geocoding_confidence: geocoded.confidence,
        last_geocoded_at: new Date().toISOString(),
      };

      const { error: updateError } = await supabase
        .from('dui_checkpoints')
        .update(updatePayload)
        .eq('id', cp.id);

      if (updateError) {
        console.error(`Failed to update ${cp.title}:`, updateError);
      } else {
        console.log(
          `✓ Updated ${cp.title}: ${geocoded.latitude}, ${geocoded.longitude} [${geocoded.confidence}]`
        );
      }
    } else {
      const fallbackConfidence: CheckpointGeocodingConfidence = locationTextSuggestsUndisclosed(cp.location_address)
        ? 'undisclosed'
        : 'none';

      const { error: updateError } = await supabase
        .from('dui_checkpoints')
        .update({
          geocoding_confidence: fallbackConfidence,
          last_geocoded_at: new Date().toISOString(),
        })
        .eq('id', cp.id);

      if (updateError) {
        console.error(`Failed to record unresolved precision for ${cp.title}:`, updateError);
      } else {
        console.warn(`✗ Could not geocode ${cp.title}; marked ${fallbackConfidence}`);
      }
    }

    // Rate limit: 600 requests/min for Mapbox
    await new Promise((r) => setTimeout(r, 150));
  }

  console.log('Backfill complete');
}

backfillGeocode();
