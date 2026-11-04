import { resolve } from 'node:path';
import { defineConfig } from 'vite';

export default defineConfig({
  // `pnpm dev` serves the demo pages
  root: 'demos',
  build: {
    outDir: resolve(import.meta.dirname, 'dist'),
    emptyOutDir: true,
    target: 'es2021',
    lib: {
      entry: {
        index: resolve(import.meta.dirname, 'src/index.ts'),
        loader: resolve(import.meta.dirname, 'src/loader.ts'),
      },
      formats: ['es'],
    },
  },
});
