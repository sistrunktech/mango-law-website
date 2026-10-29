import { parseDateTime } from './ovicheckpoint-scraper.ts';
import type { CuratedAnnouncementSeed } from './curated-announcements.ts';

// Exact publisher identities, not a suffix/blacklist claim that a site is official.
export const OFFICIAL_CHECKPOINT_SOURCES = [
  {
    hostname: 'sheriff.franklincountyohio.gov',
    path: /^\/About-Us\/Public-Affairs-Media-Relations\/20\d{2}\//,
    sourceName: "Franklin County Sheriff's Office",
    county: 'Franklin',
    ownershipUrl: 'https://sheriff.franklincountyohio.gov/About-Us/Public-Affairs-Media-Relations',
    fetchMethod: 'html',
    adapter: 'franklin-numbered-checkpoints',
  },
] as const;

export type OfficialNoticeResult = {
  events: CuratedAnnouncementSeed[];
  pendingReason?: string;
  publicationDate?: string;
  evidence?: { sourceUrl: string; fetchedAt: string; bodySha256: string; sourceType: 'official' };
};
type OfficialPage = { html: string; evidence: NonNullable<OfficialNoticeResult['evidence']> };

function registeredSource(input: string) {
  try {
    const url = new URL(input);
    if (url.protocol !== 'https:' || url.username || url.password || url.port) return null;
    return OFFICIAL_CHECKPOINT_SOURCES.find((s) => s.hostname === url.hostname && s.path.test(url.pathname)) ?? null;
  } catch { return null; }
}

