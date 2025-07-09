import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Mesh } from 'three'
import { Text } from '@react-three/drei'

const iconPositions = [
  { pos: [-8, 4, -5], name: 'Premiere', color: '#9999FF' },
  { pos: [8, 3, -3], name: 'After Effects', color: '#9999FF' },
  { pos: [-6, -3, -7], name: 'CapCut', color: '#FF4C4C' },
  { pos: [7, -4, -4], name: 'Filmora', color: '#3ac4ec' },
  { pos: [-9, 1, -2], name: 'DaVinci', color: '#FF4C4C' },
  { pos: [5, 5, -6], name: 'Final Cut', color: '#3ac4ec' },
]

export const FloatingIcons = ({ progress }: { progress: number }) => {
  const groupRef = useRef<any>(null)

  useFrame((state) => {
    if (groupRef.current) {
      // Rotate the entire group slowly
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.05
      
      groupRef.current.children.forEach((child: any, index: number) => {
        // Float up and down
        child.position.y += Math.sin(state.clock.elapsedTime + index) * 0.02
        
        // Gentle rotation
        child.rotation.z = Math.sin(state.clock.elapsedTime + index) * 0.1
        
        // Move icons based on scroll progress
        const originalZ = iconPositions[index]?.pos[2] || -5
        child.position.z = originalZ + progress * 20
        
        // Scale based on distance for depth effect
        const distance = Math.abs(child.position.z)
        const scale = Math.max(0.3, 1 - distance * 0.02)
        child.scale.setScalar(scale)
        
        // Opacity based on scroll progress
        if (child.children[0]?.material && 'opacity' in child.children[0].material) {
          child.children[0].material.opacity = Math.max(0.2, 0.8 - progress * 0.4)
        }
      })
    }
  })

  return (
    <group ref={groupRef}>
      {iconPositions.map((icon, index) => (
        <group key={index} position={icon.pos}>
          <mesh>
            <boxGeometry args={[1.2, 1.2, 0.2]} />
            <meshStandardMaterial 
              color={icon.color} 
              transparent 
              opacity={0.8}
              emissive={icon.color}
              emissiveIntensity={0.3}
              metalness={0.5}
              roughness={0.3}
            />
          </mesh>
          <Text
            position={[0, -1.2, 0]}
            fontSize={0.4}
            color="white"
            anchorX="center"
            anchorY="middle"
          >
            {icon.name}
          </Text>
        </group>
      ))}
    </group>
  )
}