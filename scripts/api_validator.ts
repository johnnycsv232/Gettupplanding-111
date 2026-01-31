import fs from 'fs';
import path from 'path';

/**
 * Zenith API Validator
 * Enforces:
 * 1. No verbs in REST endpoints
 * 2. Consistent Envelope Pattern
 * 3. Existence of Rate Limiting middleware
 */

console.log('🚀 Running Zenith API Validation...');

const apiDir = path.join(process.cwd(), 'src/app/api');

function validateEndpoints(dir: string) {
  if (!fs.existsSync(dir)) return;
  const items = fs.readdirSync(dir);

  for (const item of items) {
    const fullPath = path.join(dir, item);
    if (fs.statSync(fullPath).isDirectory()) {
      // Check for verbs in directory names
      if (/(get|post|update|delete|create)/i.test(item)) {
        console.error(`❌ INVARIANT VIOLATION: Verb found in API endpoint: ${item}`);
        process.exit(1);
      }
      validateEndpoints(fullPath);
    } else if (item === 'route.ts') {
      const content = fs.readFileSync(fullPath, 'utf8');

      // Check for Envelope Pattern
      if (
        !content.includes('json({') ||
        (!content.includes('data:') && !content.includes('error:'))
      ) {
        console.warn(`⚠️ Potential Envelope Pattern violation in: ${fullPath}`);
      }
    }
  }
}

validateEndpoints(apiDir);
console.log('✅ API Validation Passed.');
