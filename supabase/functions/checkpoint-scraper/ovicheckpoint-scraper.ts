interface RawCheckpoint {
  title: string;
  location: string;
  locationAddress?: string;
  locationCity?: string;
  locationCounty?: string;
  startDate: string;
  endDate: string;
  description?: string;
  sourceUrl: string;
}

const NON_LOCATION_CELL_PATTERNS = [
  /\b(?:dui|ovi|sobriety)\s+(?:checkpoint|checkpoints|enforcement|operation)\b/i,
  /\bcheckpoints?\s+(?:planned|scheduled|announced|expected|operation|to be)\b/i,
  /\b(?:police|troopers|state patrol|authorities|task force)\b.*\b(?:announce|plan|schedule|conduct)\b/i,
  /\bdrivers?\s+(?:to\s+see|should|can\s+expect|will\s+see)\b/i,
  /\b(?:law enforcement|officers?)\b.*\b(?:checkpoint|enforcement)\b/i,
] as const;

const PLACEHOLDER_CELL_PATTERNS = [
  /^\s*$/,
  /\bcheck back for updates\b/i,
  /\btbd\b/i,
  /\bto be (?:announced|determined)\b/i,
] as const;

export function isUsableOVICheckpointLocationRow(input: {
  county: string;
  city: string;
  locationText: string;
}): boolean {
  const county = input.county.trim();
  const city = input.city.trim();
  const locationText = input.locationText.trim();

  if (!county) return false;
  if (PLACEHOLDER_CELL_PATTERNS.some((pattern) => pattern.test(city))) return false;
  if (PLACEHOLDER_CELL_PATTERNS.some((pattern) => pattern.test(locationText))) return false;

  // The aggregator sometimes places article headlines/summaries in the location
  // cell. Those sentences have caused bad city/county pairings and map pins.
  if (NON_LOCATION_CELL_PATTERNS.some((pattern) => pattern.test(locationText))) return false;

  return true;
}

function stripHtml(input: string): string {
  return input.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
}

function decodeHtmlEntities(input: string): string {
  return input
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&#(\d+);/g, (_m, n) => String.fromCharCode(Number(n)))
    .replace(/\s+/g, ' ')
    .trim();
}

function normalizeTimeString(input: string): string {
  return input
    .replace(/\u00a0/g, ' ')
    .replace(/[•·]/g, '|')
    .replace(/[—–]/g, '-')
    .replace(/\bA\.?\s*M\.?\b/gi, 'AM')
    .replace(/\bP\.?\s*M\.?\b/gi, 'PM')
    .replace(/\s+-\s+/g, ' - ')
    .replace(/\s+/g, ' ')
    .trim();
}

function getTimeZoneOffsetMs(timeZone: string, date: Date): number {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone,
    hour12: false,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  }).formatToParts(date);

  const values = Object.fromEntries(parts.map((part) => [part.type, part.value]));
  const localAsUtc = Date.UTC(
    Number(values.year),
    Number(values.month) - 1,
    Number(values.day),
    Number(values.hour),
    Number(values.minute),
    Number(values.second)
  );

  return localAsUtc - date.getTime();
}

function ohioLocalDateTimeToUtcIso(
  year: number,
  month: number,
  day: number,
  hour: number,
  minute: number
): string {
  const localAsUtc = Date.UTC(year, month, day, hour, minute);
  let utcDate = new Date(localAsUtc);

  // Ohio checkpoint announcements are local Ohio time. Supabase Edge Functions
  // run in UTC, so construct UTC instants explicitly instead of relying on the
  // runtime's local timezone.
  for (let i = 0; i < 3; i++) {
    const offset = getTimeZoneOffsetMs('America/New_York', utcDate);
    utcDate = new Date(localAsUtc - offset);
  }

  return utcDate.toISOString();
}

