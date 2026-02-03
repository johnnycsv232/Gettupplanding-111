'use server';

import { saveLead } from '@/lib/leads';

/**
 * submitLeadAction
 * Server Action to handle lead form submissions.
 */
export async function submitLeadAction(formData: FormData) {
  const email = formData.get('email') as string;
  const source = (formData.get('source') as string) || 'unknown';

  if (!email) {
    return { success: false, error: 'Email is required' };
  }

  // Reuse existing lead logic
  return await saveLead({ email, source });
}

/**
 * agentChatAction
 * Server Action to simulate AI responses or eventually call an LLM.
 */
export async function agentChatAction(message: string) {
  // Simulate network latency
  await new Promise((resolve) => setTimeout(resolve, 800));

  let response =
    'Understood. Our team specializes in high-energy production. Would you like to schedule a strategy audit?';

  const userMessage = message.toLowerCase();

  if (userMessage.includes('price') || userMessage.includes('cost')) {
    response =
      'Our retainers are tailored for high-growth venues. We usually start with a Pilot Phase to prove ROI. Should I send over the pricing deck?';
  } else if (userMessage.includes('hello') || userMessage.includes('hi')) {
    response = `Greetings! Great to see you're interested in scaling. How can I held you dominate today?`;
  }

  return { success: true, response };
}
