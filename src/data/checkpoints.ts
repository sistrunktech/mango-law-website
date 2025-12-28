export type CheckpointStatus = 'upcoming' | 'active' | 'completed' | 'cancelled';

export interface DUICheckpoint {
  id: string;
  title: string;
  location_address: string;
  location_city: string;
  location_county: string;
  latitude: number | null;
  longitude: number | null;
  start_date: string;
  end_date: string;
  status: CheckpointStatus;
  source_url: string | null;
  source_name: string | null;
  description: string | null;
  created_at: string;
  updated_at: string;
  is_verified: boolean;
  views_count: number;
  announcement_date?: string | null;
  geocoding_confidence?: string | null;
}

export function isAggregatorSourceName(sourceName: string | null | undefined): boolean {
  if (!sourceName) return false;
  const normalized = sourceName.trim().toLowerCase();
  return normalized === 'ovicheckpoint.com' || normalized === 'duiblock' || normalized === 'duiblock.com';
}

export function isAggregatorSourceUrl(sourceUrl: string | null | undefined): boolean {
  if (!sourceUrl) return false;
  const normalized = sourceUrl.trim().toLowerCase();
  return normalized.includes('ovicheckpoint.com') || normalized.includes('duiblock');
}

export function shouldShowPublicCheckpointSource(
  checkpoint: Pick<DUICheckpoint, 'source_name' | 'source_url'>
): boolean {
  return Boolean(checkpoint.source_name) && !isAggregatorSourceName(checkpoint.source_name);
}

export const ohioCounties = [
  'Adams', 'Allen', 'Ashland', 'Ashtabula', 'Athens', 'Auglaize', 'Belmont', 'Brown', 'Butler',
  'Carroll', 'Champaign', 'Clark', 'Clermont', 'Clinton', 'Columbiana', 'Coshocton', 'Crawford',
  'Cuyahoga', 'Darke', 'Defiance', 'Delaware', 'Erie', 'Fairfield', 'Fayette', 'Franklin',
  'Fulton', 'Gallia', 'Geauga', 'Greene', 'Guernsey', 'Hamilton', 'Hancock', 'Hardin', 'Harrison',
  'Henry', 'Highland', 'Hocking', 'Holmes', 'Huron', 'Jackson', 'Jefferson', 'Knox', 'Lake',
  'Lawrence', 'Licking', 'Logan', 'Lorain', 'Lucas', 'Madison', 'Mahoning', 'Marion', 'Medina',
  'Meigs', 'Mercer', 'Miami', 'Monroe', 'Montgomery', 'Morgan', 'Morrow', 'Muskingum', 'Noble',
  'Ottawa', 'Paulding', 'Perry', 'Pickaway', 'Pike', 'Portage', 'Preble', 'Putnam', 'Richland',
  'Ross', 'Sandusky', 'Scioto', 'Seneca', 'Shelby', 'Stark', 'Summit', 'Trumbull', 'Tuscarawas',
  'Union', 'Van Wert', 'Vinton', 'Warren', 'Washington', 'Wayne', 'Williams', 'Wood', 'Wyandot'
];

export function getStatusColor(status: CheckpointStatus): string {
  switch (status) {
    case 'upcoming':
      return 'text-blue-700 bg-blue-50 border-blue-200';
    case 'active':
      return 'text-red-700 bg-red-50 border-red-200';
    case 'completed':
      return 'text-gray-700 bg-gray-50 border-gray-200';
    case 'cancelled':
      return 'text-orange-700 bg-orange-50 border-orange-200';
    default:
      return 'text-gray-700 bg-gray-50 border-gray-200';
  }
}

export function getStatusLabel(status: CheckpointStatus): string {
  switch (status) {
    case 'upcoming':
      return 'Upcoming';
    case 'active':
      return 'Active Now';
    case 'completed':
      return 'Completed';
    case 'cancelled':
      return 'Cancelled';
    default:
      return status;
  }
}

export function getDisplayStatus(checkpoint: Pick<DUICheckpoint, 'start_date' | 'end_date' | 'status'>, now = new Date()): CheckpointStatus {
  if (checkpoint.status === 'cancelled') return 'cancelled';

  const start = new Date(checkpoint.start_date);
  const end = new Date(checkpoint.end_date);

  if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) {
    return checkpoint.status;
  }

  if (now < start) return 'upcoming';
  if (now <= end) return 'active';
  return 'completed';
}

export function formatCheckpointDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

export function formatCheckpointTime(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });
}

export function formatCheckpointDateRange(startDate: string, endDate: string): string {
  const start = new Date(startDate);
  const end = new Date(endDate);

  const dateStr = formatCheckpointDate(startDate);
  const startTime = formatCheckpointTime(startDate);
  const endTime = formatCheckpointTime(endDate);

  return `${dateStr} from ${startTime} to ${endTime}`;
}
