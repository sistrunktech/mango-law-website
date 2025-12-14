import PageHero from '../components/PageHero';
import ReviewsSidebar from '../components/ReviewsSidebar';
import CTASection from '../components/CTASection';
import { OFFICE_PHONE_DISPLAY, OFFICE_PHONE_TEL } from '../lib/contactInfo';
import { Quote } from 'lucide-react';
import { testimonials } from '../data/testimonials';

export default function ReviewsPage() {
  const [featured, ...rest] = testimonials;

  return (
    <>
      <PageHero
        eyebrow="Reviews"
        title="What clients say about working with Mango Law."
        description="Experiences shared by past clients. Every case is different; results are not guaranteed."
        ctaLabel="Schedule a consult"
        ctaHref="/contact"
        variant="light"
      />

      <section className="section bg-white">
        <div className="container">
          <div className="grid gap-8 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <div className="mb-10 rounded-3xl border border-brand-black/10 bg-gradient-to-br from-brand-offWhite to-white p-8 shadow-soft-lg">
                <div className="flex items-start justify-between gap-6">
                  <div className="space-y-4">
                    <p className="eyebrow text-brand-goldText">Featured Review</p>
                    <p className="text-base leading-relaxed text-brand-black/80 md:text-lg">
                      “{featured.quote}”
                    </p>
                  </div>
                  <div className="hidden md:flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-mango/15">
                    <Quote className="h-6 w-6 text-brand-mango" />
                  </div>
                </div>
                <div className="mt-6 border-t border-brand-black/10 pt-5">
                  <p className="text-xs font-bold uppercase tracking-[0.12em] text-brand-goldText">{featured.name}</p>
                  {'location' in featured && featured.location && (
                    <p className="mt-1 text-xs text-brand-black/60">{featured.location}</p>
                  )}
                </div>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                {rest.map((item, index) => (
                  <div
                    key={item.name}
                    className={[
                      'group relative rounded-2xl border border-brand-black/10 p-7 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-soft-lg hover:border-brand-leaf/20',
                      index % 3 === 0 ? 'md:col-span-2' : '',
                      index % 2 === 0 ? 'bg-brand-offWhite' : 'bg-white',
                    ].join(' ')}
                  >
                    <div className="absolute -top-3 left-6 flex h-8 w-8 items-center justify-center rounded-full bg-brand-mango/20 transition-all duration-300 group-hover:bg-brand-mango/30 group-hover:scale-110">
                      <Quote className="h-4 w-4 text-brand-mango" />
                    </div>
                    <p className="mt-3 text-sm leading-relaxed text-brand-black/80">"{item.quote}"</p>
                    <div className="mt-5 border-t border-brand-black/10 pt-4">
                      <p className="text-xs font-bold uppercase tracking-[0.12em] text-brand-goldText">{item.name}</p>
                      {'location' in item && item.location && (
                        <p className="mt-1 text-xs text-brand-black/60">{item.location}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="lg:sticky lg:top-8">
                <ReviewsSidebar />
              </div>
            </div>
          </div>
        </div>
      </section>

      <CTASection
        eyebrow="Ready for Experienced Representation?"
        title="Let's discuss your case"
        body="Join the clients who trusted Mango Law with their defense. Schedule a free consultation today."
        primaryLabel="Get Free Consultation"
        primaryHref="/contact"
        secondaryLabel={`Call ${OFFICE_PHONE_DISPLAY}`}
        secondaryHref={`tel:${OFFICE_PHONE_TEL}`}
      />
    </>
  );
}
