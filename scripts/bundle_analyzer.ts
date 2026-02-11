import { spawnSync } from 'node:child_process';
import * as fs from 'node:fs';
import * as path from 'node:path';

const PROJECT_ROOT = path.resolve(__dirname, '..');

function runBundleAnalysisBuild(): number {
  const result = spawnSync('next build', {
    cwd: PROJECT_ROOT,
    shell: true,
    stdio: 'inherit',
    env: {
      ...process.env,
      ANALYZE: 'true',
    },
  });

  return typeof result.status === 'number' ? result.status : 1;
}

function reportAnalyzerArtifacts(): void {
  const analyzeDir = path.join(PROJECT_ROOT, '.next', 'analyze');
  const expectedArtifacts = ['client.html', 'edge.html', 'nodejs.html', 'client.json', 'edge.json', 'nodejs.json'];

  if (!fs.existsSync(analyzeDir)) {
    console.warn(
      '[bundle_analysis] Build succeeded, but .next/analyze was not generated. This can happen on some Next.js/Turbopack paths.'
    );
    return;
  }

  const generated = expectedArtifacts.filter((artifact) =>
    fs.existsSync(path.join(analyzeDir, artifact))
  );

  if (generated.length === 0) {
    console.warn(
      '[bundle_analysis] .next/analyze exists, but no expected analyzer artifacts were found.'
    );
    return;
  }

  console.log('[bundle_analysis] Analyzer artifacts:');
  for (const artifact of generated) {
    console.log(`  - ${path.join('.next', 'analyze', artifact)}`);
  }
}

function main(): number {
  console.log('[bundle_analysis] Running Next.js build with ANALYZE=true');
  const exitCode = runBundleAnalysisBuild();

  if (exitCode !== 0) {
    return exitCode;
  }

  reportAnalyzerArtifacts();
  return 0;
}

process.exit(main());
