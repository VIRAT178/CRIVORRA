import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export interface ApproachStepData {
  number: string;
  name: string;
  color: string;
  secondaryColor: string;
  iconType: 'search' | 'chart' | 'pencil' | 'gear' | 'analytics' | 'rocket';
  tagline: string;
}

interface OurApproachCanvas3DProps {
  activeStepIndex: number;
  hoveredStepIndex: number | null;
  onSelectStep: (index: number) => void;
  onHoverStep: (index: number | null) => void;
  steps: ApproachStepData[];
}

export const OurApproachCanvas3D: React.FC<OurApproachCanvas3DProps> = ({
  activeStepIndex,
  hoveredStepIndex,
  onSelectStep,
  onHoverStep,
  steps,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const animFrameRef = useRef<number | null>(null);

  const activeIndexRef = useRef(activeStepIndex);
  const hoveredIndexRef = useRef(hoveredStepIndex);
  const onSelectStepRef = useRef(onSelectStep);
  const onHoverStepRef = useRef(onHoverStep);
  const stepsRef = useRef(steps);

  useEffect(() => {
    activeIndexRef.current = activeStepIndex;
  }, [activeStepIndex]);

  useEffect(() => {
    hoveredIndexRef.current = hoveredStepIndex;
  }, [hoveredStepIndex]);

  useEffect(() => {
    onSelectStepRef.current = onSelectStep;
  }, [onSelectStep]);

  useEffect(() => {
    onHoverStepRef.current = onHoverStep;
  }, [onHoverStep]);

  useEffect(() => {
    stepsRef.current = steps;
  }, [steps]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let width = container.clientWidth || 1000;
    let height = container.clientHeight || 420;

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
    const camera = new THREE.PerspectiveCamera(34, width / height, 0.1, 100);

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

    // Responsive camera positioning
    const calcResponsiveCameraZ = (w: number, h: number): number => {
      const aspect = w / h;
      const fovRad = (camera.fov * Math.PI) / 180;
      const tanHalfFov = Math.tan(fovRad / 2);

      // Total scene spans ~10.4 units horizontally (-5.2 to +5.2) and ~4.4 vertically (-2.2 to +2.2)
      const halfWidth = aspect < 1.0 ? 5.8 : aspect < 1.6 ? 5.6 : 5.2;
      const halfHeight = 2.4;

      const distForX = halfWidth / (tanHalfFov * aspect);
      const distForY = halfHeight / tanHalfFov;

      return Math.max(distForX, distForY, 8.5) * 1.05;
    };

    let targetCameraZ = calcResponsiveCameraZ(width, height);
    camera.position.set(0, 0, targetCameraZ);

    // 2. LIGHTING
    const ambientLight = new THREE.AmbientLight(0xffffff, 2.5);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 2.8);
    keyLight.position.set(5, 8, 8);
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0xe0f2fe, 1.8);
    fillLight.position.set(-6, -4, 6);
    scene.add(fillLight);

    const backRimLight = new THREE.DirectionalLight(0xffffff, 1.4);
    backRimLight.position.set(0, 5, -6);
    scene.add(backRimLight);

    // Central dynamic spotlight on Brand Logo
    const centralLogoLight = new THREE.PointLight(0x00d2ff, 4.0, 10);
    centralLogoLight.position.set(0, 1.35, 1.6);
    scene.add(centralLogoLight);

    // Active hanging step spotlight
    const activeStepLight = new THREE.PointLight(0x0066ff, 5.0, 7);
    activeStepLight.position.set(0, -1.2, 1.5);
    scene.add(activeStepLight);

    const stageRoot = new THREE.Group();
    scene.add(stageRoot);

    // 3. LEVEL 1: HORIZONTALLY CENTERED BIG BRAND LOGO (Top Line)
    const logoY = 1.35;
    const logoGroup = new THREE.Group();
    logoGroup.position.set(0, logoY, 0);
    stageRoot.add(logoGroup);

    // Chrome Base Disc
    const chromeMat = new THREE.MeshStandardMaterial({
      color: 0xf8fafc,
      metalness: 0.92,
      roughness: 0.12,
    });

    const logoRadius = 1.05;
    const coreBaseGeo = new THREE.CylinderGeometry(logoRadius, logoRadius + 0.08, 0.16, 64);
    const coreBaseMesh = new THREE.Mesh(coreBaseGeo, chromeMat);
    coreBaseMesh.rotation.x = Math.PI * 0.5;
    coreBaseMesh.position.set(0, 0, -0.05);
    logoGroup.add(coreBaseMesh);

    // Luminous perimeter ring
    const coreRimGeo = new THREE.TorusGeometry(logoRadius + 0.08, 0.035, 20, 80);
    const coreRimMat = new THREE.MeshBasicMaterial({
      color: 0x00d2ff,
      transparent: true,
      opacity: 0.9,
    });
    const coreRimMesh = new THREE.Mesh(coreRimGeo, coreRimMat);
    coreRimMesh.position.set(0, 0, 0.02);
    logoGroup.add(coreRimMesh);

    // High-Res Canvas Medallion for Brand Logo
    const logoCanvas = document.createElement('canvas');
    logoCanvas.width = 1024;
    logoCanvas.height = 1024;
    const lctx = logoCanvas.getContext('2d');

    const drawBaseMedallion = () => {
      if (!lctx) return;
      lctx.clearRect(0, 0, 1024, 1024);

      // Outer gradient circle border
      const borderGrad = lctx.createLinearGradient(120, 120, 904, 904);
      borderGrad.addColorStop(0, '#FF4500');
      borderGrad.addColorStop(0.32, '#FF0080');
      borderGrad.addColorStop(0.68, '#7928CA');
      borderGrad.addColorStop(1, '#00D2FF');

      lctx.fillStyle = borderGrad;
      lctx.beginPath();
      lctx.arc(512, 512, 498, 0, Math.PI * 2);
      lctx.fill();

      // Pure White Disc
      lctx.fillStyle = '#FFFFFF';
      lctx.beginPath();
      lctx.arc(512, 512, 474, 0, Math.PI * 2);
      lctx.fill();
    };

    const drawFallbackLogo = () => {
      if (!lctx) return;
      drawBaseMedallion();

      // Gradient C Emblem
      lctx.save();
      lctx.translate(512, 440);

      const cGrad = lctx.createLinearGradient(-180, -180, 180, 180);
      cGrad.addColorStop(0, '#FF4500');
      cGrad.addColorStop(0.35, '#FF0080');
      cGrad.addColorStop(0.68, '#7928CA');
      cGrad.addColorStop(1, '#00D2FF');

      lctx.strokeStyle = cGrad;
      lctx.lineWidth = 76;
      lctx.lineCap = 'round';
      lctx.beginPath();
      lctx.arc(0, 0, 170, Math.PI * 0.28, Math.PI * 1.76, false);
      lctx.stroke();

      // Top arrow
      lctx.fillStyle = '#FF4500';
      lctx.beginPath();
      lctx.moveTo(125, -155);
      lctx.lineTo(205, -155);
      lctx.lineTo(205, -75);
      lctx.closePath();
      lctx.fill();

      lctx.restore();

      // BRAND TEXT: CRIVORRA
      lctx.fillStyle = '#0F172A';
      lctx.font = '900 80px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
      lctx.textAlign = 'center';
      lctx.letterSpacing = '8px';
      lctx.fillText('CRIVORRA', 512, 715);

      // BRAND TEXT: DIGITALS
      lctx.fillStyle = '#FF4500';
      lctx.font = 'bold 44px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
      lctx.textAlign = 'center';
      lctx.letterSpacing = '18px';
      lctx.fillText('DIGITALS', 512, 785);
    };

    drawFallbackLogo();

    const logoTexture = new THREE.CanvasTexture(logoCanvas);
    logoTexture.anisotropy = renderer.capabilities.getMaxAnisotropy();

    const medallionGeo = new THREE.CircleGeometry(1.02, 64);
    const medallionMat = new THREE.MeshBasicMaterial({
      map: logoTexture,
      transparent: false,
    });
    const medallionMesh = new THREE.Mesh(medallionGeo, medallionMat);
    medallionMesh.position.set(0, 0, 0.12);
    logoGroup.add(medallionMesh);

    // Load authentic image
    const brandImg = new Image();
    brandImg.crossOrigin = 'anonymous';
    brandImg.src = '/Crivorra Digitals.png';
    brandImg.onload = () => {
      if (!lctx) return;
      drawBaseMedallion();
      const maxDim = 720;
      const scale = maxDim / Math.max(brandImg.width, brandImg.height);
      const dw = brandImg.width * scale;
      const dh = brandImg.height * scale;
      const dx = (1024 - dw) / 2;
      const dy = (1024 - dh) / 2;
      lctx.drawImage(brandImg, dx, dy, dw, dh);
      logoTexture.needsUpdate = true;
    };

    // Concentric Energy Pulse Waves around Logo
    const pulseRings: { mesh: THREE.Mesh; scale: number; speed: number }[] = [];
    for (let r = 0; r < 2; r++) {
      const rGeo = new THREE.RingGeometry(1.2 + r * 0.5, 1.23 + r * 0.5, 64);
      const rMat = new THREE.MeshBasicMaterial({
        color: 0x00d2ff,
        transparent: true,
        opacity: 0.25 - r * 0.08,
        side: THREE.DoubleSide,
      });
      const rMesh = new THREE.Mesh(rGeo, rMat);
      rMesh.position.set(0, 0, -0.02);
      logoGroup.add(rMesh);
      pulseRings.push({ mesh: rMesh, scale: 1.0 + r * 0.3, speed: 0.003 + r * 0.001 });
    }

    // 4. LEVEL 2: SIX APPROACH STEPS HANGING IN THE SECOND LINE
    const numSteps = 6;
    const stepsY = -1.2;
    // 6 evenly distributed horizontal coordinates centered at 0
    // e.g. -4.1, -2.46, -0.82, +0.82, +2.46, +4.1
    const stepSpacing = 1.68;
    const stepXPositions = [-2.5 * stepSpacing, -1.5 * stepSpacing, -0.5 * stepSpacing, 0.5 * stepSpacing, 1.5 * stepSpacing, 2.5 * stepSpacing];

    // Texture Generator Helpers
    const createBadgeTexture = (numberStr: string, colorHexStr: string): THREE.CanvasTexture => {
      const c = document.createElement('canvas');
      c.width = 160;
      c.height = 160;
      const ctx = c.getContext('2d');
      if (ctx) {
        ctx.clearRect(0, 0, 160, 160);
        ctx.fillStyle = colorHexStr;
        ctx.beginPath();
        ctx.arc(80, 80, 72, 0, Math.PI * 2);
        ctx.fill();

        ctx.strokeStyle = '#FFFFFF';
        ctx.lineWidth = 8;
        ctx.stroke();

        ctx.fillStyle = '#FFFFFF';
        ctx.font = '900 68px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(numberStr, 80, 84);
      }
      const tex = new THREE.CanvasTexture(c);
      tex.anisotropy = renderer.capabilities.getMaxAnisotropy();
      return tex;
    };

    const createTitleTexture = (nameStr: string, colorHexStr: string): THREE.CanvasTexture => {
      const c = document.createElement('canvas');
      c.width = 512;
      c.height = 128;
      const ctx = c.getContext('2d');
      if (ctx) {
        ctx.clearRect(0, 0, 512, 128);

        ctx.fillStyle = '#0F172A';
        ctx.font = '900 52px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
        ctx.textAlign = 'center';
        ctx.letterSpacing = '3px';
        ctx.fillText(nameStr, 256, 68);

        // Accent underline pill
        ctx.fillStyle = colorHexStr;
        ctx.beginPath();
        ctx.roundRect(256 - 36, 86, 72, 7, 3);
        ctx.fill();
      }
      const tex = new THREE.CanvasTexture(c);
      tex.anisotropy = renderer.capabilities.getMaxAnisotropy();
      return tex;
    };

    const createIconTexture = (
      type: ApproachStepData['iconType'],
      colorHexStr: string
    ): THREE.CanvasTexture => {
      const c = document.createElement('canvas');
      c.width = 256;
      c.height = 256;
      const ctx = c.getContext('2d');
      if (ctx) {
        ctx.clearRect(0, 0, 256, 256);
        ctx.strokeStyle = colorHexStr;
        ctx.fillStyle = colorHexStr;
        ctx.lineWidth = 18;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        const center = 128;

        if (type === 'search') {
          ctx.beginPath();
          ctx.arc(110, 110, 52, 0, Math.PI * 2);
          ctx.stroke();
          ctx.beginPath();
          ctx.moveTo(148, 148);
          ctx.lineTo(198, 198);
          ctx.stroke();
        } else if (type === 'chart') {
          ctx.beginPath();
          ctx.roundRect(62, 140, 32, 60, 6);
          ctx.roundRect(112, 100, 32, 100, 6);
          ctx.roundRect(162, 60, 32, 140, 6);
          ctx.fill();
        } else if (type === 'pencil') {
          ctx.save();
          ctx.translate(center, center);
          ctx.rotate(-Math.PI * 0.25);
          ctx.beginPath();
          ctx.roundRect(-22, -60, 44, 100, 8);
          ctx.fill();
          ctx.beginPath();
          ctx.moveTo(-22, 40);
          ctx.lineTo(22, 40);
          ctx.lineTo(0, 80);
          ctx.closePath();
          ctx.fill();
          ctx.restore();
        } else if (type === 'gear') {
          ctx.save();
          ctx.translate(center, center);
          ctx.lineWidth = 16;
          ctx.beginPath();
          ctx.arc(0, 0, 45, 0, Math.PI * 2);
          ctx.stroke();
          for (let i = 0; i < 8; i++) {
            ctx.save();
            ctx.rotate((i * Math.PI) / 4);
            ctx.fillRect(-10, -72, 20, 24);
            ctx.restore();
          }
          ctx.beginPath();
          ctx.arc(0, 0, 18, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        } else if (type === 'analytics') {
          ctx.beginPath();
          ctx.roundRect(60, 150, 26, 50, 4);
          ctx.roundRect(100, 115, 26, 85, 4);
          ctx.roundRect(140, 80, 26, 120, 4);
          ctx.fill();
          ctx.beginPath();
          ctx.moveTo(60, 110);
          ctx.lineTo(110, 75);
          ctx.lineTo(185, 45);
          ctx.stroke();
          ctx.beginPath();
          ctx.moveTo(185, 45);
          ctx.lineTo(155, 45);
          ctx.lineTo(185, 75);
          ctx.closePath();
          ctx.fill();
        } else if (type === 'rocket') {
          ctx.save();
          ctx.translate(center, center);
          ctx.rotate(-Math.PI * 0.25);
          ctx.beginPath();
          ctx.ellipse(0, -10, 36, 68, 0, 0, Math.PI * 2);
          ctx.fill();
          ctx.beginPath();
          ctx.moveTo(-32, 20);
          ctx.lineTo(-60, 50);
          ctx.lineTo(-24, 46);
          ctx.closePath();
          ctx.fill();
          ctx.beginPath();
          ctx.moveTo(32, 20);
          ctx.lineTo(60, 50);
          ctx.lineTo(24, 46);
          ctx.closePath();
          ctx.fill();
          ctx.fillStyle = '#ffffff';
          ctx.beginPath();
          ctx.arc(0, -25, 14, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        }
      }
      const tex = new THREE.CanvasTexture(c);
      tex.anisotropy = renderer.capabilities.getMaxAnisotropy();
      return tex;
    };

    interface HangingStepNode3D {
      group: THREE.Group;
      baseMesh: THREE.Mesh;
      rimMesh: THREE.Mesh;
      domeMesh: THREE.Mesh;
      suspensionCap: THREE.Mesh;
      suspensionRing: THREE.Mesh;
      iconSprite: THREE.Sprite;
      badgeSprite: THREE.Sprite;
      titleSprite: THREE.Sprite;
      cableMesh: THREE.Mesh;
      cableGlow: THREE.Mesh;
      photonParticle: THREE.Mesh;
      originPos: THREE.Vector3;
      anchorPosOnLogo: THREE.Vector3;
      pos: THREE.Vector3;
      color: THREE.Color;
      colorHex: number;
      index: number;
    }

    const stepNodes: HangingStepNode3D[] = [];
    const interactiveMeshes: THREE.Object3D[] = [];
    const currentSteps = stepsRef.current;

    // Anchor points along bottom perimeter of the centered brand logo
    // Angles distributed across bottom arc (-145 deg to -35 deg)
    const anchorAngles = [
      (-145 * Math.PI) / 180,
      (-122 * Math.PI) / 180,
      (-98 * Math.PI) / 180,
      (-82 * Math.PI) / 180,
      (-58 * Math.PI) / 180,
      (-35 * Math.PI) / 180,
    ];

    for (let i = 0; i < numSteps; i++) {
      const stepData = currentSteps[i];
      const colorHex = parseInt(stepData.color.replace('#', '0x'), 16);
      const color = new THREE.Color(colorHex);

      const targetX = stepXPositions[i];
      const stepPos = new THREE.Vector3(targetX, stepsY, 0.05);

      // Hanging Step Node Group
      const nodeGroup = new THREE.Group();
      nodeGroup.position.copy(stepPos);
      stageRoot.add(nodeGroup);

      // Top Suspension Cap & Ring on the pendant
      const capGeo = new THREE.CylinderGeometry(0.12, 0.16, 0.14, 24);
      const capMesh = new THREE.Mesh(capGeo, chromeMat);
      capMesh.position.set(0, 0.62, 0.05);
      nodeGroup.add(capMesh);

      const ringGeo = new THREE.TorusGeometry(0.12, 0.024, 16, 32);
      const ringMat = new THREE.MeshStandardMaterial({
        color: colorHex,
        metalness: 0.9,
        roughness: 0.2,
      });
      const ringMesh = new THREE.Mesh(ringGeo, ringMat);
      ringMesh.position.set(0, 0.74, 0.05);
      nodeGroup.add(ringMesh);

      // Chrome Pedestal
      const baseGeo = new THREE.CylinderGeometry(0.52, 0.60, 0.12, 48);
      const baseMesh = new THREE.Mesh(baseGeo, chromeMat);
      baseMesh.rotation.x = Math.PI * 0.5;
      baseMesh.position.z = -0.06;
      nodeGroup.add(baseMesh);

      // Luminous Rim Ring
      const rimGeo = new THREE.TorusGeometry(0.55, 0.022, 16, 64);
      const rimMat = new THREE.MeshBasicMaterial({
        color: colorHex,
        transparent: true,
        opacity: 0.85,
      });
      const rimMesh = new THREE.Mesh(rimGeo, rimMat);
      rimMesh.position.z = -0.01;
      nodeGroup.add(rimMesh);

      // Crystal Refractive Dome
      const domeGeo = new THREE.SphereGeometry(0.46, 36, 36);
      const domeMat = new THREE.MeshPhysicalMaterial({
        color: 0xffffff,
        transmission: 0.6,
        opacity: 0.95,
        transparent: true,
        roughness: 0.06,
        metalness: 0.05,
        clearcoat: 1.0,
      });
      const domeMesh = new THREE.Mesh(domeGeo, domeMat);
      domeMesh.position.z = 0.10;
      domeMesh.userData = { stepIndex: i };
      nodeGroup.add(domeMesh);
      interactiveMeshes.push(domeMesh);

      // Step Icon Sprite inside Dome
      const iconTex = createIconTexture(stepData.iconType, stepData.color);
      const iconMat = new THREE.SpriteMaterial({
        map: iconTex,
        transparent: true,
        depthTest: false,
      });
      const iconSprite = new THREE.Sprite(iconMat);
      iconSprite.scale.set(0.52, 0.52, 1);
      iconSprite.position.set(0, 0, 0.16);
      nodeGroup.add(iconSprite);

      // Number Badge Sprite (01, 02, etc.)
      const badgeTex = createBadgeTexture(stepData.number, stepData.color);
      const badgeMat = new THREE.SpriteMaterial({
        map: badgeTex,
        transparent: true,
        depthTest: false,
      });
      const badgeSprite = new THREE.Sprite(badgeMat);
      badgeSprite.scale.set(0.40, 0.40, 1);
      badgeSprite.position.set(-0.38, 0.38, 0.28);
      nodeGroup.add(badgeSprite);

      // Minimal Single-Word Name Title Sprite below the node
      const titleTex = createTitleTexture(stepData.name, stepData.color);
      const titleMat = new THREE.SpriteMaterial({
        map: titleTex,
        transparent: true,
        depthTest: false,
      });
      const titleSprite = new THREE.Sprite(titleMat);
      titleSprite.scale.set(1.4, 0.35, 1);
      titleSprite.position.set(0, -0.74, 0.2);
      nodeGroup.add(titleSprite);

      // 5. HANGING SUSPENSION CABLE CONNECTING FROM LOGO DOWN TO THIS STEP
      const angle = anchorAngles[i];
      const anchorOnLogo = new THREE.Vector3(
        Math.cos(angle) * (logoRadius + 0.04),
        logoY + Math.sin(angle) * (logoRadius + 0.04),
        0.02
      );

      // Cable anchor eyelet on the brand logo
      const logoEyeletGeo = new THREE.SphereGeometry(0.05, 16, 16);
      const logoEyeletMesh = new THREE.Mesh(logoEyeletGeo, chromeMat);
      logoEyeletMesh.position.copy(anchorOnLogo);
      stageRoot.add(logoEyeletMesh);

      // Hanging Cable Mesh (from anchorOnLogo to top of pendant)
      const pendantTop = new THREE.Vector3(stepPos.x, stepPos.y + 0.74, stepPos.z);
      const cableDir = new THREE.Vector3().subVectors(pendantTop, anchorOnLogo);
      const cableLength = cableDir.length();
      const cableMid = new THREE.Vector3().addVectors(anchorOnLogo, pendantTop).multiplyScalar(0.5);

      const cableGeo = new THREE.CylinderGeometry(0.016, 0.016, cableLength, 12);
      const cableMat = new THREE.MeshBasicMaterial({
        color: 0x94a3b8,
        transparent: true,
        opacity: 0.5,
      });
      const cableMesh = new THREE.Mesh(cableGeo, cableMat);
      cableMesh.position.copy(cableMid);
      cableMesh.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), cableDir.clone().normalize());
      stageRoot.add(cableMesh);

      // Outer Glowing Aura for Cable (illuminates on active)
      const glowGeo = new THREE.CylinderGeometry(0.045, 0.045, cableLength, 12);
      const glowMat = new THREE.MeshBasicMaterial({
        color: colorHex,
        transparent: true,
        opacity: 0.12,
      });
      const glowMesh = new THREE.Mesh(glowGeo, glowMat);
      glowMesh.position.copy(cableMid);
      glowMesh.quaternion.copy(cableMesh.quaternion);
      stageRoot.add(glowMesh);

      // Flowing Photon Particle running down the hanging cable
      const photonGeo = new THREE.SphereGeometry(0.065, 14, 14);
      const photonMat = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        transparent: true,
        opacity: 0.8,
      });
      const photonMesh = new THREE.Mesh(photonGeo, photonMat);
      stageRoot.add(photonMesh);

      stepNodes.push({
        group: nodeGroup,
        baseMesh,
        rimMesh,
        domeMesh,
        suspensionCap: capMesh,
        suspensionRing: ringMesh,
        iconSprite,
        badgeSprite,
        titleSprite,
        cableMesh,
        cableGlow: glowMesh,
        photonParticle: photonMesh,
        originPos: stepPos.clone(),
        anchorPosOnLogo: anchorOnLogo.clone(),
        pos: stepPos,
        color,
        colorHex,
        index: i,
      });
    }

    // 6. MOUSE PARALLAX & HOVER INTERACTION
    const raycaster = new THREE.Raycaster();
    const pointer = new THREE.Vector2(-999, -999);
    let targetParallaxX = 0;
    let targetParallaxY = 0;

    const handlePointerMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const ny = -(((e.clientY - rect.top) / rect.height) * 2 - 1);

      pointer.x = nx;
      pointer.y = ny;

      targetParallaxX = nx * 0.1;
      targetParallaxY = ny * 0.08;

      raycaster.setFromCamera(pointer, camera);
      const intersects = raycaster.intersectObjects(interactiveMeshes);

      if (intersects.length > 0) {
        container.style.cursor = 'pointer';
        const hitIdx = intersects[0].object.userData.stepIndex as number;
        if (onHoverStepRef.current) {
          onHoverStepRef.current(hitIdx);
        }
      } else {
        container.style.cursor = 'default';
        if (onHoverStepRef.current && hoveredIndexRef.current !== null) {
          onHoverStepRef.current(null);
        }
      }
    };

    const handleClick = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      pointer.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      pointer.y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);

      raycaster.setFromCamera(pointer, camera);
      const intersects = raycaster.intersectObjects(interactiveMeshes);

      if (intersects.length > 0) {
        const hitIdx = intersects[0].object.userData.stepIndex as number;
        if (onSelectStepRef.current) {
          onSelectStepRef.current(hitIdx);
        }
      }
    };

    container.addEventListener('mousemove', handlePointerMove);
    container.addEventListener('click', handleClick);

    // 7. RESIZE OBSERVER
    const updateSize = (w: number, h: number) => {
      width = w || container.clientWidth || 1000;
      height = h || container.clientHeight || 420;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
      targetCameraZ = calcResponsiveCameraZ(width, height);
    };

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        if (entry.contentRect && entry.contentRect.width > 0) {
          updateSize(entry.contentRect.width, entry.contentRect.height);
        }
      }
    });
    resizeObserver.observe(container);

    // 8. ANIMATION LOOP
    const clock = new THREE.Clock();

    const render = () => {
      animFrameRef.current = requestAnimationFrame(render);
      const elapsed = clock.getElapsedTime();

      // Camera smooth lerp
      camera.position.z += (targetCameraZ - camera.position.z) * 0.08;

      // Parallax rotation
      stageRoot.rotation.y += (targetParallaxX - stageRoot.rotation.y) * 0.05;
      stageRoot.rotation.x += (-targetParallaxY - stageRoot.rotation.x) * 0.05;

      const activeIdx = activeIndexRef.current;
      const hoveredIdx = hoveredIndexRef.current;

      // Pulse Central Logo gently
      const logoBreath = 1.0 + Math.sin(elapsed * 2.5) * 0.02;
      logoGroup.scale.set(logoBreath, logoBreath, logoBreath);

      // Animate 6 Hanging Steps
      stepNodes.forEach((node) => {
        const isActive = node.index === activeIdx;
        const isHovered = node.index === hoveredIdx;

        // Gentle natural hanging pendulum sway
        const swayAngle = Math.sin(elapsed * 1.8 + node.index * 0.5) * 0.025;
        node.group.rotation.z = swayAngle;

        let scale = 1.0;
        if (isActive) {
          // Automatic 3-second light-up breathing pulse
          const pulse = 1.0 + Math.sin(elapsed * 4.5) * 0.05;
          scale = 1.15 * pulse;

          (node.rimMesh.material as THREE.MeshBasicMaterial).opacity = 1.0;
          (node.domeMesh.material as THREE.MeshPhysicalMaterial).emissive = node.color;
          (node.domeMesh.material as THREE.MeshPhysicalMaterial).emissiveIntensity = 0.65;
          node.badgeSprite.scale.set(0.50, 0.50, 1);

          // Glowing suspension cable descending from logo
          (node.cableMesh.material as THREE.MeshBasicMaterial).color = node.color;
          (node.cableMesh.material as THREE.MeshBasicMaterial).opacity = 0.95;
          (node.cableGlow.material as THREE.MeshBasicMaterial).opacity = 0.55;

          // Energy photon surging down the cable from logo to step
          const cableProg = (elapsed * 1.8) % 1.0;
          const pendantTop = new THREE.Vector3(node.pos.x, node.pos.y + 0.74, node.pos.z);
          node.photonParticle.position.lerpVectors(node.anchorPosOnLogo, pendantTop, cableProg);
          (node.photonParticle.material as THREE.MeshBasicMaterial).color = node.color;
          (node.photonParticle.material as THREE.MeshBasicMaterial).opacity = 1.0;
          node.photonParticle.scale.set(1.4, 1.4, 1.4);
        } else if (isHovered) {
          scale = 1.08;
          (node.rimMesh.material as THREE.MeshBasicMaterial).opacity = 0.9;
          (node.domeMesh.material as THREE.MeshPhysicalMaterial).emissive = node.color;
          (node.domeMesh.material as THREE.MeshPhysicalMaterial).emissiveIntensity = 0.35;
          node.badgeSprite.scale.set(0.45, 0.45, 1);

          (node.cableMesh.material as THREE.MeshBasicMaterial).color = node.color;
          (node.cableMesh.material as THREE.MeshBasicMaterial).opacity = 0.65;
          (node.cableGlow.material as THREE.MeshBasicMaterial).opacity = 0.25;

          const cableProg = (elapsed * 0.8) % 1.0;
          const pendantTop = new THREE.Vector3(node.pos.x, node.pos.y + 0.74, node.pos.z);
          node.photonParticle.position.lerpVectors(node.anchorPosOnLogo, pendantTop, cableProg);
          (node.photonParticle.material as THREE.MeshBasicMaterial).color = node.color;
          (node.photonParticle.material as THREE.MeshBasicMaterial).opacity = 0.7;
          node.photonParticle.scale.set(1.0, 1.0, 1.0);
        } else {
          scale = 1.0;
          (node.rimMesh.material as THREE.MeshBasicMaterial).opacity = 0.45;
          (node.domeMesh.material as THREE.MeshPhysicalMaterial).emissive = new THREE.Color(0x000000);
          (node.domeMesh.material as THREE.MeshPhysicalMaterial).emissiveIntensity = 0.0;
          node.badgeSprite.scale.set(0.40, 0.40, 1);

          (node.cableMesh.material as THREE.MeshBasicMaterial).color.setHex(0x94a3b8);
          (node.cableMesh.material as THREE.MeshBasicMaterial).opacity = 0.35;
          (node.cableGlow.material as THREE.MeshBasicMaterial).opacity = 0.05;

          const cableProg = (elapsed * 0.35 + node.index * 0.16) % 1.0;
          const pendantTop = new THREE.Vector3(node.pos.x, node.pos.y + 0.74, node.pos.z);
          node.photonParticle.position.lerpVectors(node.anchorPosOnLogo, pendantTop, cableProg);
          (node.photonParticle.material as THREE.MeshBasicMaterial).color.setHex(0xffffff);
          (node.photonParticle.material as THREE.MeshBasicMaterial).opacity = 0.25;
          node.photonParticle.scale.set(0.7, 0.7, 0.7);
        }

        node.group.scale.lerp(new THREE.Vector3(scale, scale, scale), 0.1);
      });

      // Synchronize Central Spotlight & Ring color to Active Step
      if (activeIdx >= 0 && activeIdx < stepNodes.length) {
        const activeNode = stepNodes[activeIdx];
        centralLogoLight.color.setHex(activeNode.colorHex);
        coreRimMat.color.setHex(activeNode.colorHex);

        activeStepLight.position.set(activeNode.pos.x, activeNode.pos.y, 1.2);
        activeStepLight.color.setHex(activeNode.colorHex);
      }

      // Animate Radial Pulse Waves from Logo
      pulseRings.forEach((ring) => {
        ring.scale += ring.speed;
        if (ring.scale > 2.2) {
          ring.scale = 1.0;
        }
        ring.mesh.scale.set(ring.scale, ring.scale, ring.scale);
        const mat = ring.mesh.material as THREE.MeshBasicMaterial;
        mat.opacity = Math.max(0, (2.2 - ring.scale) * 0.15);
        if (activeIdx >= 0 && activeIdx < stepNodes.length) {
          mat.color.setHex(stepNodes[activeIdx].colorHex);
        }
      });

      renderer.render(scene, camera);
    };

    render();

    // CLEANUP
    return () => {
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
      container.removeEventListener('mousemove', handlePointerMove);
      container.removeEventListener('click', handleClick);
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
      className="relative w-full h-[360px] sm:h-[400px] md:h-[440px] lg:h-[470px] flex items-center justify-center select-none overflow-hidden touch-none"
    />
  );
};
