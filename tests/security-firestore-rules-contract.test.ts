import * as fs from 'node:fs';
import * as path from 'node:path';

import { describe, expect, it } from 'vitest';

const ROOT = path.resolve(__dirname, '..');
const RULES_PATH = path.join(ROOT, 'firestore.rules');

function readRules(): string {
  return fs.readFileSync(RULES_PATH, 'utf-8');
}

function extractRuleBlock(rules: string, matchSignature: string): string {
  const signatureIndex = rules.indexOf(matchSignature);
  if (signatureIndex < 0) {
    throw new Error(`Could not find rule signature: ${matchSignature}`);
  }

  const openingBraceIndex = rules.indexOf('{', signatureIndex + matchSignature.length);
  if (openingBraceIndex < 0) {
    throw new Error(`Could not find opening brace for: ${matchSignature}`);
  }

  let depth = 0;
  for (let index = openingBraceIndex; index < rules.length; index += 1) {
    const char = rules[index];
    if (char === '{') {
      depth += 1;
    } else if (char === '}') {
      depth -= 1;
      if (depth === 0) {
        return rules.slice(openingBraceIndex + 1, index);
      }
    }
  }

  throw new Error(`Could not find closing brace for: ${matchSignature}`);
}

describe('Security: Firestore rules contract by collection', () => {
  it('users collection blocks subscription self-upgrades', () => {
    const rules = readRules();
    const block = extractRuleBlock(rules, 'match /users/{userId}');

    expect(block).toMatch(/allow read:\s*if request\.auth != null && request\.auth\.uid == userId;/);
    expect(block).toContain('allow update: if request.auth != null && request.auth.uid == userId');
    expect(block).toContain('affectedKeys()');
    expect(block).toContain('subscriptionTier');
    expect(block).toContain('stripeCustomerId');
    expect(block).toContain('hasActiveSubscription');
    expect(block).toContain('subscriptionStatus');

    expect(block).toContain('allow create: if request.auth != null && request.auth.uid == userId');
    expect(block).toContain('request.resource.data.keys()');
  });

  it('subscriptions collection is read-only for owner and never writable by clients', () => {
    const rules = readRules();
    const block = extractRuleBlock(rules, 'match /subscriptions/{subscriptionId}');

    expect(block).toContain('allow read: if request.auth != null');
    expect(block).toContain('resource.data.userId == request.auth.uid');
    expect(block).toMatch(/allow write:\s*if false;/);
  });

  it('proofPacks collection is read-only for owner and never writable by clients', () => {
    const rules = readRules();
    const block = extractRuleBlock(rules, 'match /proofPacks/{proofPackId}');

    expect(block).toContain('allow read: if request.auth != null');
    expect(block).toContain('resource.data.userId == request.auth.uid');
    expect(block).toMatch(/allow write:\s*if false;/);
  });

  it('leads collection only allows app-check protected create operations', () => {
    const rules = readRules();
    const block = extractRuleBlock(rules, 'match /leads/{leadId}');

    expect(block).toMatch(/allow create:\s*if request\.appCheck != null;/);
    expect(block).toMatch(/allow read, update, delete:\s*if false;/);
  });

  it('customers collection is readable by owner and never writable by clients', () => {
    const rules = readRules();
    const block = extractRuleBlock(rules, 'match /customers/{customerId}');

    expect(block).toContain('allow read: if request.auth != null');
    expect(block).toContain('resource.data.userId == request.auth.uid');
    expect(block).toMatch(/allow write:\s*if false;/);
  });
});
