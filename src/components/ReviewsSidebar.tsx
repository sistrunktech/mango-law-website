import { Phone, Star, BookOpen, MessageSquare } from 'lucide-react';
import { Link } from 'react-router-dom';
import ContactForm from './ContactForm';

const practiceAreas = [
  { name: 'OVI/DUI Defense', href: '/ovi-dui-defense-delaware-oh' },
  { name: 'Criminal Defense', href: '/criminal-defense-delaware-oh' },
  { name: 'Drug Crimes', href: '/drug-crime-lawyer-delaware-oh' },
  { name: 'Protection Orders', href: '/protection-order-lawyer-delaware-oh' },
  { name: 'Sex Crimes', href: '/sex-crime-defense-lawyer-delaware-oh' },
  { name: 'White Collar', href: '/white-collar-crimes-attorney-delaware-oh' },
];

const relatedResources = [
  { title: 'Know Your Rights', href: '/blog/refuse-field-sobriety-test-ohio', description: 'Understanding field sobriety tests' },
  { title: 'OVI Defense Guide', href: '/ovi-dui-defense-delaware-oh', description: 'Complete OVI defense overview' },
  { title: 'Client Success Stories', href: '/reviews', description: 'Read more testimonials' },
];

export default function ReviewsSidebar() {
  return (
    <aside className="space-y-6">
      <div className="rounded-xl border border-brand-black/10 bg-white p-6 shadow-soft">
        <div className="mb-4 flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand-mango/10">
            <Phone className="h-5 w-5 text-brand-mango" />
          </div>
          <h3 className="font-display text-lg font-bold text-brand-black">
            Get Legal Help
          </h3>
        </div>
        <p className="mb-4 text-sm text-brand-black/70">
          See why our clients trust us. Schedule a free consultation today.
        </p>
        <ContactForm />
      </div>

      <div className="rounded-xl border border-brand-black/10 bg-brand-offWhite p-6">
        <div className="mb-5 flex items-start gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand-gold/10">
            <Star className="h-5 w-5 text-brand-gold" />
          </div>
          <div>
            <h3 className="font-display text-lg font-bold text-brand-black">
              Share Your Experience
            </h3>
            <p className="mt-1 text-sm text-brand-black/60">
              Help others find quality representation
            </p>
          </div>
        </div>

        <p className="mb-4 text-sm text-brand-black/70">
          If Mango Law helped you achieve a positive outcome, we'd appreciate you sharing your experience.
        </p>

        <a
          href="https://g.page/r/YOUR_GOOGLE_REVIEW_LINK/review"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-lg bg-brand-mango px-4 py-3 text-sm font-bold text-white shadow-soft transition-all hover:bg-brand-gold hover:shadow-md hover:-translate-y-0.5"
        >
          <MessageSquare className="h-4 w-4" />
          Leave a Review
        </a>
      </div>

      <div className="rounded-xl border border-brand-black/10 bg-white p-6 shadow-soft">
        <div className="mb-4 flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand-leaf/10">
            <BookOpen className="h-5 w-5 text-brand-leaf" />
          </div>
          <h3 className="font-display text-lg font-bold text-brand-black">
            Resources
          </h3>
        </div>

        <div className="space-y-3">
          {relatedResources.map((resource) => (
            <Link
              key={resource.href}
              to={resource.href}
              className="group block rounded-lg bg-brand-offWhite p-3 transition-all hover:shadow-sm"
            >
              <p className="font-semibold text-brand-black transition-colors group-hover:text-brand-leaf">
                {resource.title}
              </p>
              <p className="text-xs text-brand-black/60">
                {resource.description}
              </p>
            </Link>
          ))}
        </div>
      </div>

      <div className="rounded-xl border border-brand-black/10 bg-brand-offWhite p-6">
        <h3 className="mb-4 font-display text-lg font-bold text-brand-black">
          Practice Areas
        </h3>
        <div className="space-y-2">
          {practiceAreas.map((area) => (
            <Link
              key={area.href}
              to={area.href}
              className="group flex items-center justify-between rounded-lg bg-white px-4 py-3 text-sm font-medium text-brand-black transition-all hover:shadow-sm hover:text-brand-leaf"
            >
              {area.name}
              <span className="text-brand-leaf transition-transform group-hover:translate-x-1" aria-hidden="true">
                →
              </span>
            </Link>
          ))}
        </div>
        <Link
          to="/practice-areas"
          className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-brand-leaf transition-colors hover:text-brand-mango"
        >
          View all practice areas
          <span aria-hidden="true">→</span>
        </Link>
      </div>

      <div className="rounded-xl border border-brand-black/10 bg-white p-6 shadow-soft">
        <h3 className="mb-2 text-sm font-semibold text-brand-black">Disclaimer</h3>
        <p className="text-xs text-brand-black/70 leading-relaxed">
          Testimonials describe individual experiences and do not guarantee results. Outcomes depend on facts, law, and procedure unique to each matter.
        </p>
      </div>
    </aside>
  );
}
