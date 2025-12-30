"use client";

import React, { Suspense, useRef, useState, useMemo } from "react";
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
  Stars
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

// Фоновые стеллажи склада из линий
function WarehouseBackground() {
  return (
    <group position={[0, 0, -20]}>
      <gridHelper args={[100, 20, "#E0FF64", "#111"]} rotation={[Math.PI / 2, 0, 0]} position={[0, 0, -5]} opacity={0.1} transparent />
      {/* Стилизованные линии стеллажей */}
      {Array.from({ length: 10 }).map((_, i) => (
        <mesh key={i} position={[i * 15 - 75, 5, -10]}>
          <boxGeometry args={[0.05, 30, 0.05]} />
          <meshBasicMaterial color="#E0FF64" transparent opacity={0.2} />
        </mesh>
      ))}
    </group>
  );
}

function MovingBox({ index, title, desc, total }: { index: number; title: string; desc: string; total: number }) {
  const groupRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);
  
  // Идеально ровное расстояние: 12 единиц между коробками
  const spacing = 12;

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    // Идеально ровное движение по оси X
    groupRef.current.position.x -= delta * 4;
    
    // Бесшовный цикл
    if (groupRef.current.position.x < -(spacing * 2)) {
      groupRef.current.position.x += spacing * total;
    }

    const s = hovered ? 1.15 : 1;
    groupRef.current.scale.lerp(new THREE.Vector3(s, s, s), 0.1);
  });

  return (
    <group
      ref={groupRef}
      // Точка соприкосновения с лентой: y=2.0 (настроено под scale 16 конвейера)
      position={[index * spacing, 2.0, 0]}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <Float speed={hovered ? 0 : 1.5} rotationIntensity={0.2} floatIntensity={0.2}>
        <mesh castShadow>
          <boxGeometry args={[4, 2.6, 2.4]} />
          <MeshTransmissionMaterial 
            backside samples={16} thickness={2.5} chromaticAberration={0.1} 
            transmission={1} roughness={0.8} color={hovered ? "#E0FF64" : "#ffffff"} 
            ior={1.4}
          />
        </mesh>
        
        <Text position={[0, 0.3, 1.21]} fontSize={0.25} color="white" fontWeight="bold">
          {`STAGE 0${index + 1}`}
        </Text>
        <Text position={[0, -0.4, 1.21]} fontSize={0.45} color={hovered ? "#000" : "#E0FF64"} fontWeight="900">
          {title.toUpperCase()}
        </Text>

        {hovered && (
          <Html position={[0, 4.5, 0]} center>
            <div className="bg-black/95 border-2 border-[#E0FF64] p-8 rounded-[30px] backdrop-blur-3xl w-[450px] shadow-[0_0_100px_rgba(224,255,100,0.3)]">
              <h4 className="text-[#E0FF64] font-black text-xs mb-3 uppercase tracking-widest">FF24 SYSTEM // LOGISTICS</h4>
              <p className="text-white text-xl font-black mb-2 italic uppercase">{title}</p>
              <p className="text-white/70 text-base font-medium leading-relaxed">{desc}</p>
            </div>
          </Html>
        )}
      </Float>

      {/* Искры под коробкой (трение об ленту) */}
      <Sparkles count={20} scale={[4, 0.5, 2]} size={4} speed={2} color="#E0FF64" opacity={hovered ? 1 : 0.3} />
    </group>
  );
}

export const ProcessSteps = () => {
  return (
    <section id="process" className="relative h-screen w-full bg-[#030303] overflow-hidden">
      <Canvas shadows dpr={[1, 2]}>
        <PerspectiveCamera makeDefault position={[0, 14, 45]} fov={28} />
        
        {/* Освещение складского помещения */}
        <ambientLight intensity={0.5} /> 
        <spotLight position={[0, 60, 20]} angle={0.4} penumbra={1} intensity={15} color="#E0FF64" castShadow />
        <rectAreaLight width={100} height={2} intensity={20} color="#E0FF64" position={[0, 5, -5]} rotation={[-Math.PI / 2, 0, 0]} />

        <Suspense fallback={null}>
          <WarehouseBackground />
          
          <group position={[0, -5, 0]}>
            {/* Идеально выверенный масштаб и позиция конвейера */}
            <ConveyorModel scale={16} position={[0, 0, 0]} /> 
            
            {steps.map((step, i) => (
              <MovingBox key={i} index={i} total={steps.length} title={step.title} desc={step.desc} />
            ))}
          </group>
          
          <Environment preset="night" />
          <ContactShadows position={[0, -5, 0]} opacity={1} scale={150} blur={2.5} far={10} color="#000" />
        </Suspense>

        {/* Пыль в воздухе для атмосферы склада */}
        <Sparkles count={500} scale={[100, 50, 100]} size={2} speed={0.3} opacity={0.2} color="#ffffff" />
      </Canvas>

      {/* HUD-элементы поверх экрана */}
      <div className="absolute top-24 left-12 z-10">
        <h2 className="text-8xl md:text-[180px] font-black italic uppercase text-white/10 tracking-tighter absolute -top-10 -left-4 select-none">FF24</h2>
        <h2 className="text-7xl md:text-9xl font-black italic uppercase text-white tracking-tighter relative z-10">КОНВЕЙЕР</h2>
      </div>

      <div className="absolute bottom-12 right-12 z-10 text-right">
        <p className="text-[#E0FF64] font-mono text-sm tracking-widest uppercase animate-pulse">● System Diagnostic: Optimal</p>
        <p className="text-white/40 font-mono text-xs mt-2 uppercase">Automated fulfillment line v8.2</p>
      </div>
    </section>
  );
};
