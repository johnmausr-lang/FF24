"use client";

import React, { Suspense, useRef, useMemo } from "react";
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
        // Глубокий черный хром, чтобы отражал звезды фона
        mesh.material = new THREE.MeshStandardMaterial({
          color: "#020202",
          metalness: 1,
          roughness: 0.25,
        });

        // Ищем светящиеся элементы и заставляем их гореть ярко-лаймовым
        if (child.name.toLowerCase().includes("light") || child.name.toLowerCase().includes("neon") || child.name.toLowerCase().includes("emission")) {
          mesh.material = new THREE.MeshStandardMaterial({
            color: "#E0FF64",
            emissive: "#E0FF64",
            emissiveIntensity: 12,
          });
        }
      }
    });
  }, [scene]);

  return (
    <primitive 
      object={scene} 
      scale={5} // Еще крупнее для иммерсивности
      position={[0, -2.5, 0]} 
      // Разворот так, чтобы он шел "вдоль" взгляда, а не поперек
      rotation={[0, -Math.PI / 4, 0]} 
    />
  );
}

function StepCard({ position, data }: { position: [number, number, number], data: any }) {
  const group = useRef<THREE.Group>(null);
  
  useFrame((state, delta) => {
    if (group.current) {
      // Движение карточек синхронно с линией конвейера
      group.current.position.z += delta * 1.2;
      group.current.position.x -= delta * 1.2; // Движение по диагонали
      
      if (group.current.position.z > 8) {
        group.current.position.z = -12;
        group.current.position.x = 12;
      }
    }
  });

  return (
    <group ref={group} position={position}>
      <Float speed={2} rotationIntensity={0.3} floatIntensity={0.4}>
        <mesh>
          <boxGeometry args={[2.8, 1.8, 0.05]} />
          <MeshTransmissionMaterial
            samples={4}
            thickness={0.15}
            chromaticAberration={0.05}
            color="#ffffff"
            transmission={1}
          />
        </mesh>
        <Html transform occlude distanceFactor={2.5} position={[0, 0, 0.06]}>
          <div className="w-[260px] p-6 bg-black/40 backdrop-blur-2xl border border-accent-lime/20 rounded-[2rem] text-center select-none shadow-[0_0_30px_rgba(224,255,100,0.1)]">
            <div className="text-[10px] font-black text-accent-lime uppercase tracking-[0.4em] mb-2">Step 0{data.id}</div>
            <div className="text-2xl font-[900] italic uppercase text-white mb-1 leading-none">{data.title}</div>
            <div className="text-[9px] text-white/40 font-bold uppercase tracking-widest">{data.desc}</div>
          </div>
        </Html>
      </Float>
    </group>
  );
}

export const ProcessSteps = () => {
  return (
    <section id="process" className="relative h-[800px] w-full bg-black overflow-hidden border-y border-white/5">
      {/* Заголовок вживлен в сцену */}
      <div className="absolute top-20 left-10 md:left-20 z-20 pointer-events-none">
        <h2 className="text-7xl md:text-[120px] font-[1000] italic uppercase tracking-tighter leading-[0.8] opacity-20 text-outline">
          Process
        </h2>
        <h2 className="text-5xl md:text-8xl font-[900] italic uppercase tracking-tighter leading-none mt-[-20px]">
          Smart <span className="text-accent-lime text-neon">Flow</span>
        </h2>
      </div>

      {/* Затемнение краев, чтобы канвас не выглядел как квадратное окно */}
      <div className="absolute inset-0 z-10 pointer-events-none bg-gradient-to-b from-black via-transparent to-black opacity-80" />
      <div className="absolute inset-y-0 left-0 w-32 z-10 bg-gradient-to-r from-black to-transparent" />
      <div className="absolute inset-y-0 right-0 w-32 z-10 bg-gradient-to-l from-black to-transparent" />

      <Canvas camera={{ position: [12, 8, 12], fov: 25 }}>
        <Suspense fallback={null}>
          <Environment preset="city" />
          <ambientLight intensity={0.2} />
          <pointLight position={[10, 10, 10]} intensity={2} color="#E0FF64" />
          
          <Model />

          {steps.map((step, i) => (
            <StepCard 
              key={step.id} 
              data={step} 
              // Начальные позиции по диагонали
              position={[i * 4, 1, i * -4]} 
            />
          ))}

          <ContactShadows position={[0, -2.5, 0]} opacity={0.7} scale={40} blur={2} far={5} color="#E0FF64" />
        </Suspense>
      </Canvas>

      {/* Нижний статус-бар */}
      <div className="absolute bottom-12 right-10 z-20 flex items-center gap-4">
        <div className="text-right">
          <div className="text-[10px] text-white/20 uppercase font-black tracking-widest">System Load</div>
          <div className="text-accent-lime font-mono text-lg">98.4% NOMINAL</div>
        </div>
        <div className="w-10 h-10 border border-accent-lime/20 rounded-full flex items-center justify-center">
          <div className="w-2 h-2 bg-accent-lime rounded-full animate-ping" />
        </div>
      </div>
    </section>
  );
};
