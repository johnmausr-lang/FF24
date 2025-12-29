"use client";

import React, { Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  PerspectiveCamera,
  Environment,
  ContactShadows,
  Float,
  MeshTransmissionMaterial,
  Text,
} from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { ConveyorModel } from "../Conveyor";
import * as THREE from "three";

const steps = [
  { title: "Заявка" },
  { title: "Забор" },
  { title: "Приёмка" },
  { title: "Маркировка" },
  { title: "Упаковка" },
  { title: "Отгрузка" },
  { title: "Финиш" },
];

function MovingBox({ index, title }: { index: number; title: string }) {
  const ref = React.useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!ref.current) return;

    const time = state.clock.getElapsedTime();
    const speed = 0.8; // скорость движения коробок
    const spacing = 9; // расстояние между коробками
    const loopLength = steps.length * spacing;

    // Бесконечное движение слева направо
    let x = (time * speed + index * spacing) % loopLength;
    if (x > loopLength / 2) x -= loopLength; // центрируем цикл

    ref.current.position.x = x - loopLength / 2 + spacing / 2;
  });

  return (
    <group ref={ref} position={[0, 4.5, 0]}>
      <Float speed={2} rotationIntensity={0.4} floatIntensity={0.5}>
        {/* Внешняя стеклянная оболочка */}
        <mesh castShadow receiveShadow>
          <boxGeometry args={[3.4, 2, 1.6]} />
          <MeshTransmissionMaterial
            backside
            samples={16}
            thickness={1.2}
            chromaticAberration={0.08}
            anisotropy={0.3}
            distortion={0.1}
            distortionScale={0.2}
            temporalResolution={8}
            transmission={1}
            roughness={0}
            color="#ffffff"
            clearcoat={1}
            clearcoatRoughness={0}
          />
        </mesh>

        {/* Внутренний неоновый блок */}
        <mesh position={[0, 0, 0.1]}>
          <boxGeometry args={[2.8, 1.6, 1.3]} />
          <meshStandardMaterial
            color="#E0FF64"
            emissive="#E0FF64"
            emissiveIntensity={2}
            transparent
            opacity={0.3}
          />
        </mesh>

        {/* Текст на передней грани */}
        <Text position={[0, 0.3, 0.81]} fontSize={0.16} color="white" anchorX="center">
          {`ID: 24-0${index + 1}`}
        </Text>
        <Text
          position={[0, -0.2, 0.81]}
          fontSize={0.34}
          color="#E0FF64"
          font="/fonts/inter-v12-latin-900.woff" // опционально, если есть кастомный шрифт
          anchorX="center"
        >
          {title.toUpperCase()}
        </Text>
      </Float>
    </group>
  );
}

export const ProcessSteps = () => {
  return (
    <section id="process" className="relative h-screen w-full bg-black overflow-hidden">
      {/* Заголовок */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 z-20 pointer-events-none text-center">
        <h1 className="text-7xl md:text-9xl font-black italic uppercase tracking-tighter leading-none">
          КОНВЕЙЕР <span className="text-[#E0FF64]">FF24</span>
        </h1>
      </div>

      <Canvas shadows dpr={[1, 1.5]}>
        <PerspectiveCamera makeDefault position={[0, 10, 35]} fov={28} />

        <ambientLight intensity={0.3} />
        <directionalLight position={[10, 20, 10]} intensity={1} color="#E0FF64" castShadow />

        <Suspense fallback={null}>
          <group rotation={[0, -0.1, 0]} position={[0, -5, 0]}>
            <ConveyorModel scale={2} />
            {steps.map((step, i) => (
              <MovingBox key={i} index={i} title={step.title} />
            ))}
          </group>

          <Environment preset="night" />
          <ContactShadows position={[0, -5.1, 0]} opacity={0.6} scale={80} blur={3} color="#E0FF64" />
        </Suspense>

        {/* Неоновое свечение — ключевой эффект! */}
        <EffectComposer>
          <Bloom
            intensity={1.8}
            luminanceThreshold={0.1}
            luminanceSmoothing={0.9}
            radius={0.8}
          />
        </EffectComposer>
      </Canvas>

      {/* Градиентная вуаль для глубины */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/70 pointer-events-none z-10" />
    </section>
  );
};
