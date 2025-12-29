"use client";

import React, { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { 
  Float, 
  PerspectiveCamera, 
  Text, 
  Environment,
  ContactShadows,
  useGLTF 
} from "@react-three/drei";
import * as THREE from "three";
import { motion } from "framer-motion";

const steps = [
  { title: "Заявка" },
  { title: "Забор" },
  { title: "Приёмка" },
  { title: "Маркировка" },
  { title: "Упаковка" },
  { title: "Отгрузка" },
  { title: "Финиш" },
];

// Компонент вашей загруженной модели
function MyConveyorModel() {
  // Замените путь на реальный путь к вашей модели
  const { scene } = useGLTF("/models/conveyor.glb"); 
  return <primitive object={scene} scale={1.5} position={[0, -2, 0]} />;
}

function ConveyorCard({ position, title, index }: { position: [number, number, number], title: string, index: number }) {
  const meshRef = useRef<THREE.Group>(null);

  useFrame(() => {
    if (!meshRef.current) return;
    meshRef.current.position.x -= 0.02; // Скорость движения ленты
    if (meshRef.current.position.x < -10) meshRef.current.position.x = 15;
  });

  return (
    <group ref={meshRef} position={position}>
      <Float speed={2} rotationIntensity={0.3} floatIntensity={0.5}>
        {/* Стеклянная карточка */}
        <mesh>
          <boxGeometry args={[2.2, 3, 0.05]} />
          <meshPhysicalMaterial
            roughness={0}
            transmission={0.9}
            thickness={0.5}
            color="#E0FF64"
            transparent
            opacity={0.3}
          />
        </mesh>

        <Text position={[0, 0.5, 0.06]} fontSize={0.25} color="white" anchorX="center">
          {`0${index + 1}`}
        </Text>
        <Text position={[0, -0.2, 0.06]} fontSize={0.18} color="#E0FF64" textAlign="center" maxWidth={1.8}>
          {title.toUpperCase()}
        </Text>
      </Float>
    </group>
  );
}

export const ProcessSteps = () => {
  return (
    <section id="process" className="relative h-screen bg-black overflow-hidden">
      <div className="absolute top-20 left-10 z-10 pointer-events-none">
        <motion.h2 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          className="text-6xl md:text-8xl font-black italic uppercase tracking-tighter"
        >
          КОНВЕЙЕР <span className="text-accent-lime">FF24</span>
        </motion.h2>
      </div>

      <Canvas shadows>
        <PerspectiveCamera makeDefault position={[8, 3, 12]} fov={35} />
        
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1.5} color="#E0FF64" />
        
        <Suspense fallback={null}>
          <group rotation={[0, -Math.PI / 4, 0]}>
            {/* Рендерим вашу модель */}
            <MyConveyorModel />

            {/* Рендерим карточки поверх модели */}
            {steps.map((step, i) => (
              <ConveyorCard 
                key={i} 
                index={i}
                title={step.title}
                position={[i * 4, 1, 0]} 
              />
            ))}
          </group>

          <Environment preset="city" />
          <ContactShadows position={[0, -2, 0]} opacity={0.4} scale={20} blur={2} />
        </Suspense>
      </Canvas>

      <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-black to-transparent z-20" />
      <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-black to-transparent z-20" />
    </section>
  );
};

// Предварительная загрузка модели для исключения лагов
useGLTF.preload("/models/conveyor.glb");
