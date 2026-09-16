import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

interface AICoreCanvasProps {
  onNodeSelect?: (nodeName: string) => void;
  activeNode?: string;
}

export const AICoreCanvas: React.FC<AICoreCanvasProps> = ({ onNodeSelect, activeNode }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let animationFrameId: number;
    const width = container.clientWidth || 500;
    const height = container.clientHeight || 500;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 8.2);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const coreLight = new THREE.PointLight(0x00d2ff, 4, 12);
    coreLight.position.set(0, 0, 0);
    scene.add(coreLight);

    const blueLight = new THREE.DirectionalLight(0x0066ff, 2);
    blueLight.position.set(4, 5, 5);
    scene.add(blueLight);

    const magentaLight = new THREE.DirectionalLight(0xff0080, 1.8);
    magentaLight.position.set(-4, -5, 3);
    scene.add(magentaLight);

    const rootGroup = new THREE.Group();
    scene.add(rootGroup);

    // Central AI Core: Geodesic Dual Shell
    // Inner Shell (Luminous Icosahedron)
    const innerCoreGeo = new THREE.IcosahedronGeometry(1.2, 2);
    const innerCoreMat = new THREE.MeshPhysicalMaterial({
      color: 0x070b19,
      emissive: 0x0066ff,
      emissiveIntensity: 0.6,
      roughness: 0.2,
      metalness: 0.8,
      wireframe: false,
    });
    const innerCore = new THREE.Mesh(innerCoreGeo, innerCoreMat);
    rootGroup.add(innerCore);

    // Wireframe Neural Lattice overlay
    const wireGeo = new THREE.IcosahedronGeometry(1.25, 2);
    const wireMat = new THREE.MeshBasicMaterial({
      color: 0x00d2ff,
      wireframe: true,
      transparent: true,
      opacity: 0.4,
    });
    const wireMesh = new THREE.Mesh(wireGeo, wireMat);
    rootGroup.add(wireMesh);

    // 6 Orbital Satellites: DATA, AI, AUTOMATION, ANALYTICS, MARKETING, TECHNOLOGY
    const nodeNames = ['DATA', 'AI', 'AUTOMATION', 'ANALYTICS', 'MARKETING', 'TECHNOLOGY'];
    const nodeColors = [0x00d2ff, 0x0066ff, 0x7928ca, 0xff0080, 0xff5e1e, 0x00f0ff];
    const satellites: THREE.Group[] = [];

    const orbitRadius = 3.2;
    nodeNames.forEach((name, i) => {
      const angle = (i / nodeNames.length) * Math.PI * 2;
      const nodeGroup = new THREE.Group();

      // Satellite Sphere
      const satGeo = new THREE.SphereGeometry(0.24, 24, 24);
      const satMat = new THREE.MeshStandardMaterial({
        color: nodeColors[i],
        emissive: nodeColors[i],
        emissiveIntensity: 0.6,
        roughness: 0.2,
        metalness: 0.5,
      });
      const satMesh = new THREE.Mesh(satGeo, satMat);
      satMesh.userData = { name };
      nodeGroup.add(satMesh);

      // Satellite halo
      const haloGeo = new THREE.RingGeometry(0.32, 0.36, 32);
      const haloMat = new THREE.MeshBasicMaterial({
        color: nodeColors[i],
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.6,
      });
      const haloMesh = new THREE.Mesh(haloGeo, haloMat);
      nodeGroup.add(haloMesh);

      nodeGroup.position.set(
        orbitRadius * Math.cos(angle),
        orbitRadius * Math.sin(angle) * 0.7,
        orbitRadius * Math.sin(angle) * 0.5
      );

      rootGroup.add(nodeGroup);
      satellites.push(nodeGroup);
    });

    // Orbital path rings
    const ringGeo1 = new THREE.RingGeometry(orbitRadius - 0.02, orbitRadius + 0.02, 64);
    const ringMat1 = new THREE.MeshBasicMaterial({
      color: 0x0066ff,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.18,
    });
    const ring1 = new THREE.Mesh(ringGeo1, ringMat1);
    ring1.rotation.x = Math.PI / 2.6;
    rootGroup.add(ring1);

    const ringGeo2 = new THREE.RingGeometry(orbitRadius * 0.85 - 0.02, orbitRadius * 0.85 + 0.02, 64);
    const ring2 = new THREE.Mesh(ringGeo2, ringMat1.clone());
    ring2.rotation.x = -Math.PI / 3;
    ring2.rotation.y = Math.PI / 6;
    rootGroup.add(ring2);

    // Dynamic Connecting Lines between satellites and central core
    const linesPositions = new Float32Array(satellites.length * 2 * 3);
    const linesGeo = new THREE.BufferGeometry();
    linesGeo.setAttribute('position', new THREE.BufferAttribute(linesPositions, 3));
    const linesMat = new THREE.LineBasicMaterial({
      color: 0x00d2ff,
      transparent: true,
      opacity: 0.35,
    });
    const connectionLines = new THREE.LineSegments(linesGeo, linesMat);
    rootGroup.add(connectionLines);

    // Floating neural particles
    const particleCount = 120;
    const pGeo = new THREE.BufferGeometry();
    const pPos = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      pPos[i * 3] = (Math.random() - 0.5) * 8;
      pPos[i * 3 + 1] = (Math.random() - 0.5) * 8;
      pPos[i * 3 + 2] = (Math.random() - 0.5) * 6;
    }
    pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
    const pMat = new THREE.PointsMaterial({
      size: 0.05,
      color: 0x00d2ff,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending,
    });
    const pCloud = new THREE.Points(pGeo, pMat);
    rootGroup.add(pCloud);

    // Mouse Tracking
    let targetRotX = 0;
    let targetRotY = 0;
    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      targetRotY = x * 0.5;
      targetRotX = -y * 0.4;
    };

    window.addEventListener('pointermove', handleMouseMove);

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const newW = entry.contentRect.width;
        const newH = entry.contentRect.height;
        if (newW > 0 && newH > 0) {
          camera.aspect = newW / newH;
          camera.updateProjectionMatrix();
          renderer.setSize(newW, newH);
        }
      }
    });
    resizeObserver.observe(container);

    const clock = new THREE.Clock();
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      rootGroup.rotation.y += (targetRotY - rootGroup.rotation.y) * 0.05;
      rootGroup.rotation.x += (targetRotX - rootGroup.rotation.x) * 0.05;

      // Spin inner core and wireframe in opposite directions
      innerCore.rotation.y = elapsed * 0.25;
      innerCore.rotation.x = elapsed * 0.15;
      wireMesh.rotation.y = -elapsed * 0.3;
      wireMesh.rotation.z = elapsed * 0.18;

      // Update Satellites positions in orbit
      const posAttr = connectionLines.geometry.attributes.position as THREE.BufferAttribute;
      satellites.forEach((sat, idx) => {
        const baseAngle = (idx / satellites.length) * Math.PI * 2;
        const currentAngle = baseAngle + elapsed * 0.2;
        const x = orbitRadius * Math.cos(currentAngle);
        const y = orbitRadius * Math.sin(currentAngle) * 0.7;
        const z = orbitRadius * Math.sin(currentAngle) * 0.5;
        sat.position.set(x, y, z);

        // Core to Satellite line positions
        posAttr.setXYZ(idx * 2, 0, 0, 0);
        posAttr.setXYZ(idx * 2 + 1, x, y, z);
      });
      posAttr.needsUpdate = true;

      // Pulse core lighting
      coreLight.intensity = 3.5 + Math.sin(elapsed * 3) * 1.2;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('pointermove', handleMouseMove);
      resizeObserver.disconnect();

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div className="relative w-full h-[340px] sm:h-[380px] lg:h-[420px] flex items-center justify-center">
      <div ref={containerRef} className="w-full h-full cursor-grab active:cursor-grabbing relative z-10" />
      {/* Visual background atmospheric glow */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
        <div className="w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] rounded-full bg-[#0066FF]/20 blur-3xl" />
        <div className="w-[200px] h-[200px] rounded-full bg-[#7928CA]/25 blur-2xl animate-pulse" />
      </div>

      {/* Floating active node pills on UI */}
      <div className="absolute bottom-4 inset-x-0 flex flex-wrap items-center justify-center gap-2 z-20 px-4">
        {['DATA', 'AI', 'AUTOMATION', 'ANALYTICS', 'MARKETING', 'TECHNOLOGY'].map((node) => (
          <button
            key={node}
            onClick={() => onNodeSelect?.(node)}
            className={`font-mono-code text-[11px] uppercase tracking-wider px-3 py-1 rounded-full transition-all duration-300 border ${
              activeNode === node
                ? 'bg-[#0066FF] text-white border-[#00D2FF] shadow-lg shadow-[#0066FF]/40 scale-105'
                : 'bg-white/5 hover:bg-white/15 text-slate-300 border-white/10'
            }`}
          >
            {node}
          </button>
        ))}
      </div>
    </div>
  );
};
