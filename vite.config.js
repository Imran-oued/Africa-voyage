import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  root: './',
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        offres: resolve(__dirname, 'offres.html'),
        guide: resolve(__dirname, 'guide.html')
      }
    }
  },
  server: {
    port: 3000,
    open: true
  }
});
