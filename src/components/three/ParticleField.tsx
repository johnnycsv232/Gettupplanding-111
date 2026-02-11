'use client';

import { Sparkles, Float } from '@react-three/drei';
import { Canvas, useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import * as THREE from 'three';

interface ParticleFieldProps {
  count?: number;
  color?: string;
  speed?: number;
  size?: number;
}

function Particles({ count = 200, color = '#FFC72C', speed = 0.5, size = 2 }: ParticleFieldProps) {
  const ref = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (ref.current) {
      // Subtle parallax based on mouse position
      const { x, y } = state.pointer;
      ref.current.rotation.x = THREE.MathUtils.lerp(ref.current.rotation.x, y * 0.1, 0.1);
      ref.current.rotation.y = THREE.MathUtils.lerp(ref.current.rotation.y, x * 0.1, 0.1);
    }
  });

  return (
    <group ref={ref}>
      <Float speed={speed} rotationIntensity={0.5} floatIntensity={0.5}>
        <Sparkles count={count} scale={12} size={size} speed={0.4} opacity={0.6} color={color} />
      </Float>
    </group>
  );
}

export function ParticleField(props: ParticleFieldProps) {
  return (
    <div className="pointer-events-none absolute inset-0 z-0">
      <Canvas camera={{ position: [0, 0, 5], fov: 60 }} gl={{ alpha: true }}>
        <Particles {...props} />
      </Canvas>
    </div>
  );
}
