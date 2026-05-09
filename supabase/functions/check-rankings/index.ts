import {
  createSupabaseAdminClient,
  requireAdmin,
} from '../_shared/admin-auth.ts';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Client-Info, Apikey',
};

type KeywordRow = {
  id: string;
  keyword: string;
  location_context: string | null;
  target_url: string | null;
};

type SerperOrganicResult = {
  link?: string;
  position?: number;
};

type SerperPlaceResult = {
  title?: string;
};

type SerperResponse = {
  organic?: SerperOrganicResult[];
  places?: SerperPlaceResult[];
};

type OrganicMatch = {
  rank: number | null;
  targetDomain: string;
  matchedUrl: string | null;
  matchType: 'exact_url' | 'same_domain' | 'same_domain_other_url' | 'none';
  domainVisibleRank: number | null;
};

type CheckResult =
  | {
      keyword: string;
      status: 'success';
      rank: number | null;
      inLocalPack: boolean;
      targetDomain: string;
      targetUrl: string | null;
      matchedUrl: string | null;
      matchType: OrganicMatch['matchType'];
    }
  | {
      keyword: string;
      status: 'failed';
      error: string;
    };

function getEnvLoose(name: string): string {
  const direct = Deno.env.get(name);
  if (direct) return direct;

  const env = Deno.env.toObject();
  const foundKey = Object.keys(env).find((key) => key.trim() === name);
  if (!foundKey) return '';

  const value = env[foundKey];
  if (value) {
    console.warn(`Using normalized env key "${foundKey}" for "${name}"`);
  }
  return value ?? '';
}

