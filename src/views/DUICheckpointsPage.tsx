'use client';

import { useState, useEffect, useCallback, useMemo, useRef, type ReactNode } from 'react';
import dynamic from 'next/dynamic';
import { AlertTriangle, Filter, MapPinned, Shield, Info, Calendar, Clock } from 'lucide-react';
import PageHero from '../components/PageHero';
import CheckpointCard from '../components/CheckpointCard';
import CheckpointHotspots from '../components/CheckpointHotspots';
import CTASection from '../components/CTASection';
import BlogSidebar from '../components/BlogSidebar';
import FAQSection from '../components/FAQSection';
import { duiCheckpointMapFaqs } from '../data/duiCheckpointMapFaqs';
import {
  getUpcomingCheckpoints,
  getRecentCheckpoints,
  type CheckpointHotspot,
  type DateRangeOption,
} from '../lib/checkpointService';
import { isApproximateCheckpointLocation, type DUICheckpoint } from '../data/checkpoints';
import LeadCaptureModal from '../components/LeadCaptureModal';
import { getCheckpointAnnouncements, isAnnouncementFreshForPublic, type CheckpointAnnouncement } from '../lib/checkpointAnnouncementsService';
import { OFFICE_PHONE_DISPLAY, OFFICE_PHONE_TEL } from '../lib/contactInfo';
import { trackCtaClick, trackLeadSubmitted } from '../lib/analytics';
import { SEO } from '../lib/seo';
import { formatCalendarDate } from '../lib/formatting';

type ViewMode = 'upcoming' | 'all';

const CheckpointMap = dynamic(() => import('../components/CheckpointMap'), {
  ssr: false,
  loading: () => (
    <div className="flex h-full items-center justify-center rounded-2xl border border-brand-black/10 bg-brand-offWhite px-6 text-center text-sm text-brand-black/70">
      Loading interactive checkpoint map...
    </div>
  ),
});

const seasonalEnforcementWindows = [
  {
    title: "St. Patrick's Day",
    description: 'A frequent spring enforcement window because daytime drinking, downtown traffic, and late-night rides home all increase.',
  },
  {
    title: 'Cinco de Mayo and early May weekends',
    description: 'Late-April and early-May social traffic can bring fresh checkpoint announcements, saturation patrols, and short-notice agency updates.',
  },
  {
    title: 'Memorial Day to July 4th',
    description: 'Warm-weather travel and lake/weekend traffic often bring heavier patrol activity and more roadside enforcement messaging.',
  },
  {
    title: 'Labor Day and fall football weekends',
    description: 'Game-day traffic and holiday travel can make these weekends more active for OVI patrols and checkpoint publicity.',
  },
  {
    title: "Thanksgiving through New Year's",
    description: 'This is usually the strongest seasonal enforcement stretch, with parties, long-distance travel, and grant-funded overtime.',
  },
];

function formatDisplayDate(value: string | null | undefined): string | null {
  if (!value) return null;
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return null;
  return formatCalendarDate(value);
}

function parseTimestamp(value: string | null | undefined): number | null {
  if (!value) return null;
  const parsed = new Date(value).getTime();
  return Number.isNaN(parsed) ? null : parsed;
}

function buildLocationLabel(city?: string | null, county?: string | null): string | null {
  const normalizedCity = city?.trim() || null;
  const normalizedCounty = county?.trim() || null;
  const cityLooksRedundant =
    normalizedCity &&
    normalizedCounty &&
    normalizedCity.toLowerCase() === normalizedCounty.toLowerCase();

  const parts = [
    normalizedCounty ? `${normalizedCounty} County` : null,
    cityLooksRedundant ? null : normalizedCity,
  ].filter(Boolean);

  return parts.length > 0 ? parts.join(' • ') : null;
}

function normalizeSourceLabel(sourceName: string | null | undefined): string {
  if (!sourceName) return 'Public checkpoint source';
  if (/ovicheckpoint/i.test(sourceName)) return 'Public checkpoint listing';
  if (/duiblock/i.test(sourceName)) return 'Checkpoint watch source';
  return sourceName;
}

