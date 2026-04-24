import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Points, PointMaterial } from '@react-three/drei'

function Stars({ count = 4000 }) {
  const ref = useRef()

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      const r = 22
      pos[i * 3]     = (Math.random() - 0.5) * r * 2
      pos[i * 3 + 1] = (Math.random() - 0.5) * r * 2
      pos[i * 3 + 2] = (Math.random() - 0.5) * r * 2
    }
    return pos
  }, [count])

  useFrame(({ clock }) => {
    ref.current.rotation.x = clock.elapsedTime * 0.018
    ref.current.rotation.y = clock.elapsedTime * 0.025
  })

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#00ff41"
        size={0.045}
        sizeAttenuation
        depthWrite={false}
        opacity={0.75}
      />
    </Points>
  )
}

export default function StarField() {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 70 }}
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      dpr={[1, 2]}
    >
      <Stars count={4000} />
    </Canvas>
  )
}
