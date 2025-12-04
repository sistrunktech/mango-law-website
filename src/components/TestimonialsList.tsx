import { testimonials } from '../data/testimonials';

export default function TestimonialsList() {
  return (
    <section className="bg-white">
      <div className="container py-12">
        <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-gold">Client Reviews</p>
            <h2 className="text-2xl font-bold">Trusted guidance</h2>
          </div>
          <p className="text-sm text-brand-black/70">Testimonials are illustrative and not a guarantee of outcome.</p>
        </div>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {testimonials.map((item) => (
            <div
              key={item.name}
              className="rounded-2xl border border-brand-black/10 bg-brand-offWhite p-5 shadow-sm"
            >
              <p className="text-sm text-brand-black/80 leading-relaxed">“{item.quote}”</p>
              <p className="mt-3 text-xs font-semibold uppercase tracking-[0.1em] text-brand-teal">{item.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
