import PageHero from '../components/PageHero';
import CTASection from '../components/CTASection';
import FAQSection from '../components/FAQSection';
import ImagePlaceholder from '../components/ImagePlaceholder';

const faqs = [
  {
    question: 'What are the consequences of a sex crime conviction?',
    answer: 'A sex crime conviction carries severe consequences including prison time, mandatory sex offender registration, restricted housing and employment opportunities, and social stigma. Registration requirements can last 10 years, 20 years, or life depending on the offense. The impact on your reputation and future is devastating, which is why aggressive defense is critical.',
  },
  {
    question: 'Can I be charged with a sex crime based solely on an accusation?',
    answer: 'Yes. Many sex crime cases are based primarily on the accuser\'s testimony with little or no physical evidence. Prosecutors can and do file charges based on accusations alone. This is why a thorough investigation and credibility challenges are essential to your defense.',
  },
  {
    question: 'What is sex offender registration, and how long does it last?',
    answer: 'Sex offender registration is a public registry that requires you to report your address, employment, and other information to law enforcement. Tier I offenders register for 15 years, Tier II for 25 years, and Tier III for life. Registration affects where you can live, work, and go, and is publicly accessible online.',
  },
  {
    question: 'Can sex crime charges be dismissed or reduced?',
    answer: 'In some cases, yes. We challenge the credibility of the accuser, investigate motives for false accusations, scrutinize the timeline and consistency of allegations, and identify procedural errors. Successful suppression motions, witness impeachment, or lack of corroborating evidence can lead to dismissal or significant charge reductions.',
  },
  {
    question: 'What should I do if I am accused of a sex crime?',
    answer: 'Do not speak to law enforcement without an attorney present. Do not try to contact the accuser. Do not make statements on social media. Invoke your right to remain silent and contact a criminal defense attorney immediately. Anything you say can and will be used against you.',
  },
  {
    question: 'What is statutory rape?',
    answer: 'Statutory rape (unlawful sexual conduct with a minor) occurs when an adult engages in sexual conduct with someone under the age of consent, even if the minor consented. In Ohio, the age of consent is 16, but there are exceptions and complexities based on age differences and positions of authority. Penalties are severe and include mandatory prison time and sex offender registration.',
  },
  {
    question: 'Can I be convicted of a sex crime if there is no physical evidence?',
    answer: 'Yes. Many sex crime convictions are based on testimony alone without physical evidence like DNA or medical exams. The prosecution relies on the accuser\'s credibility and testimony. We challenge this by exposing inconsistencies, investigating motives, and presenting evidence that undermines the credibility of the allegations.',
  },
  {
    question: 'What are the defenses to sex crime charges?',
    answer: 'Common defenses include consent (if the alleged victim was of legal age and consented), false accusations (motivated by revenge, custody disputes, or other reasons), mistaken identity, insufficient evidence, and constitutional violations in the investigation. Every case is different, and we tailor the defense to the specific facts.',
  },
  {
    question: 'Will I have to go to trial?',
    answer: 'Not necessarily. Some cases resolve through negotiation, charge reductions, or dismissal based on weaknesses in the prosecution\'s case. However, sex crime cases often go to trial because the stakes are so high and plea deals may still involve prison and registration. We prepare every case as if it will go to trial.',
  },
  {
    question: 'What happens if I am convicted of a sex crime involving a minor?',
    answer: 'Convictions for sex crimes involving minors carry mandatory prison sentences, lifetime sex offender registration in most cases, and severe restrictions on where you can live, work, and go. You cannot live near schools, parks, or daycare centers. The consequences are life-altering, which is why aggressive defense is essential.',
  },
];

