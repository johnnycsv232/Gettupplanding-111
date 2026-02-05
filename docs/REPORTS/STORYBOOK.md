# GettUpp Zenith: Storybook & Component Guide

## 🎨 Design System Overview
The Zenith design system is built for visual impact, high performance, and accessibility. It utilizes a custom Tailwind configuration with neon accents and glassmorphism.

### Tokens
- **Gold**: `--gold: #d4af37`
- **Neon Magenta**: `--neon-magenta: #ff007f`
- **Deep Void**: `--background: #050505`

---

## 🏗️ Core Components

### 1. CinematicRevealSection
- **Path**: `src/features/landing/components/CinematicRevealSection.tsx`
- **Purpose**: High-impact scroll-triggered video reveal.
- **Features**: GPU-accelerated transforms, Intersection Observer integration.

### 2. KineticCanvas
- **Path**: `src/features/landing/components/KineticCanvas.tsx`
- **Purpose**: Interactive fluid simulation background.
- **Performance**: Optimized WebGL/Canvas rendering.

### 3. GettUppNavbar
- **Path**: `src/features/landing/components/GettuppNavbar.tsx`
- **Purpose**: Sticky navigation with glassmorphism and active state tracking.

---

## 🛠️ Usage Guidelines

### Best Practices
- **Accessibility**: Always include `aria-label` for buttons and `aria-hidden` for decorative media.
- **Performance**: Use Turbine/Experimental optimizations for package imports.
- **Theming**: Adhere to the `globals.css` variable system for consistent color application.

---

## 🩺 Health & Validation
Run `npm run doctor` to verify that all components maintain design system invariants and SEO requirements.
