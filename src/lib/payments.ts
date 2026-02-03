/**
 * Zenith Payment Localization Utility
 */

export const getLocalizedPaymentMethods = (country: string | null) => {
  const defaultMethods = ['card'];

  if (!country) return defaultMethods;

  const regionalMethods: Record<string, string[]> = {
    ES: ['card', 'sepa_debit', 'ideal'],
    NL: ['card', 'ideal'],
    DE: ['card', 'sepa_debit', 'giropay'],
    GB: ['card', 'bacs_debit'],
    US: ['card', 'cashapp', 'link'],
  };

  return regionalMethods[country] || defaultMethods;
};

export const getCurrencyForCountry = (country: string | null) => {
  const euroZone = ['ES', 'NL', 'DE', 'FR', 'IT', 'IE'];
  if (country && euroZone.includes(country)) return 'eur';
  if (country === 'GB') return 'gbp';
  return 'usd';
};
