import { Link } from 'react-router-dom';
import { ArrowRight, Phone } from 'lucide-react';

type Props = {
  eyebrow?: string;
  title: string;
  body?: string;
  primaryLabel: string;
  primaryHref: string;
  secondaryLabel?: string;
  secondaryHref?: string;
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

      {/* Decorative elements */}
      <div className="pointer-events-none absolute -right-20 top-1/2 h-[400px] w-[400px] -translate-y-1/2 rounded-full bg-brand-teal/10 blur-3xl" />
      <div className="pointer-events-none absolute -left-10 top-0 h-[200px] w-[200px] rounded-full bg-brand-mango/10 blur-3xl" />

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
              className="btn btn-primary group"
            >
              {primaryLabel}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            {secondaryLabel && secondaryHref && (
              <a
                href={secondaryHref}
                className="btn border-2 border-brand-offWhite/20 text-brand-offWhite hover:border-brand-offWhite/40 hover:bg-white/5"
              >
                <Phone className="h-4 w-4" />
                {secondaryLabel}
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
