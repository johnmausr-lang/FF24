"use client";

import React, { useEffect } from "react";
import { useGLTF, useKTX2 } from "@react-three/drei";
import * as THREE from "three";

interface ConveyorProps {
  scale?: number;
  onLoaded?: (data: { size: THREE.Vector3 }) => void;
}

export function ConveyorModel({ scale = 1, onLoaded }: ConveyorProps) {
  // Путь к транскодерам Basis через CDN
  const KTX2_TRANSCODER_PATH = "https://cdn.jsdelivr.net/npm/three@0.160.0/examples/jsm/libs/basis/";

  // Используем хук useKTX2 — он сам создаст лоадер, совместимый с useGLTF
  const ktx2Loader = useKTX2(KTX2_TRANSCODER_PATH);

  // Передаем готовый ktx2Loader в настройку GLTFLoader
  const { scene } = useGLTF("/models/conveyor.glb", undefined, true, (loader) => {
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

// Предзагрузка модели для плавности LoadingScreen
useGLTF.preload("/models/conveyor.glb");
