"use client";

import React, { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { 
  Float, 
  PerspectiveCamera, 
  Text, 
  Environment,
  ContactShadows 
} from "@react-three/drei";
import * as THREE from "three";
import { motion } from "framer-motion";
import { ConveyorModel } from "./Conveyor"; // Импорт вашей модели

const steps = [
  { title: "Заявка", desc: "Регистрация ТЗ" },
  { title: "Забор", desc: "Логистика" },
  { title: "Приёмка", desc: "Контроль брака" },
  { title: "Маркировка", desc: "Честный Знак" },
  { title: "Упаковка", desc: "Подготовка" },
  { title: "Отгрузка", desc: "Склад МП" },
  { title: "Финиш", desc: "Готов к продаже" },
];

function FloatingCard({ position, title, index }: { position: [number, number, number], title: string, index: number }) {
  const meshRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    // Движение карточек вдоль конвейера
    meshRef.current.position.x -= 0.015;
    // Зацикливание движения
    if (meshRef.current.position.x < -12) {
      meshRef.current.position.x = 12;
    }
  });

  return (
    <group ref={meshRef} position={position}>
      <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.4}>
        {/* Стеклянная панель */}
        <mesh>
          <boxGeometry args={[2.2, 1.4, 0.05]} />
          <meshPhysicalMaterial
            roughness={0.1}
            transmission={0.8}
            thickness={0.2}
            color="#E0FF64"
            transparent
            opacity={0.4}
          />
        </mesh>

        {/* Текстовый контент на карточке */}
        <Text position={[0, 0.3, 0.06]} fontSize={0.15} color="white" font="/fonts/inter-bold.json">
          {`ЭТАП 0${index + 1}`}
        </Text>
        <Text position={[0, -0.1, 0.06]} fontSize={0.22} color="#E0FF64" fontWeight="bold">
          {title.toUpperCase()}
        </Text>
      </Float>
    </group>
  );
}

export const ProcessSteps = () => {
  return (
    <section id="process" className="relative h-[80vh] md:h-screen bg-black overflow-hidden">
      {/* Текстовый слой */}
      <div className="absolute top-20 left-10 z-10 pointer-events-none">
        <motion.h2 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          className="text-5xl md:text-8xl font-black italic uppercase tracking-tighter"
        >
          КОНВЕЙЕР <span className="text-accent-lime">FF24</span>
        </motion.h2>
      </div>

      <Canvas shadows>
        <PerspectiveCamera makeDefault position={[0, 4, 12]} fov={35} />
        
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1.5} castShadow />
        
        <Suspense fallback={null}>
          <group rotation={[0.2, -Math.PI / 6, 0]}>
            {/* Ваша 3D модель */}
            <ConveyorModel scale={0.5} position={[0, -1, 0]} />

            {/* Едущие карточки */}
            {steps.map((step, i) => (
              <FloatingCard 
                key={i} 
                index={i}
                title={step.title}
                position={[i * 4 - 6, 1.2, 0]} 
              />
            ))}
          </group>

          <Environment preset="night" />
          <ContactShadows position={[0, -1, 0]} opacity={0.6} scale={20} blur={2.5} far={4} />
        </Suspense>
      </Canvas>

      {/* Затемнение краев для глубины */}
      <div className="absolute inset-y-0 left-0 w-40 bg-gradient-to-r from-black to-transparent z-20" />
      <div className="absolute inset-y-0 right-0 w-40 bg-gradient-to-l from-black to-transparent z-20" />
    </section>
  );
};
