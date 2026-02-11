import * as fs from 'fs';
import * as path from 'path';

import { describe, expect, it } from 'vitest';

const ROOT = path.resolve(__dirname, '../..');
const PROJECT_CONFIG_PATH = path.join(ROOT, 'project-config.json');
const PACKAGE_JSON_PATH = path.join(ROOT, 'package.json');

type ProjectConfig = {
  verifications?: {
    scripts?: Record<string, string>;
  };
};

function extractNpmScript(command: string): string | null {
  const match = command.match(/^npm\s+run\s+([A-Za-z0-9:_-]+)/);
  return match?.[1] ?? null;
}

function extractTsxScriptPath(command: string): string | null {
  const match = command.match(/(?:npx\s+)?tsx\s+([^\s]+)/);
  return match?.[1] ?? null;
}

describe('Policy: Project Config Verification Mapping', () => {
  it('maps every project-config verification command to real scripts/files', () => {
    const pkg = JSON.parse(fs.readFileSync(PACKAGE_JSON_PATH, 'utf-8')) as {
      scripts?: Record<string, string>;
    };
    const cfg = JSON.parse(fs.readFileSync(PROJECT_CONFIG_PATH, 'utf-8')) as ProjectConfig;
    const verificationScripts = cfg.verifications?.scripts ?? {};

    const missingNpmScripts: string[] = [];
    const missingTsxFiles: string[] = [];

    for (const command of Object.values(verificationScripts)) {
      const segments = command
        .split('&&')
        .map((segment) => segment.trim())
        .filter(Boolean);

      for (const segment of segments) {
        const npmScript = extractNpmScript(segment);
        if (npmScript && !pkg.scripts?.[npmScript]) {
          missingNpmScripts.push(`${npmScript} (from: ${segment})`);
        }

        const tsxScript = extractTsxScriptPath(segment);
        if (tsxScript && !fs.existsSync(path.join(ROOT, tsxScript))) {
          missingTsxFiles.push(`${tsxScript} (from: ${segment})`);
        }
      }
    }

    expect(missingNpmScripts).toEqual([]);
    expect(missingTsxFiles).toEqual([]);
  });
});
