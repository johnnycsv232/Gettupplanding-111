'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface CinematicLightsProps {
  scrollProgress: number;
}

/**
 * CinematicLights
 * Handles the dynamic lighting for the hero scene, transitioning from gold to midnight blue as the user scrolls.
 */
export function CinematicLights({ scrollProgress }: CinematicLightsProps) {
  const spotRef = useRef<THREE.SpotLight>(null);
  const ambientRef = useRef<THREE.AmbientLight>(null);

  useFrame((state) => {
    if (spotRef.current) {
      const baseIntensity = THREE.MathUtils.lerp(3, 0.5, scrollProgress);
      spotRef.current.intensity = baseIntensity + Math.sin(state.clock.getElapsedTime() * 0.5) * 0.5;

      const gold = new THREE.Color('#d4af37');
      const midnight = new THREE.Color('#1a1a2e');
      spotRef.current.color.lerpColors(gold, midnight, scrollProgress);
    }

    if (ambientRef.current) {
      ambientRef.current.intensity = THREE.MathUtils.lerp(0.3, 0.05, scrollProgress);
    }
  });

  return (
    <>
      <spotLight
        ref={spotRef}
        position={[10, 10, 10]}
        angle={0.3}
        penumbra={1}
        intensity={3}
        color="#d4af37"
        castShadow
      />
      <ambientLight ref={ambientRef} intensity={0.3} color="#ffffff" />
      <pointLight position={[-10, 5, -10]} color="#ff007f" intensity={2} distance={30} />
      <pointLight position={[10, -5, -10]} color="#00ffff" intensity={1.5} distance={25} />
      <pointLight position={[0, 10, 5]} color="#d4af37" intensity={1} distance={20} />
      <spotLight position={[0, 0, -15]} angle={0.5} penumbra={0.8} intensity={2} color="#ff007f" />
    </>
  );
}
