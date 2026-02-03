'use client';

import { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
}

/**
 * ErrorBoundary3D
 * Catches runtime errors in 3D scenes and provides a graceful fallback.
 */
export class ErrorBoundary3D extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('🚨 [3D ERROR]:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <div className="absolute inset-0 flex items-center justify-center bg-deep-void">
            <div className="glass-medium rounded-2xl p-8 text-center">
              <h3 className="font-display mb-2 text-vegas-gold">IMMERSION PAUSED</h3>
              <p className="text-xs uppercase tracking-widest text-white/40">
                Hardware acceleration unavailable or encounterd an issue.
              </p>
            </div>
          </div>
        )
      );
    }

    return this.props.children;
  }
}
