import { spawnSync } from 'node:child_process';
import * as fs from 'node:fs';
import * as path from 'node:path';

const projectRoot = path.resolve(__dirname, '..');
const windowsVerifyScriptPath = path.join(projectRoot, 'scripts', 'verify-setup.ps1');
const requiredFiles = ['AGENTS.md', 'package.json', 'tsconfig.json', 'next.config.ts', 'firebase.json'];

function runCommand(command: string): number {
  const result = spawnSync(command, {
    cwd: projectRoot,
    shell: true,
    stdio: 'inherit',
    env: process.env,
  });

  if (typeof result.status === 'number') {
    return result.status;
  }

  return 1;
}

function hasPowerShell(): boolean {
  const result = spawnSync('powershell', ['-NoProfile', '-Command', '$PSVersionTable.PSVersion'], {
    cwd: projectRoot,
    shell: true,
    stdio: 'ignore',
    env: process.env,
  });

  return result.status === 0;
}

function verifyNodeVersion(): boolean {
  const majorVersion = Number.parseInt(process.versions.node.split('.')[0] ?? '0', 10);

  if (majorVersion < 20) {
    console.error(`[FAIL] Node.js v20+ required, found v${process.versions.node}`);
    return false;
  }

  console.log(`[OK] Node.js v${process.versions.node}`);
  return true;
}

function verifyRequiredFiles(): boolean {
  const missingFiles = requiredFiles.filter((relativeFilePath) => {
    return !fs.existsSync(path.join(projectRoot, relativeFilePath));
  });

  if (missingFiles.length === 0) {
    console.log('[OK] Required project files exist');
    return true;
  }

  console.error(`[FAIL] Missing required files: ${missingFiles.join(', ')}`);
  return false;
}

function runFallbackVerification(): number {
  const checks = [
    'npm run test:policy',
    'npm run type-check',
    'npm run security_scan',
    'npm run api_validation',
    'npm run schema_validation',
    'npm run integration_map_audit',
    'npm run test:unit',
  ];

  for (const check of checks) {
    console.log(`\n[RUN] ${check}`);
    const exitCode = runCommand(check);
    if (exitCode !== 0) {
      return exitCode;
    }
  }

  return 0;
}

function main(): number {
  console.log('\n=== GETTUPP Verification ===\n');

  if (!verifyNodeVersion()) {
    return 1;
  }

  if (!verifyRequiredFiles()) {
    return 1;
  }

  if (process.platform === 'win32' && fs.existsSync(windowsVerifyScriptPath) && hasPowerShell()) {
    console.log('[RUN] Windows verify script');
    return runCommand('powershell -ExecutionPolicy Bypass -File scripts/verify-setup.ps1');
  }

  console.log('[INFO] Using cross-platform verification flow');
  return runFallbackVerification();
}

process.exit(main());
