import PageHero from '../components/PageHero';
import CTASection from '../components/CTASection';

export default function CriminalDefensePage() {
  return (
    <>
      <PageHero
        eyebrow="Criminal Defense"
        title="Defense for felony and misdemeanor charges in Delaware County."
        description="Clear communication, organized discovery review, and strategic motion practice to protect your record."
        ctaLabel="Schedule a consult"
        ctaHref="/contact"
        variant="light"
      />

      <section className="container py-12 grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-brand-black/10 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-brand-black">Case types</h2>
          <ul className="mt-3 space-y-2 text-sm text-brand-black/80">
            <li>• Assault and domestic-related charges</li>
            <li>• Theft, fraud, and property crimes</li>
            <li>• Weapons charges and related enhancements</li>
            <li>• Juvenile matters with sensitivity to school impacts</li>
          </ul>
        </div>
        <div className="rounded-2xl border border-brand-black/10 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-brand-black">Strategy</h2>
          <ul className="mt-3 space-y-2 text-sm text-brand-black/80">
            <li>• Early assessment of evidentiary gaps and procedural errors</li>
            <li>• Negotiation posture aligned to goals and risk tolerance</li>
            <li>• Motion practice when stops, searches, or statements are at issue</li>
            <li>• Court-ready filings and clear timelines for every milestone</li>
          </ul>
        </div>
      </section>

      <CTASection
        title="Need a defense plan tailored to your case?"
        primaryLabel="Schedule a consult"
        primaryHref="/contact"
        secondaryLabel="Call the office"
        secondaryHref="tel:5550000000"
      />
    </>
  );
}
