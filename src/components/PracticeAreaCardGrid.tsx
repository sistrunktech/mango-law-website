import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { practiceAreas } from '../data/practiceAreas';

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
            className="group hidden items-center gap-2 text-sm font-semibold text-brand-teal transition-colors hover:text-brand-mango md:inline-flex"
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
              className="group relative overflow-hidden rounded-2xl border border-brand-black/10 bg-white p-7 shadow-soft transition-all duration-300 hover:-translate-y-2 hover:shadow-lift-lg hover:border-brand-leaf/20"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              {/* Gradient accent bar on hover */}
              <div className="absolute left-0 top-0 h-1 w-0 bg-gradient-to-r from-brand-leaf to-brand-mango transition-all duration-300 group-hover:w-full" />

              {/* Subtle gradient background on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-brand-leaf/0 to-brand-leaf/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

              <div className="relative">
                {/* Icon with better scaling */}
                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-xl bg-brand-leaf/10 transition-all duration-300 group-hover:bg-brand-leaf/20 group-hover:scale-110">
                  <span className="text-xl font-bold text-brand-leaf">
                    {area.title.charAt(0)}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-brand-black transition-colors duration-200 group-hover:text-brand-leaf">
                  {area.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-brand-black/60">
                  {area.summary}
                </p>

                {/* Learn more link with smooth fade-in */}
                <div className="mt-5 flex items-center gap-2 text-sm font-bold text-brand-mango opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-1">
                  Learn more
                  <ArrowUpRight className="h-4 w-4" />
                </div>
              </div>
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
