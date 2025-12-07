import { Quote } from 'lucide-react';
import { testimonials } from '../data/testimonials';

export default function TestimonialsList() {
  return (
    <section className="bg-white">
      <div className="container py-12">
        <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="accent-line" />
              <p className="eyebrow text-brand-gold">Client Reviews</p>
            </div>
            <h2 className="text-display-sm md:text-display-md">Trusted guidance</h2>
          </div>
          <p className="text-sm text-brand-black/70">Testimonials are illustrative and not a guarantee of outcome.</p>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {testimonials.map((item, index) => (
            <div
              key={item.name}
              className="group relative rounded-2xl border border-brand-black/10 bg-brand-offWhite p-6 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-soft-lg hover:border-brand-leaf/20"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="absolute -top-3 left-6 flex h-8 w-8 items-center justify-center rounded-full bg-brand-mango/20 transition-all duration-300 group-hover:bg-brand-mango/30 group-hover:scale-110">
                <Quote className="h-4 w-4 text-brand-mango" />
              </div>
              <p className="mt-3 text-sm text-brand-black/80 leading-relaxed">"{item.quote}"</p>
              <div className="mt-4 pt-3 border-t border-brand-black/10">
                <p className="text-xs font-bold uppercase tracking-[0.1em] text-brand-gold">{item.name}</p>
                {'location' in item && item.location && (
                  <p className="text-xs text-brand-black/60 mt-1">{item.location}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
