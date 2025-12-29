"use client";

import React, { useRef, useEffect } from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export function ConveyorModel(props: any) {
  const { scene, error } = useGLTF("/models/conveyor.glb");
  const beltMaterialRef = useRef<THREE.MeshStandardMaterial | null>(null);

  useEffect(() => {
    if (error) {
      console.error("%cОшибка загрузки модели conveyor.glb:", "color: red; font-size: 16px;", error);
      return;
    }

    if (!scene) {
      console.warn("%cМодель не загрузилась (scene is null)", "color: orange; font-size: 16px;");
      return;
    }

    console.log("%cМодель conveyor.glb успешно загружена", "color: lime; font-size: 16px;", scene);

    scene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        // Тёмный металл по умолчанию
        child.material = new THREE.MeshStandardMaterial({
          color: "#080808",
          metalness: 0.95,
          roughness: 0.15,
        });

        const name = child.name.toLowerCase();

        // Неоновые части — сильное свечение
        if (name.includes("neon") || name.includes("light") || name.includes("glow")) {
          child.material = new THREE.MeshStandardMaterial({
            color: "#E0FF64",
            emissive: "#E0FF64",
            emissiveIntensity: 20,
            toneMapped: false,
          });
        }

        // Лента конвейера — сохраняем для анимации UV
        if (name.includes("belt") || name.includes("tape") || name.includes("band")) {
          const beltMat = new THREE.MeshStandardMaterial({
            color: "#0f0f0f",
            metalness: 0.7,
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
  }, [scene, error]);

  // Анимация движения ленты
  useFrame((state, delta) => {
    if (beltMaterialRef.current?.map) {
      beltMaterialRef.current.map.offset.x += delta * 0.3;
    }
  });

  if (error || !scene) {
    return <mesh><boxGeometry args={[10, 2, 20]} /><meshStandardMaterial color="red" wireframe /></mesh>;
  }

  return <primitive object={scene} {...props} dispose={null} />;
}

useGLTF.preload("/models/conveyor.glb");
