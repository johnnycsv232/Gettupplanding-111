---
name: tailwind-framer-motion-glassmorphism
description: Mastering the interplay between Tailwind CSS utility classes and Framer Motion logic. Specialized in "Glassmorphism 2.0" and liquid-glass effects. Use when: tailwind animations, framer motion, glassmorphism, liquid glass.
---

# Tailwind & Framer Motion Glassmorphism

Bridging the gap between static utility-first design and dynamic, fluid animations.

## Coordination Patterns

### 1. Motion Variants + Tailwind Classes
Define your base styles in Tailwind (`className`) and your animatable properties in Framer Motion (`animate`).
```tsx
<motion.div 
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  className="glass-zenith p-6 rounded-2xl"
/>
```

### 2. Layout Transitions
Use `layout` prop with Tailwind's grid/flex system for seamless reordering animations.

### 3. Glass Effects
Coordinate `backdrop-blur` utilities with `initial/whileHover` scales for a tactile, premium feel.
