import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import type { ReactNode } from 'react';
import { describe, expect, it, vi, beforeEach } from 'vitest';

import { ExitIntentPopup } from '@/features/landing/components/ExitIntentPopup';
import { useExitIntent } from '@/hooks/useExitIntent';

const submitLeadActionMock = vi.fn();
const closeExitIntentMock = vi.fn();

vi.mock('@/app/actions', () => ({
  submitLeadAction: (formData: FormData) => submitLeadActionMock(formData),
}));

vi.mock('@/hooks/useExitIntent', () => ({
  useExitIntent: vi.fn(),
}));

vi.mock('@/components/ui', () => ({
  Modal: ({
    isOpen,
    children,
  }: {
    isOpen: boolean;
    children: ReactNode;
  }) => (isOpen ? <div data-testid="exit-intent-modal">{children}</div> : null),
  Button: ({
    children,
    type = 'button',
    isLoading = false,
    disabled = false,
    ...props
  }: {
    children: ReactNode;
    type?: 'button' | 'submit' | 'reset';
    variant?: string;
    isLoading?: boolean;
    disabled?: boolean;
  }) => (
    <button type={type} disabled={disabled || isLoading} {...props}>
      {children}
    </button>
  ),
}));

const mockedUseExitIntent = vi.mocked(useExitIntent);

describe('ExitIntentPopup', () => {
  beforeEach(() => {
    submitLeadActionMock.mockReset();
    closeExitIntentMock.mockReset();
    mockedUseExitIntent.mockReturnValue({
      showExitIntent: true,
      closeExitIntent: closeExitIntentMock,
    });
  });

  it('does not forward non-DOM isLoading prop to button elements', async () => {
    submitLeadActionMock.mockResolvedValue({ success: true });

    const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => undefined);

    render(<ExitIntentPopup />);

    fireEvent.change(screen.getByPlaceholderText('Enter your email'), {
      target: { value: 'vip@gettupp.com' },
    });
    fireEvent.click(screen.getByRole('button', { name: /get vip access/i }));

    await waitFor(() => {
      expect(screen.getByText(/ACCESS GRANTED\./i)).toBeInTheDocument();
    });

    const errorOutput = consoleErrorSpy.mock.calls
      .flatMap((call) => call.map((entry) => String(entry)))
      .join('\n');

    expect(errorOutput).not.toContain('isLoading');

    consoleErrorSpy.mockRestore();
  });

  it('renders success state when submitLeadAction succeeds', async () => {
    submitLeadActionMock.mockResolvedValue({ success: true });

    render(<ExitIntentPopup />);

    fireEvent.change(screen.getByPlaceholderText('Enter your email'), {
      target: { value: 'vip@gettupp.com' },
    });
    fireEvent.click(screen.getByRole('button', { name: /get vip access/i }));

    await waitFor(() => {
      expect(screen.getByText(/ACCESS GRANTED\./i)).toBeInTheDocument();
    });
  });

  it('shows the returned error when submitLeadAction fails', async () => {
    submitLeadActionMock.mockResolvedValue({ success: false, error: 'Invalid email' });

    render(<ExitIntentPopup />);

    fireEvent.change(screen.getByPlaceholderText('Enter your email'), {
      target: { value: 'vip@gettupp.com' },
    });
    fireEvent.click(screen.getByRole('button', { name: /get vip access/i }));

    await waitFor(() => {
      expect(screen.getByText(/Invalid email/i)).toBeInTheDocument();
    });
  });

  it('shows generic error when submitLeadAction throws', async () => {
    submitLeadActionMock.mockRejectedValue(new Error('Network failure'));

    render(<ExitIntentPopup />);

    fireEvent.change(screen.getByPlaceholderText('Enter your email'), {
      target: { value: 'vip@gettupp.com' },
    });
    fireEvent.click(screen.getByRole('button', { name: /get vip access/i }));

    await waitFor(() => {
      expect(screen.getByText(/Something went wrong/i)).toBeInTheDocument();
    });
  });
});
