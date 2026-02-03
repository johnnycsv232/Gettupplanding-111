/**
 * Experimental Features Standard
 * Use this to gate features that are not yet production-ready or require A/B testing.
 */

interface ExperimentalFlags {
  enableNewGlint: boolean;
  enableAdvancedSearch: boolean;
  enableDynamicPricing: boolean;
}

const DEFAULT_FLAGS: ExperimentalFlags = {
  enableNewGlint: false,
  enableAdvancedSearch: false,
  enableDynamicPricing: false,
};

/**
 * getExperimentalFlags
 * Resolves flags based on environment and config.
 */
export function getExperimentalFlags(): ExperimentalFlags {
  // In a real app, this could fetch from Remote Config or use env vars
  return {
    ...DEFAULT_FLAGS,
    enableNewGlint: process.env.NEXT_PUBLIC_ENABLE_NEW_GLINT === 'true',
  };
}

/**
 * useExperimental
 * React hook for checking feature flags.
 */
export function useExperimental() {
  const flags = getExperimentalFlags();
  return {
    isFeatureEnabled: (key: keyof ExperimentalFlags) => flags[key],
    flags,
  };
}
