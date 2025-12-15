import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { visualizer } from 'rollup-plugin-visualizer';
import ogPlugin from './plugins/vite-og-plugin';
import sitemapPlugin from './plugins/vite-sitemap-plugin';

export default defineConfig(({ mode }) => ({
  plugins: [
    react(),
    ogPlugin(),
    sitemapPlugin(),
    mode === 'analyze'
      ? visualizer({
          filename: 'reports/bundle-visualizer.html',
          gzipSize: true,
          brotliSize: true,
          template: 'treemap',
          open: false,
        })
      : null,
  ].filter(Boolean),
  server: {
    port: 5173,
  },
}));
