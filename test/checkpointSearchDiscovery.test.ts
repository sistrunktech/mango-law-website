import assert from 'node:assert/strict';
import { collectCheckpointSearchCandidates } from '../supabase/functions/checkpoint-scraper/search-discovery.ts';

function run() {
  const candidates = collectCheckpointSearchCandidates('site:reddit.com ovi checkpoint ohio', [
    {
      title: 'OVI checkpoints Friday night',
      link: 'https://www.reddit.com/r/toledo/comments/example/?utm_source=feed',
      snippet: 'Reddit post linking people to 13abc coverage of two Lucas County checkpoint locations.',
      date: '2026-04-05',
    },
    {
      title: 'Sobriety checkpoint in Upper Arlington Friday night',
      link: 'https://abc6onyourside.com/news/local/dui-checkpoint-in-upper-arlington-friday-night',
      snippet: 'Police announced an Ohio traffic safety checkpoint for Friday night.',
      date: '2026-03-13',
    },
    {
      title: 'My sobriety journey after rehab',
      link: 'https://www.reddit.com/r/stopdrinking/comments/not-a-checkpoint',
      snippet: 'Early sobriety, addiction recovery, and rehab reflections.',
      date: '2026-04-05',
    },
    {
      title: 'OVI checkpoints Friday night',
      link: 'https://www.reddit.com/r/toledo/comments/example/?utm_medium=social',
      snippet: 'Duplicate of the same checkpoint discussion.',
      date: '2026-04-05',
    },
  ]);

  assert.equal(candidates.length, 2);
  assert.equal(candidates[0]?.sourceName, 'reddit.com');
  assert.equal(candidates[0]?.url, 'https://www.reddit.com/r/toledo/comments/example/');
  assert.equal(candidates[1]?.sourceName, 'abc6onyourside.com');
  assert.ok(candidates.every((candidate) => !candidate.summary?.includes('rehab')));
}

run();
