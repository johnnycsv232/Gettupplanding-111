import * as fs from 'node:fs';
import * as path from 'node:path';

type CheckStatus = 'PASS' | 'FAIL' | 'WARN';

interface CheckResult {
  id: string;
  status: CheckStatus;
  message: string;
  evidence?: string;
}

interface ScanReport {
  ok: boolean;
  summary: {
    total: number;
    passed: number;
    failed: number;
    warned: number;
  };
  checks: CheckResult[];
}

const PROJECT_ROOT = process.cwd();
const SRC_ROOT = path.join(PROJECT_ROOT, 'src');
const args = new Set(process.argv.slice(2));
const IS_JSON = args.has('--json');

const checks: CheckResult[] = [];

function addCheck(result: CheckResult): void {
  checks.push(result);
}

function readFileSafe(filePath: string): string | null {
  if (!fs.existsSync(filePath)) {
    return null;
  }
  return fs.readFileSync(filePath, 'utf-8');
}

function walkFiles(
  rootDir: string,
  extensions: ReadonlySet<string>,
  filePaths: string[] = []
): string[] {
  if (!fs.existsSync(rootDir)) {
    return filePaths;
  }

  const entries = fs.readdirSync(rootDir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(rootDir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name.startsWith('.') || entry.name === 'node_modules') {
        continue;
      }
      walkFiles(fullPath, extensions, filePaths);
      continue;
    }

    if (extensions.has(path.extname(entry.name))) {
      filePaths.push(fullPath);
    }
  }

  return filePaths;
}

function checkFirestoreDenyAll(): void {
  const rulesPath = path.join(PROJECT_ROOT, 'firestore.rules');
  const rules = readFileSafe(rulesPath);

  if (!rules) {
    addCheck({
      id: 'SEC_FIRESTORE_RULES_FILE',
      status: 'FAIL',
      message: 'firestore.rules is missing.',
    });
    return;
  }

  const normalized = rules.replace(/\s+/g, ' ');
  const hasDenyAll =
    /match \/{document=\*\*} \{ allow read, write: if false; \}/.test(normalized);

  if (!hasDenyAll) {
    addCheck({
      id: 'SEC_FIRESTORE_DENY_ALL',
      status: 'FAIL',
      message: 'Firestore deny-all default rule is missing.',
    });
    return;
  }

  addCheck({
    id: 'SEC_FIRESTORE_DENY_ALL',
    status: 'PASS',
    message: 'Firestore deny-all default rule is present.',
  });
}

function checkSubscriptionTierProtection(): void {
  const rulesPath = path.join(PROJECT_ROOT, 'firestore.rules');
  const rules = readFileSafe(rulesPath);

  if (!rules) {
    addCheck({
      id: 'SEC_SUBSCRIPTION_TIER_PROTECTION',
      status: 'FAIL',
      message: 'firestore.rules is missing.',
    });
    return;
  }

  const hasSensitiveFieldProtection =
    rules.includes('subscriptionTier') &&
    rules.includes('stripeCustomerId') &&
    rules.includes('hasActiveSubscription') &&
    rules.includes('subscriptionStatus');

  if (!hasSensitiveFieldProtection) {
    addCheck({
      id: 'SEC_SUBSCRIPTION_TIER_PROTECTION',
      status: 'FAIL',
      message: 'User subscription/billing fields are not explicitly protected in firestore.rules.',
    });
    return;
  }

  addCheck({
    id: 'SEC_SUBSCRIPTION_TIER_PROTECTION',
    status: 'PASS',
    message: 'User subscription/billing fields are explicitly protected in firestore.rules.',
  });
}

