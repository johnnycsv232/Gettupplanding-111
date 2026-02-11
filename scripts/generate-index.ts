import * as fs from 'fs';
import * as path from 'path';

interface SkillInfo {
  id: string;
  path: string;
  name: string;
  description: string;
}

function generateIndex(skillsDir: string, outputFile: string) {
  console.log(`🏗️ Generating index from: ${skillsDir}`);
  const skills: SkillInfo[] = [];

  if (!fs.existsSync(skillsDir)) {
    console.error(`❌ Skills directory not found: ${skillsDir}`);
    return;
  }

  function scan(dir: string) {
    const items = fs.readdirSync(dir, { withFileTypes: true });

    for (const item of items) {
      if (!item.isDirectory()) continue;

      const skillDir = path.join(dir, item.name);
      const skillMdPath = path.join(skillDir, 'SKILL.md');

      if (fs.existsSync(skillMdPath)) {
        const content = fs.readFileSync(skillMdPath, 'utf-8');

        let name = item.name.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
        let description = '';

        // Extract frontmatter
        const fmMatch = content.match(/^---\s*([\s\S]*?)\s*---/);
        if (fmMatch) {
          const fmContent = fmMatch[1];
          const nameMatch = fmContent.match(/^name:\s*(.+)$/m);
          const descMatch = fmContent.match(/^description:\s*(.+)$/m);

          if (nameMatch) name = nameMatch[1].trim();
          if (descMatch) description = descMatch[1].trim();
        }

        // Fallback to Header and First Paragraph
        if (!description) {
          const headerMatch = content.match(/^#\s+(.+)$/m);
          if (headerMatch && !fmMatch) {
            name = headerMatch[1].trim();
          }

          const body = fmMatch ? content.slice(fmMatch[0].length).trim() : content.trim();
          const lines = body.split('\n');
          const descLines: string[] = [];

          for (const line of lines) {
            if (line.startsWith('#') || !line.trim()) {
              if (descLines.length > 0) break;
              continue;
            }
            descLines.push(line.trim());
          }

          if (descLines.length > 0) {
            description = descLines.join(' ').slice(0, 150) + '...';
          }
        }

        skills.push({
          id: item.name,
          path: path.relative(path.dirname(skillsDir), skillDir),
          name,
          description,
        });
      } else if (item.name !== '.disabled' && !item.name.startsWith('.')) {
        // Recurse into subdirectories that aren't skills themselves
        scan(skillDir);
      }
    }
  }

  scan(skillsDir);

  skills.sort((a, b) => a.name.localeCompare(b.name));

  fs.writeFileSync(outputFile, JSON.stringify(skills, null, 2), 'utf-8');
  console.log(`✅ Generated index with ${skills.length} skills at: ${outputFile}`);
}

const baseDir = process.cwd();
const skillsPath = path.join(baseDir, '.agent', 'skills');
const outputPath = path.join(baseDir, 'skills_index.json');

generateIndex(skillsPath, outputPath);
