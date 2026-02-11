import path from 'path';

import react from '@vitejs/plugin-react';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['tests/setup.ts'],
    include: ['tests/**/*.test.{ts,tsx}'],
    exclude: [
      'tests/policy/**',
      'tests/**/*.spec.{ts,tsx}',
      'tests/config-integrity.test.ts',
      'tests/skills-integrity.test.ts',
      'node_modules/**',
      'dist/**',
      '.next/**',
    ],
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
