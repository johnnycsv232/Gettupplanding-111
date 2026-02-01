'use client';

import React, { useRef, useMemo, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { MeshTransmissionMaterial, Sphere, Float, Stars, Trail } from '@react-three/drei';
import { EffectComposer, Bloom, ChromaticAberration, Vignette, Noise } from '@react-three/postprocessing';
import { BlendFunction } from 'postprocessing';
import * as THREE from 'three';

// Floating particles for atmosphere
function ParticleField() {
  const count = 500;
  const mesh = useRef<THREE.Points>(null);

  const particles = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    const goldColor = new THREE.Color('#d4af37');
    const magentaColor = new THREE.Color('#ff007f');

    for (let i = 0; i < count; i++) {
      // Spread particles in a sphere around the center
      // eslint-disable-next-line react-hooks/purity
      const radius = 15 + Math.random() * 25;
      // eslint-disable-next-line react-hooks/purity
      const theta = Math.random() * Math.PI * 2;
      // eslint-disable-next-line react-hooks/purity
      const phi = Math.acos(2 * Math.random() - 1);

      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi);

      // Alternate gold and magenta colors
      // eslint-disable-next-line react-hooks/purity
      const color = Math.random() > 0.7 ? magentaColor : goldColor;
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
    }

    return { positions, colors };
  }, []);

  useFrame((state) => {
    if (!mesh.current) return;
    mesh.current.rotation.y = state.clock.getElapsedTime() * 0.02;
    mesh.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.01) * 0.1;
  });

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[particles.positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[particles.colors, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.08}
        vertexColors
        transparent
        opacity={0.6}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

// Enhanced refractive sphere with premium materials
function RefractiveSphere() {
  const mesh = useRef<THREE.Mesh>(null);
  const innerGlow = useRef<THREE.Mesh>(null);

  const { viewport } = useThree();

  // Physics-based lag/smoothness
  const targetX = useRef(0);
  const targetY = useRef(0);

  useFrame((state) => {
    if (!mesh.current) return;

    // Smooth follow mouse with physics feel
    targetX.current = THREE.MathUtils.lerp(targetX.current, (state.mouse.x * viewport.width) / 2.5, 0.05);
    targetY.current = THREE.MathUtils.lerp(targetY.current, (state.mouse.y * viewport.height) / 2.5, 0.05);

    mesh.current.position.x = targetX.current;
    mesh.current.position.y = targetY.current;

    // Dynamic Scale Pulsing
    const scale = 1.2 + Math.sin(state.clock.getElapsedTime() * 0.5) * 0.08;
    mesh.current.scale.set(scale, scale, scale);

    // Complex Rotation
    mesh.current.rotation.x = state.clock.getElapsedTime() * 0.1;
    mesh.current.rotation.y = state.clock.getElapsedTime() * 0.15;

    // Animate inner glow
    if (innerGlow.current) {
      innerGlow.current.rotation.x = -state.clock.getElapsedTime() * 0.2;
      innerGlow.current.rotation.y = state.clock.getElapsedTime() * 0.3;
      const innerScale = 0.6 + Math.sin(state.clock.getElapsedTime() * 2) * 0.05;
      innerGlow.current.scale.set(innerScale, innerScale, innerScale);
    }
  });

  return (
    <Float speed={2} rotationIntensity={1.5} floatIntensity={2}>
      <Trail
        width={2}
        length={6}
        color="#d4af37"
        attenuation={(t) => t * t}
      >
        <Sphere ref={mesh} args={[1, 128, 128]}>
          <MeshTransmissionMaterial
            backside
            samples={64}
            thickness={1.8}
            chromaticAberration={0.5}
            anisotropy={0.6}
            distortion={1.5}
            distortionScale={0.6}
            temporalDistortion={0.5}
            clearcoat={1}
            clearcoatRoughness={0.05}
            attenuationDistance={1.2}
            attenuationColor="#ffffff"
            color="#d4af37"
            roughness={0.01}
            ior={1.8}
            metalness={0.3}
            iridescence={1}
            iridescenceIOR={1.5}
            iridescenceThicknessRange={[100, 400]}
          />
        </Sphere>
      </Trail>

      {/* Ghostly Inner Core with more intense glow */}
      <Sphere ref={innerGlow} args={[0.5, 64, 64]}>
        <meshStandardMaterial
          color="#ff007f"
          emissive="#ff007f"
          emissiveIntensity={4}
          transparent
          opacity={0.4}
          toneMapped={false}
        />
      </Sphere>

      {/* Secondary inner glow - gold */}
      <Sphere args={[0.35, 32, 32]}>
        <meshStandardMaterial
          color="#d4af37"
          emissive="#d4af37"
          emissiveIntensity={3}
          transparent
          opacity={0.3}
          toneMapped={false}
        />
      </Sphere>
    </Float>
  );
}

// Cinematic lighting setup
function CinematicLights() {
  const spotRef = useRef<THREE.SpotLight>(null);

  useFrame((state) => {
    if (spotRef.current) {
      // Subtle breathing animation
      spotRef.current.intensity = 3 + Math.sin(state.clock.getElapsedTime() * 0.5) * 0.5;
    }
  });

  return (
    <>
      {/* Key light - warm gold */}
      <spotLight
        ref={spotRef}
        position={[10, 10, 10]}
        angle={0.3}
        penumbra={1}
        intensity={3}
        color="#d4af37"
        castShadow
      />

      {/* Fill light - soft ambient */}
      <ambientLight intensity={0.3} color="#ffffff" />

      {/* Rim lights for edge definition */}
      <pointLight position={[-10, 5, -10]} color="#ff007f" intensity={2} distance={30} />
      <pointLight position={[10, -5, -10]} color="#00ffff" intensity={1.5} distance={25} />
      <pointLight position={[0, 10, 5]} color="#d4af37" intensity={1} distance={20} />

      {/* Back light for depth */}
      <spotLight
        position={[0, 0, -15]}
        angle={0.5}
        penumbra={0.8}
        intensity={2}
        color="#ff007f"
      />
    </>
  );
}

// Post-processing effects for cinematic look
function PostProcessingEffects({ dpr }: { dpr: number }) {
  return (
    <EffectComposer multisampling={dpr > 1 ? 4 : 0}>
      <Bloom
        intensity={1.5}
        luminanceThreshold={0.2}
        luminanceSmoothing={0.9}
        mipmapBlur
      />
      <ChromaticAberration
        offset={new THREE.Vector2(0.0005, 0.0005)}
        radialModulation={false}
        modulationOffset={0.5}
      />
      <Vignette
        offset={0.3}
        darkness={0.7}
        blendFunction={BlendFunction.NORMAL}
      />
      <Noise
        opacity={0.04}
        blendFunction={BlendFunction.OVERLAY}
      />
    </EffectComposer>
  );
}

import { useInView } from 'react-intersection-observer';
import { AdaptiveDpr, AdaptiveEvents, PerformanceMonitor } from '@react-three/drei';
import LoadingFallback from './LoadingFallback';
import { useState } from 'react';

export default function ThreeHero() {
  const [dpr, setDpr] = useState(2);
  const { ref, inView } = useInView({
    threshold: 0,
  });

  return (
    <div ref={ref} className="absolute inset-0 z-0 overflow-hidden bg-deep-void">
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        poster="/hero-video-poster.jpg"
        preload="metadata"
        className="h-full w-full object-cover opacity-30 scale-110 blur-[3px]"
      >
        <source src="/A_macro_productreveal_1080p_202601121922.mp4" type="video/mp4" />
      </video>

      {/* Overlay Canvas */}
      <div className="absolute inset-0 flex items-center justify-center">
        {inView && (
          <Canvas
            camera={{ position: [0, 0, 6], fov: 45 }}
            dpr={dpr}
            gl={{
              antialias: false, // Turned off manually for performance (AdaptiveDpr handles the rest)
              toneMapping: THREE.ACESFilmicToneMapping,
              toneMappingExposure: 1.2,
              powerPreference: 'high-performance',
            }}
          >
            <PerformanceMonitor onDecline={() => setDpr(1)} onIncline={() => setDpr(2)} />
            <AdaptiveDpr pixelated />
            <AdaptiveEvents />

            <Suspense fallback={<LoadingFallback />}>
              <CinematicLights />
              <ParticleField />
              <RefractiveSphere />
              <Stars
                radius={50}
                depth={50}
                count={2000} // Reduced for performance
                factor={4}
                saturation={0.5}
                fade
                speed={1}
              />
              <PostProcessingEffects dpr={dpr} />
            </Suspense>
          </Canvas>
        )}
      </div>

      {/* Radial gradient overlay */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.7)_100%)]" />

      {/* Top and bottom fade */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-deep-void pointer-events-none" />

      {/* Film grain overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
  );
}
