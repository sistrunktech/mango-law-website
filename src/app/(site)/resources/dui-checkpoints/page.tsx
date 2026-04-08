import { createClient } from '@supabase/supabase-js';
import type { Metadata } from 'next';
import DUICheckpointsPage from '@/views/DUICheckpointsPage';
import StructuredData from '@/components/StructuredData';
import type { DUICheckpoint } from '@/data/checkpoints';
import { duiCheckpointMapFaqs } from '@/data/duiCheckpointMapFaqs';
import {
  isAnnouncementFreshForPublic,
  type CheckpointAnnouncement,
} from '@/lib/checkpointAnnouncementsService';
import { buildMetadata } from '@/lib/seo-metadata';
import { supabaseAnonKey, supabaseUrl } from '@/lib/supabaseClient';
import type { CheckpointHotspot, DateRangeOption } from '@/lib/checkpointService';

const seo = {
  title: 'Ohio DUI Checkpoint Map and Guide | Announced Checkpoints',
  description:
    'Browse announced Ohio DUI checkpoints, understand how checkpoint stops work, and review your rights after an OVI checkpoint stop.',
  url: '/resources/dui-checkpoints',
};

const breadcrumbs = [
  { name: 'Home', item: '/' },
  { name: 'DUI Checkpoints', item: '/resources/dui-checkpoints' },
];

type ViewMode = 'upcoming' | 'all';

type InitialCheckpointPageData = {
  initialAnnouncements: CheckpointAnnouncement[];
  initialCheckpoints: DUICheckpoint[];
  initialHotspots: CheckpointHotspot[];
  initialViewMode: ViewMode;
  initialDateRange: DateRangeOption;
  initialUsedHistoryFallback: boolean;
};

const HOTSPOT_LIMIT = 8;

export const dynamic = 'force-dynamic';
export const metadata: Metadata = buildMetadata(seo);

function createCheckpointClient() {
  return createClient(supabaseUrl, supabaseAnonKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

function normalizeCheckpoints(rows: DUICheckpoint[] | null): DUICheckpoint[] {
  return (rows ?? []).filter((checkpoint) => Boolean(checkpoint.source_url));
}

function buildHotspots(rows: Pick<DUICheckpoint, 'location_city' | 'location_county' | 'source_url'>[]): CheckpointHotspot[] {
  const hotspotMap = new Map<string, CheckpointHotspot>();

  rows
    .filter((row) => row.source_url && row.location_city && row.location_county)
    .forEach((row) => {
      const key = `${row.location_city}-${row.location_county}`;
      const existing = hotspotMap.get(key);

      if (existing) {
        existing.count += 1;
        return;
      }

      hotspotMap.set(key, {
        city: row.location_city!,
        county: row.location_county!,
        count: 1,
      });
    });

  return Array.from(hotspotMap.values())
    .sort((left, right) => right.count - left.count || left.city.localeCompare(right.city))
    .slice(0, HOTSPOT_LIMIT);
}

async function getInitialCheckpointPageData(): Promise<InitialCheckpointPageData> {
  const fallback: InitialCheckpointPageData = {
    initialAnnouncements: [],
    initialCheckpoints: [],
    initialHotspots: [],
    initialViewMode: 'upcoming',
    initialDateRange: '90d',
    initialUsedHistoryFallback: false,
  };

  try {
    const client = createCheckpointClient();
    const now = new Date();
    const ninetyDaysAgo = new Date(now);
    ninetyDaysAgo.setDate(now.getDate() - 90);

    const [announcementsResult, upcomingResult, hotspotsResult] = await Promise.all([
      client
        .from('dui_checkpoint_announcements')
        .select('*')
        .order('event_date', { ascending: true, nullsFirst: false })
        .order('announcement_date', { ascending: false, nullsFirst: false })
        .order('created_at', { ascending: false }),
      client
        .from('dui_checkpoints')
        .select('*')
        .not('source_url', 'is', null)
        .in('status', ['upcoming', 'active'])
        .gte('end_date', now.toISOString())
        .order('start_date', { ascending: true }),
      client.from('dui_checkpoints').select('location_city, location_county, source_url'),
    ]);

    if (announcementsResult.error) throw announcementsResult.error;
    if (upcomingResult.error) throw upcomingResult.error;
    if (hotspotsResult.error) throw hotspotsResult.error;

    const initialAnnouncements = announcementsResult.data ?? [];
    const freshPendingAnnouncementsCount = initialAnnouncements.filter(
      (announcement) =>
        announcement.status === 'pending_details' && isAnnouncementFreshForPublic(announcement),
    ).length;

    const upcomingCheckpoints = normalizeCheckpoints((upcomingResult.data as DUICheckpoint[] | null) ?? []);
    const initialHotspots = buildHotspots(
      ((hotspotsResult.data as Pick<DUICheckpoint, 'location_city' | 'location_county' | 'source_url'>[] | null) ??
        []),
    );

    if (upcomingCheckpoints.length > 0 || freshPendingAnnouncementsCount > 0) {
      return {
        ...fallback,
        initialAnnouncements,
        initialCheckpoints: upcomingCheckpoints,
        initialHotspots,
      };
    }

    const recentHistoryResult = await client
      .from('dui_checkpoints')
      .select('*')
      .not('source_url', 'is', null)
      .gte('start_date', ninetyDaysAgo.toISOString())
      .order('start_date', { ascending: false });

    if (recentHistoryResult.error) throw recentHistoryResult.error;

    const recentHistory = normalizeCheckpoints((recentHistoryResult.data as DUICheckpoint[] | null) ?? []);

    if (recentHistory.length > 0) {
      return {
        initialAnnouncements,
        initialCheckpoints: recentHistory,
        initialHotspots,
        initialViewMode: 'all',
        initialDateRange: '90d',
        initialUsedHistoryFallback: true,
      };
    }

    const allHistoryResult = await client
      .from('dui_checkpoints')
      .select('*')
      .not('source_url', 'is', null)
      .order('start_date', { ascending: false });

    if (allHistoryResult.error) throw allHistoryResult.error;

    return {
      initialAnnouncements,
      initialCheckpoints: normalizeCheckpoints((allHistoryResult.data as DUICheckpoint[] | null) ?? []),
      initialHotspots,
      initialViewMode: 'all',
      initialDateRange: 'all',
      initialUsedHistoryFallback: true,
    };
  } catch (error) {
    console.error('Failed to preload checkpoint page data:', error);
    return fallback;
  }
}

export default async function Page() {
  const initialData = await getInitialCheckpointPageData();

  return (
    <>
      <StructuredData breadcrumbs={breadcrumbs} faqs={duiCheckpointMapFaqs} url={seo.url} />
      <DUICheckpointsPage {...initialData} />
    </>
  );
}
