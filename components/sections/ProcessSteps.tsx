"use client";

import React, { Suspense, useRef, useState, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  PerspectiveCamera,
  Environment,
  ContactShadows,
  Float,
  Text,
  Html,
  OrbitControls,
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

function SceneDebugger() {
  const { scene, camera } = useThree();
  useEffect(() => {
    console.log("%cСЦЕНА ИНИЦИАЛИЗИРОВАНА", "color: #E0FF64; font-weight: bold;");
    console.log("Текущая камера:", camera.position);
    console.log("Объектов в сцене:", scene.children.length);
  }, [scene, camera]);
  return null;
}

function ScannerLaser() {
  const laserRef = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (laserRef.current) {
      laserRef.current.position.x = Math.sin(state.clock.elapsedTime) * 15;
    }
  });
  return (
    <mesh ref={laserRef} position={[0, 4, 0]}>
      <boxGeometry args={[0.1, 8, 4]} />
      <meshStandardMaterial color="#E0FF64" emissive="#E0FF64" emissiveIntensity={5} transparent opacity={0.4} />
    </mesh>
  );
}

function AbyssBox({ index, title, desc, total }: { index: number; title: string; desc: string; total: number }) {
  const groupRef = useRef<THREE.Group>(null);
  const velocityRef = useRef(0);
  const [hovered, setHovered] = useState(false);
  const spacing = 18;
  const conveyorEnd = -30;

  useFrame((state, delta) => {
    const g = groupRef.current;
    if (!g) return;
    g.position.x -= delta * 6;
    if (g.position.x < conveyorEnd) {
      velocityRef.current += delta * 25;
      g.position.y -= velocityRef.current * delta;
      g.rotation.z += delta * 1.5;
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
    g.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);
  });

  return (
    <group ref={groupRef} position={[index * spacing, 2.0, 0]} onPointerOver={() => setHovered(true)} onPointerOut={() => setHovered(false)}>
      <Float speed={2} rotationIntensity={0.2} floatIntensity={0.2}>
        <mesh castShadow receiveShadow>
          <boxGeometry args={[4.2, 2.8, 2.6]} />
          <meshPhysicalMaterial color={hovered ? "#E0FF64" : "#f0f0f0"} roughness={0.25} metalness={0.05} clearcoat={0.3} />
        </mesh>
        <Text position={[0, 0.4, 1.35]} fontSize={0.25} color="white" fontWeight="900">{`ID: 24-0${index + 1}`}</Text>
        <Text position={[0, -0.4, 1.35]} fontSize={0.45} color={hovered ? "#000" : "#E0FF64"} fontWeight="900">{title.toUpperCase()}</Text>
        {hovered && (
          <Html position={[0, 5, 0]} center>
            <div className="bg-black/95 border-2 border-[#E0FF64] p-8 rounded-[40px] backdrop-blur-3xl w-[400px] shadow-[0_0_100px_rgba(224,255,100,0.3)] pointer-events-none">
              <p className="text-white text-2xl font-black mb-2 uppercase text-center">{title}</p>
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
        dpr={[1, 2]}
        gl={{ antialias: true }}
        onCreated={() => console.log("%cCANVAS СОЗДАН", "color: cyan;")}
      >
        <SceneDebugger />
        <PerspectiveCamera makeDefault position={[0, 20, 60]} fov={30} />
        
        {/* Убрали туман временно для отладки видимости */}
        <ambientLight intensity={1} /> 
        <pointLight position={[0, 50, 50]} intensity={1.5} color="#ffffff" />
        <spotLight position={[0, 80, 40]} angle={0.3} intensity={2} color="#E0FF64" castShadow />

        <Suspense fallback={<Html center><div className="text-[#E0FF64] text-2xl animate-pulse font-black">ЗАГРУЗКА FF24 ENGINE...</div></Html>}>
          <group position={[0, -6, 0]}>
            <ConveyorModel scale={20} /> 
            <ScannerLaser />
            {steps.map((step, i) => (
              <AbyssBox key={i} index={i} total={steps.length} title={step.title} desc={step.desc} />
            ))}
          </group>
          <Environment preset="night" />
        </Suspense>
        
        <OrbitControls enableZoom={true} />
      </Canvas>

      <div className="absolute top-24 w-full z-10 text-center pointer-events-none">
        <h2 className="text-7xl md:text-9xl font-black italic uppercase text-white tracking-tighter opacity-90">КОНВЕЙЕР</h2>
      </div>
    </section>
  );
};
