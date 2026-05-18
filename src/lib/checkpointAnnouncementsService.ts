import { createClient } from '@supabase/supabase-js';
import { supabase, supabaseAnonKey, supabaseUrl } from './supabaseClient';

export type AnnouncementStatus = 'pending_details' | 'confirmed' | 'cancelled';

export interface CheckpointAnnouncement {
  id: string;
  title: string;
  source_url: string | null;
  source_name: string | null;
  announcement_date: string | null;
  event_date: string | null;
  start_date: string | null;
  end_date: string | null;
  location_text: string | null;
  location_city: string | null;
  location_county: string | null;
  status: AnnouncementStatus;
  linked_checkpoint_id: string | null;
  last_checked_at: string | null;
  raw_text: string | null;
  created_at: string;
  updated_at: string;
}

const CHECKPOINT_PUBLIC_SIGNAL_PATTERNS = [
  /\bsobriety checkpoints?\b/i,
  /\bovi checkpoints?\b/i,
  /\bdui checkpoints?\b/i,
  /\bimpaired[-\s]driving checkpoints?\b/i,
  /\btraffic safety checkpoints?\b/i,
  /\bovi task force\b/i,
  /\bdui task force\b/i,
  /\bdrive sober\b/i,
];

const CHECKPOINT_PUBLIC_NOISE_PATTERNS = [
  /\bsecurity checkpoints?\b/i,
  /\bairport checkpoints?\b/i,
  /\bborder checkpoints?\b/i,
  /\bcheckpoint inhibitor\b/i,
  /\bcorrespondents'? dinner\b/i,
  /\bPennsylvania\b/i,
  /\bPSP\b/i,
  /\bCalifornia\b/i,
  /\bChula Vista\b/i,
  /\bSacramento\b/i,
  /\bStockton\b/i,
  /\bBarstow\b/i,
  /\bSomerset\b/i,
];

const OHIO_PUBLIC_SIGNAL_PATTERNS = [
  /\bOhio\b/i,
  /\bOVI\b/i,
  /\bOSHP\b/i,
  /\bOhio State Highway Patrol\b/i,
  /\bOhio Highway Patrol\b/i,
  /\bCleveland\b/i,
  /\bColumbus\b/i,
  /\bCincinnati\b/i,
  /\bDayton\b/i,
  /\bAkron\b/i,
  /\bToledo\b/i,
  /\bYoungstown\b/i,
  /\bStark County\b/i,
  /\bFranklin County\b/i,
];

function parseIsoDate(value: unknown): Date | null {
  if (typeof value !== 'string' || !value.trim()) return null;
  const d = new Date(value);
  return Number.isNaN(d.getTime()) ? null : d;
}

function parseDateOnlyToUtc(value: unknown): Date | null {
  if (typeof value !== 'string' || !value.trim()) return null;
  // Expect YYYY-MM-DD
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return null;
  const d = new Date(`${value}T00:00:00.000Z`);
  return Number.isNaN(d.getTime()) ? null : d;
}

function hasCheckpointPublicSignal(announcement: CheckpointAnnouncement): boolean {
  const text = [announcement.title, announcement.source_name, announcement.location_text, announcement.raw_text]
    .filter(Boolean)
    .join('\n');

  if (CHECKPOINT_PUBLIC_NOISE_PATTERNS.some((pattern) => pattern.test(text))) {
    return false;
  }

  return CHECKPOINT_PUBLIC_SIGNAL_PATTERNS.some((pattern) => pattern.test(text));
}

function hasOhioPublicSignal(announcement: CheckpointAnnouncement): boolean {
  const text = [announcement.title, announcement.source_name, announcement.location_text, announcement.raw_text]
    .filter(Boolean)
    .join('\n');

  if (CHECKPOINT_PUBLIC_NOISE_PATTERNS.some((pattern) => pattern.test(text))) {
    return false;
  }

  return OHIO_PUBLIC_SIGNAL_PATTERNS.some((pattern) => pattern.test(text));
}

function createCheckpointAnnouncementsClient() {
  return createClient(supabaseUrl, supabaseAnonKey, {
    auth: { persistSession: false, autoRefreshToken: false },
    global: {
      fetch: (input, init) => fetch(input, { ...init, cache: 'no-store' }),
    },
  });
}

export function isAnnouncementFreshForPublic(announcement: CheckpointAnnouncement, now: Date = new Date()): boolean {
  if (announcement.status !== 'pending_details') return true;
  if (!hasCheckpointPublicSignal(announcement)) return false;

  const oneDayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);
  const fourteenDaysAgo = new Date(now.getTime() - 14 * 24 * 60 * 60 * 1000);

  const eventDate = parseDateOnlyToUtc(announcement.event_date);
  const startDate = parseIsoDate(announcement.start_date);
  const announcementDate = parseIsoDate(announcement.announcement_date);
  const createdAt = parseIsoDate(announcement.created_at);
  const hasLocationContext = Boolean(
    announcement.location_city?.trim() ||
      announcement.location_county?.trim() ||
      announcement.location_text?.trim()
  );

  if (!hasLocationContext && !hasOhioPublicSignal(announcement)) return false;

  if (eventDate && eventDate >= oneDayAgo) return true;
  if (startDate && startDate >= oneDayAgo) return true;
  if (hasLocationContext && announcementDate && announcementDate >= fourteenDaysAgo) return true;
  if (!hasLocationContext && announcementDate && announcementDate >= oneDayAgo) return true;

  // Only fall back to created_at when we don't have an upstream announcement date.
  if (!announcementDate && createdAt && createdAt >= (hasLocationContext ? fourteenDaysAgo : oneDayAgo)) return true;

  return false;
}

