import type { Metadata } from 'next';
import { Outfit, Inter, Bebas_Neue } from 'next/font/google';
import './globals.css';
import JsonLd from '@/components/seo/JsonLd';

const outfit = Outfit({
  variable: '--font-outfit',
  subsets: ['latin'],
  weight: ['400', '900'],
});

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  weight: ['400', '700', '900'],
});

const bebasNeue = Bebas_Neue({
  variable: '--font-bebas-neue',
  subsets: ['latin'],
  weight: ['400'],
});

export const metadata: Metadata = {
  title: 'GETTUPP ENT | Elite Nightlife & Luxury Design',
  description: 'Liquid Glass Premium Nightlife Luxury. Own The Night.',
  metadataBase: new URL('https://gettupp.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'GETTUPP ENT | Elite Nightlife & Luxury Design',
    description: 'Liquid Glass Premium Nightlife Luxury. Own The Night.',
    url: 'https://gettupp.com',
    siteName: 'GETTUPP ENT',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'GETTUPP ENT | Elite Nightlife & Luxury Design',
    description: 'Liquid Glass Premium Nightlife Luxury. Own The Night.',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'GETTUPP ENT',
    url: 'https://gettupp.com',
    logo: 'https://gettupp.com/logo.png',
    description: 'Liquid Glass Premium Nightlife Luxury. Own The Night.',
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
  };

  return (
    <html lang="en" className={`${outfit.variable} ${inter.variable} ${bebasNeue.variable}`}>
      <body className="bg-deep-void-black font-sans text-off-white antialiased selection:bg-neon-magenta selection:text-white">
        <JsonLd data={jsonLd} />
        {children}
      </body>
    </html>
  );
}