export function parseDateTime(timeStr: string): { start: string; end: string } | null {
  const s = normalizeTimeString(timeStr);

  const monthMap: Record<string, number> = {
    january: 0,
    february: 1,
    march: 2,
    april: 3,
    may: 4,
    june: 5,
    july: 6,
    august: 7,
    september: 8,
    october: 9,
    november: 10,
    december: 11,
    jan: 0,
    feb: 1,
    mar: 2,
    apr: 3,
    jun: 5,
    jul: 6,
    aug: 7,
    sep: 8,
    sept: 8,
    oct: 9,
    nov: 10,
    dec: 11,
  };

  const patterns: Array<{
    re: RegExp;
    kind:
      | 'full'
      | 'full_dash'
      | 'from_to'
      | 'from_to_midnight'
      | 'evening_midnight'
      | 'no_day_full'
      | 'late_night'
      | 'date_only'
      | 'date_only_no_day'
      | 'full_missing_year'
      | 'date_only_missing_year';
  }> = [
    // "Friday, December 5, 2025 | 10 PM to 2 AM"
    {
      re: /(\w+),\s+(\w+)\s+(\d+),\s+(\d+)\s+\|\s+(\d+(?:\:\d+)?)\s*(AM|PM)\s+to\s+(\d+(?:\:\d+)?)\s*(AM|PM)/i,
      kind: 'full',
    },
    // "Friday, August 29, 2025 | 8:00 PM – 11:00 PM"
    {
      re: /(\w+),\s+(\w+)\s+(\d+),\s+(\d+)\s+\|\s+(\d+(?:\:\d+)?)\s*(AM|PM)\s*[–—-]\s*(\d+(?:\:\d+)?)\s*(AM|PM)/i,
      kind: 'full_dash',
    },
    // "Friday, Aug 1, 2025 | 8 PM - 10 PM" (abbrev month + normalized separators)
    {
      re: /(\w+),\s+(\w+)\.?(?:\s+)(\d+),\s+(\d+)\s+\|\s+(\d+(?:\:\d+)?)\s*(AM|PM)\s*(?:to|-)\s*(\d+(?:\:\d+)?)\s*(AM|PM)/i,
      kind: 'full',
    },
    // "Saturday, September 13, 2025, From 7 PM to 11 PM"
    {
      re: /(\w+),\s+(\w+)\s+(\d+),\s+(\d+),\s+From\s+(\d+(?:\:\d+)?)\s*(AM|PM)\s+to\s+(\d+(?:\:\d+)?)\s*(AM|PM)/i,
      kind: 'from_to',
    },
    // "Friday, October 18, 2024 , from 8 PM to 2 AM"
    // "Friday, August 22, 2025 From 10 PM to 2 AM"
    {
      re: /(\w+),\s+(\w+)\.?\s+(\d+),\s*(\d+)\s*,?\s*From\s+(\d+(?:\:\d+)?)\s*(AM|PM)\s+to\s+(\d+(?:\:\d+)?)\s*(AM|PM)/i,
      kind: 'from_to',
    },
    // "August 9, 2025 – 6:00 PM to 8:30 PM"
    {
      re: /(\w+)\s+(\d+),\s+(\d+)\s+[–—-]\s+(\d+(?:\:\d+)?)\s*(AM|PM)\s+to\s+(\d+(?:\:\d+)?)\s*(AM|PM)/i,
      kind: 'no_day_full',
    },
    // "Aug 9, 2025 - 6:00 PM to 8:30 PM" (abbrev month)
    {
      re: /(\w+)\.?(?:\s+)(\d+),\s+(\d+)\s+-\s+(\d+(?:\:\d+)?)\s*(AM|PM)\s+to\s+(\d+(?:\:\d+)?)\s*(AM|PM)/i,
      kind: 'no_day_full',
    },
    // "August 8, 2025 From 9 PM to 11 PM"
    {
      re: /(\w+)\s+(\d+),\s+(\d+)\s+From\s+(\d+(?:\:\d+)?)\s*(AM|PM)\s+to\s+(\d+(?:\:\d+)?)\s*(AM|PM)/i,
      kind: 'no_day_full',
    },
    // "June 13, 2025, From 11:00 PM to 3:00 AM" (comma before From)
    {
      re: /(\w+)\s+(\d+),\s+(\d+),\s+From\s+(\d+(?:\:\d+)?)\s*(AM|PM)\s+to\s+(\d+(?:\:\d+)?)\s*(AM|PM)/i,
      kind: 'no_day_full',
    },
    // "Friday, May 9, 2025 From 10 PM - 2 AM" (dash between times)
    {
      re: /(\w+),\s+(\w+)\s+(\d+),\s+(\d+)\s+From\s+(\d+(?:\:\d+)?)\s*(AM|PM)\s*(?:to|-)\s*(\d+(?:\:\d+)?)\s*(AM|PM)/i,
      kind: 'from_to',
    },
    // "Friday, November 8, 2024, From 12:30 AM until 3 AM"
    {
      re: /(\w+),\s+(\w+)\s+(\d+),\s+(\d+),\s+From\s+(\d+(?:\:\d+)?)\s*(AM|PM)\s+until\s+(\d+(?:\:\d+)?)\s*(AM|PM)/i,
      kind: 'from_to',
    },
    // "Friday, June 6, 2025 From 6 PM to Midnight"
    {
      re: /(\w+),\s+(\w+)\s+(\d+),\s+(\d+)\s*,?\s+From\s+(\d+(?:\:\d+)?)\s*(AM|PM)\s+to\s+Midnight\s*$/i,
      kind: 'from_to_midnight',
    },
    // "Saturday, March 15, 2025 Evening to Midnight"
    {
      re: /(\w+),\s+(\w+)\s+(\d+),\s+(\d+)\s+Evening\s+to\s+Midnight\s*$/i,
      kind: 'evening_midnight',
    },
    // "Friday, May 17, From 8 PM to 2 AM" (missing year)
    {
      re: /(\w+),\s+(\w+)\s+(\d+),\s+From\s+(\d+(?:\:\d+)?)\s*(AM|PM)\s+to\s+(\d+(?:\:\d+)?)\s*(AM|PM)/i,
      kind: 'full_missing_year',
    },
    // "Friday, June 20, 2025 Tonight" (treat as date-only)
    {
      re: /(\w+),\s+(\w+)\s+(\d+),\s+(\d+)\s+Tonight\s*$/i,
      kind: 'date_only',
    },
    // "Wednesday, November 26, 2025 | Late Night"
    {
      re: /(\w+),\s+(\w+)\s+(\d+),\s+(\d+)\s+\|\s+Late Night/i,
      kind: 'late_night',
    },
    // "Friday, September 19, 2025"
    {
      re: /(\w+),\s+(\w+)\s+(\d+),\s+(\d+)\s*$/i,
      kind: 'date_only',
    },
    // "Sunday February 11, 2024 Super Bowl 2024"
    // "Friday February 9, 2024 Holiday Weekend"
    {
      re: /^(?!.*\b(?:AM|PM)\b)(?!.*\d{1,2}:\d{2})(\w+),?\s+(\w+)\.?\s+(\d+),\s*(\d{4})\b\s+.+$/i,
      kind: 'date_only',
    },
    // "Saturday, March 29" (missing year)
    {
      re: /(\w+),\s+(\w+)\s+(\d+)\s*$/i,
      kind: 'date_only_missing_year',
    },
    // "August 8, 2025"
    {
      re: /(\w+)\s+(\d+),\s+(\d+)\s*$/i,
      kind: 'date_only_no_day',
    },
  ];

  function parseTime(time: string, period: string): { hour: number; minute: number } {
    let hour = 0;
    let minute = 0;
    const lower = time.toLowerCase();
    if (lower === 'midnight') {
      return { hour: 0, minute: 0 };
    }
    if (time.includes(':')) {
      const [h, m] = time.split(':');
      hour = Number(h);
      minute = Number(m);
    } else {
      hour = Number(time);
      minute = 0;
    }
    const p = period.toUpperCase();
    if (p === 'PM' && hour !== 12) hour += 12;
    if (p === 'AM' && hour === 12) hour = 0;
    return { hour, minute };
  }

  for (const { re, kind } of patterns) {
    const match = s.match(re);
    if (!match) continue;

    let monthName: string;
    let day: number;
    let year: number;
    let startHour = 20;
    let startMinute = 0;
    let endHour = 23;
    let endMinute = 0;

    if (
      kind === 'full' ||
      kind === 'full_dash' ||
      kind === 'from_to' ||
      kind === 'from_to_midnight' ||
      kind === 'evening_midnight' ||
      kind === 'late_night' ||
      kind === 'date_only'
    ) {
      monthName = match[2]!;
      day = Number(match[3]!);
      year = Number(match[4]!);
    } else if (kind === 'full_missing_year') {
      console.warn(`Skipping checkpoint time/date missing year: ${timeStr}`);
      return null;
    } else {
      monthName = match[1]!;
      day = Number(match[2]!);
      if (kind === 'date_only_missing_year') {
        console.warn(`Skipping checkpoint time/date missing year: ${timeStr}`);
        return null;
      }
      year = Number(match[3]!);
    }

    if (kind === 'late_night') {
      startHour = 22;
      endHour = 2;
    } else if (kind === 'evening_midnight') {
      startHour = 20;
      startMinute = 0;
      endHour = 0;
      endMinute = 0;
    } else if (kind === 'from_to_midnight') {
      const start = parseTime(match[5]!, match[6]!);
      startHour = start.hour;
      startMinute = start.minute;
      endHour = 0;
      endMinute = 0;
    } else if (kind === 'full' || kind === 'full_dash' || kind === 'from_to') {
      const start = parseTime(match[5]!, match[6]!);
      const end = parseTime(match[7]!, match[8]!);
      startHour = start.hour;
      startMinute = start.minute;
      endHour = end.hour;
      endMinute = end.minute;
    } else if (kind === 'no_day_full') {
      const start = parseTime(match[4]!, match[5]!);
      const end = parseTime(match[6]!, match[7]!);
      startHour = start.hour;
      startMinute = start.minute;
      endHour = end.hour;
      endMinute = end.minute;
    }

    const normalizedMonth = monthName.toLowerCase().replace(/\.$/, '');
    const month = monthMap[normalizedMonth];
    if (month === undefined) {
      console.warn(`Could not parse checkpoint month: ${monthName} (${timeStr})`);
      return null;
    }

    const startMinutes = startHour * 60 + startMinute;
    const endMinutes = endHour * 60 + endMinute;
    const endDayOffset = endMinutes <= startMinutes ? 1 : 0;

    const start = ohioLocalDateTimeToUtcIso(year, month, day, startHour, startMinute);
    let end = ohioLocalDateTimeToUtcIso(year, month, day + endDayOffset, endHour, endMinute);

    const startDate = new Date(start);
    let endDate = new Date(end);
    if (endDate <= startDate) {
      end = ohioLocalDateTimeToUtcIso(year, month, day + 1, endHour, endMinute);
      endDate = new Date(end);
    }

    return { start, end: endDate.toISOString() };
  }

  console.warn(`Could not parse checkpoint time/date: ${timeStr}`);
  return null;
}

