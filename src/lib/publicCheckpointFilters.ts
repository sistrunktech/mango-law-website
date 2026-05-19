import {
  isAggregatorSourceName,
  isAggregatorSourceUrl,
  type DUICheckpoint,
} from '../data/checkpoints';

type PublicCheckpointCandidate = Pick<DUICheckpoint, 'source_name' | 'source_url'>;

export function isPublicCheckpointRow(checkpoint: PublicCheckpointCandidate): boolean {
  return (
    Boolean(checkpoint.source_url) &&
    !isAggregatorSourceName(checkpoint.source_name) &&
    !isAggregatorSourceUrl(checkpoint.source_url)
  );
}

export function filterPublicCheckpointRows<T extends PublicCheckpointCandidate>(rows: T[] | null | undefined): T[] {
  return (rows ?? []).filter(isPublicCheckpointRow);
}
