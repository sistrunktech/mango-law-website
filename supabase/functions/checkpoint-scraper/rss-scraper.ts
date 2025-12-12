import type { RssSource, SeedSource } from './rss-sources.ts';

export interface RssItemCandidate {
  title: string;
  url: string;
  publishedAt: string | null;
  summary: string | null;
}

const DEFAULT_KEYWORDS = [
  'sobriety checkpoint',
  'ovi checkpoint',
  'dui checkpoint',
  'impaired driving checkpoint',
  'traffic safety checkpoint',
  'drive sober',
  'ovi task force',
  'checkpoint',
];

function canonicalizeUrl(input: string): string {
  try {
    const u = new URL(input);
    const strip = new Set([
      'utm_source',
      'utm_medium',
      'utm_campaign',
      'utm_term',
      'utm_content',
      'fbclid',
      'gclid',
      'mc_cid',
      'mc_eid',
      'ref',
      'ref_src',
    ]);
    for (const key of [...u.searchParams.keys()]) {
      if (strip.has(key)) u.searchParams.delete(key);
    }
    if ([...u.searchParams.keys()].length === 0) u.search = '';
    return u.toString();
  } catch {
    return input;
  }
}

function textIncludesAny(text: string, keywords: string[]): boolean {
  const haystack = text.toLowerCase();
  return keywords.some((k) => haystack.includes(k.toLowerCase()));
}

function stripHtml(input: string): string {
  return input.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
}

function extractLink(el: Element): string | null {
  const linkEl = el.querySelector('link');
  if (!linkEl) return null;
  const href = linkEl.getAttribute('href');
  if (href) return href.trim();
  const txt = linkEl.textContent?.trim();
  return txt || null;
}

function extractText(el: Element, selector: string): string | null {
  const t = el.querySelector(selector)?.textContent?.trim();
  return t ? t : null;
}

async function fetchRss(url: string): Promise<string> {
  const res = await fetch(url, {
    headers: {
      'user-agent': 'MangoLawCheckpointBot/1.0 (+https://mango.law/resources/dui-checkpoints)',
      accept: 'application/rss+xml, application/atom+xml, application/xml, text/xml, */*',
    },
  });
  if (!res.ok) throw new Error(`RSS fetch failed (${res.status}): ${url}`);
  return await res.text();
}

export async function scrapeRssSources(
  sources: RssSource[],
  opts?: { keywordOverride?: string[]; maxSources?: number }
): Promise<Array<{ source: RssSource; items: RssItemCandidate[]; error?: string }>> {
  const maxSources = opts?.maxSources ?? sources.length;
  const keywords = opts?.keywordOverride?.length ? opts.keywordOverride : DEFAULT_KEYWORDS;

  const results: Array<{ source: RssSource; items: RssItemCandidate[]; error?: string }> = [];
  for (const source of sources.slice(0, maxSources)) {
    try {
      const xml = await fetchRss(source.rssUrl);
      const doc = new DOMParser().parseFromString(xml, 'text/xml');
      if (!doc) throw new Error('XML parse failed');

      const rssItems = [...doc.querySelectorAll('item')];
      const atomEntries = rssItems.length === 0 ? [...doc.querySelectorAll('entry')] : [];
      const els = rssItems.length > 0 ? rssItems : atomEntries;

      const items: RssItemCandidate[] = [];
      for (const el of els) {
        const title = extractText(el, 'title');
        const url = extractLink(el);
        if (!title || !url) continue;

        const pubDate =
          extractText(el, 'pubDate') ||
          extractText(el, 'published') ||
          extractText(el, 'updated');
        const summary =
          extractText(el, 'description') ||
          extractText(el, 'summary') ||
          extractText(el, 'content') ||
          extractText(el, 'content\\:encoded');

        const combined = `${title}\n${summary || ''}`;
        if (!textIncludesAny(combined, keywords)) continue;

        const normalizedUrl = canonicalizeUrl(url);
        items.push({
          title: stripHtml(title),
          url: normalizedUrl,
          publishedAt: pubDate ? new Date(pubDate).toISOString() : null,
          summary: summary ? stripHtml(summary) : null,
        });
      }

      results.push({ source, items });
    } catch (e) {
      results.push({
        source,
        items: [],
        error: e instanceof Error ? e.message : String(e),
      });
    }
  }

  return results;
}

export async function scrapeSeedSources(
  seedSources: SeedSource[],
  opts?: { maxUniqueUrls?: number }
): Promise<Array<{ seed: SeedSource; items: RssItemCandidate[]; error?: string }>> {
  const maxUniqueUrls = opts?.maxUniqueUrls ?? 10;

  // Only fetch a limited number of unique URLs to avoid timeouts
  const uniqueUrls: string[] = [];
  for (const s of seedSources) {
    if (!uniqueUrls.includes(s.rssUrl)) uniqueUrls.push(s.rssUrl);
    if (uniqueUrls.length >= maxUniqueUrls) break;
  }

  const byUrl = new Map<string, SeedSource[]>();
  for (const s of seedSources) {
    if (!uniqueUrls.includes(s.rssUrl)) continue;
    const list = byUrl.get(s.rssUrl) || [];
    list.push(s);
    byUrl.set(s.rssUrl, list);
  }

  const out: Array<{ seed: SeedSource; items: RssItemCandidate[]; error?: string }> = [];
  for (const [rssUrl, seeds] of byUrl.entries()) {
    const keywordSet = new Set<string>();
    for (const seed of seeds) {
      for (const k of seed.filterKeywords) keywordSet.add(k);
    }
    const keywords = keywordSet.size > 0 ? [...keywordSet] : DEFAULT_KEYWORDS;

    try {
      const xml = await fetchRss(rssUrl);
      const doc = new DOMParser().parseFromString(xml, 'text/xml');
      if (!doc) throw new Error('XML parse failed');

      const rssItems = [...doc.querySelectorAll('item')];
      const atomEntries = rssItems.length === 0 ? [...doc.querySelectorAll('entry')] : [];
      const els = rssItems.length > 0 ? rssItems : atomEntries;

      const candidates: RssItemCandidate[] = [];
      for (const el of els) {
        const title = extractText(el, 'title');
        const url = extractLink(el);
        if (!title || !url) continue;

        const pubDate =
          extractText(el, 'pubDate') ||
          extractText(el, 'published') ||
          extractText(el, 'updated');
        const summary =
          extractText(el, 'description') ||
          extractText(el, 'summary') ||
          extractText(el, 'content') ||
          extractText(el, 'content\\:encoded');

        const combined = `${title}\n${summary || ''}`;
        if (!textIncludesAny(combined, keywords)) continue;

        candidates.push({
          title: stripHtml(title),
          url: canonicalizeUrl(url),
          publishedAt: pubDate ? new Date(pubDate).toISOString() : null,
          summary: summary ? stripHtml(summary) : null,
        });
      }

      // Apply seed-specific location filtering heuristics
      for (const seed of seeds) {
        const countyNeedle = `${seed.county} county`.toLowerCase();
        const cityNeedle = seed.city ? seed.city.toLowerCase() : null;
        const filtered = candidates.filter((c) => {
          const t = `${c.title}\n${c.summary || ''}`.toLowerCase();
          return t.includes(countyNeedle) || (cityNeedle ? t.includes(cityNeedle) : false);
        });
        out.push({ seed, items: filtered });
      }
    } catch (e) {
      for (const seed of seeds) {
        out.push({ seed, items: [], error: e instanceof Error ? e.message : String(e) });
      }
    }
  }

  return out;
}

