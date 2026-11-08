import assert from 'node:assert/strict';

let handler: (request: Request) => Promise<Response>;
const savedServe = Deno.serve;
Deno.serve = ((callback: typeof handler) => { handler = callback; return {}; }) as unknown as typeof Deno.serve;
try { await import('./index.ts'); } finally { Deno.serve = savedServe; }

for (const failCompletion of [false, true]) {
  Deno.test(failCompletion ? 'fatal errors complete the started log' : 'aggregator failure does not suppress independent feeds', async () => {
    const originalFetch = globalThis.fetch;
    const names = ['SUPABASE_URL', 'SUPABASE_SERVICE_ROLE_KEY', 'MAPBOX_PUBLIC_TOKEN', 'NEXT_PUBLIC_MAPBOX_PUBLIC_TOKEN', 'VITE_MAPBOX_PUBLIC_TOKEN', 'SERPER_API_KEY'];
    const savedEnv = names.map((name) => Deno.env.get(name));
    names.forEach((name) => Deno.env.delete(name));
    Deno.env.set('SUPABASE_URL', 'https://checkpoint-test.supabase.co');
    Deno.env.set('SUPABASE_SERVICE_ROLE_KEY', 'test-key');
    let rssFetches = 0;
    let rejectedCompletion = false;
    const updates: Record<string, unknown>[] = [];
    globalThis.fetch = async (input, init) => {
      const url = String(input);
      assert.ok(init?.signal, 'every upstream/DB request needs a deadline');
      if (url.includes('/rest/v1/')) {
        if (init?.method === 'PATCH' && url.includes('/scraper_logs')) {
          const payload = JSON.parse(String(init.body));
          updates.push(payload);
          if (failCompletion && !rejectedCompletion && payload.status !== 'failed') {
            rejectedCompletion = true;
            return new Response(JSON.stringify({ message: 'Completion write failed' }), { status: 503 });
          }
        }
        return new Response(JSON.stringify([]), { headers: { 'content-type': 'application/json' } });
      }
      if (url.includes('/wp-json/')) return new Response(null, { status: 404 });
      if (url === 'https://www.ovicheckpoint.com/') return new Response(null, { status: 503 });
      rssFetches++;
      return new Response('<rss><channel></channel></rss>');
    };
    try {
      const response = await handler!(new Request('https://test.invalid/checkpoint-scraper', {
        method: 'POST', body: JSON.stringify({ mode: 'core', trigger: 'manual' }),
      }));
      assert.ok(rssFetches > 0);
      const lastUpdate = updates.at(-1)!;
      assert.ok(lastUpdate.completed_at);
      assert.equal(response.status, failCompletion ? 500 : 200);
      assert.equal(lastUpdate.status, failCompletion ? 'failed' : 'partial');
      if (failCompletion) assert.ok((lastUpdate.errors as { checkpoint: string }[]).some(e => e.checkpoint === 'Fatal error'));
    } finally {
      globalThis.fetch = originalFetch;
      names.forEach((name, i) => savedEnv[i] === undefined ? Deno.env.delete(name) : Deno.env.set(name, savedEnv[i]!));
    }
  });
}
