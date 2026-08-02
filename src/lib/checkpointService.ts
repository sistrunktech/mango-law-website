import { supabase } from './supabaseClient';
import type { DUICheckpoint, CheckpointStatus } from '../data/checkpoints';
import {
  filterPublicCheckpointRows,
  type PublicCheckpointCandidate,
} from './publicCheckpointFilters';

function coerceCoordinate(value: unknown): number | null {
  if (value === null || value === undefined) return null;
  if (typeof value === 'number') return Number.isFinite(value) ? value : null;
  if (typeof value === 'string') {
    const n = Number.parseFloat(value);
    return Number.isFinite(n) ? n : null;
  }
  return null;
}

function normalizeCheckpoint(row: any): DUICheckpoint {
  return {
    ...(row as DUICheckpoint),
    latitude: coerceCoordinate((row as any).latitude),
    longitude: coerceCoordinate((row as any).longitude),
  };
}

function normalizeCheckpoints(rows: any[] | null): DUICheckpoint[] {
  return (rows || []).map(normalizeCheckpoint);
}

function isMissingPublicViewError(error: unknown): boolean {
  const err = error as { code?: string; message?: string } | null;
  return err?.code === '42P01' || /public_dui_checkpoint/i.test(err?.message || '');
}

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

  return normalizeCheckpoints(data);
}

export async function getUpcomingCheckpoints(): Promise<DUICheckpoint[]> {
  if (!supabase) {
    throw new Error('Supabase client is not initialized');
  }

  const now = new Date().toISOString();
  let { data, error } = await supabase
    .from('public_dui_checkpoints')
    .select('*')
    .neq('status', 'cancelled')
    .gte('end_date', now)
    .order('start_date', { ascending: true });

  if (error && isMissingPublicViewError(error)) {
    const fallback = await supabase
      .from('dui_checkpoints')
      .select('*')
      .not('source_url', 'is', null)
      .neq('status', 'cancelled')
      .gte('end_date', now)
      .order('start_date', { ascending: true });
    data = fallback.data;
    error = fallback.error;
  }

  if (error) {
    console.error('Error fetching upcoming checkpoints:', error);
    throw new Error('Failed to fetch upcoming checkpoints');
  }

  return normalizeCheckpoints(data);
}

export async function getCheckpointById(id: string): Promise<DUICheckpoint | null> {
  if (!supabase) {
    throw new Error('Supabase client is not initialized');
  }

  let { data, error } = await supabase
    .from('public_dui_checkpoints')
    .select('*')
    .eq('id', id)
    .maybeSingle();

  if (error && isMissingPublicViewError(error)) {
    const fallback = await supabase
      .from('dui_checkpoints')
      .select('*')
      .not('source_url', 'is', null)
      .eq('id', id)
      .maybeSingle();
    data = fallback.data;
    error = fallback.error;
  }

  if (error) {
    console.error('Error fetching checkpoint:', error);
    throw new Error('Failed to fetch checkpoint');
  }

  return data ? normalizeCheckpoint(data) : null;
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

  return normalizeCheckpoint(data);
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

  return normalizeCheckpoint(data);
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
    .from('public_dui_checkpoints')
    .select('*')
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

  let { data, error } = await query;

  if (error && isMissingPublicViewError(error)) {
    let fallback = supabase
      .from('dui_checkpoints')
      .select('*')
      .not('source_url', 'is', null)
      .order('start_date', { ascending: false });

    if (dateRange !== 'all') {
      const days = dateRange === '30d' ? 30 : 90;
      const cutoffDate = new Date();
      cutoffDate.setDate(cutoffDate.getDate() - days);
      fallback = fallback.gte('start_date', cutoffDate.toISOString());
    }

    if (county) {
      fallback = fallback.eq('location_county', county);
    }

    const fallbackResult = await fallback;
    data = fallbackResult.data;
    error = fallbackResult.error;
  }

  if (error) {
    console.error('Error fetching recent checkpoints:', error);
    throw new Error('Failed to fetch recent checkpoints');
  }

  return normalizeCheckpoints(data);
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

  let { data, error } = await supabase
    .from('public_dui_checkpoints')
    .select(
      'title, description, location_address, location_city, location_county, status, source_name, source_url, is_verified'
    );

  if (error && isMissingPublicViewError(error)) {
    const fallback = await supabase
      .from('dui_checkpoints')
      .select(
        'title, description, location_address, location_city, location_county, status, source_name, source_url, is_verified'
      )
      .not('source_url', 'is', null);
    data = fallback.data;
    error = fallback.error;
  }

  if (error) {
    console.error('Error fetching checkpoint hotspots:', error);
    throw new Error('Failed to fetch checkpoint hotspots');
  }

  const hotspotMap = new Map<string, CheckpointHotspot>();

  const publicRows = filterPublicCheckpointRows(
    (data || []) as PublicCheckpointCandidate[],
  );

  for (const checkpoint of publicRows) {
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
