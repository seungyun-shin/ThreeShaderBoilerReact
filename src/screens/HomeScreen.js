import React, { Component } from "react";
import { Shaders, Node, GLSL } from "gl-react";
import { Surface } from "gl-react-dom";

// Style Components
import { Container } from "../styles/homeStyle"

// component
import HomeMainModel from '../components/HomeMainModel'

// //R3F
// import { Canvas, useFrame } from "react-three-fiber";
// // Deai - R3F
// import { softShadows, MeshWobbleMaterial, MeshDistortMaterial, OrbitControls } from "drei";

// in gl-react you need to statically define "shaders":
const shaders = Shaders.create({
    helloGL: {
  // This is our first fragment shader in GLSL language (OpenGL Shading Language)
  // (GLSL code gets compiled and run on the GPU)
      frag: GLSL`
        precision highp float;
        varying vec2 uv;
        void main() {
            gl_FragColor = vec4(uv.x, uv.y, 0.5, 1.0);
        }
    `
    }
});

function HomeScreen() {
    return (
        <>
            {/* <Container>
                <Surface width={300} height={300}>
                    <Node shader={shaders.helloGL} />
                </Surface>
            </Container> */}
            <HomeMainModel/>
        </>
    )
}


export default HomeScreen
