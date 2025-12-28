import { useState, useEffect } from 'react';
import { AlertTriangle, Filter, MapPinned, Shield, Info, Calendar, Clock } from 'lucide-react';
import PageHero from '../components/PageHero';
import CheckpointCard from '../components/CheckpointCard';
import CheckpointMap from '../components/CheckpointMap';
import CheckpointHotspots from '../components/CheckpointHotspots';
import HotspotTeaser from '../components/HotspotTeaser';
import CTASection from '../components/CTASection';
import BlogSidebar from '../components/BlogSidebar';
import { getUpcomingCheckpoints, getRecentCheckpoints, type DateRangeOption } from '../lib/checkpointService';
import type { DUICheckpoint } from '../data/checkpoints';
import LeadCaptureModal from '../components/LeadCaptureModal';
import { getCheckpointAnnouncements, isAnnouncementFreshForPublic, type CheckpointAnnouncement } from '../lib/checkpointAnnouncementsService';
import { OFFICE_PHONE_DISPLAY, OFFICE_PHONE_TEL } from '../lib/contactInfo';
import { trackCtaClick, trackLeadSubmitted } from '../lib/analytics';

type ViewMode = 'upcoming' | 'all';

export default function DUICheckpointsPage() {
  const [checkpoints, setCheckpoints] = useState<DUICheckpoint[]>([]);
  const [announcements, setAnnouncements] = useState<CheckpointAnnouncement[]>([]);
  const [filteredCheckpoints, setFilteredCheckpoints] = useState<DUICheckpoint[]>([]);
  const [selectedCounty, setSelectedCounty] = useState<string>('all');
  const [selectedCheckpoint, setSelectedCheckpoint] = useState<DUICheckpoint | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>('all');
  const [dateRange, setDateRange] = useState<DateRangeOption>('90d');
  const [currentPage, setCurrentPage] = useState(1);
  const [isLeadModalOpen, setIsLeadModalOpen] = useState(false);
  const [leadModalTrigger, setLeadModalTrigger] = useState<'emergency_banner' | 'checkpoint_card' | 'lead_magnet' | 'exit_intent' | 'hotspot_specific'>('emergency_banner');
  const [leadModalCheckpointId, setLeadModalCheckpointId] = useState<string | undefined>();
  const [now, setNow] = useState(() => new Date());
  const itemsPerPage = 15;

  useEffect(() => {
    const id = window.setInterval(() => setNow(new Date()), 60_000);
    return () => window.clearInterval(id);
  }, []);

  useEffect(() => {
    loadCheckpoints();
  }, [viewMode, dateRange]);

  useEffect(() => {
    filterCheckpoints();
  }, [checkpoints, selectedCounty]);

  const filterPublicCheckpoints = (data: DUICheckpoint[]) => {
    // Public page should only show checkpoints with a real upstream source URL.
    // This prevents demo/seed rows from appearing as “real” checkpoints.
    return data.filter((c) => Boolean(c.source_url));
  };

  const loadCheckpoints = async () => {
    try {
      setLoading(true);
      setError(null);
      try {
        const announcementsData = await getCheckpointAnnouncements();
        setAnnouncements(announcementsData);
      } catch (e) {
        console.warn('Unable to load checkpoint announcements (continuing):', e);
        setAnnouncements([]);
      }
      if (viewMode === 'upcoming') {
        const data = await getUpcomingCheckpoints();
        setCheckpoints(filterPublicCheckpoints(data));
      } else {
        const data = await getRecentCheckpoints(dateRange);
        setCheckpoints(filterPublicCheckpoints(data));
      }
    } catch (error) {
      console.error('Failed to load checkpoints:', error);
      setError('Unable to load checkpoint data. Please try again later.');
      setCheckpoints([]);
      setAnnouncements([]);
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
    setCurrentPage(1); // Reset to first page when filters change
  };

  // Calculate pagination
  const totalPages = Math.ceil(filteredCheckpoints.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedCheckpoints = filteredCheckpoints.slice(startIndex, endIndex);

  const handleHotspotClick = (city: string, county: string) => {
    setSelectedCounty(county);
    setViewMode('all');
  };

  const countiesWithCheckpoints = Array.from(
    new Set(checkpoints.map(c => c.location_county))
  ).sort();

  const openLeadModal = (trigger: typeof leadModalTrigger, checkpointId?: string) => {
    setLeadModalTrigger(trigger);
    setLeadModalCheckpointId(checkpointId);
    setIsLeadModalOpen(true);
  };

  const pendingAnnouncements = announcements.filter(
    (a) => a.status === 'pending_details' && isAnnouncementFreshForPublic(a)
  );

  return (
    <>
      <PageHero
        eyebrow="DUI Resources"
        title="Ohio DUI Checkpoint Map"
        description="Real-time information about sobriety checkpoints across Ohio. Know your rights and plan accordingly."
        ctaLabel="Know Your Rights"
        ctaHref="/ovi-dui-defense-delaware-oh"
        variant="light"
        phoneCtaId="dui_checkpoints_hero_call_office"
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
                  About Ohio DUI Checkpoint Data
                </h2>
                <p className="mb-3 text-sm text-brand-black/80">
                  This map shows <strong>only publicly announced OVI checkpoints</strong> in Ohio from verified sources. Data is compiled from official law enforcement announcements, news outlets, and verified public sources. Not all checkpoints are announced in advance, and this map does not predict or speculate about unannounced locations.
                </p>
                <div className="mb-3 rounded-lg border border-amber-600/20 bg-amber-50 p-3">
                  <p className="text-xs text-amber-900">
                    <strong>Important:</strong> This information is for educational purposes only. DUI checkpoints in Ohio are legal when properly conducted with advance notice, neutral selection methods, and clear markings. Always drive sober and follow traffic laws.
                  </p>
                </div>
                <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center">
                  <a
                    href={`tel:${OFFICE_PHONE_TEL}`}
                    onClick={() => {
                      trackCtaClick('checkpoint_banner_call');
                      trackLeadSubmitted('phone', 'checkpoint_banner_call', {
                        target_number: OFFICE_PHONE_TEL,
                      });
                    }}
                    className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg border border-brand-black/10 bg-white px-4 py-2 text-sm font-semibold text-brand-black transition-colors hover:bg-brand-mango/10"
                    data-cta="checkpoint_banner_call"
                    aria-label={`Call: ${OFFICE_PHONE_DISPLAY}`}
                  >
                    Call {OFFICE_PHONE_DISPLAY}
                  </a>
                  <button
                    type="button"
                    onClick={() => {
                      trackCtaClick('checkpoint_banner_free_consult');
                      openLeadModal('emergency_banner');
                    }}
                    className="inline-flex items-center justify-center whitespace-nowrap rounded-lg bg-brand-mango px-4 py-2 text-sm font-semibold text-brand-black transition-colors hover:bg-brand-gold"
                    data-cta="checkpoint_banner_free_consult"
                  >
                    Free consult
                  </button>
                </div>
                <div className="flex flex-wrap gap-4 text-sm">
                  <a
                    href="/ovi-dui-defense-delaware-oh"
                    className="inline-flex items-center gap-2 font-semibold text-brand-mangoText transition-colors hover:text-brand-leaf"
                  >
                    <Shield className="h-4 w-4" />
                    Know Your Rights
                  </a>
                  <a
                    href="/blog/refuse-field-sobriety-test-ohio"
                    className="inline-flex items-center gap-2 font-semibold text-brand-mangoText transition-colors hover:text-brand-leaf"
                  >
                    <Info className="h-4 w-4" />
                    Field Sobriety Tests
                  </a>
                  <a
                    href="/blog/ohio-dui-checkpoint-hotspots"
                    className="inline-flex items-center gap-2 font-semibold text-brand-mangoText transition-colors hover:text-brand-leaf"
                  >
                    <MapPinned className="h-4 w-4" />
                    Common Checkpoint Hotspots
                  </a>
                </div>
              </div>
            </div>
          </div>

          <CheckpointHotspots onCityClick={handleHotspotClick} />

          <HotspotTeaser />

          <div className="mb-4 flex flex-wrap items-center gap-2">
            <div className="flex gap-1 rounded-lg border border-brand-black/10 bg-brand-offWhite p-1">
              <button
                onClick={() => setViewMode('upcoming')}
                className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-semibold transition-all ${
                  viewMode === 'upcoming'
                    ? 'bg-white text-brand-mangoText shadow-sm'
                    : 'text-brand-black/70 hover:text-brand-mangoText'
                }`}
              >
                <Clock className="h-3.5 w-3.5" />
                Upcoming
              </button>
              <button
                onClick={() => setViewMode('all')}
                className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-semibold transition-all ${
                  viewMode === 'all'
                    ? 'bg-white text-brand-mangoText shadow-sm'
                    : 'text-brand-black/70 hover:text-brand-mangoText'
                }`}
              >
                <Calendar className="h-3.5 w-3.5" />
                All Checkpoints
              </button>
            </div>

            {viewMode === 'all' && (
              <div className="flex gap-1 rounded-lg border border-brand-black/10 bg-brand-offWhite p-1">
                <button
                  onClick={() => setDateRange('30d')}
                  className={`rounded-md px-3 py-1.5 text-sm font-medium transition-all ${
                    dateRange === '30d'
                      ? 'bg-white text-brand-mangoText shadow-sm'
                      : 'text-brand-black/70 hover:text-brand-mangoText'
                  }`}
                >
                  30 Days
                </button>
                <button
                  onClick={() => setDateRange('90d')}
                  className={`rounded-md px-3 py-1.5 text-sm font-medium transition-all ${
                    dateRange === '90d'
                      ? 'bg-white text-brand-mangoText shadow-sm'
                      : 'text-brand-black/70 hover:text-brand-mangoText'
                  }`}
                >
                  90 Days
                </button>
                <button
                  onClick={() => setDateRange('all')}
                  className={`rounded-md px-3 py-1.5 text-sm font-medium transition-all ${
                    dateRange === 'all'
                      ? 'bg-white text-brand-mangoText shadow-sm'
                      : 'text-brand-black/70 hover:text-brand-mangoText'
                  }`}
                >
                  All Time
                </button>
              </div>
            )}
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
            <div className="text-sm text-brand-black/60">
              Showing {filteredCheckpoints.length} checkpoint{filteredCheckpoints.length !== 1 ? 's' : ''}
              {pendingAnnouncements.length > 0
                ? ` • ${pendingAnnouncements.length} pending announcement${pendingAnnouncements.length !== 1 ? 's' : ''}`
                : ''}
            </div>
          </div>

          {pendingAnnouncements.length > 0 && (
            <div className="mb-8 rounded-2xl border border-brand-black/10 bg-brand-offWhite p-5">
              <div className="mb-3 text-sm font-semibold text-brand-black">
                Pending checkpoint announcements (details to be announced)
              </div>
              <div className="space-y-3">
                {pendingAnnouncements.slice(0, 8).map((a) => (
                  <div key={a.id} className="rounded-xl border border-brand-black/10 bg-white px-4 py-3">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="font-semibold text-brand-black">{a.title}</div>
                      <span className="rounded-full bg-brand-mango/15 px-2.5 py-1 text-xs font-semibold text-brand-mangoText">
                        Pending details
                      </span>
                    </div>
                    <div className="mt-1 text-xs text-brand-black/60">
                      {a.event_date ? `Event date: ${new Date(a.event_date).toLocaleDateString()}` : 'Event date: TBD'}
                      {a.location_county ? ` • ${a.location_county} County` : ''}
                      {a.location_city ? ` • ${a.location_city}` : ''}
                    </div>
                    {a.source_url && (
                      <a
                        href={a.source_url}
                        target="_blank"
                        rel="noreferrer"
                        className="mt-2 inline-flex text-xs font-semibold text-brand-mangoText hover:text-brand-leaf"
                      >
                        View source →
                      </a>
                    )}
                  </div>
                ))}
              </div>
              {pendingAnnouncements.length > 8 && (
                <div className="mt-3 text-xs text-brand-black/60">
                  Showing 8 of {pendingAnnouncements.length}. More will appear as details are confirmed.
                </div>
              )}
            </div>
          )}

          <div className="grid gap-8 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <div className="mb-6 h-[400px] lg:h-[400px]">
                <CheckpointMap
                  checkpoints={filteredCheckpoints}
                  selectedCheckpoint={selectedCheckpoint}
                  onCheckpointSelect={setSelectedCheckpoint}
                  now={now}
                />
              </div>

              <div className="mt-6">
                <h3 className="mb-4 text-lg font-bold text-brand-black">
                  {viewMode === 'upcoming' ? 'Upcoming Checkpoints' : 'All Checkpoints'}
                </h3>
                <div>
                  {loading ? (
                    <div className="rounded-2xl border border-brand-black/10 bg-brand-offWhite p-12 text-center">
                      <div className="inline-flex h-12 w-12 animate-spin items-center justify-center rounded-full border-4 border-brand-mango/20 border-t-brand-mango" />
                      <p className="mt-4 text-sm text-brand-black/70">Loading checkpoints...</p>
                    </div>
                  ) : error ? (
                    <div className="rounded-2xl border border-red-200 bg-red-50 p-12 text-center">
                      <div className="mb-4 flex justify-center">
                        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
                          <AlertTriangle className="h-8 w-8 text-red-600" />
                        </div>
                      </div>
                      <h3 className="mb-2 text-lg font-bold text-brand-black">
                        Error Loading Checkpoints
                      </h3>
                      <p className="mb-4 text-sm text-brand-black/70">{error}</p>
                      <button
                        onClick={loadCheckpoints}
                        className="rounded-lg bg-brand-mango px-6 py-2 text-sm font-semibold text-brand-black transition-colors hover:bg-brand-leaf hover:text-white"
                      >
                        Try Again
                      </button>
                    </div>
                  ) : filteredCheckpoints.length > 0 ? (
                    <>
                      <div className="mb-4 text-sm text-brand-black/60">
                        Showing {startIndex + 1}-{Math.min(endIndex, filteredCheckpoints.length)} of {filteredCheckpoints.length}
                      </div>
                      <div className="grid gap-6">
                        {paginatedCheckpoints.map((checkpoint) => (
                          <CheckpointCard
                            key={checkpoint.id}
                            checkpoint={checkpoint}
                            onClick={() => setSelectedCheckpoint(checkpoint)}
                            onOpenLeadModal={openLeadModal}
                            now={now}
                          />
                        ))}
                      </div>
                      {totalPages > 1 && (
                        <div className="mt-8 flex items-center justify-center gap-2">
                          <button
                            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                            disabled={currentPage === 1}
                            className="rounded-lg border border-brand-black/10 bg-white px-4 py-2 text-sm font-semibold text-brand-black transition-all hover:bg-brand-mango hover:text-brand-black disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-white disabled:hover:text-brand-black"
                          >
                            Previous
                          </button>
                          <div className="flex gap-1">
                            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
                              // Show first page, last page, current page, and pages around current
                              const showPage = page === 1 ||
                                              page === totalPages ||
                                              (page >= currentPage - 1 && page <= currentPage + 1);

                              if (!showPage && page === 2) {
                                return <span key={page} className="px-2 text-brand-black/40">...</span>;
                              }
                              if (!showPage && page === totalPages - 1) {
                                return <span key={page} className="px-2 text-brand-black/40">...</span>;
                              }
                              if (!showPage) {
                                return null;
                              }

                              return (
                                <button
                                  key={page}
                                  onClick={() => setCurrentPage(page)}
                                  className={`h-10 w-10 rounded-lg text-sm font-semibold transition-all ${
                                    currentPage === page
                                      ? 'bg-brand-mango text-brand-black shadow-sm'
                                      : 'border border-brand-black/10 bg-white text-brand-black hover:bg-brand-mango/10'
                                  }`}
                                >
                                  {page}
                                </button>
                              );
                            })}
                          </div>
                          <button
                            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                            disabled={currentPage === totalPages}
                            className="rounded-lg border border-brand-black/10 bg-white px-4 py-2 text-sm font-semibold text-brand-black transition-all hover:bg-brand-mango hover:text-brand-black disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-white disabled:hover:text-brand-black"
                          >
                            Next
                          </button>
                        </div>
                      )}
                    </>
                  ) : (
                    <div className="rounded-2xl border border-brand-black/10 bg-brand-offWhite p-12 text-center">
                      <div className="mb-4 flex justify-center">
                        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-brand-leaf/10">
                          <MapPinned className="h-8 w-8 text-brand-leaf" />
                        </div>
                      </div>
                      <h3 className="mb-2 text-lg font-bold text-brand-black">
                        No announced checkpoints at this time
                      </h3>
                      <p className="text-sm text-brand-black/80 max-w-md mx-auto">
                        {selectedCounty === 'all'
                          ? 'We have not detected any officially announced OVI checkpoints scheduled for this period. Please check back later or follow local law enforcement for real-time updates.'
                          : `There are currently no scheduled checkpoints detected in ${selectedCounty} County.`}
                      </p>
                      <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
                        {selectedCounty !== 'all' && (
                          <button
                            onClick={() => setSelectedCounty('all')}
                            className="text-sm font-semibold text-brand-mango hover:text-brand-leaf transition-colors"
                          >
                            View all counties
                          </button>
                        )}
                        <a 
                          href="/contact" 
                          className="text-sm font-semibold bg-brand-mango/10 text-brand-mangoText px-4 py-2 rounded-lg hover:bg-brand-mango/20 transition-colors"
                        >
                          Contact office for legal help
                        </a>
                      </div>
                    </div>
                  )}
                </div>
              </div>
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
        secondaryLabel={`Call ${OFFICE_PHONE_DISPLAY}`}
        secondaryHref={`tel:${OFFICE_PHONE_TEL}`}
        secondaryCtaId="dui_checkpoints_cta_call_office"
      />

      <LeadCaptureModal
        isOpen={isLeadModalOpen}
        onClose={() => setIsLeadModalOpen(false)}
        trigger={leadModalTrigger}
        checkpointId={leadModalCheckpointId}
      />
    </>
  );
}
