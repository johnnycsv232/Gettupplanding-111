import { GettUppNavbar } from '@/features/landing/components/GettuppNavbar';
import { HeroSection } from '@/features/landing/components/HeroSection';
import { PilotSection } from '@/features/landing/components/PilotSection';
import { ContentAuditSection } from '@/features/landing/components/ContentAuditSection';
import { ProblemSolutionSection } from '@/features/landing/components/ProblemSolutionSection';
import { WhatYouGetSection } from '@/features/landing/components/WhatYouGetSection';
import { RetainersSection } from '@/features/landing/components/RetainersSection';
import { GallerySection } from '@/features/landing/components/GallerySection';
import { CinematicRevealSection } from '@/features/landing/components/CinematicRevealSection';
import { EventsSection } from '@/features/landing/components/EventsSection';
import { TestimonialsSection } from '@/features/landing/components/TestimonialsSection';
import { FounderSection } from '@/features/landing/components/FounderSection';
import { GettuppGirlsSection } from '@/features/landing/components/GettuppGirlsSection';
import { UpgradesSection } from '@/features/landing/components/UpgradesSection';
import { RulesSection } from '@/features/landing/components/RulesSection';
import { FinalCTASection } from '@/features/landing/components/FinalCTASection';
import { Footer } from '@/features/landing/components/Footer';
import { ExitIntentPopup } from '@/features/landing/components/ExitIntentPopup';
import { GettUppAgent } from '@/features/leads/components/GettUppAgent';
import { KineticCanvas } from '@/features/landing/components/KineticCanvas';

import { headers } from 'next/headers';

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
