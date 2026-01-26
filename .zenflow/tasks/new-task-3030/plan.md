# Implementation Plan - GETTUPP ENT Landing Page V3

## Configuration
- **Artifacts Path**: .zenflow/tasks/new-task-3030

---

## Workflow Steps

### [x] Step: Requirements
<!-- chat-id: 4f54bd70-53d3-419a-a64b-cca9470bebc1 -->
Create a Product Requirements Document (PRD).

### [x] Step: Technical Specification
<!-- chat-id: 1093fc4c-9178-43c2-9edb-9e61ab2c2d8f -->
Create a technical specification based on the PRD.

### [x] Step: Phase 1 - Foundation & Tailwind Setup
<!-- chat-id: 9adbbfa2-d0fb-4c18-aa5e-a5ade44f9f65 -->
1.  **Install & Configure Tailwind**:
    - Install `tailwindcss`, `postcss`, `autoprefixer`.
    - Initialize `tailwind.config.ts` and `postcss.config.js`.
    - Define the "Liquid Glass" theme (Colors: Vegas Gold, Neon Magenta; Fonts: Bebas Neue, Inter).
    - Create `src/app/globals.css` with Tailwind directives and remove conflicting CSS modules.
2.  **Verify Setup**:
    - Create a test page/component to verify Tailwind styles are applying.
    - Run `npm run dev` and check for errors.

### [ ] Step: Phase 2 - Shared Core Components
<!-- chat-id: 918c8313-e78e-458b-968e-19065bdeeb4b -->
1.  **UI Primitives**:
    - Create `src/components/ui/Button.tsx` (Liquid Glass style).
    - Create `src/components/ui/GlassCard.tsx` (Backdrop blur + borders).
    - Create `src/components/ui/Modal.tsx` (For Exit Intent).
2.  **Three.js Setup**:
    - Implement `src/components/three/ParticleField.tsx` using `@react-three/fiber`.
    - Ensure it handles mouse interaction/parallax.

### [ ] Step: Phase 3 - Sections Group A (Header & Hero)
1.  **Sticky Header**: Implement `src/features/landing/components/StickyHeader.tsx` with slide-in CTA.
2.  **Hero Section**: Implement `src/features/landing/components/HeroSection.tsx`.
    - Video background + Particle Field overlay.
    - Lead Gen Input (Email).
3.  **Exit Intent**: Implement `useExitIntent` hook and integrate the "Velvet Rope" popup.

### [ ] Step: Phase 4 - Sections Group B (Offer & Pricing)
1.  **Pilot & Audit**: Implement `PilotSection.tsx` and `ContentAuditSection.tsx`.
2.  **Problem & Solution**: Implement `ProblemSolutionSection.tsx` and `WhatYouGetSection.tsx`.
3.  **Retainers (Pricing)**: Implement `RetainersSection.tsx`.
    - 3-column layout with "Growth" highlight.
    - Integrate Stripe Payment Links (placeholders for now).

### [ ] Step: Phase 5 - Sections Group C (Visuals & Social Proof)
1.  **Gallery**: Implement `GallerySection.tsx`.
    - Setup Sanity Client fetch (mock data if Sanity not ready).
    - Implement Masonry Grid with Framer Motion liquid transitions.
2.  **Cinema & Events**: Implement `CinemaGradeSection.tsx` and `EventsSection.tsx`.
3.  **Testimonials & Founder**: Implement `TestimonialsSection.tsx` and `FounderSection.tsx`.

### [ ] Step: Phase 6 - Sections Group D (Closing & Footer)
1.  **Brand Verticals**: Implement `GettuppGirlsSection.tsx`, `UpgradesSection.tsx`, `RulesSection.tsx`.
2.  **Final CTA & Footer**: Implement `FinalCTASection.tsx` (with Particles) and `Footer.tsx`.

### [ ] Step: Phase 7 - Page Assembly & Integrations
1.  **Assemble Page**: Update `src/app/page.tsx` to include all 16 sections in order.
2.  **Firebase Integration**:
    - Create `src/lib/firebase/client.ts`.
    - Connect Hero Input and Exit Intent Popup to Firestore `leads` collection.
3.  **Stripe Webhook**:
    - Create `src/app/api/webhooks/stripe/route.ts` to handle payment success events.

### [ ] Step: Phase 8 - Admin Dashboard
1.  **Admin Route**: Create `src/app/admin/page.tsx`.
    - Protect with Firebase Auth (allow-list).
    - Display Leads table and Booking status.

### [ ] Step: Final Verification
1.  **Lint & Typecheck**: Run `npm run lint` and `npm run type-check`.
2.  **Test**: Run `npm run test` (if applicable).
3.  **Build**: Run `npm run build` to ensure no build errors.

