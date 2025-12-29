"use client";

import React from 'react';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';

export function ConveyorModel(props: any) {
  // ВНИМАНИЕ: Путь изменен под вашу структуру на GitHub (image_5e1a3e.png)
  const { nodes } = useGLTF('/public/models/conveyor.glb');
  
  // Проверка на наличие нужной ноды, чтобы не было белого экрана
  const meshGeometry = nodes.Mesh10 ? (nodes.Mesh10 as THREE.Mesh).geometry : null;

  if (!meshGeometry) {
    console.warn("Mesh10 not found in model. Check node names.");
    return null;
  }

  const technoMaterial = new THREE.MeshStandardMaterial({
    color: "#050505",
    metalness: 1,
    roughness: 0.1,
    emissive: "#E0FF64",
    emissiveIntensity: 0.05,
  });

  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={meshGeometry}
        material={technoMaterial}
      />
      {/* Световая полоса вдоль ленты */}
      <mesh position={[0, 0.1, 0]}>
        <boxGeometry args={[60, 0.03, 1.9]} />
        <meshStandardMaterial 
          color="#E0FF64" 
          emissive="#E0FF64" 
          emissiveIntensity={3} 
          transparent 
          opacity={0.8} 
        />
      </mesh>
    </group>
  );
}

useGLTF.preload('/public/models/conveyor.glb');
