import React, { useEffect, useRef } from 'react'
import birdScene from '../assets/3d/bird.glb'
import { useAnimations, useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber';

const Bird = () => {
    const birdRef = useRef();
    const { scene, animations } = useGLTF(birdScene);
    
    const {actions} = useAnimations(animations, birdRef);

    useEffect(() => {
        actions['Take 001'].play();
    }, []);

    useFrame(({clock, camera}) => {
        //update the y position of the bird so it moves in the form of a sin wave, so its flight is like a bird
        birdRef.current.position.y = Math.sin(clock.elapsedTime) * 0.2 + 2;

        //if the bird has reached the end of the camera/island, it should be rotated around its y
        if(birdRef.current.position.x > camera.position.x + 10){
            birdRef.current.rotation.y = Math.PI;
        } else if(birdRef.current.position.x < camera.position.x - 10){
            birdRef.current.rotation.y = 0;
        }

        //making the bird revolve around the island regardless of the movement
        //update the x and z positions based on the direction
        if(birdRef.current.rotation.y === 0){
            birdRef.current.position.x += 0.011
            birdRef.current.position.z -= 0.0085
        }else{
            birdRef.current.position.x -= 0.011
            birdRef.current.position.z += 0.0085
        }
    })

  return (
    <mesh ref={birdRef} position={[-5, 2, 1]} scale={[0.002, 0.002, 0.002]}>
        <primitive object={scene} />
        /** // use the primitive element when you want to directly embed a complex 3D
         model or scene */
    </mesh>
  )
}

export default Bird