'use client';

import { useState, useEffect } from 'react';

type Variant = 'control' | 'variant_a' | 'variant_b';

export function useABTest(experimentId: string): Variant {
  const [variant, setVariant] = useState<Variant>('control');

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const key = `zenith_exp_${experimentId}`;
    const stored = localStorage.getItem(key) as Variant;

    if (stored) {
      if (stored !== variant) {
        setVariant(stored);
      }
    } else {
      const r = Math.random();
      const newVariant: Variant = r > 0.66 ? 'variant_b' : r > 0.33 ? 'variant_a' : 'control';
      localStorage.setItem(key, newVariant);
      setVariant(newVariant);
      console.warn(`[Zenith A/B] User assigned to ${newVariant} for ${experimentId}`);
    }
  }, [experimentId, variant]);

  return variant;
}
