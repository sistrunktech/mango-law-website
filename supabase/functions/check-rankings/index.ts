import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Client-Info, Apikey',
};

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL') ?? '';
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '';
    const serperApiKey = Deno.env.get('SERPER_API_KEY');

    if (!supabaseUrl || !supabaseServiceKey || !serperApiKey) {
      throw new Error('Missing Supabase or Serper configuration');
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // 1. Fetch active keywords
    const { data: keywords, error: kwError } = await supabase
      .from('seo_keywords')
      .select('*')
      .eq('is_active', true);

    if (kwError) throw kwError;

    const results = [];

    for (const kw of keywords || []) {
      try {
        console.log(`Checking rankings for: ${kw.keyword} in ${kw.location_context}`);
        
        // 2. Call Serper.dev
        const response = await fetch('https://google.serper.dev/search', {
          method: 'POST',
          headers: {
            'X-API-KEY': serperApiKey,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            q: kw.keyword,
            gl: 'us',
            hl: 'en',
            location: kw.location_context,
            num: 100
          })
        });

        if (!response.ok) {
          const errText = await response.text();
          throw new Error(`Serper API error: ${errText}`);
        }

        const data = await response.json();
        
        // 3. Find target domain in organic results
        const targetDomain = kw.target_url || 'mango.law';
        let organicRank = null;
        
        if (data.organic) {
          const mangoResult = data.organic.find((r: any) => r.link.toLowerCase().includes(targetDomain.toLowerCase()));
          if (mangoResult) organicRank = mangoResult.position;
        }

        // 4. Check Local Pack (Map Pack)
        const inLocalPack = data.places?.some((p: any) => p.title.toLowerCase().includes('mango law')) ?? false;

        // 5. Insert ranking record
        const { error: rankError } = await supabase.from('seo_rankings').insert({
          keyword_id: kw.id,
          rank: organicRank,
          is_local_pack: inLocalPack,
          serp_data: data
        });

        if (rankError) throw rankError;

        results.push({
          keyword: kw.keyword,
          rank: organicRank,
          inLocalPack,
          status: 'success'
        });

      } catch (err) {
        console.error(`Error checking keyword "${kw.keyword}":`, err);
        results.push({
          keyword: kw.keyword,
          error: err instanceof Error ? err.message : String(err),
          status: 'failed'
        });
      }
    }

    return new Response(JSON.stringify({ 
      success: true, 
      processed: results.length,
      results 
    }), { 
      headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
    });

  } catch (error) {
    console.error('Fatal error in check-rankings:', error);
    return new Response(JSON.stringify({ 
      success: false, 
      error: error instanceof Error ? error.message : String(error) 
    }), { 
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
    });
  }
});
