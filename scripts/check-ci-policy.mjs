import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { readFileSync, readdirSync } from 'node:fs';
import { createRequire } from 'node:module';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

// Use ESLint's already-locked YAML dependency; no new CI dependency or secret.
const require = createRequire(import.meta.url);
const yaml = createRequire(require.resolve('eslint/package.json'))('js-yaml');
const metadataHash = '8c9932f4c159b2102751e7c7300ba0d6495c01911489fb3bc3a5551731bb3457';
export function readWorkflows() {
  const dir = new URL('../.github/workflows/', import.meta.url);
  return new Map(readdirSync(dir).filter((name) => /\.ya?ml$/.test(name)).map((name) => [name, readFileSync(new URL(name, dir), 'utf8')]));
}
export function checkCiPolicy(files) {
  const metadata = files.get('pr-standardize-on-pr.yml');
  assert(metadata, 'Audited metadata workflow missing');
  assert.equal(createHash('sha256').update(metadata).digest('hex'), metadataHash, 'Privileged metadata workflow changed; review its policy hash');
  for (const [name, raw] of files) {
    const workflow = yaml.load(raw);
    const events = typeof workflow.on === 'string' ? [workflow.on] : Array.isArray(workflow.on) ? workflow.on : Object.keys(workflow.on ?? {});
    for (const event of events.filter((key) => ['pull_request', 'pull_request_target', 'merge_group'].includes(key))) {
      if (name === 'ci.yml') assert.notEqual(event, 'pull_request_target', 'CI must not run privileged PR code');
      else {
        assert.equal(name, 'pr-standardize-on-pr.yml', 'Unauthorized PR/queue workflow');
        assert.equal(event, 'pull_request_target', 'Metadata workflow event changed');
      }
    }
  }
  const ci = yaml.load(files.get('ci.yml'));
  assert.deepEqual(ci.on, { push: { branches: ['main'] }, pull_request: { branches: ['main'] }, merge_group: { types: ['checks_requested'] } }, 'All PR and merge-group checks must be requested without path filters');
  assert.deepEqual(ci.permissions, { contents: 'read' }, 'CI token must remain read-only');
  const commands = {
    build: ['npm ci', 'npm run content:check', 'npm run check:structured-data', 'npm run seo:smoke', 'npm run docs:parity', 'npm run typecheck', 'npm run build'],
    lint: ['npm ci', 'npm run lint'],
    test: ['npm ci', 'npm test'],
    guard: ['npm ci --ignore-scripts', 'node scripts/check-ci-policy.mjs'],
  };
  assert.deepEqual(Object.keys(ci.jobs).sort(), Object.keys(commands).sort(), 'Stable required job IDs changed');
  for (const [name, required] of Object.entries(commands)) {
    const job = ci.jobs[name];
    for (const key of ['if', 'needs', 'strategy', 'name', 'continue-on-error', 'permissions']) assert(!(key in job), name + ': required checks must be unconditional and inherit read-only permissions');
    assert.equal(job['runs-on'], 'ubuntu-latest');
    assert(Number.isInteger(job['timeout-minutes']) && job['timeout-minutes'] > 0 && job['timeout-minutes'] <= 25, name + ': timeout must fit the queue');
    assert(job.steps.some((step) => step.uses === 'actions/checkout@v4' && step.with?.['persist-credentials'] === false && !step.with?.ref), name + ': checkout must use the event SHA without persisted credentials');
    for (const step of job.steps) {
      assert(!('if' in step) && !('continue-on-error' in step), name + ': steps must not skip or suppress failures');
      assert(!step.uses?.startsWith('./'), name + ': no local action code');
    }
    for (const command of required) assert(job.steps.some((step) => step.run === command), name + ': missing ' + command);
  }
}
if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  checkCiPolicy(readWorkflows());
  console.log('CI policy passed: unconditional PR/queue checks and unchanged metadata-only automation.');
}
