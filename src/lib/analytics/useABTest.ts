'use client';

import { useSyncExternalStore, useCallback } from 'react';

type Variant = 'control' | 'variant_a' | 'variant_b';

const VALID_VARIANTS: Variant[] = ['control', 'variant_a', 'variant_b'];

/**
 * Get or assign a variant for A/B testing.
 * Uses localStorage to persist assignment across sessions.
 */
function getOrAssignVariant(key: string): Variant {
  const stored = localStorage.getItem(key);

  if (stored && VALID_VARIANTS.includes(stored as Variant)) {
    return stored as Variant;
  }

  const r = Math.random();
  const newVariant: Variant = r > 0.66 ? 'variant_b' : r > 0.33 ? 'variant_a' : 'control';
  localStorage.setItem(key, newVariant);
  console.warn(`[Zenith A/B] User assigned to ${newVariant} for ${key}`);
  return newVariant;
}

/**
 * A/B test hook using useSyncExternalStore for proper React 18+ patterns.
 * Avoids cascading renders by syncing with localStorage as external store.
 */
export function useABTest(experimentId: string): Variant {
  const key = `zenith_exp_${experimentId}`;

  const subscribe = useCallback(
    (onStoreChange: () => void) => {
      const handleStorage = (e: StorageEvent) => {
        if (e.key === key) onStoreChange();
      };
      window.addEventListener('storage', handleStorage);
      return () => window.removeEventListener('storage', handleStorage);
    },
    [key]
  );

  const getSnapshot = useCallback(() => getOrAssignVariant(key), [key]);

  const getServerSnapshot = useCallback((): Variant => 'control', []);

  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
