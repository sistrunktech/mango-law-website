import Image from 'next/image';
import PageHero from '../components/PageHero';
import CTASection from '../components/CTASection';
import FAQSection from '../components/FAQSection';
import LegalCodeCallout from '../components/LegalCodeCallout';
import StatuteSidebar from '../components/StatuteSidebar';
import ServiceAreasSection from '../components/ServiceAreasSection';
import RelatedDefenseGuides from '../components/RelatedDefenseGuides';
import MidPageCtaExperiment from '../components/MidPageCtaExperiment';
import { OFFICE_PHONE_DISPLAY, OFFICE_PHONE_TEL } from '../lib/contactInfo';
import { SEO } from '../lib/seo';
import Link from 'next/link';
import { drugCrimePageMetaDescription, drugCrimeSupportLinks } from '../data/seoRoutingContent';

export const drugCrimeFaqs = [
  {
    question: 'What is the difference between drug possession and trafficking?',
    answer: 'Possession charges usually focus on whether the state can prove knowing possession or use. Trafficking charges focus on sale, offer to sell, shipment, delivery, distribution, or facts suggesting drugs were intended for sale. The distinction often depends on quantity, packaging, statements, scales, cash, location, and lab evidence. Trafficking can carry harsher penalties, and some categories can involve mandatory prison terms depending on drug type, amount, location, and history.',
  },
  {
    question: 'Can I get drug charges dismissed if the search was illegal?',
    answer: 'Possibly. If law enforcement violated your Fourth Amendment rights during the stop, search, seizure, or warrant process, we can file a motion to suppress the evidence. If the motion is granted, the state may lose key evidence, which can create dismissal, reduction, or negotiation leverage depending on the remaining proof.',
  },
  {
    question: 'What are the penalties for drug possession in Ohio?',
    answer: 'Penalties vary based on the type and amount of drug, your criminal history, and whether the offense occurred near a school or park. Possession of marijuana (small amounts) may be a minor misdemeanor, while possession of cocaine, heroin, or fentanyl can be a felony with prison time, fines, and a permanent record.',
  },
  {
    question: 'What is Intervention in Lieu of Conviction?',
    answer: 'Intervention in Lieu of Conviction (ILC) is a diversion program for first-time offenders facing drug charges. If accepted, you complete treatment and probation instead of going to trial. Upon successful completion, the charges are dismissed, and you can seal the record. It is a powerful tool to avoid a conviction.',
  },
  {
    question: 'Can I be charged with drug crimes if the drugs were not mine?',
    answer: 'Yes, under the legal theory of constructive possession. If drugs are found in your car, home, or on your person, prosecutors may charge you even if you claim they belong to someone else. We challenge constructive possession by questioning whether you had knowledge of the drugs and control over the area where they were found.',
  },
  {
    question: 'What happens if I am charged with drug paraphernalia?',
    answer: 'Drug paraphernalia charges can involve items allegedly used to store, test, package, weigh, conceal, inject, ingest, inhale, or introduce controlled substances. Ohio law also recognizes exceptions and fact-specific classification issues. We defend these cases by reviewing the search, the item, residue or testing claims, and whether the state can prove the required purpose.',
  },
  {
    question: 'Will I go to prison for a first-time drug offense?',
    answer: 'Not necessarily. First-time offenders may qualify for diversion programs, probation, or alternative sentencing. The outcome depends on the charge, the amount, and whether you are eligible for programs like Intervention in Lieu of Conviction. We work to avoid prison time and minimize long-term consequences.',
  },
  {
    question: 'Can I get a drug conviction sealed or expunged?',
    answer: 'Yes, in many cases. Ohio law allows for sealing (expungement) of certain drug convictions after completing your sentence and waiting period. Diversion programs like ILC allow for immediate sealing upon completion. Sealing removes the conviction from most background checks, helping with employment and housing.',
  },
  {
    question: 'What should I do if police want to search my car or home?',
    answer: 'Do not consent to the search. Politely say, "I do not consent to searches." If they search anyway, do not resist. Police need a warrant or probable cause to search without your consent. If the search was illegal, we can challenge it in court and potentially get the evidence suppressed.',
  },
  {
    question: 'What is the chain of custody, and why does it matter?',
    answer: 'The chain of custody is the documented trail of how evidence (like drugs) was collected, stored, tested, and handled. If there are gaps, errors, or inconsistencies in the chain, the evidence may be unreliable or inadmissible. We scrutinize lab reports and handling procedures to identify weaknesses.',
  },
];

