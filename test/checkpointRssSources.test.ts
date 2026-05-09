import assert from 'node:assert/strict';
import { loadMasterRssSources, loadSeedSources } from '../supabase/functions/checkpoint-scraper/rss-sources.ts';
import { scrapeRssSources } from '../supabase/functions/checkpoint-scraper/rss-scraper.ts';

async function run() {
  const sources = await loadMasterRssSources();
  assert.ok(
    sources.some((source) => source.sourceName === 'Google News Ohio Checkpoints'),
    'expected statewide Google News checkpoint source to be loaded'
  );
  assert.ok(
    sources.some(
      (source) =>
        source.sourceName === 'WTOL Toledo' &&
        source.rssUrl === 'https://www.wtol.com/feeds/syndication/rss/news'
    ),
    'expected WTOL stale FeedBlitz source to be normalized to the current WTOL RSS endpoint'
  );

  const lucasSeeds = await loadSeedSources(36);
  assert.ok(
    lucasSeeds.some(
      (source) =>
        source.sourceName === 'WTOL Toledo' &&
        source.rssUrl === 'https://www.wtol.com/feeds/syndication/rss/news'
    ),
    'expected WTOL seed sources to use the current WTOL RSS endpoint'
  );

  const originalFetch = globalThis.fetch;
  globalThis.fetch = async () =>
    new Response(
      `<?xml version="1.0" encoding="UTF-8"?>
      <rss version="2.0">
        <channel>
          <item>
            <title>Fresh Ohio OVI checkpoint notice</title>
            <link>https://example.com/fresh?utm_source=test</link>
            <pubDate>Fri, 04 Apr 2026 12:00:00 GMT</pubDate>
            <description>Police announced an OVI checkpoint in Ohio this weekend.</description>
          </item>
          <item>
            <title>Old Ohio OVI checkpoint notice</title>
            <link>https://example.com/old</link>
            <pubDate>Mon, 01 Dec 2025 12:00:00 GMT</pubDate>
            <description>Old checkpoint article that should not be re-ingested.</description>
          </item>
          <item>
            <title>Security checkpoint catches unrelated suspect</title>
            <link>https://example.com/security-checkpoint</link>
            <pubDate>Fri, 04 Apr 2026 13:00:00 GMT</pubDate>
            <description>Unrelated security checkpoint coverage, not an Ohio OVI notice.</description>
          </item>
        </channel>
      </rss>`,
      {
        status: 200,
        headers: { 'content-type': 'application/rss+xml' },
      }
    );

  try {
    const [result] = await scrapeRssSources(
      [
        {
          sourceName: 'Test source',
          rssUrl: 'https://example.com/feed',
          sourceType: 'search',
          tier: 'core',
          confidence: 'verified',
          notes: 'test',
        },
      ],
      { maxAgeDays: 21, now: new Date('2026-04-05T20:00:00.000Z') }
    );

    assert.equal(result.items.length, 1);
    assert.equal(result.items[0]?.title, 'Fresh Ohio OVI checkpoint notice');
    assert.equal(result.items[0]?.url, 'https://example.com/fresh');
  } finally {
    globalThis.fetch = originalFetch;
  }
}

await run();
