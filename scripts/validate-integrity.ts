/**
 * SRE Integrity Validation Script
 * TDD: This test defines SUCCESS criteria for the stabilization operation.
 * Expected: FAIL before fixes, PASS after fixes.
 */

import { existsSync, readFileSync } from 'fs';
import { execSync } from 'child_process';
import { join } from 'path';

interface ValidationResult {
  name: string;
  passed: boolean;
  message: string;
}

const results: ValidationResult[] = [];
const ROOT = process.cwd();

function test(name: string, fn: () => boolean | string): void {
  try {
    const result = fn();
    if (result === true) {
      results.push({ name, passed: true, message: '✅ PASS' });
    } else {
      results.push({ name, passed: false, message: `❌ FAIL: ${result}` });
    }
  } catch (err) {
    results.push({ name, passed: false, message: `❌ ERROR: ${err}` });
  }
}

// =============================================================================
// TEST SUITE: Infrastructure Integrity
// =============================================================================

test('Skills directory exists at root', () => {
  const path = join(ROOT, 'skills');
  return existsSync(path) || 'skills/ directory not found at root';
});

test('Skills core SKILL.md exists', () => {
  const path = join(ROOT, 'skills', 'core', 'SKILL.md');
  return existsSync(path) || 'skills/core/SKILL.md not found';
});

test('.skillportrc points to skills/', () => {
  const path = join(ROOT, '.skillportrc');
  if (!existsSync(path)) return '.skillportrc not found';
  const content = readFileSync(path, 'utf-8');
  return content.includes('skills_dir: skills') || 'skills_dir not set to "skills"';
});

test('skills_index.json is valid JSON', () => {
  const path = join(ROOT, 'skills_index.json');
  if (!existsSync(path)) return 'skills_index.json not found';
  try {
    const content = readFileSync(path, 'utf-8');
    const parsed = JSON.parse(content);
    if (!Array.isArray(parsed)) return 'skills_index.json is not an array';
    if (parsed.length === 0) return 'skills_index.json is empty';
    // Check for corruption (null chars)
    if (content.includes('\u0000')) return 'skills_index.json contains null characters (corrupted)';
    return true;
  } catch {
    return 'skills_index.json is not valid JSON';
  }
});

test('.agent/skills/ does not exist (unified to skills/)', () => {
  const path = join(ROOT, '.agent', 'skills');
  return !existsSync(path) || '.agent/skills/ still exists - should be removed';
});

// =============================================================================
// TEST SUITE: Asset Organization
// =============================================================================

test('Video file in public/videos/', () => {
  const path = join(ROOT, 'public', 'videos', 'A_macro_productreveal_1080p_202601121922.mp4');
  return existsSync(path) || 'Video file not found in public/videos/';
});

test('Video file NOT in scripts/', () => {
  const path = join(ROOT, 'scripts', 'A_macro_productreveal_1080p_202601121922.mp4');
  return !existsSync(path) || 'Video file still in scripts/ - should be moved';
});

// =============================================================================
// TEST SUITE: Empty Directories Cleaned
// =============================================================================

test('Empty directory src/components/external removed', () => {
  const path = join(ROOT, 'src', 'components', 'external');
  return !existsSync(path) || 'Empty directory still exists';
});

test('Empty directory src/components/layouts removed', () => {
  const path = join(ROOT, 'src', 'components', 'layouts');
  return !existsSync(path) || 'Empty directory still exists';
});

test('Empty directory src/components/lib removed', () => {
  const path = join(ROOT, 'src', 'components', 'lib');
  return !existsSync(path) || 'Empty directory still exists';
});

// =============================================================================
// TEST SUITE: Duplicate Files Removed
// =============================================================================

test('Duplicate vitest.config.mts removed', () => {
  const path = join(ROOT, 'vitest.config.mts');
  return !existsSync(path) || 'Duplicate config file still exists';
});

test('Backup threat_model.md.bak removed', () => {
  const path = join(ROOT, 'docs', 'threat_model.md.bak');
  return !existsSync(path) || 'Backup file still exists';
});

// =============================================================================
// TEST SUITE: TypeScript Integrity
// =============================================================================

test('TypeScript compiles without errors', () => {
  try {
    execSync('npm run type-check', { cwd: ROOT, stdio: 'pipe' });
    return true;
  } catch (err) {
    const error = err as { stderr?: Buffer };
    return `Type errors: ${error.stderr?.toString().slice(0, 200) || 'unknown'}`;
  }
});

// =============================================================================
// SUMMARY
// =============================================================================

console.log('\n' + '='.repeat(60));
console.log('🛡️  SRE INTEGRITY VALIDATION REPORT');
console.log('='.repeat(60) + '\n');

const passed = results.filter((r) => r.passed).length;
const failed = results.filter((r) => !r.passed).length;

for (const r of results) {
  console.log(`${r.passed ? '✅' : '❌'} ${r.name}`);
  if (!r.passed) {
    console.log(`   └─ ${r.message}`);
  }
}

console.log('\n' + '-'.repeat(60));
console.log(`📊 SUMMARY: ${passed}/${results.length} passed, ${failed} failed`);
console.log('-'.repeat(60) + '\n');

if (failed > 0) {
  console.log('🚨 VALIDATION FAILED - Fixes required before merge');
  process.exit(1);
} else {
  console.log('✅ ALL CHECKS PASSED - Ready for merge');
  process.exit(0);
}
