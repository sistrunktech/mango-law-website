import PageHero from '../components/PageHero';
import CTASection from '../components/CTASection';

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About"
        title="Dominic Mango — focused on clear, assertive defense in Delaware, Ohio."
        description="A practice built on preparation, straight talk, and courtroom advocacy that respects your time and goals."
        ctaLabel="Schedule a consult"
        ctaHref="/contact"
        variant="light"
      />

      <section className="section bg-white">
        <div className="container">
          <div className="grid gap-12 lg:grid-cols-3 lg:items-start">
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <div className="relative overflow-hidden rounded-2xl shadow-soft-lg" style={{ background: 'linear-gradient(135deg, #2C3E50 0%, #34495E 100%)' }}>
                  <div className="p-4">
                    <div className="relative overflow-hidden rounded-xl" style={{ maxHeight: '450px' }}>
                      <img
                        src="/images/nick_mango_profile_shot.jpg"
                        alt="Dominic 'Nick' Mango, Criminal Defense Attorney"
                        className="w-full h-auto object-cover object-top"
                        style={{ maxHeight: '450px' }}
                      />
                    </div>
                  </div>
                </div>
                <div className="mt-6 space-y-3 bg-brand-offWhite rounded-xl p-6 shadow-soft">
                  <h3 className="text-2xl font-bold text-brand-black">Dominic "Nick" Mango</h3>
                  <p className="text-brand-black/70 font-medium">Criminal Defense Attorney</p>
                  <div className="flex flex-col gap-3 pt-3 border-t border-brand-black/10">
                    <a
                      href="tel:7406022155"
                      className="inline-flex items-center gap-2 text-brand-mango hover:text-brand-mango/80 transition-colors"
                    >
                      <span className="text-lg">📞</span>
                      <span className="font-semibold">(740) 602-2155</span>
                    </a>
                    <a
                      href="mailto:nick@mangolaw.com"
                      className="inline-flex items-center gap-2 text-brand-leaf hover:text-brand-leaf/80 transition-colors"
                    >
                      <span className="text-lg">✉️</span>
                      <span className="font-semibold">nick@mangolaw.com</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-2 space-y-8">
              <div className="space-y-4">
                <h2 className="text-3xl font-bold text-brand-black">Defense approach</h2>
                <p className="text-lg text-brand-black/80 leading-relaxed">
                  Dominic focuses on early case assessment, motion practice where facts support it, and candid communication.
                  You will always know what is happening, why it matters, and what the options are.
                </p>
                <p className="text-lg text-brand-black/80 leading-relaxed">
                  Whether negotiating with prosecutors or preparing for hearing, the goal is to protect your record and
                  minimize collateral impacts on work, licensure, or family.
                </p>
              </div>

              <div className="space-y-4">
                <h3 className="text-2xl font-semibold text-brand-black">Local knowledge</h3>
                <ul className="space-y-3 text-brand-black/80">
                  <li className="flex gap-3">
                    <span className="text-brand-mango font-bold">•</span>
                    <span>Delaware County focus with awareness of local court practices</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-brand-mango font-bold">•</span>
                    <span>Organized discovery review to spot procedural and evidentiary gaps</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-brand-mango font-bold">•</span>
                    <span>Respectful, discreet handling of sensitive matters</span>
                  </li>
                </ul>
              </div>

              <div className="space-y-4">
                <h3 className="text-2xl font-semibold text-brand-black">Experience & Background</h3>
                <p className="text-brand-black/80 leading-relaxed">
                  With over 15 years of criminal defense experience in Central Ohio, Nick has handled thousands of cases
                  ranging from traffic violations to serious felonies. His practice is built on thorough preparation,
                  strategic motion work, and clear communication with clients during what is often the most stressful time
                  of their lives.
                </p>
                <p className="text-brand-black/80 leading-relaxed">
                  Nick understands the Delaware and Franklin County court systems, the local prosecutors, and what it takes
                  to achieve favorable outcomes. He knows when to negotiate and when to fight, always keeping your best
                  interests at the forefront of every decision.
                </p>
              </div>

              <div className="space-y-4">
                <h3 className="text-2xl font-semibold text-brand-black">Philosophy</h3>
                <p className="text-brand-black/80 leading-relaxed">
                  Every case is different, and cookie-cutter approaches don't work. Nick takes the time to understand your
                  unique situation, your goals, and what matters most to you. His defense strategy is tailored to your
                  specific circumstances, whether that means aggressive courtroom litigation or strategic negotiation.
                </p>
                <p className="text-brand-black/80 leading-relaxed">
                  You deserve an attorney who respects your time, answers your questions, and fights for your future. That's
                  the Mango Law difference.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CTASection
        title="Talk through your case with Dominic Mango"
        primaryLabel="Schedule a consult"
        primaryHref="/contact"
        secondaryLabel="Call the office"
        secondaryHref="tel:5550000000"
      />
    </>
  );
}
