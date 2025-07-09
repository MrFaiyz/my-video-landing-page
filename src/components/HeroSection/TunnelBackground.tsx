import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Mesh } from 'three'

export const TunnelBackground = ({ scrollProgress }: { scrollProgress: number }) => {
  const ringsRef = useRef<Mesh[]>([])
  const particlesRef = useRef<Mesh[]>([])

  useFrame((state) => {
    const time = state.clock.elapsedTime
    
    // Animate tunnel rings
    ringsRef.current.forEach((ring, index) => {
      if (ring) {
        // Move rings toward camera based on scroll
        const baseZ = -index * 5 - 10
        ring.position.z = baseZ + scrollProgress * 60
        
        // Reset ring when it passes camera
        if (ring.position.z > 10) {
          ring.position.z = baseZ - 50
        }
        
        // Scale for perspective
        const distance = Math.abs(ring.position.z)
        const scale = Math.max(0.1, 2 - distance * 0.05)
        ring.scale.setScalar(scale)
        
        // Subtle rotation
        ring.rotation.z = time * 0.02 + index * 0.1
        
        // Opacity based on distance
        if (ring.material && 'opacity' in ring.material) {
          const opacity = Math.max(0.02, 0.15 - distance * 0.008)
          ring.material.opacity = opacity
        }
      }
    })
    
    // Animate floating particles
    particlesRef.current.forEach((particle, index) => {
      if (particle) {
        // Move particles through tunnel
        particle.position.z += 0.1 + scrollProgress * 0.2
        
        // Reset particle position
        if (particle.position.z > 15) {
          particle.position.z = -50
          particle.position.x = (Math.random() - 0.5) * 20
          particle.position.y = (Math.random() - 0.5) * 20
        }
        
        // Gentle floating motion
        particle.position.y += Math.sin(time + index) * 0.01
        particle.position.x += Math.cos(time + index * 0.5) * 0.005
        
        // Scale based on distance
        const distance = Math.abs(particle.position.z)
        const scale = Math.max(0.1, 1 - distance * 0.02)
        particle.scale.setScalar(scale)
      }
    })
  })

  return (
    <group>
      {/* Tunnel rings */}
      {Array.from({ length: 15 }, (_, i) => (
        <mesh
          key={`ring-${i}`}
          ref={(el) => {
            if (el) ringsRef.current[i] = el
          }}
          position={[0, 0, -i * 5 - 10]}
        >
          <torusGeometry args={[6 + i * 0.3, 0.05, 8, 32]} />
          <meshStandardMaterial
            color="#ffffff"
            transparent
            opacity={0.15}
            emissive="#ffffff"
            emissiveIntensity={0.05}
          />
        </mesh>
      ))}
      
      {/* Floating particles for depth */}
      {Array.from({ length: 30 }, (_, i) => (
        <mesh
          key={`particle-${i}`}
          ref={(el) => {
            if (el) particlesRef.current[i] = el
          }}
          position={[
            (Math.random() - 0.5) * 20,
            (Math.random() - 0.5) * 20,
            -Math.random() * 50 - 10
          ]}
        >
          <sphereGeometry args={[0.02, 8, 8]} />
          <meshStandardMaterial
            color={i % 3 === 0 ? "#3ac4ec" : i % 3 === 1 ? "#FF4C4C" : "#ffffff"}
            emissive={i % 3 === 0 ? "#3ac4ec" : i % 3 === 1 ? "#FF4C4C" : "#ffffff"}
            emissiveIntensity={0.5}
          />
        </mesh>
      ))}
    </group>
  )
}