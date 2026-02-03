/**
 * Centralized Route Configuration
 * Keeps all application paths in one place for type safety and easy refactoring.
 */

export const Routes = {
  // Public
  home: '/',
  login: '/login',
  register: '/register',
  features: '/#features',
  pricing: '/#pricing',
  about: '/about',
  contact: '/contact',

  // Legal
  privacy: '/privacy',
  terms: '/terms',

  // API
  api: {
    checkout: '/api/checkout',
    webhooks: {
      stripe: '/api/webhooks/stripe',
    },
  },

  // Protected (Future)
  dashboard: '/dashboard',
  settings: '/dashboard/settings',

  // Helper for dynamic routes (Example)
  // product: (id: string) => `/products/${id}`,
} as const;

export type AppRoutes = typeof Routes;
export type RoutePath = string; // Could be more specific if we recursively parsed the object values
