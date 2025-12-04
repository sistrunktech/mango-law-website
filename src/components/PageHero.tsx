import { Link } from 'react-router-dom';
import { ArrowRight, Phone, Shield, Scale, Clock, Award } from 'lucide-react';
import { MangoSilhouette } from './MangoIcon';

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
        {/* Rich gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-brand-black via-brand-charcoal to-brand-navy" />
        
        {/* Diagonal gold accent stripe */}
        <div 
          className="pointer-events-none absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `repeating-linear-gradient(
              -45deg,
              transparent,
              transparent 100px,
              rgba(212, 168, 75, 0.3) 100px,
              rgba(212, 168, 75, 0.3) 102px
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

        {/* Decorative mango silhouettes */}
        <MangoSilhouette className="pointer-events-none absolute -right-20 top-10 h-80 w-80 text-brand-mango/[0.03] rotate-12" />
        <MangoSilhouette className="pointer-events-none absolute -left-10 bottom-20 h-48 w-48 text-brand-mango/[0.02] -rotate-12" />
        
        {/* Gradient orbs */}
        <div className="pointer-events-none absolute -right-40 top-1/4 h-[500px] w-[500px] rounded-full bg-brand-mango/10 blur-[120px]" />
        <div className="pointer-events-none absolute -left-40 bottom-0 h-[400px] w-[400px] rounded-full bg-brand-accent/10 blur-[100px]" />

        <div className="container relative">
          <div className="mx-auto max-w-4xl text-center">
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
              'font-display font-black uppercase tracking-tight',
              compact
                ? 'text-3xl md:text-4xl lg:text-5xl'
                : 'text-4xl md:text-5xl lg:text-6xl xl:text-7xl',
            ].join(' ')}>
              <span className="text-brand-mango">Hire an Aggressive</span>
              <br />
              <span className="text-brand-offWhite">Attorney</span>
            </h1>

            {/* Description */}
            {description && (
              <p className="mx-auto mt-6 max-w-2xl text-lg text-brand-offWhite/70 md:text-xl">
                {description}
              </p>
            )}

            {/* CTA Buttons */}
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
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

            {/* Trust badges */}
            {!compact && (
              <div className="mt-10 flex flex-wrap items-center justify-center gap-6 text-sm text-brand-offWhite/50">
                <span className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-brand-mango" />
                  Available 24/7
                </span>
                <span className="flex items-center gap-2">
                  <Award className="h-4 w-4 text-brand-mango" />
                  Free Consultation
                </span>
                <span className="flex items-center gap-2">
                  <Shield className="h-4 w-4 text-brand-mango" />
                  Confidential
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Quick Action Cards - overlapping the hero */}
      {showQuickActions && !compact && (
        <div className="relative z-10 -mt-16 pb-8">
          <div className="container">
            <div className="mx-auto grid max-w-4xl gap-6 md:grid-cols-2">
              {quickActions.map((action, i) => (
                <Link
                  key={i}
                  to={action.href}
                  className="group relative overflow-hidden rounded-2xl bg-white p-6 shadow-xl transition-all hover:-translate-y-1 hover:shadow-2xl"
                >
                  {/* Accent bar */}
                  <div className="absolute left-0 top-0 h-full w-1.5 bg-brand-mango transition-all group-hover:w-2" />
                  
                  <div className="flex items-start gap-4 pl-4">
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-brand-mango/10 transition-colors group-hover:bg-brand-mango/20">
                      <action.icon className="h-7 w-7 text-brand-mango" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-brand-black group-hover:text-brand-teal">
                        {action.title}
                      </h3>
                      <p className="mt-1 text-sm text-brand-black/60">
                        {action.description}
                      </p>
                      <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-brand-mango">
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
