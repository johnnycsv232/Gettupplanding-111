'use client';
import Script from 'next/script';

import { env } from '@/lib/env';

interface ScriptConfig {
  id: string;
  src: string;
  strategy?: 'beforeInteractive' | 'afterInteractive' | 'lazyOnload';
  onLoad?: () => void;
  enabled?: boolean;
}

const EXTERNAL_SCRIPTS: ScriptConfig[] = [
  {
    id: 'google-tag-manager',
    src: `https://www.googletagmanager.com/gtm.js?id=${env.NEXT_PUBLIC_GTM_ID}`,
    strategy: 'afterInteractive',
    enabled: !!env.NEXT_PUBLIC_GTM_ID,
  },
  // Add other scripts here (Pixel, Analytics, etc.)
];

/**
 * ScriptManager
 * Unified component for loading third-party scripts based on environment.
 */
export function ScriptManager() {
  if (env.NODE_ENV === 'development') {
    return null;
  }

  return (
    <>
      {EXTERNAL_SCRIPTS.filter((s) => s.enabled).map((script) => (
        <Script
          key={script.id}
          id={script.id}
          src={script.src}
          strategy={script.strategy}
          onLoad={script.onLoad}
        />
      ))}
    </>
  );
}
