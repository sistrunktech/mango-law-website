type Props = {
  title: string;
  body?: string;
  primaryLabel: string;
  primaryHref: string;
  secondaryLabel?: string;
  secondaryHref?: string;
};

export default function CTASection({ title, body, primaryLabel, primaryHref, secondaryLabel, secondaryHref }: Props) {
  return (
    <section className="bg-brand-black text-brand-offWhite">
      <div className="container flex flex-col gap-4 py-12 lg:flex-row lg:items-center lg:justify-between">
        <div className="max-w-2xl space-y-2">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-brand-mango">Ready to talk</p>
          <h2 className="text-2xl font-bold md:text-3xl">{title}</h2>
          {body && <p className="text-brand-offWhite/80">{body}</p>}
        </div>
        <div className="flex flex-wrap gap-3">
          <a
            href={primaryHref}
            className="inline-flex items-center rounded-full bg-brand-gold px-5 py-3 text-sm font-semibold text-brand-black shadow-md transition hover:bg-brand-mango"
          >
            {primaryLabel}
          </a>
          {secondaryLabel && secondaryHref && (
            <a
              href={secondaryHref}
              className="inline-flex items-center rounded-full border border-brand-offWhite/30 px-5 py-3 text-sm font-semibold text-brand-offWhite transition hover:bg-white/10"
            >
              {secondaryLabel}
            </a>
          )}
        </div>
      </div>
    </section>
  );
}
