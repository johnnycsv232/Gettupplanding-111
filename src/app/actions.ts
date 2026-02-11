'use server';

import type { ActionResult } from '@/lib/actions';
import { leadArchitectFlow } from '@/lib/ai/genkit';
import { saveLead } from '@/lib/leads';

type LeadActionData = { id: string };
export type SubmitLeadActionResult = ActionResult<LeadActionData>;

export async function submitLeadAction(formData: FormData): Promise<SubmitLeadActionResult> {
  const email = String(formData.get('email') ?? '').trim();
  const source = String(formData.get('source') ?? 'unknown').trim() || 'unknown';

  if (!email) {
    return {
      success: false,
      error: 'Email is required',
      timestamp: new Date().toISOString(),
    };
  }

  // Reuse existing lead logic
  return await saveLead({ email, source });
}

/**
 * agentChatAction
 * Server Action to invoke the Firebase Genkit autonomous agent flow.
 */
export async function agentChatAction(
  message: string,
  city: string = 'Your City',
  country: string = 'US'
) {
  try {
    const result = await leadArchitectFlow({
      message,
      city,
      country,
    });

    return {
      success: true,
      response: result.response,
      intent: result.intent,
      score: result.score,
    };
  } catch (error: unknown) {
    console.error('Genkit Flow Error:', error);
    return {
      success: false,
      response: 'The Lead Architect is currently recalibrating. Please try again in a moment.',
    };
  }
}
