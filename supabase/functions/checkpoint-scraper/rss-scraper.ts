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

function decodeCdata(input: string): string {
  const cdata = input.match(/^<!\[CDATA\[([\s\S]*)\]\]>$/);
  return cdata ? cdata[1] : input;
}

function extractTag(block: string, tagName: string): string | null {
  const re = new RegExp(`<${tagName}\\b[^>]*>([\\s\\S]*?)<\\/${tagName}>`, 'i');
  const m = block.match(re);
  if (!m) return null;
  return decodeCdata(m[1].trim());
}

function extractAtomLink(block: string): string | null {
  const mHref = block.match(/<link\b[^>]*\bhref="([^"]+)"[^>]*\/?>/i);
  if (mHref?.[1]) return mHref[1].trim();
  const mText = block.match(/<link\b[^>]*>([\s\S]*?)<\/link>/i);
  return mText?.[1] ? decodeCdata(mText[1].trim()) : null;
}

function extractRssLink(block: string): string | null {
  const link = extractTag(block, 'link');
  return link ? link.trim() : null;
}

function parseBlocks(xml: string, tagName: 'item' | 'entry'): string[] {
  const re = new RegExp(`<${tagName}\\b[^>]*>([\\s\\S]*?)<\\/${tagName}>`, 'gi');
  const blocks: string[] = [];
  let m: RegExpExecArray | null;
  while ((m = re.exec(xml)) !== null) blocks.push(m[0]);
  return blocks;
}

function parseRssOrAtom(xml: string): Array<{ title: string; url: string; pubDate: string | null; summary: string | null }> {
  const isRss = /<item\b/i.test(xml);
  const blocks = isRss ? parseBlocks(xml, 'item') : parseBlocks(xml, 'entry');

  return blocks
    .map((block) => {
      const titleRaw = extractTag(block, 'title');
      const urlRaw = isRss ? extractRssLink(block) : extractAtomLink(block);
      const pubDateRaw =
        extractTag(block, 'pubDate') ||
        extractTag(block, 'published') ||
        extractTag(block, 'updated');
      const summaryRaw =
        extractTag(block, 'description') ||
        extractTag(block, 'summary') ||
        extractTag(block, 'content') ||
        extractTag(block, 'content:encoded');

      const title = titleRaw ? stripHtml(titleRaw) : null;
      const url = urlRaw ? urlRaw.trim() : null;
      if (!title || !url) return null;

      return {
        title,
        url,
        pubDate: pubDateRaw ? pubDateRaw.trim() : null,
        summary: summaryRaw ? stripHtml(summaryRaw) : null,
      };
    })
    .filter((x): x is { title: string; url: string; pubDate: string | null; summary: string | null } => Boolean(x));
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
      const items: RssItemCandidate[] = [];
      for (const parsed of parseRssOrAtom(xml)) {
        const combined = `${parsed.title}\n${parsed.summary || ''}`;
        if (!textIncludesAny(combined, keywords)) continue;

        const normalizedUrl = canonicalizeUrl(parsed.url);
        items.push({
          title: parsed.title,
          url: normalizedUrl,
          publishedAt: parsed.pubDate ? new Date(parsed.pubDate).toISOString() : null,
          summary: parsed.summary,
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
      const candidates: RssItemCandidate[] = [];
      for (const parsed of parseRssOrAtom(xml)) {
        const combined = `${parsed.title}\n${parsed.summary || ''}`;
        if (!textIncludesAny(combined, keywords)) continue;

        candidates.push({
          title: parsed.title,
          url: canonicalizeUrl(parsed.url),
          publishedAt: parsed.pubDate ? new Date(parsed.pubDate).toISOString() : null,
          summary: parsed.summary,
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
