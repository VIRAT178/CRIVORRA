import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface Step3DCanvasProps {
  stepIndex: number;
  color: string;
  glowColor: string;
  isActive: boolean;
  isHovered?: boolean;
}

export const Step3DCanvas: React.FC<Step3DCanvasProps> = ({
  stepIndex,
  color,
  glowColor,
  isActive,
  isHovered = false,
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const animFrameRef = useRef<number | null>(null);
  const isActiveRef = useRef(isActive);
  const isHoveredRef = useRef(isHovered);

  useEffect(() => {
    isActiveRef.current = isActive;
  }, [isActive]);

  useEffect(() => {
    isHoveredRef.current = isHovered;
  }, [isHovered]);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = 84;
    const height = 84;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.z = 4.2;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
        powerPreference: 'high-performance',
      });
    } catch {
      return;
    }

    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(new THREE.Color(color), 3.5, 10);
    pointLight.position.set(2, 3, 4);
    scene.add(pointLight);

    const backLight = new THREE.PointLight(0xffffff, 1.5, 10);
    backLight.position.set(-2, -2, -3);
    scene.add(backLight);

    // Group to hold all step-specific 3D meshes
    const group = new THREE.Group();
    scene.add(group);

    const mainColor = new THREE.Color(color);
    const brightColor = new THREE.Color(color).offsetHSL(0, 0, 0.15);

    // Build specific 3D geometry for each step
    const meshes: (THREE.Mesh | THREE.LineSegments | THREE.Points)[] = [];

    if (stepIndex === 0) {
      // 01: DISCOVER - 3D Geodesic Radar & Orbital Rings
      const icoGeo = new THREE.IcosahedronGeometry(1.1, 1);
      const wireGeo = new THREE.WireframeGeometry(icoGeo);
      const wireMat = new THREE.LineBasicMaterial({
        color: mainColor,
        transparent: true,
        opacity: 0.85,
        linewidth: 1.5,
      });
      const wireMesh = new THREE.LineSegments(wireGeo, wireMat);
      group.add(wireMesh);
      meshes.push(wireMesh);

      // Inner glowing core
      const coreGeo = new THREE.SphereGeometry(0.45, 16, 16);
      const coreMat = new THREE.MeshStandardMaterial({
        color: brightColor,
        emissive: mainColor,
        emissiveIntensity: 0.6,
        roughness: 0.2,
        metalness: 0.8,
      });
      const core = new THREE.Mesh(coreGeo, coreMat);
      group.add(core);

      // Outer equatorial radar ring
      const ringGeo = new THREE.TorusGeometry(1.5, 0.04, 16, 48);
      const ringMat = new THREE.MeshBasicMaterial({ color: brightColor, transparent: true, opacity: 0.75 });
      const ring = new THREE.Mesh(ringGeo, ringMat);
      ring.rotation.x = Math.PI / 2.8;
      group.add(ring);
      meshes.push(ring);
    } else if (stepIndex === 1) {
      // 02: ANALYSIS - 3D Quantum Data Matrix & Octahedron
      const octGeo = new THREE.OctahedronGeometry(1.15, 0);
      const octWire = new THREE.LineSegments(
        new THREE.WireframeGeometry(octGeo),
        new THREE.LineBasicMaterial({ color: mainColor, transparent: true, opacity: 0.9 })
      );
      group.add(octWire);
      meshes.push(octWire);

      // Inner nested cube
      const boxGeo = new THREE.BoxGeometry(0.7, 0.7, 0.7);
      const boxMat = new THREE.MeshStandardMaterial({
        color: brightColor,
        emissive: mainColor,
        emissiveIntensity: 0.7,
        roughness: 0.3,
        metalness: 0.7,
      });
      const box = new THREE.Mesh(boxGeo, boxMat);
      group.add(box);
      meshes.push(box);

      // Orbital data satellite dots
      const dotsGeo = new THREE.BufferGeometry();
      const dotCount = 12;
      const positions = new Float32Array(dotCount * 3);
      for (let i = 0; i < dotCount; i++) {
        const theta = (i / dotCount) * Math.PI * 2;
        positions[i * 3] = Math.cos(theta) * 1.5;
        positions[i * 3 + 1] = Math.sin(theta) * 0.4;
        positions[i * 3 + 2] = Math.sin(theta) * 1.5;
      }
      dotsGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      const dotsMat = new THREE.PointsMaterial({ color: brightColor, size: 0.12 });
      const dots = new THREE.Points(dotsGeo, dotsMat);
      group.add(dots);
      meshes.push(dots);
    } else if (stepIndex === 2) {
      // 03: DESIGN - 3D Iridescent Torus Knot
      const knotGeo = new THREE.TorusKnotGeometry(0.85, 0.24, 64, 16, 2, 3);
      const knotMat = new THREE.MeshStandardMaterial({
        color: mainColor,
        emissive: brightColor,
        emissiveIntensity: 0.45,
        roughness: 0.25,
        metalness: 0.85,
        wireframe: false,
      });
      const knot = new THREE.Mesh(knotGeo, knotMat);
      group.add(knot);
      meshes.push(knot);

      // Subtle outer wireframe layer for technical polish
      const knotWire = new THREE.LineSegments(
        new THREE.WireframeGeometry(knotGeo),
        new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.25 })
      );
      group.add(knotWire);
      meshes.push(knotWire);
    } else if (stepIndex === 3) {
      // 04: EXECUTION - 3D Kinetic Dodecahedron & High-Speed Turbine Rings
      const dodecaGeo = new THREE.DodecahedronGeometry(0.95, 0);
      const dodecaMat = new THREE.MeshStandardMaterial({
        color: mainColor,
        emissive: mainColor,
        emissiveIntensity: 0.5,
        roughness: 0.3,
        metalness: 0.8,
      });
      const dodeca = new THREE.Mesh(dodecaGeo, dodecaMat);
      group.add(dodeca);
      meshes.push(dodeca);

      const ring1 = new THREE.Mesh(
        new THREE.TorusGeometry(1.45, 0.035, 12, 36),
        new THREE.MeshBasicMaterial({ color: brightColor, transparent: true, opacity: 0.8 })
      );
      ring1.rotation.x = Math.PI / 3;
      group.add(ring1);
      meshes.push(ring1);

      const ring2 = new THREE.Mesh(
        new THREE.TorusGeometry(1.3, 0.035, 12, 36),
        new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.7 })
      );
      ring2.rotation.y = Math.PI / 3;
      group.add(ring2);
      meshes.push(ring2);
    } else if (stepIndex === 4) {
      // 05: ANALYTICS - 3D Multi-Axis Gyroscope & Waveform Nodes
      const g1 = new THREE.Mesh(
        new THREE.TorusGeometry(1.3, 0.04, 16, 48),
        new THREE.MeshStandardMaterial({ color: mainColor, emissive: mainColor, emissiveIntensity: 0.4 })
      );
      const g2 = new THREE.Mesh(
        new THREE.TorusGeometry(1.05, 0.04, 16, 48),
        new THREE.MeshStandardMaterial({ color: brightColor, emissive: brightColor, emissiveIntensity: 0.5 })
      );
      const g3 = new THREE.Mesh(
        new THREE.TorusGeometry(0.8, 0.04, 16, 48),
        new THREE.MeshStandardMaterial({ color: 0xffffff, emissive: mainColor, emissiveIntensity: 0.6 })
      );
      group.add(g1);
      group.add(g2);
      group.add(g3);
      meshes.push(g1, g2, g3);

      const coreSphere = new THREE.Mesh(
        new THREE.SphereGeometry(0.35, 16, 16),
        new THREE.MeshBasicMaterial({ color: brightColor })
      );
      group.add(coreSphere);
      meshes.push(coreSphere);
    } else {
      // 06: GROWTH - 3D Ascending Spiral & Exponential Trajectory Spire
      const coneGeo = new THREE.ConeGeometry(0.9, 1.8, 4);
      const coneMat = new THREE.MeshStandardMaterial({
        color: mainColor,
        emissive: brightColor,
        emissiveIntensity: 0.5,
        roughness: 0.25,
        metalness: 0.8,
      });
      const cone = new THREE.Mesh(coneGeo, coneMat);
      cone.rotation.z = Math.PI; // pointing upward
      group.add(cone);
      meshes.push(cone);

      const wireCone = new THREE.LineSegments(
        new THREE.WireframeGeometry(coneGeo),
        new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.4 })
      );
      wireCone.rotation.z = Math.PI;
      group.add(wireCone);
      meshes.push(wireCone);

      // Ascending orbital star ring
      const spiralRing = new THREE.Mesh(
        new THREE.TorusGeometry(1.35, 0.04, 16, 48),
        new THREE.MeshBasicMaterial({ color: brightColor, transparent: true, opacity: 0.85 })
      );
      spiralRing.rotation.x = Math.PI / 2.3;
      group.add(spiralRing);
      meshes.push(spiralRing);
    }

    // Animation Loop
    let clock = new THREE.Clock();

    const animate = () => {
      animFrameRef.current = requestAnimationFrame(animate);

      const delta = clock.getDelta();
      const elapsed = clock.getElapsedTime();

      const active = isActiveRef.current;
      const hovered = isHoveredRef.current;
      const speedMultiplier = active ? 2.2 : hovered ? 1.6 : 1.0;

      // Group continuous 3D rotation
      group.rotation.y += delta * 0.8 * speedMultiplier;
      group.rotation.x = Math.sin(elapsed * 0.9) * 0.25;

      // Floating oscillation
      group.position.y = Math.sin(elapsed * 1.8 + stepIndex) * (active ? 0.12 : 0.06);

      // Dynamic scale pulsing on active state
      const targetScale = active ? 1.15 : hovered ? 1.08 : 1.0;
      group.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);

      // Step-specific dynamic internal rotations
      if (stepIndex === 0 && meshes[1]) {
        // Radar ring counter-rotation
        meshes[1].rotation.z += delta * 1.5 * speedMultiplier;
      } else if (stepIndex === 1 && meshes.length >= 3) {
        // Octahedron & data dots
        meshes[0].rotation.z += delta * 0.5 * speedMultiplier;
        meshes[2].rotation.y += delta * 1.8 * speedMultiplier;
      } else if (stepIndex === 3 && meshes.length >= 3) {
        // Execution turbine rings counter-rotate
        meshes[1].rotation.z += delta * 2.5 * speedMultiplier;
        meshes[2].rotation.x += delta * 2.0 * speedMultiplier;
      } else if (stepIndex === 4 && meshes.length >= 4) {
        // Gyroscope triple axes
        meshes[0].rotation.x += delta * 1.2 * speedMultiplier;
        meshes[1].rotation.y += delta * 1.6 * speedMultiplier;
        meshes[2].rotation.z += delta * 2.1 * speedMultiplier;
      } else if (stepIndex === 5 && meshes[2]) {
        // Growth spiral ring ascending wobble
        meshes[2].rotation.z += delta * 2.2 * speedMultiplier;
      }

      // Active point light intensity pulsing
      pointLight.intensity = active
        ? 4.5 + Math.sin(elapsed * 6) * 1.5
        : 2.5;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
      try {
        renderer.dispose();
        if (renderer.domElement && container.contains(renderer.domElement)) {
          container.removeChild(renderer.domElement);
        }
        // Dispose geometries and materials
        group.traverse((obj) => {
          if (obj instanceof THREE.Mesh || obj instanceof THREE.LineSegments || obj instanceof THREE.Points) {
            obj.geometry?.dispose();
            if (Array.isArray(obj.material)) {
              obj.material.forEach((m) => m.dispose());
            } else {
              obj.material?.dispose();
            }
          }
        });
      } catch (err) {
        // silent cleanup
      }
    };
  }, [stepIndex, color]);

  return (
    <div
      ref={mountRef}
      className="w-[84px] h-[84px] flex items-center justify-center pointer-events-none select-none"
      style={{
        filter: isActive ? `drop-shadow(0 0 12px ${glowColor})` : undefined,
      }}
    />
  );
};