function text(html: string): string {
  return html.replace(/<[^>]*>/g, ' ').replace(/&(?:nbsp|#160);/gi, ' ')
    .replace(/&amp;/gi, '&').replace(/&#39;|&apos;/gi, "'")
    .replace(/&quot;/gi, '"').replace(/\s+/g, ' ').trim();
}

const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
function isoDate(year: number, month: number, day: number): string | null {
  const date = new Date(Date.UTC(year, month - 1, day));
  return date.getUTCFullYear() === year && date.getUTCMonth() === month - 1 && date.getUTCDate() === day
    ? date.toISOString().slice(0, 10) : null;
}

function absoluteDates(input: string): Array<string | null> {
  const dates = [...input.matchAll(/\b(\d{1,2})[/-](\d{1,2})[/-](20\d{2})\b/g)]
    .map((m) => isoDate(Number(m[3]), Number(m[1]), Number(m[2])));
  const pattern = new RegExp(`\\b(${months.join('|')})\\s+(\\d{1,2}),?\\s+(20\\d{2})\\b`, 'gi');
  for (const m of input.matchAll(pattern)) dates.push(isoDate(Number(m[3]), months.findIndex((v) => v.toLowerCase() === m[1].toLowerCase()) + 1, Number(m[2])));
  return dates;
}

const ohioTime = new Intl.DateTimeFormat('en-CA', {
  timeZone: 'America/New_York', year: 'numeric', month: '2-digit', day: '2-digit',
  hour: '2-digit', minute: '2-digit', hourCycle: 'h23',
});

// Reuse the existing Ohio conversion, but reject DST folds/gaps and bad clocks.
function explicitWindow(eventDate: string, window: RegExpMatchArray): { start: string; end: string } | null {
  const clocks = [window[1], window[3]];
  if (clocks.some((clock) => { const [h, m = 0] = clock.split(':').map(Number); return h < 1 || h > 12 || m > 59; })) return null;
  const label = new Date(`${eventDate}T12:00:00Z`).toLocaleDateString('en-US', {
    weekday: 'long', month: 'long', day: 'numeric', year: 'numeric', timeZone: 'UTC',
  });
  const parsed = parseDateTime(`${label} | ${window[1]} ${window[2]} to ${window[3]} ${window[4]}`);
  if (!parsed || Date.parse(parsed.end) - Date.parse(parsed.start) > 12 * 3600000) return null;
  for (const [index, instant] of [parsed.start, parsed.end].entries()) {
    const parts = Object.fromEntries(ohioTime.formatToParts(new Date(instant)).map((p) => [p.type, p.value]));
    const [hour, minute = 0] = clocks[index].split(':').map(Number);
    const expectedHour = hour % 12 + (/pm/i.test(window[index * 2 + 2].replace(/\./g, '')) ? 12 : 0);
    if (Number(parts.hour) !== expectedHour || Number(parts.minute) !== minute) return null;
    const local = ohioTime.format(new Date(instant));
    if ([-3600000, 3600000].some((delta) => ohioTime.format(new Date(Date.parse(instant) + delta)) === local)) return null;
  }
  return parsed;
}

/** Only this verified publisher template/numbered format is currently supported. */
export function parseOfficialCheckpointNotice(sourceUrl: string, html: string): OfficialNoticeResult {
  const source = registeredSource(sourceUrl);
  const hold = (pendingReason: string): OfficialNoticeResult => ({ events: [], pendingReason });
  if (!source) return hold('Source is not in the verified official registry');
  const article = html.match(/<!--normalTemplateStart-->([\s\S]*?)<!--normalTemplateEnd-->/i)?.[1];
  if (!article) return hold('Publisher article template changed or is unavailable');
  const title = text(article.match(/<h1\b[^>]*>([\s\S]*?)<\/h1>/i)?.[1] ?? '');
  const publication = text(article.match(/<p\b[^>]*class=["'][^"']*published-on[^"']*["'][^>]*>([\s\S]*?)<\/p>/i)?.[1] ?? '');
  const paragraphs = [...article.matchAll(/<p\b([^>]*)>([\s\S]*?)<\/p>/gi)]
    .filter((m) => !/published-on/i.test(m[1])).map((m) => text(m[2]));
  const body = paragraphs.join('\n');
  if (!/\b(?:sobriety|ovi|dui) checkpoints?\b/i.test(title) || !/Franklin County DUI Task Force/i.test(body)) return hold('Not a supported checkpoint notice');
  if (/\b(?:not|never)\b.{0,30}\bcancel(?:led|ed)\b/i.test(`${title}\n${body}`)) return hold('Cancellation wording requires source review');
  if (/\b(?:postponed|rescheduled)\b/i.test(body)) return hold('Rescheduling requires source review');
  const dates = absoluteDates(`${title}\n${body}`);
  if (!dates.length || dates.includes(null) || new Set(dates).size !== 1) return hold('Missing, invalid or conflicting explicit event date');
  const eventDate = dates[0]!;
  const publishedDates = absoluteDates(publication);
  if (publishedDates.length !== 1 || !publishedDates[0] || publishedDates[0] > eventDate) return hold('Missing or conflicting publication date');
  if (!new URL(sourceUrl).pathname.includes(`/${eventDate.slice(0, 4)}/`)) return hold('Event year conflicts with publisher URL');
  const time = '(\\d{1,2}(?::\\d{2})?)\\s*(AM|PM|a\\.m\\.|p\\.m\\.)';
  const timePattern = new RegExp(`(?:Checkpoint operations will run from|conduct a sobriety checkpoint between)\\s+${time}\\s+(?:to|and)\\s+${time}`, 'gi');
  const windows = [...body.matchAll(timePattern)];
  if (windows.length !== 1) return hold('Missing or conflicting explicit checkpoint time window');
  const window = explicitWindow(eventDate, windows[0]);
  if (!window) return hold('Invalid or ambiguous Ohio time window');
  const city = body.match(/(?:today in|located in)\s+([A-Z][a-z]+(?:\s+[A-Z][a-z]+)*\s+Township)\b/)?.[1];
  if (!city) return hold('Missing explicit municipality or township');
  const locationParagraph = paragraphs.find((p) => /^Checkpoint 1:/i.test(p));
  if (!locationParagraph) return hold('Unnumbered locations require source review');
  const locations = [...locationParagraph.matchAll(/Checkpoint\s+(\d+):\s*([\s\S]*?)(?=\s*&?\s*Checkpoint\s+\d+:|$)/gi)];
  if (!locations.length || locations.length > 6 || locations.some((m, i) => Number(m[1]) !== i + 1 || !m[2].trim())) return hold('Ambiguous numbered checkpoint locations');
  const canonicalUrl = new URL(sourceUrl); canonicalUrl.search = ''; canonicalUrl.hash = '';
  const cancelled = /\bcancel(?:led|ed)\b/i.test(`${title}\n${body}`);
  return { publicationDate: publishedDates[0], events: locations.map((location) => {
    const locationText = location[2].replace(/\s*&\s*$/, '').trim();
    const id = `checkpoint-${location[1]}`;
    return {
      id, title: `Franklin County sobriety checkpoint: ${locationText}`,
      sourceUrl: `${canonicalUrl.href}#${id}`, sourceName: source.sourceName,
      // The DB announcement_date is a timestamp; preserve this date in evidence instead.
      announcementDate: null, eventDate, startDate: window.start, endDate: window.end,
      locationText, locationCity: city, locationCounty: source.county,
      status: cancelled ? 'cancelled' : 'confirmed', promoteToCheckpoint: true,
      rawText: `${cancelled ? 'Cancelled' : 'Announced'} sobriety checkpoint. ${locationText}, ${city}, Franklin County, Ohio. ${window.start} to ${window.end}. Publisher date: ${publishedDates[0]} (date only).`,
    };
  }) };
}

async function fetchOfficialPage(
  sourceUrl: string, fetchImpl: typeof fetch = fetch, now: () => Date = () => new Date(),
): Promise<OfficialPage> {
  if (!registeredSource(sourceUrl) && !OFFICIAL_CHECKPOINT_SOURCES.some((s) => s.ownershipUrl === sourceUrl)) throw new Error('Source is not in the verified official registry');
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 10000);
  try {
    const response = await fetchImpl(sourceUrl, {
      signal: controller.signal, redirect: 'error',
      headers: { 'user-agent': 'MangoLawCheckpointBot/1.0 (+https://mango.law/resources/dui-checkpoints)', accept: 'text/html' },
    });
    if (!response.ok) throw new Error(`Official source HTTP ${response.status}`);
    if (!response.headers.get('content-type')?.includes('text/html')) throw new Error('Official source is not HTML');
    const reader = response.body?.getReader();
    if (!reader) throw new Error('Official source body is unavailable');
    const chunks: Uint8Array[] = []; let size = 0;
    while (true) {
      const { done, value } = await reader.read(); if (done) break;
      size += value.byteLength;
      if (size > 524288) { await reader.cancel(); throw new Error('Official source exceeds 512 KiB'); }
      chunks.push(value);
    }
    const bytes = new Uint8Array(size); let offset = 0;
    for (const chunk of chunks) { bytes.set(chunk, offset); offset += chunk.byteLength; }
    const bodySha256 = [...new Uint8Array(await crypto.subtle.digest('SHA-256', bytes))].map((n) => n.toString(16).padStart(2, '0')).join('');
    const evidence = { sourceUrl, fetchedAt: now().toISOString(), bodySha256, sourceType: 'official' as const };
    return { html: new TextDecoder().decode(bytes), evidence };
  } finally { clearTimeout(timer); }
}

export function collectOfficialCheckpointArticleUrls(indexUrl: string, html: string): string[] {
  if (!OFFICIAL_CHECKPOINT_SOURCES.some((s) => s.ownershipUrl === indexUrl)) return [];
  const urls = new Set<string>();
  for (const m of html.matchAll(/<a\b[^>]*href=["']([^"']+)["'][^>]*>([\s\S]*?)<\/a>/gi)) {
    if (!/\b(?:sobriety|ovi|dui) checkpoints?\b/i.test(text(m[2]))) continue;
    try {
      const url = new URL(m[1].replace(/&amp;/g, '&'), indexUrl);
      if (registeredSource(url.href)) { url.search = ''; url.hash = ''; urls.add(url.href); }
    } catch { /* One malformed link must not hide the other publisher notices. */ }
  }
  return [...urls].slice(0, 8);
}

/** Index failures are explicit; a successful empty index is not statewide coverage. */
export async function fetchOfficialCheckpointIndex(fetchImpl: typeof fetch = fetch): Promise<{
  urls: string[]; evidence?: OfficialPage['evidence']; pendingReason?: string;
}> {
  const url = OFFICIAL_CHECKPOINT_SOURCES[0].ownershipUrl;
  try {
    const page = await fetchOfficialPage(url, fetchImpl);
    return { urls: collectOfficialCheckpointArticleUrls(url, page.html), evidence: page.evidence };
  } catch (error) { return { urls: [], pendingReason: error instanceof Error ? error.message : String(error) }; }
}

/** Fetch only registered articles; failed fetches never receive fresh evidence. */
export async function fetchOfficialCheckpointNotice(
  sourceUrl: string, fetchImpl: typeof fetch = fetch, now: () => Date = () => new Date(),
): Promise<OfficialNoticeResult> {
  try {
    if (!registeredSource(sourceUrl)) throw new Error('Source is not in the verified official registry');
    const page = await fetchOfficialPage(sourceUrl, fetchImpl, now);
    const result = parseOfficialCheckpointNotice(sourceUrl, page.html);
    for (const event of result.events) event.rawText += ` Source fetched ${page.evidence.fetchedAt}; SHA-256 ${page.evidence.bodySha256}.`;
    return { ...result, evidence: page.evidence };
  } catch (error) { return { events: [], pendingReason: error instanceof Error ? error.message : String(error) }; }
}
