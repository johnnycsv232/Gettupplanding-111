import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { createElement, type ReactNode } from 'react';
import { describe, expect, it, vi, beforeEach } from 'vitest';

import { HeroSection } from '@/features/landing/components/HeroSection';
import { saveLead } from '@/lib/leads';

vi.mock('@/lib/leads', () => ({
  saveLead: vi.fn(),
}));

vi.mock('@/components/animations/Magnetic', () => ({
  Magnetic: ({ children }: { children: ReactNode }) => children,
}));

vi.mock('framer-motion', () => {
  const motionOnlyProps = new Set([
    'initial',
    'animate',
    'exit',
    'transition',
    'whileInView',
    'viewport',
    'whileHover',
    'whileTap',
  ]);

  const motionProxy = new Proxy(
    {},
    {
      get: (_target, tag) => {
        return ({ children, ...props }: Record<string, unknown>) => {
          const sanitizedProps = Object.fromEntries(
            Object.entries(props).filter(([key]) => !motionOnlyProps.has(key))
          );

          return createElement(tag as string, sanitizedProps, children as ReactNode);
        };
      },
    }
  );

  return {
    motion: motionProxy,
    useScroll: () => ({ scrollYProgress: 0 }),
    useTransform: () => 0,
  };
});

const mockedSaveLead = vi.mocked(saveLead);

describe('HeroSection', () => {
  beforeEach(() => {
    mockedSaveLead.mockReset();
  });

  it('shows success state when saveLead succeeds', async () => {
    mockedSaveLead.mockResolvedValue({
      success: true,
      data: { id: 'lead_123' },
      timestamp: new Date().toISOString(),
    });

    render(<HeroSection initialCountry="US" />);

    fireEvent.change(screen.getByPlaceholderText('Your City'), {
      target: { value: 'Miami' },
    });
    fireEvent.change(screen.getByPlaceholderText('Email Address'), {
      target: { value: 'vip@gettupp.com' },
    });

    fireEvent.click(screen.getByRole('button', { name: /join/i }));

    await waitFor(() => {
      expect(screen.getByText(/SUCCESS\. CHECK YOUR EMAIL\./i)).toBeInTheDocument();
    });
  });

  it('shows an error state when saveLead returns success: false', async () => {
    mockedSaveLead.mockResolvedValue({
      success: false,
      error: 'Lead save failed',
      timestamp: new Date().toISOString(),
    });

    render(<HeroSection initialCountry="US" />);

    fireEvent.change(screen.getByPlaceholderText('Your City'), {
      target: { value: 'Chicago' },
    });
    fireEvent.change(screen.getByPlaceholderText('Email Address'), {
      target: { value: 'vip@gettupp.com' },
    });

    fireEvent.click(screen.getByRole('button', { name: /join/i }));

    await waitFor(() => {
      expect(screen.getByText(/Connection failed\. Please try again\./i)).toBeInTheDocument();
    });

    expect(screen.queryByText(/SUCCESS\. CHECK YOUR EMAIL\./i)).not.toBeInTheDocument();
  });
});
