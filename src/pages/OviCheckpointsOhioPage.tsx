import { Link } from 'react-router-dom';
import PageHero from '../components/PageHero';
import CTASection from '../components/CTASection';
import FAQSection from '../components/FAQSection';
import ImagePlaceholder from '../components/ImagePlaceholder';
import { SEO } from '../lib/seo';

const faqs = [
  {
    question: 'Are OVI checkpoints legal in Ohio?',
    answer: 'Yes. Ohio courts allow sobriety checkpoints when they follow specific guidelines that limit officer discretion and protect constitutional rights.',
  },
  {
    question: 'Do I have to answer questions at a checkpoint?',
    answer: 'You must provide license, registration, and proof of insurance. You can decline to answer other questions and ask to speak with a lawyer.',
  },
  {
    question: 'Can I refuse field sobriety tests?',
    answer: 'Field sobriety tests are voluntary in Ohio. Refusing may still lead to further investigation, so the decision should be made carefully.',
  },
  {
    question: 'What happens if I refuse a breath test?',
    answer: 'Refusing a chemical test can trigger an administrative license suspension under Ohio law. The consequences depend on prior history and case details.',
  },
  {
    question: 'How long does an OVI checkpoint stop take?',
    answer: 'Most stops are brief. If an officer suspects impairment, the stop can last longer for additional investigation.',
  },
  {
    question: 'Can checkpoints be announced in advance?',
    answer: 'Some agencies publish announcements, but not every checkpoint is publicized. Always follow safe driving practices.',
  },
];

export default function OviCheckpointsOhioPage() {
  return (
    <>
      <SEO
        title="Ohio OVI Checkpoints - Laws and What to Expect | Mango Law"
        description="Learn how Ohio OVI checkpoints work, your rights during a stop, and how to respond if an officer suspects impairment."
        faqs={faqs}
        breadcrumbs={[
          { name: 'Home', item: '/' },
          { name: 'Ohio OVI Checkpoints', item: '/ovi-checkpoints-ohio' },
        ]}
      />
      <PageHero
        eyebrow="OVI Checkpoints"
        title="Ohio OVI checkpoints: what drivers need to know"
        description="Understand the rules, your rights, and the next steps if you are stopped or tested."
        ctaLabel="Talk to a lawyer"
        ctaHref="/contact"
        showQuickActions={false}
        alignLeft={true}
        compact={true}
        phoneCtaId="ovi_checkpoints_hero_call_office"
      />

      <section className="section bg-white">
        <div className="container">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div className="space-y-6">
              <div>
                <h2 className="font-display text-display-sm font-bold text-brand-black mb-4">
                  What an Ohio checkpoint looks like
                </h2>
                <p className="text-lg text-brand-black/70 leading-relaxed">
                  Checkpoints are planned traffic stops where officers briefly screen drivers for signs of impairment.
                  Agencies are expected to follow published criteria that limit which cars are stopped and how the stop is conducted.
                </p>
              </div>
              <p className="text-brand-black/70 leading-relaxed">
                If an officer sees indicators of impairment, they may ask follow-up questions or request field sobriety tests.
                The goal is to identify drivers who may be unsafe to continue driving.
              </p>
              <div className="rounded-xl border border-brand-black/10 bg-brand-offWhite p-5">
                <p className="text-sm font-semibold text-brand-black">Quick rights reminder</p>
                <p className="mt-2 text-sm text-brand-black/70">
                  Provide your documents, stay calm, and keep responses brief. You can decline to answer additional questions
                  and request legal counsel.
                </p>
              </div>
            </div>
            <ImagePlaceholder
              aspectRatio="4:3"
              label="Checkpoint stop scene"
              promptHint="Ohio roadside checkpoint at dusk, marked police vehicles, calm traffic flow, professional documentary photography"
            />
          </div>
        </div>
      </section>

      <section className="section bg-brand-offWhite">
        <div className="container">
          <div className="mb-10 text-center">
            <h2 className="font-display text-display-sm md:text-display-md mb-4">What happens at a checkpoint</h2>
            <p className="text-lg text-brand-black/60 max-w-3xl mx-auto">
              Most stops follow a predictable pattern. Knowing what to expect can reduce stress and help you respond carefully.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                title: 'Initial stop',
                description: 'Officers briefly check documents and ask a few questions to gauge impairment.',
              },
              {
                title: 'Observation',
                description: 'Officers look for signs like odor, speech changes, or bloodshot eyes.',
              },
              {
                title: 'Field tests',
                description: 'They may request voluntary field sobriety tests if they suspect impairment.',
              },
              {
                title: 'Next steps',
                description: 'If an arrest occurs, chemical testing and booking procedures follow.',
              },
            ].map((item) => (
              <div key={item.title} className="card bg-white border border-brand-black/5 p-5">
                <h3 className="font-semibold text-brand-black">{item.title}</h3>
                <p className="mt-2 text-sm text-brand-black/70">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-white">
        <div className="container">
          <div className="grid gap-10 lg:grid-cols-[2fr,1fr] lg:items-start">
            <div className="space-y-6">
              <h2 className="font-display text-display-sm font-bold text-brand-black">
                Track announced checkpoints in Ohio
              </h2>
              <p className="text-lg text-brand-black/70 leading-relaxed">
                Our checkpoint map focuses on announced, verifiable checkpoint activity so drivers can plan ahead.
                The map is updated as announcements are published and expires old entries.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link
                  to="/resources/dui-checkpoints"
                  className="inline-flex items-center gap-2 rounded-lg bg-brand-mango px-5 py-3 text-sm font-semibold text-brand-black transition-colors hover:bg-brand-gold"
                >
                  View checkpoint map
                </Link>
                <Link
                  to="/ovi-dui-defense-delaware-oh"
                  className="inline-flex items-center gap-2 rounded-lg border border-brand-black/10 px-5 py-3 text-sm font-semibold text-brand-black transition-colors hover:border-brand-mango hover:text-brand-mango"
                >
                  OVI defense overview
                </Link>
              </div>
            </div>
            <div className="rounded-2xl border border-brand-black/10 bg-brand-offWhite p-6">
              <h3 className="text-lg font-semibold text-brand-black">If you are arrested</h3>
              <p className="mt-3 text-sm text-brand-black/70">
                Ask for legal counsel and avoid making statements without your lawyer present. Documentation and timing matter
                in OVI cases, so early guidance can protect your options.
              </p>
              <Link to="/contact" className="mt-4 inline-flex text-sm font-semibold text-brand-mango hover:text-brand-leaf">
                Request a confidential consult ->
              </Link>
            </div>
          </div>
        </div>
      </section>

      <FAQSection faqs={faqs} title="Ohio OVI checkpoint FAQ" />

      <CTASection
        title="Get clear next steps after a checkpoint stop"
        body="If you were stopped or arrested at a checkpoint, we can review the timeline and identify defense options."
        primaryLabel="Schedule a consult"
        primaryHref="/contact"
        secondaryLabel="Call now"
        secondaryHref="tel:7404176191"
        secondaryCtaId="ovi_checkpoints_cta_call"
      />
    </>
  );
}
