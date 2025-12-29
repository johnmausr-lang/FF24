"use client";

import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";

export function ConveyorModel(props: any) {
  const { scene } = useGLTF("/models/conveyor.glb"); // правильный путь из public
  const ref = useRef<THREE.Group>(null);
  const beltMaterialRef = useRef<THREE.MeshStandardMaterial>(null);

  React.useEffect(() => {
    scene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;

        // Основной тёмный металл
        mesh.material = new THREE.MeshStandardMaterial({
          color: "#080808",
          metalness: 0.95,
          roughness: 0.15,
        });

        // Если в имени есть "neon", "light", "glow" — делаем ярко светящимся
        if (child.name.toLowerCase().includes("neon") || child.name.toLowerCase().includes("light")) {
          mesh.material = new THREE.MeshStandardMaterial({
            color: "#E0FF64",
            emissive: "#E0FF64",
            emissiveIntensity: 15,
            toneMapped: false, // важно для сильного свечения под Bloom
          });
        }

        // Сохраняем материал ленты для анимации
        if (child.name.toLowerCase().includes("belt") || child.name.toLowerCase().includes("tape")) {
          beltMaterialRef.current = mesh.material as THREE.MeshStandardMaterial;
        }
      }
    });
  }, [scene]);

  // Анимация движения ленты (UV offset)
  useFrame((state) => {
    if (beltMaterialRef.current?.map) {
      beltMaterialRef.current.map.offset.x += 0.002;
    }
  });

  return <primitive ref={ref} object={scene} {...props} dispose={null} />;
}

// Предзагрузка модели
useGLTF.preload("/models/conveyor.glb");
