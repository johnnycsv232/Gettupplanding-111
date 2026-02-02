'use client';

/**
 * Zenith Feature Flagging System
 * Purpose: Safe rollout of experimental UI/UX features.
 */

const FEATURES = {
  high_intensity_shaders: true,
  magnetic_nav_v2: true,
  pricing_experiment_A: false,
} as const;

type FeatureKey = keyof typeof FEATURES;

export const isFeatureEnabled = (feature: FeatureKey): boolean => {
  // Logic could be extended to check localStorage, cookies, or remote config
  return FEATURES[feature] ?? false;
};
