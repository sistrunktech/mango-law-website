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

const OHIO_BOUNDS = {
  minLatitude: 38.4032,
  maxLatitude: 41.9773,
  minLongitude: -84.8203,
  maxLongitude: -80.5189,
};

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

export async function geocodeAddress(
  address: string,
  supabaseClient: any,
  mapboxToken?: string
): Promise<GeocodingResult | CachedResult | null> {
  const normalizedAddress = address.trim().toLowerCase();

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

    const encodedAddress = encodeURIComponent(address);
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

  return { address, city, county };
}
