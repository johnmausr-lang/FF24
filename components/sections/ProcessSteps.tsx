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

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    // Движение строго вдоль линии конвейера
    groupRef.current.position.x -= delta * 3.5;
    if (groupRef.current.position.x < -30) groupRef.current.position.x = 30;
    
    const s = hovered ? 1.2 : 1;
    groupRef.current.scale.lerp(new THREE.Vector3(s, s, s), 0.1);
  });

  return (
    <group
      ref={groupRef}
      position={[index * 10 - 15, 1.8, 0]} // Опустили коробки ниже, чтобы они касались ленты
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.3}>
        <mesh castShadow>
          <boxGeometry args={[3.8, 2.2, 2.2]} />
          <MeshTransmissionMaterial 
            backside samples={8} thickness={1.5} chromaticAberration={0.1} 
            color={hovered ? "#E0FF64" : "#ffffff"} transmission={1} roughness={0.1}
          />
        </mesh>
        
        <Text position={[0, 0, 1.11]} fontSize={0.25} color="white" fontWeight="bold">
          {`0${index + 1}`}
        </Text>
        <Text position={[0, -0.4, 1.11]} fontSize={0.35} color={hovered ? "#000" : "#E0FF64"} fontWeight="900">
          {title.toUpperCase()}
        </Text>

        {hovered && (
          <Html position={[0, 4, 0]} center>
            <div className="bg-black/95 border-2 border-[#E0FF64] p-6 rounded-3xl backdrop-blur-2xl w-80 shadow-[0_0_50px_rgba(224,255,100,0.4)]">
              <p className="text-[#E0FF64] font-black text-xs mb-2 uppercase tracking-[0.2em]">Этап {index + 1}</p>
              <p className="text-white text-base font-bold leading-relaxed">{desc}</p>
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
        <h2 className="text-7xl md:text-9xl font-black italic uppercase text-white tracking-tighter">
          ЛИНИЯ <span className="text-[#E0FF64]">FF24</span>
        </h2>
      </div>

      <Canvas shadows dpr={[1, 2]}>
        <PerspectiveCamera makeDefault position={[0, 12, 35]} fov={28} />
        
        <ambientLight intensity={1.0} /> 
        <pointLight position={[0, 15, 20]} intensity={3} color="#ffffff" />
        <spotLight position={[0, 30, -10]} angle={0.6} penumbra={1} intensity={8} color="#E0FF64" castShadow />

        <Suspense fallback={null}>
          <group position={[0, -5, 0]}>
            {/* ОГРОМНЫЙ масштаб для соответствия коробкам */}
            <ConveyorModel scale={12} position={[0, 0, 0]} />
            
            {steps.map((step, i) => (
              <MovingBox key={i} index={i} title={step.title} desc={step.desc} />
            ))}
          </group>
          
          <Environment preset="studio" />
          <ContactShadows position={[0, -5, 0]} opacity={0.8} scale={80} blur={2} />
        </Suspense>

        <OrbitControls enableZoom={false} maxPolarAngle={Math.PI / 2.1} />
      </Canvas>
    </section>
  );
};
