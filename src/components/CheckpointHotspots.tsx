'use client';

import { useState, useEffect } from 'react';
import { MapPin, TrendingUp } from 'lucide-react';
import { getCheckpointHotspots, type CheckpointHotspot } from '../lib/checkpointService';

interface CheckpointHotspotsProps {
  onCityClick?: (city: string, county: string) => void;
}

export default function CheckpointHotspots({ onCityClick }: CheckpointHotspotsProps) {
  const [hotspots, setHotspots] = useState<CheckpointHotspot[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadHotspots();
  }, []);

  const loadHotspots = async () => {
    try {
      setLoading(true);
      const data = await getCheckpointHotspots(8);
      setHotspots(data);
    } catch (error) {
      console.error('Failed to load hotspots:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="mb-6 rounded-xl border border-brand-black/10 bg-brand-offWhite p-4">
        <div className="flex items-center gap-2">
          <div className="h-4 w-4 animate-pulse rounded bg-brand-black/10" />
          <div className="h-4 w-32 animate-pulse rounded bg-brand-black/10" />
        </div>
      </div>
    );
  }

  if (hotspots.length === 0) {
    return null;
  }

  const maxCount = Math.max(...hotspots.map(h => h.count));

  return (
    <div className="mb-6 overflow-hidden rounded-xl border border-brand-black/10 bg-gradient-to-br from-brand-offWhite to-white p-6 shadow-sm">
      <div className="mb-4 flex items-center gap-2 border-b border-brand-black/10 pb-3">
        <TrendingUp className="h-5 w-5 text-brand-mango" />
        <h3 className="text-base font-bold text-brand-black">Most Common Checkpoint Areas</h3>
      </div>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-2">
        {hotspots.map((hotspot, index) => {
          const intensity = hotspot.count / maxCount;
          const bgOpacity = Math.max(0.05, intensity * 0.15);
          const isTopHotspot = index < 3;

          return (
            <button
              key={`${hotspot.city}-${hotspot.county}`}
              onClick={() => onCityClick?.(hotspot.city, hotspot.county)}
              className="group relative flex items-center gap-3 rounded-lg border border-brand-black/10 bg-white p-3 text-left shadow-sm transition-all hover:border-brand-mango/40 hover:shadow-md hover:-translate-y-0.5"
              style={{
                background: `linear-gradient(135deg, rgba(255, 166, 0, ${bgOpacity}) 0%, rgba(255, 255, 255, 1) 100%)`
              }}
            >
              {isTopHotspot && (
                <div className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-brand-mango text-xs font-bold text-brand-black shadow-md">
                  {index + 1}
                </div>
              )}
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand-mango/10 transition-colors group-hover:bg-brand-mango/20">
                <MapPin className="h-5 w-5 text-brand-mango" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-semibold text-brand-black truncate">
                  {hotspot.city}
                </div>
                <div className="text-xs text-brand-black/60">
                  {hotspot.county} County
                </div>
              </div>
              <div className="flex shrink-0 items-center gap-1.5">
                <div className="flex items-center gap-1">
                  <div className="h-1.5 w-1.5 rounded-full bg-brand-mango" />
                  <div className="h-2 rounded-full bg-brand-mango/20" style={{ width: `${Math.max(20, intensity * 40)}px` }} />
                </div>
                <span className="ml-1 flex h-7 w-10 items-center justify-center rounded-md bg-brand-mango/10 text-sm font-bold text-brand-mango">
                  {hotspot.count}
                </span>
              </div>
            </button>
          );
        })}
      </div>
      <p className="mt-4 text-xs text-brand-black/60">
        Based on publicly announced checkpoint data. Click a location to filter the map and list.
      </p>
    </div>
  );
}
