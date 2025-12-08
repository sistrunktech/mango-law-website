import { MapPin, Navigation } from 'lucide-react';
import type { DUICheckpoint } from '../data/checkpoints';
import { getStatusColor } from '../data/checkpoints';

type Props = {
  checkpoints: DUICheckpoint[];
  selectedCheckpoint?: DUICheckpoint | null;
  onCheckpointSelect?: (checkpoint: DUICheckpoint) => void;
};

export default function CheckpointMap({ checkpoints, selectedCheckpoint, onCheckpointSelect }: Props) {
  const validCheckpoints = checkpoints.filter(c => c.latitude && c.longitude);

  const centerLat = validCheckpoints.length > 0
    ? validCheckpoints.reduce((sum, c) => sum + (c.latitude || 0), 0) / validCheckpoints.length
    : 40.1;
  const centerLon = validCheckpoints.length > 0
    ? validCheckpoints.reduce((sum, c) => sum + (c.longitude || 0), 0) / validCheckpoints.length
    : -83.1;

  return (
    <div className="relative h-full min-h-[500px] overflow-hidden rounded-2xl border border-brand-black/10 bg-brand-offWhite">
      <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-brand-leaf/5 to-brand-mango/5 p-8">
        <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-brand-mango/10">
          <Navigation className="h-8 w-8 text-brand-mango" />
        </div>
        <h3 className="mb-2 text-center text-xl font-bold text-brand-black">
          Interactive Map Coming Soon
        </h3>
        <p className="mb-8 max-w-md text-center text-sm text-brand-black/70">
          We're working on an interactive map to help you visualize checkpoint locations across Ohio.
          For now, use the list view below to see all upcoming checkpoints.
        </p>

        <div className="w-full max-w-2xl space-y-3">
          {validCheckpoints.slice(0, 5).map((checkpoint) => {
            const isSelected = selectedCheckpoint?.id === checkpoint.id;
            const statusColor = getStatusColor(checkpoint.status);

            return (
              <button
                key={checkpoint.id}
                onClick={() => onCheckpointSelect?.(checkpoint)}
                className={`group w-full rounded-xl border p-4 text-left transition-all hover:shadow-md ${
                  isSelected
                    ? 'border-brand-mango bg-brand-mango/5 shadow-soft'
                    : 'border-brand-black/10 bg-white hover:border-brand-mango/30'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${
                    isSelected ? 'bg-brand-mango/20' : 'bg-brand-leaf/10'
                  } transition-colors`}>
                    <MapPin className={`h-4 w-4 ${isSelected ? 'text-brand-mango' : 'text-brand-leaf'}`} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="font-semibold text-brand-black transition-colors group-hover:text-brand-mango">
                        {checkpoint.title}
                      </h4>
                      <span className={`inline-flex shrink-0 rounded-full border px-2 py-0.5 text-xs font-semibold ${statusColor}`}>
                        {checkpoint.status}
                      </span>
                    </div>
                    <p className="mt-1 text-sm text-brand-black/70">
                      {checkpoint.location_city}, {checkpoint.location_county} County
                    </p>
                    {checkpoint.latitude && checkpoint.longitude && (
                      <p className="mt-1 text-xs text-brand-black/50">
                        {checkpoint.latitude.toFixed(4)}, {checkpoint.longitude.toFixed(4)}
                      </p>
                    )}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {validCheckpoints.length > 5 && (
          <p className="mt-4 text-sm text-brand-black/60">
            + {validCheckpoints.length - 5} more checkpoints
          </p>
        )}

        {validCheckpoints.length === 0 && (
          <div className="rounded-xl border border-brand-black/10 bg-white p-6 text-center">
            <p className="text-sm text-brand-black/70">
              No checkpoints with location data available at this time.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
