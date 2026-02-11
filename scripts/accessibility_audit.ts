import * as fs from 'node:fs';
import * as path from 'node:path';

type CheckStatus = 'PASS' | 'FAIL' | 'WARN';

interface CheckResult {
  id: string;
  status: CheckStatus;
  message: string;
  evidence?: string;
}

const PROJECT_ROOT = path.resolve(__dirname, '..');
const SOURCE_ROOT = path.join(PROJECT_ROOT, 'src');
const args = new Set(process.argv.slice(2));
const IS_JSON = args.has('--json');
const STRICT_MODE = args.has('--strict');

const results: CheckResult[] = [];

function addResult(result: CheckResult): void {
  results.push(result);
}

function getSourceFiles(
  dirPath: string,
  acceptedExtensions: ReadonlySet<string>,
  filePaths: string[] = []
): string[] {
  if (!fs.existsSync(dirPath)) {
    return filePaths;
  }

  const entries = fs.readdirSync(dirPath, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dirPath, entry.name);
    if (entry.isDirectory()) {
      if (entry.name.startsWith('.') || entry.name === '__tests__') {
        continue;
      }
      getSourceFiles(fullPath, acceptedExtensions, filePaths);
      continue;
    }

    if (acceptedExtensions.has(path.extname(entry.name))) {
      filePaths.push(fullPath);
    }
  }

  return filePaths;
}

function checkHtmlLangAttribute(): void {
  const layoutPath = path.join(SOURCE_ROOT, 'app', 'layout.tsx');
  if (!fs.existsSync(layoutPath)) {
    addResult({
      id: 'A11Y_LAYOUT_LANG',
      status: 'FAIL',
      message: 'src/app/layout.tsx not found.',
    });
    return;
  }

  const content = fs.readFileSync(layoutPath, 'utf-8');
  const hasHtmlTag = /<html\b/.test(content);
  const hasLang = /<html[\s\S]*\blang=/.test(content);

  if (hasHtmlTag && hasLang) {
    addResult({
      id: 'A11Y_LAYOUT_LANG',
      status: 'PASS',
      message: 'Root layout defines an html lang attribute.',
    });
    return;
  }

  addResult({
    id: 'A11Y_LAYOUT_LANG',
    status: 'FAIL',
    message: 'Root layout is missing a lang attribute on <html>.',
  });
}

function checkReducedMotionSupport(): void {
  const files = getSourceFiles(SOURCE_ROOT, new Set(['.ts', '.tsx', '.css']));
  const matches: string[] = [];

  for (const filePath of files) {
    const content = fs.readFileSync(filePath, 'utf-8');
    if (
      content.includes('prefers-reduced-motion') ||
      content.includes('motion-reduce') ||
      content.includes('useReducedMotion')
    ) {
      matches.push(path.relative(PROJECT_ROOT, filePath));
    }
  }

  if (matches.length > 0) {
    addResult({
      id: 'A11Y_REDUCED_MOTION',
      status: 'PASS',
      message: 'Reduced-motion handling detected.',
      evidence: matches.slice(0, 10).join(', '),
    });
    return;
  }

  addResult({
    id: 'A11Y_REDUCED_MOTION',
    status: 'FAIL',
    message: 'No reduced-motion handling detected.',
  });
}

function findMissingImageAltInFile(filePath: string): string[] {
  const content = fs.readFileSync(filePath, 'utf-8');
  const regex = /<(img|Image)\b([\s\S]*?)\/?>/g;
  const missing: string[] = [];
  let match: RegExpExecArray | null = regex.exec(content);

  while (match) {
    const fullTag = match[0];
    const attributes = match[2] ?? '';
    if (!/\balt\s*=/.test(attributes)) {
      const line = content.slice(0, match.index).split('\n').length;
      missing.push(`${path.relative(PROJECT_ROOT, filePath)}:${line} -> ${fullTag.split('\n')[0]}`);
    }
    match = regex.exec(content);
  }

  return missing;
}

function checkImageAltAttributes(): void {
  const files = getSourceFiles(SOURCE_ROOT, new Set(['.tsx']));
  const missingAlts = files.flatMap((filePath) => findMissingImageAltInFile(filePath));

  if (missingAlts.length === 0) {
    addResult({
      id: 'A11Y_IMAGE_ALT',
      status: 'PASS',
      message: 'All discovered img/Image tags include alt attributes.',
    });
    return;
  }

  addResult({
    id: 'A11Y_IMAGE_ALT',
    status: 'FAIL',
    message: `Found ${missingAlts.length} image tag(s) without alt.`,
    evidence: missingAlts.slice(0, 10).join(', '),
  });
}

