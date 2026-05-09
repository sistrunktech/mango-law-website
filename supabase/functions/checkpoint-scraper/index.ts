import { createClient } from 'npm:@supabase/supabase-js@2';
import { requireAdmin } from '../_shared/admin-auth.ts';
import { scrapeOVICheckpoint } from './ovicheckpoint-scraper.ts';
import { geocodeCheckpointLocation, parseAddress, shouldSkipCheckpointGeocoding } from './geocoding.ts';
import { loadMasterRssSources, loadSeedSources } from './rss-sources.ts';
import { scrapeRssSources, scrapeSeedSources } from './rss-scraper.ts';
import { discoverCheckpointAnnouncements } from './search-discovery.ts';
import { determineScraperHealth, determineScraperRunStatus } from './run-health.ts';
import {
  loadCuratedAnnouncementSeeds,
  type CuratedAnnouncementSeed,
} from './curated-announcements.ts';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Client-Info, Apikey',
};

const RSS_ANNOUNCEMENT_LOOKBACK_DAYS = 21;

type SupabaseAdminClient = any;

interface ScraperStats {
  checkpointsFound: number;
  checkpointsNew: number;
  checkpointsUpdated: number;
  checkpointsSkipped: number;
  checkpointsWithoutCoordinates: number;
  checkpointsGeocodingSkipped: number;
  checkpointsGeocodingFailed: number;
  checkpointsHeuristicMatched: number;
  announcementsFound: number;
  announcementsUpserted: number;
  rssSourcesChecked: number;
  rssSourcesFailed: number;
  warnings: Array<{ checkpoint: string; error: string }>;
  errors: Array<{ checkpoint: string; error: string }>;
}

function isMissingCoordinateWarning(error: { error: string }): boolean {
  return /without coordinates|geocoding/i.test(error.error);
}

function getGeocodingSkippedWarning(checkpoint: string): { checkpoint: string; error: string } {
  return {
    checkpoint,
    error: 'Location intentionally not geocoded because the public source did not publish a specific mappable location',
  };
}

function isAggregatorSourceName(sourceName: unknown): boolean {
  if (typeof sourceName !== 'string') return false;
  const normalized = sourceName.trim().toLowerCase();
  return normalized === 'ovicheckpoint.com' || normalized === 'duiblock' || normalized === 'duiblock.com';
}

function isAggregatorSourceUrl(sourceUrl: unknown): boolean {
  if (typeof sourceUrl !== 'string') return false;
  const normalized = sourceUrl.trim().toLowerCase();
  return normalized.includes('ovicheckpoint.com') || normalized.includes('duiblock');
}

type ExistingCheckpointMatch = {
  matchKind: 'exact' | 'heuristic';
  row: {
    id: string;
    location_address: unknown;
    source_name: unknown;
    source_url: unknown;
    is_verified: unknown;
  };
};

