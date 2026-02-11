"use client";

import React, { useEffect } from "react";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";

interface ConveyorProps {
  onLoaded?: (data: { size: THREE.Vector3; center: THREE.Vector3 }) => void;
  scale?: number;
  position?: [number, number, number];
}

export function ConveyorModel({ onLoaded, ...props }: ConveyorProps) {
  // Загружаем модель. Указываем путь без /public, так как это корень для Next.js
  const { scene } = useGLTF("/models/conveyor.glb") as any;

  useEffect(() => {
    if (scene) {
      console.log("%cМОДЕЛЬ ОБНАРУЖЕНА:", "color: black; background: #E0FF64; padding: 4px;", scene);

      // Расчет габаритов
      const box = new THREE.Box3().setFromObject(scene);
      const size = new THREE.Vector3();
      box.getSize(size);
      const center = box.getCenter(new THREE.Vector3());

      console.log(`Геометрия: X:${size.x.toFixed(2)} Y:${size.y.toFixed(2)} Z:${size.z.toFixed(2)}`);

      if (onLoaded) onLoaded({ size, center });

      // Явно указываем тип THREE.Object3D для child, чтобы избежать ошибки "implicitly has any type"
      scene.traverse((child: THREE.Object3D) => {
        if (child instanceof THREE.Mesh) {
          child.castShadow = true;
          child.receiveShadow = true;
          // Устанавливаем базовый видимый материал
          child.material = new THREE.MeshStandardMaterial({
            color: "#888899",
            metalness: 0.7,
            roughness: 0.3,
          });
        }
      });
    }
  }, [scene, onLoaded]);

  if (!scene) return null;

  return <primitive object={scene} {...props} rotation={[0, Math.PI / 2, 0]} />;
}

useGLTF.preload("/models/conveyor.glb");
