"use client";

import React, { useEffect } from "react";
import { useGLTF } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import * as THREE from "three";
// Импортируем KTX2Loader напрямую из JSM примеров
import { KTX2Loader } from "three/examples/jsm/loaders/KTX2Loader.js";

interface ConveyorProps {
  scale?: number;
  onLoaded?: (data: { size: THREE.Vector3 }) => void;
}

export function ConveyorModel({ scale = 1, onLoaded }: ConveyorProps) {
  // Достаем рендерер из контекста Canvas
  const { gl } = useThree();
  
  const KTX2_TRANSCODER_PATH = "https://cdn.jsdelivr.net/npm/three@0.160.0/examples/jsm/libs/basis/";

  // Исправленная деструктуризация: убираем gl из useGLTF
  const { scene } = useGLTF("/models/conveyor.glb", undefined, true, (loader) => {
    const ktx2Loader = new KTX2Loader();
    ktx2Loader.setTranscoderPath(KTX2_TRANSCODER_PATH);
    // Привязваем загрузчик к текущему рендереру
    ktx2Loader.detectSupport(gl);
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
          const mesh = child as THREE.Mesh;
          if (mesh.material) {
            mesh.material.needsUpdate = true;
          }
        }
      });
    }
  }, [scene, scale, onLoaded]);

  return <primitive object={scene} scale={scale} />;
}

useGLTF.preload("/models/conveyor.glb");
