'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

const services = [
  {
    title: 'Video Editing',
    description: 'Professional editing with seamless transitions, color correction, and audio enhancement.',
    color: 'from-blue-400 to-blue-600',
    icon: '🎬'
  },
  {
    title: 'Motion Graphics',
    description: 'Eye-catching animations and graphics that enhance your video content.',
    color: 'from-red-400 to-red-600',
    icon: '✨'
  },
  {
    title: 'Color Grading',
    description: 'Professional color correction and grading to achieve the perfect look.',
    color: 'from-purple-400 to-purple-600',
    icon: '🎨'
  },
  {
    title: 'Audio Post',
    description: 'Crystal clear audio mixing, sound design, and music integration.',
    color: 'from-green-400 to-green-600',
    icon: '🎵'
  }
]

export const ServicesSection = () => {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] })
  const opacity = useTransform(scrollYProgress, [0.2, 0.4, 0.8, 1], [0, 1, 1, 0])
  const y = useTransform(scrollYProgress, [0.2, 0.4], [100, 0])

  return (
    <motion.section 
      ref={ref}
      className="min-h-screen w-full flex items-center justify-center bg-gray-50 px-4 py-20"
      style={{ opacity, y }}
      id="services"
    >
      <div className="max-w-6xl mx-auto">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-5xl font-bold mb-6 text-black">Our <span className="text-red-500">Services</span></h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We offer comprehensive video editing solutions tailored to your specific needs
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
            >
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${service.color} flex items-center justify-center text-2xl mb-6`}>
                {service.icon}
              </div>
              <h3 className="text-2xl font-bold text-black mb-4">{service.title}</h3>
              <p className="text-gray-600 leading-relaxed">{service.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  )
}