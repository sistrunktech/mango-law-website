import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight, Phone, Calendar, Star } from 'lucide-react';
import { practiceAreas } from '../data/practiceAreas';
import ORCLabel from './ORCLabel';

export default function PracticeAreaCardGrid() {
  const oviArea = practiceAreas.find(area => area.practiceAreaKey === 'ovi-dui');
  const criminalArea = practiceAreas.find(area => area.practiceAreaKey === 'criminal-defense');
  const otherAreas = practiceAreas.filter(
    area => area.practiceAreaKey !== 'ovi-dui' && area.practiceAreaKey !== 'criminal-defense'
  );

  return (
    <section className="section bg-white">
      <div className="container">
        {/* Section header */}
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="accent-line" />
              <p className="eyebrow text-brand-gold">Practice Areas</p>
            </div>
            <h2 className="text-display-sm md:text-display-md">
              Focused criminal defense
            </h2>
            <p className="max-w-xl text-brand-black/60">
              Strategic representation across Delaware County and Central Ohio courts.
            </p>
          </div>
          <Link
            to="/practice-areas"
            className="group hidden items-center gap-2 text-sm font-semibold text-brand-mango transition-colors hover:text-brand-leaf md:inline-flex"
          >
            View all practice areas
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Featured + Standard Cards Grid */}
        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Featured Hero Card - OVI/DUI (spans 2 columns on lg) */}
          {oviArea && (
            <Link
              to={oviArea.href}
              className="group relative overflow-hidden rounded-2xl border-2 border-brand-mango/20 bg-gradient-to-br from-brand-mango/5 via-white to-brand-gold/5 shadow-lift transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:border-brand-mango/40 md:col-span-2 lg:col-span-2"
            >
              {/* Background Image */}
              {oviArea.imageUrl && (
                <div className="absolute right-0 top-0 h-full w-full opacity-[0.08] transition-all duration-500 group-hover:opacity-[0.12] lg:w-1/2">
                  <img
                    src={oviArea.imageUrl}
                    alt={oviArea.imageAlt || ''}
                    className="h-full w-full object-cover object-center"
                  />
                  <div className="absolute inset-0 bg-gradient-to-l from-transparent via-white/50 to-white" />
                </div>
              )}

              {/* Featured Badge */}
              <div className="absolute right-6 top-6 z-20">
                <div className="flex items-center gap-1.5 rounded-full bg-brand-mango px-3 py-1 shadow-md">
                  <Star className="h-3.5 w-3.5 fill-white text-white" />
                  <span className="text-xs font-bold uppercase tracking-wide text-white">Featured</span>
                </div>
              </div>

              <div className="relative z-10 p-8">
                {/* Large icon with enhanced styling */}
                <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-mango/20 to-brand-gold/20 shadow-md transition-all duration-300 group-hover:shadow-xl group-hover:from-brand-mango/30 group-hover:to-brand-gold/30 group-hover:scale-110">
                  {oviArea.icon && <oviArea.icon className="h-10 w-10 text-brand-mango" />}
                </div>

                <h3 className="text-2xl font-bold text-brand-black transition-colors group-hover:text-brand-mango">
                  {oviArea.title}
                </h3>

                {oviArea.orcSection && (
                  <div className="mt-3">
                    <ORCLabel
                      section={oviArea.orcSection}
                      variant="micro"
                      className="text-brand-black/60 hover:text-brand-mango"
                    />
                  </div>
                )}

                <p className="mt-4 text-base leading-relaxed text-brand-black/70">
                  {oviArea.summary}
                </p>

                {/* Enhanced stats/features for hero card */}
                <div className="mt-6 flex flex-wrap gap-3">
                  <div className="flex items-center gap-2 rounded-lg bg-white/80 px-3 py-2 text-xs font-semibold text-brand-black/70 shadow-sm">
                    <div className="h-1.5 w-1.5 rounded-full bg-brand-mango" />
                    Field Sobriety Defense
                  </div>
                  <div className="flex items-center gap-2 rounded-lg bg-white/80 px-3 py-2 text-xs font-semibold text-brand-black/70 shadow-sm">
                    <div className="h-1.5 w-1.5 rounded-full bg-brand-gold" />
                    License Protection
                  </div>
                  <div className="flex items-center gap-2 rounded-lg bg-white/80 px-3 py-2 text-xs font-semibold text-brand-black/70 shadow-sm">
                    <div className="h-1.5 w-1.5 rounded-full bg-brand-leaf" />
                    Motion Practice
                  </div>
                </div>

                {/* Prominent CTA */}
                <div className="mt-6 flex items-center gap-2 text-base font-bold text-brand-mango opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:text-brand-leaf">
                  Explore OVI Defense
                  <ArrowUpRight className="h-5 w-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </div>

              {/* Enhanced gradient overlay */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-brand-leaf/0 via-transparent to-brand-mango/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            </Link>
          )}

          {/* Criminal Defense - Standard Card */}
          {criminalArea && (
            <Link
              to={criminalArea.href}
              className="group relative overflow-hidden rounded-2xl border border-brand-black/10 bg-white shadow-soft transition-all duration-300 hover:-translate-y-2 hover:shadow-lift hover:border-brand-leaf/20"
            >
              {/* Background Image */}
              {criminalArea.imageUrl && (
                <div className="absolute inset-0 opacity-[0.06] transition-all duration-500 group-hover:opacity-[0.1]">
                  <img
                    src={criminalArea.imageUrl}
                    alt={criminalArea.imageAlt || ''}
                    className="h-full w-full object-cover object-center"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-white via-white/80 to-white/60" />
                </div>
              )}

              <div className="relative z-10 p-7">
                <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-xl bg-gradient-to-br from-brand-mango/10 to-brand-gold/10 shadow-sm transition-all duration-300 group-hover:shadow-md group-hover:from-brand-mango/20 group-hover:to-brand-gold/20 group-hover:scale-110">
                  {criminalArea.icon && <criminalArea.icon className="h-8 w-8 text-brand-mango transition-colors" />}
                </div>

                <h3 className="text-lg font-bold text-brand-black transition-colors group-hover:text-brand-mango">
                  {criminalArea.title}
                </h3>

                {criminalArea.orcSection && (
                  <div className="mt-2">
                    <ORCLabel
                      section={criminalArea.orcSection}
                      variant="micro"
                      className="text-brand-black/50 hover:text-brand-mango"
                    />
                  </div>
                )}

                <p className="mt-3 text-sm leading-relaxed text-brand-black/60">
                  {criminalArea.summary}
                </p>

                <div className="mt-5 flex items-center gap-2 text-sm font-bold text-brand-mango opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:text-brand-leaf">
                  Learn more
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </div>

              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-brand-leaf/0 via-transparent to-brand-mango/0 opacity-0 transition-opacity duration-300 group-hover:opacity-5" />
            </Link>
          )}

          {/* Other Practice Areas - Standard Cards */}
          {otherAreas.map((area, index) => (
            <Link
              to={area.href}
              key={area.href}
              className="group relative overflow-hidden rounded-2xl border border-brand-black/10 bg-white shadow-soft transition-all duration-300 hover:-translate-y-2 hover:shadow-lift hover:border-brand-leaf/20"
              style={{ animationDelay: `${(index + 2) * 50}ms` }}
            >
              {/* Background Image */}
              {area.imageUrl && (
                <div className="absolute inset-0 opacity-[0.06] transition-all duration-500 group-hover:opacity-[0.1]">
                  <img
                    src={area.imageUrl}
                    alt={area.imageAlt || ''}
                    className="h-full w-full object-cover object-center"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-white via-white/80 to-white/60" />
                </div>
              )}

              <div className="relative z-10 p-7">
                <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-xl bg-gradient-to-br from-brand-mango/10 to-brand-gold/10 shadow-sm transition-all duration-300 group-hover:shadow-md group-hover:from-brand-mango/20 group-hover:to-brand-gold/20 group-hover:scale-110">
                  {area.icon ? (
                    <area.icon className="h-8 w-8 text-brand-mango transition-colors" />
                  ) : (
                    <span className="text-2xl font-bold text-brand-mango transition-colors">
                      {area.title.charAt(0)}
                    </span>
                  )}
                </div>

                <h3 className="text-lg font-bold text-brand-black transition-colors group-hover:text-brand-mango">
                  {area.title}
                </h3>

                {area.orcSection && (
                  <div className="mt-2">
                    <ORCLabel
                      section={area.orcSection}
                      variant="micro"
                      className="text-brand-black/50 hover:text-brand-mango"
                    />
                  </div>
                )}

                <p className="mt-3 text-sm leading-relaxed text-brand-black/60">
                  {area.summary}
                </p>

                <div className="mt-5 flex items-center gap-2 text-sm font-bold text-brand-mango opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:text-brand-leaf">
                  Learn more
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </div>

              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-brand-leaf/0 via-transparent to-brand-mango/0 opacity-0 transition-opacity duration-300 group-hover:opacity-5" />
            </Link>
          ))}

          {/* Consultation CTA Card */}
          <div className="group relative overflow-hidden rounded-2xl border-2 border-brand-leaf/20 bg-gradient-to-br from-brand-leaf/5 via-white to-brand-forest/5 p-7 shadow-soft transition-all duration-300 hover:-translate-y-2 hover:shadow-lift hover:border-brand-leaf/40">
            <div className="relative z-10 flex h-full flex-col">
              <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-xl bg-gradient-to-br from-brand-leaf/20 to-brand-forest/20 shadow-sm transition-all duration-300 group-hover:shadow-md group-hover:scale-110">
                <Calendar className="h-8 w-8 text-brand-leaf" />
              </div>

              <h3 className="text-lg font-bold text-brand-black">
                Schedule a Consultation
              </h3>

              <p className="mt-3 flex-1 text-sm leading-relaxed text-brand-black/60">
                Discuss your case with an experienced criminal defense attorney. Free initial consultation available.
              </p>

              <div className="mt-6 space-y-3">
                <Link
                  to="/contact"
                  className="btn btn-primary w-full text-center transition-transform hover:scale-105"
                >
                  Request Consultation
                </Link>
                <a
                  href="tel:7404176191"
                  className="flex items-center justify-center gap-2 text-sm font-semibold text-brand-leaf transition-colors hover:text-brand-mango"
                >
                  <Phone className="h-4 w-4" />
                  (740) 417-6191
                </a>
              </div>
            </div>

            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-brand-leaf/0 via-transparent to-brand-forest/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          </div>
        </div>

        {/* Mobile view all link */}
        <div className="mt-8 text-center md:hidden">
          <Link to="/practice-areas" className="btn btn-secondary">
            View all practice areas
          </Link>
        </div>
      </div>
    </section>
  );
}
