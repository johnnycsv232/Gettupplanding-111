import { headers } from 'next/headers';

import { CinematicRevealSection } from '@/features/landing/components/CinematicRevealSection';
import { ContentAuditSection } from '@/features/landing/components/ContentAuditSection';
import { EventsSection } from '@/features/landing/components/EventsSection';
import { ExitIntentPopup } from '@/features/landing/components/ExitIntentPopup';
import { FinalCTASection } from '@/features/landing/components/FinalCTASection';
import { Footer } from '@/features/landing/components/Footer';
import { FounderSection } from '@/features/landing/components/FounderSection';
import { GallerySection } from '@/features/landing/components/GallerySection';
import { GettuppGirlsSection } from '@/features/landing/components/GettuppGirlsSection';
import { GettUppNavbar } from '@/features/landing/components/GettuppNavbar';
import { HeroSection } from '@/features/landing/components/HeroSection';
import { KineticCanvas } from '@/features/landing/components/KineticCanvas';
import { PilotSection } from '@/features/landing/components/PilotSection';
import { ProblemSolutionSection } from '@/features/landing/components/ProblemSolutionSection';
import { RetainersSection } from '@/features/landing/components/RetainersSection';
import { RulesSection } from '@/features/landing/components/RulesSection';
import { TestimonialsSection } from '@/features/landing/components/TestimonialsSection';
import { UpgradesSection } from '@/features/landing/components/UpgradesSection';
import { WhatYouGetSection } from '@/features/landing/components/WhatYouGetSection';
import { GettUppAgent } from '@/features/leads/components/GettUppAgent';

export default async function Home() {
  const headersList = await headers();
  const city = headersList.get('x-city') || 'Your City';
  const country = headersList.get('x-country') || 'US';

  return (
    <main className="min-h-screen bg-deep-void text-off-white selection:bg-neon-magenta selection:text-white">
      <GettUppNavbar />
      <HeroSection initialCity={city} initialCountry={country} />
      <CinematicRevealSection />
      <PilotSection />
      <ContentAuditSection />
      <ProblemSolutionSection />
      <WhatYouGetSection />
      <KineticCanvas />
      <RetainersSection />
      <GallerySection />
      <EventsSection />
      <TestimonialsSection />
      <FounderSection />
      <GettuppGirlsSection />
      <UpgradesSection />
      <RulesSection />
      <FinalCTASection />
      <Footer />
      <ExitIntentPopup />
      <GettUppAgent initialCity={city} initialCountry={country} />
    </main>
  );
}
