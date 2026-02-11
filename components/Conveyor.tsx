"use client";

import React, { useEffect } from "react";
import { useGLTF, useKTX2 } from "@react-three/drei";
import * as THREE from "three";

interface ConveyorProps {
  scale?: number;
  onLoaded?: (data: { size: THREE.Vector3 }) => void;
}

export function ConveyorModel({ scale = 1, onLoaded }: ConveyorProps) {
  // Путь к транскодерам Basis. 
  // В Next.js эти файлы должны лежать в папке public/lib/basis/
  const KTX2_TRANSCODER_PATH = "https://cdn.jsdelivr.net/npm/three@0.160.0/examples/jsm/libs/basis/";

  // Загружаем модель. useGLTF в R3F автоматически поддерживает расширения, 
  // если правильно настроен ktx2Loader.
  const { scene } = useGLTF("/models/conveyor.glb", undefined, true, (loader) => {
    const ktx2Loader = new THREE.KTX2Loader();
    ktx2Loader.setTranscoderPath(KTX2_TRANSCODER_PATH);
    // detectSupport требует наличия WebGLRenderer, который R3F предоставляет автоматически
    loader.setKTX2Loader(ktx2Loader);
  });

  useEffect(() => {
    if (scene) {
      // Вычисляем размер модели для автофокуса камеры
      const box = new THREE.Box3().setFromObject(scene);
      const size = new THREE.Vector3();
      box.getSize(size);
      
      if (onLoaded) {
        onLoaded({ size: size.multiplyScalar(scale) });
      }

      // Оптимизация теней и материалов
      scene.traverse((child) => {
        if ((child as THREE.Mesh).isMesh) {
          child.castShadow = true;
          child.receiveShadow = true;
          // Улучшаем отображение материалов после сжатия
          if ((child as THREE.Mesh).material) {
            (child as THREE.Mesh).material.needsUpdate = true;
          }
        }
      });
    }
  }, [scene, scale, onLoaded]);

  return <primitive object={scene} scale={scale} />;
}

// Предзагрузка модели для ускорения работы LoadingScreen
useGLTF.preload("/models/conveyor.glb");
