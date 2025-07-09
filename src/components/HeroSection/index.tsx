'use client'

import { Canvas } from '@react-three/fiber'
import { CameraLens } from './CameraLens'
import { TunnelBackground } from './TunnelBackground'
import { FloatingIcons } from './FloatingIcons'
import { Environment } from '@react-three/drei'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import { Typewriter } from 'react-simple-typewriter'
import Loader from '../Loader'
import Navbar from '../Navbar'

export const HeroSection = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [showTypewriter, setShowTypewriter] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] })

  const textOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0])
  const textY = useTransform(scrollYProgress, [0, 0.3], [0, -50])
  const lensProgress = useTransform(scrollYProgress, [0, 1], [0, 1])

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
      <motion.section
        ref={ref}
        className="relative h-screen w-full flex flex-col items-center justify-center bg-white overflow-hidden"
        id="home"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <Canvas
          style={{ position: 'absolute', inset: 0, zIndex: 1 }}
          camera={{ position: [0, 0, 10], fov: 75 }}
        >
          <ambientLight intensity={0.6} />
          <pointLight position={[10, 10, 10]} intensity={0.8} />
          <pointLight position={[-10, -10, 5]} intensity={0.4} color="#3ac4ec" />
          <Environment preset="city" background={false} />
          
          <TunnelBackground progress={lensProgress.get()} />
          <CameraLens progress={lensProgress.get()} />
          <FloatingIcons progress={lensProgress.get()} />
        </Canvas>

        <motion.div
          className="relative z-10 flex flex-col items-center justify-center text-center px-4"
          style={{ opacity: textOpacity, y: textY }}
        >
          <motion.h1 
            className="text-6xl md:text-7xl font-bold text-black mb-6 leading-tight"
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
            className="text-xl md:text-2xl text-gray-600 max-w-2xl"
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
            <button className="px-8 py-3 bg-blue-400 text-white rounded-full hover:bg-blue-500 transition-colors duration-300 font-medium">
              Get Started
            </button>
            <button className="px-8 py-3 border-2 border-red-500 text-red-500 rounded-full hover:bg-red-500 hover:text-white transition-all duration-300 font-medium">
              View Portfolio
            </button>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3 }}
          style={{ opacity: textOpacity }}
        >
          <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center">
            <motion.div
              className="w-1 h-3 bg-gray-400 rounded-full mt-2"
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          </div>
        </motion.div>
      </motion.section>
    </>
  )
}