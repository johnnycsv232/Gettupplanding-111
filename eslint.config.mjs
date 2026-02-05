import { defineConfig } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';
import importPlugin from 'eslint-plugin-import';
import tailwind from 'eslint-plugin-tailwindcss';
import unusedImports from 'eslint-plugin-unused-imports';

const eslintConfig = defineConfig([
  // Global ignores MUST be first in flat config
  {
    ignores: [
      '.next/**',
      'out/**',
      'build/**',
      'next-env.d.ts',
      'backups/**',
      'skills/**',
      '.windsurf/skills/**',
      'scripts/**',
      '.unused/**',
      'src/.unused/**',
      'src/components/ui/Slot.tsx',
    ],
  },
  ...nextVitals,
  ...nextTs,
  ...tailwind.configs['flat/recommended'],
  {
    plugins: {
      import: importPlugin,
      'unused-imports': unusedImports,
    },
    rules: {
      'import/order': [
        'error',
        {
          groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
          'newlines-between': 'always',
          alphabetize: { order: 'asc', caseInsensitive: true },
        },
      ],
      'import/no-duplicates': 'error',
      'import/no-unresolved': 'off', // Next.js handles this
      'unused-imports/no-unused-imports': 'error',
      'unused-imports/no-unused-vars': [
        'warn',
        { vars: 'all', varsIgnorePattern: '^_', args: 'after-used', argsIgnorePattern: '^_' },
      ],
      'no-console': ['error', { allow: ['warn', 'error'] }],
      'prefer-const': 'error',
      'no-var': 'error',
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/no-unused-vars': 'error',
      'react/display-name': 'off',
    },
    settings: {
      tailwindcss: {
        callees: ['cn', 'cva'],
        config: 'tailwind.config.ts',
        whitelist: [
          'liquid-glass',
          'glass-zenith',
          'glass-light',
          'glass-medium',
          'glass-heavy',
          'text-glow-gold',
          'text-glow-magenta',
          'box-glow-gold',
          'box-glow-magenta',
          'glint-effect',
          'mask-radial',
          'text-shadow-neon',
          'text-shadow-glow',
          'border-text-gold',
          'text-display',
          'animate-marquee',
          'text-silver-chrome',
          'from-vegas-gold/20',
          'to-neon-magenta/10',
          'text-vegas-gold',
          'text-off-white',
          'text-white',
        ],
      },
    },
  },
  {
    languageOptions: {
      globals: {
        React: 'readonly',
      },
    },
  },
]);

export default eslintConfig;
