import dns from 'dns';
import { join } from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

dns.setDefaultResultOrder('verbatim');

export default defineConfig({
  build: {
    outDir: 'build',
  },
  resolve: {
    alias: {
      '~': join(__dirname, 'src'),
    },
  },
  plugins: [react()],
  server: {
    open: true,
    port: 4000,
  },
});
