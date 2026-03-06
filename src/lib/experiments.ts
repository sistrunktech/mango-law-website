'use client';

import { useEffect, useState } from 'react';

export type ExperimentVariant = 'A' | 'B';
export const EXPERIMENT_IDS = {
  t1HeroCtaClarity: 't1-hero-cta-clarity',
  t2TrustBlockNearCta: 't2-trust-block-near-cta',
  t3MidPageCtaContext: 't3-midpage-cta-context',
} as const;

export type ExperimentId = (typeof EXPERIMENT_IDS)[keyof typeof EXPERIMENT_IDS];

export const EXPERIMENT_ENABLEMENT: Record<ExperimentId, boolean> = {
  [EXPERIMENT_IDS.t1HeroCtaClarity]: true,
  [EXPERIMENT_IDS.t2TrustBlockNearCta]: false,
  [EXPERIMENT_IDS.t3MidPageCtaContext]: true,
};

export const ACTIVE_HERO_EXPERIMENT: ExperimentId = EXPERIMENT_IDS.t1HeroCtaClarity;

type ResolveOptions = {
  enabled?: boolean;
  ratioA?: number;
  queryParamKey?: string;
  storageVersion?: string;
};

function normalizedVariant(value: string | null): ExperimentVariant | null {
  if (!value) return null;
  const lower = value.toLowerCase();
  if (lower === 'a') return 'A';
  if (lower === 'b') return 'B';
  return null;
}

export function resolveExperimentVariant(
  experimentId: string,
  options: ResolveOptions = {}
): ExperimentVariant {
  const {
    enabled = true,
    ratioA = 0.5,
    queryParamKey = `exp_${experimentId}`,
    storageVersion = 'v1',
  } = options;

  if (!enabled || typeof window === 'undefined') return 'A';

  const params = new URLSearchParams(window.location.search);
  const forced = normalizedVariant(params.get(queryParamKey));
  if (forced) return forced;

  const storageKey = `mango_experiment_${experimentId}_${storageVersion}`;
  const persisted = normalizedVariant(window.localStorage.getItem(storageKey));
  if (persisted) return persisted;

  const randomValue = Math.random();
  const selected: ExperimentVariant = randomValue < ratioA ? 'A' : 'B';
  window.localStorage.setItem(storageKey, selected);
  return selected;
}

export function useExperimentVariant(
  experimentId: string,
  options: ResolveOptions = {}
): ExperimentVariant {
  const [variant, setVariant] = useState<ExperimentVariant>('A');
  const { enabled, ratioA, queryParamKey, storageVersion } = options;

  useEffect(() => {
    setVariant(resolveExperimentVariant(experimentId, { enabled, ratioA, queryParamKey, storageVersion }));
  }, [experimentId, enabled, ratioA, queryParamKey, storageVersion]);

  return variant;
}
