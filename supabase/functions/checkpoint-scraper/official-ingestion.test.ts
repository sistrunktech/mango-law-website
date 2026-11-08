import assert from 'node:assert/strict';
import { createClient } from 'npm:@supabase/supabase-js@2';
import { ingestOfficialNotices } from './official-ingestion.ts';
import { OFFICIAL_CHECKPOINT_SOURCES } from './official-announcements.ts';

Deno.test('fresh source reads, linked idempotent replay, write recovery and cancellation', async () => {
  const index = OFFICIAL_CHECKPOINT_SOURCES[0].ownershipUrl;
  const article = new URL('/About-Us/Public-Affairs-Media-Relations/2026/10-02-Sobriety-Checkpoint-tonight-10-02-2026-in-Jackson-Township', index).href;
  const body = '<!--normalTemplateStart--><h1>Sobriety checkpoint (10-02-2026)</h1><p class="published-on">October 2, 2026</p><p>The Franklin County DUI Task Force will operate today in Jackson Township.</p><p>Checkpoint 1: US-62, south of Rensch Road &amp; Checkpoint 2: Columbus Street, west of Hoover Road</p><p>Checkpoint operations will run from 8 PM to 1:30 AM.</p><!--normalTemplateEnd-->';
  let cancelled = false, failOneAnnouncement = true, fetchCount = 0;
  const checkpoints = new Map<string, Record<string, any>>(), announcements = new Map<string, Record<string, any>>();
  const original = globalThis.fetch;
  const json = (obj: unknown, status = 200) => new Response(JSON.stringify(obj), { status, headers: { 'Content-Type': 'application/json' } });
  const html = (s: string) => new Response(s, { headers: { 'Content-Type': 'text/html' } });
  globalThis.fetch = async (input, init) => {
    const url = new URL(String(input));
    if (url.href === index) return html(`<a href="${article}">Sobriety checkpoint</a>`);
    if (url.href === article) { fetchCount++; return html(cancelled ? body.replace('</h1>', ' cancelled</h1>') : body); }
    if (url.hostname !== 'example.supabase.co') throw Error('Unexpected network destination');
    const data = init?.body && JSON.parse(String(init.body));
    if (url.pathname.endsWith('/dui_checkpoints')) {
      if (init?.method === 'GET') {
        const source = url.searchParams.get('source_url');
        const existing = source ? checkpoints.get(source.slice(3)) : undefined;
        return json(existing ? [{ id: existing.id }] : []);
      }
      assert.equal(url.searchParams.get('on_conflict'), 'id');
      const id = data.id;
      assert.match(id, /^[a-f0-9]{8}-[a-f0-9]{4}-8[a-f0-9]{3}-[89ab][a-f0-9]{3}-[a-f0-9]{12}$/);
      checkpoints.set(data.source_url, { ...data, id });
      return json({ id });
    }
    assert.ok(url.pathname.endsWith('/dui_checkpoint_announcements'));
    if (init?.method === 'GET') {
      const a = announcements.get(url.searchParams.get('source_url')!.slice(3));
      return json(a ? [{ id: a.id }] : []);
    }
    assert.equal(url.searchParams.get('on_conflict'), 'id');
    if (failOneAnnouncement) { failOneAnnouncement = false; return json({ message: 'simulated failure' }, 400); }
    announcements.set(data.source_url, data);
    return json([]);
  };
  try {
    const db = createClient('https://example.supabase.co', 'test-key', { auth: { persistSession: false, autoRefreshToken: false } });
    const run = async () => {
      const stats = { checkpointsNew: 0, checkpointsUpdated: 0, checkpointsFound: 0, announcementsFound: 0, announcementsUpserted: 0, errors: [] };
      const report = await ingestOfficialNotices(db, undefined, stats, () => 'completed');
      assert.equal(report.pages.length, 1);
      return { report, stats };
    };
    const first = await run();
    assert.equal(first.report.pages[0].saved, 1);
    assert.equal(first.stats.errors.length, 1);
    const ids = [...checkpoints.values()].map(c => c.id);
    assert.equal(new Set(ids).size, 2);
    assert.equal((await run()).report.pages[0].saved, 2);
    assert.equal(announcements.size, 2);
    for (const [url, announcement] of announcements) {
      assert.equal(announcement.linked_checkpoint_id, checkpoints.get(url)?.id);
      assert.ok(announcement.last_checked_at);
      assert.equal(checkpoints.get(url)?.geocoding_confidence, 'nearby_intersection');
    }
    cancelled = true;
    assert.equal((await run()).stats.errors.length, 0);
    assert.equal(fetchCount, 3);
    assert.deepEqual([...checkpoints.values()].map(c => c.id), ids);
    assert.ok([...checkpoints.values(), ...announcements.values()].every(c => c.status === 'cancelled'));
  } finally { globalThis.fetch = original; }
});
