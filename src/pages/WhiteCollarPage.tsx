import PageHero from '../components/PageHero';
import CTASection from '../components/CTASection';
import FAQSection from '../components/FAQSection';
import ImagePlaceholder from '../components/ImagePlaceholder';
import StatuteSidebar from '../components/StatuteSidebar';
import LegalCodeCallout from '../components/LegalCodeCallout';
import ServiceAreasSection from '../components/ServiceAreasSection';
import { OFFICE_PHONE_DISPLAY, OFFICE_PHONE_TEL } from '../lib/contactInfo';

const faqs = [
  {
    question: 'What are white collar crimes?',
    answer: 'White collar crimes are non-violent, financially motivated offenses typically committed in business or professional settings. Common examples include fraud, embezzlement, identity theft, forgery, money laundering, tax evasion, securities fraud, and computer crimes. These cases often involve complex financial records and require skilled legal representation.',
  },
  {
    question: 'What should I do if I am being investigated for a white collar crime?',
    answer: 'Do not speak to investigators without an attorney present. Do not provide documents or information without legal advice. Do not destroy or alter any records. Contact a criminal defense attorney immediately. Early legal intervention can sometimes prevent charges from being filed or limit the scope of the investigation.',
  },
  {
    question: 'What are the penalties for white collar crimes?',
    answer: 'Penalties vary widely depending on the offense and the amount involved. Sentences can range from probation and fines to substantial prison time. Federal white collar crimes often carry harsher penalties than state charges. Additional consequences include restitution orders, asset forfeiture, professional license revocation, and damage to your reputation.',
  },
  {
    question: 'Can white collar charges be dismissed?',
    answer: 'In some cases, yes. We challenge the sufficiency of the evidence, question the legality of searches and seizures, identify procedural errors, and negotiate with prosecutors. If the government\'s case is weak or evidence was obtained illegally, charges may be dismissed or significantly reduced.',
  },
  {
    question: 'What is the difference between state and federal white collar charges?',
    answer: 'State charges are prosecuted by local or state prosecutors in state court, while federal charges are prosecuted by U.S. Attorneys in federal court. Federal cases often involve larger amounts, interstate activity, or violations of federal law. Federal sentencing is typically more severe, with mandatory minimums and strict sentencing guidelines.',
  },
  {
    question: 'What is embezzlement?',
    answer: 'Embezzlement is the unlawful taking of money or property by someone who was entrusted with it, such as an employee stealing from an employer. It is a form of theft involving a breach of trust. Penalties depend on the amount stolen and can include prison time, fines, and restitution.',
  },
  {
    question: 'Can I negotiate a plea deal in a white collar case?',
    answer: 'Yes. Many white collar cases resolve through plea negotiations. We work to reduce charges, minimize sentencing exposure, and negotiate favorable terms such as probation instead of prison. The strength of the government\'s case, your cooperation, and mitigating factors all influence the negotiation process.',
  },
  {
    question: 'What is securities fraud?',
    answer: 'Securities fraud involves deceptive practices in the stock or investment markets, such as insider trading, Ponzi schemes, or providing false information to investors. These cases are often prosecuted federally by the SEC (Securities and Exchange Commission) and can result in significant fines and prison time.',
  },
  {
    question: 'Will I lose my professional license if convicted of a white collar crime?',
    answer: 'Possibly. Many professions (attorneys, doctors, accountants, financial advisors, real estate agents) can revoke or suspend licenses based on criminal convictions, especially for crimes involving dishonesty or moral turpitude. We assess collateral consequences early and build a defense strategy to protect your career.',
  },
  {
    question: 'What is money laundering?',
    answer: 'Money laundering involves disguising the origins of illegally obtained money to make it appear legitimate. This can include structuring transactions, using shell companies, or moving money through multiple accounts. Money laundering is a serious federal offense with substantial prison time and asset forfeiture.',
  },
];

