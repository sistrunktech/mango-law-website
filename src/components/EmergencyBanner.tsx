import { Link } from 'react-router-dom';
import { MapPin } from 'lucide-react';

export default function EmergencyBanner() {
  return (
    <div className="sticky top-0 z-40 border-b border-brand-leaf/20 bg-gradient-to-r from-brand-leaf to-brand-teal backdrop-blur">
      <div className="container py-2">
        <Link
          to="/resources/dui-checkpoints"
          className="flex min-w-0 items-center justify-center gap-2 text-white transition-opacity hover:opacity-90"
        >
          <MapPin className="h-4 w-4 shrink-0" />
          <p className="truncate text-[13px] font-semibold leading-snug sm:text-[14px]">
            <span className="hidden sm:inline">View Active DUI Checkpoints in Your Area</span>
            <span className="sm:hidden">View DUI Checkpoints</span>
          </p>
        </Link>
      </div>
    </div>
  );
}
