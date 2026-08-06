import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

import { geoffreySpallSchema } from '../src/lib/structured-data.ts';

assert.equal(geoffreySpallSchema.worksFor['@id'], 'https://mango.law/#legalservice');
assert.ok(geoffreySpallSchema.sameAs.includes('https://bettercallspall.com'));

const ofCounselPageSource = readFileSync(new URL('../src/views/OfCounselPage.tsx', import.meta.url), 'utf8');
const checkpointPageSource = readFileSync(
  new URL('../src/views/DUICheckpointsPage.tsx', import.meta.url),
  'utf8'
);

assert.match(ofCounselPageSource, /href="https:\/\/bettercallspall\.com" nofollow=\{false\}/);
assert.match(checkpointPageSource, /href="\/ovi-dui-defense-delaware-oh"/);
assert.match(checkpointPageSource, /data-cta="checkpoint_delaware_ovi_bridge"/);
