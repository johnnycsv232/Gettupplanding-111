'use client';

import React, { useRef } from 'react';
import { useFrame, useThree, extend } from '@react-three/fiber';
import { MeshTransmissionMaterial, Sphere, Float, Trail, shaderMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { use3DHeatmap } from '@/lib/analytics/use3DHeatmap';

// Custom Energy Pulse Shader
class PulseMaterialImpl extends THREE.ShaderMaterial {
  uTime: number = 0;
  uColor: THREE.Color = new THREE.Color('#ff007f');
  uIntensity: number = 1.0;
}

const PulseMaterial = shaderMaterial(
  {
    uTime: 0,
    uColor: new THREE.Color('#ff007f'),
    uIntensity: 1.0,
  },
  // Vertex Shader
  `
  varying vec2 vUv;
  varying vec3 vPosition;
  varying vec3 vNormal;
  void main() {
    vUv = uv;
    vPosition = position;
    vNormal = normalize(normalMatrix * normal);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
  `,
  // Fragment Shader
  `
  uniform float uTime;
  uniform vec3 uColor;
  uniform float uIntensity;
  varying vec2 vUv;
  varying vec3 vPosition;
  varying vec3 vNormal;

  void main() {
    float viewDotNormal = 1.0 - max(dot(vNormal, vec3(0, 0, 1)), 0.0);
    float pulse = sin(uTime * 3.0) * 0.5 + 0.5;
    float fresnel = pow(viewDotNormal, 3.0);

    // Create animated energy rings
    float rings = sin(length(vPosition) * 20.0 - uTime * 5.0) * 0.5 + 0.5;
    float strength = (fresnel + rings * 0.2) * pulse * uIntensity;

    gl_FragColor = vec4(uColor, strength);
  }
  `
);

extend({ PulseMaterial });

declare module '@react-three/fiber' {
  interface ThreeElements {
    pulseMaterial: React.DetailedHTMLProps<React.HTMLAttributes<THREE.ShaderMaterial>, THREE.ShaderMaterial> & {
      uTime?: number;
      uColor?: THREE.Color;
      uIntensity?: number;
      transparent?: boolean;
      depthWrite?: boolean;
      blending?: number;
      attach?: string;
    };
  }
}

/**
 * RefractiveSphere
 * The centerpiece of the hero scene, featuring glass-like refraction and an internal energy pulse.
 */
export function RefractiveSphere() {
  const mesh = useRef<THREE.Mesh>(null);
  const innerGlow = useRef<THREE.Mesh>(null);
  const pulseRef = useRef<PulseMaterialImpl>(null);
  const { trackInteraction } = use3DHeatmap('hero-sphere');
  const { viewport } = useThree();

  // Physics-based lag/smoothness
  const targetX = useRef(0);
  const targetY = useRef(0);

  useFrame((state) => {
    if (!mesh.current) return;

    // Smooth follow mouse
    targetX.current = THREE.MathUtils.lerp(targetX.current, (state.mouse.x * viewport.width) / 2.5, 0.05);
    targetY.current = THREE.MathUtils.lerp(targetY.current, (state.mouse.y * viewport.height) / 2.5, 0.05);

    mesh.current.position.x = targetX.current;
    mesh.current.position.y = targetY.current;

    // Scale Pulsing
    const scale = 1.2 + Math.sin(state.clock.getElapsedTime() * 0.5) * 0.08;
    mesh.current.scale.set(scale, scale, scale);

    // Rotation
    mesh.current.rotation.x = state.clock.getElapsedTime() * 0.1;
    mesh.current.rotation.y = state.clock.getElapsedTime() * 0.15;

    // Inner Glow Animation
    if (innerGlow.current) {
      innerGlow.current.rotation.x = -state.clock.getElapsedTime() * 0.2;
      innerGlow.current.rotation.y = state.clock.getElapsedTime() * 0.3;
      const innerScale = 0.6 + Math.sin(state.clock.getElapsedTime() * 2) * 0.05;
      innerGlow.current.scale.set(innerScale, innerScale, innerScale);
    }

    // Shader uniform update
    if (pulseRef.current) {
      const freq = Math.sin(state.clock.getElapsedTime() * 10.0) * 0.5 + 0.5;
      pulseRef.current.uTime = state.clock.getElapsedTime();
      pulseRef.current.uIntensity = (1.0 + freq * 1.5) * 2.5;
    }
  });

  return (
    <Float speed={2} rotationIntensity={1.5} floatIntensity={2}>
      <Trail width={2} length={6} color="#d4af37" attenuation={(t) => t * t}>
        <Sphere
          ref={mesh}
          args={[1, 128, 128]}
          onPointerMove={(e) => trackInteraction(e.point.x, e.point.y, 'hover')}
          onClick={(e) => trackInteraction(e.point.x, e.point.y, 'click')}
        >
          <MeshTransmissionMaterial
            backside
            samples={32}
            thickness={1.8}
            chromaticAberration={0.5}
            anisotropy={0.3}
            distortion={1.2}
            distortionScale={0.5}
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

      <Sphere ref={innerGlow} args={[0.55, 64, 64]}>
        <pulseMaterial
          ref={pulseRef}
          transparent
          uColor={new THREE.Color('#ff007f')}
          uIntensity={2.5}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </Sphere>

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
