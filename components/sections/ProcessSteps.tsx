"use client";

import React, { Suspense, useRef, useMemo, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { 
  useGLTF, 
  MeshTransmissionMaterial, 
  Environment, 
  Html, 
  Float, 
  ContactShadows,
  PerspectiveCamera,
  useScroll
} from "@react-three/drei";
import * as THREE from "three";
import { motion, AnimatePresence } from "framer-motion";

// Данные этапов
const steps = [
  { id: 1, title: "Приемка", desc: "Сверка и IT-учет", pos: [0, 0, 0] },
  { id: 2, title: "Контроль", desc: "Проверка на брак", pos: [4, 0, -4] },
  { id: 3, title: "Маркировка", desc: "Честный знак", pos: [8, 0, -8] },
  { id: 4, title: "Упаковка", desc: "Брендирование", pos: [12, 0, -12] },
  { id: 5, title: "Отгрузка", desc: "Доставка", pos: [16, 0, -16] },
];

// Компонент самого Конвейера
function ConveyorModel() {
  const { scene } = useGLTF("/models/conveyor.glb");
  const beltMaterialRef = useRef<THREE.MeshStandardMaterial>(null);

  // Настройка материалов при загрузке
  useMemo(() => {
    scene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        
        // Основной корпус: Черный матовый металл
        mesh.material = new THREE.MeshStandardMaterial({
          color: "#080808",
          metalness: 0.9,
          roughness: 0.1,
          envMapIntensity: 1,
        });

        // Световые линии (Неон)
        if (child.name.toLowerCase().includes("light") || child.name.toLowerCase().includes("neon")) {
          mesh.material = new THREE.MeshStandardMaterial({
            color: "#E0FF64",
            emissive: "#E0FF64",
            emissiveIntensity: 15,
          });
        }
        
        // Сама лента (если в модели есть меш с именем 'belt')
        if (child.name.toLowerCase().includes("belt")) {
            mesh.material = new THREE.MeshStandardMaterial({
                color: "#111111",
                roughness: 0.8,
                metalness: 0.2
            });
            // @ts-ignore
            beltMaterialRef.current = mesh.material;
        }
      }
    });
  }, [scene]);

  // Анимация движения ленты через смещение текстуры
  useFrame((state, delta) => {
    if (beltMaterialRef.current && beltMaterialRef.current.map) {
        beltMaterialRef.current.map.offset.y -= delta * 0.5;
    }
  });

  return <primitive object={scene} scale={4.5} position={[0, -2, 0]} rotation={[0, -Math.PI / 4, 0]} />;
}

// Компонент интерактивной карточки
function StepCard({ data, index }: { data: typeof steps[0], index: number }) {
  const group = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (group.current) {
      const time = state.clock.getElapsedTime();
      // Бесконечный цикл движения карточек по диагонали конвейера
      // Карточки движутся от [16, -16] к [-8, 8]
      const speed = 1.5;
      const offset = index * 5;
      let zPos = ((time * speed + offset) % 25) - 12;
      let xPos = -zPos; // Диагональное движение

      group.current.position.set(xPos, 1, zPos);
    }
  });

  return (
    <group ref={group}>
      <Float speed={3} rotationIntensity={0.2} floatIntensity={0.5}>
        <mesh 
          onPointerOver={() => setHovered(true)} 
          onPointerOut={() => setHovered(false)}
        >
          <boxGeometry args={[3, 2, 0.1]} />
          <MeshTransmissionMaterial
            backside
            samples={4}
            thickness={0.2}
            chromaticAberration={0.02}
            anisotropy={0.1}
            distortion={0.1}
            distortionScale={0.1}
            temporalDistortion={0.1}
            color={hovered ? "#E0FF64" : "#ffffff"}
            transmission={1}
          />
        </mesh>
        
        <Html 
          transform 
          occlude 
          distanceFactor={3} 
          position={[0, 0, 0.06]}
          pointerEvents="none"
        >
          <div className={`w-[280px] p-6 rounded-[2rem] border transition-all duration-500 ${
            hovered ? 'bg-accent-lime/20 border-accent-lime' : 'bg-black/40 border-white/10'
          } backdrop-blur-xl select-none`}>
            <div className="text-[10px] font-black text-accent-lime uppercase tracking-[0.4em] mb-2">
              Phase 0{data.id}
            </div>
            <div className="text-2xl font-[900] italic uppercase text-white mb-1 leading-none">
              {data.title}
            </div>
            <div className="text-[10px] text-white/40 font-bold uppercase tracking-widest leading-tight">
              {data.desc}
            </div>
          </div>
        </Html>
      </Float>
    </group>
  );
}

