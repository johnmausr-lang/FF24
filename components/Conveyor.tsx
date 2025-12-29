"use client";

import React, { useEffect } from "react";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";

export function ConveyorModel(props: any) {
  // ВАЖНО: Убедитесь, что файл лежит в public/models/conveyor.glb
  // Next.js автоматически прокидывает содержимое public в корень "/"
  const { scene } = useGLTF("/models/conveyor.glb");

  useEffect(() => {
    if (!scene) return;

    scene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        const name = child.name.toLowerCase();

        // Каркас конвейера (Статичный металл)
        if (!name.includes("neon") && !name.includes("light") && !name.includes("glow")) {
          child.material = new THREE.MeshStandardMaterial({
            color: "#1a1a24", 
            metalness: 0.9,
            roughness: 0.1,
          });
        }

        // Неоновые элементы (Светятся, но не двигаются)
        if (name.includes("neon") || name.includes("light") || name.includes("glow")) {
          child.material = new THREE.MeshStandardMaterial({
            color: "#E0FF64",
            emissive: "#E0FF64",
            emissiveIntensity: 5,
          });
        }
        
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
  }, [scene]);

  return <primitive object={scene} {...props} />;
}

// Предзагрузка для исключения лагов
useGLTF.preload("/models/conveyor.glb");
