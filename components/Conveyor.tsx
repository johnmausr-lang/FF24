"use client";

import React, { useRef, useEffect } from "react";
import { useGLTF, Text } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export function ConveyorModel(props: any) {
  const { scene } = useGLTF("/models/conveyor.glb");
  const beltMaterialRef = useRef<THREE.MeshStandardMaterial | null>(null);

  useEffect(() => {
    if (!scene) return;

    console.log("%cМодель conveyor.glb успешно загружена", "color: lime; font-size: 16px;", scene);

    scene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        const name = child.name.toLowerCase();

        // Основной каркас — видимый тёмно-серый металл
        if (!name.includes("neon") && !name.includes("light") && !name.includes("glow") && !name.includes("belt")) {
          child.material = new THREE.MeshStandardMaterial({
            color: "#222233",           // тёмно-синий/серый — виден на чёрном фоне
            metalness: 0.8,
            roughness: 0.3,
            envMapIntensity: 1.2,
          });
        }

        // Неоновые линии — яркие и светящиеся
        if (name.includes("neon") || name.includes("light") || name.includes("glow")) {
          child.material = new THREE.MeshStandardMaterial({
            color: "#E0FF64",
            emissive: "#E0FF64",
            emissiveIntensity: 12,      // ярко, но не выжигает
            toneMapped: false,
          });
        }

        // Лента конвейера — тёмная с текстурой движения
        if (name.includes("belt") || name.includes("tape") || name.includes("band")) {
          const beltMat = new THREE.MeshStandardMaterial({
            color: "#0a0a0f",
            metalness: 0.5,
            roughness: 0.6,
            map: (child.material as THREE.MeshStandardMaterial).map || null,
          });
          child.material = beltMat;
          beltMaterialRef.current = beltMat;
        }

        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
  }, [scene]);

  // Движение ленты
  useFrame((state, delta) => {
    if (beltMaterialRef.current?.map) {
      beltMaterialRef.current.map.offset.x += delta * 0.3;
    }
  });

  if (!scene) {
    return null;
  }

  return <primitive object={scene} {...props} dispose={null} />;
}

useGLTF.preload("/models/conveyor.glb");
