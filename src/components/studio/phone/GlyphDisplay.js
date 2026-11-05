import * as THREE from 'three';

export class GlyphDisplay {
  constructor(glyphTextureManager, finishConfig = {}) {
    this.group = new THREE.Group();
    this.group.name = "GlyphDisplay";

    // Exact placement inside the right half of the visor module
    const cx = 0.68;
    const cy = 2.05;

    // 1. Dark Recessed Aperture Chamber Base
    const bezelInnerRadius = 0.56;
    const chamberBaseGeom = new THREE.CircleGeometry(bezelInnerRadius, 64);
    const chamberBaseMat = new THREE.MeshBasicMaterial({ color: 0x05070b });
    const chamberBase = new THREE.Mesh(chamberBaseGeom, chamberBaseMat);
    chamberBase.position.set(cx, cy, 0.040);
    this.group.add(chamberBase);

    // 2. CNC-Machined Outer Aluminum Bezel Ring
    const bezelOuterRadius = 0.66;
    const bezelGeom = new THREE.RingGeometry(bezelInnerRadius, bezelOuterRadius, 64);
    const bezelMat = new THREE.MeshStandardMaterial({
      color: 0x4a586d,
      metalness: 0.95,
      roughness: 0.18,
      side: THREE.DoubleSide,
    });
    const bezelMesh = new THREE.Mesh(bezelGeom, bezelMat);
    bezelMesh.position.set(cx, cy, 0.047);
    this.group.add(bezelMesh);

    // 3. Chamfered Inner Accent Ring
    const chamferGeom = new THREE.RingGeometry(bezelInnerRadius - 0.02, bezelInnerRadius, 64);
    const chamferMat = new THREE.MeshStandardMaterial({
      color: 0x7688a2,
      metalness: 0.95,
      roughness: 0.12,
      side: THREE.DoubleSide,
    });
    const chamferMesh = new THREE.Mesh(chamferGeom, chamferMat);
    chamferMesh.position.set(cx, cy, 0.048);
    this.group.add(chamferMesh);

    // 4. Live 137-LED Emissive Matrix Texture Plane (Soundwave / Waveform display)
    const glyphTexture = glyphTextureManager.getTexture();
    const glyphMat = new THREE.MeshBasicMaterial({
      map: glyphTexture,
      transparent: true,
      depthWrite: false,
    });

    const glyphPlaneGeom = new THREE.PlaneGeometry(1.22, 1.22);
    const glyphMesh = new THREE.Mesh(glyphPlaneGeom, glyphMat);
    glyphMesh.position.set(cx, cy, 0.049);
    glyphMesh.renderOrder = 10;
    this.group.add(glyphMesh);

    // 5. Crystal Protective Glass Lens Overlay
    const lensCapGeom = new THREE.CircleGeometry(bezelInnerRadius - 0.005, 48);
    const lensCapMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.08,
      roughness: 0.04,
      metalness: 0.10,
      depthWrite: false,
    });
    const lensCapMesh = new THREE.Mesh(lensCapGeom, lensCapMat);
    lensCapMesh.position.set(cx, cy, 0.051);
    lensCapMesh.renderOrder = 11;
    this.group.add(lensCapMesh);
  }

  getGroup() {
    return this.group;
  }
}
