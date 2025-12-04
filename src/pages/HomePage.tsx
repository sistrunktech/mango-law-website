import PageHero from '../components/PageHero';
import PracticeAreaCardGrid from '../components/PracticeAreaCardGrid';
import TestimonialsList from '../components/TestimonialsList';
import CTASection from '../components/CTASection';
import LocationBlock from '../components/LocationBlock';
import ContactForm from '../components/ContactForm';

export default function HomePage() {
  return (
    <>
      <PageHero
        eyebrow="Delaware, Ohio Criminal Defense"
        title="Clear, assertive defense focused on your next move."
        description="Mango Law delivers plain-language guidance and courtroom advocacy for OVI, criminal defense, and related matters across Delaware County."
        ctaLabel="Schedule a consult"
        ctaHref="/contact"
        secondaryCtaLabel="View practice areas"
        secondaryCtaHref="/practice-areas"
      />

      <section className="container py-12">
        <div className="grid gap-6 rounded-2xl border border-brand-black/10 bg-white p-6 shadow-sm lg:grid-cols-3">
          <div className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-brand-gold">Why Mango Law</p>
            <h2 className="text-xl font-bold text-brand-black">Direct answers. Steady communication.</h2>
            <p className="text-sm text-brand-black/80">
              Defense that respects your time: precise updates, smart motions, and focus on outcomes that protect your
              record and future.
            </p>
          </div>
          <ul className="space-y-2 text-sm text-brand-black/80">
            <li>• Motion practice that challenges stops, searches, and testing</li>
            <li>• Negotiation informed by local court expectations</li>
            <li>• Court-ready filings and organized discovery review</li>
          </ul>
          <ul className="space-y-2 text-sm text-brand-black/80">
            <li>• Clear timelines and next steps at every milestone</li>
            <li>• Respectful, discreet representation in sensitive matters</li>
            <li>• Practical strategies for license, work, and family impacts</li>
          </ul>
        </div>
      </section>

      <PracticeAreaCardGrid />
      <TestimonialsList />
      <LocationBlock />

      <section className="bg-white">
        <div className="container grid gap-8 py-12 lg:grid-cols-2 lg:items-start">
          <div className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-gold">Contact</p>
            <h2 className="text-2xl font-bold text-brand-black">Tell us what’s going on</h2>
            <p className="text-sm text-brand-black/70">
              Share a few details about the situation. We’ll respond promptly with next steps and a clear path forward.
            </p>
          </div>
          <div className="rounded-2xl border border-brand-black/10 bg-brand-offWhite p-6 shadow-sm">
            <ContactForm />
          </div>
        </div>
      </section>

      <CTASection
        title="Need counsel now? Let’s talk today."
        body="Fast-moving situations deserve prompt, informed action. Schedule a consult or call to discuss your options."
        primaryLabel="Schedule a consult"
        primaryHref="/contact"
        secondaryLabel="Call the office"
        secondaryHref="tel:5550000000"
      />
    </>
  );
}
