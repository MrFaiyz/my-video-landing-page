'use client'

import { motion, useScroll, useTransform } from 'framer-motion'

export const ServicesSection = () => {
  const { scrollYProgress } = useScroll()
  const opacity = useTransform(scrollYProgress, [0.4, 0.5], [0, 1])
  const y = useTransform(scrollYProgress, [0.4, 0.5], [100, 0])

  return (
    <motion.section 
      className="h-screen w-full flex items-center justify-center bg-gray-50 px-4"
      style={{ opacity, y }}
      id="services"
    >
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold mb-6 text-gray-800">Our Services</h2>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {['Photography', 'Videography', 'Editing', 'Consulting'].map((service) => (
            <li key={service} className="text-lg text-gray-600 bg-white p-4 rounded-lg shadow-sm">
              {service}
            </li>
          ))}
        </ul>
      </div>
    </motion.section>
  )
}