"use client";

import React, { useRef, useEffect } from "react";
import { useGLTF } from "@react-three/drei";
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

        // Основной каркас — видимый тёмно-серый с металлическим блеском
        if (!name.includes("neon") && !name.includes("light") && !name.includes("glow") && !name.includes("belt")) {
          child.material = new THREE.MeshStandardMaterial({
            color: "#2a2a3a",           // тёмно-синий/серый — отлично видно на чёрном фоне
            metalness: 0.85,
            roughness: 0.25,
            envMapIntensity: 1.3,
          });
        }

        // Неоновые линии — яркие
        if (name.includes("neon") || name.includes("light") || name.includes("glow")) {
          child.material = new THREE.MeshStandardMaterial({
            color: "#E0FF64",
            emissive: "#E0FF64",
            emissiveIntensity: 10,
            toneMapped: false,
          });
        }

        // Лента конвейера — движение
        if (name.includes("belt") || name.includes("tape") || name.includes("band")) {
          const beltMat = new THREE.MeshStandardMaterial({
            color: "#111122",
            metalness: 0.6,
            roughness: 0.5,
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
