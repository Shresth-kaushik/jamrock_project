import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['@stripe/stripe-js'],
  },
  define: {
    'process.env': {},
  },
  server: {
    host: "0.0.0.0",
  },
});