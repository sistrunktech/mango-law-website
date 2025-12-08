import TestimonialsList from '../components/TestimonialsList';
import PageHero from '../components/PageHero';
import ReviewsSidebar from '../components/ReviewsSidebar';
import CTASection from '../components/CTASection';

export default function ReviewsPage() {
  return (
    <>
      <PageHero
        eyebrow="Reviews"
        title="What clients say about working with Mango Law."
        description="Experiences shared by past clients. Every case is different; results are not guaranteed."
        ctaLabel="Schedule a consult"
        ctaHref="/contact"
        variant="light"
      />

      <section className="section bg-white">
        <div className="container">
          <div className="grid gap-8 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <TestimonialsList />
            </div>

            <div className="lg:col-span-1">
              <div className="lg:sticky lg:top-8">
                <ReviewsSidebar />
              </div>
            </div>
          </div>
        </div>
      </section>

      <CTASection
        eyebrow="Ready for Experienced Representation?"
        title="Let's discuss your case"
        body="Join the clients who trusted Mango Law with their defense. Schedule a free consultation today."
        primaryLabel="Get Free Consultation"
        primaryHref="/contact"
        secondaryLabel="Call (740) 417-6191"
        secondaryHref="tel:7404176191"
      />
    </>
  );
}
