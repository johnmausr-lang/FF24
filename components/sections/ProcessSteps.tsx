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
  
  const spacing = 20; // Увеличили расстояние между коробками
  const conveyorEnd = -35;

  useFrame((state, delta) => {
    const g = groupRef.current;
    if (!g) return;

    g.position.x -= delta * 7; // Скорость конвейера

    if (g.position.x < conveyorEnd) {
      velocityRef.current += delta * 30; // Гравитация падения
      g.position.y -= velocityRef.current * delta;
      g.rotation.z += delta * 2;
    } else {
      velocityRef.current = 0;
      g.position.y = 2.5; 
      g.rotation.set(0, 0, 0);
    }

    if (g.position.y < -40) {
      g.position.x = (total - 1) * spacing;
      g.position.y = 2.5;
      velocityRef.current = 0;
    }

    const targetScale = hovered ? 1.3 : 1;
    g.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.15);
  });

  return (
    <group ref={groupRef} position={[index * spacing, 2.5, 0]} onPointerOver={() => setHovered(true)} onPointerOut={() => setHovered(false)}>
      <Float speed={hovered ? 0 : 2.5} rotationIntensity={0.3} floatIntensity={0.3}>
        <mesh castShadow receiveShadow>
          <boxGeometry args={[5, 3.5, 3]} />
          <meshStandardMaterial
            color={hovered ? "#E0FF64" : "#f5f5f5"}
            roughness={0.3}
            metalness={0.1}
          />
        </mesh>
        
        <Text position={[0, 0.5, 1.51]} fontSize={0.35} color="white" fontWeight="900">
          {`ID: 24-0${index + 1}`}
        </Text>
        <Text position={[0, -0.5, 1.51]} fontSize={0.55} color={hovered ? "#000" : "#E0FF64"} fontWeight="900">
          {title.toUpperCase()}
        </Text>

        {hovered && (
          <Html position={[0, 7, 0]} center>
            <div className="bg-black/95 border-2 border-[#E0FF64] p-10 rounded-[50px] backdrop-blur-3xl w-[500px] shadow-[0_0_120px_rgba(224,255,100,0.5)]">
              <p className="text-white text-3xl font-black mb-4 uppercase text-center">{title}</p>
              <p className="text-white/90 text-xl leading-relaxed text-center font-bold">{desc}</p>
            </div>
          </Html>
        )}
      </Float>
    </group>
  );
}

export const ProcessSteps = () => {
  return (
    <section id="process" className="relative h-screen w-full bg-[#0a0a0a] overflow-hidden">
      <Canvas shadows dpr={[1, 2]}>
        {/* Камера поднята выше, чтобы видеть весь конвейер */}
        <PerspectiveCamera makeDefault position={[0, 25, 70]} fov={30} />
        
        {/* Мощное заполняющее освещение для гарантии видимости */}
        <ambientLight intensity={1.5} /> 
        <pointLight position={[0, 50, 50]} intensity={2} color="#ffffff" castShadow />
        <spotLight position={[20, 100, 20]} intensity={3} color="#E0FF64" angle={0.5} castShadow />

        <Suspense fallback={null}>
          <group position={[0, -10, 0]}>
            {/* ОГРОМНЫЙ масштаб для гарантии того, что модель не "точка" */}
            <ConveyorModel scale={35} /> 
            
            {steps.map((step, i) => (
              <AbyssBox key={i} index={i} total={steps.length} title={step.title} desc={step.desc} />
            ))}
          </group>
          <Environment preset="night" />
        </Suspense>
      </Canvas>

      <div className="absolute top-24 left-0 right-0 z-10 text-center pointer-events-none">
        <h2 className="text-8xl md:text-[200px] font-black italic uppercase text-white/5 tracking-tighter absolute -top-20 left-0 right-0">FF24</h2>
        <h2 className="text-7xl md:text-9xl font-black italic uppercase text-white tracking-tighter relative">КОНВЕЙЕР</h2>
      </div>
    </section>
  );
};
