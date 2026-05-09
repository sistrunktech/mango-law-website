export type ScraperRunStatus = 'success' | 'partial' | 'failed';
export type ScraperHealth = 'healthy' | 'warning' | 'degraded' | 'failed';

export interface ScraperRunHealthInput {
  didWork: boolean;
  blockingErrorCount: number;
  warningCount: number;
  fatal?: boolean;
}

export function determineScraperRunStatus(input: ScraperRunHealthInput): ScraperRunStatus {
  if (input.fatal) return 'failed';
  if (input.blockingErrorCount > 0) return input.didWork ? 'partial' : 'failed';
  if (!input.didWork && input.warningCount > 0) return 'partial';
  return 'success';
}

export function determineScraperHealth(input: ScraperRunHealthInput): ScraperHealth {
  const status = determineScraperRunStatus(input);
  if (status === 'failed') return 'failed';
  if (status === 'partial') return 'degraded';
  return input.warningCount > 0 ? 'warning' : 'healthy';
}
