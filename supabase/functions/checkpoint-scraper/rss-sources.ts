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

export async function loadMasterRssSources(): Promise<RssSource[]> {
  const url = new URL('./rss_sources_master.csv', import.meta.url);
  const text = await Deno.readTextFile(url);
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
  const url = new URL('./checkpoint_rss_sources.csv', import.meta.url);
  const text = await Deno.readTextFile(url);
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

