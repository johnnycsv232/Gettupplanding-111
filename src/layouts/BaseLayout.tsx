'use client';

import { ReactNode } from 'react';

import { CommandPalette } from '@/components/ui/CommandPalette';
import { CustomCursor } from '@/components/ui/CustomCursor';
import { NoiseOverlay } from '@/components/ui/NoiseOverlay';
import { PageTransition } from '@/components/ui/PageTransition';
import { Preloader } from '@/components/ui/Preloader';
import { SmoothScroll } from '@/components/ui/SmoothScroll';

interface BaseLayoutProps {
  children: ReactNode;
}

/**
 * BaseLayout
 * Decouples the visual infrastructure from the Next.js Root Layout.
 * Handles global overlays, smooth scrolling, and page transitions.
 */
export function BaseLayout({ children }: BaseLayoutProps) {
  return (
    <SmoothScroll>
      <Preloader />
      <CustomCursor />
      <CommandPalette />
      <NoiseOverlay />
      <PageTransition>{children}</PageTransition>
    </SmoothScroll>
  );
}
