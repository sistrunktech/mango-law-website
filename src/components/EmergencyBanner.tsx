import { Link } from 'react-router-dom';
import { MapPin } from 'lucide-react';

export default function EmergencyBanner() {
  return (
    <div className="sticky top-0 z-40 border-b border-brand-leaf/30 bg-gradient-to-r from-brand-leaf via-brand-teal to-brand-leaf shadow-sm">
      <div className="container py-2.5">
        <Link
          to="/resources/dui-checkpoints"
          className="group flex min-w-0 items-center justify-center gap-2.5 text-white transition-all hover:gap-3"
        >
          <div className="flex h-6 w-6 items-center justify-center rounded-md bg-brand-mango/90 shadow-sm transition-transform group-hover:scale-110">
            <MapPin className="h-3.5 w-3.5 text-brand-black" aria-hidden="true" />
          </div>
          <p className="truncate text-[13px] font-semibold leading-snug tracking-wide sm:text-[14px]">
            <span className="hidden sm:inline">View Active DUI Checkpoints in Your Area</span>
            <span className="sm:hidden">View DUI Checkpoints</span>
          </p>
        </Link>
      </div>
    </div>
  );
}
