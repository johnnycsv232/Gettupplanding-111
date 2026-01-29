import { defineConfig } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  // Global ignores must be the first object in the array for flat config
  {
    ignores: [
      ".next/**",
      "out/**",
      "build/**",
      "next-env.d.ts",
      "backups/**",
      "skills/**",
      "scripts/**",
      ".zenflow/**",
      ".firebase/**",
      "node_modules/**",
      "dist/**",
      "tests/**",
    ],
  },
  ...nextVitals,
  ...nextTs,
]);

export default eslintConfig;
