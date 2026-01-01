import { Link } from 'react-router-dom';
import PageHero from '../components/PageHero';
import CTASection from '../components/CTASection';
import FAQSection from '../components/FAQSection';
import ImagePlaceholder from '../components/ImagePlaceholder';
import { SEO } from '../lib/seo';

const faqs = [
  {
    question: 'When should I call an OVI lawyer?',
    answer: 'As soon as possible after an arrest or citation. Early guidance helps protect deadlines and preserve key evidence.',
  },
  {
    question: 'What courts do you handle in Delaware County?',
    answer: 'We regularly represent clients in Delaware Municipal Court and Delaware County Common Pleas, along with nearby Franklin County courts.',
  },
  {
    question: 'Do I have to appear in court for an OVI charge?',
    answer: 'Most cases require at least one appearance. We can explain what is required and prepare you for each step.',
  },
  {
    question: 'Can OVI charges be reduced?',
    answer: 'Reductions can be possible depending on the evidence, procedure, and negotiation posture. Each case requires a careful review.',
  },
  {
    question: 'What if this is my first offense?',
    answer: 'First-time cases still carry serious consequences. We focus on mitigation, suppression issues, and protection of your record.',
  },
  {
    question: 'What should I bring to the consultation?',
    answer: 'Bring your citation, bond paperwork, and any court notices. If you have a police report or video, that is helpful too.',
  },
];

export default function DelawareOhioOviLawyerPage() {
  return (
    <>
      <SEO
        title="Delaware Ohio OVI Lawyer - Local Defense | Mango Law"
        description="Local OVI defense for Delaware, Ohio. Former prosecutor, trial-ready strategy, and clear guidance from arrest through resolution."
        faqs={faqs}
        breadcrumbs={[
          { name: 'Home', item: '/' },
          { name: 'OVI Defense', item: '/ovi-dui-defense-delaware-oh' },
          { name: 'Delaware OVI Lawyer', item: '/delaware-ohio-ovi-lawyer' },
        ]}
      />
      <PageHero
        eyebrow="Delaware, Ohio"
        title="OVI defense built for Delaware County courts"
        description="Local courtroom knowledge, targeted motion practice, and steady communication at every step."
        ctaLabel="Schedule a consult"
        ctaHref="/contact"
        showQuickActions={false}
        alignLeft={true}
        compact={true}
        phoneCtaId="delaware_ovi_lawyer_hero_call_office"
      />

      <section className="section bg-white">
        <div className="container">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div className="space-y-6">
              <div>
                <h2 className="font-display text-display-sm font-bold text-brand-black mb-4">
                  Local insight for Delaware OVI cases
                </h2>
                <p className="text-lg text-brand-black/70 leading-relaxed">
                  OVI cases move quickly. We focus on protecting your driving privileges, challenging weak evidence, and
                  preparing for court appearances with a clear plan.
                </p>
              </div>
              <p className="text-brand-black/70 leading-relaxed">
                As a former prosecutor, Nick Mango understands how local cases are charged and negotiated. That context
                helps shape a defense strategy that fits the facts and your goals.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 rounded-lg bg-brand-mango px-5 py-3 text-sm font-semibold text-brand-black transition-colors hover:bg-brand-gold"
                >
                  Request a consult
                </Link>
                <Link
                  to="/reviews"
                  className="inline-flex items-center gap-2 rounded-lg border border-brand-black/10 px-5 py-3 text-sm font-semibold text-brand-black transition-colors hover:border-brand-mango hover:text-brand-mango"
                >
                  Read client reviews
                </Link>
              </div>
            </div>
            <ImagePlaceholder
              aspectRatio="4:3"
              label="Local Delaware courthouse"
              promptHint="Delaware County courthouse exterior, Ohio, professional architectural photography, warm light"
            />
          </div>
        </div>
      </section>

      <section className="section bg-brand-offWhite">
        <div className="container">
          <div className="mb-10 text-center">
            <h2 className="font-display text-display-sm md:text-display-md mb-4">What we focus on</h2>
            <p className="text-lg text-brand-black/60 max-w-3xl mx-auto">
              Every case is different, but the strongest defenses start with the same core steps.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                title: 'Stop review',
                description: 'Analyze the traffic stop or checkpoint for constitutional issues.',
              },
              {
                title: 'Test accuracy',
                description: 'Challenge field tests, breath testing protocols, and lab procedures.',
              },
              {
                title: 'Timeline clarity',
                description: 'Track deadlines for ALS appeals, hearings, and discovery.',
              },
              {
                title: 'Negotiation',
                description: 'Use motion practice and evidence review to improve outcomes.',
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
                Guidance from arraignment to resolution
              </h2>
              <p className="text-lg text-brand-black/70 leading-relaxed">
                We keep you updated on timelines, court expectations, and what to prepare for next. If your case involves
                field sobriety tests, breath or blood testing, or checkpoint stops, we explain the technical details in plain
                language so you can make informed decisions.
              </p>
            </div>
            <div className="rounded-2xl border border-brand-black/10 bg-brand-offWhite p-6">
              <p className="text-sm font-semibold text-brand-black">Related resources</p>
              <ul className="mt-3 space-y-2 text-sm text-brand-black/70">
                <li>
                  <Link to="/ovi-dui-defense-delaware-oh" className="text-brand-mango hover:text-brand-leaf">
                    OVI defense overview
                  </Link>
                </li>
                <li>
                  <Link to="/ovi-checkpoints-ohio" className="text-brand-mango hover:text-brand-leaf">
                    Ohio checkpoint rights
                  </Link>
                </li>
                <li>
                  <Link to="/resources/dui-checkpoints" className="text-brand-mango hover:text-brand-leaf">
                    Checkpoint map
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <FAQSection faqs={faqs} title="Delaware OVI defense FAQ" />

      <CTASection
        title="Talk to a Delaware OVI lawyer today"
        body="If you are facing an OVI charge in Delaware County, we can review your timeline and defense options."
        primaryLabel="Schedule a consult"
        primaryHref="/contact"
        secondaryLabel="Call now"
        secondaryHref="tel:7404176191"
        secondaryCtaId="delaware_ovi_lawyer_cta_call"
      />
    </>
  );
}
