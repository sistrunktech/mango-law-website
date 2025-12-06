import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import ogPlugin from './plugins/vite-og-plugin';

export default defineConfig({
  plugins: [react(), ogPlugin()],
  server: {
    port: 5173,
  },
});
