import Link from 'next/link';
import { BookOpen, ExternalLink } from 'lucide-react';
import { getStatutesByPracticeArea, getStatute, type OhioStatute } from '../data/statutes';

type StatuteSidebarProps = {
  practiceArea?: string;
  statutes?: string[];
  title?: string;
  className?: string;
};

export default function StatuteSidebar({
  practiceArea,
  statutes: statuteSections,
  title = 'Relevant Ohio Statutes',
  className = '',
}: StatuteSidebarProps) {
  let displayStatutes: OhioStatute[] = [];

  if (practiceArea) {
    displayStatutes = getStatutesByPracticeArea(practiceArea);
  } else if (statuteSections) {
    displayStatutes = statuteSections.map(s => getStatute(s)).filter(Boolean) as OhioStatute[];
  }

  if (displayStatutes.length === 0) {
    return null;
  }

  return (
    <aside
      className={`rounded-xl border border-brand-black/10 bg-brand-offWhite p-6 ${className}`}
    >
      <div className="mb-5 flex items-start gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand-leaf/10">
          <BookOpen className="h-5 w-5 text-brand-leaf" />
        </div>
        <div>
          <h3 className="font-display text-lg font-bold text-brand-black">
            {title}
          </h3>
          <p className="mt-1 text-sm text-brand-black/60">
            Legal framework for this practice area
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {displayStatutes.map((statute) => (
          <div
            key={statute.section}
            className="group rounded-lg border border-brand-black/5 bg-white p-4 transition-all hover:border-brand-leaf/30 hover:shadow-sm"
          >
            <div className="mb-2 flex items-start justify-between gap-2">
              <Link
                href={`/glossary#${statute.id}`}
                className="flex-1 font-semibold text-brand-black transition-colors group-hover:text-brand-leaf"
              >
                § {statute.section}
              </Link>
              <a
                href={statute.orcLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-black/40 transition-colors hover:text-brand-leaf"
                title="View full statute text"
              >
                <ExternalLink className="h-4 w-4" />
              </a>
            </div>
            <p className="mb-2 text-sm font-medium text-brand-black/80">
              {statute.shortTitle}
            </p>
            <p className="text-xs leading-relaxed text-brand-black/60">
              {statute.definition.split('.')[0]}.
            </p>
            <Link
              href={`/glossary#${statute.id}`}
              className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-brand-leaf transition-colors hover:text-brand-mango"
            >
              Learn more
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        ))}
      </div>

      <div className="mt-6 rounded-lg bg-white p-4">
        <p className="text-xs leading-relaxed text-brand-black/60">
          This information is provided for educational purposes and does not
          constitute legal advice. Ohio statutes are complex and fact-specific.
          Consult with an attorney about your situation.
        </p>
      </div>
    </aside>
  );
}
