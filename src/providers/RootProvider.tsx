'use client';

import React, { createContext, useContext, useReducer, ReactNode } from 'react';

import { CommandPalette } from '@/components/ui/CommandPalette';
import { ToastContainer, ToastMessage } from '@/components/ui/Toast';
import { Action } from '@/lib/actions';

/**
 * Standard Global State Interface
 */
interface GlobalState {
  isThemeLoaded: boolean;
  userPrefs: {
    reducedMotion: boolean;
    language: string;
  };
  notifications: ToastMessage[];
  isCommandPaletteOpen: boolean;
}

const initialState: GlobalState = {
  isThemeLoaded: false,
  userPrefs: {
    reducedMotion: false,
    language: 'en',
  },
  notifications: [],
  isCommandPaletteOpen: false,
};

/**
 * Root Reducer using the Action pattern
 */
function rootReducer(state: GlobalState, action: Action<any>): GlobalState {
  switch (action.type) {
    case 'SET_THEME_LOADED':
      return { ...state, isThemeLoaded: action.payload };
    case 'UPDATE_USER_PREFS':
      return { ...state, userPrefs: { ...state.userPrefs, ...action.payload } };
    case 'ADD_NOTIFICATION':
      return { ...state, notifications: [...state.notifications, action.payload] };
    case 'REMOVE_NOTIFICATION':
      return {
        ...state,
        notifications: state.notifications.filter((n) => n.id !== action.payload),
      };
    case 'TOGGLE_COMMAND_PALETTE':
      return { ...state, isCommandPaletteOpen: action.payload ?? !state.isCommandPaletteOpen };
    default:
      return state;
  }
}

const GlobalStateContext = createContext<
  | {
      state: GlobalState;
      dispatch: React.Dispatch<Action<any>>;
    }
  | undefined
>(undefined);

/**
 * Root Provider to wrap the entire app.
 */
export function RootProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(rootReducer, initialState);

  return (
    <GlobalStateContext.Provider value={{ state, dispatch }}>
      {children}
      <CommandPalette />
      <ToastContainer
        toasts={state.notifications}
        onRemove={(id) => dispatch({ type: 'REMOVE_NOTIFICATION', payload: id })}
      />
      <CommandPalette />
    </GlobalStateContext.Provider>
  );
}

/**
 * Custom hook for accessing global state.
 */
export function useGlobalState() {
  const context = useContext(GlobalStateContext);
  if (context === undefined) {
    throw new Error('useGlobalState must be used within a RootProvider');
  }
  return context;
}
