# GETTUPP ENT: Master Coding Prompt V3 (BUILD_V3.md)

**Goal:** Implement the GETTUPP ENT website as a high-performance, visually stunning, full-stack application using the specified technologies and the **Stitch Agent Skill** for component-based, iterative development, leveraging the full suite of specialized development skills.

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

## 5. Agent Skill Integration (Master Directive)

The AI agent must operate under the following multi-skill directive:

1.  **Primary Architect (Stitch):** The **Stitch Agent Skill** will serve as the main architect, driving the iterative, component-first development process for the entire application.
2.  **Specialized Skill Utilization:** The agent is **REQUIRED** to leverage the full library of 50+ specialized skills available in the `/dev` directory as needed across the entire development lifecycle. This includes, but is not limited to, dedicated skills for:
    *   **Vercel:** For deployment configuration, environment variable management, and edge function optimization.
    *   **Firebase:** For secure authentication setup, Firestore schema design, and security rules implementation.
    *   **Stripe:** For product creation, webhook handler logic, and secure client-side integration.
    *   **React/TypeScript:** For advanced component patterns, type safety, and performance tuning.
    *   **Tailwind CSS:** For efficient utility-first styling and theme management.
3.  **Component-First Development:** Build each of the 16 sections as a standalone, highly-optimized React component before assembling the final page.
4.  **Design Adherence:** **STRICTLY** follow the aesthetic guidelines in `DESIGN_V2.md`, particularly the use of **Three.js (via react-three-fiber)** for the particle effects and **Framer Motion** for all component-level interactions (tilts, scales, liquid transitions).
5.  **Conversion Focus:** Ensure the sticky header CTA and the exit-intent popup are implemented with the highest priority.
6.  **Performance:** Target a **Lighthouse 100** score. Optimize all assets and use Next.js features (Image, SSR) to their fullest.

This prompt is the complete, final, and skill-optimized specification for the AI agent to execute the build.
