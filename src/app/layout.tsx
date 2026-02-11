import type { Metadata } from 'next';
import { Orbitron, Manrope, Cormorant_Garamond } from 'next/font/google';
import { headers } from 'next/headers';
import './globals.css';

import { ScriptManager } from '@/components/core/ScriptManager';
import { HydrationOverlay } from '@/components/debug/HydrationOverlay';
import JsonLd from '@/components/seo/JsonLd';
import { METADATA_DEFAULTS, JSON_LD_DEFAULTS } from '@/config/constants';
import { BaseLayout } from '@/layouts/BaseLayout';
import { env } from '@/lib/env';
import { Providers } from '@/lib/providers';

const orbitron = Orbitron({
  variable: '--font-orbitron',
  subsets: ['latin'],
  weight: ['400', '700', '900'],
});

const manrope = Manrope({
  variable: '--font-manrope',
  subsets: ['latin'],
  weight: ['400', '500', '700', '800'],
});

const cormorant = Cormorant_Garamond({
  variable: '--font-cormorant',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
});

export const metadata: Metadata = METADATA_DEFAULTS;

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const headersList = await headers();
  const country = headersList.get('x-vercel-ip-country');
  const nonce = headersList.get('x-nonce') || '';

  // Detect language based on country
  const locale = country === 'ES' || country === 'MX' ? 'es' : 'en';

  return (
    <html
      lang={locale}
      className={`${manrope.variable} ${orbitron.variable} ${cormorant.variable} dark`}
      suppressHydrationWarning
    >
      <body className="bg-deep-void text-white antialiased" suppressHydrationWarning>
        <Providers initialLocale={locale}>
          <BaseLayout>{children}</BaseLayout>
        </Providers>
        <JsonLd data={JSON_LD_DEFAULTS as unknown as Record<string, unknown>[]} />
        <ScriptManager nonce={nonce} />
        {env.NODE_ENV === 'development' && <HydrationOverlay />}
      </body>
    </html>
  );
}
