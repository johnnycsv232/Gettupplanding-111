import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PROJECT_ROOT = path.resolve(__dirname, '..');

interface CheckResult {
  id: string;
  status: 'PASS' | 'FAIL' | 'WARN' | 'SKIP';
  message: string;
  evidence?: string;
}

interface DoctorReport {
  ok: boolean;
  timestamp: string;
  checks: CheckResult[];
  summary: {
    total: number;
    passed: number;
    failed: number;
  };
}

const args = process.argv.slice(2);
const IS_JSON = args.includes('--json');
const IS_PRETTY = args.includes('--pretty');

const results: CheckResult[] = [];

function check(
  id: string,
  description: string,
  fn: () => { status: CheckResult['status']; message?: string; evidence?: string }
) {
  try {
    const result = fn();
    results.push({
      id,
      status: result.status,
      message: result.message || description,
      evidence: result.evidence,
    });
  } catch (error: any) {
    results.push({
      id,
      status: 'FAIL',
      message: `Check failed with exception: ${error.message}`,
      evidence: error.stack,
    });
  }
}

function runChecks() {
  // 1. Skills Single Source of Truth
  check('INFRA_SKILLS_CANONICAL', 'Skills Single Source of Truth', () => {
    const canonicalSkillsDir = path.join(PROJECT_ROOT, '.agent', 'skills', 'skills');
    const skillportRc = path.join(PROJECT_ROOT, '.skillportrc');

    if (!fs.existsSync(canonicalSkillsDir))
      return { status: 'FAIL', message: 'Canonical skills dir missing at .agent/skills/skills' };

    return { status: 'PASS', message: 'Skills infrastructure valid' };
  });

  // 2. Skills Index Integrity
  check('INFRA_INDEX_INTEGRITY', 'Skills Index Integrity', () => {
    const indexFile = path.join(PROJECT_ROOT, 'skills_index.json');
    if (!fs.existsSync(indexFile)) return { status: 'WARN', message: 'skills_index.json missing' };

    const content = fs.readFileSync(indexFile, 'utf-8');
    if (content.includes('\u0000'))
      return { status: 'FAIL', message: 'Null bytes detected in skills_index.json' };

    try {
      JSON.parse(content);
      return { status: 'PASS', message: 'skills_index.json is valid JSON' };
    } catch {
      return { status: 'FAIL', message: 'skills_index.json is invalid JSON' };
    }
  });

  // 3. Asset Placement
  check('ASSET_VIDEO_PUBLIC', 'Large video assets in public/', () => {
    const searchDirs = ['scripts', 'src'];
    const failures: string[] = [];

    function scan(dir: string) {
      if (!fs.existsSync(dir)) return;
      const items = fs.readdirSync(dir);
      for (const item of items) {
        const fullPath = path.join(dir, item);
        const stat = fs.statSync(fullPath);
        if (stat.isDirectory()) {
          if (path.basename(fullPath) !== 'node_modules' && path.basename(fullPath) !== '.next')
            scan(fullPath);
        } else if (fullPath.endsWith('.mp4') && stat.size > 5 * 1024 * 1024) {
          failures.push(path.relative(PROJECT_ROOT, fullPath));
        }
      }
    }

    searchDirs.forEach((d) => scan(path.join(PROJECT_ROOT, d)));

    if (failures.length > 0)
      return {
        status: 'FAIL',
        message: 'Large videos found outside public/',
        evidence: failures.join(', '),
      };
    return { status: 'PASS', message: 'No large videos misplaced' };
  });

  // 4. SEO Schema
  check('SEO_JSON_LD_VIDEO', 'VideoObject Schema Presence', () => {
    const landingPage = path.join(PROJECT_ROOT, 'src', 'app', 'page.tsx');
    if (!fs.existsSync(landingPage)) return { status: 'SKIP', message: 'Landing page not found' };

    const content = fs.readFileSync(landingPage, 'utf-8');
    const hasSchema = /application\/ld\+json/.test(content);
    const hasVideoObject = /VideoObject/.test(content);

    if (hasSchema && hasVideoObject)
      return { status: 'PASS', message: 'VideoObject Schema detected' };
    return { status: 'FAIL', message: 'Missing VideoObject Schema' };
  });

  // 5. A11y
  check('A11Y_REDUCED_MOTION', 'Reduced Motion Support', () => {
    let hit = false;
    const srcDir = path.join(PROJECT_ROOT, 'src');

    function scan(dir: string) {
      if (hit || !fs.existsSync(dir)) return;
      const items = fs.readdirSync(dir);
      for (const item of items) {
        const fp = path.join(dir, item);
        if (fs.statSync(fp).isDirectory()) {
          scan(fp);
        } else if (fp.endsWith('.tsx') || fp.endsWith('.css')) {
          const c = fs.readFileSync(fp, 'utf-8');
          if (c.includes('prefers-reduced-motion') || c.includes('motion-reduce')) {
            hit = true;
            return;
          }
        }
      }
    }
    scan(srcDir);

    if (hit) return { status: 'PASS', message: 'Reduced motion detected' };
    return { status: 'FAIL', message: 'No prefers-reduced-motion usage found' };
  });

  // 5.5 A11y Aria Hidden
  check('A11Y_ARIA_HIDDEN_DECORATIVE', 'Aria Hidden on Decorative Videos', () => {
    let hit = false;
    const srcDir = path.join(PROJECT_ROOT, 'src');

    function scan(dir: string) {
      if (hit || !fs.existsSync(dir)) return;
      const items = fs.readdirSync(dir);
      for (const item of items) {
        const fp = path.join(dir, item);
        if (fs.statSync(fp).isDirectory()) {
          scan(fp);
        } else if (fp.endsWith('.tsx')) {
          const c = fs.readFileSync(fp, 'utf-8');
          // Heuristic: if a video tag AND aria-hidden="true" exist in the same file
          if (/<video/.test(c) && /aria-hidden="true"/.test(c)) {
            hit = true;
            return;
          }
        }
      }
    }
    scan(srcDir);

    if (hit) return { status: 'PASS', message: 'aria-hidden="true" found on video components' };
    return { status: 'WARN', message: 'Could not confirm aria-hidden on videos (check manually)' };
  });

  // 6. Dependencies
  check('DEPS_CLEAN_NPM_LS', 'Dependencies Hygiene', () => {
    try {
      execSync('npm ls --json --depth=0', { cwd: PROJECT_ROOT, stdio: 'pipe' });
      return { status: 'PASS', message: 'npm ls clean' };
    } catch (e: any) {
      // npm ls returns non-zero on extraneous/missing deps
      const stdout = e.stdout ? e.stdout.toString() : '';
      const stderr = e.stderr ? e.stderr.toString() : '';
      return {
        status: 'FAIL',
        message: 'npm ls reported issues',
        evidence: stderr || 'Extraneous or invalid deps detected',
      };
    }
  });

  // 7. Environment Variables (Stripe)
  check('ENV_STRIPE_KEYS', 'Stripe API Key Presence', () => {
    const envPath = path.join(PROJECT_ROOT, '.env');
    if (!fs.existsSync(envPath)) return { status: 'FAIL', message: '.env file missing' };
    const content = fs.readFileSync(envPath, 'utf-8');
    const hasKey = /NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_(test|live)_[a-zA-Z0-9]+/.test(content);
    if (hasKey) return { status: 'PASS', message: 'Stripe publishable key found' };
    return { status: 'FAIL', message: 'Stripe publishable key missing or invalid format' };
  });

  // 8. Firebase Parity
  check('INFRA_FIREBASE_PARITY', 'Firebase Environment Parity', () => {
    const envPath = path.join(PROJECT_ROOT, '.env');
    const rcPath = path.join(PROJECT_ROOT, '.firebaserc');

    if (!fs.existsSync(envPath) || !fs.existsSync(rcPath)) {
      return { status: 'SKIP', message: '.env or .firebaserc missing' };
    }

    const envContent = fs.readFileSync(envPath, 'utf-8');
    const rcContent = fs.readFileSync(rcPath, 'utf-8');

    const envMatch = envContent.match(/NEXT_PUBLIC_FIREBASE_PROJECT_ID=([a-zA-Z0-9-]+)/);
    const envId = envMatch ? envMatch[1] : null;

    let rcId = null;
    try {
      const rc = JSON.parse(rcContent);
      rcId = rc.projects?.default;
    } catch {
      return { status: 'FAIL', message: 'Failed to parse .firebaserc' };
    }

    if (!envId || !rcId) return { status: 'FAIL', message: 'Could not resolve project IDs' };
    if (envId === rcId) return { status: 'PASS', message: `Parity confirmed (${envId})` };

    return {
      status: 'FAIL',
      message: 'Firebase project ID mismatch',
      evidence: `.env: ${envId} vs .firebaserc: ${rcId}`,
    };
  });
}

runChecks();

const passed = results.filter((r) => r.status === 'PASS').length;
const failed = results.filter((r) => r.status === 'FAIL').length;
const total = results.length;
const ok = failed === 0;

const report: DoctorReport = {
  ok,
  timestamp: new Date().toISOString(),
  checks: results,
  summary: { total, passed, failed },
};

if (IS_JSON) {
  console.log(JSON.stringify(report, null, 2));
} else {
  console.log(`\n🩺 Doctor v2 Report [${new Date().toISOString()}]`);
  console.log('=================================================');
  results.forEach((r) => {
    const icon =
      r.status === 'PASS' ? '✅' : r.status === 'FAIL' ? '❌' : r.status === 'WARN' ? '⚠️' : '⏭️';
    console.log(`${icon} [${r.id}] ${r.message}`);
    if (r.evidence) console.log(`   Evidence: ${r.evidence}`);
  });
  console.log('=================================================');
  console.log(`Result: ${ok ? 'PASSED' : 'FAILED'} (${passed}/${total} checks passed)`);
}

process.exit(ok ? 0 : 1);
