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

      return {
        latitude: parseFloat(cached.latitude),
        longitude: parseFloat(cached.longitude),
        formatted_address: cached.formatted_address,
        confidence: cached.confidence,
        provider: cached.provider,
        id: cached.id,
        cached: true,
      };
    }

    if (!mapboxToken) {
      console.warn('No Mapbox token available for geocoding');
      return null;
    }

    const encodedAddress = encodeURIComponent(address);
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodedAddress}.json?access_token=${mapboxToken}&country=US&limit=1`;

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

    const feature = data.features[0];
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
  const parts = locationString.split(',').map((p) => p.trim());

  let address = '';
  let city = '';
  let county = '';

  if (parts.length >= 3) {
    address = parts[0];
    city = parts[1];
    county = parts[2].replace(/\s+County$/i, '');
  } else if (parts.length === 2) {
    address = parts[0];
    city = parts[1];
    county = parts[1];
  } else {
    address = locationString;
    city = locationString;
    county = 'Unknown';
  }

  return { address, city, county };
}
