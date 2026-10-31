import React, { useRef, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { MeshoptDecoder } from 'three/examples/jsm/libs/meshopt_decoder.module.js';
import { CSS3DRenderer, CSS3DObject } from 'three/examples/jsm/renderers/CSS3DRenderer.js';

// Model scaling constants
const SCREEN_WIDTH = 372;
const SCREEN_HEIGHT = 806;
const v = 4.04 / 0.0731025;
const w = (4.04 * 163.4) / 78 / 0.15000003;
const f = (4.04 / 0.0731025) * 0.06681;
const y = ((4.04 * 163.4) / 78 / 0.15000003) * 0.14429;

export const FINISH_CONFIGS = {
  silver: {
    id: 'silver',
    name: 'Natural Silver',
    swatch: '#d4d8dd',
    aluminum: '#d4d8dd',
    back: '#e2e6eb',
    tint: '#c8ccd1',
    antenna: '#b8bcc2',
  },
  obsidian: {
    id: 'obsidian',
    name: 'Space Black',
    swatch: '#1e2228',
    aluminum: '#282c33',
    back: '#181a1f',
    tint: '#121417',
    antenna: '#3a3f47',
  },
  copper: {
    id: 'copper',
    name: 'Cosmic Amber',
    swatch: '#d76c2d',
    aluminum: '#d76c2d',
    back: '#dc7a3b',
    tint: '#bf622d',
    antenna: '#eab58b',
  },
};

export const PhoneCanvas = ({ children, finish = 'silver', flipped = false, onFlipChange }) => {
  const containerRef = useRef(null);
  const modelRef = useRef(null);
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

  // Handle flip prop
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
    if (!modelRef.current) return;
    const config = FINISH_CONFIGS[finish] || FINISH_CONFIGS.silver;
    modelRef.current.traverse((child) => {
      if (child.isMesh && child.material) {
        const materials = Array.isArray(child.material) ? child.material : [child.material];
        materials.forEach((mat) => {
          if (mat.name === "Anodized aluminum") {
            mat.color.set(config.aluminum);
            mat.roughness = 0.3;
            mat.metalness = 0.75;
          } else if (mat.name === "Frosted glass") {
            mat.color.set(config.back);
            mat.roughness = 0.35;
          } else if (mat.name === "Glass tint") {
            mat.color.set(config.tint);
            mat.roughness = 0.28;
          } else if (mat.name === "Plastic antena") {
            mat.color.set(config.antenna);
          }
        });
      }
    });
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
    webglRenderer.toneMappingExposure = 1.0;
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

    // CSS3D Phone Surface Element
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
    css3dObject.scale.set(f / SCREEN_WIDTH, y / SCREEN_HEIGHT, 0.01);
    css3dObject.position.z = 0.004375 * v + 0.006;
    css3dModelGroup.add(css3dObject);

    setSurfaceEl(surfaceDiv);

    // 5. Lighting Setup
    const hemiLight = new THREE.HemisphereLight(0xffffff, 0xb0a5a0, 0.7);
    webglScene.add(hemiLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 1.6);
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

    const fillLight = new THREE.DirectionalLight(0xffd5b8, 0.65);
    fillLight.position.set(5, 1, 3);
    webglScene.add(fillLight);

    const rimLight = new THREE.DirectionalLight(0xffffff, 1.4);
    rimLight.position.set(-2, 5, -7);
    webglScene.add(rimLight);

    // 6. Load 3D Phone Model
    const loader = new GLTFLoader();
    loader.setMeshoptDecoder(MeshoptDecoder);

    loader.load(
      '/models/phone-model.glb',
      (gltf) => {
        const root = gltf.scene;
        root.rotation.y = Math.PI;
        root.scale.set(v, w, v);

        root.traverse((child) => {
          if (child.isMesh) {
            child.castShadow = true;
            child.receiveShadow = true;
            const mats = Array.isArray(child.material) ? child.material : [child.material];
            mats.forEach((mat) => {
              if (mat.name === "Anodized aluminum") {
                mat.roughness = 0.3;
                mat.metalness = 0.75;
              } else if (mat.name === "Frosted glass") {
                mat.roughness = 0.35;
              } else if (mat.name === "Glass tint") {
                mat.roughness = 0.28;
              }
            });
          }
        });

        modelRef.current = root;
        webglModelGroup.add(root);

        // Apply initial finish colors
        const cfg = FINISH_CONFIGS[finish] || FINISH_CONFIGS.silver;
        root.traverse((c) => {
          if (c.isMesh && c.material) {
            const mats = Array.isArray(c.material) ? c.material : [c.material];
            mats.forEach((m) => {
              if (m.name === "Anodized aluminum") m.color.set(cfg.aluminum);
              else if (m.name === "Frosted glass") m.color.set(cfg.back);
              else if (m.name === "Glass tint") m.color.set(cfg.tint);
              else if (m.name === "Plastic antena") m.color.set(cfg.antenna);
            });
          }
        });
      },
      undefined,
      (err) => {
        console.warn("Failed to load 3D GLB, falling back to CSS stage", err);
        setGlError(true);
      }
    );

    // 7. Render Loop with Smooth Spring & Inertia
    const lerp = (a, b, t) => a + (b - a) * t;

    const animate = () => {
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

    // 8. Resize Handler
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