function normalizeTargetDomain(targetUrl?: string | null): string {
  const fallback = 'mango.law';
  if (!targetUrl) return fallback;

  try {
    const parsed = new URL(targetUrl);
    return parsed.hostname.toLowerCase().replace(/^www\./, '');
  } catch {
    return targetUrl.toLowerCase().replace(/^https?:\/\//, '').replace(/^www\./, '').split('/')[0] || fallback;
  }
}

function normalizeUrl(input?: string | null): URL | null {
  if (!input) return null;

  try {
    const parsed = new URL(input);
    parsed.hash = '';
    parsed.search = '';
    parsed.hostname = parsed.hostname.toLowerCase().replace(/^www\./, '');
    parsed.pathname = parsed.pathname === '/' ? '/' : parsed.pathname.replace(/\/+$/, '');
    return parsed;
  } catch {
    try {
      const parsed = new URL(`https://${input.replace(/^https?:\/\//, '')}`);
      parsed.hash = '';
      parsed.search = '';
      parsed.hostname = parsed.hostname.toLowerCase().replace(/^www\./, '');
      parsed.pathname = parsed.pathname === '/' ? '/' : parsed.pathname.replace(/\/+$/, '');
      return parsed;
    } catch {
      return null;
    }
  }
}

function isDomainMatch(hostname: string, targetDomain: string) {
  return hostname === targetDomain || hostname.endsWith(`.${targetDomain}`);
}

function resolveOrganicMatch(organic: SerperOrganicResult[] | undefined, targetUrl?: string | null): OrganicMatch {
  const targetDomain = normalizeTargetDomain(targetUrl);
  const normalizedTargetUrl = normalizeUrl(targetUrl);

  if (!Array.isArray(organic) || organic.length === 0) {
    return {
      rank: null,
      targetDomain,
      matchedUrl: null,
      matchType: 'none',
      domainVisibleRank: null,
    };
  }

  let sameDomainCandidate: { rank: number; matchedUrl: string } | null = null;

  for (const result of organic) {
    if (!result.link || typeof result.position !== 'number') continue;

    const normalizedResultUrl = normalizeUrl(result.link);
    if (!normalizedResultUrl) {
      if (!sameDomainCandidate && result.link.toLowerCase().includes(targetDomain)) {
        sameDomainCandidate = { rank: result.position, matchedUrl: result.link };
      }
      continue;
    }

    if (!isDomainMatch(normalizedResultUrl.hostname, targetDomain)) {
      continue;
    }

    if (!sameDomainCandidate) {
      sameDomainCandidate = { rank: result.position, matchedUrl: result.link };
    }

    if (
      normalizedTargetUrl &&
      normalizedResultUrl.hostname === normalizedTargetUrl.hostname &&
      normalizedResultUrl.pathname === normalizedTargetUrl.pathname
    ) {
      return {
        rank: result.position,
        targetDomain,
        matchedUrl: result.link,
        matchType: 'exact_url',
        domainVisibleRank: sameDomainCandidate.rank,
      };
    }
  }

  if (!sameDomainCandidate) {
    return {
      rank: null,
      targetDomain,
      matchedUrl: null,
      matchType: 'none',
      domainVisibleRank: null,
    };
  }

  if (!normalizedTargetUrl || normalizedTargetUrl.pathname === '/') {
    return {
      rank: sameDomainCandidate.rank,
      targetDomain,
      matchedUrl: sameDomainCandidate.matchedUrl,
      matchType: 'same_domain',
      domainVisibleRank: sameDomainCandidate.rank,
    };
  }

  return {
    rank: null,
    targetDomain,
    matchedUrl: sameDomainCandidate.matchedUrl,
    matchType: 'same_domain_other_url',
    domainVisibleRank: sameDomainCandidate.rank,
  };
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  try {
    const supabase = createSupabaseAdminClient();
    const auth = await requireAdmin(req, supabase, corsHeaders, {
      allowVerifiedServiceRoleJwt: true,
    });
    if (!auth.ok) {
      return auth.response;
    }

    const serperApiKey = getEnvLoose('SERPER_API_KEY');

    if (!serperApiKey) {
      throw new Error('Missing required configuration: SERPER_API_KEY');
    }

    // 1. Fetch active keywords
    const { data: keywords, error: kwError } = await supabase
      .from('seo_keywords')
      .select('id, keyword, location_context, target_url')
      .eq('is_active', true);

    if (kwError) throw kwError;
    const keywordRows = (keywords ?? []) as KeywordRow[];

    if (keywordRows.length === 0) {
      return new Response(
        JSON.stringify({
          success: true,
          processed: 0,
          successCount: 0,
          failureCount: 0,
          results: [],
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const results: CheckResult[] = [];

    for (const kw of keywordRows) {
      try {
        console.log(`Checking rankings for: ${kw.keyword} in ${kw.location_context}`);

        // 2. Call Serper.dev
        const response = await fetch('https://google.serper.dev/search', {
          method: 'POST',
          headers: {
            'X-API-KEY': serperApiKey,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            q: kw.keyword,
            gl: 'us',
            hl: 'en',
            location: kw.location_context ?? 'Delaware, Ohio, United States',
            num: 100,
          }),
        });

        if (!response.ok) {
          const errText = await response.text();
          throw new Error(`Serper API error: ${errText}`);
        }

        const data = (await response.json()) as SerperResponse;

        // 3. Find the intended target URL in organic results
        const organicMatch = resolveOrganicMatch(data.organic, kw.target_url);

        // 4. Check Local Pack (Map Pack)
        const inLocalPack =
          data.places?.some((place) => (place.title ?? '').toLowerCase().includes('mango law')) ?? false;

        const serpDataWithSummary = {
          ...data,
          _summary: {
            keyword: kw.keyword,
            locationContext: kw.location_context ?? 'Delaware, Ohio, United States',
            targetUrl: kw.target_url,
            targetDomain: organicMatch.targetDomain,
            matchedUrl: organicMatch.matchedUrl,
            matchType: organicMatch.matchType,
            rank: organicMatch.rank,
            domainVisibleRank: organicMatch.domainVisibleRank,
          },
        };

        // 5. Insert ranking record
        const { error: rankError } = await supabase.from('seo_rankings').insert({
          keyword_id: kw.id,
          rank: organicMatch.rank,
          is_local_pack: inLocalPack,
          serp_data: serpDataWithSummary,
        });

        if (rankError) throw rankError;

        results.push({
          keyword: kw.keyword,
          targetDomain: organicMatch.targetDomain,
          targetUrl: kw.target_url,
          matchedUrl: organicMatch.matchedUrl,
          matchType: organicMatch.matchType,
          rank: organicMatch.rank,
          inLocalPack,
          status: 'success',
        });
      } catch (err) {
        console.error(`Error checking keyword "${kw.keyword}":`, err);
        results.push({
          keyword: kw.keyword,
          error: err instanceof Error ? err.message : String(err),
          status: 'failed',
        });
      }
    }

    const successCount = results.filter((result) => result.status === 'success').length;
    const failureCount = results.length - successCount;
    const allFailed = results.length > 0 && failureCount === results.length;
    const partialFailure = failureCount > 0 && successCount > 0;

    return new Response(JSON.stringify({ 
      success: !allFailed,
      processed: results.length,
      successCount,
      failureCount,
      status: allFailed ? 'failed' : partialFailure ? 'partial' : 'success',
      results 
    }), { 
      status: allFailed ? 502 : 200,
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
