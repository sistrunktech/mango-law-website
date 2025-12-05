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
        phoneNumber="(740) 602-2155"
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
                    {/* Consistent green icons */}
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-leaf/10">
                      <item.icon className="h-5 w-5 text-brand-leaf" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-brand-black">{item.title}</h3>
                      <p className="mt-1 text-sm text-brand-black/60">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Attorney image placeholder - ready for real headshot */}
            <div className="relative">
              <div className="aspect-[4/3] overflow-hidden rounded-2xl bg-gradient-to-br from-brand-leafDark via-brand-leaf to-brand-mango/30 shadow-xl">
                {/* Placeholder for attorney photo */}
                <div className="flex h-full items-center justify-center">
                  <div className="text-center text-brand-offWhite/60">
                    <div className="mx-auto mb-4 flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-brand-mango/30 to-brand-leaf/30">
                      <Users className="h-12 w-12 text-brand-mango" />
                    </div>
                    <p className="text-sm font-medium">Attorney Photo</p>
                    <p className="text-xs opacity-60">Coming Soon</p>
                  </div>
                </div>
              </div>
              {/* Decorative accent - gradient from mango to leaf */}
              <div className="absolute -bottom-4 -right-4 -z-10 h-full w-full rounded-2xl bg-gradient-to-br from-brand-mango/30 to-brand-leaf/30" />
            </div>
          </div>
        </div>
      </section>

      <PracticeAreaCardGrid />

      {/* Stats/Trust Section */}
      <section className="section-tight bg-brand-black text-brand-offWhite">
        <div className="container">
          <div className="grid gap-8 text-center md:grid-cols-4">
            {[
              { value: '15+', label: 'Years Experience' },
              { value: '1000+', label: 'Cases Handled' },
              { value: '24/7', label: 'Availability' },
              { value: '100%', label: 'Confidential' },
            ].map((stat, i) => (
              <div key={i} className="space-y-2">
                <p className="text-display-md text-brand-mango">{stat.value}</p>
                <p className="text-sm text-brand-offWhite/60">{stat.label}</p>
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
                  href="tel:7406022155"
                  className="card card-hover flex items-center gap-4 p-4"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-mango/10">
                    <span className="text-xl">📞</span>
                  </div>
                  <div>
                    <p className="text-sm text-brand-black/60">Call us</p>
                    <p className="font-semibold text-brand-black">(740) 602-2155</p>
                  </div>
                </a>
                <a
                  href="mailto:nick@mangolaw.com"
                  className="card card-hover flex items-center gap-4 p-4"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-teal/10">
                    <span className="text-xl">✉️</span>
                  </div>
                  <div>
                    <p className="text-sm text-brand-black/60">Email us</p>
                    <p className="font-semibold text-brand-black">nick@mangolaw.com</p>
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
        secondaryLabel="(740) 602-2155"
        secondaryHref="tel:7406022155"
      />
    </>
  );
}
