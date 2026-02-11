#!/usr/bin/env npx tsx
/**
 * Validate skills and generate a report (TypeScript version)
 * Checks all skills against SkillPort spec requirements
 */

import * as fs from 'fs';
import * as path from 'path';

import { resolveSkillsDirectory } from './workspace-paths';

const SKILLS_DIR = resolveSkillsDirectory();

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

interface ValidationResult {
  skill: string;
  valid: boolean;
  errors: string[];
  warnings: string[];
}

function parseYamlFrontmatter(content: string): Record<string, unknown> | null {
  const match = content.match(/^---\n([\s\S]*?)\n---/);
  if (!match) return null;

  const frontmatter: Record<string, unknown> = {};
  const lines = match[1].split('\n');

  for (const line of lines) {
    const colonIndex = line.indexOf(':');
    if (colonIndex > 0) {
      const key = line.substring(0, colonIndex).trim();
      let value: unknown = line.substring(colonIndex + 1).trim();

      if (typeof value === 'string' && value.startsWith('"') && value.endsWith('"')) {
        value = value.slice(1, -1);
      } else if (typeof value === 'string' && value.startsWith("'") && value.endsWith("'")) {
        value = value.slice(1, -1);
      }

      frontmatter[key] = value;
    }
  }

  return frontmatter;
}

function validateSkill(skillDir: string): ValidationResult {
  const result: ValidationResult = {
    skill: skillDir,
    valid: true,
    errors: [],
    warnings: [],
  };

  const skillPath = path.join(SKILLS_DIR, skillDir, 'SKILL.md');

  if (!fs.existsSync(skillPath)) {
    result.valid = false;
    result.errors.push('SKILL.md not found');
    return result;
  }

  const content = fs.readFileSync(skillPath, 'utf-8');
  const fm = parseYamlFrontmatter(content);

  if (!fm) {
    result.valid = false;
    result.errors.push('No frontmatter found');
    return result;
  }

  // Check required fields
  if (!fm['name']) {
    result.valid = false;
    result.errors.push('Missing required field: name');
  } else if (fm['name'] !== skillDir) {
    result.valid = false;
    result.errors.push(`Name mismatch: "${fm['name']}" should be "${skillDir}"`);
  }

  if (!fm['description']) {
    result.valid = false;
    result.errors.push('Missing required field: description');
  }

  // Check for unexpected fields
  for (const key of Object.keys(fm)) {
    if (!ALLOWED_FIELDS.has(key)) {
      result.valid = false;
      result.errors.push(`Unexpected field: ${key}`);
    }
  }

  // Check line count (warning only)
  const lineCount = content.split('\n').length;
  if (lineCount > 500) {
    result.warnings.push(`${lineCount} lines (recommended <=500)`);
  }

  return result;
}

async function main() {
  console.log('Validating skills...\n');

  const skills = fs.readdirSync(SKILLS_DIR).filter((f) => {
    const stat = fs.statSync(path.join(SKILLS_DIR, f));
    return stat.isDirectory();
  });

  let validCount = 0;
  let invalidCount = 0;
  let warningCount = 0;
  const invalidSkills: ValidationResult[] = [];

  for (const skill of skills) {
    const result = validateSkill(skill);

    if (result.valid) {
      validCount++;
      if (result.warnings.length > 0) warningCount++;
    } else {
      invalidCount++;
      invalidSkills.push(result);
    }
  }

  console.log('=== VALIDATION REPORT ===\n');
  console.log(`Total skills: ${skills.length}`);
  console.log(`Valid: ${validCount}`);
  console.log(`Invalid: ${invalidCount}`);
  console.log(`With warnings: ${warningCount}`);

  if (invalidSkills.length > 0) {
    console.log('\n=== INVALID SKILLS ===\n');
    for (const result of invalidSkills.slice(0, 30)) {
      console.log(`${result.skill}:`);
      for (const err of result.errors) {
        console.log(`  - ${err}`);
      }
    }
    if (invalidSkills.length > 30) {
      console.log(`\n... and ${invalidSkills.length - 30} more invalid skills`);
    }
  }

  // Exit with error code if there are invalid skills
  process.exit(invalidCount > 0 ? 1 : 0);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
