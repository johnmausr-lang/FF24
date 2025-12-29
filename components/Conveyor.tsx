"use client";

import React from 'react';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';

export function ConveyorModel(props: any) {
  // Используем твой исправленный путь
  const { nodes } = useGLTF('/models/conveyor.glb');
  
  const technoMaterial = new THREE.MeshStandardMaterial({
    color: "#050505",
    metalness: 1,
    roughness: 0.1,
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
      {/* Яркая неоновая направляющая вдоль ленты */}
      <mesh position={[0, 0.1, 0]}>
        <boxGeometry args={[60, 0.02, 1.9]} />
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

useGLTF.preload('/models/conveyor.glb');
