'use client';

import { AlertTriangle, RefreshCcw } from 'lucide-react';
import { Component, ErrorInfo, ReactNode } from 'react';

import { Button, GlassCard } from '@/components/ui';

interface Props {
  children?: ReactNode;
  fallback?: ReactNode;
  featureName?: string;
}

interface State {
  hasError: boolean;
  error?: Error;
}

/**
 * FeatureErrorBoundary
 * Standardized Error Boundary for major features and routes.
 */
export class FeatureErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error(
      `[ErrorBoundary][${this.props.featureName || 'Unknown Feature'}]`,
      error,
      errorInfo,
    );
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: undefined });
  };

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="flex min-h-[400px] w-full items-center justify-center p-6">
          <GlassCard intensity="high" className="max-w-md border-red-500/20 p-12 text-center">
            <div className="mx-auto mb-6 flex size-20 items-center justify-center rounded-full bg-red-500/10 text-red-500">
              <AlertTriangle size={40} />
            </div>
            <h2 className="font-display mb-4 text-2xl uppercase tracking-tighter text-white">
              SYSTEM <span className="text-red-500">ANOMALY</span>
            </h2>
            <p className="mb-8 text-sm leading-relaxed text-white/60">
              The {this.props.featureName || 'module'} encountered a critical error. Our systems
              have logged the incident.
            </p>
            <Button variant="outline" className="w-full gap-3" onClick={this.handleReset}>
              <RefreshCcw size={16} /> RE-INITIALIZE MODULE
            </Button>
          </GlassCard>
        </div>
      );
    }

    return this.props.children;
  }
}
