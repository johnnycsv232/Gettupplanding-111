import * as fs from 'fs';
import * as path from 'path';

import { describe, it, expect } from 'vitest';

describe('Skill Path Configuration Integrity', () => {
  const root = path.resolve(__dirname, '..');

  it('mcp_config.json should point to .agent/skills', () => {
    const configPath = path.join(root, 'mcp_config.json');
    const content = JSON.parse(fs.readFileSync(configPath, 'utf-8'));
    const skillportArgs = content.mcpServers.skillport.args;

    // Find the --skills-dir argument and its value
    const skillsDirIndex = skillportArgs.indexOf('--skills-dir');
    expect(skillsDirIndex).toBeGreaterThan(-1);
    const skillsPath = skillportArgs[skillsDirIndex + 1].replace(/\\/g, '/');
    expect(skillsPath).toContain('.agent/skills/skills');
  });

  it('.skillportrc should point to .agent/skills/skills', () => {
    const skillportrcPath = path.join(root, '.skillportrc');
    const content = fs.readFileSync(skillportrcPath, 'utf-8');
    expect(content).toMatch(/skills_dir:\s*\.agent\/skills\/skills/);
  });

  it('package.json scripts should point to .agent/skills/skills', () => {
    const packageJsonPath = path.join(root, 'package.json');
    const content = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));
    const scripts = content.scripts;

    expect(scripts['skillport:mcp']).toContain('.agent/skills/skills');
    expect(scripts['skillport:reindex']).toContain('.agent/skills/skills');
  });
});
