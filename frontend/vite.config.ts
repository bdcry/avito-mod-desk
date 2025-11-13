import react from '@vitejs/plugin-react';
import { checker } from 'vite-plugin-checker';
import tsconfigPaths from 'vite-tsconfig-paths';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    checker({
      typescript: true,
    }),
    react(),
    tsconfigPaths(),
  ],
  base: '',
  server: {
    open: true,
  },
});
