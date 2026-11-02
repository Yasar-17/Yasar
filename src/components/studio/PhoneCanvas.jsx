import React, { useRef, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import * as THREE from 'three';
import { CSS3DRenderer, CSS3DObject } from 'three/examples/jsm/renderers/CSS3DRenderer.js';
import { GlyphTextureManager } from './GlyphTexture';
import { PhoneAssembly } from './phone/PhoneAssembly';
import { usePhone } from '../../context/PhoneContext';

const SCREEN_WIDTH = 372;
const SCREEN_HEIGHT = 806;
const D = 0.42;

export const FINISH_CONFIGS = {
  silver: {
    id: 'silver',
    name: 'Natural Silver',
    swatch: '#d4d8dd',
    aluminum: '#d4d8dd',
    back: '#e2e6eb',
    tint: '#f0f4f8',
    antenna: '#b8bcc2',
  },
  obsidian: {
    id: 'obsidian',
    name: 'Space Black',
    swatch: '#1e2228',
    aluminum: '#282c33',
    back: '#181a1f',
    tint: '#1a1f26',
    antenna: '#3a3f47',
  },
  copper: {
    id: 'copper',
    name: 'Cosmic Amber',
    swatch: '#d76c2d',
    aluminum: '#d76c2d',
    back: '#dc7a3b',
    tint: '#e8894d',
    antenna: '#eab58b',
  },
};

export const PhoneCanvas = ({ children, finish = 'silver', flipped = false, onFlipChange }) => {
  const { isLocked, setIsLocked, activeGlyphPattern } = usePhone();
  const containerRef = useRef(null);
  const phoneAssemblyRef = useRef(null);
  const glyphMgrRef = useRef(null);
  const animFrameRef = useRef(null);
  const [surfaceEl, setSurfaceEl] = useState(null);
  const [glError, setGlError] = useState(false);

  // Rotation and Inertia state
  const rotRef = useRef({ x: 0, y: -0.045 });
  const targetRotRef = useRef({ x: 0, y: -0.045 });
  const isDraggingRef = useRef(false);
  const pointerStartRef = useRef({ x: 0, y: 0 });
  const pointerVelocityRef = useRef({ x: 0, y: 0 });
  const lastPointerPosRef = useRef({ x: 0, y: 0 });
  const lastTimeRef = useRef(0);
  const flippedRef = useRef(flipped);
  const mousePosRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    flippedRef.current = flipped;
  }, [flipped]);

  // Sync Glyph Matrix pattern with PhoneContext
  useEffect(() => {
    if (glyphMgrRef.current) {
      glyphMgrRef.current.setPattern(activeGlyphPattern);
    }
  }, [activeGlyphPattern]);

  // Handle flip prop from studio controls
  useEffect(() => {
    const baseOffset = -0.045;
    if (flipped) {
      targetRotRef.current.y = Math.PI + baseOffset;
    } else {
      targetRotRef.current.y = baseOffset;
    }
  }, [flipped]);

  // Update material finishes when finish prop changes
  useEffect(() => {
    if (!phoneAssemblyRef.current) return;
    const config = FINISH_CONFIGS[finish] || FINISH_CONFIGS.silver;
    phoneAssemblyRef.current.updateFinish(config);
  }, [finish]);

  // Mouse move listener for subtle environment lighting parallax
  useEffect(() => {
    const handleWindowMouseMove = (e) => {
      mousePosRef.current = {
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1,
      };
    };
    window.addEventListener('mousemove', handleWindowMouseMove);
    return () => window.removeEventListener('mousemove', handleWindowMouseMove);
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight;

    // 1. WebGL Renderer
    let webglRenderer;
    try {
      webglRenderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
        powerPreference: 'high-performance',
      });
    } catch (err) {
      setGlError(true);
      return;
    }

    webglRenderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    webglRenderer.setSize(width, height);
    webglRenderer.setClearColor(0x000000, 0);
    webglRenderer.outputColorSpace = THREE.SRGBColorSpace;
    webglRenderer.toneMapping = THREE.ACESFilmicToneMapping;
    webglRenderer.toneMappingExposure = 1.1;
    webglRenderer.shadowMap.enabled = true;
    webglRenderer.shadowMap.type = THREE.PCFSoftShadowMap;
    webglRenderer.domElement.className = "phone-canvas absolute inset-0 pointer-events-none";
    webglRenderer.domElement.setAttribute("aria-hidden", "true");
    container.appendChild(webglRenderer.domElement);

    // 2. CSS3D Renderer (for the HTML screen)
    const css3dRenderer = new CSS3DRenderer();
    css3dRenderer.setSize(width, height);
    css3dRenderer.domElement.className = "phone-html absolute inset-0 pointer-events-none";
    container.appendChild(css3dRenderer.domElement);

    // 3. Camera - Framed large and dominant in the viewport
    const getCamZ = (w) => (w <= 480 ? 24 : w <= 768 ? 20.5 : 17.2);
    const camera = new THREE.PerspectiveCamera(32, width / height, 0.1, 100);
    camera.position.set(0, 0, getCamZ(width));

    // 4. Scenes & Groups
    const webglScene = new THREE.Scene();
    const css3dScene = new THREE.Scene();

    const webglModelGroup = new THREE.Group();
    const css3dModelGroup = new THREE.Group();
    webglModelGroup.position.y = 0.38;
    css3dModelGroup.position.y = 0.38;
    webglScene.add(webglModelGroup);
    css3dScene.add(css3dModelGroup);

    // 5. CSS3D Phone Surface Element
    const surfaceDiv = document.createElement("div");
    surfaceDiv.className = "phone-surface";
    surfaceDiv.style.width = `${SCREEN_WIDTH}px`;
    surfaceDiv.style.height = `${SCREEN_HEIGHT}px`;
    surfaceDiv.style.borderRadius = "46px";
    surfaceDiv.style.overflow = "hidden";
    surfaceDiv.style.pointerEvents = "auto";
    surfaceDiv.style.backfaceVisibility = "hidden";
    surfaceDiv.style.isolation = "isolate";

    const css3dObject = new CSS3DObject(surfaceDiv);
    css3dObject.scale.set(0.01, 0.01, 0.01);
    css3dObject.position.z = D / 2 + 0.018;
    css3dModelGroup.add(css3dObject);

    setSurfaceEl(surfaceDiv);

    // 6. Studio Lighting Rig
    const hemiLight = new THREE.HemisphereLight(0xffffff, 0x111620, 0.7);
    webglScene.add(hemiLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 1.85);
    keyLight.position.set(-3.5, 6, 8.5);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.set(1024, 1024);
    keyLight.shadow.camera.left = -5;
    keyLight.shadow.camera.right = 5;
    keyLight.shadow.camera.top = 5;
    keyLight.shadow.camera.bottom = -5;
    keyLight.shadow.bias = -0.0001;
    keyLight.shadow.normalBias = 0.008;
    webglScene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0xe8edf2, 0.75);
    fillLight.position.set(4.5, 1.5, 3.5);
    webglScene.add(fillLight);

    const rimLight = new THREE.DirectionalLight(0xf8fafc, 1.6);
    rimLight.position.set(-2, 4.5, -6.5);
    webglScene.add(rimLight);

    // 7. Initialize Glyph Texture Manager & Build Modular Phone Assembly
    const glyphMgr = new GlyphTextureManager();
    glyphMgr.setPattern(activeGlyphPattern);
    glyphMgrRef.current = glyphMgr;

    const phoneAssembly = new PhoneAssembly(glyphMgr);
    phoneAssemblyRef.current = phoneAssembly;

    const phoneModelMesh = phoneAssembly.build(FINISH_CONFIGS[finish] || FINISH_CONFIGS.silver);
    webglModelGroup.add(phoneModelMesh);

    // 8. Render Loop with Smooth Spring, Inertia, and Dynamic Environmental Lighting
    const lerp = (a, b, t) => a + (b - a) * t;

    const animate = (time) => {
      glyphMgr.update(time);

      // Subtle dynamic environmental lighting shifting with mouse coordinates
      const mx = mousePosRef.current.x;
      const my = mousePosRef.current.y;
      keyLight.position.x = -3.5 + mx * 1.6;
      keyLight.position.y = 6.0 + my * 1.4;
      fillLight.position.x = 4.5 - mx * 1.2;
      rimLight.position.x = -2.0 - mx * 1.0;

      // When not dragging, apply subtle resting float and gentle mouse parallax
      if (!isDraggingRef.current) {
        const baseOffset = -0.045;
        const baseYaw = flippedRef.current ? Math.PI + baseOffset : baseOffset;
        const idleFloat = Math.sin(time * 0.0012) * 0.02;
        targetRotRef.current.y = baseYaw + mx * 0.05 + idleFloat;
        targetRotRef.current.x = -my * 0.04;
      }

      // Smooth lerp rotation toward target
      rotRef.current.x = lerp(rotRef.current.x, targetRotRef.current.x, 0.12);
      rotRef.current.y = lerp(rotRef.current.y, targetRotRef.current.y, 0.12);

      webglModelGroup.rotation.x = rotRef.current.x;
      webglModelGroup.rotation.y = rotRef.current.y;

      css3dModelGroup.rotation.x = rotRef.current.x;
      css3dModelGroup.rotation.y = rotRef.current.y;

      webglRenderer.render(webglScene, camera);
      css3dRenderer.render(css3dScene, camera);

      animFrameRef.current = requestAnimationFrame(animate);
    };

    animFrameRef.current = requestAnimationFrame(animate);

    // 9. Resize Handler
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.position.z = getCamZ(w);
      camera.updateProjectionMatrix();
      webglRenderer.setSize(w, h);
      css3dRenderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      if (webglRenderer.domElement.parentNode) {
        webglRenderer.domElement.parentNode.removeChild(webglRenderer.domElement);
      }
      if (css3dRenderer.domElement.parentNode) {
        css3dRenderer.domElement.parentNode.removeChild(css3dRenderer.domElement);
      }
      webglRenderer.dispose();
      glyphMgr.dispose();
    };
  }, []);

  // Pointer event handlers for orbiting 3D phone and waking screen
  const handlePointerDown = (e) => {
    if (e.target.closest('button, a, input, textarea, [data-interactive="true"]')) {
      return;
    }

    isDraggingRef.current = true;
    pointerStartRef.current = { x: e.clientX, y: e.clientY };
    lastPointerPosRef.current = { x: e.clientX, y: e.clientY };
    lastTimeRef.current = performance.now();
    pointerVelocityRef.current = { x: 0, y: 0 };
  };

  const handlePointerMove = (e) => {
    if (!isDraggingRef.current) return;

    const now = performance.now();
    const dt = Math.max(1, now - lastTimeRef.current);
    const dx = e.clientX - lastPointerPosRef.current.x;
    const dy = e.clientY - lastPointerPosRef.current.y;

    targetRotRef.current.y += dx * 0.008;
    targetRotRef.current.x += dy * 0.008;

    targetRotRef.current.x = Math.max(-0.62, Math.min(0.62, targetRotRef.current.x));

    pointerVelocityRef.current = {
      x: (dx / dt) * 16,
      y: (dy / dt) * 16,
    };

    lastPointerPosRef.current = { x: e.clientX, y: e.clientY };
    lastTimeRef.current = now;
  };

  const handlePointerUp = (e) => {
    if (!isDraggingRef.current) return;
    isDraggingRef.current = false;

    // Check if pointer gesture was a stationary tap/click to wake the screen
    const dist = Math.hypot(
      e.clientX - pointerStartRef.current.x,
      e.clientY - pointerStartRef.current.y
    );
    if (dist < 6 && isLocked) {
      setIsLocked(false);
    }

    targetRotRef.current.y += pointerVelocityRef.current.x * 0.03;
    targetRotRef.current.x += pointerVelocityRef.current.y * 0.03;
    targetRotRef.current.x = Math.max(-0.62, Math.min(0.62, targetRotRef.current.x));
  };

  const handleDoubleClick = () => {
    targetRotRef.current = { x: 0, y: -0.045 };
    if (onFlipChange) onFlipChange(false);
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full flex items-center justify-center cursor-grab active:cursor-grabbing select-none"
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onDoubleClick={handleDoubleClick}
    >
      {surfaceEl && ReactDOM.createPortal(children, surfaceEl)}

      {/* Multi-Tier Ambient Ground Contact Shadow */}
      <div className="absolute left-1/2 bottom-[11%] -translate-x-1/2 pointer-events-none flex flex-col items-center">
        {/* Core contact shadow */}
        <div className="w-[320px] h-[16px] rounded-full bg-black opacity-75 blur-[10px]" />
        {/* Soft mid penumbra */}
        <div className="w-[480px] h-[36px] -mt-2 rounded-full bg-black opacity-45 blur-[26px]" />
        {/* Studio ambient ground floor */}
        <div className="w-[660px] h-[65px] -mt-5 rounded-full bg-black opacity-20 blur-[45px]" />
      </div>

      {/* Fallback if WebGL unavailable */}
      {glError && (
        <div className="relative w-[372px] h-[806px] rounded-[46px] overflow-hidden shadow-2xl border-4 border-[#282c33] bg-[#0B0F14]">
          {children}
        </div>
      )}
    </div>
  );
};

export default PhoneCanvas;
