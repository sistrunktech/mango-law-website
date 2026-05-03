import PageHero from '../components/PageHero';
import CTASection from '../components/CTASection';
import FAQSection from '../components/FAQSection';
import LegalCodeCallout from '../components/LegalCodeCallout';
import ServiceAreasSection from '../components/ServiceAreasSection';
import RelatedDefenseGuides, { type DefenseGuideLink } from '../components/RelatedDefenseGuides';
import MidPageCtaExperiment from '../components/MidPageCtaExperiment';
import { OFFICE_PHONE_DISPLAY, OFFICE_PHONE_TEL } from '../lib/contactInfo';
import { SEO } from '../lib/seo';
import type { FAQEntry } from '../lib/structured-data';

type HighIntentConfig = {
  slug: string;
  seoTitle: string;
  seoDescription: string;
  heroEyebrow: string;
  heroTitle: string;
  heroDescription: string;
  breadcrumbName: string;
  orcSection: string;
  optionalOrcSection?: string;
  introHeading: string;
  introBody: string[];
  keyPointsHeading: string;
  keyPoints: Array<{ title: string; description: string }>;
  actionHeading: string;
  actionSteps: string[];
  relatedDescription: string;
  relatedGuides: DefenseGuideLink[];
  faqs: FAQEntry[];
  serviceAreaLabel: string;
  ctaTitle: string;
  ctaBody: string;
  midPageContext: string;
};

const legalVariabilityNote =
  'What happens in your case may vary based on the facts, prior history, county/court practice, and prosecutor policy. This page is general information, not legal advice for your specific situation.';

