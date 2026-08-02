import assert from 'node:assert/strict';
import { filterPublicCheckpointRows, isPublicCheckpointRow } from '../src/lib/publicCheckpointFilters.ts';

const sourcedNewsRow = {
  title: 'Stark County OVI checkpoint announced',
  description: 'Officials announced an OVI checkpoint in Ohio.',
  location_address: 'Undisclosed',
  location_city: 'Canton',
  location_county: 'Stark',
  status: 'upcoming' as const,
  source_name: 'FOX8 Cleveland / Stark County OVI Task Force',
  source_url: 'https://fox8.com/news/stark-county-ovi-checkpoint-announced/',
  is_verified: true,
};

assert.equal(isPublicCheckpointRow(sourcedNewsRow), true);

assert.equal(
  isPublicCheckpointRow({
    ...sourcedNewsRow,
    source_name: 'FOX8 Cleveland',
    source_url: null,
  }),
  false,
);

assert.equal(
  isPublicCheckpointRow({
    ...sourcedNewsRow,
    source_name: 'OVICheckpoint.com',
    source_url: 'https://www.ovicheckpoint.com/ohio/',
  }),
  false,
);

assert.equal(
  isPublicCheckpointRow({
    ...sourcedNewsRow,
    source_name: 'Public checkpoint source',
    source_url: 'https://duiblock.com/checkpoints/ohio',
  }),
  false,
);

assert.equal(isPublicCheckpointRow({ ...sourcedNewsRow, status: 'cancelled' }), false);
assert.equal(isPublicCheckpointRow({ ...sourcedNewsRow, is_verified: false }), false);
assert.equal(
  isPublicCheckpointRow({
    ...sourcedNewsRow,
    title: 'TSA expands PreCheck airport checkpoints in Ohio',
    description: 'Airport security checkpoint update.',
  }),
  false,
);
assert.equal(
  isPublicCheckpointRow({
    ...sourcedNewsRow,
    title: 'Free Lyft rides support Ohio road safety campaign',
    description: 'Use a designated driver this weekend.',
  }),
  false,
);

assert.deepEqual(
  filterPublicCheckpointRows([
    { id: 'official', ...sourcedNewsRow },
    { id: 'aggregator-name', ...sourcedNewsRow, source_name: 'OVICheckpoint.com' },
    { id: 'aggregator-url', ...sourcedNewsRow, source_url: 'https://duiblock.com/ohio' },
    { id: 'missing-url', ...sourcedNewsRow, source_url: null },
  ]).map((row) => row.id),
  ['official'],
);
