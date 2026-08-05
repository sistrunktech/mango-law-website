import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const readSource = (relativePath) =>
  readFileSync(new URL(`../${relativePath}`, import.meta.url), 'utf8');

const consentBanner = readSource('src/components/ConsentBanner.tsx');
const accessibilityLauncher = readSource('src/components/AccessibilityLauncher.tsx');
const chatLauncher = readSource('src/components/ChatIntakeLauncher.tsx');
const blogPage = readSource('src/views/BlogPage.tsx');
const layout = readSource('src/components/Layout.tsx');
const checkpointMap = readSource('src/components/CheckpointMap.tsx');
const checkpointMapSmoke = readSource('scripts/checkpoint-map-smoke.mjs');
const leadBackendFallback = readSource('src/components/LeadBackendFallback.tsx');
const quickIntake = readSource('src/components/QuickIntakeForm.tsx');
const contactForm = readSource('src/components/ContactForm.tsx');
const leadCaptureModal = readSource('src/components/LeadCaptureModal.tsx');
const conversationWindow = readSource('src/components/chat/ConversationWindow.tsx');

assert.match(consentBanner, /className="relative z-40/);
assert.match(consentBanner, /aria-labelledby="cookie-consent-title"/);
assert.doesNotMatch(consentBanner, /fixed inset-x-0 bottom-0/);
assert.equal((consentBanner.match(/className=\{buttonDecision\}/g) ?? []).length, 3);

assert.match(accessibilityLauncher, /right-\[4\.75rem\]/);
assert.match(chatLauncher, /hidden lg:inline/);
assert.equal((accessibilityLauncher + chatLauncher).match(/max-lg:pointer-events-none/g)?.length, 2);
assert.match(layout, /window\.scrollY < 160/);
assert.match(blogPage, /htmlFor="blog-search"/);
assert.match(blogPage, /id="blog-search"/);
assert.match(blogPage, /aria-pressed=\{selectedCategory === category\}/);
assert.match(checkpointMap, /mapInstance\.on\('load', markMapReady\)[\s\S]*mapInstance\.on\('style\.load', markMapReady\)/);
assert.match(checkpointMap, /getFatalMapboxLoadError\(event\)/);
assert.match(checkpointMap, /console\.warn\('Mapbox emitted a pre-load error; waiting for the map to finish loading\.'/);
assert.match(checkpointMap, /onClick=\{retryInteractiveMap\}/);
assert.match(checkpointMap, /(?=[\s\S]*activeMap\.off\('style\.load', markMapReady\))(?=[\s\S]*window\.clearTimeout\(loadTimeout\))(?=[\s\S]*Current list view)/);
assert.match(checkpointMapSmoke, /CHECKPOINT_MAP_SMOKE_URL is required[\s\S]*targetUrl\.pathname = '\/resources\/dui-checkpoints'[\s\S]*scrollIntoView[\s\S]*mapboxgl-canvas[\s\S]*hasFeedError \|\| mapState\.hasMapError/);
assert.match(checkpointMapSmoke, /waitForFunction[\s\S]*Live checkpoint map and recent history[\s\S]*scrollIntoView/);
assert.match(checkpointMapSmoke, /VERCEL_AUTOMATION_BYPASS_SECRET[\s\S]*requestUrl\.origin === targetUrl\.origin[\s\S]*x-vercel-protection-bypass/);
assert.match(checkpointMapSmoke, /loadedUrl\.origin !== targetUrl\.origin[\s\S]*protected Vercel preview/);
assert.match(leadBackendFallback, /checkLeadBackendAvailability[\s\S]*window\.addEventListener\('online', checkAvailability\)/);
assert.match(leadBackendFallback, /availableUntil[\s\S]*availabilityPromise = null/);
assert.match(leadBackendFallback, /result === 'unavailable' && !hasRetried[\s\S]*window\.setTimeout\(checkAvailability, 5_000\)/);
assert.match(quickIntake, /sm:col-span-2[\s\S]*id="quick_email"[\s\S]*required[\s\S]*\{showDetails &&/);
assert.match(quickIntake, /const email = String\(formData\.get\('email'\) \|\| ''\)\.trim\(\)[\s\S]*email,/);
assert.match(quickIntake, /trackFallbackPhoneLead\('quick_intake_turnstile_fallback_call'/);
assert.match(contactForm, /trackFallbackPhoneLead\('contact_form_turnstile_fallback_call'/);
assert.match(leadCaptureModal, /trackFallbackPhoneLead\('lead_modal_turnstile_fallback_call'/);
assert.match(conversationWindow, /trackFallbackPhoneLead\('chat_turnstile_fallback_call'/);
