"use client";

import React, { Suspense, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
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
  { title: "Заявка", desc: "Автоматическая регистрация заказа в системе FF24 сразу после оформления на маркетплейсе" },
  { title: "Забор", desc: "Курьер забирает товар с вашего склада или адреса в удобное для вас время" },
  { title: "Приёмка", desc: "Полная сверка количества, проверка на брак и IT-учёт каждой позиции" },
  { title: "Маркировка", desc: "Автоматическая печать и наклейка кодов 'Честный знак' по требованиям закона" },
  { title: "Упаковка", desc: "Профессиональная брендированная упаковка с защитой от повреждений" },
  { title: "Отгрузка", desc: "Доставка на склад маркетплейса в течение 24 часов с подтверждением" },
  { title: "Финиш", desc: "Полный отчёт, фотофиксация и обновление статуса в вашем кабинете" },
];

function MovingBox({ index, title, desc }: { index: number; title: string; desc: string }) {
  const groupRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);

  useFrame(() => {
    if (!groupRef.current) return;
    groupRef.current.scale.lerp(new THREE.Vector3(hovered ? 1.2 : 1, hovered ? 1.2 : 1, hovered ? 1.2 : 1), 0.2);
    groupRef.current.rotation.y = hovered ? Math.sin(Date.now() * 0.004) * 0.15 : 0;
  });

  const offsetX = index * 9 - 30;

  return (
    <group
      ref={groupRef}
      position={[offsetX, 4.5, 0]}
      onPointerOver={(e) => (e.stopPropagation(), setHovered(true))}
      onPointerOut={(e) => (e.stopPropagation(), setHovered(false))}
    >
      <Float speed={1.4} rotationIntensity={0.3} floatIntensity={0.4}>
        {/* Матовое стекло (frosted glass) */}
        <mesh castShadow receiveShadow>
          <boxGeometry args={[3.4, 2, 1.6]} />
          <MeshTransmissionMaterial
            backside
            samples={12}
            thickness={1.8}
            chromaticAberration={hovered ? 0.25 : 0.05}
            anisotropy={0.1}
            distortion={hovered ? 0.1 : 0.05}
            distortionScale={0.3}
            transmission={0.92}
            roughness={0.45}                 // матовость
            clearcoat={0.6}
            clearcoatRoughness={0.5}
            color={hovered ? "#E0FF64" : "#d0d0ff"}
            envMapIntensity={1.4}
            toneMapped={false}
          />
        </mesh>

        {/* Яркое внутреннее свечение при hover */}
        {hovered && (
          <mesh position={[0, 0, 0.05]}>
            <boxGeometry args={[3.0, 1.8, 1.4]} />
            <meshStandardMaterial
              color="#E0FF64"
              emissive="#E0FF64"
              emissiveIntensity={5}
              toneMapped={false}
            />
          </mesh>
        )}

        {/* Текст */}
        <Text position={[0, 0.3, 0.81]} fontSize={0.16} color="white" anchorX="center">
          {`ID: 24-0${index + 1}`}
        </Text>
        <Text position={[0, -0.2, 0.81]} fontSize={0.36} color={hovered ? "#000000" : "#E0FF64"} anchorX="center">
          {title.toUpperCase()}
        </Text>

        {/* Большое всплывающее окно с описанием */}
        {hovered && (
          <Html position={[0, 4.5, 0]} center distanceFactor={7}>
            <div className="max-w-md px-8 py-6 bg-black/95 backdrop-blur-2xl border-2 border-[#E0FF64]/60 rounded-3xl shadow-2xl text-left">
              <div className="text-[#E0FF64] font-black uppercase tracking-widest text-sm mb-2">
                ЭТАП {index + 1} • {title.toUpperCase()}
              </div>
              <div className="text-white font-medium text-base leading-relaxed">
                {desc}
              </div>
              <div className="mt-4 text-[#E0FF64]/80 text-xs uppercase tracking-wider">
                FF24 — работаем 24/7
              </div>
            </div>
          </Html>
        )}
      </Float>
    </group>
  );
}

export const ProcessSteps = () => {
  console.log("%cProcessSteps FINAL — конвейер и матовые коробки", "color: cyan; font-size: 18px;");

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
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 20, 10]} intensity={1.4} color="#E0FF64" />

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
            <Bloom intensity={1.3} luminanceThreshold={0.15} luminanceSmoothing={0.9} radius={0.75} />
          </EffectComposer>
        </ScrollControls>

        <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} dampingFactor={0.05} maxPolarAngle={Math.PI / 2.1} minPolarAngle={Math.PI / 3} />
      </Canvas>

      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80 pointer-events-none z-10" />
    </section>
  );
};
