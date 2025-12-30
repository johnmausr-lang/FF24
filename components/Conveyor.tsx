"use client";

import React, { useEffect } from "react";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";

export function ConveyorModel({ onLoaded, ...props }: any) {
  const { scene } = useGLTF("/models/conveyor.glb");

  useEffect(() => {
    if (!scene) return;

    // Автоматический расчет размеров модели для центрирования камеры
    const box = new THREE.Box3().setFromObject(scene);
    const size = new THREE.Vector3();
    box.getSize(size);
    const center = new THREE.Vector3();
    box.getCenter(center);

    if (onLoaded) {
      onLoaded({ size, center });
    }

    scene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        const name = child.name.toLowerCase();
        
        // Премиальный материал: светло-серый титан, чтобы модель была видна
        child.material = new THREE.MeshStandardMaterial({
          color: "#888899", 
          metalness: 0.9,
          roughness: 0.1,
          emissive: "#ffffff",
          emissiveIntensity: 0.05,
        });

        if (name.includes("neon") || name.includes("light") || name.includes("glow")) {
          child.material = new THREE.MeshStandardMaterial({
            color: "#E0FF64",
            emissive: "#E0FF64",
            emissiveIntensity: 15,
            toneMapped: false,
          });
        }
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
  }, [scene, onLoaded]);

  if (!scene) return null;
  return <primitive object={scene} {...props} rotation={[0, Math.PI / 2, 0]} />;
}

useGLTF.preload("/models/conveyor.glb");
