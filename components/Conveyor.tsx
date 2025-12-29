"use client";

import React, { useRef, useEffect } from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export function ConveyorModel(props: any) {
  const { scene } = useGLTF("/models/conveyor.glb");
  const groupRef = useRef<THREE.Group>(null);
  const beltMaterialRef = useRef<THREE.MeshStandardMaterial | null>(null);

  useEffect(() => {
    scene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        // Основной материал — тёмный металл
        const baseMaterial = new THREE.MeshStandardMaterial({
          color: "#080808",
          metalness: 0.95,
          roughness: 0.15,
        });

        // Если это неоновая часть — делаем ярко светящейся
        if (
          child.name.toLowerCase().includes("neon") ||
          child.name.toLowerCase().includes("light") ||
          child.name.toLowerCase().includes("glow")
        ) {
          child.material = new THREE.MeshStandardMaterial({
            color: "#E0FF64",
            emissive: "#E0FF64",
            emissiveIntensity: 20,
            toneMapped: false, // критично для сильного Bloom
          });
        } else if (
          child.name.toLowerCase().includes("belt") ||
          child.name.toLowerCase().includes("tape") ||
          child.name.toLowerCase().includes("band")
        ) {
          // Материал ленты — сохраняем для анимации UV
          const beltMaterial = new THREE.MeshStandardMaterial({
            color: "#0a0a0a",
            metalness: 0.8,
            roughness: 0.3,
            map: child.material.map, // сохраняем текстуру, если есть
          });
          child.material = beltMaterial;
          beltMaterialRef.current = beltMaterial;
        } else {
          // Всё остальное — тёмный металл
          child.material = baseMaterial;
        }

        // Включаем тени для всех мешей
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
  }, [scene]);

  // Анимация движения ленты через UV-offset
  useFrame((state, delta) => {
    if (beltMaterialRef.current?.map) {
      beltMaterialRef.current.map.offset.x += delta * 0.3; // скорость движения ленты
      beltMaterialRef.current.map.offset.x %= 1; // зацикливаем
    }
  });

  return <primitive ref={groupRef} object={scene} {...props} dispose={null} />;
}

// Предзагрузка модели
useGLTF.preload("/models/conveyor.glb");
