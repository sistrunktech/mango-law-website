import PageHero from '../components/PageHero';
import CTASection from '../components/CTASection';

export default function ProtectionOrderPage() {
  return (
    <>
      <PageHero
        eyebrow="Protection Orders"
        title="Defense in civil protection order matters."
        description="Procedural precision, evidence review, and strategy to limit collateral impacts and protect your rights."
        ctaLabel="Schedule a consult"
        ctaHref="/contact"
        variant="light"
      />

      <section className="container py-12 grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-brand-black/10 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-brand-black">Focus</h2>
          <ul className="mt-3 space-y-2 text-sm text-brand-black/80">
            <li>• Evidence, timelines, and service issues</li>
            <li>• Hearing preparation and testimony readiness</li>
            <li>• Coordination with related criminal matters</li>
            <li>• Collateral considerations: employment, firearms, records</li>
          </ul>
        </div>
        <div className="rounded-2xl border border-brand-black/10 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-brand-black">What to expect</h2>
          <ul className="mt-3 space-y-2 text-sm text-brand-black/80">
            <li>• Clear next steps and timelines</li>
            <li>• Motion practice where facts support it</li>
            <li>• Direct, respectful communication</li>
          </ul>
        </div>
      </section>

      <CTASection
        title="Need help with a protection order?"
        primaryLabel="Schedule a consult"
        primaryHref="/contact"
        secondaryLabel="Call the office"
        secondaryHref="tel:5550000000"
      />
    </>
  );
}
