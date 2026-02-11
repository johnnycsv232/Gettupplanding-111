'use client';

import { useEffect, useCallback } from 'react';

import { useGlobalState } from '@/providers/RootProvider';

/**
 * useCommandPalette
 * Handles the keyboard shortcut (Cmd/Ctrl + K) and toggle logic.
 */
export function useCommandPalette() {
  const { state, dispatch } = useGlobalState();

  const toggle = useCallback(
    (open?: boolean) => {
      dispatch({ type: 'TOGGLE_COMMAND_PALETTE', payload: open });
    },
    [dispatch],
  );

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        toggle();
      }

      if (e.key === 'Escape' && state.isCommandPaletteOpen) {
        toggle(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [state.isCommandPaletteOpen, toggle]);

  return {
    isOpen: state.isCommandPaletteOpen,
    toggle,
  };
}
