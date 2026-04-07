export type ContentOpportunityType =
  | 'money_page_refresh'
  | 'support_cluster'
  | 'support_asset'
  | 'proof_refresh';

export type ContentOpportunityPriority = 'high' | 'medium' | 'low';

export type ContentOpportunityStatus = 'idea' | 'brief_ready' | 'drafting' | 'scheduled' | 'published' | 'parked';

export interface ContentOpportunitySeed {
  slug: string;
  title: string;
  primaryKeyword: string;
  supportingKeywords: string[];
  targetUrl: string;
  opportunityType: ContentOpportunityType;
  priority: ContentOpportunityPriority;
  notes: string;
  recommendedInternalLinks: string[];
  sourceLabel: string;
  briefTitle: string;
  briefSlug: string;
  angle: string;
}

export interface BriefDraft {
  title: string;
  proposed_slug: string;
  content_type: 'page_refresh' | 'blog_post' | 'resource_update';
  target_url: string;
  angle: string;
  primary_keyword: string;
  supporting_keywords: string[];
  internal_link_targets: string[];
  source_requirements: string[];
  cta: string;
  status: 'draft' | 'approved' | 'assigned';
}

export const DEFAULT_CONTENT_OPPORTUNITY_SEEDS: ContentOpportunitySeed[] = [
  {
    slug: 'delaware-ovi-money-page-recovery-2026-04',
    title: 'Recover Delaware OVI and DUI money-page intent',
    primaryKeyword: 'delaware ohio ovi lawyer', supportingKeywords: ['delaware ohio dui attorney', 'delaware county ohio ovi lawyer', 'delaware municipal court ovi lawyer'],
    targetUrl: '/ovi-dui-defense-delaware-oh',
    opportunityType: 'money_page_refresh', priority: 'high',
    notes: 'Impressions exist for DUI and OVI head terms, but clicks are still mostly branded. Keep the main pillar local, procedural, and conversion-focused.',
    recommendedInternalLinks: ['/als-license-suspension-ohio', '/first-offense-ovi-ohio', '/resources/dui-checkpoints'], sourceLabel: 'GSC + BrightLocal April 2026',
    briefTitle: 'Delaware OVI money-page refresh brief', briefSlug: 'delaware-ovi-money-page-refresh-brief',
    angle: 'Tighten local OVI intent, Delaware court context, and conversion paths on the primary OVI pillar.',
  },
  {
    slug: 'delaware-criminal-defense-cluster-recovery-2026-04',
    title: 'Recover Delaware criminal-defense cluster coverage',
    primaryKeyword: 'delaware ohio criminal defense attorney', supportingKeywords: ['delaware ohio drug charges attorney', 'delaware ohio domestic violence lawyer'],
    targetUrl: '/criminal-defense-delaware-oh',
    opportunityType: 'money_page_refresh', priority: 'high',
    notes: 'Current visibility suggests the cluster needs cleaner query-to-page alignment around domestic violence and drug-charge support, not a new generic page.',
    recommendedInternalLinks: ['/drug-crime-lawyer-delaware-oh', '/domestic-violence-lawyer-delaware-oh', '/glossary'], sourceLabel: 'BrightLocal April 2026 losses',
    briefTitle: 'Delaware criminal-defense recovery brief', briefSlug: 'delaware-criminal-defense-recovery-brief',
    angle: 'Rebuild topical ownership around Delaware criminal defense by tightening internal links into charge-specific support pages.',
  },
  {
    slug: 'checkpoint-freshness-cluster-2026-04',
    title: 'Expand the Ohio checkpoint freshness cluster',
    primaryKeyword: 'ovi checkpoints ohio', supportingKeywords: ['dui checkpoints ohio', 'holiday ovi enforcement ohio', 'easter ovi checkpoints ohio'],
    targetUrl: '/resources/dui-checkpoints',
    opportunityType: 'support_asset', priority: 'high',
    notes: 'Manual search is surfacing checkpoint discovery on Reddit, Facebook, and local news before it shows up in the existing feed. Use the resource hub as the cluster center.',
    recommendedInternalLinks: ['/holiday-ovi-enforcement-ohio', '/ovi-checkpoints-ohio', '/ovi-dui-defense-delaware-oh'], sourceLabel: 'Manual search workflow + checkpoint operations',
    briefTitle: 'Checkpoint freshness and holiday support brief', briefSlug: 'checkpoint-freshness-support-brief',
    angle: 'Support the live checkpoint hub with timely seasonal explainers and clear links into OVI help pages.',
  },
];

export function getMissingOpportunitySeeds(existingSlugs: string[]): ContentOpportunitySeed[] {
  const existing = new Set(existingSlugs);
  return DEFAULT_CONTENT_OPPORTUNITY_SEEDS.filter((seed) => !existing.has(seed.slug));
}

export function buildBriefFromOpportunity(opportunity: Pick<
  ContentOpportunitySeed,
  'briefTitle' | 'briefSlug' | 'opportunityType' | 'targetUrl' | 'angle' | 'primaryKeyword' | 'supportingKeywords' | 'recommendedInternalLinks'
>): BriefDraft {
  const content_type = opportunity.opportunityType === 'money_page_refresh' || opportunity.opportunityType === 'proof_refresh'
    ? 'page_refresh'
    : opportunity.opportunityType === 'support_asset' ? 'resource_update' : 'blog_post';
  const sourceRequirements = opportunity.opportunityType === 'support_asset'
    ? ['Use only publicly announced checkpoints or clearly label watch periods.', 'Do not treat social discovery alone as confirmation.']
    : ['Use current Ohio legal sources and already-supported firm facts only.', 'Do not add unsupported outcomes, awards, or credentials.'];
  const cta = content_type === 'resource_update' ? 'Check current Ohio checkpoint updates' : 'Request a consultation';

  return {
    title: opportunity.briefTitle,
    proposed_slug: opportunity.briefSlug,
    content_type,
    target_url: opportunity.targetUrl,
    angle: opportunity.angle,
    primary_keyword: opportunity.primaryKeyword,
    supporting_keywords: opportunity.supportingKeywords,
    internal_link_targets: opportunity.recommendedInternalLinks,
    source_requirements: sourceRequirements,
    cta,
    status: 'draft',
  };
}
