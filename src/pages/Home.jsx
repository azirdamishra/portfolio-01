import React, { Suspense, useState, useEffect, useRef } from 'react'
import { Canvas } from '@react-three/fiber'
import Loader from '../components/Loader'
import Island from '../models/Island'
import Sky from '../models/Sky'
import Bird from '../models/Bird'
import IslandObject from '../models/IslandObject'
import HomeInfo from '../components/HomeInfo'
import * as THREE from 'three';


//Import the static model object
import pickleRickModel from '../assets/3d/pickle_rick.glb'
import Spaceship from '../models/Spaceship'

const Home = () => {

  const [isRotating, setisRotating] = useState(false);
  const [isDraggingIsland, setIsDraggingIsland] = useState(false);
  const [currentStage, setCurrentStage] = useState(1);
  const spotLightRef = useRef();
  const targetRef = useRef(new THREE.Object3D());
  const rotationControlsRef = useRef(null);

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
      screenScale = [0.5, 0.5, 0.5];
      screenPosition = [0, -1.5, 0];
    } else {
      screenScale = [1, 1, 1];
      screenPosition = [0, -4, -4];
    }

    return [screenScale, screenPosition]
  }

  const [islandScale, islandPosition, islandRotation] = adjustIslandForScreenSize();
  const [planeScale, planePostion] = adjustPlaneForScreenSize();

  const holdIntervalRef = useRef(null);

  const startRotateLeft = () => {
    rotationControlsRef.current?.rotateLeft?.();
    holdIntervalRef.current = setInterval(() => {
      rotationControlsRef.current?.rotateLeft?.();
    }, 80);
  };

  const startRotateRight = () => {
    rotationControlsRef.current?.rotateRight?.();
    holdIntervalRef.current = setInterval(() => {
      rotationControlsRef.current?.rotateRight?.();
    }, 80);
  };

  const stopRotate = () => {
    if (holdIntervalRef.current) {
      clearInterval(holdIntervalRef.current);
      holdIntervalRef.current = null;
    }
    rotationControlsRef.current?.stopRotating?.();
  };

  return (
    <section className='w-full h-screen relative'>
      {/* Arrow controls - on either side of the island, hold to rotate */}
      <button
        onMouseDown={(e) => { e.preventDefault(); startRotateLeft(); }}
        onMouseUp={stopRotate}
        onMouseLeave={stopRotate}
        onTouchStart={(e) => { e.preventDefault(); startRotateLeft(); }}
        onTouchEnd={stopRotate}
        onTouchCancel={stopRotate}
        className='absolute left-8 top-1/2 -translate-y-1/2 z-20 w-14 h-14 flex items-center justify-center rounded-full bg-slate-800/80 backdrop-blur-md border-2 border-white/50 hover:bg-slate-700/90 hover:scale-110 transition-all shadow-xl select-none'
        aria-label='Rotate left'
      >
        <svg className='w-7 h-7 text-white pointer-events-none' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
          <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M15 19l-7-7 7-7' />
        </svg>
      </button>
      <button
        onMouseDown={(e) => { e.preventDefault(); startRotateRight(); }}
        onMouseUp={stopRotate}
        onMouseLeave={stopRotate}
        onTouchStart={(e) => { e.preventDefault(); startRotateRight(); }}
        onTouchEnd={stopRotate}
        onTouchCancel={stopRotate}
        className='absolute right-8 top-1/2 -translate-y-1/2 z-20 w-14 h-14 flex items-center justify-center rounded-full bg-slate-800/80 backdrop-blur-md border-2 border-white/50 hover:bg-slate-700/90 hover:scale-110 transition-all shadow-xl select-none'
        aria-label='Rotate right'
      >
        <svg className='w-7 h-7 text-white pointer-events-none' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
          <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 5l7 7-7 7' />
        </svg>
      </button>
      {/* <p className='absolute bottom-20 left-1/2 -translate-x-1/2 z-10 text-white/80 text-sm text-center'>
        Use arrows or drag to explore
      </p> */}
      <div className='absolute bottom-10 left-0 right-0 z-10 flex items-center justify-center'>
        {currentStage && <HomeInfo currentStage={currentStage} />}
      </div>  
      <Canvas 
        className={`w-full h-screen bg-transparent ${isDraggingIsland ? 'cursor-grabbing' : 'cursor-default'}`}
        shadows
        camera={{ near:0.12, far: 1000}}
      >
        <Suspense fallback={<Loader />}>
          {/* Main directional light - reduced intensity */}
          <directionalLight position={[3,-6,7]} intensity={4}/>
          
          {/* Ambient light - reduced for darker atmosphere */}
          <ambientLight intensity={0.65}/>
          
          {/* Hemisphere light - reduced for darker sky */}
          <hemisphereLight 
            skyColor="#000000" 
            groundColor="#000000" 
            intensity={0.6}
          />
          
          <primitive object={targetRef.current} />

          {/* Additional fill light */}
          <pointLight
            position={[10, 10, 10]}
            intensity={2}
            color="#ffffff"
          />

          <Bird />
          <Sky />
          <Island 
            position = {islandPosition}
            scale = {islandScale}
            rotation = {islandRotation}
            isRotating = {isRotating}
            setisRotating = {setisRotating}
            currentStage = {currentStage}
            setCurrentStage = {setCurrentStage}
            rotationControlsRef = {rotationControlsRef}
            setIsDraggingIsland = {setIsDraggingIsland}
          >
            <IslandObject
              modelPath={pickleRickModel}
              position={[0, 5, 0]}
              scale={[15, 15, 15]}
              rotation={[0, 14.10, 0]}
            />
          </Island>
          <Spaceship 
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