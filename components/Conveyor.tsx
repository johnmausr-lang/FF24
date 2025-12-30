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

        // Материал "Оружейная сталь 8K"
        child.material = new THREE.MeshPhysicalMaterial({
          color: "#0a0a0c",
          metalness: 1.0,
          roughness: 0.12,
          reflectivity: 1.0,
          clearcoat: 1.0,
          clearcoatRoughness: 0.05,
          iridescence: 0.2, // Бензиновые разводы на металле
          emissive: "#E0FF64",
          emissiveIntensity: 0.01,
        });

        if (name.includes("neon") || name.includes("light") || name.includes("glow")) {
          child.material = new THREE.MeshStandardMaterial({
            color: "#E0FF64",
            emissive: "#E0FF64",
            emissiveIntensity: 25, // Ослепляющий неон
            toneMapped: false,
          });
        }
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
  }, [scene]);

  if (!scene) return null;
  return <primitive object={scene} {...props} rotation={[0, Math.PI / 2, 0]} />;
}

useGLTF.preload("/models/conveyor.glb");
