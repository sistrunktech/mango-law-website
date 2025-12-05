import ContactForm from '../components/ContactForm';
import PageHero from '../components/PageHero';
import LocationBlock from '../components/LocationBlock';

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Schedule a consult with Mango Law."
        description="Share a few details and we’ll respond promptly. For urgent matters, call the office."
        ctaLabel="Call the office"
        ctaHref="tel:7404176191"
        variant="light"
      />

      <section className="bg-white">
        <div className="container grid gap-8 py-12 lg:grid-cols-2">
          <div className="space-y-3">
            <h2 className="text-2xl font-bold text-brand-black">Send a message</h2>
            <p className="text-sm text-brand-black/70">
              We respect your time. You will receive a clear reply with next steps and what to expect.
            </p>
          </div>
          <div className="rounded-2xl border border-brand-black/10 bg-brand-offWhite p-6 shadow-sm">
            <ContactForm />
          </div>
        </div>
      </section>

      <LocationBlock />
    </>
  );
}
