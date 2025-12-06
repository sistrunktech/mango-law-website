import { CheckCircle, FileText, Users, Clock, Quote } from 'lucide-react';
import { Link } from 'react-router-dom';
import PageHero from '../components/PageHero';
import PracticeAreaCardGrid from '../components/PracticeAreaCardGrid';
import TestimonialsList from '../components/TestimonialsList';
import CTASection from '../components/CTASection';
import LocationBlock from '../components/LocationBlock';
import ContactForm from '../components/ContactForm';

const whyChooseUs = [
  {
    icon: FileText,
    title: 'Motion practice that works',
    description: 'Challenging stops, searches, and testing procedures with precision.',
  },
  {
    icon: Users,
    title: 'Local court knowledge',
    description: 'Negotiation informed by Delaware and Franklin County expectations.',
  },
  {
    icon: CheckCircle,
    title: 'Organized case management',
    description: 'Court-ready filings and thorough discovery review.',
  },
  {
    icon: Clock,
    title: 'Clear communication',
    description: 'Timelines and next steps at every milestone.',
  },
];

export default function HomePage() {
  return (
    <>
      <PageHero
        eyebrow="Accused or Arrested?"
        subtitle="Mango Law can save your reputation and future."
        title="Hire an Aggressive Attorney"
        description="DUI/OVI & Criminal Defense Attorney serving Delaware & Franklin Counties, OH"
        ctaLabel="Free Consultation"
        ctaHref="/contact"
        phoneNumber="(740) 417-6191"
      />

      {/* Why Choose Us Section */}
      <section className="section bg-white">
        <div className="container">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            {/* Content */}
            <div className="space-y-8">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="accent-line" />
                  <p className="eyebrow text-brand-gold">Why Mango Law</p>
                </div>
                <h2 className="text-display-sm md:text-display-md">
                  Direct answers. Steady communication.
                </h2>
                <p className="text-lg text-brand-black/60">
                  Defense that respects your time: precise updates, smart motions, and focus on outcomes that protect your record and future.
                </p>
              </div>

              <div className="grid gap-6 sm:grid-cols-2">
                {whyChooseUs.map((item, i) => (
                  <div key={i} className="flex gap-4">
                    {/* Gold icons */}
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-mango/10">
                      <item.icon className="h-5 w-5 text-brand-mango" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-brand-black">{item.title}</h3>
                      <p className="mt-1 text-sm text-brand-black/60">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Attorney Photo */}
            <div className="relative">
              <div className="relative overflow-hidden rounded-2xl shadow-soft-lg" style={{ background: 'linear-gradient(135deg, #2C3E50 0%, #34495E 100%)' }}>
                <div className="p-4">
                  <img
                    src="/images/headshots/nick-mango-hero.jpg"
                    alt="Dominic 'Nick' Mango, Criminal Defense Attorney"
                    className="mx-auto h-auto max-h-[520px] w-full rounded-xl object-contain"
                  />
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-brand-black/90 via-brand-black/60 to-transparent p-8">
                  <h3 className="text-2xl font-bold text-white">Dominic "Nick" Mango</h3>
                  <p className="text-sm font-medium text-brand-gold">Criminal Defense Attorney</p>
                  <p className="mt-2 text-xs text-brand-offWhite/90">Serving Delaware & Franklin Counties, OH</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <PracticeAreaCardGrid />

      {/* Stats/Trust Section */}
      <section className="relative overflow-hidden py-20">
        {/* Forest to emerald gradient for energy */}
        <div className="absolute inset-0 bg-forest-emerald" />

        {/* Subtle pattern overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-brand-black/20 to-transparent" />

        <div className="container relative">
          <div className="grid gap-10 text-center md:grid-cols-4">
            {[
              { value: '15+', label: 'Years Experience' },
              { value: '1000+', label: 'Cases Handled' },
              { value: '24/7', label: 'Availability' },
              { value: '100%', label: 'Confidential' },
            ].map((stat, i) => (
              <div key={i} className="space-y-3">
                <p className="text-display-md font-black text-white">{stat.value}</p>
                <p className="text-sm font-semibold uppercase tracking-wider text-brand-offWhite/80">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <TestimonialsList />
      <LocationBlock />

      {/* Contact Section */}
      <section className="section bg-white">
        <div className="container">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-start">
            <div className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="accent-line" />
                  <p className="eyebrow text-brand-gold">Contact</p>
                </div>
                <h2 className="text-display-sm md:text-display-md">
                  Tell us what's going on
                </h2>
                <p className="text-lg text-brand-black/60">
                  Share a few details about the situation. We'll respond promptly with next steps and a clear path forward.
                </p>
              </div>

              {/* Contact info cards */}
              <div className="grid gap-4 sm:grid-cols-2">
                <a
                  href="tel:7404176191"
                  className="group card card-interactive flex items-center gap-4 p-5"
                >
                  <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-brand-mango/10 transition-all group-hover:bg-brand-mango/20 group-hover:scale-110">
                    <span className="text-2xl">📞</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-brand-black/60">Call us</p>
                    <p className="font-bold text-brand-black transition-colors group-hover:text-brand-mango">(740) 417-6191</p>
                  </div>
                </a>
                <a
                  href="mailto:office@mango.law"
                  className="group card card-interactive flex items-center gap-4 p-5"
                >
                  <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-brand-leaf/10 transition-all group-hover:bg-brand-leaf/20 group-hover:scale-110">
                    <span className="text-2xl">✉️</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-brand-black/60">Email us</p>
                    <p className="font-bold text-brand-black transition-colors group-hover:text-brand-leaf">office@mango.law</p>
                  </div>
                </a>
              </div>
            </div>

            {/* Form */}
            <div className="card border-brand-black/5 bg-brand-offWhite p-8 shadow-soft-lg">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      <CTASection
        title="Need counsel now? Let's talk today."
        body="Fast-moving situations deserve prompt, informed action. Schedule a consult or call to discuss your options."
        primaryLabel="Free Consultation"
        primaryHref="/contact"
        secondaryLabel="(740) 417-6191"
        secondaryHref="tel:7404176191"
      />
    </>
  );
}
