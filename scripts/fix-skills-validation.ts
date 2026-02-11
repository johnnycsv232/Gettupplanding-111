#!/usr/bin/env npx tsx
/**
 * Fix SkillPort validation issues across all skills
 * - Fixes name mismatches (name must match directory)
 * - Removes unexpected frontmatter fields
 * - Adds missing required fields
 */

import * as fs from 'fs';
import * as path from 'path';

import { resolveSkillsDirectory } from './workspace-paths';

const SKILLS_DIR = resolveSkillsDirectory();

// Allowed frontmatter fields per SkillPort spec
const ALLOWED_FIELDS = new Set([
  'name',
  'description',
  'allowed-tools',
  'version',
  'author',
  'tags',
  'globs',
  'alwaysApply',
]);

interface SkillFix {
  skill: string;
  fixes: string[];
}

function parseYamlFrontmatter(
  content: string
): { frontmatter: Record<string, unknown>; body: string; raw: string } | null {
  const match = content.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!match) return null;

  const raw = match[1];
  const body = match[2];
  const frontmatter: Record<string, unknown> = {};

  // Simple YAML parsing for frontmatter
  const lines = raw.split('\n');
  for (const line of lines) {
    const colonIndex = line.indexOf(':');
    if (colonIndex > 0) {
      const key = line.substring(0, colonIndex).trim();
      let value: unknown = line.substring(colonIndex + 1).trim();

      // Handle quoted strings
      if (typeof value === 'string' && value.startsWith('"') && value.endsWith('"')) {
        value = value.slice(1, -1);
      } else if (typeof value === 'string' && value.startsWith("'") && value.endsWith("'")) {
        value = value.slice(1, -1);
      }

      frontmatter[key] = value;
    }
  }

  return { frontmatter, body, raw };
}

function generateFrontmatter(fm: Record<string, unknown>): string {
  const lines: string[] = [];

  // Output in specific order
  const orderedKeys = [
    'name',
    'description',
    'allowed-tools',
    'version',
    'author',
    'tags',
    'globs',
    'alwaysApply',
  ];

  for (const key of orderedKeys) {
    if (fm[key] !== undefined) {
      const value = fm[key];
      if (
        typeof value === 'string' &&
        (value.includes(':') || value.includes('"') || value.includes("'") || value.includes('\n'))
      ) {
        // Quote strings that need it
        lines.push(`${key}: "${value.replace(/"/g, '\\"')}"`);
      } else {
        lines.push(`${key}: ${value}`);
      }
    }
  }

  return lines.join('\n');
}

function toKebabCase(str: string): string {
  return str
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/[\s_]+/g, '-')
    .replace(/[^a-zA-Z0-9-]/g, '')
    .toLowerCase();
}

function fixSkill(skillDir: string): SkillFix | null {
  const skillPath = path.join(SKILLS_DIR, skillDir, 'SKILL.md');

  if (!fs.existsSync(skillPath)) {
    return null;
  }

  const content = fs.readFileSync(skillPath, 'utf-8');
  const parsed = parseYamlFrontmatter(content);

  if (!parsed) {
    return null;
  }

  const fixes: string[] = [];
  const newFm: Record<string, unknown> = {};

  // Fix 1: Name must match directory (kebab-case)
  const expectedName = skillDir;
  const currentName = parsed.frontmatter['name'] as string | undefined;

  if (!currentName) {
    newFm['name'] = expectedName;
    fixes.push(`Added missing name: ${expectedName}`);
  } else if (currentName !== expectedName) {
    newFm['name'] = expectedName;
    fixes.push(`Fixed name: "${currentName}" -> "${expectedName}"`);
  } else {
    newFm['name'] = currentName;
  }

  // Fix 2: Description required
  const description = parsed.frontmatter['description'] as string | undefined;
  if (!description) {
    // Try to extract from first heading or paragraph
    const bodyLines = parsed.body.trim().split('\n');
    let extractedDesc = '';
    for (const line of bodyLines) {
      if (line.startsWith('# ')) {
        extractedDesc = line.replace(/^#\s*/, '').trim();
        break;
      } else if (
        line.trim() &&
        !line.startsWith('#') &&
        !line.startsWith('---') &&
        !line.startsWith('>')
      ) {
        extractedDesc = line.trim().substring(0, 200);
        break;
      }
    }
    newFm['description'] = extractedDesc || `Skill for ${expectedName}`;
    fixes.push(`Added missing description`);
  } else {
    newFm['description'] = description;
  }

  // Fix 3: Copy allowed fields, skip unexpected ones
  const unexpectedFields: string[] = [];
  for (const [key, value] of Object.entries(parsed.frontmatter)) {
    if (key === 'name' || key === 'description') continue; // Already handled

    if (ALLOWED_FIELDS.has(key)) {
      newFm[key] = value;
    } else {
      unexpectedFields.push(key);
    }
  }

  if (unexpectedFields.length > 0) {
    fixes.push(`Removed unexpected fields: ${unexpectedFields.join(', ')}`);
  }

  // Only write if we made changes
  if (fixes.length === 0) {
    return null;
  }

  // Generate new content
  const newFrontmatter = generateFrontmatter(newFm);
  const newContent = `---\n${newFrontmatter}\n---\n${parsed.body}`;

  fs.writeFileSync(skillPath, newContent, 'utf-8');

  return { skill: skillDir, fixes };
}

async function main() {
  console.log('🔧 Fixing SkillPort validation issues...\n');

  const skills = fs.readdirSync(SKILLS_DIR).filter((f) => {
    const stat = fs.statSync(path.join(SKILLS_DIR, f));
    return stat.isDirectory();
  });

  console.log(`Found ${skills.length} skill directories\n`);

  let fixedCount = 0;
  let skippedCount = 0;
  const allFixes: SkillFix[] = [];

  for (const skill of skills) {
    try {
      const result = fixSkill(skill);
      if (result) {
        allFixes.push(result);
        fixedCount++;
      } else {
        skippedCount++;
      }
    } catch (error) {
      console.error(`❌ Error fixing ${skill}:`, error);
    }
  }

  // Print summary
  console.log('\n📊 Summary:');
  console.log(`   Fixed: ${fixedCount} skills`);
  console.log(`   Skipped (no changes needed): ${skippedCount} skills`);

  if (allFixes.length > 0) {
    console.log('\n📝 Fixes applied:');
    for (const fix of allFixes.slice(0, 20)) {
      console.log(`\n   ${fix.skill}:`);
      for (const f of fix.fixes) {
        console.log(`      - ${f}`);
      }
    }
    if (allFixes.length > 20) {
      console.log(`\n   ... and ${allFixes.length - 20} more skills fixed`);
    }
  }

  console.log('\n✅ Done! Run "skillport validate skills" to verify.');
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
