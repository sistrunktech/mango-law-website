import { oviSubsections } from '../data/practiceAreas';
import Image from 'next/image';
import PageHero from '../components/PageHero';
import CTASection from '../components/CTASection';
import FAQSection from '../components/FAQSection';
import LegalCodeCallout from '../components/LegalCodeCallout';
import StatuteSidebar from '../components/StatuteSidebar';
import ServiceAreasSection from '../components/ServiceAreasSection';
import RelatedDefenseGuides from '../components/RelatedDefenseGuides';
import MidPageCtaExperiment from '../components/MidPageCtaExperiment';
import { attorneyProfile } from '../data/attorneyProfile';
import { OFFICE_PHONE_DISPLAY, OFFICE_PHONE_TEL } from '../lib/contactInfo';
import { SEO } from '../lib/seo';
import Link from 'next/link';
import { AlertTriangle, MapPinned } from 'lucide-react';

export const oviDuiFaqs = [
  {
    question: 'Do you handle Delaware Municipal Court OVI cases?',
    answer: 'Yes. We handle OVI matters in Delaware Municipal Court and Delaware County Common Pleas, and we explain how local scheduling, ALS timing, motion practice, and plea posture affect the next step.',
  },
  {
    question: 'What is the difference between OVI and DUI?',
    answer: 'In Ohio, the charge is officially called OVI (Operating a Vehicle Impaired), not DUI (Driving Under the Influence). The terms are used interchangeably, but OVI is the correct legal term. It covers both alcohol and drug impairment, including prescription medications.',
  },
  {
    question: 'What if my OVI arrest started at a checkpoint?',
    answer: 'Checkpoint cases still turn on procedure, notice, neutral selection methods, and what happened after contact. We review the checkpoint circumstances, field sobriety testing, chemical testing, and any body-camera or dash-camera footage before recommending the next move.',
  },
  {
    question: 'Can I refuse a breathalyzer test?',
    answer: 'Yes, but there are consequences. Refusing a breath test triggers an automatic license suspension under Ohio\'s implied consent law. The refusal can also be used as evidence against you in court. However, refusing may eliminate one piece of evidence the state would use to prosecute you. We assess each situation individually.',
  },
  {
    question: 'Will I lose my license after an OVI arrest?',
    answer: 'Possibly. There are two separate license suspensions: an administrative suspension by the BMV (Bureau of Motor Vehicles) and a court-ordered suspension if convicted. You have a limited time to appeal the administrative suspension. We help you navigate both processes and work to minimize or avoid suspension when possible.',
  },
  {
    question: 'What are the penalties for a first-time OVI?',
    answer: 'For a first-time OVI with a BAC under .17, penalties include 3 days to 6 months in jail (with alternatives like a driver intervention program), fines of $375 to $1,075, and a license suspension of 6 months to 3 years. High-test OVI (.17 or higher) carries enhanced penalties. Every case is different, and we work to minimize consequences.',
  },
  {
    question: 'Can I get an OVI reduced to a lesser charge?',
    answer: 'In some cases, yes. Depending on the facts, evidence, and your prior record, we may be able to negotiate a reduction to reckless operation or a physical control charge. These outcomes depend on weaknesses in the state\'s case, procedural errors, or successful motion practice.',
  },
  {
    question: 'What is a field sobriety test, and can it be challenged?',
    answer: 'Field sobriety tests (FSTs) are roadside physical tests used to assess impairment, such as the walk-and-turn, one-leg stand, and horizontal gaze nystagmus. These tests are subjective, and officers often fail to administer them properly. We review dashcam and body camera footage to identify errors and challenge the results.',
  },
  {
    question: 'What happens if I was arrested for OVI with drugs in my system?',
    answer: 'Drug OVI charges apply when you are impaired by illegal drugs, prescription medications, or over-the-counter drugs. The state must prove impairment through blood or urine tests, officer observations, and expert testimony. These cases are complex, and we challenge lab procedures, timelines, and the reliability of testing.',
  },
  {
    question: 'Can I get a restricted license during my suspension?',
    answer: 'In many cases, yes. Ohio allows for occupational driving privileges (often called a "work license" or "hardship license") during a suspension. This allows you to drive for work, school, medical appointments, and other necessary activities. We help you file for privileges as early as possible.',
  },
  {
    question: 'What is a high-test OVI?',
    answer: 'A high-test OVI occurs when your blood alcohol content (BAC) is .17 or higher, more than twice the legal limit of .08. High-test OVI carries enhanced penalties, including mandatory jail time, longer license suspensions, and yellow license plates. We challenge the accuracy of breath and blood testing to dispute high-test charges.',
  },
  {
    question: 'Should I plead guilty to an OVI charge?',
    answer: 'Not without consulting an attorney first. An OVI conviction has serious consequences including jail, fines, license suspension, insurance increases, and a permanent criminal record. We thoroughly review the evidence, challenge weaknesses in the state\'s case, and explore all options before advising on a plea.',
  },
  {
    question: 'What is a felony OVI?',
    answer: 'An OVI becomes a felony if you have prior OVI convictions within the past 10 years (4th offense in 10 years) or if you caused serious physical harm to another person. Felony OVI carries 6 months to several years in prison, substantial fines, and lengthy license suspensions. These cases require aggressive defense.',
  },
  {
    question: 'How long does an OVI stay on my record?',
    answer: 'In Ohio, an OVI conviction stays on your criminal record permanently and cannot be sealed or expunged. It also remains on your driving record and is considered for sentencing purposes for 10 years. This is why fighting the charge is so important.',
  },
];

