import * as fs from 'node:fs';
import * as path from 'node:path';

type CheckStatus = 'PASS' | 'FAIL' | 'WARN';

interface CheckResult {
  id: string;
  status: CheckStatus;
  message: string;
  evidence?: string;
}

interface IntegrationAuditReport {
  ok: boolean;
  summary: {
    total: number;
    passed: number;
    failed: number;
    warned: number;
  };
  checks: CheckResult[];
}

type SkillIndexEntry = {
  id?: string;
  name?: string;
  description?: string;
  path?: string;
};

type ProjectConfig = {
  setup?: { required_skills?: string[] };
  dev?: { required_skills?: string[] };
  cleanup?: { required_skills?: string[] };
  skill_protocols?: Record<string, string>;
  invariants?: {
    process?: string[];
  };
  verifications?: {
    scripts?: Record<string, string>;
  };
};

type PackageJson = {
  dependencies?: Record<string, string>;
  devDependencies?: Record<string, string>;
  scripts?: Record<string, string>;
};

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

function readJsonSafe<T>(filePath: string): T | null {
  const raw = readFileSafe(filePath);
  if (!raw) {
    return null;
  }

  try {
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
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
      if (entry.name === 'node_modules' || entry.name.startsWith('.')) {
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

function includesAny(content: string, patterns: readonly string[]): boolean {
  return patterns.some((pattern) => content.includes(pattern));
}

function hasDependency(pkg: PackageJson, dependency: string): boolean {
  return Boolean(pkg.dependencies?.[dependency] || pkg.devDependencies?.[dependency]);
}

function checkSkillIndexFoundations(
  skills: SkillIndexEntry[] | null,
  projectConfig: ProjectConfig | null
): void {
  if (!skills || !Array.isArray(skills)) {
    addCheck({
      id: 'MAP_1A_SKILL_INDEX_ENTRY',
      status: 'FAIL',
      message: 'skills_index.json is missing or invalid.',
    });
    addCheck({
      id: 'MAP_1B_SKILL_DESCRIPTION',
      status: 'FAIL',
      message: 'Skill descriptions cannot be validated because skills_index.json is unavailable.',
    });
    addCheck({
      id: 'MAP_1D_CORE_TECH_SKILLS',
      status: 'FAIL',
      message: 'Core tech skill registration cannot be validated without skills_index.json.',
    });
    return;
  }

  if (skills.length < 217) {
    addCheck({
      id: 'MAP_1A_SKILL_INDEX_ENTRY',
      status: 'FAIL',
      message: 'Skill index size is below expected orchestration threshold (217+).',
      evidence: `count=${skills.length}`,
    });
  } else {
    addCheck({
      id: 'MAP_1A_SKILL_INDEX_ENTRY',
      status: 'PASS',
      message: `Skill index loaded with ${skills.length} entries (>=217).`,
    });
  }

  const missingDescriptions = skills
    .filter((entry) => !entry.description || entry.description.trim().length < 10)
    .slice(0, 10)
    .map((entry) => entry.id ?? entry.name ?? '<unknown>');

  if (missingDescriptions.length > 0) {
    addCheck({
      id: 'MAP_1B_SKILL_DESCRIPTION',
      status: 'WARN',
      message: 'Some skills have sparse descriptions.',
      evidence: missingDescriptions.join(', '),
    });
  } else {
    addCheck({
      id: 'MAP_1B_SKILL_DESCRIPTION',
      status: 'PASS',
      message: 'Skill descriptions are populated across the index.',
    });
  }

  const protocols = projectConfig?.skill_protocols ?? {};
  const requiredProtocols = ['planning', 'development', 'verification', 'security', 'testing'];
  const missingProtocols = requiredProtocols.filter((key) => !protocols[key]);

  if (missingProtocols.length > 0) {
    addCheck({
      id: 'MAP_1C_INTENT_TO_SKILL_MAPPING',
      status: 'FAIL',
      message: 'project-config.json is missing required skill protocol mappings.',
      evidence: missingProtocols.join(', '),
    });
  } else {
    addCheck({
      id: 'MAP_1C_INTENT_TO_SKILL_MAPPING',
      status: 'PASS',
      message: 'project-config.json exposes intent-to-skill protocol mappings.',
    });
  }

  const coreSkillPatterns = [
    { label: 'next.js', pattern: /next(\.js|js)/i },
    { label: 'three.js / r3f', pattern: /three|r3f|react-three/i },
    { label: 'stripe', pattern: /stripe/i },
    { label: 'firebase', pattern: /firebase/i },
    { label: 'systematic-debugging', pattern: /systematic-debugging/i },
    { label: 'verification-before-completion', pattern: /verification-before-completion/i },
  ];

  const missingCoreSkills = coreSkillPatterns
    .filter(({ pattern }) => {
      return !skills.some((entry) => pattern.test(`${entry.id ?? ''} ${entry.name ?? ''} ${entry.description ?? ''}`));
    })
    .map(({ label }) => label);

  if (missingCoreSkills.length > 0) {
    addCheck({
      id: 'MAP_1D_CORE_TECH_SKILLS',
      status: 'FAIL',
      message: 'Core technology skills are missing from skills_index.json.',
      evidence: missingCoreSkills.join(', '),
    });
  } else {
    addCheck({
      id: 'MAP_1D_CORE_TECH_SKILLS',
      status: 'PASS',
      message: 'Core technology/debug/verification skills are registered in skills_index.json.',
    });
  }

  const entriesWithoutPath = skills
    .filter((entry) => typeof entry.path !== 'string' || entry.path.trim().length === 0)
    .slice(0, 10)
    .map((entry) => entry.id ?? entry.name ?? '<unknown>');

  if (entriesWithoutPath.length > 0) {
    addCheck({
      id: 'MAP_1E_SKILL_DEFINITION',
      status: 'WARN',
      message: 'Some skills are missing resolved path metadata.',
      evidence: entriesWithoutPath.join(', '),
    });
  } else {
    addCheck({
      id: 'MAP_1E_SKILL_DEFINITION',
      status: 'PASS',
      message: 'Skill definitions include path metadata for discovery tooling.',
    });
  }
}

function checkDirectorAndSelectionFlow(projectConfig: ProjectConfig | null): void {
  const requiredDiscoveryFiles = [
    'scripts/skills-manager.ts',
    'scripts/generate-index.ts',
    'scripts/sync-skills.ts',
  ];
  const missingDiscoveryFiles = requiredDiscoveryFiles.filter(
    (filePath) => !fs.existsSync(path.join(PROJECT_ROOT, filePath))
  );

  if (missingDiscoveryFiles.length > 0) {
    addCheck({
      id: 'MAP_2A_DISCOVERY_TRIGGER',
      status: 'FAIL',
      message: 'Discovery hierarchy entry points are missing.',
      evidence: missingDiscoveryFiles.join(', '),
    });
  } else {
    addCheck({
      id: 'MAP_2A_DISCOVERY_TRIGGER',
      status: 'PASS',
      message: 'Skill discovery entry points are present.',
    });
  }

  const verifyScript = readFileSafe(path.join(PROJECT_ROOT, 'scripts', 'verify.ts')) ?? '';
  const hasPlanningSignal = includesAny(verifyScript, ['const checks = [', 'npm run test:policy']);
  const hasExecutionSignal = includesAny(verifyScript, ['npm run security_scan', 'npm run test:unit']);

  addCheck({
    id: 'MAP_2B_DIRECTOR_PLANNING',
    status: hasPlanningSignal ? 'PASS' : 'FAIL',
    message: hasPlanningSignal
      ? 'Verification director includes an explicit planning/ordering phase.'
      : 'Verification director planning phase not detected in scripts/verify.ts.',
  });

  addCheck({
    id: 'MAP_2C_DIRECTOR_EXECUTION',
    status: hasExecutionSignal ? 'PASS' : 'FAIL',
    message: hasExecutionSignal
      ? 'Verification director executes chained quality/security steps.'
      : 'Verification execution chain is incomplete in scripts/verify.ts.',
  });

  const requiredSkillGroups = [
    projectConfig?.setup?.required_skills ?? [],
    projectConfig?.dev?.required_skills ?? [],
    projectConfig?.cleanup?.required_skills ?? [],
  ];

  if (requiredSkillGroups.some((group) => group.length === 0)) {
    addCheck({
      id: 'MAP_2D_SELECTION_CRITERIA',
      status: 'FAIL',
      message: 'One or more lifecycle phases are missing required_skills selection criteria.',
    });
  } else {
    addCheck({
      id: 'MAP_2D_SELECTION_CRITERIA',
      status: 'PASS',
      message: 'Setup/dev/cleanup phases define required skill selection criteria.',
    });
  }

  const requiredVerifyCommands = [
    'npm run test:policy',
    'npm run type-check',
    'npm run security_scan',
    'npm run api_validation',
    'npm run schema_validation',
    'npm run test:unit',
  ];
  const missingVerifyCommands = requiredVerifyCommands.filter((command) => !verifyScript.includes(command));

  if (missingVerifyCommands.length > 0) {
    addCheck({
      id: 'MAP_2E_EXECUTION_INVARIANT',
      status: 'FAIL',
      message: 'Verification invariant chain is missing required commands.',
      evidence: missingVerifyCommands.join(', '),
    });
  } else {
    addCheck({
      id: 'MAP_2E_EXECUTION_INVARIANT',
      status: 'PASS',
      message: 'Verification invariant chain includes policy, type, security, schema, and unit gates.',
    });
  }
}

function checkFrontendAnd3DStack(pkg: PackageJson): void {
  const pageFile = readFileSafe(path.join(PROJECT_ROOT, 'src', 'app', 'page.tsx'));

  if (!pageFile) {
    addCheck({
      id: 'MAP_3A_SERVER_COMPONENT_ENTRY',
      status: 'FAIL',
      message: 'src/app/page.tsx is missing.',
    });
    addCheck({
      id: 'MAP_3B_SERVER_DATA_FETCHING',
      status: 'FAIL',
      message: 'Server data fetching checks skipped because src/app/page.tsx is missing.',
    });
    addCheck({
      id: 'MAP_3C_FEATURE_IMPORTS',
      status: 'FAIL',
      message: 'Feature import checks skipped because src/app/page.tsx is missing.',
    });
    addCheck({
      id: 'MAP_3D_COMPONENT_COMPOSITION',
      status: 'FAIL',
      message: 'Component composition checks skipped because src/app/page.tsx is missing.',
    });
  } else {
    const hasServerEntry = /export\s+default\s+async\s+function\s+Home/.test(pageFile);
    addCheck({
      id: 'MAP_3A_SERVER_COMPONENT_ENTRY',
      status: hasServerEntry ? 'PASS' : 'FAIL',
      message: hasServerEntry
        ? 'Landing page uses async server component entry.'
        : 'Landing page does not expose expected async server component entry.',
    });

    const hasServerDataFetch = /await\s+headers\(\)/.test(pageFile);
    addCheck({
      id: 'MAP_3B_SERVER_DATA_FETCHING',
      status: hasServerDataFetch ? 'PASS' : 'WARN',
      message: hasServerDataFetch
        ? 'Server-side request metadata fetching is present.'
        : 'Server-side request metadata fetching not detected in page entry.',
    });

    const featureImports = (pageFile.match(/from\s+['"]@\/features\//g) ?? []).length;
    addCheck({
      id: 'MAP_3C_FEATURE_IMPORTS',
      status: featureImports >= 5 ? 'PASS' : 'WARN',
      message:
        featureImports >= 5
          ? `Landing page imports ${featureImports} feature components.`
          : 'Landing page imports fewer feature components than expected.',
      evidence: `featureImports=${featureImports}`,
    });

    const componentCalls = (pageFile.match(/<([A-Z][A-Za-z0-9]+)/g) ?? []).length;
    addCheck({
      id: 'MAP_3D_COMPONENT_COMPOSITION',
      status: componentCalls >= 10 ? 'PASS' : 'WARN',
      message:
        componentCalls >= 10
          ? `Landing page composes ${componentCalls} components in render tree.`
          : 'Landing page composition density is lower than expected.',
      evidence: `componentNodes=${componentCalls}`,
    });
  }

  const hasFrontendStack =
    hasDependency(pkg, 'next') && hasDependency(pkg, 'react') && hasDependency(pkg, 'react-dom');
  addCheck({
    id: 'MAP_3E_TECH_STACK_DEFINITION',
    status: hasFrontendStack ? 'PASS' : 'FAIL',
    message: hasFrontendStack
      ? 'Frontend stack dependencies (Next.js + React) are registered.'
      : 'Frontend stack dependencies are incomplete in package.json.',
  });

  const tsxFiles = walkFiles(SRC_ROOT, new Set(['.ts', '.tsx']));
  const r3fFiles = tsxFiles.filter((filePath) => {
    const content = fs.readFileSync(filePath, 'utf-8');
    return content.includes('@react-three/fiber');
  });

  const canvasFiles = r3fFiles.filter((filePath) => {
    const content = fs.readFileSync(filePath, 'utf-8');
    return /<Canvas[\s>]/.test(content);
  });

  const useFrameFiles = r3fFiles.filter((filePath) => {
    const content = fs.readFileSync(filePath, 'utf-8');
    return /useFrame\s*\(/.test(content);
  });

  const geometryFiles = r3fFiles.filter((filePath) => {
    const content = fs.readFileSync(filePath, 'utf-8');
    return /(sphereGeometry|boxGeometry|torusKnotGeometry|<Sphere\b|<Box\b)/.test(content);
  });

  addCheck({
    id: 'MAP_4A_R3F_CANVAS_IMPORT',
    status: r3fFiles.length > 0 ? 'PASS' : 'FAIL',
    message:
      r3fFiles.length > 0
        ? `Detected ${r3fFiles.length} R3F-enabled files.`
        : 'No @react-three/fiber imports detected.',
  });

  addCheck({
    id: 'MAP_4B_CANVAS_INSTANTIATION',
    status: canvasFiles.length > 0 ? 'PASS' : 'FAIL',
    message:
      canvasFiles.length > 0
        ? `Detected ${canvasFiles.length} Canvas instantiations.`
        : 'No <Canvas /> instantiation detected for 3D entry.',
  });

  addCheck({
    id: 'MAP_4C_ANIMATION_LOOP',
    status: useFrameFiles.length > 0 ? 'PASS' : 'WARN',
    message:
      useFrameFiles.length > 0
        ? `Detected animation loop hooks in ${useFrameFiles.length} files.`
        : 'No useFrame animation loop hook detected.',
  });

  addCheck({
    id: 'MAP_4D_THREE_GEOMETRY',
    status: geometryFiles.length > 0 ? 'PASS' : 'WARN',
    message:
      geometryFiles.length > 0
        ? `Detected explicit geometry primitives in ${geometryFiles.length} files.`
        : 'No explicit geometry primitives detected in R3F files.',
  });

  const has3DStack =
    hasDependency(pkg, 'three') &&
    hasDependency(pkg, '@react-three/fiber') &&
    hasDependency(pkg, '@react-three/drei');
  addCheck({
    id: 'MAP_4E_3D_TECH_LOCK',
    status: has3DStack ? 'PASS' : 'FAIL',
    message: has3DStack
      ? '3D stack lock (three + R3F + drei) is defined in package.json.'
      : '3D stack lock dependencies are incomplete.',
  });
}

function checkPaymentsAndFirebase(pkg: PackageJson): void {
  const checkoutPath = path.join(PROJECT_ROOT, 'src', 'app', 'api', 'checkout', 'route.ts');
  const webhookPath = path.join(PROJECT_ROOT, 'src', 'app', 'api', 'webhooks', 'stripe', 'route.ts');
  const firebaseClientPath = path.join(PROJECT_ROOT, 'src', 'lib', 'firebase.ts');

  const checkout = readFileSafe(checkoutPath);
  const webhook = readFileSafe(webhookPath);
  const firebaseClient = readFileSafe(firebaseClientPath);

  addCheck({
    id: 'MAP_5A_CHECKOUT_ROUTE_HANDLER',
    status: checkout && /export\s+async\s+function\s+POST/.test(checkout) ? 'PASS' : 'FAIL',
    message:
      checkout && /export\s+async\s+function\s+POST/.test(checkout)
        ? 'Checkout API route exports POST handler.'
        : 'Checkout API POST handler is missing.',
  });

  addCheck({
    id: 'MAP_5B_STRIPE_SESSION_CREATION',
    status: checkout && checkout.includes('checkout.sessions.create(') ? 'PASS' : 'FAIL',
    message:
      checkout && checkout.includes('checkout.sessions.create(')
        ? 'Checkout route creates Stripe sessions.'
        : 'Stripe checkout session creation not found in checkout route.',
  });

  addCheck({
    id: 'MAP_5C_WEBHOOK_SIGNATURE_VERIFICATION',
    status:
      webhook && webhook.includes('verifyWebhookSignature(') && webhook.includes('stripe-signature')
        ? 'PASS'
        : 'FAIL',
    message:
      webhook && webhook.includes('verifyWebhookSignature(') && webhook.includes('stripe-signature')
        ? 'Webhook route performs Stripe signature verification.'
        : 'Webhook signature verification signals are missing.',
  });

  addCheck({
    id: 'MAP_5D_WEBHOOK_EVENT_HANDLING',
    status: webhook && /switch\s*\(\s*eventType\s*\)/.test(webhook) ? 'PASS' : 'FAIL',
    message:
      webhook && /switch\s*\(\s*eventType\s*\)/.test(webhook)
        ? 'Webhook route uses explicit event-type state machine handling.'
        : 'Webhook event handling state machine not detected.',
  });

  const hasPaymentStack = hasDependency(pkg, 'stripe') && hasDependency(pkg, '@stripe/stripe-js');
  addCheck({
    id: 'MAP_5E_PAYMENT_STACK_DEFINITION',
    status: hasPaymentStack ? 'PASS' : 'FAIL',
    message: hasPaymentStack
      ? 'Stripe runtime + browser SDK dependencies are configured.'
      : 'Stripe dependency stack is incomplete.',
  });

  addCheck({
    id: 'MAP_6A_FIREBASE_SDK_IMPORT',
    status: firebaseClient && firebaseClient.includes("from 'firebase/app'") ? 'PASS' : 'FAIL',
    message:
      firebaseClient && firebaseClient.includes("from 'firebase/app'")
        ? 'Firebase client SDK import is present.'
        : 'Firebase client SDK import is missing.',
  });

  addCheck({
    id: 'MAP_6B_FIREBASE_APP_INITIALIZATION',
    status: firebaseClient && firebaseClient.includes('initializeApp(') ? 'PASS' : 'FAIL',
    message:
      firebaseClient && firebaseClient.includes('initializeApp(')
        ? 'Firebase app initialization detected.'
        : 'Firebase app initialization not detected.',
  });

  const firestoreWriteDetected = Boolean(
    webhook &&
      (webhook.includes(".collection('payments').doc(") ||
        webhook.includes('.set({') ||
        webhook.includes('.update({'))
  );
  addCheck({
    id: 'MAP_6C_FIRESTORE_WRITE_OPERATION',
    status: firestoreWriteDetected ? 'PASS' : 'FAIL',
    message: firestoreWriteDetected
      ? 'Firestore write operations detected in backend event handlers.'
      : 'Firestore write operations were not detected in expected backend paths.',
  });

  const firestoreQueryFiles = walkFiles(path.join(PROJECT_ROOT, 'src', 'app', 'api'), new Set(['.ts']))
    .filter((filePath) => filePath.endsWith('route.ts'))
    .filter((filePath) => {
      const content = fs.readFileSync(filePath, 'utf-8');
      return /\.where\(|\.get\(\)|\.limit\(/.test(content);
    });
  addCheck({
    id: 'MAP_6D_FIRESTORE_QUERY_EXECUTION',
    status: firestoreQueryFiles.length > 0 ? 'PASS' : 'WARN',
    message:
      firestoreQueryFiles.length > 0
        ? `Detected Firestore query execution in ${firestoreQueryFiles.length} API routes.`
        : 'No Firestore query execution patterns detected in API routes.',
  });

  const hasBackendStack =
    hasDependency(pkg, 'firebase') &&
    hasDependency(pkg, 'firebase-admin') &&
    fs.existsSync(path.join(PROJECT_ROOT, 'firebase.json')) &&
    fs.existsSync(path.join(PROJECT_ROOT, 'firestore.rules'));
  addCheck({
    id: 'MAP_6E_BACKEND_STACK_LOCK',
    status: hasBackendStack ? 'PASS' : 'FAIL',
    message: hasBackendStack
      ? 'Firebase client/admin stack and rules files are present.'
      : 'Firebase backend stack lock is incomplete.',
  });
}

function checkDebuggingAndVerificationInvariants(
  skills: SkillIndexEntry[] | null,
  projectConfig: ProjectConfig | null
): void {
  const invariantsDoc = readFileSafe(path.join(PROJECT_ROOT, 'docs', 'invariants.md')) ?? '';

  addCheck({
    id: 'MAP_7A_IRON_LAW_DECLARATION',
    status: invariantsDoc.includes('Iron Law') ? 'PASS' : 'WARN',
    message: invariantsDoc.includes('Iron Law')
      ? 'Iron Law declaration is documented in invariants.'
      : 'Iron Law declaration not found in docs/invariants.md.',
  });

  const hasDebugSkill =
    Array.isArray(skills) &&
    skills.some((entry) => /systematic-debugging/i.test(`${entry.id ?? ''} ${entry.name ?? ''}`));
  addCheck({
    id: 'MAP_7B_INVESTIGATION_START',
    status: hasDebugSkill ? 'PASS' : 'FAIL',
    message: hasDebugSkill
      ? 'Systematic debugging skill is present for phase-1 investigation.'
      : 'systematic-debugging skill registration is missing.',
  });

  const diagnosticScripts = ['scripts/security_scan.ts', 'scripts/api_validator.ts', 'scripts/schema_validator.ts'];
  const missingDiagnostics = diagnosticScripts.filter(
    (scriptPath) => !fs.existsSync(path.join(PROJECT_ROOT, scriptPath))
  );
  addCheck({
    id: 'MAP_7C_MULTI_COMPONENT_DIAGNOSTICS',
    status: missingDiagnostics.length === 0 ? 'PASS' : 'FAIL',
    message:
      missingDiagnostics.length === 0
        ? 'Multi-component diagnostics scripts are present.'
        : 'One or more diagnostics scripts are missing.',
    evidence: missingDiagnostics.length === 0 ? undefined : missingDiagnostics.join(', '),
  });

  const hasTddSignal =
    Array.isArray(skills) &&
    skills.some((entry) => /test-driven-development/i.test(`${entry.id ?? ''} ${entry.name ?? ''}`));
  addCheck({
    id: 'MAP_7D_TEST_FIRST_FIX',
    status: hasTddSignal ? 'PASS' : 'WARN',
    message: hasTddSignal
      ? 'TDD workflow skill is registered for test-first fixes.'
      : 'TDD workflow skill signal not found in skill index.',
  });

  const processInvariants = projectConfig?.invariants?.process ?? [];
  const hasArchitecturalRedFlag = processInvariants.some((line) => /architectural flaw/i.test(line));
  addCheck({
    id: 'MAP_7E_ARCHITECTURAL_RED_FLAG',
    status: hasArchitecturalRedFlag ? 'PASS' : 'WARN',
    message: hasArchitecturalRedFlag
      ? 'Architectural red-flag invariant is present in project config.'
      : 'Architectural red-flag invariant not found in project config.',
  });

  const tsconfig = readJsonSafe<{ compilerOptions?: { strict?: boolean } }>(
    path.join(PROJECT_ROOT, 'tsconfig.json')
  );
  addCheck({
    id: 'MAP_8B_TYPE_SYSTEM_CONSTRAINTS',
    status: tsconfig?.compilerOptions?.strict ? 'PASS' : 'FAIL',
    message: tsconfig?.compilerOptions?.strict
      ? 'TypeScript strict mode is enabled.'
      : 'TypeScript strict mode is disabled.',
  });

  const brandedTypeFiles = walkFiles(path.join(PROJECT_ROOT, 'src', 'lib'), new Set(['.ts', '.tsx'])).filter(
    (filePath) => {
      const content = fs.readFileSync(filePath, 'utf-8');
      return /\bBrand(ed)?\b|opaque|branded/i.test(content);
    }
  );
  addCheck({
    id: 'MAP_8C_BRANDED_TYPES',
    status: brandedTypeFiles.length > 0 ? 'PASS' : 'WARN',
    message:
      brandedTypeFiles.length > 0
        ? `Detected branded/opaque type patterns in ${brandedTypeFiles.length} files.`
        : 'No explicit branded/opaque type patterns detected.',
  });

  const apiRoutes = walkFiles(path.join(PROJECT_ROOT, 'src', 'app', 'api'), new Set(['.ts'])).filter((filePath) =>
    filePath.endsWith('route.ts')
  );
  const guardedRoutes = apiRoutes.filter((filePath) => {
    const content = fs.readFileSync(filePath, 'utf-8');
    return /safeParse\(|\.parse\(|if\s*\(!.*\)\s*\{/.test(content);
  });
  addCheck({
    id: 'MAP_8D_GUARD_VALIDATION',
    status: guardedRoutes.length > 0 ? 'PASS' : 'FAIL',
    message:
      guardedRoutes.length > 0
        ? `Detected guard/schema validation in ${guardedRoutes.length} API routes.`
        : 'No guard/schema validation detected in API routes.',
  });

  const hasDefenseLayers =
    fs.existsSync(path.join(PROJECT_ROOT, 'scripts', 'security_scan.ts')) &&
    fs.existsSync(path.join(PROJECT_ROOT, 'scripts', 'schema_validator.ts')) &&
    fs.existsSync(path.join(PROJECT_ROOT, 'scripts', 'api_validator.ts'));
  addCheck({
    id: 'MAP_8E_DEFENSE_LAYERS',
    status: hasDefenseLayers ? 'PASS' : 'FAIL',
    message: hasDefenseLayers
      ? 'Defense layers are represented by security/api/schema audit scripts.'
      : 'One or more defense-layer audit scripts are missing.',
  });

  const hasCorePhilosophy = invariantsDoc.includes('Evidence before Claims');
  addCheck({
    id: 'MAP_9A_CORE_PHILOSOPHY',
    status: hasCorePhilosophy ? 'PASS' : 'WARN',
    message: hasCorePhilosophy
      ? 'Core verification philosophy is explicitly documented.'
      : 'Core verification philosophy signal not found in invariants docs.',
  });

  const hasRefinementSignals = Boolean(
    projectConfig?.verifications?.scripts?.security_scan &&
      projectConfig?.verifications?.scripts?.api_validation &&
      projectConfig?.verifications?.scripts?.schema_validation
  );
  addCheck({
    id: 'MAP_9B_9D_ITERATIVE_REFINEMENT',
    status: hasRefinementSignals ? 'PASS' : 'WARN',
    message: hasRefinementSignals
      ? 'Iterative refinement signals (security/api/schema) are wired in project config.'
      : 'Iterative refinement script wiring is incomplete in project config.',
  });

  const hasYagniSignal = invariantsDoc.includes('No generic names');
  addCheck({
    id: 'MAP_9E_YAGNI_SIGNAL',
    status: hasYagniSignal ? 'PASS' : 'WARN',
    message: hasYagniSignal
      ? 'YAGNI-adjacent simplicity signal found in invariants.'
      : 'YAGNI/simplicity signal not explicitly documented.',
  });

  const verifyScript = readFileSafe(path.join(PROJECT_ROOT, 'scripts', 'verify.ts')) ?? '';
  const gateStepSignals = ['test:policy', 'type-check', 'security_scan', 'schema_validation', 'test:unit'];
  const missingGateSignals = gateStepSignals.filter((signal) => !verifyScript.includes(signal));
  addCheck({
    id: 'MAP_10A_10D_VERIFICATION_GATE',
    status: missingGateSignals.length === 0 ? 'PASS' : 'FAIL',
    message:
      missingGateSignals.length === 0
        ? 'Verification gate steps are implemented in scripts/verify.ts.'
        : 'Verification gate is missing expected steps.',
    evidence: missingGateSignals.length === 0 ? undefined : missingGateSignals.join(', '),
  });

  const hasEvidenceRequirement =
    invariantsDoc.includes('Evidence before Claims') ||
    (Array.isArray(skills) &&
      skills.some((entry) =>
        /evidence before claims|verification-before-completion/i.test(
          `${entry.id ?? ''} ${entry.name ?? ''} ${entry.description ?? ''}`
        )
      ));
  addCheck({
    id: 'MAP_10E_EVIDENCE_REQUIREMENTS',
    status: hasEvidenceRequirement ? 'PASS' : 'WARN',
    message: hasEvidenceRequirement
      ? 'Evidence-first requirement is represented in docs/skills.'
      : 'Evidence-first requirement signal not detected.',
  });
}

function buildReport(): IntegrationAuditReport {
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

function printReport(report: IntegrationAuditReport): void {
  if (IS_JSON) {
    console.log(JSON.stringify(report, null, 2));
    return;
  }

  console.log('Tech Stack Integration Map Audit');
  console.log('===============================');
  for (const check of report.checks) {
    console.log(`[${check.status}] ${check.id}: ${check.message}`);
    if (check.evidence) {
      console.log(`  Evidence: ${check.evidence}`);
    }
  }
  console.log('-------------------------------');
  console.log(
    `Summary: ${report.summary.passed} passed, ${report.summary.failed} failed, ${report.summary.warned} warned`
  );
}

function main(): number {
  const skills = readJsonSafe<SkillIndexEntry[]>(path.join(PROJECT_ROOT, 'skills_index.json'));
  const projectConfig = readJsonSafe<ProjectConfig>(path.join(PROJECT_ROOT, 'project-config.json'));
  const pkg = readJsonSafe<PackageJson>(path.join(PROJECT_ROOT, 'package.json')) ?? {};

  checkSkillIndexFoundations(skills, projectConfig);
  checkDirectorAndSelectionFlow(projectConfig);
  checkFrontendAnd3DStack(pkg);
  checkPaymentsAndFirebase(pkg);
  checkDebuggingAndVerificationInvariants(skills, projectConfig);

  const report = buildReport();
  printReport(report);
  return report.ok ? 0 : 1;
}

process.exit(main());
