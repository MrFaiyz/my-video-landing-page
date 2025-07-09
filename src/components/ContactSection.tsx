'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

export const ContactSection = () => {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] })
  const opacity = useTransform(scrollYProgress, [0.2, 0.4, 0.8, 1], [0, 1, 1, 0])
  const y = useTransform(scrollYProgress, [0.2, 0.4], [100, 0])

  return (
    <motion.section 
      ref={ref}
      className="min-h-screen w-full flex items-center justify-center bg-gray-50 px-4 py-20"
      style={{ opacity, y }}
      id="contact"
    >
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-5xl font-bold mb-6 text-black">Let's Create Something <span className="text-red-500">Amazing</span></h2>
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            Ready to bring your vision to life? Get in touch with our team and let's discuss your next video project.
          </p>
          
          <div className="space-y-6">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-blue-400 rounded-full flex items-center justify-center">
                <span className="text-white text-xl">📧</span>
              </div>
              <div>
                <p className="font-semibold text-black">Email</p>
                <p className="text-gray-600">hello@editprostudio.com</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center">
                <span className="text-white text-xl">📱</span>
              </div>
              <div>
                <p className="font-semibold text-black">Phone</p>
                <p className="text-gray-600">+1 (555) 123-4567</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center">
                <span className="text-white text-xl">📍</span>
              </div>
              <div>
                <p className="font-semibold text-black">Location</p>
                <p className="text-gray-600">Los Angeles, CA</p>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="bg-white p-8 rounded-2xl shadow-lg"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <form className="space-y-6">
            <div>
              <input 
                type="text" 
                placeholder="Your Name" 
                className="w-full p-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
              />
            </div>
            <div>
              <input 
                type="email" 
                placeholder="Your Email" 
                className="w-full p-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
              />
            </div>
            <div>
              <input 
                type="text" 
                placeholder="Project Type" 
                className="w-full p-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
              />
            </div>
            <div>
              <textarea 
                placeholder="Tell us about your project..." 
                rows={4}
                className="w-full p-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all resize-none"
              />
            </div>
            <motion.button 
              type="submit"
              className="w-full py-4 bg-gradient-to-r from-blue-400 to-red-500 text-white rounded-xl font-semibold hover:from-blue-500 hover:to-red-600 transition-all duration-300"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Send Message
            </motion.button>
          </form>
        </motion.div>
      </div>
    </motion.section>
  )
}