function normalizeString(value: unknown): string | null {
  if (typeof value !== 'string') return null;
  const trimmed = value.trim();
  return trimmed.length ? trimmed : null;
}

function normalizeDateOnly(value: unknown): string | null {
  const s = normalizeString(value);
  if (!s) return null;
  // Expect YYYY-MM-DD
  if (!/^\d{4}-\d{2}-\d{2}$/.test(s)) return null;
  return s;
}

function buildAnnouncementPayload(
  input: Partial<CheckpointAnnouncement>,
  options: { defaultAnnouncementDate?: boolean } = {}
): Partial<CheckpointAnnouncement> {
  const title = normalizeString(input.title);
  if (!title) {
    throw new Error('Title is required');
  }

  const status = (normalizeString(input.status) as AnnouncementStatus | null) || 'pending_details';

  return {
    title,
    status,
    source_url: normalizeString(input.source_url),
    source_name: normalizeString(input.source_name),
    announcement_date: options.defaultAnnouncementDate
      ? (input.announcement_date ?? new Date().toISOString())
      : (input.announcement_date ?? null),
    event_date: normalizeDateOnly(input.event_date),
    start_date: normalizeString(input.start_date),
    end_date: normalizeString(input.end_date),
    location_text: normalizeString(input.location_text),
    location_city: normalizeString(input.location_city),
    location_county: normalizeString(input.location_county),
    linked_checkpoint_id: input.linked_checkpoint_id ?? null,
    last_checked_at: input.last_checked_at ?? null,
    raw_text: normalizeString(input.raw_text),
  };
}

export async function getCheckpointAnnouncements(): Promise<CheckpointAnnouncement[]> {
  if (!supabase) throw new Error('Supabase client is not initialized');
  const checkpointAnnouncementsClient = createCheckpointAnnouncementsClient();

  const { data, error } = await checkpointAnnouncementsClient
    .from('dui_checkpoint_announcements')
    .select('*')
    .order('event_date', { ascending: true, nullsFirst: false })
    .order('announcement_date', { ascending: false, nullsFirst: false })
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching announcements:', error);
    throw new Error('Failed to fetch announcements');
  }

  return data || [];
}

export async function createCheckpointAnnouncement(
  announcement: Partial<CheckpointAnnouncement>
): Promise<CheckpointAnnouncement> {
  if (!supabase) throw new Error('Supabase client is not initialized');

  const payload = buildAnnouncementPayload(announcement, { defaultAnnouncementDate: true });
  const sourceUrl = payload.source_url;

  // Prefer upsert when a URL is present (dedupe), but tolerate environments where
  // the unique constraint may be missing (schema drift) by falling back.
  if (sourceUrl) {
    const { data, error } = await supabase
      .from('dui_checkpoint_announcements')
      .upsert([payload], { onConflict: 'source_url' })
      .select()
      .single();

    if (!error) return data;

    console.error('Error upserting announcement:', error);

    // Schema drift: upsert requires a unique constraint on source_url.
    if (/conflict|unique|exclusion/i.test(error.message)) {
      const { data: existing, error: selectError } = await supabase
        .from('dui_checkpoint_announcements')
        .select('*')
        .eq('source_url', sourceUrl)
        .maybeSingle();

      if (selectError) {
        console.error('Error selecting announcement for fallback:', selectError);
        throw new Error(`Failed to create announcement: ${selectError.message}`);
      }

      if (existing?.id) {
        const { data: updated, error: updateError } = await supabase
          .from('dui_checkpoint_announcements')
          .update(payload)
          .eq('id', existing.id)
          .select()
          .single();

        if (updateError) {
          console.error('Error updating announcement for fallback:', updateError);
          throw new Error(`Failed to create announcement: ${updateError.message}`);
        }

        return updated;
      }
    }

    throw new Error(`Failed to create announcement: ${error.message}`);
  }

  const { data, error } = await supabase
    .from('dui_checkpoint_announcements')
    .insert([payload])
    .select()
    .single();

  if (error) {
    console.error('Error creating announcement:', error);
    throw new Error(`Failed to create announcement: ${error.message}`);
  }

  return data;
}

export async function updateCheckpointAnnouncement(
  id: string,
  updates: Partial<CheckpointAnnouncement>
): Promise<CheckpointAnnouncement> {
  if (!supabase) throw new Error('Supabase client is not initialized');

  const payload = buildAnnouncementPayload(updates, { defaultAnnouncementDate: false });
  // Never allow updating immutable/system fields through the client.
  delete (payload as any).id;
  delete (payload as any).created_at;
  delete (payload as any).updated_at;

  const { data, error } = await supabase
    .from('dui_checkpoint_announcements')
    .update(payload)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Error updating announcement:', error);
    throw new Error(error.message || 'Failed to update announcement');
  }

  return data;
}

export async function deleteCheckpointAnnouncement(id: string): Promise<void> {
  if (!supabase) throw new Error('Supabase client is not initialized');

  const { error } = await supabase.from('dui_checkpoint_announcements').delete().eq('id', id);
  if (error) {
    console.error('Error deleting announcement:', error);
    throw new Error(error.message || 'Failed to delete announcement');
  }
}
