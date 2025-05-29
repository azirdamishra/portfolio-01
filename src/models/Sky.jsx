import { useGLTF } from '@react-three/drei'
import React, { useRef } from 'react'
import nightSkyScene from '../assets/3d/night_sky.glb'
import { useFrame } from '@react-three/fiber';

const Sky = ({ isRotating }) => {
    const sky = useGLTF(nightSkyScene);
    const skyRef = useRef();

    useFrame((_, delta) => {
      if(isRotating){
        skyRef.current.rotation.y += 0.15 * delta
      }
    })

    return (
        <mesh ref={skyRef} scale={[50, 50, 50]} position={[0, 0, -100]}>
            <primitive object={sky.scene}/>
        </mesh>
    )
}

export default Sky