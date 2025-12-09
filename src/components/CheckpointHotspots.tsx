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
    <div className="mb-6 rounded-xl border border-brand-black/10 bg-brand-offWhite p-4">
      <div className="mb-3 flex items-center gap-2">
        <TrendingUp className="h-4 w-4 text-brand-mango" />
        <h3 className="text-sm font-semibold text-brand-black">Most Common Checkpoint Areas</h3>
      </div>
      <div className="flex flex-wrap gap-2">
        {hotspots.map((hotspot) => {
          const intensity = hotspot.count / maxCount;
          const bgOpacity = Math.max(0.1, intensity * 0.3);

          return (
            <button
              key={`${hotspot.city}-${hotspot.county}`}
              onClick={() => onCityClick?.(hotspot.city, hotspot.county)}
              className="group flex items-center gap-1.5 rounded-full border border-brand-black/10 bg-white px-3 py-1.5 text-sm transition-all hover:border-brand-mango/30 hover:bg-brand-mango/5"
              style={{
                backgroundColor: `rgba(255, 166, 0, ${bgOpacity})`
              }}
            >
              <MapPin className="h-3 w-3 text-brand-mango" />
              <span className="font-medium text-brand-black">{hotspot.city}</span>
              <span className="rounded-full bg-brand-black/10 px-1.5 py-0.5 text-xs font-semibold text-brand-black/70">
                {hotspot.count}
              </span>
            </button>
          );
        })}
      </div>
      <p className="mt-3 text-xs text-brand-black/60">
        Based on publicly announced checkpoint data. Click a location to filter.
      </p>
    </div>
  );
}
