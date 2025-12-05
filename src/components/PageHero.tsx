import { Link } from 'react-router-dom';
import { ArrowRight, Phone, Shield, Scale, Clock, Award } from 'lucide-react';

type Props = {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  description?: string;
  ctaLabel?: string;
  ctaHref?: string;
  secondaryCtaLabel?: string;
  secondaryCtaHref?: string;
  phoneNumber?: string;
  variant?: 'dark' | 'light';
  /** Image URL for hero background - ready for FAL.ai generated assets */
  backgroundUrl?: string;
  /** Attorney photo URL */
  attorneyPhotoUrl?: string;
  /** Show the quick action cards */
  showQuickActions?: boolean;
  /** Compact variant for inner pages */
  compact?: boolean;
  /** Align content to the left (for practice area pages) */
  alignLeft?: boolean;
};

const quickActions = [
  {
    icon: Shield,
    title: 'Charged with a DUI / OVI?',
    description: 'Learn about the penalties and how Delaware\'s Mango Law can help.',
    href: '/ovi-dui-defense-delaware-oh',
    label: 'OVI Defense',
  },
  {
    icon: Scale,
    title: 'Charged with a Crime?',
    description: 'Learn about Delaware\'s criminal defense options and how we can help.',
    href: '/criminal-defense-delaware-oh',
    label: 'Criminal Defense',
  },
];

