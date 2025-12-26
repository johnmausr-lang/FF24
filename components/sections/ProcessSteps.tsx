"use client";

import React, { Suspense, useRef, useMemo, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { 
  useGLTF, 
  MeshTransmissionMaterial, 
  Environment, 
  Html, 
  Float, 
  ContactShadows, 
  PerspectiveCamera 
} from "@react-three/drei";
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
        // Делаем цвет чуть светлее, чтобы он был виден в тени
        mesh.material = new THREE.MeshStandardMaterial({
          color: "#1a1a1a", 
          metalness: 0.8,
          roughness: 0.2,
        });

        const name = child.name.toLowerCase();
        if (name.includes("light") || name.includes("neon") || name.includes("glow")) {
          mesh.material = new THREE.MeshStandardMaterial({
            color: "#E0FF64",
            emissive: "#E0FF64",
            emissiveIntensity: 20, // Увеличили яркость неона
          });
        }
      }
    });
  }, [scene]);

  return (
    <primitive 
      object={scene} 
      scale={5} 
      position={[0, -2.5, 0]} 
      rotation={[0, -Math.PI / 4, 0]} 
    />
  );
}

function StepCard({ data, index }: { data: any, index: number }) {
  const group = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (group.current) {
      const time = state.clock.getElapsedTime();
      const speed = 1.2;
      const offset = index * 5;
      // Бесконечное движение по диагонали
      let zPos = ((time * speed + offset) % 25) - 12;
      let xPos = -zPos;
      group.current.position.set(xPos, 1.4, zPos);
    }
  });

  return (
    <group ref={group}>
      <Float speed={2} rotationIntensity={0.1} floatIntensity={0.3}>
        {/* Основа карточки - полупрозрачное стекло */}
        <mesh>
          <boxGeometry args={[3.2, 1.8, 0.05]} />
          <meshPhysicalMaterial 
            transmission={1} 
            thickness={0.5} 
            roughness={0.1} 
            color="#ffffff" 
            transparent 
            opacity={0.8}
          />
        </mesh>
        {/* Контент карточки - УБРАН occlude для надежности */}
        <Html 
          transform 
          distanceFactor={3} 
          position={[0, 0, 0.06]} 
          pointerEvents="none"
        >
          <div className="w-[280px] p-6 bg-black/70 backdrop-blur-3xl border border-[#E0FF64]/30 rounded-[2.5rem] text-center shadow-[0_0_40px_rgba(0,0,0,0.8)]">
            <div className="text-[10px] font-black text-[#E0FF64] uppercase tracking-[0.4em] mb-2">ЭТАП 0{data.id}</div>
            <div className="text-2xl font-[900] italic uppercase text-white mb-1 leading-none tracking-tighter">{data.title}</div>
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
    <section id="process" className="relative h-[800px] w-full bg-[#050505] overflow-hidden border-y border-white/5">
      {/* Заголовок */}
      <div className="absolute top-20 left-10 md:left-20 z-20 pointer-events-none">
        <h2 className="text-6xl md:text-[120px] font-[1000] italic uppercase tracking-tighter leading-[0.8] opacity-5 text-outline absolute -top-10 -left-5">SYSTEM</h2>
        <h2 className="text-4xl md:text-8xl font-[900] italic uppercase tracking-tighter leading-none relative">
          Умный <span className="text-[#E0FF64] text-neon">Конвейер</span>
        </h2>
      </div>

      <Canvas shadows dpr={[1, 2]} gl={{ antialias: true }}>
        <PerspectiveCamera makeDefault position={[14, 12, 14]} fov={28} />
        <Suspense fallback={null}>
          <Environment preset="city" intensity={0.6} />
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={2} color="#E0FF64" />
          <spotLight position={[-10, 20, 10]} angle={0.15} penumbra={1} intensity={3} castShadow />
          
          <Model />

          {steps.map((step, i) => (
            <StepCard key={i} data={step} index={i} />
          ))}

          <ContactShadows position={[0, -2.5, 0]} opacity={0.4} scale={30} blur={2} color="#E0FF64" />
        </Suspense>
      </Canvas>

      {/* Нижний статус-бар */}
      <div className="absolute bottom-12 right-10 z-20 flex items-center gap-6 glass px-8 py-4 rounded-3xl border-white/5 bg-black/60">
        <div className="text-right">
          <div className="text-[10px] text-white/20 uppercase font-black tracking-widest">Статус</div>
          <div className="text-[#E0FF64] font-mono text-lg">ОПЕРАЦИОННО</div>
        </div>
        <div className="relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#E0FF64] opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-[#E0FF64]"></span>
        </div>
      </div>
    </section>
  );
};
