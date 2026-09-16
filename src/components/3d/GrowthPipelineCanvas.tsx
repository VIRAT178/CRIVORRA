import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Search, Megaphone, Users, Settings, BarChart3, Rocket, Play, RotateCcw } from 'lucide-react';

export interface PipelineStageData {
  id: string;
  name: string;
  microWord: string;
  iconName: 'Search' | 'Megaphone' | 'Users' | 'Settings' | 'BarChart3' | 'Rocket';
  color: string;
  secondaryColor: string;
  metric: string;
  description: string;
}

export const PIPELINE_STAGES: PipelineStageData[] = [
  {
    id: 'discover',
    name: 'DISCOVER',
    microWord: 'Insights',
    iconName: 'Search',
    color: '#0066FF',
    secondaryColor: '#00D2FF',
    metric: '360° Market Audit',
    description: 'Deep market intelligence, customer profiling, and competitor blind-spot mapping.',
  },
  {
    id: 'attract',
    name: 'ATTRACT',
    microWord: 'Visibility',
    iconName: 'Megaphone',
    color: '#7928CA',
    secondaryColor: '#B829E3',
    metric: '+450% Reach Lift',
    description: 'High-velocity multi-channel attention through AI search visibility (GEO/AEO) & media blitz.',
  },
  {
    id: 'convert',
    name: 'CONVERT',
    microWord: 'Leads',
    iconName: 'Users',
    color: '#4F46E5',
    secondaryColor: '#818CF8',
    metric: '3.8x Conversion Rate',
    description: 'Frictionless landing architectures, behavioral lead funnels, and high-intent capture.',
  },
  {
    id: 'automate',
    name: 'AUTOMATE',
    microWord: 'Systems',
    iconName: 'Settings',
    color: '#00B4D8',
    secondaryColor: '#90E0EF',
    metric: '24/7 Zero-Touch Ops',
    description: 'Enterprise CRM sync, multi-agent AI assistants, and autonomous customer nurture loops.',
  },
  {
    id: 'measure',
    name: 'MEASURE',
    microWord: 'Data',
    iconName: 'BarChart3',
    color: '#FF5E1E',
    secondaryColor: '#FFB703',
    metric: '100% Attribution Truth',
    description: 'Cross-platform attribution, real-time cohort tracking, and executive intelligence dashboards.',
  },
  {
    id: 'scale',
    name: 'SCALE',
    microWord: 'Growth',
    iconName: 'Rocket',
    color: '#FF0080',
    secondaryColor: '#FF70A6',
    metric: '10x Compounding ARR',
    description: 'Capital efficiency optimization, multi-market expansion, and compounding enterprise scale.',
  },
];

