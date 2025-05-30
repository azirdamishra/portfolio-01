import { useAnimations, useGLTF } from '@react-three/drei'
import React, { useEffect, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

import spaceshipScene from '../assets/3d/spaceship.glb'

const Spaceship = ({isRotating, ...props }) => {
    const ref = useRef();
    const { scene, animations } = useGLTF(spaceshipScene);
    const { actions } = useAnimations(animations, ref);
    const time = useRef(0);

    useEffect(() => {
        if(isRotating){
            actions['Take 001']?.play();
        }else{
            actions['Take 001']?.stop();
        }
    }, [actions, isRotating])

    useFrame((state, delta) => {
        time.current += delta;
        
        // Constant gentle bobbing
        const bobbing = Math.sin(time.current * 2) * 0.075;
        
        // Oscillation during rotation
        const oscillation = isRotating ? Math.sin(time.current * 5) * 0.2 : 0;
        
        // Apply both movements
        if (ref.current) {
            ref.current.position.y = bobbing + oscillation;
        }
    });

    return (
        <group {...props}>
            <group ref={ref}>
                <primitive object={scene}/>
                {/* Irregular aura effect */}
                <mesh>
                    <dodecahedronGeometry args={[1, 1]} />
                    <meshBasicMaterial 
                        color="#00ff00"
                        transparent
                        opacity={0.15}
                        side={THREE.BackSide}
                        wireframe={false}
                    />
                </mesh>
            </group>
            {/* Green point light for the aura */}
            <pointLight
                color="#00ff00"
                intensity={5}
                distance={5}
                decay={2}
            />
            <spotLight
                position={[0, 5, 5]}
                angle={0.75}
                penumbra={0.2}
                intensity={100}
                distance={10}
                color="#ffffff"
                castShadow
                target={ref.current}
            />
        </group>
    )
}

export default Spaceship 