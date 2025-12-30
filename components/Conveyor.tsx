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
        // Создаем материал "черного монолита" для скрытия артефактов меша
        child.material = new THREE.MeshPhysicalMaterial({
          color: "#08080a",
          metalness: 1.0,
          roughness: 0.15,
          reflectivity: 1,
          clearcoat: 1.0,
          clearcoatRoughness: 0.1,
          emissive: "#000000",
        });

        // Подсветка неоновых полос, если они есть
        const name = child.name.toLowerCase();
        if (name.includes("neon") || name.includes("light") || name.includes("glow")) {
          child.material = new THREE.MeshStandardMaterial({
            color: "#E0FF64",
            emissive: "#E0FF64",
            emissiveIntensity: 25,
            toneMapped: false,
          });
        }
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
  }, [scene]);

  if (!scene) return null;

  return (
    <primitive 
      object={scene} 
      {...props} 
      rotation={[0, Math.PI / 2, 0]} // Поворот под коробки
    />
  );
}

useGLTF.preload("/models/conveyor.glb");
