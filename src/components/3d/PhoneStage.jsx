import React, { useRef, useEffect, useState, useCallback } from 'react';
import { usePhone } from '../../context/PhoneContext';
import { PhoneChassis } from './PhoneChassis';

export const PhoneStage = () => {
  const { rotation, setRotation, resetRotation } = usePhone();
  const stageRef = useRef(null);
  const isDraggingRef = useRef(false);
  const startPosRef = useRef({ x: 0, y: 0 });
  const currentRotRef = useRef({ x: rotation.x, y: rotation.y });
  const targetRotRef = useRef({ x: rotation.x, y: rotation.y });
  const [isMobile, setIsMobile] = useState(false);

  // Sync target rotation when context resets
  useEffect(() => {
    targetRotRef.current = { x: rotation.x, y: rotation.y };
  }, [rotation]);

  // Responsive breakpoint check
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 640);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // 60-120 FPS Lerp Loop for zero-latency smooth camera orbit
  useEffect(() => {
    let animId;
    const lerp = (a, b, t) => a + (b - a) * t;

    const render = () => {
      currentRotRef.current.x = lerp(currentRotRef.current.x, targetRotRef.current.x, 0.15);
      currentRotRef.current.y = lerp(currentRotRef.current.y, targetRotRef.current.y, 0.15);

      if (stageRef.current && !isMobile) {
        stageRef.current.style.transform = `rotateX(${currentRotRef.current.x}deg) rotateY(${currentRotRef.current.y}deg)`;
      }
      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);
    return () => cancelAnimationFrame(animId);
  }, [isMobile]);

  // Pointer event handlers for free 3D rotation
  const handlePointerDown = useCallback((e) => {
    if (isMobile) return;
    // Don't drag if clicking inside screen apps or interactive buttons
    if (e.target.closest('button, input, a, [data-interactive="true"]')) return;
    isDraggingRef.current = true;
    startPosRef.current = { x: e.clientX, y: e.clientY };
  }, [isMobile]);

  const handlePointerMove = useCallback((e) => {
    if (!isDraggingRef.current || isMobile) return;
    const deltaX = e.clientX - startPosRef.current.x;
    const deltaY = e.clientY - startPosRef.current.y;
    startPosRef.current = { x: e.clientX, y: e.clientY };

    targetRotRef.current.y += deltaX * 0.45;
    targetRotRef.current.x -= deltaY * 0.45;

    // Constrain pitch to avoid disorientation
    targetRotRef.current.x = Math.max(-55, Math.min(55, targetRotRef.current.x));
  }, [isMobile]);

  const handlePointerUp = useCallback(() => {
    if (isDraggingRef.current) {
      isDraggingRef.current = false;
      setRotation({ x: targetRotRef.current.x, y: targetRotRef.current.y });
    }
  }, [setRotation]);

  return (
    <div 
      className="w-full h-full flex items-center justify-center overflow-hidden cursor-grab active:cursor-grabbing touch-none select-none"
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onDoubleClick={resetRotation}
      style={{
        perspective: '1300px',
      }}
    >
      {isMobile ? (
        // MOBILE VIEW: Frame disappears, fills viewport cleanly
        <div className="w-full h-full max-w-[420px] max-h-[100dvh] overflow-hidden bg-[#0B0F14]">
          <PhoneChassis />
        </div>
      ) : (
        // DESKTOP 3D STAGE
        <div 
          ref={stageRef}
          className="relative transition-transform duration-75 ease-out"
          style={{
            transformStyle: 'preserve-3d',
            transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
          }}
        >
          <PhoneChassis />
        </div>
      )}
    </div>
  );
};
