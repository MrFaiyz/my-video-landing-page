import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Mesh } from 'three'
import { Text } from '@react-three/drei'

const iconPositions = [
  { pos: [-6, 3, -2], name: 'Premiere', color: '#9999FF' },
  { pos: [6, 2, -1], name: 'After Effects', color: '#9999FF' },
  { pos: [-4, -2, -3], name: 'CapCut', color: '#FF4C4C' },
  { pos: [5, -3, -2], name: 'Filmora', color: '#3ac4ec' },
  { pos: [-7, 0, -1], name: 'DaVinci', color: '#FF4C4C' },
]

export const FloatingIcons = ({ progress }: { progress: number }) => {
  const groupRef = useRef<any>(null)

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.1
      groupRef.current.children.forEach((child: any, index: number) => {
        child.position.y += Math.sin(state.clock.elapsedTime + index) * 0.01
        child.rotation.z = Math.sin(state.clock.elapsedTime + index) * 0.1
      })
    }
  })

  return (
    <group ref={groupRef}>
      {iconPositions.map((icon, index) => (
        <group key={index} position={icon.pos}>
          <mesh>
            <boxGeometry args={[0.8, 0.8, 0.1]} />
            <meshStandardMaterial 
              color={icon.color} 
              transparent 
              opacity={0.8 - progress * 0.3}
              emissive={icon.color}
              emissiveIntensity={0.2}
            />
          </mesh>
          <Text
            position={[0, -0.8, 0]}
            fontSize={0.3}
            color="black"
            anchorX="center"
            anchorY="middle"
            font="/fonts/inter-medium.woff"
          >
            {icon.name}
          </Text>
        </group>
      ))}
    </group>
  )
}