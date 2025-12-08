import { useState, useEffect } from 'react';
import { AlertTriangle, Filter, MapPinned, Shield, Info } from 'lucide-react';
import PageHero from '../components/PageHero';
import CheckpointCard from '../components/CheckpointCard';
import CheckpointMap from '../components/CheckpointMap';
import CTASection from '../components/CTASection';
import BlogSidebar from '../components/BlogSidebar';
import { getUpcomingCheckpoints } from '../lib/checkpointService';
import type { DUICheckpoint } from '../data/checkpoints';
import { ohioCounties } from '../data/checkpoints';

export default function DUICheckpointsPage() {
  const [checkpoints, setCheckpoints] = useState<DUICheckpoint[]>([]);
  const [filteredCheckpoints, setFilteredCheckpoints] = useState<DUICheckpoint[]>([]);
  const [selectedCounty, setSelectedCounty] = useState<string>('all');
  const [selectedCheckpoint, setSelectedCheckpoint] = useState<DUICheckpoint | null>(null);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState<'list' | 'map'>('list');

  useEffect(() => {
    loadCheckpoints();
  }, []);

  useEffect(() => {
    filterCheckpoints();
  }, [checkpoints, selectedCounty]);

  const loadCheckpoints = async () => {
    try {
      setLoading(true);
      const data = await getUpcomingCheckpoints();
      setCheckpoints(data);
    } catch (error) {
      console.error('Failed to load checkpoints:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterCheckpoints = () => {
    let filtered = checkpoints;

    if (selectedCounty !== 'all') {
      filtered = filtered.filter(c => c.location_county === selectedCounty);
    }

    setFilteredCheckpoints(filtered);
  };

  const countiesWithCheckpoints = Array.from(
    new Set(checkpoints.map(c => c.location_county))
  ).sort();

  return (
    <>
      <PageHero
        eyebrow="DUI Resources"
        title="Ohio DUI Checkpoint Map"
        description="Real-time information about sobriety checkpoints across Ohio. Know your rights and plan accordingly."
        ctaLabel="Know Your Rights"
        ctaHref="/ovi-dui-defense-delaware-oh"
        variant="light"
      />

      <section className="section bg-white">
        <div className="container">
          <div className="mb-8 rounded-2xl border border-brand-mango/20 bg-brand-mango/5 p-6">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-brand-mango/20">
                <AlertTriangle className="h-6 w-6 text-brand-mango" />
              </div>
              <div className="flex-1">
                <h2 className="mb-2 text-lg font-bold text-brand-black">
                  Important Information About DUI Checkpoints
                </h2>
                <p className="mb-3 text-sm text-brand-black/80">
                  DUI checkpoints in Ohio are legal when properly conducted. Law enforcement must provide advance public
                  notice, use a neutral selection method, and clearly mark the checkpoint location.
                </p>
                <div className="flex flex-wrap gap-4 text-sm">
                  <a
                    href="/ovi-dui-defense-delaware-oh"
                    className="inline-flex items-center gap-2 font-semibold text-brand-mango transition-colors hover:text-brand-leaf"
                  >
                    <Shield className="h-4 w-4" />
                    Know Your Rights
                  </a>
                  <a
                    href="/blog/refuse-field-sobriety-test-ohio"
                    className="inline-flex items-center gap-2 font-semibold text-brand-mango transition-colors hover:text-brand-leaf"
                  >
                    <Info className="h-4 w-4" />
                    Field Sobriety Tests
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 rounded-lg border border-brand-black/10 bg-brand-offWhite px-4 py-2">
                <Filter className="h-4 w-4 text-brand-mango" />
                <select
                  value={selectedCounty}
                  onChange={(e) => setSelectedCounty(e.target.value)}
                  className="border-none bg-transparent text-sm font-medium text-brand-black focus:outline-none focus:ring-0"
                >
                  <option value="all">All Counties ({checkpoints.length})</option>
                  {countiesWithCheckpoints.map((county) => {
                    const count = checkpoints.filter(c => c.location_county === county).length;
                    return (
                      <option key={county} value={county}>
                        {county} County ({count})
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>

            <div className="flex gap-2 rounded-lg border border-brand-black/10 bg-brand-offWhite p-1">
              <button
                onClick={() => setView('list')}
                className={`rounded-md px-4 py-2 text-sm font-semibold transition-all ${
                  view === 'list'
                    ? 'bg-white text-brand-mango shadow-sm'
                    : 'text-brand-black/70 hover:text-brand-mango'
                }`}
              >
                List View
              </button>
              <button
                onClick={() => setView('map')}
                className={`flex items-center gap-2 rounded-md px-4 py-2 text-sm font-semibold transition-all ${
                  view === 'map'
                    ? 'bg-white text-brand-mango shadow-sm'
                    : 'text-brand-black/70 hover:text-brand-mango'
                }`}
              >
                <MapPinned className="h-4 w-4" />
                Map View
              </button>
            </div>
          </div>

          <div className="grid gap-8 lg:grid-cols-3">
            <div className="lg:col-span-2">
              {view === 'map' ? (
                <CheckpointMap
                  checkpoints={filteredCheckpoints}
                  selectedCheckpoint={selectedCheckpoint}
                  onCheckpointSelect={setSelectedCheckpoint}
                />
              ) : (
                <div>
                  {loading ? (
                    <div className="rounded-2xl border border-brand-black/10 bg-brand-offWhite p-12 text-center">
                      <div className="inline-flex h-12 w-12 animate-spin items-center justify-center rounded-full border-4 border-brand-mango/20 border-t-brand-mango" />
                      <p className="mt-4 text-sm text-brand-black/70">Loading checkpoints...</p>
                    </div>
                  ) : filteredCheckpoints.length > 0 ? (
                    <div className="grid gap-6">
                      {filteredCheckpoints.map((checkpoint) => (
                        <CheckpointCard
                          key={checkpoint.id}
                          checkpoint={checkpoint}
                          onClick={() => setSelectedCheckpoint(checkpoint)}
                        />
                      ))}
                    </div>
                  ) : (
                    <div className="rounded-2xl border border-brand-black/10 bg-brand-offWhite p-12 text-center">
                      <div className="mb-4 flex justify-center">
                        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-brand-leaf/10">
                          <MapPinned className="h-8 w-8 text-brand-leaf" />
                        </div>
                      </div>
                      <h3 className="mb-2 text-lg font-bold text-brand-black">
                        No checkpoints found
                      </h3>
                      <p className="text-sm text-brand-black/70">
                        {selectedCounty === 'all'
                          ? 'There are no upcoming DUI checkpoints scheduled at this time.'
                          : `No checkpoints scheduled in ${selectedCounty} County.`}
                      </p>
                      {selectedCounty !== 'all' && (
                        <button
                          onClick={() => setSelectedCounty('all')}
                          className="mt-4 text-sm font-semibold text-brand-mango hover:text-brand-leaf"
                        >
                          View all counties
                        </button>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="lg:col-span-1">
              <div className="lg:sticky lg:top-8">
                <BlogSidebar />
              </div>
            </div>
          </div>
        </div>
      </section>

      <CTASection
        eyebrow="Facing OVI Charges?"
        title="Experienced DUI defense attorney"
        body="If you've been charged with OVI/DUI, don't face it alone. Contact Mango Law for experienced defense representation."
        primaryLabel="Free Case Evaluation"
        primaryHref="/contact"
        secondaryLabel="Call (740) 417-6191"
        secondaryHref="tel:7404176191"
      />
    </>
  );
}
