import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { parseOfficialCheckpointNotice, fetchOfficialCheckpointNotice, collectOfficialCheckpointArticleUrls, fetchOfficialCheckpointIndex, OFFICIAL_CHECKPOINT_SOURCES } from '../supabase/functions/checkpoint-scraper/official-announcements.ts';
import { hasOhioOviCheckpointIntent } from '../supabase/functions/_shared/checkpoint-relevance.ts';

const url = 'https://sheriff.franklincountyohio.gov/About-Us/Public-Affairs-Media-Relations/2026/10-02-Sobriety-Checkpoint-tonight-10-02-2026-in-Jackson-Township';
// Minimal factual fixture from the publisher's Oct. 2 release, fetched Oct. 29.
const html = `<!--normalTemplateStart-->
<h1>10-02 Sobriety Checkpoint tonight (10-02-2026) in Jackson Township</h1>
<p class="published-on small-text">Published on October 02, 2026</p>
<p>The Franklin County DUI Task Force will operate two sobriety checkpoints today in Jackson Township.</p>
<p>Checkpoint 1: US-62, south of Rensch Road &amp;&nbsp;Checkpoint 2: Columbus Street, west of Hoover Road</p>
<p>Checkpoint operations will run from 8:00 PM to 1:30 AM, weather permitting.</p>
<p>Plan for a designated driver.</p><!--normalTemplateEnd-->`;
const parsed = parseOfficialCheckpointNotice(url, html);
assert.equal(parsed.events.length, 2);
assert.equal(parsed.events[0].startDate, '2026-10-03T00:00:00.000Z');
assert.equal(parsed.events[0].endDate, '2026-10-03T05:30:00.000Z');
assert.equal(parsed.events[0].locationText, 'US-62, south of Rensch Road');
assert.equal(parsed.events[1].locationText, 'Columbus Street, west of Hoover Road');
assert.equal(parsed.events[0].locationCity, 'Jackson Township');
assert.equal(parsed.events[0].locationCounty, 'Franklin');
assert.equal(parsed.events[0].announcementDate, null, 'do not turn a publication date into a midnight timestamp');
assert.equal(parsed.publicationDate, '2026-10-02');
assert.notEqual(parsed.events[0].sourceUrl, parsed.events[1].sourceUrl, 'simultaneous same-county locations must remain distinct');
assert.deepEqual(parseOfficialCheckpointNotice(url, html), parsed, 'replays retain deterministic event identities');
for (const event of parsed.events) {
  assert.equal(event.status, 'confirmed');
  assert.equal(event.promoteToCheckpoint, true);
  assert.equal(hasOhioOviCheckpointIntent({ title: event.title, rawText: event.rawText, locationCounty: event.locationCounty }), true);
}
const corrected = parseOfficialCheckpointNotice(url, html.replace('8:00 PM', '9:00 PM'));
assert.equal(corrected.events[0].sourceUrl, parsed.events[0].sourceUrl, 'source identity persists across corrections');
assert.notEqual(corrected.events[0].startDate, parsed.events[0].startDate);
const cancelled = parseOfficialCheckpointNotice(url, html.replace('tonight (', 'cancelled ('));
assert.equal(cancelled.events.length, 2);
assert.ok(cancelled.events.every((e) => e.status === 'cancelled'));

