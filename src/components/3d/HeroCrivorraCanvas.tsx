import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

export const HeroCrivorraCanvas: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Check WebGL availability
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      if (!gl) {
        setIsLoaded(true);
        return;
      }
    } catch {
      setIsLoaded(true);
      return;
    }

    let animationFrameId: number;
    const width = container.clientWidth || 500;
    const height = container.clientHeight || 500;

    // Scene setup
    const scene = new THREE.Scene();

    // Camera
    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 100);
    camera.position.set(0, 0, 8.5);

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    container.appendChild(renderer.domElement);

    // Root growth engine group
    const growthEngineGroup = new THREE.Group();
    scene.add(growthEngineGroup);

    // Lighting setup for glossy luxury feel
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0x00d2ff, 3.0);
    keyLight.position.set(5, 6, 6);
    scene.add(keyLight);

    const magentaLight = new THREE.DirectionalLight(0xff0080, 2.5);
    magentaLight.position.set(-5, -4, 4);
    scene.add(magentaLight);

    const orangeRimLight = new THREE.PointLight(0xff5e1e, 3.2, 15);
    orangeRimLight.position.set(2, -3, 3);
    scene.add(orangeRimLight);

    const violetFill = new THREE.PointLight(0x7928ca, 2.8, 15);
    violetFill.position.set(-2, 4, 3);
    scene.add(violetFill);

    // Helper to generate a 3D arc (open C-shaped torus segment)
    const createCArcMesh = (
      radius: number,
      tube: number,
      arcLength: number,
      startAngle: number,
      color: number,
      roughness = 0.15,
      metalness = 0.4
    ) => {
      // Create TorusGeometry segment
      const geometry = new THREE.TorusGeometry(radius, tube, 32, 100, arcLength);
      const material = new THREE.MeshPhysicalMaterial({
        color,
        roughness,
        metalness,
        clearcoat: 0.9,
        clearcoatRoughness: 0.1,
        reflectivity: 0.9,
      });

      const mesh = new THREE.Mesh(geometry, material);
      mesh.rotation.z = startAngle;
      return mesh;
    };

    // Layer 1: Outer Curved C Layer (Electric Blue)
    const arc1 = createCArcMesh(2.5, 0.38, Math.PI * 1.5, 0.75, 0x0066ff, 0.12, 0.45);
    growthEngineGroup.add(arc1);

    // Layer 2: Middle Concentric Layer (Cyan to Violet)
    const arc2 = createCArcMesh(2.0, 0.28, Math.PI * 1.4, 0.9, 0x00d2ff, 0.1, 0.5);
    arc2.position.z = 0.35;
    growthEngineGroup.add(arc2);

    // Layer 3: Inner Dynamic Arc (Violet to Magenta)
    const arc3 = createCArcMesh(1.5, 0.22, Math.PI * 1.35, 1.05, 0x7928ca, 0.15, 0.4);
    arc3.position.z = -0.35;
    growthEngineGroup.add(arc3);

    // Layer 4: High-energy Accent Arc (Magenta/Orange)
    const arc4 = createCArcMesh(1.05, 0.16, Math.PI * 1.25, 1.2, 0xff0080, 0.2, 0.3);
    arc4.position.z = 0.6;
    growthEngineGroup.add(arc4);

    // Layer 5: Precision Inner Energy Ring (Orange/Gold)
    const arc5 = createCArcMesh(0.68, 0.1, Math.PI * 1.15, 1.3, 0xff5e1e, 0.1, 0.6);
    arc5.position.z = 0.85;
    growthEngineGroup.add(arc5);

    // Core AI Quantum Sphere
    const coreGeo = new THREE.SphereGeometry(0.32, 32, 32);
    const coreMat = new THREE.MeshStandardMaterial({
      color: 0x00f0ff,
      emissive: 0x00d2ff,
      emissiveIntensity: 0.8,
      roughness: 0.1,
      metalness: 0.8,
    });
    const coreSphere = new THREE.Mesh(coreGeo, coreMat);
    coreSphere.position.set(0.2, 0.1, 0.4);
    growthEngineGroup.add(coreSphere);

    // Thin Orbital Ring with Data Nodes
    const orbitRingGeo = new THREE.RingGeometry(3.1, 3.12, 64);
    const orbitRingMat = new THREE.MeshBasicMaterial({
      color: 0x0066ff,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.25,
    });
    const orbitRing = new THREE.Mesh(orbitRingGeo, orbitRingMat);
    orbitRing.rotation.x = Math.PI / 3;
    growthEngineGroup.add(orbitRing);

    // Floating Data Particle Cloud (growth engine data points)
    const particleCount = 180;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    const particleColors = new Float32Array(particleCount * 3);

    const palette = [
      new THREE.Color(0x0066ff),
      new THREE.Color(0x00d2ff),
      new THREE.Color(0x7928ca),
      new THREE.Color(0xff0080),
      new THREE.Color(0xff5e1e),
    ];

    for (let i = 0; i < particleCount; i++) {
      const radius = 2.0 + Math.random() * 2.8;
      const theta = Math.random() * Math.PI * 2;
      const phi = (Math.random() - 0.5) * Math.PI * 0.8;

      particlePositions[i * 3] = radius * Math.cos(theta) * Math.cos(phi);
      particlePositions[i * 3 + 1] = radius * Math.sin(phi);
      particlePositions[i * 3 + 2] = radius * Math.sin(theta) * Math.cos(phi);

      const color = palette[Math.floor(Math.random() * palette.length)];
      particleColors[i * 3] = color.r;
      particleColors[i * 3 + 1] = color.g;
      particleColors[i * 3 + 2] = color.b;
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    particleGeo.setAttribute('color', new THREE.BufferAttribute(particleColors, 3));

    const particleMat = new THREE.PointsMaterial({
      size: 0.07,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
    });

    const particles = new THREE.Points(particleGeo, particleMat);
    growthEngineGroup.add(particles);

    // Data Connections (Thin subtle lines)
    const lineCount = 14;
    const linePositions: number[] = [];
    for (let i = 0; i < lineCount; i++) {
      const angle = (i / lineCount) * Math.PI * 1.5 + 0.8;
      const r1 = 2.5;
      const r2 = 1.5;
      linePositions.push(
        r1 * Math.cos(angle), r1 * Math.sin(angle), 0,
        r2 * Math.cos(angle + 0.15), r2 * Math.sin(angle + 0.15), 0.3
      );
    }
    const lineGeo = new THREE.BufferGeometry();
    lineGeo.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3));
    const lineMat = new THREE.LineBasicMaterial({
      color: 0x00d2ff,
      transparent: true,
      opacity: 0.35,
    });
    const connectionLines = new THREE.LineSegments(lineGeo, lineMat);
    growthEngineGroup.add(connectionLines);

    setIsLoaded(true);

    // Mouse Parallax and Scroll tracking
    let targetRotationX = 0.2;
    let targetRotationY = -0.3;
    let currentRotationX = 0.2;
    let currentRotationY = -0.3;
    let scrollTilt = 0;

    const handlePointerMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      targetRotationY = x * 0.45 - 0.25;
      targetRotationX = -y * 0.35 + 0.2;
    };

    const handleScroll = () => {
      const scrollY = window.scrollY;
      scrollTilt = (scrollY / 1000) * 0.4;
    };

    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Handle Resize with ResizeObserver
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const newWidth = entry.contentRect.width;
        const newHeight = entry.contentRect.height;
        if (newWidth > 0 && newHeight > 0) {
          camera.aspect = newWidth / newHeight;
          camera.updateProjectionMatrix();
          renderer.setSize(newWidth, newHeight);
        }
      }
    });
    resizeObserver.observe(container);

    // Animation Loop
    let clock = new THREE.Clock();
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Smooth interpolation for mouse parallax
      currentRotationX += (targetRotationX + scrollTilt - currentRotationX) * 0.04;
      currentRotationY += (targetRotationY - currentRotationY) * 0.04;

      // Base slow luxury rotation
      growthEngineGroup.rotation.y = currentRotationY + Math.sin(elapsedTime * 0.3) * 0.08;
      growthEngineGroup.rotation.x = currentRotationX + Math.cos(elapsedTime * 0.25) * 0.05;
      growthEngineGroup.rotation.z = Math.sin(elapsedTime * 0.2) * 0.04;

      // Subtle breathing wave through layers
      arc1.rotation.z = 0.75 + Math.sin(elapsedTime * 0.5) * 0.03;
      arc2.rotation.z = 0.9 + Math.cos(elapsedTime * 0.6) * 0.04;
      arc3.rotation.z = 1.05 + Math.sin(elapsedTime * 0.7) * 0.05;
      arc4.rotation.z = 1.2 + Math.cos(elapsedTime * 0.8) * 0.06;

      // Pulse core sphere
      const pulse = 1 + Math.sin(elapsedTime * 2) * 0.08;
      coreSphere.scale.set(pulse, pulse, pulse);

      // Particle slow orbit
      particles.rotation.y = elapsedTime * 0.08;
      particles.rotation.x = elapsedTime * 0.04;

      // Orbit ring wobble
      orbitRing.rotation.z = elapsedTime * 0.15;

      renderer.render(scene, camera);
    };

    animate();

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('scroll', handleScroll);
      resizeObserver.disconnect();

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }

      // Dispose resources
      renderer.dispose();
      [arc1, arc2, arc3, arc4, arc5, coreSphere, orbitRing, particles, connectionLines].forEach((mesh) => {
        mesh.geometry.dispose();
        if (Array.isArray(mesh.material)) {
          mesh.material.forEach((m) => m.dispose());
        } else {
          mesh.material.dispose();
        }
      });
    };
  }, []);

  return (
    <div className="relative w-full h-[460px] sm:h-[540px] lg:h-[620px] flex items-center justify-center">
      {/* Subtle ambient backplate glow matching CRIVORRA branding */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
        <div className="w-[360px] h-[360px] md:w-[480px] md:h-[480px] rounded-full bg-gradient-to-tr from-[#0066FF]/10 via-[#7928CA]/8 to-[#FF0080]/6 blur-3xl" />
        <div className="absolute w-[280px] h-[280px] rounded-full bg-[#00D2FF]/10 blur-2xl animate-pulse" />
      </div>

      {/* Interactive 3D Canvas container */}
      <div
        ref={containerRef}
        className="w-full h-full cursor-grab active:cursor-grabbing relative z-10"
        style={{ touchAction: 'none' }}
      />

      {/* Floating Micro Labels / Live Growth Engine Status Indicators */}
      <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 z-20 pointer-events-none">
        <div className="glass-light rounded-full px-3.5 py-1.5 flex items-center gap-2 shadow-sm text-xs font-medium text-slate-700">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
          <span className="font-mono-code text-[11px] text-slate-500 uppercase">CORE STATUS</span>
          <span className="text-[#0066FF] font-semibold">GROWTH ENGINE ACTIVE</span>
        </div>
      </div>

      <div className="absolute top-6 right-4 sm:top-8 sm:right-6 z-20 pointer-events-none hidden sm:block">
        <div className="glass-light rounded-xl p-2.5 shadow-sm text-right">
          <div className="font-mono-code text-[10px] text-slate-400 uppercase tracking-wider">3D ENGINE</div>
          <div className="font-display text-xs font-bold text-slate-800">LAYERED C MATRIX</div>
          <div className="flex items-center justify-end gap-1 mt-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[#0066FF]" />
            <span className="w-1.5 h-1.5 rounded-full bg-[#00D2FF]" />
            <span className="w-1.5 h-1.5 rounded-full bg-[#7928CA]" />
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF0080]" />
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF5E1E]" />
          </div>
        </div>
      </div>
    </div>
  );
};
