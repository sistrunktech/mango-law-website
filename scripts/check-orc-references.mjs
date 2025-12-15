import fs from 'node:fs';
import path from 'node:path';

const repoRoot = process.cwd();

const SRC_DIR = path.join(repoRoot, 'src');
const STATUTES_FILE = path.join(repoRoot, 'src', 'data', 'statutes.ts');
const ORC_SECTION_RE = /\b(\d{4}\.\d{2,3})\b/g;
const STATUTE_KEY_RE = /^\s*'(\d{4}\.\d{2,3})'\s*:/gm;

function* walk(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      yield* walk(fullPath);
      continue;
    }
    if (!entry.isFile()) continue;
    if (!/\.(ts|tsx)$/.test(entry.name)) continue;
    yield fullPath;
  }
}

function readText(filePath) {
  return fs.readFileSync(filePath, 'utf8');
}

function extractDefinedSections(statutesText) {
  const defined = new Set();
  for (const match of statutesText.matchAll(STATUTE_KEY_RE)) {
    defined.add(match[1]);
  }
  return defined;
}

function extractReferencedSections(text) {
  const refs = new Set();
  for (const match of text.matchAll(ORC_SECTION_RE)) {
    refs.add(match[1]);
  }
  return refs;
}

const statutesText = readText(STATUTES_FILE);
const definedSections = extractDefinedSections(statutesText);

const referencedSections = new Set();
const referenceFilesBySection = new Map();

for (const absPath of walk(SRC_DIR)) {
  const relPath = path.relative(repoRoot, absPath).split(path.sep).join('/');
  const text = readText(absPath);
  const refs = extractReferencedSections(text);

  for (const section of refs) {
    referencedSections.add(section);
    const files = referenceFilesBySection.get(section) ?? new Set();
    files.add(relPath);
    referenceFilesBySection.set(section, files);
  }
}

const missing = [...referencedSections].filter((s) => !definedSections.has(s)).sort();

if (missing.length) {
  console.error('\n✗ Missing ORC glossary entries for referenced sections.\n');
  console.error(
    `Add them to src/data/statutes.ts (ohioStatutes), or remove/replace the references.\n`
  );

  for (const section of missing) {
    const files = [...(referenceFilesBySection.get(section) ?? [])].sort();
    console.error(`- ${section}${files.length ? ` (referenced in: ${files.slice(0, 5).join(', ')}${files.length > 5 ? ', …' : ''})` : ''}`);
  }

  console.error();
  process.exit(1);
}

