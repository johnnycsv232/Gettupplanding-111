import { headers } from 'next/headers';

import { ContentAuditSection } from '@/features/landing/components/ContentAuditSection';
import { ExitIntentPopup } from '@/features/landing/components/ExitIntentPopup';
import { FinalCTASection } from '@/features/landing/components/FinalCTASection';
import { Footer } from '@/features/landing/components/Footer';
import { FounderSection } from '@/features/landing/components/FounderSection';
import { HeroSection } from '@/features/landing/components/HeroSection';
import { PilotSection } from '@/features/landing/components/PilotSection';
import { RetainersSection } from '@/features/landing/components/RetainersSection';
import { StickyHeader } from '@/features/landing/components/StickyHeader';
import { TestimonialsSection } from '@/features/landing/components/TestimonialsSection';
import { WhatYouGetSection } from '@/features/landing/components/WhatYouGetSection';
import { GettUppAgent } from '@/features/leads/components/GettUppAgent';

export default async function Home() {
  const headersList = await headers();
  const city = headersList.get('x-city') || 'Your City';
  const country = headersList.get('x-country') || 'US';

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'VideoObject',
    name: 'GettUpp Zenith Experience',
    description: 'Transform your content with the Zenith elite ecosystem.',
    thumbnailUrl: 'https://gettupp-enterprise.vercel.app/thumbnail.jpg',
    uploadDate: '2026-02-05T00:00:00Z',
    contentUrl: 'https://gettupp-enterprise.vercel.app/videos/hero.mp4',
  };

  return (
    <main className="min-h-screen bg-deep-void text-off-white selection:bg-neon-magenta selection:text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <StickyHeader />
      <HeroSection initialCity={city} initialCountry={country} />
      <ContentAuditSection />
      <WhatYouGetSection />
      <PilotSection />
      <RetainersSection />
      <TestimonialsSection />
      <FounderSection />
      <FinalCTASection />
      <Footer />
      <ExitIntentPopup />
      <GettUppAgent initialCity={city} initialCountry={country} />
    </main>
  );
}
