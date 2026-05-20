import Link from 'next/link';
import {
  ArrowRight,
  BadgeCheck,
  Building2,
  Car,
  ClipboardList,
  FileText,
  Gavel,
  MapPin,
  Scale,
  ShieldCheck,
} from 'lucide-react';
import PageHero from '../components/PageHero';
import CTASection from '../components/CTASection';
import FAQSection from '../components/FAQSection';
import RelatedDefenseGuides from '../components/RelatedDefenseGuides';
import { attorneyProfile } from '../data/attorneyProfile';
import { getLocationBySlug } from '../data/serviceAreas';
import { PRIMARY_PHONE_DISPLAY, PRIMARY_PHONE_TEL } from '../lib/contactInfo';
import { SEO } from '../lib/seo';

export const unionCountyLocationFaqs = [
  {
    question: 'Does Mango Law handle OVI cases in Marysville Municipal Court?',
    answer:
      'Yes. Mango Law handles Ohio OVI and criminal-defense matters in Central Ohio courts, including Union County and Marysville matters when the facts, court schedule, and representation fit are appropriate.',
  },
  {
    question: 'Is this page only for Marysville OVI charges?',
    answer:
      'No. The page is built around Union County and Marysville because Marysville Municipal Court is the primary local municipal court resource. The same planning framework can also apply to Union County misdemeanor traffic, criminal, probation, bond, and felony-preliminary-hearing issues.',
  },
  {
    question: 'What should I bring to a Union County OVI consultation?',
    answer:
      'Bring the citation, summons, bond paperwork, license-suspension notice, hearing date, proof of insurance, tow or impound records, and any texts, photos, medical information, or witness names that may affect the stop, testing, or release conditions.',
  },
  {
    question: 'Can a Marysville OVI case affect my license before the criminal case is over?',
    answer:
      'Yes. Ohio OVI cases can involve an Administrative License Suspension and court-ordered conditions. Driving privileges, ALS appeal timing, proof of insurance, CDL issues, and BMV reporting should be reviewed early.',
  },
];

const localSteps = [
  {
    title: 'Court date and paperwork',
    body: 'Identify whether the case is a traffic citation, summons, OVI arrest, probation notice, or felony initial appearance. The exact document controls what has to happen first.',
    icon: FileText,
  },
  {
    title: 'License and driving exposure',
    body: 'Check ALS paperwork, proof-of-insurance issues, CDL or out-of-state status, and whether limited driving privileges need to be prepared quickly.',
    icon: Car,
  },
  {
    title: 'Evidence preservation',
    body: 'Preserve citation copies, body-camera or cruiser-video requests, testing records, witness names, route details, medical conditions, and phone or location evidence.',
    icon: ClipboardList,
  },
  {
    title: 'Release and compliance terms',
    body: 'Review bond, no-contact, probation, alcohol-monitoring, or court-order terms before anyone texts, drives, travels, or misses an appointment.',
    icon: ShieldCheck,
  },
];

const caseTypes = [
  'OVI / DUI arrests and citations',
  'ALS and limited-driving-privilege issues',
  'Test refusal, high-test, and drug OVI allegations',
  'Misdemeanor traffic and criminal charges',
  'Domestic violence, assault, theft, and drug possession allegations',
  'Felony initial appearances and preliminary-hearing posture',
  'Probation violation notices and compliance problems',
  'Record-sealing or expungement planning after eligible outcomes',
];

const officialSources = [
  {
    label: 'Marysville Municipal Court',
    href: 'https://marysvilleohio.org/670/Municipal-Court/',
    note: 'Court location, hours, resources, and public municipal-court information.',
  },
  {
    label: 'Marysville Municipal Court criminal/traffic resources',
    href: 'https://marysvilleohio.org/722/CriminalTraffic',
    note: 'Citation, insurance, program, criminal, and traffic case guidance.',
  },
  {
    label: 'Marysville Municipal Court probation information',
    href: 'https://marysvilleohio.org/694/Probation',
    note: 'Probation communication, violation, and modification guidance.',
  },
  {
    label: 'Union County Prosecutor criminal matters',
    href: 'https://www.unioncountyohio.gov/departments/Prosecutor/criminal-matters',
    note: 'Local prosecution, plea-practice, diversion/intervention, and criminal-process context.',
  },
  {
    label: 'Union County Common Pleas Court',
    href: 'https://www.unioncountyohio.gov/CommonPleasCourt/',
    note: 'Common Pleas court location, personnel, schedule, forms, local rules, and court-services resources.',
  },
  {
    label: 'Union County Clerk of Courts',
    href: 'https://www.unioncountyohio.gov/departments/clerkofcourts',
    note: 'Common Pleas records, legal filings, bonds, payments, and Clerk contact information.',
  },
];