function HighIntentServicePage({ config }: { config: HighIntentConfig }) {
  return (
    <>
      <SEO
        title={config.seoTitle}
        description={config.seoDescription}
        image="/images/generated/ovi-case-strategy.png"
        faqs={config.faqs}
        breadcrumbs={[
          { name: 'Home', item: '/' },
          { name: 'Practice Areas', item: '/practice-areas' },
          { name: config.breadcrumbName, item: `/${config.slug}` },
        ]}
      />

      <PageHero
        eyebrow={config.heroEyebrow}
        title={config.heroTitle}
        description={config.heroDescription}
        ctaLabel="Schedule a consult"
        ctaHref="/contact"
        showQuickActions={false}
        alignLeft={true}
        compact={true}
        orcSection={config.orcSection}
        phoneCtaId={`${config.slug}_hero_call_office`}
      />

      <section className="section bg-white">
        <div className="container">
          <div className="mx-auto max-w-4xl space-y-6">
            <h2 className="font-display text-display-sm font-bold text-brand-black">{config.introHeading}</h2>
            {config.introBody.map((paragraph) => (
              <p key={paragraph.slice(0, 40)} className="text-lg leading-relaxed text-brand-black/75">
                {paragraph}
              </p>
            ))}
            <p className="rounded-xl border border-brand-black/10 bg-brand-offWhite p-4 text-sm text-brand-black/70">
              {legalVariabilityNote}
            </p>
          </div>

          <div className="mx-auto mt-8 grid max-w-4xl gap-4 md:grid-cols-2">
            <LegalCodeCallout section={config.orcSection} />
            {config.optionalOrcSection ? <LegalCodeCallout section={config.optionalOrcSection} /> : null}
          </div>
        </div>
      </section>

      <section className="section bg-brand-offWhite">
        <div className="container">
          <div className="mb-10 text-center">
            <h2 className="font-display text-display-sm md:text-display-md">{config.keyPointsHeading}</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {config.keyPoints.map((point) => (
              <div key={point.title} className="rounded-2xl border border-brand-black/10 bg-white p-6">
                <h3 className="text-xl font-bold text-brand-black">{point.title}</h3>
                <p className="mt-2 text-brand-black/70">{point.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-white">
        <div className="container">
          <div className="mx-auto max-w-4xl">
            <h2 className="font-display text-display-sm md:text-display-md">{config.actionHeading}</h2>
            <ol className="mt-6 grid gap-4 md:grid-cols-2">
              {config.actionSteps.map((step, index) => (
                <li key={step} className="flex gap-3 rounded-xl border border-brand-black/10 bg-brand-offWhite p-4">
                  <span className="mt-0.5 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand-mango/20 text-sm font-bold text-brand-black">
                    {index + 1}
                  </span>
                  <span className="text-brand-black/75">{step}</span>
                </li>
              ))}
            </ol>

            <MidPageCtaExperiment
              contextLabel={config.midPageContext}
              className="mt-8"
              ctaIdPrefix={`${config.slug}_midpage`}
            />
          </div>
        </div>
      </section>

      <RelatedDefenseGuides
        title="Related defense guides"
        description={config.relatedDescription}
        links={config.relatedGuides}
      />

      <FAQSection faqs={config.faqs} title={`${config.breadcrumbName} FAQs`} />

      <ServiceAreasSection practiceArea={config.serviceAreaLabel} />

      <CTASection
        title={config.ctaTitle}
        body={config.ctaBody}
        primaryLabel="Schedule a consult"
        primaryHref="/contact"
        secondaryLabel={OFFICE_PHONE_DISPLAY}
        secondaryHref={`tel:${OFFICE_PHONE_TEL}`}
        secondaryCtaId={`${config.slug}_cta_call_office`}
      />
    </>
  );
}

export const firstOffenseOviFaqs: FAQEntry[] = [
  {
    question: 'Is a first OVI automatically reduced if I have no record?',
    answer:
      'No. A clean record can matter, but case outcomes depend on evidence quality, legal issues, and local court practice.',
  },
  {
    question: 'Is ALS the same as a criminal conviction?',
    answer:
      'No. ALS is an administrative process tied to arrest/testing while the criminal case proceeds separately in court.',
  },
  {
    question: 'Should I plead quickly to move on?',
    answer:
      'Not before a full evidence review. Early plea decisions can affect driving, work, and long-term record outcomes.',
  },
];

const firstOffenseOviConfig: HighIntentConfig = {
  slug: 'first-offense-ovi-ohio',
  seoTitle: 'First Offense OVI in Ohio | Lawyer Guidance',
  seoDescription:
    'Charged with a first offense OVI in Ohio? Learn what happens next, where risk usually comes from, and how to protect your license and record early.',
  heroEyebrow: 'First-Offense OVI',
  heroTitle: 'First Offense OVI in Ohio: What to Do in the First 72 Hours',
  heroDescription:
    'Early evidence review, timeline control, and clear planning across the administrative and court tracks.',
  breadcrumbName: 'First Offense OVI in Ohio',
  orcSection: '4511.19',
  optionalOrcSection: '4511.191',
  introHeading: 'A first OVI charge is time-sensitive',
  introBody: [
    'The first days after a first offense OVI in Ohio often shape what options remain later. Preserving facts, understanding deadlines, and avoiding preventable mistakes can materially change case posture.',
    'Most first-offense matters involve two separate tracks: administrative license consequences and the court case. A clear strategy addresses both from the start.',
  ],
  keyPointsHeading: 'Where first-offense cases are usually defended',
  keyPoints: [
    {
      title: 'Stop and detention legality',
      description: 'If the initial stop lacked legal basis, key evidence may be challengeable through motion practice.',
    },
    {
      title: 'Testing procedure reliability',
      description: 'Chemical testing timelines, handling, and procedure can become central issues in contested cases.',
    },
    {
      title: 'ALS timeline control',
      description: 'Administrative steps happen quickly and must be addressed in coordination with court strategy.',
    },
    {
      title: 'Record protection planning',
      description: 'Early decisions can influence exposure and long-term collateral impact across work and licensing.',
    },
  ],
  actionHeading: 'What to do in the first 72 hours',
  actionSteps: [
    'Write down your timeline while details are fresh.',
    'Save all paperwork, bond terms, and release instructions.',
    'Avoid public statements and social posts about the stop.',
    'Gather witness names and possible video sources.',
    'Get case-specific legal review before making plea decisions.',
    'Track all deadlines tied to license and court obligations.',
  ],
  relatedDescription:
    'Use these pages for ALS details, refusal issues, and the broader OVI defense framework.',
  relatedGuides: [
    { title: 'OVI / DUI defense', href: '/ovi-dui-defense-delaware-oh', description: 'Broad OVI defense overview and strategy.' },
    {
      title: 'ALS license suspension defense',
      href: '/als-license-suspension-ohio',
      description: 'Administrative suspension process and strategy.',
    },
    {
      title: 'OVI test refusal defense',
      href: '/ovi-test-refusal-lawyer-ohio',
      description: 'How refusal issues affect case posture and licensing.',
    },
    {
      title: 'Motion to suppress OVI evidence',
      href: '/motion-to-suppress-ovi-ohio',
      description: 'Common suppression pathways in OVI cases.',
    },
  ],
  faqs: firstOffenseOviFaqs,
  serviceAreaLabel: 'First-Offense OVI Defense',
  ctaTitle: 'Need first-offense OVI guidance now?',
  ctaBody: 'Early strategy often determines what options remain. Get a case-specific review quickly.',
  midPageContext: 'first-offense OVI',
};

export const felonyOviFaqs: FAQEntry[] = [
  {
    question: 'When does an OVI case become felony-level in Ohio?',
    answer:
      'Felony exposure generally depends on prior history, alleged harm, and charging circumstances. The exact path is fact-dependent and requires case-specific analysis.',
  },
  {
    question: 'Does felony-level OVI always mean prison?',
    answer:
      'Not always. Exposure can be significant, but outcomes depend on evidence, legal challenges, and negotiation/trial posture.',
  },
  {
    question: 'Why does early defense work matter in felony OVI cases?',
    answer:
      'Early evidence review and motion strategy can materially affect leverage, plea options, and trial risk.',
  },
];

const felonyOviConfig: HighIntentConfig = {
  slug: 'felony-ovi-lawyer-ohio',
  seoTitle: 'Felony OVI Lawyer in Ohio | Defense for High-Risk Cases',
  seoDescription:
    'Facing felony OVI allegations in Ohio? Learn what raises risk, what the process can look like, and how early defense strategy can protect options.',
  heroEyebrow: 'Felony OVI',
  heroTitle: 'Felony OVI in Ohio: Early Defense Decisions Matter',
  heroDescription:
    'Felony-level OVI allegations can move fast and carry severe exposure. Strategy, evidence control, and timing matter.',
  breadcrumbName: 'Felony OVI Lawyer Ohio',
  orcSection: '4511.19',
  introHeading: 'Felony OVI cases demand a disciplined response',
  introBody: [
    'Felony-level OVI matters can involve significant sentencing and licensing consequences. The legal and factual details often determine whether risk escalates or can be reduced.',
    'Defense planning should begin immediately with a full evidence map and a realistic litigation strategy.',
  ],
  keyPointsHeading: 'Core pressure points in felony OVI defense',
  keyPoints: [
    { title: 'Charge structure', description: 'How prosecutors frame priors and alleged conduct can heavily influence exposure.' },
    {
      title: 'Evidence integrity',
      description: 'Testing records, officer reports, and procedural compliance must be analyzed in detail.',
    },
    {
      title: 'Suppression opportunities',
      description: 'Constitutional and procedural issues can change leverage if raised effectively and on time.',
    },
    {
      title: 'Collateral consequences',
      description: 'Case strategy must account for employment, licensing, and long-term record effects.',
    },
  ],
  actionHeading: 'Immediate steps after felony-level OVI allegations',
  actionSteps: [
    'Secure all arrest and court paperwork immediately.',
    'Preserve timeline details and potential witness information.',
    'Avoid informal statements about the incident.',
    'Request early discovery review and testing records.',
    'Evaluate motion strategy before resolution discussions.',
    'Plan for both court and administrative license tracks.',
  ],
  relatedDescription: 'Use these supporting guides to evaluate OVI suppression, ALS, and first-offense distinctions.',
  relatedGuides: [
    { title: 'OVI / DUI defense', href: '/ovi-dui-defense-delaware-oh', description: 'Pillar page for broad OVI defense strategy.' },
    {
      title: 'Motion to suppress OVI evidence',
      href: '/motion-to-suppress-ovi-ohio',
      description: 'Suppression strategy fundamentals in OVI litigation.',
    },
    {
      title: 'First-offense OVI guidance',
      href: '/first-offense-ovi-ohio',
      description: 'First-offense process baseline and early actions.',
    },
    {
      title: 'Criminal defense overview',
      href: '/criminal-defense-delaware-oh',
      description: 'Broader felony-defense process and planning.',
    },
  ],
  faqs: felonyOviFaqs,
  serviceAreaLabel: 'Felony OVI Defense',
  ctaTitle: 'Facing felony OVI exposure?',
  ctaBody: 'Get a defense plan built around evidence, timelines, and risk control.',
  midPageContext: 'felony OVI',
};

export const oviTestRefusalFaqs: FAQEntry[] = [
  {
    question: 'Does refusing a test end an OVI case?',
    answer:
      'No. Refusal affects the evidence profile but does not automatically end prosecution. The state may still proceed on other evidence.',
  },
  {
    question: 'How does refusal affect my license?',
    answer:
      'Refusal can trigger administrative suspension consequences that run on a separate track from the criminal case.',
  },
  {
    question: 'Can refusal issues still be defended aggressively?',
    answer:
      'Yes. Refusal cases can involve important legal and procedural issues that should be examined early.',
  },
];

const oviTestRefusalConfig: HighIntentConfig = {
  slug: 'ovi-test-refusal-lawyer-ohio',
  seoTitle: 'OVI Test Refusal Lawyer in Ohio | Breath Test Refusal Defense',
  seoDescription:
    'Refused a breath or chemical test in Ohio? Understand ALS risk, court impact, and how refusal cases are defended.',
  heroEyebrow: 'OVI Test Refusal',
  heroTitle: 'Refused Testing in an Ohio OVI Case: What Happens Next',
  heroDescription:
    'Refusal can create immediate administrative consequences and still leave major litigation opportunities in court.',
  breadcrumbName: 'OVI Test Refusal Lawyer Ohio',
  orcSection: '4511.191',
  optionalOrcSection: '4511.19',
  introHeading: 'Refusal cases are usually two-track cases',
  introBody: [
    'A refusal event can trigger administrative license action while the criminal case develops independently. Both tracks should be reviewed together, not in isolation.',
    'The right defense strategy depends on procedure, timing, and what evidence the state can still rely on.',
  ],
  keyPointsHeading: 'Where refusal cases can turn',
  keyPoints: [
    { title: 'Administrative timeline', description: 'License-related deadlines can be short and should be managed early.' },
    {
      title: 'Procedure review',
      description: 'Officers and agencies must follow procedural requirements that can become litigated issues.',
    },
    {
      title: 'Evidence alternatives',
      description: 'The prosecution may still rely on other evidence; defense planning should account for all sources.',
    },
    {
      title: 'Coordination with court strategy',
      description: 'Administrative decisions and criminal-case posture should be approached as one integrated plan.',
    },
  ],
  actionHeading: 'What to do after a refusal-related suspension notice',
  actionSteps: [
    'Preserve all paperwork and arrest documentation.',
    'Record timeline details while fresh.',
    'Review license status and restrictions immediately.',
    'Avoid assumptions based on informal advice.',
    'Request early legal analysis of procedural issues.',
    'Coordinate refusal strategy with criminal-case planning.',
  ],
  relatedDescription: 'Use these pages for ALS details, OVI strategy, and related suppression planning.',
  relatedGuides: [
    {
      title: 'Refusal vs. failed test guide',
      href: '/blog/ovi-refusal-vs-failed-test-ohio',
      description: 'How Ohio refusal and positive-test paths differ after arrest.',
    },
    {
      title: 'ALS license suspension defense',
      href: '/als-license-suspension-ohio',
      description: 'Administrative track detail and timing.',
    },
    { title: 'OVI / DUI defense', href: '/ovi-dui-defense-delaware-oh', description: 'Broader OVI defense framework.' },
    {
      title: 'Field sobriety refusal guide',
      href: '/blog/refuse-field-sobriety-test-ohio',
      description: 'Educational background on refusal-related issues.',
    },
    {
      title: 'ALS and driving privileges explainer',
      href: '/blog/ohio-ovi-driving-privileges-als',
      description: 'Educational context for ALS timing and privilege requests.',
    },
    {
      title: 'Motion to suppress OVI evidence',
      href: '/motion-to-suppress-ovi-ohio',
      description: 'Suppression-focused strategy page.',
    },
  ],
  faqs: oviTestRefusalFaqs,
  serviceAreaLabel: 'OVI Test Refusal Defense',
  ctaTitle: 'Need refusal-case strategy now?',
  ctaBody: 'Get practical guidance for the administrative and court tracks before deadlines pass.',
  midPageContext: 'OVI refusal',
};

export const alsLicenseSuspensionFaqs: FAQEntry[] = [
  {
    question: 'Is ALS the same as a conviction?',
    answer: 'No. ALS is administrative and separate from conviction outcomes in the criminal case.',
  },
  {
    question: 'Can driving privileges be addressed while the case is pending?',
    answer:
      'In many cases, yes, but timing, eligibility, and court procedure matter. Case-specific review is important.',
  },
  {
    question: 'Why does ALS strategy need to align with court strategy?',
    answer: 'Administrative and criminal tracks influence each other and should be managed in a coordinated plan.',
  },
];

const alsLicenseSuspensionConfig: HighIntentConfig = {
  slug: 'als-license-suspension-ohio',
  seoTitle: 'ALS License Suspension in Ohio | OVI License Defense',
  seoDescription:
    'Dealing with an Ohio ALS suspension? See how ALS works, what can vary, and what to do early to protect driving options.',
  heroEyebrow: 'ALS License Suspension',
  heroTitle: 'Ohio ALS Suspension: How the Administrative Track Works',
  heroDescription:
    'ALS issues often begin immediately and should be addressed together with court-case strategy.',
  breadcrumbName: 'ALS License Suspension Ohio',
  orcSection: '4511.191',
  optionalOrcSection: '4511.19',
  introHeading: 'ALS is administrative, but it affects real life fast',
  introBody: [
    'Administrative license consequences can impact work, family logistics, and case leverage before a criminal case is resolved.',
    'The strongest approach is to treat ALS as a strategic part of the full defense timeline, not as a side issue.',
  ],
  keyPointsHeading: 'ALS strategy fundamentals',
  keyPoints: [
    { title: 'Track separation', description: 'Administrative and criminal outcomes are connected but not identical.' },
    {
      title: 'Deadline control',
      description: 'Missed administrative timing can narrow options even when criminal defenses remain strong.',
    },
    {
      title: 'Documentation quality',
      description: 'Forms, notices, and procedural details can materially affect administrative outcomes.',
    },
    {
      title: 'Integrated planning',
      description: 'License strategy and court strategy should be coordinated from the beginning.',
    },
  ],
  actionHeading: 'What to do immediately after ALS notice',
  actionSteps: [
    'Keep all suspension paperwork and notices organized.',
    'Confirm your current driving status and restrictions.',
    'Identify required court/agency filings and dates.',
    'Avoid assumptions about privileges without verification.',
    'Coordinate ALS review with your OVI defense plan.',
    'Document transportation/work impacts to support strategy.',
  ],
  relatedDescription: 'These pages connect ALS decisions with refusal and broader OVI defense planning.',
  relatedGuides: [
    { title: 'OVI / DUI defense', href: '/ovi-dui-defense-delaware-oh', description: 'Core OVI litigation and strategy.' },
    {
      title: 'OVI test refusal defense',
      href: '/ovi-test-refusal-lawyer-ohio',
      description: 'Refusal-specific defense and licensing impact.',
    },
    {
      title: 'ALS educational guide',
      href: '/blog/ohio-ovi-driving-privileges-als',
      description: 'General explainer for ALS and driving privileges.',
    },
    {
      title: 'First-offense OVI guide',
      href: '/first-offense-ovi-ohio',
      description: 'Early-stage OVI timeline and action plan.',
    },
  ],
  faqs: alsLicenseSuspensionFaqs,
  serviceAreaLabel: 'ALS License Defense',
  ctaTitle: 'Need help protecting driving options?',
  ctaBody: 'Address ALS exposure early with a coordinated legal strategy.',
  midPageContext: 'ALS suspension',
};

export const motionToSuppressOviFaqs: FAQEntry[] = [
  {
    question: 'What does a motion to suppress do in an OVI case?',
    answer:
      'It asks the court to exclude evidence obtained through constitutional or procedural violations.',
  },
  {
    question: 'Does every OVI case have a suppression issue?',
    answer:
      'No. Suppression opportunities depend on facts, procedure, and available evidence, which must be reviewed carefully.',
  },
  {
    question: 'Can suppression rulings change negotiation outcomes?',
    answer:
      'Yes. Evidence rulings can materially affect leverage and resolution options in many contested cases.',
  },
];

const motionToSuppressOviConfig: HighIntentConfig = {
  slug: 'motion-to-suppress-ovi-ohio',
  seoTitle: 'Motion to Suppress OVI Evidence in Ohio | Defense Guide',
  seoDescription:
    'Learn when OVI evidence may be challenged in Ohio and how suppression strategy can affect negotiations and trial posture.',
  heroEyebrow: 'OVI Motion Practice',
  heroTitle: 'Motion to Suppress in Ohio OVI Cases',
  heroDescription:
    'Suppression strategy can significantly alter case posture when constitutional or procedural issues exist.',
  breadcrumbName: 'Motion to Suppress OVI Ohio',
  orcSection: '4511.19',
  introHeading: 'Suppression strategy starts with disciplined evidence review',
  introBody: [
    'Suppression motions are fact-driven and must be tied to specific legal defects. Strong motions usually come from careful timeline analysis and complete discovery review.',
    'Not every case supports suppression, but missing valid suppression issues can cost major leverage.',
  ],
  keyPointsHeading: 'Common suppression categories in OVI defense',
  keyPoints: [
    { title: 'Stop legality', description: 'Whether officers had lawful basis for the initial stop is often a central issue.' },
    {
      title: 'Detention scope',
      description: 'Extended detention and investigative steps must align with legal standards.',
    },
    {
      title: 'Testing procedure',
      description: 'Chemical and field-testing procedure errors may affect admissibility and reliability.',
    },
    {
      title: 'Documentation conflicts',
      description: 'Video, reports, and testimony inconsistencies can become significant litigation points.',
    },
  ],
  actionHeading: 'How suppression-focused defense is built',
  actionSteps: [
    'Obtain and organize full discovery as early as possible.',
    'Build a timeline from reports, video, and records.',
    'Identify constitutional/procedural issues tied to evidence.',
    'Draft targeted motions grounded in specific facts.',
    'Prepare hearings with focused witness and exhibit strategy.',
    'Reassess negotiation posture after key rulings.',
  ],
  relatedDescription: 'Use these pages to connect suppression strategy with broader OVI and criminal-defense planning.',
  relatedGuides: [
    {
      title: 'Motion practice in criminal defense',
      href: '/blog/motion-practice-criminal-defense',
      description: 'Educational guide to pretrial motion strategy.',
    },
    { title: 'OVI / DUI defense', href: '/ovi-dui-defense-delaware-oh', description: 'Core OVI defense strategy page.' },
    {
      title: 'Felony OVI defense',
      href: '/felony-ovi-lawyer-ohio',
      description: 'Felony-level OVI planning and risk control.',
    },
    {
      title: 'Criminal defense overview',
      href: '/criminal-defense-delaware-oh',
      description: 'Broader criminal-case defense framework.',
    },
  ],
  faqs: motionToSuppressOviFaqs,
  serviceAreaLabel: 'OVI Suppression Defense',
  ctaTitle: 'Need a suppression-focused case review?',
  ctaBody: 'Identify legal pressure points early and build strategy around admissibility issues.',
  midPageContext: 'OVI suppression',
};

export const domesticViolenceFirstOffenseFaqs: FAQEntry[] = [
  {
    question: 'Does a first domestic violence charge always lead to jail?',
    answer:
      'Not always. Outcomes depend on allegations, evidence, history, and local court process.',
  },
  {
    question: 'Can no-contact conditions affect family logistics immediately?',
    answer:
      'Yes. Bond/no-contact terms can alter housing and communication immediately and must be followed carefully.',
  },
  {
    question: 'Why is early defense work important in first-offense DV cases?',
    answer:
      'Early evidence control and compliance planning can prevent avoidable complications and improve defense posture.',
  },
];

const domesticViolenceFirstOffenseConfig: HighIntentConfig = {
  slug: 'domestic-violence-first-offense-ohio-defense',
  seoTitle: 'First Offense Domestic Violence Defense in Ohio | What to Do',
  seoDescription:
    'Charged with domestic violence in Ohio for the first time? Understand immediate risks, court process, and defense strategy options.',
  heroEyebrow: 'First-Offense Domestic Violence',
  heroTitle: 'First Offense Domestic Violence Charge in Ohio: Immediate Priorities',
  heroDescription:
    'Early compliance and evidence strategy are essential when allegations move quickly and collateral risk is high.',
  breadcrumbName: 'Domestic Violence First Offense Ohio Defense',
  orcSection: '2919.25',
  optionalOrcSection: '3113.31',
  introHeading: 'First-offense domestic violence cases can escalate quickly',
  introBody: [
    'Bond conditions and no-contact terms can affect housing, communication, and family logistics right away. Technical violations can create separate legal exposure.',
    'Defense strategy should pair strict compliance planning with immediate evidence preservation and review.',
  ],
  keyPointsHeading: 'High-impact issues in first-offense DV cases',
  keyPoints: [
    { title: 'Bond and no-contact compliance', description: 'Immediate compliance prevents secondary charges and strategic setbacks.' },
    {
      title: 'Evidence context',
      description: '911 audio, body cam, messages, and witness context often shape case trajectory.',
    },
    {
      title: 'Parallel order risk',
      description: 'Civil protection-order proceedings may overlap and require coordinated defense planning.',
    },
    {
      title: 'Collateral impact',
      description: 'Case handling can affect work, housing, licensing, and family-court posture.',
    },
  ],
  actionHeading: 'What to do first in a DV allegation case',
  actionSteps: [
    'Read and follow bond/no-contact conditions exactly.',
    'Avoid any informal contact that could violate terms.',
    'Preserve messages, call records, and timeline notes.',
    'Identify potential witnesses and key context evidence.',
    'Coordinate criminal and civil-order strategy together.',
    'Get case-specific counsel before any statements or agreements.',
  ],
  relatedDescription: 'Use these pages for protection-order overlap and domestic-violence defense context.',
  relatedGuides: [
    {
      title: 'Domestic violence defense pillar',
      href: '/domestic-violence-lawyer-delaware-oh',
      description: 'Core domestic-violence defense framework.',
    },
    {
      title: 'Protection order defense',
      href: '/protection-order-lawyer-delaware-oh',
      description: 'Civil-order hearing strategy and process.',
    },
    {
      title: 'No-contact order vs CPO',
      href: '/blog/no-contact-order-vs-civil-protection-order-ohio',
      description: 'Educational distinctions and compliance issues.',
    },
    {
      title: 'Civil protection order defense (Ohio)',
      href: '/civil-protection-order-defense-ohio',
      description: 'Hearing-focused civil-order defense page.',
    },
  ],
  faqs: domesticViolenceFirstOffenseFaqs,
  serviceAreaLabel: 'Domestic Violence Defense',
  ctaTitle: 'Need immediate domestic-violence defense planning?',
  ctaBody: 'Get guidance on compliance, evidence, and next-step case strategy.',
  midPageContext: 'domestic-violence defense',
};

export const civilProtectionOrderDefenseFaqs: FAQEntry[] = [
  {
    question: 'Is an ex parte order the same as the full hearing result?',
    answer:
      'No. Ex parte orders are temporary and one-sided; full hearings involve both sides presenting evidence.',
  },
  {
    question: 'Can protection-order allegations be contested effectively?',
    answer:
      'Yes. Preparation, evidence organization, and hearing strategy can materially affect outcomes.',
  },
  {
    question: 'Should CPO defense be coordinated with related criminal matters?',
    answer:
      'Yes. Overlapping proceedings should be handled with a coordinated strategy to avoid unnecessary risk.',
  },
];

const civilProtectionOrderDefenseConfig: HighIntentConfig = {
  slug: 'civil-protection-order-defense-ohio',
  seoTitle: 'Civil Protection Order Defense in Ohio | Hearing Preparation',
  seoDescription:
    'Responding to a civil protection order in Ohio? Learn hearing-stage priorities, evidence prep, and defense strategy considerations.',
  heroEyebrow: 'Civil Protection Order Defense',
  heroTitle: 'Defending a Civil Protection Order Case in Ohio',
  heroDescription:
    'Preparation quality, evidence structure, and hearing strategy are decisive in many CPO matters.',
  breadcrumbName: 'Civil Protection Order Defense Ohio',
  orcSection: '3113.31',
  optionalOrcSection: '2919.26',
  introHeading: 'CPO defense is hearing-driven and evidence-heavy',
  introBody: [
    'Protection-order proceedings often move quickly. Temporary and full-hearing stages have different standards and strategic priorities.',
    'A focused response plan should cover timeline, documentation, witness strategy, and overlap with any criminal proceedings.',
  ],
  keyPointsHeading: 'Critical CPO defense priorities',
  keyPoints: [
    { title: 'Stage-specific planning', description: 'Ex parte and full-hearing stages require different tactical choices.' },
    {
      title: 'Evidence organization',
      description: 'Records, communications, and witness material should be prepared for hearing use early.',
    },
    {
      title: 'Courtroom process discipline',
      description: 'Procedure and presentation quality can shape credibility and outcomes significantly.',
    },
    {
      title: 'Cross-proceeding coordination',
      description: 'Strategy should account for any related domestic-violence or criminal case exposure.',
    },
  ],
  actionHeading: 'First steps after service of a protection-order petition',
  actionSteps: [
    'Read all order terms and hearing dates immediately.',
    'Follow temporary restrictions strictly while preparing defense.',
    'Preserve communication records and timeline evidence.',
    'Identify witnesses and supporting documentation early.',
    'Coordinate hearing strategy with any related criminal matter.',
    'Prepare clear, defensible hearing narrative and exhibits.',
  ],
  relatedDescription: 'Use these resources for CPO distinctions, ex parte process, and connected defense issues.',
  relatedGuides: [
    {
      title: 'Protection order defense pillar',
      href: '/protection-order-lawyer-delaware-oh',
      description: 'Core protection-order defense overview.',
    },
    {
      title: 'No-contact order vs CPO guide',
      href: '/blog/no-contact-order-vs-civil-protection-order-ohio',
      description: 'Educational distinction guide for Ohio orders.',
    },
    {
      title: 'Ex parte order defense guide',
      href: '/blog/ex-parte-protection-orders-ohio-defense',
      description: 'Temporary order process and response planning.',
    },
    {
      title: 'Domestic violence first-offense defense',
      href: '/domestic-violence-first-offense-ohio-defense',
      description: 'Related high-intent domestic-defense page.',
    },
  ],
  faqs: civilProtectionOrderDefenseFaqs,
  serviceAreaLabel: 'Civil Protection Order Defense',
  ctaTitle: 'Need help preparing for a CPO hearing?',
  ctaBody: 'Build a hearing-focused defense strategy before avoidable risks compound.',
  midPageContext: 'civil protection order',
};

export const drugPossessionVsTraffickingFaqs: FAQEntry[] = [
  {
    question: 'Is possession always treated less seriously than trafficking?',
    answer:
      'Not always. Charge severity depends on allegations, evidence profile, and statutory factors.',
  },
  {
    question: 'Can trafficking allegations be challenged on evidence and intent?',
    answer:
      'Yes. Charging posture often depends on interpretation of facts that can be contested in defense strategy.',
  },
  {
    question: 'Why does early case analysis matter in drug-charge distinctions?',
    answer:
      'Early review helps identify suppression issues, charging vulnerabilities, and collateral-risk management options.',
  },
];

const drugPossessionVsTraffickingConfig: HighIntentConfig = {
  slug: 'drug-possession-vs-trafficking-ohio-defense',
  seoTitle: 'Drug Possession vs Trafficking Defense in Ohio | Key Differences',
  seoDescription:
    'Charged with possession or trafficking in Ohio? Understand legal differences, evidence issues, and defense strategy priorities.',
  heroEyebrow: 'Drug Defense',
  heroTitle: 'Drug Possession vs Trafficking in Ohio: Defense Strategy Differences',
  heroDescription:
    'Charge distinction, evidence quality, and procedure can significantly affect case exposure and options.',
  breadcrumbName: 'Drug Possession vs Trafficking Ohio Defense',
  orcSection: '2925.11',
  optionalOrcSection: '2925.03',
  introHeading: 'Charge framing can shape the whole case',
  introBody: [
    'Possession and trafficking allegations involve different legal theories, but the distinction often depends on how evidence is interpreted and presented.',
    'Defense strategy should evaluate charging assumptions, procedural issues, and collateral impact from day one.',
  ],
  keyPointsHeading: 'Where possession-vs-trafficking cases are won or lost',
  keyPoints: [
    { title: 'Charge-theory testing', description: 'Prosecutorial charge framing should be tested against actual evidence and context.' },
    {
      title: 'Search and seizure review',
      description: 'Suppression issues can alter admissibility and leverage in both possession and trafficking cases.',
    },
    {
      title: 'Evidence interpretation',
      description: 'Quantities, packaging, communications, and surrounding facts may be contested in court.',
    },
    {
      title: 'Collateral-risk management',
      description: 'Resolution planning should account for licensing, employment, and long-term record impact.',
    },
  ],
  actionHeading: 'Immediate priorities after a drug-charge arrest',
  actionSteps: [
    'Preserve all paperwork and inventory records.',
    'Document timeline details and witness context.',
    'Avoid public commentary and informal statements.',
    'Request complete discovery and testing records early.',
    'Evaluate suppression and procedural defenses promptly.',
    'Align case strategy with collateral-risk priorities.',
  ],
  relatedDescription: 'Use these pages for broader drug-defense and criminal-defense context.',
  relatedGuides: [
    {
      title: 'Drug crimes defense pillar',
      href: '/drug-crime-lawyer-delaware-oh',
      description: 'Primary drug-defense strategy page.',
    },
    {
      title: 'Drug possession vs trafficking (blog guide)',
      href: '/blog/drug-possession-vs-trafficking-ohio',
      description: 'Educational explainer on charge distinctions.',
    },
    {
      title: 'Criminal defense overview',
      href: '/criminal-defense-delaware-oh',
      description: 'Broader felony/misdemeanor defense strategy.',
    },
    {
      title: 'Motion practice guide',
      href: '/blog/motion-practice-criminal-defense',
      description: 'Pretrial motion strategy for evidence challenges.',
    },
  ],
  faqs: drugPossessionVsTraffickingFaqs,
  serviceAreaLabel: 'Drug Crime Defense',
  ctaTitle: 'Need a drug-charge defense strategy?',
  ctaBody: 'Get a focused review of charge structure, evidence, and next-step options.',
  midPageContext: 'drug charge defense',
};

export function FirstOffenseOviOhioPage() {
  return <HighIntentServicePage config={firstOffenseOviConfig} />;
}

export function FelonyOviLawyerOhioPage() {
  return <HighIntentServicePage config={felonyOviConfig} />;
}

export function OviTestRefusalLawyerOhioPage() {
  return <HighIntentServicePage config={oviTestRefusalConfig} />;
}

export function AlsLicenseSuspensionOhioPage() {
  return <HighIntentServicePage config={alsLicenseSuspensionConfig} />;
}

export function MotionToSuppressOviOhioPage() {
  return <HighIntentServicePage config={motionToSuppressOviConfig} />;
}

export function DomesticViolenceFirstOffenseOhioDefensePage() {
  return <HighIntentServicePage config={domesticViolenceFirstOffenseConfig} />;
}

export function CivilProtectionOrderDefenseOhioPage() {
  return <HighIntentServicePage config={civilProtectionOrderDefenseConfig} />;
}

export function DrugPossessionVsTraffickingOhioDefensePage() {
  return <HighIntentServicePage config={drugPossessionVsTraffickingConfig} />;
}
