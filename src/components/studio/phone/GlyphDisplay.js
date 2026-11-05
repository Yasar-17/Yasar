import * as THREE from 'three';

export class GlyphDisplay {
  constructor(glyphTextureManager, finishConfig = {}) {
    this.group = new THREE.Group();
    this.group.name = "GlyphDisplay";

    // Exact placement inside the right half of the visor module
    const cx = 0.68;
    const cy = 2.05;

    // 1. CNC-Machined Outer Aluminum Bezel Ring
    const bezelOuterRadius = 0.65;
    const bezelInnerRadius = 0.56;
    const bezelGeom = new THREE.RingGeometry(bezelInnerRadius, bezelOuterRadius, 64);
    const bezelMat = new THREE.MeshStandardMaterial({
      color: 0x222834,
      metalness: 0.90,
      roughness: 0.25,
      side: THREE.DoubleSide,
    });
    const bezelMesh = new THREE.Mesh(bezelGeom, bezelMat);
    bezelMesh.position.set(cx, cy, 0.038);
    this.group.add(bezelMesh);

    // 2. Chamfered Inner Accent Ring
    const chamferGeom = new THREE.RingGeometry(bezelInnerRadius - 0.015, bezelInnerRadius, 64);
    const chamferMat = new THREE.MeshStandardMaterial({
      color: 0x4a566a,
      metalness: 0.95,
      roughness: 0.15,
      side: THREE.DoubleSide,
    });
    const chamferMesh = new THREE.Mesh(chamferGeom, chamferMat);
    chamferMesh.position.set(cx, cy, 0.039);
    this.group.add(chamferMesh);

    // 3. Dark Recessed Aperture Chamber Base
    const chamberBaseGeom = new THREE.CircleGeometry(bezelInnerRadius, 64);
    const chamberBaseMat = new THREE.MeshBasicMaterial({ color: 0x05080c });
    const chamberBase = new THREE.Mesh(chamberBaseGeom, chamberBaseMat);
    chamberBase.position.set(cx, cy, 0.034);
    this.group.add(chamberBase);

    // 4. Live 137-LED Emissive Matrix Texture Plane (Soundwave / Waveform display)
    const glyphTexture = glyphTextureManager.getTexture();
    const glyphMat = new THREE.MeshBasicMaterial({
      map: glyphTexture,
      transparent: true,
      depthWrite: false,
    });

    const glyphPlaneGeom = new THREE.PlaneGeometry(1.22, 1.22);
    const glyphMesh = new THREE.Mesh(glyphPlaneGeom, glyphMat);
    glyphMesh.position.set(cx, cy, 0.040);
    this.group.add(glyphMesh);

    // 5. Phosphor Micro-Diffuser Dome Glass Overlay
    const diffuserGeom = new THREE.CircleGeometry(bezelInnerRadius - 0.005, 48);
    const diffuserMat = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      transmission: 0.70,
      opacity: 0.85,
      transparent: true,
      roughness: 0.18,
      ior: 1.48,
    });
    const diffuserMesh = new THREE.Mesh(diffuserGeom, diffuserMat);
    diffuserMesh.position.set(cx, cy, 0.042);
    this.group.add(diffuserMesh);
  }

  getGroup() {
    return this.group;
  }
}
