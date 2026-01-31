import * as fs from 'fs';
import * as path from 'path';

const SKILLS_DIR = path.join(process.cwd(), 'skills');
const DISABLED_DIR = path.join(SKILLS_DIR, '.disabled');

function listActive() {
  console.log('🟢 Active Skills:\n');

  if (!fs.existsSync(SKILLS_DIR)) {
    console.error('❌ Skills directory not found');
    return;
  }

  const items = fs.readdirSync(SKILLS_DIR, { withFileTypes: true });
  const skills = items
    .filter((item) => item.isDirectory() && !item.name.startsWith('.'))
    .map((item) => item.name)
    .sort();

  const symlinks = items
    .filter((item) => item.isSymbolicLink())
    .map((item) => item.name)
    .sort();

  skills.forEach((skill) => console.log(`  • ${skill}`));

  if (symlinks.length > 0) {
    console.log('\n📎 Symlinks:');
    symlinks.forEach((link) => {
      const target = fs.readlinkSync(path.join(SKILLS_DIR, link));
      console.log(`  • ${link} → ${target}`);
    });
  }

  console.log(`\n✅ Total: ${skills.length} skills + ${symlinks.length} symlinks`);
}

function listDisabled() {
  if (!fs.existsSync(DISABLED_DIR)) {
    console.log('❌ No disabled skills directory found');
    return;
  }

  console.log('⚪ Disabled Skills:\n');
  const disabled = fs
    .readdirSync(DISABLED_DIR, { withFileTypes: true })
    .filter((item) => item.isDirectory())
    .map((item) => item.name)
    .sort();

  disabled.forEach((skill) => console.log(`  • ${skill}`));
  console.log(`\n📊 Total: ${disabled.length} disabled skills`);
}

function enableSkill(skillName: string) {
  const source = path.join(DISABLED_DIR, skillName);
  const target = path.join(SKILLS_DIR, skillName);

  if (!fs.existsSync(source)) {
    console.error(`❌ Skill '${skillName}' not found in .disabled/`);
    return;
  }

  if (fs.existsSync(target)) {
    console.warn(`⚠️  Skill '${skillName}' is already active`);
    return;
  }

  fs.renameSync(source, target);
  console.log(`✅ Enabled: ${skillName}`);
}

function enableAll() {
  if (!fs.existsSync(DISABLED_DIR)) {
    console.log('❌ No disabled skills directory found');
    return;
  }

  const disabled = fs
    .readdirSync(DISABLED_DIR, { withFileTypes: true })
    .filter((item) => item.isDirectory())
    .map((item) => item.name);

  if (disabled.length === 0) {
    console.log('✨ No skills found in .disabled/');
    return;
  }

  console.log(`🚀 Enabling ${disabled.length} skills...`);
  disabled.forEach((skill) => enableSkill(skill));
  console.log(`\n✅ Bulk enable complete.`);
}

function disableSkill(skillName: string) {
  const source = path.join(SKILLS_DIR, skillName);
  const target = path.join(DISABLED_DIR, skillName);

  if (!fs.existsSync(source)) {
    console.error(`❌ Skill '${skillName}' not found`);
    return;
  }

  if (skillName.startsWith('.')) {
    console.warn(`⚠️  Cannot disable system directory: ${skillName}`);
    return;
  }

  const stats = fs.lstatSync(source);
  if (stats.isSymbolicLink()) {
    console.warn(`⚠️  Cannot disable symlink: ${skillName}`);
    console.log(`   (Remove the symlink manually if needed)`);
    return;
  }

  if (!fs.existsSync(DISABLED_DIR)) {
    fs.mkdirSync(DISABLED_DIR, { recursive: true });
  }

  fs.renameSync(source, target);
  console.log(`✅ Disabled: ${skillName}`);
}

function main() {
  const args = process.argv.slice(2);
  if (args.length === 0) {
    console.log(`
Skills Manager - TypeScript Version

Usage:
  npm run skills:list          # List active skills
  npm run skills:disabled      # List disabled skills
  npm run skills:enable-all    # Enable all disabled skills
  npm run skills:enable <SKILL>  # Enable a specific skill
  npm run skills:disable <SKILL> # Disable a specific skill
        `);
    return;
  }

  const command = args[0].toLowerCase();

  switch (command) {
    case 'list':
      listActive();
      break;
    case 'disabled':
      listDisabled();
      break;
    case 'enable-all':
      enableAll();
      break;
    case 'enable':
      if (!args[1]) {
        console.error('❌ Usage: skills:enable <SKILL_NAME>');
        process.exit(1);
      }
      enableSkill(args[1]);
      break;
    case 'disable':
      if (!args[1]) {
        console.error('❌ Usage: skills:disable <SKILL_NAME>');
        process.exit(1);
      }
      disableSkill(args[1]);
      break;
    default:
      console.error(`❌ Unknown command: ${command}`);
      process.exit(1);
  }
}

main();
