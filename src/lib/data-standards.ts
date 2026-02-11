/**
 * Data Handling Standards
 * Defines common types and hooks for pagination vs infinite scroll.
 */

export interface PaginatedResponse<T> {
  data: T[];
  metadata: {
    total: number;
    limit: number;
    offset: number;
    hasMore: boolean;
  };
}

/**
 * Standard for high-growth nightlife productions:
 * - List Views: Infinite Scroll (Load More button for mobile, auto-load for desktop).
 * - Admin/Internal: Specialized Pagination.
 */
export const DATA_STANDARDS = {
  defaultLimit: 12,
  scrollThreshold: 0.8, // Load more when 80% through the list
} as const;

/**
 * usePagination (Mock/Standard)
 * Provides a unified interface for data listing.
 */
export function usePaginationRegistry() {
  // Skeleton for standardized pagination state
  return {
    strategy: 'infinite-scroll', // Default for Gettupp
    entranceAnimation: 'cinematic-slide-up',
  };
}
