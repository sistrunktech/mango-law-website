import Image from 'next/image';
import PageHero from '../components/PageHero';
import CTASection from '../components/CTASection';
import FAQSection from '../components/FAQSection';
import LegalCodeCallout from '../components/LegalCodeCallout';
import StatuteSidebar from '../components/StatuteSidebar';
import ServiceAreasSection from '../components/ServiceAreasSection';
import RelatedDefenseGuides from '../components/RelatedDefenseGuides';
import MidPageCtaExperiment from '../components/MidPageCtaExperiment';
import { PRIMARY_PHONE_DISPLAY, PRIMARY_PHONE_TEL } from '../lib/contactInfo';
import { SEO } from '../lib/seo';
import Link from 'next/link';
import {
  domesticViolencePageMetaDescription,
  domesticViolenceSupportLinks,
} from '../data/seoRoutingContent';

export const domesticViolenceFaqs = [
  {
    question: 'What counts as domestic violence in Ohio?',
    answer:
      'Domestic violence charges can involve allegations of knowingly causing or attempting to cause physical harm, recklessly causing serious physical harm, or making a threat of force that causes belief of imminent physical harm to a family or household member. The exact charge and degree depend on the facts, relationship, and any prior history. We review the allegations, evidence, and relationship element carefully before advising on next steps.',
  },
  {
    question: 'Will I go to jail for a domestic violence charge?',
    answer:
      'Not always, but it is possible. Penalties depend on the degree of the offense, whether there are prior convictions, the presence of injuries, and whether additional charges (like violating a protection order) are involved. We focus early on bond conditions, no-contact terms, and strategies to reduce or avoid incarceration.',
  },
  {
    question: 'How does a no-contact order affect me?',
    answer:
      'No-contact orders can restrict communication, require you to leave a shared residence, and impact parenting time. Even “friendly” contact can violate the order and create new charges. We help you understand the conditions, document compliance, and pursue modifications where appropriate.',
  },
  {
    question: 'Can domestic violence charges be dismissed?',
    answer:
      'Sometimes. Dismissal can be possible when evidence is weak, statements change, witnesses are not credible, or there are constitutional issues with how evidence was obtained. We evaluate body cam footage, 911 calls, medical records, texts, and third-party witnesses to identify the strongest defense path.',
  },
  {
    question: 'Do I need a lawyer if the other person wants to drop the charges?',
    answer:
      'Yes. The State controls the criminal case, and cases can move forward even if the alleged victim does not want prosecution. We build a defense based on evidence and procedure, and we coordinate with you on safe, legal ways to address no-contact orders and related protection order proceedings.',
  },
  {
    question: 'Will a domestic violence case affect gun rights?',
    answer:
      'It can. A qualifying misdemeanor domestic violence conviction can trigger federal firearm restrictions under 18 U.S.C. 922(g)(9), and a qualifying protection order can create separate restrictions under 18 U.S.C. 922(g)(8). We review the charge, order language, notice and hearing history, and any court weapons terms before negotiations or plea decisions.',
  },
  {
    question: 'What should I do right after an arrest for domestic violence?',
    answer:
      'Do not discuss the incident with police or anyone who may be a witness. Follow bond and no-contact conditions strictly. Preserve helpful evidence (messages, call logs, photos) and contact an attorney quickly so we can address bond conditions, deadlines, and early defense steps.',
  },
];

