import { execSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

const repoRoot = process.cwd();
const protectedFiles = [
  'src/data/blogPosts.ts',
  'src/lib/structured-data.ts',
  'src/lib/contactInfo.ts',
  'src/data/practiceAreas.ts',
  'src/lib/seo-config.ts',
];
const schemaSensitiveFiles = [
  'src/lib/structured-data.ts',
  'src/lib/seo.tsx',
  'src/lib/seo-metadata.ts',
  'src/components/StructuredData.tsx',
  'src/app/sitemap.ts',
  'src/app/robots.ts',
];
const firmFactSensitiveFiles = [
  'src/lib/contactInfo.ts',
  'src/lib/structured-data.ts',
];
const changelogFile = 'docs/CONTENT_CHANGELOG.md';
const baseRef = process.env.GITHUB_BASE_REF ? `origin/${process.env.GITHUB_BASE_REF}` : 'origin/main';

function run(cmd) {
  return execSync(cmd, { cwd: repoRoot, encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] }).trim();
}

function getDiffFiles() {
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

function getAddedLines(path) {
  const outputs = [];
  try {
    outputs.push(run(`git diff --unified=0 ${baseRef}...HEAD -- ${path}`));
  } catch (error) {
    // Ignore
  }
  try {
    outputs.push(run(`git diff --unified=0 -- ${path}`));
  } catch (error) {
    // Ignore
  }
  try {
    outputs.push(run(`git diff --unified=0 --cached -- ${path}`));
  } catch (error) {
    // Ignore
  }
  return outputs
    .join('\n')
    .split('\n')
    .filter((line) => line.startsWith('+') && !line.startsWith('+++'))
    .map((line) => line.slice(1).trim())
    .filter(Boolean);
}

const diffFiles = getDiffFiles();
const touchedProtected = diffFiles.filter((file) => protectedFiles.includes(file));
const touchedSchemaSensitive = diffFiles.filter((file) => schemaSensitiveFiles.includes(file));
const touchedFirmFacts = diffFiles.filter((file) => firmFactSensitiveFiles.includes(file));
const hasSensitiveEdits = touchedProtected.length > 0 || touchedSchemaSensitive.length > 0 || touchedFirmFacts.length > 0;

if (!hasSensitiveEdits) {
  process.exit(0);
}

if (!diffFiles.includes(changelogFile)) {
  console.error(
    `Content governance check failed: sensitive files changed without updating ${changelogFile}. ` +
      `Touched files: ${[...new Set([...touchedProtected, ...touchedSchemaSensitive, ...touchedFirmFacts])].join(', ')}`,
  );
  process.exit(1);
}

const changelogPath = join(repoRoot, changelogFile);
const changelogContent = readFileSync(changelogPath, 'utf8');
if (!hasChangelogSlugEntry(changelogContent)) {
  console.error(`Content governance check failed: ${changelogFile} must include at least one "Post slug" entry.`);
  process.exit(1);
}

const addedChangelogLines = getAddedLines(changelogFile);

if (!addedChangelogLines.some((line) => /Post slug(?: and title)?\s*:/i.test(line))) {
  console.error(
    `Content governance check failed: ${changelogFile} must add a new "Post slug and title" line when sensitive files change.`,
  );
  process.exit(1);
}

if (!addedChangelogLines.some((line) => /Approval token\s*:/i.test(line))) {
  console.error(
    `Content governance check failed: ${changelogFile} must include an "Approval token" field for sensitive changes.`,
  );
  process.exit(1);
}

if ((touchedSchemaSensitive.length > 0 || touchedFirmFacts.length > 0) &&
    !addedChangelogLines.some((line) => /Meta\/schema changed\?\s*:?\s*/i.test(line))) {
  console.error(
    `Content governance check failed: ${changelogFile} must include a "Meta/schema changed?" field when schema or firm facts change.`,
  );
  process.exit(1);
}
