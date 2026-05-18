interface GeocodingResult {
  latitude: number;
  longitude: number;
  formatted_address: string;
  confidence: 'high' | 'medium' | 'low';
  provider: string;
}

interface CachedResult extends GeocodingResult {
  id: string;
  cached: true;
}

export type CheckpointGeocodingConfidence =
  | 'exact_high'
  | 'exact_medium'
  | 'exact_low'
  | 'city_centroid'
  | 'county_centroid'
  | 'undisclosed'
  | 'none';

export interface CheckpointLocationInput {
  address: string;
  city: string;
  county: string;
}

export interface CheckpointGeocodingResult {
  latitude: number;
  longitude: number;
  formatted_address: string;
  confidence: CheckpointGeocodingConfidence;
  provider: string;
}

const OHIO_BOUNDS = {
  minLatitude: 38.4032,
  maxLatitude: 41.9773,
  minLongitude: -84.8203,
  maxLongitude: -80.5189,
};

const UNDISCLOSED_LOCATION_PATTERNS = [
  /\bundisclosed\b/i,
  /\bconfidential\b/i,
  /\bcountywide\b/i,
  /\bdetails?\s+(?:to\s+be\s+)?announced\b/i,
  /\blocation\s+(?:to\s+be\s+)?announced\b/i,
  /\bexact checkpoints?\s+undisclosed\b/i,
  /\bmultiple locations\b/i,
  /\bvarious locations\b/i,
  /\bthroughout the county\b/i,
] as const;

const EXACT_LOCATION_SPLIT_PATTERNS = [
  /\s+officers?\b/i,
  /\s+police\b/i,
  /\s+expect delays?\b/i,
  /\s+be prepared\b/i,
  /\s+drivers?\b/i,
  /\s+with assistance from\b/i,
  /\s+this location is\b/i,
  /\s+close to\b/i,
] as const;

const STREET_LEVEL_HINT_PATTERNS = [
  /\b\d{2,5}\b/,
  /\b(?:street|st|avenue|ave|road|rd|boulevard|blvd|highway|hwy|route|rt|lane|ln|drive|dr|way|parkway|pkwy|court|ct)\b/i,
  /\bblock\b/i,
  /\bnear\b/i,
  /\bat\b/i,
  /&/,
] as const;

const LOW_INFORMATION_ROUTE_PATTERNS = [
  /^\s*(?:state|us|u\.s\.|county)\s+(?:route|road)\s*$/i,
  /^\s*(?:state|us|u\.s\.)\s*route\s*$/i,
  /^\s*(?:sr|us|u\.s\.)\s*$/i,
  /\b(?:state|us|u\.s\.|county)\s+(?:route|road)\s*$/i,
  /\bnear\s+(?:county|state|us|u\.s\.)\s+(?:route|road)\s*$/i,
] as const;

function normalizeText(value: string | null | undefined): string {
  return value?.trim() || '';
}

function cityLooksRedundant(city: string, county: string): boolean {
  return city.trim().toLowerCase() === county.trim().toLowerCase();
}

function stripTrailingNarrative(input: string): string {
  let sanitized = input.trim();

  for (const pattern of EXACT_LOCATION_SPLIT_PATTERNS) {
    sanitized = sanitized.split(pattern)[0]!.trim();
  }

  return sanitized.replace(/\s+/g, ' ').replace(/[,:;.-]+$/g, '').trim();
}

function buildExactQueryCandidates(input: CheckpointLocationInput): string[] {
  const rawAddress = normalizeText(input.address);
  if (!rawAddress) return [];

  const candidates = new Set<string>();
  const firstSentence = rawAddress.split(/[.!?]/)[0]!.trim();
  const maybeAdd = (value: string | null | undefined) => {
    const sanitized = stripTrailingNarrative(value || '');
    if (!sanitized || sanitized.length < 6) return;
    candidates.add(`${sanitized}, ${input.city}, Ohio`);
  };

  maybeAdd(firstSentence);

  if (firstSentence.includes(':')) {
    maybeAdd(firstSentence.split(':').slice(-1)[0]);
  }

  const directionalMatches = [
    firstSentence.match(/\bat\s+(.+)$/i)?.[1],
    firstSentence.match(/\bon\s+(.+)$/i)?.[1],
    firstSentence.match(/\balong\s+(.+)$/i)?.[1],
    firstSentence.match(/\bin\s+(.+)$/i)?.[1],
  ];

  directionalMatches.forEach((match) => maybeAdd(match));

  return Array.from(candidates);
}

