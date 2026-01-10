import Link from 'next/link';
import { Scale, ExternalLink, ArrowRight } from 'lucide-react';
import { getStatute, getRelatedStatutes } from '../data/statutes';

type LegalCodeCalloutProps = {
  section: string;
  showRelated?: boolean;
  className?: string;
};

export default function LegalCodeCallout({
  section,
  showRelated = true,
  className = '',
}: LegalCodeCalloutProps) {
  const statute = getStatute(section);
  const relatedStatutes = showRelated ? getRelatedStatutes(section) : [];

  if (!statute) {
    return null;
  }

  return (
    <div className={`rounded-2xl border-2 border-brand-mango/20 bg-gradient-to-br from-brand-mango/5 to-brand-gold/5 p-8 shadow-soft-lg ${className}`}>
      <div className="mb-6 flex items-start gap-4">
        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-brand-mango shadow-sm">
          <Scale className="h-7 w-7 text-white" />
        </div>
        <div className="flex-1">
          <p className="text-xs font-bold uppercase tracking-widest text-brand-mango">
            Ohio Revised Code
          </p>
          <h3 className="mt-1 font-display text-3xl font-bold text-brand-black">
            § {statute.section}
          </h3>
        </div>
      </div>

      <h4 className="mb-3 font-display text-xl font-bold text-brand-black">
        {statute.title}
      </h4>

      <p className="mb-6 text-lg leading-relaxed text-brand-black/80">
        {statute.definition}
      </p>

      <div className="flex flex-wrap gap-3">
        <Link
          href={`/glossary#${statute.id}`}
          className="inline-flex items-center gap-2 rounded-lg bg-brand-leaf px-5 py-3 text-sm font-bold text-white shadow-sm transition-all hover:bg-brand-forest hover:shadow-md"
        >
          View in legal glossary
          <ArrowRight className="h-4 w-4" />
        </Link>
        <a
          href={statute.orcLink}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-lg border-2 border-brand-black/10 bg-white px-5 py-3 text-sm font-bold text-brand-black transition-all hover:border-brand-leaf hover:bg-brand-offWhite"
        >
          Read full statute
          <ExternalLink className="h-4 w-4" />
        </a>
      </div>

      {relatedStatutes.length > 0 && (
        <div className="mt-6 border-t border-brand-black/10 pt-6">
          <p className="mb-3 text-sm font-bold uppercase tracking-wider text-brand-black/60">
            Related Statutes
          </p>
          <div className="grid gap-3 sm:grid-cols-2">
            {relatedStatutes.map((related) => (
              <Link
                key={related.section}
                href={`/glossary#${related.id}`}
                className="group flex items-start gap-3 rounded-lg border border-brand-black/5 bg-white p-4 transition-all hover:border-brand-leaf/30 hover:shadow-sm"
              >
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded bg-brand-leaf/10 transition-colors group-hover:bg-brand-leaf/20">
                  <Scale className="h-4 w-4 text-brand-leaf" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-brand-black transition-colors group-hover:text-brand-leaf">
                    § {related.section}
                  </p>
                  <p className="text-xs text-brand-black/60">
                    {related.shortTitle}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
