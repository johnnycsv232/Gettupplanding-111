/**
 * sync-rules.ts
 * Syncs canonical rules from agent/rules/ to IDE-specific directories
 *
 * - agent/rules/*.mdc (canonical source)
 * - .windsurf/rules/*.md (strip frontmatter)
 * - .cursor/rules/*.mdc (keep frontmatter)
 * - .agent/rules/*.mdc (keep frontmatter)
 */

import * as fs from 'fs';
import * as path from 'path';

import { PROJECT_ROOT, resolveRulesDirectory } from './workspace-paths';

const TARGETS = [
  { dir: '.windsurf/rules', stripFrontmatter: true, ext: '.md' },
  { dir: '.cursor/rules', stripFrontmatter: false, ext: '.mdc' },
  { dir: '.agent/rules', stripFrontmatter: false, ext: '.mdc' },
];

interface RuleFile {
  name: string;
  content: string;
  frontmatter: string;
  body: string;
}

function parseFrontmatter(content: string): { frontmatter: string; body: string } {
  const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (match) {
    return { frontmatter: `---\n${match[1]}\n---\n`, body: match[2] };
  }
  return { frontmatter: '', body: content };
}

function ensureDir(dir: string): void {
  const absoluteDir = path.resolve(PROJECT_ROOT, dir);
  if (!fs.existsSync(absoluteDir)) {
    fs.mkdirSync(absoluteDir, { recursive: true });
    console.log(`  Created directory: ${absoluteDir}`);
  }
}

function syncRules(): void {
  let canonicalDir: string;
  try {
    canonicalDir = resolveRulesDirectory();
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error(`❌ ${message}`);
    process.exit(1);
  }

  console.log('\n🔄 GETTUPP Rules Sync\n');
  console.log(`Source: ${canonicalDir}/`);

  // Check if canonical directory exists
  if (!fs.existsSync(canonicalDir)) {
    console.error(`❌ Canonical rules directory not found: ${canonicalDir}`);
    process.exit(1);
  }

  // Read all .mdc files from canonical directory
  const files = fs.readdirSync(canonicalDir).filter((f) => f.endsWith('.mdc'));

  if (files.length === 0) {
    console.warn('⚠️  No .mdc files found in canonical directory');
    process.exit(0);
  }

  console.log(`Found ${files.length} rule files\n`);

  // Parse each rule file
  const rules: RuleFile[] = files.map((name) => {
    const content = fs.readFileSync(path.join(canonicalDir, name), 'utf-8');
    const { frontmatter, body } = parseFrontmatter(content);
    return { name, content, frontmatter, body };
  });

  // Sync to each target directory
  for (const target of TARGETS) {
    console.log(`→ Syncing to ${target.dir}/`);
    ensureDir(target.dir);

    for (const rule of rules) {
      const baseName = path.basename(rule.name, '.mdc');
      const targetName = baseName + target.ext;
      const targetPath = path.resolve(PROJECT_ROOT, target.dir, targetName);

      const content = target.stripFrontmatter ? rule.body : rule.content;

      fs.writeFileSync(targetPath, content, 'utf-8');
      console.log(`  ✓ ${targetName}`);
    }
  }

  console.log('\n✅ Rules sync complete!\n');
  console.log('Summary:');
  console.log(`  - ${rules.length} rules synced to ${TARGETS.length} targets`);
  console.log(`  - Total files written: ${rules.length * TARGETS.length}`);
}

// Run sync
syncRules();
