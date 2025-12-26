"use client";

import React, { Suspense, useRef, useState, useEffect, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { 
  useGLTF, 
  Environment, 
  Html, 
  Float, 
  ContactShadows, 
  PerspectiveCamera,
  MeshTransmissionMaterial 
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
  // Загружаем модель по пути из вашей структуры
  const { scene } = useGLTF("/models/conveyor.glb");
  
  useMemo(() => {
    scene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        // Сделали металл светлее (было #020202), чтобы он не пропадал в тени
        mesh.material = new THREE.MeshStandardMaterial({
          color: "#2a2a2a", 
          metalness: 0.9,
          roughness: 0.1,
        });

        // Подсветка неоновых линий
        const name = child.name.toLowerCase();
        if (name.includes("light") || name.includes("neon") || name.includes("glow")) {
          mesh.material = new THREE.MeshStandardMaterial({
            color: "#E0FF64",
            emissive: "#E0FF64",
            emissiveIntensity: 15,
          });
        }
      }
    });
  }, [scene]);

  return (
    <primitive 
      object={scene} 
      scale={5.5} 
      position={[0, -2.5, 0]} 
      rotation={[0, 0, 0]} // Конвейер стоит прямо вдоль оси Z
    />
  );
}

function StepCard({ data, index }: { data: any, index: number }) {
  const group = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (group.current) {
      const time = state.clock.getElapsedTime();
      const speed = 1.4;
      const offset = index * 6;
      // Движение карточек СТРОГО вдоль конвейера по оси Z
      let zPos = ((time * speed + offset) % 30) - 15; 
      group.current.position.set(0, 1.6, zPos);
    }
  });

  return (
    <group ref={group}>
      <Float speed={2.5} rotationIntensity={0.1} floatIntensity={0.5}>
        <mesh>
          <boxGeometry args={[3.5, 2, 0.05]} />
          {/* Стеклянный материал карточки */}
          <meshPhysicalMaterial 
            transmission={1} 
            thickness={0.5} 
            roughness={0.1} 
            color="#ffffff" 
            transparent 
            opacity={0.9} 
          />
        </mesh>
        <Html transform distanceFactor={3} position={[0, 0, 0.06]} pointerEvents="none">
          <div className="w-[280px] p-8 bg-black/80 backdrop-blur-3xl border border-[#E0FF64]/40 rounded-[2.5rem] text-center shadow-2xl">
            <div className="text-[10px] font-black text-[#E0FF64] uppercase tracking-[0.5em] mb-3">ЭТАП 0{data.id}</div>
            <div className="text-3xl font-[900] italic uppercase text-white mb-2 tracking-tighter leading-none">{data.title}</div>
            <div className="text-[10px] text-white/40 font-bold uppercase tracking-widest">{data.desc}</div>
          </div>
        </Html>
      </Float>
    </group>
  );
}

export const ProcessSteps = () => {
  const [mounted, setMounted] = useState(false);

  // Исправляем ошибку гидратации: рендерим Canvas только после монтирования в браузере
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <div className="h-[850px] w-full bg-black" />;

  return (
    <section id="process" className="relative h-[850px] w-full bg-transparent flex items-center justify-center overflow-hidden border-y border-white/5">
      {/* Заголовок секции */}
      <div className="absolute top-24 left-1/2 -translate-x-1/2 z-20 pointer-events-none text-center w-full">
        <h2 className="text-6xl md:text-9xl font-[1000] italic uppercase tracking-tighter leading-none text-neon">
          Умный <span className="text-[#E0FF64]">Конвейер</span>
        </h2>
      </div>

      <Canvas shadows dpr={[1, 2]}>
        <PerspectiveCamera makeDefault position={[18, 12, 18]} fov={25} />
        <Suspense fallback={null}>
          <Environment preset="city" />
          {/* Значительно усилили свет, чтобы модель была видна */}
          <ambientLight intensity={1.2} /> 
          <pointLight position={[10, 15, 10]} intensity={3} color="#E0FF64" />
          
          <Model />

          {steps.map((step, i) => (
            <StepCard key={i} data={step} index={i} />
          ))}

          <ContactShadows 
            position={[0, -2.5, 0]} 
            opacity={0.5} 
            scale={40} 
            blur={2.5} 
            color="#E0FF64" 
          />
        </Suspense>
      </Canvas>
      
      {/* Фоновое свечение для глубины */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black pointer-events-none z-10" />
    </section>
  );
};
