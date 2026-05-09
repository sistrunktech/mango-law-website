import assert from 'node:assert/strict';
import {
  geocodeCheckpointLocation,
  locationTextSuggestsUndisclosed,
  shouldSkipCheckpointGeocoding,
} from '../supabase/functions/checkpoint-scraper/geocoding.ts';
import { determineScraperHealth, determineScraperRunStatus } from '../supabase/functions/checkpoint-scraper/run-health.ts';

async function run() {
  const placeholderInput = {
    address: 'Exact location has not been released',
    city: 'Toledo',
    county: 'Lucas',
  };

  assert.equal(locationTextSuggestsUndisclosed(placeholderInput.address), true);
  assert.equal(shouldSkipCheckpointGeocoding(placeholderInput), true);

  const originalFetch = globalThis.fetch;
  globalThis.fetch = async () => {
    throw new Error('placeholder geocoding should not call fetch');
  };

  try {
    const result = await geocodeCheckpointLocation(placeholderInput, {}, 'test-token');
    assert.equal(result, null);
  } finally {
    globalThis.fetch = originalFetch;
  }

  assert.equal(
    determineScraperRunStatus({
      didWork: true,
      blockingErrorCount: 0,
      warningCount: 4,
    }),
    'success'
  );
  assert.equal(
    determineScraperHealth({
      didWork: true,
      blockingErrorCount: 0,
      warningCount: 4,
    }),
    'warning'
  );
  assert.equal(
    determineScraperRunStatus({
      didWork: false,
      blockingErrorCount: 2,
      warningCount: 0,
    }),
    'failed'
  );
}

await run();
