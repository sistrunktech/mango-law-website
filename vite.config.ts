import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import ogPlugin from './plugins/vite-og-plugin';
import sitemapPlugin from './plugins/vite-sitemap-plugin';

export default defineConfig(async ({ mode }) => {
  const plugins = [
    react(),
    ogPlugin(),
    sitemapPlugin(),
  ];

  if (mode === 'analyze') {
    try {
      const { visualizer } = await import('rollup-plugin-visualizer');
      plugins.push(
        visualizer({
          filename: 'reports/bundle-visualizer.html',
          gzipSize: true,
          brotliSize: true,
          template: 'treemap',
          open: false,
        })
      );
    } catch (e) {
      console.warn('rollup-plugin-visualizer not available, skipping bundle analysis');
    }
  }

  return {
    plugins,
    server: {
      port: 5173,
    },
  };
});
