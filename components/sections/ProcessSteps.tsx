"use client";

import React, { Suspense, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  PerspectiveCamera,
  Environment,
  ContactShadows,
  Float,
  Text,
  Html,
} from "@react-three/drei";
import { ConveyorModel } from "../Conveyor";
import * as THREE from "three";

const steps = [
  { title: "Заявка", desc: "Автоматическая регистрация заказа в системе FF24." },
  { title: "Забор", desc: "Курьер забирает товар с вашего адреса 24/7." },
  { title: "Приёмка", desc: "Проверка на брак и IT-учёт каждой позиции." },
  { title: "Маркировка", desc: "Печать КИЗов и кодов 'Честный знак'." },
  { title: "Упаковка", desc: "Брендированная упаковка с защитой от ударов." },
  { title: "Отгрузка", desc: "Доставка на маркетплейс в течение 24 часов." },
  { title: "Финиш", desc: "Полный фотоотчёт в личном кабинете." },
];

function AbyssBox({ index, title, desc, total }: { index: number; title: string; desc: string; total: number }) {
  const groupRef = useRef<THREE.Group>(null);
  const velocityRef = useRef(0);
  const [hovered, setHovered] = useState(false);
  
  const spacing = 18;
  const conveyorEnd = -30;

  useFrame((state, delta) => {
    const g = groupRef.current;
    if (!g) return;

    g.position.x -= delta * 6;

    if (g.position.x < conveyorEnd) {
      velocityRef.current += delta * 25;
      g.position.y -= velocityRef.current * delta;
      g.rotation.z += delta * 1.5;
    } else {
      velocityRef.current = 0;
      g.position.y = 2.0;
      g.rotation.set(0, 0, 0);
    }

    if (g.position.y < -40) {
      g.position.x = (total - 1) * spacing;
      g.position.y = 2.0;
      velocityRef.current = 0;
    }

    const targetScale = hovered ? 1.25 : 1;
    g.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);
  });

  return (
    <group ref={groupRef} position={[index * spacing, 2.0, 0]} onPointerOver={() => setHovered(true)} onPointerOut={() => setHovered(false)}>
      <Float speed={hovered ? 0 : 2} rotationIntensity={0.2} floatIntensity={0.2}>
        <mesh castShadow receiveShadow>
          <boxGeometry args={[4.5, 3.0, 2.8]} />
          <meshPhysicalMaterial
            color={hovered ? "#E0FF64" : "#f0f0f0"}
            roughness={0.2}
            metalness={0.1}
            clearcoat={0.5}
          />
        </mesh>
        
        <Text position={[0, 0.4, 1.41]} fontSize={0.3} color="white" fontWeight="900">
          {`ID: 24-0${index + 1}`}
        </Text>
        <Text position={[0, -0.4, 1.41]} fontSize={0.5} color={hovered ? "#000" : "#E0FF64"} fontWeight="900">
          {title.toUpperCase()}
        </Text>

        {hovered && (
          <Html position={[0, 6, 0]} center>
            <div className="bg-black/95 border-2 border-[#E0FF64] p-8 rounded-[40px] backdrop-blur-3xl w-[450px] shadow-[0_0_100px_rgba(224,255,100,0.4)] transition-all">
              <p className="text-white text-2xl font-black mb-3 uppercase text-center">{title}</p>
              <p className="text-white/80 text-lg leading-relaxed text-center font-medium">{desc}</p>
            </div>
          </Html>
        )}
      </Float>
    </group>
  );
}

export const ProcessSteps = () => {
  return (
    <section id="process" className="relative h-screen w-full bg-[#050505] overflow-hidden">
      <Canvas
        shadows
        dpr={[1.5, 2]}
        gl={{
          antialias: true,
          powerPreference: "high-performance",
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.5, // Увеличили экспозицию для яркости
        }}
      >
        <PerspectiveCamera makeDefault position={[0, 18, 60]} fov={28} />
        
        {/* Освещение */}
        <ambientLight intensity={1.2} /> 
        <spotLight 
          position={[0, 100, 50]} 
          angle={0.4} 
          penumbra={1} 
          intensity={1500} // Яркий прожектор
          color="#E0FF64" 
          castShadow 
          shadow-mapSize={[2048, 2048]}
        />
        <directionalLight position={[50, 50, 50]} intensity={1.5} color="#ffffff" castShadow />

        <Suspense fallback={null}>
          <group position={[0, -8, 0]}>
            <ConveyorModel scale={22} /> 
            {steps.map((step, i) => (
              <AbyssBox key={i} index={i} total={steps.length} title={step.title} desc={step.desc} />
            ))}
          </group>
          <Environment preset="studio" />
          <ContactShadows position={[0, -8.1, 0]} opacity={0.6} scale={150} blur={3} far={15} color="#000" />
        </Suspense>
      </Canvas>

      <div className="absolute top-24 left-1/2 -translate-x-1/2 z-10 text-center pointer-events-none">
        <h2 className="text-8xl md:text-[180px] font-black italic uppercase text-white/5 tracking-tighter absolute -top-16 left-0 right-0 select-none">FF24</h2>
        <h2 className="text-7xl md:text-9xl font-black italic uppercase text-white tracking-tighter relative z-10 shadow-2xl">КОНВЕЙЕР</h2>
      </div>
    </section>
  );
};
