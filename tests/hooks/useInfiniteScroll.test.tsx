import { renderHook, act, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';

import { useInfiniteScroll } from '../../src/hooks/useInfiniteScroll';

// Mock IntersectionObserver
const observeMock = vi.fn();
const unobserveMock = vi.fn();

beforeEach(() => {
  observeMock.mockClear();
  unobserveMock.mockClear();

  // Basic Polyfill for IntersectionObserver in Node environment
  global.IntersectionObserver = vi.fn().mockImplementation(() => ({
    observe: observeMock,
    unobserve: unobserveMock,
    disconnect: vi.fn(),
    takeRecords: vi.fn(),
  }));
});

describe('useInfiniteScroll', () => {
  it('should initialize with isLoading false', () => {
    const onLoadMore = vi.fn();
    const { result } = renderHook(() => useInfiniteScroll(onLoadMore, { initialLoad: false }));
    expect(result.current.isLoading).toBe(false);
  });

  it('should call onLoadMore on mount if initialLoad is true', async () => {
    const onLoadMore = vi.fn().mockResolvedValue(undefined);
    renderHook(() => useInfiniteScroll(onLoadMore, { initialLoad: true }));
    await waitFor(() => {
      expect(onLoadMore).toHaveBeenCalled();
    });
  });

  it('should NOT call onLoadMore on mount if initialLoad is false', async () => {
    const onLoadMore = vi.fn().mockResolvedValue(undefined);
    renderHook(() => useInfiniteScroll(onLoadMore, { initialLoad: false }));
    expect(onLoadMore).not.toHaveBeenCalled();
  });

  it('should set isLoading to true while fetching', async () => {
    let resolvePromise: () => void;

    const onLoadMore = vi.fn().mockImplementation(() => {
        return new Promise<void>((resolve) => {
            resolvePromise = resolve;
        });
    });

    const { result } = renderHook(() => useInfiniteScroll(onLoadMore, { initialLoad: true }));

    // Check loading state immediately after mount (if async might take a tick,
    // but in renderHook it might flush effects)
    expect(onLoadMore).toHaveBeenCalled();
    expect(result.current.isLoading).toBe(true);

    // Resolve
    await act(async () => {
       if(resolvePromise) resolvePromise();
    });

    expect(result.current.isLoading).toBe(false);
  });
});
