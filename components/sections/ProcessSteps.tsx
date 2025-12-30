"use client";

import React, { Suspense, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  PerspectiveCamera,
  Environment,
  ContactShadows,
  Float,
  Text,
  Html,
} from "@react-three/drei";
import { ConveyorModel } from "../Conveyor";
import * as THREE from "three";

const steps = [
  { title: "Заявка", desc: "Автоматическая регистрация заказа в системе FF24." },
  { title: "Забор", desc: "Курьер забирает товар с вашего адреса 24/7." },
  { title: "Приёмка", desc: "Проверка на брак и IT-учёт каждой позиции." },
  { title: "Маркировка", desc: "Печать КИЗов и кодов 'Честный знак'." },
  { title: "Упаковка", desc: "Брендированная упаковка с защитой от ударов." },
  { title: "Отгрузка", desc: "Доставка на маркетплейс в течение 24 часов." },
  { title: "Финиш", desc: "Полный фотоотчёт в личном кабинете." },
];

function AbyssBox({ index, title, desc, total }: { index: number; title: string; desc: string; total: number }) {
  const groupRef = useRef<THREE.Group>(null);
  const velocityRef = useRef(0);
  const [hovered, setHovered] = useState(false);
  
  const spacing = 16;
  const conveyorEnd = -28;

  useFrame((state, delta) => {
    const g = groupRef.current;
    if (!g) return;

    g.position.x -= delta * 5.5;

    if (g.position.x < conveyorEnd) {
      velocityRef.current += delta * 25;
      g.position.y -= velocityRef.current * delta;
      g.rotation.z += delta * 1.5;
      g.rotation.x += delta * 0.8;
    } else {
      velocityRef.current = 0;
      g.position.y = 2.0;
      g.rotation.set(0, 0, 0);
    }

    if (g.position.y < -35) {
      g.position.x = (total - 1) * spacing;
      g.position.y = 2.0;
      velocityRef.current = 0;
    }

    const targetScale = hovered ? 1.2 : 1;
    g.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.12);
  });

  return (
    <group ref={groupRef} position={[index * spacing, 2.0, 0]} onPointerOver={() => setHovered(true)} onPointerOut={() => setHovered(false)}>
      <Float speed={hovered ? 0 : 2} rotationIntensity={0.2} floatIntensity={0.2}>
        <mesh castShadow receiveShadow>
          <boxGeometry args={[4.2, 2.8, 2.6]} />
          <meshPhysicalMaterial
            color={hovered ? "#E0FF64" : "#d9d9d9"}
            roughness={0.25}
            metalness={0.05}
            clearcoat={0.2}
            clearcoatRoughness={0.2}
          />
        </mesh>
        
        <Text position={[0, 0.4, 1.31]} fontSize={0.28} color="white" fontWeight="900">
          {`ID: 24-0${index + 1}`}
        </Text>
        <Text position={[0, -0.4, 1.31]} fontSize={0.48} color={hovered ? "#000" : "#E0FF64"} fontWeight="900">
          {title.toUpperCase()}
        </Text>

        {hovered && (
          <Html position={[0, 5, 0]} center>
            <div className="bg-black/95 border-2 border-[#E0FF64] p-8 rounded-[40px] backdrop-blur-3xl w-[420px] shadow-[0_0_100px_rgba(224,255,100,0.35)]">
              <p className="text-white text-2xl font-black mb-3 italic uppercase text-center border-b border-[#E0FF64]/20 pb-2">{title}</p>
              <p className="text-white/80 text-base font-bold leading-relaxed text-center">{desc}</p>
            </div>
          </Html>
        )}
      </Float>
    </group>
  );
}

export const ProcessSteps = () => {
  return (
    <section id="process" className="relative h-screen w-full bg-[#020202] overflow-hidden">
      <Canvas
        shadows
        dpr={[2, 3]}
        gl={{
          antialias: true,
          alpha: false,
          powerPreference: "high-performance",
          // physicallyCorrectLights удален, так как он включен по умолчанию в новых версиях Three.js
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.0,
        }}
        onCreated={({ gl }) => {
          gl.shadowMap.enabled = true;
          gl.shadowMap.type = THREE.PCFSoftShadowMap;
        }}
      >
        <PerspectiveCamera makeDefault position={[0, 16, 55]} fov={26} />
        <fog attach="fog" args={["#020202", 40, 95]} />
        
        <ambientLight intensity={0.4} /> 
        <spotLight 
          position={[0, 80, 30]} 
          angle={0.28} 
          penumbra={1} 
          intensity={500} // В новых версиях интенсивность ламп требует больших значений
          color="#E0FF64" 
          castShadow 
          shadow-mapSize-width={4096} 
          shadow-mapSize-height={4096}
          shadow-bias={-0.00015}
        />
        <directionalLight position={[40, 30, 40]} intensity={1.5} castShadow shadow-mapSize-width={2048} shadow-mapSize-height={2048} />

        <Suspense fallback={null}>
          <group position={[0, -6, 0]}>
            <ConveyorModel scale={18} /> 
            {steps.map((step, i) => (
              <AbyssBox key={i} index={i} total={steps.length} title={step.title} desc={step.desc} />
            ))}
          </group>
          <Environment preset="night" />
          <ContactShadows position={[0, -6.1, 0]} opacity={0.6} scale={100} blur={2.5} far={10} color="#000" />
        </Suspense>
      </Canvas>
    </section>
  );
};
