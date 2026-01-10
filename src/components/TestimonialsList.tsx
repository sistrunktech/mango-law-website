import { Quote } from 'lucide-react';
import { testimonials } from '../data/testimonials';
import Link from 'next/link';

type Props = {
  showHeader?: boolean;
  variant?: 'standard' | 'featured';
};

export default function TestimonialsList({ showHeader = true, variant = 'standard' }: Props) {
  const [featured, ...rest] = testimonials;

  return (
    <div>
      {showHeader && (
        <div className="mb-10 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="accent-line" />
              <p className="eyebrow text-brand-goldText">Client Reviews</p>
            </div>
            <h2 className="text-display-sm md:text-display-md">Trusted guidance</h2>
          </div>
          <p className="text-sm text-brand-black/70">Testimonials are illustrative and not a guarantee of outcome.</p>
        </div>
      )}
      {variant === 'standard' ? (
        <div className="grid gap-6 md:grid-cols-2">
          {testimonials.map((item, index) => (
            <div
              key={item.name}
              className="group relative rounded-2xl border border-brand-black/10 bg-brand-offWhite p-6 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-soft-lg hover:border-brand-leaf/20"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="absolute -top-3 left-6 flex h-8 w-8 items-center justify-center rounded-full bg-brand-mango/20 transition-all duration-300 group-hover:bg-brand-mango/30 group-hover:scale-110">
                <Quote className="h-4 w-4 text-brand-mangoText" />
              </div>
              <p className="mt-3 text-sm text-brand-black/80 leading-relaxed">"{item.quote}"</p>
              <div className="mt-4 pt-3 border-t border-brand-black/10">
                <p className="text-xs font-bold uppercase tracking-[0.1em] text-brand-goldText">{item.name}</p>
                {'location' in item && item.location && (
                  <p className="text-xs text-brand-black/60 mt-1">{item.location}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2">
          <div className="md:col-span-2">
            <div className="relative overflow-hidden rounded-3xl border border-brand-black/10 bg-gradient-to-br from-brand-offWhite to-white p-8 shadow-soft-lg">
              <div className="flex items-start justify-between gap-6">
                <div className="space-y-4">
                  <div className="inline-flex items-center gap-2 rounded-full bg-brand-mango/10 px-3 py-1 text-xs font-bold text-brand-mangoText">
                    Featured review
                  </div>
                  <p className="text-base leading-relaxed text-brand-black/80 md:text-lg">
                    “{featured.quote}”
                  </p>
                </div>
                <div className="hidden md:flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-mango/15">
                  <Quote className="h-6 w-6 text-brand-mangoText" />
                </div>
              </div>
              <div className="mt-6 flex flex-wrap items-end justify-between gap-4 border-t border-brand-black/10 pt-5">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.12em] text-brand-goldText">{featured.name}</p>
                  {'location' in featured && featured.location && (
                    <p className="mt-1 text-xs text-brand-black/60">{featured.location}</p>
                  )}
                </div>
                <Link href="/contact" className="btn btn-primary" data-cta="reviews_featured_cta">
                  Free Case Review
                </Link>
              </div>
            </div>
          </div>

          {rest.slice(0, 4).map((item, index) => (
            <div
              key={item.name}
              className={[
                'group relative rounded-2xl border border-brand-black/10 p-6 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-soft-lg hover:border-brand-leaf/20',
                index % 2 === 0 ? 'bg-brand-offWhite' : 'bg-white',
              ].join(' ')}
            >
              <div className="absolute -top-3 left-6 flex h-8 w-8 items-center justify-center rounded-full bg-brand-mango/20 transition-all duration-300 group-hover:bg-brand-mango/30 group-hover:scale-110">
                <Quote className="h-4 w-4 text-brand-mangoText" />
              </div>
              <p className="mt-3 text-sm text-brand-black/80 leading-relaxed">"{item.quote}"</p>
              <div className="mt-4 pt-3 border-t border-brand-black/10">
                <p className="text-xs font-bold uppercase tracking-[0.1em] text-brand-goldText">{item.name}</p>
                {'location' in item && item.location && (
                  <p className="text-xs text-brand-black/60 mt-1">{item.location}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
