import { describe, expect, it, vi } from 'vitest';

import { parseClassificationIntent, runLeadArchitectFlow } from '@/lib/ai/genkit';

describe('leadArchitectFlow internals', () => {
  it('parses structured JSON intent outputs', () => {
    const intent = parseClassificationIntent('{"intent":"pricing"}');
    expect(intent).toBe('pricing');
  });

  it('falls back to general intent for malformed classifier payloads', () => {
    const intent = parseClassificationIntent('completely malformed response');
    expect(intent).toBe('general');
  });

  it('handles classifier failures without throwing upstream', async () => {
    const generate = vi
      .fn()
      .mockRejectedValueOnce(new Error('classifier unavailable'))
      .mockResolvedValueOnce({ text: 'Safe response body' });

    const result = await runLeadArchitectFlow(
      {
        message: 'Need help with growth.',
        city: 'Miami',
        country: 'US',
      },
      generate
    );

    expect(result.intent).toBe('general');
    expect(result.response).toBe('Safe response body');
    expect(result.score).toBe(50);
  });

  it('returns deterministic fallback response when both model calls fail', async () => {
    const generate = vi.fn().mockRejectedValue(new Error('model outage'));

    const result = await runLeadArchitectFlow(
      {
        message: 'What does this cost?',
        city: 'Chicago',
        country: 'US',
      },
      generate
    );

    expect(result.intent).toBe('general');
    expect(result.response).toMatch(/Lead Architect is currently recalibrating/i);
    expect(result.score).toBe(50);
  });
});
