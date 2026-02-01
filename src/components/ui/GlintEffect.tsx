'use client';

import React from 'react';
import { motion, useMotionTemplate, useMotionValue, useSpring } from 'framer-motion';

interface GlintEffectProps {
  children: React.ReactNode;
  className?: string;
  glintColor?: string;
}

export default function GlintEffect({
  children,
  className = '',
  glintColor = 'rgba(255, 255, 255, 0.4)',
}: GlintEffectProps) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const mouseXSpring = useSpring(mouseX, { stiffness: 500, damping: 50 });
  const mouseYSpring = useSpring(mouseY, { stiffness: 500, damping: 50 });

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  const background = useMotionTemplate`
    radial-gradient(
      600px circle at ${mouseXSpring}px ${mouseYSpring}px,
      ${glintColor},
      transparent 80%
    )
  `;

  return (
    <div
      onMouseMove={handleMouseMove}
      className={`group relative overflow-hidden rounded-xl border border-white/10 bg-white/5 ${className}`}
    >
      <motion.div
        className="pointer-events-none absolute -inset-px opacity-0 transition duration-300 group-hover:opacity-100"
        style={{ background }}
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
}
