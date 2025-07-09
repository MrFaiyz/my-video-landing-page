'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

export const AboutSection = () => {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] })
  const opacity = useTransform(scrollYProgress, [0.2, 0.4, 0.8, 1], [0, 1, 1, 0])
  const y = useTransform(scrollYProgress, [0.2, 0.4], [100, 0])

  return (
    <motion.section 
      ref={ref}
      className="min-h-screen w-full flex items-center justify-center bg-white px-4 py-20"
      style={{ opacity, y }}
      id="about"
    >
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div>
          <motion.h2 
            className="text-5xl font-bold mb-8 text-black"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            About <span className="text-blue-400">EditPro</span> Studio
          </motion.h2>
          <motion.p 
            className="text-lg text-gray-600 mb-6 leading-relaxed"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            We are a creative video editing studio specializing in transforming raw footage 
            into compelling visual stories. Our team of experienced editors works with the 
            latest industry-standard software to deliver professional results.
          </motion.p>
          <motion.p 
            className="text-lg text-gray-600 leading-relaxed"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            From corporate videos to creative content, we bring technical expertise and 
            artistic vision to every project, ensuring your message resonates with your audience.
          </motion.p>
        </div>
        
        <motion.div 
          className="grid grid-cols-2 gap-6"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-2xl">
            <h3 className="text-3xl font-bold text-blue-600 mb-2">500+</h3>
            <p className="text-gray-700">Projects Completed</p>
          </div>
          <div className="bg-gradient-to-br from-red-50 to-red-100 p-6 rounded-2xl">
            <h3 className="text-3xl font-bold text-red-500 mb-2">50+</h3>
            <p className="text-gray-700">Happy Clients</p>
          </div>
          <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-6 rounded-2xl">
            <h3 className="text-3xl font-bold text-gray-700 mb-2">5+</h3>
            <p className="text-gray-700">Years Experience</p>
          </div>
          <div className="bg-gradient-to-br from-blue-50 to-red-50 p-6 rounded-2xl">
            <h3 className="text-3xl font-bold text-gray-700 mb-2">24/7</h3>
            <p className="text-gray-700">Support Available</p>
          </div>
        </motion.div>
      </div>
    </motion.section>
  )
}