import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Mesh } from 'three'
import { MotionValue } from 'framer-motion'

export const TunnelBackground = ({ scrollProgress }: { scrollProgress: MotionValue<number> }) => {
  const circleRef = useRef<Mesh>(null)
  const particlesRef = useRef<Mesh[]>([])

  useFrame((state) => {
    const time = state.clock.elapsedTime
    const currentScrollProgress = scrollProgress.get()
    
    // Animate main circle
    if (circleRef.current) {
      // Gentle rotation
      circleRef.current.rotation.z = time * 0.05
      
      // Scale based on scroll - grows as you scroll
      const scale = 1 + currentScrollProgress * 2
      circleRef.current.scale.setScalar(scale)
      
      // Fade out as you scroll deeper
      if (circleRef.current.material && 'opacity' in circleRef.current.material) {
        const opacity = Math.max(0.02, 0.08 - currentScrollProgress * 0.04)
        circleRef.current.material.opacity = opacity
      }
    }
    
    // Animate floating particles
    particlesRef.current.forEach((particle, index) => {
      if (particle) {
        // Gentle floating motion
        particle.position.y += Math.sin(time + index * 2) * 0.008
        particle.position.x += Math.cos(time + index * 1.5) * 0.005
        
        // Move particles based on scroll
        particle.position.z = -10 - index * 2 + currentScrollProgress * 15
        
        // Reset particle position when too close
        if (particle.position.z > 5) {
          particle.position.z = -30 - index * 2
        }
        
        // Scale based on distance for depth
        const distance = Math.abs(particle.position.z)
        const scale = Math.max(0.1, 0.5 - distance * 0.01)
        particle.scale.setScalar(scale)
        
        // Opacity based on distance
        if (particle.material && 'opacity' in particle.material) {
          const opacity = Math.max(0.1, 0.6 - distance * 0.02)
          particle.material.opacity = opacity
        }
      }
    })
  })

  return (
    <group>
      {/* Simple background circle - very subtle */}
      <mesh
        ref={circleRef}
        position={[0, 0, -15]}
      >
        <circleGeometry args={[8, 64]} />
        <meshStandardMaterial
          color="#f8f9fa"
          transparent
          opacity={0.08}
          side={2} // DoubleSide
        />
      </mesh>
      
      {/* Minimal floating particles for subtle depth */}
      {Array.from({ length: 12 }, (_, i) => (
        <mesh
          key={`particle-${i}`}
          ref={(el) => {
            if (el) particlesRef.current[i] = el
          }}
          position={[
            (Math.random() - 0.5) * 15,
            (Math.random() - 0.5) * 15,
            -10 - i * 2
          ]}
        >
          <sphereGeometry args={[0.03, 8, 8]} />
          <meshStandardMaterial
            color="#e9ecef"
            transparent
            opacity={0.4}
            emissive="#ffffff"
            emissiveIntensity={0.1}
          />
        </mesh>
      ))}
    </group>
  )
}