import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': '/src',
    },
  },
  server: {
    watch: {
      usePolling: true,
    },
    host: '0.0.0.0',
    port: 4000,
    // proxy: {
    //   '/api': 'http://localhost:8080',
    // },
  },
  base: '/',
});
