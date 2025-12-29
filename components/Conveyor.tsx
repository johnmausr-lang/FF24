"use client";

import React from 'react';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';

export function ConveyorModel(props: any) {
  // Указываем путь к модели в папке public
  const { nodes, materials } = useGLTF('/models/conveyor.glb');
  
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={(nodes.Mesh10 as THREE.Mesh).geometry}
        // Оставляем родной материал модели, но добавим немного блеска
        material={(nodes.Mesh10 as THREE.Mesh).material}
      >
        <meshStandardMaterial 
          color="#111" 
          metalness={0.8} 
          roughness={0.2} 
          emissive="#E0FF64" 
          emissiveIntensity={0.05}
        />
      </mesh>
    </group>
  );
}

useGLTF.preload('/models/conveyor.glb');
