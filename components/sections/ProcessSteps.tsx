"use client";

import React, { Suspense, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  PerspectiveCamera,
  Environment,
  ContactShadows,
  Float,
  Sparkles,
  OrbitControls,
  ScrollControls,
  MeshTransmissionMaterial,
  Text,
  Html,
} from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { ConveyorModel } from "../Conveyor";
import * as THREE from "three";

const steps = [
  { title: "Заявка", desc: "Моментальная регистрация груза в системе" },
  { title: "Забор", desc: "Быстрый выезд курьера в удобное время" },
  { title: "Приёмка", desc: "Сверка и IT-учёт каждой единицы" },
  { title: "Маркировка", desc: "Автоматическая наклейка 'Честный знак'" },
  { title: "Упаковка", desc: "Брендированная защита товара" },
  { title: "Отгрузка", desc: "Доставка на маркетплейс в течение 24ч" },
  { title: "Финиш", desc: "Подтверждение и отчёт клиенту" },
];

function MovingBox({ index, title, desc }: { index: number; title: string; desc: string }) {
  const groupRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);
  const { clock } = useThree();

  // Глобальная скорость конвейера (для замедления при hover)
  const globalSpeed = useRef(0.3);

  useFrame((state, delta) => {
    if (!groupRef.current) return;

    if (hovered) {
      globalSpeed.current = THREE.MathUtils.lerp(globalSpeed.current, 0.05, 0.1);
      groupRef.current.scale.lerp(new THREE.Vector3(1.2, 1.2, 1.2), 0.2);
      groupRef.current.rotation.y = Math.sin(clock.getElapsedTime() * 2) * 0.1;
    } else {
      globalSpeed.current = THREE.MathUtils.lerp(globalSpeed.current, 0.3, 0.1);
      groupRef.current.scale.lerp(new THREE.Vector3(1, 1, 1), 0.2);
      groupRef.current.rotation.y = 0;
    }

    // Движение ленты (синхронизировано с Conveyor.tsx)
    // Но для коробок — просто позиция
  });

  const offsetX = index * 9 - 30;

  return (
    <group
      ref={groupRef}
      position={[offsetX, 4.5, 0]}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.4}>
        {/* Стеклянная оболочка */}
        <mesh castShadow receiveShadow>
          <boxGeometry args={[3.4, 2, 1.6]} />
          <MeshTransmissionMaterial
            backside
            samples={16}
            thickness={1.2}
            chromaticAberration={hovered ? 0.15 : 0.08}
            anisotropy={0.3}
            distortion={0.1}
            distortionScale={0.2}
            transmission={0.98}
            roughness={0}
            clearcoat={1}
            clearcoatRoughness={0}
            color={hovered ? "#E0FF64" : "#ffffff"}
            envMapIntensity={1.5}
            toneMapped={false}
          />
        </mesh>

        {/* Внутренний неоновый блок */}
        <mesh position={[0, 0, 0.1]}>
          <boxGeometry args={[2.8, 1.6, 1.3]} />
          <meshStandardMaterial
            color="#E0FF64"
            emissive="#E0FF64"
            emissiveIntensity={hovered ? 3 : 1.2}
            toneMapped={true}
          />
        </mesh>

        {/* Текст */}
        <Text position={[0, 0.3, 0.81]} fontSize={0.16} color="white" anchorX="center">
          {`ID: 24-0${index + 1}`}
        </Text>
        <Text position={[0, -0.2, 0.81]} fontSize={0.34} color="#E0FF64" anchorX="center">
          {title.toUpperCase()}
        </Text>

        {/* Tooltip при hover */}
        {hovered && (
          <Html position={[0, 3, 0]} center distanceFactor={8}>
            <div className="px-6 py-4 bg-black/80 backdrop-blur-xl border border-[#E0FF64]/30 rounded-3xl text-center shadow-2xl">
              <div className="text-[#E0FF64] font-black uppercase tracking-wider text-sm mb-1">
                STATION 0{index + 1}
              </div>
              <div className="text-white font-bold text-lg">{title}</div>
              <div className="text-white/60 text-xs mt-2 max-w-[200px]">{desc}</div>
            </div>
          </Html>
        )}

        {/* Дополнительные искры при hover */}
        {hovered && (
          <Sparkles count={50} scale={4} size={4} speed={2} opacity={1} color="#E0FF64" />
        )}
      </Float>
    </group>
  );
}

// Звук конвейера (опционально, добавь файл public/sounds/conveyor-ambient.mp3)
useEffect(() => {
  const audio = new Audio("/sounds/conveyor-ambient.mp3");
  audio.loop = true;
  audio.volume = 0.2;

  const playAudio = () => audio.play();
  window.addEventListener("click", playAudio, { once: true }); // автоплей после взаимодействия

  return () => {
    audio.pause();
    window.removeEventListener("click", playAudio);
  };
}, []);

export const ProcessSteps = () => {
  console.log("%cProcessSteps NEXT LEVEL зарендерился", "color: cyan; font-size: 18px;");

  return (
    <section id="process" className="relative h-screen w-full bg-black overflow-hidden">
      <div className="absolute top-20 left-1/2 -translate-x-1/2 z-20 pointer-events-none text-center">
        <h1 className="text-7xl md:text-9xl font-black italic uppercase tracking-tighter leading-none">
          КОНВЕЙЕР <span className="text-[#E0FF64]">FF24</span>
        </h1>
      </div>

      <Canvas shadows dpr={[1, 1.5]}>
        <PerspectiveCamera makeDefault position={[0, 8, 28]} fov={30} />

        <ScrollControls pages={1} damping={0.25}>
          <fog attach="fog" args={["#000000", 20, 80]} />
          <ambientLight intensity={0.4} />
          <directionalLight position={[10, 20, 10]} intensity={1.2} color="#E0FF64" />

          <Suspense fallback={null}>
            <group rotation={[0, -0.1, 0]} position={[0, -5, 0]}>
              <ConveyorModel scale={2} />
              {steps.map((step, i) => (
                <MovingBox key={i} index={i} title={step.title} desc={step.desc} />
              ))}
            </group>

            <group position={[0, -5, -40]} rotation={[0, 0.2, 0]}>
              <ConveyorModel scale={1.5} />
            </group>
            <group position={[-30, -5, -60]} rotation={[0, -0.3, 0]}>
              <ConveyorModel scale={1.2} />
            </group>

            <Sparkles count={300} scale={[70, 10, 6]} position={[0, 2, 0]} size={6} speed={0.6} opacity={0.9} color="#E0FF64" noise={0.6} />

            <Environment preset="night" />
            <ContactShadows position={[0, -5.1, 0]} opacity={0.6} scale={80} blur={3} color="#E0FF64" />
          </Suspense>

          <EffectComposer>
            <Bloom intensity={1.2} luminanceThreshold={0.2} luminanceSmoothing={0.9} radius={0.7} />
          </EffectComposer>
        </ScrollControls>

        <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} dampingFactor={0.05} maxPolarAngle={Math.PI / 2.1} minPolarAngle={Math.PI / 3} />
      </Canvas>

      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80 pointer-events-none z-10" />
    </section>
  );
};
