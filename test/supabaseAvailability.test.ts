import assert from 'node:assert/strict';
import { checkLeadBackendAvailability } from '../src/lib/supabaseClient.ts';

let request: { input: RequestInfo | URL; init?: RequestInit } | null = null;
const healthyFetch = async (input: RequestInfo | URL, init?: RequestInit) => {
  request = { input, init };
  return new Response(null, { status: 204 });
};
assert.equal(await checkLeadBackendAvailability(healthyFetch), true);
assert.equal(String(request?.input).endsWith('/functions/v1/submit-contact'), true);
assert.equal(request?.init?.method, 'OPTIONS');
assert.equal(request?.init?.body, undefined);
assert.ok((new Headers(request?.init?.headers).get('apikey')?.length ?? 0) > 0);
assert.equal(new Headers(request?.init?.headers).get('Authorization')?.startsWith('Bearer '), true);

const rejectedFetch = async () => {
  throw new TypeError('fetch failed');
};
assert.equal(await checkLeadBackendAvailability(rejectedFetch), false);

const unhealthyFetch = async () => new Response('{}', { status: 503 });
assert.equal(await checkLeadBackendAvailability(unhealthyFetch), false);