export default function DrugCrimePage() {
  return (
    <>
      <SEO
        title="Drug Crime Lawyer Delaware Ohio"
        description={drugCrimePageMetaDescription}
        image="/images/generated/drug-crimes-defense-hero.png"
        faqs={drugCrimeFaqs}
        breadcrumbs={[
          { name: 'Home', item: '/' },
          { name: 'Practice Areas', item: '/practice-areas' },
          { name: 'Drug Crimes', item: '/drug-crime-lawyer-delaware-oh' },
        ]}
      />
      <PageHero
        eyebrow="Drug Crimes"
        title="Drug crime lawyer in Delaware, Ohio for possession and trafficking defense"
        description="If you are looking for a drug possession attorney or drug trafficking lawyer in Delaware, Ohio, start here. We defend drug charges with search review, lab analysis, diversion screening, and practical case strategy."
        ctaLabel="Schedule a consult"
        ctaHref="/contact"
        showQuickActions={false}
        alignLeft={true}
        compact={true}
        orcSection="2925.11"
        phoneCtaId="drug_crime_hero_call_office"
      />

      <section className="section bg-white">
        <div className="container">
          <div className="grid gap-12 lg:grid-cols-3">
            <div className="lg:col-span-2 space-y-12">
              <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
                <div className="space-y-6">
                  <div>
                    <h2 className="font-display text-display-sm font-bold text-brand-black mb-4">Drug charges lawyer for Delaware County possession and trafficking cases</h2>
                    <p className="text-lg text-brand-black/70 leading-relaxed">
                      Drug charges can derail your life. A conviction can mean jail or prison exposure, licensing issues,
                      financial strain, and a record that follows you for years. Whether the allegation is possession,
                      trafficking, or paraphernalia, early strategy should match the actual evidence, the charge level, and
                      the Delaware County court path.
                    </p>
                  </div>
                  <p className="text-brand-black/70 leading-relaxed">
                    Mango Law is a drug defense attorney in Delaware, Ohio for people facing controlled-substance charges.
                    We scrutinize the legality of the stop, the validity of the search, the chain of custody, and lab testing
                    procedures. We also screen for diversion and treatment-based resolutions where the facts and eligibility rules support them.
                  </p>
                  <div className="grid gap-4 sm:grid-cols-2">
                    {[
                      {
                        title: 'Search and seizure review',
                        description: 'We test the stop, search, consent, and warrant path before accepting the state’s evidence.',
                      },
                      {
                        title: 'Possession vs trafficking',
                        description: 'Charge labels often hinge on quantity, packaging, statements, and contextual facts.',
                      },
                      {
                        title: 'Lab and chain-of-custody issues',
                        description: 'We review handling and testing for reliability gaps that matter in plea talks and motion practice.',
                      },
                      {
                        title: 'Diversion and record protection',
                        description: 'When available, ILC and related options can change the long-term impact of a first-time case.',
                      },
                    ].map((item) => (
                      <div key={item.title} className="rounded-2xl border border-brand-black/10 bg-brand-offWhite/55 p-4">
                        <p className="font-semibold text-brand-black">{item.title}</p>
                        <p className="mt-2 text-sm leading-relaxed text-brand-black/65">{item.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <Image
                  src="/images/generated/drug-crimes-defense-hero.png"
                  alt="Drug crime legal defense strategy with evidence review and lab testing documentation"
                  className="aspect-[4/3] w-full rounded-2xl object-cover shadow-lg"
                  loading="lazy"
                  width={1200}
                  height={900}
                />
              </div>

              <LegalCodeCallout section="2925.11" />
              <LegalCodeCallout section="2925.03" />
            </div>

            <aside className="lg:col-span-1">
              <StatuteSidebar practiceArea="drug-crimes" />
            </aside>
          </div>
        </div>
      </section>

      <section className="section bg-brand-offWhite">
        <div className="container">
          <div className="mb-12 text-center">
            <h2 className="font-display text-display-sm md:text-display-md mb-4">Drug Charges We Handle</h2>
            <p className="text-lg text-brand-black/60 max-w-3xl mx-auto">
              From possession to serious trafficking allegations, we defend drug-related charges with attention to the statute,
              substance, amount, testing, and search record.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: 'Drug Possession',
                description: 'Drug possession defense lawyer guidance for marijuana, cocaine, heroin, fentanyl, methamphetamine, and prescription-drug allegations.',
              },
              {
                title: 'Drug Trafficking',
                description: 'Drug trafficking lawyer analysis focused on sale allegations, distribution evidence, packaging, statements, amounts, and intent.',
              },
              {
                title: 'Drug Paraphernalia',
                description: 'Representation for charges involving items the state claims were used for storage, testing, weighing, packaging, ingestion, or concealment.',
              },
              {
                title: 'Prescription Fraud',
                description: 'Defense for doctor shopping, forged prescriptions, and illegal possession of prescription medications.',
              },
              {
                title: 'Drug Manufacturing',
                description: 'Defense for allegations of manufacturing or cultivating controlled substances.',
              },
              {
                title: 'Federal Drug Charges',
                description: 'Representation in federal court for large-scale drug conspiracies and trafficking across state lines.',
              },
            ].map((item, i) => (
              <div key={i} className="card bg-white p-6 hover:shadow-soft-lg transition-shadow">
                <h3 className="text-xl font-bold text-brand-black mb-3">{item.title}</h3>
                <p className="text-brand-black/70">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-white">
        <div className="container">
          <div className="mb-12 text-center">
            <h2 className="font-display text-display-sm md:text-display-md mb-4">Our Defense Strategy</h2>
            <p className="text-lg text-brand-black/60 max-w-3xl mx-auto">
              We challenge every element of the prosecution's case to protect your rights and freedom.
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-2">
            {[
              {
                title: 'Challenge the Stop & Search',
                description: 'If the traffic stop or search was illegal, we file motions to suppress all evidence obtained as a result.',
              },
              {
                title: 'Question Lab Results',
                description: 'We scrutinize lab procedures, handling, and testing to identify errors, contamination, or improper protocols.',
              },
              {
                title: 'Challenge Possession',
                description: 'We question whether you had knowledge of the drugs and control over the location where they were found.',
              },
              {
                title: 'Diversion Programs',
                description: 'We pursue Intervention in Lieu of Conviction and other diversion programs that avoid a criminal record.',
              },
              {
                title: 'Negotiate Reductions',
                description: 'We work to reduce charges from trafficking to possession or secure alternative sentencing like treatment.',
              },
              {
                title: 'Trial Preparation',
                description: 'If a favorable plea is not available, we prepare for trial and fight for acquittal.',
              },
            ].map((item, i) => (
              <div key={i} className="flex gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand-leaf/10">
                  <span className="text-2xl font-bold text-brand-leaf">{i + 1}</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-brand-black mb-2">{item.title}</h3>
                  <p className="text-brand-black/70">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-white">
        <div className="container">
          <div className="mx-auto max-w-4xl space-y-6">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-brand-mangoText">
                Case strategy
              </p>
              <h2 className="mt-3 font-display text-display-sm md:text-display-md text-brand-black">
                Possession, trafficking, and search issues belong on one strategy map
              </h2>
            </div>
            <p className="text-lg leading-relaxed text-brand-black/70">
              A drug crime lawyer in Delaware, Ohio should not treat the charge label as the whole case. The first pass
              should separate possession proof, trafficking proof, paraphernalia allegations, and search-and-seizure issues
              before any plea, diversion, or trial decision is made.
            </p>
            <p className="leading-relaxed text-brand-black/70">
              If you need a drug possession attorney in Delaware, Ohio, a drug possession lawyer in Delaware County, Ohio,
              or a drug trafficking lawyer in Delaware, Ohio, start here and then compare the
              supporting guides for the evidence issue: <Link href="/drug-possession-vs-trafficking-ohio-defense" className="font-semibold text-brand-mangoText transition-colors hover:text-brand-leaf">possession vs. trafficking defense</Link>,{' '}
              <Link href="/blog/drug-possession-vs-trafficking-ohio" className="font-semibold text-brand-mangoText transition-colors hover:text-brand-leaf">possession vs. trafficking explained</Link>,{' '}
              <Link href="/blog/drug-possession-in-car-ohio" className="font-semibold text-brand-mangoText transition-colors hover:text-brand-leaf">drug possession in a car</Link>,{' '}
              <Link href="/blog/drug-possession-charge-ohio-what-to-do-next" className="font-semibold text-brand-mangoText transition-colors hover:text-brand-leaf">what to do after a possession charge</Link>, and{' '}
              <Link href="/blog/motion-practice-criminal-defense" className="font-semibold text-brand-mangoText transition-colors hover:text-brand-leaf">motion practice for search issues</Link>.
            </p>
            <p className="leading-relaxed text-brand-black/70">
              People often start with searches like drug charges lawyer Delaware Ohio, drug defense attorney Delaware Ohio,
              or drug possession defense lawyer Delaware Ohio. The better first move is the same in each lane: preserve the
              stop timeline, review the search, compare the alleged substance and amount against the statute, and decide
              whether diversion, suppression, reduction, or trial preparation should lead the strategy.
            </p>
          </div>
        </div>
      </section>

      <section className="section bg-brand-offWhite">
        <div className="container">
          <div className="mb-8 text-center">
            <h2 className="font-display text-display-sm md:text-display-md mb-3">Start with the guide matching the evidence issue</h2>
            <p className="text-lg text-brand-black/60 max-w-3xl mx-auto">
              These pages cover the charge distinctions, motion issues, and first-step guidance people most often need after a drug arrest.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {drugCrimeSupportLinks.map((item) => (
              <div key={item.title} className="rounded-2xl border border-brand-black/10 bg-white p-6">
                <h3 className="text-xl font-bold text-brand-black">{item.title}</h3>
                <p className="mt-2 text-brand-black/70">{item.description}</p>
                <Link
                  href={item.href}
                  className="mt-4 inline-flex text-sm font-semibold text-brand-mango hover:text-brand-leaf"
                >
                  Explore resource
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-white">
        <div className="container">
          <div className="mx-auto max-w-4xl">
            <MidPageCtaExperiment
              contextLabel="drug charge defense"
              ctaIdPrefix="drug_crime_midpage"
            />
          </div>
        </div>
      </section>

      <RelatedDefenseGuides
        title="Related drug-defense guides"
        description="Use these pages to compare possession/trafficking allegations and align strategy with broader criminal defense."
        links={[
          {
            title: 'Drug possession vs trafficking defense',
            description: 'High-intent strategy page focused on charge distinction and evidence structure.',
            href: '/drug-possession-vs-trafficking-ohio-defense',
          },
          {
            title: 'Drug possession vs trafficking (blog)',
            description: 'Educational guide on Ohio charge differences and practical implications.',
            href: '/blog/drug-possession-vs-trafficking-ohio',
          },
          {
            title: 'Drug possession: what to do next',
            description: 'Immediate first-step checklist after a possession arrest.',
            href: '/blog/drug-possession-charge-ohio-what-to-do-next',
          },
          {
            title: 'Criminal defense overview',
            description: 'Broader litigation strategy for felony and misdemeanor criminal cases.',
            href: '/criminal-defense-delaware-oh',
          },
          {
            title: 'Motion practice guide',
            description: 'Pretrial motion strategy for search, seizure, and evidence disputes.',
            href: '/blog/motion-practice-criminal-defense',
          },
          {
            title: 'OVI / DUI defense',
            description: 'Related strategy for overlapping OVI and drug-impairment allegations.',
            href: '/ovi-dui-defense-delaware-oh',
          },
        ]}
      />
      <FAQSection faqs={drugCrimeFaqs} title="Drug Crime FAQs" />

      <ServiceAreasSection practiceArea="Drug Crime Defense" />

      <CTASection
        title="Let's review your drug case quickly."
        primaryLabel="Schedule a consult"
        primaryHref="/contact"
        secondaryLabel={OFFICE_PHONE_DISPLAY}
        secondaryHref={`tel:${OFFICE_PHONE_TEL}`}
        secondaryCtaId="drug_crime_cta_call_office"
      />
    </>
  );
}
