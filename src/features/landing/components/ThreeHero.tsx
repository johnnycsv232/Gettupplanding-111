'use client';

import { Stars, AdaptiveDpr, AdaptiveEvents, PerformanceMonitor } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { useScroll } from 'framer-motion';
import { Suspense, useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import * as THREE from 'three';

import { LoadingFallback } from '@/components/ui/LoadingFallback';

import { CinematicLights } from './hero/CinematicLights';
import { HeroBackground } from './hero/HeroBackground';
import { HeroEffects } from './hero/HeroEffects';
import { ParticleField } from './hero/ParticleField';
import { RefractiveSphere } from './hero/RefractiveSphere';

/**
 * ThreeHero
 * The cinematic hero section of the landing page.
 * Orchestrates R3F 3D elements, post-processing, and scroll-linked UI transitions.
 */
export default function ThreeHero() {
  const [dpr, setDpr] = useState(2);
  const [scrollValue, setScrollValue] = useState(0);

  const { ref: inViewRef, inView } = useInView({ threshold: 0 });
  const { scrollYProgress } = useScroll();

  // We use a listener for the scroll value to pass it into R3F components that need frames
  // but we can also use scrollYProgress directly in some cases.
  // For the lights, we'll use a local state updated by a hook or just use the motion value.

  useEffect(() => {
    return scrollYProgress.on('change', (latest) => {
      setScrollValue(latest);
    });
  }, [scrollYProgress]);

  return (
    <div ref={inViewRef} className="absolute inset-0 z-0 overflow-hidden bg-deep-void">
      <HeroBackground scrollYProgress={scrollYProgress} />

      <div className="absolute inset-0 flex items-center justify-center">
        {inView && (
          <Canvas
            camera={{ position: [0, 0, 6], fov: 45 }}
            dpr={dpr}
            gl={{
              antialias: false,
              toneMapping: THREE.ACESFilmicToneMapping,
              toneMappingExposure: 1.2,
              powerPreference: 'high-performance',
            }}
          >
            <PerformanceMonitor onDecline={() => setDpr(1)} onIncline={() => setDpr(2)} />
            <AdaptiveDpr pixelated />
            <AdaptiveEvents />

            <Suspense fallback={<LoadingFallback />}>
              <CinematicLights scrollProgress={scrollValue} />
              <ParticleField />
              <RefractiveSphere />
              <Stars
                radius={50}
                depth={50}
                count={2000}
                factor={4}
                saturation={0.5}
                fade
                speed={1 + scrollValue * 5}
              />
              <HeroEffects dpr={dpr} />
            </Suspense>
          </Canvas>
        )}
      </div>
    </div>
  );
}
