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
    <div className="sticky top-0 z-40 bg-gradient-to-r from-red-600 to-orange-600 shadow-lg">
      <div className="container py-3">
        <div className="flex flex-col items-center justify-between gap-3 sm:flex-row">
          <div className="flex items-center gap-3 text-white">
            <AlertTriangle className="h-5 w-5 shrink-0 animate-pulse" />
            <div>
              <p className="font-semibold">Stopped at a checkpoint? Need legal help NOW?</p>
              <p className="text-sm text-white/80">Available 24/7 for emergencies</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <a
              href="tel:7404176191"
              onClick={handleCallClick}
              className="inline-flex items-center gap-2 rounded-lg bg-white px-4 py-2 font-semibold text-red-600 transition-all hover:bg-red-50"
            >
              <Phone className="h-4 w-4" />
              <span className="hidden sm:inline">Call</span> (740) 417-6191
            </a>
            <button
              onClick={handleLeadClick}
              className="rounded-lg border-2 border-white px-4 py-2 font-semibold text-white transition-all hover:bg-white/10"
            >
              Free Case Review
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
