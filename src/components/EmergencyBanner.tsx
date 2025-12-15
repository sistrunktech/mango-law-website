import { AlertTriangle } from 'lucide-react';

export default function EmergencyBanner() {
  return (
    <div className="sticky top-0 z-40 border-b border-brand-black/10 bg-brand-offWhite/95 backdrop-blur">
      <div className="container py-1">
        <div className="flex min-w-0 items-center gap-2 text-brand-black/80">
          <AlertTriangle className="h-4 w-4 shrink-0 text-brand-mango" />
          <p className="truncate text-[12px] font-medium leading-snug sm:text-[13px]">
            <span className="hidden sm:inline">Stopped at a checkpoint?</span>{' '}
            <span className="sm:hidden">Checkpoint?</span> Need help now? See options below.
          </p>
        </div>
      </div>
    </div>
  );
}