export async function scrapeOVICheckpoint(): Promise<RawCheckpoint[]> {
  const url = 'https://www.ovicheckpoint.com/';
  const wpJsonUrl = 'https://www.ovicheckpoint.com/wp-json/wp/v2/pages/1078';

  try {
    const response = await fetch(wpJsonUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const page = await response.json().catch(() => null);
    const html = typeof page?.content?.rendered === 'string' ? page.content.rendered : '';
    const checkpoints: RawCheckpoint[] = [];

    const tableMatch = html.match(/<table[^>]*id="tablepress-1"[\s\S]*?<\/table>/i);
    if (!tableMatch) {
      console.warn('OVICheckpoint: Could not find checkpoint table; falling back to homepage scrape');
      return await scrapeOVICheckpointHomepage(url);
    }

    const tableHtml = tableMatch[0];
    const tbodyMatch = tableHtml.match(/<tbody[^>]*>([\s\S]*?)<\/tbody>/i);
    const rowsHtml = tbodyMatch ? tbodyMatch[1] : tableHtml;

    const rowPattern = /<tr[^>]*>([\s\S]*?)<\/tr>/gi;
    for (const rowMatch of rowsHtml.matchAll(rowPattern)) {
      const row = rowMatch[1];
      const cells = [...row.matchAll(/<t[dh][^>]*>([\s\S]*?)<\/t[dh]>/gi)].map((m) =>
        decodeHtmlEntities(stripHtml(m[1] ?? ''))
      );

      if (cells.length < 4) continue;
      const [countyRaw, cityRaw, locationRaw, timeRaw] = cells;
      if (!countyRaw || /^county$/i.test(countyRaw)) continue;
      if (!timeRaw) continue;

      const county = countyRaw.replace(/\s+County$/i, '').trim();
      const city = cityRaw?.trim() || '';
      const locationText = locationRaw?.trim() || '';
      if (!isUsableOVICheckpointLocationRow({ county, city, locationText })) continue;

      const parsed = parseDateTime(timeRaw);
      if (!parsed) {
        console.warn(`Skipping OVICheckpoint row due to unparseable time/date: ${timeRaw}`);
        continue;
      }
      const { start, end } = parsed;

      const cityPart = city && city !== 'Check back for updates' ? `${city}, ` : '';
      const title = `OVI Checkpoint - ${cityPart}${county} County`;
      const location = `${locationText}, ${city || county}, ${county} County`;

      checkpoints.push({
        title,
        location,
        locationAddress: locationText,
        locationCity: city || county,
        locationCounty: county,
        startDate: start,
        endDate: end,
        description: locationText,
        sourceUrl: url,
      });
    }

    console.log(`Scraped ${checkpoints.length} checkpoints from OVICheckpoint.com`);
    return checkpoints;
  } catch (error) {
    console.error('OVICheckpoint scraper error:', error);
    throw error;
  }
}

async function scrapeOVICheckpointHomepage(url: string): Promise<RawCheckpoint[]> {
  const response = await fetch(url, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
    },
  });

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}: ${response.statusText}`);
  }

  const html = await response.text();
  const checkpoints: RawCheckpoint[] = [];

  const tableMatch = html.match(/<table[^>]*id=\"tablepress-1\"[\s\S]*?<\/table>/i);
  if (!tableMatch) return checkpoints;

  const tableHtml = tableMatch[0];
  const tbodyMatch = tableHtml.match(/<tbody[^>]*>([\s\S]*?)<\/tbody>/i);
  const rowsHtml = tbodyMatch ? tbodyMatch[1] : tableHtml;

  const rowPattern = /<tr[^>]*>([\s\S]*?)<\/tr>/gi;
  for (const rowMatch of rowsHtml.matchAll(rowPattern)) {
    const row = rowMatch[1];
    const cells = [...row.matchAll(/<t[dh][^>]*>([\s\S]*?)<\/t[dh]>/gi)].map((m) =>
      decodeHtmlEntities(stripHtml(m[1] ?? ''))
    );
    if (cells.length < 4) continue;
    const [countyRaw, cityRaw, locationRaw, timeRaw] = cells;
    if (!countyRaw || /^county$/i.test(countyRaw)) continue;
    if (!timeRaw) continue;

    const county = countyRaw.replace(/\s+County$/i, '').trim();
    const city = cityRaw?.trim() || '';
    const locationText = locationRaw?.trim() || '';
    if (!isUsableOVICheckpointLocationRow({ county, city, locationText })) continue;

    const parsed = parseDateTime(timeRaw);
    if (!parsed) {
      console.warn(`Skipping OVICheckpoint row due to unparseable time/date: ${timeRaw}`);
      continue;
    }
    const { start, end } = parsed;

    const cityPart = city && city !== 'Check back for updates' ? `${city}, ` : '';
    const title = `OVI Checkpoint - ${cityPart}${county} County`;
    const location = `${locationText}, ${city || county}, ${county} County`;

    checkpoints.push({
      title,
      location,
      locationAddress: locationText,
      locationCity: city || county,
      locationCounty: county,
      startDate: start,
      endDate: end,
      description: locationText,
      sourceUrl: url,
    });
  }

  return checkpoints;
}
