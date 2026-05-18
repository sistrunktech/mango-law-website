import Link from 'next/link';
import {
  CalendarDays,
  Eye,
  FileText,
  MessageSquare,
  PhoneCall,
  Route,
  Shield,
  Siren,
} from 'lucide-react';
import PageHero from '../components/PageHero';
import CTASection from '../components/CTASection';
import FAQSection from '../components/FAQSection';
import SeasonalEnforcementVisual from '../components/SeasonalEnforcementVisual';
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
    description: 'Downtown celebrations, daytime drinking, and late rides home make this a reliable March watch point.',
  },
  {
    title: 'Memorial Day through July 4th',
    description: 'Travel weekends, parties, lake traffic, and Central Ohio event traffic such as Dublin tournament week usually raise patrol visibility fast.',
  },
  {
    title: 'Labor Day and football weekends',
    description: 'Game-day traffic and long weekends bring the same late-night mix of traffic and visible patrols.',
  },
  {
    title: "Thanksgiving through New Year's",
    description: 'This is usually the longest sustained stretch for overtime patrols, holiday messaging, and roadside visibility.',
  },
];

const holidayStopChecklist = [
  'Have license, registration, and proof of insurance ready before reaching for anything else.',
  'Keep answers short and factual instead of trying to talk your way out of the stop.',
  'Do not guess about what you drank, when you last drank, or whether you are “okay to drive.”',
  'If the stop turns into an arrest, ask for a lawyer and stop volunteering information.',
];

const holidayGuideHighlights = [
  {
    title: 'Most watched windows',
    body: 'Watch the repeat windows first: St. Patrick’s Day, summer holidays, football weekends, and the winter holiday stretch.',
    icon: CalendarDays,
  },
  {
    title: 'What changes on the road',
    body: 'The pattern is usually more visible patrols, faster stops, and quicker escalation once impairment is suspected.',
    icon: Siren,
  },
  {
    title: 'What helps most',
    body: 'Plan a ride before drinking, and if a stop turns serious, move from explanation mode to lawyer mode quickly.',
    icon: Shield,
  },
];

const seasonalPlaybook = [
  {
    key: 'spring' as const,
    label: 'Spring',
    window: "St. Patrick's Day and March event weekends",
    body: 'Downtown celebrations and the first warm-weather weekends tend to raise visibility first.',
  },
  {
    key: 'summer' as const,
    label: 'Summer',
    window: 'Memorial Day through Labor Day',
    body: 'Travel weekends, lake traffic, festivals, and Dublin-area tournament traffic create the broadest mix of stops and checkpoint chatter.',
  },
  {
    key: 'fall' as const,
    label: 'Fall',
    window: 'Labor Day through football season',
    body: 'Game days and cooler late nights keep weekends active even without a major holiday.',
  },
  {
    key: 'winter' as const,
    label: 'Winter',
    window: "Thanksgiving through New Year's",
    body: 'The longest sustained enforcement stretch, driven by parties, travel, and winter-night road conditions.',
  },
];

const roadsideSteps = [
  {
    title: 'Document check',
    description: 'Hand over license, registration, and proof of insurance without adding extra commentary.',
    icon: FileText,
  },
  {
    title: 'Questions',
    description: 'Answer basic identification questions, then keep responses short and factual.',
    icon: MessageSquare,
  },
  {
    title: 'Observations',
    description: 'Expect officers to watch closely for signs they associate with impairment.',
    icon: Eye,
  },
  {
    title: 'Next steps',
    description: 'If the stop escalates, shift quickly to protecting your rights and contacting counsel.',
    icon: PhoneCall,
  },
];

const seasonalAccentClasses: Record<'spring' | 'summer' | 'fall' | 'winter', string> = {
  spring: 'border-t-4 border-t-emerald-400/80',
  summer: 'border-t-4 border-t-sky-400/80',
  fall: 'border-t-4 border-t-orange-400/80',
  winter: 'border-t-4 border-t-slate-300/90',
};

function getCurrentSeasonKey(month: number): 'spring' | 'summer' | 'fall' | 'winter' {
  if (month >= 2 && month <= 4) return 'spring';
  if (month >= 5 && month <= 7) return 'summer';
  if (month >= 8 && month <= 10) return 'fall';
  return 'winter';
}

