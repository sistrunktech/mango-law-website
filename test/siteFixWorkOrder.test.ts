import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

import { geoffreySpallSchema } from '../src/lib/structured-data.ts';

assert.equal(geoffreySpallSchema.worksFor['@id'], 'https://mango.law/#legalservice');
assert.deepEqual(geoffreySpallSchema.sameAs, [
  'https://bettercallspall.com',
  'https://www.avvo.com/attorneys/43015-oh-geoffrey-spall-5079659.html',
  'https://profiles.superlawyers.com/ohio/delaware/lawyer/geoffrey-a-spall/e9986fd5-2f4d-4dc2-a73e-80c3b08e4bdc.html',
  'https://www.linkedin.com/in/geoff-spall-26433067',
]);

const ofCounselPageSource = readFileSync(new URL('../src/views/OfCounselPage.tsx', import.meta.url), 'utf8');
const checkpointPageSource = readFileSync(
  new URL('../src/views/DUICheckpointsPage.tsx', import.meta.url),
  'utf8'
);

assert.match(ofCounselPageSource, /href="https:\/\/bettercallspall\.com" nofollow=\{false\}/);
assert.match(checkpointPageSource, /href="\/ovi-dui-defense-delaware-oh"/);
assert.match(checkpointPageSource, /data-cta="checkpoint_delaware_ovi_bridge"/);
