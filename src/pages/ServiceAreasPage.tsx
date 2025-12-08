import PageHero from '../components/PageHero';
import LocationCard from '../components/LocationCard';
import BlogSidebar from '../components/BlogSidebar';
import CTASection from '../components/CTASection';
import { SEO } from '../lib/seo';
import { majorCities, surroundingCities, townships, counties } from '../data/serviceAreas';
import { MapPin, Phone } from 'lucide-react';

export default function ServiceAreasPage() {
  return (
    <>
      <SEO
        title="Areas We Serve | Criminal Defense Attorney in Delaware & Franklin Counties, Ohio"
        description="Mango Law LLC serves clients throughout Delaware County, Franklin County, and Central Ohio. Experienced criminal defense representation in Columbus, Dublin, Westerville, and surrounding communities."
      />

      <PageHero
        eyebrow="Service Locations"
        title="Areas We Serve in Central Ohio"
        description="Comprehensive criminal defense representation throughout Delaware County, Franklin County, and surrounding communities in Central Ohio."
      />

      <div className="container py-12">
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <div className="prose prose-lg max-w-none">
              <div className="rounded-xl bg-brand-offWhite/30 p-6 not-prose mb-8">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-brand-mango">
                    <MapPin className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-brand-black">Local Knowledge, Experienced Representation</h2>
                    <p className="mt-2 text-sm leading-relaxed text-brand-black/80">
                      Whether you're facing charges in Delaware Municipal Court, Franklin County Common Pleas, or any court in between, Mango Law LLC provides experienced criminal defense representation with the local knowledge that matters. We understand the courts, prosecutors, and procedures throughout Central Ohio.
                    </p>
                  </div>
                </div>
              </div>

              <section className="mb-12">
                <h2 className="mb-6 text-2xl font-bold text-brand-black">Major Cities We Serve</h2>
                <p className="mb-6 text-brand-black/80">
                  Our primary service area includes the major cities and communities throughout Delaware and Franklin Counties. We provide comprehensive criminal defense representation for all types of charges, from OVI/DUI to felony cases.
                </p>
                <div className="grid gap-4">
                  {majorCities.map((location) => (
                    <LocationCard key={location.id} location={location} />
                  ))}
                </div>
              </section>

              <section className="mb-12">
                <h2 className="mb-6 text-2xl font-bold text-brand-black">Surrounding Communities</h2>
                <p className="mb-6 text-brand-black/80">
                  We also serve clients in the surrounding cities and communities throughout the Columbus metropolitan area and Central Ohio region.
                </p>
                <div className="grid gap-4">
                  {surroundingCities.map((location) => (
                    <LocationCard key={location.id} location={location} />
                  ))}
                </div>
              </section>

              <section className="mb-12">
                <h2 className="mb-6 text-2xl font-bold text-brand-black">Township Coverage</h2>
                <p className="mb-6 text-brand-black/80">
                  Our representation extends to township jurisdictions throughout Delaware and Franklin Counties.
                </p>
                <div className="grid gap-4">
                  {townships.map((location) => (
                    <LocationCard key={location.id} location={location} />
                  ))}
                </div>
              </section>

              <section className="mb-12">
                <h2 className="mb-6 text-2xl font-bold text-brand-black">County-Wide Service</h2>
                <p className="mb-6 text-brand-black/80">
                  We provide comprehensive criminal defense services throughout Delaware County and Franklin County, appearing in all courts within these jurisdictions.
                </p>
                <div className="grid gap-4">
                  {counties.map((location) => (
                    <LocationCard key={location.id} location={location} />
                  ))}
                </div>
              </section>

              <section className="rounded-xl border border-brand-black/10 bg-gradient-to-br from-brand-offWhite/50 to-white p-8">
                <h2 className="mb-4 text-2xl font-bold text-brand-black">Don't See Your City?</h2>
                <p className="mb-6 text-brand-black/80 leading-relaxed">
                  While we've listed our primary service areas above, we also represent clients in other communities throughout Central Ohio. If you're facing criminal charges and need experienced representation, contact us to discuss your case regardless of your location.
                </p>
                <div className="flex flex-wrap gap-4">
                  <a
                    href="/contact"
                    className="inline-flex items-center gap-2 rounded-lg bg-brand-mango px-6 py-3 font-bold text-brand-black transition-all hover:bg-brand-gold"
                  >
                    <Phone className="h-5 w-5" />
                    Contact Us Today
                  </a>
                  <a
                    href="tel:7406022155"
                    className="inline-flex items-center gap-2 rounded-lg border-2 border-brand-black/20 bg-white px-6 py-3 font-bold text-brand-black transition-all hover:border-brand-mango hover:bg-brand-offWhite/50"
                  >
                    (740) 602-2155
                  </a>
                </div>
              </section>
            </div>
          </div>

          <aside className="lg:col-span-1">
            <BlogSidebar />
          </aside>
        </div>
      </div>

      <CTASection
        title="Need help in your area?"
        primaryLabel="Contact Us"
        primaryHref="/contact"
        secondaryLabel="(740) 602-2155"
        secondaryHref="tel:7406022155"
      />
    </>
  );
}
