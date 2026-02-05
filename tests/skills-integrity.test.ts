import * as fs from 'fs';
import * as path from 'path';

import { describe, it, expect } from 'vitest';

const SKILLS_DIR = path.join(process.cwd(), '.agent', 'skills');

describe('Sovereign Skill Library Integrity', () => {
  it('should have the canonical skills directory', () => {
    expect(fs.existsSync(SKILLS_DIR)).toBe(true);
  });

  it('should contain more than 600 specialized skills', () => {
    if (!fs.existsSync(SKILLS_DIR)) {
      throw new Error('Skills directory missing');
    }
    const skills = fs
      .readdirSync(SKILLS_DIR, { withFileTypes: true })
      .filter((dirent) => dirent.isDirectory());

    // We expect 600+ skills from the 'antigravity-awesome-skills' library
    expect(skills.length).toBeGreaterThanOrEqual(600);
  });

  it('should contain the Senior Architect elite skill', () => {
    const architectPath = path.join(SKILLS_DIR, 'senior-architect', 'SKILL.md');
    expect(fs.existsSync(architectPath)).toBe(true);
  });

  it('should have no root skills directory (drift prevention)', () => {
    const rootSkills = path.join(process.cwd(), 'skills');
    expect(fs.existsSync(rootSkills)).toBe(false);
  });
});
