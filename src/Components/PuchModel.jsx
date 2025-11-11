import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export function PuchModel(props) {
  const { nodes, materials } = useGLTF('/miffy_on_a_boat_to_banda_islands.glb')
  return (
    <group {...props} dispose={null}>
      <group position={[6.183, 128.197, -226.957]} rotation={[Math.PI / 2, 0, 0.054]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_2.geometry}
          material={materials['Scene_-_Root']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_3.geometry}
          material={materials['Scene_-_Root']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_4.geometry}
          material={materials['Scene_-_Root']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_5.geometry}
          material={materials['Scene_-_Root']}
        />
      </group>
    </group>
  )
}

useGLTF.preload('/miffy_on_a_boat_to_banda_islands.glb')
