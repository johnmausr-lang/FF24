"use client";

import React, { useEffect } from "react";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";

export function ConveyorModel({ onLoaded, ...props }: any) {
  // Попытка загрузки модели
  const { scene, error } = useGLTF("/models/conveyor.glb") as any;

  useEffect(() => {
    if (error) {
      console.error("%cОШИБКА ЗАГРУЗКИ МОДЕЛИ:", "color: white; background: red; padding: 4px;", error);
    }
    
    if (scene) {
      console.log("%cМОДЕЛЬ ЗАГРУЖЕНА УСПЕШНО:", "color: black; background: #E0FF64; padding: 4px;", scene);

      // Расчет габаритов для отладки
      const box = new THREE.Box3().setFromObject(scene);
      const size = new THREE.Vector3();
      box.getSize(size);
      console.log(`Размеры модели: X:${size.x.toFixed(2)} Y:${size.y.toFixed(2)} Z:${size.z.toFixed(2)}`);

      if (onLoaded) onLoaded({ size, center: box.getCenter(new THREE.Vector3()) });

      scene.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          child.castShadow = true;
          child.receiveShadow = true;
          // Упрощаем материал до максимально видимого
          child.material = new THREE.MeshStandardMaterial({
            color: "#888899",
            metalness: 0.6,
            roughness: 0.4,
          });
        }
      });
    }
  }, [scene, error, onLoaded]);

  if (!scene) return null;
  return <primitive object={scene} {...props} rotation={[0, Math.PI / 2, 0]} />;
}

useGLTF.preload("/models/conveyor.glb");