export default function OviDuiPage() {
  return (
    <>
      <SEO
        title="Delaware Ohio OVI Lawyer | DUI Defense | Mango Law"
        description="Delaware Ohio OVI lawyer for DUI charges, ALS hearings, checkpoint stops, and Delaware County court defense. Practicing in Central Ohio since 1999."
        image="/images/headshots/nick-mango-standing-profile-court-steps.png"
        faqs={oviDuiFaqs}
        breadcrumbs={[
          { name: 'Home', item: '/' },
          { name: 'Practice Areas', item: '/practice-areas' },
          { name: 'OVI / DUI Defense', item: '/ovi-dui-defense-delaware-oh' },
        ]}
      />
      <PageHero
        eyebrow="Delaware County OVI Defense"
        title="Delaware Ohio OVI lawyer for DUI charges, ALS hearings, and checkpoint stops"
        description="Former prosecutor with local Delaware court familiarity, targeted motion practice, and a clear defense plan from arrest through resolution."
        ctaLabel="Schedule a consult"
        ctaHref="/contact"
        showQuickActions={false}
        alignLeft={true}
        compact={true}
        orcSection="4511.19"
        phoneCtaId="ovi_dui_hero_call_office"
      />

      <section className="section bg-white">
        <div className="container">
          <div className="grid gap-12 lg:grid-cols-3">
            <div className="lg:col-span-2 space-y-12">
              <div className="space-y-8">
                <div className="max-w-3xl space-y-6">
                  <div>
                    <h2 className="font-display text-display-sm font-bold text-brand-black mb-4">OVI defense for Delaware Municipal Court and Delaware County Common Pleas cases</h2>
                    <p className="text-lg text-brand-black/70 leading-relaxed">
                      An OVI arrest can put your license, your job, and your record at risk quickly. The defense work usually starts with the first decisions that affect Delaware County cases most: the ALS timeline, the stop itself, the testing evidence, and what the local court calendar requires next.
                    </p>
                  </div>
                  <p className="text-brand-black/70 leading-relaxed">
                    At Mango Law, we focus on the details that matter: challenging the traffic stop, questioning field sobriety
                    test administration, scrutinizing breathalyzer calibration and procedures, and identifying procedural errors.
                    If the case is really about a first offense, a checkpoint stop, or a refusal-driven license issue, we route you into the narrower guide that matches that pressure point instead of leaving you on a generic DUI page.
                  </p>
                  <div className="flex flex-wrap gap-3 text-sm">
                    <Link href="/first-offense-ovi-ohio" className="font-semibold text-brand-mangoText transition-colors hover:text-brand-leaf">
                      First-offense OVI guide
                    </Link>
                    <Link href="/als-license-suspension-ohio" className="font-semibold text-brand-mangoText transition-colors hover:text-brand-leaf">
                      ALS license suspension guide
                    </Link>
                    <Link href="/resources/dui-checkpoints" className="font-semibold text-brand-mangoText transition-colors hover:text-brand-leaf">
                      Ohio checkpoint map
                    </Link>
                    <Link href="/glossary" className="font-semibold text-brand-mangoText transition-colors hover:text-brand-leaf">
                      OVI glossary
                    </Link>
                  </div>
                </div>

                <div className="rounded-[1.5rem] border border-brand-black/10 bg-brand-offWhite/65 p-6 shadow-soft">
                  <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-brand-mangoText">
                    Why clients use Mango for OVI cases
                  </p>
                  <div className="mt-4 grid gap-3 md:grid-cols-3">
                    <div className="rounded-xl border border-brand-black/10 bg-white px-4 py-4">
                      <div className="text-sm font-semibold text-brand-black">Former prosecutor perspective</div>
                      <div className="mt-1 text-sm leading-relaxed text-brand-black/70">
                        {attorneyProfile.servicePageBio} That background helps frame motion, negotiation, and trial decisions realistically.
                      </div>
                    </div>
                    <div className="rounded-xl border border-brand-black/10 bg-white px-4 py-4">
                      <div className="text-sm font-semibold text-brand-black">Public-record-backed experience</div>
                      <div className="mt-1 text-sm leading-relaxed text-brand-black/70">
                        Ohio Supreme Court registration no. {attorneyProfile.registrationNumber}. Practicing since {attorneyProfile.practiceSinceYear}. Sixth Circuit admission dated {attorneyProfile.sixthCircuitAdmissionLabel}.
                      </div>
                    </div>
                    <div className="rounded-xl border border-brand-black/10 bg-white px-4 py-4">
                      <div className="text-sm font-semibold text-brand-black">Delaware-based firm context</div>
                      <div className="mt-1 text-sm leading-relaxed text-brand-black/70">
                        Mango Law has operated from Delaware since {attorneyProfile.foundedFirmLabel}, which supports the local-court and local-consultation focus across this page and the related OVI guides.
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 flex flex-wrap gap-4 text-sm">
                    <Link href="/reviews" className="font-semibold text-brand-mangoText transition-colors hover:text-brand-leaf">
                      Read client reviews
                    </Link>
                    <Link href="/about" className="font-semibold text-brand-mangoText transition-colors hover:text-brand-leaf">
                      Attorney background
                    </Link>
                    <Link href="/criminal-defense-delaware-oh" className="font-semibold text-brand-mangoText transition-colors hover:text-brand-leaf">
                      Broader criminal defense page
                    </Link>
                  </div>
                </div>
              </div>

              <div className="rounded-[1.75rem] border border-brand-black/10 bg-brand-offWhite/45 p-6 shadow-soft">
                <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                  <div>
                    <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-brand-goldText">
                      Specific OVI guides
                    </p>
                    <h3 className="mt-2 text-2xl font-bold leading-tight text-brand-black">
                      Start with the guide that matches the part of the case putting the most pressure on you.
                    </h3>
                  </div>
                  <p className="max-w-xl text-sm leading-relaxed text-brand-black/65">
                    Use the broad OVI page for the overall defense picture, then jump into the narrower guide if the case is really about suspension timing, refusal, checkpoints, or motion practice.
                  </p>
                </div>

                <div className="mt-6 grid gap-3 md:grid-cols-2">
                  {[
                    {
                      title: 'First offense OVI in Ohio',
                      description: 'The first 72 hours, court timing, and what to preserve immediately.',
                      href: '/first-offense-ovi-ohio',
                    },
                    {
                      title: 'OVI test refusal defense',
                      description: 'How refusal changes the administrative track and the court strategy.',
                      href: '/ovi-test-refusal-lawyer-ohio',
                    },
                    {
                      title: 'ALS license suspension defense',
                      description: 'The page focused on suspension timing, driving privileges, and early paperwork.',
                      href: '/als-license-suspension-ohio',
                    },
                    {
                      title: 'Motion to suppress OVI evidence',
                      description: 'Where the stop, detention, or testing process becomes the legal battleground.',
                      href: '/motion-to-suppress-ovi-ohio',
                    },
                    {
                      title: 'Ohio DUI checkpoint map',
                      description: 'Public checkpoint activity, recent history, and checkpoint-specific next steps.',
                      href: '/resources/dui-checkpoints',
                    },
                    {
                      title: 'Driving privileges and ALS article',
                      description: 'A practical explainer for license questions that come up right after an arrest.',
                      href: '/blog/ohio-ovi-driving-privileges-als',
                    },
                  ].map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="group rounded-[1.15rem] border border-brand-black/10 bg-white px-5 py-4 transition-colors hover:border-brand-mangoText/30 hover:bg-brand-mango/5"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <h3 className="text-base font-bold text-brand-black transition-colors group-hover:text-brand-mangoText">
                            {item.title}
                          </h3>
                          <p className="mt-1.5 text-sm leading-relaxed text-brand-black/65">{item.description}</p>
                        </div>
                        <span className="mt-0.5 text-sm font-semibold text-brand-mangoText transition-colors group-hover:text-brand-leaf">
                          Open
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              <LegalCodeCallout section="4511.19" />
            </div>

            <aside className="lg:col-span-1">
              <div className="space-y-6">
                <div className="overflow-hidden rounded-2xl border border-brand-black/10 bg-brand-offWhite shadow-lg">
                  <Image
                    src="/images/headshots/nick-mango-standing-profile-court-steps.png"
                    alt="Attorney Nick Mango outside the courthouse in Delaware, Ohio"
                    className="aspect-[4/5] w-full object-cover object-top"
                    loading="lazy"
                    width={1200}
                    height={1500}
                  />
                  <div className="space-y-2 border-t border-brand-black/10 bg-white p-6">
                    <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand-mangoText">Local OVI defense</p>
                    <p className="text-lg font-semibold text-brand-black">Focused on what changes the case first</p>
                    <p className="text-sm leading-relaxed text-brand-black/70">
                      License risk, stop validity, testing issues, and early motion opportunities usually decide the next move faster than generic legal advice.
                    </p>
                  </div>
                </div>

                <StatuteSidebar practiceArea="ovi-dui" />
              </div>
            </aside>
          </div>
        </div>
      </section>

      <section className="section bg-brand-offWhite">
        <div className="container">
          <div className="mb-12 text-center">
            <h2 className="font-display text-display-sm md:text-display-md mb-4">OVI Case Types</h2>
            <p className="text-lg text-brand-black/60 max-w-3xl mx-auto">
              From standard OVI to complex felony charges, we handle every type of impaired driving case.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {oviSubsections.map((item) => (
              <div key={item.id} id={item.id} className="card bg-white p-6 hover:shadow-soft-lg transition-shadow">
                <h3 className="text-xl font-bold text-brand-black mb-3">{item.title}</h3>
                <p className="text-brand-black/70">{item.copy}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-white">
        <div className="container">
          <div className="mb-12 text-center">
            <h2 className="font-display text-display-sm md:text-display-md mb-4">How We Defend OVI Cases</h2>
            <p className="text-lg text-brand-black/60 max-w-3xl mx-auto">
              Every OVI case is different. We tailor our defense strategy to your specific situation.
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: 'Challenge the Stop',
                description: 'Officers need reasonable suspicion to pull you over. If the stop was illegal, all evidence obtained afterward may be suppressed.',
              },
              {
                title: 'Question Field Sobriety Tests',
                description: 'FSTs are subjective and often improperly administered. We review footage to identify errors and challenge the results.',
              },
              {
                title: 'Challenge Breath/Blood Tests',
                description: 'Breathalyzer machines must be properly calibrated and maintained. Lab procedures must follow strict protocols. We challenge inaccuracies.',
              },
              {
                title: 'Refusal Defense',
                description: 'If you refused testing, we challenge the implied consent process and BMV suspension while building a defense for the criminal charge.',
              },
              {
                title: 'BMV Hearing Representation',
                description: 'We represent you at administrative license suspension hearings to protect your driving privileges.',
              },
              {
                title: 'Negotiation & Trial',
                description: 'We negotiate for charge reductions or alternative sentencing, and we are trial-ready if a favorable plea is not possible.',
              },
            ].map((item, i) => (
              <div key={i} className="card bg-brand-offWhite p-6 hover:shadow-soft-lg transition-shadow">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-brand-mango/10">
                  <span className="text-xl font-bold text-brand-mango">{i + 1}</span>
                </div>
                <h3 className="text-xl font-bold text-brand-black mb-2">{item.title}</h3>
                <p className="text-brand-black/70">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-brand-offWhite">
        <div className="container">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div className="order-2 lg:order-1">
              <div className="rounded-2xl border border-brand-black/10 bg-white p-6 shadow-lg md:p-8">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand-mangoText">Early case priorities</p>
                <div className="mt-5 space-y-4">
                  {[
                    {
                      title: 'Protect the ALS timeline',
                      body: 'Administrative suspension deadlines move quickly, and that license issue often matters before the court case is fully underway.',
                    },
                    {
                      title: 'Lock down the evidence',
                      body: 'Bodycam, dashcam, testing records, dispatch logs, and calibration history are more useful when requested early.',
                    },
                    {
                      title: 'Set the negotiation posture',
                      body: 'A strong early read on stop validity, field testing, and chemical evidence often changes what the prosecution will realistically discuss.',
                    },
                  ].map((item) => (
                    <div key={item.title} className="rounded-xl border border-brand-black/10 bg-brand-offWhite p-4">
                      <h3 className="text-base font-semibold text-brand-black">{item.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-brand-black/70">{item.body}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="space-y-6 order-1 lg:order-2">
              <h2 className="font-display text-display-sm font-bold text-brand-black">Time Is Critical</h2>
              <p className="text-lg text-brand-black/70 leading-relaxed">
                You have only 30 days to appeal an administrative license suspension after an OVI arrest. Evidence must be
                preserved, and witnesses must be interviewed while memories are fresh. The sooner we start building your defense,
                the better your chances of a favorable outcome.
              </p>
              <p className="text-brand-black/70 leading-relaxed">
                Don't wait. Contact Mango Law immediately to protect your rights, your license, and your future.
              </p>
              <div className="grid gap-3 sm:grid-cols-2">
                {[
                  '30-day ALS appeal window',
                  'Driving privilege strategy',
                  'Video and testing preservation',
                  'Court-date and plea-position planning',
                ].map((item) => (
                  <div key={item} className="rounded-xl border border-brand-black/10 bg-brand-mango/5 px-4 py-3 text-sm font-semibold text-brand-black">
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section bg-white">
        <div className="container">
          <div className="mx-auto max-w-4xl">
            <div className="rounded-2xl border-2 border-brand-mango/20 bg-gradient-to-br from-brand-mango/5 to-brand-leaf/5 p-8 md:p-12 shadow-soft-lg">
              <div className="flex flex-col gap-6 md:flex-row md:items-center md:gap-8">
                <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-brand-mango/20">
                  <MapPinned className="h-10 w-10 text-brand-mango" />
                </div>
                <div className="flex-1">
                  <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-brand-mango/20 px-3 py-1 text-xs font-bold uppercase tracking-wide text-brand-mango">
                    <AlertTriangle className="h-3 w-3" />
                    Free Resource
                  </div>
                  <h2 className="font-display text-2xl md:text-3xl font-bold text-brand-black mb-3">
                    Ohio DUI Checkpoint Map
                  </h2>
                  <p className="text-brand-black/70 leading-relaxed mb-4">
                    Browse announced checkpoints across Ohio, understand what the map does and does not show, and review what a checkpoint stop can involve.
                  </p>
                  <Link
                    href="/resources/dui-checkpoints"
                    className="inline-flex items-center gap-2 rounded-lg bg-brand-mango px-6 py-3 font-bold text-brand-black transition-all hover:bg-brand-gold shadow-sm hover:shadow-md"
                  >
                    <MapPinned className="h-5 w-5" />
                    View Checkpoint Map
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section bg-white">
        <div className="container">
          <div className="mx-auto max-w-4xl">
            <MidPageCtaExperiment
              contextLabel="OVI defense"
              ctaIdPrefix="ovi_dui_midpage"
            />
          </div>
        </div>
      </section>

      <RelatedDefenseGuides
        title="Related OVI defense guides"
        description="These pages cover first-offense timelines, refusal strategy, ALS issues, and motion practice."
        links={[
          {
            title: 'First offense OVI in Ohio',
            description: 'Step-by-step priorities for the first 72 hours after an OVI arrest.',
            href: '/first-offense-ovi-ohio',
          },
          {
            title: 'Felony OVI defense',
            description: 'High-risk OVI strategy when exposure escalates beyond a misdemeanor baseline.',
            href: '/felony-ovi-lawyer-ohio',
          },
          {
            title: 'OVI test refusal defense',
            description: 'How refusal-related issues affect both court strategy and license risk.',
            href: '/ovi-test-refusal-lawyer-ohio',
          },
          {
            title: 'ALS license suspension defense',
            description: 'Administrative suspension workflow and timing-sensitive actions.',
            href: '/als-license-suspension-ohio',
          },
          {
            title: 'Motion to suppress OVI evidence',
            description: 'When suppression litigation can change negotiation and trial posture.',
            href: '/motion-to-suppress-ovi-ohio',
          },
          {
            title: 'Criminal defense overview',
            description: 'Broader felony and misdemeanor defense strategy across Ohio courts.',
            href: '/criminal-defense-delaware-oh',
          },
        ]}
      />

      <section className="section bg-brand-offWhite">
        <div className="container">
          <div className="mb-8 text-center">
            <h2 className="font-display text-display-sm md:text-display-md mb-3">OVI resources</h2>
            <p className="text-lg text-brand-black/60 max-w-3xl mx-auto">
              Practical guidance for checkpoints, holiday enforcement, and Delaware County representation.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {[
              {
                title: 'Ohio OVI checkpoints',
                description: 'How checkpoints work, your rights, and what to expect during a stop.',
                href: '/ovi-checkpoints-ohio',
              },
              {
                title: 'Holiday enforcement',
                description: 'What changes during holiday patrols and how to plan ahead.',
                href: '/holiday-ovi-enforcement-ohio',
              },
              {
                title: 'First-offense OVI guide',
                description: 'What to do in the first 72 hours after an Ohio OVI arrest.',
                href: '/first-offense-ovi-ohio',
              },
              {
                title: 'Checkpoint hotspots',
                description: 'High-frequency checkpoint corridors and enforcement patterns in Ohio cities.',
                href: '/blog/ohio-dui-checkpoint-hotspots',
              },
              {
                title: 'Physical control guide',
                description: 'Understand physical control exposure when not actively driving.',
                href: '/blog/physical-control-parked-car-ohio-kevin-mcguff',
              },
              {
                title: 'OVI glossary and terms',
                description: 'Use the glossary when ALS, suppression, probable cause, or testing terms need clarification.',
                href: '/glossary',
              },
            ].map((item) => (
              <div key={item.title} className="card bg-white border border-brand-black/5 p-6">
                <h3 className="text-lg font-semibold text-brand-black">{item.title}</h3>
                <p className="mt-2 text-sm text-brand-black/70">{item.description}</p>
                <Link
                  href={item.href}
                  className="mt-4 inline-flex text-sm font-semibold text-brand-mango hover:text-brand-leaf"
                >
                  Learn more
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <FAQSection faqs={oviDuiFaqs} title="OVI / DUI FAQs" />

      <ServiceAreasSection practiceArea="OVI / DUI Defense" />

      <CTASection
        title="Facing an OVI charge? Let's move quickly."
        primaryLabel="Schedule a consult"
        primaryHref="/contact"
        secondaryLabel={OFFICE_PHONE_DISPLAY}
        secondaryHref={`tel:${OFFICE_PHONE_TEL}`}
        secondaryCtaId="ovi_dui_cta_call_office"
      />
    </>
  );
}
