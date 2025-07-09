'use client'

import { Canvas } from '@react-three/fiber'
import { CameraLens } from './CameraLens'
import { TunnelBackground } from './TunnelBackground'
import { FloatingIcons } from './FloatingIcons'
import { Environment, PerspectiveCamera } from '@react-three/drei'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import { Typewriter } from 'react-simple-typewriter'
import Loader from '../Loader'
import Navbar from '../Navbar'

export const HeroSection = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [showTypewriter, setShowTypewriter] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  
  // Create scroll-based 3D navigation
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  })

  // Transform scroll into 3D movement
  const cameraZ = useTransform(scrollYProgress, [0, 1], [10, -40])
  const textOpacity = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [1, 1, 0, 0])
  const textScale = useTransform(scrollYProgress, [0, 0.3], [1, 0.7])
  const lensScale = useTransform(scrollYProgress, [0, 1], [0, 1])

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
      setTimeout(() => setShowTypewriter(true), 500)
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
        <div className="fixed inset-0 z-0">
          <Canvas>
            <PerspectiveCamera 
              makeDefault 
              position={[0, 0, cameraZ.get() ?? 10]} 
              fov={75}
              near={0.1}
              far={1000}
            />
            
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
          className="fixed inset-0 z-10 flex flex-col items-center justify-center text-center px-4"
          style={{ 
            opacity: textOpacity,
            scale: textScale
          }}
        >
          <motion.h1 
            className="text-6xl md:text-8xl lg:text-9xl font-bold text-black mb-8 leading-tight"
            style={{
              textShadow: '2px 2px 4px rgba(0,0,0,0.1)',
              background: 'linear-gradient(135deg, #000000 0%, #333333 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            {showTypewriter && (
              <Typewriter
                words={['Your Story, Perfectly Edited']}
                loop={1}
                cursor
                cursorStyle='|'
                typeSpeed={80}
                deleteSpeed={50}
                delaySpeed={1000}
              />
            )}
          </motion.h1>
          
          <motion.p 
            className="text-xl md:text-2xl lg:text-3xl text-gray-700 max-w-4xl mb-12 leading-relaxed"
            style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.1)' }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.5 }}
          >
            Professional video editing services that transform your vision into cinematic reality
          </motion.p>

          <motion.div
            className="flex gap-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 2 }}
          >
            <motion.button 
              className="px-10 py-4 bg-gradient-to-r from-blue-400 to-blue-600 text-white rounded-full font-semibold text-lg shadow-xl hover:shadow-2xl transition-all duration-300"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              Start Your Project
            </motion.button>
            <motion.button 
              className="px-10 py-4 border-2 border-red-500 text-red-500 rounded-full font-semibold text-lg hover:bg-red-500 hover:text-white transition-all duration-300 shadow-xl"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              View Portfolio
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3 }}
          style={{ opacity: textOpacity }}
        >
          <div className="flex flex-col items-center">
            <div className="w-6 h-12 border-2 border-gray-600 rounded-full flex justify-center mb-2">
              <motion.div
                className="w-1.5 h-4 bg-gradient-to-b from-blue-400 to-red-500 rounded-full mt-2"
                animate={{ y: [0, 16, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              />
            </div>
            <p className="text-sm text-gray-600 font-medium">Scroll to dive in</p>
          </div>
        </motion.div>
      </div>
    </>
  )
}