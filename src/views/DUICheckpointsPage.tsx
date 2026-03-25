'use client';

import Link from 'next/link';
import { useCallback, useEffect, useState } from 'react';
import {
  AlertTriangle,
  Calendar,
  Clock,
  Filter,
  Info,
  MapPinned,
  Shield,
} from 'lucide-react';
import PageHero from '../components/PageHero';
import CheckpointCard from '../components/CheckpointCard';
import CheckpointMap from '../components/CheckpointMap';
import CheckpointHotspots from '../components/CheckpointHotspots';
import FAQSection from '../components/FAQSection';
import LeadCaptureModal from '../components/LeadCaptureModal';
import { getUpcomingCheckpoints, getRecentCheckpoints, type DateRangeOption } from '../lib/checkpointService';
import { duiCheckpointMapFaqs } from '../data/duiCheckpointMapFaqs';
import type { DUICheckpoint } from '../data/checkpoints';
import {
  getCheckpointAnnouncements,
  isAnnouncementFreshForPublic,
  type CheckpointAnnouncement,
} from '../lib/checkpointAnnouncementsService';
import { formatCalendarDate } from '../lib/formatting';
import { OFFICE_PHONE_DISPLAY, OFFICE_PHONE_TEL } from '../lib/contactInfo';
import { trackCtaClick, trackLeadSubmitted } from '../lib/analytics';
import { SEO } from '../lib/seo';

type ViewMode = 'upcoming' | 'all';

const relatedResources = [
  {
    label: 'OVI / DUI defense overview',
    href: '/ovi-dui-defense-delaware-oh',
    description: 'Start with the broad overview if you need to understand the full case path.',
  },
  {
    label: 'Refusing field sobriety tests',
    href: '/blog/refuse-field-sobriety-test-ohio',
    description: 'A practical guide to roadside tests and what officers are looking for.',
  },
  {
    label: 'Ohio checkpoint hotspots',
    href: '/blog/ohio-dui-checkpoint-hotspots',
    description: 'Context on where checkpoints tend to be announced and how patterns usually look.',
  },
];

const stopChecklist = [
  'Save the paperwork, especially the citation and any BMV suspension forms.',
  'Write down what happened while the timing and officer instructions are still fresh.',
  'Do not assume the checkpoint stop itself makes the charge automatic or unbeatable.',
];

