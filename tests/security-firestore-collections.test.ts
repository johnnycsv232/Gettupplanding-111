import * as fs from 'fs';
import * as path from 'path';

import { describe, expect, it } from 'vitest';

const ROOT = path.resolve(__dirname, '..');
const RULES_PATH = path.join(ROOT, 'firestore.rules');
const COLLECTION_MATCH_REGEX = /match \/([A-Za-z0-9_-]+)\/{[^}]+}\s*\{/g;

function listCollectionMatches(rules: string): string[] {
  const collections = new Set<string>();
  for (const match of rules.matchAll(COLLECTION_MATCH_REGEX)) {
    const collectionName = match[1];
    if (collectionName !== '{document=**}') {
      collections.add(collectionName);
    }
  }
  return [...collections].sort();
}

describe('Security: Firestore Collection Coverage', () => {
  it('covers all declared Firestore collections in a dedicated security test', () => {
    const rules = fs.readFileSync(RULES_PATH, 'utf-8');
    const collections = listCollectionMatches(rules);

    // This keeps policy explicit and alerts us when a new collection is added
    // without a matching security test update.
    expect(collections).toEqual(['customers', 'leads', 'proofPacks', 'subscriptions', 'users']);
  });
});
