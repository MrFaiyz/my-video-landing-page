'use client'

import { Canvas } from '@react-three/fiber'
import { useFrame } from '@react-three/fiber'
import { CameraLens } from './CameraLens'
import { TunnelBackground } from './TunnelBackground'
import { FloatingIcons } from './FloatingIcons'
import { Environment } from '@react-three/drei'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import Loader from '../Loader'
import Navbar from '../Navbar'

// Camera component that can use MotionValue
const AnimatedCamera = ({ cameraZ }: { cameraZ: any }) => {
  const cameraRef = useRef<any>(null)
  
  useFrame(() => {
    if (cameraRef.current) {
      cameraRef.current.position.z = cameraZ.get()
    }
  })
  
  return (
    <perspectiveCamera
      ref={cameraRef}
      makeDefault
      position={[0, 0, 10]}
      fov={75}
      near={0.1}
      far={1000}
    />
  )
}

export const HeroSection = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [showContent, setShowContent] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  
  // Create scroll-based 3D navigation
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  })

  // Transform scroll into 3D movement
  const cameraZ = useTransform(scrollYProgress, [0, 1], [10, -40])
  const textOpacity = useTransform(scrollYProgress, [0, 0.08, 0.12, 0.2], [1, 1, 0, 0])
  const textScale = useTransform(scrollYProgress, [0, 0.3], [1, 0.7])
  const lensScale = useTransform(scrollYProgress, [0, 1], [0, 1])

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
      // Show content immediately after loading
      setTimeout(() => setShowContent(true), 100)
    }, 2500)
    return () => clearTimeout(timer)
  }, [])

  if (isLoading) {
    return <Loader />
  }

  return (
    <>
      <Navbar />
      <div 
        ref={containerRef}
        className="relative"
        style={{ height: '600vh' }} // Extended height for smooth 3D navigation
      >
        {/* 3D Canvas - Fixed position */}
        <div className="fixed inset-0 z-[1]">
          <Canvas>
            <AnimatedCamera cameraZ={cameraZ} />
            
            {/* Premium lighting setup */}
            <ambientLight intensity={0.3} />
            <directionalLight 
              position={[10, 10, 5]} 
              intensity={1} 
              color="#ffffff"
              castShadow
            />
            <pointLight 
              position={[-10, -10, 10]} 
              intensity={0.5} 
              color="#3ac4ec" 
            />
            <pointLight 
              position={[10, -10, 10]} 
              intensity={0.5} 
              color="#FF4C4C" 
            />
            <spotLight
              position={[0, 0, 50]}
              angle={0.15}
              penumbra={1}
              intensity={0.5}
              castShadow
            />
            
            <Environment preset="studio" background={false} />
            
            {/* 3D Scene Components */}
            <TunnelBackground scrollProgress={scrollYProgress} />
            <CameraLens scrollProgress={scrollYProgress} />
            <FloatingIcons scrollProgress={scrollYProgress} />
            
            {/* Atmospheric fog */}
            <fog attach="fog" args={['#ffffff', 20, 100]} />
          </Canvas>
        </div>

        {/* Hero Text - Fixed position, fades out as you scroll */}
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center text-center px-4 pointer-events-none"
          style={{ 
            opacity: textOpacity,
            scale: textScale
          }}
        >
          <motion.h1 
            className="text-4xl md:text-6xl lg:text-7xl font-bold text-black mb-8 leading-tight"
            style={{
              textShadow: '2px 2px 4px rgba(0,0,0,0.1)',
              background: 'linear-gradient(135deg, #000000 0%, #333333 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={showContent ? { scale: 1, opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            Your Story, Perfectly Edited
          </motion.h1>
          
          <motion.p 
            className="text-lg md:text-xl lg:text-2xl text-gray-700 max-w-3xl mb-12 leading-relaxed"
            style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.1)' }}
            initial={{ opacity: 0, y: 20 }}
            animate={showContent ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          >
            Professional video editing services that transform your vision into cinematic reality
          </motion.p>

          <motion.div
            className="flex gap-6 pointer-events-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={showContent ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
          >
            <motion.button 
              className="px-8 py-3 bg-gradient-to-r from-blue-400 to-blue-600 text-white rounded-full font-semibold text-base shadow-xl hover:shadow-2xl transition-all duration-300"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              Start Your Project
            </motion.button>
            <motion.button 
              className="px-8 py-3 border-2 border-red-500 text-red-500 rounded-full font-semibold text-base hover:bg-red-500 hover:text-white transition-all duration-300 shadow-xl"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              View Portfolio
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Simple scroll hint - no animated bar */}
        <motion.div
          className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-[99]"
          initial={{ opacity: 0 }}
          animate={showContent ? { opacity: 1 } : {}}
          transition={{ delay: 1.2, duration: 0.5 }}
          style={{ opacity: textOpacity }}
        >
          <p className="text-sm text-gray-600 font-medium">Scroll to explore</p>
        </motion.div>
      </div>
    </>
  )
}