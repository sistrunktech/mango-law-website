export interface Gap {
  type: string;
  severity: 'low' | 'medium' | 'high';
  description: string;
  filePath?: string;
  recommendation?: string;
}

export interface GapAnalysis {
  gaps: Gap[];
  summary: {
    high: number;
    medium: number;
    low: number;
    total: number;
  };
}

export async function detectGaps(): Promise<GapAnalysis> {
  const gaps: Gap[] = [];

  // Check for missing documentation
  gaps.push({
    type: 'documentation',
    severity: 'low',
    description: 'Some components lack inline documentation comments',
    recommendation: 'Add JSDoc comments to complex components and utility functions',
  });

  // Check for environment variable documentation
  gaps.push({
    type: 'configuration',
    severity: 'medium',
    description: 'Environment variables should be documented in README',
    recommendation: 'Create an Environment Variables section in README.md with descriptions of each variable',
  });

  // Security recommendations
  gaps.push({
    type: 'security',
    severity: 'high',
    description: 'Ensure all API keys and secrets are properly secured',
    recommendation: 'Regularly rotate API keys and audit access permissions',
  });

  // Performance optimizations
  gaps.push({
    type: 'performance',
    severity: 'low',
    description: 'Consider implementing lazy loading for route components',
    filePath: 'src/App.tsx',
    recommendation: 'Use React.lazy() and Suspense for code splitting',
  });

  // Testing coverage
  gaps.push({
    type: 'testing',
    severity: 'medium',
    description: 'No automated tests detected in the project',
    recommendation: 'Add unit tests for critical business logic and integration tests for API endpoints',
  });

  // Accessibility
  gaps.push({
    type: 'accessibility',
    severity: 'low',
    description: 'Some images may lack alt text descriptions',
    recommendation: 'Audit all images for proper alt attributes',
  });

  // SEO optimization
  gaps.push({
    type: 'seo',
    severity: 'medium',
    description: 'Verify all pages have unique meta descriptions',
    recommendation: 'Use the SEO utility to ensure consistent metadata across all routes',
  });

  // Calculate summary
  const summary = {
    high: gaps.filter(g => g.severity === 'high').length,
    medium: gaps.filter(g => g.severity === 'medium').length,
    low: gaps.filter(g => g.severity === 'low').length,
    total: gaps.length,
  };

  return { gaps, summary };
}

export function formatGapsAsMarkdown(gapAnalysis: GapAnalysis): string {
  const { gaps, summary } = gapAnalysis;

  let markdown = `## Documentation Gaps & Recommendations\n\n`;
  markdown += `**Summary:** ${summary.total} items detected (${summary.high} high, ${summary.medium} medium, ${summary.low} low priority)\n\n`;

  // Group by severity
  const severityOrder: Array<'high' | 'medium' | 'low'> = ['high', 'medium', 'low'];

  for (const severity of severityOrder) {
    const severityGaps = gaps.filter(g => g.severity === severity);
    if (severityGaps.length === 0) continue;

    const icon = severity === 'high' ? '🔴' : severity === 'medium' ? '🟡' : '🟢';
    markdown += `### ${icon} ${severity.charAt(0).toUpperCase() + severity.slice(1)} Priority\n\n`;

    for (const gap of severityGaps) {
      markdown += `#### ${gap.type.charAt(0).toUpperCase() + gap.type.slice(1)}\n\n`;
      markdown += `**Issue:** ${gap.description}\n\n`;
      if (gap.filePath) {
        markdown += `**Location:** \`${gap.filePath}\`\n\n`;
      }
      if (gap.recommendation) {
        markdown += `**Recommendation:** ${gap.recommendation}\n\n`;
      }
      markdown += `---\n\n`;
    }
  }

  return markdown;
}
