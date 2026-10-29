import { register } from 'node:module';
import { pathToFileURL } from 'node:url';

register('ts-node/esm', pathToFileURL('./'));

if (process.env.GITHUB_EVENT_NAME === 'merge_group') {
  throw new Error('Intentional merge-queue failure canary; remove before merge');
}

// Run ESM TypeScript tests via dynamic import so they stay ESM
await import('./checkpointStatus.test.ts');
await import('./checkpointRelevance.test.ts');
await import('./checkpointPublicViewMigration.test.mjs');
await import('./publicCheckpointFilters.test.ts');
await import('./checkpointAnnouncementFreshness.test.ts');
await import('./checkpointAnnouncementMapMarkers.test.ts');
await import('./checkpointCuratedAnnouncements.test.ts');
await import('./checkpointRssSources.test.ts');
await import('./checkpointSearchDiscovery.test.ts');
await import('./analyticsFallback.test.ts');
await import('./supabaseAvailability.test.ts');
await import('./securityHeaders.test.mjs');
await import('./contactInfo.test.ts');
await import('./emailTemplates.test.ts');
await import('./seoRoutingContent.test.ts');
await import('./blogDiscoveryPillarAssociations.test.ts');
await import('./uiAccessibilityContracts.test.mjs');
await import('./leadPreviewSmokeContract.test.mjs');
await import('./ciPolicyGuard.test.mjs');
