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

        // Делаем каркас светло-серым металлом, чтобы он точно был виден
        child.material = new THREE.MeshStandardMaterial({
          color: "#777788", 
          metalness: 0.8,
          roughness: 0.2,
          emissive: "#ffffff",
          emissiveIntensity: 0.05, // Принудительная видимость в темноте
        });

        if (name.includes("neon") || name.includes("light") || name.includes("glow")) {
          child.material = new THREE.MeshStandardMaterial({
            color: "#E0FF64",
            emissive: "#E0FF64",
            emissiveIntensity: 10,
          });
        }
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
  }, [scene]);

  if (!scene) return null;
  // Масштабирование внутри примитива для надежности
  return <primitive object={scene} {...props} rotation={[0, Math.PI / 2, 0]} />;
}

useGLTF.preload("/models/conveyor.glb");
