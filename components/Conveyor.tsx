"use client";

import React, { useEffect } from "react";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";
// Импортируем KTX2Loader напрямую из примеров Three.js
import { KTX2Loader } from "three/examples/jsm/loaders/KTX2Loader.js";

interface ConveyorProps {
  scale?: number;
  onLoaded?: (data: { size: THREE.Vector3 }) => void;
}

export function ConveyorModel({ scale = 1, onLoaded }: ConveyorProps) {
  // Путь к транскодерам Basis
  const KTX2_TRANSCODER_PATH = "https://cdn.jsdelivr.net/npm/three@0.160.0/examples/jsm/libs/basis/";

  const { scene, gl } = useGLTF("/models/conveyor.glb", undefined, true, (loader) => {
    // Используем импортированный класс напрямую, а не через THREE
    const ktx2Loader = new KTX2Loader();
    ktx2Loader.setTranscoderPath(KTX2_TRANSCODER_PATH);
    
    // В R3F мы можем получить renderer через колбэк загрузчика, 
    // но проще использовать хук или прокинуть gl из контекста.
    // Библиотека загрузит транскодер только при необходимости.
    loader.setKTX2Loader(ktx2Loader);
  });

  useEffect(() => {
    if (scene) {
      const box = new THREE.Box3().setFromObject(scene);
      const size = new THREE.Vector3();
      box.getSize(size);
      
      if (onLoaded) {
        onLoaded({ size: size.multiplyScalar(scale) });
      }

      scene.traverse((child) => {
        if ((child as THREE.Mesh).isMesh) {
          child.castShadow = true;
          child.receiveShadow = true;
          if ((child as THREE.Mesh).material) {
            (child as THREE.Mesh).material.needsUpdate = true;
          }
        }
      });
    }
  }, [scene, scale, onLoaded]);

  return <primitive object={scene} scale={scale} />;
}

useGLTF.preload("/models/conveyor.glb");
