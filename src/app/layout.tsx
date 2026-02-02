import type { Metadata } from 'next';
import { Orbitron, Inter } from 'next/font/google';
import './globals.css';
import { Providers } from '@/lib/providers';
import { BaseLayout } from '@/layouts/BaseLayout';
import JsonLd from '@/components/seo/JsonLd';
import { METADATA_DEFAULTS, JSON_LD_DEFAULTS } from '@/config/constants';
import { headers } from 'next/headers';

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

export const metadata: Metadata = METADATA_DEFAULTS;

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const headersList = await headers();
  const country = headersList.get('x-vercel-ip-country');

  // Detect language based on country
  const locale = country === 'ES' || country === 'MX' ? 'es' : 'en';

  return (
    <html lang={locale} className={`${inter.variable} ${orbitron.variable} dark`}>
      <body className="bg-deep-void text-white antialiased selection:bg-vegas-gold selection:text-black">
        <Providers initialLocale={locale}>
          <BaseLayout>{children}</BaseLayout>
        </Providers>
        <JsonLd data={JSON_LD_DEFAULTS as any} />
      </body>
    </html>
  );
}

