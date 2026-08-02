import assert from 'node:assert/strict';
import { checkSupabaseAvailability } from '../src/lib/supabaseClient.ts';

const healthyFetch = async () => new Response('{}', { status: 200 });
assert.equal(await checkSupabaseAvailability(healthyFetch), true);

const rejectedFetch = async () => {
  throw new TypeError('fetch failed');
};
assert.equal(await checkSupabaseAvailability(rejectedFetch), false);

const unhealthyFetch = async () => new Response('{}', { status: 503 });
assert.equal(await checkSupabaseAvailability(unhealthyFetch), false);
