import { createClient } from '@supabase/supabase-js';
import { scrapeOVICheckpoint } from '../supabase/functions/checkpoint-scraper/ovicheckpoint-scraper.ts';
import { geocodeAddress, parseAddress } from '../supabase/functions/checkpoint-scraper/geocoding.ts';

type Confidence = 'high' | 'medium' | 'low';

type CanonicalCheckpoint = {
  title: string;
  location_county: string;
  location_city: string;
  location_address: string;
  start_date: string;
  end_date: string;
  source_url: string;
  source_name: string;
  confidence: Confidence;
  notes?: string;
};

type ExistingCheckpointRow = {
  id: string;
  title: string;
  location_county: string;
  location_city: string;
  location_address: string;
  start_date: string;
  end_date: string;
  status: string;
  source_url: string | null;
  source_name: string | null;
  description: string | null;
  latitude: number | null;
  longitude: number | null;
  created_at: string;
  updated_at: string;
};

type ScriptMode = 'scan' | 'upsert' | 'replace-ovicheckpoint';

function usage(): string {
  return [
    'Backfill OVICheckpoint dates (safe dry-run by default)',
    '',
    'Required env:',
    '  SUPABASE_URL',
    '  SUPABASE_SERVICE_ROLE_KEY',
    'Optional env:',
    '  MAPBOX_PUBLIC_TOKEN (to geocode while inserting)',
    '',
    'Examples:',
    '  npx ts-node --esm scripts/backfill-ovicheckpoint-dates.ts',
    '  npx ts-node --esm scripts/backfill-ovicheckpoint-dates.ts --mode upsert --apply',
    '  npx ts-node --esm scripts/backfill-ovicheckpoint-dates.ts --mode replace-ovicheckpoint --apply',
    '',
    'Flags:',
    '  --mode <scan|upsert|replace-ovicheckpoint>   (default: scan)',
    '  --apply                                     Actually write changes (default: dry-run)',
    '  --output <path>                              Report JSON path (default: ./reports/checkpoint-backfill-<ts>.json)',
    '  --no-geocode                                 Skip geocoding even if token present',
    '  --limit <n>                                  Limit canonical rows processed (debug only)',
  ].join('\n');
}

function parseArgs(argv: string[]) {
  const args = new Map<string, string | boolean>();
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (!a.startsWith('--')) continue;
    const key = a.slice(2);
    const next = argv[i + 1];
    if (!next || next.startsWith('--')) {
      args.set(key, true);
    } else {
      args.set(key, next);
      i++;
    }
  }

  const mode = (args.get('mode') || 'scan') as ScriptMode;
  const apply = Boolean(args.get('apply'));
  const noGeocode = Boolean(args.get('no-geocode'));
  const limitRaw = args.get('limit');
  const limit = typeof limitRaw === 'string' ? Number(limitRaw) : undefined;
  const output = typeof args.get('output') === 'string' ? String(args.get('output')) : undefined;

  if (!['scan', 'upsert', 'replace-ovicheckpoint'].includes(mode)) {
    throw new Error(`Invalid --mode "${mode}".\n\n${usage()}`);
  }

  if (limit !== undefined && (!Number.isFinite(limit) || limit <= 0)) {
    throw new Error(`Invalid --limit "${limitRaw}".\n\n${usage()}`);
  }

  return { mode, apply, noGeocode, limit, output };
}

function normalizeKeyPart(input: string): string {
  return input
    .trim()
    .toLowerCase()
    .replace(/\s+county$/i, '')
    .replace(/\s+/g, ' ');
}

type KeyRow = {
  location_county: string;
  location_city: string;
  location_address: string;
  start_date: string;
};

function checkpointKey(row: KeyRow): string {
  return [
    normalizeKeyPart(row.location_county),
    normalizeKeyPart(row.location_city),
    normalizeKeyPart(row.location_address),
    new Date(row.start_date).toISOString(),
  ].join('|');
}

function determineStatus(startDate: string, endDate: string): 'upcoming' | 'active' | 'completed' | 'cancelled' {
  const now = new Date();
  const start = new Date(startDate);
  const end = new Date(endDate);

  if (now < start) return 'upcoming';
  if (now <= end) return 'active';
  return 'completed';
}

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function writeReport(path: string, payload: unknown) {
  const fs = await import('node:fs/promises');
  const dir = await import('node:path');
  await fs.mkdir(dir.dirname(path), { recursive: true });
  await fs.writeFile(path, JSON.stringify(payload, null, 2), 'utf8');
}

