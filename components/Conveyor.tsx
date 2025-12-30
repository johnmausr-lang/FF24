"use client";

import React, { useEffect } from "react";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";

export function ConveyorModel(props: any) {
  // Загрузка модели из папки public/models
  const { scene } = useGLTF("/models/conveyor.glb");

  useEffect(() => {
    if (!scene) return;

    scene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        const name = child.name.toLowerCase();

        // Материал премиального темного металла
        child.material = new THREE.MeshPhysicalMaterial({
          color: "#08080a",
          metalness: 1.0,
          roughness: 0.15,
          reflectivity: 1.0,
          clearcoat: 1.0,
          clearcoatRoughness: 0.1,
          emissive: "#E0FF64",
          emissiveIntensity: 0.01,
        });

        // Подсветка неоновых вставок модели
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
  // Разворот модели на 90 градусов для выравнивания с линией движения
  return <primitive object={scene} {...props} rotation={[0, Math.PI / 2, 0]} />;
}

useGLTF.preload("/models/conveyor.glb");
