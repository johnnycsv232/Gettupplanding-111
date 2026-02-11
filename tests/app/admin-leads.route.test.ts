import { beforeEach, describe, expect, it, vi } from 'vitest';

import { GET } from '@/app/api/admin/leads/route';
import { getAdminAuth, getAdminDb } from '@/lib/firebase-admin';

const mockVerifyIdToken = vi.fn();
const mockGet = vi.fn();
const mockCollection = vi.fn(() => ({
  orderBy: vi.fn(() => ({
    limit: vi.fn(() => ({
      get: mockGet,
    })),
  })),
}));

describe('Admin Leads API', () => {
  beforeEach(() => {
    vi.resetAllMocks();
    process.env.ADMIN_ALLOWED_EMAILS = 'admin@gettupp.com';

    vi.mocked(getAdminAuth).mockReturnValue({
      verifyIdToken: mockVerifyIdToken,
    } as never);

    vi.mocked(getAdminDb).mockReturnValue({
      collection: mockCollection,
    } as never);
  });

  it('returns 401 when Authorization header is missing', async () => {
    const response = await GET(new Request('http://localhost/api/admin/leads'));
    expect(response.status).toBe(401);
  });

  it('returns 403 for authenticated non-admin users', async () => {
    mockVerifyIdToken.mockResolvedValue({ uid: 'user_1', email: 'user@example.com' });

    const response = await GET(
      new Request('http://localhost/api/admin/leads', {
        headers: { Authorization: 'Bearer token_123' },
      })
    );

    expect(response.status).toBe(403);
  });

  it('returns 401 for malformed or invalid bearer tokens', async () => {
    mockVerifyIdToken.mockRejectedValue(new Error('Token verification failed'));

    const response = await GET(
      new Request('http://localhost/api/admin/leads', {
        headers: { Authorization: 'Bearer invalid_token' },
      })
    );

    expect(response.status).toBe(401);
  });

  it('returns sanitized leads for allowed admins', async () => {
    mockVerifyIdToken.mockResolvedValue({ uid: 'admin_1', email: 'admin@gettupp.com' });
    mockGet.mockResolvedValue({
      docs: [
        {
          id: 'lead_1',
          data: () => ({
            email: 'hello@gettupp.com',
            city: 'Las Vegas',
            source: 'Hero',
            createdAt: { toDate: () => new Date('2026-01-01T00:00:00.000Z') },
          }),
        },
      ],
    });

    const response = await GET(
      new Request('http://localhost/api/admin/leads', {
        headers: { Authorization: 'Bearer token_123' },
      })
    );

    expect(response.status).toBe(200);
    const body = await response.json();
    expect(body.leads).toHaveLength(1);
    expect(body.leads[0]).toMatchObject({
      id: 'lead_1',
      email: 'hello@gettupp.com',
      city: 'Las Vegas',
      source: 'Hero',
      createdAt: '2026-01-01T00:00:00.000Z',
    });
  });
});
