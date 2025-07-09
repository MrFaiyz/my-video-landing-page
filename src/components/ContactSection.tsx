'use client'

import { motion, useScroll, useTransform } from 'framer-motion'

export const ContactSection = () => {
  const { scrollYProgress } = useScroll()
  const opacity = useTransform(scrollYProgress, [0.8, 0.9], [0, 1])
  const y = useTransform(scrollYProgress, [0.8, 0.9], [100, 0])

  return (
    <motion.section 
      className="h-screen w-full flex items-center justify-center bg-gray-50 px-4"
      style={{ opacity, y }}
      id="contact"
    >
      <div className="max-w-4xl mx-auto w-full">
        <h2 className="text-4xl font-bold mb-6 text-gray-800">Contact Us</h2>
        <form className="space-y-4">
          <input 
            type="text" 
            placeholder="Name" 
            className="w-full p-3 border border-gray-300 rounded-lg"
          />
          <input 
            type="email" 
            placeholder="Email" 
            className="w-full p-3 border border-gray-300 rounded-lg"
          />
          <textarea 
            placeholder="Message" 
            rows={4}
            className="w-full p-3 border border-gray-300 rounded-lg"
          />
          <button 
            type="submit"
            className="px-6 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition"
          >
            Send Message
          </button>
        </form>
      </div>
    </motion.section>
  )
}