'use client';

import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Sphere, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

function AnimatedSphere() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    const { clock } = state;
    // Subtle rotation
    meshRef.current.rotation.x = clock.getElapsedTime() * 0.1;
    meshRef.current.rotation.y = clock.getElapsedTime() * 0.15;
  });

  return (
    <Float speed={1.5} rotationIntensity={1} floatIntensity={2}>
      <Sphere args={[1.5, 64, 64]} ref={meshRef}>
        <MeshDistortMaterial
          color="#D4AF37" // Metallic Gold
          attach="material"
          distort={0.4}
          speed={2}
          roughness={0.1}
          metalness={0.8}
        />
      </Sphere>
    </Float>
  );
}

function GridBackground() {
  return (
    <gridHelper
      args={[100, 50, '#1E293B', '#0F172A']}
      position={[0, -5, 0]}
      rotation={[Math.PI / 2, 0, 0]}
    />
  );
}

export default function MeshBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 opacity-40">
      <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#D4AF37" />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#FF007F" />
        <AnimatedSphere />
        <GridBackground />
      </Canvas>
    </div>
  );
}
