import { createClient } from 'npm:@supabase/supabase-js@2';
import { scrapeOVICheckpoint } from './ovicheckpoint-scraper.ts';
import { geocodeAddress, parseAddress } from './geocoding.ts';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Client-Info, Apikey',
};

interface ScraperStats {
  checkpointsFound: number;
  checkpointsNew: number;
  checkpointsUpdated: number;
  checkpointsSkipped: number;
  errors: Array<{ checkpoint: string; error: string }>;
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
    errors: [],
  };

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL');
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
    const mapboxToken = Deno.env.get('MAPBOX_PUBLIC_TOKEN') || Deno.env.get('VITE_MAPBOX_PUBLIC_TOKEN');

    if (!supabaseUrl || !supabaseServiceKey) {
      throw new Error('Missing Supabase configuration');
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const logId = crypto.randomUUID();
    const logStartTime = new Date().toISOString();

    await supabase.from('scraper_logs').insert({
      id: logId,
      scraper_name: 'ovicheckpoint',
      status: 'partial',
      started_at: logStartTime,
      metadata: { trigger: 'manual' },
    });

    console.log('Starting OVICheckpoint.com scraper...');
    const rawCheckpoints = await scrapeOVICheckpoint();
    stats.checkpointsFound = rawCheckpoints.length;

    console.log(`Processing ${rawCheckpoints.length} checkpoints...`);

    for (const raw of rawCheckpoints) {
      try {
        const { address, city, county } = parseAddress(raw.location);

        const fullAddress = `${address}, ${city}, Ohio`;
        const geocoded = await geocodeAddress(fullAddress, supabase, mapboxToken);

        if (!geocoded) {
          console.warn(`Skipping checkpoint (no geocode): ${raw.title}`);
          stats.checkpointsSkipped++;
          stats.errors.push({
            checkpoint: raw.title,
            error: 'Geocoding failed',
          });
          continue;
        }

        const checkpointData = {
          title: raw.title,
          location_address: address,
          location_city: city,
          location_county: county,
          latitude: geocoded.latitude,
          longitude: geocoded.longitude,
          start_date: raw.startDate,
          end_date: raw.endDate,
          status: determineStatus(raw.startDate, raw.endDate),
          source_url: raw.sourceUrl,
          source_name: 'OVICheckpoint.com',
          description: raw.description || null,
          updated_at: new Date().toISOString(),
        };

        const { data: existing, error: searchError } = await supabase
          .from('dui_checkpoints')
          .select('id')
          .eq('title', raw.title)
          .eq('start_date', raw.startDate)
          .maybeSingle();

        if (searchError) {
          throw searchError;
        }

        if (existing) {
          const { error: updateError } = await supabase
            .from('dui_checkpoints')
            .update(checkpointData)
            .eq('id', existing.id);

          if (updateError) throw updateError;
          stats.checkpointsUpdated++;
          console.log(`Updated: ${raw.title}`);
        } else {
          const { error: insertError } = await supabase
            .from('dui_checkpoints')
            .insert(checkpointData);

          if (insertError) throw insertError;
          stats.checkpointsNew++;
          console.log(`Inserted: ${raw.title}`);
        }
      } catch (error) {
        console.error(`Error processing checkpoint: ${raw.title}`, error);
        stats.errors.push({
          checkpoint: raw.title,
          error: error instanceof Error ? error.message : String(error),
        });
      }
    }

    const duration = Date.now() - startTime;
    const finalStatus = stats.errors.length === 0 ? 'success' :
                       stats.checkpointsNew + stats.checkpointsUpdated > 0 ? 'partial' : 'failed';

    await supabase
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
          trigger: 'manual',
          skipped: stats.checkpointsSkipped,
        },
      })
      .eq('id', logId);

    return new Response(
      JSON.stringify({
        success: true,
        message: `Scraper completed: ${stats.checkpointsNew} new, ${stats.checkpointsUpdated} updated`,
        stats,
        duration_ms: duration,
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
