import TestimonialsList from '../components/TestimonialsList';
import PageHero from '../components/PageHero';

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
      <TestimonialsList />
      <section className="container py-12">
        <div className="rounded-2xl border border-brand-black/10 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-brand-black">Disclaimer</h2>
          <p className="mt-2 text-sm text-brand-black/80">
            Testimonials describe individual experiences and do not guarantee results. Outcomes depend on facts, law,
            and procedure unique to each matter.
          </p>
        </div>
      </section>
    </>
  );
}
