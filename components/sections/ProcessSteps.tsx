"use client";

import React, { Suspense, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  PerspectiveCamera,
  Environment,
  ContactShadows,
  Float,
  MeshTransmissionMaterial,
  Text,
  Html,
  OrbitControls
} from "@react-three/drei";
import { ConveyorModel } from "../Conveyor";
import * as THREE from "three";

const steps = [
  { title: "Заявка", desc: "Автоматическая регистрация заказа в системе FF24" },
  { title: "Забор", desc: "Курьер забирает товар с вашего склада" },
  { title: "Приёмка", desc: "Полная сверка и проверка на брак" },
  { title: "Маркировка", desc: "Печать и наклейка кодов Честный знак" },
  { title: "Упаковка", desc: "Защитная брендированная упаковка" },
  { title: "Отгрузка", desc: "Доставка на маркетплейс за 24 часа" },
  { title: "Финиш", desc: "Отчет и обновление статуса в кабинете" },
];

function MovingBox({ index, title, desc }: { index: number; title: string; desc: string }) {
  const groupRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);

  // Плавное движение коробок вдоль конвейера
  useFrame((state, delta) => {
    if (!groupRef.current) return;
    groupRef.current.position.x -= delta * 2.5;
    if (groupRef.current.position.x < -22) groupRef.current.position.x = 28;
    
    // Эффект увеличения при наведении
    const s = hovered ? 1.2 : 1;
    groupRef.current.scale.lerp(new THREE.Vector3(s, s, s), 0.1);
  });

  return (
    <group
      ref={groupRef}
      position={[index * 7 - 10, 3.2, 0]}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
        <mesh castShadow>
          <boxGeometry args={[3, 1.8, 1.6]} />
          <MeshTransmissionMaterial 
            backside samples={6} thickness={1} chromaticAberration={0.05} 
            color={hovered ? "#E0FF64" : "#ffffff"} transmission={1} roughness={0.3}
          />
        </mesh>
        
        <Text position={[0, 0, 0.81]} fontSize={0.2} color="white">
          {`0${index + 1}`}
        </Text>
        <Text position={[0, -0.25, 0.81]} fontSize={0.28} color={hovered ? "#000" : "#E0FF64"} fontWeight="bold">
          {title.toUpperCase()}
        </Text>

        {hovered && (
          <Html position={[0, 3, 0]} center>
            <div className="bg-black/90 border border-[#E0FF64] p-4 rounded-xl backdrop-blur-md w-64 shadow-2xl">
              <p className="text-[#E0FF64] font-bold text-xs mb-1 uppercase">Этап {index + 1}</p>
              <p className="text-white text-sm leading-tight">{desc}</p>
            </div>
          </Html>
        )}
      </Float>
    </group>
  );
}

export const ProcessSteps = () => {
  return (
    <section id="process" className="relative h-screen w-full bg-black overflow-hidden">
      <div className="absolute top-24 w-full z-10 pointer-events-none text-center">
        <h2 className="text-6xl md:text-8xl font-black italic uppercase text-white tracking-tighter">
          ЛИНИЯ <span className="text-[#E0FF64]">FF24</span>
        </h2>
      </div>

      <Canvas shadows dpr={[1, 2]}>
        <PerspectiveCamera makeDefault position={[0, 10, 26]} fov={35} />
        
        {/* Улучшенное освещение */}
        <ambientLight intensity={0.6} />
        <pointLight position={[10, 10, 10]} intensity={2} color="#E0FF64" />
        <spotLight position={[0, 20, 0]} angle={0.3} penumbra={1} intensity={3} castShadow />

        <Suspense fallback={null}>
          <group position={[0, -4, 0]} rotation={[0, -Math.PI / 12, 0]}>
            <ConveyorModel scale={1.8} />
            {steps.map((step, i) => (
              <MovingBox key={i} index={i} title={step.title} desc={step.desc} />
            ))}
          </group>
          
          <Environment preset="night" />
          <ContactShadows position={[0, -4, 0]} opacity={0.4} scale={40} blur={2} />
        </Suspense>

        <OrbitControls enableZoom={false} maxPolarAngle={Math.PI / 2.1} />
      </Canvas>
      
      <div className="absolute inset-y-0 left-0 w-64 bg-gradient-to-r from-black to-transparent z-10" />
      <div className="absolute inset-y-0 right-0 w-64 bg-gradient-to-l from-black to-transparent z-10" />
    </section>
  );
};
