"use client";

import React, { useEffect } from "react";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";

export function ConveyorModel(props: any) {
  const { scene } = useGLTF("/models/conveyor.glb");

  useEffect(() => {
    if (!scene) return;

    console.log("%c3D модель конвейера активна", "color: #E0FF64; font-weight: bold;");

    scene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        const name = child.name.toLowerCase();

        // Если это неоновые вставки
        if (name.includes("neon") || name.includes("light") || name.includes("glow")) {
          child.material = new THREE.MeshStandardMaterial({
            color: "#E0FF64",
            emissive: "#E0FF64",
            emissiveIntensity: 10,
            toneMapped: false,
          });
        } else {
          // Основной корпус делаем светлее, чтобы его было видно (серый металлик)
          child.material = new THREE.MeshStandardMaterial({
            color: "#444455", 
            metalness: 0.9,
            roughness: 0.2,
          });
        }
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
  }, [scene]);

  if (!scene) return null;
  return <primitive object={scene} {...props} />;
}

useGLTF.preload("/models/conveyor.glb");
