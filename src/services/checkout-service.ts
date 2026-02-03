import { Routes } from '@/config/routes';
import { getFirebaseAuth } from '@/lib/firebase';

export interface CheckoutParams {
  priceId: string;
  tier: string;
  mode: 'payment' | 'subscription';
  successUrl?: string; // Optional override
  cancelUrl?: string; // Optional override
}

export interface CheckoutResult {
  success: boolean;
  url?: string;
  error?: string;
}

class CheckoutService {
  private static instance: CheckoutService;

  private constructor() {}

  public static getInstance(): CheckoutService {
    if (!CheckoutService.instance) {
      CheckoutService.instance = new CheckoutService();
    }
    return CheckoutService.instance;
  }

  /**
   * Initiates a checkout session with the backend.
   * Redirects the user to the returned Checkout URL on success.
   */
  public async redirectToCheckout(priceIdOrParams: string | CheckoutParams): Promise<void> {
    try {
      const params =
        typeof priceIdOrParams === 'string'
          ? { priceId: priceIdOrParams, tier: 'unknown', mode: 'payment' as const }
          : priceIdOrParams;

      const auth = getFirebaseAuth();
      const user = auth.currentUser;

      if (!user) {
        // In a real app, maybe redirect to login with a 'next' param
        console.warn('User not signed in. Redirecting to login...');
        // For now, throw to be handled by UI
        throw new Error('Please sign in to continue.');
      }

      const idToken = await user.getIdToken();

      const response = await fetch(Routes.api.checkout, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${idToken}`,
        },
        body: JSON.stringify(params),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || 'Failed to initiate checkout.');
      }

      const data = await response.json();

      if (data.url) {
        window.location.href = data.url;
      } else {
        throw new Error('Received invalid response from server (no URL).');
      }
    } catch (error) {
      console.error('Checkout Service Error:', error);
      throw error; // Re-throw so component can show a toast/alert
    }
  }
}

export const checkoutService = CheckoutService.getInstance();
