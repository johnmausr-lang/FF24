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

        if (name.includes("neon") || name.includes("light") || name.includes("glow")) {
          child.material = new THREE.MeshStandardMaterial({
            color: "#E0FF64",
            emissive: "#E0FF64",
            emissiveIntensity: 12, // Усиленное свечение неона
            toneMapped: false,
          });
        } else {
          // Делаем каркас более светлым и блестящим
          child.material = new THREE.MeshStandardMaterial({
            color: "#888899", // Значительно светлее для видимости
            metalness: 1.0,   // Максимальный металл для отражений
            roughness: 0.1,   // Глянцевая поверхность
            emissive: "#ffffff",
            emissiveIntensity: 0.05, // Легкое самосвечение граней
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
