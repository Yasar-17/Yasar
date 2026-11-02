import React, { useState, useEffect, Suspense, Component } from 'react';
import * as THREE from 'three';
import { Canvas } from '@react-three/fiber';
import { PhoneModel, PHONE_MODEL_URL } from './PhoneModel';
import { PhoneLighting } from './PhoneLighting';
import { PhoneControls } from './PhoneControls';
import { PhoneFallback } from './PhoneFallback';
import { RotateIcon } from '../../ui/Icons';

// Error Boundary for R3F Canvas Asset Loading
class ModelErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.warn('[PhoneScene] Model loading failed, falling back:', error);
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <PhoneFallback
            missingAsset={this.props.modelUrl || 'public/models/nothing-phone-4a-pro/phone.glb'}
            errorMessage={this.state.error?.message}
            onRetry={this.props.onRetry}
          />
        )
      );
    }
    return this.props.children;
  }
}

// Check for WebGL capability in client environment
function checkWebGLSupport() {
  if (typeof window === 'undefined') return true;
  try {
    const canvas = document.createElement('canvas');
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext('webgl2') ||
        canvas.getContext('webgl') ||
        canvas.getContext('experimental-webgl'))
    );
  } catch (e) {
    return false;
  }
}

export const PhoneScene = ({
  modelUrl = PHONE_MODEL_URL,
  finish = 'silver',
  scale = 1,
  showControls = true,
  autoRotate = false,
  className = '',
}) => {
  const [webglAvailable, setWebglAvailable] = useState(true);
  const [assetStatus, setAssetStatus] = useState('checking'); // 'checking' | 'available' | 'missing'
  const [flipped, setFlipped] = useState(false);
  const [retryCount, setRetryCount] = useState(0);

  // 1. Verify WebGL availability
  useEffect(() => {
    const supported = checkWebGLSupport();
    setWebglAvailable(supported);
  }, []);

  // 2. Pre-flight probe to check if model asset exists on static server
  useEffect(() => {
    let isMounted = true;
    setAssetStatus('checking');

    fetch(modelUrl, { method: 'HEAD' })
      .then((res) => {
        if (!isMounted) return;
        // Verify response is OK and not an SPA index.html fallback
        const contentType = res.headers.get('content-type') || '';
        if (res.ok && !contentType.includes('text/html')) {
          setAssetStatus('available');
        } else {
          setAssetStatus('missing');
        }
      })
      .catch(() => {
        if (!isMounted) return;
        setAssetStatus('missing');
      });

    return () => {
      isMounted = false;
    };
  }, [modelUrl, retryCount]);

  const handleRetry = () => {
    setRetryCount((prev) => prev + 1);
  };

  const handleToggleFlip = () => {
    setFlipped((prev) => !prev);
  };

  const handleResetAngle = () => {
    setFlipped(false);
  };

  // If WebGL is not supported, render Fallback UI
  if (!webglAvailable) {
    return (
      <div className={`relative w-full h-full min-h-[500px] flex items-center justify-center ${className}`}>
        <PhoneFallback webglError={true} onRetry={handleRetry} />
      </div>
    );
  }

  // If asset is confirmed missing, render Fallback state reporting exact asset path
  if (assetStatus === 'missing') {
    return (
      <div className={`relative w-full h-full min-h-[500px] flex items-center justify-center ${className}`}>
        <PhoneFallback
          missingAsset="public/models/nothing-phone-4a-pro/phone.glb"
          onRetry={handleRetry}
        />
      </div>
    );
  }

  return (
    <div className={`relative w-full h-full min-h-[500px] flex flex-col items-center justify-center select-none ${className}`}>
      
      {/* 3D WebGL Canvas */}
      <div className="absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing">
        <ModelErrorBoundary
          modelUrl={modelUrl}
          onRetry={handleRetry}
          fallback={
            <PhoneFallback
              missingAsset="public/models/nothing-phone-4a-pro/phone.glb"
              onRetry={handleRetry}
            />
          }
        >
          <Canvas
            camera={{ position: [0, 0, 9], fov: 32 }}
            dpr={[1, 2]}
            gl={{
              antialias: true,
              alpha: true,
              powerPreference: 'high-performance',
              toneMapping: THREE.ACESFilmicToneMapping,
              toneMappingExposure: 1.15,
            }}
            shadows
            className="w-full h-full"
          >
            {/* Studio Environment & 3-Point Lighting Rig */}
            <PhoneLighting />

            {/* Orbit Drag Controls with Spring Damping and Idle Floating */}
            <PhoneControls flipped={flipped} autoRotate={autoRotate}>
              <Suspense fallback={null}>
                <PhoneModel modelUrl={modelUrl} finish={finish} scale={scale} />
              </Suspense>
            </PhoneControls>
          </Canvas>
        </ModelErrorBoundary>
      </div>

      {/* Floating Studio Controls Toolbar */}
      {showControls && (
        <div className="absolute bottom-6 z-20 flex flex-col items-center space-y-2 pointer-events-auto">
          <p className="text-[11px] font-mono text-[#9AA6B2] tracking-wider uppercase opacity-80">
            Drag to Orbit &bull; Double Click to Reset
          </p>

          <div className="flex items-center space-x-2 bg-[#12161f]/90 backdrop-blur-md border border-[#232b36] rounded-full p-1.5 shadow-xl">
            <button
              type="button"
              onClick={handleToggleFlip}
              className="flex items-center space-x-2 text-xs font-medium text-[#E8EDF2] hover:text-[#7CF2C9] px-3.5 py-1.5 rounded-full hover:bg-white/5 transition-all"
            >
              <RotateIcon className="w-3.5 h-3.5" />
              <span>{flipped ? 'View Front' : 'View Rear'}</span>
            </button>

            <div className="w-[1px] h-3 bg-[#232b36]" />

            <button
              type="button"
              onClick={handleResetAngle}
              className="text-xs font-medium text-[#9AA6B2] hover:text-[#E8EDF2] px-3 py-1.5 rounded-full hover:bg-white/5 transition-colors"
            >
              Reset Angle
            </button>
          </div>
        </div>
      )}

    </div>
  );
};

export default PhoneScene;

