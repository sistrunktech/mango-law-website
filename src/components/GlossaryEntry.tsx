import Link from 'next/link';
import { Scale, ExternalLink, ArrowRight, BookMarked, CheckCircle, FileText } from 'lucide-react';
import { getRelatedStatutes, type OhioStatute } from '../data/statutes';

type GlossaryEntryProps = {
  statute: OhioStatute;
  showRelated?: boolean;
};

export default function GlossaryEntry({
  statute,
  showRelated = true,
}: GlossaryEntryProps) {
  const relatedStatutes = showRelated ? getRelatedStatutes(statute.section) : [];

  const practicePageMap: Record<string, { title: string; href: string }> = {
    'ovi-dui': { title: 'OVI / DUI Defense', href: '/ovi-dui-defense-delaware-oh' },
    'criminal-defense': { title: 'Criminal Defense', href: '/criminal-defense-delaware-oh' },
    'protection-orders': { title: 'Protection Orders', href: '/protection-order-lawyer-delaware-oh' },
    'domestic-violence': { title: 'Domestic Violence', href: '/criminal-defense-delaware-oh' },
    'sex-crimes': { title: 'Sex Crime Defense', href: '/sex-crime-defense-lawyer-delaware-oh' },
    'weapons': { title: 'Weapons Charges', href: '/criminal-defense-delaware-oh' },
    'drug-crimes': { title: 'Drug Crimes', href: '/drug-crime-lawyer-delaware-oh' },
    'white-collar': { title: 'White Collar Crimes', href: '/white-collar-crimes-attorney-delaware-oh' },
    'personal-injury': { title: 'Personal Injury', href: '/personal-injury-lawyer-delaware-oh' },
  };

  return (
    <article
      id={statute.id}
      className="scroll-mt-24 rounded-xl border border-brand-black/10 bg-white p-8 shadow-soft-lg"
    >
      <div className="mb-6 flex items-start gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-brand-mango/10">
          <Scale className="h-6 w-6 text-brand-mangoText" />
        </div>
        <div className="flex-1">
          <p className="text-xs font-bold uppercase tracking-widest text-brand-mangoText">
            Ohio Revised Code
          </p>
          <h2 className="mt-1 font-display text-2xl font-bold text-brand-black">
            § {statute.section} — {statute.shortTitle}
          </h2>
        </div>
      </div>

      <h3 className="mb-3 text-xl font-semibold text-brand-black">
        {statute.title}
      </h3>

      <div className="prose prose-lg max-w-none">
        <p className="leading-relaxed text-brand-black/80">
          {statute.definition}
        </p>
      </div>

      <div className="mt-6 flex flex-wrap gap-3">
        <a
          href={statute.orcLink}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-lg bg-brand-leaf px-4 py-2 text-sm font-bold text-white transition-all hover:bg-brand-forest"
        >
          Read full statute
          <ExternalLink className="h-4 w-4" />
        </a>
      </div>

      <div className="mt-4 rounded-xl border border-brand-black/10 bg-brand-offWhite p-5">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-brand-black/70">
          <span className="inline-flex items-center gap-2">
            <CheckCircle className="h-4 w-4 text-brand-mangoText" />
            Last verified{' '}
            {new Date(statute.lastVerified).toLocaleDateString('en-US', {
              month: 'long',
              day: 'numeric',
              year: 'numeric',
            })}
          </span>
        </div>

        {statute.sources.length > 0 && (
          <div className="mt-4">
            <div className="flex items-center gap-2 text-sm font-semibold text-brand-black">
              <FileText className="h-4 w-4 text-brand-mangoText" />
              Sources
            </div>
            <ul className="mt-3 space-y-2 text-sm text-brand-black/70">
              {statute.sources.map((source) => (
                <li key={source.url} className="flex flex-wrap items-center gap-x-2 gap-y-1">
                  <a
                    href={source.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-brand-mangoText underline-offset-2 hover:text-brand-leaf hover:underline"
                  >
                    {source.label}
                  </a>
                  {source.type && (
                    <span className="rounded-full bg-white/70 px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-brand-black/60">
                      {source.type}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {statute.practiceAreas.length > 0 && (
        <div className="mt-6 border-t border-brand-black/10 pt-6">
          <div className="mb-3 flex items-center gap-2">
            <BookMarked className="h-4 w-4 text-brand-black/60" />
            <p className="text-sm font-bold uppercase tracking-wider text-brand-black/60">
              Related Practice Areas
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {statute.practiceAreas.map((area) => {
              const practiceInfo = practicePageMap[area];
              if (!practiceInfo) return null;
              return (
                <Link
                  key={area}
                  href={practiceInfo.href}
                  className="inline-flex min-h-[44px] items-center gap-2 rounded-full border border-brand-leaf/20 bg-brand-leaf/5 px-4 py-2 text-sm font-semibold text-brand-leaf transition-all hover:border-brand-leaf hover:bg-brand-leaf/10"
                >
                  {practiceInfo.title}
                  <ArrowRight className="h-3 w-3" />
                </Link>
              );
            })}
          </div>
        </div>
      )}

      {relatedStatutes.length > 0 && (
        <div className="mt-6 border-t border-brand-black/10 pt-6">
          <p className="mb-4 text-sm font-bold uppercase tracking-wider text-brand-black/60">
            Related Statutes
          </p>
          <div className="grid gap-3 sm:grid-cols-2">
            {relatedStatutes.map((related) => (
              <a
                key={related.section}
                href={`#${related.id}`}
                className="group flex items-start gap-3 rounded-lg border border-brand-black/5 bg-brand-offWhite p-4 transition-all hover:border-brand-leaf/30 hover:shadow-sm"
              >
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded bg-brand-leaf/10 transition-colors group-hover:bg-brand-leaf/20">
                  <Scale className="h-4 w-4 text-brand-leaf" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-brand-black transition-colors group-hover:text-brand-leaf">
                    § {related.section}
                  </p>
                  <p className="text-sm text-brand-black/70">
                    {related.shortTitle}
                  </p>
                </div>
              </a>
            ))}
          </div>
        </div>
      )}
    </article>
  );
}
