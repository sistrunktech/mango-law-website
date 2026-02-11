import { existsSync, readFileSync } from 'node:fs';
import { basename, dirname, join } from 'node:path';

const repoRoot = process.cwd();
const repoName = basename(repoRoot);

const REQUIRED_DOCS = [
  'MASTER_PRD_AGENT_OPERATIONS.md',
  'ANNEX_TASK_CONTRACTS.md',
  'ANNEX_ACCEPTANCE_GATES.md',
  'ANNEX_EVIDENCE_AND_REPORTING.md',
  'ANNEX_ROLES_RACI.md',
  'ANNEX_STRUCTURED_DATA_POLICY.md',
  'ANNEX_DIRECTORY_ROI_POLICY.md',
];

const docsDir = join(repoRoot, 'docs/technical');
const missingDocs = [];
for (const file of REQUIRED_DOCS) {
  const fullPath = join(docsDir, file);
  if (!existsSync(fullPath)) missingDocs.push(fullPath);
}

if (missingDocs.length) {
  console.error('[docs:parity] Missing required PRD docs:');
  for (const missing of missingDocs) console.error(`- ${missing}`);
  process.exit(1);
}

const defaultMirrorRoot =
  repoName === 'mango-law-website'
    ? join(dirname(repoRoot), 'mango-law-website-gsc')
    : repoName === 'mango-law-website-gsc'
      ? join(dirname(repoRoot), 'mango-law-website')
      : null;

const mirrorRoot = process.env.MIRROR_REPO_PATH || defaultMirrorRoot;
if (!mirrorRoot || !existsSync(mirrorRoot)) {
  console.log(`[docs:parity] Mirror repo not found (${mirrorRoot || 'n/a'}). Skipping cross-repo parity compare.`);
  process.exit(0);
}

const mirrorDocsDir = join(mirrorRoot, 'docs/technical');
const mismatches = [];

for (const file of REQUIRED_DOCS) {
  const sourcePath = join(docsDir, file);
  const mirrorPath = join(mirrorDocsDir, file);

  if (!existsSync(mirrorPath)) {
    mismatches.push(`${file}: missing in mirror`);
    continue;
  }

  const sourceBody = readFileSync(sourcePath, 'utf8').replace(/\r\n/g, '\n');
  const mirrorBody = readFileSync(mirrorPath, 'utf8').replace(/\r\n/g, '\n');

  if (sourceBody !== mirrorBody) {
    mismatches.push(`${file}: content mismatch`);
  }
}

if (mismatches.length) {
  console.error('[docs:parity] PRD doc parity failed:');
  for (const mismatch of mismatches) console.error(`- ${mismatch}`);
  process.exit(1);
}

console.log(`[docs:parity] PASS (${repoName} <-> ${basename(mirrorRoot)})`);
