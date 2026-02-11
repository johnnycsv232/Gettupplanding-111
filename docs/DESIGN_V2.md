# GETTUPP ENT: Elite Designer Specification (DESIGN_V2.md)

**Target Aesthetic:** **"Liquid Glass Premium Nightlife Luxury 2.0"**

This design is an evolution of the initial concept, pushing the aesthetic to a higher level of sophistication and dynamic interaction. The goal is a stunning, high-performance site that feels exclusive, high-end, and immediately trustworthy.

## 1. Color Palette & Typography

| Element | Color/Font | Hex Code | Notes |
| :--- | :--- | :--- | :--- |
| **Primary Accent** (CTAs, Highlight) | **Vegas Gold** | `#FFC72C` | Brighter, more saturated gold for maximum contrast and conversion focus. |
| **Secondary Accent** (Brand Vertical) | **Neon Magenta** | `#FF00FF` | Used for the "GETTUPP GIRLS" section and subtle, pulsing glow effects. |
| **Tertiary Accent** (Post-Production) | **Electric Cyan** | `#00FFFF` | Used for the "CINEMA GRADE" section and video player UI. |
| **Background** | **Deep Void Black** | `#080808` | Near-black for maximum contrast with neon and gold. |
| **Headlines** | **Bebas Neue / Inter Black** | White/Vegas Gold | Bold, all-caps. Use a subtle, animated gold gradient on key headlines (e.g., "OWN THE NIGHT"). |
| **Body Text** | **Inter Regular** | `#E0E0E0` (Off-White) | Highly readable, clean sans-serif. |

## 2. Key Visual Components & Interactions (The "Liquid Glass" Effect)

The core design principle is **Glassmorphism** combined with **Dynamic Lighting**.

| Section | Visual Requirement | Interaction / Animation (Framer Motion / Three.js) |
| :--- | :--- | :--- |
| **Sticky Header** | Minimalist, transparent header that becomes solid on scroll. | **Sticky CTA:** The "START THE PILOT" button must be visible in the header and slide in/out on scroll. |
| **HERO** | Looping video background with a **Radial Gradient Overlay** (Deep Void Black to transparent) to focus attention on the center. | **Three.js Particle Field:** A subtle, slow-moving field of Vegas Gold particles that react slightly to mouse movement (parallax). |
| **THE PILOT** | **Glassmorphism Card:** Frosted glass effect with a **Neon Magenta** inner shadow/glow. The "VIP ACCESS" text should have a slight, pulsing neon effect. | **Tilt Effect:** The card should have a more pronounced 3D tilt on hover, with the inner glow intensifying. |
| **FULL RETAINERS** | **Pricing Cards:** Dark, floating cards with a thin, animated **Vegas Gold** border that subtly "breathes." The **GROWTH** card is larger, with a persistent, soft gold glow. | **Hover Scale:** Cards scale up slightly on hover. Clicking a CTA triggers a smooth scroll to the checkout section. |
| **THE WORK (Gallery)** | **Masonry Grid:** Images should be framed in a dark, metallic border. | **Liquid Transition:** On filter change (ALL/VIDEO/PHOTO), the grid items should transition with a smooth, liquid-like distortion effect. |
| **FINAL CTA** | Full-width section with a massive, bold headline. | **Three.js Particle Burst:** The particle field from the Hero section should return, but with a more intense, swirling motion, culminating in the final CTA button. |

## 3. High-Conversion Architecture & UX

1.  **Email Collection Popup (The "Velvet Rope"):**
    *   **Trigger:** Exit-Intent (user moves mouse out of viewport) **AND** Time-Delayed (45 seconds).
    *   **Aesthetic:** Full-screen modal with a dark, blurred background and a central, glowing **Vegas Gold** form.
    *   **Copy:** "THE NIGHT ISN'T OVER. Join the VIP List for exclusive content, early access, and a free 5-point audit delivered instantly."
    *   **Functionality:** Must integrate with Firebase/Firestore.
2.  **Social Media Integration:**
    *   **Sticky Clickables:** A small, vertical bar of social icons (IG, TikTok) must float on the left side of the screen, subtly glowing.
    *   **Feed Embed:** The "THE WORK" section should have a subtle, live-updating feed preview (if possible, otherwise a static link).
3.  **SEO & Performance:**
    *   **Next.js Optimization:** Implement Next.js Image component for all assets, use server-side rendering (SSR) for the main content, and ensure all dynamic content (Sanity) is pre-fetched.
    *   **Core Web Vitals:** Target a perfect 100 Lighthouse score for Performance. The Hero video must be muted, autoplaying, and lazy-loaded to prevent blocking the main thread.

---
# GETTUPP ENT: Master Coding Prompt V2 (BUILD_V2.md)

**Goal:** Implement the GETTUPP ENT website as a high-performance, visually stunning, full-stack application using the specified technologies and the **Stitch Agent Skill** for component-based, iterative development.

