'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

const testimonials = [
  {
    text: "EditPro Studio transformed our corporate video into something truly exceptional. Their attention to detail and creative vision exceeded our expectations.",
    author: "Sarah Johnson",
    company: "Tech Innovations Inc.",
    rating: 5
  },
  {
    text: "The team's expertise in motion graphics and color grading brought our brand story to life. Highly recommend their professional services.",
    author: "Michael Chen",
    company: "Creative Agency",
    rating: 5
  },
  {
    text: "Outstanding work on our promotional video. The editing was seamless and the final product was delivered ahead of schedule.",
    author: "Emily Rodriguez",
    company: "Marketing Solutions",
    rating: 5
  }
]

export const TestimonialsSection = () => {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] })
  const opacity = useTransform(scrollYProgress, [0.2, 0.4, 0.8, 1], [0, 1, 1, 0])
  const y = useTransform(scrollYProgress, [0.2, 0.4], [100, 0])

  return (
    <motion.section 
      ref={ref}
      className="min-h-screen w-full flex items-center justify-center bg-white px-4 py-20"
      style={{ opacity, y }}
      id="testimonials"
    >
      <div className="max-w-6xl mx-auto">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-5xl font-bold mb-6 text-black">What Our <span className="text-blue-400">Clients</span> Say</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Don't just take our word for it - hear from our satisfied clients
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              className="bg-gray-50 p-8 rounded-2xl relative"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
            >
              <div className="flex mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <span key={i} className="text-yellow-400 text-xl">★</span>
                ))}
              </div>
              <p className="text-gray-700 mb-6 leading-relaxed">"{testimonial.text}"</p>
              <div>
                <p className="font-bold text-black">{testimonial.author}</p>
                <p className="text-gray-500 text-sm">{testimonial.company}</p>
              </div>
              <div className="absolute top-6 right-6 text-6xl text-blue-100">"</div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  )
}