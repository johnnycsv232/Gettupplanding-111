import * as fs from 'node:fs';
import * as path from 'node:path';
import ts from 'typescript';

type CheckStatus = 'PASS' | 'FAIL' | 'WARN';

interface CheckResult {
  id: string;
  status: CheckStatus;
  message: string;
  evidence?: string;
}

const PROJECT_ROOT = path.resolve(__dirname, '..');
const args = new Set(process.argv.slice(2));
const IS_JSON = args.has('--json');
const results: CheckResult[] = [];

function addResult(result: CheckResult): void {
  results.push(result);
}

function getPropertyNameText(name: ts.PropertyName | ts.BindingName): string | null {
  if (ts.isIdentifier(name) || ts.isStringLiteral(name) || ts.isNumericLiteral(name)) {
    return name.text;
  }
  return null;
}

function collectLeafPaths(node: ts.ObjectLiteralExpression, prefix = ''): string[] {
  const paths: string[] = [];

  for (const property of node.properties) {
    if (!ts.isPropertyAssignment(property)) {
      continue;
    }

    const key = getPropertyNameText(property.name);
    if (!key) {
      continue;
    }

    const nextPrefix = prefix ? `${prefix}.${key}` : key;
    if (ts.isObjectLiteralExpression(property.initializer)) {
      paths.push(...collectLeafPaths(property.initializer, nextPrefix));
      continue;
    }

    paths.push(nextPrefix);
  }

  return paths;
}

function parseLocaleSet(fileContent: string): Set<string> {
  const localeTypeMatch = fileContent.match(/type\s+Locale\s*=\s*([^;]+);/);
  if (!localeTypeMatch) {
    return new Set();
  }

  const locales = [...localeTypeMatch[1].matchAll(/'([^']+)'/g)].map((match) => match[1]);
  return new Set(locales);
}

