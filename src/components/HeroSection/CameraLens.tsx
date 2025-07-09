import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Mesh } from 'three'

export const CameraLens = ({ scrollProgress }: { scrollProgress: number }) => {
  const outerRingRef = useRef<Mesh>(null)
  const innerRingRef = useRef<Mesh>(null)
  const lensGlassRef = useRef<Mesh>(null)
  const apertureRef = useRef<any>(null)

  useFrame((state) => {
    const time = state.clock.elapsedTime
    
    if (outerRingRef.current) {
      // Smooth rotation
      outerRingRef.current.rotation.z = time * 0.1
      
      // Scale based on scroll - lens expands as you scroll down
      const scale = 1 + scrollProgress * 3
      outerRingRef.current.scale.setScalar(scale)
    }
    
    if (innerRingRef.current) {
      // Counter rotation for dynamic effect
      innerRingRef.current.rotation.z = -time * 0.15
      
      const scale = 1 + scrollProgress * 2.5
      innerRingRef.current.scale.setScalar(scale)
    }
    
    if (lensGlassRef.current) {
      // Subtle pulsing effect
      const pulse = 1 + Math.sin(time * 1.5) * 0.02
      const scale = pulse * (1 + scrollProgress * 2)
      lensGlassRef.current.scale.setScalar(scale)
      
      // Adjust opacity as you scroll deeper
      if (lensGlassRef.current.material && 'opacity' in lensGlassRef.current.material) {
        lensGlassRef.current.material.opacity = Math.max(0.1, 0.6 - scrollProgress * 0.4)
      }
    }
    
    // Animate aperture blades
    if (apertureRef.current) {
      apertureRef.current.children.forEach((blade: any, index: number) => {
        const angle = (index / 6) * Math.PI * 2
        const radius = 1.2 - scrollProgress * 0.8 // Aperture closes as you scroll
        blade.position.x = Math.cos(angle) * radius
        blade.position.y = Math.sin(angle) * radius
        blade.rotation.z = angle + Math.PI / 2
        
        const scale = 1 + scrollProgress * 1.5
        blade.scale.setScalar(scale)
      })
    }
  })

  return (
    <group position={[0, 0, 0]}>
      {/* Outer lens ring - Blue accent */}
      <mesh ref={outerRingRef}>
        <torusGeometry args={[2.5, 0.15, 16, 100]} />
        <meshStandardMaterial
          color="#3ac4ec"
          metalness={0.9}
          roughness={0.1}
          emissive="#3ac4ec"
          emissiveIntensity={0.2}
        />
      </mesh>
      
      {/* Inner lens ring - Red highlight */}
      <mesh ref={innerRingRef}>
        <torusGeometry args={[1.8, 0.1, 16, 100]} />
        <meshStandardMaterial
          color="#FF4C4C"
          metalness={0.8}
          roughness={0.2}
          emissive="#FF4C4C"
          emissiveIntensity={0.3}
        />
      </mesh>
      
      {/* Lens glass center */}
      <mesh ref={lensGlassRef}>
        <circleGeometry args={[1.5, 64]} />
        <meshStandardMaterial
          color="#ffffff"
          transparent
          opacity={0.6}
          metalness={0.95}
          roughness={0.05}
          emissive="#ffffff"
          emissiveIntensity={0.1}
        />
      </mesh>
      
      {/* Aperture blades */}
      <group ref={apertureRef}>
        {Array.from({ length: 6 }, (_, i) => (
          <mesh key={i}>
            <boxGeometry args={[0.05, 0.4, 0.02]} />
            <meshStandardMaterial
              color="#1a1a1a"
              metalness={0.8}
              roughness={0.3}
            />
          </mesh>
        ))}
      </group>
    </group>
  )
}