export function locationTextSuggestsUndisclosed(locationText: string | null | undefined): boolean {
  const normalized = normalizeText(locationText);
  if (!normalized) return false;
  return UNDISCLOSED_LOCATION_PATTERNS.some((pattern) => pattern.test(normalized));
}

export function hasStreetLevelHint(locationText: string | null | undefined): boolean {
  const normalized = normalizeText(locationText);
  if (!normalized) return false;
  return STREET_LEVEL_HINT_PATTERNS.some((pattern) => pattern.test(normalized));
}

function hasUsableExactLocation(locationText: string | null | undefined): boolean {
  const normalized = normalizeText(locationText);
  if (!normalized) return false;
  if (LOW_INFORMATION_ROUTE_PATTERNS.some((pattern) => pattern.test(normalized))) return false;
  return hasStreetLevelHint(normalized);
}

function formattedAddressMatchesExpectedPlace(
  formattedAddress: string | null | undefined,
  city: string,
): boolean {
  const formatted = normalizeText(formattedAddress).toLowerCase();
  const normalizedCity = city.trim().toLowerCase();

  if (!formatted || !normalizedCity) return false;
  return formatted.includes(normalizedCity);
}

function isOhioCoordinate(latitude: number, longitude: number): boolean {
  return (
    latitude >= OHIO_BOUNDS.minLatitude &&
    latitude <= OHIO_BOUNDS.maxLatitude &&
    longitude >= OHIO_BOUNDS.minLongitude &&
    longitude <= OHIO_BOUNDS.maxLongitude
  );
}

function featureLooksLikeOhio(feature: any): boolean {
  if (!feature) return false;
  const placeName = typeof feature.place_name === 'string' ? feature.place_name : '';
  const context = Array.isArray(feature.context) ? feature.context : [];

  const hasOhioContext =
    context.some((c: any) => c?.short_code === 'us-oh') ||
    context.some((c: any) => c?.text === 'Ohio') ||
    /\bOH\b/.test(placeName) ||
    /,\s*Ohio\b/i.test(placeName);

  const center = Array.isArray(feature.center) ? feature.center : null;
  if (!center || center.length < 2) return false;

  const [longitude, latitude] = center;
  if (typeof latitude !== 'number' || typeof longitude !== 'number') return false;

  return hasOhioContext && isOhioCoordinate(latitude, longitude);
}

function pickBestOhioFeature(features: any[]): any | null {
  const ohioFeatures = features.filter(featureLooksLikeOhio);
  if (ohioFeatures.length === 0) return null;

  const score = (feature: any) => {
    const relevance = typeof feature?.relevance === 'number' ? feature.relevance : 0;
    const placeTypes = Array.isArray(feature?.place_type) ? feature.place_type : [];
    const isAddress = placeTypes.includes('address') ? 1 : 0;
    const isPoi = placeTypes.includes('poi') ? 0.5 : 0;
    return relevance + isAddress * 0.05 + isPoi * 0.02;
  };

  return ohioFeatures.reduce((best, current) => (score(current) > score(best) ? current : best));
}

function normalizeAddressForGeocoding(address: string): string {
  return address
    .replace(/\b(\d{2,6})\s+block\s+of\s+/gi, '$1 ')
    .replace(/\s+/g, ' ')
    .trim();
}

