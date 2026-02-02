'use client';

import React from 'react';

import { I18nProvider } from '@/lib/i18n';
import { RootProvider } from '@/providers/RootProvider';

import { FirebaseProvider } from './FirebaseProvider';

interface ProvidersProps {
  children: React.ReactNode;
  initialLocale?: string;
}

/**
 * Global App Providers
 * This component bundles all third-party and custom providers.
 * Keep this as a client component.
 */
export function Providers({ children, initialLocale = 'en' }: ProvidersProps) {
  return (
    <RootProvider>
      <FirebaseProvider>
        <I18nProvider initialLocale={initialLocale}>
          {children}
        </I18nProvider>
      </FirebaseProvider>
    </RootProvider>
  );
}
