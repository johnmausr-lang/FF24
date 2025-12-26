"use client";

import React, { Suspense, useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, Float, MeshTransmissionMaterial, Environment, Html, ContactShadows } from "@react-three/drei";
import * as THREE from "three";
import { motion } from "framer-motion";

const steps = [
  { id: 1, title: "Приемка", desc: "24 часа на склад" },
  { id: 2, title: "Контроль", desc: "Проверка брака" },
  { id: 3, title: "Маркировка", desc: "Честный Знак" },
  { id: 4, title: "Упаковка", desc: "Защита товара" },
  { id: 5, title: "Отгрузка", desc: "На все маркетплейсы" },
];

// Компонент стеклянной карточки на конвейере
function StepCard({ position, data, speed }: { position: [number, number, number], data: any, speed: number }) {
  const meshRef = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (meshRef.current) {
      // Движение по оси Z (вдоль конвейера)
      meshRef.current.position.z += delta * speed;
      
      // Возврат в начало при достижении конца (бесконечный цикл)
      if (meshRef.current.position.z > 5) {
        meshRef.current.position.z = -15;
      }
    }
  });

  return (
    <group ref={meshRef} position={position}>
      {/* Основа карточки - "Умное стекло" */}
      <mesh>
        <boxGeometry args={[2.2, 1.4, 0.05]} />
        <MeshTransmissionMaterial 
          backside 
          samples={4} 
          thickness={0.1} 
          chromaticAberration={0.02} 
          anisotropy={0.1} 
          distortion={0.1} 
          distortionScale={0.1} 
          temporalDistortion={0.1} 
          iridescence={1}
          color="#ffffff"
        />
      </mesh>

      {/* Контент внутри карточки через HTML-портал */}
      <Html
        transform
        occlude
        distanceFactor={1.5}
        position={[0, 0, 0.03]}
        className="pointer-events-none select-none"
      >
        <div className="w-[200px] p-4 font-sans text-white text-center">
          <div className="text-[10px] text-accent-lime font-black mb-1 opacity-50 uppercase tracking-tighter">Phase 0{data.id}</div>
          <div className="text-xl font-black italic uppercase leading-none mb-1">{data.title}</div>
          <div className="text-[8px] text-white/40 uppercase font-bold tracking-[0.2em]">{data.desc}</div>
        </div>
      </Html>
    </group>
  );
}

// Загрузка и отображение вашей модели конвейера
function ConveyorModel() {
  const { scene } = useGLTF("/models/conveyor.glb"); // Путь к вашей модели
  return <primitive object={scene} scale={2} position={[0, -1, 0]} rotation={[0, Math.PI / 2, 0]} />;
}

export const ProcessSteps = () => {
  return (
    <section id="process" className="relative h-[100vh] w-full bg-black overflow-hidden border-y border-white/5">
      {/* Текстовый заголовок сверху сцены */}
      <div className="absolute top-20 left-10 z-20 pointer-events-none">
        <motion.h2 
          initial={{ opacity: 0, x: -100, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
          className="text-6xl md:text-8xl font-black italic uppercase tracking-tighter"
        >
          Smart <span className="text-accent-lime">Flow</span>
        </motion.h2>
        <p className="text-white/30 uppercase tracking-[0.5em] font-bold text-xs mt-4">Автоматизированная цепочка фулфилмента</p>
      </div>

      {/* 3D СЦЕНА */}
      <Canvas shadows camera={{ position: [5, 3, 8], fov: 35 }}>
        <color attach="background" args={["#000"]} />
        <fog attach="fog" args={["#000", 5, 20]} />
        
        <Suspense fallback={null}>
          <Environment preset="night" />
          <ambientLight intensity={0.2} />
          <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={2} castShadow />
          
          <group position={[0, 0, 0]}>
            {/* Модель конвейера */}
            <ConveyorModel />

            {/* Генерируем карточки с разным интервалом */}
            {steps.map((step, i) => (
              <StepCard 
                key={step.id} 
                data={step} 
                position={[0, 0.5, i * -4]} // Распределяем по длине
                speed={1.5} 
              />
            ))}
          </div>

          <ContactShadows resolution={1024} scale={20} blur={2} opacity={0.5} far={10} color="#E0FF64" />
        </Suspense>
      </Canvas>

      {/* Индикация скорости / Статус бар снизу */}
      <div className="absolute bottom-10 right-10 z-20">
        <div className="flex gap-4 items-center">
          <div className="text-right">
            <div className="text-[10px] text-white/40 uppercase font-black">System Status</div>
            <div className="text-accent-lime font-mono text-xl animate-pulse">OPERATIONAL</div>
          </div>
          <div className="w-12 h-12 rounded-full border border-accent-lime/20 flex items-center justify-center">
            <div className="w-2 h-2 bg-accent-lime rounded-full animate-ping" />
          </div>
        </div>
      </div>
    </section>
  );
};
