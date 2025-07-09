import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Mesh } from 'three'
import { MotionValue } from 'framer-motion'

export const TunnelBackground = ({ scrollProgress }: { scrollProgress: MotionValue<number> }) => {
  const outerCircleRef = useRef<Mesh>(null)
  const innerCircleRef = useRef<Mesh>(null)
  const centerDotRef = useRef<Mesh>(null)
  const particlesRef = useRef<Mesh[]>([])

  useFrame((state) => {
    const time = state.clock.elapsedTime
    const currentScrollProgress = scrollProgress.get()
    
    // Animate outer circle
    if (outerCircleRef.current) {
      outerCircleRef.current.rotation.z = time * 0.015
      const scale = 1 + currentScrollProgress * 1.5
      outerCircleRef.current.scale.setScalar(scale)
      
      if (outerCircleRef.current.material && 'opacity' in outerCircleRef.current.material) {
        const opacity = Math.max(0.02, 0.08 - currentScrollProgress * 0.05)
        outerCircleRef.current.material.opacity = opacity
      }
    }
    
    // Animate inner circle
    if (innerCircleRef.current) {
      innerCircleRef.current.rotation.z = -time * 0.025
      const scale = 0.8 + Math.sin(time * 0.6) * 0.05 + currentScrollProgress * 0.8
      innerCircleRef.current.scale.setScalar(scale)
      
      if (innerCircleRef.current.material && 'opacity' in innerCircleRef.current.material) {
        const opacity = Math.max(0.03, 0.1 - currentScrollProgress * 0.06)
        innerCircleRef.current.material.opacity = opacity
      }
    }
    
    // Animate center dot
    if (centerDotRef.current) {
      const pulse = 1 + Math.sin(time * 1.2) * 0.1
      const scale = pulse * (0.5 + currentScrollProgress * 0.3)
      centerDotRef.current.scale.setScalar(scale)
      
      if (centerDotRef.current.material && 'opacity' in centerDotRef.current.material) {
        const opacity = Math.max(0.05, 0.2 - currentScrollProgress * 0.1)
        centerDotRef.current.material.opacity = opacity
      }
    }
    
    // Animate floating particles
    particlesRef.current.forEach((particle, index) => {
      if (particle) {
        particle.position.y += Math.sin(time + index * 2) * 0.005
        particle.position.x += Math.cos(time + index * 1.5) * 0.003
        
        particle.position.z = -8 - index * 1.5 + currentScrollProgress * 12
        
        if (particle.position.z > 3) {
          particle.position.z = -20 - index * 1.5
        }
        
        const distance = Math.abs(particle.position.z)
        const scale = Math.max(0.05, 0.3 - distance * 0.008)
        particle.scale.setScalar(scale)
        
        if (particle.material && 'opacity' in particle.material) {
          const opacity = Math.max(0.05, 0.4 - distance * 0.015)
          particle.material.opacity = opacity
        }
      }
    })
  })

  return (
    <group>
      {/* Outer circle - clean and minimal */}
      <mesh
        ref={outerCircleRef}
        position={[0, 0, -12]}
      >
        <torusGeometry args={[8, 0.15, 16, 64]} />
        <meshStandardMaterial
          color="#e5e7eb"
          transparent
          opacity={0.08}
          emissive="#f3f4f6"
          emissiveIntensity={0.05}
        />
      </mesh>
      
      {/* Inner circle */}
      <mesh
        ref={innerCircleRef}
        position={[0, 0, -10]}
      >
        <torusGeometry args={[4, 0.08, 16, 64]} />
        <meshStandardMaterial
          color="#3ac4ec"
          transparent
          opacity={0.1}
          emissive="#3ac4ec"
          emissiveIntensity={0.05}
        />
      </mesh>
      
      {/* Center dot */}
      <mesh
        ref={centerDotRef}
        position={[0, 0, -8]}
      >
        <sphereGeometry args={[0.3, 16, 16]} />
        <meshStandardMaterial
          color="#FF4C4C"
          transparent
          opacity={0.2}
          emissive="#FF4C4C"
          emissiveIntensity={0.1}
        />
      </mesh>
      
      {/* Subtle floating particles */}
      {Array.from({ length: 8 }, (_, i) => (
        <mesh
          key={`particle-${i}`}
          ref={(el) => {
            if (el) particlesRef.current[i] = el
          }}
          position={[
            (Math.random() - 0.5) * 12,
            (Math.random() - 0.5) * 12,
            -8 - i * 1.5
          ]}
        >
          <sphereGeometry args={[0.015, 8, 8]} />
          <meshStandardMaterial
            color="#f9fafb"
            transparent
            opacity={0.2}
            emissive="#ffffff"
            emissiveIntensity={0.02}
          />
        </mesh>
      ))}
    </group>
  )
}