export function normalizeLocationAddress(value: unknown): string {
  if (typeof value !== 'string') return '';
  return value
    .toLowerCase()
    .replace(/&/g, ' and ')
    .replace(/\b(street|st)\.?\b/g, 'street')
    .replace(/\b(avenue|ave)\.?\b/g, 'avenue')
    .replace(/\b(road|rd)\.?\b/g, 'road')
    .replace(/\b(northwest|nw)\b/g, 'nw')
    .replace(/\b(northeast|ne)\b/g, 'ne')
    .replace(/\b(southwest|sw)\b/g, 'sw')
    .replace(/\b(southeast|se)\b/g, 'se')
    .replace(/[^a-z0-9]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}


type EventLocation = { startDate: string; locationCounty: string; locationCity: string; locationAddress: string };

// Time proximity alone cannot identify simultaneous checkpoints in one county.
export function matchesCheckpointEventLocation(left: EventLocation, right: EventLocation): boolean {
  const leftTime = new Date(left.startDate).getTime();
  const rightTime = new Date(right.startDate).getTime();
  if (!Number.isFinite(leftTime) || !Number.isFinite(rightTime) || Math.abs(leftTime - rightTime) > 45 * 60_000) return false;
  return (['locationCounty', 'locationCity', 'locationAddress'] as const).every((key) => {
    const value = normalizeLocationAddress(left[key]);
    return Boolean(value) && value === normalizeLocationAddress(right[key]);
  });
}
