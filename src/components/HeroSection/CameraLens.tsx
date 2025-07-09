import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Mesh, MeshStandardMaterial } from 'three'

export const CameraLens = ({ progress }: { progress: number }) => {
  const lensRef = useRef<Mesh>(null)
  const glassRef = useRef<MeshStandardMaterial>(null)

  useFrame(() => {
    if (lensRef.current) {
      lensRef.current.position.z = -progress * 5
      lensRef.current.rotation.x = progress * 0.2
      lensRef.current.scale.setScalar(1 - progress * 0.2)
    }
    if (glassRef.current) {
      glassRef.current.opacity = 1 - progress * 0.5
    }
  })

  return (
    <group position={[0, 0, 0]}>
      {/* Lens body */}
      <mesh ref={lensRef} castShadow receiveShadow>
        <cylinderGeometry args={[2, 2, 1, 64]} />
        <meshStandardMaterial color="#fff" metalness={0.8} roughness={0.2} envMapIntensity={1} />
      </mesh>
      {/* Front glass */}
      <mesh position={[0, 0, 0.51]}>
        <circleGeometry args={[1.95, 64]} />
        <meshStandardMaterial
          ref={glassRef}
          color="#fff"
          transparent
          opacity={1}
          roughness={0.05}
          metalness={0.9}
          envMapIntensity={1}
        />
      </mesh>
    </group>
  )
}