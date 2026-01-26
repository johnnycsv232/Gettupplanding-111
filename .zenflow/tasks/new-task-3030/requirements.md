# GETTUPPENT Elite Website - Product Requirements Document (PRD)

**Version:** 2.0  
**Last Updated:** January 26, 2026  
**Status:** Ready for Implementation  

---

## Executive Summary

GETTUPPENT is a Minneapolis-based premium content/media production company targeting nightlife venues, event promoters, and entertainment brands. This project will deliver a high-performance, conversion-optimized landing page that serves as the primary customer acquisition engine.

**Business Objective:** Convert high-intent visitors into Pilot customers ($345) and Retainer clients ($495-$995/mo) through an elite "Liquid Glass Premium Nightlife Luxury" aesthetic combined with aggressive conversion optimization.

**Technical Objective:** Build a Next.js 16 / React 19 application scoring 100/100 on Lighthouse Performance while delivering a stunning, interactive 3D visual experience.

---

## 1. Product Vision & Target Aesthetic

### 1.1 Brand Positioning
- **Market:** Premium nightlife content production (Minneapolis-focused, nationally scalable)
- **Target Audience:** Venue owners, event promoters, brand managers, influencers
- **Unique Value Proposition:** "Own the Night" - 24-hour delivery, Cinema-grade post-production, proven ROI (79.7K views in 90 days)

### 1.2 Visual Design Philosophy: "Liquid Glass 2.0"

The site must evoke **exclusivity, high-end production quality, and immediate trustworthiness** through:

1. **Glassmorphism with Dynamic Lighting**
   - Frosted glass effects with neon inner glows
   - Animated Vegas Gold borders that "breathe"
   - Radial gradient overlays for depth and focus

