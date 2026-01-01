import { Link } from 'react-router-dom';
import PageHero from '../components/PageHero';
import CTASection from '../components/CTASection';
import FAQSection from '../components/FAQSection';
import ImagePlaceholder from '../components/ImagePlaceholder';
import { SEO } from '../lib/seo';

const faqs = [
  {
    question: 'When does Ohio increase OVI enforcement?',
    answer: 'Enforcement typically increases around major holidays and high travel weekends, but schedules vary by agency.',
  },
  {
    question: 'Are holiday checkpoints announced?',
    answer: 'Some agencies publish announcements, but others do not. Check official releases or the checkpoint map for updates.',
  },
  {
    question: 'Does a holiday campaign change penalties?',
    answer: 'Penalties are set by Ohio law. Enforcement campaigns focus on visibility and patrol activity, not different penalties.',
  },
  {
    question: 'What should I do if I am stopped?',
    answer: 'Stay calm, provide required documents, and keep responses brief. You can ask to speak with a lawyer.',
  },
  {
    question: 'Can I refuse field sobriety tests?',
    answer: 'Field sobriety tests are voluntary in Ohio. There can still be consequences depending on the circumstances.',
  },
  {
    question: 'How soon should I contact a lawyer after an arrest?',
    answer: 'Contact a lawyer as soon as possible. Early guidance helps with deadlines and evidence preservation.',
  },
];

export default function HolidayOviEnforcementOhioPage() {
  return (
    <>
      <SEO
        title="Holiday OVI Enforcement Ohio - What Drivers Should Know | Mango Law"
        description="Seasonal OVI enforcement guidance for Ohio drivers: what to expect, how checkpoints work, and how to protect your rights."
        faqs={faqs}
        breadcrumbs={[
          { name: 'Home', item: '/' },
          { name: 'OVI Defense', item: '/ovi-dui-defense-delaware-oh' },
          { name: 'Holiday Enforcement', item: '/holiday-ovi-enforcement-ohio' },
        ]}
      />
      <PageHero
        eyebrow="Seasonal Enforcement"
        title="Holiday OVI enforcement in Ohio"
        description="Know what changes during holiday patrols and how to respond if you are stopped."
        ctaLabel="Schedule a consult"
        ctaHref="/contact"
        showQuickActions={false}
        alignLeft={true}
        compact={true}
        phoneCtaId="holiday_ovi_hero_call_office"
      />

      <section className="section bg-white">
        <div className="container">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div className="space-y-6">
              <div>
                <h2 className="font-display text-display-sm font-bold text-brand-black mb-4">
                  Why holiday enforcement feels different
                </h2>
                <p className="text-lg text-brand-black/70 leading-relaxed">
                  Agencies often increase patrols, checkpoints, and public messaging around holiday weekends. The goal is to
                  deter impaired driving through visibility and extra staffing.
                </p>
              </div>
              <p className="text-brand-black/70 leading-relaxed">
                Increased visibility can mean more stops and a quicker escalation when officers believe impairment is present.
                Staying calm and understanding your rights can help you navigate the encounter.
              </p>
              <div className="rounded-xl border border-brand-black/10 bg-brand-offWhite p-5">
                <p className="text-sm font-semibold text-brand-black">Plan ahead</p>
                <p className="mt-2 text-sm text-brand-black/70">
                  Arrange a ride, designate a driver, or use a rideshare if you plan to drink. Avoid driving if you are unsure.
                </p>
              </div>
            </div>
            <ImagePlaceholder
              aspectRatio="4:3"
              label="Holiday enforcement patrol scene"
              promptHint="Nighttime Ohio roadway with patrol vehicles and holiday lighting, safe traffic scene, documentary style"
            />
          </div>
        </div>
      </section>

      <section className="section bg-brand-offWhite">
        <div className="container">
          <div className="mb-10 text-center">
            <h2 className="font-display text-display-sm md:text-display-md mb-4">What to expect if you are stopped</h2>
            <p className="text-lg text-brand-black/60 max-w-3xl mx-auto">
              Holiday stops tend to follow the same process as other OVI investigations, but officers may be more visible and
              proactive.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                title: 'Document check',
                description: 'Have license, registration, and proof of insurance ready.',
              },
              {
                title: 'Questions',
                description: 'Keep responses brief and avoid volunteering extra details.',
              },
              {
                title: 'Observations',
                description: 'Officers note signs of impairment and may request tests.',
              },
              {
                title: 'Next steps',
                description: 'If arrested, chemical testing and booking follow.',
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
                Stay informed during holiday campaigns
              </h2>
              <p className="text-lg text-brand-black/70 leading-relaxed">
                Holiday enforcement announcements vary by agency. Check official releases and the checkpoint map to see
                announced activity. If you are concerned about a stop or arrest, contact counsel quickly.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link
                  to="/ovi-checkpoints-ohio"
                  className="inline-flex items-center gap-2 rounded-lg bg-brand-mango px-5 py-3 text-sm font-semibold text-brand-black transition-colors hover:bg-brand-gold"
                >
                  Ohio checkpoint guidance
                </Link>
                <Link
                  to="/blog/holiday-ovi-enforcement-ohio-delaware-dublin-columbus"
                  className="inline-flex items-center gap-2 rounded-lg border border-brand-black/10 px-5 py-3 text-sm font-semibold text-brand-black transition-colors hover:border-brand-mango hover:text-brand-mango"
                >
                  Read the holiday enforcement guide
                </Link>
              </div>
            </div>
            <div className="rounded-2xl border border-brand-black/10 bg-brand-offWhite p-6">
              <p className="text-sm font-semibold text-brand-black">If you are arrested</p>
              <p className="mt-3 text-sm text-brand-black/70">
                Ask for a lawyer and avoid making statements without counsel. Evidence timing matters in OVI cases.
              </p>
              <Link to="/contact" className="mt-4 inline-flex text-sm font-semibold text-brand-mango hover:text-brand-leaf">
                Request a consult ->
              </Link>
            </div>
          </div>
        </div>
      </section>

      <FAQSection faqs={faqs} title="Holiday enforcement FAQ" />

      <CTASection
        title="Need guidance after a holiday stop?"
        body="We can review your situation and explain next steps for an Ohio OVI case."
        primaryLabel="Schedule a consult"
        primaryHref="/contact"
        secondaryLabel="Call now"
        secondaryHref="tel:7404176191"
        secondaryCtaId="holiday_ovi_cta_call"
      />
    </>
  );
}
