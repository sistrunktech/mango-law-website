import { supabase } from './supabaseClient';

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

  const { data, error } = await supabase
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

  const builder = sourceUrl
    ? supabase
        .from('dui_checkpoint_announcements')
        .upsert([payload], { onConflict: 'source_url' })
    : supabase.from('dui_checkpoint_announcements').insert([payload]);

  const { data, error } = await builder.select().single();

  if (error) {
    console.error('Error creating announcement:', error);
    throw new Error(error.message || 'Failed to create announcement');
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