export default function WhiteCollarPage() {
  return (
    <>
      <PageHero
        eyebrow="White Collar Crimes"
        title="Strategic defense for white collar investigations and charges"
        description="Fraud, embezzlement, securities issues, and related matters with careful document review and motion practice."
        ctaLabel="Schedule a consult"
        ctaHref="/contact"
        showQuickActions={false}
        alignLeft={true}
        compact={true}
        phoneCtaId="white_collar_hero_call_office"
      />

      <section className="section bg-white">
        <div className="container">
          <div className="grid gap-12 lg:grid-cols-3">
            <div className="lg:col-span-2 space-y-8">
              <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
                <div className="space-y-6">
                  <div>
                    <h2 className="font-display text-display-sm font-bold text-brand-black mb-4">Complex White Collar Defense</h2>
                    <p className="text-lg text-brand-black/70 leading-relaxed">
                      White collar criminal investigations are complex, high-stakes matters that can devastate your career, finances,
                      and reputation. Whether you are facing allegations of fraud, embezzlement, tax evasion, or securities violations,
                      you need an attorney who understands financial crimes and federal prosecution.
                    </p>
                  </div>
                  <p className="text-brand-black/70 leading-relaxed">
                    At Mango Law, we provide strategic defense for white collar investigations and charges. We review financial records,
                    challenge the government's evidence, and negotiate with prosecutors to protect your freedom and your future.
                  </p>
                </div>
                <img
                  src="/images/generated/white-collar-defense-hero.png"
                  alt="White collar crime defense with financial documents and business records review"
                  className="aspect-[4/3] w-full rounded-2xl object-cover shadow-lg"
                  loading="lazy"
                  width="1200"
                  height="900"
                />
              </div>

              <LegalCodeCallout section="2913.02" />
              <LegalCodeCallout section="2913.42" />
            </div>

            <aside className="lg:col-span-1">
              <StatuteSidebar
                statutes={['2913.02', '2913.42', '2913.43', '2913.49', '2921.13']}
              />
            </aside>
          </div>
        </div>
      </section>

      <section className="section bg-brand-offWhite">
        <div className="container">
          <div className="mb-12 text-center">
            <h2 className="font-display text-display-sm md:text-display-md mb-4">White Collar Crimes We Defend</h2>
            <p className="text-lg text-brand-black/60 max-w-3xl mx-auto">
              From fraud to embezzlement, we handle complex financial crime cases with precision.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: 'Fraud',
                description: 'Defense for wire fraud, mail fraud, bank fraud, credit card fraud, and other deceptive practices.',
              },
              {
                title: 'Embezzlement',
                description: 'Representation for employees, executives, and fiduciaries accused of misappropriating funds.',
              },
              {
                title: 'Securities Fraud',
                description: 'Defense for insider trading, Ponzi schemes, and violations of securities laws.',
              },
              {
                title: 'Tax Evasion',
                description: 'Representation for allegations of failing to file, underreporting income, or fraudulent deductions.',
              },
              {
                title: 'Identity Theft',
                description: 'Defense for unauthorized use of personal information for financial gain.',
              },
              {
                title: 'Money Laundering',
                description: 'Representation for allegations of concealing the origins of illegally obtained money.',
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
              We provide sophisticated defense for complex financial crime cases.
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-2">
            {[
              {
                title: 'Early Intervention',
                description: 'Engaging with investigators early can sometimes prevent charges from being filed or limit the scope of the investigation.',
              },
              {
                title: 'Document Review',
                description: 'We meticulously review financial records, communications, and evidence to identify weaknesses in the government\'s case.',
              },
              {
                title: 'Expert Coordination',
                description: 'We work with forensic accountants, financial experts, and other specialists to challenge complex evidence.',
              },
              {
                title: 'Constitutional Challenges',
                description: 'We file motions to suppress evidence obtained through illegal searches, seizures, or coerced statements.',
              },
              {
                title: 'Negotiation',
                description: 'We negotiate with federal and state prosecutors to reduce charges, minimize sentencing exposure, and protect your career.',
              },
              {
                title: 'Trial Preparation',
                description: 'If a favorable resolution is not possible, we prepare for trial and fight for acquittal.',
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

      <FAQSection faqs={faqs} title="White Collar Crime FAQs" />

      <ServiceAreasSection practiceArea="White Collar Crime Defense" />

      <CTASection
        title="Need guidance on an investigation?"
        body="White collar investigations move quickly. Contact us for strategic legal guidance and defense."
        primaryLabel="Schedule a consult"
        primaryHref="/contact"
        secondaryLabel={OFFICE_PHONE_DISPLAY}
        secondaryHref={`tel:${OFFICE_PHONE_TEL}`}
        secondaryCtaId="white_collar_cta_call_office"
      />
    </>
  );
}
