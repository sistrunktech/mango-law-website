import { useState, useMemo } from 'react';
import { Search, BookOpen, Filter } from 'lucide-react';
import PageHero from '../components/PageHero';
import GlossaryEntry from '../components/GlossaryEntry';
import { getAllStatutes } from '../data/statutes';

const practiceAreaFilters = [
  { value: 'all', label: 'All Practice Areas' },
  { value: 'ovi-dui', label: 'OVI/DUI' },
  { value: 'criminal-defense', label: 'Criminal Defense' },
  { value: 'protection-orders', label: 'Protection Orders' },
  { value: 'domestic-violence', label: 'Domestic Violence' },
  { value: 'sex-crimes', label: 'Sex Crimes' },
  { value: 'weapons', label: 'Weapons' },
  { value: 'drug-crimes', label: 'Drug Crimes' },
  { value: 'white-collar', label: 'White Collar' },
  { value: 'personal-injury', label: 'Personal Injury' },
];

export default function GlossaryPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const allStatutes = getAllStatutes();

  const filteredStatutes = useMemo(() => {
    let results = allStatutes;

    if (selectedFilter !== 'all') {
      results = results.filter(statute =>
        statute.practiceAreas.includes(selectedFilter)
      );
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      results = results.filter(
        statute =>
          statute.section.toLowerCase().includes(query) ||
          statute.title.toLowerCase().includes(query) ||
          statute.shortTitle.toLowerCase().includes(query) ||
          statute.definition.toLowerCase().includes(query)
      );
    }

    return results.sort((a, b) => a.section.localeCompare(b.section));
  }, [allStatutes, searchQuery, selectedFilter]);

  return (
    <>
      <PageHero
        eyebrow="Legal Reference"
        title="Ohio Revised Code Glossary"
        description="A plain-English guide to Ohio criminal and civil statutes. Search by statute number, practice area, or keyword to understand the laws that matter to your case."
        compact
        alignLeft
        showQuickActions={false}
        phoneCtaId="glossary_hero_call_office"
      />

      <section className="section bg-white">
        <div className="container">
          <div className="mx-auto max-w-5xl">
            <div className="mb-8 space-y-4">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-brand-black/40" />
                <input
                  type="text"
                  placeholder="Search by statute number, title, or keyword..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full rounded-xl border border-brand-black/10 bg-white py-4 pl-12 pr-4 text-brand-black placeholder:text-brand-black/40 focus:border-brand-leaf focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-leaf/20"
                />
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <div className="flex items-center gap-2 text-sm font-semibold text-brand-black/60">
                  <Filter className="h-4 w-4" />
                  Filter by practice area:
                </div>
                <div className="flex flex-wrap gap-2">
                  {practiceAreaFilters.map((filter) => (
                    <button
                      key={filter.value}
                      onClick={() => setSelectedFilter(filter.value)}
                      className={[
                        'rounded-full px-4 py-2 text-sm font-semibold transition-all',
                        selectedFilter === filter.value
                          ? 'bg-brand-leaf text-white shadow-sm'
                          : 'bg-brand-offWhite text-brand-black/70 hover:bg-brand-leaf/10 hover:text-brand-leaf',
                      ].join(' ')}
                    >
                      {filter.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between border-t border-brand-black/10 pt-4">
                <p className="text-sm text-brand-black/60">
                  Showing {filteredStatutes.length} of {allStatutes.length} statutes
                </p>
                {(searchQuery || selectedFilter !== 'all') && (
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedFilter('all');
                    }}
                    className="text-sm font-semibold text-brand-leaf transition-colors hover:text-brand-mango"
                  >
                    Clear filters
                  </button>
                )}
              </div>
            </div>

            {filteredStatutes.length > 0 ? (
              <div className="space-y-6">
                {filteredStatutes.map((statute) => (
                  <GlossaryEntry key={statute.section} statute={statute} />
                ))}
              </div>
            ) : (
              <div className="rounded-xl border border-brand-black/10 bg-brand-offWhite p-12 text-center">
                <BookOpen className="mx-auto mb-4 h-12 w-12 text-brand-black/20" />
                <h2 className="mb-2 text-xl font-bold text-brand-black">
                  No statutes found
                </h2>
                <p className="mb-4 text-brand-black/60">
                  Try adjusting your search or filter criteria
                </p>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedFilter('all');
                  }}
                  className="text-sm font-semibold text-brand-leaf transition-colors hover:text-brand-mango"
                >
                  Clear filters
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="section bg-brand-offWhite">
        <div className="container">
          <div className="mx-auto max-w-3xl rounded-2xl border-2 border-brand-leaf/20 bg-white p-8 shadow-soft-lg md:p-12">
            <div className="mb-6 flex items-start gap-4">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-brand-leaf/10">
                <BookOpen className="h-7 w-7 text-brand-leaf" />
              </div>
              <div>
                <h2 className="font-display text-2xl font-bold text-brand-black">
                  Understanding Ohio Statutes
                </h2>
                <p className="mt-2 text-brand-black/70">
                  What you need to know about legal citations
                </p>
              </div>
            </div>

            <div className="prose prose-lg max-w-none">
              <p className="text-brand-black/80">
                This glossary provides plain-English summaries of Ohio statutes relevant to
                criminal defense, personal injury, and civil protection order matters.
              </p>

              <h3 className="text-lg font-bold text-brand-black">How to Read Statute Numbers</h3>
              <p className="text-brand-black/80">
                Ohio Revised Code (ORC) statutes are organized by chapter and section. For
                example, <strong>ORC § 4511.19</strong> is Chapter 4511 (Traffic Laws),
                Section 19 (Operating Vehicle Under the Influence).
              </p>

              <h3 className="text-lg font-bold text-brand-black">Important Disclaimer</h3>
              <p className="text-brand-black/80">
                These summaries are for educational purposes only and do not constitute legal
                advice. Ohio law is complex, fact-specific, and subject to change. Always
                consult with a qualified attorney about your specific situation.
              </p>

              <p className="text-brand-black/80">
                For official statute text, click the "Read full statute" link on any entry to
                view the complete legal language on codes.ohio.gov.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
