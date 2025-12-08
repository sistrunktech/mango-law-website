import { BookOpen, Phone, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import ContactForm from './ContactForm';
import { testimonials } from '../data/testimonials';

const glossaryTerms = [
  { term: 'OVI/DUI', slug: 'ovi', section: '4511.19' },
  { term: 'BAC', slug: 'bac', section: 'Blood Alcohol Content' },
  { term: 'Field Sobriety Tests', slug: 'field-sobriety-tests', section: 'FST' },
  { term: 'Protection Order', slug: 'protection-order', section: '3113.31' },
  { term: 'Felonious Assault', slug: 'felonious-assault', section: '2903.11' },
  { term: 'Drug Trafficking', slug: 'drug-trafficking', section: '2925.03' },
];

const quickPracticeAreas = [
  { name: 'OVI/DUI Defense', href: '/practice-areas/ovi-dui' },
  { name: 'Criminal Defense', href: '/practice-areas/criminal-defense' },
  { name: 'Drug Crimes', href: '/practice-areas/drug-crimes' },
  { name: 'Protection Orders', href: '/practice-areas/protection-orders' },
  { name: 'Sex Crimes', href: '/practice-areas/sex-crimes' },
  { name: 'White Collar', href: '/practice-areas/white-collar' },
];

export default function BlogSidebar() {
  const featuredTestimonial = testimonials[0];

  return (
    <aside className="space-y-6">
      <div className="rounded-xl border border-brand-black/10 bg-white p-6 shadow-soft">
        <div className="mb-4 flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand-mango/10">
            <Phone className="h-5 w-5 text-brand-mango" />
          </div>
          <h3 className="font-display text-lg font-bold text-brand-black">
            Need Legal Help?
          </h3>
        </div>
        <p className="mb-4 text-sm text-brand-black/70">
          Get a free consultation about your case. We're here to help protect your rights.
        </p>
        <ContactForm />
      </div>

      <div className="rounded-xl border border-brand-black/10 bg-brand-offWhite p-6">
        <div className="mb-5 flex items-start gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand-leaf/10">
            <BookOpen className="h-5 w-5 text-brand-leaf" />
          </div>
          <div>
            <h3 className="font-display text-lg font-bold text-brand-black">
              Legal Terms
            </h3>
            <p className="mt-1 text-sm text-brand-black/60">
              Quick reference guide
            </p>
          </div>
        </div>

        <div className="space-y-3">
          {glossaryTerms.map((item) => (
            <Link
              key={item.slug}
              to={`/glossary#${item.slug}`}
              className="group block rounded-lg bg-white p-3 transition-all hover:shadow-sm"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-brand-black transition-colors group-hover:text-brand-leaf">
                    {item.term}
                  </p>
                  <p className="text-xs text-brand-black/60">
                    {item.section}
                  </p>
                </div>
                <span className="text-brand-leaf transition-transform group-hover:translate-x-1" aria-hidden="true">
                  →
                </span>
              </div>
            </Link>
          ))}
        </div>

        <Link
          to="/glossary"
          className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-brand-leaf transition-colors hover:text-brand-mango"
        >
          View all legal terms
          <span aria-hidden="true">→</span>
        </Link>
      </div>

      <div className="rounded-xl border border-brand-black/10 bg-white p-6 shadow-soft">
        <div className="mb-4 flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand-mango/10">
            <Star className="h-5 w-5 text-brand-mango" />
          </div>
          <h3 className="font-display text-lg font-bold text-brand-black">
            Client Review
          </h3>
        </div>

        <div className="mb-4">
          <div className="mb-2 flex gap-1">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="h-4 w-4 fill-brand-mango text-brand-mango" />
            ))}
          </div>
          <p className="text-sm leading-relaxed text-brand-black/80">
            "{featuredTestimonial.quote}"
          </p>
        </div>

        <div className="mb-4">
          <p className="font-semibold text-brand-black">{featuredTestimonial.name}</p>
          <p className="text-sm text-brand-black/60">{featuredTestimonial.location}</p>
        </div>

        <Link
          to="/reviews"
          className="inline-flex items-center gap-2 text-sm font-semibold text-brand-leaf transition-colors hover:text-brand-mango"
        >
          Read more reviews
          <span aria-hidden="true">→</span>
        </Link>
      </div>

      <div className="rounded-xl border border-brand-black/10 bg-brand-offWhite p-6">
        <h3 className="mb-4 font-display text-lg font-bold text-brand-black">
          Practice Areas
        </h3>
        <div className="space-y-2">
          {quickPracticeAreas.map((area) => (
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
    </aside>
  );
}
