import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const migration = await readFile(
  new URL(
    '../supabase/migrations/20260801023000_harden_public_checkpoint_read_views.sql',
    import.meta.url,
  ),
  'utf8',
);

assert.match(migration, /status <> 'cancelled'/);
assert.match(migration, /is_verified IS TRUE/);
assert.match(migration, /ovicheckpoint/);
assert.match(migration, /duiblock/);
assert.match(migration, /reddit/);
assert.match(migration, /facebook/);
assert.match(migration, /pending_details/);
assert.match(migration, /location_text, location_city, location_county/);
assert.match(migration, /REVOKE ALL ON public\.dui_checkpoints FROM anon/);
