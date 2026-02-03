'use client';

/**
 * Zenith Anonymous Logger
 * Purpose: Track high-level interaction patterns for UX optimization.
 * Invariant: Never capture PII or specific IP data.
 */

import { env } from './env';

export const trackInteraction = (eventName: string, metadata?: Record<string, unknown>) => {
  if (typeof window === 'undefined') return;

  const interactionData = {
    event: eventName,
    timestamp: new Date().toISOString(),
    path: window.location.pathname,
    ...metadata,
  };

  // For development, we log to console.
  // For production, this could push to Vercel Analytics or a custom edge function.
  if (env.NODE_ENV === 'development') {
    console.warn('📊 [ZENITH LOG]:', interactionData);
  } else {
    // Optional: push to analytics endpoint
    // fetch('/api/log', { method: 'POST', body: JSON.stringify(interactionData) }).catch(() => {});
  }
};
