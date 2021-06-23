import React, { useRef, useMemo, useCallback, Component, useEffect } from 'react'
import * as THREE from "three";
// reset Styles
import "../App.scss"

import fragment from '../shaders/fragment.glsl'
import vertex from '../shaders/vertex.glsl'

import fragmentJS from '../shaders/fragment.js'
import vertexJS from '../shaders/vertex.js'

//R3F
// import { Canvas, useFrame, extend  } from '@react-three/fiber'

// Deai - R3F
// import { softShadows, MeshWobbleMaterial, MeshDistortMaterial, OrbitControls, shaderMaterial, perspectiveCamera } from "@react-three/drei";

// shader texture
import mask from '../imgs/particle.jpeg'
import t1 from '../imgs/colorcaspi.jpg'
import t2 from '../imgs/back10.jpg'

let OrbitControls = require("three-orbit-controls")(THREE);

const MeshModel = () => {
 
    useEffect(() => {

      class Sketch{
        constructor(){

          this.renderer = new THREE.WebGLRenderer( { antialias: true } );
          this.renderer.setSize( window.innerWidth, window.innerHeight );
          document.getElementById('container').appendChild( this.renderer.domElement );

          this.camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 0.01, 3000 );
          this.camera.position.z = 1000;
          this.scene = new THREE.Scene();

          this.textures = [
            new THREE.TextureLoader().load(t1),
            new THREE.TextureLoader().load(t2),
            // new THREE.TextureLoader().load(t3),
            // new THREE.TextureLoader().load(t4),
        ]
        this.mask = new THREE.TextureLoader().load(mask);
        this.time = 0;
        this.move = 0;
        this.controls = new OrbitControls(this.camera, this.renderer.domElement);
          
          this.addMesh();
          this.render();
        }

        addMesh(){

          this.material = new THREE.ShaderMaterial({
            fragmentShader:fragmentJS,
            vertexShader:vertexJS,
            uniforms:{
              progress: {type:"f", value: 0},
              t1: {type:"t", value: this.textures[0]},
              t2: {type:"t", value: this.textures[1]},
              // t3: {type:"t", value: this.textures[2]},
              // t4: {type:"t", value: this.textures[3]},
              // mask: {type:"t", value: this.mask},
              // mousePressed: {type:"f", value: 0},
              // mouse: {type: "v2", value: null},
              // transition: {type: "f", value: null},
              // move: {type:"f", value: 0},
              // time: {type:"f", value: 0},
            },
            side: THREE.DoubleSide,
            transparent: true,
            depthTest: false,
            depthWrite: false,
          })

          let number = 512*512;
          this.geometry = new THREE.BufferGeometry(); 
          this.positions = new THREE.BufferAttribute(new Float32Array(number*3), 3);
          this.coordinates = new THREE.BufferAttribute(new Float32Array(number*3), 3);
          // this.speeds = new THREE.BufferAttribute(new Float32Array(number), 1);
          // this.offset = new THREE.BufferAttribute(new Float32Array(number), 1);
          // this.direction = new THREE.BufferAttribute(new Float32Array(number), 1);
          // this.press = new THREE.BufferAttribute(new Float32Array(number), 1);

          let index = 0;
          for (let i = 0; i < 512; i++){
            let posX = i - 256;
            for(let j = 0; j < 512; j++){
                this.positions.setXYZ(index, posX*2,(j-256)*2,0)
                this.coordinates.setXYZ(index, i, j, 0)
                // this.offset.setX(index, rand(-1000, 1000))
                // this.speeds.setX(index, rand(0.4, 1))
                // this.direction.setX(index, Math.random() > 0.5 ? 1:-1)
                // this.press.setX(index, rand(0.4, 1))
                index++;
            }
          } 

          this.geometry.setAttribute("position", this.positions)
          this.geometry.setAttribute("aCoordinates", this.coordinates)
          // this.geometry.setAttribute("aOffset", this.offset)
          // this.geometry.setAttribute("aSpeed", this.speeds)
          // this.geometry.setAttribute("aPress", this.press)
          // this.geometry.setAttribute("aDirection", this.direction)

          this.mesh = new THREE.Points( this.geometry, this.material );
          this.scene.add( this.mesh );
        }

        render(){
          this.time++;
          // this.mesh.rotation.x += 0.01;
          // this.mesh.rotation.y += 0.02;
          this.renderer.render( this.scene, this.camera );
          window.requestAnimationFrame(this.render.bind(this));
        }
      }
      new Sketch();

    }, []);

    return (
        <>
          <div id="container"/>
        </>
    );
}


function HomeMainModel() {
    return (
        <>
            <MeshModel/>
        </>
    )
}

export default HomeMainModel
