import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';

dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const MAPBOX_TOKEN = process.env.MAPBOX_PUBLIC_TOKEN || process.env.VITE_MAPBOX_PUBLIC_TOKEN;

if (!supabaseUrl || !supabaseServiceRoleKey) {
  throw new Error('Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY env vars.');
}

if (!MAPBOX_TOKEN) {
  throw new Error('Missing MAPBOX_PUBLIC_TOKEN (or VITE_MAPBOX_PUBLIC_TOKEN) env var.');
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

async function geocodeAddress(address: string): Promise<{ lat: number; lng: number } | null> {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=${MAPBOX_TOKEN}&country=US&limit=1`;
  const res = await fetch(url);

  if (!res.ok) {
    console.error(`Mapbox request failed (${res.status}) for address: ${address}`);
    return null;
  }

  const data = await res.json();

  if (data.features && data.features.length > 0) {
    const [lng, lat] = data.features[0].center;
    return { lat, lng };
  }

  return null;
}

async function backfillGeocode() {
  let query = supabase
    .from('dui_checkpoints')
    .select('id, title, location_address, location_city, location_county, start_date')
    .or('latitude.is.null,longitude.is.null')
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

  const { data: checkpoints, error } = await query;

  if (error) {
    console.error('Error fetching checkpoints:', error);
    return;
  }

  console.log(`Found ${checkpoints?.length || 0} checkpoints needing geocoding`);

  for (const cp of checkpoints || []) {
    const address = cp.location_address
      ? `${cp.location_address}, ${cp.location_city || ''}, Ohio`
      : `${cp.location_city || cp.location_county}, Ohio`;

    console.log(`Geocoding: ${cp.title} — ${address}`);

    const coords = await geocodeAddress(address);

    if (coords) {
      const { error: updateError } = await supabase
        .from('dui_checkpoints')
        .update({ latitude: coords.lat, longitude: coords.lng })
        .eq('id', cp.id);

      if (updateError) {
        console.error(`Failed to update ${cp.title}:`, updateError);
      } else {
        console.log(`✓ Updated ${cp.title}: ${coords.lat}, ${coords.lng}`);
      }
    } else {
      console.warn(`✗ Could not geocode: ${cp.title}`);
    }

    // Rate limit: 600 requests/min for Mapbox
    await new Promise((r) => setTimeout(r, 150));
  }

  console.log('Backfill complete');
}

backfillGeocode();
