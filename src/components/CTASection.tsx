import { Link } from 'react-router-dom';
import { ArrowRight, Phone } from 'lucide-react';
import { trackCtaClick, trackLeadSubmitted } from '../lib/analytics';

type Props = {
  eyebrow?: string;
  title: string;
  body?: string;
  primaryLabel: string;
  primaryHref: string;
  secondaryLabel?: string;
  secondaryHref?: string;
  secondaryCtaId?: string;
  /** Optional background image URL for FAL.ai generated assets */
  backgroundUrl?: string;
};

export default function CTASection({
  eyebrow = 'Ready to talk',
  title,
  body,
  primaryLabel,
  primaryHref,
  secondaryLabel,
  secondaryHref,
  secondaryCtaId,
  backgroundUrl,
}: Props) {
  return (
    <section className="relative overflow-hidden bg-cta-gradient text-brand-offWhite">
      {/* Background image placeholder */}
      {backgroundUrl && (
        <div className="absolute inset-0">
          <img
            src={backgroundUrl}
            alt=""
            className="h-full w-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-brand-black via-brand-black/90 to-transparent" />
        </div>
      )}

      {/* Decorative elements - forest and mango energy */}
      <div className="pointer-events-none absolute -right-20 top-1/2 h-[500px] w-[500px] -translate-y-1/2 rounded-full bg-brand-leaf/10 blur-[120px]" />
      <div className="pointer-events-none absolute -left-10 top-0 h-[300px] w-[300px] rounded-full bg-brand-mango/8 blur-3xl" />

      {/* Subtle texture overlay for depth */}
      <div className="absolute inset-0 texture-noise" />
      <div className="absolute inset-0 bg-gradient-to-t from-brand-black/10 to-transparent" />

      <div className="container relative section-tight">
        <div className="flex flex-col items-start gap-8 lg:flex-row lg:items-center lg:justify-between">
          {/* Content */}
          <div className="max-w-2xl space-y-4">
            <div className="flex items-center gap-3">
              <div className="h-1 w-8 rounded-full bg-brand-mango" />
              <p className="eyebrow text-brand-mango">{eyebrow}</p>
            </div>
            <h2 className="text-display-sm md:text-display-md">{title}</h2>
            {body && (
              <p className="text-lg text-brand-offWhite/70">{body}</p>
            )}
          </div>

          {/* Actions */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <Link
              to={primaryHref}
              className="group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-lg bg-brand-mango px-7 py-3.5 text-sm font-bold text-brand-black shadow-lg transition-all hover:bg-brand-gold hover:shadow-xl hover:-translate-y-1 active:translate-y-0"
            >
              <span className="relative z-10">{primaryLabel}</span>
              <ArrowRight className="relative z-10 h-4 w-4 transition-transform group-hover:translate-x-1" />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
            </Link>
            {secondaryLabel && secondaryHref && (
              <a
                href={secondaryHref}
                className="group inline-flex items-center justify-center gap-2 rounded-lg border-2 border-brand-offWhite/30 px-7 py-3.5 text-sm font-bold text-brand-offWhite transition-all hover:border-brand-leaf hover:bg-brand-leaf/20 hover:shadow-glow-leaf hover:-translate-y-1 active:translate-y-0"
                data-cta={secondaryCtaId || 'cta_section_secondary'}
                onClick={() => {
                  const ctaId = secondaryCtaId || 'cta_section_secondary';
                  trackCtaClick(ctaId);

                  if (secondaryHref.startsWith('tel:')) {
                    trackLeadSubmitted('phone', ctaId, {
                      target_number: secondaryHref.replace(/^tel:/, ''),
                    });
                  }
                }}
              >
                <Phone className="h-4 w-4 transition-transform group-hover:rotate-12" />
                {secondaryLabel}
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Gradient separator bar */}
      <div className="h-1.5 w-full bg-accent-bar" />
    </section>
  );
}
