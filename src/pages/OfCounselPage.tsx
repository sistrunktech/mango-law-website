import PageHero from '../components/PageHero';
import CTASection from '../components/CTASection';

export default function OfCounselPage() {
  return (
    <>
      <PageHero
        eyebrow="Of Counsel"
        title="Geoffrey Spall — Of Counsel to Mango Law"
        description="Experienced attorney providing additional support and counsel across our practice areas."
        ctaLabel="Schedule a consultation"
        ctaHref="/contact"
        variant="light"
        compact={true}
      />

      <section className="section bg-white">
        <div className="container">
          <div className="grid gap-12 lg:grid-cols-3 lg:items-start">
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <div className="relative overflow-hidden rounded-2xl shadow-soft-lg" style={{ background: 'linear-gradient(135deg, #2C3E50 0%, #34495E 100%)' }}>
                  <div className="p-4">
                    <img
                      src="/images/geoff_spall_.webp"
                      alt="Geoffrey Spall, Attorney"
                      className="w-full h-auto rounded-xl object-cover max-h-[500px]"
                    />
                  </div>
                </div>
                <div className="mt-6 space-y-3 bg-brand-offWhite rounded-xl p-6 shadow-soft">
                  <h3 className="text-2xl font-bold text-brand-black">Geoffrey Spall</h3>
                  <p className="text-brand-black/70 font-medium">Of Counsel</p>
                  <div className="flex flex-col gap-3 pt-3 border-t border-brand-black/10">
                    <a
                      href="tel:7406022155"
                      className="inline-flex items-center gap-2 text-brand-mango hover:text-brand-mango/80 transition-colors"
                    >
                      <span className="text-lg">📞</span>
                      <span className="font-semibold">(740) 602-2155</span>
                    </a>
                    <a
                      href="mailto:office@mango.law"
                      className="inline-flex items-center gap-2 text-brand-leaf hover:text-brand-leaf/80 transition-colors"
                    >
                      <span className="text-lg">✉️</span>
                      <span className="font-semibold">office@mango.law</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-2 space-y-8">
              <div className="space-y-4">
                <h2 className="text-3xl font-bold text-brand-black">About Geoffrey</h2>
                <p className="text-lg text-brand-black/80 leading-relaxed">
                  Geoffrey Spall serves as Of Counsel to Mango Law LLC, providing additional legal expertise and support
                  across our criminal defense practice areas. With a strong foundation in Ohio criminal law and courtroom
                  experience, Geoff brings valuable perspective to our client matters.
                </p>
                <p className="text-lg text-brand-black/80 leading-relaxed">
                  Before being admitted to the Ohio Bar, Geoffrey clerked with Attorney Dominic Mango, gaining hands-on
                  experience in criminal defense strategy, motion practice, and client representation. This close working
                  relationship continues today as part of our collaborative approach to criminal defense.
                </p>
              </div>

              <div className="space-y-4">
                <h3 className="text-2xl font-semibold text-brand-black">Professional Background</h3>
                <ul className="space-y-3 text-brand-black/80">
                  <li className="flex gap-3">
                    <span className="text-brand-mango font-bold">•</span>
                    <span>Admitted to practice law in Ohio</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-brand-mango font-bold">•</span>
                    <span>Former law clerk to Attorney Dominic Mango</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-brand-mango font-bold">•</span>
                    <span>Experience in criminal defense matters throughout Delaware and Franklin Counties</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-brand-mango font-bold">•</span>
                    <span>Collaborative counsel on complex criminal defense cases</span>
                  </li>
                </ul>
              </div>

              <div className="space-y-4">
                <h3 className="text-2xl font-semibold text-brand-black">Of Counsel Role</h3>
                <p className="text-brand-black/80 leading-relaxed">
                  As Of Counsel, Geoffrey works closely with Mango Law on select matters, providing additional counsel,
                  research, and courtroom representation when needed. This arrangement allows our firm to offer enhanced
                  service to clients while maintaining the personalized attention and local focus that defines our practice.
                </p>
                <p className="text-brand-black/80 leading-relaxed">
                  Geoffrey shares office space with Mango Law and works in close coordination on criminal defense matters,
                  ensuring seamless collaboration and consistent quality representation for our clients.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CTASection
        title="Need experienced legal representation?"
        primaryLabel="Schedule a consultation"
        primaryHref="/contact"
        secondaryLabel="Call the office"
        secondaryHref="tel:7406022155"
      />
    </>
  );
}
