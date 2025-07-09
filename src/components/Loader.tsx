'use client'

import { motion } from 'framer-motion'

export default function Loader() {
  return (
    <div className="fixed inset-0 bg-white flex items-center justify-center z-50">
      <div className="relative w-80 h-1 bg-gray-200 overflow-hidden rounded-full">
        <motion.div
          className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-400 to-red-500"
          initial={{ width: 0 }}
          animate={{ width: '100%' }}
          transition={{ duration: 2.5, ease: 'easeInOut' }}
        />
      </div>
    </div>
  )
}