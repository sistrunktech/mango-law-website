import { execSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

const repoRoot = process.cwd();
const protectedFile = 'src/data/blogPosts.ts';
const changelogFile = 'docs/CONTENT_CHANGELOG.md';

function run(cmd) {
  return execSync(cmd, { cwd: repoRoot, encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] }).trim();
}

function getDiffFiles() {
  const baseRef = process.env.GITHUB_BASE_REF ? `origin/${process.env.GITHUB_BASE_REF}` : 'origin/main';
  const files = new Set();
  try {
    const output = run(`git diff --name-only ${baseRef}...HEAD`);
    output.split('\n').filter(Boolean).forEach((file) => files.add(file));
  } catch (error) {
    try {
      const output = run('git diff --name-only HEAD~1...HEAD');
      output.split('\n').filter(Boolean).forEach((file) => files.add(file));
    } catch (fallbackError) {
      // Ignore
    }
  }

  try {
    const output = run('git diff --name-only');
    output.split('\n').filter(Boolean).forEach((file) => files.add(file));
  } catch (error) {
    // Ignore
  }

  try {
    const output = run('git diff --name-only --cached');
    output.split('\n').filter(Boolean).forEach((file) => files.add(file));
  } catch (error) {
    // Ignore
  }

  return Array.from(files);
}

function hasChangelogSlugEntry(content) {
  return /Post slug(?: and title)?\s*:\s*\S+/i.test(content);
}

const diffFiles = getDiffFiles();
const touchedProtected = diffFiles.includes(protectedFile);

if (!touchedProtected) {
  process.exit(0);
}

if (!diffFiles.includes(changelogFile)) {
  console.error(`Content governance check failed: ${protectedFile} was modified without updating ${changelogFile}.`);
  process.exit(1);
}

const changelogPath = join(repoRoot, changelogFile);
const changelogContent = readFileSync(changelogPath, 'utf8');
if (!hasChangelogSlugEntry(changelogContent)) {
  console.error(`Content governance check failed: ${changelogFile} must include at least one "Post slug" entry.`);
  process.exit(1);
}
