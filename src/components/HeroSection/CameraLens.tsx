import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Mesh } from 'three'

export const CameraLens = ({ progress }: { progress: number }) => {
  const lensRef = useRef<Mesh>(null)
  const innerRingRef = useRef<Mesh>(null)
  const centerRef = useRef<Mesh>(null)

  useFrame((state) => {
    const time = state.clock.elapsedTime
    
    if (lensRef.current) {
      // Rotate outer ring
      lensRef.current.rotation.z = time * 0.2
      
      // Scale based on scroll progress - expand when scrolling down
      const scale = 1 + progress * 2
      lensRef.current.scale.setScalar(scale)
      
      // Move lens forward/backward based on scroll
      lensRef.current.position.z = 2 + progress * 5
    }
    
    if (innerRingRef.current) {
      // Counter-rotate inner ring
      innerRingRef.current.rotation.z = -time * 0.3
      
      // Scale inner ring
      const scale = 1 + progress * 1.5
      innerRingRef.current.scale.setScalar(scale)
      innerRingRef.current.position.z = 2.1 + progress * 5
    }
    
    if (centerRef.current) {
      // Pulsing effect on center
      const pulse = 1 + Math.sin(time * 2) * 0.1
      const scale = pulse * (1 + progress * 1.2)
      centerRef.current.scale.setScalar(scale)
      centerRef.current.position.z = 2.2 + progress * 5
      
      // Change opacity based on scroll
      if (centerRef.current.material && 'opacity' in centerRef.current.material) {
        centerRef.current.material.opacity = Math.max(0.1, 0.4 - progress * 0.3)
      }
    }
  })

  return (
    <group>
      {/* Outer lens ring */}
      <mesh ref={lensRef}>
        <torusGeometry args={[3, 0.3, 16, 100]} />
        <meshStandardMaterial
          color="#3ac4ec"
          metalness={0.8}
          roughness={0.2}
          emissive="#3ac4ec"
          emissiveIntensity={0.4}
        />
      </mesh>
      
      {/* Inner lens ring */}
      <mesh ref={innerRingRef}>
        <torusGeometry args={[2, 0.15, 16, 100]} />
        <meshStandardMaterial
          color="#FF4C4C"
          metalness={0.9}
          roughness={0.1}
          emissive="#FF4C4C"
          emissiveIntensity={0.3}
        />
      </mesh>
      
      {/* Center lens glass */}
      <mesh ref={centerRef}>
        <circleGeometry args={[1.8, 64]} />
        <meshStandardMaterial
          color="#ffffff"
          transparent
          opacity={0.4}
          metalness={0.9}
          roughness={0.05}
          emissive="#ffffff"
          emissiveIntensity={0.1}
        />
      </mesh>
      
      {/* Lens aperture blades */}
      {Array.from({ length: 8 }, (_, i) => (
        <mesh
          key={i}
          position={[
            Math.cos((i / 8) * Math.PI * 2) * 1.2,
            Math.sin((i / 8) * Math.PI * 2) * 1.2,
            2.3 + progress * 5
          ]}
          rotation={[0, 0, (i / 8) * Math.PI * 2]}
        >
          <boxGeometry args={[0.1, 0.6, 0.05]} />
          <meshStandardMaterial
            color="#333333"
            metalness={0.7}
            roughness={0.3}
          />
        </mesh>
      ))}
    </group>
  )
}