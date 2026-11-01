import React, { useRef, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import * as THREE from 'three';
import { CSS3DRenderer, CSS3DObject } from 'three/examples/jsm/renderers/CSS3DRenderer.js';
import { GlyphTextureManager } from './GlyphTexture';
import { PhoneMeshBuilder } from './PhoneMeshBuilder';
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
  const { activeGlyphPattern, triggerSnapshot } = usePhone();
  const containerRef = useRef(null);
  const meshBuilderRef = useRef(null);
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
    if (!meshBuilderRef.current) return;
    const config = FINISH_CONFIGS[finish] || FINISH_CONFIGS.silver;
    meshBuilderRef.current.updateFinish(config);
  }, [finish]);

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
    webglRenderer.toneMappingExposure = 1.05;
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

    // 3. Camera
    const camera = new THREE.PerspectiveCamera(32, width / height, 0.1, 100);
    camera.position.set(0, 0, 19);

    // 4. Scenes & Groups
    const webglScene = new THREE.Scene();
    const css3dScene = new THREE.Scene();

    const webglModelGroup = new THREE.Group();
    const css3dModelGroup = new THREE.Group();
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
    // 372px x 0.01 = 3.72 units, 806px x 0.01 = 8.06 units
    css3dObject.scale.set(0.01, 0.01, 0.01);
    css3dObject.position.z = D / 2 + 0.018;
    css3dModelGroup.add(css3dObject);

    setSurfaceEl(surfaceDiv);

    // 6. Lighting Setup (prsd.dev studio light rig)
    const hemiLight = new THREE.HemisphereLight(0xffffff, 0xb0a5a0, 0.75);
    webglScene.add(hemiLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 1.8);
    keyLight.position.set(-3, 6, 9);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.set(1024, 1024);
    keyLight.shadow.camera.left = -5;
    keyLight.shadow.camera.right = 5;
    keyLight.shadow.camera.top = 5;
    keyLight.shadow.camera.bottom = -5;
    keyLight.shadow.bias = -0.0001;
    keyLight.shadow.normalBias = 0.008;
    webglScene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0xffdfc4, 0.7);
    fillLight.position.set(5, 1, 3);
    webglScene.add(fillLight);

    const rimLight = new THREE.DirectionalLight(0xffffff, 1.5);
    rimLight.position.set(-2, 5, -7);
    webglScene.add(rimLight);

    // 7. Initialize Glyph Texture Manager & Build Authentic 3D Phone Mesh
    const glyphMgr = new GlyphTextureManager();
    glyphMgr.setPattern(activeGlyphPattern);
    glyphMgrRef.current = glyphMgr;

    const meshBuilder = new PhoneMeshBuilder(glyphMgr);
    meshBuilderRef.current = meshBuilder;

    const phoneModelMesh = meshBuilder.build(FINISH_CONFIGS[finish] || FINISH_CONFIGS.silver);
    webglModelGroup.add(phoneModelMesh);

    // 8. Render Loop with Smooth Spring & Inertia
    const lerp = (a, b, t) => a + (b - a) * t;

    const animate = (time) => {
      // Update dynamic 137-LED Glyph Matrix texture
      glyphMgr.update(time);

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

  // Pointer event handlers for orbiting 3D phone
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

    targetRotRef.current.x = Math.max(-0.65, Math.min(0.65, targetRotRef.current.x));

    pointerVelocityRef.current = {
      x: (dx / dt) * 16,
      y: (dy / dt) * 16,
    };

    lastPointerPosRef.current = { x: e.clientX, y: e.clientY };
    lastTimeRef.current = now;
  };

  const handlePointerUp = () => {
    if (!isDraggingRef.current) return;
    isDraggingRef.current = false;

    targetRotRef.current.y += pointerVelocityRef.current.x * 0.03;
    targetRotRef.current.x += pointerVelocityRef.current.y * 0.03;
    targetRotRef.current.x = Math.max(-0.65, Math.min(0.65, targetRotRef.current.x));
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

      {/* Ground contact shadow */}
      <div 
        className="absolute left-1/2 bottom-[10%] -translate-x-1/2 w-[240px] h-[25px] rounded-full bg-[#000000] opacity-40 blur-[20px] pointer-events-none" 
      />

      {/* Fallback if WebGL unavailable */}
      {glError && (
        <div className="relative w-[372px] h-[806px] rounded-[46px] overflow-hidden shadow-2xl border-4 border-[#282c33] bg-[#0B0F14]">
          {children}
        </div>
      )}
    </div>
  );
};
