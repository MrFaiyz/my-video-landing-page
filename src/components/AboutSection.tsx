'use client'

import { motion, useScroll, useTransform } from 'framer-motion'

export const AboutSection = () => {
  const { scrollYProgress } = useScroll()
  const opacity = useTransform(scrollYProgress, [0.2, 0.3], [0, 1])
  const y = useTransform(scrollYProgress, [0.2, 0.3], [100, 0])

  return (
    <motion.section 
      className="h-screen w-full flex items-center justify-center bg-white px-4"
      style={{ opacity, y }}
      id="about"
    >
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold mb-6 text-gray-800">About Us</h2>
        <p className="text-lg text-gray-600">
          We are a creative studio specializing in visual storytelling through the lens.
          Our team of passionate photographers and designers work together to create
          stunning visuals that capture the essence of your brand.
        </p>
      </div>
    </motion.section>
  )
}