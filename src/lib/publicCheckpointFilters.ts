import {
  isAggregatorSourceName,
  isAggregatorSourceUrl,
  type DUICheckpoint,
} from '../data/checkpoints';
import { hasOhioOviCheckpointIntent, isDirectCheckpointSource } from './checkpointRelevance';

type PublicCheckpointCandidate = Pick<
  DUICheckpoint,
  | 'title'
  | 'description'
  | 'location_address'
  | 'location_city'
  | 'location_county'
  | 'status'
  | 'source_name'
  | 'source_url'
  | 'is_verified'
>;

export function isPublicCheckpointRow(checkpoint: PublicCheckpointCandidate): boolean {
  return (
    checkpoint.status !== 'cancelled' &&
    checkpoint.is_verified === true &&
    isDirectCheckpointSource(checkpoint.source_name, checkpoint.source_url) &&
    !isAggregatorSourceName(checkpoint.source_name) &&
    !isAggregatorSourceUrl(checkpoint.source_url) &&
    hasOhioOviCheckpointIntent({
      title: checkpoint.title,
      description: checkpoint.description,
      sourceName: checkpoint.source_name,
      sourceUrl: checkpoint.source_url,
      locationAddress: checkpoint.location_address,
      locationCity: checkpoint.location_city,
      locationCounty: checkpoint.location_county,
    })
  );
}

export function filterPublicCheckpointRows<T extends PublicCheckpointCandidate>(rows: T[] | null | undefined): T[] {
  return (rows ?? []).filter(isPublicCheckpointRow);
}
