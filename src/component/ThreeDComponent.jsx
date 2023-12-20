import React, { useRef, useEffect } from "react";
import * as THREE from "three";

const ThreeDComponent = () => {
  const containerRef = useRef();

  useEffect(() => {
    // Set up the scene
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer();

    // Create a cube
    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const cube = new THREE.Mesh(geometry, material);

    // Add the cube to the scene
    scene.add(cube);

    // Set camera position
    camera.position.z = 5;

    // Set up renderer
    renderer.setSize(window.innerWidth, window.innerHeight);
    containerRef.current.appendChild(renderer.domElement);

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);

      // Rotate the cube
      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;

      // Render the scene
      renderer.render(scene, camera);
    };

    // Start the animation loop
    animate();

    // Handle window resize
    const handleResize = () => {
      const newWidth = window.innerWidth;
      const newHeight = window.innerHeight;

      // Update camera aspect ratio and renderer size
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    // Add event listener for window resize
    window.addEventListener("resize", handleResize);

    // Cleanup on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
      // Optionally, clean up Three.js resources
      // geometry.dispose();
      // material.dispose();
    };
  }, []);

  return <div ref={containerRef} />;
};

export default ThreeDComponent;
