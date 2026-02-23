'use client';

import Link from 'next/link';
import { useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import { trackCtaClick, trackExperimentExposure } from '../lib/analytics';
import { EXPERIMENT_ENABLEMENT, EXPERIMENT_IDS, useExperimentVariant } from '../lib/experiments';

type Props = {
  contextLabel: string;
  className?: string;
  ctaIdPrefix?: string;
};

export default function MidPageCtaExperiment({
  contextLabel,
  className = '',
  ctaIdPrefix = 'midpage_cta',
}: Props) {
  const experimentId = EXPERIMENT_IDS.t3MidPageCtaContext;
  const isEnabled = EXPERIMENT_ENABLEMENT[experimentId];
  const variant = useExperimentVariant(experimentId, {
    enabled: isEnabled,
    queryParamKey: 'exp_t3',
  });

  useEffect(() => {
    if (!isEnabled) return;

    trackExperimentExposure(experimentId, variant, {
      placement: 'mid_page',
      context: contextLabel,
    });
  }, [variant, contextLabel, experimentId, isEnabled]);

  const isContextual = variant === 'B';
  const title = isContextual
    ? `Need help with ${contextLabel}?`
    : 'Need a case strategy built for your situation?';
  const body = isContextual
    ? 'Get a focused case review with clear next-step guidance based on your current stage.'
    : 'Get clear next steps and a practical defense plan tailored to your case facts.';
  const buttonLabel = isContextual ? `Get ${contextLabel} case review` : 'Schedule a consult';
  const ctaId = `${ctaIdPrefix}_${isContextual ? 'contextual' : 'generic'}`;

  return (
    <div className={`rounded-2xl border border-brand-black/10 bg-brand-offWhite p-6 ${className}`}>
      <h3 className="text-2xl font-bold text-brand-black">{title}</h3>
      <p className="mt-2 text-brand-black/70">{body}</p>
      <Link
        href="/contact"
        className="mt-4 inline-flex items-center gap-2 rounded-lg bg-brand-mango px-5 py-3 font-bold text-brand-black transition-all hover:bg-brand-gold"
        onClick={() => {
          trackCtaClick(ctaId, {
            experiment_id: experimentId,
            variant,
            context: contextLabel,
          });
        }}
      >
        {buttonLabel}
        <ArrowRight className="h-4 w-4" />
      </Link>
    </div>
  );
}
