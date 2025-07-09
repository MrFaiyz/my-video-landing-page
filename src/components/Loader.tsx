'use client'

import { motion } from 'framer-motion'

export default function Loader() {
  return (
    <div className="fixed inset-0 bg-black flex items-center justify-center">
      <div className="relative w-1/2 h-1 mt-20 bg-gray-800 overflow-hidden rounded-full">
        <motion.div
          className="absolute top-0 left-0 h-full bg-white"
          initial={{ width: 0 }}
          animate={{ width: '100%' }}
          transition={{ duration: 2, ease: 'easeInOut' }}
        />
      </div>
    </div>
  )
}
