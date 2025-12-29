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
import * as THREE from "three";

const steps = [
  { id: 1, title: "ПРИЕМКА", desc: "Сверка и IT-учет" },
  { id: 2, title: "КОНТРОЛЬ", desc: "Проверка на брак" },
  { id: 3, title: "МАРКИРОВКА", desc: "Честный знак" },
  { id: 4, title: "УПАКОВКА", desc: "Брендирование" },
  { id: 5, title: "ОТГРУЗКА", desc: "Доставка" },
];

function ConveyorModel() {
  const { scene } = useGLTF("/models/conveyor.glb");
  
  useMemo(() => {
    scene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        // Настройка металла конвейера
        mesh.material = new THREE.MeshStandardMaterial({
          color: "#111111",
          metalness: 0.9,
          roughness: 0.1,
        });

        // Ищем неоновые полоски в модели и заставляем их светиться
        if (mesh.name.toLowerCase().includes("light") || mesh.name.toLowerCase().includes("neon")) {
          mesh.material = new THREE.MeshStandardMaterial({
            color: "#E0FF64",
            emissive: "#E0FF64",
            emissiveIntensity: 10,
          });
        }
      }
    });
  }, [scene]);

  return <primitive object={scene} scale={5.5} rotation={[0, Math.PI / 2, 0]} />;
}

function MovingTile({ data, index }: { data: any, index: number }) {
  const group = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (group.current) {
      const time = state.clock.getElapsedTime();
      const speed = 1.2; // Скорость движения
      const offset = index * 6; // Расстояние между плитками
      
      // Движение по оси Z (вдоль конвейера)
      let zPos = ((time * speed + offset) % 30) - 15; 
      group.current.position.set(0, 1.8, zPos);

      // Плавное появление и исчезновение плитки на краях
      const opacity = Math.sin(Math.PI * (zPos + 15) / 30);
      if (group.current.children[0] instanceof THREE.Mesh) {
        (group.current.children[0].material as THREE.MeshStandardMaterial).opacity = opacity * 0.9;
      }
    }
  });

  return (
    <group ref={group}>
      <Float speed={1.5} rotationIntensity={0.05} floatIntensity={0.3}>
        {/* Прозрачная плитка (стекло) */}
        <mesh>
          <boxGeometry args={[4, 2.2, 0.05]} />
          <meshPhysicalMaterial 
            transparent 
            opacity={0.8}
            transmission={0.95} 
            thickness={0.2}
            roughness={0.05}
            envMapIntensity={1}
            color="#ffffff"
          />
        </mesh>
        
        {/* Текст внутри плитки */}
        <Html transform distanceFactor={4} position={[0, 0, 0.06]} pointerEvents="none">
          <div className="w-[300px] p-6 bg-black/40 backdrop-blur-md border border-[#E0FF64]/30 rounded-2xl text-center shadow-[0_0_30px_rgba(224,255,100,0.1)]">
            <div className="text-[10px] font-black text-[#E0FF64] uppercase tracking-[0.4em] mb-2 opacity-60">ЭТАП 0{data.id}</div>
            <div className="text-3xl font-black italic uppercase text-white tracking-tighter leading-none mb-1">{data.title}</div>
            <div className="text-[9px] text-white/40 font-bold uppercase tracking-widest">{data.desc}</div>
          </div>
        </Html>
      </Float>
    </group>
  );
}

export const ProcessSteps = () => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  if (!mounted) return <div className="h-[800px] w-full bg-black" />;

  return (
    <section id="process" className="relative h-[850px] w-full bg-[#050505] overflow-hidden border-y border-white/5 flex flex-col items-center justify-center">
      <div className="absolute top-24 left-1/2 -translate-x-1/2 z-20 pointer-events-none text-center w-full px-4">
        <h2 className="text-6xl md:text-9xl font-black italic uppercase tracking-tighter leading-none text-neon">
          УМНЫЙ <span className="text-[#E0FF64]">КОНВЕЙЕР</span>
        </h2>
      </div>

      <Canvas shadows dpr={[1, 2]}>
        <PerspectiveCamera makeDefault position={[22, 14, 22]} fov={30} />
        
        <Suspense fallback={null}>
          <Environment preset="night" />
          <ambientLight intensity={0.5} /> 
          <pointLight position={[10, 20, 10]} intensity={8} color="#E0FF64" />
          <spotLight position={[-20, 20, 20]} intensity={2} angle={0.5} />
          
          <Center top>
            <ConveyorModel />
          </Center>

          {/* Плитки теперь едут в бесконечном цикле */}
          {steps.map((step, i) => (
            <MovingTile key={i} data={step} index={i} />
          ))}

          <ContactShadows position={[0, -0.1, 0]} opacity={0.4} scale={40} blur={2.5} color="#E0FF64" />
        </Suspense>
      </Canvas>
    </section>
  );
};
