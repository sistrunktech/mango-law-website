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

  const { data, error } = await supabase
    .from('dui_checkpoint_announcements')
    .insert([announcement])
    .select()
    .single();

  if (error) {
    console.error('Error creating announcement:', error);
    throw new Error('Failed to create announcement');
  }

  return data;
}

export async function updateCheckpointAnnouncement(
  id: string,
  updates: Partial<CheckpointAnnouncement>
): Promise<CheckpointAnnouncement> {
  if (!supabase) throw new Error('Supabase client is not initialized');

  const { data, error } = await supabase
    .from('dui_checkpoint_announcements')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Error updating announcement:', error);
    throw new Error('Failed to update announcement');
  }

  return data;
}

export async function deleteCheckpointAnnouncement(id: string): Promise<void> {
  if (!supabase) throw new Error('Supabase client is not initialized');

  const { error } = await supabase.from('dui_checkpoint_announcements').delete().eq('id', id);
  if (error) {
    console.error('Error deleting announcement:', error);
    throw new Error('Failed to delete announcement');
  }
}

