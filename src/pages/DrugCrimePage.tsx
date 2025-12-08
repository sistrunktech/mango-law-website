import PageHero from '../components/PageHero';
import CTASection from '../components/CTASection';
import FAQSection from '../components/FAQSection';
import ImagePlaceholder from '../components/ImagePlaceholder';
import LegalCodeCallout from '../components/LegalCodeCallout';
import StatuteSidebar from '../components/StatuteSidebar';
import ServiceAreasSection from '../components/ServiceAreasSection';

const faqs = [
  {
    question: 'What is the difference between drug possession and trafficking?',
    answer: 'Possession charges apply when you have drugs for personal use, while trafficking charges involve the intent to sell or distribute drugs. The distinction often depends on the quantity, packaging, and presence of scales, cash, or other evidence of distribution. Trafficking carries much harsher penalties, including mandatory prison time.',
  },
  {
    question: 'Can I get drug charges dismissed if the search was illegal?',
    answer: 'Yes. If law enforcement violated your Fourth Amendment rights by conducting an illegal search or seizure, we can file a motion to suppress the evidence. If the motion is granted, the drugs and related evidence cannot be used against you, often resulting in case dismissal.',
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
    answer: 'Drug paraphernalia charges apply to items used to consume, produce, or distribute drugs, such as pipes, syringes, scales, and baggies. These are typically misdemeanor charges, but they can carry jail time, fines, and a criminal record. We defend these cases by challenging the legality of the search and the classification of the items.',
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
      <PageHero
        eyebrow="Drug Crimes"
        title="Drug crime defense with attention to testing, searches, and diversion paths"
        description="Possession, trafficking, paraphernalia, and related allegations—handled with motion practice and practical strategies."
        ctaLabel="Schedule a consult"
        ctaHref="/contact"
        showQuickActions={false}
        alignLeft={true}
        compact={true}
        orcSection="2925.11"
      />

      <section className="section bg-white">
        <div className="container">
          <div className="grid gap-12 lg:grid-cols-3">
            <div className="lg:col-span-2 space-y-12">
              <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div className="space-y-6">
              <div>
                <h2 className="font-display text-display-sm font-bold text-brand-black mb-4">Strategic Drug Crime Defense</h2>
                <p className="text-lg text-brand-black/70 leading-relaxed">
                  Drug charges can derail your life. A conviction can mean prison time, loss of professional licenses, financial
                  ruin, and a permanent criminal record that follows you for years. Whether you are facing possession, trafficking,
                  or paraphernalia charges, you need an attorney who knows how to challenge the evidence and protect your rights.
                </p>
              </div>
              <p className="text-brand-black/70 leading-relaxed">
                At Mango Law, we scrutinize every aspect of your case: the legality of the stop, the validity of the search,
                the chain of custody, and lab testing procedures. We explore diversion programs and treatment alternatives when
                appropriate, always working toward the best possible outcome.
              </p>
            </div>
            <img
              src="/images/generated/drug-crimes-defense-hero.png"
              alt="Drug crime legal defense strategy with evidence review and lab testing documentation"
              className="aspect-[4/3] w-full rounded-2xl object-cover shadow-lg"
              loading="lazy"
              width="1200"
              height="900"
            />
              </div>

              <LegalCodeCallout section="2925.11" />
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
              From minor possession to serious trafficking allegations, we defend all types of drug-related charges.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: 'Drug Possession',
                description: 'Defense for possession of marijuana, cocaine, heroin, fentanyl, methamphetamine, and prescription drugs.',
              },
              {
                title: 'Drug Trafficking',
                description: 'Aggressive defense for trafficking and distribution charges with focus on evidence and intent.',
              },
              {
                title: 'Drug Paraphernalia',
                description: 'Representation for charges involving pipes, syringes, scales, and other drug-related items.',
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

      <FAQSection faqs={faqs} title="Drug Crime FAQs" />

      <ServiceAreasSection practiceArea="Drug Crime Defense" />

      <CTASection
        title="Let's review your drug case quickly."
        primaryLabel="Schedule a consult"
        primaryHref="/contact"
        secondaryLabel="(740) 602-2155"
        secondaryHref="tel:7406022155"
      />
    </>
  );
}
