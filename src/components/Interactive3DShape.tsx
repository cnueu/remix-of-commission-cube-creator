import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { useRef, useState } from 'react';
import * as THREE from 'three';

interface ShapeProps {
  color: string;
  shape: 'cube' | 'hexagon';
}

function Cube({ color }: { color: string }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame(() => {
    if (meshRef.current && !hovered) {
      meshRef.current.rotation.y += 0.005;
    }
  });

  return (
    <mesh 
      ref={meshRef}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <boxGeometry args={[1.5, 1.5, 1.5]} />
      <meshStandardMaterial color={color} metalness={0.3} roughness={0.4} />
    </mesh>
  );
}

function Hexagon({ color }: { color: string }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame(() => {
    if (meshRef.current && !hovered) {
      meshRef.current.rotation.y += 0.005;
    }
  });

  return (
    <mesh 
      ref={meshRef}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <cylinderGeometry args={[1, 1, 0.6, 6]} />
      <meshStandardMaterial color={color} metalness={0.3} roughness={0.4} />
    </mesh>
  );
}

export default function Interactive3DShape({ color, shape }: ShapeProps) {
  return (
    <div style={{ width: '100%', height: '100%', minHeight: '180px' }}>
      <Canvas
        camera={{ position: [0, 0, 4], fov: 45 }}
        style={{ width: '100%', height: '100%', cursor: 'grab' }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        <directionalLight position={[-5, -5, -5]} intensity={0.3} />
        <pointLight position={[0, 0, 3]} intensity={0.5} color={color} />
        
        {shape === 'cube' ? <Cube color={color} /> : <Hexagon color={color} />}
        
        <OrbitControls 
          enableZoom={false} 
          enablePan={false}
          autoRotate={false}
        />
      </Canvas>
    </div>
  );
}
