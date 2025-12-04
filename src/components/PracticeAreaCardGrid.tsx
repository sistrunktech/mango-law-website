import { Link } from 'react-router-dom';
import { practiceAreas } from '../data/practiceAreas';

export default function PracticeAreaCardGrid() {
  return (
    <section className="container py-12">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-gold">Practice Areas</p>
          <h2 className="text-2xl font-bold">Focused on defense</h2>
        </div>
        <Link to="/practice-areas" className="hidden text-sm font-semibold text-brand-teal hover:text-brand-mango md:inline">
          View all
        </Link>
      </div>
      <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {practiceAreas.map((area) => (
          <Link
            to={area.href}
            key={area.href}
            className="rounded-2xl border border-brand-black/10 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:border-brand-teal/50 hover:shadow-md"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-brand-mango">Defense</p>
            <h3 className="mt-2 text-lg font-semibold text-brand-black">{area.title}</h3>
            <p className="mt-2 text-sm text-brand-black/70">{area.summary}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
