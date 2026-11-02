import React, { useMemo, useEffect, useRef } from 'react';
import * as THREE from 'three';
import { useGLTF } from '@react-three/drei';

export const PHONE_MODEL_URL = '/models/nothing-phone-4a-pro/phone.glb';

export const PhoneModel = ({
  modelUrl = PHONE_MODEL_URL,
  finish = 'silver',
  scale = 1,
  onLoaded,
}) => {
  const groupRef = useRef();

  // Load the glTF/glb file using @react-three/drei's useGLTF
  // This suspends until loaded and throws on network/404 error (caught by PhoneScene ErrorBoundary)
  const gltf = useGLTF(modelUrl);

  // Clone scene so multiple instances or hot-reloads don't mutate the cached GLTF scene directly
  const clonedScene = useMemo(() => {
    if (!gltf?.scene) return null;
    return gltf.scene.clone(true);
  }, [gltf]);

  // Configure PBR materials, shadows, and physical dimensions
  useEffect(() => {
    if (!clonedScene) return;

    // 1. Compute bounding box to center model accurately
    const box = new THREE.Box3().setFromObject(clonedScene);
    const center = new THREE.Vector3();
    const size = new THREE.Vector3();
    box.getCenter(center);
    box.getSize(size);

    // Center model at origin
    clonedScene.position.x = -center.x;
    clonedScene.position.y = -center.y;
    clonedScene.position.z = -center.z;

    // Normalize height to ~5.0 units if model was exported in meters (0.1617m) or millimeters (161.7mm)
    if (size.y > 0) {
      let targetHeight = 5.0;
      let calculatedScale = targetHeight / size.y;
      if (groupRef.current) {
        groupRef.current.scale.setScalar(calculatedScale * scale);
      }
    }

    // 2. Material enhancement for premium physical product aesthetics
    clonedScene.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;

        if (child.material) {
          const mat = child.material.clone();
          const name = (mat.name || child.name || '').toLowerCase();

          // Anodized Aluminum chassis and CNC chamfered edges
          if (
            name.includes('metal') ||
            name.includes('aluminum') ||
            name.includes('chassis') ||
            name.includes('frame') ||
            name.includes('rail') ||
            name.includes('button')
          ) {
            mat.metalness = 0.92;
            mat.roughness = 0.28;
            mat.envMapIntensity = 1.35;
            mat.needsUpdate = true;
          }
          // Rear crystal visor & front screen glass
          else if (
            name.includes('glass') ||
            name.includes('visor') ||
            name.includes('crystal') ||
            name.includes('screen')
          ) {
            mat.transparent = true;
            mat.opacity = 0.92;
            mat.roughness = 0.04;
            mat.metalness = 0.05;
            if ('transmission' in mat) {
              mat.transmission = 0.94;
              mat.ior = 1.52;
              mat.thickness = 0.6;
            }
            mat.envMapIntensity = 1.6;
            mat.needsUpdate = true;
          }
          // Sapphire camera lenses & optics
          else if (name.includes('lens') || name.includes('camera') || name.includes('sensor')) {
            mat.color = new THREE.Color(0x05070a);
            mat.metalness = 0.2;
            mat.roughness = 0.02;
            mat.envMapIntensity = 1.8;
            mat.needsUpdate = true;
          }
          // Glyph LED matrix apertures
          else if (name.includes('glyph') || name.includes('led') || name.includes('light')) {
            mat.emissive = new THREE.Color(0xffffff);
            mat.emissiveIntensity = 2.4;
            mat.needsUpdate = true;
          }

          child.material = mat;
        }
      }
    });

    if (onLoaded) {
      onLoaded({ size, box });
    }

    // 3. Clean up and dispose of cloned materials/geometries on unmount
    return () => {
      clonedScene.traverse((child) => {
        if (child.isMesh) {
          if (child.geometry) child.geometry.dispose();
          if (child.material) {
            if (Array.isArray(child.material)) {
              child.material.forEach((m) => m.dispose());
            } else {
              child.material.dispose();
            }
          }
        }
      });
    };
  }, [clonedScene, scale, finish, onLoaded]);

  if (!clonedScene) return null;

  return (
    <group ref={groupRef}>
      <primitive object={clonedScene} />
    </group>
  );
};

export default PhoneModel;

