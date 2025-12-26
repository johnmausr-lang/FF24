"use client";

import React, { Suspense, useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, MeshTransmissionMaterial, Environment, Html, Float, ContactShadows } from "@react-three/drei";
import * as THREE from "three";
import { motion } from "framer-motion";

const steps = [
  { id: 1, title: "Приемка", desc: "Сверка и IT-учет" },
  { id: 2, title: "Контроль", desc: "Проверка на брак" },
  { id: 3, title: "Маркировка", desc: "Честный знак" },
  { id: 4, title: "Упаковка", desc: "Брендирование" },
  { id: 5, title: "Отгрузка", desc: "Доставка на маркетплейс" },
];

function Model() {
  const { scene } = useGLTF("/models/conveyor.glb");
  
  useMemo(() => {
    scene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        // Красим всё в темный "оружейный" металл
        mesh.material = new THREE.MeshStandardMaterial({
          color: "#080808",
          metalness: 1,
          roughness: 0.2,
          emissive: "#000000"
        });

        // Добавляем неоновое свечение на грани или детали с "light" в названии
        if (child.name.toLowerCase().includes("light") || child.name.toLowerCase().includes("neon")) {
          mesh.material = new THREE.MeshStandardMaterial({
            color: "#E0FF64",
            emissive: "#E0FF64",
            emissiveIntensity: 10,
          });
        }
      }
    });
  }, [scene]);

  return (
    <primitive 
      object={scene} 
      scale={4.5} // Увеличили
      position={[0, -2, 0]} 
      rotation={[0, -Math.PI / 1.3, 0]} // Развернули
    />
  );
}

function StepCard({ position, data }: { position: [number, number, number], data: any }) {
  const group = useRef<THREE.Group>(null);
  
  useFrame((state, delta) => {
    if (group.current) {
      group.current.position.z += delta * 1.5;
      if (group.current.position.z > 6) group.current.position.z = -14;
    }
  });

  return (
    <group ref={group} position={position}>
      <Float speed={3} rotationIntensity={0.2} floatIntensity={0.5}>
        <mesh>
          <boxGeometry args={[2.8, 1.8, 0.05]} />
          <MeshTransmissionMaterial
            samples={6}
            thickness={0.2}
            chromaticAberration={0.05}
            distortion={0.1}
            color="#ffffff"
            transmission={1}
            metalness={0.1}
          />
        </mesh>
        <Html
          transform
          occlude
          distanceFactor={2}
          position={[0, 0, 0.04]}
          className="pointer-events-none"
        >
          <div className="w-[240px] p-6 bg-black/60 backdrop-blur-xl border border-accent-lime/30 rounded-3xl text-center">
            <div className="text-[10px] font-black text-accent-lime uppercase tracking-[0.4em] mb-2 opacity-70">Step 0{data.id}</div>
            <div className="text-2xl font-black italic uppercase text-white mb-1 leading-none">{data.title}</div>
            <div className="text-[9px] text-white/40 font-bold uppercase tracking-widest leading-tight">{data.desc}</div>
          </div>
        </Html>
      </Float>
    </group>
  );
}

export const ProcessSteps = () => {
  return (
    <section id="process" className="relative h-[900px] w-full bg-black overflow-hidden border-y border-white/5">
      <div className="absolute top-24 left-10 z-20">
        <h2 className="text-6xl md:text-8xl font-[900] italic uppercase tracking-tighter leading-none">
          Smart <br /> <span className="text-accent-lime text-neon">Workflow</span>
        </h2>
      </div>

      <Canvas shadows camera={{ position: [10, 6, 12], fov: 25 }}>
        <color attach="background" args={["#000000"]} />
        <fog attach="fog" args={["#000", 10, 25]} />
        <Suspense fallback={null}>
          <Environment preset="night" />
          <ambientLight intensity={0.5} />
          <spotLight position={[15, 15, 15]} angle={0.2} intensity={10} color="#E0FF64" castShadow />
          
          <Model />

          {steps.map((step, i) => (
            <StepCard key={step.id} data={step} position={[0, 1.2, i * -4]} />
          ))}

          <ContactShadows position={[0, -2, 0]} opacity={0.6} scale={25} blur={2.4} far={4.5} color="#E0FF64" />
        </Suspense>
      </Canvas>
    </section>
  );
};
