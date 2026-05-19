import assert from 'node:assert/strict';
import { filterPublicCheckpointRows, isPublicCheckpointRow } from '../src/lib/publicCheckpointFilters.ts';

const sourcedNewsRow = {
  source_name: 'FOX8 Cleveland / Stark County OVI Task Force',
  source_url: 'https://fox8.com/news/stark-county-ovi-checkpoint-announced/',
};

assert.equal(isPublicCheckpointRow(sourcedNewsRow), true);

assert.equal(
  isPublicCheckpointRow({
    source_name: 'FOX8 Cleveland',
    source_url: null,
  }),
  false,
);

assert.equal(
  isPublicCheckpointRow({
    source_name: 'OVICheckpoint.com',
    source_url: 'https://www.ovicheckpoint.com/ohio/',
  }),
  false,
);

assert.equal(
  isPublicCheckpointRow({
    source_name: 'Public checkpoint source',
    source_url: 'https://duiblock.com/checkpoints/ohio',
  }),
  false,
);

assert.deepEqual(
  filterPublicCheckpointRows([
    { id: 'official', ...sourcedNewsRow },
    { id: 'aggregator-name', source_name: 'OVICheckpoint.com', source_url: 'https://example.com/source' },
    { id: 'aggregator-url', source_name: 'Local source', source_url: 'https://duiblock.com/ohio' },
    { id: 'missing-url', source_name: 'Local source', source_url: null },
  ]).map((row) => row.id),
  ['official'],
);
