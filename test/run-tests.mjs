import { register } from 'node:module';
import { pathToFileURL } from 'node:url';

register('ts-node/esm', pathToFileURL('./'));

// Run ESM TypeScript tests via dynamic import so they stay ESM
await import('./checkpointStatus.test.ts');
await import('./checkpointRssSources.test.ts');
await import('./checkpointSearchDiscovery.test.ts');
await import('./analyticsFallback.test.ts');
await import('./emailTemplates.test.ts');
await import('./seoRoutingContent.test.ts');
