'use client'

import { useState } from 'react'

export default function Navbar() {
  const [activeSection, setActiveSection] = useState('home')

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId)
    
    if (sectionId === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
      return
    }
    
    // Calculate scroll position for 3D navigation
    const sectionPositions = {
      about: window.innerHeight * 1.2,
      services: window.innerHeight * 2.4,
      testimonials: window.innerHeight * 3.6,
      contact: window.innerHeight * 4.8
    }
    
    const targetPosition = sectionPositions[sectionId as keyof typeof sectionPositions]
    if (targetPosition) {
      window.scrollTo({ top: targetPosition, behavior: 'smooth' })
    }
  }

  return (
    <nav className="fixed top-0 left-0 w-full z-50 flex items-center justify-between px-10 py-6 bg-white/10 backdrop-blur-sm">
      {/* Company logo */}
      <button 
        onClick={() => scrollToSection('home')}
        className="text-2xl font-bold text-black hover:text-blue-400 transition-colors duration-300"
      >
        EditPro Studio
      </button>

      {/* Navigation links */}
      <ul className="flex gap-10 text-black font-medium tracking-wide">
        {[
          { id: 'about', label: 'About' },
          { id: 'services', label: 'Services' },
          { id: 'testimonials', label: 'Testimonials' },
          { id: 'contact', label: 'Contact' }
        ].map((item) => (
          <li key={item.id}>
            <button
              onClick={() => scrollToSection(item.id)}
              className={`relative hover:text-blue-400 transition-all duration-300 ${
                activeSection === item.id ? 'text-blue-400' : ''
              }`}
            >
              {item.label}
              <span 
                className={`absolute -bottom-1 left-0 h-0.5 bg-blue-400 transition-all duration-300 ${
                  activeSection === item.id ? 'w-full' : 'w-0 group-hover:w-full'
                }`}
              />
            </button>
          </li>
        ))}
      </ul>
    </nav>
  )
}