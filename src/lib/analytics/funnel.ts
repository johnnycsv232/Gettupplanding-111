'use client';

import { useEffect } from 'react';

type FunnelStage =
  | 'view_landing'
  | 'scroll_depth_50'
  | 'interact_3d'
  | 'open_pilot'
  | 'submit_lead';

export function trackFunnelEvent(stage: FunnelStage, metadata?: Record<string, unknown>) {
  if (typeof window === 'undefined') return;

  const event = {
    stage,
    timestamp: Date.now(),
    url: window.location.pathname,
    ...metadata,
  };

  console.warn('[Zenith Funnel]', event);

  // Save to local storage for "dashboard" demo
  const history = JSON.parse(localStorage.getItem('zenith_funnel_history') || '[]');
  history.push(event);
  localStorage.setItem('zenith_funnel_history', JSON.stringify(history));
}

// Hook to auto-track view
export function useFunnelTracker() {
  useEffect(() => {
    trackFunnelEvent('view_landing');
  }, []);
}
