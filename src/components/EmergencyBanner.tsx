import { AlertTriangle, Phone } from 'lucide-react';
import { DIRECT_PHONE_DISPLAY, DIRECT_PHONE_TEL } from '../lib/contactInfo';
import { trackCtaClick } from '../lib/analytics';

interface EmergencyBannerProps {
  onOpenLeadModal: () => void;
}

export default function EmergencyBanner({ onOpenLeadModal }: EmergencyBannerProps) {
  const handleCallClick = () => {
    trackCtaClick('checkpoint_banner_call_direct');
  };

  const handleLeadClick = () => {
    trackCtaClick('checkpoint_banner_free_consult');
    onOpenLeadModal();
  };

  return (
    <div className="sticky top-0 z-40 border-b border-brand-black/10 bg-brand-offWhite/95 backdrop-blur">
      <div className="container py-1">
        <div className="flex items-center justify-between gap-2">
          <div className="flex min-w-0 items-center gap-2 text-brand-black/80">
            <AlertTriangle className="h-4 w-4 shrink-0 text-brand-mango" />
            <p className="truncate text-[12px] font-medium leading-snug sm:text-[13px]">
              <span className="hidden sm:inline">Stopped at a checkpoint?</span>{' '}
              <span className="sm:hidden">Checkpoint?</span> Need help now?
            </p>
          </div>
          <div className="flex shrink-0 items-center gap-2">
            <a
              href={`tel:${DIRECT_PHONE_TEL}`}
              onClick={handleCallClick}
              className="inline-flex flex-1 items-center justify-center gap-2 whitespace-nowrap rounded-lg border border-brand-black/10 bg-white px-3 py-1.5 text-[13px] font-semibold text-brand-black transition-colors hover:bg-brand-mango/10 sm:flex-none"
              data-cta="checkpoint_banner_call_direct"
              aria-label={`Call direct: ${DIRECT_PHONE_DISPLAY}`}
            >
              <Phone className="h-4 w-4 text-brand-mango" />
              <span className="sm:hidden">Call</span>
              <span className="hidden sm:inline">
                Call (Direct) {DIRECT_PHONE_DISPLAY}
              </span>
            </a>
            <button
              onClick={handleLeadClick}
              className="flex-1 whitespace-nowrap rounded-lg bg-brand-mango px-3 py-1.5 text-[13px] font-semibold text-brand-black transition-colors hover:bg-brand-gold sm:flex-none"
              data-cta="checkpoint_banner_free_consult"
            >
              <span className="sm:hidden">Consult</span>
              <span className="hidden sm:inline">Free consult</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
