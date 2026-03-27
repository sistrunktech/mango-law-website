import Link from 'next/link';
import PageHero from '../components/PageHero';
import CTASection from '../components/CTASection';
import FAQSection from '../components/FAQSection';
import { SEO } from '../lib/seo';

export const holidayOviFaqs = [
  {
    question: 'When does Ohio increase OVI enforcement?',
    answer: "Enforcement typically increases around major holidays and high-travel weekends such as New Year's, Super Bowl weekend, St. Patrick's Day, Memorial Day, July 4th, Labor Day, and Thanksgiving.",
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

const holidayWindows = [
  {
    title: "St. Patrick's Day",
    description: 'Daytime drinking, downtown foot traffic, and late rides home make this one of the clearest March enforcement windows.',
  },
  {
    title: 'Memorial Day through July 4th',
    description: 'Warm-weather travel, parties, and lake or festival weekends tend to bring heavier visibility and more traffic stops.',
  },
  {
    title: 'Labor Day and football weekends',
    description: 'Game-day traffic and holiday travel create the same mix of late-night driving and stepped-up patrols.',
  },
  {
    title: "Thanksgiving through New Year's",
    description: 'This is usually the longest sustained stretch for overtime patrols, holiday messaging, and high-visibility enforcement.',
  },
];

const holidayStopChecklist = [
  'Have license, registration, and proof of insurance ready before reaching for anything else.',
  'Keep answers short and factual instead of trying to talk your way out of the stop.',
  'Do not guess about what you drank, when you last drank, or whether you are “okay to drive.”',
  'If the stop turns into an arrest, ask for a lawyer and stop volunteering information.',
];

export default function HolidayOviEnforcementOhioPage() {
  return (
    <>
      <SEO
        title="Holiday OVI Enforcement Ohio - What Drivers Should Know | Mango Law"
        description="Seasonal OVI enforcement guidance for Ohio drivers: what to expect, how checkpoints work, and how to protect your rights."
        faqs={holidayOviFaqs}
        breadcrumbs={[
          { name: 'Home', item: '/' },
          { name: 'OVI Defense', item: '/ovi-dui-defense-delaware-oh' },
          { name: 'Holiday Enforcement', item: '/holiday-ovi-enforcement-ohio' },
        ]}
      />
      <PageHero
        eyebrow="Seasonal Enforcement"
        title="Holiday OVI enforcement in Ohio"
        description="Common holiday windows, what changes during high-visibility patrols, and what to do if a routine stop turns into an OVI investigation."
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
                  deter impaired driving through visibility and extra staffing, especially when a holiday combines bar traffic,
                  event traffic, and late-night rides home.
              </p>
              </div>
              <p className="text-brand-black/70 leading-relaxed">
                That is why dates like St. Patrick&apos;s Day, Super Bowl Sunday, Memorial Day weekend, and New Year&apos;s Eve can
                feel different on the road. Increased visibility can mean more stops and a quicker escalation when officers
                believe impairment is present.
              </p>
              <div className="rounded-xl border border-brand-black/10 bg-brand-offWhite p-5">
                <p className="text-sm font-semibold text-brand-black">Plan ahead</p>
                <p className="mt-2 text-sm text-brand-black/70">
                  Arrange a ride, designate a driver, or use a rideshare if you plan to drink. Avoid driving if you are unsure.
                </p>
              </div>
              <div className="rounded-xl border border-brand-black/10 bg-white p-5">
                <p className="text-sm font-semibold text-brand-black">High-watch holidays</p>
                <p className="mt-2 text-sm text-brand-black/70">
                  In Ohio, the most common enforcement windows tend to be New Year&apos;s, Super Bowl weekend, St. Patrick&apos;s Day,
                  Memorial Day, July 4th, Labor Day, and Thanksgiving through Christmas.
                </p>
              </div>
            </div>
            <div className="space-y-4">
              <div className="rounded-2xl border border-brand-black/10 bg-brand-offWhite p-6">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand-mangoText">Holiday windows to watch</p>
                <div className="mt-4 space-y-3">
                  {holidayWindows.map((item) => (
                    <div key={item.title} className="rounded-xl border border-brand-black/10 bg-white p-4">
                      <h3 className="text-base font-semibold text-brand-black">{item.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-brand-black/70">{item.description}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="rounded-2xl border border-brand-black/10 bg-white p-6">
                <p className="text-sm font-semibold text-brand-black">Best use of this page</p>
                <p className="mt-2 text-sm leading-relaxed text-brand-black/70">
                  Use this page to understand the pattern behind holiday enforcement. Then check the live
                  checkpoint map for announced activity and the OVI defense page if a stop or arrest already happened.
                </p>
                <div className="mt-4 flex flex-wrap gap-3">
                  <Link
                    href="/resources/dui-checkpoints"
                    className="inline-flex items-center gap-2 rounded-lg bg-brand-mango px-4 py-2.5 text-sm font-semibold text-brand-black transition-colors hover:bg-brand-gold"
                  >
                    View checkpoint map
                  </Link>
                  <Link
                    href="/ovi-dui-defense-delaware-oh"
                    className="inline-flex items-center gap-2 rounded-lg border border-brand-black/10 px-4 py-2.5 text-sm font-semibold text-brand-black transition-colors hover:border-brand-mango hover:text-brand-mango"
                  >
                    OVI defense guide
                  </Link>
                </div>
              </div>
            </div>
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
          <div className="mt-8 rounded-2xl border border-brand-black/10 bg-white p-6">
            <p className="text-sm font-semibold text-brand-black">If the stop starts moving toward an OVI investigation</p>
            <ul className="mt-4 grid gap-3 md:grid-cols-2">
              {holidayStopChecklist.map((item) => (
                <li key={item} className="rounded-xl border border-brand-black/10 bg-brand-offWhite px-4 py-3 text-sm leading-relaxed text-brand-black/75">
                  {item}
                </li>
              ))}
            </ul>
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
                Holiday enforcement announcements vary by agency, and many are not published far in advance. Use the checkpoint
                map for announced activity, and treat this page as the broader context for why certain weekends feel more active.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/resources/dui-checkpoints"
                  className="inline-flex items-center gap-2 rounded-lg bg-brand-mango px-5 py-3 text-sm font-semibold text-brand-black transition-colors hover:bg-brand-gold"
                >
                  View checkpoint map
                </Link>
                <Link
                  href="/ovi-checkpoints-ohio"
                  className="inline-flex items-center gap-2 rounded-lg border border-brand-black/10 px-5 py-3 text-sm font-semibold text-brand-black transition-colors hover:border-brand-mango hover:text-brand-mango"
                >
                  Know your checkpoint rights
                </Link>
              </div>
            </div>
            <div className="rounded-2xl border border-brand-black/10 bg-brand-offWhite p-6">
              <p className="text-sm font-semibold text-brand-black">If you are arrested</p>
              <p className="mt-3 text-sm text-brand-black/70">
                Ask for a lawyer, avoid making statements without counsel, and move quickly on license and evidence issues. Early deadlines matter in holiday OVI cases just as much as any other case.
              </p>
              <Link href="/contact" className="mt-4 inline-flex text-sm font-semibold text-brand-mango hover:text-brand-leaf">
                Request a consult
              </Link>
            </div>
          </div>
        </div>
      </section>

      <FAQSection faqs={holidayOviFaqs} title="Holiday enforcement FAQ" />

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
