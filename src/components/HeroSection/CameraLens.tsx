import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Mesh } from 'three'

export const CameraLens = ({ progress }: { progress: number }) => {
  const lensRef = useRef<Mesh>(null)
  const innerRingRef = useRef<Mesh>(null)

  useFrame((state) => {
    if (lensRef.current) {
      lensRef.current.rotation.z = state.clock.elapsedTime * 0.2
      lensRef.current.scale.setScalar(1 + Math.sin(state.clock.elapsedTime) * 0.05)
    }
    if (innerRingRef.current) {
      innerRingRef.current.rotation.z = -state.clock.elapsedTime * 0.3
    }
  })

  return (
    <group position={[0, 0, 2]}>
      {/* Outer lens ring */}
      <mesh ref={lensRef}>
        <torusGeometry args={[2, 0.2, 16, 100]} />
        <meshStandardMaterial
          color="#3ac4ec"
          metalness={0.8}
          roughness={0.2}
          emissive="#3ac4ec"
          emissiveIntensity={0.3}
        />
      </mesh>
      
      {/* Inner lens ring */}
      <mesh ref={innerRingRef}>
        <torusGeometry args={[1.5, 0.1, 16, 100]} />
        <meshStandardMaterial
          color="#FF4C4C"
          metalness={0.9}
          roughness={0.1}
          emissive="#FF4C4C"
          emissiveIntensity={0.2}
        />
      </mesh>
      
      {/* Center lens glass */}
      <mesh>
        <circleGeometry args={[1.3, 64]} />
        <meshStandardMaterial
          color="#ffffff"
          transparent
          opacity={0.3}
          metalness={0.9}
          roughness={0.05}
        />
      </mesh>
    </group>
  )
}