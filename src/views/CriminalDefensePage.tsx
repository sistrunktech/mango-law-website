import Image from 'next/image';
import Link from 'next/link';
import PageHero from '../components/PageHero';
import CTASection from '../components/CTASection';
import FAQSection from '../components/FAQSection';
import StatuteSidebar from '../components/StatuteSidebar';
import LegalCodeCallout from '../components/LegalCodeCallout';
import ServiceAreasSection from '../components/ServiceAreasSection';
import RelatedDefenseGuides from '../components/RelatedDefenseGuides';
import MidPageCtaExperiment from '../components/MidPageCtaExperiment';
import { attorneyProfile } from '../data/attorneyProfile';
import { OFFICE_PHONE_DISPLAY, OFFICE_PHONE_TEL } from '../lib/contactInfo';
import { SEO } from '../lib/seo';

export const criminalDefenseFaqs = [
  {
    question: 'What should I do if I\'m arrested?',
    answer: 'Remain calm and polite. Do not resist arrest. Invoke your right to remain silent and request an attorney immediately. Do not answer questions or make statements without your lawyer present, even if you think it will help your case. Contact Mango Law as soon as possible.',
  },
  {
    question: 'Do you handle drug charges and domestic violence cases in Delaware County?',
    answer: 'Yes. Mango Law handles Delaware County criminal cases involving drug possession, trafficking, domestic violence, assault, theft, weapons, and related misdemeanor or felony allegations. We use the same process on every case: evidence review, motion analysis, negotiation planning, and trial preparation when needed.',
  },
  {
    question: 'Will I go to jail for a misdemeanor charge?',
    answer: 'Not necessarily. Many misdemeanor cases result in community control (probation), fines, or alternative sentencing. The outcome depends on factors like the specific charge, your criminal history, the facts of the case, and the quality of your defense. We work to minimize consequences and explore alternatives to incarceration.',
  },
  {
    question: 'How long does a criminal case take?',
    answer: 'It varies widely. A misdemeanor case might resolve in 2-4 months, while a felony case can take 6-12 months or longer if it goes to trial. Complex cases with multiple hearings, expert witnesses, or suppression motions will take more time. We keep you informed of timelines and what to expect at every stage.',
  },
  {
    question: 'Can I get my charges dismissed?',
    answer: 'Possibly. Charges can be dismissed if there are constitutional violations (illegal search or seizure), insufficient evidence, witness credibility issues, or procedural errors. We thoroughly review every aspect of your case to identify grounds for dismissal and file appropriate motions when the facts support it.',
  },
  {
    question: 'What is the difference between a felony and a misdemeanor?',
    answer: 'Felonies are more serious crimes punishable by over one year in prison, while misdemeanors carry up to one year in jail. Felonies have more severe long-term consequences including loss of voting rights, firearm restrictions, and greater impact on employment. The degree of the felony (1st through 5th) affects potential penalties.',
  },
  {
    question: 'Will a conviction affect my job or professional license?',
    answer: 'It can. Many employers conduct background checks, and certain professions require licenses that can be revoked or denied based on criminal convictions. We assess these collateral consequences early and build a defense strategy that considers your career and licensing concerns. In some cases, we can negotiate plea agreements that minimize professional impact.',
  },
  {
    question: 'Can I represent myself in criminal court?',
    answer: 'While you have the right to represent yourself, it is strongly discouraged. Criminal law is complex, prosecutors are experienced attorneys, and the consequences of a conviction can be life-altering. Even seemingly simple cases involve constitutional protections, evidentiary rules, and procedural requirements that require legal expertise.',
  },
  {
    question: 'What is a suppression motion?',
    answer: 'A suppression motion asks the court to exclude evidence obtained through illegal means, such as an unconstitutional search or seizure, or statements obtained in violation of Miranda rights. If the motion is granted, critical evidence may be excluded, often leading to case dismissal or significant leverage in negotiations.',
  },
  {
    question: 'Should I take a plea deal or go to trial?',
    answer: 'It depends on the strength of the evidence, the risks of trial, and your goals. We thoroughly analyze the discovery, assess the likelihood of success at trial, and explain the pros and cons of both options. The decision is yours, but you will have all the information needed to make an informed choice.',
  },
  {
    question: 'What if I\'m innocent?',
    answer: 'Being charged does not mean you are guilty. Our job is to hold the state to its burden of proof beyond a reasonable doubt. We investigate the facts, challenge the evidence, interview witnesses, and build a defense strategy to prove your innocence. You have the right to a trial, and we will fight for you at every stage.',
  },
];

