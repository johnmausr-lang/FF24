"use client";

import React, { Suspense, useRef, useState, useEffect, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { 
  useGLTF, 
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

// Компонент модели с принудительной перекраской для видимости
function Model() {
  // Убедитесь, что файл лежит в public/models/conveyor.glb
  const { scene } = useGLTF("/models/conveyor.glb");
  
  useMemo(() => {
    scene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        // Устанавливаем светлый материал, чтобы точно увидеть объект
        mesh.material = new THREE.MeshStandardMaterial({
          color: "#444444", 
          metalness: 0.6,
          roughness: 0.2,
        });
      }
    });
  }, [scene]);

  return (
    <primitive 
      object={scene} 
      scale={6} 
      position={[0, -2, 0]} 
      rotation={[0, 0, 0]} 
    />
  );
}

// Компонент движущейся карточки
function StepCard({ data, index }: { data: any, index: number }) {
  const group = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (group.current) {
      const time = state.clock.getElapsedTime();
      const speed = 1.5;
      const offset = index * 6;
      // Движение по оси Z
      let zPos = ((time * speed + offset) % 30) - 15; 
      group.current.position.set(0, 1.8, zPos);
    }
  });

  return (
    <group ref={group}>
      <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
        <mesh>
          <boxGeometry args={[3.5, 2, 0.1]} />
          <meshStandardMaterial color="#ffffff" opacity={0.9} transparent />
        </mesh>
        <Html transform distanceFactor={4} position={[0, 0, 0.11]} pointerEvents="none">
          <div className="w-[280px] p-8 bg-black/90 backdrop-blur-xl border border-[#E0FF64]/50 rounded-[2.5rem] text-center shadow-2xl">
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

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <div className="h-[800px] w-full bg-black" />;

  return (
    <section id="process" className="relative h-[800px] w-full bg-[#050505] overflow-hidden border-y border-white/5">
      {/* Заголовок строго по центру */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 z-20 pointer-events-none text-center w-full px-4">
        <h2 className="text-5xl md:text-8xl font-[1000] italic uppercase tracking-tighter leading-none text-neon">
          Умный <span className="text-[#E0FF64]">Конвейер</span>
        </h2>
      </div>

      <Canvas shadows dpr={[1, 2]}>
        {/* Камера настроена так, чтобы сцена точно была в кадре */}
        <PerspectiveCamera makeDefault position={[15, 12, 15]} fov={30} />
        
        <Suspense fallback={<Html center><div className="text-[#E0FF64] font-black uppercase tracking-[0.5em] animate-pulse">Загрузка 3D...</div></Html>}>
          {/* Сверхмощный свет для гарантии видимости */}
          <Environment preset="city" />
          <ambientLight intensity={1.5} /> 
          <pointLight position={[10, 20, 10]} intensity={5} color="#E0FF64" />
          <directionalLight position={[-10, 20, -10]} intensity={2} />
          
          <Model />

          {steps.map((step, i) => (
            <StepCard key={i} data={step} index={i} />
          ))}

          <ContactShadows position={[0, -2, 0]} opacity={0.6} scale={40} blur={2} color="#E0FF64" />
        </Suspense>
      </Canvas>
    </section>
  );
};
