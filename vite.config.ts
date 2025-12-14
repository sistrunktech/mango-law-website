import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import ogPlugin from './plugins/vite-og-plugin';
import sitemapPlugin from './plugins/vite-sitemap-plugin';

export default defineConfig({
  plugins: [react(), ogPlugin(), sitemapPlugin()],
  server: {
    port: 5173,
  },
});
