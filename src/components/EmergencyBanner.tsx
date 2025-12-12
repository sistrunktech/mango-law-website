import { AlertTriangle, Phone } from 'lucide-react';

interface EmergencyBannerProps {
  onOpenLeadModal: () => void;
}

export default function EmergencyBanner({ onOpenLeadModal }: EmergencyBannerProps) {
  const handleCallClick = () => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'click', {
        event_category: 'CTA',
        event_label: 'emergency_banner_call',
      });
    }
  };

  const handleLeadClick = () => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'lead_capture_initiated', {
        event_category: 'Lead',
        event_label: 'emergency_banner',
      });
    }
    onOpenLeadModal();
  };

  return (
    <div className="sticky top-0 z-40 bg-brand-black/95 shadow-lg backdrop-blur-sm sm:bg-gradient-to-r sm:from-red-600 sm:to-orange-600 sm:backdrop-blur-none">
      <div className="container py-2 sm:py-3">
        <div className="flex flex-col items-start justify-between gap-2 sm:flex-row sm:items-center sm:gap-3">
          <div className="flex items-start gap-3 text-white">
            <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 animate-pulse sm:mt-0" />
            <div className="leading-snug">
              <p className="font-semibold text-sm sm:text-base">
                Stopped at a checkpoint? Need legal help now?
              </p>
              <p className="hidden text-xs text-white/80 sm:block sm:text-sm">
                Available 24/7 for emergencies
              </p>
            </div>
          </div>
          <div className="flex w-full flex-wrap items-center gap-2 sm:w-auto sm:gap-3">
            <a
              href="tel:7404176191"
              onClick={handleCallClick}
              className="inline-flex items-center gap-2 whitespace-nowrap rounded-lg bg-white/95 px-3 py-1.5 text-sm font-semibold text-red-700 shadow-sm transition-all hover:bg-white sm:px-4 sm:py-2 sm:text-base"
            >
              <Phone className="h-4 w-4" />
              <span className="hidden sm:inline">Call</span> (740) 417-6191
            </a>
            <button
              onClick={handleLeadClick}
              className="whitespace-nowrap rounded-lg border-2 border-white px-3 py-1.5 text-sm font-semibold text-white transition-all hover:bg-white/10 sm:px-4 sm:py-2 sm:text-base"
            >
              Free Case Review
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
