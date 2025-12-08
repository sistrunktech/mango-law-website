import { MapPin, Clock, Calendar, AlertCircle, ExternalLink } from 'lucide-react';
import type { DUICheckpoint } from '../data/checkpoints';
import { getStatusColor, getStatusLabel, formatCheckpointDateRange } from '../data/checkpoints';

type Props = {
  checkpoint: DUICheckpoint;
  onClick?: () => void;
};

export default function CheckpointCard({ checkpoint, onClick }: Props) {
  const statusColor = getStatusColor(checkpoint.status);
  const statusLabel = getStatusLabel(checkpoint.status);

  return (
    <div
      className="group relative overflow-hidden rounded-2xl border border-brand-black/10 bg-white p-6 shadow-soft transition-all duration-200 hover:-translate-y-1 hover:shadow-soft-lg cursor-pointer"
      onClick={onClick}
    >
      <div className="mb-4 flex items-start justify-between gap-4">
        <div className="flex-1">
          <h3 className="text-lg font-bold text-brand-black transition-colors group-hover:text-brand-mango">
            {checkpoint.title}
          </h3>
          <div className="mt-2 flex items-center gap-2 text-sm text-brand-black/70">
            <MapPin className="h-4 w-4 shrink-0" />
            <span>{checkpoint.location_address}, {checkpoint.location_city}</span>
          </div>
        </div>
        <span className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold ${statusColor}`}>
          {checkpoint.status === 'active' && <span className="h-2 w-2 animate-pulse rounded-full bg-current" />}
          {statusLabel}
        </span>
      </div>

      <div className="space-y-2">
        <div className="flex items-center gap-2 text-sm text-brand-black/70">
          <Calendar className="h-4 w-4 shrink-0 text-brand-leaf" />
          <span>{formatCheckpointDateRange(checkpoint.start_date, checkpoint.end_date)}</span>
        </div>

        <div className="flex items-center gap-2 text-sm text-brand-black/70">
          <Clock className="h-4 w-4 shrink-0 text-brand-mango" />
          <span>{checkpoint.location_county} County</span>
        </div>
      </div>

      {checkpoint.description && (
        <p className="mt-4 text-sm text-brand-black/70 line-clamp-2">
          {checkpoint.description}
        </p>
      )}

      <div className="mt-4 space-y-2">
        {checkpoint.source_name && (
          <div className="flex items-center gap-2 text-xs text-brand-black/60">
            <AlertCircle className="h-3.5 w-3.5" />
            <span>Source: {checkpoint.source_name}</span>
            {checkpoint.is_verified && (
              <span className="ml-auto rounded-full bg-brand-leaf/10 px-2 py-0.5 text-brand-leaf font-semibold">
                Verified
              </span>
            )}
          </div>
        )}

        {checkpoint.source_url && (
          <a
            href={checkpoint.source_url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg border border-brand-mango/20 bg-brand-mango/5 px-4 py-2.5 text-sm font-semibold text-brand-mango transition-all hover:border-brand-mango/40 hover:bg-brand-mango/10 hover:text-brand-leaf"
            onClick={(e) => e.stopPropagation()}
          >
            <ExternalLink className="h-4 w-4" />
            View Official Citation
          </a>
        )}
      </div>
    </div>
  );
}
