import PageHero from '../components/PageHero';
import CTASection from '../components/CTASection';

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About"
        title="Dominic Mango — focused on clear, assertive defense in Delaware, Ohio."
        description="A practice built on preparation, straight talk, and courtroom advocacy that respects your time and goals."
        ctaLabel="Schedule a consult"
        ctaHref="/contact"
        variant="light"
      />

      <section className="container py-12">
        <div className="grid gap-10 lg:grid-cols-2">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-brand-black">Defense approach</h2>
            <p className="text-sm text-brand-black/80">
              Dominic focuses on early case assessment, motion practice where facts support it, and candid communication.
              You will always know what is happening, why it matters, and what the options are.
            </p>
            <p className="text-sm text-brand-black/80">
              Whether negotiating with prosecutors or preparing for hearing, the goal is to protect your record and
              minimize collateral impacts on work, licensure, or family.
            </p>
          </div>
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-brand-black">Local knowledge</h3>
            <ul className="space-y-2 text-sm text-brand-black/80">
              <li>• Delaware County focus with awareness of local court practices</li>
              <li>• Organized discovery review to spot procedural and evidentiary gaps</li>
              <li>• Respectful, discreet handling of sensitive matters</li>
            </ul>
          </div>
        </div>
      </section>

      <CTASection
        title="Talk through your case with Dominic Mango"
        primaryLabel="Schedule a consult"
        primaryHref="/contact"
        secondaryLabel="Call the office"
        secondaryHref="tel:5550000000"
      />
    </>
  );
}