async function main() {
  const { mode, apply, noGeocode, limit, output } = parseArgs(process.argv.slice(2));

  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const mapboxToken = process.env.MAPBOX_PUBLIC_TOKEN;

  if (!supabaseUrl || !supabaseServiceKey) {
    throw new Error(`Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY.\n\n${usage()}`);
  }

  const reportPath =
    output ?? `reports/checkpoint-backfill-${new Date().toISOString().replace(/[:.]/g, '-')}.json`;

  const supabase = createClient(supabaseUrl, supabaseServiceKey);

  console.log(`[info] mode=${mode} apply=${apply} report=${reportPath}`);
  console.log('[info] scraping OVICheckpoint canonical dataset...');

  const raw = await scrapeOVICheckpoint();
  const canonical: CanonicalCheckpoint[] = [];

  for (const r of (limit ? raw.slice(0, limit) : raw)) {
    const { address, city, county } = parseAddress(r.location);
    canonical.push({
      title: r.title,
      location_county: county,
      location_city: city,
      location_address: address,
      start_date: r.startDate,
      end_date: r.endDate,
      source_url: r.sourceUrl,
      source_name: 'OVICheckpoint.com',
      confidence: 'medium',
      notes: 'Parsed from OVICheckpoint TablePress table (wp-json page 1078).',
    });
  }

  const canonicalKeys = new Set(canonical.map((c) => checkpointKey(c)));

  console.log('[info] fetching existing OVICheckpoint rows from Supabase...');
  const { data: existingRows, error: existingError } = await supabase
    .from('dui_checkpoints')
    .select(
      'id,title,location_county,location_city,location_address,start_date,end_date,status,source_url,source_name,description,latitude,longitude,created_at,updated_at'
    )
    .eq('source_name', 'OVICheckpoint.com')
    .order('start_date', { ascending: false });

  if (existingError) throw existingError;
  const existing = (existingRows ?? []) as ExistingCheckpointRow[];
  const existingByKey = new Map(existing.map((row) => [checkpointKey(row), row]));

  const now = new Date();
  const twoDaysAgo = new Date(now.getTime() - 48 * 60 * 60 * 1000);
  const twoDaysAhead = new Date(now.getTime() + 48 * 60 * 60 * 1000);

  const corruptCandidates = existing.filter((row) => {
    const start = new Date(row.start_date);
    if (Number.isNaN(start.getTime())) return false;
    if (start < twoDaysAgo || start > twoDaysAhead) return false;
    return !canonicalKeys.has(checkpointKey(row));
  });

  const plannedInserts =
    mode === 'replace-ovicheckpoint'
      ? canonical
      : canonical.filter((c) => !existingByKey.has(checkpointKey(c)));

  const report: any = {
    generated_at: new Date().toISOString(),
    mode,
    apply,
    supabase_url: supabaseUrl,
    canonical: {
      source: 'OVICheckpoint.com',
      rows: canonical.length,
    },
    existing: {
      source_name: 'OVICheckpoint.com',
      rows: existing.length,
    },
    analysis: {
      planned_inserts: plannedInserts.length,
      corrupt_candidates_last_48h: corruptCandidates.length,
    },
    corrupt_candidates_last_48h: corruptCandidates.map((r) => ({
      id: r.id,
      title: r.title,
      location_county: r.location_county,
      location_city: r.location_city,
      location_address: r.location_address,
      start_date: r.start_date,
      end_date: r.end_date,
      updated_at: r.updated_at,
    })),
    actions: [] as any[],
  };

  if (mode === 'scan' || !apply) {
    await writeReport(reportPath, report);
    console.log(`[done] wrote report: ${reportPath}`);
    console.log('[next] re-run with --apply to write changes (and consider --mode replace-ovicheckpoint for a clean rebuild).');
    return;
  }

  if (mode === 'replace-ovicheckpoint') {
    console.log('[warn] REPLACE MODE: deleting all existing OVICheckpoint.com rows...');
    report.actions.push({ type: 'delete_many', where: { source_name: 'OVICheckpoint.com' }, count: existing.length });

    const { error: deleteError } = await supabase
      .from('dui_checkpoints')
      .delete()
      .eq('source_name', 'OVICheckpoint.com');

    if (deleteError) throw deleteError;
  }

  const shouldGeocode = !noGeocode && Boolean(mapboxToken);
  if (!noGeocode && !mapboxToken) {
    console.log('[warn] MAPBOX_PUBLIC_TOKEN not set; inserting without coordinates.');
  }

  console.log(`[info] inserting ${plannedInserts.length} canonical rows... (geocode=${shouldGeocode})`);

  const batchSize = 50;
  for (let i = 0; i < plannedInserts.length; i += batchSize) {
    const batch = plannedInserts.slice(i, i + batchSize);
    const insertPayloads: any[] = [];

    for (const c of batch) {
      let coords: { latitude: number; longitude: number } | null = null;

      if (shouldGeocode) {
        const fullAddress = `${c.location_address}, ${c.location_city}, Ohio`;
        const geocoded = await geocodeAddress(fullAddress, supabase, mapboxToken);
        if (geocoded) {
          coords = { latitude: geocoded.latitude, longitude: geocoded.longitude };
        }
        await sleep(175);
      }

      insertPayloads.push({
        title: c.title,
        location_county: c.location_county,
        location_city: c.location_city,
        location_address: c.location_address,
        latitude: coords?.latitude ?? null,
        longitude: coords?.longitude ?? null,
        start_date: c.start_date,
        end_date: c.end_date,
        status: determineStatus(c.start_date, c.end_date),
        source_url: c.source_url,
        source_name: c.source_name,
        description: c.notes ?? null,
        is_verified: true,
      });
    }

    const { error: insertError } = await supabase.from('dui_checkpoints').insert(insertPayloads);
    if (insertError) throw insertError;

    report.actions.push({ type: 'insert_batch', count: insertPayloads.length });
    console.log(`[info] inserted ${Math.min(i + batchSize, plannedInserts.length)}/${plannedInserts.length}`);
  }

  await writeReport(reportPath, report);
  console.log(`[done] wrote report: ${reportPath}`);
}

main().catch((err) => {
  console.error('[fatal]', err);
  process.exit(1);
});
