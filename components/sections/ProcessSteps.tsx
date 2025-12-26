"use client";

import React, { Suspense, useRef, useState, useEffect, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, Environment, Html, Float, ContactShadows, PerspectiveCamera } from "@react-three/drei";
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
          color: "#2a2a2a", // Сделали светлее, чтобы металл был виден
          metalness: 0.8,
          roughness: 0.2,
        });
      }
    });
  }, [scene]);

  // Разворот конвейера прямо вдоль оси Z
  return <primitive object={scene} scale={5.5} position={[0, -2.5, 0]} rotation={[0, 0, 0]} />;
}

function StepCard({ data, index }: { data: any, index: number }) {
  const group = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (group.current) {
      const time = state.clock.getElapsedTime();
      const speed = 1.4;
      const offset = index * 6;
      // Движение СТРОГО вдоль конвейера по оси Z
      let zPos = ((time * speed + offset) % 30) - 15; 
      group.current.position.set(0, 1.6, zPos);
    }
  });

  return (
    <group ref={group}>
      <Float speed={2.5} rotationIntensity={0.1} floatIntensity={0.5}>
        <mesh>
          <boxGeometry args={[3.5, 2, 0.05]} />
          <meshPhysicalMaterial transmission={1} thickness={0.5} roughness={0.1} color="#ffffff" transparent opacity={0.9} />
        </mesh>
        <Html transform distanceFactor={3} position={[0, 0, 0.06]} pointerEvents="none">
          <div className="w-[280px] p-8 bg-black/80 backdrop-blur-3xl border border-[#E0FF64]/40 rounded-[2.5rem] text-center shadow-2xl">
            <div className="text-[10px] font-black text-[#E0FF64] uppercase tracking-[0.5em] mb-3">ЭТАП 0{data.id}</div>
            <div className="text-3xl font-[900] italic uppercase text-white mb-2 tracking-tighter">{data.title}</div>
            <div className="text-[10px] text-white/40 font-bold uppercase tracking-widest">{data.desc}</div>
          </div>
        </Html>
      </Float>
    </group>
  );
}

export const ProcessSteps = () => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  if (!mounted) return <div className="h-[850px] w-full" />;

  return (
    <section id="process" className="relative h-[850px] w-full bg-transparent flex items-center justify-center overflow-hidden border-y border-white/5">
      <div className="absolute top-24 left-1/2 -translate-x-1/2 z-20 pointer-events-none text-center">
        <h2 className="text-6xl md:text-9xl font-[1000] italic uppercase tracking-tighter leading-none text-neon">
          Умный <span className="text-[#E0FF64]">Конвейер</span>
        </h2>
      </div>

      <Canvas shadows dpr={[1, 2]}>
        <PerspectiveCamera makeDefault position={[18, 12, 18]} fov={25} />
        <Suspense fallback={null}>
          <Environment preset="city" />
          <ambientLight intensity={0.9} /> {/* Яркий свет для видимости модели */}
          <pointLight position={[10, 15, 10]} intensity={3} color="#E0FF64" />
          <Model />
          {steps.map((step, i) => <StepCard key={i} data={step} index={i} />)}
          <ContactShadows position={[0, -2.5, 0]} opacity={0.5} scale={40} blur={2.5} color="#E0FF64" />
        </Suspense>
      </Canvas>
    </section>
  );
};
