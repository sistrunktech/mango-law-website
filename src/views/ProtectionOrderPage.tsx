import Image from 'next/image';
import PageHero from '../components/PageHero';
import CTASection from '../components/CTASection';
import FAQSection from '../components/FAQSection';
import ImagePlaceholder from '../components/ImagePlaceholder';
import LegalCodeCallout from '../components/LegalCodeCallout';
import StatuteSidebar from '../components/StatuteSidebar';
import ServiceAreasSection from '../components/ServiceAreasSection';
import RelatedDefenseGuides from '../components/RelatedDefenseGuides';
import MidPageCtaExperiment from '../components/MidPageCtaExperiment';
import { PRIMARY_PHONE_DISPLAY, PRIMARY_PHONE_TEL } from '../lib/contactInfo';
import { SEO } from '../lib/seo';
import Link from 'next/link';

export const protectionOrderFaqs = [
  {
    question: 'What is a civil protection order?',
    answer: 'A civil protection order (CPO) is a civil court order that can restrict contact, residence access, parenting contact, property issues, and other conduct depending on the facts and statute. The filing itself is civil, but violating a qualifying protection order can create a separate criminal charge.',
  },
  {
    question: 'What happens if a protection order is filed against me?',
    answer: 'You may first be served with a petition, a temporary ex parte order, and a full-hearing date. Ohio domestic-violence CPO hearings often move within seven or ten court days depending on the relief ordered, unless service or other good cause changes the schedule. At the full hearing, both sides may present evidence before the judge decides whether to issue an order after hearing.',
  },
  {
    question: 'Can I contest a protection order?',
    answer: 'Yes. You have the right to contest the order at the hearing. We present evidence, cross-examine the petitioner, and challenge the allegations. If the petitioner fails to meet the legal standard (proving by a preponderance of the evidence that you committed the alleged acts), the order can be denied.',
  },
  {
    question: 'What are the consequences of a protection order?',
    answer: 'A protection order can affect housing, work, parenting time, firearm issues, travel, and contact with people or places listed in the order. Violating an order can be prosecuted separately and can also create contempt exposure. Even temporary terms should be followed exactly while the hearing strategy is built.',
  },
  {
    question: 'Can a protection order be dismissed or modified?',
    answer: 'Yes, depending on the stage and facts. If the petitioner does not meet the burden at the full hearing, the order can be denied. After an order is issued following a full hearing, either side may seek modification or termination by motion, but the moving party has to show why the order is no longer needed or why the terms are no longer appropriate.',
  },
  {
    question: 'What is the difference between an ex parte order and a full-hearing order?',
    answer: 'An ex parte order can be issued before the respondent is heard when the court finds good cause for temporary relief. A full-hearing order is issued only after notice and an opportunity to be heard. Domestic-violence CPOs issued after hearing must state a certain end date and generally cannot last more than five years unless renewed under the statute.',
  },
  {
    question: 'Will a protection order affect my gun rights?',
    answer: 'It can. Ohio CPO forms include a federal-law notice that firearm possession or purchase may be unlawful under 18 U.S.C. 922(g)(8) while a qualifying order or consent agreement is in effect. The analysis depends on the order, notice and hearing history, findings or terms, and any separate Ohio or federal disqualification.',
  },
  {
    question: 'Can I be charged with a crime if a protection order is filed against me?',
    answer: 'Not automatically. A protection order is a civil matter. However, if the underlying conduct involves assault, domestic violence, stalking, or other criminal acts, you may face separate criminal charges. We coordinate defense strategies for both the protection order hearing and any related criminal case.',
  },
  {
    question: 'What should I do if someone files a protection order against me?',
    answer: 'Do not contact the petitioner or violate the temporary order. Gather evidence, witness information, and documentation that supports your side. Contact an attorney immediately. The hearing happens quickly, and preparation is critical to protecting your rights.',
  },
  {
    question: 'Can I file a counter-petition for a protection order?',
    answer: 'Possibly. Ohio mutual-order rules require a separate petition, notice, hearing opportunity, and specific findings before a court can impose reciprocal protection-order duties. We assess whether a counter-petition is evidence-supported, strategic, and procedurally realistic.',
  },
];

