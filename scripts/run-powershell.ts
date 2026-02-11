import { spawnSync } from 'node:child_process';
import * as fs from 'node:fs';
import * as path from 'node:path';

const projectRoot = path.resolve(__dirname, '..');

function resolvePowerShellCommand(): string | null {
  const candidates = process.platform === 'win32' ? ['powershell', 'pwsh'] : ['pwsh', 'powershell'];

  for (const candidate of candidates) {
    const probe = spawnSync(candidate, ['-NoProfile', '-Command', '$PSVersionTable.PSVersion'], {
      cwd: projectRoot,
      stdio: 'ignore',
      shell: true,
      env: process.env,
    });

    if (probe.status === 0) {
      return candidate;
    }
  }

  return null;
}

function main(): number {
  const [scriptRelativePath, ...scriptArgs] = process.argv.slice(2);
  if (!scriptRelativePath) {
    console.error('Usage: tsx scripts/run-powershell.ts <script.ps1> [args...]');
    return 1;
  }

  const scriptPath = path.resolve(projectRoot, scriptRelativePath);
  if (!fs.existsSync(scriptPath)) {
    console.error(`PowerShell script not found: ${scriptPath}`);
    return 1;
  }

  const powerShellCommand = resolvePowerShellCommand();
  if (!powerShellCommand) {
    console.error(
      `PowerShell is not available on this machine. Cannot execute: ${path.relative(projectRoot, scriptPath)}`
    );
    return 1;
  }

  const result = spawnSync(
    powerShellCommand,
    ['-ExecutionPolicy', 'Bypass', '-File', scriptPath, ...scriptArgs],
    {
      cwd: projectRoot,
      stdio: 'inherit',
      shell: true,
      env: process.env,
    }
  );

  return typeof result.status === 'number' ? result.status : 1;
}

process.exit(main());
