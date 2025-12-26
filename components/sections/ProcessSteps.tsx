"use client";

import React, { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, MeshTransmissionMaterial, Environment, Html, Float, ContactShadows } from "@react-three/drei";
import * as THREE from "three";
import { motion } from "framer-motion";

const steps = [
  { id: 1, title: "Приемка", desc: "Сверка артикулов" },
  { id: 2, title: "Контроль", desc: "Фото брака в TG" },
  { id: 3, title: "Маркировка", desc: "Печать КИЗ" },
  { id: 4, title: "Упаковка", desc: "Пузырьковая пленка" },
  { id: 5, title: "Отгрузка", desc: "Склад Коледино" },
];

function StepCard({ position, data }: { position: [number, number, number], data: any }) {
  const group = useRef<THREE.Group>(null);
  const scrollSpeed = 2;

  useFrame((state, delta) => {
    if (group.current) {
      group.current.position.z += delta * scrollSpeed;
      if (group.current.position.z > 6) {
        group.current.position.z = -14;
      }
    }
  });

  return (
    <group ref={group} position={position}>
      <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
        <mesh castShadow>
          <boxGeometry args={[2.5, 1.5, 0.08]} />
          <MeshTransmissionMaterial
            backside
            samples={4}
            thickness={0.2}
            chromaticAberration={0.05}
            anisotropy={0.1}
            distortion={0.1}
            temporalDistortion={0.1}
            color="#ffffff"
            transmission={1}
            transparent
          />
        </mesh>

        <Html
          transform
          occlude
          distanceFactor={1.8}
          position={[0, 0, 0.05]}
          className="pointer-events-none select-none"
        >
          <div className="w-[220px] p-6 bg-black/40 backdrop-blur-md border-accent-lime/20 border rounded-2xl text-center">
            <span className="text-[10px] font-black text-accent-lime/50 uppercase tracking-[0.3em]">Phase 0{data.id}</span>
            <h3 className="text-2xl font-black italic uppercase text-white my-1">{data.title}</h3>
            <p className="text-[9px] text-white/40 font-bold uppercase tracking-widest">{data.desc}</p>
          </div>
        </Html>
      </Float>
    </group>
  );
}

function Model() {
  const { scene } = useGLTF("/models/conveyor.glb");
  return <primitive object={scene} scale={2.2} position={[0, -1.2, 0]} rotation={[0, Math.PI / 2, 0]} />;
}

export const ProcessSteps = () => {
  return (
    <section id="process" className="relative h-[100vh] w-full bg-black overflow-hidden border-y border-white/5">
      <div className="absolute top-20 left-1/2 -translate-x-1/2 z-20 text-center w-full px-6">
        <motion.h2 
          initial={{ filter: "blur(20px)", opacity: 0 }}
          whileInView={{ filter: "blur(0px)", opacity: 1 }}
          className="text-6xl md:text-9xl font-black italic uppercase tracking-tighter"
        >
          Smart <span className="text-accent-lime">Line</span>
        </motion.h2>
      </div>

      <Canvas shadows camera={{ position: [8, 5, 10], fov: 30 }}>
        <color attach="background" args={["#000000"]} />
        <fog attach="fog" args={["#000", 8, 20]} />
        
        <Suspense fallback={null}>
          <Environment preset="night" />
          <ambientLight intensity={0.5} />
          <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={5} castShadow />
          
          <Model />

          {steps.map((step, i) => (
            <StepCard 
              key={step.id} 
              data={step} 
              position={[0, 0.8, i * -4]} 
            />
          ))}

          <ContactShadows position={[0, -1.2, 0]} opacity={0.4} scale={20} blur={2} far={4.5} />
        </Suspense>
      </Canvas>

      <div className="absolute bottom-12 left-12 z-20 hidden md:block">
        <div className="flex items-center gap-4 text-accent-lime">
          <div className="h-[1px] w-20 bg-accent-lime/30" />
          <span className="text-[10px] font-black uppercase tracking-[0.5em] animate-pulse">
            Live Logistics Stream
          </span>
        </div>
      </div>
    </section>
  );
};

useGLTF.preload("/models/conveyor.glb");