function getTranslationsObject(filePath: string): ts.ObjectLiteralExpression | null {
  const content = fs.readFileSync(filePath, 'utf-8');
  const source = ts.createSourceFile(filePath, content, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
  let translationsNode: ts.ObjectLiteralExpression | null = null;

  function visit(node: ts.Node): void {
    if (ts.isVariableDeclaration(node) && getPropertyNameText(node.name) === 'translations') {
      if (node.initializer && ts.isObjectLiteralExpression(node.initializer)) {
        translationsNode = node.initializer;
      }
    }
    ts.forEachChild(node, visit);
  }

  visit(source);
  return translationsNode;
}

function checkI18nFileExists(): string | null {
  const i18nPath = path.join(PROJECT_ROOT, 'src', 'lib', 'i18n.tsx');
  if (!fs.existsSync(i18nPath)) {
    addResult({
      id: 'I18N_FILE_EXISTS',
      status: 'FAIL',
      message: 'Missing src/lib/i18n.tsx',
    });
    return null;
  }

  addResult({
    id: 'I18N_FILE_EXISTS',
    status: 'PASS',
    message: 'Found src/lib/i18n.tsx',
  });
  return i18nPath;
}

function checkLocaleTypeAndTranslations(i18nPath: string): void {
  const content = fs.readFileSync(i18nPath, 'utf-8');
  const localeSet = parseLocaleSet(content);
  const translationsObject = getTranslationsObject(i18nPath);

  if (localeSet.size === 0) {
    addResult({
      id: 'I18N_LOCALE_TYPE',
      status: 'FAIL',
      message: 'Could not parse Locale union type in src/lib/i18n.tsx',
    });
    return;
  }

  addResult({
    id: 'I18N_LOCALE_TYPE',
    status: 'PASS',
    message: `Parsed Locale union: ${[...localeSet].sort().join(', ')}`,
  });

  if (!translationsObject) {
    addResult({
      id: 'I18N_TRANSLATIONS_OBJECT',
      status: 'FAIL',
      message: 'Could not locate translations object in src/lib/i18n.tsx',
    });
    return;
  }

  const localeKeys = new Map<string, Set<string>>();
  for (const property of translationsObject.properties) {
    if (!ts.isPropertyAssignment(property)) {
      continue;
    }

    const locale = getPropertyNameText(property.name);
    if (!locale || !ts.isObjectLiteralExpression(property.initializer)) {
      continue;
    }

    localeKeys.set(locale, new Set(collectLeafPaths(property.initializer)));
  }

  const missingLocaleConfigs = [...localeSet].filter((locale) => !localeKeys.has(locale));
  if (missingLocaleConfigs.length > 0) {
    addResult({
      id: 'I18N_TRANSLATION_LOCALES',
      status: 'FAIL',
      message: 'Locale union includes locales missing from translations object.',
      evidence: missingLocaleConfigs.join(', '),
    });
  } else {
    addResult({
      id: 'I18N_TRANSLATION_LOCALES',
      status: 'PASS',
      message: 'Every declared locale has a translation object.',
    });
  }

  const canonicalLocale = localeKeys.get('en') ?? localeKeys.values().next().value;
  if (!canonicalLocale) {
    addResult({
      id: 'I18N_KEY_PARITY',
      status: 'FAIL',
      message: 'No translation keys found to compare across locales.',
    });
    return;
  }

  const parityMismatches: string[] = [];
  for (const [locale, keys] of localeKeys.entries()) {
    const missingFromLocale = [...canonicalLocale].filter((key) => !keys.has(key));
    const extraInLocale = [...keys].filter((key) => !canonicalLocale.has(key));

    if (missingFromLocale.length > 0 || extraInLocale.length > 0) {
      parityMismatches.push(
        `${locale}: missing=[${missingFromLocale.join(', ')}], extra=[${extraInLocale.join(', ')}]`
      );
    }
  }

  if (parityMismatches.length > 0) {
    addResult({
      id: 'I18N_KEY_PARITY',
      status: 'FAIL',
      message: 'Translation key parity mismatch across locales.',
      evidence: parityMismatches.join(' | '),
    });
  } else {
    addResult({
      id: 'I18N_KEY_PARITY',
      status: 'PASS',
      message: 'Translation key parity validated across locales.',
    });
  }
}

function checkLayoutLocaleWiring(): void {
  const layoutPath = path.join(PROJECT_ROOT, 'src', 'app', 'layout.tsx');
  if (!fs.existsSync(layoutPath)) {
    addResult({
      id: 'I18N_LAYOUT_WIRING',
      status: 'FAIL',
      message: 'Missing src/app/layout.tsx',
    });
    return;
  }

  const content = fs.readFileSync(layoutPath, 'utf-8');
  const hasHtmlLang = /<html[\s\S]*\blang=/.test(content);
  const hasProviderLocale = /<Providers[\s\S]*initialLocale=/.test(content);

  if (hasHtmlLang && hasProviderLocale) {
    addResult({
      id: 'I18N_LAYOUT_WIRING',
      status: 'PASS',
      message: 'Root layout wires locale into <html lang> and <Providers initialLocale>.',
    });
    return;
  }

  const missingBits = [
    hasHtmlLang ? null : 'html lang attribute',
    hasProviderLocale ? null : 'Providers initialLocale',
  ].filter(Boolean);

  addResult({
    id: 'I18N_LAYOUT_WIRING',
    status: 'FAIL',
    message: 'Layout locale wiring is incomplete.',
    evidence: missingBits.join(', '),
  });
}

function runValidation(): number {
  const i18nPath = checkI18nFileExists();
  if (i18nPath) {
    checkLocaleTypeAndTranslations(i18nPath);
  }
  checkLayoutLocaleWiring();

  const passed = results.filter((result) => result.status === 'PASS').length;
  const failed = results.filter((result) => result.status === 'FAIL').length;
  const warned = results.filter((result) => result.status === 'WARN').length;
  const ok = failed === 0;

  if (IS_JSON) {
    console.log(
      JSON.stringify(
        {
          ok,
          summary: {
            total: results.length,
            passed,
            failed,
            warned,
          },
          checks: results,
        },
        null,
        2
      )
    );
  } else {
    console.log('i18n Validation');
    console.log('===============');
    for (const result of results) {
      const icon = result.status === 'PASS' ? 'PASS' : result.status === 'FAIL' ? 'FAIL' : 'WARN';
      console.log(`[${icon}] ${result.id}: ${result.message}`);
      if (result.evidence) {
        console.log(`  Evidence: ${result.evidence}`);
      }
    }
    console.log('---------------');
    console.log(`Summary: ${passed} passed, ${failed} failed, ${warned} warned`);
  }

  return ok ? 0 : 1;
}

process.exit(runValidation());
