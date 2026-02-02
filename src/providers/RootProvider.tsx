'use client';

import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { Action } from '@/lib/actions';
import { ToastContainer, ToastMessage } from '@/components/ui/Toast';

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
}

const initialState: GlobalState = {
  isThemeLoaded: false,
  userPrefs: {
    reducedMotion: false,
    language: 'en',
  },
  notifications: [],
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
        notifications: state.notifications.filter(n => n.id !== action.payload)
      };
    default:
      return state;
  }
}

const GlobalStateContext = createContext<{
  state: GlobalState;
  dispatch: React.Dispatch<Action<any>>;
} | undefined>(undefined);

/**
 * Root Provider to wrap the entire app.
 */
export function RootProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(rootReducer, initialState);

  return (
    <GlobalStateContext.Provider value={{ state, dispatch }}>
      {children}
      <ToastContainer
        toasts={state.notifications}
        onRemove={(id) => dispatch({ type: 'REMOVE_NOTIFICATION', payload: id })}
      />
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
