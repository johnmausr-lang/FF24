"use client";

import React, { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { 
  PerspectiveCamera, 
  Environment, 
  ContactShadows, 
  Float, 
  MeshTransmissionMaterial, 
  Text 
} from "@react-three/drei";
import * as THREE from "three";
import { ConveyorModel } from "../Conveyor";

const steps = [
  { title: "Заявка" }, { title: "Забор" }, { title: "Приёмка" },
  { title: "Маркировка" }, { title: "Упаковка" }, { title: "Отгрузка" }, { title: "Финиш" },
];

function MovingBox({ index, title }: { index: number; title: string }) {
  const boxRef = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (boxRef.current) {
      // Плавное движение коробок влево
      boxRef.current.position.x -= delta * 3;
      // Зацикливание: если коробка ушла за край, возвращаем её в начало справа
      if (boxRef.current.position.x < -20) {
        boxRef.current.position.x = 25;
      }
    }
  });

  return (
    <group ref={boxRef} position={[index * 8 - 10, 3.2, 0]}>
      <Float speed={2} rotationIntensity={0.3} floatIntensity={0.5}>
        <mesh castShadow>
          <boxGeometry args={[3.2, 1.8, 1.6]} />
          <MeshTransmissionMaterial 
            backside samples={8} thickness={0.5} chromaticAberration={0.05} 
            anisotropy={0.1} distortion={0.1} color="#ffffff" transmission={1} 
          />
        </mesh>
        <Text position={[0, 0, 0.81]} fontSize={0.25} color="#E0FF64" fontWeight="900" anchorX="center">
          {title.toUpperCase()}
        </Text>
      </Float>
    </group>
  );
}

export const ProcessSteps = () => {
  return (
    <section id="process" className="relative h-screen bg-black overflow-hidden">
      <div className="absolute top-20 left-12 z-10 pointer-events-none">
        <h2 className="text-6xl md:text-9xl font-black italic uppercase tracking-tighter text-white">
          ЛИНИЯ <span className="text-accent-lime">FF24</span>
        </h2>
      </div>

      <Canvas shadows dpr={[1, 2]}>
        <PerspectiveCamera makeDefault position={[0, 10, 25]} fov={30} />
        <ambientLight intensity={0.2} />
        <pointLight position={[15, 15, 15]} intensity={3} color="#E0FF64" castShadow />
        
        <Suspense fallback={null}>
          <group rotation={[0, -Math.PI / 10, 0]} position={[0, -4, 0]}>
            {/* Конвейер стоит на месте */}
            <ConveyorModel scale={1.8} />

            {/* Коробки движутся независимо */}
            {steps.map((step, i) => (
              <MovingBox key={i} index={i} title={step.title} />
            ))}
          </group>

          <Environment preset="night" />
          <ContactShadows position={[0, -4, 0]} opacity={0.5} scale={50} blur={2.5} />
        </Suspense>
      </Canvas>
    </section>
  );
};
