import assert from 'node:assert/strict';
import {
  DEFAULT_CONTENT_OPPORTUNITY_SEEDS,
  buildBriefFromOpportunity,
  getMissingOpportunitySeeds,
} from '../src/lib/contentOps.ts';

function run() {
  const opportunity = DEFAULT_CONTENT_OPPORTUNITY_SEEDS[0];
  const brief = buildBriefFromOpportunity(opportunity);

  assert.equal(brief.content_type, 'page_refresh');
  assert.equal(brief.proposed_slug, opportunity.briefSlug);
  assert.deepEqual(brief.internal_link_targets, opportunity.recommendedInternalLinks);
  assert.ok(brief.source_requirements.length >= 1);

  const missing = getMissingOpportunitySeeds([opportunity.slug]);
  assert.equal(missing.some((seed) => seed.slug === opportunity.slug), false);
  assert.equal(missing.length, DEFAULT_CONTENT_OPPORTUNITY_SEEDS.length - 1);

  const supportAsset = DEFAULT_CONTENT_OPPORTUNITY_SEEDS.find((seed) => seed.opportunityType === 'support_asset');
  assert.ok(supportAsset);
  assert.equal(buildBriefFromOpportunity(supportAsset!).content_type, 'resource_update');
}

run();
