import React, { forwardRef, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const BoosterEffects = forwardRef((props, ref) => {
  const { isRotating, position, rotation } = props;
  const particlesRef = useRef();
  const particles = [];
  const particleCount = 50;

  // Create particles
  for (let i = 0; i < particleCount; i++) {
    particles.push({
      position: new THREE.Vector3(
        (Math.random() - 0.5) * 0.2,
        Math.random() * 0.5,
        (Math.random() - 0.5) * 0.2
      ),
      velocity: new THREE.Vector3(
        (Math.random() - 0.5) * 0.02,
        -Math.random() * 0.1,
        (Math.random() - 0.5) * 0.02
      ),
      size: Math.random() * 0.1 + 0.05,
      color: new THREE.Color(1, 0.5, 0)
    });
  }

  useFrame(() => {
    if (!particlesRef.current) return;

    const positions = particlesRef.current.geometry.attributes.position.array;
    const colors = particlesRef.current.geometry.attributes.color.array;

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      
      if (isRotating) {
        // Update particle positions
        particles[i].position.add(particles[i].velocity);
        
        // Reset particles that go too far
        if (particles[i].position.y < -0.5) {
          particles[i].position.set(
            (Math.random() - 0.5) * 0.2,
            0.5,
            (Math.random() - 0.5) * 0.2
          );
          particles[i].velocity.set(
            (Math.random() - 0.5) * 0.02,
            -Math.random() * 0.1,
            (Math.random() - 0.5) * 0.02
          );
        }

        // Update positions
        positions[i3] = particles[i].position.x;
        positions[i3 + 1] = particles[i].position.y;
        positions[i3 + 2] = particles[i].position.z;

        // Update colors (fade out as particles move)
        const alpha = 1 - (Math.abs(particles[i].position.y) / 0.5);
        colors[i3] = 1; // R
        colors[i3 + 1] = 0.5 * alpha; // G
        colors[i3 + 2] = 0; // B
      } else {
        // Reset particles when not rotating
        positions[i3] = 0;
        positions[i3 + 1] = 0;
        positions[i3 + 2] = 0;
        colors[i3] = 0;
        colors[i3 + 1] = 0;
        colors[i3 + 2] = 0;
      }
    }

    particlesRef.current.geometry.attributes.position.needsUpdate = true;
    particlesRef.current.geometry.attributes.color.needsUpdate = true;
  });

  return (
    <group ref={ref}>
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particleCount}
          array={new Float32Array(particleCount * 3)}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={particleCount}
          array={new Float32Array(particleCount * 3)}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.1}
        vertexColors
        transparent
        opacity={0.8}
        blending={THREE.AdditiveBlending}
      />
    </points>
    </group>
  );
});

export default BoosterEffects; 