import * as fs from 'node:fs';
import * as path from 'node:path';

export const PROJECT_ROOT = process.cwd();

export function resolveExistingDirectory(
  candidatePaths: readonly string[],
  options: { required?: boolean; label?: string } = {}
): string {
  for (const candidatePath of candidatePaths) {
    const absolutePath = path.resolve(PROJECT_ROOT, candidatePath);
    if (fs.existsSync(absolutePath) && fs.statSync(absolutePath).isDirectory()) {
      return absolutePath;
    }
  }

  if (options.required) {
    const label = options.label ?? 'directory';
    throw new Error(
      `Unable to resolve ${label}. Checked: ${candidatePaths
        .map((candidate) => path.resolve(PROJECT_ROOT, candidate))
        .join(', ')}`
    );
  }

  return path.resolve(PROJECT_ROOT, candidatePaths[0] ?? '.');
}

export function resolveSkillsDirectory(required = true): string {
  return resolveExistingDirectory(
    [
      process.env.GETTUPP_SKILLS_DIR ?? '',
      '.agent/skills',
      'skills',
    ].filter(Boolean),
    { required, label: 'skills directory' }
  );
}

export function resolveRulesDirectory(required = true): string {
  return resolveExistingDirectory(
    [
      process.env.GETTUPP_RULES_DIR ?? '',
      '.agent/rules',
      'agent/rules',
    ].filter(Boolean),
    { required, label: 'rules directory' }
  );
}

export function ensureDirectory(dirPath: string): void {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}
