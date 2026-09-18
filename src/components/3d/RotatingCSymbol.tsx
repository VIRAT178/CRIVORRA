import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export const RotatingCSymbol: React.FC<{ className?: string }> = ({ className = '' }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let animId: number;
    const width = container.clientWidth || 600;
    const height = container.clientHeight || 500;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 7);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    container.appendChild(renderer.domElement);

    // Lights
    const ambLight = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambLight);

    const keyLight = new THREE.DirectionalLight(0x00d2ff, 3.5);
    keyLight.position.set(5, 6, 6);
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0xff0080, 3.0);
    fillLight.position.set(-5, -4, 4);
    scene.add(fillLight);

    const cGroup = new THREE.Group();
    scene.add(cGroup);

    // Create 3 layered C geometries
    const createArc = (radius: number, tube: number, color: number, zOffset: number) => {
      const geo = new THREE.TorusGeometry(radius, tube, 32, 100, Math.PI * 1.5);
      const mat = new THREE.MeshPhysicalMaterial({
        color,
        roughness: 0.15,
        metalness: 0.6,
        clearcoat: 1.0,
        clearcoatRoughness: 0.1,
        transparent: true,
        opacity: 0.85,
      });
      const mesh = new THREE.Mesh(geo, mat);
      mesh.rotation.z = 0.8;
      mesh.position.z = zOffset;
      return mesh;
    };

    const arc1 = createArc(2.4, 0.35, 0x0066ff, 0);
    const arc2 = createArc(1.9, 0.25, 0x7928ca, 0.3);
    const arc3 = createArc(1.4, 0.18, 0xff0080, 0.6);
    cGroup.add(arc1);
    cGroup.add(arc2);
    cGroup.add(arc3);

    // Ambient floating ring
    const ringGeo = new THREE.RingGeometry(2.9, 2.92, 64);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0x00d2ff,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.2,
    });
    const ringMesh = new THREE.Mesh(ringGeo, ringMat);
    ringMesh.rotation.x = Math.PI / 3;
    cGroup.add(ringMesh);

    // Slow majestic rotation
    let clock = new THREE.Clock();
    const animate = () => {
      animId = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();
      cGroup.rotation.y = t * 0.25;
      cGroup.rotation.x = Math.sin(t * 0.18) * 0.15;
      cGroup.rotation.z = Math.cos(t * 0.15) * 0.1;
      renderer.render(scene, camera);
    };

    animate();

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

    return () => {
      cancelAnimationFrame(animId);
      resizeObserver.disconnect();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      arc1.geometry.dispose();
      arc2.geometry.dispose();
      arc3.geometry.dispose();
      ringGeo.dispose();
    };
  }, []);

  return (
    <div className={`relative pointer-events-none ${className}`}>
      <div ref={containerRef} className="w-full h-full" />
    </div>
  );
};
