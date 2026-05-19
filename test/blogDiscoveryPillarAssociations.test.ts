import assert from 'node:assert/strict';
import { blogPosts } from '../src/data/blogPosts.ts';
import { blogIssuePathGroups, homepageBlogPrioritySlugs, oviFastPathLinks } from '../src/data/blogDiscovery.ts';
import { getBlogCtaContent } from '../src/lib/blogCtas.ts';
import { selectRelatedBlogPosts } from '../src/lib/relatedBlogPosts.ts';

function run() {
  const postsBySlug = new Map(blogPosts.map((post) => [post.slug, post]));
  const publicRoutes = new Set([
    '/resources/dui-checkpoints',
    '/ovi-dui-defense-delaware-oh',
    '/first-offense-ovi-ohio',
    '/als-license-suspension-ohio',
    '/motion-to-suppress-ovi-ohio',
    '/criminal-defense-delaware-oh',
    '/protection-order-lawyer-delaware-oh',
    '/domestic-violence-lawyer-delaware-oh',
    '/drug-crime-lawyer-delaware-oh',
    '/drug-possession-vs-trafficking-ohio-defense',
    '/contact',
  ]);
  const checkpointAfterStopPost = postsBySlug.get('what-to-do-after-dui-checkpoint-stop-ohio');
  const cdlOviPost = postsBySlug.get('cdl-out-of-state-driver-ovi-ohio');
  const cpoHearingPost = postsBySlug.get('civil-protection-order-hearing-delaware-county-ohio');
  const noContactBondPost = postsBySlug.get('no-contact-bond-terms-domestic-violence-ohio');
  const criminalTimelinePost = postsBySlug.get('delaware-county-criminal-case-timeline');
  const drugVehiclePost = postsBySlug.get('drug-possession-in-car-ohio');

  assert.ok(checkpointAfterStopPost, 'checkpoint after-stop article should exist');
  assert.ok(cdlOviPost, 'CDL/out-of-state OVI article should exist');
  assert.ok(cpoHearingPost, 'CPO hearing article should exist');
  assert.ok(noContactBondPost, 'no-contact bond terms article should exist');
  assert.ok(criminalTimelinePost, 'criminal timeline article should exist');
  assert.ok(drugVehiclePost, 'drug vehicle article should exist');

  for (const slug of homepageBlogPrioritySlugs) {
    assert.ok(postsBySlug.has(slug), `homepage priority slug should exist: ${slug}`);
  }

  assert.equal(homepageBlogPrioritySlugs[0], 'cdl-out-of-state-driver-ovi-ohio');
  assert.ok(
    oviFastPathLinks.some((link) => link.href === '/blog/cdl-out-of-state-driver-ovi-ohio'),
    'OVI fast paths should surface the CDL/out-of-state OVI article'
  );
  assert.ok(
    oviFastPathLinks.some((link) => link.href === '/blog/what-to-do-after-dui-checkpoint-stop-ohio'),
    'OVI fast paths should surface the checkpoint after-stop article'
  );
  assert.ok(
    !oviFastPathLinks.some((link) => link.href.includes('drug-possession')),
    'OVI fast paths should not route users into the drug-crimes pillar'
  );
  assert.deepEqual(
    blogIssuePathGroups.map((group) => group.label),
    ['OVI / DUI', 'Criminal Case', 'Protection / Domestic', 'Drug Charges']
  );

  for (const group of blogIssuePathGroups) {
    for (const link of group.links) {
      if (link.href.startsWith('/blog/')) {
        assert.ok(postsBySlug.has(link.href.replace('/blog/', '')), `blog issue path should use a real post: ${link.href}`);
      } else {
        assert.ok(publicRoutes.has(link.href), `blog issue path should use a known public route: ${link.href}`);
      }
    }
  }

  const content = checkpointAfterStopPost.content;
  for (const href of [
    '/blog/ohio-dui-checkpoint-hotspots',
    '/resources/dui-checkpoints',
    '/ovi-dui-defense-delaware-oh',
    '/first-offense-ovi-ohio',
    '/als-license-suspension-ohio',
    '/motion-to-suppress-ovi-ohio',
  ]) {
    assert.ok(content.includes(href), `checkpoint after-stop article should link to ${href}`);
  }

  const relatedPosts = selectRelatedBlogPosts({
    post: checkpointAfterStopPost,
    posts: blogPosts,
    limit: 3,
  });
  assert.deepEqual(
    relatedPosts.map((post) => post.slug),
    [
      'ohio-dui-checkpoint-hotspots',
      'ohio-ovi-driving-privileges-als',
      'first-ovi-court-date-delaware-county-ohio',
    ]
  );

  const checkpointLegalityPost = postsBySlug.get('ohio-dui-checkpoint-hotspots');
  assert.ok(checkpointLegalityPost?.content.includes('/blog/what-to-do-after-dui-checkpoint-stop-ohio'));

  for (const href of [
    '/ovi-dui-defense-delaware-oh',
    '/als-license-suspension-ohio',
    '/first-offense-ovi-ohio',
    '/blog/ohio-ovi-driving-privileges-als',
    '/ovi-test-refusal-lawyer-ohio',
    '/motion-to-suppress-ovi-ohio',
  ]) {
    assert.ok(cdlOviPost.content.includes(href), `CDL/out-of-state OVI article should link to ${href}`);
  }

  const cdlRelatedPosts = selectRelatedBlogPosts({
    post: cdlOviPost,
    posts: blogPosts,
    limit: 3,
  });
  assert.deepEqual(
    cdlRelatedPosts.map((post) => post.slug),
    [
      'ohio-ovi-driving-privileges-als',
      'first-ovi-court-date-delaware-county-ohio',
      'ovi-refusal-vs-failed-test-ohio',
    ]
  );

  const domesticIssueGroup = blogIssuePathGroups.find((group) => group.label === 'Protection / Domestic');
  assert.ok(
    domesticIssueGroup?.links.some((link) => link.href === '/blog/no-contact-bond-terms-domestic-violence-ohio'),
    'Protection / Domestic issue path should surface the no-contact bond article'
  );
  assert.ok(
    noContactBondPost.content.includes('/domestic-violence-lawyer-delaware-oh') &&
      noContactBondPost.content.includes('/protection-order-lawyer-delaware-oh') &&
      noContactBondPost.content.includes('/blog/no-contact-order-vs-civil-protection-order-ohio'),
    'no-contact bond article should route readers into DV/protection pillar pages'
  );

  assert.match(getBlogCtaContent(checkpointAfterStopPost).heading, /OVI|checkpoint|license/i);
  assert.match(getBlogCtaContent(cpoHearingPost).heading, /CPO|no-contact|domestic/i);
  assert.ok(
    getBlogCtaContent(noContactBondPost).nextSteps.some(
      (step) => step.href === '/blog/no-contact-bond-terms-domestic-violence-ohio'
    ),
    'DV blog CTA should include the no-contact bond article as a next step'
  );
  assert.match(getBlogCtaContent(criminalTimelinePost).heading, /criminal case/i);
  assert.match(getBlogCtaContent(drugVehiclePost).heading, /drug/i);
}

run();
