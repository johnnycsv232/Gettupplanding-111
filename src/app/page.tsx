import StickyHeader from '@/features/landing/components/StickyHeader';
import HeroSection from '@/features/landing/components/HeroSection';
import PilotSection from '@/features/landing/components/PilotSection';
import ContentAuditSection from '@/features/landing/components/ContentAuditSection';
import ProblemSolutionSection from '@/features/landing/components/ProblemSolutionSection';
import WhatYouGetSection from '@/features/landing/components/WhatYouGetSection';
import RetainersSection from '@/features/landing/components/RetainersSection';
import GallerySection from '@/features/landing/components/GallerySection';
import CinemaGradeSection from '@/features/landing/components/CinemaGradeSection';
import EventsSection from '@/features/landing/components/EventsSection';
import TestimonialsSection from '@/features/landing/components/TestimonialsSection';
import FounderSection from '@/features/landing/components/FounderSection';
import GettuppGirlsSection from '@/features/landing/components/GettuppGirlsSection';
import UpgradesSection from '@/features/landing/components/UpgradesSection';
import RulesSection from '@/features/landing/components/RulesSection';
import FinalCTASection from '@/features/landing/components/FinalCTASection';
import Footer from '@/features/landing/components/Footer';
import ExitIntentPopup from '@/features/landing/components/ExitIntentPopup';

export default function Home() {
  return (
    <main className="bg-deep-void-black min-h-screen text-off-white selection:bg-neon-magenta selection:text-white">
      <StickyHeader />
      <HeroSection />
      <PilotSection />
      <ContentAuditSection />
      <ProblemSolutionSection />
      <WhatYouGetSection />
      <RetainersSection />
      <GallerySection />
      <CinemaGradeSection />
      <EventsSection />
      <TestimonialsSection />
      <FounderSection />
      <GettuppGirlsSection />
      <UpgradesSection />
      <RulesSection />
      <FinalCTASection />
      <Footer />
      <ExitIntentPopup />
    </main>
  );
}
