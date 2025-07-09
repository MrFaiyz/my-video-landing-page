import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Mesh } from 'three'

export const TunnelBackground = ({ progress }: { progress: number }) => {
  const tunnelRef = useRef<Mesh[]>([])

  useFrame(() => {
    tunnelRef.current.forEach((plane, index) => {
      if (plane) {
        // Move planes based on scroll progress
        plane.position.z = -index * 3 + progress * 15
        
        // Reset position when plane goes too far
        if (plane.position.z > 10) {
          plane.position.z = -30
        }
        
        // Subtle rotation
        plane.rotation.z = Math.sin(Date.now() * 0.001 + index) * 0.02
      }
    })
  })

  const planes = Array.from({ length: 12 }, (_, i) => (
    <mesh
      key={i}
      ref={(el) => {
        if (el) tunnelRef.current[i] = el
      }}
      position={[0, 0, -i * 3]}
    >
      <planeGeometry args={[20, 20]} />
      <meshStandardMaterial
        color="#ffffff"
        transparent
        opacity={0.1 - i * 0.005}
        wireframe={i % 2 === 0}
      />
    </mesh>
  ))

  return <group>{planes}</group>
}