export default function DUICheckpointsPage({ renderedAt }: { renderedAt: string }) {
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
  const [leadModalTrigger, setLeadModalTrigger] = useState<
    'emergency_banner' | 'checkpoint_card' | 'lead_magnet' | 'exit_intent' | 'hotspot_specific'
  >('emergency_banner');
  const [leadModalCheckpointId, setLeadModalCheckpointId] = useState<string | undefined>();
  const [now, setNow] = useState<Date>(() => new Date(renderedAt));

  const itemsPerPage = 15;

  useEffect(() => {
    setNow(new Date());

    const intervalId = window.setInterval(() => {
      setNow(new Date());
    }, 60_000);

    return () => window.clearInterval(intervalId);
  }, [renderedAt]);

  const filterPublicCheckpoints = useCallback((data: DUICheckpoint[]) => {
    return data.filter((checkpoint) => Boolean(checkpoint.source_url));
  }, []);

  const loadCheckpoints = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      try {
        const announcementsData = await getCheckpointAnnouncements();
        setAnnouncements(announcementsData);
      } catch (announcementError) {
        console.warn('Unable to load checkpoint announcements (continuing):', announcementError);
        setAnnouncements([]);
      }

      const data =
        viewMode === 'upcoming'
          ? await getUpcomingCheckpoints()
          : await getRecentCheckpoints(dateRange);

      setCheckpoints(filterPublicCheckpoints(data));
    } catch (loadError) {
      console.error('Failed to load checkpoints:', loadError);
      setError('Unable to load checkpoint data right now. Please try again in a few minutes.');
      setCheckpoints([]);
      setAnnouncements([]);
    } finally {
      setLoading(false);
    }
  }, [dateRange, filterPublicCheckpoints, viewMode]);

  const filterCheckpoints = useCallback(() => {
    let next = checkpoints;

    if (selectedCounty !== 'all') {
      next = next.filter((checkpoint) => checkpoint.location_county === selectedCounty);
    }

    setFilteredCheckpoints(next);
    setCurrentPage(1);
  }, [checkpoints, selectedCounty]);

  useEffect(() => {
    void loadCheckpoints();
  }, [loadCheckpoints]);

  useEffect(() => {
    filterCheckpoints();
  }, [filterCheckpoints]);

  const totalPages = Math.ceil(filteredCheckpoints.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedCheckpoints = filteredCheckpoints.slice(startIndex, endIndex);

  const pendingAnnouncements = announcements.filter(
    (announcement) =>
      announcement.status === 'pending_details' && isAnnouncementFreshForPublic(announcement),
  );

  const countiesWithCheckpoints = Array.from(
    new Set(checkpoints.map((checkpoint) => checkpoint.location_county)),
  ).sort();

  const openLeadModal = (
    trigger: typeof leadModalTrigger,
    checkpointId?: string,
  ) => {
    setLeadModalTrigger(trigger);
    setLeadModalCheckpointId(checkpointId);
    setIsLeadModalOpen(true);
  };

  const handleHotspotClick = (_city: string, county: string) => {
    setSelectedCounty(county);
    setViewMode('all');
  };

  return (
    <>
      <SEO
        title="Ohio DUI Checkpoint Map and Guide | Announced Checkpoints"
        description="Browse announced Ohio DUI checkpoints, understand how checkpoint stops work, and review your rights after an OVI checkpoint stop."
        breadcrumbs={[
          { name: 'Home', item: '/' },
          { name: 'DUI Checkpoints', item: '/resources/dui-checkpoints' },
        ]}
      />

      <PageHero
        eyebrow="Ohio DUI Checkpoint Guide"
        title="Announced checkpoints, practical context, and what to do if you were stopped."
        description="Use this page to review public checkpoint notices, understand how Ohio checkpoint stops work, and get oriented before you decide what needs attention next."
        ctaLabel="Talk Through Your Stop"
        ctaHref="/contact"
        variant="light"
        compact
        showQuickActions={false}
        phoneCtaId="dui_checkpoints_hero_call_office"
      />

      <section className="bg-white">
        <div className="container grid gap-6 py-10 lg:grid-cols-[1.15fr_0.85fr] lg:py-12">
          <div className="rounded-[1.75rem] border border-brand-black/10 bg-brand-offWhite/55 p-6 shadow-soft">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-brand-mango/15 text-brand-mangoText">
                <Info className="h-6 w-6" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-brand-black">What this page is for</h2>
                <p className="mt-3 text-sm leading-relaxed text-brand-black/72">
                  This guide shows <strong>publicly announced Ohio OVI checkpoints</strong> gathered from official notices and other public reporting. It is meant to help you understand the context around a stop, not to predict future enforcement or speculate about unannounced checkpoints.
                </p>
                <div className="mt-4 rounded-2xl border border-amber-500/25 bg-amber-50 p-4 text-sm text-amber-950">
                  Checkpoints can be lawful in Ohio when they follow the required procedures. This page is educational, not legal advice, and it should not be treated as a live enforcement alert system.
                </div>
                <div className="mt-5 flex flex-wrap gap-3">
                  <Link
                    href="/ovi-dui-defense-delaware-oh"
                    className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-brand-mangoText shadow-soft transition-colors hover:bg-brand-mango/10"
                  >
                    <Shield className="h-4 w-4" />
                    OVI defense overview
                  </Link>
                  <Link
                    href="/blog/refuse-field-sobriety-test-ohio"
                    className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-brand-mangoText shadow-soft transition-colors hover:bg-brand-mango/10"
                  >
                    <Info className="h-4 w-4" />
                    Field sobriety guide
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-[1.75rem] border border-brand-black/10 bg-white p-6 shadow-soft">
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-brand-goldText">
              If you were stopped
            </p>
            <h2 className="mt-3 text-xl font-bold text-brand-black">Focus on the details that will matter later.</h2>
            <ul className="mt-5 space-y-3 text-sm leading-relaxed text-brand-black/68">
              {stopChecklist.map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="mt-1 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-mango/15 text-[11px] font-bold text-brand-mangoText">
                    ✓
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <div className="mt-6 grid gap-3">
              <a
                href={`tel:${OFFICE_PHONE_TEL}`}
                onClick={() => {
                  trackCtaClick('checkpoint_banner_call');
                  trackLeadSubmitted('phone', 'checkpoint_banner_call', {
                    target_number: OFFICE_PHONE_TEL,
                  });
                }}
                className="inline-flex items-center justify-center rounded-full border border-brand-leaf/25 bg-white px-4 py-3 text-sm font-semibold text-brand-forest transition-colors hover:border-brand-leaf hover:bg-brand-leaf hover:text-white"
                data-cta="checkpoint_banner_call"
              >
                Call/Text {OFFICE_PHONE_DISPLAY}
              </a>
              <button
                type="button"
                onClick={() => {
                  trackCtaClick('checkpoint_banner_free_consult');
                  openLeadModal('emergency_banner');
                }}
                className="rounded-full bg-brand-mango px-4 py-3 text-sm font-semibold text-brand-black transition-colors hover:bg-brand-gold"
                data-cta="checkpoint_banner_free_consult"
              >
                Request a case review
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="section bg-brand-offWhite/45">
        <div className="container">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap gap-2">
              <div className="flex gap-1 rounded-full border border-brand-black/10 bg-white p-1 shadow-soft">
                <button
                  onClick={() => setViewMode('upcoming')}
                  className={`flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-semibold transition-all ${
                    viewMode === 'upcoming'
                      ? 'bg-brand-mango text-brand-black shadow-sm'
                      : 'text-brand-black/70 hover:text-brand-mangoText'
                  }`}
                >
                  <Clock className="h-3.5 w-3.5" />
                  Upcoming
                </button>
                <button
                  onClick={() => setViewMode('all')}
                  className={`flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-semibold transition-all ${
                    viewMode === 'all'
                      ? 'bg-brand-mango text-brand-black shadow-sm'
                      : 'text-brand-black/70 hover:text-brand-mangoText'
                  }`}
                >
                  <Calendar className="h-3.5 w-3.5" />
                  All notices
                </button>
              </div>

              {viewMode === 'all' && (
                <div className="flex gap-1 rounded-full border border-brand-black/10 bg-white p-1 shadow-soft">
                  {(['30d', '90d', 'all'] as const).map((range) => (
                    <button
                      key={range}
                      onClick={() => setDateRange(range)}
                      className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
                        dateRange === range
                          ? 'bg-brand-black text-white'
                          : 'text-brand-black/70 hover:text-brand-mangoText'
                      }`}
                    >
                      {range === 'all' ? 'All time' : range === '30d' ? '30 days' : '90 days'}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 rounded-full border border-brand-black/10 bg-white px-4 py-2 shadow-soft">
                <Filter className="h-4 w-4 text-brand-mango" />
                <select
                  value={selectedCounty}
                  onChange={(event) => setSelectedCounty(event.target.value)}
                  className="border-none bg-transparent pr-6 text-sm font-medium text-brand-black focus:outline-none focus:ring-0"
                >
                  <option value="all">
                    {loading ? 'All Counties' : `All Counties (${checkpoints.length})`}
                  </option>
                  {countiesWithCheckpoints.map((county) => {
                    const count = checkpoints.filter((checkpoint) => checkpoint.location_county === county).length;
                    return (
                      <option key={county} value={county}>
                        {county} County ({count})
                      </option>
                    );
                  })}
                </select>
              </div>
              <div className="text-sm text-brand-black/60">
                {loading
                  ? 'Loading checkpoint notices...'
                  : `${filteredCheckpoints.length} announced checkpoint${filteredCheckpoints.length === 1 ? '' : 's'} shown`}
              </div>
            </div>
          </div>

          {pendingAnnouncements.length > 0 && (
            <div className="mb-6 rounded-[1.5rem] border border-brand-black/10 bg-white p-5 shadow-soft">
              <div className="flex items-center gap-2 text-sm font-semibold text-brand-black">
                <AlertTriangle className="h-4 w-4 text-brand-mangoText" />
                Pending public announcements
              </div>
              <div className="mt-4 grid gap-3 md:grid-cols-2">
                {pendingAnnouncements.slice(0, 6).map((announcement) => (
                  <div key={announcement.id} className="rounded-2xl border border-brand-black/8 bg-brand-offWhite/45 px-4 py-3">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-sm font-semibold text-brand-black">{announcement.title}</p>
                        <p className="mt-1 text-xs text-brand-black/58">
                          {announcement.event_date
                            ? `Event date: ${formatCalendarDate(announcement.event_date)}`
                            : 'Event date: To be announced'}
                          {announcement.location_county ? ` • ${announcement.location_county} County` : ''}
                          {announcement.location_city ? ` • ${announcement.location_city}` : ''}
                        </p>
                      </div>
                      <span className="rounded-full bg-brand-mango/14 px-2.5 py-1 text-[11px] font-semibold text-brand-mangoText">
                        Pending details
                      </span>
                    </div>
                    {announcement.source_url && (
                      <a
                        href={announcement.source_url}
                        target="_blank"
                        rel="noopener noreferrer nofollow"
                        className="mt-3 inline-flex text-xs font-semibold text-brand-mangoText transition-colors hover:text-brand-leaf"
                      >
                        View source →
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="grid gap-8 lg:grid-cols-[1.25fr_0.75fr] lg:items-start">
            <div className="space-y-6">
              <div className="overflow-hidden rounded-[1.75rem] border border-brand-black/10 bg-white shadow-soft">
                <div className="border-b border-brand-black/8 px-5 py-4">
                  <h2 className="text-lg font-bold text-brand-black">Checkpoint map and notice list</h2>
                  <p className="mt-1 text-sm text-brand-black/62">
                    Use the map for context, then scroll the list for dates, counties, sources, and related stop details.
                  </p>
                </div>
                <div className="h-[420px]">
                  <CheckpointMap
                    checkpoints={filteredCheckpoints}
                    selectedCheckpoint={selectedCheckpoint}
                    onCheckpointSelect={setSelectedCheckpoint}
                    now={now}
                  />
                </div>
              </div>

              <div className="rounded-[1.75rem] border border-brand-black/10 bg-white p-5 shadow-soft">
                <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
                  <div>
                    <h3 className="text-lg font-bold text-brand-black">
                      {viewMode === 'upcoming' ? 'Upcoming checkpoint notices' : 'Announced checkpoint archive'}
                    </h3>
                    <p className="mt-1 text-sm text-brand-black/62">
                      Review the announced locations, keep the source, and note anything that stands out about the stop or timing.
                    </p>
                  </div>
                  {!loading && filteredCheckpoints.length > 0 && (
                    <div className="text-sm text-brand-black/58">
                      Showing {startIndex + 1}-{Math.min(endIndex, filteredCheckpoints.length)} of {filteredCheckpoints.length}
                    </div>
                  )}
                </div>

                {loading ? (
                  <div className="rounded-[1.5rem] border border-brand-black/8 bg-brand-offWhite/55 p-12 text-center">
                    <div className="inline-flex h-12 w-12 animate-spin items-center justify-center rounded-full border-4 border-brand-mango/20 border-t-brand-mango" />
                    <p className="mt-4 text-sm text-brand-black/65">Loading announced checkpoint data...</p>
                  </div>
                ) : error ? (
                  <div className="rounded-[1.5rem] border border-red-200 bg-red-50 p-12 text-center">
                    <div className="mb-4 flex justify-center">
                      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
                        <AlertTriangle className="h-8 w-8 text-red-600" />
                      </div>
                    </div>
                    <h3 className="mb-2 text-lg font-bold text-brand-black">Error loading checkpoint notices</h3>
                    <p className="mb-4 text-sm text-brand-black/70">{error}</p>
                    <button
                      onClick={loadCheckpoints}
                      className="rounded-full bg-brand-mango px-6 py-2.5 text-sm font-semibold text-brand-black transition-colors hover:bg-brand-gold"
                    >
                      Try again
                    </button>
                  </div>
                ) : filteredCheckpoints.length > 0 ? (
                  <>
                    <div className="grid gap-5">
                      {paginatedCheckpoints.map((checkpoint) => (
                        <CheckpointCard
                          key={checkpoint.id}
                          checkpoint={checkpoint}
                          now={now}
                          onClick={() => setSelectedCheckpoint(checkpoint)}
                          onOpenLeadModal={openLeadModal}
                        />
                      ))}
                    </div>

                    {totalPages > 1 && (
                      <div className="mt-8 flex items-center justify-center gap-2">
                        <button
                          onClick={() => setCurrentPage((page) => Math.max(1, page - 1))}
                          disabled={currentPage === 1}
                          className="rounded-full border border-brand-black/10 bg-white px-4 py-2 text-sm font-semibold text-brand-black transition-all hover:bg-brand-mango hover:text-brand-black disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-white disabled:hover:text-brand-black"
                        >
                          Previous
                        </button>

                        <div className="flex gap-1">
                          {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => {
                            const showPage =
                              page === 1 ||
                              page === totalPages ||
                              (page >= currentPage - 1 && page <= currentPage + 1);

                            if (!showPage && page === 2) {
                              return (
                                <span key={page} className="px-2 text-brand-black/40">
                                  ...
                                </span>
                              );
                            }

                            if (!showPage && page === totalPages - 1) {
                              return (
                                <span key={page} className="px-2 text-brand-black/40">
                                  ...
                                </span>
                              );
                            }

                            if (!showPage) return null;

                            return (
                              <button
                                key={page}
                                onClick={() => setCurrentPage(page)}
                                className={`h-10 w-10 rounded-full text-sm font-semibold transition-all ${
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
                          onClick={() => setCurrentPage((page) => Math.min(totalPages, page + 1))}
                          disabled={currentPage === totalPages}
                          className="rounded-full border border-brand-black/10 bg-white px-4 py-2 text-sm font-semibold text-brand-black transition-all hover:bg-brand-mango hover:text-brand-black disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-white disabled:hover:text-brand-black"
                        >
                          Next
                        </button>
                      </div>
                    )}
                  </>
                ) : (
                  <div className="rounded-[1.5rem] border border-brand-black/8 bg-brand-offWhite/55 p-12 text-center">
                    <div className="mb-4 flex justify-center">
                      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-brand-leaf/10">
                        <MapPinned className="h-8 w-8 text-brand-leaf" />
                      </div>
                    </div>
                    <h3 className="mb-2 text-lg font-bold text-brand-black">No announced checkpoints right now</h3>
                    <p className="mx-auto max-w-md text-sm text-brand-black/72">
                      {selectedCounty === 'all'
                        ? 'There are no public checkpoint notices matching this time window. Check back later or follow local reporting for new announcements.'
                        : `There are no current notices matching ${selectedCounty} County.`}
                    </p>
                    <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
                      {selectedCounty !== 'all' && (
                        <button
                          onClick={() => setSelectedCounty('all')}
                          className="text-sm font-semibold text-brand-mangoText transition-colors hover:text-brand-leaf"
                        >
                          View all counties
                        </button>
                      )}
                      <Link
                        href="/contact"
                        className="rounded-full bg-brand-mango/12 px-4 py-2 text-sm font-semibold text-brand-mangoText transition-colors hover:bg-brand-mango/20"
                      >
                        Contact the office
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-6 lg:sticky lg:top-24">
              <div className="rounded-[1.75rem] border border-brand-black/10 bg-white p-6 shadow-soft">
                <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-brand-goldText">
                  Use this page for
                </p>
                <ul className="mt-4 space-y-3 text-sm leading-relaxed text-brand-black/68">
                  <li>Checking whether a checkpoint notice appears to have been publicly announced.</li>
                  <li>Saving the source and timing details before they disappear from local coverage.</li>
                  <li>Getting to the right OVI resources faster if the stop already happened.</li>
                </ul>
              </div>

              <div className="rounded-[1.75rem] border border-brand-black/10 bg-white p-6 shadow-soft">
                <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-brand-goldText">
                  Related OVI resources
                </p>
                <div className="mt-4 space-y-3">
                  {relatedResources.map((resource) => (
                    <Link
                      key={resource.href}
                      href={resource.href}
                      className="block rounded-2xl border border-brand-black/8 bg-brand-offWhite/45 px-4 py-3 transition-colors hover:bg-brand-mango/8"
                    >
                      <div className="text-sm font-semibold text-brand-black">{resource.label}</div>
                      <div className="mt-1 text-xs leading-relaxed text-brand-black/60">{resource.description}</div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section bg-white">
        <div className="container">
          <CheckpointHotspots onCityClick={handleHotspotClick} />
        </div>
      </section>

      <FAQSection faqs={duiCheckpointMapFaqs} title="Ohio DUI checkpoint guide FAQ" />

      <LeadCaptureModal
        isOpen={isLeadModalOpen}
        onClose={() => setIsLeadModalOpen(false)}
        trigger={leadModalTrigger}
        checkpointId={leadModalCheckpointId}
      />
    </>
  );
}
