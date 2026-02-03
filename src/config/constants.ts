/**
 * Centralized Application Constants
 */

export const BRAND_NAME = 'GettUpp ENT';
export const SITE_URL = 'https://gettupp.com';
export const SUPPORT_EMAIL = 'hello@gettupp.com';

export const STRIPE_PRICES = {
  ESSENTIAL: 'price_1SY1yqGfFr3wuAHAQhUzUNr9', // T1
  ELITE: 'price_1SY1yrGfFr3wuAHAoc46u4WB', // T2
  ENTERPRISE: 'price_1SY1yrGfFr3wuAHA7cULY8Ef', // T3
  PILOT: 'price_1SY1yqGfFr3wuAHAqmytgSsj',
} as const;

export const SOCIAL_LINKS = {
  INSTAGRAM: 'https://instagram.com/gettupp',
  TWITTER: 'https://twitter.com/gettupp',
  LINKEDIN: 'https://linkedin.com/company/gettupp',
  YOUTUBE: 'https://youtube.com/@gettupp',
} as const;

export const NAV_ITEMS = [
  { label: 'Arsenal', href: '#arsenal' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'Pilot', href: '#pilot' },
] as const;

export const METADATA_DEFAULTS = {
  title: `${BRAND_NAME} | Premier Nightlife Agency`,
  description: 'Premium Nightlife & Luxury Content Production. Own The Night.',
  metadataBase: new URL(SITE_URL),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: `${BRAND_NAME} | Premier Nightlife Agency`,
    description: 'Premium Nightlife & Luxury Content Production. Own The Night.',
    url: SITE_URL,
    siteName: BRAND_NAME,
    locale: 'en_US',
    type: 'website',
  },
} as const;

export const JSON_LD_DEFAULTS = [
  {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: BRAND_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/logo.png`,
    description: 'Premium Nightlife & Luxury Content Production. Own The Night.',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Minneapolis',
      addressRegion: 'MN',
      addressCountry: 'US',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer service',
      email: SUPPORT_EMAIL,
    },
  },
  {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: BRAND_NAME,
    image: `${SITE_URL}/logo.png`,
    priceRange: '$$$$',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Minneapolis',
      addressRegion: 'MN',
      addressCountry: 'US',
    },
  },
] as const;
