import { useRef, useMemo, useEffect } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Points, PointMaterial } from '@react-three/drei'
import * as THREE from 'three'

function FloatingShape({ position, rotation, geometry, color, speed, scale = 1 }) {
  const meshRef = useRef()

  useFrame(({ clock }) => {
    const t = clock.elapsedTime * speed
    meshRef.current.rotation.x = rotation[0] + t * 0.25
    meshRef.current.rotation.y = rotation[1] + t * 0.4
    meshRef.current.rotation.z = rotation[2] + t * 0.15
    meshRef.current.position.y = position[1] + Math.sin(t * 0.6) * 0.4
  })

  return (
    <mesh ref={meshRef} position={position} scale={scale}>
      <primitive object={geometry} attach="geometry" />
      <meshStandardMaterial
        color={color}
        wireframe
        transparent
        opacity={0.45}
        emissive={color}
        emissiveIntensity={0.3}
      />
    </mesh>
  )
}

function ParticleField({ count = 4000 }) {
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

function PulsingLight({ position, color, baseIntensity }) {
  const lightRef = useRef()
  useFrame(({ clock }) => {
    lightRef.current.intensity = baseIntensity + Math.sin(clock.elapsedTime * 1.5) * (baseIntensity * 0.4)
  })
  return <pointLight ref={lightRef} position={position} color={color} intensity={baseIntensity} />
}

function MouseTracker() {
  const { camera } = useThree()
  const mouse = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const onMove = (e) => {
      mouse.current.x = (e.clientX / window.innerWidth - 0.5) * 0.8
      mouse.current.y = -(e.clientY / window.innerHeight - 0.5) * 0.4
    }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  useFrame(() => {
    camera.position.x += (mouse.current.x - camera.position.x) * 0.04
    camera.position.y += (mouse.current.y - camera.position.y) * 0.04
    camera.lookAt(0, 0, 0)
  })
  return null
}

const SHAPES = [
  {
    geometry: new THREE.TorusKnotGeometry(0.9, 0.28, 128, 20),
    position: [-4.5, 1.5, -6],
    rotation: [0.4, 0.3, 0],
    color: '#00ff41',
    speed: 0.45,
  },
  {
    geometry: new THREE.IcosahedronGeometry(1.1, 1),
    position: [4.5, -1, -5],
    rotation: [0.2, 0.5, 0.1],
    color: '#39ff14',
    speed: 0.6,
  },
  {
    geometry: new THREE.OctahedronGeometry(1.0, 0),
    position: [-2.5, -3.5, -7],
    rotation: [0.1, 0.2, 0.4],
    color: '#00cc33',
    speed: 0.55,
  },
  {
    geometry: new THREE.TorusGeometry(0.9, 0.32, 18, 80),
    position: [3.5, 3.5, -8],
    rotation: [0.3, 0.1, 0.5],
    color: '#00ff88',
    speed: 0.35,
  },
  {
    geometry: new THREE.IcosahedronGeometry(1.3, 1),
    position: [0.5, 0, -9],
    rotation: [0.5, 0.4, 0.2],
    color: '#00ff41',
    speed: 0.25,
  },
  {
    geometry: new THREE.TetrahedronGeometry(1.2, 0),
    position: [-5.5, -0.5, -7],
    rotation: [0.2, 0.4, 0.1],
    color: '#80ff00',
    speed: 0.7,
  },
  {
    geometry: new THREE.DodecahedronGeometry(0.9, 0),
    position: [5.5, 0.5, -9],
    rotation: [0.3, 0.6, 0.2],
    color: '#008f11',
    speed: 0.5,
  },
]

export default function AbstractScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 70 }}
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      dpr={[1, 2]}
    >
      <fog attach="fog" args={['#000000', 10, 30]} />
      <ambientLight intensity={0.2} color="#003300" />
      <PulsingLight position={[8,  6,  4]} color="#00ff41" baseIntensity={2.5} />
      <PulsingLight position={[-8, -4, -4]} color="#39ff14" baseIntensity={1.5} />
      <PulsingLight position={[0, -6,  2]} color="#00cc33" baseIntensity={1.2} />

      <ParticleField count={3500} />

      {SHAPES.map((s, i) => (
        <FloatingShape key={i} {...s} />
      ))}

      <MouseTracker />
    </Canvas>
  )
}
