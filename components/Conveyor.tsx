"use client";

import React, { useEffect } from "react";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";

export function ConveyorModel(props: any) {
  // Загружаем вашу модель
  const { scene } = useGLTF("/models/conveyor.glb");

  useEffect(() => {
    if (!scene) return;

    scene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        const name = child.name.toLowerCase();

        // Полностью перекрашиваем меш в "оружейную сталь"
        child.material = new THREE.MeshPhysicalMaterial({
          color: "#0c0c12",
          metalness: 1.0,
          roughness: 0.2,
          reflectivity: 1,
          clearcoat: 1,
          clearcoatRoughness: 0.1,
          emissive: "#E0FF64",
          emissiveIntensity: 0.02, // Легкое свечение граней
        });

        // Если в модели есть элементы неона, делаем их максимально яркими
        if (name.includes("neon") || name.includes("light") || name.includes("glow")) {
          child.material = new THREE.MeshStandardMaterial({
            color: "#E0FF64",
            emissive: "#E0FF64",
            emissiveIntensity: 20,
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
      rotation={[0, Math.PI / 2, 0]} // Выравнивание по оси движения
    />
  );
}

useGLTF.preload("/models/conveyor.glb");
