import PageHero from '../components/PageHero';
import CTASection from '../components/CTASection';

export default function SexCrimePage() {
  return (
    <>
      <PageHero
        eyebrow="Sex Crimes"
        title="Discreet, assertive defense for sensitive allegations."
        description="Protecting privacy while challenging evidence, procedure, and credibility. Clear communication, no scare tactics."
        ctaLabel="Schedule a consult"
        ctaHref="/contact"
        variant="light"
      />

      <section className="container py-12 grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-brand-black/10 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-brand-black">Focus areas</h2>
          <ul className="mt-3 space-y-2 text-sm text-brand-black/80">
            <li>• Investigation gaps and credibility challenges</li>
            <li>• Evidentiary motions to limit prejudicial material</li>
            <li>• Early strategy on media and privacy concerns</li>
            <li>• Expert coordination when needed</li>
          </ul>
        </div>
        <div className="rounded-2xl border border-brand-black/10 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-brand-black">Communication</h2>
          <ul className="mt-3 space-y-2 text-sm text-brand-black/80">
            <li>• Direct updates without alarmism</li>
            <li>• Timelines for key hearings and filings</li>
            <li>• Respectful, discreet handling of client information</li>
          </ul>
        </div>
      </section>

      <CTASection
        title="Facing a sensitive allegation? Let’s talk."
        primaryLabel="Schedule a consult"
        primaryHref="/contact"
        secondaryLabel="Call the office"
        secondaryHref="tel:5550000000"
      />
    </>
  );
}
