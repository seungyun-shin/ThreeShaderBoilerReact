import React, { useRef, useMemo, useCallback} from 'react'
import * as THREE from "three";
import { BufferAttribute } from 'three';

// reset Styles
import "../App.scss"

//R3F
import { Canvas, useFrame, extend  } from '@react-three/fiber'

// Deai - R3F
import { softShadows, MeshWobbleMaterial, MeshDistortMaterial, OrbitControls, shaderMaterial, perspectiveCamera } from "@react-three/drei";

// shader texture
import mask from '../imgs/particle.jpeg'
import t1 from '../imgs/colorcaspi.jpg'
import t2 from '../imgs/back10.jpg'

const MeshModel = ({}) => {
 
    //shader
    const fragmentShader = `
    varying vec2 vCoordinates;
    void main() {
        gl_FragColor = vec4(vCoordinates.x/512., vCoordinates.y/512., 0., 1.);
    }
    `
    const vertexShader = `
    varying vec2 vUv;
    varying vec2 vCoordinates;
    attribute vec3 aCoordinates;
    void main() {
        vUv = uv;

        vec4 mvPosition = modelViewMatrix * vec4( position, 1.);
        gl_PointSize = 2000. * (1. / - mvPosition.z);
        gl_Position = projectionMatrix * mvPosition;

        vCoordinates = aCoordinates.xy;
    }
    `

    const textures = [
        new THREE.TextureLoader().load(t1),
        new THREE.TextureLoader().load(t2),
    ]

    const uniforms = {
        progress: {type: "f", value: 0},
        t1: {type:"t", value: textures[0]},
        t2: {type:"t", value: textures[1]},
        // mask: {type:"t", value: this.mask},
        // mousePressed: {type:"f", value: 0},
        // mouse: {type: "v2", value: null},
        // transition: {type: "f", value: null},
        // move: {type:"f", value: 0},
        // time: {type:"f", value: 0},
    }

    const number = 512*512;
    const initialPositions = []
    const initialCoordinates = []
    let index=0;
    for(let i=0; i <512; i++){
        let posX = i - 256;
        for(let j =0; j<512; j++){
            // positions.setXYZ(index, i*2 ,j*2 , 0)
            // this.coordinates.setXYZ(index, i, j, 0)
            // this.offset.setX(index, rand(-1000, 1000))
            // this.speeds.setX(index, rand(0.4, 1))
            // this.direction.setX(index, Math.random() > 0.5 ? 1:-1)
            // this.press.setX(index, rand(0.4, 1))
            initialPositions.push(posX*2)
            initialPositions.push((j-256)*2)
            initialPositions.push(0)

            initialCoordinates.push(i)
            initialCoordinates.push(j)
            initialCoordinates.push(0)

            index++;
        }
    }
    
    const positions = useMemo(()=>{
        return new Float32Array(initialPositions);
    }, [initialPositions]);

    const coordinates = useMemo(()=>{
        return new Float32Array(initialCoordinates);
    }, [initialCoordinates]);

    const mesh = useRef();
      //useFrame allows us to re-render/update rotation on each frame
    // useFrame(() => (
    //     mesh.current.rotation.x = mesh.current.rotation.y += 0.01
    // ));
    
    return (
        // <perspectiveCamera fov={70} position={[0,0,500]} aspect={window.innerWidth/window.innerHeight} near={0.1} far={3000} >
        <points
            ref={mesh}
        >
            {/* <planeBufferGeometry attach='geometry' args={[1000,1000,10,10]} /> */}
            <bufferGeometry attach='geometry'>
                <bufferAttribute
                    attachObject={['attributes', 'position']}
                    array={positions}
                    count={positions.length / 3}
                    itemSize={3}
                />
                <bufferAttribute
                    attachObject={['attributes', 'aCoordinates']}
                    array={coordinates}
                    count={coordinates.length / 3}
                    itemSize={3}
                />
            </bufferGeometry>

            <shaderMaterial attach="material" uniforms={uniforms} fragmentShader={fragmentShader} vertexShader={vertexShader} side={THREE.DoubleSide} />
 
            {/* <shaderMaterial attach="material" color="hotpink" time={1} /> */}
            {/* <meshNormalMaterial side={THREE.DoubleSide}/> */}
        </points>
        // </perspectiveCamera>
    )
}


function HomeMainModel() {
    return (
        <>
            <Canvas camera={{ fov: 70, position: [0, 0, 1000], near:0.1, far:3000}}>
                <MeshModel/>
                <OrbitControls />
            </Canvas>
        </>
    )
}

export default HomeMainModel
