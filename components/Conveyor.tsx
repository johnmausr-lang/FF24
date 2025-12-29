"use client";

import React, { useEffect } from "react";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";

export function ConveyorModel(props: any) {
  // Используем стандартный путь для Next.js
  const { scene } = useGLTF("/models/conveyor.glb");

  useEffect(() => {
    if (scene) {
      console.log("3D Model loaded successfully:", scene);
      scene.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          // Настройка материалов для премиального вида
          child.material = new THREE.MeshStandardMaterial({
            color: "#0a0a0a",
            metalness: 0.9,
            roughness: 0.1,
            emissive: "#E0FF64",
            emissiveIntensity: 0.02,
          });
          child.castShadow = true;
          child.receiveShadow = true;
        }
      });
    }
  }, [scene]);

  if (!scene) return null;

  // Возвращаем модель без анимации внутри, чтобы она была статичной базой
  return <primitive object={scene} {...props} />;
}

useGLTF.preload("/models/conveyor.glb");
