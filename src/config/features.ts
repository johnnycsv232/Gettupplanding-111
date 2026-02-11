/**
 * Feature Flags Configuration
 * Control the visibility and behavior of Zenith features.
 */

export interface FeatureFlags {
  enableAiAgent: boolean;
  enableCinematicReveal: boolean;
  enableEvents: boolean;
  enableUpgrades: boolean;
  enablePilotProgram: boolean;
  enableAnalytics: boolean;
  showBetaBadge: boolean;
  maintenanceMode: boolean;
}

export const features: FeatureFlags = {
  // Experimental Features
  enableAiAgent: true,

  // Staged Rollout
  enableCinematicReveal: true,
  enableEvents: true,
  enableUpgrades: true,
  enablePilotProgram: true,

  // Maintenance / Meta
  enableAnalytics: process.env.NODE_ENV === 'production',
  showBetaBadge: false,
  maintenanceMode: false,
};

/**
 * Helper to check feature status
 */
export const isEnabled = (feature: keyof FeatureFlags): boolean => {
  return features[feature];
};
