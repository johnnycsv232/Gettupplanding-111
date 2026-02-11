import {  useEffect, useRef, useState, useCallback } from 'react';

import { DATA_STANDARDS } from '@/lib/data-standards';

interface UseInfiniteScrollOptions {
  threshold?: number;
  initialLoad?: boolean;
}

/**
 * useInfiniteScroll
 * Standardized hook for implementing infinite scroll behavior across the application.
 * Aligns with Step 44 of the Master Task List.
 */
export function useInfiniteScroll(
  onLoadMore: () => Promise<void> | void,
  options: UseInfiniteScrollOptions = {}
) {
  const { threshold = DATA_STANDARDS.scrollThreshold, initialLoad = true } = options;
  const [isLoading, setIsLoading] = useState(false);
  const observerTarget = useRef<HTMLDivElement>(null);

  const handleLoadMore = useCallback(async () => {
    if (isLoading) return;
    setIsLoading(true);
    try {
      await onLoadMore();
    } finally {
      setIsLoading(false);
    }
  }, [isLoading, onLoadMore]);

  useEffect(() => {
    const target = observerTarget.current;
    if (!target) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isLoading) {
          void handleLoadMore();
        }
      },
      {
        root: null,
        rootMargin: '100px',
        threshold, // Trigger when even a pixel is visible
      }
    );

    observer.observe(target);

    return () => {
      if (target) observer.unobserve(target);
    };
  }, [handleLoadMore, isLoading, threshold]);

  // Initial load logic if required
  useEffect(() => {
    if (initialLoad) {
      void handleLoadMore();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    isLoading,
    observerTarget, // Attach this ref to the "Load More" trigger element at the bottom
  };
}
