import { useRef } from 'react'
import { useFrame, extend } from '@react-three/fiber'
import { Mesh } from 'three'
import { Text, RoundedBox } from '@react-three/drei'
import { MotionValue } from 'framer-motion'

const iconData = [
  { pos: [-6, 3, -8], name: 'Premiere', color: '#9999FF', size: 0.8 },
  { pos: [6, 2, -6], name: 'After Effects', color: '#9999FF', size: 0.7 },
  { pos: [-4, -2, -10], name: 'CapCut', color: '#FF4C4C', size: 0.9 },
  { pos: [5, -3, -7], name: 'Filmora', color: '#3ac4ec', size: 0.8 },
  { pos: [-7, 0, -5], name: 'DaVinci', color: '#FF4C4C', size: 0.85 },
  { pos: [3, 4, -9], name: 'Final Cut', color: '#3ac4ec', size: 0.75 },
]

export const FloatingIcons = ({ scrollProgress }: { scrollProgress: MotionValue<number> }) => {
  const groupRef = useRef<any>(null)

  useFrame((state) => {
    const time = state.clock.elapsedTime
    const currentScrollProgress = scrollProgress.get()
    
    if (groupRef.current) {
      // Slow orbital rotation
      groupRef.current.rotation.y = time * 0.03
      
      groupRef.current.children.forEach((iconGroup: any, index: number) => {
        const iconInfo = iconData[index]
        if (!iconInfo) return
        
        // Floating animation
        iconGroup.position.y = iconInfo.pos[1] + Math.sin(time + index * 2) * 0.3
        iconGroup.position.x = iconInfo.pos[0] + Math.cos(time + index * 1.5) * 0.2
        
        // Move through tunnel based on scroll
        const baseZ = iconInfo.pos[2]
        iconGroup.position.z = baseZ + currentScrollProgress * 25
        
        // Reset position when too close
        if (iconGroup.position.z > 8) {
          iconGroup.position.z = baseZ - 20
        }
        
        // Scale based on distance for depth
        const distance = Math.abs(iconGroup.position.z)
        const scale = Math.max(0.2, iconInfo.size * (1 - distance * 0.03))
        iconGroup.scale.setScalar(scale)
        
        // Gentle rotation
        iconGroup.rotation.z = Math.sin(time + index) * 0.1
        
        // Opacity based on scroll and distance
        const opacity = Math.max(0.3, 0.9 - currentScrollProgress * 0.3 - distance * 0.02)
        if (iconGroup.children[0]?.material && 'opacity' in iconGroup.children[0].material) {
          iconGroup.children[0].material.opacity = opacity
        }
      })
    }
  })

  return (
    <group ref={groupRef}>
      {iconData.map((icon, index) => (
        <group key={index} position={icon.pos}>
          {/* Icon cube */}
          <RoundedBox
            args={[1, 1, 0.2]}
            radius={0.05}
            smoothness={4}
          >
            <meshStandardMaterial 
              color={icon.color}
              transparent 
              opacity={0.9}
              emissive={icon.color}
              emissiveIntensity={0.2}
              metalness={0.6}
              roughness={0.4}
            />
          </RoundedBox>
          
          {/* Icon label */}
          <Text
            position={[0, -0.8, 0]}
            fontSize={0.25}
            color="#ffffff"
            anchorX="center"
            anchorY="middle"
            outlineWidth={0.02}
            outlineColor="#000000"
          >
            {icon.name}
          </Text>
        </group>
      ))}
    </group>
  )
}