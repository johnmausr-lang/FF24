"use client";

import React, { useEffect } from "react";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";

export function ConveyorModel(props: any) {
  const { scene } = useGLTF("/models/conveyor.glb");

  useEffect(() => {
    if (!scene) return;

    scene.traverse((child) => {
      if (!(child instanceof THREE.Mesh)) return;

      const name = child.name.toLowerCase();
      child.castShadow = true;
      child.receiveShadow = true;

      // Настройка неоновых элементов
      if (name.includes("neon") || name.includes("light") || name.includes("glow")) {
        child.material = new THREE.MeshStandardMaterial({
          color: "#E0FF64",
          emissive: "#E0FF64",
          emissiveIntensity: 18,
          toneMapped: false,
        });
        return;
      }

      // Апгрейд существующего материала без потери текстурных карт
      const m = child.material as THREE.MeshStandardMaterial;
      m.metalness = 1.0;
      m.roughness = 0.18;
      m.emissive = new THREE.Color("#000000");
      if (m.map) m.map.anisotropy = 16; // Максимальная четкость текстур
      
      // Улучшаем взаимодействие с Environment
      (m as any).envMapIntensity = 1.2;
      m.needsUpdate = true;
    });
  }, [scene]);

  if (!scene) return null;
  return <primitive object={scene} {...props} rotation={[0, Math.PI / 2, 0]} />;
}

useGLTF.preload("/models/conveyor.glb");
