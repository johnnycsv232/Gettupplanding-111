import path from 'path';

import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'node',
    globals: true,
    include: ['tests/policy/**/*.test.{ts,tsx}'],
    exclude: ['node_modules/**', 'dist/**', '.next/**'],
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
