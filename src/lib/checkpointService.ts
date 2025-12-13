import { supabase } from './supabaseClient';
import type { DUICheckpoint, CheckpointStatus } from '../data/checkpoints';

export interface CheckpointFilters {
  county?: string;
  status?: CheckpointStatus;
  startDate?: string;
  endDate?: string;
}

export async function getCheckpoints(filters?: CheckpointFilters): Promise<DUICheckpoint[]> {
  if (!supabase) {
    throw new Error('Supabase client is not initialized');
  }

  let query = supabase
    .from('dui_checkpoints')
    .select('*')
    .order('start_date', { ascending: true });

  if (filters?.county) {
    query = query.eq('location_county', filters.county);
  }

  if (filters?.status) {
    query = query.eq('status', filters.status);
  }

  if (filters?.startDate) {
    query = query.gte('start_date', filters.startDate);
  }

  if (filters?.endDate) {
    query = query.lte('end_date', filters.endDate);
  }

  const { data, error } = await query;

  if (error) {
    console.error('Error fetching checkpoints:', error);
    throw new Error('Failed to fetch checkpoints');
  }

  return data || [];
}

export async function getUpcomingCheckpoints(): Promise<DUICheckpoint[]> {
  if (!supabase) {
    throw new Error('Supabase client is not initialized');
  }

  const { data, error } = await supabase
    .from('dui_checkpoints')
    .select('*')
    .not('source_url', 'is', null)
    .in('status', ['upcoming', 'active'])
    .gte('end_date', new Date().toISOString())
    .order('start_date', { ascending: true });

  if (error) {
    console.error('Error fetching upcoming checkpoints:', error);
    throw new Error('Failed to fetch upcoming checkpoints');
  }

  return data || [];
}

export async function getCheckpointById(id: string): Promise<DUICheckpoint | null> {
  if (!supabase) {
    throw new Error('Supabase client is not initialized');
  }

  const { data, error } = await supabase
    .from('dui_checkpoints')
    .select('*')
    .eq('id', id)
    .maybeSingle();

  if (error) {
    console.error('Error fetching checkpoint:', error);
    throw new Error('Failed to fetch checkpoint');
  }

  return data;
}

export async function incrementCheckpointViews(id: string): Promise<void> {
  if (!supabase) {
    throw new Error('Supabase client is not initialized');
  }

  const { error } = await supabase.rpc('increment', {
    row_id: id,
    table_name: 'dui_checkpoints',
    column_name: 'views_count'
  });

  if (error) {
    console.error('Error incrementing checkpoint views:', error);
  }
}

export async function createCheckpoint(checkpoint: Partial<DUICheckpoint>): Promise<DUICheckpoint> {
  if (!supabase) {
    throw new Error('Supabase client is not initialized');
  }

  const { data, error } = await supabase
    .from('dui_checkpoints')
    .insert([checkpoint])
    .select()
    .single();

  if (error) {
    console.error('Error creating checkpoint:', error);
    throw new Error('Failed to create checkpoint');
  }

  return data;
}

export async function updateCheckpoint(id: string, updates: Partial<DUICheckpoint>): Promise<DUICheckpoint> {
  if (!supabase) {
    throw new Error('Supabase client is not initialized');
  }

  const { data, error } = await supabase
    .from('dui_checkpoints')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Error updating checkpoint:', error);
    throw new Error('Failed to update checkpoint');
  }

  return data;
}

export async function deleteCheckpoint(id: string): Promise<void> {
  if (!supabase) {
    throw new Error('Supabase client is not initialized');
  }

  const { error } = await supabase
    .from('dui_checkpoints')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting checkpoint:', error);
    throw new Error('Failed to delete checkpoint');
  }
}

export async function updateCheckpointStatuses(): Promise<void> {
  if (!supabase) {
    throw new Error('Supabase client is not initialized');
  }

  const { error } = await supabase.rpc('update_checkpoint_status');

  if (error) {
    console.error('Error updating checkpoint statuses:', error);
    throw new Error('Failed to update checkpoint statuses');
  }
}

export type DateRangeOption = '30d' | '90d' | 'all';

export async function getRecentCheckpoints(
  dateRange: DateRangeOption = '90d',
  county?: string
): Promise<DUICheckpoint[]> {
  if (!supabase) {
    throw new Error('Supabase client is not initialized');
  }

  let query = supabase
    .from('dui_checkpoints')
    .select('*')
    .not('source_url', 'is', null)
    .order('start_date', { ascending: false });

  if (dateRange !== 'all') {
    const days = dateRange === '30d' ? 30 : 90;
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - days);
    query = query.gte('start_date', cutoffDate.toISOString());
  }

  if (county) {
    query = query.eq('location_county', county);
  }

  const { data, error } = await query;

  if (error) {
    console.error('Error fetching recent checkpoints:', error);
    throw new Error('Failed to fetch recent checkpoints');
  }

  return data || [];
}

export interface CheckpointHotspot {
  city: string;
  county: string;
  count: number;
}

export async function getCheckpointHotspots(limit: number = 10): Promise<CheckpointHotspot[]> {
  if (!supabase) {
    throw new Error('Supabase client is not initialized');
  }

  const { data, error } = await supabase
    .from('dui_checkpoints')
    .select('location_city, location_county');

  if (error) {
    console.error('Error fetching checkpoint hotspots:', error);
    throw new Error('Failed to fetch checkpoint hotspots');
  }

  const hotspotMap = new Map<string, CheckpointHotspot>();

  for (const checkpoint of data || []) {
    const key = `${checkpoint.location_city}-${checkpoint.location_county}`;
    if (hotspotMap.has(key)) {
      hotspotMap.get(key)!.count++;
    } else {
      hotspotMap.set(key, {
        city: checkpoint.location_city,
        county: checkpoint.location_county,
        count: 1
      });
    }
  }

  return Array.from(hotspotMap.values())
    .sort((a, b) => b.count - a.count)
    .slice(0, limit);
}
