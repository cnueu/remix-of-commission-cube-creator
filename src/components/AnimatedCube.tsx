import { Canvas, useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import * as THREE from 'three';

function Cube() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.5;
      meshRef.current.rotation.y += delta * 0.7;
    }
  });

  // Commission colors in hex
  const colors = {
    teal: '#0E9AA7',
    coral: '#F26B5B',
    magenta: '#E84C7F',
    gold: '#F5A623',
  };

  return (
    <mesh ref={meshRef} scale={2.5}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial attach="material-0" color={colors.teal} />
      <meshStandardMaterial attach="material-1" color={colors.coral} />
      <meshStandardMaterial attach="material-2" color={colors.magenta} />
      <meshStandardMaterial attach="material-3" color={colors.gold} />
      <meshStandardMaterial attach="material-4" color={colors.teal} />
      <meshStandardMaterial attach="material-5" color={colors.coral} />
    </mesh>
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

export default function AnimatedCube() {
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
        
        <Cube />
        
        {/* Floating glow particles */}
        <GlowingSphere position={[2, 1.5, -1]} color="#F5A623" />
        <GlowingSphere position={[-2, -1, -1]} color="#E84C7F" />
        <GlowingSphere position={[1.5, -1.5, 0]} color="#0E9AA7" />
      </Canvas>
    </div>
  );
}
