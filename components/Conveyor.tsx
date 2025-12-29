"use client";

import React, { useRef, useEffect } from "react";
import { useGLTF, Text } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export function ConveyorModel(props: any) {
  const { scene } = useGLTF("/models/conveyor.glb");
  const beltMaterialRef = useRef<THREE.MeshStandardMaterial | null>(null);

  useEffect(() => {
    if (!scene) return;

    console.log("%cМодель conveyor.glb успешно загружена", "color: lime; font-size: 16px;", scene);

    scene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        const name = child.name.toLowerCase();

        // Основной каркас — тёмный, но с лёгким металлом, чтобы был виден
        if (!name.includes("neon") && !name.includes("light") && !name.includes("glow") && !name.includes("belt")) {
          child.material = new THREE.MeshStandardMaterial({
            color: "#1a1a1a",           // чуть светлее чёрного, чтобы контуры были видны
            metalness: 0.9,
            roughness: 0.2,
            envMapIntensity: 1,
          });
        }

        // Неоновые элементы — яркое свечение
        if (name.includes("neon") || name.includes("light") || name.includes("glow")) {
          child.material = new THREE.MeshStandardMaterial({
            color: "#E0FF64",
            emissive: "#E0FF64",
            emissiveIntensity: 8,        // снижено с 20 — чтобы не выжигало
            toneMapped: false,
          });
        }

        // Лента конвейера
        if (name.includes("belt") || name.includes("tape") || name.includes("band")) {
          const beltMat = new THREE.MeshStandardMaterial({
            color: "#111111",
            metalness: 0.6,
            roughness: 0.4,
            map: (child.material as THREE.MeshStandardMaterial).map || null,
          });
          child.material = beltMat;
          beltMaterialRef.current = beltMat;
        }

        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
  }, [scene]);

  useFrame((state, delta) => {
    if (beltMaterialRef.current?.map) {
      beltMaterialRef.current.map.offset.x += delta * 0.3;
    }
  });

  if (!scene) {
    return null; // теперь просто ничего, раз модель грузится
  }

  return <primitive object={scene} {...props} dispose={null} />;
}

useGLTF.preload("/models/conveyor.glb");
