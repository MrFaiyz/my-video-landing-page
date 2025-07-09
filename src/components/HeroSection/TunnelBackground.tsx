import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Mesh } from 'three'
import { MotionValue } from 'framer-motion'

export const TunnelBackground = ({ scrollProgress }: { scrollProgress: MotionValue<number> }) => {
  const filmStripRef = useRef<Mesh>(null)
  const playButtonRef = useRef<Mesh>(null)
  const timelineRef = useRef<Mesh>(null)
  const particlesRef = useRef<Mesh[]>([])

  useFrame((state) => {
    const time = state.clock.elapsedTime
    const currentScrollProgress = scrollProgress.get()
    
    // Animate film strip circle
    if (filmStripRef.current) {
      filmStripRef.current.rotation.z = time * 0.02
      const scale = 1 + currentScrollProgress * 1.5
      filmStripRef.current.scale.setScalar(scale)
      
      if (filmStripRef.current.material && 'opacity' in filmStripRef.current.material) {
        const opacity = Math.max(0.03, 0.12 - currentScrollProgress * 0.08)
        filmStripRef.current.material.opacity = opacity
      }
    }
    
    // Animate play button
    if (playButtonRef.current) {
      playButtonRef.current.rotation.z = Math.sin(time * 0.5) * 0.1
      const scale = 0.8 + Math.sin(time * 0.8) * 0.1 + currentScrollProgress * 0.5
      playButtonRef.current.scale.setScalar(scale)
      
      if (playButtonRef.current.material && 'opacity' in playButtonRef.current.material) {
        const opacity = Math.max(0.05, 0.15 - currentScrollProgress * 0.1)
        playButtonRef.current.material.opacity = opacity
      }
    }
    
    // Animate timeline
    if (timelineRef.current) {
      timelineRef.current.position.x = Math.sin(time * 0.3) * 0.2
      const scale = 1 + currentScrollProgress * 0.8
      timelineRef.current.scale.setScalar(scale)
      
      if (timelineRef.current.material && 'opacity' in timelineRef.current.material) {
        const opacity = Math.max(0.02, 0.08 - currentScrollProgress * 0.05)
        timelineRef.current.material.opacity = opacity
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
      {/* Film strip circle - represents video editing */}
      <mesh
        ref={filmStripRef}
        position={[0, 0, -12]}
      >
        <torusGeometry args={[6, 0.3, 8, 32]} />
        <meshStandardMaterial
          color="#2a2a2a"
          transparent
          opacity={0.12}
          emissive="#1a1a1a"
          emissiveIntensity={0.1}
        />
      </mesh>
      
      {/* Play button symbol in center */}
      <mesh
        ref={playButtonRef}
        position={[0, 0, -10]}
      >
        <coneGeometry args={[1.2, 2, 3]} />
        <meshStandardMaterial
          color="#3ac4ec"
          transparent
          opacity={0.15}
          emissive="#3ac4ec"
          emissiveIntensity={0.1}
        />
      </mesh>
      
      {/* Timeline bar - represents video editing timeline */}
      <mesh
        ref={timelineRef}
        position={[0, -4, -8]}
      >
        <boxGeometry args={[12, 0.2, 0.1]} />
        <meshStandardMaterial
          color="#FF4C4C"
          transparent
          opacity={0.08}
          emissive="#FF4C4C"
          emissiveIntensity={0.05}
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
          <sphereGeometry args={[0.02, 6, 6]} />
          <meshStandardMaterial
            color="#f1f3f4"
            transparent
            opacity={0.3}
            emissive="#ffffff"
            emissiveIntensity={0.05}
          />
        </mesh>
      ))}
    </group>
  )
}