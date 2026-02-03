import * as fs from 'fs';
import * as path from 'path';

const disabledSkillsDir = path.join(process.cwd(), 'skills', '.disabled');

if (!fs.existsSync(disabledSkillsDir)) {
  console.log('✅ No disabled skills directory found.');
  process.exit(0);
}

const folders = fs.readdirSync(disabledSkillsDir);

let count = 0;
for (const folder of folders) {
  const fullPath = path.join(disabledSkillsDir, folder);
  if (fs.lstatSync(fullPath).isDirectory()) {
    const skillMd = path.join(fullPath, 'SKILL.md');
    if (fs.existsSync(skillMd)) {
      const target = path.join(fullPath, 'SKILL.md.disabled');
      fs.renameSync(skillMd, target);
      count++;
    }
  }
}

console.log(`✅ Neutralized ${count} disabled skills.`);
