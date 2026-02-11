import * as fs from 'node:fs';
import * as path from 'node:path';

type CheckStatus = 'PASS' | 'FAIL' | 'WARN';

interface CheckResult {
  id: string;
  status: CheckStatus;
  message: string;
  evidence?: string;
}

interface SchemaValidationReport {
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
const API_ROOT = path.join(SRC_ROOT, 'app', 'api');
const args = new Set(process.argv.slice(2));
const IS_JSON = args.has('--json');

const checks: CheckResult[] = [];

function addCheck(result: CheckResult): void {
  checks.push(result);
}

function walkFiles(
  dirPath: string,
  extensionSet: ReadonlySet<string>,
  accumulator: string[] = []
): string[] {
  if (!fs.existsSync(dirPath)) {
    return accumulator;
  }

  const entries = fs.readdirSync(dirPath, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dirPath, entry.name);
    if (entry.isDirectory()) {
      if (entry.name.startsWith('.') || entry.name === 'node_modules') {
        continue;
      }
      walkFiles(fullPath, extensionSet, accumulator);
      continue;
    }

    if (extensionSet.has(path.extname(entry.name))) {
      accumulator.push(fullPath);
    }
  }

  return accumulator;
}

function checkFirestoreIndexesFile(): void {
  const indexesPath = path.join(PROJECT_ROOT, 'firestore.indexes.json');
  if (!fs.existsSync(indexesPath)) {
    addCheck({
      id: 'SCHEMA_FIRESTORE_INDEX_FILE',
      status: 'FAIL',
      message: 'firestore.indexes.json is missing.',
    });
    return;
  }

  try {
    const parsed = JSON.parse(fs.readFileSync(indexesPath, 'utf-8')) as {
      indexes?: unknown[];
      fieldOverrides?: unknown[];
    };

    const hasIndexesArray = Array.isArray(parsed.indexes);
    const hasFieldOverrides = Array.isArray(parsed.fieldOverrides);

    if (!hasIndexesArray || !hasFieldOverrides) {
      addCheck({
        id: 'SCHEMA_FIRESTORE_INDEX_FILE',
        status: 'FAIL',
        message:
          'firestore.indexes.json must include both indexes[] and fieldOverrides[] arrays.',
      });
      return;
    }

    addCheck({
      id: 'SCHEMA_FIRESTORE_INDEX_FILE',
      status: 'PASS',
      message: 'firestore.indexes.json exists and has expected top-level arrays.',
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error);
    addCheck({
      id: 'SCHEMA_FIRESTORE_INDEX_FILE',
      status: 'FAIL',
      message: 'firestore.indexes.json is not valid JSON.',
      evidence: message,
    });
  }
}

function checkZodSchemaPresence(): void {
  const schemaDirs = [path.join(SRC_ROOT, 'lib', 'schemas'), path.join(SRC_ROOT, 'lib', 'validations')];
  const schemaFiles: string[] = [];

  for (const schemaDir of schemaDirs) {
    schemaFiles.push(...walkFiles(schemaDir, new Set(['.ts', '.tsx'])));
  }

  if (schemaFiles.length === 0) {
    addCheck({
      id: 'SCHEMA_ZOD_FILES',
      status: 'FAIL',
      message: 'No schema files found under src/lib/schemas or src/lib/validations.',
    });
    return;
  }

  const zodBackedFiles = schemaFiles.filter((filePath) => {
    const content = fs.readFileSync(filePath, 'utf-8');
    return content.includes('from \'zod\'') || content.includes('from "zod"');
  });

  if (zodBackedFiles.length === 0) {
    addCheck({
      id: 'SCHEMA_ZOD_FILES',
      status: 'FAIL',
      message: 'Schema files were found but none import zod.',
    });
    return;
  }

  addCheck({
    id: 'SCHEMA_ZOD_FILES',
    status: 'PASS',
    message: `Detected ${zodBackedFiles.length} zod-backed schema files.`,
  });
}

function checkApiJsonBoundariesUseSchema(): void {
  const routeFiles = walkFiles(API_ROOT, new Set(['.ts']));
  const unvalidatedBoundaries: string[] = [];

  for (const routeFile of routeFiles) {
    if (!routeFile.endsWith('route.ts')) {
      continue;
    }

    const content = fs.readFileSync(routeFile, 'utf-8');
    const readsRequestJson = /await\s+req\.json\(\)/.test(content);
    const hasParseOrSafeParse = /\.parse\(|safeParse\(/.test(content);

    if (readsRequestJson && !hasParseOrSafeParse) {
      unvalidatedBoundaries.push(path.relative(PROJECT_ROOT, routeFile));
    }
  }

  if (unvalidatedBoundaries.length > 0) {
    addCheck({
      id: 'SCHEMA_API_BOUNDARY_VALIDATION',
      status: 'FAIL',
      message: 'Some API routes read request JSON without schema validation.',
      evidence: unvalidatedBoundaries.join(', '),
    });
    return;
  }

  addCheck({
    id: 'SCHEMA_API_BOUNDARY_VALIDATION',
    status: 'PASS',
    message: 'API routes that parse JSON use schema validation.',
  });
}

function checkLeadPersistenceBoundary(): void {
  const leadsPath = path.join(SRC_ROOT, 'lib', 'leads.ts');
  if (!fs.existsSync(leadsPath)) {
    addCheck({
      id: 'SCHEMA_LEAD_BOUNDARY',
      status: 'FAIL',
      message: 'src/lib/leads.ts is missing.',
    });
    return;
  }

  const content = fs.readFileSync(leadsPath, 'utf-8');
  const validatesWithLeadSchema = /LeadSchema\.parse\(/.test(content);

  if (!validatesWithLeadSchema) {
    addCheck({
      id: 'SCHEMA_LEAD_BOUNDARY',
      status: 'FAIL',
      message: 'Lead persistence boundary does not validate with LeadSchema.parse.',
    });
    return;
  }

  addCheck({
    id: 'SCHEMA_LEAD_BOUNDARY',
    status: 'PASS',
    message: 'Lead persistence boundary validates with LeadSchema.parse.',
  });
}

function checkStripeWebhookEventSchemas(): void {
  const webhookPath = path.join(SRC_ROOT, 'app', 'api', 'webhooks', 'stripe', 'route.ts');
  if (!fs.existsSync(webhookPath)) {
    addCheck({
      id: 'SCHEMA_STRIPE_WEBHOOK',
      status: 'FAIL',
      message: 'Stripe webhook route is missing.',
    });
    return;
  }

  const content = fs.readFileSync(webhookPath, 'utf-8');
  const expectedParsers = [
    'checkoutSessionCompletedSchema.parse',
    'subscriptionSchema.parse',
    'invoiceSchema.parse',
    'StripeCustomerWebhookSchema.parse',
  ];

  const missingParsers = expectedParsers.filter((parser) => !content.includes(parser));
  if (missingParsers.length > 0) {
    addCheck({
      id: 'SCHEMA_STRIPE_WEBHOOK',
      status: 'FAIL',
      message: 'Stripe webhook route is missing required event schema parsing.',
      evidence: missingParsers.join(', '),
    });
    return;
  }

  addCheck({
    id: 'SCHEMA_STRIPE_WEBHOOK',
    status: 'PASS',
    message: 'Stripe webhook route parses all core event schemas.',
  });
}

function checkStrictSchemasForStripeMetadata(): void {
  const stripeValidationPath = path.join(SRC_ROOT, 'lib', 'validations', 'stripe.ts');
  if (!fs.existsSync(stripeValidationPath)) {
    addCheck({
      id: 'SCHEMA_STRIPE_STRICTNESS',
      status: 'WARN',
      message: 'src/lib/validations/stripe.ts not found; strict metadata checks not verified.',
    });
    return;
  }

  const content = fs.readFileSync(stripeValidationPath, 'utf-8');
  const hasStrict = content.includes('.strict()');

  if (!hasStrict) {
    addCheck({
      id: 'SCHEMA_STRIPE_STRICTNESS',
      status: 'WARN',
      message:
        'Stripe validation schemas do not appear to use .strict(); unknown metadata keys may be accepted.',
    });
    return;
  }

  addCheck({
    id: 'SCHEMA_STRIPE_STRICTNESS',
    status: 'PASS',
    message: 'Stripe validation schemas include strict object enforcement.',
  });
}

function buildReport(): SchemaValidationReport {
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

function printReport(report: SchemaValidationReport): void {
  if (IS_JSON) {
    console.log(JSON.stringify(report, null, 2));
    return;
  }

  console.log('Schema Validation');
  console.log('=================');
  for (const check of report.checks) {
    console.log(`[${check.status}] ${check.id}: ${check.message}`);
    if (check.evidence) {
      console.log(`  Evidence: ${check.evidence}`);
    }
  }
  console.log('-----------------');
  console.log(
    `Summary: ${report.summary.passed} passed, ${report.summary.failed} failed, ${report.summary.warned} warned`
  );
}

function main(): number {
  checkFirestoreIndexesFile();
  checkZodSchemaPresence();
  checkApiJsonBoundariesUseSchema();
  checkLeadPersistenceBoundary();
  checkStripeWebhookEventSchemas();
  checkStrictSchemasForStripeMetadata();

  const report = buildReport();
  printReport(report);
  return report.ok ? 0 : 1;
}

process.exit(main());
