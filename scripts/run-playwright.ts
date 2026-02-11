import { spawn } from 'node:child_process';

import { withE2ERuntimeEnv, type E2EMode } from './e2e-env';
import { getE2EPort } from './e2e-port';

function runCommand(command: string, args: string[], env: NodeJS.ProcessEnv): Promise<void> {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, {
      stdio: 'inherit',
      env,
      shell: process.platform === 'win32',
    });

    child.on('error', reject);
    child.on('exit', (code) => {
      if (code === 0) {
        resolve();
        return;
      }

      reject(new Error(`Command failed with exit code ${code}: ${command} ${args.join(' ')}`));
    });
  });
}

async function main() {
  const modeArg = process.argv[2];
  if (modeArg !== 'dev' && modeArg !== 'ci') {
    throw new Error(`Usage: tsx scripts/run-playwright.ts <dev|ci> [playwright args...]`);
  }

  const mode = modeArg as E2EMode;
  const extraPlaywrightArgs = process.argv.slice(3);
  const port = getE2EPort();
  const env = withE2ERuntimeEnv(process.env, mode, port);

  if (mode === 'ci') {
    await runCommand('npm', ['run', 'build'], env);
  }

  await runCommand('npx', ['tsx', 'scripts/check-e2e-port.ts'], env);

  await runCommand(
    'npx',
    ['playwright', 'test', '--config', 'playwright.config.ts', ...extraPlaywrightArgs],
    env
  );
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
