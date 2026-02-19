import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei';
import nightSkyScene from '../assets/3d/night_sky.glb'
import { useFrame } from '@react-three/fiber';

const Sky = () => {
    const sky = useGLTF(nightSkyScene);
    const skyRef = useRef();

    useFrame((_, delta) => {
        // Rotate constantly, independent of user interaction (like the Bird)
        skyRef.current.rotation.y += 0.1 * delta;
    })

    return (
        <mesh ref={skyRef} scale={[50, 50, 50]} position={[0, 0, -100]}>
            <primitive object={sky.scene}/>
        </mesh>
    )
}

export default Sky 