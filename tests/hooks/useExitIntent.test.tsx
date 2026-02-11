import { act, renderHook } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { useExitIntent } from '@/hooks/useExitIntent';

describe('useExitIntent', () => {
  beforeEach(() => {
    sessionStorage.clear();
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('opens after configured delay and persists one-shot session state', () => {
    const { result } = renderHook(() => useExitIntent(1000));

    expect(result.current.showExitIntent).toBe(false);
    expect(sessionStorage.getItem('exit-intent-shown')).toBeNull();

    act(() => {
      vi.advanceTimersByTime(1000);
    });

    expect(result.current.showExitIntent).toBe(true);
    expect(sessionStorage.getItem('exit-intent-shown')).toBe('true');
  });

  it('opens when mouse leaves from top edge', () => {
    const { result } = renderHook(() => useExitIntent(999999));

    expect(result.current.showExitIntent).toBe(false);

    act(() => {
      document.dispatchEvent(new MouseEvent('mouseleave', { clientY: 0 }));
    });

    expect(result.current.showExitIntent).toBe(true);
  });

  it('can be closed explicitly', () => {
    const { result } = renderHook(() => useExitIntent(1000));

    act(() => {
      vi.advanceTimersByTime(1000);
    });
    expect(result.current.showExitIntent).toBe(true);

    act(() => {
      result.current.closeExitIntent();
    });

    expect(result.current.showExitIntent).toBe(false);
  });
});
