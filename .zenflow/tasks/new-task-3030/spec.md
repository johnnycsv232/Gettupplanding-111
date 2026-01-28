# Technical Specification: GETTUPP ENT Landing Page V3

## 1. Technical Context
- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS (Migration required from CSS Modules)
- **CMS**: Sanity
- **Backend**: Firebase (Auth, Firestore), Stripe (Payments)
- **Animations**: Framer Motion, Three.js (@react-three/fiber)
- **Methodology**: Stitch (Iterative, Component-First)

## 2. Architecture & Directory Structure
We will adopt a modular feature-based architecture.

```
src/
├── app/
│   ├── layout.tsx        # Global layout (Fonts, Providers)
│   ├── page.tsx          # Landing page composition
│   ├── api/              # API Routes (Stripe, Webhooks)
│   └── admin/            # Protected Admin Route
├── components/           # Shared UI Atoms/Molecules
│   ├── ui/               # Buttons, Inputs, Modals
│   ├── three/            # Three.js Canvases & Effects
│   └── layout/           # Headers, Footers
├── features/
│   └── landing/
│       ├── components/   # The 16 specific sections
│       │   ├── HeroSection.tsx
│       │   ├── PilotSection.tsx
│       │   └── ...
│       ├── hooks/        # Landing-specific hooks
│       └── utils/        # Landing-specific logic
├── lib/
│   ├── firebase/         # Firebase Config & Helpers
│   ├── stripe/           # Stripe Config
│   ├── sanity/           # Sanity Config
│   └── styles/           # Shared visual constants (if needed outside Tailwind)
└── styles/               # Global styles (Tailwind directives)
```

## 3. Implementation Approach

### Phase 1: Foundation & Migration (Tailwind Setup)
1.  **Install Tailwind CSS**: Install `tailwindcss`, `postcss`, `autoprefixer`.
2.  **Configure Tailwind**: Create `tailwind.config.ts`.
3.  **Theme Setup**: Map the "Liquid Glass" palette (Vegas Gold, Neon Magenta, Deep Void Black) to Tailwind theme extensions.
4.  **Font Setup**: Configure `next/font` for "Bebas Neue" and "Inter".
5.  **Clean Up**: Remove existing `*.module.css` usage progressively.

### Phase 2: Core Visuals & Shared Components
1.  **Three.js Setup**: Create the `ParticleField` component using `@react-three/fiber`.
2.  **Glassmorphism**: Create utility classes or a wrapper component for the "Liquid Glass" effect (backdrop-blur, border, glow).
3.  **UI Components**: Build `Button` (Primary/Secondary/Ghost), `Card`, `Modal` (for Exit Intent).

### Phase 3: Section Implementation (The 16 Sections)
Build each section as a standalone component in `src/features/landing/components`.
*Note: We will reference the `DESIGN_V2.md` for specific interactions.*

**Section Components:**
1.  **HeroSection**: Video BG + Particles + Lead Input.
2.  **StickyHeader**: Slide-in animation + CTA.
3.  **PilotSection**: Glass card + Tilt.
4.  **ContentAuditSection**: Down-sell logic.
5.  **ProblemSolutionSection**: Text/Layout.
6.  **WhatYouGetSection**: Grid.
7.  **RetainersSection**: Pricing logic + Stripe links.
8.  **GallerySection**: Sanity fetch + Masonry + Liquid transition.
9.  **CinemaGradeSection**: Video UI.
10. **EventsSection**: Logos/List.
11. **TestimonialsSection**: Carousel.
12. **FounderSection**: Parallax.
13. **GettuppGirlsSection**: Brand vertical.
14. **UpgradesSection**: List.
15. **RulesSection**: List.
16. **FinalCTASection**: Particle burst.

**Liquid Transitions & Visual Effects:**
- **Custom Shaders**: The `GallerySection` and `FinalCTASection` may require custom GLSL shaders (via `@react-three/drei`'s `MeshDistortionMaterial` or custom `shaderMaterial`) to achieve "liquid" effects that standard CSS/Framer Motion cannot replicate.
- **SVG Filters**: Use SVG `feTurbulence` and `feDisplacementMap` for organic, liquid-like distortion on text and image hover states.

**Mobile & Touch Optimization:**
- **Tap Targets**: All interactive elements (buttons, inputs, links) MUST have a minimum hit area of 44x44px.
- **Touch States**: Implement specific `:active` or `whileTap` states that provide immediate visual feedback (e.g., Vegas Gold glow pulse) on mobile.
- **Particle Budget**: 
  - Mobile: Max 50 particles.
  - Desktop: 200 particles.

### Phase 4: Integrations & Logic
1.  **Firebase**: Implement `useAuth` hook, `leads` collection writing.
2.  **Stripe**: Implement `checkout` flow and Webhook handler (`/api/webhooks/stripe`).
3.  **Sanity**: Connect `GallerySection` to Sanity Client.
4.  **Exit Intent**: Implement `useExitIntent` hook and the Popup Modal.

## 4. Migration Strategy
- **Tailwind**: We will install Tailwind alongside CSS Modules initially. New components will use Tailwind. Old components will be replaced entirely by the new 16-section structure, so we can delete the old CSS modules as we replace the components.
- **Assets**: We will use placeholders for missing assets initially, then swap them out.
- **Color/Font**: We will switch to the new "Vegas Gold" scheme immediately for consistency.

## 5. Verification
- **Lint**: `npm run lint`
- **Typecheck**: `npm run type-check` (fix script name if needed)
- **Test**: `npm run test` (Vitest)
- **Build**: `npm run build`

## 6. Stitch Methodology
We will use the **Component-First** approach:
1.  Define the Component (Props/Interface).
2.  Implement the Logic/Structure.
3.  Apply Styling (Tailwind).
4.  Add Interactions (Framer/Three).
5.  Verify.

