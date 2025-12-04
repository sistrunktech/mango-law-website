import { oviSubsections } from '../data/practiceAreas';
import PageHero from '../components/PageHero';
import CTASection from '../components/CTASection';

export default function OviDuiPage() {
  return (
    <>
      <PageHero
        eyebrow="OVI / DUI Defense"
        title="OVI and DUI defense with targeted motion practice and local insight."
        description="High-test, felony OVI, refusals, underage DUI, and drug OVI. Clear timelines and informed negotiation, backed by detailed discovery review."
        ctaLabel="Schedule a consult"
        ctaHref="/contact"
        secondaryCtaLabel="Call the office"
        secondaryCtaHref="tel:5550000000"
        variant="light"
      />

      <section className="container py-12 space-y-6">
        <div className="rounded-2xl border border-brand-black/10 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-bold text-brand-black">Common OVI scenarios</h2>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            {oviSubsections.map((item) => (
              <div key={item.id} id={item.id} className="rounded-xl border border-brand-black/10 bg-brand-offWhite p-4">
                <h3 className="text-lg font-semibold text-brand-black">{item.title}</h3>
                <p className="mt-2 text-sm text-brand-black/80">{item.copy}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="grid gap-6 rounded-2xl border border-brand-black/10 bg-white p-6 shadow-sm lg:grid-cols-2">
          <div>
            <h3 className="text-lg font-semibold text-brand-black">Approach</h3>
            <ul className="mt-2 space-y-2 text-sm text-brand-black/80">
              <li>• Review stop basis, probable cause, and testing protocols</li>
              <li>• File targeted motions to suppress when facts support it</li>
              <li>• Address license and BMV impacts early</li>
              <li>• Clear communication on timelines and likely outcomes</li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-brand-black">What to expect</h3>
            <ul className="mt-2 space-y-2 text-sm text-brand-black/80">
              <li>• Prompt consult to gather facts and goals</li>
              <li>• Discovery review and strategy outline</li>
              <li>• Negotiation informed by local practices</li>
              <li>• Court-ready filings and hearing preparation</li>
            </ul>
          </div>
        </div>
      </section>

      <CTASection
        title="Facing an OVI charge? Let’s move quickly."
        primaryLabel="Schedule a consult"
        primaryHref="/contact"
        secondaryLabel="Call the office"
        secondaryHref="tel:5550000000"
      />
    </>
  );
}