export default function SexCrimePage() {
  return (
    <>
      <PageHero
        eyebrow="Sex Crimes"
        title="Discreet, assertive defense for sensitive allegations"
        description="Protecting privacy while challenging evidence, procedure, and credibility. Clear communication, no scare tactics."
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
                <h2 className="font-display text-display-sm font-bold text-brand-black mb-4">Aggressive, Discreet Defense</h2>
                <p className="text-lg text-brand-black/70 leading-relaxed">
                  Sex crime allegations are some of the most serious charges you can face. A conviction can mean prison, mandatory
                  sex offender registration, and a permanent mark on your reputation. Even an accusation can destroy your career,
                  relationships, and future before you ever step into a courtroom.
                </p>
              </div>
              <p className="text-brand-black/70 leading-relaxed">
                At Mango Law, we understand the gravity of these charges. We provide aggressive, discreet defense while protecting
                your privacy. We challenge the accuser's credibility, investigate motives for false accusations, scrutinize the
                evidence, and fight for your rights at every stage.
              </p>
            </div>
            <ImagePlaceholder
              aspectRatio="4:3"
              label="Confidential legal representation"
              promptHint="Confidential attorney-client consultation, private office setting, discrete and professional atmosphere, emphasis on privacy and trust"
            />
          </div>
        </div>
      </section>

      <section className="section bg-brand-offWhite">
        <div className="container">
          <div className="mb-12 text-center">
            <h2 className="font-display text-display-sm md:text-display-md mb-4">Sex Crime Charges We Defend</h2>
            <p className="text-lg text-brand-black/60 max-w-3xl mx-auto">
              We handle all types of sex crime allegations with discretion and aggressive advocacy.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: 'Sexual Assault / Rape',
                description: 'Defense for allegations of non-consensual sexual conduct with focus on credibility and consent issues.',
              },
              {
                title: 'Statutory Rape',
                description: 'Representation for unlawful sexual conduct with a minor charges with attention to age defenses and mitigating factors.',
              },
              {
                title: 'Child Pornography',
                description: 'Defense for allegations involving possession, distribution, or production of illegal images.',
              },
              {
                title: 'Sexual Imposition',
                description: 'Representation for unwanted touching and sexual contact allegations.',
              },
              {
                title: 'Internet Sex Crimes',
                description: 'Defense for online solicitation, grooming, and related internet-based allegations.',
              },
              {
                title: 'Sex Offender Registration',
                description: 'Challenges to registration requirements and violations of registration laws.',
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
            <h2 className="font-display text-display-sm md:text-display-md mb-4">How We Defend Sex Crime Cases</h2>
            <p className="text-lg text-brand-black/60 max-w-3xl mx-auto">
              We leave no stone unturned in building your defense.
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-2">
            {[
              {
                title: 'Challenge Credibility',
                description: 'We investigate the accuser\'s background, motives, and inconsistencies in their statements to expose false or exaggerated allegations.',
              },
              {
                title: 'Investigate False Accusations',
                description: 'Many sex crime accusations are motivated by custody disputes, revenge, or other ulterior motives. We uncover the truth.',
              },
              {
                title: 'Scrutinize Evidence',
                description: 'We review forensic evidence, medical exams, electronic communications, and witness statements to identify weaknesses.',
              },
              {
                title: 'Expert Witnesses',
                description: 'We coordinate with forensic experts, psychologists, and medical professionals to challenge the prosecution\'s case.',
              },
              {
                title: 'Constitutional Challenges',
                description: 'We file motions to suppress illegally obtained evidence, statements, and search results.',
              },
              {
                title: 'Trial Advocacy',
                description: 'We are trial-ready and prepared to fight for acquittal in front of a jury.',
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

      <FAQSection faqs={faqs} title="Sex Crime FAQs" />

      <CTASection
        title="Facing a sensitive allegation? Let's talk."
        body="Your privacy and your future are our top priorities. Contact us for a confidential consultation."
        primaryLabel="Schedule a consult"
        primaryHref="/contact"
        secondaryLabel="(740) 602-2155"
        secondaryHref="tel:7406022155"
      />
    </>
  );
}