export default function DomesticViolencePage() {
  return (
    <>
      <SEO
        title="Domestic Violence Lawyer Delaware OH"
        description={domesticViolencePageMetaDescription}
        image="/images/generated/blog-assault-domestic-violence.png"
        faqs={domesticViolenceFaqs}
        breadcrumbs={[
          { name: 'Home', item: '/' },
          { name: 'Practice Areas', item: '/practice-areas' },
          { name: 'Domestic Violence', item: '/domestic-violence-lawyer-delaware-oh' },
        ]}
      />

      <PageHero
        eyebrow="Domestic Violence"
        title="Domestic violence lawyer in Delaware, Ohio for bond, no-contact, and protection-order risk"
        description="If you are looking for a domestic violence lawyer in Delaware, Ohio, start here. We focus on evidence review, bond compliance, and related protection-order issues in Delaware County and Franklin County cases."
        ctaLabel="Schedule a consult"
        ctaHref="/contact"
        showQuickActions={false}
        alignLeft={true}
        compact={true}
        orcSection="2919.25"
        phoneCtaId="domestic_violence_hero_call_office"
      />

      <section className="section bg-white">
        <div className="container">
          <div className="grid gap-12 lg:grid-cols-3">
            <div className="lg:col-span-2 space-y-12">
              <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
                <div className="space-y-6">
                  <div>
                    <h2 className="font-display text-display-sm font-bold text-brand-black mb-4">
                      Domestic violence lawyer strategy for Delaware County cases
                    </h2>
                    <p className="text-lg text-brand-black/70 leading-relaxed">
                      Domestic violence cases often involve high emotion and fast timelines. The court may impose immediate
                      conditions that impact your home, work, and family. Our approach is to get you compliant, protect your
                      record, and challenge the evidence methodically as a domestic violence lawyer in Delaware, Ohio focused on
                      criminal-defense and protection-order overlap.
                    </p>
                  </div>
                  <p className="text-brand-black/70 leading-relaxed">
                    We review body camera footage, 911 calls, medical records, messages, and third-party witnesses. We also
                    address bond terms and no-contact orders early, so you know exactly what you can and cannot do while the
                    case is pending.
                  </p>
                  <div className="grid gap-4 sm:grid-cols-2">
                    {[
                      {
                        title: 'Bond and no-contact conditions',
                        description: 'We prioritize compliance so a technical violation does not create a second problem.',
                      },
                      {
                        title: 'Protection-order overlap',
                        description: 'Civil protection order claims can shape the criminal case if they are not coordinated early.',
                      },
                      {
                        title: 'First-offense decision points',
                        description: 'The early decisions in first-offense cases can affect housing, parenting, and work.',
                      },
                      {
                        title: 'Record and firearm exposure',
                        description: 'We evaluate collateral consequences early so strategy reflects more than just the next hearing.',
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
                  src="/images/generated/blog-assault-domestic-violence.png"
                  alt="Domestic violence defense strategy with careful evidence review"
                  className="aspect-[4/3] w-full rounded-2xl object-cover shadow-lg"
                  loading="lazy"
                  width={1200}
                  height={900}
                />
              </div>

              <LegalCodeCallout section="2919.25" />
              <LegalCodeCallout section="3113.31" />
            </div>

            <aside className="lg:col-span-1">
              <StatuteSidebar practiceArea="domestic-violence" />
            </aside>
          </div>
        </div>
      </section>

      <section className="section bg-brand-offWhite">
        <div className="container">
          <div className="mb-12 text-center">
            <h2 className="font-display text-display-sm md:text-display-md mb-4">
              How we approach domestic violence cases
            </h2>
            <p className="text-lg text-brand-black/60 max-w-3xl mx-auto">
              Our focus is fast clarity, strict compliance, and evidence-based defense strategy.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            {[
              {
                title: 'Stabilize the situation',
                description:
                  'We help you understand bond conditions and no-contact terms immediately so you avoid a second case from a technical violation.',
              },
              {
                title: 'Preserve and review evidence',
                description:
                  'We identify key evidence early: body cam footage, 911 audio, messages, photos, and third-party witnesses.',
              },
              {
                title: 'Challenge weak allegations',
                description:
                  'We test credibility, inconsistencies, and relationship elements, and we raise defenses like self-defense when supported by facts.',
              },
              {
                title: 'Protect your record',
                description:
                  'We pursue resolutions that reduce collateral damage to employment, licensing, housing, and future background checks.',
              },
              {
                title: 'Coordinate related matters',
                description:
                  'If there is a civil protection order hearing, we coordinate strategy so you don’t get boxed in across proceedings.',
              },
              {
                title: 'Prepare for trial when necessary',
                description:
                  'If the State won’t offer a fair resolution, we prepare for trial with organized discovery review and motion practice.',
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
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="font-display text-display-sm md:text-display-md mb-4">
              What a Delaware domestic violence defense review should cover
            </h2>
            <p className="text-lg text-brand-black/65 leading-relaxed">
              A useful first review separates the criminal charge, the relationship element, bond restrictions, and any
              civil protection-order process. That keeps urgent compliance decisions from being confused with trial
              strategy.
            </p>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {[
              {
                title: 'Charge and relationship element',
                body: 'Ohio domestic violence charges turn on both the alleged conduct and whether the family-or-household relationship fits the statute.',
                href: '/blog/domestic-violence-arrest-delaware-county-ohio',
                label: 'Arrest process guide',
              },
              {
                title: 'Bond and no-contact compliance',
                body: 'Release terms can affect housing, parenting, calls, texts, social media, and third-party messages before discovery is complete.',
                href: '/blog/no-contact-order-vs-civil-protection-order-ohio',
                label: 'No-contact guide',
              },
              {
                title: 'CPO and firearms consequences',
                body: 'Criminal temporary protection orders, civil protection orders, and qualifying federal firearm restrictions need separate review.',
                href: '/protection-order-lawyer-delaware-oh',
                label: 'Protection-order defense',
              },
            ].map((item) => (
              <div key={item.title} className="rounded-2xl border border-brand-black/10 bg-brand-offWhite p-6">
                <h3 className="text-xl font-bold text-brand-black">{item.title}</h3>
                <p className="mt-3 text-brand-black/70 leading-relaxed">{item.body}</p>
                <Link
                  href={item.href}
                  className="mt-5 inline-flex text-sm font-semibold text-brand-mango hover:text-brand-leaf"
                >
                  {item.label}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-white">
        <div className="container">
          <div className="mb-8 text-center">
            <h2 className="font-display text-display-sm md:text-display-md mb-3">Start with the guide matching the pressure point in your case</h2>
            <p className="text-lg text-brand-black/60 max-w-3xl mx-auto">
              Domestic violence charges often overlap with first-offense questions, bond restrictions, and protection-order procedure.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {domesticViolenceSupportLinks.map((item) => (
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

      <section className="section bg-white">
        <div className="container">
          <div className="mx-auto max-w-4xl">
            <MidPageCtaExperiment
              contextLabel="domestic violence defense"
              ctaIdPrefix="domestic_violence_midpage"
            />
          </div>
        </div>
      </section>

      <RelatedDefenseGuides
        title="Related domestic-defense guides"
        description="These pages help coordinate criminal allegations, no-contact terms, and protection-order hearings."
        links={[
          {
            title: 'No-contact bond terms after a DV arrest',
            description: 'What release conditions can mean for texts, housing, parenting, and property retrieval.',
            href: '/blog/no-contact-bond-terms-domestic-violence-ohio',
          },
          {
            title: 'After a domestic violence arrest',
            description: 'Delaware County first steps for booking, bond, no-contact, and protection-order issues.',
            href: '/blog/domestic-violence-arrest-delaware-county-ohio',
          },
          {
            title: 'First-offense domestic violence defense',
            description: 'Immediate priority plan for first-offense domestic violence allegations in Ohio.',
            href: '/domestic-violence-first-offense-ohio-defense',
          },
          {
            title: 'Protection order defense',
            description: 'Civil-order strategy when protection-order proceedings overlap with criminal allegations.',
            href: '/protection-order-lawyer-delaware-oh',
          },
          {
            title: 'Delaware County CPO hearing guide',
            description: 'Evidence, deadlines, and compliance steps for local civil protection order hearings.',
            href: '/blog/civil-protection-order-hearing-delaware-county-ohio',
          },
          {
            title: 'Civil protection order defense (Ohio)',
            description: 'Hearing-stage preparation for respondents in CPO cases.',
            href: '/civil-protection-order-defense-ohio',
          },
          {
            title: 'No-contact vs CPO guide',
            description: 'Educational guide explaining differences and compliance risks.',
            href: '/blog/no-contact-order-vs-civil-protection-order-ohio',
          },
          {
            title: 'Ex parte order defense guide',
            description: 'How to respond when temporary orders are entered before full hearing.',
            href: '/blog/ex-parte-protection-orders-ohio-defense',
          },
          {
            title: 'Criminal defense overview',
            description: 'Broader case-strategy context for related misdemeanor/felony exposure.',
            href: '/criminal-defense-delaware-oh',
          },
        ]}
      />
      <FAQSection faqs={domesticViolenceFaqs} title="Domestic Violence FAQs" />

      <ServiceAreasSection practiceArea="Domestic Violence Defense" />

      <CTASection
        title="Need clear next steps?"
        body="If you were arrested or contacted by police, time matters. Get advice that protects your record and your family."
        primaryLabel="Schedule a consult"
        primaryHref="/contact"
        secondaryLabel={PRIMARY_PHONE_DISPLAY}
        secondaryHref={`tel:${PRIMARY_PHONE_TEL}`}
        secondaryCtaId="domestic_violence_cta_call_office"
      />
    </>
  );
}
