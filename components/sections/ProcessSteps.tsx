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
  const offsetX = index * 9 - 30; // равномерное распределение по конвейеру

  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.4}>
      <group position={[offsetX, 4.5, 0]}>
        {/* Стеклянная оболочка */}
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

        {/* Внутренний неоновый блок — мягкое свечение */}
        <mesh position={[0, 0, 0.1]}>
          <boxGeometry args={[2.8, 1.6, 1.3]} />
          <meshStandardMaterial
            color="#E0FF64"
            emissive="#E0FF64"
            emissiveIntensity={1.2}   // мягче, без выжигания
            toneMapped={true}         // включён tone mapping
          />
        </mesh>

        {/* Текст на коробке */}
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
      {/* Большой заголовок */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 z-20 pointer-events-none text-center">
        <h1 className="text-7xl md:text-9xl font-black italic uppercase tracking-tighter leading-none">
          КОНВЕЙЕР <span className="text-[#E0FF64]">FF24</span>
        </h1>
      </div>

      <Canvas shadows dpr={[1, 1.5]}>
        {/* Камера чуть ближе и ниже для лучшего вида */}
        <PerspectiveCamera makeDefault position={[0, 8, 28]} fov={30} />

        <ScrollControls pages={1} damping={0.25}>
          {/* Туман для атмосферы */}
          <fog attach="fog" args={["#000000", 20, 80]} />

          <ambientLight intensity={0.4} />
          <directionalLight position={[10, 20, 10]} intensity={1.2} color="#E0FF64" />

          <Suspense fallback={null}>
            {/* Основной конвейер с коробками */}
            <group rotation={[0, -0.1, 0]} position={[0, -5, 0]}>
              <ConveyorModel scale={2} />
              {steps.map((step, i) => (
                <MovingBox key={i} index={i} title={step.title} />
              ))}
            </group>

            {/* Фон: дальние конвейеры для глубины */}
            <group position={[0, -5, -40]} rotation={[0, 0.2, 0]}>
              <ConveyorModel scale={1.5} />
            </group>
            <group position={[-30, -5, -60]} rotation={[0, -0.3, 0]}>
              <ConveyorModel scale={1.2} />
            </group>

            {/* Искры вдоль линии */}
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
            <ContactShadows
              position={[0, -5.1, 0]}
              opacity={0.6}
              scale={80}
              blur={3}
              color="#E0FF64"
            />
          </Suspense>

          {/* Мягкий, красивый Bloom */}
          <EffectComposer>
            <Bloom
              intensity={1.2}
              luminanceThreshold={0.2}
              luminanceSmoothing={0.9}
              radius={0.7}
            />
          </EffectComposer>
        </ScrollControls>

        {/* Интерактив: вращение камеры по мыши */}
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

      {/* Градиентная вуаль сверху и снизу */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80 pointer-events-none z-10" />
    </section>
  );
};
