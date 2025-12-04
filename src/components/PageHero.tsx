type Props = {
  eyebrow?: string;
  title: string;
  description?: string;
  ctaLabel?: string;
  ctaHref?: string;
  secondaryCtaLabel?: string;
  secondaryCtaHref?: string;
  variant?: 'dark' | 'light';
};

export default function PageHero({
  eyebrow,
  title,
  description,
  ctaLabel,
  ctaHref,
  secondaryCtaLabel,
  secondaryCtaHref,
  variant = 'dark',
}: Props) {
  const isDark = variant === 'dark';
  const descClass = isDark ? 'text-brand-offWhite/80' : 'text-brand-black/80';

  return (
    <section
      className={[
        'py-16',
        isDark ? 'bg-brand-black text-brand-offWhite' : 'bg-brand-offWhite text-brand-black',
      ].join(' ')}
    >
      <div className="container grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
        <div className="space-y-4">
          {eyebrow && (
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-mango">
              {eyebrow}
            </p>
          )}
          <h1 className="text-3xl font-bold leading-tight md:text-4xl">{title}</h1>
          {description && <p className={['max-w-2xl text-lg leading-relaxed', descClass].join(' ')}>{description}</p>}
          <div className="flex flex-wrap gap-3">
            {ctaLabel && ctaHref && (
              <a
                href={ctaHref}
                className="inline-flex items-center rounded-full bg-brand-gold px-5 py-3 text-sm font-semibold text-brand-black shadow-md transition hover:bg-brand-mango"
              >
                {ctaLabel}
              </a>
            )}
            {secondaryCtaLabel && secondaryCtaHref && (
              <a
                href={secondaryCtaHref}
                className={[
                  'inline-flex items-center rounded-full border px-5 py-3 text-sm font-semibold transition',
                  isDark
                    ? 'border-brand-offWhite/30 text-brand-offWhite hover:bg-white/10'
                    : 'border-brand-black/15 text-brand-black hover:bg-brand-black/5',
                ].join(' ')}
              >
                {secondaryCtaLabel}
              </a>
            )}
          </div>
        </div>
        <div className="rounded-2xl border border-brand-black/10 bg-white/80 p-6 shadow-lg backdrop-blur">
          <h3 className="text-lg font-semibold text-brand-black">Why Mango Law</h3>
          <ul className="mt-3 space-y-2 text-sm text-brand-black/80">
            <li>• Delaware, Ohio courtroom experience</li>
            <li>• Direct, plain-language guidance</li>
            <li>• Aggressive motion practice when facts support it</li>
            <li>• Prompt communication and clear next steps</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
