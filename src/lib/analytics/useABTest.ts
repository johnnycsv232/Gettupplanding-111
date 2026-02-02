'use client';

import { useState, useEffect } from 'react';

type Variant = 'control' | 'variant_a' | 'variant_b';

export function useABTest(experimentId: string): Variant {
  const [variant, setVariant] = useState<Variant>('control');

  useEffect(() => {
    // Check local storage for existing assignment
    const key = `zenith_exp_${experimentId}`;
    const stored = localStorage.getItem(key);

    if (stored) {
      if (stored !== variant) {

        setVariant(stored as Variant);
      }
    } else {
      // Deterministic random assignment
      const r = Math.random();
      let newVariant: Variant = 'control';
      if (r > 0.66) newVariant = 'variant_b';
      else if (r > 0.33) newVariant = 'variant_a';

      localStorage.setItem(key, newVariant);
      setVariant(newVariant);

      // Log assignment
      console.log(`[Zenith A/B] User assigned to ${newVariant} for ${experimentId}`);
    }
  }, [experimentId]);

  return variant;
}
