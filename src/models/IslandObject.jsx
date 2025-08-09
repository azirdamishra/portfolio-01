import React, { useEffect } from 'react';
import { useGLTF } from '@react-three/drei';

import rickObject from '../assets/3d/pickle_rick.glb'

const IslandObject = ({ modelPath, position, scale, rotation }) => {
  console.log('IslandObject rendering with modelPath:', modelPath);
  
  // Move useGLTF outside of try-catch
  const { scene } = useGLTF(modelPath);
  
  useEffect(() => {
    if (scene) {
      console.log('Model loaded successfully:', {
        scene: 'Scene exists',
        position: position,
        scale: scale,
        rotation: rotation
      });
    } else {
      console.error('Scene failed to load');
    }
  }, [scene, position, scale, rotation]);

  // If scene is not loaded, return null
  if (!scene) {
    console.error('Scene not loaded');
    return null;
  }

  return (
    <group position={position} scale={scale} rotation={rotation} castShadow receiveShadow>
      <primitive object={scene} />
    </group>
  );
};

// Preload the model with the correct path
useGLTF.preload(rickObject);

export default IslandObject; 