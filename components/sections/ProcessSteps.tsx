"use client";

import React, { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  PerspectiveCamera,
  Environment,
  ContactShadows,
  MeshTransmissionMaterial,
  Text,
  Float,
} from "@react-three/drei";
import { ConveyorModel } from "../Conveyor";
import * as THREE from "three";

const steps = [
  { title: "Заявка" },
  { title: "Забор" },
  { title: "Приёмка" },
  { title: "Маркировка" },
  { title: "Упаковка" },
  { title: "Отгрузка" },
  { title: "Финиш" },
];

function MovingBox({ index, title }: { index: number; title: string }) {
  const groupRef = useRef<THREE.Group>(null);
  
  // Анимация движения коробок по конвейеру
  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.position.x -= delta * 3; // Скорость движения
      // Если коробка уехала далеко влево, возвращаем её в начало (справа)
      if (groupRef.current.position.x < -20) {
        groupRef.current.position.x = 25;
      }
    }
  });

  return (
    <group ref={groupRef} position={[index * 8 - 5, 3.2, 0]}>
      <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
        <mesh castShadow>
          <boxGeometry args={[3, 2, 2]} />
          <MeshTransmissionMaterial 
            backside 
            samples={4} 
            thickness={1} 
            chromaticAberration={0.05} 
            anisotropy={0.1} 
            distortion={0} 
            color="#ffffff" 
          />
        </mesh>
        <Text position={[0, 0, 1.05]} fontSize={0.3} color="#E0FF64" fontWeight="bold">
          {title.toUpperCase()}
        </Text>
      </Float>
    </group>
  );
}

export const ProcessSteps = () => {
  return (
    <section className="h-screen bg-black relative overflow-hidden">
      <div className="absolute top-20 left-12 z-10 pointer-events-none">
        <h2 className="text-6xl md:text-8xl font-black italic text-white uppercase tracking-tighter">
          ЛИНИЯ <span className="text-accent-lime">FF24</span>
        </h2>
      </div>

      <Canvas shadows dpr={[1, 2]}>
        {/* Камера зафиксирована для статичной сцены */}
        <PerspectiveCamera makeDefault position={[0, 8, 22]} fov={35} />
        
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={2} color="#E0FF64" />

        <Suspense fallback={null}>
          <group position={[0, -4, 0]}>
            {/* Статичный конвейер */}
            <ConveyorModel scale={1.8} />

            {/* Движущиеся коробки */}
            {steps.map((step, i) => (
              <MovingBox key={i} index={i} title={step.title} />
            ))}
          </group>

          <Environment preset="city" />
          <ContactShadows position={[0, -4, 0]} opacity={0.4} scale={40} blur={2} />
        </Suspense>
      </Canvas>
    </section>
  );
};
