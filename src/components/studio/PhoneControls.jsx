import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { useFrame, useThree } from '@react-three/fiber';

export const PhoneControls = ({
  children,
  flipped = false,
  autoRotate = false,
  dampingFactor = 10,
  pitchLimit = 0.62, // Clamps vertical tilt (~35 degrees) to prevent upside-down flipping
  onPointerStateChange,
}) => {
  const groupRef = useRef();
  const { gl } = useThree();

  // State refs for physics and damping
  const isDragging = useRef(false);
  const pointerStart = useRef({ x: 0, y: 0 });
  const lastPointer = useRef({ x: 0, y: 0 });
  const velocity = useRef({ x: 0, y: 0 });
  const lastTime = useRef(0);
  const lastInteractionTime = useRef(performance.now());

  // Current and target rotational state (euler radians)
  const currentRot = useRef({ x: 0, y: -0.04, z: 0 });
  const targetRot = useRef({ x: 0, y: -0.04, z: 0 });
  const currentPos = useRef({ x: 0, y: 0, z: 0 });
  const targetPos = useRef({ x: 0, y: 0, z: 0 });

  // Detect user preference for reduced motion
  const prefersReducedMotion = useRef(false);
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    prefersReducedMotion.current = mediaQuery.matches;

    const handler = (e) => {
      prefersReducedMotion.current = e.matches;
    };
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  // Synchronize target rotation with flipped prop (inspect front vs rear)
  useEffect(() => {
    const basePitch = 0;
    const baseYaw = flipped ? Math.PI - 0.04 : -0.04;
    targetRot.current.y = baseYaw;
    targetRot.current.x = basePitch;
    lastInteractionTime.current = performance.now();
  }, [flipped]);

  // Bind mouse and touch pointer events to canvas
  useEffect(() => {
    const dom = gl.domElement;
    if (!dom) return;

    const handlePointerDown = (e) => {
      // Ignore if clicking interactive UI buttons
      if (e.target.closest('button, a, input, textarea, [data-interactive="true"]')) {
        return;
      }

      isDragging.current = true;
      dom.setPointerCapture?.(e.pointerId);
      pointerStart.current = { x: e.clientX, y: e.clientY };
      lastPointer.current = { x: e.clientX, y: e.clientY };
      velocity.current = { x: 0, y: 0 };
      lastTime.current = performance.now();
      lastInteractionTime.current = performance.now();

      if (onPointerStateChange) onPointerStateChange(true);
    };

    const handlePointerMove = (e) => {
      if (!isDragging.current) return;

      const now = performance.now();
      const dt = Math.max(1, now - lastTime.current);
      const dx = e.clientX - lastPointer.current.x;
      const dy = e.clientY - lastPointer.current.y;

      // Sensitivity tuning: 0.007 rad per px
      const sensitivity = 0.007;

      // Free yaw rotation (inspect 360 degrees: front and rear)
      targetRot.current.y += dx * sensitivity;

      // Clamped pitch rotation to prevent uncontrolled tumbling
      targetRot.current.x = Math.max(
        -pitchLimit,
        Math.min(pitchLimit, targetRot.current.x + dy * sensitivity)
      );

      // Subtle roll reaction to rapid horizontal panning
      targetRot.current.z = Math.max(-0.12, Math.min(0.12, -dx * 0.002));

      // Calculate release velocity for smooth inertia
      velocity.current = {
        x: (dx / dt) * 16,
        y: (dy / dt) * 16,
      };

      lastPointer.current = { x: e.clientX, y: e.clientY };
      lastTime.current = now;
      lastInteractionTime.current = now;
    };

    const handlePointerUp = (e) => {
      if (!isDragging.current) return;
      isDragging.current = false;
      try {
        dom.releasePointerCapture?.(e.pointerId);
      } catch (err) {
        // Ignored
      }

      // Apply release inertia with damping
      targetRot.current.y += velocity.current.x * 0.025;
      targetRot.current.x = Math.max(
        -pitchLimit,
        Math.min(pitchLimit, targetRot.current.x + velocity.current.y * 0.025)
      );
      targetRot.current.z = 0;

      lastInteractionTime.current = performance.now();
      if (onPointerStateChange) onPointerStateChange(false);
    };

    const handleDoubleClick = () => {
      // Natural return to resting home position
      targetRot.current.x = 0;
      targetRot.current.y = flipped ? Math.PI - 0.04 : -0.04;
      targetRot.current.z = 0;
      lastInteractionTime.current = performance.now();
    };

    dom.addEventListener('pointerdown', handlePointerDown);
    dom.addEventListener('pointermove', handlePointerMove);
    dom.addEventListener('pointerup', handlePointerUp);
    dom.addEventListener('pointercancel', handlePointerUp);
    dom.addEventListener('dblclick', handleDoubleClick);

    return () => {
      dom.removeEventListener('pointerdown', handlePointerDown);
      dom.removeEventListener('pointermove', handlePointerMove);
      dom.removeEventListener('pointerup', handlePointerUp);
      dom.removeEventListener('pointercancel', handlePointerUp);
      dom.removeEventListener('dblclick', handleDoubleClick);
    };
  }, [gl, flipped, pitchLimit, onPointerStateChange]);

  // R3F Physics & Damping Loop
  useFrame((state, delta) => {
    if (!groupRef.current) return;

    const group = groupRef.current;
    const now = performance.now();
    const idleDuration = now - lastInteractionTime.current;
    const isIdle = !isDragging.current && idleDuration > 2200;

    // 1. Subtle Idle Floating / Breathing Animation (Respects prefers-reduced-motion)
    if (isIdle && !prefersReducedMotion.current) {
      const time = state.clock.getElapsedTime();
      // Zero-gravity gentle vertical float
      targetPos.current.y = Math.sin(time * 1.1) * 0.06;
      // Gentle micro-tilt
      const idleTiltX = Math.sin(time * 0.7) * 0.025;
      const idleTiltY = Math.cos(time * 0.5) * 0.035;

      // Natural resting orientation with breathing offset
      const restingYaw = flipped ? Math.PI - 0.04 : -0.04;
      targetRot.current.y = THREE.MathUtils.damp(targetRot.current.y, restingYaw + idleTiltY, 1.2, delta);
      targetRot.current.x = THREE.MathUtils.damp(targetRot.current.x, idleTiltX, 1.2, delta);
      targetRot.current.z = THREE.MathUtils.damp(targetRot.current.z, 0, 4.0, delta);
    } else {
      targetPos.current.y = 0;
      targetRot.current.z = THREE.MathUtils.damp(targetRot.current.z, 0, 5.0, delta);
    }

    // Auto rotate mode if explicitly requested
    if (autoRotate && !isDragging.current) {
      targetRot.current.y += delta * 0.5;
    }

    // 2. Realistic Physics Damping Interpolation using THREE.MathUtils.damp
    const lambda = prefersReducedMotion.current ? 25 : dampingFactor;

    currentRot.current.x = THREE.MathUtils.damp(currentRot.current.x, targetRot.current.x, lambda, delta);
    currentRot.current.y = THREE.MathUtils.damp(currentRot.current.y, targetRot.current.y, lambda, delta);
    currentRot.current.z = THREE.MathUtils.damp(currentRot.current.z, targetRot.current.z, lambda, delta);

    currentPos.current.y = THREE.MathUtils.damp(currentPos.current.y, targetPos.current.y, lambda, delta);

    // 3. Apply state to Three.js Object3D Group
    group.rotation.x = currentRot.current.x;
    group.rotation.y = currentRot.current.y;
    group.rotation.z = currentRot.current.z;

    group.position.x = currentPos.current.x;
    group.position.y = currentPos.current.y;
    group.position.z = currentPos.current.z;
  });

  return <group ref={groupRef}>{children}</group>;
};

export default PhoneControls;