function normalizeLocationAddress(value: unknown): string {
  if (typeof value !== 'string') return '';
  return value
    .toLowerCase()
    .replace(/&/g, ' and ')
    .replace(/\b(street|st)\.?\b/g, 'street')
    .replace(/\b(avenue|ave)\.?\b/g, 'avenue')
    .replace(/\b(road|rd)\.?\b/g, 'road')
    .replace(/\b(northwest|nw)\b/g, 'nw')
    .replace(/\b(northeast|ne)\b/g, 'ne')
    .replace(/\b(southwest|sw)\b/g, 'sw')
    .replace(/\b(southeast|se)\b/g, 'se')
    .replace(/[^a-z0-9]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function isSameCheckpointLocation(left: unknown, right: unknown): boolean {
  const a = normalizeLocationAddress(left);
  const b = normalizeLocationAddress(right);
  if (!a || !b) return false;
  if (a === b) return true;

  const minLength = Math.min(a.length, b.length);
  return minLength >= 18 && (a.includes(b) || b.includes(a));
}

async function findExistingCheckpointMatch(
  supabase: SupabaseAdminClient,
  input: {
    title: string;
    locationAddress: string;
    startDate: string;
    locationCounty: string;
    locationCity: string;
  }
): Promise<ExistingCheckpointMatch | null> {
  const { data: exact, error: exactError } = await supabase
    .from('dui_checkpoints')
    .select('id, location_address, source_name, source_url, is_verified')
    .eq('location_address', input.locationAddress)
    .eq('location_city', input.locationCity)
    .eq('start_date', input.startDate)
    .maybeSingle();

  if (exactError) throw exactError;
  if (exact) return { matchKind: 'exact', row: exact };

  const startTimeMs = new Date(input.startDate).getTime();
  if (Number.isNaN(startTimeMs)) return null;

  const windowHours = 48;
  const windowStart = new Date(startTimeMs - windowHours * 60 * 60 * 1000).toISOString();
  const windowEnd = new Date(startTimeMs + windowHours * 60 * 60 * 1000).toISOString();

  const { data: candidates, error: candidateError } = await supabase
    .from('dui_checkpoints')
    .select('id, location_address, source_name, source_url, is_verified, start_date')
    .eq('source_name', 'OVICheckpoint.com')
    .eq('title', input.title)
    .eq('location_county', input.locationCounty)
    .eq('location_city', input.locationCity)
    .gte('start_date', windowStart)
    .lte('start_date', windowEnd)
    .order('start_date', { ascending: true })
    .limit(5);

  if (candidateError) throw candidateError;
  if (!candidates?.length) return null;

  const best = (candidates as any[])
    .filter((row: any) => isSameCheckpointLocation(row.location_address, input.locationAddress))
    .map((row: any) => ({
      row,
      distance: Math.abs(new Date(row.start_date as string).getTime() - startTimeMs),
    }))
    .sort((a: { distance: number }, b: { distance: number }) => a.distance - b.distance)[0];

  if (!best) return null;

  return {
    matchKind: 'heuristic',
    row: {
      id: (best.row as any).id,
      location_address: (best.row as any).location_address,
      source_name: (best.row as any).source_name,
      source_url: (best.row as any).source_url,
      is_verified: (best.row as any).is_verified,
    },
  };
}

async function upsertAnnouncement(
  supabase: SupabaseAdminClient,
  payload: Record<string, unknown>
): Promise<{ ok: true } | { ok: false; error: string }> {
  const sourceUrl = typeof payload.source_url === 'string' ? payload.source_url : null;

  if (!sourceUrl) {
    const { error } = await supabase.from('dui_checkpoint_announcements').insert(payload);
    if (error) return { ok: false, error: error.message };
    return { ok: true };
  }

  const { error: upsertError } = await supabase
    .from('dui_checkpoint_announcements')
    .upsert(payload, { onConflict: 'source_url' });

  if (!upsertError) return { ok: true };

  // Fallback when the unique constraint is missing (common in drifted environments).
  if (!/unique|conflict|exclusion/i.test(upsertError.message)) {
    return { ok: false, error: upsertError.message };
  }

  const { data: existing, error: selectError } = await supabase
    .from('dui_checkpoint_announcements')
    .select('id')
    .eq('source_url', sourceUrl)
    .maybeSingle();

  if (selectError) return { ok: false, error: selectError.message };

  if (existing?.id) {
    const { error: updateError } = await supabase
      .from('dui_checkpoint_announcements')
      .update(payload)
      .eq('id', existing.id);
    if (updateError) return { ok: false, error: updateError.message };
    return { ok: true };
  }

  const { error: insertError } = await supabase.from('dui_checkpoint_announcements').insert(payload);
  if (insertError) return { ok: false, error: insertError.message };
  return { ok: true };
}

function stripUrlHash(sourceUrl: string): string {
  try {
    const parsed = new URL(sourceUrl);
    parsed.hash = '';
    return parsed.toString();
  } catch {
    return sourceUrl.split('#')[0] || sourceUrl;
  }
}

async function upsertCuratedCheckpoint(
  supabase: SupabaseAdminClient,
  mapboxToken: string | undefined,
  seed: CuratedAnnouncementSeed,
  stats: ScraperStats
): Promise<void> {
  if (
    !seed.startDate ||
    !seed.endDate ||
    !seed.locationText ||
    !seed.locationCity ||
    !seed.locationCounty
  ) {
    return;
  }

  const geocodingInput = {
    address: seed.locationText,
    city: seed.locationCity,
    county: seed.locationCounty,
  };
  const geocodingSkipped = shouldSkipCheckpointGeocoding(geocodingInput);
  const geocoded = geocodingSkipped
    ? null
    : await geocodeCheckpointLocation(geocodingInput, supabase, mapboxToken);

  const checkpointData = {
    title: seed.checkpointTitle ?? seed.title,
    location_address: seed.locationText,
    location_city: seed.locationCity,
    location_county: seed.locationCounty,
    latitude: geocoded?.latitude ?? null,
    longitude: geocoded?.longitude ?? null,
    start_date: seed.startDate,
    end_date: seed.endDate,
    status: determineStatus(seed.startDate, seed.endDate),
    source_url: stripUrlHash(seed.sourceUrl),
    source_name: seed.sourceName,
    description: seed.rawText || null,
    updated_at: new Date().toISOString(),
    geocoding_confidence: geocodingSkipped ? 'undisclosed' : geocoded?.confidence || 'none',
    last_geocoded_at: geocoded ? new Date().toISOString() : null,
  };

  const { data: existing, error: selectError } = await supabase
    .from('dui_checkpoints')
    .select('id')
    .eq('location_address', seed.locationText)
    .eq('location_city', seed.locationCity)
    .eq('start_date', seed.startDate)
    .maybeSingle();

  if (selectError) throw selectError;

  if (existing?.id) {
    const { error: updateError } = await supabase
      .from('dui_checkpoints')
      .update(checkpointData)
      .eq('id', existing.id);
    if (updateError) throw updateError;
    stats.checkpointsUpdated++;
  } else {
    const { error: insertError } = await supabase.from('dui_checkpoints').insert(checkpointData);
    if (insertError) {
      if (insertError.message.includes('unique_checkpoint_event')) {
        stats.checkpointsSkipped++;
        return;
      }
      throw insertError;
    }
    stats.checkpointsNew++;
  }

  if (!geocoded) {
    stats.checkpointsSkipped++;
    stats.checkpointsWithoutCoordinates++;

    if (geocodingSkipped) {
      stats.checkpointsGeocodingSkipped++;
      stats.warnings.push(getGeocodingSkippedWarning(seed.title));
    } else {
      stats.checkpointsGeocodingFailed++;
      stats.warnings.push({
        checkpoint: seed.title,
        error: 'Geocoding failed (saved without coordinates)',
      });
    }
  }
}

async function ingestCuratedAnnouncements(
  supabase: SupabaseAdminClient,
  mapboxToken: string | undefined,
  stats: ScraperStats
): Promise<void> {
  const seeds = loadCuratedAnnouncementSeeds();

  for (const seed of seeds) {
    stats.announcementsFound++;

    const payload = {
      title: seed.title,
      source_url: seed.sourceUrl,
      source_name: seed.sourceName,
      announcement_date: seed.announcementDate,
      event_date: seed.eventDate,
      start_date: seed.startDate,
      end_date: seed.endDate,
      location_text: seed.locationText,
      location_city: seed.locationCity,
      location_county: seed.locationCounty,
      status: seed.status,
      last_checked_at: new Date().toISOString(),
      raw_text: seed.rawText,
    };

    const announcementResult = await upsertAnnouncement(supabase, payload);
    if (!announcementResult.ok) {
      stats.errors.push({
        checkpoint: `Curated announcement upsert: ${seed.title}`,
        error: announcementResult.error,
      });
      continue;
    }
    stats.announcementsUpserted++;

    if (!seed.promoteToCheckpoint) continue;

    try {
      await upsertCuratedCheckpoint(supabase, mapboxToken, seed, stats);
    } catch (error) {
      stats.errors.push({
        checkpoint: `Curated checkpoint upsert: ${seed.title}`,
        error: error instanceof Error ? error.message : String(error),
      });
    }
  }
}

Deno.serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  const startTime = Date.now();
  const stats: ScraperStats = {
    checkpointsFound: 0,
    checkpointsNew: 0,
    checkpointsUpdated: 0,
    checkpointsSkipped: 0,
    checkpointsWithoutCoordinates: 0,
    checkpointsGeocodingSkipped: 0,
    checkpointsGeocodingFailed: 0,
    checkpointsHeuristicMatched: 0,
    announcementsFound: 0,
    announcementsUpserted: 0,
    rssSourcesChecked: 0,
    rssSourcesFailed: 0,
    warnings: [],
    errors: [],
  };

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL');
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
    const serperApiKey = Deno.env.get('SERPER_API_KEY');
    const mapboxToken =
      Deno.env.get('MAPBOX_PUBLIC_TOKEN') ||
      Deno.env.get('NEXT_PUBLIC_MAPBOX_PUBLIC_TOKEN') ||
      Deno.env.get('VITE_MAPBOX_PUBLIC_TOKEN');

    if (!supabaseUrl || !supabaseServiceKey) {
      throw new Error('Missing Supabase configuration');
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey);
    const auth = await requireAdmin(req, supabase, corsHeaders, {
      allowVerifiedServiceRoleJwt: true,
    });
    if (!auth.ok) {
      return auth.response;
    }

    const requestBody = req.method === 'POST' ? await req.json().catch(() => ({})) : {};
    const mode = requestBody?.mode === 'discovery' ? 'discovery' : 'core';
    const seedRow = typeof requestBody?.seedRow === 'number' ? requestBody.seedRow : undefined;
    const trigger =
      requestBody?.trigger === 'scheduler' || requestBody?.trigger === 'manual'
        ? requestBody.trigger
        : 'manual';

    const logId = crypto.randomUUID();
    const logStartTime = new Date().toISOString();

    const { error: logInsertError } = await supabase.from('scraper_logs').insert({
      id: logId,
      scraper_name: 'checkpoint-scraper',
      status: 'partial',
      started_at: logStartTime,
      metadata: { trigger, mode, seedRow, source: 'OVICheckpoint + RSS + curated + search' },
    });
    if (logInsertError) {
      console.error('Failed to create scraper log:', logInsertError);
    }

    console.log('Starting OVICheckpoint.com scraper...');
    const rawCheckpoints = await scrapeOVICheckpoint();
    stats.checkpointsFound = rawCheckpoints.length;

    console.log(`Processing ${rawCheckpoints.length} checkpoints...`);

    for (const raw of rawCheckpoints) {
      try {
        const { address, city, county } = parseAddress(raw.location);
        const geocodingInput = { address, city, county };
        const geocodingSkipped = shouldSkipCheckpointGeocoding(geocodingInput);
        const geocoded = geocodingSkipped
          ? null
          : await geocodeCheckpointLocation(geocodingInput, supabase, mapboxToken);

        if (!geocoded) {
          console.warn(`Checkpoint has no geocode (still saving): ${raw.title}`);
        }

        const checkpointData = {
          title: raw.title,
          location_address: address,
          location_city: city,
          location_county: county,
          latitude: geocoded?.latitude ?? null,
          longitude: geocoded?.longitude ?? null,
          start_date: raw.startDate,
          end_date: raw.endDate,
          status: determineStatus(raw.startDate, raw.endDate),
          source_url: raw.sourceUrl,
          source_name: 'OVICheckpoint.com',
          description: raw.description || null,
          updated_at: new Date().toISOString(),
          geocoding_confidence: geocodingSkipped ? 'undisclosed' : geocoded?.confidence || 'none',
          last_geocoded_at: geocoded ? new Date().toISOString() : null,
        };

        const match = await findExistingCheckpointMatch(supabase, {
          title: raw.title,
          locationAddress: address,
          startDate: raw.startDate,
          locationCounty: county,
          locationCity: city,
        });

        if (match) {
          if (match.matchKind === 'heuristic') stats.checkpointsHeuristicMatched++;

          const existingSourceName = match.row?.source_name as unknown;
          const existingSourceUrl = match.row?.source_url as unknown;
          const hasCuratedSourceName = typeof existingSourceName === 'string' && !isAggregatorSourceName(existingSourceName);
          const hasCuratedSourceUrl = typeof existingSourceUrl === 'string' && !isAggregatorSourceUrl(existingSourceUrl);

          const updatePayload =
            hasCuratedSourceName || hasCuratedSourceUrl
              ? {
                  ...checkpointData,
                  source_name: hasCuratedSourceName ? existingSourceName : checkpointData.source_name,
                  source_url: hasCuratedSourceUrl ? existingSourceUrl : checkpointData.source_url,
                }
              : checkpointData;

          const { error: updateError } = await supabase
            .from('dui_checkpoints')
            .update(updatePayload)
            .eq('id', match.row.id);

          if (updateError) throw updateError;
          stats.checkpointsUpdated++;
          console.log(`Updated (${match.matchKind}): ${raw.title}`);
        } else {
          // Attempt insert, handling unique constraint if heuristic match failed but exact DB conflict exists
          const { error: insertError } = await supabase
            .from('dui_checkpoints')
            .insert(checkpointData);

          if (insertError) {
            if (insertError.message.includes('unique_checkpoint_event')) {
              console.log(`Skipping duplicate (constraint): ${raw.title}`);
              stats.checkpointsSkipped++;
              continue;
            }
            throw insertError;
          }
          stats.checkpointsNew++;
          console.log(`Inserted: ${raw.title}`);
        }

        if (!geocoded) {
          stats.checkpointsSkipped++;
          stats.checkpointsWithoutCoordinates++;

          if (geocodingSkipped) {
            stats.checkpointsGeocodingSkipped++;
            stats.warnings.push(getGeocodingSkippedWarning(raw.title));
          } else {
            stats.checkpointsGeocodingFailed++;
            stats.warnings.push({
              checkpoint: raw.title,
              error: 'Geocoding failed (saved without coordinates)',
            });
          }
        }
      } catch (error) {
        console.error(`Error processing checkpoint: ${raw.title}`, error);
        stats.errors.push({
          checkpoint: raw.title,
          error: error instanceof Error ? error.message : String(error),
        });
      }
    }

    // RSS ingestion (announcements)
    try {
      if (mode === 'core') {
        const sources = await loadMasterRssSources();
        const results = await scrapeRssSources(sources, {
          maxSources: sources.length,
          maxAgeDays: RSS_ANNOUNCEMENT_LOOKBACK_DAYS,
        });
        stats.rssSourcesChecked += results.length;

        for (const r of results) {
          if (r.error) {
            stats.rssSourcesFailed++;
            stats.warnings.push({ checkpoint: `RSS: ${r.source.sourceName}`, error: r.error });
            continue;
          }
          stats.announcementsFound += r.items.length;

          for (const item of r.items.slice(0, 25)) {
            const payload = {
              title: item.title,
              source_url: item.url,
              source_name: r.source.sourceName,
              announcement_date: item.publishedAt,
              status: 'pending_details',
              last_checked_at: new Date().toISOString(),
              raw_text: item.summary,
            };

            const res = await upsertAnnouncement(supabase, payload);
            if (!res.ok) {
              stats.errors.push({
                checkpoint: `Announcement upsert: ${item.title}`,
                error: res.error,
              });
            } else {
              stats.announcementsUpserted++;
            }
          }
        }
      } else {
        const seeds = await loadSeedSources(seedRow);
        const seedResults = await scrapeSeedSources(seeds, { maxUniqueUrls: 12 });
        const seedUrlsChecked = new Set(seedResults.map((r) => r.seed.rssUrl));
        const seedUrlsFailed = new Set(seedResults.filter((r) => r.error).map((r) => r.seed.rssUrl));
        stats.rssSourcesChecked += seedUrlsChecked.size;
        stats.rssSourcesFailed += seedUrlsFailed.size;

        for (const r of seedResults) {
          if (r.error) {
            stats.warnings.push({ checkpoint: `RSS seed ${r.seed.seedRow}: ${r.seed.sourceName}`, error: r.error });
            continue;
          }
          stats.announcementsFound += r.items.length;

          for (const item of r.items.slice(0, 10)) {
            const payload = {
              title: item.title,
              source_url: item.url,
              source_name: r.seed.sourceName,
              announcement_date: item.publishedAt,
              event_date: null,
              location_city: r.seed.city,
              location_county: r.seed.county,
              status: 'pending_details',
              last_checked_at: new Date().toISOString(),
              raw_text: item.summary,
            };

            const res = await upsertAnnouncement(supabase, payload);
            if (!res.ok) {
              stats.errors.push({
                checkpoint: `Announcement upsert: ${item.title}`,
                error: res.error,
              });
            } else {
              stats.announcementsUpserted++;
            }
          }
        }
      }

      if (mode === 'core' && serperApiKey) {
        try {
          const searchAnnouncements = await discoverCheckpointAnnouncements(serperApiKey);
          stats.announcementsFound += searchAnnouncements.length;

          for (const candidate of searchAnnouncements) {
            const res = await upsertAnnouncement(supabase, {
              title: candidate.title,
              source_url: candidate.url,
              source_name: candidate.sourceName,
              announcement_date: candidate.publishedAt,
              status: 'pending_details',
              last_checked_at: new Date().toISOString(),
              raw_text: `Search query: ${candidate.query}\n${candidate.summary || ''}`.trim(),
            });

            if (!res.ok) {
              stats.errors.push({
                checkpoint: `Search announcement upsert: ${candidate.title}`,
                error: res.error,
              });
            } else {
              stats.announcementsUpserted++;
            }
          }
        } catch (error) {
          stats.warnings.push({
            checkpoint: 'Search discovery',
            error: error instanceof Error ? error.message : String(error),
          });
        }
      }

      if (mode === 'core') {
        await ingestCuratedAnnouncements(supabase, mapboxToken, stats);
      }
    } catch (e) {
      stats.errors.push({
        checkpoint: 'RSS ingestion',
        error: e instanceof Error ? e.message : String(e),
      });
    }

    const duration = Date.now() - startTime;
    const didWork = stats.checkpointsNew + stats.checkpointsUpdated + stats.announcementsUpserted > 0;
    const healthInput = {
      didWork,
      blockingErrorCount: stats.errors.length,
      warningCount: stats.warnings.length,
    };
    const finalStatus = determineScraperRunStatus(healthInput);
    const health = determineScraperHealth(healthInput);
    const warningSamples = stats.warnings.filter((warning) => !isMissingCoordinateWarning(warning)).slice(0, 10);

    const { error: logUpdateError } = await supabase
      .from('scraper_logs')
      .update({
        status: finalStatus,
        completed_at: new Date().toISOString(),
        duration_ms: duration,
        checkpoints_found: stats.checkpointsFound,
        checkpoints_new: stats.checkpointsNew,
        checkpoints_updated: stats.checkpointsUpdated,
        errors: stats.errors,
        metadata: {
          trigger,
          triggered_by: auth.admin.userEmail,
          triggered_by_role: auth.admin.role,
          health,
          warnings_count: stats.warnings.length,
          warnings_sample: warningSamples,
          geocoding_warnings_count: stats.warnings.filter(isMissingCoordinateWarning).length,
          errors_count: stats.errors.length,
          checkpoints_skipped: stats.checkpointsSkipped,
          checkpoints_without_coordinates: stats.checkpointsWithoutCoordinates,
          checkpoints_geocoding_skipped: stats.checkpointsGeocodingSkipped,
          checkpoints_geocoding_failed: stats.checkpointsGeocodingFailed,
          checkpoints_heuristic_matched: stats.checkpointsHeuristicMatched,
          announcements_found: stats.announcementsFound,
          announcements_upserted: stats.announcementsUpserted,
          rss_sources_checked: stats.rssSourcesChecked,
          rss_sources_failed: stats.rssSourcesFailed,
          mode,
          seedRow,
        },
      })
      .eq('id', logId);

    if (logUpdateError) {
      console.error('Failed to update scraper log:', logUpdateError);
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: `Scraper completed: ${stats.checkpointsNew} new, ${stats.checkpointsUpdated} updated`,
        status: finalStatus,
        health,
        stats,
        duration_ms: duration,
        triggered_by: auth.admin.userEmail,
      }),
      {
        status: 200,
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
      }
    );
  } catch (error) {
    console.error('Scraper fatal error:', error);

    const duration = Date.now() - startTime;

    return new Response(
      JSON.stringify({
        success: false,
        error: error instanceof Error ? error.message : String(error),
        stats,
        duration_ms: duration,
      }),
      {
        status: 500,
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
      }
    );
  }
});

function determineStatus(startDate: string, endDate: string): 'upcoming' | 'active' | 'completed' | 'cancelled' {
  const now = new Date();
  const start = new Date(startDate);
  const end = new Date(endDate);

  if (now < start) {
    return 'upcoming';
  } else if (now >= start && now <= end) {
    return 'active';
  } else {
    return 'completed';
  }
}
