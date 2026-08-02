import assert from 'node:assert/strict';
import {
  hasOhioOviCheckpointIntent,
  isDirectCheckpointSource,
} from '../supabase/functions/_shared/checkpoint-relevance.ts';

assert.equal(
  hasOhioOviCheckpointIntent({
    title: 'Franklin County OVI checkpoint announced for Friday',
    rawText: 'Ohio authorities published a sobriety checkpoint notice.',
  }),
  true,
);

assert.equal(
  hasOhioOviCheckpointIntent({
    title: 'Lorain County sobriety checkpoint announced for Friday',
  }),
  true,
);

assert.equal(
  hasOhioOviCheckpointIntent({
    title: 'Oakland County DUI checkpoint announced for Friday',
    locationCity: 'Detroit',
    locationCounty: 'Oakland',
    sourceName: 'Michigan local news',
  }),
  false,
);

for (const title of [
  'TSA expands PreCheck airport checkpoints in Ohio',
  'Free Lyft rides offered during Ohio safety campaign',
  'Generic Ohio traffic safety tips for the weekend',
  'My sobriety journey after rehab',
]) {
  assert.equal(
    hasOhioOviCheckpointIntent({ title, rawText: 'Ohio OVI checkpoint search results' }),
    false,
    title,
  );
}

assert.equal(isDirectCheckpointSource('FOX8 Cleveland', 'https://fox8.com/news/checkpoint'), true);
assert.equal(isDirectCheckpointSource('OVICheckpoint.com', 'https://example.com/redirect'), false);
assert.equal(isDirectCheckpointSource('Local source', 'https://duiblock.com/ohio'), false);
assert.equal(isDirectCheckpointSource('Google News', 'https://localnews.example/checkpoint'), false);
assert.equal(isDirectCheckpointSource('Local source', null), false);
