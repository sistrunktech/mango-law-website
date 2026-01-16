import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';

const repoRoot = process.cwd();

const EXCLUDED_DIRS = new Set(['.git', 'node_modules', 'dist']);
const SAFE_PATH_RE = /^[A-Za-z0-9._/-]+$/;
const NEXT_APP_SAFE_RE = /^[A-Za-z0-9._/()[\]-]+$/;

function listTrackedPaths() {
  try {
    const out = execFileSync('git', ['ls-files', '-z'], { cwd: repoRoot });
    return out
      .toString('utf8')
      .split('\0')
      .map((p) => p.trim())
      .filter(Boolean);
  } catch {
    return null;
  }
}

function* walk(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    const relPath = path.relative(repoRoot, fullPath).split(path.sep).join('/');

    const parts = relPath.split('/');
    if (parts.some((p) => EXCLUDED_DIRS.has(p))) continue;

    yield relPath;
    if (entry.isDirectory()) yield* walk(fullPath);
  }
}

function getOffendingChars(relPath) {
  const offenders = new Set();
  for (const ch of relPath) {
    const isAscii = ch.charCodeAt(0) <= 127;
    const isSafe = /[A-Za-z0-9._/-]/.test(ch);
    if (!isAscii || !isSafe) offenders.add(ch);
  }
  return [...offenders];
}

const bad = [];
const tracked = listTrackedPaths();
const paths = tracked ?? [...walk(repoRoot)];

for (const relPath of paths) {
  const isNextAppRoute = relPath.startsWith('src/app/');
  const matcher = isNextAppRoute ? NEXT_APP_SAFE_RE : SAFE_PATH_RE;
  if (!matcher.test(relPath)) bad.push({ relPath, offenders: getOffendingChars(relPath) });
}

if (bad.length) {
  console.error('\n✗ Found filenames with unsupported characters for publishing.\n');
  for (const item of bad.slice(0, 50)) {
    console.error(`- ${item.relPath} (offenders: ${item.offenders.join(' ') || 'unknown'})`);
  }
  if (bad.length > 50) {
    console.error(`...and ${bad.length - 50} more`);
  }
  console.error('\nRename/remove those files and retry.\n');
  process.exit(1);
}
