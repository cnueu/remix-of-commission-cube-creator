import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, OrbitControls } from '@react-three/drei';
import { useRef, useEffect } from 'react';
import * as THREE from 'three';

interface ModelProps {
  color: string;
  autoRotate?: boolean;
  interactive?: boolean;
}

function Model({ color, autoRotate = true }: { color: string; autoRotate: boolean }) {
  const groupRef = useRef<THREE.Group>(null);
  const { scene } = useGLTF('/models/finalhex.glb');

  useEffect(() => {
    // Clone the scene to avoid mutating the cached original
    scene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        // Create a new material with the specified color
        child.material = new THREE.MeshStandardMaterial({
          color: new THREE.Color(color),
          metalness: 0.4,
          roughness: 0.3,
        });
      }
    });
  }, [scene, color]);

  useFrame((state, delta) => {
    if (groupRef.current && autoRotate) {
      groupRef.current.rotation.y += delta * 0.5;
    }
  });

  return (
    <group ref={groupRef}>
      <primitive object={scene} scale={2} />
    </group>
  );
}

interface GLBModelProps extends ModelProps {
  className?: string;
}

export default function GLBModel({ color, autoRotate = true, interactive = true, className = '' }: GLBModelProps) {
  return (
    <div className={`w-full h-full min-h-[180px] ${className}`}>
      <Canvas
        camera={{ position: [0, 2, 5], fov: 45 }}
        style={{ width: '100%', height: '100%', cursor: interactive ? 'grab' : 'default' }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        <directionalLight position={[-5, -5, -5]} intensity={0.3} />
        <pointLight position={[0, 0, 3]} intensity={0.5} color={color} />
        
        <Model color={color} autoRotate={autoRotate} />
        
        {interactive && (
          <OrbitControls 
            enableZoom={false} 
            enablePan={false}
            autoRotate={false}
          />
        )}
      </Canvas>
    </div>
  );
}

// Preload the model
useGLTF.preload('/models/finalhex.glb');
