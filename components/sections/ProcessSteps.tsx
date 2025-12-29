"use client";

import React, { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { 
  PerspectiveCamera, 
  Text, 
  Environment,
  ContactShadows,
  Float,
  MeshTransmissionMaterial 
} from "@react-three/drei";
import * as THREE from "three";
import { ConveyorModel } from "../Conveyor";

const steps = [
  { title: "Заявка" },
  { title: "Забор" },
  { title: "Приёмка" },
  { title: "Маркировка" },
  { title: "Упаковка" },
  { title: "Отгрузка" },
  { title: "Финиш" },
];

function PremiumBox({ position, title, index }: { position: [number, number, number], title: string, index: number }) {
  const meshRef = useRef<THREE.Group>(null);

  useFrame(() => {
    if (!meshRef.current) return;
    meshRef.current.position.x -= 0.035; // Скорость движения
    if (meshRef.current.position.x < -22) meshRef.current.position.x = 22;
  });

  return (
    <group ref={meshRef} position={position}>
      <Float speed={2.5} rotationIntensity={0.6} floatIntensity={0.6}>
        {/* Стеклянный высокотехнологичный контейнер */}
        <mesh castShadow>
          <boxGeometry args={[3.4, 2, 1.6]} />
          <MeshTransmissionMaterial 
            backside
            samples={10}
            thickness={1}
            chromaticAberration={0.06}
            anisotropy={0.2}
            distortion={0.1}
            distortionScale={0.2}
            color="#ffffff"
            transmission={1}
            roughness={0.05}
          />
        </mesh>

        {/* Внутреннее неоновое ядро груза */}
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[2.6, 1.4, 1.2]} />
          <meshStandardMaterial 
            color="#E0FF64" 
            emissive="#E0FF64" 
            emissiveIntensity={1.5} 
            transparent 
            opacity={0.25} 
          />
        </mesh>

        {/* Инфо-панель на коробе */}
        <Text position={[0, 0.3, 0.81]} fontSize={0.16} color="white" anchorX="center" font="/font.woff">
          {`UNIT ID: 24-0${index + 1}`}
        </Text>
        <Text position={[0, -0.2, 0.81]} fontSize={0.32} color="#E0FF64" fontWeight="900" anchorX="center">
          {title.toUpperCase()}
        </Text>
      </Float>
    </group>
  );
}

export const ProcessSteps = () => {
  return (
    <section id="process" className="relative h-screen bg-black overflow-hidden">
      {/* Overlay UI */}
      <div className="absolute top-20 left-12 z-10 pointer-events-none">
        <h2 className="text-6xl md:text-9xl font-black italic uppercase tracking-tighter text-white drop-shadow-2xl">
          КОНВЕЙЕР <span className="text-accent-lime">FF24</span>
        </h2>
        <div className="flex items-center gap-4 mt-6">
            <div className="w-3 h-3 bg-accent-lime rounded-full animate-pulse shadow-[0_0_15px_#E0FF64]" />
            <p className="text-accent-lime/80 uppercase tracking-[0.5em] font-black text-xs">
                Logistics engine v2.0 // Active
            </p>
        </div>
      </div>

      <Canvas shadows dpr={[1, 2]} gl={{ antialias: true }}>
        <PerspectiveCamera makeDefault position={[0, 10, 25]} fov={28} />
        
        {/* Освещение для драматичного эффекта */}
        <ambientLight intensity={0.1} />
        <spotLight position={[20, 20, 20]} angle={0.15} penumbra={1} intensity={2} color="#E0FF64" castShadow />
        
        {/* Линейная подсветка конвейерной линии */}
        <rectAreaLight
          width={60}
          height={3}
          intensity={25}
          color="#E0FF64"
          position={[0, 2, 0]}
          rotation={[-Math.PI / 2, 0, 0]}
        />
        
        <Suspense fallback={null}>
          <group rotation={[0, -Math.PI / 12, 0]} position={[0, -4, 0]}>
            {/* 3D модель конвейера */}
            <ConveyorModel scale={1.6} />

            {/* Стеклянные короба */}
            {steps.map((step, i) => (
              <PremiumBox 
                key={i} 
                index={i}
                title={step.title}
                position={[i * 8 - 20, 3.5, 0]} 
              />
            ))}
          </group>

          <Environment preset="night" />
          <ContactShadows position={[0, -4, 0]} opacity={0.6} scale={60} blur={3} far={8} />
        </Suspense>
      </Canvas>

      {/* Кинематографические градиенты */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_50%_50%,transparent_0%,rgba(0,0,0,0.4)_100%)]" />
      <div className="absolute inset-y-0 left-0 w-96 bg-gradient-to-r from-black via-black/60 to-transparent z-20" />
      <div className="absolute inset-y-0 right-0 w-96 bg-gradient-to-l from-black via-black/60 to-transparent z-20" />
    </section>
  );
};
