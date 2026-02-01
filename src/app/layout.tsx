import type { Metadata } from 'next';
import { Orbitron, Inter, DM_Serif_Display } from 'next/font/google';
import './globals.css';
import JsonLd from '@/components/seo/JsonLd';
import NoiseOverlay from '@/components/ui/NoiseOverlay';
import CustomCursor from '@/components/ui/CustomCursor';
import Preloader from '@/components/ui/Preloader';

const orbitron = Orbitron({
  variable: '--font-orbitron',
  subsets: ['latin'],
  weight: ['400', '700', '900'],
});

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  weight: ['400', '500', '700', '900'],
});

const dmSerif = DM_Serif_Display({
  variable: '--font-dm-serif',
  subsets: ['latin'],
  weight: ['400'],
});

export const metadata: Metadata = {
  title: 'GettUpp ENT | Premier Nightlife Agency',
  description: 'Premium Nightlife & Luxury Content Production. Own The Night.',
  metadataBase: new URL('https://gettupp.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'GettUpp ENT | Premier Nightlife Agency',
    description: 'Premium Nightlife & Luxury Content Production. Own The Night.',
    url: 'https://gettupp.com',
    siteName: 'GettUpp ENT',
    locale: 'en_US',
    type: 'website',
  },
};

import SmoothScroll from '@/components/ui/SmoothScroll';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'GettUpp ENT',
      url: 'https://gettupp.com',
      logo: 'https://gettupp.com/logo.png',
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
        email: 'hello@gettupp.com',
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'ProfessionalService',
      name: 'GettUpp ENT',
      image: 'https://gettupp.com/logo.png',
      priceRange: '$$$$',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Minneapolis',
        addressRegion: 'MN',
        addressCountry: 'US',
      },
    },
  ];

  return (
    <html lang="en" className={`${orbitron.variable} ${inter.variable} ${dmSerif.variable}`}>
      <body className="bg-deep-void font-sans text-off-white antialiased selection:bg-neon-magenta selection:text-white">
        <SmoothScroll>
          <Preloader />
          <NoiseOverlay />
          <CustomCursor />
          <JsonLd data={jsonLd} />
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
