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

### [x] Step: Phase 2 - Shared Core Components
<!-- chat-id: 918c8313-e78e-458b-968e-19065bdeeb4b -->
1.  **UI Primitives**:
    - [x] Create `src/components/ui/Button.tsx` (Liquid Glass style).
    - [x] Create `src/components/ui/GlassCard.tsx` (Backdrop blur + borders).
    - [x] Create `src/components/ui/Modal.tsx` (For Exit Intent).
2.  **Three.js Setup**:
    - [x] Implement `src/components/three/ParticleField.tsx` using `@react-three/fiber`.
    - [x] Ensure it handles mouse interaction/parallax.

### [x] Step: Phase 3 - Sections Group A (Header & Hero)
1.  **Sticky Header**: [x] Implement `src/features/landing/components/StickyHeader.tsx` with slide-in CTA.
2.  **Hero Section**: [x] Implement `src/features/landing/components/HeroSection.tsx`.
    - [x] Video background + Particle Field overlay.
    - [x] Lead Gen Input (Email).
3.  **Exit Intent**: [x] Implement `useExitIntent` hook and integrate the "Velvet Rope" popup.

### [x] Step: Phase 4 - Sections Group B (Offer & Pricing)
<!-- chat-id: b6c2d70c-7b31-4935-8a40-f665063cc4d2 -->
1.  **Pilot & Audit**: [x] Implement `PilotSection.tsx` and `ContentAuditSection.tsx`.
2.  **Problem & Solution**: [x] Implement `ProblemSolutionSection.tsx` and `WhatYouGetSection.tsx`.
3.  **Retainers (Pricing)**: [x] Implement `RetainersSection.tsx`.
    - [x] 3-column layout with "Growth" highlight.
    - [x] Integrate Stripe Payment Links (placeholders for now).

### [x] Step: Phase 5 - Sections Group C (Visuals & Social Proof)
<!-- chat-id: c14e62b9-537f-43da-9c34-ca5ebfea85b4 -->
1.  **Gallery**: [x] Implement `GallerySection.tsx`.
    - [x] Setup Sanity Client fetch (mock data if Sanity not ready).
    - [x] Implement Masonry Grid with Framer Motion liquid transitions.
2.  **Cinema & Events**: [x] Implement `CinemaGradeSection.tsx` and `EventsSection.tsx`.
3.  **Testimonials & Founder**: [x] Implement `TestimonialsSection.tsx` and `FounderSection.tsx`.

### [x] Step: Phase 6 - Sections Group D (Closing & Footer)
<!-- chat-id: d339bada-9038-4123-a3d0-68e4a80ae20e -->
1.  **Brand Verticals**: [x] Implement `GettuppGirlsSection.tsx`, `UpgradesSection.tsx`, `RulesSection.tsx`.
2.  **Final CTA & Footer**: [x] Implement `FinalCTASection.tsx` (with Particles) and `Footer.tsx`.

### [x] Step: Phase 7 - Page Assembly & Integrations
<!-- chat-id: e4ff6d93-94e0-4353-a86b-95582d4637c3 -->
1.  **Assemble Page**: [x] Update `src/app/page.tsx` to include all 16 sections in order.
2.  **Firebase Integration**:
    - [x] Create `src/lib/firebase/client.ts` (using existing `src/lib/firebase.ts`).
    - [x] Connect Hero Input and Exit Intent Popup to Firestore `leads` collection.
3.  **Stripe Webhook**:
    - [x] Create `src/app/api/webhooks/stripe/route.ts` to handle payment success events.

### [x] Step: Phase 8 - Admin Dashboard
<!-- chat-id: 2ec64888-4d75-4c5a-82b7-e3cb8532da62 -->
1.  **Admin Route**: [x] Create `src/app/admin/page.tsx`.
    - [x] Protect with Firebase Auth (allow-list).
    - [x] Display Leads table and Booking status.

### [x] Step: Final Verification
<!-- chat-id: 21e4296e-65aa-433e-a783-e607e41c0467 -->
1.  **Lint & Typecheck**: Run `npm run lint` and `npm run type-check`.
2.  **Test**: Run `npm run test` (if applicable).
3.  **Build**: Run `npm run build` to ensure no build errors.

### [x] Step: Resolve Merge Issues
1.  **Fix Long Paths**: Enabled `core.longpaths` to fix Windows filename length errors.
2.  **Final Polish**: Staged and committed pending UI/accessibility improvements.
3.  **Push**: Pushed all changes to origin.

