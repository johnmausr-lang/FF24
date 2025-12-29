"use client";

import React, { useRef, useEffect } from "react";
import { useGLTF, Text } from "@react-three/drei"; // ← Добавлен импорт Text
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

        // Неоновые элементы
        if (name.includes("neon") || name.includes("light") || name.includes("glow")) {
          child.material = new THREE.MeshStandardMaterial({
            color: "#E0FF64",
            emissive: "#E0FF64",
            emissiveIntensity: 20,
            toneMapped: false,
          });
        }

        // Лента конвейера
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
  }, [scene]);

  // Анимация ленты
  useFrame((state, delta) => {
    if (beltMaterialRef.current?.map) {
      beltMaterialRef.current.map.offset.x += delta * 0.3;
      beltMaterialRef.current.map.offset.x %= 1;
    }
  });

  // Fallback при ошибке загрузки модели
  if (!scene) {
    console.error("%cКритическая ошибка: модель не загружена. Проверь путь public/models/conveyor.glb", "color: red; font-size: 16px;");

    return (
      <group {...props}>
        {/* Красный wireframe бокс как placeholder */}
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[20, 4, 40]} />
          <meshStandardMaterial color="red" wireframe />
        </mesh>

        {/* Текст с ошибкой */}
        <Text
          position={[0, 8, 0]}
          fontSize={3}
          color="red"
          anchorX="center"
          anchorY="middle"
        >
          MODEL NOT LOADED
        </Text>

        <Text
          position={[0, 4, 0]}
          fontSize={1.5}
          color="white"
          anchorX="center"
          anchorY="middle"
        >
          Check: public/models/conveyor.glb
        </Text>
      </group>
    );
  }

  return <primitive object={scene} {...props} dispose={null} />;
}

// Простой preload
useGLTF.preload("/models/conveyor.glb");
