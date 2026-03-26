import { parseCsv } from './csv.ts';
import { RSS_SOURCES_MASTER_CSV } from './rss-sources-master.csv.ts';
import { CHECKPOINT_RSS_SOURCES_CSV } from './checkpoint-rss-sources.csv.ts';

// These endpoints were returning 404/DNS failures during the 2026-03-26 live refresh.
// Keep them out of active scraping until a verified replacement URL is identified.
const TEMP_DISABLED_RSS_URLS = new Set([
  'http://www.10tv.com/mobile/news/all.xml',
  'https://www.fox19.com/feeds/rss/',
  'https://local12.com/resources/rss',
  'https://norwalkreflector.com/feed/',
  'https://sanduskyregister.com/feed/',
  'https://www.thecourier.com/feed/',
  'https://www.vindy.com/feed/',
  'https://www.timesleaderonline.com/feed/',
  'http://www.wfmj.com/category/229774/mobile-news-category?clienttype=rss',
  'https://rssfeeds.wkyc.com/wkyc/news',
  'https://www.wlwt.com/-/9838586/9838828/-/format/rss_2.0/view/asFeed/-/68f33gz/-/index.xml',
  'https://abc6onyourside.com/resources/rss',
  'https://www.13abc.com/feeds/rss/',
]);

function isEnabledRssUrl(url: string): boolean {
  return Boolean(url) && !TEMP_DISABLED_RSS_URLS.has(url.trim());
}

export interface RssSource {
  sourceName: string;
  rssUrl: string;
  sourceType: string;
  tier: string;
  confidence: string;
  notes: string;
}

export interface SeedSource {
  seedRow: number;
  county: string;
  city: string | null;
  sourceName: string;
  rssUrl: string;
  sourceType: string;
  tier: string;
  confidence: string;
  filterKeywords: string[];
  notes: string;
}

export async function loadMasterRssSources(): Promise<RssSource[]> {
  const rows = parseCsv(RSS_SOURCES_MASTER_CSV);
  const [header, ...dataRows] = rows;
  if (!header || header.length < 2) return [];

  const idx = (name: string) => header.findIndex((h) => h.trim() === name);
  const iSourceName = idx('source_name');
  const iUrl = idx('rss_url');
  const iType = idx('source_type');
  const iTier = idx('tier');
  const iConfidence = idx('confidence');
  const iNotes = idx('notes');

  return dataRows
    .map((r) => ({
      sourceName: r[iSourceName] || '',
      rssUrl: r[iUrl] || '',
      sourceType: r[iType] || '',
      tier: r[iTier] || '',
      confidence: r[iConfidence] || '',
      notes: r[iNotes] || '',
    }))
    .filter((s) => s.sourceName && isEnabledRssUrl(s.rssUrl));
}

export async function loadSeedSources(seedRow?: number): Promise<SeedSource[]> {
  const rows = parseCsv(CHECKPOINT_RSS_SOURCES_CSV);
  const [header, ...dataRows] = rows;
  if (!header || header.length < 2) return [];

  const idx = (name: string) => header.findIndex((h) => h.trim() === name);
  const iSeedRow = idx('checkpoint_seed_row');
  const iCounty = idx('county');
  const iCity = idx('city');
  const iSourceName = idx('source_name');
  const iUrl = idx('rss_url');
  const iType = idx('source_type');
  const iTier = idx('tier');
  const iConfidence = idx('confidence');
  const iFilterKeywords = idx('filter_keywords');
  const iNotes = idx('notes');

  const parsed = dataRows
    .map((r) => {
      const rowId = Number(r[iSeedRow]);
      return {
        seedRow: Number.isFinite(rowId) ? rowId : 0,
        county: r[iCounty] || '',
        city: (r[iCity] || '').trim() || null,
        sourceName: r[iSourceName] || '',
        rssUrl: r[iUrl] || '',
        sourceType: r[iType] || '',
        tier: r[iTier] || '',
        confidence: r[iConfidence] || '',
        filterKeywords: (r[iFilterKeywords] || '')
          .split('|')
          .map((k) => k.trim())
          .filter(Boolean),
        notes: r[iNotes] || '',
      } satisfies SeedSource;
    })
    .filter((s) => s.seedRow && s.county && s.sourceName && isEnabledRssUrl(s.rssUrl));

  return seedRow ? parsed.filter((s) => s.seedRow === seedRow) : parsed;
}
