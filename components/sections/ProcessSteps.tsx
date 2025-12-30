"use client";

import React, { Suspense, useRef, useState, useEffect } from "react";
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
  { title: "Заявка", desc: "Автоматическая регистрация ТЗ. Наш менеджер связывается с вами для уточнения деталей упаковки и логистики." },
  { title: "Забор", desc: "Собственный автопарк забирает товар с вашего склада или от поставщика в любую погоду 24/7." },
  { title: "Приёмка", desc: "Тщательная проверка на брак, сверка артикулов и занесение каждой единицы в систему учёта FF24." },
  { title: "Маркировка", desc: "Печать и наклейка штрихкодов, КИЗов и этикеток 'Честный Знак' в соответствии с регламентами." },
  { title: "Упаковка", desc: "Профессиональная подготовка: от бабл-пленки до брендированных коробов с усиленной защитой." },
  { title: "Отгрузка", desc: "Формирование паллет и оперативная доставка на склады Wildberries, Ozon или Яндекс.Маркет." },
  { title: "Финиш", desc: "Товар готов к продаже. Вы получаете полный фотоотчет и документы в личном кабинете." },
];

function MovingBox({ index, title, desc }: { index: number; title: string; desc: string }) {
  const groupRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Инициализация звука при монтировании компонента
  useEffect(() => {
    const audio = new Audio("/sound/conveyor-belt-loop.mp3");
    audio.loop = true;
    audio.volume = 0.2; // Громкость 20%, чтобы не пугать пользователя
    audioRef.current = audio;

    return () => {
      audio.pause();
      audioRef.current = null;
    };
  }, []);

  // Управление воспроизведением при наведении
  useEffect(() => {
    if (audioRef.current) {
      if (hovered) {
        audioRef.current.play().catch(() => {
          console.warn("Автовоспроизведение звука заблокировано браузером до первого клика.");
        });
      } else {
        audioRef.current.pause();
        audioRef.current.currentTime = 0; // Сбрасываем звук при уходе курсора
      }
    }
  }, [hovered]);

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    groupRef.current.position.x -= delta * 3.5;
    if (groupRef.current.position.x < -35) groupRef.current.position.x = 35;
    
    const s = hovered ? 1.2 : 1;
    groupRef.current.scale.lerp(new THREE.Vector3(s, s, s), 0.1);
  });

  return (
    <group
      ref={groupRef}
      position={[index * 11 - 20, 2.5, 0]} // Коробки едут
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
        {/* Мутное стекло */}
        <mesh castShadow>
          <boxGeometry args={[4, 2.5, 2.2]} />
          <MeshTransmissionMaterial 
            backside
            samples={12}
            thickness={2}
            chromaticAberration={0.15}
            transmission={1}
            roughness={0.7} // Сильное замутнение стекла
            color={hovered ? "#E0FF64" : "#ffffff"} 
            ior={1.3}
          />
        </mesh>
        
        <Text position={[0, 0.2, 1.11]} fontSize={0.25} color="white" fontWeight="bold">
          {`0${index + 1}`}
        </Text>
        <Text position={[0, -0.4, 1.11]} fontSize={0.45} color={hovered ? "#000" : "#E0FF64"} fontWeight="900">
          {title.toUpperCase()}
        </Text>

        {hovered && (
          <Html position={[0, 4.5, 0]} center distanceFactor={10}>
            <div className="bg-black/95 border-2 border-[#E0FF64] p-8 rounded-[40px] backdrop-blur-3xl w-[400px] shadow-[0_0_80px_rgba(224,255,100,0.4)] transition-all duration-500">
              <h4 className="text-[#E0FF64] font-black text-sm mb-3 uppercase tracking-[0.3em]">
                FF24 INDUSTRIAL ENGINE
              </h4>
              <p className="text-white text-lg font-bold leading-relaxed mb-2 italic">
                {title.toUpperCase()}
              </p>
              <p className="text-white/80 text-base font-medium leading-snug">
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
        <h2 className="text-7xl md:text-[160px] font-black italic uppercase text-white tracking-tighter leading-none opacity-90">
          КОНВЕЙЕР <span className="text-[#E0FF64] text-glow">FF24</span>
        </h2>
      </div>

      <Canvas shadows dpr={[1, 2]}>
        <PerspectiveCamera makeDefault position={[0, 16, 40]} fov={30} />
        
        <ambientLight intensity={1.8} /> 
        <spotLight position={[0, 50, 20]} angle={0.4} penumbra={1} intensity={12} color="#E0FF64" castShadow />

        <Suspense fallback={null}>
          <group position={[0, -5, 0]}>
            <ConveyorModel scale={16} /> 
            {steps.map((step, i) => (
              <MovingBox key={i} index={i} title={step.title} desc={step.desc} />
            ))}
          </group>
          
          <Environment preset="studio" />
          <ContactShadows position={[0, -5, 0]} opacity={0.8} scale={120} blur={3.5} />
        </Suspense>

        <OrbitControls enableZoom={false} maxPolarAngle={Math.PI / 2.1} />
      </Canvas>
    </section>
  );
};
