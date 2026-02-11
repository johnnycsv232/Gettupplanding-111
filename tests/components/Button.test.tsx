import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Button } from '@/components/ui';

describe('Button', () => {
  it('uses a valid high-contrast text color for primary variant', () => {
    render(<Button variant="primary">Reserve Pilot</Button>);

    const button = screen.getByRole('button', { name: /reserve pilot/i });

    expect(button.className).toContain('text-black');
    expect(button.className).not.toContain('text-deep-void-black');
  });
});
