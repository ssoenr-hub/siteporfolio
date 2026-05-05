import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Vite config — React + Framer Motion + Lenis
// publicDir = ./public  →  /assets/* served at /assets/*
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    open: true,
  },
  build: {
    outDir: 'dist',
    // Avoid collision with /public/assets static photo folder
    assetsDir: 'static',
    sourcemap: false,
    target: 'es2020',
    cssCodeSplit: true,
    rollupOptions: {
      output: {
        manualChunks: {
          motion: ['framer-motion'],
          router: ['react-router-dom'],
        },
      },
    },
  },
});
