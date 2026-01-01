'use client';

import { useState, useEffect } from 'react';
import { MapPin, Loader2, CheckCircle, AlertCircle } from 'lucide-react';

interface GeocodingPreviewProps {
  address: string;
  city: string;
  county: string;
  onCoordinatesFound?: (lat: number, lng: number) => void;
}

export default function GeocodingPreview({
  address,
  city,
  county,
  onCoordinatesFound,
}: GeocodingPreviewProps) {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{
    latitude: number;
    longitude: number;
    formatted_address: string;
    confidence: string;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fullAddress = `${address}, ${city}, ${county} County, Ohio`.trim();

  useEffect(() => {
    if (!address || !city) {
      setResult(null);
      setError(null);
      return;
    }

    const timer = setTimeout(() => {
      void (async () => {
        setLoading(true);
        setError(null);

        try {
          const mapboxToken =
            process.env.NEXT_PUBLIC_MAPBOX_PUBLIC_TOKEN || process.env.VITE_MAPBOX_PUBLIC_TOKEN;
          if (!mapboxToken) {
            throw new Error('Mapbox token not configured');
          }

          const encodedAddress = encodeURIComponent(fullAddress);
          const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodedAddress}.json?access_token=${mapboxToken}&country=US&limit=1`;

          const response = await fetch(url);
          if (!response.ok) {
            throw new Error('Geocoding failed');
          }

          const data = await response.json();

          if (!data.features || data.features.length === 0) {
            throw new Error('No results found');
          }

          const feature = data.features[0];
          const [longitude, latitude] = feature.center;

          let confidence = 'medium';
          if (feature.relevance >= 0.9) {
            confidence = 'high';
          } else if (feature.relevance < 0.7) {
            confidence = 'low';
          }

          const geocodeResult = {
            latitude,
            longitude,
            formatted_address: feature.place_name,
            confidence,
          };

          setResult(geocodeResult);

          if (onCoordinatesFound) {
            onCoordinatesFound(latitude, longitude);
          }
        } catch (err) {
          setError(err instanceof Error ? err.message : 'Failed to geocode address');
          setResult(null);
        } finally {
          setLoading(false);
        }
      })();
    }, 800);

    return () => clearTimeout(timer);
  }, [address, city, county, fullAddress, onCoordinatesFound]);

  if (!address || !city) {
    return null;
  }

  return (
    <div className="rounded-lg border border-brand-black/10 bg-brand-leaf/5 p-4">
      <div className="mb-2 flex items-center gap-2">
        <MapPin className="h-4 w-4 text-brand-leaf" />
        <span className="text-sm font-semibold text-brand-black">Geocoding Preview</span>
      </div>

      {loading && (
        <div className="flex items-center gap-2 text-sm text-brand-black/60">
          <Loader2 className="h-4 w-4 animate-spin" />
          <span>Geocoding address...</span>
        </div>
      )}

      {error && (
        <div className="flex items-start gap-2 text-sm text-red-600">
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
          <div>
            <p className="font-semibold">Geocoding failed</p>
            <p className="text-xs">{error}</p>
          </div>
        </div>
      )}

      {result && !loading && (
        <div className="space-y-2 text-sm">
          <div className="flex items-start gap-2">
            <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-green-600" />
            <div className="flex-1">
              <p className="font-semibold text-brand-black">Location found</p>
              <p className="text-xs text-brand-black/60">{result.formatted_address}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 rounded border border-brand-black/10 bg-white p-2 text-xs">
            <div>
              <span className="font-semibold text-brand-black/60">Latitude:</span>
              <p className="font-mono text-brand-black">{result.latitude.toFixed(6)}</p>
            </div>
            <div>
              <span className="font-semibold text-brand-black/60">Longitude:</span>
              <p className="font-mono text-brand-black">{result.longitude.toFixed(6)}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-brand-black/60">Confidence:</span>
            <span
              className={`rounded-full px-2 py-0.5 text-xs font-semibold ${
                result.confidence === 'high'
                  ? 'bg-green-100 text-green-700'
                  : result.confidence === 'medium'
                  ? 'bg-yellow-100 text-yellow-700'
                  : 'bg-red-100 text-red-700'
              }`}
            >
              {result.confidence}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