## 1. Project Setup & Tech Stack

| Component | Technology | Purpose | Notes |
| :--- | :--- | :--- | :--- |
| **Framework** | Next.js 16, React 19, TypeScript | Frontend & API Routes | Use App Router structure. |
| **Styling** | Tailwind CSS, CSS Modules | Utility-first styling | Implement the custom color palette as Tailwind variables. |
| **Hosting** | Vercel | Deployment | Configure environment variables for all services. |
| **Backend/Auth** | Firebase (Auth, Firestore) | User Authentication, Lead Storage | Implement whitelisted email login for `/admin`. Store email leads in Firestore. |
| **CMS** | Sanity | Gallery/Portfolio Data | Fetch and manage content for "THE WORK" section. |
| **Payments** | Stripe | Checkout & Subscriptions | Integrate Stripe Checkout for Pilot ($345) and Retainer Subscriptions ($495/$695/$995). Use Webhooks for post-payment fulfillment logic. |
| **Scheduling** | Cal.com | Booking Embed | Embed the Cal.com scheduling widget for post-Pilot booking. |
| **Visuals** | **Three.js (via react-three-fiber)**, **Framer Motion** | Advanced Animations | Use `react-three-fiber` for the particle effects. Use Framer Motion for all component-level interactions (tilts, scales, liquid transitions). |

## 2. Core Logic & Data Flow

1.  **Stripe Integration:**
    *   Confirm Stripe Products for: `Pilot ($345)`, `Content Audit ($300)`, `Essential Retainer ($495/mo)`, `Growth Retainer ($695/mo)`, `Dominate Retainer ($995/mo)`.
    *   Implement a Stripe Webhook handler in a Next.js API route (`/api/stripe-webhook`) to process successful payments and update Firebase/Firestore records.
2.  **Booking Flow:**
    *   **Pilot/Audit CTAs:** Link directly to Stripe Checkout.
    *   **Dominate CTA:** Link to a contact form that triggers a Cal.com booking link via email.
3.  **Lead Generation:**
    *   The Hero section input and the Exit-Intent Popup must submit data to a dedicated Firebase Firestore collection (`leads`). Implement server-side validation.

## 3. Component Breakdown (16 Sections)

Build the following sections as distinct, reusable React components, strictly adhering to the `DESIGN_V2.md` specifications:

1.  **`HeroSection`**: Dynamic video background, Three.js particle field, lead-gen city input.
2.  **`PilotSection`**: Glassmorphism card, high-contrast CTA.
3.  **`ContentAuditSection`**: Subtle down-sell CTA.
4.  **`ProblemSolutionSection`**: Combined emotional hook and value proposition.
5.  **`WhatYouGetSection`**: Icon-grid of benefits with subtle hover effects.
6.  **`RetainersSection`**: 3-column pricing with Framer Motion tilt and gold glow.
7.  **`GallerySection`**: Sanity-powered Masonry grid with liquid filter transitions.
8.  **`CinemaGradeSection`**: Video player mockup with Electric Cyan accents.
9.  **`EventsSection`**: Authority building with logos and event details.
10. **`TestimonialsSection`**: Card carousel with platform-specific UI.
11. **`FounderSection`**: Asymmetric layout with parallax image effect.
12. **`GettuppGirlsSection`**: Brand vertical with Neon Magenta accents and Polaroid grid.
13. **`UpgradesSection`**: Subtle list of post-Pilot add-ons.
14. **`RulesSection`**: Small, high-contrast list of terms.
15. **`FinalCTASection`**: Full-width section with Three.js particle burst and large CTA.
16. **`Footer`**: Links, Copyright, and sticky social media clickables.

## 4. Admin Dashboard (`/admin`)

Create a protected route (`/admin`) with Firebase Authentication (email whitelist). The dashboard must include:

*   **Sanity Manager Link:** Direct link to the Sanity Studio for content editing.
*   **Bookings View:** Display a list of successful Pilot/Audit purchases (from Stripe webhook data) and Cal.com bookings.
*   **Leads View:** Table view of all email leads collected from the Hero input and the popup.

## 5. Stitch Skill Integration (AI Agent Directive)

The AI agent must prioritize the following:

*   **Component-First Development:** Build each of the 16 sections as a standalone, highly-optimized React component before assembling the final page.
*   **Design Adherence:** **STRICTLY** follow the aesthetic guidelines in `DESIGN_V2.md`, particularly the use of **Three.js (via react-three-fiber)** for the particle effects and **Framer Motion** for all component-level interactions (tilts, scales, liquid transitions).
*   **Conversion Focus:** Ensure the sticky header CTA and the exit-intent popup are implemented with the highest priority.
*   **Performance:** Target a **Lighthouse 100** score. Optimize all assets and use Next.js features (Image, SSR) to their fullest.

This prompt is the complete, elite specification for the AI agent to execute the build.
