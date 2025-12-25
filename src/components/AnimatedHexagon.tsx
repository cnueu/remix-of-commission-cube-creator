import { Canvas, useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import * as THREE from 'three';

function Hexagon() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.005;
      meshRef.current.rotation.y += 0.01;
    }
  });

  return (
    <mesh ref={meshRef}>
      <cylinderGeometry args={[1, 1, 0.5, 6]} />
      <meshStandardMaterial 
        color="#e85a4f"
        metalness={0.3}
        roughness={0.4}
      />
    </mesh>
  );
}

function GlowingSphere({ position, color }: { position: [number, number, number]; color: string }) {
  return (
    <mesh position={position}>
      <sphereGeometry args={[0.08, 16, 16]} />
      <meshBasicMaterial color={color} />
      <pointLight color={color} intensity={0.5} distance={3} />
    </mesh>
  );
}

export default function AnimatedHexagon() {
  return (
    <Canvas
      camera={{ position: [0, 0, 4], fov: 50 }}
      style={{ width: '100%', height: '100%' }}
    >
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 5, 5]} intensity={1} />
      <directionalLight position={[-5, -5, -5]} intensity={0.3} />
      <pointLight position={[0, 0, 3]} intensity={0.8} color="#d4a53c" />
      
      <Hexagon />
      
      <GlowingSphere position={[1.5, 1.5, 0]} color="#1f9d8a" />
      <GlowingSphere position={[-1.5, -1, 0.5]} color="#e85a4f" />
      <GlowingSphere position={[1, -1.5, -0.5]} color="#d4a53c" />
    </Canvas>
  );
}
