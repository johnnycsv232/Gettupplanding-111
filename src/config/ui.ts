/**
 * Global UI Configuration
 * Centralized constants for UI behaviors, animations, and timeouts.
 * Use these instead of magic numbers to ensure consistency.
 */

export const UI_CONFIG = {
  // Animation Durations (ms)
  ANIMATION_DURATION: {
    FAST: 200,
    NORMAL: 300,
    SLOW: 500,
    CINEMATIC: 800,
  },

  // Toast Notifications
  TOAST: {
    DURATION: 5000,
    LIMIT: 3,
  },

  // Interaction Delays (ms)
  DELAY: {
    DEBOUNCE: 300,
    HOVER: 200,
    TOOLTIP: 500,
  },

  // Layout & Scroll
  LAYOUT: {
    HEADER_HEIGHT: 80,
    MOBILE_HEADER_HEIGHT: 64,
    SCROLL_OFFSET: 100,
  },

  // Z-Index (Reference only, actual values in tailwind.config.ts)
  Z_INDEX: {
    TOAST: 1700,
    MODAL: 1400,
    OVERLAY: 1300,
    STICKY: 1100,
  },
} as const;
