"use client";

import React, { Suspense, useRef, useState, useEffect, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { 
  useGLTF, 
  Environment, 
  Html, 
  Float, 
  ContactShadows, 
  PerspectiveCamera,
  Center
} from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import * as THREE from "three";

const steps = [
  { id: 1, title: "ПРИЕМКА", desc: "Сверка и IT-учет" },
  { id: 2, title: "КОНТРОЛЬ", desc: "Проверка на брак" },
  { id: 3, title: "МАРКИРОВКА", desc: "Честный знак" },
  { id: 4, title: "УПАКОВКА", desc: "Брендирование" },
  { id: 5, title: "ОТГРУЗКА", desc: "Доставка" },
];

function SceneContent() {
  const groupRef = useRef<THREE.Group>(null);
  const { scene } = useGLTF("/models/conveyor.glb");

  useMemo(() => {
    scene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        mesh.material = new THREE.MeshStandardMaterial({
          color: "#080808",
          metalness: 0.9,
          roughness: 0.1,
        });
        if (mesh.name.toLowerCase().includes("neon") || mesh.name.toLowerCase().includes("light")) {
          mesh.material = new THREE.MeshStandardMaterial({
            color: "#E0FF64",
            emissive: "#E0FF64",
            emissiveIntensity: 12,
          });
        }
      }
    });
  }, [scene]);

  useFrame((state) => {
    if (!groupRef.current) return;
    const { x, y } = state.pointer;
    // Эффект Tilt: сцена наклоняется за мышью
    groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, (x * Math.PI) / 20, 0.05);
    groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, (-y * Math.PI) / 20, 0.05);
  });

  return (
    <group ref={groupRef}>
      <Center top>
        <primitive object={scene} scale={5.8} rotation={[0, Math.PI / 2, 0]} />
      </Center>
      {steps.map((step, i) => (
        <MovingTile key={i} data={step} index={i} />
      ))}
    </group>
  );
}

function MovingTile({ data, index }: { data: any, index: number }) {
  const group = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (!group.current) return;
    const time = state.clock.getElapsedTime();
    const zPos = ((time * 1.3 + index * 6) % 30) - 15; 
    group.current.position.set(0, 1.85, zPos);
    
    const opacity = Math.max(0, 1 - Math.abs(zPos) / 12);
    if (group.current.children[0] instanceof THREE.Mesh) {
      (group.current.children[0].material as THREE.MeshPhysicalMaterial).opacity = opacity * 0.85;
    }
  });

  return (
    <group ref={group}>
      <Float speed={1.8} rotationIntensity={0.05} floatIntensity={0.4}>
        <mesh>
          <boxGeometry args={[4.2, 2.4, 0.06]} />
          <meshPhysicalMaterial 
            transparent 
            transmission={1} 
            thickness={0.4}
            roughness={0.02}
            envMapIntensity={1.5}
            color="#ffffff"
          />
        </mesh>
        <Html transform distanceFactor={4.5} position={[0, 0, 0.07]} pointerEvents="none">
          <div className="w-[320px] p-8 bg-black/30 backdrop-blur-lg border border-[#E0FF64]/20 rounded-3xl text-center shadow-[0_0_40px_rgba(224,255,100,0.05)]">
            <div className="text-[10px] font-black text-[#E0FF64] uppercase tracking-[0.5em] mb-3 opacity-50">STATION 0{data.id}</div>
            <div className="text-3xl font-black italic uppercase text-white tracking-tighter leading-none mb-2">{data.title}</div>
            <div className="text-[10px] text-white/30 font-bold uppercase tracking-widest">{data.desc}</div>
          </div>
        </Html>
      </Float>
    </group>
  );
}

export const ProcessSteps = () => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  if (!mounted) return <div className="h-[850px] w-full bg-[#050505]" />;

  return (
    <section id="process" className="relative h-[850px] w-full bg-[#050505] overflow-hidden border-y border-white/5 flex flex-col items-center justify-center">
      <div className="absolute top-24 left-1/2 -translate-x-1/2 z-20 pointer-events-none text-center w-full px-4">
        <h2 className="text-7xl md:text-9xl font-black italic uppercase tracking-tighter leading-none text-neon">
          УМНЫЙ <span className="text-[#E0FF64]">КОНВЕЙЕР</span>
        </h2>
      </div>

      <Canvas shadows dpr={[1, 2]}>
        <PerspectiveCamera makeDefault position={[24, 16, 24]} fov={28} />
        <Suspense fallback={null}>
          <Environment preset="night" />
          <ambientLight intensity={0.4} /> 
          <pointLight position={[0, 10, 0]} intensity={15} color="#E0FF64" distance={30} decay={2} />
          
          <SceneContent />

          <EffectComposer>
            <Bloom luminanceThreshold={1} intensity={1.5} radius={0.4} />
          </EffectComposer>

          <ContactShadows position={[0, -0.05, 0]} opacity={0.5} scale={50} blur={3} color="#E0FF64" />
        </Suspense>
      </Canvas>
      <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black pointer-events-none z-10" />
    </section>
  );
};
