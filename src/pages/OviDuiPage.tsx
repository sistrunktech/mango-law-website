import { oviSubsections } from '../data/practiceAreas';
import PageHero from '../components/PageHero';
import CTASection from '../components/CTASection';
import FAQSection from '../components/FAQSection';
import ImagePlaceholder from '../components/ImagePlaceholder';

const faqs = [
  {
    question: 'What is the difference between OVI and DUI?',
    answer: 'In Ohio, the charge is officially called OVI (Operating a Vehicle Impaired), not DUI (Driving Under the Influence). The terms are used interchangeably, but OVI is the correct legal term. It covers both alcohol and drug impairment, including prescription medications.',
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
      <PageHero
        eyebrow="OVI / DUI Defense"
        title="OVI and DUI defense with targeted motion practice and local insight"
        description="High-test, felony OVI, refusals, underage DUI, and drug OVI. Clear timelines and informed negotiation, backed by detailed discovery review."
        ctaLabel="Schedule a consult"
        ctaHref="/contact"
        showQuickActions={false}
        alignLeft={true}
        compact={true}
      />

      <section className="section bg-white">
        <div className="container">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div className="space-y-6">
              <div>
                <h2 className="font-display text-display-sm font-bold text-brand-black mb-4">Aggressive OVI Defense</h2>
                <p className="text-lg text-brand-black/70 leading-relaxed">
                  An OVI arrest can feel like the end of the world. Your license, your job, your freedom, and your reputation
                  are all on the line. But an arrest is not a conviction. With the right defense strategy, many OVI charges
                  can be challenged, reduced, or even dismissed.
                </p>
              </div>
              <p className="text-brand-black/70 leading-relaxed">
                At Mango Law, we focus on the details that matter: challenging the traffic stop, questioning field sobriety
                test administration, scrutinizing breathalyzer calibration and procedures, and identifying procedural errors.
                We know what it takes to win OVI cases in Delaware County.
              </p>
            </div>
            <ImagePlaceholder
              aspectRatio="4:3"
              label="OVI Defense"
              promptHint="Professional OVI/DUI defense consultation, legal documents, breathalyzer equipment, courthouse setting, mango and teal color accents"
            />
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
              <ImagePlaceholder
                aspectRatio="4:3"
                label="OVI Case Strategy"
                promptHint="Attorney reviewing OVI case evidence and developing defense strategy, legal documents and testing procedures, professional setting"
              />
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
            </div>
          </div>
        </div>
      </section>

      <FAQSection faqs={faqs} title="OVI / DUI FAQs" />

      <CTASection
        title="Facing an OVI charge? Let's move quickly."
        primaryLabel="Schedule a consult"
        primaryHref="/contact"
        secondaryLabel="(740) 602-2155"
        secondaryHref="tel:7406022155"
      />
    </>
  );
}