2. **Premium Color Palette**
   - **Vegas Gold (#FFC72C)**: Primary CTAs, highlights, conversion elements
   - **Neon Magenta (#FF00FF)**: Brand vertical (GETTUPP GIRLS), pulsing accents
   - **Electric Cyan (#00FFFF)**: Post-production section (CINEMA GRADE), video UI
   - **Deep Void Black (#080808)**: Background for maximum contrast
   - **Off-White (#E0E0E0)**: Body text for readability

3. **Typography**
   - **Headlines:** Bebas Neue / Inter Black (bold, all-caps, subtle gold gradients)
   - **Body:** Inter Regular (clean, highly readable)

4. **Interactive Elements**
   - Three.js particle fields (Vegas Gold particles with mouse parallax)
   - Framer Motion for all transitions (tilts, scales, liquid distortions)
   - Sticky header with sliding CTA
   - Exit-intent "Velvet Rope" email popup

### 1.3 Mobile-First Development Philosophy

**CRITICAL MANDATE: This site must be so stunning on mobile that visitors want to hire us to build their own site.**

**Core Principles:**

1. **Mobile-First Design & Development**
   - Design and develop for mobile screens FIRST (375px - 428px width)
   - Progressive enhancement for tablet (768px+) and desktop (1024px+)
   - Touch-optimized interactions (44px minimum tap targets)
   - Thumb-friendly navigation (bottom-anchored CTAs on mobile)

2. **Performance on Mobile Devices**
   - Three.js particle count: 50 particles on mobile vs. 200 on desktop
   - Video optimization: Serve lower-res video to mobile (720p vs. 1080p desktop)
   - Lazy-load everything below the fold aggressively
   - Target mobile Lighthouse Performance: 95+ (vs. 100 on desktop)

3. **Mobile-Specific Visual Enhancements**
   - **Glassmorphism**: Even more pronounced on mobile (higher blur, stronger glows)
   - **Touch Ripple Effects**: Vegas Gold ripple on button taps (Framer Motion)
   - **Pull-to-Reveal**: Subtle parallax on scroll creates depth
   - **Haptic Feedback**: Vibration on CTA taps (iOS Safari, Android Chrome)
   - **Swipe Gestures**: Testimonials carousel, gallery lightbox navigation

4. **Mobile-Optimized Layouts**
   - **Hero Section:** 
     - Full-screen height on mobile (100vh)
     - Larger headline relative to viewport (20vw vs. fixed px)
     - Bottom-anchored CTAs (within thumb reach)
   - **Pricing Cards:**
     - Single-column on mobile, horizontal swipe to view all tiers
     - Current tier centered with prev/next slightly visible (peek effect)
   - **Gallery:**
     - 1-column masonry on mobile (faster render, better visual impact)
     - Instagram Stories-style lightbox (vertical swipe to close)
   - **Forms:**
     - Input fields minimum 48px height
     - Large, easy-to-tap submit buttons (full-width on mobile)

5. **"Wow Factor" Mobile Features**
   - **Tilt on Device Motion**: Use device gyroscope to create parallax (iOS Safari DeviceMotion API)
   - **Ambient Light Adaptation**: Detect ambient light sensor and adjust contrast (if supported)
   - **Install Prompt**: PWA manifest for "Add to Home Screen" prompt
   - **Smooth Scroll Snap**: Sections snap into view on scroll (CSS `scroll-snap-type`)
   - **Lottie Micro-Animations**: Lightweight JSON animations for icons/transitions

6. **Conversion Optimization for Mobile**
   - **Sticky Bottom CTA Bar**: Appears after 2 scrolls, always visible
   - **One-Tap Checkout**: Apple Pay / Google Pay integration with Stripe
   - **Exit-Intent on Mobile**: Trigger on back-button tap (History API)
   - **SMS Opt-In**: Optional phone number capture for "Text me the details"

7. **Testing & Validation**
   - Test on real devices: iPhone 12/13/14, Samsung Galaxy S21/S22
   - iOS Safari (primary), Chrome Mobile, Samsung Internet
   - Viewport range: 320px (iPhone SE) to 428px (iPhone 14 Pro Max)
   - Portrait AND landscape orientations

**Success Metric:** 
> "When a venue owner pulls up this site on their iPhone while at a bar, they should immediately text their business partner: 'Check this out. We need this.'"

### 1.4 Current State Analysis

**Existing Infrastructure:**
- ✅ Next.js 16 with App Router
- ✅ React 19
- ✅ Firebase (Auth, Firestore) - fully configured
- ✅ Stripe integration - webhook handlers in place
- ✅ Sanity client configured
- ✅ Three.js (@react-three/fiber, @react-three/drei)
- ✅ Framer Motion
- ✅ Testing suite (Vitest, Playwright, Firebase Rules Testing)
- ✅ 50+ specialized development skills

**Current Components (Partial Implementation):**
- Hero.tsx (exists, uses CSS Modules)
- Founder.tsx (exists)
- Pricing.tsx (exists)
- Comparison.tsx (exists)
- Process.tsx (exists)
- MeshBackground.tsx (exists)

**Migration Requirements:**
- ⚠️ **CRITICAL**: Must migrate from CSS Modules to Tailwind CSS
- ⚠️ Components need to align with new 16-section architecture
- ⚠️ Existing components may need complete rewrite to match Liquid Glass 2.0 aesthetic

---

## 2. Core Functional Requirements

### 2.1 User Flows

#### Primary Flow: Pilot Conversion
1. User lands on Hero → Impressed by video + particles
2. User scrolls to "THE PILOT" → Glassmorphism card captures attention
3. User clicks "START THE PILOT" CTA → Redirects to Stripe Checkout ($345)
4. Stripe processes payment → Webhook updates Firestore
5. User receives confirmation email with Cal.com booking link
6. User books initial consultation call

#### Secondary Flow: Retainer Conversion
1. User lands on Hero
2. User scrolls through "THE WORK" gallery → Sees quality
3. User reviews "FULL RETAINERS" pricing → Identifies tier
4. User clicks tier CTA → Redirects to Stripe Checkout (subscription)
5. Stripe processes subscription → Webhook updates Firestore
6. User receives onboarding email

#### Tertiary Flow: Lead Capture
1. User explores site without committing
2. **Trigger A**: User moves mouse to exit viewport (exit-intent)
   - OR **Trigger B**: 45 seconds on page (time-delayed)
3. Full-screen modal appears: "THE NIGHT ISN'T OVER"
4. User enters email for "VIP List" + free 5-point audit
5. Email stored in Firestore `leads` collection
6. User receives instant audit delivery email

### 2.2 Technical Integrations

#### 2.2.1 Stripe Payment Processing

**Products to Configure:**
1. **The Pilot** - One-time: $345
2. **Content Audit** - One-time: $300
3. **Essential Retainer** - Subscription: $495/month
4. **Growth Retainer** - Subscription: $695/month (highlight as "BEST VALUE")
5. **Dominate Retainer** - Subscription: $995/month (consultation-only, no direct checkout)

**Implementation Requirements:**
- Client-side: Use `@stripe/stripe-js` for checkout redirects
- Server-side: Webhook handler at `/api/webhooks/stripe` (already exists, verify completeness)
- Post-payment: Update Firestore collection `purchases` with:
  ```typescript
  {
    userId: string | null,
    email: string,
    productId: string,
    amount: number,
    status: 'completed' | 'failed',
    timestamp: Timestamp,
    stripeSessionId: string
  }
  ```
- Error handling: Log failed webhooks to Firestore `webhook_errors` collection

#### 2.2.2 Firebase Firestore Schema

**Collections:**

1. **`leads`** (Email captures)
   ```typescript
   {
     id: auto-generated,
     email: string,
     source: 'hero_input' | 'exit_popup',
     city?: string, // Optional from hero input
     timestamp: Timestamp,
     ipAddress?: string, // For spam prevention
     userAgent?: string
   }
   ```

2. **`purchases`** (Stripe successful payments)
   ```typescript
   {
     id: auto-generated,
     email: string,
     productType: 'pilot' | 'audit' | 'retainer',
     productName: string,
     amount: number,
     stripeSessionId: string,
     stripeCustomerId?: string,
     status: 'completed',
     timestamp: Timestamp,
     metadata: Record<string, any>
   }
   ```

3. **`admin_users`** (Whitelisted emails for /admin access)
   ```typescript
   {
     id: auto-generated,
     email: string,
     role: 'owner' | 'admin' | 'viewer',
     createdAt: Timestamp
   }
   ```

**Security Rules:**
- `leads`: Write-only for client, read for authenticated admins
- `purchases`: Server-only writes (via webhook), read for authenticated admins
- `admin_users`: Read-only for authenticated users (to verify own access)

#### 2.2.3 Sanity CMS Integration

**Schema Requirements:**

1. **`galleryItem`** (Portfolio pieces for "THE WORK" section)
   ```typescript
   {
     _id: string,
     title: string,
     mediaType: 'video' | 'photo',
     thumbnailUrl: string,
     fullMediaUrl: string,
     category: string[], // For filtering (e.g., ["events", "portraits"])
     order: number, // For manual sorting
     publishedAt: datetime,
     featured: boolean
   }
   ```

2. **`testimonial`**
   ```typescript
   {
     _id: string,
     clientName: string,
     clientRole?: string,
     platform: 'instagram' | 'tiktok' | 'google',
     quote: text,
     rating?: number,
     avatarUrl?: string,
     publishedAt: datetime
   }
   ```

**API Implementation:**
- Client-side data fetching using `@sanity/client`
- Cache strategy: ISR (Incremental Static Regeneration) with 60-second revalidation
- Fallback: Show placeholder skeleton UI if Sanity is unreachable

#### 2.2.4 Cal.com Booking Integration

**Requirements:**
- Embed Cal.com scheduling widget on `/book` page (post-Pilot purchase)
- Pass user email from Stripe webhook to pre-fill booking form
- Configuration: Use Cal.com embed script with custom styling to match Liquid Glass theme

---

## 3. Section-by-Section Requirements (16 Sections)

### 3.1 Sticky Header
**Purpose:** Persistent navigation and conversion anchor

**Features:**
- Transparent background on load, solid Deep Void Black on scroll (50px threshold)
- Logo (left): "GETTUPPENT" wordmark in Vegas Gold
- Navigation (center): Links to #pilot, #retainers, #work, #about
- CTA (right): "START THE PILOT" button (Vegas Gold, always visible)
- Mobile: Hamburger menu with slide-out navigation

**Interactions:**
- Smooth scroll to anchor sections on nav click
- CTA button scales on hover (1.05x)
- Header slides down on scroll up, hides on scroll down (except on mobile)

**Technical:**
- Use Framer Motion's `useScroll` for scroll detection
- Implement Intersection Observer for section highlighting in nav
- Sticky positioning with z-index: 1000

---

### 3.2 Hero Section
**Purpose:** Immediate visual impact + primary lead capture

**Content:**
- Headline: "OWN THE NIGHT" (animated gold gradient)
- Subheadline: "Premium nightlife content that converts followers into customers"
- Body: "79.7K views in 90 days. 24-hour delivery. Cinema-grade post-production."
- City Input: "Enter your city" → Stores to Firestore `leads`
- CTAs: 
  - Primary: "START $345 PILOT" (Vegas Gold button)
  - Secondary: "VIEW THE WORK" (Ghost button, scrolls to gallery)

**Visual Elements:**
1. **Background:** Looping video (muted, autoplay, lazy-loaded)
   - Overlay: Radial gradient (Deep Void Black center → transparent edges)
2. **Three.js Particle Field:**
   - 200 Vegas Gold particles (#FFC72C with 30% opacity)
   - Slow drift motion (vertical rise + horizontal sway)
   - Mouse parallax: Particles shift 20px in direction of cursor
   - Performance: Use `THREE.Points` with instanced geometry

**Interactions:**
- Staggered text entrance: Headline (0s) → Subhead (0.5s) → Body (0.7s) → Input (1s) → CTAs (1.2s)
- City input: On submit, validate email format (Zod), store to Firestore, show success toast

**Performance:**
- Video: Use `<video>` tag with `preload="metadata"`, `muted`, `autoplay`, `loop`, `playsinline`
- Three.js: Lazy-load using `next/dynamic` with `ssr: false`
- Target LCP: < 2.5s (hero image/video must load fast)

**Mobile-Specific Requirements:**

1. **Layout (Mobile: 375px - 428px):**
   - Full-screen height: `100vh` (fills entire mobile screen)
   - Headline: Responsive sizing `clamp(2.5rem, 8vw, 4rem)` instead of fixed px
   - CTAs: Bottom-anchored (60px from bottom, within thumb reach)
   - City input: Full-width with 48px height minimum
   - Spacing: Tighter padding (16px vs. 40px desktop)

2. **Performance Optimizations:**
   - Three.js particles: 50 particles on mobile (vs. 200 desktop)
   - Video source: Serve 720p MP4 on mobile (vs. 1080p desktop) using `<source media="(max-width: 768px)">`
   - Poster image: Show high-quality still image while video loads
   - Reduce blur radius: `backdrop-filter: blur(20px)` on mobile (vs. 30px desktop) for faster render

3. **Mobile-Specific Interactions:**
   - **Device Gyroscope Parallax:** Use DeviceMotion API to tilt particles based on phone orientation
     ```javascript
     window.addEventListener('deviceorientation', (e) => {
       // Tilt particles based on beta/gamma values
     });
     ```
   - **Touch Ripple:** Vegas Gold ripple effect on CTA button tap (Framer Motion)
   - **Haptic Feedback:** Vibrate on CTA tap (50ms pulse)
     ```javascript
     if (navigator.vibrate) navigator.vibrate(50);
     ```
   - **Pull-to-Refresh Disable:** Prevent native pull-to-refresh from interfering with scroll

4. **Visual Enhancements for Mobile:**
   - Headline gradient: More vibrant on mobile (higher saturation)
   - Glass overlay: Stronger blur and glow on mobile for premium feel
   - Particles: Larger size (6px vs. 4px desktop) for visibility on small screens

5. **Conversion Optimization:**
   - City input placeholder: "Minneapolis" (pre-fill suggestion)
   - Auto-focus on city input after 3 seconds (mobile keyboard slides up)
   - One-tap submit: Input has `enterkeyhint="go"` for quick submission
   - Success toast: Bottom-anchored (doesn't cover CTAs)

6. **Testing Requirements:**
   - Test on iPhone 12/13/14 (Safari iOS 15+)
   - Test on Samsung Galaxy S21/S22 (Chrome Android 11+)
   - Portrait orientation: Primary design
   - Landscape orientation: Adjust layout (CTAs to right side, not bottom)

**Desktop vs. Mobile Comparison:**

| Element | Desktop (1920px) | Mobile (375px) |
|---------|-----------------|----------------|
| Headline Size | 96px | clamp(2.5rem, 8vw, 4rem) ≈ 40px |
| Particle Count | 200 | 50 |
| Video Quality | 1080p | 720p |
| CTA Position | Center (horizontal) | Bottom-anchored (60px from bottom) |
| Input Width | 400px | 100% (minus 32px padding) |
| Backdrop Blur | 30px | 20px |

---

### 3.3 The Pilot Section
**Purpose:** Introduce flagship offer with high-value positioning

**Content:**
- Badge: "VIP ACCESS" (Neon Magenta glow, pulsing animation)
- Headline: "THE PILOT: $345"
- Subheadline: "Your invite-only test drive"
- Benefits List (icon + text):
  - ✓ 1 event shoot (up to 3 hours)
  - ✓ 24-hour delivery guarantee
  - ✓ 10-15 cinema-grade clips + photos
  - ✓ Social media optimization (captions + hashtags)
  - ✓ Performance analytics report
  - ✓ 60-day money-back guarantee
- CTA: "CLAIM YOUR PILOT" (Vegas Gold, links to Stripe Checkout)

**Visual:**
- **Glassmorphism Card:**
  - Background: `rgba(255, 255, 255, 0.05)` with `backdrop-filter: blur(30px)`
  - Border: 1px solid `rgba(255, 255, 255, 0.1)`
  - Inner shadow: Neon Magenta glow (`box-shadow: inset 0 0 20px rgba(255, 0, 255, 0.3)`)
- **Badge:** "INVITE ONLY" text with pulsing neon effect (Framer Motion)

**Interactions:**
- Card: 3D tilt on hover (Framer Motion `motion.div` with `whileHover` transform)
- Inner glow: Intensifies on hover (from 0.3 to 0.6 opacity)
- CTA: Scale + glow on hover

**Technical:**
- Use Framer Motion for tilt effect: `rotateX` and `rotateY` based on mouse position
- Implement smooth entry animation when section scrolls into view (Intersection Observer)

---

### 3.4 Content Audit Section
**Purpose:** Down-sell offer for budget-conscious leads

**Content:**
- Headline: "NOT READY? START WITH A $300 AUDIT"
- Subheadline: "Get a 5-point content performance analysis"
- Benefits:
  - ✓ Current content audit (social media + website)
  - ✓ Competitor analysis
  - ✓ Recommended content strategy
  - ✓ ROI projection report
  - ✓ 30-minute strategy call
- CTA: "GET YOUR AUDIT" (Ghost button, Vegas Gold border)

**Visual:**
- Minimalist card (no glassmorphism, just dark background with gold border)
- Smaller, less prominent than Pilot section

**Interactions:**
- Subtle fade-in on scroll
- CTA links to Stripe Checkout for $300 product

---

### 3.5 Problem/Solution Section
**Purpose:** Emotional hook + value proposition

**Content:**
- Problem Side:
  - Headline: "YOU'RE INVISIBLE"
  - Body: "Your events are fire. Your content is forgettable. You're losing money to venues with worse vibes but better content."
- Solution Side:
  - Headline: "WE MAKE YOU UNFORGETTABLE"
  - Body: "Cinema-grade content that makes your audience feel the energy. ROI in 90 days or we refund you."

**Visual:**
- Two-column split (50/50 on desktop, stacked on mobile)
- Problem side: Dark red glow
- Solution side: Vegas Gold glow

**Interactions:**
- Parallax scroll: Problem side scrolls slower than solution side

---

### 3.6 What You Get Section
**Purpose:** Visual breakdown of deliverables

**Content:**
- Headline: "WHAT YOU GET (EVERY SHOOT)"
- Icon grid (6 items):
  1. 📹 **Cinema-Grade Footage** - Shot on professional mirrorless cameras
  2. ⚡ **24-Hour Turnaround** - Delivered the next day, guaranteed
  3. 🎨 **Color Grading** - LUT-based Hollywood-style post-production
  4. 📱 **Social Optimization** - Vertical crops for IG Stories/TikTok
  5. 📊 **Performance Analytics** - 30-day engagement tracking
  6. 💬 **Copy + Captions** - Ready-to-post content written for you

**Visual:**
- 3-column grid on desktop, 2-column on tablet, 1-column on mobile
- Each item: Icon (lucide-react) + Headline + Body
- Hover: Icon scales up, background glow appears

**Interactions:**
- Staggered fade-in as section enters viewport

---

### 3.7 Full Retainers Section (Pricing)
**Purpose:** Upsell to recurring revenue, highlight Growth tier

**Content:**
- Headline: "GO ALL-IN: FULL RETAINERS"
- Subheadline: "Own your city's nightlife narrative"

**Pricing Cards (3 tiers):**

1. **ESSENTIAL - $495/mo**
   - 2 event shoots/month
   - 24-hour delivery
   - 20-30 assets/month
   - Social captions + hashtags
   - Monthly analytics report
   - CTA: "START ESSENTIAL"

2. **GROWTH - $695/mo** ⭐ BEST VALUE
   - 4 event shoots/month
   - 24-hour delivery
   - 40-60 assets/month
   - Social captions + hashtags
   - Bi-weekly strategy calls
   - Dedicated Slack channel
   - Monthly analytics + competitor analysis
   - CTA: "START GROWTH"
   - **Visual:** Larger card (1.1x scale), persistent Vegas Gold glow, "BEST VALUE" badge

3. **DOMINATE - $995/mo**
   - Unlimited event shoots
   - 12-hour delivery
   - Unlimited assets
   - Social captions + hashtags
   - Weekly strategy calls
   - Dedicated Slack + project manager
   - Quarterly content strategy overhaul
   - Custom integrations (API, automation)
   - CTA: "BOOK A CALL" (links to Cal.com, not Stripe)

**Visual:**
- Dark floating cards with thin Vegas Gold border
- Border animation: Subtle "breathing" effect (border opacity pulses 0.3 → 0.6 → 0.3)
- Growth card: Larger, elevated shadow, persistent glow

**Interactions:**
- Hover: Card scales up (1.05x), shadow intensifies
- Click CTA: Essential/Growth → Stripe Checkout; Dominate → Scroll to contact/Cal.com

**Technical:**
- Use Framer Motion for tilt effect on hover
- Implement breathing animation with CSS keyframes or Framer Motion loop

---

### 3.8 The Work (Gallery)
**Purpose:** Social proof through portfolio

**Content:**
- Headline: "THE WORK"
- Filter Tabs: ALL | VIDEO | PHOTO
- Masonry Grid: Fetch from Sanity CMS
  - Each item: Thumbnail with play icon (videos) or overlay (photos)
  - Click: Open lightbox with full media

**Visual:**
- Masonry layout (use CSS Grid or library like `react-masonry-css`)
- Dark metallic border around each item
- Liquid transition: On filter change, grid items morph with smooth, liquid-like distortion

**Interactions:**
1. Filter change:
   - Framer Motion `AnimatePresence` for item exit/enter
   - Liquid distortion: Use Framer Motion's `layoutId` + custom transition
2. Item hover:
   - Scale up (1.05x)
   - Subtle drop shadow appears
3. Lightbox:
   - Full-screen overlay (Deep Void Black 90% opacity)
   - Navigation arrows (prev/next)
   - Close button (top-right)

**Technical:**
- Fetch data from Sanity using `@sanity/client`
- ISR revalidation: 60 seconds
- Lazy-load images below the fold using `next/image` with `loading="lazy"`
- Videos: Use `<video>` tag with `controls`, load on lightbox open only

**Performance:**
- Thumbnail optimization: Next.js Image with `width={400}` and `quality={80}`
- Infinite scroll (optional): Load more items as user scrolls (reduces initial load)

---

### 3.9 Cinema Grade Section
**Purpose:** Showcase post-production quality

**Content:**
- Headline: "CINEMA GRADE POST-PRODUCTION"
- Subheadline: "Your content deserves more than a quick edit"
- Feature List:
  - ✓ Professional color grading (LUT-based)
  - ✓ Sound design + mixing
  - ✓ Motion graphics + text overlays
  - ✓ Frame-by-frame timing
  - ✓ Export optimization (codec, bitrate)
- Video Player Mockup: Before/After slider or demo reel

**Visual:**
- Electric Cyan (#00FFFF) accents throughout section
- Video player UI: Custom controls with cyan highlights
- Background: Subtle diagonal stripe pattern (dark gray + darker gray)

**Interactions:**
- Before/After slider: Drag to reveal
- Video player: Click to play demo reel

**Technical:**
- Use `<video>` tag with custom controls (HTML5 Video API)
- Before/After: Implement with CSS `clip-path` and JavaScript/React drag handler

---

### 3.10 Events Section
**Purpose:** Authority building through client logos

**Content:**
- Headline: "WE'VE SHOT 350+ EVENTS"
- Subheadline: "From underground raves to corporate galas"
- Logo Grid: Client logos (grayscale, color on hover)
- Stats:
  - 350+ events shot
  - 79.7K views (90 days)
  - 24-hour delivery (100% on-time rate)
  - 60-day guarantee (< 1% refund rate)

**Visual:**
- Logos in 4-column grid (grayscale filter, remove on hover)
- Stats in horizontal row (large numbers in Vegas Gold, labels in off-white)

**Interactions:**
- Logo hover: Color returns, slight scale up
- Stats: Count-up animation when section enters viewport

**Technical:**
- Count-up animation: Use Framer Motion or `react-countup`
- Logos: Fetch from Sanity or hardcode as SVGs

---

### 3.11 Testimonials Section
**Purpose:** Social proof through customer reviews

**Content:**
- Headline: "DON'T TAKE OUR WORD FOR IT"
- Carousel: Customer testimonials (3 visible at once on desktop)
  - Each card: Quote, Name, Role, Platform (IG/TikTok/Google), Avatar

**Visual:**
- Platform-specific UI:
  - Instagram: Purple gradient border
  - TikTok: Pink/cyan gradient border
  - Google: Blue/red/yellow/green Google colors
- Carousel: Auto-scroll every 5 seconds, manual navigation arrows

**Interactions:**
- Card hover: Slight lift effect
- Auto-scroll: Pause on hover
- Navigation: Prev/Next arrows, dot indicators

**Technical:**
- Fetch from Sanity `testimonial` collection
- Use Framer Motion for carousel transitions
- Implement auto-scroll with `setInterval`, clear on hover

---

### 3.12 Founder Section
**Purpose:** Personal brand + authority

**Content:**
- Headline: "MEET THE FOUNDER"
- Image: Professional photo of founder (provided: johnny_cage.png.jpg)
- Copy:
  - Name: Johnny Cage (or actual founder name)
  - Background: 10 years in nightlife photography, 5 years full-time
  - Mission: "Elevate Minneapolis nightlife content to LA/Miami standards"
  - Personal touch: "I started shooting parties with a $300 camera. Now I deliver cinema-grade content that venues can't afford to ignore."
- CTA: "WORK WITH ME" (links to Pilot checkout)

**Visual:**
- Asymmetric split layout:
  - 40% image (left)
  - 60% text (right)
- Image: Gold/pink gradient edge glow
- Parallax effect: Image moves slower than text on scroll

**Interactions:**
- Parallax scroll: Use Framer Motion's `useScroll` + `useTransform`
- Image hover: Glow intensifies

**Technical:**
- Image: Use `next/image` with `priority` (above fold)
- Parallax: Transform Y position based on scroll offset

---

### 3.13 Gettupp Girls Section
**Purpose:** Brand vertical showcase

**Content:**
- Headline: "GETTUPP GIRLS: BRAND AMBASSADORS"
- Subheadline: "The faces of Minneapolis nightlife"
- Polaroid Grid: Photos of brand ambassadors (casual, fun aesthetic)
- Body: "Our Brand Ambassadors bring energy to every event. They're content creators, influencers, and nightlife royalty."

**Visual:**
- **Neon Magenta (#FF00FF) dominates this section**
- Polaroid-style grid: White border, slight random tilt (-3° to +3°)
- Background: Subtle magenta glow

**Interactions:**
- Image hover: Straighten (rotate to 0°), scale up (1.1x)

**Technical:**
- Random tilt: Generate rotation value on mount (`Math.random()`)
- Hover: Framer Motion `whileHover` to override rotation

---

### 3.14 Upgrades Section
**Purpose:** Highlight post-Pilot add-ons

**Content:**
- Headline: "BEYOND THE PILOT: PREMIUM ADD-ONS"
- List:
  - 🎬 **Same-Day Rush Delivery**: +$200/shoot
  - 📹 **Multi-Cam Coverage**: +$300/shoot
  - 🎨 **Custom Motion Graphics**: +$150/video
  - 📸 **Photographer + Videographer Combo**: +$400/shoot
  - 🎤 **Interviews + BTS Content**: +$250/shoot

**Visual:**
- Minimalist list with Vegas Gold icons
- Each item: Icon + title + price (right-aligned)

**Interactions:**
- Subtle fade-in on scroll

---

### 3.15 Rules Section
**Purpose:** Set expectations + legal CYA

**Content:**
- Headline: "THE FINE PRINT"
- List:
  - 60-Day Money-Back Guarantee: If you don't see ROI, we refund 100%
  - 24-Hour Delivery: Guaranteed next-day delivery, or your next shoot is free
  - Usage Rights: You own all content, we retain portfolio rights
  - Cancellation: Cancel retainers anytime, no questions asked
  - Payment: All sales final for one-time products (Pilot, Audit)

**Visual:**
- Small, high-contrast list
- Vegas Gold bullet points
- Light gray body text

**Interactions:**
- None (static section)

---

### 3.16 Final CTA Section
**Purpose:** Last conversion opportunity

**Content:**
- Headline: "READY TO OWN THE NIGHT?"
- Subheadline: "Start your $345 Pilot. Delivered in 24 hours. Guaranteed ROI or full refund."
- CTA: "START THE PILOT NOW" (massive button, Vegas Gold, glowing)

**Visual:**
- Full-width section
- **Three.js Particle Burst:**
  - Particle field from Hero returns
  - More intense, swirling motion
  - Particles converge toward CTA button

**Interactions:**
- Particles: Mouse-reactive swirl
- CTA: Scale on hover, particle intensity increases near button

**Technical:**
- Three.js: Reuse particle system from Hero, modify motion pattern
- CTA: Link to Stripe Checkout

---

### 3.17 Footer
**Purpose:** Navigation + legal + social

**Content:**
- Logo (left)
- Navigation Links (center): Home, About, Services, Gallery, Contact
- Social Media Icons (right): Instagram, TikTok, YouTube
- Copyright: "© 2026 GETTUPPENT. All rights reserved."
- Legal: Privacy Policy, Terms of Service

**Visual:**
- Dark background (slightly lighter than main background)
- Vegas Gold accents on links/icons
- Sticky social media clickables: Vertical bar (left side of screen) that floats on all pages

**Interactions:**
- Social icons hover: Color fill, scale up
- Sticky clickables: Slide in from left on scroll (after Hero section)

**Technical:**
- Sticky clickables: Use `position: fixed` with conditional rendering (hide on Hero)

---

## 4. Conversion Optimization Features

### 4.1 Exit-Intent "Velvet Rope" Popup

**Triggers:**
1. **Exit-Intent**: User moves mouse out of viewport (top edge)
2. **Time-Delayed**: 45 seconds on page (fallback if no exit-intent)

**Content:**
- Headline: "THE NIGHT ISN'T OVER"
- Subheadline: "Join the VIP List for exclusive content, early access, and a free 5-point audit delivered instantly."
- Email Input: "Enter your email"
- CTA: "JOIN THE VIP LIST" (Vegas Gold)
- Close: "X" button (top-right)

**Visual:**
- Full-screen modal (z-index: 10000)
- Background: Deep Void Black with 90% opacity, blurred backdrop
- Central card: Glassmorphism with Vegas Gold glow
- Form: Vegas Gold focus states

**Interactions:**
1. On trigger:
   - Fade-in background (300ms)
   - Scale-in card (500ms, ease-out)
2. On submit:
   - Validate email (Zod)
   - Store to Firestore `leads` collection
   - Show success toast: "Check your inbox for your free audit!"
   - Close modal
3. On close:
   - Set localStorage flag: `vip_popup_dismissed=true` (don't show again for 30 days)

**Technical:**
- Exit-intent: Listen for `mouseleave` event on `document` with `clientY < 10`
- Time-delayed: `setTimeout` for 45,000ms
- Prevent re-trigger: Check `localStorage` before showing
- Firestore write: Use client SDK with security rules allowing writes to `leads`

### 4.2 Hero City Input Lead Capture

**Purpose:** Low-friction lead gen for users not ready to buy

**Content:**
- Input: "Enter your city to see our work" (placeholder)
- Button: "SEE THE WORK" (Vegas Gold)

**Functionality:**
1. User enters city name
2. On submit:
   - Validate input (non-empty string)
   - Store to Firestore `leads` collection with `source: 'hero_input'`
   - Smooth scroll to "THE WORK" gallery section
   - Show toast: "Welcome to the family! Check out our {city} work below."

**Technical:**
- Form submit handler
- Firestore write (client SDK)
- Smooth scroll: Use `scrollIntoView({ behavior: 'smooth' })`

### 4.3 Sticky Header CTA

**Purpose:** Always-visible conversion anchor

**Functionality:**
- "START THE PILOT" button visible in header at all times (except on mobile below 500px scroll)
- On scroll down (>100px): Button slides in from right
- On scroll up: Button remains visible
- Click: Redirect to Stripe Checkout

**Technical:**
- Scroll detection: Framer Motion `useScroll` or vanilla JS `window.scrollY`
- Animation: Framer Motion `motion.button` with `animate` prop

---

## 5. Performance & SEO Requirements

### 5.1 Lighthouse Score Targets

**Performance: 100/100**
- **LCP (Largest Contentful Paint)**: < 2.5s
  - Hero video must load fast (use `preload="metadata"`)
  - Use `next/image` with `priority` for above-fold images
- **FID (First Input Delay)**: < 100ms
  - Minimize JavaScript execution on initial load
  - Lazy-load Three.js components
- **CLS (Cumulative Layout Shift)**: < 0.1
  - Pre-define height for sticky header
  - Use React Portal for modals to prevent layout shifts
  - Reserve space for images with `width`/`height` attributes

**Accessibility: 100/100**
- **ARIA for Modals:**
  - `role="dialog"`
  - `aria-modal="true"`
  - Focus trap: Move focus into modal on open, return on close
  - Close button: `aria-label="Close popup"`
- **Semantic HTML:**
  - Use `<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`
  - All images: `alt` attributes
  - All buttons: Descriptive text (no icon-only buttons)
- **Keyboard Navigation:**
  - All interactive elements focusable
  - Visible focus states (Vegas Gold outline)

**Best Practices: 100/100**
- **HTTPS:** Enforce on Vercel
- **Security:**
  - No secrets in client code
  - All API routes use Zod validation
  - Firebase Security Rules tested
- **No console errors:** Clean console on production build

**SEO: 100/100**
- **Meta Tags:**
  - `<title>`: "GETTUPPENT - Premium Nightlife Content Production | Minneapolis"
  - `<meta name="description">`: "Own the night with cinema-grade content. 24-hour delivery, 79.7K views in 90 days. Start your $345 Pilot today."
  - Open Graph tags for social sharing
  - Twitter Card tags
- **Structured Data (Schema.org):**
  - Organization schema
  - Service schema for Pilot/Retainers
  - Review schema for testimonials
- **Sitemap:** Auto-generated by Next.js
- **Robots.txt:** Allow all

### 5.2 Performance Optimizations

**Code Splitting:**
- Three.js components: `next/dynamic` with `ssr: false`
- Framer Motion: Import only used functions (tree-shaking)
- Lazy-load sections below the fold

**Asset Optimization:**
- **Images:** Next.js Image component with:
  - WebP format
  - Responsive sizes
  - Lazy loading for below-fold
- **Videos:** 
  - Compress to < 5MB
  - Use H.264 codec for broad compatibility
  - Poster image for instant display
- **Fonts:**
  - Use `next/font` for optimized loading
  - Subset fonts to include only used characters

**CDN & Caching:**
- Vercel Edge Network for global CDN
- Static assets: `Cache-Control: public, max-age=31536000, immutable`
- API routes: Appropriate cache headers (no cache for webhooks)

**Monitoring:**
- Vercel Analytics for performance tracking
- Sentry (optional) for error monitoring

---

## 6. Admin Dashboard (`/admin`)

### 6.1 Authentication

**Requirements:**
- Whitelisted email login (Firebase Auth)
- Check user email against Firestore `admin_users` collection
- Redirect unauthorized users to home page

**Implementation:**
- Use Firebase Auth UI for login flow
- Server-side check: Verify user in `admin_users` collection on page load
- If not authorized: Redirect to `/` with toast message: "Access denied"

### 6.2 Dashboard Features

**Sections:**

1. **Sanity Manager Link**
   - Big button: "MANAGE CONTENT" (opens Sanity Studio in new tab)

2. **Bookings View**
   - Table: Recent purchases from Stripe
   - Columns: Email, Product, Amount, Date, Status
   - Filter: By product type (Pilot, Audit, Retainer)
   - Export: CSV download

3. **Leads View**
   - Table: Email leads from hero input + popup
   - Columns: Email, Source, City (if available), Date
   - Filter: By source (hero_input, exit_popup)
   - Export: CSV download
   - Action: "Email All" button (opens default email client with BCC list)

**Technical:**
- Fetch data from Firestore using server-side query (Next.js Server Component)
- Real-time updates: Use Firestore `onSnapshot` (optional, may impact performance)
- CSV export: Use `papaparse` library

---

## 7. Development Methodology & Skills Integration

### 7.1 Component-First Approach (Stitch-Inspired)

**Principles:**
1. **Modular Development**: Build each of the 16 sections as a standalone component
2. **Iterative Refinement**: Implement → Test → Refine → Move to next section
3. **Consistent Patterns**: Reuse component patterns (e.g., glassmorphism card, CTA button)
4. **Design System**: Create Tailwind config with custom tokens (Vegas Gold, Neon Magenta, etc.)

**Execution:**
- Create components in `src/features/landing/components/v2/` (to avoid conflicts with existing)
- Each component: TypeScript, Zod props validation, Framer Motion animations
- Storybook (optional): Visual testing for each component

### 7.2 Multi-Skill Development Directive

**Primary Architect: Stitch Methodology**
- Component-first, iterative building process

**Specialized Skills to Leverage:**

1. **Core Stack:**
   - `nextjs-best-practices`: Server/Client component decisions, App Router patterns
   - `react-best-practices`: Performance, hooks, state management
   - `typescript-expert`: Strict typing, no `any` types
   - `tailwind-patterns`: Custom config, utility-first styling

2. **Backend & Integration:**
   - `firebase`: Firestore schema, Security Rules, Auth
   - `stripe-integration`: Checkout, webhooks, subscriptions
   - `api-patterns`: Secure API route design

3. **Frontend Enhancement:**
   - `3d-web-experience`: Three.js particle systems, React Three Fiber
   - `framer-motion` (via `react-best-practices`): Animations, transitions
   - `ui-ux-pro-max`: Conversion optimization, UX patterns
   - `page-cro`: Conversion rate optimization techniques
   - `form-cro`: Lead capture form optimization

4. **Quality & Testing:**
   - `test-driven-development`: TDD workflow
   - `testing-patterns`: Unit, integration, E2E test architecture
   - `systematic-debugging`: Bug resolution methodology
   - `lint-and-validate`: Code quality enforcement

5. **SEO & Performance:**
   - `seo-fundamentals`: Meta tags, structured data
   - `schema-markup`: Schema.org implementation
   - `performance-profiling`: Lighthouse optimization

6. **Deployment:**
   - `vercel-deployment`: Environment variables, edge functions
   - `git-pushing`: Git workflow, commit conventions

### 7.3 Testing Strategy

**Test-First Development (TDD):**
1. Write failing test
2. Write minimal code to pass
3. Refactor
4. Repeat

**Testing Layers:**

1. **Unit Tests (Vitest + React Testing Library):**
   - Component rendering
   - User interactions (click, input, submit)
   - State management
   - Props validation (Zod schemas)

2. **Integration Tests (Vitest):**
   - API route handlers (webhooks)
   - Firestore Security Rules (@firebase/rules-unit-testing)
   - Stripe webhook signature validation

3. **E2E Tests (Playwright):**
   - Full user flows:
     - Hero → Pilot CTA → Stripe Checkout
     - Hero → Gallery → Lightbox
     - Exit-intent popup → Email submit → Firestore write
   - Performance testing (Lighthouse CI)

**Coverage Target:**
- 80% code coverage minimum
- 100% coverage for critical paths (payment, lead capture)

---

## 8. Migration Plan from Current State

### 8.1 Current vs. Target State

**Current:**
- CSS Modules (Landing.module.css, Pricing.module.css)
- Partial component implementation (Hero, Founder, Pricing, etc.)
- Using Inter/Outfit fonts
- Basic glassmorphism in CSS variables

**Target:**
- Tailwind CSS (custom config with Vegas Gold, Neon Magenta, Electric Cyan)
- Complete 16-section architecture
- Bebas Neue / Inter Black for headlines
- Advanced glassmorphism with Framer Motion

### 8.2 Migration Approach

**Option A: Full Rewrite (Recommended)**
- Preserve existing components as `src/features/landing/components/v1/`
- Build new components in `src/features/landing/components/v2/`
- Gradually replace sections in main page
- Benefits: Clean slate, no technical debt

**Option B: Incremental Migration**
- Convert CSS Module classes to Tailwind utilities
- Refactor existing components to match new design
- Risk: May introduce inconsistencies

**Decision:** **Option A (Full Rewrite)** to ensure Liquid Glass 2.0 aesthetic is achieved without compromise.

### 8.3 Tailwind Configuration

**Setup:**
1. Install Tailwind CSS:
   ```bash
   npm install -D tailwindcss postcss autoprefixer
   npx tailwindcss init -p
   ```

2. Create `tailwind.config.ts`:
   ```typescript
   import type { Config } from 'tailwindcss';

   const config: Config = {
     content: [
       './src/app/**/*.{js,ts,jsx,tsx,mdx}',
       './src/features/**/*.{js,ts,jsx,tsx,mdx}',
       './src/components/**/*.{js,ts,jsx,tsx,mdx}',
     ],
     theme: {
       extend: {
         colors: {
           'vegas-gold': '#FFC72C',
           'neon-magenta': '#FF00FF',
           'electric-cyan': '#00FFFF',
           'deep-void': '#080808',
           'off-white': '#E0E0E0',
         },
         fontFamily: {
           'bebas': ['Bebas Neue', 'sans-serif'],
           'inter': ['Inter', 'sans-serif'],
         },
         backdropBlur: {
           'glass': '30px',
         },
         boxShadow: {
           'glass': '0 0 20px rgba(255, 199, 44, 0.4)',
           'neon-magenta': 'inset 0 0 20px rgba(255, 0, 255, 0.3)',
         },
       },
     },
     plugins: [],
   };
   export default config;
   ```

3. Update `src/app/globals.css`:
   ```css
   @tailwind base;
   @tailwind components;
   @tailwind utilities;

   @layer base {
     body {
       @apply bg-deep-void text-off-white;
     }
   }

   @layer components {
     .glass {
       @apply bg-white/5 backdrop-blur-glass border border-white/10;
     }
   }
   ```

---

## 9. Success Criteria & KPIs

### 9.1 Technical Success Criteria

**Must-Have (Launch Blockers):**
- ✅ Lighthouse Performance: 100/100
- ✅ Lighthouse Accessibility: 100/100
- ✅ All 16 sections implemented and visually match design spec
- ✅ Stripe integration functional (test mode purchases work)
- ✅ Firebase Security Rules tested and passing
- ✅ Exit-intent popup triggers correctly
- ✅ Lead capture stores to Firestore
- ✅ Admin dashboard functional (login, view data)
- ✅ Mobile responsive (all sections)
- ✅ No console errors on production build
- ✅ Test coverage: >80%

**Nice-to-Have (Post-Launch):**
- Lighthouse SEO: 100/100 (may require content adjustments)
- Storybook component library
- Real-time Firestore updates in admin dashboard
- A/B testing framework for CTA copy

### 9.2 Business Success Criteria (30 Days Post-Launch)

**Lead Generation:**
- 500+ email captures (hero input + popup)
- 50+ Pilot purchases ($17,250 revenue)
- 10+ Retainer subscriptions ($5,000-$9,950 MRR)

**Engagement:**
- Average session duration: >2 minutes
- Bounce rate: <40%
- Gallery lightbox opens: >30% of visitors

**Conversion Rates:**
- Hero → Pilot CTA: >5% click-through
- Exit-intent popup: >10% email capture rate
- Pricing page → Checkout: >15% click-through

---

## 10. Risk Assessment & Mitigation

### 10.1 Technical Risks

| Risk | Impact | Probability | Mitigation |
|------|--------|-------------|------------|
| Three.js performance issues on low-end devices | High | Medium | Lazy-load, reduce particle count on mobile, provide fallback 2D animation |
| Stripe webhook failures (missed payments) | Critical | Low | Implement webhook retry logic, log all failures to Firestore, set up monitoring alerts |
| Firestore security rule bypass | Critical | Low | Comprehensive unit tests using @firebase/rules-unit-testing, manual penetration testing |
| Exit-intent popup triggers too early/often | Medium | Medium | Fine-tune trigger conditions, implement localStorage cooldown, A/B test thresholds |
| Video background impacts LCP | High | Medium | Use poster image, lazy-load video after LCP, optimize video file size (<5MB) |
| Tailwind migration breaks existing components | Low | Medium | Full rewrite in separate directory, gradual replacement, thorough QA |

### 10.2 Business Risks

| Risk | Impact | Probability | Mitigation |
|------|--------|-------------|------------|
| Low conversion rates despite high traffic | High | Medium | A/B test CTAs, implement heatmap tracking (Hotjar), user testing sessions |
| Stripe account limitations (high chargeback rate) | Critical | Low | Clear refund policy, 60-day guarantee reduces disputes, proactive customer support |
| Sanity CMS downtime affects gallery | Medium | Low | Implement ISR caching (60s revalidation), fallback to static placeholder images |

---

## 11. Dependencies & Prerequisites

### 11.1 Third-Party Services

**Required for MVP:**
1. **Vercel Account** (Deployment)
   - Environment variables configured
   - Domain connected (if custom domain)

2. **Firebase Project** (Backend)
   - ✅ Already configured
   - Firestore Security Rules deployed
   - Admin user emails whitelisted in `admin_users` collection

3. **Stripe Account** (Payments)
   - ✅ Already configured (webhook handler exists)
   - Products created (Pilot, Audit, 3 Retainers)
   - Webhook endpoint configured: `https://[domain]/api/webhooks/stripe`
   - Webhook secret stored in env var: `STRIPE_WEBHOOK_SECRET`

4. **Sanity Project** (CMS)
   - ✅ Client configured
   - Schema created (galleryItem, testimonial)
   - Initial content populated (10+ gallery items, 5+ testimonials)

5. **Cal.com Account** (Booking)
   - Account created
   - Event type created: "Pilot Consultation Call"
   - Embed code generated

**Optional (Post-Launch):**
- Google Analytics / Vercel Analytics
- Hotjar (heatmap tracking)
- Sentry (error monitoring)

### 11.2 Environment Variables

**Client-Side (NEXT_PUBLIC_*):**
```
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
NEXT_PUBLIC_SANITY_PROJECT_ID=
NEXT_PUBLIC_SANITY_DATASET=
```

**Server-Side:**
```
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
FIREBASE_ADMIN_PROJECT_ID=
FIREBASE_ADMIN_CLIENT_EMAIL=
FIREBASE_ADMIN_PRIVATE_KEY=
SANITY_API_TOKEN= (if using authenticated requests)
```

---

## 12. Assumptions & Open Questions

### 12.1 Assumptions

1. **Brand Assets:**
   - ✅ Founder image provided (johnny_cage.png.jpg)
   - Assumption: Additional images needed (logo, client logos, event photos) will be provided or sourced

2. **Content:**
   - Assumption: Final copy for all sections will be provided or can be inferred from existing spec
   - Assumption: Testimonial content will be real (not lorem ipsum)

3. **Business Logic:**
   - Assumption: Stripe products will be created manually in Stripe Dashboard
   - Assumption: Dominate Retainer is consultation-only (no auto-checkout)

4. **Legal:**
   - Assumption: Privacy Policy and Terms of Service will be provided as separate pages or external links

### 12.2 Open Questions (Requiring User Input)

1. **Domain & Hosting:**
   - Q: What is the production domain? (e.g., gettuppent.com)
   - Q: Is Vercel deployment already set up, or does it need configuration?

2. **Brand Assets:**
   - Q: Do we have a logo file? (SVG preferred)
   - Q: Do we have client logos for the Events section?
   - Q: Do we have actual event photos for the gallery, or should we use placeholders?

3. **Content:**
   - Q: What is the founder's real name? (Currently using "Johnny Cage" as placeholder)
   - Q: Do we have real testimonials, or should we use generic ones for launch?

4. **Cal.com:**
   - Q: What is the Cal.com embed URL for the Dominate Retainer consultation?

5. **Email Delivery:**
   - Q: How will the "free 5-point audit" be delivered after VIP popup signup?
   - A: Options:
     - Manual email from admin dashboard
     - Automated email via Firebase Cloud Functions + SendGrid/Mailgun
     - Zapier integration (Firestore → Email)

6. **Analytics:**
   - Q: Do we need Google Analytics, or is Vercel Analytics sufficient?

7. **A/B Testing:**
   - Q: Should we set up A/B testing infrastructure from launch, or add post-launch?

---

## 13. Out of Scope (Explicitly NOT Included)

1. **Blog/Content Marketing Platform**: This is a landing page only, no blog functionality
2. **User Accounts (Client Portal)**: No login for customers to view their content
3. **Internal Project Management**: No integration with project management tools (Asana, Trello, etc.)
4. **Live Chat**: No live chat widget (can be added post-launch)
5. **Multi-Language Support**: English only for MVP
6. **Mobile App**: Web-only, no native iOS/Android app
7. **Video Hosting**: Videos hosted externally (Sanity, Vimeo, or S3), not self-hosted

---

## 14. Next Steps (Transition to Technical Specification)

Upon approval of this PRD, the next phase will involve:

1. **Technical Specification Document** (`spec.md`):
   - Detailed component architecture
   - API contracts (Stripe webhooks, Firestore queries)
   - Data models (TypeScript interfaces)
   - Delivery phases (incremental milestones)

2. **Implementation Plan** (`plan.md`):
   - Task breakdown (16 sections + infrastructure)
   - Estimated effort per task
   - Dependencies and sequencing
   - Verification steps for each task

3. **Design System Setup**:
   - Tailwind config finalization
   - Component library initialization (Storybook optional)
   - Design token documentation

4. **Infrastructure Setup**:
   - Stripe product creation
   - Sanity schema deployment
   - Firebase Security Rules deployment
   - Environment variable configuration on Vercel

---

## Appendix A: Color Palette Reference

| Color Name | Hex Code | Usage | Tailwind Class |
|------------|----------|-------|----------------|
| Vegas Gold | #FFC72C | Primary CTAs, highlights, conversion elements | `bg-vegas-gold`, `text-vegas-gold`, `border-vegas-gold` |
| Neon Magenta | #FF00FF | GETTUPP GIRLS section, pulsing accents | `bg-neon-magenta`, `text-neon-magenta` |
| Electric Cyan | #00FFFF | CINEMA GRADE section, video UI | `bg-electric-cyan`, `text-electric-cyan` |
| Deep Void Black | #080808 | Background | `bg-deep-void` |
| Off-White | #E0E0E0 | Body text | `text-off-white` |

---

## Appendix B: Typography Reference

| Element | Font Family | Weight | Size (Desktop) | Size (Mobile) | Line Height | Letter Spacing |
|---------|-------------|--------|----------------|---------------|-------------|----------------|
| Hero Headline | Bebas Neue | Black (900) | 96px | 48px | 1.0 | -0.02em |
| Section Headline | Inter Black | Black (900) | 64px | 36px | 1.1 | -0.02em |
| Subheadline | Inter | SemiBold (600) | 24px | 18px | 1.4 | 0 |
| Body | Inter | Regular (400) | 18px | 16px | 1.6 | 0 |
| Button Text | Inter | Bold (700) | 16px | 14px | 1.0 | 0.05em |

---

## Appendix C: File Structure Reference

```
gettuppent-landing/
├── .zenflow/
│   └── tasks/
│       └── new-task-3030/
│           ├── requirements.md (this file)
│           ├── spec.md (next)
│           └── plan.md (final)
├── public/
│   ├── videos/
│   │   └── hero-background.mp4
│   └── images/
│       ├── johnny_cage.png.jpg
│       └── client-logos/
├── src/
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx (main landing page)
│   │   ├── admin/
│   │   │   └── page.tsx (admin dashboard)
│   │   ├── api/
│   │   │   ├── webhooks/
│   │   │   │   └── stripe/
│   │   │   │       └── route.ts
│   │   │   └── leads/
│   │   │       └── route.ts (email capture endpoint)
│   │   └── globals.css (Tailwind imports)
│   ├── features/
│   │   └── landing/
│   │       └── components/
│   │           └── v2/ (new implementation)
│   │               ├── HeroSection.tsx
│   │               ├── PilotSection.tsx
│   │               ├── ContentAuditSection.tsx
│   │               ├── ProblemSolutionSection.tsx
│   │               ├── WhatYouGetSection.tsx
│   │               ├── RetainersSection.tsx
│   │               ├── GallerySection.tsx
│   │               ├── CinemaGradeSection.tsx
│   │               ├── EventsSection.tsx
│   │               ├── TestimonialsSection.tsx
│   │               ├── FounderSection.tsx
│   │               ├── GettuppGirlsSection.tsx
│   │               ├── UpgradesSection.tsx
│   │               ├── RulesSection.tsx
│   │               ├── FinalCTASection.tsx
│   │               ├── StickyHeader.tsx
│   │               ├── Footer.tsx
│   │               ├── ExitIntentPopup.tsx
│   │               └── shared/
│   │                   ├── ParticleField.tsx (Three.js)
│   │                   ├── GlassCard.tsx
│   │                   └── CTAButton.tsx
│   ├── lib/
│   │   ├── firebase.ts (client)
│   │   ├── firebase-admin.ts (server)
│   │   ├── stripe.ts (server)
│   │   ├── sanity.ts (client)
│   │   └── validations/
│   │       ├── leads.ts (Zod schemas)
│   │       └── stripe.ts (Zod schemas)
│   ├── types/
│   │   ├── firestore.ts
│   │   ├── sanity.ts
│   │   └── stripe.ts
│   └── styles/
│       └── tokens.ts (design tokens)
├── tests/
│   ├── components/ (component unit tests)
│   ├── integration/ (API route tests)
│   └── e2e/ (Playwright tests)
├── tailwind.config.ts
├── next.config.ts
├── tsconfig.json
├── package.json
├── .env.local (not committed)
└── README.md
```

---

## Approval & Sign-Off

**Document Status:** ✅ Ready for Review

**Prepared By:** AI Development Agent (Zencoder)  
**Date:** January 26, 2026  
**Next Step:** Await user approval → Proceed to Technical Specification

**User Approval Required:**
- [ ] PRD reviewed and approved
- [ ] Open questions answered (Section 12.2)
- [ ] Brand assets provided or sourcing plan confirmed
- [ ] Third-party services configured (Stripe products, Sanity schema)

**Upon Approval:**
- Proceed to `spec.md` creation (Technical Specification)
- Begin Tailwind CSS configuration
- Set up component scaffolding in `src/features/landing/components/v2/`

---

*End of Product Requirements Document*
