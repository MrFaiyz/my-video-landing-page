'use client'

import { motion, useScroll, useTransform } from 'framer-motion'

export const TestimonialsSection = () => {
  const { scrollYProgress } = useScroll()
  const opacity = useTransform(scrollYProgress, [0.6, 0.7], [0, 1])
  const y = useTransform(scrollYProgress, [0.6, 0.7], [100, 0])

  return (
    <motion.section 
      className="h-screen w-full flex items-center justify-center bg-white px-4"
      style={{ opacity, y }}
      id="testimonials"
    >
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold mb-6 text-gray-800">Testimonials</h2>
        <div className="space-y-6">
          {[
            "The team captured our wedding perfectly!",
            "Best photography service in town!",
            "Absolutely stunning portfolio work."
          ].map((testimonial, index) => (
            <div key={index} className="bg-gray-50 p-6 rounded-lg">
              <p className="text-lg text-gray-600">"{testimonial}"</p>
            </div>
          ))}
        </div>
      </div>
    </motion.section>
  )
}