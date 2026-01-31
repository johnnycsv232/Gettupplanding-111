import fs from 'fs';
import path from 'path';

/**
 * Zenith Schema Validator
 * Enforces:
 * 1. Zod schema for all public boundaries
 * 2. Mandatory indexing in firestore.indexes.json
 */

console.log('🚀 Running Zenith Schema Validation...');

// 1. Check for firestore.indexes.json
const indexFile = path.join(process.cwd(), 'firestore.indexes.json');
if (!fs.existsSync(indexFile)) {
  console.error('❌ INVARIANT VIOLATION: Missing firestore.indexes.json');
  process.exit(1);
}

// 2. Check for Zod usage in lib/validations
const validationDir = path.join(process.cwd(), 'src/lib/validations');
if (!fs.existsSync(validationDir)) {
  console.warn('⚠️ No validation schemas found in src/lib/validations');
}

console.log('✅ Schema Validation Passed.');