export default function UnionCountyOviCriminalDefensePreviewPage() {
  const unionCounty = getLocationBySlug('union-county');

  return (
    <>
      <SEO
        title="Union County OVI & Criminal Defense Lawyer"
        description="Union County and Marysville OVI and criminal-defense guidance for court dates, ALS issues, criminal/traffic charges, and early case planning."
        url="/ovi-dui-defense-union-county-oh"
        canonicalUrl="/ovi-dui-defense-union-county-oh"
        noindex={true}
        faqs={unionCountyLocationFaqs}
        breadcrumbs={[
          { name: 'Home', item: '/' },
          { name: 'Service Areas', item: '/locations' },
          { name: 'Union County OVI Defense', item: '/ovi-dui-defense-union-county-oh' },
        ]}
      />

      <PageHero
        eyebrow="Union County OVI Defense"
        title="Union County OVI and criminal defense for Marysville court cases"
        description="Defense planning for Marysville Municipal Court, Union County process issues, OVI license pressure, and first-step criminal-defense decisions."
        ctaLabel="Schedule a consult"
        ctaHref="/contact"
        showQuickActions={false}
        alignLeft={true}
        compact={true}
        phoneCtaId="union_county_preview_hero_call"
      />

      <section className="section bg-white">
        <div className="container">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_360px]">
            <div className="space-y-8">
              <div className="space-y-5">
                <p className="text-lg leading-relaxed text-brand-black/75">
                  A Union County OVI or criminal charge usually creates two problems at once: the immediate court date
                  and the practical fallout around driving, work, bond, probation, or family restrictions. The first
                  step is matching local court resources, Ohio OVI law, and early defense planning to the paperwork in
                  front of you.
                </p>
                <p className="leading-relaxed text-brand-black/70">
                  Mango Law is based in nearby Delaware and handles Central Ohio OVI and criminal-defense matters with
                  the same case-development process used on the Delaware County owner pages: document review, license
                  triage, discovery requests, motion analysis, negotiation posture, and trial readiness when needed.
                </p>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                {localSteps.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div key={item.title} className="rounded-xl border border-brand-black/10 bg-brand-offWhite/55 p-5">
                      <div className="flex items-start gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand-mango/15 text-brand-mangoText">
                          <Icon className="h-5 w-5" aria-hidden="true" />
                        </div>
                        <div>
                          <h2 className="text-base font-bold text-brand-black">{item.title}</h2>
                          <p className="mt-2 text-sm leading-relaxed text-brand-black/70">{item.body}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <section className="space-y-5">
                <h2 className="font-display text-display-sm text-brand-black">
                  Why local context matters in Union County cases
                </h2>
                <p className="leading-relaxed text-brand-black/70">
                  Union County cases can move through Marysville Municipal Court, felony preliminary-hearing posture,
                  probation compliance, BMV reporting, or Common Pleas practice depending on the charge and paperwork.
                  The defense plan should start with the court document in hand instead of assumptions about a generic
                  Ohio criminal case.
                </p>
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="rounded-xl border border-brand-black/10 bg-white p-5 shadow-soft">
                    <BadgeCheck className="h-6 w-6 text-brand-leaf" aria-hidden="true" />
                    <h3 className="mt-4 text-base font-bold text-brand-black">Close to Delaware</h3>
                    <p className="mt-2 text-sm leading-relaxed text-brand-black/70">
                      Marysville is a nearby Central Ohio court market for a Delaware-based defense practice.
                    </p>
                  </div>
                  <div className="rounded-xl border border-brand-black/10 bg-white p-5 shadow-soft">
                    <Gavel className="h-6 w-6 text-brand-leaf" aria-hidden="true" />
                    <h3 className="mt-4 text-base font-bold text-brand-black">Real local process</h3>
                    <p className="mt-2 text-sm leading-relaxed text-brand-black/70">
                      Marysville Municipal Court publishes criminal, traffic, probation, and court-resource details.
                    </p>
                  </div>
                  <div className="rounded-xl border border-brand-black/10 bg-white p-5 shadow-soft">
                    <Scale className="h-6 w-6 text-brand-leaf" aria-hidden="true" />
                    <h3 className="mt-4 text-base font-bold text-brand-black">Specific case pressure</h3>
                    <p className="mt-2 text-sm leading-relaxed text-brand-black/70">
                      OVI, ALS, proof-of-insurance, probation, bond, and criminal/traffic issues can overlap quickly.
                    </p>
                  </div>
                </div>
              </section>

              <section className="rounded-2xl border border-brand-black/10 bg-brand-offWhite/60 p-6">
                <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                  <div>
                    <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-brand-mangoText">
                      Union County case fit
                    </p>
                    <h2 className="mt-2 text-2xl font-bold text-brand-black">
                      Common Union County OVI and criminal-defense issues
                    </h2>
                  </div>
                  {unionCounty && (
                    <div className="rounded-xl bg-white p-4 text-sm text-brand-black/70 shadow-soft md:w-80">
                      <div className="flex items-start gap-3">
                        <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-brand-mangoText" aria-hidden="true" />
                        <div>
                          <div className="font-bold text-brand-black">{unionCounty.name}</div>
                          <div className="mt-1">{unionCounty.description}</div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                <div className="mt-6 grid gap-3 md:grid-cols-2">
                  {caseTypes.map((item) => (
                    <div key={item} className="flex gap-3 rounded-lg bg-white px-4 py-3 text-sm text-brand-black/75">
                      <ArrowRight className="mt-0.5 h-4 w-4 shrink-0 text-brand-mangoText" aria-hidden="true" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </section>

              <section className="space-y-5">
                <h2 className="font-display text-display-sm text-brand-black">
                  Local process points that can change the first step
                </h2>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="rounded-xl border border-brand-black/10 bg-white p-5">
                    <Building2 className="h-6 w-6 text-brand-mangoText" aria-hidden="true" />
                    <h3 className="mt-4 text-lg font-bold text-brand-black">Marysville Municipal Court</h3>
                    <p className="mt-2 text-sm leading-relaxed text-brand-black/70">
                      The municipal court publishes criminal/traffic resources, program instructions, proof-of-insurance
                      guidance, forms, probation information, and the court address at 1250 W. 5th Street in Marysville.
                    </p>
                  </div>
                  <div className="rounded-xl border border-brand-black/10 bg-white p-5">
                    <Gavel className="h-6 w-6 text-brand-mangoText" aria-hidden="true" />
                    <h3 className="mt-4 text-lg font-bold text-brand-black">Union County felony posture</h3>
                    <p className="mt-2 text-sm leading-relaxed text-brand-black/70">
                      Felony matters can move through early hearings and then into Common Pleas practice. The prosecutor
                      page gives useful local context for criminal procedure, plea practice, and treatment-based options.
                    </p>
                  </div>
                  <div className="rounded-xl border border-brand-black/10 bg-white p-5">
                    <Car className="h-6 w-6 text-brand-mangoText" aria-hidden="true" />
                    <h3 className="mt-4 text-lg font-bold text-brand-black">OVI license pressure</h3>
                    <p className="mt-2 text-sm leading-relaxed text-brand-black/70">
                      Union County OVI planning often connects directly into Mango guides for ALS, CDL or out-of-state
                      drivers, test refusal, first-offense OVI, and suppression review.
                    </p>
                  </div>
                  <div className="rounded-xl border border-brand-black/10 bg-white p-5">
                    <ShieldCheck className="h-6 w-6 text-brand-mangoText" aria-hidden="true" />
                    <h3 className="mt-4 text-lg font-bold text-brand-black">Compliance and probation</h3>
                    <p className="mt-2 text-sm leading-relaxed text-brand-black/70">
                      Do not guess about probation, bond, no-contact, testing, class, payment, or court-program rules
                      when a written order controls the next step.
                    </p>
                  </div>
                </div>
              </section>

              <section className="rounded-2xl border border-brand-black/10 bg-white p-6 shadow-soft">
                <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-brand-goldText">
                  Attorney context
                </p>
                <h2 className="mt-2 text-2xl font-bold text-brand-black">
                  Former prosecutor perspective for Central Ohio defense cases
                </h2>
                <p className="mt-4 leading-relaxed text-brand-black/70">
                  {attorneyProfile.servicePageBio} He founded Mango Law in Delaware in{' '}
                  {attorneyProfile.foundedFirmLabel} and is listed under Ohio Supreme Court registration no.{' '}
                  {attorneyProfile.registrationNumber}. That background helps frame the first conversation around the
                  court process, the evidence, and the practical risks around work, driving, and release terms.
                </p>
                <div className="mt-5 flex flex-wrap gap-4 text-sm font-semibold">
                  <Link href="/about" className="text-brand-mangoText transition-colors hover:text-brand-leaf">
                    Attorney background
                  </Link>
                  <Link href="/reviews" className="text-brand-mangoText transition-colors hover:text-brand-leaf">
                    Client reviews
                  </Link>
                  <Link href="/contact" className="text-brand-mangoText transition-colors hover:text-brand-leaf">
                    Request case review
                  </Link>
                </div>
              </section>
            </div>

            <aside className="space-y-5">
              <div className="rounded-2xl border border-brand-black/10 bg-brand-offWhite p-6 shadow-soft">
                <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-brand-mangoText">
                  First priorities
                </p>
                <h2 className="mt-2 text-xl font-bold text-brand-black">Start with the paperwork</h2>
                <p className="mt-3 text-sm leading-relaxed text-brand-black/70">
                  Court dates, bond terms, ALS paperwork, proof-of-insurance notes, and probation notices can all change
                  what has to happen first.
                </p>
              </div>

              <div className="rounded-2xl border border-brand-black/10 bg-white p-6 shadow-soft">
                <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-brand-goldText">
                  Primary actions
                </p>
                <div className="mt-4 space-y-3">
                  <Link
                    href="/contact"
                    className="flex items-center justify-between rounded-lg bg-brand-mango px-4 py-3 text-sm font-bold text-brand-black transition-colors hover:bg-brand-gold"
                  >
                    Schedule a consult
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                  <a
                    href={`tel:${PRIMARY_PHONE_TEL}`}
                    className="flex items-center justify-between rounded-lg border border-brand-black/10 bg-brand-offWhite px-4 py-3 text-sm font-bold text-brand-black transition-colors hover:border-brand-mango"
                    data-cta="union_county_preview_sidebar_call"
                  >
                    {PRIMARY_PHONE_DISPLAY}
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </a>
                </div>
              </div>

              <div className="rounded-2xl border border-brand-black/10 bg-white p-6 shadow-soft">
                <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-brand-goldText">
                  Local court resources
                </p>
                <div className="mt-4 space-y-4">
                  {officialSources.map((source) => (
                    <div key={source.href} className="border-b border-brand-black/10 pb-4 last:border-0 last:pb-0">
                      <a
                        href={source.href}
                        className="text-sm font-bold text-brand-mangoText transition-colors hover:text-brand-leaf"
                      >
                        {source.label}
                      </a>
                      <p className="mt-1 text-xs leading-relaxed text-brand-black/60">{source.note}</p>
                    </div>
                  ))}
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <RelatedDefenseGuides
        title="Related OVI and criminal-defense guides"
        description="Use these Mango Law resources for the Ohio OVI and criminal-defense issues that often overlap with Union County cases."
        links={[
          {
            title: 'OVI / DUI defense',
            description: 'The current OVI owner page for Ohio OVI defense strategy, testing, ALS, and court planning.',
            href: '/ovi-dui-defense-delaware-oh',
          },
          {
            title: 'CDL or out-of-state OVI',
            description: 'License, employment, and home-state issues after an Ohio OVI arrest.',
            href: '/blog/cdl-out-of-state-driver-ovi-ohio',
          },
          {
            title: 'First-offense OVI',
            description: 'The first 72 hours, paperwork, court date, and evidence preservation after an OVI charge.',
            href: '/first-offense-ovi-ohio',
          },
          {
            title: 'ALS license suspension',
            description: 'Administrative suspension, driving privileges, and early paperwork after an Ohio OVI arrest.',
            href: '/als-license-suspension-ohio',
          },
          {
            title: 'Summons vs. arrest',
            description: 'A criminal-defense process guide for people trying to understand paperwork or booking.',
            href: '/blog/summons-vs-arrest-delaware-county-ohio',
          },
          {
            title: 'Criminal defense',
            description: 'The broader criminal-defense owner page for felony, misdemeanor, drug, DV, and weapons cases.',
            href: '/criminal-defense-delaware-oh',
          },
        ]}
      />

      <FAQSection faqs={unionCountyLocationFaqs} title="Union County OVI and criminal-defense FAQ" />

      <CTASection
        title="Need help with a Union County OVI or criminal case?"
        body="Bring the ticket, summons, bond paperwork, license notice, and court date so the first step can be matched to the actual documents."
        primaryLabel="Schedule a consult"
        primaryHref="/contact"
        secondaryLabel={PRIMARY_PHONE_DISPLAY}
        secondaryHref={`tel:${PRIMARY_PHONE_TEL}`}
        secondaryCtaId="union_county_preview_cta_call"
      />
    </>
  );
}