export async function geocodeAddress(
  address: string,
  supabaseClient: any,
  mapboxToken?: string
): Promise<GeocodingResult | CachedResult | null> {
  const geocodingAddress = normalizeAddressForGeocoding(address);
  const normalizedAddress = geocodingAddress.trim().toLowerCase();

  try {
    const { data: cached, error: cacheError } = await supabaseClient
      .from('geocoding_cache')
      .select('*')
      .eq('address', normalizedAddress)
      .maybeSingle();

    if (cached && !cacheError) {
      await supabaseClient.rpc('increment_geocoding_cache_hit', { cache_id: cached.id });

      const cachedLatitude = parseFloat(cached.latitude);
      const cachedLongitude = parseFloat(cached.longitude);

      // Prevent cache poisoning: if an existing cached value is clearly outside Ohio, treat it as invalid
      // and attempt a fresh geocode instead of returning it.
      if (!isOhioCoordinate(cachedLatitude, cachedLongitude)) {
        console.warn('Ignoring cached geocode outside Ohio for:', address);
        await supabaseClient.from('geocoding_cache').delete().eq('id', cached.id);
      } else {
        return {
          latitude: cachedLatitude,
          longitude: cachedLongitude,
          formatted_address: cached.formatted_address,
          confidence: cached.confidence,
          provider: cached.provider,
          id: cached.id,
          cached: true,
        };
      }
    }

    if (!mapboxToken) {
      console.warn('No Mapbox token available for geocoding');
      return null;
    }

    const encodedAddress = encodeURIComponent(geocodingAddress);
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodedAddress}.json?access_token=${mapboxToken}&country=US&limit=5&proximity=-82.9988,39.9612`;

    const response = await fetch(url);

    if (!response.ok) {
      console.error('Mapbox geocoding failed:', response.status);
      return null;
    }

    const data = await response.json();

    if (!data.features || data.features.length === 0) {
      console.warn('No geocoding results for:', address);
      return null;
    }

    const feature = pickBestOhioFeature(data.features);
    if (!feature) {
      console.warn('No Ohio geocoding results for:', address);
      return null;
    }

    const [longitude, latitude] = feature.center;
    const formattedAddress = feature.place_name;

    let confidence: 'high' | 'medium' | 'low' = 'medium';
    if (feature.relevance >= 0.9) {
      confidence = 'high';
    } else if (feature.relevance < 0.7) {
      confidence = 'low';
    }

    const result: GeocodingResult = {
      latitude,
      longitude,
      formatted_address: formattedAddress,
      confidence,
      provider: 'mapbox',
    };

    const { error: insertError } = await supabaseClient
      .from('geocoding_cache')
      .insert({
        address: normalizedAddress,
        latitude,
        longitude,
        formatted_address: formattedAddress,
        confidence,
        provider: 'mapbox',
        metadata: {
          relevance: feature.relevance,
          place_type: feature.place_type,
        },
      });

    if (insertError) {
      console.error('Failed to cache geocoding result:', insertError);
    }

    return result;
  } catch (error) {
    console.error('Geocoding error:', error);
    return null;
  }
}

export async function geocodeCheckpointLocation(
  input: CheckpointLocationInput,
  supabaseClient: any,
  mapboxToken?: string
): Promise<CheckpointGeocodingResult | null> {
  const address = normalizeText(input.address);
  const city = normalizeText(input.city);
  const county = normalizeText(input.county);

  if (!city && !county) {
    return null;
  }

  const useApproximateFallback = locationTextSuggestsUndisclosed(address);
  const canUseCityCentroid = Boolean(city) && Boolean(county) && !cityLooksRedundant(city, county);

  if (!useApproximateFallback && address && city && !cityLooksRedundant(city, county) && hasUsableExactLocation(address)) {
    const exactQueries = buildExactQueryCandidates({ address, city, county });
    for (const exactQuery of exactQueries) {
      const exactResult = await geocodeAddress(exactQuery, supabaseClient, mapboxToken);
      if (exactResult) {
        if (!formattedAddressMatchesExpectedPlace(exactResult.formatted_address, city)) {
          console.warn(`Rejecting geocode outside expected city "${city}" for: ${exactQuery}`);
          continue;
        }

        const exactConfidence =
          exactResult.confidence === 'high'
            ? 'exact_high'
            : exactResult.confidence === 'low'
            ? 'exact_low'
            : 'exact_medium';

        return {
          latitude: exactResult.latitude,
          longitude: exactResult.longitude,
          formatted_address: exactResult.formatted_address,
          confidence: exactConfidence,
          provider: exactResult.provider,
        };
      }
    }
  }

  if (canUseCityCentroid) {
    const cityQuery = `${city}, ${county} County, Ohio`;
    const cityResult = await geocodeAddress(cityQuery, supabaseClient, mapboxToken);
    if (cityResult) {
      return {
        latitude: cityResult.latitude,
        longitude: cityResult.longitude,
        formatted_address: cityResult.formatted_address,
        confidence: 'city_centroid',
        provider: cityResult.provider,
      };
    }
  }

  if (county) {
    const countyQuery = `${county} County, Ohio`;
    const countyResult = await geocodeAddress(countyQuery, supabaseClient, mapboxToken);
    if (countyResult) {
      return {
        latitude: countyResult.latitude,
        longitude: countyResult.longitude,
        formatted_address: countyResult.formatted_address,
        confidence: 'county_centroid',
        provider: countyResult.provider,
      };
    }
  }

  return null;
}

function extractStreetAddress(value: string): string {
  const streetType = String.raw`(?:Road|Rd\.?|Street|St\.?|Avenue|Ave\.?|Boulevard|Blvd\.?|Drive|Dr\.?|Lane|Ln\.?|Highway|Hwy\.?|Route|Pike|Parkway|Way|Court|Ct\.?|Place|Pl\.?)`;
  const directional = String.raw`(?:NE|NW|SE|SW|North|South|East|West|N|S|E|W)`;
  const patterns = [
    new RegExp(String.raw`\b(\d{2,6}\s+block\s+of\s+[A-Z0-9][^,.]*?\b${streetType}\b(?:\s+${directional})?)`, 'i'),
    new RegExp(String.raw`\b(\d{2,6}\s+[A-Z0-9][^,.]*?\b${streetType}\b(?:\s+${directional})?)`, 'i'),
    new RegExp(String.raw`\b([A-Z0-9][A-Za-z0-9'.\-\s]+?\b${streetType}\b(?:\s+(?:near|west|east|north|south|of|and|at|between)\s+[A-Z0-9][^,.]*?\b${streetType}\b)?)`, 'i'),
  ];

  for (const pattern of patterns) {
    const match = value.match(pattern)?.[1];
    if (match) {
      return match.replace(/\s+/g, ' ').replace(/[.;:]$/, '').trim();
    }
  }

  return value.trim();
}

export function parseAddress(locationString: string): {
  address: string;
  city: string;
  county: string;
} {
  const parts = locationString
    .split(',')
    .map((p) => p.trim())
    .filter(Boolean);

  const isOhioStateZipToken = (value: string): boolean =>
    /^(?:OH(?:IO)?)?\s*\d{5}(?:-\d{4})?$/i.test(value) || /^OH$/i.test(value);
  const normalizeCounty = (value: string): string => value.replace(/\s+County$/i, '').trim();
  const nonStateZipParts = parts.filter((part) => !isOhioStateZipToken(part));
  const countyIndex = parts.findIndex((part) => /\bCounty$/i.test(part));

  let address = '';
  let city = '';
  let county = '';

  if (countyIndex !== -1) {
    county = normalizeCounty(parts[countyIndex]!);

    const prefixParts = parts.slice(0, countyIndex).filter((part) => !isOhioStateZipToken(part));

    if (prefixParts.length >= 2) {
      city = prefixParts[prefixParts.length - 1]!;
      address = prefixParts.slice(0, -1).join(', ').trim() || city;
    } else if (prefixParts.length === 1) {
      address = prefixParts[0]!;
      city = prefixParts[0]!;
    }
  } else if (nonStateZipParts.length >= 3) {
    address = nonStateZipParts.slice(0, -2).join(', ').trim() || nonStateZipParts[0]!;
    city = nonStateZipParts[nonStateZipParts.length - 2]!;
    county = normalizeCounty(nonStateZipParts[nonStateZipParts.length - 1]!);
  } else if (parts.length >= 3) {
    address = parts[0]!;
    city = parts[1]!;
    county = normalizeCounty(parts[2]!);
  } else if (parts.length === 2) {
    address = parts[0]!;
    city = parts[1]!;
    county = normalizeCounty(parts[1]!);
  } else {
    address = locationString;
    city = locationString;
    county = 'Unknown';
  }

  if (!address && city) address = city;
  if (!city && address) city = address;
  if (!county) county = 'Unknown';
  address = extractStreetAddress(address);

  return { address, city, county };
}
