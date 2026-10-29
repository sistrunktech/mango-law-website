import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import test from 'node:test';
import { checkCiPolicy, readWorkflows } from '../scripts/check-ci-policy.mjs';

const require = createRequire(import.meta.url);
const yaml = createRequire(require.resolve('eslint/package.json'))('js-yaml');
const baseline = readWorkflows();
test('current CI reports all required PR and queue jobs', () => checkCiPolicy(baseline));
const cases = [
  ['missing queue trigger', (ci) => { delete ci.on.merge_group; }],
  ['path-filtered PR checks', (ci) => { ci.on.pull_request.paths = ['src/**']; }],
  ['privileged CI trigger', (ci) => { ci.on.pull_request_target = {}; }],
  ['conditional required job', (ci) => { ci.jobs.test.if = 'false'; }],
  ['dependent required job', (ci) => { ci.jobs.test.needs = 'build'; }],
  ['renamed check context', (ci) => { ci.jobs.test.name = 'optional-tests'; }],
  ['suppressed test failures', (ci) => { ci.jobs.test['continue-on-error'] = true; }],
  ['suppressed step failures', (ci) => { ci.jobs.test.steps.at(-1)['continue-on-error'] = true; }],
  ['removed test command', (ci) => { ci.jobs.test.steps.at(-1).run = 'echo skipped'; }],
  ['write-enabled CI token', (ci) => { ci.permissions.contents = 'write'; }],
  ['unsupported CI toolchain', (ci) => { ci.jobs.test.steps[1].with['node-version'] = 20; }],
  ['persisted checkout token', (ci) => { ci.jobs.guard.steps[0].with['persist-credentials'] = true; }],
  ['checkout of another ref', (ci) => { ci.jobs.test.steps[0].with.ref = 'main'; }],
];
for (const [name, mutate] of cases) test('rejects ' + name, () => {
  const files = new Map(baseline), ci = yaml.load(files.get('ci.yml'));
  mutate(ci);
  files.set('ci.yml', JSON.stringify(ci));
  assert.throws(() => checkCiPolicy(files));
});
for (const event of ['pull_request', 'pull_request_target', 'merge_group']) test('rejects unauthorized ' + event + ' workflow', () => {
  const files = new Map(baseline);
  files.set('unapproved.yml', JSON.stringify({ on: event, jobs: {} }));
  assert.throws(() => checkCiPolicy(files), /Unauthorized/);
});
test('privileged metadata workflow cannot silently change', () => {
  const files = new Map(baseline), name = 'pr-standardize-on-pr.yml';
  files.set(name, files.get(name) + '\n# unreviewed policy change\n');
  assert.throws(() => checkCiPolicy(files), /policy hash/);
});
test('audited metadata workflow must remain present', () => {
  const files = new Map(baseline);
  files.delete('pr-standardize-on-pr.yml');
  assert.throws(() => checkCiPolicy(files), /workflow missing/);
});
