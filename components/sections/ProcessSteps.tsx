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

function GlassBox({ position, title, index }: { position: [number, number, number], title: string, index: number }) {
  const meshRef = useRef<THREE.Group>(null);

  useFrame(() => {
    if (!meshRef.current) return;
    meshRef.current.position.x -= 0.025; // Скорость движения коробок
    if (meshRef.current.position.x < -18) meshRef.current.position.x = 18;
  });

  return (
    <group ref={meshRef} position={position}>
      <Float speed={1.8} rotationIntensity={0.4} floatIntensity={0.4}>
        {/* Премиальная стеклянная коробка */}
        <mesh castShadow>
          <boxGeometry args={[2.8, 1.6, 1.4]} />
          <MeshTransmissionMaterial 
            backside
            samples={8}
            thickness={0.4}
            chromaticAberration={0.02}
            anisotropy={0.1}
            distortion={0.05}
            color="#ffffff"
            transmission={1}
            ior={1.2}
            transparent
            opacity={0.5}
          />
        </mesh>

        {/* Внутреннее свечение (индикатор статуса товара) */}
        <mesh>
          <boxGeometry args={[2.2, 1.2, 1.0]} />
          <meshStandardMaterial 
            color="#E0FF64" 
            emissive="#E0FF64" 
            emissiveIntensity={0.8} 
            transparent 
            opacity={0.15} 
          />
        </mesh>

        {/* Текст на фронтальной части коробки */}
        <Text position={[0, 0.25, 0.71]} fontSize={0.12} color="white" anchorX="center">
          {`CARGO ID-0${index + 1}`}
        </Text>
        <Text position={[0, -0.15, 0.71]} fontSize={0.24} color="#E0FF64" fontWeight="900" anchorX="center">
          {title.toUpperCase()}
        </Text>
      </Float>
    </group>
  );
}

export const ProcessSteps = () => {
  return (
    <section id="process" className="relative h-screen bg-black overflow-hidden">
      <div className="absolute top-24 left-12 z-10 pointer-events-none">
        <h2 className="text-6xl md:text-9xl font-black italic uppercase tracking-tighter text-white/90">
          КОНВЕЙЕР <span className="text-accent-lime">FF24</span>
        </h2>
        <div className="flex items-center gap-3 mt-4">
            <span className="w-2 h-2 bg-accent-lime rounded-full animate-ping" />
            <p className="text-accent-lime/60 uppercase tracking-[0.4em] font-bold text-sm">Real-time processing active</p>
        </div>
      </div>

      <Canvas shadows dpr={[1, 2]}>
        <PerspectiveCamera makeDefault position={[0, 8, 20]} fov={28} />
        
        <ambientLight intensity={0.1} />
        <pointLight position={[15, 15, 15]} intensity={3} color="#E0FF64" castShadow />
        
        {/* Линейный свет вдоль ленты */}
        <rectAreaLight
          width={40}
          height={1}
          intensity={15}
          color="#E0FF64"
          position={[0, 1, 0]}
          rotation={[-Math.PI / 2, 0, 0]}
        />
        
        <Suspense fallback={null}>
          <group rotation={[0, -Math.PI / 10, 0]} position={[0, -2, 0]}>
            <ConveyorModel scale={1.3} />

            {steps.map((step, i) => (
              <GlassBox 
                key={i} 
                index={i}
                title={step.title}
                position={[i * 6 - 15, 2.2, 0]} 
              />
            ))}
          </group>

          <Environment preset="city" />
          <ContactShadows position={[0, -2, 0]} opacity={0.4} scale={40} blur={3} far={5} />
        </Suspense>
      </Canvas>

      {/* Виньетка и градиенты для объема */}
      <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_150px_rgba(0,0,0,0.8)]" />
      <div className="absolute inset-y-0 left-0 w-80 bg-gradient-to-r from-black via-black/40 to-transparent z-20" />
      <div className="absolute inset-y-0 right-0 w-80 bg-gradient-to-l from-black via-black/40 to-transparent z-20" />
    </section>
  );
};
