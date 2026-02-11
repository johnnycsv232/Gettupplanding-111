'use client';

import { OrbitControls, Text, Float, MeshDistortMaterial, ContactShadows } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { motion } from 'framer-motion';
import { Suspense, useState } from 'react';

const services = [
  { name: 'PRODUCTION', color: '#d4af37', desc: '4K Cinematic Storytelling' },
  { name: 'STRATEGY', color: '#ff007f', desc: 'Viral Growth Mechanics' },
  { name: 'TALENT', color: '#00ffff', desc: 'Elite Creator Network' },
];

interface Service {
  name: string;
  color: string;
  desc: string;
}

interface ServiceOrbProps {
  service: Service;
  index: number;
  active: boolean;
  onClick: () => void;
}

function ServiceOrb({ service, index, active, onClick }: ServiceOrbProps) {
  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <mesh
        position={[index * 3 - 3, 0, 0]}
        onClick={onClick}
        onPointerOver={() => (document.body.style.cursor = 'pointer')}
        onPointerOut={() => (document.body.style.cursor = 'auto')}
      >
        <sphereGeometry args={[1, 64, 64]} />
        <MeshDistortMaterial
          color={active ? service.color : '#222'}
          speed={active ? 3 : 1}
          distort={active ? 0.4 : 0.2}
          roughness={0.1}
          metalness={0.8}
        />
        <Text
          position={[0, -1.5, 0]}
          fontSize={0.2}
          color="white"
          font="/fonts/Inter-Bold.woff"
          anchorX="center"
          anchorY="middle"
        >
          {service.name}
        </Text>
      </mesh>
    </Float>
  );
}

/**
 * KineticCanvas
 * An interactive 3D service explorer using React Three Fiber.
 */
export const KineticCanvas = () => {
  const [activeIdx, setActiveIdx] = useState(0);

  return (
    <section className="relative h-[600px] w-full bg-black py-20">
      <div className="container mx-auto flex h-full flex-col items-center gap-12 px-4 md:flex-row">
        <div className="flex-1 space-y-6">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="flex flex-col space-y-4"
          >
            <span className="text-[12px] font-black tracking-[0.4em] text-vegas-gold">
              KINETIC EXPLORATION
            </span>
            <h2 className="font-display text-5xl uppercase tracking-tighter text-white">
              INTERACT WITH <br />
              <span className="text-white/20">THE ARSENAL</span>
            </h2>
          </motion.div>

          <p className="text-off-white/40 max-w-md leading-relaxed">
            Click the orbs to explore our core specializations. Physics-driven, immersive, and built
            for high-conversion engagement.
          </p>

          <div className="glass-heavy rounded-3xl border-white/10 bg-white/5 p-8">
            <h3 className="mb-2 font-display text-2xl font-bold tracking-widest text-white">
              {services[activeIdx].name}
            </h3>
            <p className="text-off-white/60">{services[activeIdx].desc}</p>
          </div>
        </div>

        <div className="size-full min-h-[400px] flex-1">
          <Canvas camera={{ position: [0, 0, 8], fov: 35 }}>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} intensity={1} color="#d4af37" />
            <spotLight
              position={[-10, 10, 10]}
              angle={0.15}
              penumbra={1}
              intensity={2}
              color="#ff007f"
            />

            <Suspense fallback={null}>
              {services.map((s, i) => (
                <ServiceOrb
                  key={i}
                  service={s}
                  index={i}
                  active={activeIdx === i}
                  onClick={() => setActiveIdx(i)}
                />
              ))}
              <ContactShadows
                position={[0, -2.5, 0]}
                opacity={0.4}
                scale={20}
                blur={2.5}
                far={4.5}
              />
            </Suspense>
            <OrbitControls enableZoom={false} makeDefault />
          </Canvas>
        </div>
      </div>
    </section>
  );
};
