import { Link } from 'react-router-dom';
import { Scale } from 'lucide-react';
import { getStatute } from '../data/statutes';

type ORCLabelProps = {
  section: string;
  variant?: 'micro' | 'callout' | 'inline';
  showDefinition?: boolean;
  showLink?: boolean;
  className?: string;
  /** If true, renders as a span instead of a Link to avoid nested link issues */
  suppressLink?: boolean;
};

export default function ORCLabel({
  section,
  variant = 'micro',
  showDefinition = false,
  showLink = true,
  className = '',
  suppressLink = false,
}: ORCLabelProps) {
  const statute = getStatute(section);

  if (!statute) {
    return null;
  }

  const content = (
    <>
      § {statute.section} — {statute.shortTitle}
    </>
  );

  if (variant === 'micro') {
    if (suppressLink) {
      return (
        <span
          className={`inline-flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wider text-brand-black/60 ${className}`}
          title={statute.title}
        >
          {content}
        </span>
      );
    }
    return (
      <Link
        to={`/glossary#${statute.id}`}
        className={`relative -m-2 inline-flex items-center gap-1 rounded p-2 text-[10px] font-semibold uppercase tracking-wider text-brand-black/60 transition-colors hover:text-brand-mango focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-mango/50 focus-visible:ring-offset-2 focus-visible:ring-offset-brand-offWhite ${className}`}
        title={statute.title}
      >
        {content}
      </Link>
    );
  }

  if (variant === 'inline') {
    if (suppressLink) {
      return (
        <span
          className={`inline-flex items-center gap-1 text-sm font-semibold text-brand-leaf underline decoration-brand-leaf/30 ${className}`}
          title={statute.definition}
        >
          ORC § {statute.section}
        </span>
      );
    }
    return (
      <Link
        to={`/glossary#${statute.id}`}
        className={`relative -m-2 inline-flex items-center gap-1 rounded p-2 text-sm font-semibold text-brand-leaf underline decoration-brand-leaf/30 transition-colors hover:text-brand-mango hover:decoration-brand-mango/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-leaf/40 focus-visible:ring-offset-2 focus-visible:ring-offset-brand-offWhite ${className}`}
        title={statute.definition}
      >
        ORC § {statute.section}
      </Link>
    );
  }

  return (
    <div className={`rounded-xl border border-brand-black/10 bg-brand-offWhite p-6 ${className}`}>
      <div className="mb-3 flex items-start gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand-mango/10">
          <Scale className="h-5 w-5 text-brand-mango" />
        </div>
        <div className="flex-1">
          <p className="text-sm font-semibold uppercase tracking-wider text-brand-black/60">
            Ohio Revised Code
          </p>
          <h3 className="mt-1 text-2xl font-bold text-brand-black">
            § {statute.section}
          </h3>
        </div>
      </div>

      <p className="mb-3 font-display text-lg font-semibold text-brand-black">
        {statute.title}
      </p>

      {showDefinition && (
        <p className="mb-4 leading-relaxed text-brand-black/70">
          {statute.definition}
        </p>
      )}

      {showLink && (
        <div className="flex flex-wrap gap-3">
          <Link
            to={`/glossary#${statute.id}`}
            className="inline-flex items-center gap-2 text-sm font-semibold text-brand-leaf transition-colors hover:text-brand-mango"
          >
            View in glossary
            <span aria-hidden="true">→</span>
          </Link>
          <a
            href={statute.orcLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-semibold text-brand-black/60 transition-colors hover:text-brand-leaf"
          >
            Read full statute
            <span aria-hidden="true">↗</span>
          </a>
        </div>
      )}
    </div>
  );
}
