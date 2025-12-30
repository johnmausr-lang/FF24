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

// Подробная расшифровка услуг
const steps = [
  { title: "Заявка", desc: "Автоматическая регистрация ТЗ. Наш менеджер связывается с вами для уточнения деталей упаковки и логистики." },
  { title: "Забор", desc: "Собственный автопарк забирает товар с вашего склада или от поставщика в любую погоду 24/7." },
  { title: "Приёмка", desc: "Тщательная проверка на брак, сверка артикулов и занесение каждой единицы в систему учёта FF24." },
  { title: "Маркировка", desc: "Печать и наклейка штрихкодов, КИЗов и этикеток 'Честный Знак' в строгом соответствии с регламентами." },
  { title: "Упаковка", desc: "Профессиональная подготовка: от бабл-пленки до брендированных коробов с усиленной защитой углов." },
  { title: "Отгрузка", desc: "Формирование паллет и оперативная доставка на склады Wildberries, Ozon или Яндекс.Маркет." },
  { title: "Финиш", desc: "Товар готов к продаже. Вы получаете полный фотоотчет и закрывающие документы в личном кабинете." },
];

function MovingBox({ index, title, desc }: { index: number; title: string; desc: string }) {
  const groupRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    // Коробки двигаются, конвейер статичен
    groupRef.current.position.x -= delta * 3.5;
    if (groupRef.current.position.x < -35) groupRef.current.position.x = 35;
    
    // Плавная анимация масштаба при наведении
    const s = hovered ? 1.2 : 1;
    groupRef.current.scale.lerp(new THREE.Vector3(s, s, s), 0.1);
  });

  return (
    <group
      ref={groupRef}
      position={[index * 11 - 20, 2, 0]} 
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
        {/* Коробка из мутного стекла */}
        <mesh castShadow>
          <boxGeometry args={[4, 2.5, 2]} />
          <MeshTransmissionMaterial 
            backside
            samples={10}
            thickness={1.5}
            chromaticAberration={0.1}
            transmission={0.95}
            roughness={0.6} // Эффект мутного (frosted) стекла
            color={hovered ? "#E0FF64" : "#ffffff"} // Неоновое свечение при наведении
            ior={1.2}
          />
        </mesh>
        
        {/* Текстовые метки */}
        <Text position={[0, 0.2, 1.01]} fontSize={0.2} color="white" fontWeight="bold">
          {`0${index + 1}`}
        </Text>
        <Text position={[0, -0.3, 1.01]} fontSize={0.4} color={hovered ? "#000" : "#E0FF64"} fontWeight="900">
          {title.toUpperCase()}
        </Text>

        {/* Подробная расшифровка (всплывает при hover) */}
        {hovered && (
          <Html position={[0, 4, 0]} center distanceFactor={10}>
            <div className="bg-black/90 border-2 border-[#E0FF64] p-6 rounded-3xl backdrop-blur-2xl w-80 shadow-[0_0_50px_rgba(224,255,100,0.5)]">
              <h4 className="text-[#E0FF64] font-black text-xs mb-2 uppercase tracking-widest">
                FF24 // ЭТАП {index + 1}
              </h4>
              <p className="text-white text-base font-bold leading-snug">
                {desc}
              </p>
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
          КОНВЕЙЕР <span className="text-[#E0FF64]">FF24</span>
        </h2>
      </div>

      <Canvas shadows dpr={[1, 2]}>
        <PerspectiveCamera makeDefault position={[0, 15, 35]} fov={28} />
        
        <ambientLight intensity={1.5} /> 
        <spotLight position={[0, 40, 10]} angle={0.5} penumbra={1} intensity={10} color="#E0FF64" castShadow />

        <Suspense fallback={null}>
          <group position={[0, -5, 0]}>
            {/* Увеличенный масштаб конвейера для соответствия коробкам */}
            <ConveyorModel scale={14} />
            
            {steps.map((step, i) => (
              <MovingBox key={i} index={i} title={step.title} desc={step.desc} />
            ))}
          </group>
          
          <Environment preset="studio" />
          <ContactShadows position={[0, -5, 0]} opacity={0.8} scale={100} blur={3} />
        </Suspense>

        <OrbitControls enableZoom={false} maxPolarAngle={Math.PI / 2.1} />
      </Canvas>
    </section>
  );
};
