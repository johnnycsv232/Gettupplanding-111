import * as fs from 'node:fs';
import * as path from 'node:path';

type CheckStatus = 'PASS' | 'FAIL' | 'WARN';

interface CheckResult {
  id: string;
  status: CheckStatus;
  message: string;
  evidence?: string;
}

interface ApiValidationReport {
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
const API_ROOT = path.join(PROJECT_ROOT, 'src', 'app', 'api');
const args = new Set(process.argv.slice(2));
const IS_JSON = args.has('--json');

const checks: CheckResult[] = [];
const HTTP_METHOD_REGEX = /export\s+async\s+function\s+(GET|POST|PUT|PATCH|DELETE|OPTIONS|HEAD)\s*\(/g;

function addCheck(result: CheckResult): void {
  checks.push(result);
}

function walkRouteFiles(dirPath: string, files: string[] = []): string[] {
  if (!fs.existsSync(dirPath)) {
    return files;
  }

  const entries = fs.readdirSync(dirPath, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dirPath, entry.name);
    if (entry.isDirectory()) {
      walkRouteFiles(fullPath, files);
      continue;
    }

    if (entry.name === 'route.ts') {
      files.push(fullPath);
    }
  }
  return files;
}

function checkApiDirectoryExists(): void {
  if (!fs.existsSync(API_ROOT)) {
    addCheck({
      id: 'API_DIRECTORY_EXISTS',
      status: 'FAIL',
      message: 'API directory does not exist: src/app/api',
    });
    return;
  }

  addCheck({
    id: 'API_DIRECTORY_EXISTS',
    status: 'PASS',
    message: 'API directory exists.',
  });
}

function checkNoVerbInEndpointPath(routeFiles: readonly string[]): void {
  const offenders: string[] = [];
  const segmentVerbPattern = /^(get|post|put|patch|delete|create|update)$/i;

  for (const routePath of routeFiles) {
    const relativeDir = path.relative(API_ROOT, path.dirname(routePath));
    const segments = relativeDir.split(path.sep).filter(Boolean);
    if (segments.some((segment) => segmentVerbPattern.test(segment))) {
      offenders.push(path.relative(PROJECT_ROOT, routePath));
    }
  }

  if (offenders.length > 0) {
    addCheck({
      id: 'API_NO_VERB_ENDPOINTS',
      status: 'FAIL',
      message: 'Verb-like endpoint path segments detected.',
      evidence: offenders.join(', '),
    });
    return;
  }

  addCheck({
    id: 'API_NO_VERB_ENDPOINTS',
    status: 'PASS',
    message: 'No verb-like endpoint path segments detected.',
  });
}

function checkRouteMethodExports(routeFiles: readonly string[]): void {
  const missingMethodExports: string[] = [];

  for (const routePath of routeFiles) {
    const content = fs.readFileSync(routePath, 'utf-8');
    const hasMethodExport = HTTP_METHOD_REGEX.test(content);
    HTTP_METHOD_REGEX.lastIndex = 0;

    if (!hasMethodExport) {
      missingMethodExports.push(path.relative(PROJECT_ROOT, routePath));
    }
  }

  if (missingMethodExports.length > 0) {
    addCheck({
      id: 'API_ROUTE_METHOD_EXPORTS',
      status: 'FAIL',
      message: 'Route files missing exported HTTP handlers.',
      evidence: missingMethodExports.join(', '),
    });
    return;
  }

  addCheck({
    id: 'API_ROUTE_METHOD_EXPORTS',
    status: 'PASS',
    message: 'All route files export at least one HTTP handler.',
  });
}

function checkMutationValidation(routeFiles: readonly string[]): void {
  const unvalidatedJsonReads: string[] = [];

  for (const routePath of routeFiles) {
    const content = fs.readFileSync(routePath, 'utf-8');
    const readsJsonBody = /await\s+req\.json\(\)/.test(content);
    const usesValidation = /\.parse\(|safeParse\(/.test(content);

    if (readsJsonBody && !usesValidation) {
      unvalidatedJsonReads.push(path.relative(PROJECT_ROOT, routePath));
    }
  }

  if (unvalidatedJsonReads.length > 0) {
    addCheck({
      id: 'API_MUTATION_INPUT_VALIDATION',
      status: 'FAIL',
      message: 'Routes read request JSON without schema validation.',
      evidence: unvalidatedJsonReads.join(', '),
    });
    return;
  }

  addCheck({
    id: 'API_MUTATION_INPUT_VALIDATION',
    status: 'PASS',
    message: 'Routes that parse request JSON also use schema validation.',
  });
}

function checkEnvelopePattern(routeFiles: readonly string[]): void {
  const weakEnvelopes: string[] = [];

  for (const routePath of routeFiles) {
    const content = fs.readFileSync(routePath, 'utf-8');
    const responseMatches = content.match(/NextResponse\.json\(\s*\{[\s\S]*?\}\s*(?:,|\))/g) ?? [];

    for (const match of responseMatches) {
      const hasKnownEnvelopeSignal =
        /\berror\s*:/.test(match) || /\bdata\s*:/.test(match) || /\bsuccess\s*:/.test(match);
      if (!hasKnownEnvelopeSignal) {
        weakEnvelopes.push(path.relative(PROJECT_ROOT, routePath));
        break;
      }
    }
  }

  if (weakEnvelopes.length > 0) {
    addCheck({
      id: 'API_RESPONSE_ENVELOPE',
      status: 'WARN',
      message:
        'Some responses do not expose explicit success/data/error envelope keys (recommended for consistency).',
      evidence: weakEnvelopes.join(', '),
    });
    return;
  }

  addCheck({
    id: 'API_RESPONSE_ENVELOPE',
    status: 'PASS',
    message: 'Response envelopes include explicit success/data/error keys.',
  });
}

function checkRateLimitLayer(): void {
  const proxyPath = path.join(PROJECT_ROOT, 'src', 'proxy.ts');
  const securityPolicyPath = path.join(PROJECT_ROOT, 'src', 'proxy', 'security-policy.ts');

  const proxyContent = fs.existsSync(proxyPath) ? fs.readFileSync(proxyPath, 'utf-8') : '';
  const securityPolicyContent = fs.existsSync(securityPolicyPath)
    ? fs.readFileSync(securityPolicyPath, 'utf-8')
    : '';

  const hasSecurityProxy = proxyContent.includes('applySecurityPolicy(');
  const hasRateLimitHeader = securityPolicyContent.includes('X-RateLimit-Limit');

  if (hasSecurityProxy && hasRateLimitHeader) {
    addCheck({
      id: 'API_RATE_LIMIT_LAYER',
      status: 'PASS',
      message: 'Global API rate-limit signaling is applied via proxy security policy.',
    });
    return;
  }

  addCheck({
    id: 'API_RATE_LIMIT_LAYER',
    status: 'WARN',
    message: 'Could not confirm global API rate-limit signaling through proxy layer.',
  });
}

function buildReport(): ApiValidationReport {
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

function printReport(report: ApiValidationReport): void {
  if (IS_JSON) {
    console.log(JSON.stringify(report, null, 2));
    return;
  }

  console.log('API Validation');
  console.log('==============');
  for (const check of report.checks) {
    console.log(`[${check.status}] ${check.id}: ${check.message}`);
    if (check.evidence) {
      console.log(`  Evidence: ${check.evidence}`);
    }
  }
  console.log('--------------');
  console.log(
    `Summary: ${report.summary.passed} passed, ${report.summary.failed} failed, ${report.summary.warned} warned`
  );
}

function main(): number {
  checkApiDirectoryExists();
  const routeFiles = walkRouteFiles(API_ROOT);

  if (routeFiles.length === 0) {
    addCheck({
      id: 'API_ROUTE_FILES',
      status: 'FAIL',
      message: 'No route.ts files found under src/app/api.',
    });
  } else {
    addCheck({
      id: 'API_ROUTE_FILES',
      status: 'PASS',
      message: `Detected ${routeFiles.length} API route files.`,
    });
  }

  checkNoVerbInEndpointPath(routeFiles);
  checkRouteMethodExports(routeFiles);
  checkMutationValidation(routeFiles);
  checkEnvelopePattern(routeFiles);
  checkRateLimitLayer();

  const report = buildReport();
  printReport(report);
  return report.ok ? 0 : 1;
}

process.exit(main());
