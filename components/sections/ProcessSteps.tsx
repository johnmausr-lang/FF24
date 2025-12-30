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
  Sparkles,
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

function WarehouseBackground() {
  return (
    <group position={[0, 0, -25]}>
      {/* Сетка складского пола вдали */}
      <gridHelper args={[200, 40, new THREE.Color("#1a1a1a"), new THREE.Color("#050505")]} rotation={[Math.PI / 2, 0, 0]} />
      {/* Световые вертикальные линии (стеллажи) */}
      {Array.from({ length: 12 }).map((_, i) => (
        <mesh key={i} position={[i * 20 - 110, 10, -5]}>
          <boxGeometry args={[0.1, 40, 0.1]} />
          <meshBasicMaterial color="#E0FF64" transparent opacity={0.15} />
        </mesh>
      ))}
    </group>
  );
}

function AbyssBox({ index, title, desc, total }: { index: number; title: string; desc: string; total: number }) {
  const groupRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);
  const [velocity, setVelocity] = useState(0);
  
  const spacing = 16;
  const conveyorEnd = -28; // Точка сброса в бездну

  useFrame((state, delta) => {
    if (!groupRef.current) return;

    // Линейное движение по конвейеру
    groupRef.current.position.x -= delta * 5.5;

    // Логика падения за край ленты
    if (groupRef.current.position.x < conveyorEnd) {
      const g = velocity + delta * 25; // Ускорение свободного падения
      setVelocity(g);
      groupRef.current.position.y -= g * delta;
      // Вращение при падении для реалистичности
      groupRef.current.rotation.z += delta * 1.5;
      groupRef.current.rotation.x += delta * 0.8;
    } else {
      setVelocity(0);
      groupRef.current.position.y = 2.0; // Идеальная высота над лентой
      groupRef.current.rotation.set(0, 0, 0);
    }

    // Респаун: возвращение коробки в конец очереди
    if (groupRef.current.position.y < -35) {
      groupRef.current.position.x = (total - 1) * spacing;
      groupRef.current.position.y = 2.0;
      setVelocity(0);
    }

    const s = hovered ? 1.2 : 1;
    groupRef.current.scale.lerp(new THREE.Vector3(s, s, s), 0.1);
  });

  return (
    <group
      ref={groupRef}
      position={[index * spacing, 2.0, 0]}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <Float speed={hovered ? 0 : 2} rotationIntensity={0.2} floatIntensity={0.2}>
        {/* Мутное стекло (Frosted Glass) */}
        <mesh castShadow>
          <boxGeometry args={[4.2, 2.8, 2.6]} />
          <MeshTransmissionMaterial 
            backside samples={16} thickness={2} chromaticAberration={0.12} 
            transmission={1} roughness={0.7} color={hovered ? "#E0FF64" : "#ffffff"} 
            ior={1.4}
          />
        </mesh>
        
        <Text position={[0, 0.4, 1.31]} fontSize={0.28} color="white" fontWeight="900">
          {`ID: 24-0${index + 1}`}
        </Text>
        <Text position={[0, -0.4, 1.31]} fontSize={0.48} color={hovered ? "#000" : "#E0FF64"} fontWeight="900">
          {title.toUpperCase()}
        </Text>

        {hovered && (
          <Html position={[0, 5, 0]} center>
            <div className="bg-black/95 border-2 border-[#E0FF64] p-8 rounded-[40px] backdrop-blur-3xl w-[420px] shadow-[0_0_100px_rgba(224,255,100,0.35)] pointer-events-none">
              <h4 className="text-[#E0FF64] font-black text-xs mb-3 uppercase tracking-[0.3em] text-center">FF24 LOGISTICS SYSTEM</h4>
              <p className="text-white text-2xl font-black mb-3 italic uppercase text-center border-b border-[#E0FF64]/20 pb-2">{title}</p>
              <p className="text-white/80 text-base font-bold leading-relaxed text-center">{desc}</p>
            </div>
          </Html>
        )}
      </Float>
      {/* Искры под коробкой только когда она на ленте */}
      <Sparkles count={12} scale={[4, 0.5, 2]} size={4} speed={2.5} color="#E0FF64" opacity={groupRef.current?.position.x! < conveyorEnd ? 0 : 0.6} />
    </group>
  );
}

export const ProcessSteps = () => {
  return (
    <section id="process" className="relative h-screen w-full bg-[#020202] overflow-hidden">
      <Canvas shadows dpr={[1, 2]}>
        <PerspectiveCamera makeDefault position={[0, 16, 55]} fov={26} />
        
        {/* Настройка дымки (тумана): начинается с 40 единиц, полностью скрывает на 90 */}
        <fog attach="fog" args={["#020202", 40, 95]} />
        
        <ambientLight intensity={0.6} /> 
        <spotLight position={[0, 80, 30]} angle={0.3} penumbra={1} intensity={20} color="#E0FF64" castShadow />
        <rectAreaLight width={120} height={4} intensity={25} color="#E0FF64" position={[0, 6, -10]} rotation={[-Math.PI / 2, 0, 0]} />

        <Suspense fallback={null}>
          <WarehouseBackground />
          <group position={[0, -6, 0]}>
            {/* Статичный конвейер с 8K материалами */}
            <ConveyorModel scale={18} position={[0, 0, 0]} /> 
            
            {steps.map((step, i) => (
              <AbyssBox key={i} index={i} total={steps.length} title={step.title} desc={step.desc} />
            ))}
          </group>
          
          <Environment preset="night" />
          {/* Контактные тени для приземленности */}
          <ContactShadows position={[0, -6, 0]} opacity={0.8} scale={180} blur={3} far={15} color="#000" />
        </Suspense>

        {/* Эффект пыли в воздухе склада */}
        <Sparkles count={400} scale={[120, 60, 120]} size={1.8} speed={0.4} opacity={0.2} color="#ffffff" />
      </Canvas>

      {/* Заголовок */}
      <div className="absolute top-24 left-16 z-10 pointer-events-none">
        <h2 className="text-8xl md:text-[220px] font-black italic uppercase text-white/5 tracking-tighter absolute -top-16 -left-8 select-none">FF24</h2>
        <h2 className="text-7xl md:text-9xl font-black italic uppercase text-white tracking-tighter relative z-10">ПРОЦЕСС</h2>
        <p className="text-[#E0FF64] font-mono text-sm tracking-[0.6em] mt-4 ml-2 animate-pulse">● AUTOMATED ABYSS SYSTEM ACTIVE</p>
      </div>
    </section>
  );
};
