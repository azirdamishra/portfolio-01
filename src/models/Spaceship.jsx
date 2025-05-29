import { useAnimations, useGLTF } from '@react-three/drei'
import React, { useEffect, useRef } from 'react'
import BoosterEffects from '../components/BoosterEffects'

import spaceshipScene from '../assets/3d/spaceship.glb'

const Spaceship = ({isRotating, ...props }) => {
    const ref = useRef();
    const { scene, animations } = useGLTF(spaceshipScene);
    const { actions } = useAnimations(animations, ref);

    useEffect(() => {
        if(isRotating){
            actions['Take 001']?.play();
        }else{
            actions['Take 001']?.stop();
        }
    }, [actions, isRotating])

    return (
        <group {...props}>
            <mesh ref={ref}>
                <primitive object={scene}/>
                {/* <BoosterEffects 
                isRotating={isRotating}
                position={[0, 0, -5]}
                rotation={[0, 0, 0]}
                /> */}
            </mesh>
            
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