function checkVideoAccessibilityLabels(): void {
  const files = getSourceFiles(SOURCE_ROOT, new Set(['.tsx']));
  const missingLabels: string[] = [];

  for (const filePath of files) {
    const content = fs.readFileSync(filePath, 'utf-8');
    const regex = /<video\b([\s\S]*?)>/g;
    let match: RegExpExecArray | null = regex.exec(content);

    while (match) {
      const attributes = match[1] ?? '';
      const hasAccessibleName =
        /\baria-label\s*=/.test(attributes) ||
        /\baria-labelledby\s*=/.test(attributes) ||
        /\baria-hidden\s*=/.test(attributes) ||
        /\btitle\s*=/.test(attributes);

      if (!hasAccessibleName) {
        const line = content.slice(0, match.index).split('\n').length;
        missingLabels.push(`${path.relative(PROJECT_ROOT, filePath)}:${line}`);
      }
      match = regex.exec(content);
    }
  }

  if (missingLabels.length === 0) {
    addResult({
      id: 'A11Y_VIDEO_LABEL',
      status: 'PASS',
      message: 'All discovered <video> tags have an accessibility label strategy.',
    });
    return;
  }

  addResult({
    id: 'A11Y_VIDEO_LABEL',
    status: 'WARN',
    message: `Found ${missingLabels.length} <video> tag(s) without aria-label/aria-hidden/title.`,
    evidence: missingLabels.slice(0, 10).join(', '),
  });
}

function checkHeadingDisplayClassCoverage(): void {
  const files = getSourceFiles(SOURCE_ROOT, new Set(['.tsx']));
  const missingDisplayClass: string[] = [];
  const regex = /<h([1-6])\b([^>]*)>/g;

  for (const filePath of files) {
    const relativePath = path.relative(PROJECT_ROOT, filePath);
    if (
      relativePath.startsWith(path.join('src', 'app', 'test-theme')) ||
      relativePath.startsWith(path.join('src', 'components', 'debug'))
    ) {
      continue;
    }

    const content = fs.readFileSync(filePath, 'utf-8');
    let match: RegExpExecArray | null = regex.exec(content);

    while (match) {
      const attributes = match[2] ?? '';
      const staticClassMatch = attributes.match(/\bclassName\s*=\s*"([^"]+)"/);
      const hasClassName = /\bclassName\s*=/.test(attributes);

      if (!hasClassName) {
        match = regex.exec(content);
        continue;
      }

      if (!staticClassMatch) {
        match = regex.exec(content);
        continue;
      }

      const classNames = staticClassMatch[1];
      const hiddenHeading = /\bsr-only\b/.test(classNames);
      const hasDisplayFamily = /\bfont-display\b/.test(classNames);

      if (!hiddenHeading && !hasDisplayFamily) {
        const line = content.slice(0, match.index).split('\n').length;
        missingDisplayClass.push(`${relativePath}:${line}`);
      }

      match = regex.exec(content);
    }
  }

  if (missingDisplayClass.length === 0) {
    addResult({
      id: 'A11Y_DISPLAY_HEADING',
      status: 'PASS',
      message: 'Static heading class declarations use font-display.',
    });
    return;
  }

  addResult({
    id: 'A11Y_DISPLAY_HEADING',
    status: 'WARN',
    message: `Found ${missingDisplayClass.length} heading(s) without static font-display class.`,
    evidence: missingDisplayClass.slice(0, 10).join(', '),
  });
}

function runAudit(): number {
  checkHtmlLangAttribute();
  checkReducedMotionSupport();
  checkImageAltAttributes();
  checkVideoAccessibilityLabels();
  checkHeadingDisplayClassCoverage();

  const failed = results.filter((result) => result.status === 'FAIL');
  const warned = results.filter((result) => result.status === 'WARN');
  const passes = results.filter((result) => result.status === 'PASS');

  if (IS_JSON) {
    console.log(
      JSON.stringify(
        {
          ok: failed.length === 0 && (STRICT_MODE ? warned.length === 0 : true),
          strict: STRICT_MODE,
          summary: {
            total: results.length,
            passed: passes.length,
            failed: failed.length,
            warned: warned.length,
          },
          checks: results,
        },
        null,
        2
      )
    );
  } else {
    console.log('Accessibility Audit');
    console.log('===================');
    for (const result of results) {
      const icon = result.status === 'PASS' ? 'PASS' : result.status === 'FAIL' ? 'FAIL' : 'WARN';
      console.log(`[${icon}] ${result.id}: ${result.message}`);
      if (result.evidence) {
        console.log(`  Evidence: ${result.evidence}`);
      }
    }
    console.log('-------------------');
    console.log(
      `Summary: ${passes.length} passed, ${failed.length} failed, ${warned.length} warned${STRICT_MODE ? ' (strict mode)' : ''}`
    );
  }

  if (failed.length > 0) {
    return 1;
  }

  if (STRICT_MODE && warned.length > 0) {
    return 1;
  }

  return 0;
}

process.exit(runAudit());
