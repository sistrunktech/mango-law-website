import PageHero from '../components/PageHero';
import CTASection from '../components/CTASection';
import FAQSection from '../components/FAQSection';

const faqs = [
  {
    question: 'What is a civil protection order?',
    answer: 'A civil protection order (CPO) is a court order that prohibits someone from contacting or coming near the petitioner. It is a civil matter, not criminal, but violating a protection order is a criminal offense. Protection orders can be issued in cases of domestic violence, stalking, or credible threats of harm.',
  },
  {
    question: 'What happens if a protection order is filed against me?',
    answer: 'You will receive notice of a hearing, typically within 7-10 days. At the hearing, both sides present evidence, and the judge decides whether to issue a permanent protection order. If issued, the order can last up to 5 years and may prohibit contact, require you to move out of a shared residence, and restrict firearm possession.',
  },
  {
    question: 'Can I contest a protection order?',
    answer: 'Yes. You have the right to contest the order at the hearing. We present evidence, cross-examine the petitioner, and challenge the allegations. If the petitioner fails to meet the legal standard (proving by a preponderance of the evidence that you committed the alleged acts), the order can be denied.',
  },
  {
    question: 'What are the consequences of a protection order?',
    answer: 'A protection order can affect your housing, employment, firearms rights, and custody arrangements. It is a public record and may appear in background checks. Violating the order is a criminal offense punishable by jail time. Even a temporary order can have immediate, serious consequences.',
  },
  {
    question: 'Can a protection order be dismissed or modified?',
    answer: 'Yes. If the petitioner\'s allegations are false, exaggerated, or not supported by evidence, the order can be dismissed at the hearing. Once issued, a protection order can be modified or terminated upon motion if circumstances change, though modification is difficult without the petitioner\'s consent.',
  },
  {
    question: 'What is the difference between a temporary and a permanent protection order?',
    answer: 'A temporary protection order (ex parte order) is issued immediately based on the petitioner\'s allegations without your input. It lasts until the full hearing. A permanent protection order is issued after the hearing where both sides present evidence. It can last up to 5 years and is more difficult to overturn.',
  },
  {
    question: 'Will a protection order affect my gun rights?',
    answer: 'Yes. Federal and state law prohibit possession of firearms while subject to a domestic violence protection order. You must surrender any firearms in your possession, and you cannot purchase or possess firearms while the order is in effect. Violating this prohibition is a federal crime.',
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
    answer: 'Yes. If you believe the petitioner has committed acts of domestic violence, stalking, or threats against you, you can file a counter-petition. Both petitions will be heard at the same hearing. We assess whether a counter-petition is strategic and supported by evidence.',
  },
];

export default function ProtectionOrderPage() {
  return (
    <>
      <PageHero
        eyebrow="Protection Orders"
        title="Defense in civil protection order matters."
        description="Procedural precision, evidence review, and strategy to limit collateral impacts and protect your rights."
        ctaLabel="Schedule a consult"
        ctaHref="/contact"
        variant="light"
      />

      <section className="section bg-white">
        <div className="container">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div className="space-y-6">
              <div>
                <h2 className="text-display-sm font-bold text-brand-black mb-4">Strategic Protection Order Defense</h2>
                <p className="text-lg text-brand-black/70 leading-relaxed">
                  A protection order can upend your life overnight. It can force you out of your home, restrict contact with your
                  children, cost you your job, and result in the loss of your firearm rights. Even a temporary order based on
                  unproven allegations can have immediate and devastating consequences.
                </p>
              </div>
              <p className="text-brand-black/70 leading-relaxed">
                At Mango Law, we provide aggressive defense in protection order hearings. We challenge false or exaggerated
                allegations, present evidence, cross-examine witnesses, and fight to protect your rights, reputation, and future.
              </p>
            </div>
            <div className="overflow-hidden rounded-2xl shadow-soft-lg">
              <img
                src="https://images.pexels.com/photos/5668882/pexels-photo-5668882.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Protection order defense and legal representation"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="section bg-brand-offWhite">
        <div className="container">
          <div className="mb-12 text-center">
            <h2 className="text-display-sm md:text-display-md mb-4">How We Defend Protection Order Cases</h2>
            <p className="text-lg text-brand-black/60 max-w-3xl mx-auto">
              We prepare thoroughly and fight aggressively to protect your rights.
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-2">
            {[
              {
                title: 'Challenge Allegations',
                description: 'We scrutinize the petitioner\'s allegations for inconsistencies, false claims, and exaggerations.',
              },
              {
                title: 'Gather Evidence',
                description: 'We collect witness statements, text messages, emails, photos, and other evidence that supports your side.',
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
                description: 'If you face related criminal charges, we coordinate strategies to protect you in both proceedings.',
              },
              {
                title: 'Post-Hearing Options',
                description: 'If an order is issued, we explore appeals, modifications, and strategies to minimize the impact.',
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

      <FAQSection faqs={faqs} title="Protection Order FAQs" />

      <CTASection
        title="Need help with a protection order?"
        body="Time is critical. Contact us immediately to prepare your defense."
        primaryLabel="Schedule a consult"
        primaryHref="/contact"
        secondaryLabel="(740) 602-2155"
        secondaryHref="tel:7406022155"
      />
    </>
  );
}
