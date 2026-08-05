import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const migration = await readFile(
  new URL(
    '../supabase/migrations/20260801023000_harden_public_checkpoint_read_views.sql',
    import.meta.url,
  ),
  'utf8',
);
const releaseGate = await readFile(
  new URL(
    '../docs/technical/checkpoint-public-view-release-2026-08-01.md',
    import.meta.url,
  ),
  'utf8',
);

assert.match(migration, /is_public_ohio_ovi_checkpoint/);
assert.match(migration, /normalized_county IN/);
assert.match(migration, /regexp_replace/);
assert.match(migration, /status <> 'cancelled'/);
assert.match(migration, /is_verified IS TRUE/);
assert.match(migration, /ovicheckpoint/);
assert.match(migration, /duiblock/);
assert.match(migration, /reddit/);
assert.match(migration, /facebook/);
assert.match(migration, /pending_details/);
assert.match(migration, /location_text, location_city, location_county/);
assert.match(migration, /tsa\|precheck\|global entry/);
assert.match(migration, /airport\|aviation\|border\|security/);
assert.match(migration, /lyft\|uber/);
assert.match(migration, /road\|traffic/);
assert.match(migration, /michigan\|indiana\|kentucky\|west virginia/);
assert.match(migration, /source_url ~\* '\^https\?:\/\//);
assert.match(migration, /NULL::text,\s+source_name/);
assert.match(migration, /GRANT EXECUTE ON FUNCTION/);
assert.match(migration, /REVOKE ALL ON public\.dui_checkpoints FROM anon/);
assert.match(releaseGate, /WHERE FALSE/);
assert.doesNotMatch(releaseGate, /WHERE source_url IS NOT NULL;/);
