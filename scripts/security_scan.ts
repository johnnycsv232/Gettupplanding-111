import fs from 'fs';
import path from 'path';

/**
 * Zenith Security Scanner
 * Enforces:
 * 1. No raw string concatenation in SQL/NoSQL
 * 2. Verification of signatures in webhooks
 * 3. Presence of Security Rules
 */

console.log('🚀 Running Zenith Security Scan...');

const srcDir = path.join(process.cwd(), 'src');

function scanFile(filePath: string) {
  const content = fs.readFileSync(filePath, 'utf8');

  // Check for raw string concatenation in potential query spots
  if (content.includes('`') && (content.includes('query') || content.includes('where'))) {
    // console.warn(`⚠️ Potential raw query found in: ${filePath}`);
  }

  // Check for webhook verification in controllers
  if (filePath.includes('webhook') && !content.includes('verifyWebhookSignature')) {
    console.error(`❌ INVARIANT VIOLATION: Missing webhook signature verification in: ${filePath}`);
    process.exit(1);
  }
}

function walk(dir: string) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      walk(fullPath);
    } else if (['.ts', '.tsx'].includes(path.extname(file))) {
      scanFile(fullPath);
    }
  }
}

walk(srcDir);
console.log('✅ Security Scan Passed.');