export default function CriminalDefensePage() {
  return (
    <>
      <SEO
        title="Delaware County Criminal Defense Attorney | Mango Law LLC"
        description="Delaware County criminal defense attorney for drug charges, domestic violence, assault, theft, weapons, and felony or misdemeanor cases in Delaware, Ohio."
        image="/images/generated/criminal-defense-hero.png"
        faqs={criminalDefenseFaqs}
        breadcrumbs={[
          { name: 'Home', item: '/' },
          { name: 'Practice Areas', item: '/practice-areas' },
          { name: 'Criminal Defense', item: '/criminal-defense-delaware-oh' },
        ]}
      />
      <PageHero
        eyebrow="Delaware County Criminal Defense"
        title="Delaware County criminal defense attorney for felony and misdemeanor charges"
        description="Drug charges, domestic violence, assault, theft, weapons, and related Delaware County criminal cases with organized discovery review and strategic motion practice."
        ctaLabel="Schedule a consult"
        ctaHref="/contact"
        showQuickActions={false}
        alignLeft={true}
        compact={true}
        phoneCtaId="criminal_defense_hero_call_office"
      />

      <section className="section bg-white">
        <div className="container">
          <div className="grid gap-12 lg:grid-cols-3">
            <div className="lg:col-span-2 space-y-8">
              <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
                <div className="space-y-6">
                  <div>
                    <h2 className="font-display text-display-sm font-bold text-brand-black mb-4">Criminal defense representation for Delaware County cases</h2>
                    <p className="text-lg text-brand-black/70 leading-relaxed">
                      Facing criminal charges is overwhelming. Your reputation, your freedom, and your future are at stake.
                      Whether you are searching for a Delaware County criminal defense attorney after a first-time misdemeanor or a serious felony, you need an attorney who
                      understands the system, knows how Delaware Municipal Court and Delaware County Common Pleas cases move, and will fight for your rights.
                    </p>
                  </div>
                  <p className="text-brand-black/70 leading-relaxed">
                    At Mango Law, we handle every aspect of criminal defense with precision and care. From the initial
                    consultation to courtroom advocacy, we are committed to protecting your record and minimizing the impact
                    on your life. If the case overlaps with an OVI arrest, a protection-order issue, or drug-charge exposure,
                    you should move directly into the supporting page that matches that pressure point.
                  </p>
                  <div className="flex flex-wrap gap-3 text-sm">
                    <Link href="/drug-crime-lawyer-delaware-oh" className="font-semibold text-brand-mangoText transition-colors hover:text-brand-leaf">
                      Drug charges
                    </Link>
                    <Link href="/domestic-violence-lawyer-delaware-oh" className="font-semibold text-brand-mangoText transition-colors hover:text-brand-leaf">
                      Domestic violence
                    </Link>
                    <Link href="/protection-order-lawyer-delaware-oh" className="font-semibold text-brand-mangoText transition-colors hover:text-brand-leaf">
                      Protection orders
                    </Link>
                    <Link href="/ovi-dui-defense-delaware-oh" className="font-semibold text-brand-mangoText transition-colors hover:text-brand-leaf">
                      OVI defense
                    </Link>
                    <Link href="/glossary" className="font-semibold text-brand-mangoText transition-colors hover:text-brand-leaf">
                      Criminal-defense glossary
                    </Link>
                  </div>
                </div>
                <Image
                  src="/images/generated/criminal-defense-hero.png"
                  alt="Criminal defense attorney reviewing case files and legal documents in professional office setting"
                  className="aspect-[4/3] w-full rounded-2xl object-cover shadow-lg"
                  loading="lazy"
                  width={1200}
                  height={900}
                />
              </div>

              <div className="rounded-[1.5rem] border border-brand-black/10 bg-brand-offWhite/65 p-6 shadow-soft">
                <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-brand-mangoText">
                  Why clients hire Mango for criminal cases
                </p>
                <div className="mt-4 grid gap-3 md:grid-cols-3">
                  <div className="rounded-xl border border-brand-black/10 bg-white px-4 py-4">
                    <div className="text-sm font-semibold text-brand-black">Former prosecutor perspective</div>
                    <div className="mt-1 text-sm leading-relaxed text-brand-black/70">
                      {attorneyProfile.servicePageBio} That perspective helps frame case assessment, motion strategy, and plea discussions early.
                    </div>
                  </div>
                  <div className="rounded-xl border border-brand-black/10 bg-white px-4 py-4">
                    <div className="text-sm font-semibold text-brand-black">Public-record-backed credentials</div>
                    <div className="mt-1 text-sm leading-relaxed text-brand-black/70">
                      Ohio Supreme Court registration no. {attorneyProfile.registrationNumber}. Practicing since {attorneyProfile.practiceSinceYear}. Sixth Circuit admission dated {attorneyProfile.sixthCircuitAdmissionLabel}.
                    </div>
                  </div>
                  <div className="rounded-xl border border-brand-black/10 bg-white px-4 py-4">
                    <div className="text-sm font-semibold text-brand-black">Delaware-based firm context</div>
                    <div className="mt-1 text-sm leading-relaxed text-brand-black/70">
                      Mango Law has operated from Delaware since {attorneyProfile.foundedFirmLabel}, which supports the local-consultation and Delaware County focus across the money pages on this site.
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
                  <Link href="/resources/dui-checkpoints" className="font-semibold text-brand-mangoText transition-colors hover:text-brand-leaf">
                    Checkpoint resource
                  </Link>
                  <Link href="/blog/delaware-county-criminal-case-timeline" className="font-semibold text-brand-mangoText transition-colors hover:text-brand-leaf">
                    Criminal case timeline
                  </Link>
                </div>
              </div>

              <LegalCodeCallout section="2903.13" />
              <LegalCodeCallout section="2919.25" />
            </div>

            <aside className="lg:col-span-1">
              <StatuteSidebar
                statutes={['2903.11', '2903.13', '2913.02', '2919.25', '2923.12', '2925.11', '4511.19']}
              />
            </aside>
          </div>
        </div>
      </section>

      <section className="section bg-brand-offWhite">
        <div className="container">
          <div className="mb-12 text-center">
            <h2 className="font-display text-display-sm md:text-display-md mb-4">Case Types We Handle</h2>
            <p className="text-lg text-brand-black/60 max-w-3xl mx-auto">
              From misdemeanors to serious felonies, we provide strategic defense tailored to your situation.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: 'Assault and domestic violence charges',
                description: 'Defense for assault, domestic violence, menacing, and related allegations with focus on witness credibility, 911/body-cam review, and protection-order overlap.',
              },
              {
                title: 'Theft & Fraud',
                description: 'Representation for theft, shoplifting, receiving stolen property, identity fraud, and forgery charges.',
              },
              {
                title: 'Weapons Charges',
                description: 'Defense for CCW violations, improper handling of firearms, and weapons under disability charges.',
              },
              {
                title: 'Drug charges and trafficking defense',
                description: 'Possession, trafficking, and paraphernalia charges with attention to search-and-seizure issues, lab testing, and charge framing.',
              },
              {
                title: 'Juvenile Matters',
                description: 'Sensitive handling of juvenile cases with awareness of school impacts and long-term record implications.',
              },
              {
                title: 'Traffic Offenses',
                description: 'Serious traffic offenses including reckless operation, hit-skip, and driving under suspension.',
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
              Every case is different. We tailor our approach to your unique circumstances and goals.
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-2">
            {[
              {
                title: 'Early Case Assessment',
                description: 'Immediate review of police reports, witness statements, and evidence to identify weaknesses in the state\'s case.',
              },
              {
                title: 'Motion Practice',
                description: 'Filing suppression motions and other pretrial motions when constitutional violations or procedural errors exist.',
              },
              {
                title: 'Discovery Review',
                description: 'Thorough examination of all discovery materials including body camera footage, 911 calls, and forensic reports.',
              },
              {
                title: 'Negotiation',
                description: 'Strategic negotiation with prosecutors to achieve charge reductions, alternative sentencing, or case dismissal.',
              },
              {
                title: 'Trial Preparation',
                description: 'Court-ready trial preparation with witness prep, cross-examination strategy, and compelling opening and closing arguments.',
              },
              {
                title: 'Clear Communication',
                description: 'Regular updates on case progress, timelines, and next steps so you always know where you stand.',
              },
            ].map((item, i) => (
              <div key={i} className="flex gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand-mango/10">
                  <span className="text-2xl font-bold text-brand-mango">{i + 1}</span>
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
          <div className="mx-auto max-w-4xl">
            <MidPageCtaExperiment
              contextLabel="criminal defense"
              ctaIdPrefix="criminal_defense_midpage"
            />
          </div>
        </div>
      </section>

      <RelatedDefenseGuides
        title="Related criminal defense guides"
        description="Use these guides to compare OVI, drug, domestic, and protection-order defense pathways."
        links={[
          {
            title: 'Delaware County criminal case timeline',
            description: 'Arraignment, bond, pretrial, discovery, motion, negotiation, and trial stages.',
            href: '/blog/delaware-county-criminal-case-timeline',
          },
          {
            title: 'OVI / DUI defense',
            description: 'Core OVI strategy page covering testing, suppression, and timeline control.',
            href: '/ovi-dui-defense-delaware-oh',
          },
          {
            title: 'Domestic violence first-offense defense',
            description: 'Immediate compliance and evidence priorities in first-offense DV cases.',
            href: '/domestic-violence-first-offense-ohio-defense',
          },
          {
            title: 'Civil protection order defense',
            description: 'Hearing-focused strategy for Ohio protection-order cases.',
            href: '/civil-protection-order-defense-ohio',
          },
          {
            title: 'Drug possession vs trafficking defense',
            description: 'How charge framing and evidence can alter drug-case exposure.',
            href: '/drug-possession-vs-trafficking-ohio-defense',
          },
          {
            title: 'Motion practice in criminal defense',
            description: 'Educational guide to pretrial motions and suppression leverage.',
            href: '/blog/motion-practice-criminal-defense',
          },
          {
            title: 'Drug crimes defense',
            description: 'Broader strategy for possession, trafficking, and search-related litigation.',
            href: '/drug-crime-lawyer-delaware-oh',
          },
        ]}
      />

      <FAQSection faqs={criminalDefenseFaqs} title="Criminal Defense FAQs" />

      <ServiceAreasSection practiceArea="Criminal Defense" />

      <CTASection
        title="Need a defense plan tailored to your case?"
        primaryLabel="Schedule a consult"
        primaryHref="/contact"
        secondaryLabel={OFFICE_PHONE_DISPLAY}
        secondaryHref={`tel:${OFFICE_PHONE_TEL}`}
        secondaryCtaId="criminal_defense_cta_call_office"
      />
    </>
  );
}
