"use client";

import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
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
} from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { ConveyorModel } from "../Conveyor";

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
  // Простая анимация без useScroll, чтобы избежать крашей
  const timeOffset = index * 1.5;

  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.4}>
      <group position={[index * 9 - 30, 4.5, 0]}>
        {/* Стеклянная коробка */}
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
            transmission={0.98}
            roughness={0}
            clearcoat={1}
            clearcoatRoughness={0}
            color="#ffffff"
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
            emissiveIntensity={3}
            toneMapped={false}
          />
        </mesh>

        {/* Текст */}
        <Text position={[0, 0.3, 0.81]} fontSize={0.16} color="white" anchorX="center">
          {`ID: 24-0${index + 1}`}
        </Text>
        <Text position={[0, -0.2, 0.81]} fontSize={0.34} color="#E0FF64" anchorX="center">
          {title.toUpperCase()}
        </Text>
      </group>
    </Float>
  );
}

export const ProcessSteps = () => {
  console.log("%cProcessSteps компонент зарендерился", "color: lime; font-size: 16px;");

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

        {/* Обязательно для стабильности */}
        <ScrollControls pages={1} damping={0.25}>
          <fog attach="fog" args={["#000000", 20, 80]} />

          <ambientLight intensity={0.3} />
          <directionalLight position={[10, 20, 10]} intensity={1.5} color="#E0FF64" />

          <Suspense fallback={<mesh><boxGeometry args={[5, 5, 5]} /><meshStandardMaterial color="red" /></mesh>}>
            {/* Основной конвейер */}
            <group rotation={[0, -0.1, 0]} position={[0, -5, 0]}>
              <ConveyorModel scale={2} />
              {steps.map((step, i) => (
                <MovingBox key={i} index={i} title={step.title} />
              ))}
            </group>

            {/* Фон: дальние конвейеры */}
            <group position={[0, -5, -40]} rotation={[0, 0.2, 0]}>
              <ConveyorModel scale={1.5} />
            </group>
            <group position={[-30, -5, -60]} rotation={[0, -0.3, 0]}>
              <ConveyorModel scale={1.2} />
            </group>

            {/* Искры */}
            <Sparkles
              count={300}
              scale={[70, 10, 6]}
              position={[0, 2, 0]}
              size={6}
              speed={0.6}
              opacity={0.9}
              color="#E0FF64"
              noise={0.6}
            />

            <Environment preset="night" />
            <ContactShadows position={[0, -5.1, 0]} opacity={0.6} scale={80} blur={3} color="#E0FF64" />
          </Suspense>

          {/* Неоновый Bloom */}
          <EffectComposer>
            <Bloom
              intensity={2.0}
              luminanceThreshold={0.05}
              luminanceSmoothing={0.9}
              radius={0.8}
            />
          </EffectComposer>
        </ScrollControls>

        {/* Интерактивная камера */}
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.5}
          dampingFactor={0.05}
          maxPolarAngle={Math.PI / 2.1}
          minPolarAngle={Math.PI / 3}
        />
      </Canvas>

      {/* Вуаль для глубины */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80 pointer-events-none z-10" />
    </section>
  );
};
