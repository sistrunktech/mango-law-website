import PageHero from '../components/PageHero';
import CTASection from '../components/CTASection';
import FAQSection from '../components/FAQSection';
import ImagePlaceholder from '../components/ImagePlaceholder';

const faqs = [
  {
    question: 'What is personal injury law?',
    answer: 'Personal injury law covers cases where someone is injured due to another person\'s negligence or intentional conduct. Common cases include car accidents, slip and falls, medical malpractice, dog bites, and wrongful death. The goal is to recover compensation for medical bills, lost wages, pain and suffering, and other damages.',
  },
  {
    question: 'How do I know if I have a personal injury case?',
    answer: 'You may have a case if: (1) someone else was negligent or at fault, (2) their conduct caused your injuries, and (3) you suffered damages (medical bills, lost wages, pain). We evaluate liability, damages, insurance coverage, and the strength of the evidence to determine if your case is viable.',
  },
  {
    question: 'How long do I have to file a personal injury claim?',
    answer: 'In Ohio, the statute of limitations for personal injury cases is generally 2 years from the date of the injury. Missing this deadline means you lose the right to file a lawsuit. Some exceptions apply, so it is critical to consult an attorney as soon as possible.',
  },
  {
    question: 'What damages can I recover in a personal injury case?',
    answer: 'You may recover economic damages (medical bills, lost wages, future medical costs) and non-economic damages (pain and suffering, emotional distress, loss of enjoyment of life). In some cases, punitive damages may be available if the defendant\'s conduct was particularly reckless or malicious.',
  },
  {
    question: 'How much is my personal injury case worth?',
    answer: 'Case value depends on the severity of injuries, medical costs, lost income, pain and suffering, liability, and insurance coverage. Each case is unique. We evaluate all factors and provide a realistic assessment based on similar cases and the strength of the evidence.',
  },
  {
    question: 'Do I have to go to court for a personal injury case?',
    answer: 'Not always. Many personal injury cases settle through negotiation with the insurance company before filing a lawsuit. If a fair settlement cannot be reached, we file a lawsuit and are prepared to take the case to trial. We pursue the best outcome, whether through settlement or verdict.',
  },
  {
    question: 'What if I was partially at fault for the accident?',
    answer: 'Ohio follows a modified comparative negligence rule. You can still recover damages if you were less than 51% at fault, but your recovery is reduced by your percentage of fault. For example, if you were 20% at fault and your damages are $100,000, you would recover $80,000.',
  },
  {
    question: 'How are personal injury attorneys paid?',
    answer: 'Most personal injury attorneys, including Mango Law for select cases, work on a contingency fee basis. This means we only get paid if you recover compensation. The fee is a percentage of the settlement or verdict. If we do not win, you owe nothing.',
  },
  {
    question: 'What should I do after an accident?',
    answer: 'Seek medical attention immediately, even if injuries seem minor. Call the police and get a report. Document the scene with photos. Collect contact information from witnesses. Do not admit fault or give recorded statements to insurance adjusters. Contact an attorney before speaking to the insurance company.',
  },
  {
    question: 'Why does Mango Law handle personal injury on a limited-scope basis?',
    answer: 'Mango Law primarily focuses on criminal defense. We take personal injury cases selectively where we can add value, such as cases with clear liability, adequate insurance coverage, and straightforward facts. This ensures we provide quality representation without overextending resources.',
  },
];

export default function PersonalInjuryPage() {
  return (
    <>
      <PageHero
        eyebrow="Personal Injury"
        title="Selective personal injury matters"
        description="Limited-scope representation for cases where we can add value—clear liability, coverage, and a practical strategy."
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
                <h2 className="text-display-sm font-bold text-brand-black mb-4">Strategic Personal Injury Representation</h2>
                <p className="text-lg text-brand-black/70 leading-relaxed">
                  While criminal defense is our primary focus, we handle select personal injury matters where we can provide
                  meaningful value. We take cases with clear liability, adequate insurance coverage, and strong evidence of damages.
                </p>
              </div>
              <p className="text-brand-black/70 leading-relaxed">
                Our approach is practical and straightforward. We evaluate your case honestly, negotiate aggressively with
                insurance companies, and pursue fair compensation for your injuries. If we cannot take your case, we will
                refer you to a qualified personal injury attorney.
              </p>
            </div>
            <ImagePlaceholder
              aspectRatio="4:3"
              label="Personal injury representation"
              promptHint="Personal injury case consultation, attorney reviewing medical records and accident reports, professional legal office, compassionate and strategic approach"
            />
          </div>
        </div>
      </section>

      <section className="section bg-brand-offWhite">
        <div className="container">
          <div className="mb-12 text-center">
            <h2 className="text-display-sm md:text-display-md mb-4">Types of Cases We Consider</h2>
            <p className="text-lg text-brand-black/60 max-w-3xl mx-auto">
              We handle select personal injury matters with clear liability and adequate insurance coverage.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: 'Car Accidents',
                description: 'Representation for injuries caused by negligent drivers, including rear-end collisions and intersection accidents.',
              },
              {
                title: 'Slip and Fall',
                description: 'Cases involving property owner negligence such as icy walkways, unsafe conditions, or inadequate maintenance.',
              },
              {
                title: 'Dog Bites',
                description: 'Holding owners accountable for injuries caused by dangerous or aggressive animals.',
              },
              {
                title: 'Premises Liability',
                description: 'Injuries caused by unsafe property conditions at businesses, apartments, or other locations.',
              },
              {
                title: 'Wrongful Death',
                description: 'Representation for families who have lost loved ones due to negligence or misconduct.',
              },
              {
                title: 'Assault & Battery',
                description: 'Civil claims for injuries caused by intentional acts of violence or assault.',
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
            <h2 className="text-display-sm md:text-display-md mb-4">Our Approach</h2>
            <p className="text-lg text-brand-black/60 max-w-3xl mx-auto">
              Honest evaluation, aggressive negotiation, and practical strategy.
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-2">
            {[
              {
                title: 'Case Evaluation',
                description: 'We assess liability, damages, insurance coverage, and evidence to determine if your case is a good fit.',
              },
              {
                title: 'Investigation',
                description: 'We gather medical records, accident reports, witness statements, and other evidence to build your case.',
              },
              {
                title: 'Demand & Negotiation',
                description: 'We prepare a detailed demand and negotiate aggressively with insurance companies for fair compensation.',
              },
              {
                title: 'Litigation',
                description: 'If a fair settlement is not offered, we file a lawsuit and are prepared to take the case to trial.',
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

      <FAQSection faqs={faqs} title="Personal Injury FAQs" />

      <CTASection
        title="Discuss whether your matter is a fit."
        body="We provide honest assessments and practical strategies for personal injury cases."
        primaryLabel="Schedule a consult"
        primaryHref="/contact"
        secondaryLabel="(740) 602-2155"
        secondaryHref="tel:7406022155"
      />
    </>
  );
}
