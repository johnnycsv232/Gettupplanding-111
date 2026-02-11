import * as fs from 'fs';
import * as path from 'path';

import { describe, expect, it } from 'vitest';

const CONFLICT_MARKER_REGEX = /^(<<<<<<< |=======|>>>>>>> )/m;
const SOURCE_ROOT = path.resolve(__dirname, '../../src');
const SOURCE_EXTENSIONS = new Set(['.ts', '.tsx']);

function collectSourceFiles(dir: string): string[] {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const files: string[] = [];

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      files.push(...collectSourceFiles(fullPath));
      continue;
    }

    if (SOURCE_EXTENSIONS.has(path.extname(entry.name))) {
      files.push(fullPath);
    }
  }

  return files;
}

describe('Policy: Repository Integrity', () => {
  it('contains no merge conflict markers in src TypeScript files', () => {
    const files = collectSourceFiles(SOURCE_ROOT);
    const filesWithConflicts: string[] = [];

    for (const file of files) {
      const content = fs.readFileSync(file, 'utf-8');

      if (CONFLICT_MARKER_REGEX.test(content)) {
        filesWithConflicts.push(path.relative(path.resolve(__dirname, '../..'), file));
      }
    }

    expect(filesWithConflicts).toEqual([]);
  });
});