// Основная сцена
export const ProcessSteps = () => {
  return (
    <section id="process" className="relative h-[900px] w-full bg-[#030303] overflow-hidden border-y border-white/5">
      
      {/* HUD Интерфейс */}
      <div className="absolute top-20 left-10 md:left-20 z-30 pointer-events-none">
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <h2 className="text-[100px] md:text-[180px] font-[1000] italic uppercase tracking-tighter leading-[0.7] opacity-5 text-outline absolute -top-10 -left-5">
            LOGISTICS
          </h2>
          <h2 className="text-5xl md:text-8xl font-[900] italic uppercase tracking-tighter leading-none relative">
            Smart <span className="text-accent-lime text-neon">Workflow</span>
          </h2>
          <p className="text-white/30 uppercase tracking-[0.5em] text-[10px] mt-6 font-black">
            Automated FF24 Infrastructure / v.2.0
          </p>
        </motion.div>
      </div>

      {/* Затемнение для вписывания в дизайн */}
      <div className="absolute inset-0 z-20 pointer-events-none bg-gradient-to-b from-black via-transparent to-black" />
      
      <Canvas shadows dpr={[1, 2]}>
        <PerspectiveCamera makeDefault position={[12, 10, 12]} fov={28} />
        
        <Suspense fallback={null}>
          {/* Настройка освещения для "Premium" бликов */}
          <Environment preset="night" />
          <spotLight position={[10, 15, 10]} angle={0.3} penumbra={1} intensity={2} castShadow color="#E0FF64" />
          <pointLight position={[-10, -10, -10]} color="#2563EB" intensity={1} />
          
          <ConveyorModel />

          {steps.map((step, i) => (
            <StepCard key={step.id} data={step} index={i} />
          ))}

          {/* Мягкая тень под конвейером */}
          <ContactShadows 
            position={[0, -2, 0]} 
            opacity={0.6} 
            scale={30} 
            blur={2.5} 
            far={4} 
            color="#000000" 
          />
        </Suspense>
      </Canvas>

      {/* Инфо-панель справа */}
      <div className="absolute bottom-20 right-10 md:right-20 z-30 flex gap-10 items-end">
        <div className="hidden md:block">
            <div className="text-[10px] text-white/20 uppercase font-black tracking-widest mb-2 text-right">Data Stream</div>
            <div className="flex gap-1">
                {[...Array(12)].map((_, i) => (
                    <motion.div 
                        key={i}
                        animate={{ height: [4, 15, 4] }}
                        transition={{ repeat: Infinity, duration: 1, delay: i * 0.1 }}
                        className="w-[2px] bg-accent-lime/30"
                    />
                ))}
            </div>
        </div>
        <div className="flex items-center gap-6 glass px-8 py-4 rounded-3xl border-white/5 bg-black/40">
          <div className="text-right">
            <div className="text-[9px] text-white/40 uppercase font-black tracking-widest">Active Status</div>
            <div className="text-accent-lime font-mono text-xl tracking-tighter">OPERATIONAL</div>
          </div>
          <div className="relative flex h-4 w-4">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-lime opacity-75"></span>
            <span className="relative inline-flex rounded-full h-4 w-4 bg-accent-lime"></span>
          </div>
        </div>
      </div>
    </section>
  );
};
