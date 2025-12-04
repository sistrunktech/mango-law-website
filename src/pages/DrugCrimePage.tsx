import PageHero from '../components/PageHero';
import CTASection from '../components/CTASection';

export default function DrugCrimePage() {
  return (
    <>
      <PageHero
        eyebrow="Drug Crimes"
        title="Drug crime defense with attention to testing, searches, and diversion paths."
        description="Possession, trafficking, paraphernalia, and related allegations—handled with motion practice and practical strategies."
        ctaLabel="Schedule a consult"
        ctaHref="/contact"
        variant="light"
      />

      <section className="container py-12 grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-brand-black/10 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-brand-black">What we examine</h2>
          <ul className="mt-3 space-y-2 text-sm text-brand-black/80">
            <li>• Basis for stop, search, and seizure</li>
            <li>• Lab handling, timelines, and results</li>
            <li>• Chain of custody and warrant scope</li>
            <li>• Treatment and diversion opportunities</li>
          </ul>
        </div>
        <div className="rounded-2xl border border-brand-black/10 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-brand-black">Approach</h2>
          <ul className="mt-3 space-y-2 text-sm text-brand-black/80">
            <li>• Targeted motions to suppress where facts support it</li>
            <li>• Negotiations mindful of collateral consequences</li>
            <li>• Court-ready filings and straightforward communication</li>
          </ul>
        </div>
      </section>

      <CTASection
        title="Let’s review your drug case quickly."
        primaryLabel="Schedule a consult"
        primaryHref="/contact"
        secondaryLabel="Call the office"
        secondaryHref="tel:5550000000"
      />
    </>
  );
}
