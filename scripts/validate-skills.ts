import * as fs from 'fs';
import * as path from 'path';

import { resolveSkillsDirectory } from './workspace-paths';

function validateSkills(skillsDir: string) {
  console.log(`🔍 Validating skills in: ${skillsDir}`);
  const errors: string[] = [];
  let skillCount = 0;

  if (!fs.existsSync(skillsDir)) {
    console.error(`❌ Skills directory not found: ${skillsDir}`);
    return false;
  }

  function scan(dir: string) {
    const items = fs.readdirSync(dir, { withFileTypes: true });

    // Check if this dir contains SKILL.md
    if (items.some((item) => item.name === 'SKILL.md')) {
      skillCount++;
      const skillPath = path.join(dir, 'SKILL.md');
      const relPath = path.relative(skillsDir, skillPath);
      const content = fs.readFileSync(skillPath, 'utf-8');

      const hasFrontmatter = content.trim().startsWith('---');
      const hasHeader = /^#\s+/m.test(content);

      if (!(hasFrontmatter || hasHeader)) {
        errors.push(`❌ ${relPath}: Missing frontmatter or top-level heading`);
      }

      if (hasFrontmatter) {
        const fmMatch = content.match(/^---\s*([\s\S]*?)\s*---/);
        if (fmMatch) {
          const fmContent = fmMatch[1];
          if (!fmContent.includes('name:')) {
            errors.push(`⚠️  ${relPath}: Frontmatter missing 'name:'`);
          }
          if (!fmContent.includes('description:')) {
            errors.push(`⚠️  ${relPath}: Frontmatter missing 'description:'`);
          }
        } else {
          errors.push(`❌ ${relPath}: Malformed frontmatter`);
        }
      }
    }

    // Recurse into subdirectories
    for (const item of items) {
      if (item.isDirectory() && item.name !== '.disabled' && !item.name.startsWith('.')) {
        scan(path.join(dir, item.name));
      }
    }
  }

  scan(skillsDir);

  console.log(`✅ Found and checked ${skillCount} skills.`);
  if (errors.length > 0) {
    console.log('\n⚠️  Validation Results:');
    errors.forEach((err) => console.log(err));
    return false;
  } else {
    console.log('✨ All skills passed basic validation!');
    return true;
  }
}

const skillsPath = resolveSkillsDirectory(false);
const isValid = validateSkills(skillsPath);
process.exit(isValid ? 0 : 1);
