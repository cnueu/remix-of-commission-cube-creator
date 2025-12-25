import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import { useRef, useEffect, useMemo } from 'react';
import * as THREE from 'three';

function HeroModel() {
  const groupRef = useRef<THREE.Group>(null);
  const { scene } = useGLTF('/models/finalhex.glb');
  
  // Commission colors
  const colors = useMemo(() => ({
    teal: '#0E9AA7',
    coral: '#F26B5B',
    magenta: '#E84C7F',
    gold: '#F5A623',
  }), []);

  // Clone the scene to avoid mutations
  const clonedScene = useMemo(() => scene.clone(), [scene]);

  useEffect(() => {
    let colorIndex = 0;
    const colorArray = Object.values(colors);
    
    clonedScene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.material = new THREE.MeshStandardMaterial({
          color: new THREE.Color(colorArray[colorIndex % colorArray.length]),
          metalness: 0.4,
          roughness: 0.3,
        });
        colorIndex++;
      }
    });
  }, [clonedScene, colors]);

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.x += delta * 0.3;
      groupRef.current.rotation.y += delta * 0.5;
    }
  });

  return (
    <group ref={groupRef}>
      <primitive object={clonedScene} scale={1.0} />
    </group>
  );
}

function GlowingSphere({ position, color }: { position: [number, number, number]; color: string }) {
  return (
    <mesh position={position}>
      <sphereGeometry args={[0.1, 16, 16]} />
      <meshBasicMaterial color={color} />
      <pointLight color={color} intensity={1} distance={5} />
    </mesh>
  );
}

export default function HeroGLBModel() {
  return (
    <div className="w-full h-full">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.4} />
        <directionalLight position={[5, 5, 5]} intensity={1} color="#ffffff" />
        <directionalLight position={[-5, -5, -5]} intensity={0.5} color="#0E9AA7" />
        <pointLight position={[3, 3, 3]} intensity={0.8} color="#F26B5B" />
        <pointLight position={[-3, -3, 3]} intensity={0.8} color="#E84C7F" />
        
        <HeroModel />
        
        {/* Floating glow particles */}
        <GlowingSphere position={[2, 1.5, -1]} color="#F5A623" />
        <GlowingSphere position={[-2, -1, -1]} color="#E84C7F" />
        <GlowingSphere position={[1.5, -1.5, 0]} color="#0E9AA7" />
      </Canvas>
    </div>
  );
}

// Preload the model
useGLTF.preload('/models/finalhex.glb');
