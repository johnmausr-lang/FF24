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

      if (name.includes("neon") || name.includes("light") || name.includes("glow")) {
        child.material = new THREE.MeshStandardMaterial({
          color: "#E0FF64",
          emissive: "#E0FF64",
          emissiveIntensity: 20,
          toneMapped: false,
        });
        return;
      }

      // Улучшенный материал металла: светлее и с отражениями
      child.material = new THREE.MeshPhysicalMaterial({
        color: "#1a1a1f", 
        metalness: 1.0,
        roughness: 0.15,
        emissive: "#ffffff",
        emissiveIntensity: 0.02, // Подсвечиваем грани для видимости
        envMapIntensity: 1.5,
      });
    });
  }, [scene]);

  if (!scene) return null;
  return <primitive object={scene} {...props} rotation={[0, Math.PI / 2, 0]} />;
}

useGLTF.preload("/models/conveyor.glb");