for (const [name, input] of [
  ['missing year', html.replace('10-02-2026', '10-02')],
  ['missing time', html.replace('8:00 PM to 1:30 AM', 'this evening')],
  ['bad minute', html.replace('8:00 PM', '8:70 PM')],
  ['bad clock', html.replace('8:00 PM', '13:00 PM')],
  ['conflicting dates', html.replace('today in', 'October 03, 2026 in')],
  ['conflicting times', html.replace('<!--normalTemplateEnd-->', '<p>Checkpoint operations will run from 9 PM to 11 PM.</p><!--normalTemplateEnd-->')],
  ['missing city', html.replace('today in Jackson Township', 'today')],
  ['duplicate location number', html.replace('Checkpoint 2:', 'Checkpoint 1:')],
  ['template changed', html.replace('normalTemplateStart', 'differentTemplate')],
  ['postponed', html.replace('today in', 'postponed today in')],
  ['negated cancellation', html.replace('today in', 'not cancelled today in')],
]) assert.equal(parseOfficialCheckpointNotice(url, input).events.length, 0, name);
const invalidDate = html.replaceAll('10-02-2026', '02-30-2026').replace('October 02, 2026', 'February 30, 2026');
assert.equal(parseOfficialCheckpointNotice(url, invalidDate).events.length, 0);
const winter = html.replaceAll('10-02-2026', '12-04-2026').replace('October 02, 2026', 'December 04, 2026');
assert.equal(parseOfficialCheckpointNotice(url, winter).events[0].startDate, '2026-12-05T01:00:00.000Z');
const dstFold = html.replaceAll('10-02-2026', '10-31-2026').replace('October 02, 2026', 'October 31, 2026');
assert.equal(parseOfficialCheckpointNotice(url, dstFold).events.length, 0, 'ambiguous 1:30am end at DST fold stays pending');
const dstSafe = parseOfficialCheckpointNotice(url, dstFold.replace('1:30 AM', '3:00 AM'));
assert.equal(dstSafe.events[0].endDate, '2026-11-01T08:00:00.000Z');
for (const untrusted of [url.replace('.gov/', '.gov.evil.test/'), url.replace('https:', 'http:'), url.replace('https://', 'https://name:password@')]) {
  assert.equal(parseOfficialCheckpointNotice(untrusted, html).events.length, 0);
}
const now = () => new Date('2026-10-29T13:00:00.000Z');
const fetched = await fetchOfficialCheckpointNotice(url, async (_url, options) => {
  assert.equal(options?.redirect, 'error');
  assert.ok(options?.signal);
  return new Response(html, { headers: { 'content-type': 'text/html' } });
}, now);
assert.equal(fetched.events.length, 2);
assert.equal(fetched.evidence?.fetchedAt, now().toISOString());
assert.match(fetched.evidence?.bodySha256 ?? '', /^[a-f0-9]{64}$/);
assert.ok(fetched.events[0].rawText.includes(fetched.evidence!.bodySha256));
const failed = await fetchOfficialCheckpointNotice(url, async () => new Response('gone', { status: 404 }), now);
assert.equal(failed.events.length, 0);
assert.equal(failed.evidence, undefined, 'failure must not manufacture a source-check timestamp');
assert.match(failed.pendingReason ?? '', /HTTP 404/);
const oversized = await fetchOfficialCheckpointNotice(url, async () => new Response('a'.repeat(524289), { headers: { 'content-type': 'text/html' } }), now);
assert.equal(oversized.evidence, undefined);
assert.match(oversized.pendingReason ?? '', /512 KiB/);
const blocked = await fetchOfficialCheckpointNotice('https://unknown.example/news', async () => { throw new Error('must not fetch'); });
assert.match(blocked.pendingReason ?? '', /registry/);
const indexUrl = OFFICIAL_CHECKPOINT_SOURCES[0].ownershipUrl;
const indexHtml = `<a href="${url}"><h2>Sobriety Checkpoint tonight</h2></a><a href="${url}">OVI checkpoint</a><a href="https://evil.example/news">OVI checkpoint</a>`;
assert.deepEqual(collectOfficialCheckpointArticleUrls(indexUrl, indexHtml), [url]);
assert.deepEqual(collectOfficialCheckpointArticleUrls('https://evil.example/', indexHtml), []);
const index = await fetchOfficialCheckpointIndex(async () => new Response(indexHtml, { headers: { 'content-type': 'text/html' } }));
assert.deepEqual(index.urls, [url]);
assert.ok(index.evidence?.fetchedAt);
const failedIndex = await fetchOfficialCheckpointIndex(async () => new Response('', { status: 503 }));
assert.equal(failedIndex.evidence, undefined);
assert.match(failedIndex.pendingReason ?? '', /503/);

// Optional replay against local original bytes, without committing a full publisher page.
if (process.env.MANGO_OFFICIAL_NOTICE_FIXTURE) {
  assert.equal(parseOfficialCheckpointNotice(url, readFileSync(process.env.MANGO_OFFICIAL_NOTICE_FIXTURE, 'utf8')).events.length, 2);
}
if (process.env.MANGO_OFFICIAL_INDEX_FIXTURE) {
  assert.equal(collectOfficialCheckpointArticleUrls(indexUrl, readFileSync(process.env.MANGO_OFFICIAL_INDEX_FIXTURE, 'utf8')).length, 3);
}
console.log('checkpointOfficialAnnouncements tests passed');
