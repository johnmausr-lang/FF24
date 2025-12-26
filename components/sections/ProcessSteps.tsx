"use client";

import React, { Suspense, useRef, useMemo, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, MeshTransmissionMaterial, Environment, Html, Float, ContactShadows } from "@react-three/drei";
import * as THREE from "three";

const steps = [
  { id: 1, title: "Приемка", desc: "Сверка и IT-учет" },
  { id: 2, title: "Контроль", desc: "Проверка на брак" },
  { id: 3, title: "Маркировка", desc: "Честный знак" },
  { id: 4, title: "Упаковка", desc: "Брендирование" },
  { id: 5, title: "Отгрузка", desc: "Доставка" },
];

function Model() {
  const { scene } = useGLTF("/models/conveyor.glb");
  
  useMemo(() => {
    scene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        mesh.material = new THREE.MeshStandardMaterial({
          color: "#050505",
          metalness: 1,
          roughness: 0.1,
        });

        if (child.name.toLowerCase().includes("light") || child.name.toLowerCase().includes("neon")) {
          mesh.material = new THREE.MeshStandardMaterial({
            color: "#E0FF64",
            emissive: "#E0FF64",
            emissiveIntensity: 15,
          });
        }
      }
    });
  }, [scene]);

  return <primitive object={scene} scale={5} position={[0, -2.5, 0]} rotation={[0, -Math.PI / 4, 0]} />;
}

function StepCard({ position, data, index }: { position: [number, number, number], data: any, index: number }) {
  const group = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (group.current) {
      const time = state.clock.getElapsedTime();
      const speed = 1.5;
      const offset = index * 5;
      let zPos = ((time * speed + offset) % 25) - 12;
      let xPos = -zPos;
      group.current.position.set(xPos, 1.2, zPos);
    }
  });

  return (
    <group ref={group}>
      <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
        <mesh>
          <boxGeometry args={[3, 1.8, 0.05]} />
          <MeshTransmissionMaterial
            samples={4}
            thickness={0.2}
            chromaticAberration={0.05}
            color="#ffffff"
            transmission={1}
          />
        </mesh>
        <Html transform occlude distanceFactor={3} position={[0, 0, 0.06]}>
          <div className="w-[260px] p-6 bg-black/60 backdrop-blur-xl border border-[#E0FF64]/20 rounded-[2rem] text-center select-none">
            <div className="text-[10px] font-black text-[#E0FF64] uppercase tracking-[0.4em] mb-2">Этап 0{data.id}</div>
            <div className="text-2xl font-[900] italic uppercase text-white mb-1 leading-none">{data.title}</div>
            <div className="text-[9px] text-white/40 font-bold uppercase tracking-widest">{data.desc}</div>
          </div>
        </Html>
      </Float>
    </group>
  );
}

export const ProcessSteps = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <div className="h-[800px] w-full bg-black" />;

  return (
    <section id="процесс" className="relative h-[800px] w-full bg-black overflow-hidden border-y border-white/5">
      <div className="absolute top-20 left-10 md:left-20 z-20 pointer-events-none">
        <h2 className="text-7xl md:text-[120px] font-[1000] italic uppercase tracking-tighter leading-[0.8] opacity-10 text-outline">ПРОЦЕСС</h2>
        <h2 className="text-5xl md:text-8xl font-[900] italic uppercase tracking-tighter leading-none mt-[-20px]">
          Умный <span className="text-[#E0FF64] text-neon">Поток</span>
        </h2>
      </div>

      <Canvas camera={{ position: [15, 12, 15], fov: 25 }}>
        <Suspense fallback={null}>
          <Environment preset="city" />
          <Model />
          {steps.map((step, i) => (
            <StepCard key={i} data={step} index={i} position={[0, 0, 0]} />
          ))}
          <ContactShadows position={[0, -2.5, 0]} opacity={0.6} scale={40} blur={2} color="#E0FF64" />
        </Suspense>
      </Canvas>
    </section>
  );
};
