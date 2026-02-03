import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

import { NoiseOverlay } from '@/components/ui/NoiseOverlay';

describe('NoiseOverlay', () => {
  it('renders without crashing', () => {
    const { container } = render(<NoiseOverlay />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it('has correct styles', () => {
    const { container } = render(<NoiseOverlay />);
    const div = container.firstChild as HTMLElement;
    expect(div).toHaveClass('pointer-events-none');
    expect(div).toHaveClass('fixed');
    expect(div).toHaveClass('inset-0');
    expect(div).toHaveClass('z-[9999]');
    expect(div).toHaveClass('opacity-[0.03]');
  });
});