function checkWebhookSignatureVerification(): void {
  const webhookPath = path.join(PROJECT_ROOT, 'src', 'app', 'api', 'webhooks', 'stripe', 'route.ts');
  const content = readFileSafe(webhookPath);

  if (!content) {
    addCheck({
      id: 'SEC_WEBHOOK_SIGNATURE',
      status: 'FAIL',
      message: 'Stripe webhook handler route is missing.',
    });
    return;
  }

  const hasImport = /import\s+\{\s*verifyWebhookSignature\s*\}\s+from\s+['"][^'"]+['"]/.test(content);
  const hasCall = /verifyWebhookSignature\(/.test(content);

  if (!hasImport || !hasCall) {
    addCheck({
      id: 'SEC_WEBHOOK_SIGNATURE',
      status: 'FAIL',
      message: 'Stripe webhook handler does not verify signatures.',
    });
    return;
  }

  addCheck({
    id: 'SEC_WEBHOOK_SIGNATURE',
    status: 'PASS',
    message: 'Stripe webhook handler verifies signatures.',
  });
}

function checkWebhookIdempotencyLock(): void {
  const webhookPath = path.join(PROJECT_ROOT, 'src', 'app', 'api', 'webhooks', 'stripe', 'route.ts');
  const content = readFileSafe(webhookPath);

  if (!content) {
    addCheck({
      id: 'SEC_WEBHOOK_IDEMPOTENCY',
      status: 'FAIL',
      message: 'Stripe webhook handler route is missing.',
    });
    return;
  }

  const hasIdempotencyDoc = /collection\(['"]webhook_events['"]\)\.doc\(/.test(content);
  const hasAtomicCreate = /\.create\(\s*\{/.test(content);

  if (!hasIdempotencyDoc || !hasAtomicCreate) {
    addCheck({
      id: 'SEC_WEBHOOK_IDEMPOTENCY',
      status: 'FAIL',
      message: 'Stripe webhook handler does not enforce an idempotency create-lock.',
    });
    return;
  }

  addCheck({
    id: 'SEC_WEBHOOK_IDEMPOTENCY',
    status: 'PASS',
    message: 'Stripe webhook handler enforces idempotency create-lock.',
  });
}

function checkSecurityHeaders(): void {
  const nextConfigPath = path.join(PROJECT_ROOT, 'next.config.ts');
  const nextConfig = readFileSafe(nextConfigPath);

  if (!nextConfig) {
    addCheck({
      id: 'SEC_HEADERS_CONFIG',
      status: 'FAIL',
      message: 'next.config.ts is missing.',
    });
    return;
  }

  const requiredHeaders = [
    'X-Frame-Options',
    'Strict-Transport-Security',
    'Content-Security-Policy',
    'X-Content-Type-Options',
  ];

  const missingHeaders = requiredHeaders.filter((header) => !nextConfig.includes(header));

  if (missingHeaders.length > 0) {
    addCheck({
      id: 'SEC_HEADERS_CONFIG',
      status: 'FAIL',
      message: 'Missing required security headers in next.config.ts',
      evidence: missingHeaders.join(', '),
    });
    return;
  }

  addCheck({
    id: 'SEC_HEADERS_CONFIG',
    status: 'PASS',
    message: 'Required security headers are configured in next.config.ts.',
  });
}

function checkDangerousDynamicCode(): void {
  const files = walkFiles(SRC_ROOT, new Set(['.ts', '.tsx']));
  const unsafeMatches: string[] = [];

  for (const filePath of files) {
    const content = fs.readFileSync(filePath, 'utf-8');
    if (/\beval\s*\(/.test(content) || /\bnew Function\s*\(/.test(content)) {
      const relativePath = path.relative(PROJECT_ROOT, filePath);
      unsafeMatches.push(relativePath);
    }
  }

  if (unsafeMatches.length > 0) {
    addCheck({
      id: 'SEC_DANGEROUS_DYNAMIC_CODE',
      status: 'FAIL',
      message: 'Found unsafe dynamic code execution patterns (eval/new Function).',
      evidence: unsafeMatches.join(', '),
    });
    return;
  }

  addCheck({
    id: 'SEC_DANGEROUS_DYNAMIC_CODE',
    status: 'PASS',
    message: 'No unsafe dynamic code execution patterns detected.',
  });
}

function buildReport(): ScanReport {
  const passed = checks.filter((check) => check.status === 'PASS').length;
  const failed = checks.filter((check) => check.status === 'FAIL').length;
  const warned = checks.filter((check) => check.status === 'WARN').length;

  return {
    ok: failed === 0,
    summary: {
      total: checks.length,
      passed,
      failed,
      warned,
    },
    checks,
  };
}

function printReport(report: ScanReport): void {
  if (IS_JSON) {
    console.log(JSON.stringify(report, null, 2));
    return;
  }

  console.log('Security Scan');
  console.log('=============');
  for (const check of report.checks) {
    console.log(`[${check.status}] ${check.id}: ${check.message}`);
    if (check.evidence) {
      console.log(`  Evidence: ${check.evidence}`);
    }
  }
  console.log('-------------');
  console.log(
    `Summary: ${report.summary.passed} passed, ${report.summary.failed} failed, ${report.summary.warned} warned`
  );
}

function main(): number {
  checkFirestoreDenyAll();
  checkSubscriptionTierProtection();
  checkWebhookSignatureVerification();
  checkWebhookIdempotencyLock();
  checkSecurityHeaders();
  checkDangerousDynamicCode();

  const report = buildReport();
  printReport(report);
  return report.ok ? 0 : 1;
}

process.exit(main());
