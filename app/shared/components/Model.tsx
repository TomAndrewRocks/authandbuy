import React, { useRef } from 'react';
import { ExpoWebGLRenderingContext, GLView } from 'expo-gl';
import { Renderer } from 'expo-three';
import { Scene, PerspectiveCamera, BoxGeometry, MeshBasicMaterial, Mesh } from 'three';

export default function Model() {
  const glViewRef = useRef<GLView>(null);

  const onContextCreate = async (gl: ExpoWebGLRenderingContext) => {
    const scene = new Scene();
    const camera = new PerspectiveCamera(
      75,
      gl.drawingBufferWidth / gl.drawingBufferHeight,
      0.1,
      1000,
    );
    const renderer = new Renderer({ gl });

    camera.position.z = 5;

    // Definindo as cores para cada face do cubo
    const colors = [0xff0000, 0x00ff00, 0x0000ff, 0xffff00, 0xff00ff, 0x00ffff];

    const materials = colors.map((color) => new MeshBasicMaterial({ color }));

    const geometry = new BoxGeometry();
    const cube = new Mesh(geometry, materials);
    scene.add(cube);

    const render = () => {
      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;
      renderer.render(scene, camera);

      gl.endFrameEXP();

      requestAnimationFrame(render);
    };

    render();
  };

  return (
    <GLView
      style={{ position: 'absolute', left: 0, top: 0, bottom: 0, right: 0 }}
      onContextCreate={onContextCreate}
      ref={(ref) => {
        if (ref) glViewRef.current = ref;
      }}
    />
  );
}
