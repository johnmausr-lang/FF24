"use client";

import React, { Suspense, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  PerspectiveCamera,
  Environment,
  ContactShadows,
  Float,
  Sparkles,
  OrbitControls,
  useScroll,
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
  const ref = useRef<THREE.Group>(null);
  const scroll = useScroll();
  const targetX = useRef(0);

  useFrame((state) => {
    if (!ref.current) return;

    const time = state.clock.getElapsedTime();
    const baseSpeed = 0.8;
    // Ускорение от скролла (0–2x)
    const scrollSpeed = scroll.offset * 2;
    const speed = baseSpeed + scrollSpeed;

    const spacing = 9;
    const loopLength = steps.length * spacing;

    let x = (time * speed + index * spacing) % loopLength;
    if (x > loopLength / 2) x -= loopLength;

    targetX.current = x - loopLength / 2 + spacing / 2;

    // Пружинный эффект (spring-like lerp)
    ref.current.position.x += (targetX.current - ref.current.position.x) * 0.1;
  });

  return (
    <group ref={ref} position={[0, 4.5, 0]}>
      <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.4}>
        {/* Стеклянная коробка */}
        <mesh castShadow receiveShadow>
          <boxGeometry args={[3.4, 2, 1.6]} />
          <meshPhysicalMaterial
            transmission={1}
            thickness={1.2}
            roughness={0}
            clearcoat={1}
            clearcoatRoughness={0}
            color="#ffffff"
            chromaticAberration={0.08}
          />
        </mesh>

        {/* Внутренний неон */}
        <mesh position={[0, 0, 0.1]}>
          <boxGeometry args={[2.8, 1.6, 1.3]} />
          <meshStandardMaterial
            color="#E0FF64"
            emissive="#E0FF64"
            emissiveIntensity={3}
            toneMapped={false} // для сильного bloom
          />
        </mesh>

        {/* Текст */}
        <Text position={[0, 0.3, 0.81]} fontSize={0.16} color="white" anchorX="center">
          {`ID: 24-0${index + 1}`}
        </Text>
        <Text position={[0, -0.2, 0.81]} fontSize={0.34} color="#E0FF64" anchorX="center">
          {title.toUpperCase()}
        </Text>
      </Float>
    </group>
  );
}

export const ProcessSteps = () => {
  return (
    <section id="process" className="relative h-screen w-full bg-black overflow-hidden">
      <div className="absolute top-20 left-1/2 -translate-x-1/2 z-20 pointer-events-none text-center">
        <h1 className="text-7xl md:text-9xl font-black italic uppercase tracking-tighter leading-none">
          КОНВЕЙЕР <span className="text-[#E0FF64]">FF24</span>
        </h1>
      </div>

      <Canvas shadows dpr={[1, 1.5]}>
        <PerspectiveCamera makeDefault position={[0, 10, 35]} fov={28} />

        <fog attach="fog" args={["#000000", 20, 80]} />

        <ambientLight intensity={0.3} />
        <directionalLight position={[10, 20, 10]} intensity={1.5} color="#E0FF64" />

        <Suspense fallback={null}>
          {/* Основной конвейер */}
          <group rotation={[0, -0.1, 0]} position={[0, -5, 0]}>
            <ConveyorModel scale={2} />
            {steps.map((step, i) => (
              <MovingBox key={i} index={i} title={step.title} />
            ))}
          </group>

          {/* Фон: бесконечные конвейеры вдали */}
          <group position={[0, -5, -40]} rotation={[0, 0.2, 0]}>
            <ConveyorModel scale={1.5} />
            <meshStandardMaterial transparent opacity={0.3} />
          </group>
          <group position={[30, -5, -60]} rotation={[0, -0.3, 0]}>
            <ConveyorModel scale={1.2} />
            <meshStandardMaterial transparent opacity={0.2} />
          </group>

          {/* Искры вдоль неоновой линии */}
          <Sparkles
            count={200}
            scale={[60, 10, 4]}
            position={[0, 2, 0]}
            size={8}
            speed={0.8}
            opacity={0.8}
            color="#E0FF64"
            noise={0.5}
          />

          <Environment preset="night" />
          <ContactShadows position={[0, -5.1, 0]} opacity={0.6} scale={80} blur={3} color="#E0FF64" />
        </Suspense>

        {/* Неоновое свечение */}
        <EffectComposer>
          <Bloom intensity={2} luminanceThreshold={0.1} luminanceSmoothing={0.9} radius={0.8} />
        </EffectComposer>

        {/* Интерактив: вращение камеры мышью + damping */}
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.5}
          dampingFactor={0.05}
          maxPolarAngle={Math.PI / 2.2}
          minPolarAngle={Math.PI / 3}
        />
      </Canvas>

      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80 pointer-events-none z-10" />
    </section>
  );
};
