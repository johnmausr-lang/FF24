"use client";

import React, { useRef, useEffect } from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export function ConveyorModel(props: any) {
  const { scene } = useGLTF("/models/conveyor.glb");
  const beltMaterialRef = useRef<THREE.MeshStandardMaterial | null>(null);

  useEffect(() => {
    if (!scene) {
      console.warn("%cМодель conveyor.glb не загрузилась (scene is undefined/null)", "color: orange; font-size: 16px;");
      return;
    }

    console.log("%cМодель conveyor.glb успешно загружена", "color: lime; font-size: 16px;", scene);

    scene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        const name = child.name.toLowerCase();

        // По умолчанию — тёмный металл
        child.material = new THREE.MeshStandardMaterial({
          color: "#080808",
          metalness: 0.95,
          roughness: 0.15,
        });

        // Неоновые элементы — яркое свечение для Bloom
        if (name.includes("neon") || name.includes("light") || name.includes("glow")) {
          child.material = new THREE.MeshStandardMaterial({
            color: "#E0FF64",
            emissive: "#E0FF64",
            emissiveIntensity: 20,
            toneMapped: false,
          });
        }

        // Лента конвейера — сохраняем материал для анимации UV-offset
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

        // Тени для реализма
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
  }, [scene]);

  // Анимация движения ленты
  useFrame((state, delta) => {
    if (beltMaterialRef.current?.map) {
      beltMaterialRef.current.map.offset.x += delta * 0.3;
      beltMaterialRef.current.map.offset.x %= 1; // зацикливаем
    }
  });

  // Если модель не загрузилась — показываем красный placeholder (видно в dev)
  if (!scene) {
    return (
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[15, 3, 30]} />
        <meshStandardMaterial color="red" wireframe />
      </mesh>
    );
  }

  return <primitive object={scene} {...props} dispose={null} />;
}

// Предзагрузка с обработкой ошибки
useGLTF.preload("/models/conveyor.glb", undefined, (error) => {
  console.error("%cОшибка предзагрузки модели conveyor.glb", "color: red; font-size: 16px;", error);
});