export default function HolidayOviEnforcementOhioPage() {
  const currentSeasonKey = getCurrentSeasonKey(new Date().getMonth());

  return (
    <>
      <SEO
        title="Holiday OVI Enforcement Ohio"
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

      <section className="section bg-[radial-gradient(circle_at_top_right,rgba(255,176,52,0.10),transparent_28%),linear-gradient(180deg,#ffffff_0%,#f7f4ed_100%)]">
        <div className="container">
          <div className="grid gap-10 lg:grid-cols-[0.96fr_1.04fr] lg:items-start">
            <div className="space-y-5 lg:pt-2">
              <div className="max-w-xl">
                <h2 className="mb-4 font-display text-display-sm font-bold text-brand-black">
                  Why holiday enforcement feels different
                </h2>
                <p className="text-lg leading-relaxed text-brand-black/70">
                  Agencies often increase patrols, checkpoints, and public messaging around holiday weekends. The goal is to
                  deter impaired driving through visibility and extra staffing, especially when a holiday combines bar traffic,
                  event traffic, and late-night rides home.
                </p>
              </div>
              <p className="leading-relaxed text-brand-black/70">
                That is why dates like St. Patrick&apos;s Day, Super Bowl Sunday, Memorial Day weekend, and New Year&apos;s Eve can
                feel different on the road. Increased visibility can mean more stops and a quicker escalation when officers
                believe impairment is present.
              </p>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl border border-brand-black/10 bg-brand-offWhite p-5 shadow-[0_12px_30px_rgba(15,23,42,0.04)]">
                  <p className="text-sm font-semibold text-brand-black">Plan ahead</p>
                  <p className="mt-2 text-sm leading-relaxed text-brand-black/70">
                    Arrange a ride, designate a driver, or use a rideshare before the day gets busy.
                  </p>
                </div>
                <div className="rounded-2xl border border-brand-black/10 bg-white p-5 shadow-[0_12px_30px_rgba(15,23,42,0.04)]">
                  <p className="text-sm font-semibold text-brand-black">Repeat windows</p>
                  <p className="mt-2 text-sm leading-relaxed text-brand-black/70">
                    The same calendar moments tend to get louder every year, even when the exact tactics vary.
                  </p>
                </div>
              </div>
              <div className="rounded-2xl border border-brand-black/10 bg-brand-black px-5 py-5 text-white shadow-[0_18px_50px_rgba(15,23,42,0.18)]">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand-mango">Read this page like a forecast</p>
                <p className="mt-3 text-sm leading-relaxed text-white/80">
                  Holiday enforcement follows patterns before it shows up in a headline. Use this page to understand those
                  patterns, then confirm specific activity on the live map before assuming what is happening tonight.
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <SeasonalEnforcementVisual />

              <div className="rounded-2xl border border-brand-black/10 bg-brand-offWhite p-6">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand-mangoText">Holiday windows to watch</p>
                    <h3 className="mt-2 text-lg font-semibold text-brand-black">The repeat periods worth checking first</h3>
                  </div>
                  <p className="max-w-xs text-sm leading-relaxed text-brand-black/60">
                    These are the dates when public messaging and roadside visibility tend to rise first.
                  </p>
                </div>
                <div className="mt-4 grid gap-3 md:grid-cols-2 lg:grid-cols-1">
                  {holidayWindows.map((item) => (
                    <div key={item.title} className="rounded-xl border border-brand-black/10 bg-white p-4">
                      <h3 className="text-base font-semibold text-brand-black">{item.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-brand-black/70">{item.description}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-4 flex flex-wrap gap-3 border-t border-brand-black/10 pt-4">
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

          <div className="mt-8 grid gap-4 lg:grid-cols-3">
            {holidayGuideHighlights.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="rounded-2xl border border-brand-black/10 bg-brand-offWhite px-5 py-5 shadow-[0_12px_30px_rgba(15,23,42,0.04)]"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-brand-mango/15 text-brand-mangoText">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="text-base font-semibold text-brand-black">{item.title}</h3>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-brand-black/70">{item.body}</p>
                </div>
              );
            })}
          </div>

          <div className="mt-8 rounded-[28px] border border-brand-black/10 bg-white p-6 shadow-[0_18px_50px_rgba(15,23,42,0.06)]">
            <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand-mangoText">Seasonal playbook</p>
                <h2 className="mt-2 font-display text-2xl font-bold text-brand-black">How the year usually breaks down</h2>
              </div>
              <p className="max-w-2xl text-sm leading-relaxed text-brand-black/65">
                The exact timing changes year to year, but the pattern is predictable. Use this as the quick-read version of when to pay
                extra attention to patrol visibility, checkpoint chatter, and announced enforcement campaigns.
              </p>
            </div>

            <div className="mt-6 grid gap-4 lg:grid-cols-4">
              {seasonalPlaybook.map((item) => {
                const isCurrent = item.key === currentSeasonKey;

                return (
                  <div
                    key={item.key}
                    className={`rounded-2xl border bg-white px-5 py-5 transition-colors ${seasonalAccentClasses[item.key]} ${
                      isCurrent
                        ? 'border-brand-mango/40 shadow-[0_16px_40px_rgba(255,176,52,0.10)]'
                        : 'border-brand-black/10'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-brand-black/45">Season</p>
                        <p className="mt-2 text-base font-semibold text-brand-black">{item.label}</p>
                      </div>
                      {isCurrent && (
                        <span className="rounded-full bg-brand-mango px-2.5 py-1 text-[11px] font-bold uppercase tracking-[0.12em] text-brand-black">
                          Current
                        </span>
                      )}
                    </div>
                    <p className="mt-4 text-sm font-medium text-brand-black/82">{item.window}</p>
                    <p className="mt-3 text-sm leading-relaxed text-brand-black/65">{item.body}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="section bg-[linear-gradient(180deg,#f7f4ed_0%,#ffffff_100%)]">
        <div className="container">
          <div className="grid gap-7 lg:grid-cols-[0.88fr_1.12fr] lg:items-start">
            <div className="space-y-6">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand-mangoText">At the roadside</p>
                <h2 className="mt-2 font-display text-display-sm text-brand-black md:text-display-md">
                  What to expect if you are stopped
                </h2>
                <p className="mt-4 text-lg leading-relaxed text-brand-black/65">
                  Holiday stops tend to follow the same process as other OVI investigations, but officers may be more visible and
                  proactive. The fastest way to help yourself is to stay calm, keep the interaction simple, and avoid filling the silence.
                </p>
              </div>

              <div className="rounded-[24px] border border-brand-black/10 bg-white p-6 shadow-[0_16px_40px_rgba(15,23,42,0.05)]">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-brand-leaf/10 text-brand-leaf">
                    <Route className="h-5 w-5" />
                  </div>
                  <p className="text-sm font-semibold text-brand-black">If the stop starts moving toward an OVI investigation</p>
                </div>
                <ul className="mt-4 grid gap-3">
                  {holidayStopChecklist.map((item) => (
                    <li key={item} className="rounded-xl border border-brand-black/10 bg-brand-offWhite px-4 py-3 text-sm leading-relaxed text-brand-black/75">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              {roadsideSteps.map((item, index) => {
                const Icon = item.icon;

                return (
                  <div
                    key={item.title}
                    className="rounded-2xl border border-brand-black/10 bg-white p-5 shadow-[0_14px_32px_rgba(15,23,42,0.04)]"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="text-xs font-bold uppercase tracking-[0.18em] text-brand-mangoText">
                        Step {index + 1}
                      </div>
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-mango/12 text-brand-mangoText">
                        <Icon className="h-4 w-4" />
                      </div>
                    </div>
                    <h3 className="mt-3 text-lg font-semibold text-brand-black">{item.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-brand-black/70">{item.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="section bg-white">
        <div className="container">
          <div className="max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand-mangoText">Next step hub</p>
            <h2 className="mt-2 font-display text-display-sm font-bold text-brand-black">
              Stay informed during holiday campaigns
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-brand-black/70">
              Holiday enforcement announcements vary by agency, and many are not published far in advance. Use the live map for the
              current public picture, and use the guides below when a stop has already turned serious.
            </p>
          </div>

          <div className="mt-8 grid gap-5 lg:grid-cols-[1.35fr,0.95fr] lg:items-stretch">
            <div className="grid gap-5 md:grid-cols-[1.15fr,0.85fr]">
              <div className="rounded-[28px] border border-brand-black/10 bg-brand-offWhite p-6 shadow-[0_18px_45px_rgba(15,23,42,0.05)]">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand-mangoText">Primary next step</p>
                <h3 className="mt-3 text-xl font-semibold text-brand-black">Check the live map first</h3>
                <p className="mt-3 text-sm leading-relaxed text-brand-black/72">
                  Use the checkpoint map when you want the current public picture, recent history, and county-level hotspot context.
                  This is the fastest way to confirm whether a holiday weekend is producing public notices right now.
                </p>
                <div className="mt-5 flex flex-wrap gap-3">
                  <Link
                    href="/resources/dui-checkpoints"
                    className="inline-flex items-center gap-2 rounded-lg bg-brand-mango px-4 py-2.5 text-sm font-semibold text-brand-black transition-colors hover:bg-brand-gold"
                  >
                    View checkpoint map
                  </Link>
                  <Link
                    href="/ovi-checkpoints-ohio"
                    className="inline-flex items-center gap-2 rounded-lg border border-brand-black/10 px-4 py-2.5 text-sm font-semibold text-brand-black transition-colors hover:border-brand-mango hover:text-brand-mango"
                  >
                    Know checkpoint rights
                  </Link>
                </div>
              </div>

              <div className="rounded-[24px] border border-brand-black/10 bg-white p-5 shadow-[0_14px_32px_rgba(15,23,42,0.04)]">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand-mangoText">If the stop already happened</p>
                <h3 className="mt-3 text-lg font-semibold text-brand-black">Move from watch mode to defense mode quickly</h3>
                <p className="mt-3 text-sm leading-relaxed text-brand-black/70">
                  Once a checkpoint or patrol stop leads to field testing, chemical testing, or arrest, the better reference point
                  is your rights and next deadlines.
                </p>
                <Link
                  href="/ovi-checkpoints-ohio"
                  className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-brand-mangoText transition-colors hover:text-brand-mango"
                >
                  Read the rights guide
                </Link>
              </div>
            </div>

            <div className="rounded-[28px] border border-brand-black/10 bg-brand-black p-6 text-white shadow-[0_24px_60px_rgba(15,23,42,0.16)]">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand-mango">If you are arrested</p>
              <p className="mt-4 text-lg font-semibold text-white">Treat the holiday context as noise, not a reason to wait.</p>
              <p className="mt-3 text-sm leading-relaxed text-white/75">
                Ask for a lawyer, avoid making statements without counsel, and move quickly on license and evidence issues. Early deadlines matter in holiday OVI cases just as much as any other case.
              </p>
              <div className="mt-5 rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-white/60">Fastest useful next step</p>
                <p className="mt-2 text-sm leading-relaxed text-white/78">
                  Save the paperwork, write down what happened while it is fresh, and get legal advice before you start explaining the stop to everyone else.
                </p>
              </div>
              <Link href="/contact" className="mt-5 inline-flex text-sm font-semibold text-brand-mango hover:text-brand-gold">
                Request a consult
              </Link>
            </div>
          </div>
        </div>
      </section>

      <div className="bg-brand-offWhite pt-10">
        <div className="container max-w-3xl text-center">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand-mangoText">Common questions</p>
          <p className="mt-3 text-base leading-relaxed text-brand-black/65">
            Most holiday OVI questions come down to the same practical issues: what changes on the roadside, what remains the same,
            and what to do quickly if a stop turns into a case.
          </p>
        </div>
      </div>

      <div className="bg-brand-offWhite [&>section]:pt-8 [&>section]:md:pt-10">
        <FAQSection faqs={holidayOviFaqs} title="Holiday enforcement FAQ" />
      </div>

      <CTASection
        title="Need guidance after a holiday stop?"
        body="We can review your situation and explain next steps for an Ohio OVI case."
        primaryLabel="Schedule a consult"
        primaryHref="/contact"
        secondaryLabel="Call now"
        secondaryHref="tel:7406022155"
        secondaryCtaId="holiday_ovi_cta_call"
      />
    </>
  );
}
