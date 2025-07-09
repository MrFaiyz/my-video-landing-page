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
  
  // Create a scroll container that's much taller to enable 3D navigation
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  })

  // Transform scroll progress for 3D effects
  const tunnelProgress = useTransform(scrollYProgress, [0, 1], [0, 1])
  const textOpacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [1, 1, 0, 0])
  const textScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8])

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
        style={{ height: '500vh' }} // Make container much taller for scroll navigation
      >
        {/* Fixed 3D Canvas */}
        <div className="fixed inset-0 z-0">
          <Canvas>
            <PerspectiveCamera makeDefault position={[0, 0, 10]} fov={75} />
            
            {/* Enhanced lighting for 3D effect */}
            <ambientLight intensity={0.4} />
            <pointLight position={[10, 10, 10]} intensity={1} color="#ffffff" />
            <pointLight position={[-10, -10, 5]} intensity={0.6} color="#3ac4ec" />
            <pointLight position={[0, 0, 20]} intensity={0.8} color="#FF4C4C" />
            <spotLight 
              position={[0, 0, 30]} 
              angle={0.3} 
              penumbra={0.5} 
              intensity={1}
              color="#ffffff"
            />
            
            <Environment preset="city" background={false} />
            
            <TunnelBackground progress={tunnelProgress.get()} />
            <CameraLens progress={tunnelProgress.get()} />
            <FloatingIcons progress={tunnelProgress.get()} />
            
            {/* Add fog for depth */}
            <fog attach="fog" args={['#ffffff', 10, 100]} />
          </Canvas>
        </div>

        {/* Fixed text content */}
        <motion.div
          className="fixed inset-0 z-10 flex flex-col items-center justify-center text-center px-4"
          style={{ 
            opacity: textOpacity, 
            scale: textScale 
          }}
        >
          <motion.h1 
            className="text-6xl md:text-8xl font-bold text-black mb-6 leading-tight drop-shadow-lg"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
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
            className="text-xl md:text-2xl text-gray-800 max-w-2xl drop-shadow-md"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.5 }}
          >
            Professional video editing services that bring your vision to life
          </motion.p>

          <motion.div
            className="mt-8 flex gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 2 }}
          >
            <button className="px-8 py-3 bg-blue-400 text-white rounded-full hover:bg-blue-500 transition-colors duration-300 font-medium shadow-lg">
              Get Started
            </button>
            <button className="px-8 py-3 border-2 border-red-500 text-red-500 rounded-full hover:bg-red-500 hover:text-white transition-all duration-300 font-medium shadow-lg">
              View Portfolio
            </button>
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
          <div className="w-6 h-10 border-2 border-gray-600 rounded-full flex justify-center">
            <motion.div
              className="w-1 h-3 bg-gray-600 rounded-full mt-2"
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          </div>
          <p className="text-sm text-gray-600 mt-2 text-center">Scroll to explore</p>
        </motion.div>
      </div>
    </>
  )
}