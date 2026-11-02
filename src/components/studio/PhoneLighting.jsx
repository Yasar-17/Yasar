import React, { Suspense } from 'react';
import { ContactShadows, Environment } from '@react-three/drei';

function SafeEnvironment({ preset = 'studio' }) {
  return (
    <Suspense fallback={null}>
      <Environment preset={preset} />
    </Suspense>
  );
}

export const PhoneLighting = ({
  enableEnvironment = true,
  enableShadows = true,
  environmentPreset = 'studio',
}) => {
  return (
    <>
      {/* 1. Environment Map for High-Fidelity Metallic & Glass Reflections */}
      {enableEnvironment && <SafeEnvironment preset={environmentPreset} />}

      {/* 2. Hemisphere Ambient Fill: Cool Sky, Dark Obsidian Floor */}
      <hemisphereLight
        skyColor="#ffffff"
        groundColor="#0e131b"
        intensity={0.65}
      />

      {/* 3. Key Light: Main Crisp Studio Illumination with PCF Soft Shadows */}
      <directionalLight
        position={[-3.8, 5.5, 7.5]}
        intensity={1.75}
        color="#ffffff"
        castShadow={enableShadows}
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-bias={-0.0001}
        shadow-normalBias={0.015}
        shadow-camera-left={-5}
        shadow-camera-right={5}
        shadow-camera-top={5}
        shadow-camera-bottom={-5}
        shadow-camera-near={0.1}
        shadow-camera-far={25}
      />

      {/* 4. Fill Light: Soft Diffuse Side Glow */}
      <directionalLight
        position={[4.2, 1.8, 3.5]}
        intensity={0.7}
        color="#edf2f7"
      />

      {/* 5. Rim / Chamfer Light: Highlights Beveled Aluminum Edges & Rear Visor */}
      <directionalLight
        position={[-2.2, 4.0, -6.5]}
        intensity={1.6}
        color="#f8fafc"
      />

      {/* 6. Top Overhead Downlight: Accentuates Top Micro-Chassis & Secondary Mic */}
      <directionalLight
        position={[0, 6.5, 0]}
        intensity={0.4}
        color="#e2e8f0"
      />

      {/* 7. Soft Studio Contact Shadows Grounding the Phone */}
      {enableShadows && (
        <ContactShadows
          position={[0, -2.65, 0]}
          opacity={0.65}
          scale={10}
          blur={2.4}
          far={4.5}
          resolution={512}
          color="#000000"
        />
      )}
    </>
  );
};

export default PhoneLighting;

