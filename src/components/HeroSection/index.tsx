'use client'

import { Canvas } from '@react-three/fiber'
import { CameraLens } from './CameraLens'
import { Environment } from '@react-three/drei'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

export const HeroSection = () => {
  // Attach scroll to the main container
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] })

  // Animate background shade and text scale
  const bg = useTransform(scrollYProgress, [0, 1], ['#fff', '#eaeaea'])
  const textScale = useTransform(scrollYProgress, [0, 0.2], [1, 1.2])
  const lensProgress = useTransform(scrollYProgress, [0, 0.2, 1], [0, 1, 1])

  return (
    <motion.section
      ref={ref}
      className="relative h-screen w-full flex flex-col items-center justify-center"
      style={{ background: bg }}
      id="home"
    >
      <Canvas
        style={{ position: 'absolute', inset: 0, zIndex: 0 }}
        camera={{ position: [0, 0, 10], fov: 50 }}
        shadows
      >
        <ambientLight intensity={0.7} />
        <pointLight position={[10, 10, 10]} intensity={0.5} />
        <Environment preset="city" background={false} />
        {/* Lens progress is a number, so get() */}
        <CameraLens progress={lensProgress.get()} />
      </Canvas>
      <motion.div
        className="relative z-10 flex flex-col items-center justify-center"
        style={{ scale: textScale }}
      >
        <h1 className="text-5xl font-bold text-gray-800 mb-4">Welcome to Our Studio</h1>
        <p className="text-xl text-gray-600">Capturing moments that matter</p>
      </motion.div>
    </motion.section>
  )
}