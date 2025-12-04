import PageHero from '../components/PageHero';
import CTASection from '../components/CTASection';

export default function PersonalInjuryPage() {
  return (
    <>
      <PageHero
        eyebrow="Personal Injury"
        title="Selective personal injury matters."
        description="Limited-scope representation for cases where we can add value—clear liability, coverage, and a practical strategy."
        ctaLabel="Schedule a consult"
        ctaHref="/contact"
        variant="light"
      />

      <section className="container py-12 grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-brand-black/10 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-brand-black">Evaluation</h2>
          <ul className="mt-3 space-y-2 text-sm text-brand-black/80">
            <li>• Liability assessment and investigation needs</li>
            <li>• Coverage review and demand strategy</li>
            <li>• Timelines and documentation for medical proof</li>
          </ul>
        </div>
        <div className="rounded-2xl border border-brand-black/10 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-brand-black">Communication</h2>
          <ul className="mt-3 space-y-2 text-sm text-brand-black/80">
            <li>• Straightforward updates and next steps</li>
            <li>• Practical approach to negotiation</li>
            <li>• Clear discussion of fees and expectations</li>
          </ul>
        </div>
      </section>

      <CTASection
        title="Discuss whether your matter is a fit."
        primaryLabel="Schedule a consult"
        primaryHref="/contact"
        secondaryLabel="Call the office"
        secondaryHref="tel:5550000000"
      />
    </>
  );
}
