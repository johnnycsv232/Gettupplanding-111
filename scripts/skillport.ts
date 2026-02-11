import { spawnSync } from 'node:child_process';
import * as path from 'node:path';

import { resolveSkillsDirectory } from './workspace-paths';

const appDataScriptsDir = process.env.APPDATA
  ? path.join(process.env.APPDATA, 'Python', 'Python314', 'Scripts')
  : null;

function runBinary(candidates: readonly string[], args: readonly string[]): number {
  for (const candidate of candidates) {
    const result = spawnSync(candidate, args, {
      stdio: 'inherit',
      shell: true,
      env: process.env,
    });

    if (typeof result.status === 'number') {
      if (result.status === 127) {
        continue;
      }
      return result.status;
    }

    const spawnErrorCode = (result.error as NodeJS.ErrnoException | undefined)?.code;
    if (spawnErrorCode === 'ENOENT') {
      continue;
    }
  }

  return 127;
}

function main(): number {
  const [command, ...rest] = process.argv.slice(2);
  const isMcpCommand = command === 'mcp' || command === 'reindex';

  if (isMcpCommand) {
    const skillsDir = resolveSkillsDirectory(false);
    const mcpArgs = [...rest];

    if (!mcpArgs.includes('--skills-dir')) {
      mcpArgs.push('--skills-dir', skillsDir);
    }
    if (command === 'reindex' && !mcpArgs.includes('--reindex')) {
      mcpArgs.push('--reindex');
    }

    const mcpCandidates = [
      process.env.SKILLPORT_MCP_BIN,
      'skillport-mcp',
      'skillport-mcp.exe',
      appDataScriptsDir ? path.join(appDataScriptsDir, 'skillport-mcp.exe') : null,
    ].filter((value): value is string => Boolean(value));

    const exitCode = runBinary(mcpCandidates, mcpArgs);
    if (exitCode === 127) {
      console.error('Unable to find skillport-mcp executable. Set SKILLPORT_MCP_BIN if needed.');
      return 1;
    }
    return exitCode;
  }

  const skillportArgs = command ? [command, ...rest] : rest;
  const skillportCandidates = [
    process.env.SKILLPORT_BIN,
    'skillport',
    'skillport.exe',
    appDataScriptsDir ? path.join(appDataScriptsDir, 'skillport.exe') : null,
  ].filter((value): value is string => Boolean(value));

  const exitCode = runBinary(skillportCandidates, skillportArgs);
  if (exitCode === 127) {
    console.error('Unable to find skillport executable. Set SKILLPORT_BIN if needed.');
    return 1;
  }
  return exitCode;
}

process.exit(main());
