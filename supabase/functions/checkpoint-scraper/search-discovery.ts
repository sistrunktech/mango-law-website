export interface SearchOrganicResult {
  title?: string;
  link?: string;
  snippet?: string;
  date?: string;
}

export interface SearchAnnouncementCandidate {
  title: string;
  url: string;
  summary: string | null;
  sourceName: string;
  query: string;
  publishedAt: string | null;
}

const SEARCH_LOCATION = 'Columbus, Ohio, United States';
const SEARCH_QUERIES = ['ovi checkpoints ohio', 'dui checkpoint ohio', 'sobriety checkpoint ohio', 'site:reddit.com ovi checkpoint ohio', 'site:facebook.com ovi checkpoint ohio'];
const CHECKPOINT_NEEDLES = ['ovi checkpoint', 'dui checkpoint', 'sobriety checkpoint', 'traffic safety checkpoint', 'checkpoint tonight', 'checkpoint friday', 'checkpoint saturday', 'checkpoint sunday'];
const NOISE_NEEDLES = ['stopdrinking', 'sobriety journey', 'addiction recovery', 'sober living', 'aa meeting', 'rehab', 'alcoholic'];

function canonicalizeUrl(input: string): string {
  try {
    const url = new URL(input);
    for (const key of [...url.searchParams.keys()]) {
      if (key.startsWith('utm_') || key === 'fbclid' || key === 'gclid') {
        url.searchParams.delete(key);
      }
    }
    if ([...url.searchParams.keys()].length === 0) url.search = '';
    url.hash = '';
    return url.toString();
  } catch {
    return input;
  }
}

function getSourceName(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, '');
  } catch {
    return 'search-result';
  }
}

function toPublishedAt(input: string | undefined): string | null {
  if (!input) return null;
  const parsed = new Date(input);
  return Number.isNaN(parsed.getTime()) ? null : parsed.toISOString();
}

export function collectCheckpointSearchCandidates(
  query: string,
  organic: SearchOrganicResult[],
  seenUrls = new Set<string>()
): SearchAnnouncementCandidate[] {
  const out: SearchAnnouncementCandidate[] = [];

  for (const result of organic) {
    if (!result.link || !result.title) continue;

    const url = canonicalizeUrl(result.link);
    if (!url || seenUrls.has(url)) continue;

    const combined = `${result.title}\n${result.snippet || ''}\n${url}`.toLowerCase();
    if (!CHECKPOINT_NEEDLES.some((needle) => combined.includes(needle))) continue;
    if (NOISE_NEEDLES.some((needle) => combined.includes(needle))) continue;

    seenUrls.add(url);
    out.push({ title: result.title, url, summary: result.snippet?.trim() || null, sourceName: getSourceName(url), query, publishedAt: toPublishedAt(result.date) });
  }

  return out;
}

export async function discoverCheckpointAnnouncements(
  serperApiKey: string,
  fetchImpl: typeof fetch = fetch
): Promise<SearchAnnouncementCandidate[]> {
  const candidates: SearchAnnouncementCandidate[] = [];
  const seenUrls = new Set<string>();

  for (const query of SEARCH_QUERIES) {
    const response = await fetchImpl('https://google.serper.dev/search', {
      method: 'POST',
      headers: {
        'X-API-KEY': serperApiKey,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ q: query, gl: 'us', hl: 'en', location: SEARCH_LOCATION, num: 30 }),
    });

    if (!response.ok) {
      throw new Error(`Serper discovery failed (${response.status}) for query: ${query}`);
    }

    const data = (await response.json()) as { organic?: SearchOrganicResult[] };
    candidates.push(...collectCheckpointSearchCandidates(query, data.organic || [], seenUrls));
  }

  return candidates;
}
