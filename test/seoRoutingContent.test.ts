import assert from 'node:assert/strict';
import {
  aboutPageMetaDescription,
  aboutSupportLinks,
  contactIssueGuideLinks,
  contactPageMetaDescription,
  domesticViolencePageMetaDescription,
  domesticViolenceSupportLinks,
  drugCrimePageMetaDescription,
  drugCrimeSupportLinks,
  reviewsPageMetaDescription,
  reviewsSupportLinks,
} from '../src/data/seoRoutingContent.ts';

function hrefSet(links: { href: string }[]) {
  return new Set(links.map((link) => link.href));
}

function run() {
  assert.match(aboutPageMetaDescription, /criminal defense/i);
  assert.match(reviewsPageMetaDescription, /OVI/i);
  assert.match(contactPageMetaDescription, /protection-order/i);
  assert.match(domesticViolencePageMetaDescription, /no-contact/i);
  assert.match(drugCrimePageMetaDescription, /trafficking/i);

  const aboutHrefs = hrefSet(aboutSupportLinks);
  assert.ok(aboutHrefs.has('/domestic-violence-lawyer-delaware-oh'));
  assert.ok(aboutHrefs.has('/drug-crime-lawyer-delaware-oh'));
  assert.ok(aboutHrefs.has('/resources/dui-checkpoints'));

  const reviewsHrefs = hrefSet(reviewsSupportLinks);
  assert.ok(reviewsHrefs.has('/ovi-dui-defense-delaware-oh'));
  assert.ok(reviewsHrefs.has('/criminal-defense-delaware-oh'));
  assert.ok(reviewsHrefs.has('/contact'));

  const contactHrefs = hrefSet(contactIssueGuideLinks);
  assert.ok(contactHrefs.has('/domestic-violence-lawyer-delaware-oh'));
  assert.ok(contactHrefs.has('/drug-crime-lawyer-delaware-oh'));
  assert.ok(contactHrefs.has('/civil-protection-order-defense-ohio'));

  const domesticHrefs = hrefSet(domesticViolenceSupportLinks);
  assert.ok(domesticHrefs.has('/domestic-violence-first-offense-ohio-defense'));
  assert.ok(domesticHrefs.has('/protection-order-lawyer-delaware-oh'));
  assert.ok(domesticHrefs.has('/criminal-defense-delaware-oh'));

  const drugHrefs = hrefSet(drugCrimeSupportLinks);
  assert.ok(drugHrefs.has('/drug-possession-vs-trafficking-ohio-defense'));
  assert.ok(drugHrefs.has('/blog/drug-possession-charge-ohio-what-to-do-next'));
  assert.ok(drugHrefs.has('/criminal-defense-delaware-oh'));
}

run();
