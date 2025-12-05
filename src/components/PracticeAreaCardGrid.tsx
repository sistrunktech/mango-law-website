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
        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {practiceAreas.map((area, index) => (
            <Link
              to={area.href}
              key={area.href}
              className="card card-hover group relative overflow-hidden"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="relative">
                {/* Icon - green background */}
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-leaf/10 transition-colors group-hover:bg-brand-leaf/20">
                  <span className="text-lg font-bold text-brand-leaf">
                    {area.title.charAt(0)}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-brand-black group-hover:text-brand-mango">
                  {area.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-brand-black/60">
                  {area.summary}
                </p>

                {/* Learn more link */}
                <div className="mt-4 flex items-center gap-1 text-sm font-semibold text-brand-mango opacity-0 transition-all duration-200 group-hover:opacity-100">
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
