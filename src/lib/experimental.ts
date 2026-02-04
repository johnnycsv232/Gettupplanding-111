/**
 * Experimental Features Standard
 * Gate features for A/B testing, progressive rollout, or local dev overrides.
 *
 * This file consolidates `features.ts` and provides a unified hook for React components.
 * @see skills/nextjs-best-practices (Server vs Client), skills/react-patterns (Hooks)
 */

'use client';

import { env } from './env';

// --- Feature Flag Registry ---
export interface ExperimentalFlags {
  enableNewGlint: boolean;
  enableAdvancedSearch: boolean;
  enableDynamicPricing: boolean;
  highIntensityShaders: boolean;
  magneticNavV2: boolean;
  pricingExperimentA: boolean;
}

const DEFAULT_FLAGS: ExperimentalFlags = {
  enableNewGlint: false,
  enableAdvancedSearch: false,
  enableDynamicPricing: false,
  highIntensityShaders: true,
  magneticNavV2: true,
  pricingExperimentA: false,
};

const LOCAL_STORAGE_KEY = 'zenith_experimental_flags_override';

/**
 * Retrieves persisted local overrides from localStorage.
 * Useful for development and QA testing.
 */
function getLocalOverrides(): Partial<ExperimentalFlags> {
  if (typeof window === 'undefined') return {};
  try {
    const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
    return stored ? JSON.parse(stored) : {};
  } catch {
    return {};
  }
}

/**
 * getExperimentalFlags
 * Resolves flags based on environment, config, and local overrides.
 */
export function getExperimentalFlags(): ExperimentalFlags {
  const localOverrides = getLocalOverrides();
  return {
    ...DEFAULT_FLAGS,
    ...localOverrides,
    enableNewGlint:
      env.NEXT_PUBLIC_ENABLE_NEW_GLINT === 'true' || localOverrides.enableNewGlint || false,
  };
}

/**
 * useExperimental
 * React hook for checking feature flags in client components.
 */
export function useExperimental() {
  const flags = getExperimentalFlags();
  return {
    isFeatureEnabled: <K extends keyof ExperimentalFlags>(key: K): boolean => !!flags[key],
    flags,
  };
}

/**
 * isFeatureEnabled
 * Simple utility for checking a single flag outside of React context.
 */
export const isFeatureEnabled = <K extends keyof ExperimentalFlags>(key: K): boolean => {
  return getExperimentalFlags()[key];
};

/**
 * setLocalOverride
 * Allows temporary enabling/disabling of a flag in localStorage for development.
 * Call with `value = null` to clear an override.
 */
export const setLocalOverride = <K extends keyof ExperimentalFlags>(
  key: K,
  value: boolean | null
): void => {
  if (typeof window === 'undefined') return;
  const overrides = getLocalOverrides();
  if (value === null) {
    delete overrides[key];
  } else {
    overrides[key] = value;
  }
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(overrides));
};
