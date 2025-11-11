import React, { Suspense, useRef } from 'react'
import * as THREE from 'three'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Html, Environment, MeshReflectorMaterial, Sky } from '@react-three/drei'
import { PuchModel } from '../Components/PuchModel' // ruta relativa

const Puch = () => {
  return (
  
    <div
      style={{
        width: '100%',
        height: '100vh',
        position: 'relative',
        overflow: 'hidden',
        background: 'linear-gradient(180deg, #FFF1E0 0%, #FFD0A6 35%, #FF9E63 60%, #6B2A73 100%)',
      }}>

      {/* Overlay de texto en la esquina superior derecha usando Tailwind (sin padding ni estilos inline) */}
      <div className="absolute top-25 right-30 z-20 text-white font-semibold text-5xl pointer-events-none translate-x-2">
        ¿Pekenia miffy a domde va?
  <br />
  <span className="ml-11 inline-block">la epstraño y adoro yo.</span>
    
    </div>
      {/* Ajusté la cámara más atrás para hacer zoom-out por defecto */}
      <Canvas
        shadows
        camera={{ position: [0, 1.6, 8], fov: 50 }}
        gl={{ outputEncoding: THREE.sRGBEncoding, toneMapping: THREE.ACESFilmicToneMapping, physicallyCorrectLights: true }}
      >
        {/* Luces básicas: hemisphere para iluminación ambiente con color, + directional para sombras */}
        <hemisphereLight intensity={0.35} skyColor={0xffffff} groundColor={0x444444} />
        <directionalLight position={[5, 10, 5]} intensity={1.2} castShadow />

  {/* Environment añade iluminación PBR (reflejos / colores más realistas) y se usa como fondo de la escena */}
  <Environment preset="sunset" background />
  {/* Sky añade un cielo procedural, puedes quitarlo si prefieres sólo el Environment HDRI */}
  <Sky sunPosition={[12, 0.7, 4]} inclination={0.45} azimuth={0.25} distance={450000} />

  {/* Agua (plano reflectante) */}
  <OceanPlane />

        {/* Cargar modelo */}
        <Suspense fallback={<Html center>Loading...</Html>}>
          {/* Escala reducida para encajar mejor en cámara; ajusta según tu modelo */}
          {/* Bajamos el barco respecto al origen para centrarlo más en la página */}
          <FloatingBoat baseY={-0.6} amplitude={0.06} speed={0.8}>
            <PuchModel scale={0.025} position={[-1, 0, -2]} rotation={[0, 12.4, 0]}    />
          </FloatingBoat>
        </Suspense>

        {/* Controles: permite zoom (mouse wheel) y limitamos distancia para evitar alejar demasiado */}
        {/* <OrbitControls makeDefault minDistance={2} maxDistance={30} /> */}
      </Canvas>
    </div>
  )
}

export default Puch

function FloatingBoat({ children, amplitude = 0.08, speed = 1, baseY = 0 }) {
  const ref = useRef()
  useFrame((state) => {
    const t = state.clock.elapsedTime * speed
    if (ref.current) {
      // bob up/down around provided baseY
      ref.current.position.y = baseY + Math.sin(t) * amplitude
      // small roll/sway
      ref.current.rotation.z = Math.sin(t * 0.6) * amplitude * 0.5
    }
  })
  return <group ref={ref}>{children}</group>
}

function OceanPlane() {
  return (
    <mesh rotation-x={-Math.PI / 2} position={[0, -2, 0]} receiveShadow>
      <planeGeometry args={[200, 200]} />
      <MeshReflectorMaterial
        blur={[400, 100]}
        mixBlur={1}
        mixStrength={0.8}
        resolution={1024}
        depthScale={1.2}
        minDepthThreshold={0.4}
        maxDepthThreshold={1.25}
        color="#0b4f6c"
        metalness={0.2}
        roughness={0.4}
        mirror={0.6}
      />
    </mesh>
  )
}