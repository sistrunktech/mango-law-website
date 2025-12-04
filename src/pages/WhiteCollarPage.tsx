import PageHero from '../components/PageHero';
import CTASection from '../components/CTASection';

export default function WhiteCollarPage() {
  return (
    <>
      <PageHero
        eyebrow="White Collar Crimes"
        title="Strategic defense for white collar investigations and charges."
        description="Fraud, embezzlement, securities issues, and related matters with careful document review and motion practice."
        ctaLabel="Schedule a consult"
        ctaHref="/contact"
        variant="light"
      />

      <section className="container py-12 grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-brand-black/10 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-brand-black">What matters</h2>
          <ul className="mt-3 space-y-2 text-sm text-brand-black/80">
            <li>• Early engagement with investigators when appropriate</li>
            <li>• Organized review of records and communications</li>
            <li>• Motion practice on search, seizure, and statements</li>
            <li>• Negotiation strategies aligned to risk and goals</li>
          </ul>
        </div>
        <div className="rounded-2xl border border-brand-black/10 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-brand-black">Communication</h2>
          <ul className="mt-3 space-y-2 text-sm text-brand-black/80">
            <li>• Clear updates and next steps</li>
            <li>• Coordination with experts when necessary</li>
            <li>• Discreet handling of sensitive information</li>
          </ul>
        </div>
      </section>

      <CTASection
        title="Need guidance on an investigation?"
        primaryLabel="Schedule a consult"
        primaryHref="/contact"
        secondaryLabel="Call the office"
        secondaryHref="tel:5550000000"
      />
    </>
  );
}