export default function PageHero({
  eyebrow,
  title,
  subtitle,
  description,
  ctaLabel,
  ctaHref,
  secondaryCtaLabel,
  secondaryCtaHref,
  phoneNumber = '(740) 602-2155',
  variant = 'dark',
  backgroundUrl,
  attorneyPhotoUrl,
  showQuickActions = true,
  compact = false,
  alignLeft = false,
}: Props) {
  const isDark = variant === 'dark';

  return (
    <section className="relative">
      {/* Main Hero */}
      <div
        className={[
          'relative overflow-hidden',
          compact ? 'py-20 md:py-24' : 'py-20 md:py-28 lg:py-36',
          'text-brand-offWhite',
        ].join(' ')}
      >
        {/* Deep black to forest green gradient - fresh, authoritative */}
        <div className="absolute inset-0 bg-gradient-to-br from-brand-black via-[#0F1A14] to-brand-forest" />

        {/* Subtle emerald gradient overlay for energy */}
        <div className="absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-brand-leaf/5" />

        {/* Diagonal emerald accent stripe */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `repeating-linear-gradient(
              -45deg,
              transparent,
              transparent 100px,
              rgba(34, 197, 94, 0.3) 100px,
              rgba(34, 197, 94, 0.3) 102px
            )`,
          }}
        />

        {/* Background image with overlay (if provided) */}
        {backgroundUrl && (
          <div className="absolute inset-0">
            <img
              src={backgroundUrl}
              alt=""
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-brand-black via-brand-black/90 to-brand-black/70" />
          </div>
        )}

        {/* Faded mango icon decoration - tilted, off-center right */}
        <div className="pointer-events-none absolute right-[10%] top-1/2 -translate-y-1/2 opacity-[0.03] rotate-12">
          <img
            src="/images/brand/mango-icon-white.svg"
            alt=""
            className="h-[500px] w-[500px]"
          />
        </div>

        {/* Gradient orbs - emerald + mango for brand energy */}
        <div className="pointer-events-none absolute -right-40 top-1/4 h-[500px] w-[500px] rounded-full bg-brand-leaf/8 blur-[120px]" />
        <div className="pointer-events-none absolute -left-40 bottom-0 h-[400px] w-[400px] rounded-full bg-brand-mango/6 blur-[100px]" />

        <div className="container relative">
          <div className={[
            alignLeft ? 'max-w-3xl' : 'mx-auto max-w-4xl',
            alignLeft ? 'text-left' : 'text-center',
          ].join(' ')}>
            {/* Eyebrow */}
            {eyebrow && (
              <p className="mb-4 text-sm font-semibold uppercase tracking-[0.25em] text-brand-mango">
                {eyebrow}
              </p>
            )}

            {/* Subtitle */}
            {subtitle && (
              <p className="mb-2 text-lg text-brand-offWhite/70 md:text-xl">
                {subtitle}
              </p>
            )}

            {/* Main headline */}
            <h1 className={[
              'font-display font-black tracking-tight',
              compact || alignLeft
                ? 'text-3xl md:text-4xl lg:text-5xl'
                : 'text-4xl uppercase md:text-5xl lg:text-6xl xl:text-7xl',
            ].join(' ')}>
              {alignLeft ? (
                <span className="text-brand-offWhite">{title}</span>
              ) : (
                <>
                  <span className="text-brand-mango">Hire an Aggressive</span>
                  <br />
                  <span className="text-brand-offWhite">Attorney</span>
                </>
              )}
            </h1>

            {/* Description */}
            {description && (
              <p className={[
                'mt-6 text-lg text-brand-offWhite/70 md:text-xl',
                alignLeft ? 'max-w-2xl' : 'mx-auto max-w-2xl',
              ].join(' ')}>
                {description}
              </p>
            )}

            {/* CTA Buttons */}
            <div className={[
              'mt-8 flex flex-col gap-4 sm:flex-row',
              alignLeft ? 'items-start justify-start' : 'items-center justify-center',
            ].join(' ')}>
              {ctaLabel && ctaHref && (
                <Link
                  to={ctaHref}
                  className="group inline-flex items-center gap-2 rounded-lg bg-brand-mango px-8 py-4 text-lg font-bold text-brand-black shadow-lg transition-all hover:bg-brand-gold hover:shadow-xl hover:-translate-y-0.5"
                >
                  {ctaLabel}
                  <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Link>
              )}
              <a
                href={`tel:${phoneNumber.replace(/\D/g, '')}`}
                className="group inline-flex items-center gap-2 rounded-lg border-2 border-brand-offWhite/30 px-8 py-4 text-lg font-bold text-brand-offWhite transition-all hover:border-brand-mango hover:text-brand-mango"
              >
                <Phone className="h-5 w-5" />
                {phoneNumber}
              </a>
            </div>

            {/* Trust badges - clean, consistent green icons */}
            {!compact && (
              <div className="mt-10 flex flex-wrap items-center justify-center gap-6 text-sm text-brand-offWhite/70">
                <span className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-brand-leaf" />
                  <span>Available 24/7</span>
                </span>
                <span className="hidden h-4 w-px bg-brand-offWhite/20 sm:block" />
                <span className="flex items-center gap-2">
                  <Award className="h-5 w-5 text-brand-leaf" />
                  <span>Free Consultation</span>
                </span>
                <span className="hidden h-4 w-px bg-brand-offWhite/20 sm:block" />
                <span className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-brand-leaf" />
                  <span>Confidential</span>
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Quick Action Cards - overlapping the hero for depth */}
      {showQuickActions && !compact && (
        <div className="relative z-10 -mt-20 pb-12">
          <div className="container">
            <div className="mx-auto grid max-w-4xl gap-6 md:grid-cols-2">
              {quickActions.map((action, i) => (
                <Link
                  key={i}
                  to={action.href}
                  className="group relative rounded-2xl bg-white border border-brand-black/10 p-8 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-soft-lg"
                >
                  <div className="flex items-start gap-5">
                    {/* Icon - gold with gold background */}
                    <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-brand-mango/10 transition-all group-hover:bg-brand-mango/20">
                      <action.icon className="h-8 w-8 text-brand-mango transition-colors" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-brand-black transition-colors group-hover:text-brand-mango">
                        {action.title}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-brand-black/60">
                        {action.description}
                      </p>
                      <span className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-brand-leaf transition-colors">
                        {action.label}
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
