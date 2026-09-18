import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export interface ServicePosition3D {
  x: number;
  y: number;
  z: number;
  screenX: number;
  screenY: number;
  scale: number;
  opacity: number;
  zIndex: number;
}

interface EcosystemCanvasProps {
  orbitRotation: number;
  hoveredServiceIndex: number | null;
  activeServiceIndex: number | null;
  onPositionsUpdate: (positions: ServicePosition3D[]) => void;
  reducedMotion?: boolean;
}

const SERVICE_COLORS = [
  '#7928CA', // 01 Social Media Management
  '#0066FF', // 02 Brand Management
  '#0066FF', // 03 Search Engine Optimisation
  '#FF5E1E', // 04 Google my business
  '#0080FB', // 05 Meta Ad run
  '#EA4335', // 06 Google Ad run
  '#7928CA', // 07 GEO I AEO
  '#F59E0B', // 08 Google Analytics
];

export const EcosystemCanvas: React.FC<EcosystemCanvasProps> = ({
  orbitRotation,
  hoveredServiceIndex,
  activeServiceIndex,
  onPositionsUpdate,
  reducedMotion = false,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const animFrameRef = useRef<number | null>(null);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  // Store mutable refs for values that change on re-render to avoid rebuilding Three.js scene
  const orbitRotationRef = useRef(orbitRotation);
  const hoveredIndexRef = useRef(hoveredServiceIndex);
  const activeIndexRef = useRef(activeServiceIndex);
  const onPositionsUpdateRef = useRef(onPositionsUpdate);

  useEffect(() => {
    orbitRotationRef.current = orbitRotation;
  }, [orbitRotation]);

  useEffect(() => {
    hoveredIndexRef.current = hoveredServiceIndex;
  }, [hoveredServiceIndex]);

  useEffect(() => {
    activeIndexRef.current = activeServiceIndex;
  }, [activeServiceIndex]);

  useEffect(() => {
    onPositionsUpdateRef.current = onPositionsUpdate;
  }, [onPositionsUpdate]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let width = container.clientWidth || 900;
    let height = container.clientHeight || 700;

    // Check WebGL availability
    try {
      const testCanvas = document.createElement('canvas');
      const gl = testCanvas.getContext('webgl') || testCanvas.getContext('experimental-webgl');
      if (!gl) return;
    } catch {
      return;
    }

    // 1. SCENE & CAMERA
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 11);

    // 2. RENDERER
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    container.appendChild(renderer.domElement);

    // 3. LIGHTING
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.1);
    scene.add(ambientLight);

    const blueLight = new THREE.DirectionalLight(0x0066ff, 2.5);
    blueLight.position.set(6, 8, 6);
    scene.add(blueLight);

    const cyanLight = new THREE.DirectionalLight(0x00d2ff, 2.0);
    cyanLight.position.set(-6, -5, 5);
    scene.add(cyanLight);

    const centerGlow = new THREE.PointLight(0x00d2ff, 3.5, 14);
    centerGlow.position.set(0, 0, 0.5);
    scene.add(centerGlow);

    const accentPurple = new THREE.PointLight(0x7928ca, 2.0, 12);
    accentPurple.position.set(0, 0, -1);
    scene.add(accentPurple);

    // 4. CENTRAL AURA DISCS & RINGS
    const centralHubGroup = new THREE.Group();
    scene.add(centralHubGroup);

    // Inner glowing ring
    const innerRingGeo = new THREE.TorusGeometry(1.6, 0.02, 16, 100);
    const innerRingMat = new THREE.MeshBasicMaterial({
      color: 0x00d2ff,
      transparent: true,
      opacity: 0.45,
    });
    const innerRing = new THREE.Mesh(innerRingGeo, innerRingMat);
    centralHubGroup.add(innerRing);

    // Middle rotating ring with slight inclination
    const midRingGeo = new THREE.TorusGeometry(2.1, 0.015, 16, 120);
    const midRingMat = new THREE.MeshBasicMaterial({
      color: 0x7928ca,
      transparent: true,
      opacity: 0.35,
    });
    const midRing = new THREE.Mesh(midRingGeo, midRingMat);
    midRing.rotation.x = Math.PI * 0.15;
    midRing.rotation.y = Math.PI * 0.08;
    centralHubGroup.add(midRing);

    // Outer faint orbital guide ellipse
    const outerRingGeo = new THREE.TorusGeometry(4.7, 0.01, 16, 160);
    const outerRingMat = new THREE.MeshBasicMaterial({
      color: 0x0066ff,
      transparent: true,
      opacity: 0.18,
    });
    const outerRing = new THREE.Mesh(outerRingGeo, outerRingMat);
    outerRing.scale.set(1, 0.52, 1);
    centralHubGroup.add(outerRing);

    // 5. AMBIENT BACKGROUND PARTICLES
    const particleCount = 140;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    const particleColors = new Float32Array(particleCount * 3);

    const c1 = new THREE.Color(0x0066ff);
    const c2 = new THREE.Color(0x00d2ff);
    const c3 = new THREE.Color(0x7928ca);

    for (let i = 0; i < particleCount; i++) {
      const radius = 1.8 + Math.random() * 5.2;
      const theta = Math.random() * Math.PI * 2;
      const phi = (Math.random() - 0.5) * Math.PI * 0.7;

      particlePositions[i * 3] = radius * Math.cos(theta) * Math.cos(phi);
      particlePositions[i * 3 + 1] = radius * Math.sin(phi) * 0.65;
      particlePositions[i * 3 + 2] = radius * Math.sin(theta) * Math.cos(phi) * 0.8;

      const pickColor = Math.random();
      const col = pickColor < 0.45 ? c1 : pickColor < 0.75 ? c2 : c3;
      particleColors[i * 3] = col.r;
      particleColors[i * 3 + 1] = col.g;
      particleColors[i * 3 + 2] = col.b;
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    particleGeo.setAttribute('color', new THREE.BufferAttribute(particleColors, 3));

    const particleMat = new THREE.PointsMaterial({
      size: 0.05,
      vertexColors: true,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending,
    });
    const particleSystem = new THREE.Points(particleGeo, particleMat);
    scene.add(particleSystem);

    // 6. CONNECTING LINES & TRAVELING PULSE PACKETS
    // Each of the 8 services has a 3D connection line and moving energy pulses
    const lineGroup = new THREE.Group();
    scene.add(lineGroup);

    const connectionLines: THREE.Line[] = [];
    const lineGeometries: THREE.BufferGeometry[] = [];
    const lineMaterials: THREE.LineBasicMaterial[] = [];

    // Energy packets (pulse particles along each line)
    const packetsPerLine = 3;
    const packetGroup = new THREE.Group();
    scene.add(packetGroup);

    const packetMeshList: { mesh: THREE.Mesh; lineIndex: number; progress: number; speed: number }[] = [];
    const packetGeo = new THREE.SphereGeometry(0.045, 8, 8);

    for (let i = 0; i < 8; i++) {
      const hexColor = parseInt(SERVICE_COLORS[i].replace('#', '0x'), 16);
      const geom = new THREE.BufferGeometry();
      const positions = new Float32Array(6); // [0,0,0, x,y,z]
      geom.setAttribute('position', new THREE.BufferAttribute(positions, 3));

      const mat = new THREE.LineBasicMaterial({
        color: hexColor,
        transparent: true,
        opacity: 0.22,
        linewidth: 1,
      });

      const line = new THREE.Line(geom, mat);
      connectionLines.push(line);
      lineGeometries.push(geom);
      lineMaterials.push(mat);
      lineGroup.add(line);

      // Create glowing packets for this line
      const packetMat = new THREE.MeshBasicMaterial({
        color: hexColor,
        transparent: true,
        opacity: 0.75,
      });

      for (let p = 0; p < packetsPerLine; p++) {
        const pMesh = new THREE.Mesh(packetGeo, packetMat);
        packetGroup.add(pMesh);
        packetMeshList.push({
          mesh: pMesh,
          lineIndex: i,
          progress: (p / packetsPerLine) + Math.random() * 0.15,
          speed: 0.006 + Math.random() * 0.004,
        });
      }
    }

    // 7. MOUSE PARALLAX LISTENER
    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const normX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const normY = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      mouseRef.current.targetX = normX * 0.35;
      mouseRef.current.targetY = normY * 0.25;
    };

    const handleMouseLeave = () => {
      mouseRef.current.targetX = 0;
      mouseRef.current.targetY = 0;
    };

    container.addEventListener('mousemove', handleMouseMove, { passive: true });
    container.addEventListener('mouseleave', handleMouseLeave, { passive: true });

    // 8. RESIZE OBSERVER & HANDLER
    const updateDimensions = (newWidth: number, newHeight: number) => {
      width = newWidth || container.clientWidth || 900;
      height = newHeight || container.clientHeight || 700;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    const handleResize = () => {
      if (!container) return;
      updateDimensions(container.clientWidth, container.clientHeight);
    };

    window.addEventListener('resize', handleResize, { passive: true });

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        if (entry.contentRect && entry.contentRect.width > 0) {
          updateDimensions(entry.contentRect.width, entry.contentRect.height);
        }
      }
    });
    resizeObserver.observe(container);

    // 9. ANIMATION LOOP
    let clock = new THREE.Clock();

    const renderLoop = () => {
      animFrameRef.current = requestAnimationFrame(renderLoop);
      const elapsedTime = clock.getElapsedTime();

      // Smooth mouse damping
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.06;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.06;

      // Apply subtle camera parallax
      camera.position.x = mouseRef.current.x * 0.8;
      camera.position.y = mouseRef.current.y * 0.6;
      camera.lookAt(0, 0, 0);

      // Rotate subtle rings
      innerRing.rotation.z += 0.0035;
      midRing.rotation.z -= 0.002;
      particleSystem.rotation.y += 0.0008;

      // Responsive orbit radii & scaling based on container dimensions & aspect ratio
      const aspect = width / height;
      const isSmallScreen = width < 640;
      const isMidScreen = width >= 640 && width < 1024;

      // Frustum boundaries at z=0 with FOV 45
      const fovHalfRad = (camera.fov * 0.5 * Math.PI) / 180;
      const frustumHeight = 2 * Math.tan(fovHalfRad) * camera.position.z;
      const frustumWidth = frustumHeight * aspect;

      let radiusX: number;
      let radiusY: number;
      let depthZ: number;
      let hubScale: number;

      if (isSmallScreen) {
        // Mobile portrait: fit horizontally within viewport bounds with node margins, elongated vertically
        radiusX = Math.min(2.45, frustumWidth * 0.38);
        radiusY = Math.min(2.95, Math.max(2.1, frustumHeight * 0.31));
        depthZ = 1.45;
        hubScale = 0.52;
      } else if (isMidScreen) {
        // Tablet view
        radiusX = Math.min(3.6, frustumWidth * 0.34);
        radiusY = Math.min(2.4, frustumHeight * 0.26);
        depthZ = 1.8;
        hubScale = 0.76;
      } else {
        // Desktop large screen
        radiusX = 4.4;
        radiusY = 2.25;
        depthZ = 2.2;
        hubScale = 1.0;
      }

      centralHubGroup.scale.set(hubScale, hubScale, hubScale);
      outerRing.scale.set(radiusX / 4.4, (radiusY / 2.25) * 0.52, 1);
      particleSystem.scale.set(
        Math.min(1.0, radiusX / 4.0),
        Math.min(1.0, radiusY / 2.2),
        1.0
      );

      const currentRotation = orbitRotationRef.current;
      const hoveredIndex = hoveredIndexRef.current;
      const activeIndex = activeIndexRef.current;

      const screenPositions: ServicePosition3D[] = [];
      const service3DCoords: THREE.Vector3[] = [];

      for (let i = 0; i < 8; i++) {
        const baseAngle = (i * (Math.PI * 2)) / 8;
        const angle = baseAngle + currentRotation;

        let posX = Math.cos(angle) * radiusX;
        let posY = Math.sin(angle) * radiusY;
        let posZ = Math.sin(angle) * depthZ;

        // Elevation and tilt if hovered or active
        if (hoveredIndex === i) {
          posZ += 0.7; // brings forward toward camera
        } else if (activeIndex === i) {
          posZ += 0.9;
        }

        const v3 = new THREE.Vector3(posX, posY, posZ);
        service3DCoords.push(v3);

        // Project 3D coordinate to 2D CSS screen coordinates
        const projected = v3.clone().project(camera);
        const screenX = (projected.x * 0.5 + 0.5) * width;
        const screenY = (-projected.y * 0.5 + 0.5) * height;

        // Genuine 3D depth calculations
        // Front nodes (posZ > 0): scale 1.0 -> 1.15, opacity 1.0, zIndex: 30
        // Back nodes (posZ < 0): scale 0.8 -> 0.92, opacity 0.65 -> 0.85, zIndex: 10
        // Center core sits at zIndex 20!
        const normZ = posZ / depthZ; // range approx -1 to +1
        const depthScale = 0.92 + normZ * 0.16;
        const depthOpacity = Math.min(1, Math.max(0.6, 0.82 + normZ * 0.25));
        const zIndex = posZ >= -0.1 ? 30 : 10;

        screenPositions.push({
          x: posX,
          y: posY,
          z: posZ,
          screenX,
          screenY,
          scale: depthScale,
          opacity: depthOpacity,
          zIndex,
        });

        // Update Three.js connection line
        const lineGeo = lineGeometries[i];
        const linePos = lineGeo.attributes.position as THREE.BufferAttribute;
        linePos.setXYZ(0, 0, 0, 0); // Origin at central core
        linePos.setXYZ(1, posX * 0.86, posY * 0.86, posZ * 0.86); // slight offset to not overlap card
        linePos.needsUpdate = true;

        // Line highlight when hovered or active
        const lineMat = lineMaterials[i];
        if (hoveredIndex === i || activeIndex === i) {
          lineMat.opacity = 0.85;
          lineMat.color.setHex(0x00d2ff);
        } else if (hoveredIndex !== null) {
          lineMat.opacity = 0.08; // subtle dim when another is hovered
        } else {
          lineMat.opacity = 0.22 + Math.sin(elapsedTime * 2 + i) * 0.06;
          lineMat.color.setHex(parseInt(SERVICE_COLORS[i].replace('#', '0x'), 16));
        }
      }

      // Update traveling pulse packets (flow from service -> central core)
      packetMeshList.forEach((packet) => {
        const targetPos = service3DCoords[packet.lineIndex];
        if (!targetPos) return;

        // Progress goes from 1.0 (at service) down to 0.0 (at center core)
        packet.progress -= packet.speed;
        if (packet.progress < 0) {
          packet.progress = 1.0;
        }

        // Accelerate if line is hovered
        if (hoveredIndex === packet.lineIndex) {
          packet.speed = 0.016;
          (packet.mesh.material as THREE.MeshBasicMaterial).opacity = 0.95;
        } else {
          packet.speed = 0.007;
          (packet.mesh.material as THREE.MeshBasicMaterial).opacity = 0.65;
        }

        const t = packet.progress;
        // Linear interpolation from center (0,0,0) to service node
        packet.mesh.position.set(targetPos.x * t, targetPos.y * t, targetPos.z * t);
      });

      // Pass updated 2D screen positions back to React for rendering interactive DOM cards
      if (onPositionsUpdateRef.current) {
        onPositionsUpdateRef.current(screenPositions);
      }

      renderer.render(scene, camera);
    };

    renderLoop();

    // Clean up
    return () => {
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('resize', handleResize);
      resizeObserver.disconnect();

      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      scene.clear();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-hidden"
    />
  );
};
