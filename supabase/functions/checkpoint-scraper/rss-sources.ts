import { parseCsv } from './csv.ts';

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

async function fetchCsv(url: string): Promise<string> {
  const res = await fetch(url, {
    headers: {
      'user-agent': 'MangoLawCheckpointBot/1.0 (+https://mango.law/resources/dui-checkpoints)',
      accept: 'text/csv, text/plain, */*',
    },
  });
  if (!res.ok) throw new Error(`CSV fetch failed (${res.status}): ${url}`);
  return await res.text();
}

export async function loadMasterRssSources(): Promise<RssSource[]> {
  const url =
    Deno.env.get('RSS_SOURCES_MASTER_URL') ||
    'https://raw.githubusercontent.com/sistrunktech/mango-law-website/main/supabase/functions/checkpoint-scraper/rss_sources_master.csv';
  const text = await fetchCsv(url);
  const rows = parseCsv(text);
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
    .filter((s) => s.sourceName && s.rssUrl);
}

export async function loadSeedSources(seedRow?: number): Promise<SeedSource[]> {
  const url =
    Deno.env.get('CHECKPOINT_RSS_SOURCES_URL') ||
    'https://raw.githubusercontent.com/sistrunktech/mango-law-website/main/supabase/functions/checkpoint-scraper/checkpoint_rss_sources.csv';
  const text = await fetchCsv(url);
  const rows = parseCsv(text);
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
    .filter((s) => s.seedRow && s.county && s.sourceName && s.rssUrl);

  return seedRow ? parsed.filter((s) => s.seedRow === seedRow) : parsed;
}