export default function ProtectionOrderPage() {
  return (
    <>
      <SEO
        title="Protection Order Lawyer Delaware OH"
        description="Protection order lawyer in Delaware, Ohio for CPO hearings, no-contact issues, evidence preparation, and related domestic-violence case overlap."
        image="/images/generated/protection-order-defense-hero.png"
        faqs={protectionOrderFaqs}
        breadcrumbs={[
          { name: 'Home', item: '/' },
          { name: 'Practice Areas', item: '/practice-areas' },
          { name: 'Protection Orders', item: '/protection-order-lawyer-delaware-oh' },
        ]}
      />
      <PageHero
        eyebrow="Protection Orders"
        title="Protection order lawyer in Delaware, Ohio for CPO hearing defense"
        description="Responding to a civil protection order or no-contact restriction in Delaware County? Build a hearing-focused plan around service, deadlines, evidence, compliance, and any related domestic-violence or criminal case."
        ctaLabel="Schedule a consult"
        ctaHref="/contact"
        showQuickActions={false}
        alignLeft={true}
        compact={true}
        orcSection="3113.31"
        phoneCtaId="protection_order_hero_call_office"
      />

      <section className="section bg-white">
        <div className="container">
          <div className="grid gap-12 lg:grid-cols-3">
            <div className="lg:col-span-2 space-y-12">
              <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
                <div className="space-y-6">
                  <div>
                    <h2 className="font-display text-display-sm font-bold text-brand-black mb-4">Protection order defense for Delaware County CPO hearings</h2>
                    <p className="text-lg text-brand-black/70 leading-relaxed">
                      If a civil protection order petition or temporary order has been filed against you, the first priorities are
                      strict compliance, hearing preparation, and preserving evidence before texts, call logs, photos, or witnesses
                      become harder to organize.
                    </p>
                  </div>
                  <p className="text-brand-black/70 leading-relaxed">
                    A Delaware protection order lawyer can help you understand what the order actually says, what deadlines are
                    coming up, and how it may affect housing, contact, parenting, work, firearm issues, and any related domestic
                    violence or criminal case.
                  </p>
                </div>
                <Image
                  src="/images/generated/protection-order-defense-hero.png"
                  alt="Protection order legal defense with attorney preparing hearing strategy"
                  className="aspect-[4/3] w-full rounded-2xl object-cover shadow-lg"
                  loading="lazy"
                  width={1200}
                  height={900}
                />
              </div>

              <LegalCodeCallout section="3113.31" />
            </div>

            <aside className="lg:col-span-1">
              <StatuteSidebar practiceArea="protection-orders" />
            </aside>
          </div>
        </div>
      </section>

      <section className="section bg-brand-offWhite">
        <div className="container">
          <div className="mb-12 text-center">
            <h2 className="font-display text-display-sm md:text-display-md mb-4">How We Defend Protection Order Cases</h2>
            <p className="text-lg text-brand-black/60 max-w-3xl mx-auto">
              We prepare thoroughly and fight aggressively to protect your rights.
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-2">
            {[
              {
                title: 'Challenge Allegations',
                description: 'We scrutinize the petitioner\'s allegations for inconsistencies, unsupported claims, missing context, and proof problems.',
              },
              {
                title: 'Gather Evidence',
                description: 'We organize witness information, text messages, emails, photos, call logs, location records, and other hearing evidence.',
              },
              {
                title: 'Cross-Examination',
                description: 'We cross-examine the petitioner to expose credibility issues, motives, and weaknesses in their testimony.',
              },
              {
                title: 'Present Your Case',
                description: 'We present witnesses, documents, and testimony to tell your side of the story and refute the allegations.',
              },
              {
                title: 'Coordinate with Criminal Defense',
                description: 'If domestic violence, menacing, assault, or violation allegations overlap, we coordinate the civil hearing with criminal-defense strategy.',
              },
              {
                title: 'Post-Hearing Options',
                description: 'If an order is issued after hearing, we review modification, termination, appeal, compliance, and collateral-impact options.',
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
          <div className="mb-8 text-center">
            <h2 className="font-display text-display-sm md:text-display-md mb-3">Protection order resources</h2>
            <p className="text-lg text-brand-black/60 max-w-3xl mx-auto">
              Related guidance for ex parte hearings, no-contact terms, and connected domestic violence allegations.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                title: 'CPO hearing in Delaware County',
                description: 'Evidence, deadlines, and hearing-day preparation for respondents.',
                href: '/blog/civil-protection-order-hearing-delaware-county-ohio',
              },
              {
                title: 'No-contact order vs CPO',
                description: 'Compare criminal no-contact terms against civil protection orders.',
                href: '/blog/no-contact-order-vs-civil-protection-order-ohio',
              },
              {
                title: 'Ex parte order process',
                description: 'Understand temporary order hearings and preparation priorities.',
                href: '/blog/ex-parte-protection-orders-ohio-defense',
              },
              {
                title: 'Domestic violence defense',
                description: 'See related defense strategy when criminal DV charges are filed.',
                href: '/domestic-violence-lawyer-delaware-oh',
              },
            ].map((item) => (
              <div key={item.title} className="rounded-2xl border border-brand-black/10 bg-brand-offWhite p-6">
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

      <section className="section bg-brand-offWhite">
        <div className="container">
          <div className="mx-auto max-w-4xl space-y-6">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-brand-mangoText">
                CPO hearing strategy
              </p>
              <h2 className="mt-3 font-display text-display-sm md:text-display-md text-brand-black">
                Civil protection order lawyer guidance for Delaware and Ohio CPO defense
              </h2>
            </div>
            <p className="text-lg leading-relaxed text-brand-black/70">
              People often search for a civil protection order lawyer in Delaware, Ohio, a CPO lawyer in Delaware, Ohio,
              or a CPO defense attorney in Ohio after they have already been served. The first move is not to contact the
              petitioner or explain yourself outside court. The first move is to comply with the temporary terms, preserve
              evidence, and prepare for the full hearing.
            </p>
            <p className="leading-relaxed text-brand-black/70">
              A protection order defense attorney in Ohio should separate the civil protection-order hearing from any
              criminal no-contact order, bond condition, or domestic-violence charge. Use the <Link href="/civil-protection-order-defense-ohio" className="font-semibold text-brand-mangoText transition-colors hover:text-brand-leaf">civil protection order defense guide</Link>,{' '}
              <Link href="/blog/no-contact-order-vs-civil-protection-order-ohio" className="font-semibold text-brand-mangoText transition-colors hover:text-brand-leaf">no-contact order comparison</Link>, and{' '}
              <Link href="/domestic-violence-lawyer-delaware-oh" className="font-semibold text-brand-mangoText transition-colors hover:text-brand-leaf">Delaware domestic violence defense page</Link> when those issues overlap.
            </p>
            <p className="leading-relaxed text-brand-black/70">
              If you need a no contact order lawyer in Ohio because a criminal case is also pending, keep the instructions
              from each court separate and do not rely on one order to interpret another. A contact mistake can create new
              criminal exposure even when the underlying allegation is still contested.
            </p>
          </div>
        </div>
      </section>

      <section className="section bg-white">
        <div className="container">
          <div className="mx-auto max-w-4xl">
            <MidPageCtaExperiment
              contextLabel="protection order defense"
              ctaIdPrefix="protection_order_midpage"
            />
          </div>
        </div>
      </section>

      <RelatedDefenseGuides
        title="Related protection-order guides"
        description="Use these pages to coordinate CPO hearing preparation with related domestic-violence defense strategy."
        links={[
          {
            title: 'Civil protection order defense (Ohio)',
            description: 'Hearing-focused strategy for respondents in Ohio CPO proceedings.',
            href: '/civil-protection-order-defense-ohio',
          },
          {
            title: 'Delaware domestic violence defense',
            description: 'Local criminal-case strategy where domestic allegations and order proceedings overlap.',
            href: '/domestic-violence-lawyer-delaware-oh',
          },
          {
            title: 'Domestic violence first-offense defense',
            description: 'High-intent planning for first-offense allegations and no-contact conditions.',
            href: '/domestic-violence-first-offense-ohio-defense',
          },
          {
            title: 'No-contact vs CPO guide',
            description: 'Educational distinction guide for criminal no-contact terms and civil orders.',
            href: '/blog/no-contact-order-vs-civil-protection-order-ohio',
          },
          {
            title: 'Ex parte order defense guide',
            description: 'Immediate planning after temporary ex parte order entry.',
            href: '/blog/ex-parte-protection-orders-ohio-defense',
          },
          {
            title: 'Criminal defense overview',
            description: 'Broader criminal-case strategy context where charges are also pending.',
            href: '/criminal-defense-delaware-oh',
          },
        ]}
      />
      <FAQSection faqs={protectionOrderFaqs} title="Protection Order FAQs" />

      <ServiceAreasSection practiceArea="Protection Order Defense" />

      <CTASection
        title="Need help with a protection order?"
        body="Time is critical. Contact us immediately to prepare your defense."
        primaryLabel="Schedule a consult"
        primaryHref="/contact"
        secondaryLabel={PRIMARY_PHONE_DISPLAY}
        secondaryHref={`tel:${PRIMARY_PHONE_TEL}`}
        secondaryCtaId="protection_order_cta_call_office"
      />
    </>
  );
}
