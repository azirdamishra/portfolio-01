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
            </mesh>
            {/* Add booster effects at the back of the spaceship */}
            <BoosterEffects 
                isRotating={isRotating}
                position={[0, 0, -1]} // Adjust these values based on your spaceship model
                rotation={[0, 0, 0]}
            />
        </group>
    )
}

export default Spaceship 