import { describe, expect, it, vi, beforeEach } from 'vitest';

import { submitLeadAction } from '@/app/actions';
import { saveLead } from '@/lib/leads';

vi.mock('@/lib/leads', () => ({
  saveLead: vi.fn(),
}));

const mockedSaveLead = vi.mocked(saveLead);

describe('submitLeadAction', () => {
  beforeEach(() => {
    mockedSaveLead.mockReset();
  });

  it('returns a consistent error contract when email is missing', async () => {
    const formData = new FormData();
    const result = await submitLeadAction(formData);

    expect(result.success).toBe(false);
    expect(result.error).toBe('Email is required');
    expect(typeof result.timestamp).toBe('string');
  });

  it('returns the lead service contract on success', async () => {
    mockedSaveLead.mockResolvedValue({
      success: true,
      data: { id: 'lead_123' },
      timestamp: new Date().toISOString(),
    });

    const formData = new FormData();
    formData.append('email', 'vip@gettupp.com');

    const result = await submitLeadAction(formData);

    expect(result.success).toBe(true);
    expect(result.data?.id).toBe('lead_123');
    expect(typeof result.timestamp).toBe('string');
  });
});
