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
    groupRef.current.position.x -= delta * 3;
    if (groupRef.current.position.x < -25) groupRef.current.position.x = 25;
    
    const s = hovered ? 1.25 : 1;
    groupRef.current.scale.lerp(new THREE.Vector3(s, s, s), 0.1);
  });

  return (
    <group
      ref={groupRef}
      position={[index * 8 - 10, 3.8, 0]} // Приподняли коробки выше над лентой
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <Float speed={2} rotationIntensity={0.4} floatIntensity={0.4}>
        <mesh castShadow>
          <boxGeometry args={[3.2, 2, 1.8]} />
          <MeshTransmissionMaterial 
            backside samples={8} thickness={1.2} chromaticAberration={0.08} 
            color={hovered ? "#E0FF64" : "#ffffff"} transmission={1} roughness={0.2}
            envMapIntensity={2}
          />
        </mesh>
        
        <Text position={[0, 0, 0.91]} fontSize={0.22} color="white" fontWeight="bold">
          {`0${index + 1}`}
        </Text>
        <Text position={[0, -0.3, 0.91]} fontSize={0.32} color={hovered ? "#000" : "#E0FF64"} fontWeight="900">
          {title.toUpperCase()}
        </Text>

        {hovered && (
          <Html position={[0, 4, 0]} center>
            <div className="bg-black/95 border-2 border-[#E0FF64] p-5 rounded-2xl backdrop-blur-xl w-72 shadow-[0_0_30px_rgba(224,255,100,0.3)]">
              <p className="text-[#E0FF64] font-black text-xs mb-2 uppercase tracking-widest">Этап {index + 1}</p>
              <p className="text-white text-sm font-medium leading-relaxed">{desc}</p>
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
        <h2 className="text-6xl md:text-9xl font-black italic uppercase text-white tracking-tighter opacity-90">
          ЛИНИЯ <span className="text-[#E0FF64]">FF24</span>
        </h2>
      </div>

      <Canvas shadows dpr={[1, 2]}>
        {/* Изменили угол камеры: чуть выше и дальше для панорамного вида */}
        <PerspectiveCamera makeDefault position={[0, 12, 30]} fov={32} />
        
        <ambientLight intensity={0.8} /> {/* Мощный общий свет */}
        
        {/* Фронтальный свет */}
        <pointLight position={[0, 10, 15]} intensity={2.5} color="#ffffff" />
        
        {/* Яркий акцентный свет сверху-сзади (Rim light) для контура модели */}
        <spotLight position={[0, 25, -10]} angle={0.5} penumbra={1} intensity={5} color="#E0FF64" castShadow />

        <Suspense fallback={null}>
          <group position={[0, -5, 0]} rotation={[0, -Math.PI / 10, 0]}>
            {/* Увеличили масштаб конвейера */}
            <ConveyorModel scale={2.2} />
            {steps.map((step, i) => (
              <MovingBox key={i} index={i} title={step.title} desc={step.desc} />
            ))}
          </group>
          
          <Environment preset="studio" />
          <ContactShadows position={[0, -5, 0]} opacity={0.7} scale={60} blur={2.5} color="#000000" />
        </Suspense>

        <OrbitControls enableZoom={false} maxPolarAngle={Math.PI / 2.2} minPolarAngle={Math.PI / 4} />
      </Canvas>
      
      <div className="absolute inset-y-0 left-0 w-80 bg-gradient-to-r from-black via-black/20 to-transparent z-10" />
      <div className="absolute inset-y-0 right-0 w-80 bg-gradient-to-l from-black via-black/20 to-transparent z-10" />
    </section>
  );
};
