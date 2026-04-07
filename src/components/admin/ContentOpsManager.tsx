'use client';

import { useEffect, useMemo, useState } from 'react';
import { FileText, Sparkles } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { supabase } from '../../lib/supabaseClient';
import {
  DEFAULT_CONTENT_OPPORTUNITY_SEEDS,
  buildBriefFromOpportunity,
  getMissingOpportunitySeeds,
  type ContentOpportunityPriority,
  type ContentOpportunityStatus,
  type ContentOpportunityType,
} from '../../lib/contentOps';

type OpportunityRow = {
  id: string;
  slug: string;
  title: string;
  primary_keyword: string;
  supporting_keywords: string[];
  target_url: string;
  opportunity_type: ContentOpportunityType;
  priority: ContentOpportunityPriority;
  status: ContentOpportunityStatus;
  notes: string | null;
  recommended_internal_links: string[];
  source_label: string | null;
};

type BriefRow = {
  id: string;
  opportunity_id: string;
  title: string;
  content_type: string;
  status: string;
};

const badgeTone = {
  high: 'bg-red-500/15 text-red-200',
  medium: 'bg-amber-500/15 text-amber-200',
  low: 'bg-slate-700 text-slate-200',
} as const;

export default function ContentOpsManager() {
  const { user } = useAuth();
  const [opportunities, setOpportunities] = useState<OpportunityRow[]>([]);
  const [briefs, setBriefs] = useState<BriefRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    void loadData();
  }, []);

  async function loadData() {
    if (!supabase) {
      setLoading(false);
      return;
    }
    setLoading(true);
    const [opportunitiesResult, briefsResult] = await Promise.all([
      supabase.from('content_opportunities').select('*').order('priority', { ascending: true }).order('created_at', { ascending: false }),
      supabase.from('content_briefs').select('id, opportunity_id, title, content_type, status').order('created_at', { ascending: false }),
    ]);

    if (!opportunitiesResult.error && opportunitiesResult.data) setOpportunities(opportunitiesResult.data as OpportunityRow[]);
    if (!briefsResult.error && briefsResult.data) setBriefs(briefsResult.data as BriefRow[]);
    setLoading(false);
  }

  const missingSeeds = useMemo(() => getMissingOpportunitySeeds(opportunities.map((opportunity) => opportunity.slug)), [opportunities]);
  const briefsByOpportunityId = useMemo(
    () => new Map(briefs.map((brief) => [brief.opportunity_id, brief])),
    [briefs]
  );

  async function handleSeedOpportunities() {
    if (!supabase || saving || missingSeeds.length === 0) return;
    setSaving(true);
    const { error } = await supabase.from('content_opportunities').insert(
      missingSeeds.map((seed) => ({
        slug: seed.slug,
        title: seed.title,
        primary_keyword: seed.primaryKeyword,
        supporting_keywords: seed.supportingKeywords,
        search_intent: seed.opportunityType === 'support_asset' ? 'informational' : 'commercial',
        target_url: seed.targetUrl,
        opportunity_type: seed.opportunityType,
        priority: seed.priority,
        status: 'idea',
        notes: seed.notes,
        recommended_internal_links: seed.recommendedInternalLinks,
        source_label: seed.sourceLabel,
        created_by: user?.id ?? null,
      }))
    );
    if (!error) await loadData();
    setSaving(false);
  }

  async function handleCreateBrief(opportunity: OpportunityRow) {
    if (!supabase || saving || briefsByOpportunityId.has(opportunity.id)) return;
    setSaving(true);
    const seed = DEFAULT_CONTENT_OPPORTUNITY_SEEDS.find((item) => item.slug === opportunity.slug);
    if (!seed) return setSaving(false);

    const draft = buildBriefFromOpportunity(seed);
    const { error } = await supabase.from('content_briefs').insert({
      opportunity_id: opportunity.id,
      ...draft,
      created_by: user?.id ?? null,
    });

    if (!error) {
      await supabase.from('content_opportunities').update({ status: 'brief_ready' }).eq('id', opportunity.id);
      await loadData();
    }
    setSaving(false);
  }

  if (loading) return <div className="text-slate-300">Loading content opportunities...</div>;

  return (
    <div className="space-y-6">
      <div className="rounded-[1.5rem] border border-[#2A2A2A] bg-[#171717] p-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#E8A33C]">Discover to publish</p>
            <h2 className="mt-2 text-2xl font-bold text-white">Content Ops</h2>
            <p className="mt-2 max-w-3xl text-sm text-slate-400">
              Turn live search signals into prioritized opportunities and brief-ready work before it hits the publishing queue.
            </p>
          </div>
          <button
            onClick={handleSeedOpportunities}
            disabled={saving || missingSeeds.length === 0}
            className="inline-flex items-center gap-2 rounded-full bg-[#E8A33C] px-4 py-2.5 text-sm font-semibold text-black transition hover:bg-[#d4922e] disabled:opacity-50"
          >
            <Sparkles className="h-4 w-4" />
            {missingSeeds.length === 0 ? 'April priorities loaded' : `Load ${missingSeeds.length} current priorities`}
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {opportunities.map((opportunity) => {
          const brief = briefsByOpportunityId.get(opportunity.id);
          return (
            <article key={opportunity.id} className="rounded-[1.25rem] border border-[#2A2A2A] bg-[#171717] p-5">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                <div className="space-y-3">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className={`rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] ${badgeTone[opportunity.priority]}`}>
                      {opportunity.priority} priority
                    </span>
                    <span className="rounded-full bg-slate-800 px-3 py-1 text-xs font-medium uppercase tracking-[0.12em] text-slate-300">
                      {opportunity.status.replace('_', ' ')}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">{opportunity.title}</h3>
                    <p className="mt-1 text-sm text-slate-400">{opportunity.primary_keyword}</p>
                    <p className="mt-1 text-sm text-slate-500">{opportunity.target_url} • {opportunity.opportunity_type.replace('_', ' ')}</p>
                  </div>
                  <p className="text-sm leading-relaxed text-slate-300">{opportunity.notes}</p>
                  <p className="text-sm text-slate-400">{opportunity.supporting_keywords.join(' • ')}</p>
                  <div className="flex flex-wrap gap-2">
                    {opportunity.recommended_internal_links.map((link) => (
                      <span key={link} className="rounded-full border border-[#2A2A2A] px-3 py-1 text-xs text-slate-300">
                        {link}
                      </span>
                    ))}
                  </div>
                  <p className="text-xs text-slate-500">Source: {opportunity.source_label || 'manual'}</p>
                  {brief && (
                    <p className="text-sm text-[#F3C26E]">
                      Brief ready: {brief.title} ({brief.content_type}, {brief.status})
                    </p>
                  )}
                </div>
                <button
                  onClick={() => handleCreateBrief(opportunity)}
                  disabled={saving || Boolean(brief)}
                  className="inline-flex items-center gap-2 rounded-full border border-[#E8A33C]/30 px-4 py-2 text-sm font-medium text-[#F3C26E] transition hover:bg-[#E8A33C]/10 disabled:opacity-50"
                >
                  <FileText className="h-4 w-4" />
                  {brief ? 'Brief created' : 'Create brief'}
                </button>
              </div>
            </article>
          );
        })}

        {opportunities.length === 0 && <div className="rounded-[1.25rem] border border-dashed border-[#2A2A2A] bg-[#171717] p-8 text-center text-sm text-slate-400">Load the current priority set first. It is seeded from live Mango signals already in hand: GSC query gaps, BrightLocal losses, and checkpoint freshness work.</div>}
      </div>
    </div>
  );
}
