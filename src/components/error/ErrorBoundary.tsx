'use client';

import { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children?: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }
      return (
        <div className="rounded-md border border-red-200 bg-red-50 p-4 dark:border-red-800 dark:bg-red-900/20">
          <h2 className="text-lg font-bold text-red-800 dark:text-red-200">Something went wrong</h2>
          <details className="mt-2 text-sm text-red-700 dark:text-red-300">
            <summary>Error details</summary>
            <pre className="mt-2 overflow-auto text-xs">{this.state.error?.message}</pre>
          </details>
          <button
            className="mt-4 rounded bg-red-600 px-4 py-2 text-white transition-colors hover:bg-red-700"
            onClick={() => this.setState({ hasError: false })}
          >
            Try Check
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