type PublicSourceSnapshot = {
  key: string;
  title: string;
  sourceName: string;
  sourceUrl: string;
  publishedDate: string;
  locationLabel: string | null;
  note: string;
};

type DUICheckpointsPageProps = {
  initialAnnouncements: CheckpointAnnouncement[];
  initialCheckpoints: DUICheckpoint[];
  initialHotspots: CheckpointHotspot[];
  initialViewMode: ViewMode;
  initialDateRange: DateRangeOption;
  initialUsedHistoryFallback: boolean;
};

function DeferredRender({
  children,
  className,
  minHeight = 360,
}: {
  children: ReactNode;
  className?: string;
  minHeight?: number;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    if (shouldRender) {
      return;
    }

    const node = containerRef.current;
    if (!node) {
      return;
    }

    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
      setShouldRender(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) {
          return;
        }

        setShouldRender(true);
        observer.disconnect();
      },
      { rootMargin: '240px 0px' },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [shouldRender]);

  return (
    <div ref={containerRef} className={className}>
      {shouldRender ? (
        children
      ) : (
        <div
          className="flex h-full items-center justify-center rounded-[24px] border border-brand-black/10 bg-brand-offWhite px-6 text-center text-sm text-brand-black/70"
          style={{ minHeight }}
        >
          Loading interactive checkpoint map...
        </div>
      )}
    </div>
  );
}

