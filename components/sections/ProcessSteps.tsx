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

function CameraAutofocus({ targetData }: { targetData: { size: THREE.Vector3 } | null }) {
  const { camera } = useThree();
  useEffect(() => {
    if (targetData) {
      const { size } = targetData;
      const maxDim = Math.max(size.x, size.y, size.z);
      const fov = (camera as THREE.PerspectiveCamera).fov * (Math.PI / 180);
      let cameraZ = Math.abs(maxDim / 2 / Math.tan(fov / 2));
      cameraZ *= 2.3; 
      camera.position.set(0, cameraZ * 0.45, cameraZ);
      camera.updateProjectionMatrix();
    }
  }, [targetData, camera]);
  return null;
}

function AbyssBox({ index, title, desc, total }: { index: number; title: string; desc: string; total: number }) {
  const groupRef = useRef<THREE.Group>(null);
  const velocityRef = useRef(0);
  const [hovered, setHovered] = useState(false);
  
  const spacing = 20; 
  const conveyorEnd = -40;

  useFrame((state, delta) => {
    const g = groupRef.current;
    if (!g) return;

    g.position.x -= delta * 5; 

    if (g.position.x < conveyorEnd) {
      velocityRef.current += delta * 25;
      g.position.y -= velocityRef.current * delta;
      g.rotation.z += delta * 1.5;
    } else {
      velocityRef.current = 0;
      g.position.y = 1.1; // Высота контакта с лентой
      g.rotation.set(0, 0, 0);
    }

    if (g.position.y < -40) {
      g.position.x = (total - 1) * spacing;
      g.position.y = 1.1;
      velocityRef.current = 0;
    }

    const s = hovered ? 1.2 : 1;
    g.scale.lerp(new THREE.Vector3(s, s, s), 0.1);
  });

  return (
    <group ref={groupRef} position={[index * spacing, 1.1, 0]} onPointerOver={() => setHovered(true)} onPointerOut={() => setHovered(false)}>
      <Float speed={hovered ? 0 : 2} rotationIntensity={0.2} floatIntensity={0.2}>
        <mesh castShadow receiveShadow>
          <boxGeometry args={[4.5, 3.0, 2.8]} />
          <meshPhysicalMaterial 
            color={hovered ? "#E0FF64" : "#ffffff"} 
            roughness={0.2} 
            metalness={0.1} 
            clearcoat={0.4} 
          />
        </mesh>
        <Text position={[0, 0.4, 1.45]} fontSize={0.3} color="white" fontWeight="900">{`ID: 24-0${index + 1}`}</Text>
        <Text position={[0, -0.4, 1.45]} fontSize={0.5} color={hovered ? "#000" : "#E0FF64"} fontWeight="900">{title.toUpperCase()}</Text>
        {hovered && (
          <Html position={[0, 6, 0]} center>
            <div className="bg-black/95 border-2 border-[#E0FF64] p-10 rounded-[50px] backdrop-blur-3xl w-[450px] shadow-[0_0_120px_rgba(224,255,100,0.4)] pointer-events-none">
              <p className="text-white text-3xl font-black mb-3 uppercase text-center">{title}</p>
              <p className="text-white/80 text-lg leading-relaxed text-center font-bold">{desc}</p>
            </div>
          </Html>
        )}
      </Float>
    </group>
  );
}

export const ProcessSteps = () => {
  const [modelData, setModelData] = useState<{size: THREE.Vector3} | null>(null);

  return (
    <section id="process" className="relative h-screen w-full bg-[#030303] overflow-hidden">
      <Canvas 
        shadows 
        dpr={[1, 2]} 
        gl={{ antialias: true, toneMapping: THREE.ACESFilmicToneMapping, toneMappingExposure: 1.3 }}
      >
        <PerspectiveCamera makeDefault position={[0, 20, 70]} fov={28} />
        <fog attach="fog" args={["#030303", 40, 110]} />
        
        <ambientLight intensity={1.0} /> 
        <spotLight position={[0, 100, 50]} angle={0.4} intensity={2500} color="#E0FF64" castShadow />

        <Suspense fallback={<Html center><div className="text-[#E0FF64] font-black text-2xl animate-pulse tracking-widest">INITIALIZING FF24 LINE...</div></Html>}>
          <CameraAutofocus targetData={modelData} />
          <group position={[0, -8, 0]}>
            <ConveyorModel scale={45} onLoaded={setModelData} /> 
            {steps.map((step, i) => (
              <AbyssBox key={i} index={i} total={steps.length} title={step.title} desc={step.desc} />
            ))}
          </group>
          <Environment preset="night" />
          <ContactShadows position={[0, -8.1, 0]} opacity={0.8} scale={200} blur={3} far={20} color="#000" />
        </Suspense>
      </Canvas>

      <div className="absolute top-24 w-full z-10 text-center pointer-events-none">
        <h2 className="text-8xl md:text-[200px] font-black italic uppercase text-white/5 tracking-tighter absolute -top-20 left-0 right-0 select-none">FF24</h2>
        <h2 className="text-7xl md:text-9xl font-black italic uppercase text-white tracking-tighter relative z-10">КОНВЕЙЕР</h2>
      </div>
    </section>
  );
};
