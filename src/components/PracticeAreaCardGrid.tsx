import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { practiceAreas } from '../data/practiceAreas';
import ORCLabel from './ORCLabel';

export default function PracticeAreaCardGrid() {
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

        {/* Cards grid */}
        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {practiceAreas.map((area, index) => (
            <Link
              to={area.href}
              key={area.href}
              className="group relative rounded-2xl border border-brand-black/10 bg-white p-7 shadow-soft transition-all duration-300 hover:-translate-y-2 hover:shadow-lift hover:border-brand-leaf/20"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="relative z-10">
                {/* Enhanced icon with gradient background */}
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

                {/* Learn more link - gold to green on hover */}
                <div className="mt-5 flex items-center gap-2 text-sm font-bold text-brand-mango opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:text-brand-leaf">
                  Learn more
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </div>

              {/* Subtle shine effect on hover */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-brand-leaf/0 via-transparent to-brand-mango/0 opacity-0 transition-opacity duration-300 group-hover:opacity-5" />
            </Link>
          ))}
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
