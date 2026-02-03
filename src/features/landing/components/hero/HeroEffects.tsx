'use client';

import {
  EffectComposer,
  Bloom,
  ChromaticAberration,
  Vignette,
  Noise,
  DepthOfField,
} from '@react-three/postprocessing';
import { BlendFunction } from 'postprocessing';
import * as THREE from 'three';

interface HeroEffectsProps {
  dpr: number;
}

/**
 * HeroEffects
 * Applies cinematic post-processing effects to the hero scene, including bloom, chromatic aberration, and vignette.
 */
export function HeroEffects({ dpr }: HeroEffectsProps) {
  return (
    <EffectComposer multisampling={dpr > 1 ? 4 : 0}>
      <Bloom intensity={2.0} luminanceThreshold={0.15} luminanceSmoothing={1.0} mipmapBlur />
      <ChromaticAberration
        offset={new THREE.Vector2(0.0008, 0.0008)}
        radialModulation={true}
        modulationOffset={0.4}
      />
      <DepthOfField focusDistance={0.012} focalLength={0.02} bokehScale={2} />
      <Vignette offset={0.4} darkness={0.8} blendFunction={BlendFunction.NORMAL} />
      <Noise opacity={0.05} blendFunction={BlendFunction.OVERLAY} />
    </EffectComposer>
  );
}
