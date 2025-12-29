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
  { title: "Заявка" }, { title: "Забор" }, { title: "Приёмка" },
  { title: "Маркировка" }, { title: "Упаковка" }, { title: "Отгрузка" }, { title: "Финиш" },
];

function PremiumBox({ position, title, index }: { position: [number, number, number], title: string, index: number }) {
  const meshRef = useRef<THREE.Group>(null);

  useFrame(() => {
    if (!meshRef.current) return;
    meshRef.current.position.x -= 0.04;
    if (meshRef.current.position.x < -25) meshRef.current.position.x = 25;
  });

  return (
    <group ref={meshRef} position={position}>
      <Float speed={2.5} rotationIntensity={0.6} floatIntensity={0.6}>
        <mesh castShadow>
          <boxGeometry args={[3.4, 2, 1.6]} />
          <MeshTransmissionMaterial 
            backside samples={10} thickness={1} chromaticAberration={0.06}
            anisotropy={0.2} distortion={0.1} color="#ffffff" transmission={1}
          />
        </mesh>
        <mesh>
          <boxGeometry args={[2.6, 1.4, 1.2]} />
          <meshStandardMaterial color="#E0FF64" emissive="#E0FF64" emissiveIntensity={1.5} transparent opacity={0.25} />
        </mesh>
        <Text position={[0, 0.3, 0.81]} fontSize={0.16} color="white" anchorX="center">
          {`ID: 24-0${index + 1}`}
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
      <div className="absolute top-20 left-12 z-10 pointer-events-none">
        <h1 className="text-6xl md:text-9xl font-black italic uppercase tracking-tighter text-white">
          КОНВЕЙЕР <span className="text-accent-lime">FF24</span>
        </h1>
      </div>

      <Canvas shadows dpr={[1, 2]}>
        {/* Камера отодвинута (position z: 35), чтобы точно всё влезло */}
        <PerspectiveCamera makeDefault position={[0, 12, 35]} fov={25} />
        
        <ambientLight intensity={0.4} />
        <spotLight position={[20, 30, 20]} angle={0.15} intensity={2} color="#E0FF64" castShadow />
        
        <rectAreaLight width={60} height={3} intensity={30} color="#E0FF64" position={[0, 2, 0]} rotation={[-Math.PI / 2, 0, 0]} />
        
        <Suspense fallback={null}>
          <group rotation={[0, -Math.PI / 10, 0]} position={[0, -5, 0]}>
            <ConveyorModel scale={2} />
            {steps.map((step, i) => (
              <PremiumBox key={i} index={i} title={step.title} position={[i * 9 - 25, 4.5, 0]} />
            ))}
          </group>
          <Environment preset="night" />
          <ContactShadows position={[0, -5, 0]} opacity={0.6} scale={70} blur={3} />
        </Suspense>
      </Canvas>
    </section>
  );
};
