import { describe, expect, it } from 'vitest';

import {
  extractBearerToken,
  hasAdminPrivileges,
  resolveAllowedAdminEmails,
} from '@/lib/api-auth';

describe('api-auth helpers', () => {
  describe('extractBearerToken', () => {
    it('returns null for missing or invalid headers', () => {
      expect(extractBearerToken(null)).toBeNull();
      expect(extractBearerToken('')).toBeNull();
      expect(extractBearerToken('Basic abc123')).toBeNull();
      expect(extractBearerToken('Bearer')).toBeNull();
    });

    it('extracts bearer tokens with flexible spacing and case', () => {
      expect(extractBearerToken('Bearer token_123')).toBe('token_123');
      expect(extractBearerToken('bearer   token_456')).toBe('token_456');
    });
  });

  describe('resolveAllowedAdminEmails', () => {
    it('normalizes, deduplicates, and lowercases configured emails', () => {
      const result = resolveAllowedAdminEmails(
        ' Admin@Gettupp.com,admin@gettupp.com, ops@gettupp.com '
      );

      expect(result).toEqual(['admin@gettupp.com', 'ops@gettupp.com']);
    });

    it('falls back to provided defaults when env is empty', () => {
      const result = resolveAllowedAdminEmails(undefined, ['TEAM@GETTUPP.COM']);
      expect(result).toEqual(['team@gettupp.com']);
    });
  });

  describe('hasAdminPrivileges', () => {
    it('allows admin claim regardless of email list', () => {
      const isAdmin = hasAdminPrivileges({ admin: true, email: 'user@example.com' });
      expect(isAdmin).toBe(true);
    });

    it('allows users in explicit admin allowlist when no admin claim exists', () => {
      const isAdmin = hasAdminPrivileges(
        { admin: false, email: 'ops@gettupp.com' },
        ['ops@gettupp.com']
      );
      expect(isAdmin).toBe(true);
    });

    it('denies non-admin users not in allowlist', () => {
      const isAdmin = hasAdminPrivileges(
        { admin: false, email: 'user@example.com' },
        ['ops@gettupp.com']
      );
      expect(isAdmin).toBe(false);
    });
  });
});
