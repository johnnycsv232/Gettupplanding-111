import { spawnSync } from 'node:child_process';
import * as path from 'node:path';

const projectRoot = path.resolve(__dirname, '..');

const result = spawnSync('next build', {
  cwd: projectRoot,
  shell: true,
  stdio: 'inherit',
  env: {
    ...process.env,
    ANALYZE: 'true',
  },
});

process.exit(typeof result.status === 'number' ? result.status : 1);
