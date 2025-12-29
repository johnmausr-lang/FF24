"use client";

import React from 'react';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';

export function ConveyorModel(props: any) {
  // Исправленный путь к модели
  const { nodes, materials } = useGLTF('/models/conveyor.glb');
  
  // Создаем премиальный техно-материал
  const technoMaterial = new THREE.MeshStandardMaterial({
    color: "#0a0a0a",
    metalness: 0.9,
    roughness: 0.15,
    emissive: "#E0FF64",
    emissiveIntensity: 0.02,
  });

  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={(nodes.Mesh10 as THREE.Mesh).geometry}
        material={technoMaterial}
      />
      {/* Световая полоса вдоль всей ленты для технологичности */}
      <mesh position={[0, 0.08, 0]}>
        <boxGeometry args={[50, 0.01, 1.8]} />
        <meshStandardMaterial 
          color="#E0FF64" 
          emissive="#E0FF64" 
          emissiveIntensity={1.5} 
          transparent 
          opacity={0.6} 
        />
      </mesh>
    </group>
  );
}

useGLTF.preload('/models/conveyor.glb');
