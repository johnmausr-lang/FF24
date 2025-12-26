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
  PerspectiveCamera,
} from "@react-three/drei";
import * as THREE from "three";
import { motion } from "framer-motion";

const steps = [
  { id: 1, title: "Приемка", desc: "Сверка и IT-учет" },
  { id: 2, title: "Контроль", desc: "Проверка на брак" },
  { id: 3, title: "Маркировка", desc: "Честный знак" },
  { id: 4, title: "Упаковка", desc: "Брендирование" },
  { id: 5, title: "Отгрузка", desc: "Доставка" },
];

function ConveyorModel() {
  // Загружаем модель. Убедитесь, что файл лежит в public/models/conveyor.glb
  const { scene } = useGLTF("/models/conveyor.glb");
  const beltMaterialRef = useRef<THREE.MeshStandardMaterial>(null);

  useMemo(() => {
    scene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        
        // Базовая настройка материалов, если имена не совпадут
        mesh.material = new THREE.MeshStandardMaterial({
          color: "#111111",
          metalness: 0.8,
          roughness: 0.2,
        });

        const name = child.name.toLowerCase();
        
        // Подсветка (неон)
        if (name.includes("light") || name.includes("neon") || name.includes("glow")) {
          mesh.material = new THREE.MeshStandardMaterial({
            color: "#E0FF64",
            emissive: "#E0FF64",
            emissiveIntensity: 10,
          });
        }
        
        // Лента (анимация)
        if (name.includes("belt") || name.includes("line")) {
            // @ts-ignore
            beltMaterialRef.current = mesh.material;
        }
      }
    });
  }, [scene]);

  useFrame((state, delta) => {
    // Двигаем текстуру ленты, если она найдена
    if (beltMaterialRef.current && beltMaterialRef.current.map) {
        beltMaterialRef.current.map.offset.y -= delta * 0.4;
    }
  });

  return <primitive object={scene} scale={5} position={[0, -2.5, 0]} rotation={[0, -Math.PI / 4, 0]} />;
}

function StepCard({ data, index }: { data: any, index: number }) {
  const group = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (group.current) {
      const time = state.clock.getElapsedTime();
      const speed = 1.2;
      const offset = index * 5;
      let zPos = ((time * speed + offset) % 25) - 12;
      let xPos = -zPos; 
      group.current.position.set(xPos, 1.2, zPos);
    }
  });

  return (
    <group ref={group}>
      <Float speed={2} rotationIntensity={0.3} floatIntensity={0.5}>
        <mesh>
          <boxGeometry args={[3, 1.8, 0.05]} />
          <MeshTransmissionMaterial
            samples={6}
            thickness={0.2}
            chromaticAberration={0.05}
            transmission={1}
            color="#ffffff"
          />
        </mesh>
        <Html transform occlude distanceFactor={3} position={[0, 0, 0.06]}>
          <div className="w-[260px] p-6 bg-black/60 backdrop-blur-2xl border border-white/10 rounded-[2rem] text-center select-none shadow-2xl">
            <div className="text-[10px] font-black text-accent-lime uppercase tracking-[0.4em] mb-2">Phase 0{data.id}</div>
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

  // Исправление ошибки гидратации: рендерим Canvas только на клиенте
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <div className="h-[800px] w-full bg-black" />; // Заглушка для сервера

  return (
    <section id="process" className="relative h-[800px] w-full bg-black overflow-hidden border-y border-white/5">
      
      {/* HUD Тексты */}
      <div className="absolute top-20 left-10 md:left-20 z-20 pointer-events-none">
        <h2 className="text-7xl md:text-[140px] font-[1000] italic uppercase tracking-tighter leading-[0.7] opacity-10 text-outline absolute -top-10 -left-5">
          SYSTEM
        </h2>
        <h2 className="text-5xl md:text-8xl font-[900] italic uppercase tracking-tighter leading-none relative">
          Smart <span className="text-accent-lime text-neon">Workflow</span>
        </h2>
      </div>

      <div className="absolute inset-0 z-10 pointer-events-none bg-gradient-to-b from-black via-transparent to-black" />

      <Canvas shadows dpr={[1, 1.5]}>
        <PerspectiveCamera makeDefault position={[15, 12, 15]} fov={25} />
        <Suspense fallback={null}>
          <Environment preset="city" />
          <ambientLight intensity={0.5} />
          <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={2} color="#E0FF64" castShadow />
          
          <ConveyorModel />

          {steps.map((step, i) => (
            <StepCard key={i} data={step} index={i} />
          ))}

          <ContactShadows position={[0, -2.5, 0]} opacity={0.5} scale={40} blur={2} color="#000000" />
        </Suspense>
      </Canvas>

      <div className="absolute bottom-12 right-10 z-20 flex items-center gap-6 glass px-8 py-4 rounded-3xl">
        <div className="text-right">
          <div className="text-[10px] text-white/20 uppercase font-black tracking-widest">Active Status</div>
          <div className="text-accent-lime font-mono text-xl">OPERATIONAL</div>
        </div>
        <div className="relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-lime opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-accent-lime"></span>
        </div>
      </div>
    </section>
  );
};