export default function DUICheckpointsPage({
  initialAnnouncements,
  initialCheckpoints,
  initialHotspots,
  initialViewMode,
  initialDateRange,
  initialUsedHistoryFallback,
}: DUICheckpointsPageProps) {
  const [checkpoints, setCheckpoints] = useState<DUICheckpoint[]>(initialCheckpoints);
  const [announcements, setAnnouncements] = useState<CheckpointAnnouncement[]>(initialAnnouncements);
  const [selectedCounty, setSelectedCounty] = useState<string>('all');
  const [selectedCheckpoint, setSelectedCheckpoint] = useState<DUICheckpoint | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>(initialViewMode);
  const [dateRange, setDateRange] = useState<DateRangeOption>(initialDateRange);
  const [usedHistoryFallback, setUsedHistoryFallback] = useState(initialUsedHistoryFallback);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLeadModalOpen, setIsLeadModalOpen] = useState(false);
  const [leadModalTrigger, setLeadModalTrigger] = useState<'emergency_banner' | 'checkpoint_card' | 'lead_magnet' | 'exit_intent' | 'hotspot_specific'>('emergency_banner');
  const [leadModalCheckpointId, setLeadModalCheckpointId] = useState<string | undefined>();
  const [now, setNow] = useState<Date | undefined>(undefined);
  const hasHydratedRef = useRef(false);
  const itemsPerPage = 15;

  useEffect(() => {
    setNow(new Date());
    const id = window.setInterval(() => setNow(new Date()), 60_000);
    return () => window.clearInterval(id);
  }, []);

  const filterPublicCheckpoints = useCallback((data: DUICheckpoint[]) => {
    // Public page should only show checkpoints with a real upstream source URL.
    // This prevents demo/seed rows from appearing as “real” checkpoints.
    return data.filter((c) => Boolean(c.source_url));
  }, []);

  const loadCheckpoints = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const announcementsPromise = getCheckpointAnnouncements().catch((fetchError) => {
        console.warn('Unable to load checkpoint announcements (continuing):', fetchError);
        return [] as CheckpointAnnouncement[];
      });

      if (viewMode === 'upcoming') {
        const [announcementsData, data] = await Promise.all([announcementsPromise, getUpcomingCheckpoints()]);
        setAnnouncements(announcementsData);

        const freshPendingAnnouncementsCount = announcementsData.filter(
          (announcement) =>
            announcement.status === 'pending_details' && isAnnouncementFreshForPublic(announcement),
        ).length;
        const upcomingCheckpoints = filterPublicCheckpoints(data);

        if (upcomingCheckpoints.length === 0 && freshPendingAnnouncementsCount === 0 && !usedHistoryFallback) {
          const recentHistory = filterPublicCheckpoints(await getRecentCheckpoints('90d'));
          const allHistory =
            recentHistory.length > 0
              ? recentHistory
              : filterPublicCheckpoints(await getRecentCheckpoints('all'));
          const fallbackRange = recentHistory.length > 0 ? '90d' : 'all';

          setCheckpoints(allHistory);
          setDateRange(fallbackRange);
          setUsedHistoryFallback(true);
          setViewMode('all');
          return;
        }

        setCheckpoints(upcomingCheckpoints);
      } else {
        const [announcementsData, data] = await Promise.all([
          announcementsPromise,
          getRecentCheckpoints(dateRange),
        ]);
        setAnnouncements(announcementsData);
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
  }, [dateRange, filterPublicCheckpoints, usedHistoryFallback, viewMode]);

  useEffect(() => {
    if (!hasHydratedRef.current) {
      hasHydratedRef.current = true;
      return;
    }

    loadCheckpoints();
  }, [loadCheckpoints]);

  useEffect(() => {
    setCurrentPage(1);
  }, [checkpoints, selectedCounty]);

  const filteredCheckpoints = useMemo(() => {
    if (selectedCounty === 'all') {
      return checkpoints;
    }

    return checkpoints.filter((checkpoint) => checkpoint.location_county === selectedCounty);
  }, [checkpoints, selectedCounty]);

  const countyCounts = useMemo(() => {
    return checkpoints.reduce<Record<string, number>>((counts, checkpoint) => {
      if (!checkpoint.location_county) {
        return counts;
      }

      counts[checkpoint.location_county] = (counts[checkpoint.location_county] ?? 0) + 1;
      return counts;
    }, {});
  }, [checkpoints]);

  useEffect(() => {
    if (selectedCounty !== 'all' && !countyCounts[selectedCounty]) {
      setSelectedCounty('all');
    }
  }, [countyCounts, selectedCounty]);

  // Calculate pagination
  const totalPages = Math.ceil(filteredCheckpoints.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedCheckpoints = filteredCheckpoints.slice(startIndex, endIndex);

  const handleHotspotClick = (_city: string, county: string) => {
    setSelectedCounty(county);
    setViewMode('all');
  };

  const countiesWithCheckpoints = useMemo(
    () => Object.keys(countyCounts).sort(),
    [countyCounts],
  );

  const openLeadModal = (trigger: typeof leadModalTrigger, checkpointId?: string) => {
    setLeadModalTrigger(trigger);
    setLeadModalCheckpointId(checkpointId);
    setIsLeadModalOpen(true);
  };

  const pendingAnnouncements = announcements.filter(
    (a) => a.status === 'pending_details' && isAnnouncementFreshForPublic(a)
  );

  const latestAnnouncement = useMemo(() => {
    return [...announcements].sort((a, b) => {
      const aTime = new Date(a.announcement_date || a.created_at).getTime();
      const bTime = new Date(b.announcement_date || b.created_at).getTime();
      return bTime - aTime;
    })[0] ?? null;
  }, [announcements]);

  const latestConfirmedCheckpoint = useMemo(() => {
    return [...checkpoints].sort((a, b) => {
      const aTime = new Date(a.start_date || a.created_at || 0).getTime();
      const bTime = new Date(b.start_date || b.created_at || 0).getTime();
      return bTime - aTime;
    })[0] ?? null;
  }, [checkpoints]);

  const approximateMarkerCount = useMemo(
    () => filteredCheckpoints.filter((checkpoint) => isApproximateCheckpointLocation(checkpoint)).length,
    [filteredCheckpoints]
  );

  const recentPublicReferences = useMemo<PublicSourceSnapshot[]>(() => {
    const cutoff = new Date();
    cutoff.setDate(cutoff.getDate() - 120);
    const cutoffTime = cutoff.getTime();

    const announcementSnapshots: PublicSourceSnapshot[] = announcements
      .filter((announcement) => Boolean(announcement.source_url))
      .flatMap((announcement) => {
        const publishedDate =
          announcement.event_date ||
          announcement.announcement_date ||
          announcement.created_at;
        const publishedTime = parseTimestamp(publishedDate);

        if (!publishedDate || publishedTime === null || publishedTime < cutoffTime) {
          return [];
        }

        const locationLabel = buildLocationLabel(announcement.location_city, announcement.location_county);
        const sourceName = normalizeSourceLabel(announcement.source_name);
        const note = announcement.status === 'pending_details'
          ? 'Public notice captured before full checkpoint details were published.'
          : locationLabel
            ? `Publicly posted checkpoint reference tied to ${locationLabel}.`
            : 'Publicly posted checkpoint reference captured from a recent source.';

        return [{
          key: `announcement-${announcement.id}`,
          title: announcement.title,
          sourceName,
          sourceUrl: announcement.source_url!,
          publishedDate,
          locationLabel,
          note,
        }];
      });

    const checkpointSnapshots: PublicSourceSnapshot[] = checkpoints
      .filter((checkpoint) => Boolean(checkpoint.source_url))
      .flatMap((checkpoint) => {
        const publishedDate = checkpoint.start_date;
        const publishedTime = parseTimestamp(publishedDate);

        if (!publishedDate || publishedTime === null || publishedTime < cutoffTime) {
          return [];
        }

        const locationLabel = buildLocationLabel(checkpoint.location_city, checkpoint.location_county);
        const sourceName = normalizeSourceLabel(checkpoint.source_name);
        const title =
          checkpoint.title ||
          (locationLabel ? `Recent checkpoint notice in ${locationLabel}` : 'Recent checkpoint notice');
        const note = checkpoint.description?.trim()
          ? checkpoint.description.trim()
          : locationLabel
            ? `Checkpoint notice captured for ${locationLabel}.`
            : 'Recent checkpoint notice captured from a public source.';

        return [{
          key: `checkpoint-${checkpoint.id}`,
          title,
          sourceName,
          sourceUrl: checkpoint.source_url!,
          publishedDate,
          locationLabel,
          note,
        }];
      });

    const deduped = new Map<string, PublicSourceSnapshot>();

    [...announcementSnapshots, ...checkpointSnapshots]
      .sort((a, b) => {
        const aTime = parseTimestamp(a.publishedDate) ?? 0;
        const bTime = parseTimestamp(b.publishedDate) ?? 0;
        return bTime - aTime;
      })
      .forEach((item) => {
        const dedupeKey = `${item.sourceUrl}|${item.title}|${item.publishedDate}`;
        if (!deduped.has(dedupeKey)) {
          deduped.set(dedupeKey, item);
        }
      });

    return Array.from(deduped.values()).slice(0, 4);
  }, [announcements, checkpoints]);

  const currentStatusSummary = useMemo(() => {
    if (pendingAnnouncements.length > 0 || checkpoints.length > 0) {
      if (pendingAnnouncements.length > 0) {
        return {
          heading: 'Current public signal',
          body: `${pendingAnnouncements.length} pending announcement${pendingAnnouncements.length !== 1 ? 's are' : ' is'} published right now, even if some locations are still being finalized.`,
        };
      }

      if (usedHistoryFallback && viewMode === 'all') {
        return {
          heading: 'Current public signal',
          body: `There are no currently announced checkpoints in the live feed right now, so this page is showing ${dateRange === 'all' ? 'available public checkpoint history' : 'the last 90 days of public checkpoint history'} instead.`,
        };
      }

      return {
        heading: 'Current public signal',
        body: `${checkpoints.length} announced checkpoint${checkpoints.length !== 1 ? 's are' : ' is'} currently visible in the selected view.`,
      };
    }

    return {
      heading: 'Current public signal',
      body: 'There are no currently announced checkpoints in the live feed right now. Check recent history below, and monitor this page more closely around major holiday and travel weekends when public notices are more common.',
    };
  }, [checkpoints.length, dateRange, pendingAnnouncements.length, usedHistoryFallback, viewMode]);

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
        eyebrow="DUI Resources"
        title="Ohio DUI Checkpoint Map"
        description="Announced checkpoints, public-source references, and practical guidance on what a checkpoint stop can involve."
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
                    href="/als-license-suspension-ohio"
                    className="inline-flex items-center gap-2 font-semibold text-brand-mangoText transition-colors hover:text-brand-leaf"
                  >
                    <Calendar className="h-4 w-4" />
                    ALS License Issues
                  </a>
                  <a
                    href="/first-offense-ovi-ohio"
                    className="inline-flex items-center gap-2 font-semibold text-brand-mangoText transition-colors hover:text-brand-leaf"
                  >
                    <Shield className="h-4 w-4" />
                    First Offense OVI
                  </a>
                  <a
                    href="/blog/ohio-dui-checkpoint-hotspots"
                    className="inline-flex items-center gap-2 font-semibold text-brand-mangoText transition-colors hover:text-brand-leaf"
                  >
                    <MapPinned className="h-4 w-4" />
                    Common Checkpoint Hotspots
                  </a>
                  <a
                    href="/blog/super-bowl-dui-checkpoints-ohio"
                    className="inline-flex items-center gap-2 font-semibold text-brand-mangoText transition-colors hover:text-brand-leaf"
                  >
                    <Calendar className="h-4 w-4" />
                    Super Bowl Sunday guide
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="mb-8 grid gap-6 xl:grid-cols-[minmax(0,1.15fr)_minmax(320px,0.85fr)]">
            <div className="rounded-[28px] border border-brand-black/10 bg-white p-5 shadow-[0_18px_50px_rgba(15,23,42,0.08)] sm:p-6">
              <div className="mb-5 flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                <div className="max-w-2xl">
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand-mangoText">Featured surface</p>
                  <h2 className="mt-2 font-display text-2xl font-bold text-brand-black sm:text-3xl">
                    Live checkpoint map and recent history
                  </h2>
                  <p className="mt-2 text-sm leading-relaxed text-brand-black/70 sm:text-base">
                    This is the main working surface on the page. If no public checkpoint notice is live right now,
                    the map automatically falls back to recent history so you can still see where activity was recently announced.
                  </p>
                </div>
                <div className="rounded-2xl border border-brand-mango/20 bg-brand-mango/5 px-4 py-3">
                  <div className="text-[11px] font-bold uppercase tracking-[0.18em] text-brand-mangoText">Current view</div>
                  <div className="mt-1 text-sm font-semibold text-brand-black">
                    {viewMode === 'upcoming' ? 'Upcoming public notices' : dateRange === 'all' ? 'All available history' : 'Recent public checkpoint history'}
                  </div>
                </div>
              </div>

              <div className="mb-5 flex flex-wrap items-center gap-2">
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
                    Recent history
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

              {usedHistoryFallback && viewMode === 'all' && (
                <div className="mb-4 rounded-xl border border-brand-mango/20 bg-brand-mango/5 px-4 py-3 text-sm text-brand-black/75">
                  No current public checkpoint notice is live right now, so the page has automatically switched to recent history to keep the map and list useful.
                </div>
              )}

              <div className="mb-4 flex flex-wrap items-center justify-between gap-4">
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
                        const count = countyCounts[county] ?? 0;
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

              <DeferredRender
                className="h-[360px] overflow-hidden rounded-[24px] border border-brand-black/10 bg-brand-offWhite sm:h-[420px]"
                minHeight={420}
              >
                <CheckpointMap
                  checkpoints={filteredCheckpoints}
                  selectedCheckpoint={selectedCheckpoint}
                  onCheckpointSelect={setSelectedCheckpoint}
                  now={now}
                />
              </DeferredRender>

              <div className="mt-4 grid gap-3 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)]">
                <div className="rounded-xl border border-brand-black/10 bg-brand-offWhite px-4 py-4">
                  <div className="text-xs font-semibold uppercase tracking-[0.08em] text-brand-black/55">
                    Map legend
                  </div>
                  <div className="mt-3 grid gap-4 sm:grid-cols-2">
                    <div>
                      <div className="text-[11px] font-bold uppercase tracking-[0.08em] text-brand-black/45">
                        Status color
                      </div>
                      <div className="mt-2 space-y-2 text-sm text-brand-black/75">
                        <div className="flex items-center gap-2.5">
                          <div className="h-4 w-4 rounded-full border-2 border-white bg-[#FF3B30] shadow-sm" />
                          <span>Active now</span>
                        </div>
                        <div className="flex items-center gap-2.5">
                          <div className="h-4 w-4 rounded-full border-2 border-white bg-[#FF9500] shadow-sm" />
                          <span>Upcoming</span>
                        </div>
                        <div className="flex items-center gap-2.5">
                          <div className="h-4 w-4 rounded-full border-2 border-white bg-[#34C759] shadow-sm" />
                          <span>Completed</span>
                        </div>
                        <div className="flex items-center gap-2.5">
                          <div className="h-4 w-4 rounded-full border-2 border-white bg-[#8E8E93] shadow-sm" />
                          <span>Cancelled</span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <div className="text-[11px] font-bold uppercase tracking-[0.08em] text-brand-black/45">
                        Pin type
                      </div>
                      <div className="mt-2 space-y-2 text-sm text-brand-black/75">
                        <div className="flex items-center gap-2.5">
                          <div className="h-4 w-4 rounded-full border-2 border-white bg-brand-black shadow-sm" />
                          <span>Reported location</span>
                        </div>
                        <div className="flex items-center gap-2.5">
                          <div className="h-4 w-4 rotate-45 rounded-[4px] border-[3px] border-brand-black bg-white shadow-sm" />
                          <span>Approximate city or county area</span>
                        </div>
                        <div className="flex items-center gap-2.5">
                          <div className="h-4 w-4 rounded-full border-2 border-[#FF6B18] bg-white shadow-sm ring-2 ring-[#FF6B18]/20" />
                          <span>Currently selected item</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="rounded-xl border border-brand-black/10 bg-brand-offWhite px-4 py-4 text-sm leading-relaxed text-brand-black/70">
                  <div className="text-xs font-semibold uppercase tracking-[0.08em] text-brand-black/55">
                    How to read this map
                  </div>
                  <div className="mt-3 space-y-2">
                    <p>
                      Solid circles mark checkpoint locations that were reported with enough detail to place a street-level pin.
                    </p>
                    <p>
                      Outlined diamonds mark public notices that did not publish a street address, so the map centers them on the named city or county instead of guessing an exact stop location.
                    </p>
                    {approximateMarkerCount > 0 && (
                      <p className="font-medium text-brand-black/80">
                        {approximateMarkerCount} marker{approximateMarkerCount !== 1 ? 's are' : ' is'} approximate in the current view.
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <div className="rounded-xl border border-brand-black/10 bg-brand-offWhite px-4 py-3">
                  <div className="text-xs font-semibold uppercase tracking-[0.08em] text-brand-black/55">Latest announcement</div>
                  <div className="mt-1 font-semibold text-brand-black">
                    {latestAnnouncement?.title || 'No recent public announcement captured'}
                  </div>
                  <div className="mt-1 text-xs text-brand-black/60">
                    {latestAnnouncement
                      ? `${formatDisplayDate(latestAnnouncement.event_date || latestAnnouncement.announcement_date || latestAnnouncement.created_at) || 'Date unavailable'}${latestAnnouncement.source_name ? ` • ${latestAnnouncement.source_name}` : ''}`
                      : 'If agencies publish an announced checkpoint, it should appear here first.'}
                  </div>
                </div>
                <div className="rounded-xl border border-brand-black/10 bg-brand-offWhite px-4 py-3">
                  <div className="text-xs font-semibold uppercase tracking-[0.08em] text-brand-black/55">Recent confirmed checkpoint</div>
                  <div className="mt-1 font-semibold text-brand-black">
                    {latestConfirmedCheckpoint?.title || 'No current confirmed checkpoint in this view'}
                  </div>
                  <div className="mt-1 text-xs text-brand-black/60">
                    {latestConfirmedCheckpoint
                      ? `${formatDisplayDate(latestConfirmedCheckpoint.start_date) || 'Date unavailable'}${latestConfirmedCheckpoint.location_county ? ` • ${latestConfirmedCheckpoint.location_county} County` : ''}`
                      : 'Switch to recent history if you want to browse earlier announced checkpoints.'}
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="rounded-2xl border border-brand-black/10 bg-brand-offWhite p-5">
                <div className="text-sm font-semibold text-brand-black">{currentStatusSummary.heading}</div>
                <p className="mt-2 text-sm leading-relaxed text-brand-black/75">{currentStatusSummary.body}</p>
                <div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-1">
                  <div className="rounded-xl border border-brand-black/10 bg-white px-4 py-3">
                    <div className="text-xs font-semibold uppercase tracking-[0.08em] text-brand-black/55">What this means</div>
                    <div className="mt-1 text-sm text-brand-black/70">
                      {viewMode === 'upcoming'
                        ? 'If a checkpoint is publicly announced, it should appear in the map first. Otherwise the page pivots into watchlist mode.'
                        : 'History view is the better way to study recent enforcement patterns by county, city, and holiday window.'}
                    </div>
                  </div>
                  <div className="rounded-xl border border-brand-black/10 bg-white px-4 py-3">
                    <div className="text-xs font-semibold uppercase tracking-[0.08em] text-brand-black/55">Best next step</div>
                    <div className="mt-1 text-sm text-brand-black/70">
                      Use the map to spot the most recent public activity, then go straight to the rights and defense guides if a stop already happened.
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-brand-black/10 bg-brand-offWhite p-5">
                <div className="text-sm font-semibold text-brand-black">Seasonal enforcement watch</div>
                <p className="mt-2 text-sm text-brand-black/70">
                  Public checkpoint notices tend to cluster around a few repeat holiday windows. If there is nothing live today, these are still the dates most worth watching.
                </p>
                <div className="mt-4 space-y-3">
                  {seasonalEnforcementWindows.map((item) => (
                    <div key={item.title} className="rounded-xl border border-brand-black/10 bg-white px-4 py-3">
                      <div className="font-semibold text-brand-black">{item.title}</div>
                      <div className="mt-1 text-sm text-brand-black/65">{item.description}</div>
                    </div>
                  ))}
                </div>
                <a
                  href="/holiday-ovi-enforcement-ohio"
                  className="mt-4 inline-flex text-sm font-semibold text-brand-mangoText transition-colors hover:text-brand-leaf"
                >
                  View the holiday enforcement guide →
                </a>
              </div>
            </div>
          </div>

          <CheckpointHotspots onCityClick={handleHotspotClick} initialHotspots={initialHotspots} />

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
                      {a.event_date ? `Event date: ${formatCalendarDate(a.event_date)}` : 'Event date: TBD'}
                      {a.location_county ? ` • ${a.location_county} County` : ''}
                      {a.location_city ? ` • ${a.location_city}` : ''}
                    </div>
                    {a.source_url && (
                      <a
                        href={a.source_url}
                        target="_blank"
                        rel="noopener noreferrer nofollow"
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

          {recentPublicReferences.length > 0 && (
            <div className="mb-8 rounded-2xl border border-brand-black/10 bg-white p-5">
              <div className="mb-1 text-sm font-semibold text-brand-black">
                Recent public-source snapshots
              </div>
              <p className="mb-4 text-xs text-brand-black/60">
                Only recent public references are shown here. Older archive examples were removed so this section stays tied to current enforcement windows instead of stale one-off clips.
              </p>
              <div className="space-y-3">
                {recentPublicReferences.map((item) => (
                  <div key={item.key} className="rounded-xl border border-brand-black/10 bg-brand-offWhite px-4 py-3">
                    <div className="flex flex-wrap items-start justify-between gap-2">
                      <div className="font-semibold text-brand-black">{item.title}</div>
                      <span className="rounded-full bg-brand-black/5 px-2.5 py-1 text-xs font-semibold text-brand-black/70">
                        {formatCalendarDate(item.publishedDate)}
                      </span>
                    </div>
                    <div className="mt-1 text-xs text-brand-black/60">
                      Source: {item.sourceName}
                      {item.locationLabel ? ` • ${item.locationLabel}` : ''}
                    </div>
                    {item.note && (
                      <div className="mt-1 text-xs text-brand-black/60">
                        {item.note}
                      </div>
                    )}
                    <a
                      href={item.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer nofollow"
                      className="mt-2 inline-flex text-xs font-semibold text-brand-mangoText hover:text-brand-leaf"
                    >
                      View source →
                    </a>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="mb-8 rounded-2xl border border-brand-black/10 bg-brand-offWhite p-5">
            <div className="mb-2 text-sm font-semibold text-brand-black">
              Start with the guide that matches what happened at the stop
            </div>
            <p className="mb-4 text-sm text-brand-black/70">
              Checkpoint cases usually turn on one of a few issues first: the stop itself, what you did at roadside,
              your license situation, or what happens next in court.
            </p>
            <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
              {[
                {
                  href: '/ovi-dui-defense-delaware-oh',
                  title: 'OVI rights and defense',
                  description: 'Use this if you need the broad legal picture first.',
                },
                {
                  href: '/first-offense-ovi-ohio',
                  title: 'First-offense OVI guide',
                  description: 'Best starting point when this is your first OVI charge.',
                },
                {
                  href: '/als-license-suspension-ohio',
                  title: 'ALS license suspension',
                  description: 'Focus here if driving privileges are the immediate problem.',
                },
                {
                  href: '/motion-to-suppress-ovi-ohio',
                  title: 'Motion to suppress issues',
                  description: 'Use this when the stop, testing, or search looks questionable.',
                },
                {
                  href: '/criminal-defense-delaware-oh',
                  title: 'Criminal defense overview',
                  description: 'Use this if the stop led to broader charges or overlapping case issues.',
                },
              ].map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="rounded-xl border border-brand-black/10 bg-white px-4 py-4 transition-colors hover:border-brand-mango/40 hover:bg-brand-mango/5"
                >
                  <div className="font-semibold text-brand-black">{item.title}</div>
                  <div className="mt-1 text-sm text-brand-black/65">{item.description}</div>
                </a>
              ))}
            </div>
          </div>

          <div className="grid gap-8 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <div className="mt-6">
                <h3 className="mb-4 text-lg font-bold text-brand-black">
                  {viewMode === 'upcoming' ? 'Currently announced checkpoints' : 'Recent checkpoint history'}
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
                        {viewMode === 'upcoming' && (
                          <button
                            type="button"
                            onClick={() => setViewMode('all')}
                            className="rounded-lg border border-brand-black/10 bg-white px-4 py-2 text-sm font-semibold text-brand-black transition-colors hover:bg-brand-mango/10"
                          >
                            View recent checkpoint history
                          </button>
                        )}
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

      <FAQSection faqs={duiCheckpointMapFaqs} title="Ohio DUI checkpoint map FAQ" />

      <LeadCaptureModal
        isOpen={isLeadModalOpen}
        onClose={() => setIsLeadModalOpen(false)}
        trigger={leadModalTrigger}
        checkpointId={leadModalCheckpointId}
      />
    </>
  );
}
