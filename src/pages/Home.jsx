import React, { Suspense, useState, useEffect, useRef } from 'react'
import { Canvas } from '@react-three/fiber'
import Loader from '../components/Loader'
import Island from '../models/Island'
import Sky from '../models/Sky'
import Bird from '../models/Bird'
import Plane from '../models/Plane'
import IslandObject from '../models/IslandObject'
import HomeInfo from '../components/HomeInfo'
import * as THREE from 'three';


//Import the static model object
import pickleRickModel from '../assets/3d/pickle_rick.glb'

const Home = () => {

  const [isRotating, setisRotating] = useState(false);
  const [currentStage, setCurrentStage] = useState(1);
  const spotLightRef = useRef();
  const targetRef = useRef(new THREE.Object3D());

  useEffect(() => {
    // Log to verify the model path
    console.log('Pickle Rick model path:', pickleRickModel);
    if (targetRef.current) {
      targetRef.current.position.set(0, 0, 0); // Aim at center of island
    }
  }, []);

  const adjustIslandForScreenSize = () => {
    let screenScale = null;
    let screenPosition = [0, -6.5, -43];
    let rotation = [0.1, 4.7, 0];

    if(window.innerWidth < 768){
      screenScale = [0.9, 0.9, 0.9];
    } else {
      screenScale = [1, 1, 1];
    }

    return [screenScale, screenPosition, rotation]
  }

  const adjustPlaneForScreenSize = () => {
    let screenScale ,screenPosition;

    if(window.innerWidth < 768){
      screenScale = [1.5, 1.5, 1.5];
      screenPosition = [0, -1.5, 0];
    } else {
      screenScale = [3, 3, 3];
      screenPosition = [0, -4, -4];
    }

    return [screenScale, screenPosition]
  }

  const [islandScale, islandPosition, islandRotation] = adjustIslandForScreenSize();
  const [planeScale, planePostion] = adjustPlaneForScreenSize();

  return (
    <section className='w-full h-screen relative'>
      <div className='absolute bottom-10 left-0 right-0 z-10 flex items-center justify-center'>
        {currentStage && <HomeInfo currentStage={currentStage} />}
      </div>  
      <Canvas 
        className={`w-full h-screen bg-transparent ${isRotating ? 'cursor-grabbing' : 'cursor-grab'}`}
        shadows
        camera={{ near:0.1, far: 1000}}
      >
        <Suspense fallback={<Loader />}>
          {/* Main directional light - reduced intensity */}
          <directionalLight position={[-3,-6,-7]} intensity={4}/>
          
          {/* Ambient light - reduced for darker atmosphere */}
          <ambientLight intensity={0.7}/>
          
          {/* Hemisphere light - reduced for darker sky */}
          <hemisphereLight 
            skyColor="#000000" 
            groundColor="#000000" 
            intensity={0.05}
          />
          
          {/* Main spotlight for the scene */}
          {/* <spotLight
            ref={spotLightRef}
            position={[0, 30, 0]}
            angle={0.5}
            penumbra={0.5}
            intensity={15}
            castShadow
            shadow-mapSize={2048}
            color="#ffffff"
            target={targetRef.current}
          /> */}
          
          <primitive object={targetRef.current} />

          {/* Additional fill light */}
          <pointLight
            position={[10, 10, 10]}
            intensity={2}
            color="#ffffff"
          />

          <Bird />
          <Sky 
            isRotating = {isRotating}
          />
          <Island 
            position = {islandPosition}
            scale = {islandScale}
            rotation = {islandRotation}
            isRotating = {isRotating}
            setisRotating = {setisRotating}
            currentStage = {currentStage}
            setCurrentStage = {setCurrentStage}
          >
            <IslandObject
              modelPath={pickleRickModel}
              position={[0, 5, 0]}
              scale={[15, 15, 15]}
              rotation={[0, 14, 0]}
            />
          </Island>
          <Plane 
            position = {planePostion}
            scale = {planeScale}
            isRotating = {isRotating}
            rotation = {[0, 20, 0]}
          />
        </Suspense>
        
      </Canvas>

    </section>
  )
}

export default Home