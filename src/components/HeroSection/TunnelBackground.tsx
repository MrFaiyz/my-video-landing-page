import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Mesh } from 'three'

export const TunnelBackground = ({ progress }: { progress: number }) => {
  const tunnelRef = useRef<Mesh[]>([])

  useFrame((state) => {
    tunnelRef.current.forEach((ring, index) => {
      if (ring) {
        // Create tunnel effect - rings move towards camera based on scroll
        const baseZ = -index * 4 - 10
        ring.position.z = baseZ + progress * 50
        
        // Reset ring position when it goes too far forward
        if (ring.position.z > 15) {
          ring.position.z = baseZ - 40
        }
        
        // Scale rings based on distance for perspective effect
        const distance = Math.abs(ring.position.z)
        const scale = Math.max(0.1, 1 - distance * 0.02)
        ring.scale.setScalar(scale)
        
        // Subtle rotation for dynamic effect
        ring.rotation.z += 0.005 + index * 0.001
        
        // Opacity based on distance
        if (ring.material && 'opacity' in ring.material) {
          ring.material.opacity = Math.max(0.05, 0.3 - distance * 0.01)
        }
      }
    })
  })

  // Create more rings for better tunnel effect
  const rings = Array.from({ length: 20 }, (_, i) => (
    <mesh
      key={i}
      ref={(el) => {
        if (el) tunnelRef.current[i] = el
      }}
      position={[0, 0, -i * 4 - 10]}
    >
      <torusGeometry args={[8 + i * 0.5, 0.1, 8, 32]} />
      <meshStandardMaterial
        color={i % 3 === 0 ? "#3ac4ec" : i % 3 === 1 ? "#FF4C4C" : "#ffffff"}
        transparent
        opacity={0.3}
        emissive={i % 3 === 0 ? "#3ac4ec" : i % 3 === 1 ? "#FF4C4C" : "#ffffff"}
        emissiveIntensity={0.1}
      />
    </mesh>
  ))

  return <group>{rings}</group>
}