// Helper to generate a crisp 2D canvas texture with the icon & stage typography
function createNodeTexture(stage: PipelineStageData): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');

  if (ctx) {
    // Clear transparent
    ctx.clearRect(0, 0, 512, 512);

    // Subtle radial glow
    const grad = ctx.createRadialGradient(256, 256, 40, 256, 256, 250);
    grad.addColorStop(0, `${stage.color}44`);
    grad.addColorStop(0.6, `${stage.color}11`);
    grad.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(256, 256, 250, 0, Math.PI * 2);
    ctx.fill();

    // High-tech ring
    ctx.strokeStyle = `${stage.color}99`;
    ctx.lineWidth = 6;
    ctx.setLineDash([16, 12]);
    ctx.beginPath();
    ctx.arc(256, 256, 210, 0, Math.PI * 2);
    ctx.stroke();

    // Inner frosted circle
    ctx.setLineDash([]);
    ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
    ctx.beginPath();
    ctx.arc(256, 256, 170, 0, Math.PI * 2);
    ctx.fill();

    ctx.strokeStyle = stage.color;
    ctx.lineWidth = 8;
    ctx.stroke();

    // Stage Name
    ctx.font = 'bold 38px sans-serif';
    ctx.fillStyle = '#0A0F1D';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(stage.name, 256, 220);

    // Micro word
    ctx.font = 'bold 28px monospace';
    ctx.fillStyle = stage.color;
    ctx.fillText(stage.microWord.toUpperCase(), 256, 280);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

interface GrowthPipelineCanvasProps {
  onSelectStage?: (stage: PipelineStageData) => void;
  activeStageId?: string;
}

export const GrowthPipelineCanvas: React.FC<GrowthPipelineCanvasProps> = ({
  onSelectStage,
  activeStageId,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredStage, setHoveredStage] = useState<PipelineStageData | null>(null);
  const [selectedStage, setSelectedStage] = useState<PipelineStageData>(PIPELINE_STAGES[0]);
  const [isAnimationPlaying, setIsAnimationPlaying] = useState(true);
  const [isExplosionActive, setIsExplosionActive] = useState(false);

  // Sync with prop
  useEffect(() => {
    if (activeStageId) {
      const found = PIPELINE_STAGES.find((s) => s.id === activeStageId);
      if (found) setSelectedStage(found);
    }
  }, [activeStageId]);

  // Keep ref to callback & state for requestAnimationFrame
  const callbacksRef = useRef({ onSelectStage, selectedStage });
  callbacksRef.current = { onSelectStage, selectedStage };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let animId: number;
    let width = container.clientWidth || 1000;
    let height = container.clientHeight || 580;

    // Check WebGL
    try {
      const c = document.createElement('canvas');
      const gl = c.getContext('webgl') || c.getContext('experimental-webgl');
      if (!gl) return;
    } catch {
      return;
    }

    // 1. Scene
    const scene = new THREE.Scene();
    scene.background = null; // transparent to allow clean white CSS studio background

    // 2. Camera
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    // Adjusted camera distance for wide responsive horizontal framing
    camera.position.set(0, 0.2, 9.5);

    // 3. Renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container.appendChild(renderer.domElement);

    // 4. Lighting setup for pristine Apple-grade white studio aesthetic
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.8);
    scene.add(ambientLight);

    const mainKeyLight = new THREE.DirectionalLight(0xffffff, 2.5);
    mainKeyLight.position.set(5, 10, 8);
    mainKeyLight.castShadow = true;
    mainKeyLight.shadow.mapSize.width = 1024;
    mainKeyLight.shadow.mapSize.height = 1024;
    mainKeyLight.shadow.bias = -0.0005;
    scene.add(mainKeyLight);

    // Colorful rim lights for chromatic brilliance
    const blueRim = new THREE.PointLight(0x0066ff, 3.5, 18);
    blueRim.position.set(-8, 3, 4);
    scene.add(blueRim);

    const purpleRim = new THREE.PointLight(0x7928ca, 3.0, 18);
    purpleRim.position.set(0, 4, 3);
    scene.add(purpleRim);

    const orangeRim = new THREE.PointLight(0xff5e1e, 3.5, 18);
    orangeRim.position.set(8, -2, 4);
    scene.add(orangeRim);

    // Ground plane with soft shadow receiver to ground the 3D pipeline
    const groundGeo = new THREE.PlaneGeometry(35, 15);
    const groundMat = new THREE.ShadowMaterial({ opacity: 0.08 });
    const ground = new THREE.Mesh(groundGeo, groundMat);
    ground.rotation.x = -Math.PI / 2;
    ground.position.y = -2.2;
    ground.receiveShadow = true;
    scene.add(ground);

    // 5. Stage Node Geometry & Setup
    const numStages = PIPELINE_STAGES.length;
    const stageSpacing = 2.4; // horizontal spacing between nodes
    const startX = -((numStages - 1) * stageSpacing) / 2; // centered

    const stageNodes: Array<{
      group: THREE.Group;
      innerCore: THREE.Mesh;
      glassSphere: THREE.Mesh;
      orbitRing: THREE.Mesh;
      rippleRing: THREE.Mesh;
      badgePlane: THREE.Mesh;
      stageData: PipelineStageData;
      baseX: number;
      baseY: number;
      baseZ: number;
      targetZ: number;
      currentZ: number;
      orbitParticles: THREE.Points;
      light: THREE.PointLight;
    }> = [];

    // Points for the CatmullRom 3D pipeline curve
    const curvePoints: THREE.Vector3[] = [];

    PIPELINE_STAGES.forEach((stage, idx) => {
      const x = startX + idx * stageSpacing;
      // Gentle sine undulation for natural organic flow
      const y = Math.sin((idx / (numStages - 1)) * Math.PI) * 0.35 - 0.1;
      const z = 0;
      curvePoints.push(new THREE.Vector3(x, y, z));

      const stageGroup = new THREE.Group();
      stageGroup.position.set(x, y, z);
      stageGroup.userData = { stageId: stage.id, index: idx, stageData: stage };

      // Inner glowing core (crystalline color gem)
      const coreGeo = new THREE.IcosahedronGeometry(0.32, 2);
      const coreMat = new THREE.MeshStandardMaterial({
        color: new THREE.Color(stage.color),
        emissive: new THREE.Color(stage.color),
        emissiveIntensity: 0.8,
        roughness: 0.15,
        metalness: 0.8,
      });
      const innerCore = new THREE.Mesh(coreGeo, coreMat);
      stageGroup.add(innerCore);

      // Translucent glossy glass sphere (outer shell)
      const glassGeo = new THREE.SphereGeometry(0.68, 36, 36);
      const glassMat = new THREE.MeshPhysicalMaterial({
        color: 0xffffff,
        transparent: true,
        opacity: 0.45,
        roughness: 0.1,
        metalness: 0.1,
        transmission: 0.85,
        ior: 1.45,
        specularIntensity: 1.0,
        specularColor: new THREE.Color(0xffffff),
        clearcoat: 1.0,
        clearcoatRoughness: 0.05,
      });
      const glassSphere = new THREE.Mesh(glassGeo, glassMat);
      glassSphere.castShadow = true;
      stageGroup.add(glassSphere);

      // Orbit Ring (Metallic tilted ring rotating around node)
      const ringGeo = new THREE.TorusGeometry(0.95, 0.022, 16, 64);
      const ringMat = new THREE.MeshStandardMaterial({
        color: new THREE.Color(stage.secondaryColor),
        emissive: new THREE.Color(stage.color),
        emissiveIntensity: 0.5,
        metalness: 0.9,
        roughness: 0.2,
      });
      const orbitRing = new THREE.Mesh(ringGeo, ringMat);
      orbitRing.rotation.x = Math.PI / 3;
      orbitRing.rotation.y = (idx * Math.PI) / 6;
      stageGroup.add(orbitRing);

      // Shockwave Ripple Ring (fades & expands when struck by energy pulse)
      const rippleGeo = new THREE.RingGeometry(0.7, 0.78, 48);
      const rippleMat = new THREE.MeshBasicMaterial({
        color: new THREE.Color(stage.color),
        transparent: true,
        opacity: 0,
        side: THREE.DoubleSide,
      });
      const rippleRing = new THREE.Mesh(rippleGeo, rippleMat);
      rippleRing.rotation.x = -Math.PI / 2;
      stageGroup.add(rippleRing);

      // Floating Icon Texture Badge inside node
      const badgeGeo = new THREE.PlaneGeometry(0.85, 0.85);
      const texture = createNodeTexture(stage);
      const badgeMat = new THREE.MeshBasicMaterial({
        map: texture,
        transparent: true,
        opacity: 0.95,
        side: THREE.DoubleSide,
      });
      const badgePlane = new THREE.Mesh(badgeGeo, badgeMat);
      badgePlane.position.z = 0.02;
      stageGroup.add(badgePlane);

      // Orbiting micro-satellites/particles around each node
      const pCount = 24;
      const pGeo = new THREE.BufferGeometry();
      const pPos = new Float32Array(pCount * 3);
      for (let p = 0; p < pCount; p++) {
        const theta = (p / pCount) * Math.PI * 2;
        const radius = 1.05 + Math.random() * 0.2;
        pPos[p * 3] = Math.cos(theta) * radius;
        pPos[p * 3 + 1] = (Math.random() - 0.5) * 0.4;
        pPos[p * 3 + 2] = Math.sin(theta) * radius;
      }
      pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
      const pMat = new THREE.PointsMaterial({
        color: new THREE.Color(stage.secondaryColor),
        size: 0.045,
        transparent: true,
        opacity: 0.7,
      });
      const orbitParticles = new THREE.Points(pGeo, pMat);
      stageGroup.add(orbitParticles);

      // Local dynamic point light
      const nodeLight = new THREE.PointLight(new THREE.Color(stage.color), 1.2, 3.5);
      stageGroup.add(nodeLight);

      scene.add(stageGroup);

      stageNodes.push({
        group: stageGroup,
        innerCore,
        glassSphere,
        orbitRing,
        rippleRing,
        badgePlane,
        stageData: stage,
        baseX: x,
        baseY: y,
        baseZ: z,
        targetZ: z,
        currentZ: z,
        orbitParticles,
        light: nodeLight,
      });
    });

    // 6. Connective 3D Pipeline Spline & Tube
    const pipelineCurve = new THREE.CatmullRomCurve3(curvePoints);
    pipelineCurve.curveType = 'catmullrom';
    pipelineCurve.tension = 0.4;

    // Outer translucent glass pipeline tube
    const tubeGeo = new THREE.TubeGeometry(pipelineCurve, 120, 0.065, 16, false);
    const tubeMat = new THREE.MeshPhysicalMaterial({
      color: 0x0066ff,
      transparent: true,
      opacity: 0.35,
      roughness: 0.2,
      metalness: 0.3,
      transmission: 0.6,
      ior: 1.3,
      clearcoat: 0.8,
    });
    const tubeMesh = new THREE.Mesh(tubeGeo, tubeMat);
    scene.add(tubeMesh);

    // Inner Glowing Core Laser Line
    const innerLaserGeo = new THREE.TubeGeometry(pipelineCurve, 120, 0.024, 8, false);
    const innerLaserMat = new THREE.MeshStandardMaterial({
      color: 0x00d2ff,
      emissive: 0x0066ff,
      emissiveIntensity: 1.5,
      roughness: 0.2,
      metalness: 0.8,
    });
    const innerLaser = new THREE.Mesh(innerLaserGeo, innerLaserMat);
    scene.add(innerLaser);

    // Glowing CRIVORRA Energy Pulse Orb traveling through the pipeline
    const pulseCoreGeo = new THREE.SphereGeometry(0.18, 24, 24);
    const pulseCoreMat = new THREE.MeshBasicMaterial({
      color: 0xffffff,
    });
    const pulseCore = new THREE.Mesh(pulseCoreGeo, pulseCoreMat);

    const pulseAuraGeo = new THREE.SphereGeometry(0.38, 24, 24);
    const pulseAuraMat = new THREE.MeshBasicMaterial({
      color: 0x00d2ff,
      transparent: true,
      opacity: 0.65,
    });
    const pulseAura = new THREE.Mesh(pulseAuraGeo, pulseAuraMat);
    pulseCore.add(pulseAura);

    const pulseLight = new THREE.PointLight(0x00ffff, 4.0, 5.0);
    pulseCore.add(pulseLight);

    scene.add(pulseCore);

    // 7. Premium Particle Explosion System (triggered at stage 6: SCALE)
    const explosionCount = 140;
    const explosionGeo = new THREE.BufferGeometry();
    const explosionPositions = new Float32Array(explosionCount * 3);
    const explosionVelocities: THREE.Vector3[] = [];
    const explosionColors = new Float32Array(explosionCount * 3);

    const brandColors = [
      new THREE.Color('#0066FF'),
      new THREE.Color('#7928CA'),
      new THREE.Color('#FF0080'),
      new THREE.Color('#FF5E1E'),
      new THREE.Color('#00D2FF'),
    ];

    for (let e = 0; e < explosionCount; e++) {
      explosionPositions[e * 3] = curvePoints[5].x;
      explosionPositions[e * 3 + 1] = curvePoints[5].y;
      explosionPositions[e * 3 + 2] = curvePoints[5].z;

      // Upward fountain velocity
      const vx = (Math.random() - 0.5) * 1.6;
      const vy = 1.2 + Math.random() * 2.6; // strong upward impulse
      const vz = (Math.random() - 0.5) * 1.4;
      explosionVelocities.push(new THREE.Vector3(vx, vy, vz));

      const c = brandColors[Math.floor(Math.random() * brandColors.length)];
      explosionColors[e * 3] = c.r;
      explosionColors[e * 3 + 1] = c.g;
      explosionColors[e * 3 + 2] = c.b;
    }

    explosionGeo.setAttribute('position', new THREE.BufferAttribute(explosionPositions, 3));
    explosionGeo.setAttribute('color', new THREE.BufferAttribute(explosionColors, 3));

    const explosionMat = new THREE.PointsMaterial({
      size: 0.09,
      vertexColors: true,
      transparent: true,
      opacity: 0, // starts invisible
      blending: THREE.AdditiveBlending,
    });
    const explosionParticles = new THREE.Points(explosionGeo, explosionMat);
    scene.add(explosionParticles);

    // Ambient floating dust particles in background
    const ambientCount = 80;
    const ambientGeo = new THREE.BufferGeometry();
    const ambientPos = new Float32Array(ambientCount * 3);
    for (let a = 0; a < ambientCount; a++) {
      ambientPos[a * 3] = (Math.random() - 0.5) * 20;
      ambientPos[a * 3 + 1] = (Math.random() - 0.5) * 8;
      ambientPos[a * 3 + 2] = (Math.random() - 0.5) * 6 - 2;
    }
    ambientGeo.setAttribute('position', new THREE.BufferAttribute(ambientPos, 3));
    const ambientMat = new THREE.PointsMaterial({
      color: 0x0066ff,
      size: 0.035,
      transparent: true,
      opacity: 0.25,
    });
    const ambientParticles = new THREE.Points(ambientGeo, ambientMat);
    scene.add(ambientParticles);

    // 8. Raycasting for Direct 3D Mouse Hover & Click
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2(-1000, -1000);

    const onPointerMove = (e: MouseEvent) => {
      const rect = renderer.domElement.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
    };

    const onClick = (e: MouseEvent) => {
      const rect = renderer.domElement.getBoundingClientRect();
      const clickX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const clickY = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(new THREE.Vector2(clickX, clickY), camera);
      const meshesToTest = stageNodes.map((s) => s.glassSphere);
      const intersects = raycaster.intersectObjects(meshesToTest);

      if (intersects.length > 0) {
        const hit = intersects[0].object.parent;
        if (hit && hit.userData && hit.userData.stageData) {
          const clickedStage = hit.userData.stageData as PipelineStageData;
          setSelectedStage(clickedStage);
          if (callbacksRef.current.onSelectStage) {
            callbacksRef.current.onSelectStage(clickedStage);
          }
        }
      }
    };

    renderer.domElement.addEventListener('mousemove', onPointerMove);
    renderer.domElement.addEventListener('click', onClick);

    // 9. Animation & Traveling Energy Loop
    let pulseT = 0; // 0 to 1 along the pipeline spline
    const pulseSpeed = 0.0028;
    let explosionTimer = 0;
    const stageRipples: number[] = new Array(numStages).fill(0);

    const clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const delta = clock.getDelta();
      const elapsedTime = clock.getElapsedTime();

      // Check hover via raycaster
      raycaster.setFromCamera(mouse, camera);
      const intersectable = stageNodes.map((s) => s.glassSphere);
      const hits = raycaster.intersectObjects(intersectable);

      let currentHovered: PipelineStageData | null = null;
      let hoveredIndex = -1;

      if (hits.length > 0) {
        const hitParent = hits[0].object.parent;
        if (hitParent && hitParent.userData && hitParent.userData.stageData) {
          currentHovered = hitParent.userData.stageData;
          hoveredIndex = hitParent.userData.index;
          document.body.style.cursor = 'pointer';
        }
      } else {
        document.body.style.cursor = 'default';
      }
      setHoveredStage(currentHovered);

      // Pulse progression
      pulseT += pulseSpeed;
      if (pulseT > 1.0) {
        pulseT = 0; // loop back to start
      }

      // Compute pulse 3D coordinate along the CatmullRom spline
      const pulsePos = pipelineCurve.getPoint(pulseT);
      pulseCore.position.copy(pulsePos);

      // Check which stage the pulse is closest to and trigger its reaction
      stageNodes.forEach((node, i) => {
        const stageT = i / (numStages - 1);
        const distToPulse = Math.abs(pulseT - stageT);

        // Idle floating oscillation
        const floatY = Math.sin(elapsedTime * 1.5 + i * 1.1) * 0.08;
        node.group.position.y = node.baseY + floatY;

        // When pulse is near this stage (within 0.06 of spline distance)
        const isPulseStriking = distToPulse < 0.055;
        const isHoveredOrSelected =
          hoveredIndex === i ||
          node.stageData.id === callbacksRef.current.selectedStage.id;

        // Target Z elevation toward the camera
        if (isHoveredOrSelected) {
          node.targetZ = 0.95; // comes prominently forward toward camera
        } else if (isPulseStriking) {
          node.targetZ = 0.65;
          stageRipples[i] = 1.0; // trigger shockwave ripple
        } else {
          node.targetZ = 0;
        }

        // Smooth spring lerp for Z position
        node.currentZ += (node.targetZ - node.currentZ) * 0.1;
        node.group.position.z = node.currentZ;

        // Orbit ring rotation: accelerates when hovered or struck
        const spinSpeed = isHoveredOrSelected ? 3.5 : isPulseStriking ? 2.5 : 0.8;
        node.orbitRing.rotation.z += delta * spinSpeed;
        node.orbitParticles.rotation.y += delta * (spinSpeed * 0.6);

        // Core rotation
        node.innerCore.rotation.x += delta * 1.2;
        node.innerCore.rotation.y += delta * 1.4;

        // Light intensity Surge
        const baseIntensity = 1.2;
        const targetIntensity = isHoveredOrSelected
          ? 3.8
          : isPulseStriking
          ? 3.2
          : baseIntensity;
        node.light.intensity += (targetIntensity - node.light.intensity) * 0.15;

        // Shockwave ripple expansion
        if (stageRipples[i] > 0) {
          stageRipples[i] -= delta * 1.6;
          if (stageRipples[i] < 0) stageRipples[i] = 0;

          const scale = 1.0 + (1.0 - stageRipples[i]) * 1.6;
          node.rippleRing.scale.set(scale, scale, scale);
          (node.rippleRing.material as THREE.MeshBasicMaterial).opacity =
            stageRipples[i] * 0.8;
        }

        // Keep icon badge facing the camera
        node.badgePlane.lookAt(camera.position);
      });

      // Illuminate pipeline line behind the pulse
      // Dynamic color shift matching current stage
      const currentStageIdx = Math.min(
        Math.floor(pulseT * numStages),
        numStages - 1
      );
      const activeColor = new THREE.Color(
        PIPELINE_STAGES[currentStageIdx].color
      );
      innerLaserMat.emissive.lerp(activeColor, 0.1);
      pulseAuraMat.color.lerp(activeColor, 0.1);
      pulseLight.color.lerp(activeColor, 0.1);

      // Trigger SCALE upward particle explosion at the final stage (pulseT > 0.94)
      if (pulseT > 0.93 && pulseT < 0.99) {
        if (explosionTimer <= 0) {
          explosionTimer = 1.0;
          setIsExplosionActive(true);
        }
      }

      // Handle Particle Explosion update
      if (explosionTimer > 0) {
        explosionTimer -= delta * 0.7;
        explosionMat.opacity = Math.max(0, explosionTimer);

        const posAttr = explosionGeo.attributes.position as THREE.BufferAttribute;
        const posArray = posAttr.array as Float32Array;

        for (let e = 0; e < explosionCount; e++) {
          posArray[e * 3] += explosionVelocities[e].x * delta;
          posArray[e * 3 + 1] += explosionVelocities[e].y * delta;
          posArray[e * 3 + 2] += explosionVelocities[e].z * delta;

          // Apply slight upward drag & gravity
          explosionVelocities[e].y -= delta * 0.45;
        }
        posAttr.needsUpdate = true;
      } else {
        explosionMat.opacity = 0;
        setIsExplosionActive(false);
        // Reset explosion particle origins to stage 6
        const posAttr = explosionGeo.attributes.position as THREE.BufferAttribute;
        const posArray = posAttr.array as Float32Array;
        for (let e = 0; e < explosionCount; e++) {
          posArray[e * 3] = curvePoints[5].x;
          posArray[e * 3 + 1] = curvePoints[5].y;
          posArray[e * 3 + 2] = curvePoints[5].z;
          // Re-randomize velocity
          explosionVelocities[e].set(
            (Math.random() - 0.5) * 1.6,
            1.2 + Math.random() * 2.6,
            (Math.random() - 0.5) * 1.4
          );
        }
        posAttr.needsUpdate = true;
      }

      // Ambient background particles drift
      ambientParticles.rotation.y = elapsedTime * 0.03;
      ambientParticles.rotation.x = Math.sin(elapsedTime * 0.02) * 0.05;

      renderer.render(scene, camera);
    };

    animate();

    // 10. Resize handling with ResizeObserver
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width: newWidth, height: newHeight } = entry.contentRect;
        if (newWidth > 0 && newHeight > 0) {
          camera.aspect = newWidth / newHeight;
          // Responsive camera distance for narrow screen layouts
          if (newWidth < 768) {
            camera.position.z = 12.5;
          } else if (newWidth < 1024) {
            camera.position.z = 10.5;
          } else {
            camera.position.z = 9.5;
          }
          camera.updateProjectionMatrix();
          renderer.setSize(newWidth, newHeight);
        }
      }
    });
    resizeObserver.observe(container);

    // Cleanup
    return () => {
      cancelAnimationFrame(animId);
      resizeObserver.disconnect();
      renderer.domElement.removeEventListener('mousemove', onPointerMove);
      renderer.domElement.removeEventListener('click', onClick);
      document.body.style.cursor = 'default';

      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  const getStageIcon = (name: string) => {
    switch (name) {
      case 'Search':
        return <Search className="w-4 h-4" />;
      case 'Megaphone':
        return <Megaphone className="w-4 h-4" />;
      case 'Users':
        return <Users className="w-4 h-4" />;
      case 'Settings':
        return <Settings className="w-4 h-4" />;
      case 'BarChart3':
        return <BarChart3 className="w-4 h-4" />;
      case 'Rocket':
        return <Rocket className="w-4 h-4" />;
      default:
        return <Search className="w-4 h-4" />;
    }
  };

  return (
    <div className="relative w-full flex flex-col items-center">
      {/* 3D WebGL Canvas Container */}
      <div
        ref={containerRef}
        className="relative w-full h-[380px] sm:h-[460px] md:h-[520px] lg:h-[560px] select-none"
        style={{ touchAction: 'pan-y' }}
      >
        {/* Subtle Watermark CRIVORRA 'C' in background */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.035] select-none">
          <svg
            viewBox="0 0 800 800"
            className="w-[500px] sm:w-[700px] h-[500px] sm:h-[700px] -rotate-6"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M 620 180 C 510 70, 260 85, 150 210 C 35 340, 35 500, 150 630 C 260 760, 530 760, 660 630 C 710 580, 690 520, 630 520 C 565 520, 550 570, 500 600 C 390 680, 230 650, 165 550 C 100 450, 100 360, 165 260 C 230 165, 390 150, 500 215 C 550 250, 600 250, 640 215 Z"
              fill="#0066FF"
            />
          </svg>
        </div>

        {/* Hover / Active Micro-Word Floating Pill Overlay */}
        {(hoveredStage || selectedStage) && (
          <div className="absolute top-4 sm:top-6 left-1/2 -translate-x-1/2 pointer-events-none z-20">
            <div className="px-5 py-2 rounded-full bg-white/95 backdrop-blur-md border border-slate-200/90 shadow-xl shadow-slate-900/5 flex items-center gap-3 animate-in fade-in zoom-in-95 duration-200">
              <span
                className="w-2.5 h-2.5 rounded-full animate-ping"
                style={{
                  backgroundColor: (hoveredStage || selectedStage).color,
                }}
              />
              <span className="font-display font-black text-xs sm:text-sm text-[#0A0F1D] tracking-wide">
                {(hoveredStage || selectedStage).name}
              </span>
              <span className="text-slate-300 font-mono-code text-xs">→</span>
              <span
                className="font-mono-code font-bold text-xs sm:text-sm uppercase tracking-wider"
                style={{ color: (hoveredStage || selectedStage).color }}
              >
                {(hoveredStage || selectedStage).microWord}
              </span>
            </div>
          </div>
        )}

        {/* Mobile / Helper Hint */}
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 pointer-events-none z-10 text-[11px] font-mono-code text-slate-600 bg-white/80 px-3 py-1 rounded-full border border-slate-200">
          Hover or click any 3D node to inspect stage
        </div>
      </div>

      {/* Horizontal Interactive Stage Selector Bar */}
      <div className="w-full max-w-5xl px-4 mt-2">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 sm:gap-3">
          {PIPELINE_STAGES.map((stage) => {
            const isSelected = selectedStage.id === stage.id;
            return (
              <button
                key={stage.id}
                type="button"
                onClick={() => {
                  setSelectedStage(stage);
                  if (onSelectStage) onSelectStage(stage);
                }}
                className={`relative p-3.5 rounded-2xl text-left transition-all duration-300 cursor-pointer flex flex-col justify-between border ${
                  isSelected
                    ? 'bg-white shadow-lg border-slate-300 ring-2 ring-offset-2'
                    : 'bg-white/70 hover:bg-white hover:border-slate-300 border-slate-200/80 shadow-xs'
                }`}
                style={{
                  outlineColor: stage.color,
                }}
              >
                <div className="flex items-center justify-between mb-2">
                  <div
                    className="w-7 h-7 rounded-xl flex items-center justify-center transition-transform"
                    style={{
                      backgroundColor: `${stage.color}18`,
                      color: stage.color,
                    }}
                  >
                    {getStageIcon(stage.iconName)}
                  </div>
                  <span
                    className="font-mono-code text-[10px] font-bold px-1.5 py-0.5 rounded-md"
                    style={{
                      backgroundColor: isSelected ? `${stage.color}15` : '#F1F5F9',
                      color: isSelected ? stage.color : '#64748B',
                    }}
                  >
                    {stage.microWord}
                  </span>
                </div>

                <div>
                  <div className="font-display font-black text-xs sm:text-sm text-[#0A0F1D]">
                    {stage.name}
                  </div>
                  <div className="font-mono-code text-[10px] text-slate-600 line-clamp-1 mt-0.5">
                    {stage.metric}
                  </div>
                </div>

                {isSelected && (
                  <div
                    className="absolute bottom-0 inset-x-3 h-[2.5px] rounded-t-full"
                    style={{ backgroundColor: stage.color }}
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
