import React, { useEffect, useRef } from 'react'
import birdScene from '../assets/3d/bird.glb'
import { useAnimations, useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber';

// Island at [0, -6.5, -43]. Bird flies in front of it, top-left to top-right.
const PATH_LEFT = -12;
const PATH_RIGHT = 12;
const PATH_Y = 3;
const PATH_Z = -35; // In front of island

const Bird = () => {
    const birdRef = useRef();
    const { scene, animations } = useGLTF(birdScene);
    
    const {actions} = useAnimations(animations, birdRef);

    useEffect(() => {
        actions['Take 001'].play();
    }, []);

    useFrame(({ clock }) => {
        // Straight path: top-left → top-right, then reverse and retrace
        const duration = 8;
        const phase = (clock.elapsedTime / duration) % 2;
        const goingRight = phase < 1;
        const t = goingRight ? phase : 2 - phase;

        const x = PATH_LEFT + (PATH_RIGHT - PATH_LEFT) * t;
        const y = PATH_Y + Math.sin(clock.elapsedTime * 2) * 0.2; // Slight bobbing

        birdRef.current.position.set(x, y, PATH_Z);
        birdRef.current.rotation.y = goingRight ? 0 : Math.PI;
    })

  return (
    <mesh ref={birdRef} position={[PATH_LEFT, PATH_Y, PATH_Z]} scale={[0.0055, 0.0055, 0.0055]}>
        <primitive object={scene} />
        /** // use the primitive element when you want to directly embed a complex 3D
         model or scene */
    </mesh>
  )
}

export default Bird