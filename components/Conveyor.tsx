"use client";

import React, { useEffect } from "react";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";

export function ConveyorModel(props: any) {
  const { scene } = useGLTF("/models/conveyor.glb");

  useEffect(() => {
    if (!scene) return;

    scene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        const name = child.name.toLowerCase();

        // Настройка материала для максимальной видимости (светлый металлик)
        child.material = new THREE.MeshStandardMaterial({
          color: "#9999aa", 
          metalness: 1.0,
          roughness: 0.1,
          emissive: "#ffffff",
          emissiveIntensity: 0.1, 
        });

        if (name.includes("neon") || name.includes("light") || name.includes("glow")) {
          child.material = new THREE.MeshStandardMaterial({
            color: "#E0FF64",
            emissive: "#E0FF64",
            emissiveIntensity: 15,
            toneMapped: false,
          });
        }
      }
    });
  }, [scene]);

  if (!scene) return null;

  return (
    <primitive 
      object={scene} 
      {...props} 
      // Принудительный разворот модели на 90 градусов, если она смотрит вбок
      rotation={[0, Math.PI / 2, 0]} 
    />
  );
}

useGLTF.preload("/models/conveyor.glb");
