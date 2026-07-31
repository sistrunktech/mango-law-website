import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const readSource = (relativePath) =>
  readFileSync(new URL(`../${relativePath}`, import.meta.url), 'utf8');

const consentBanner = readSource('src/components/ConsentBanner.tsx');
const accessibilityLauncher = readSource('src/components/AccessibilityLauncher.tsx');
const chatLauncher = readSource('src/components/ChatIntakeLauncher.tsx');
const blogPage = readSource('src/views/BlogPage.tsx');

assert.match(consentBanner, /className="relative z-40/);
assert.match(consentBanner, /aria-labelledby="cookie-consent-title"/);
assert.doesNotMatch(consentBanner, /fixed inset-x-0 bottom-0/);
assert.equal((consentBanner.match(/className=\{buttonDecision\}/g) ?? []).length, 3);

assert.match(accessibilityLauncher, /right-\[4\.75rem\]/);
assert.match(chatLauncher, /hidden lg:inline/);
assert.match(blogPage, /htmlFor="blog-search"/);
assert.match(blogPage, /id="blog-search"/);
assert.match(blogPage, /aria-pressed=\{selectedCategory === category\}/);
