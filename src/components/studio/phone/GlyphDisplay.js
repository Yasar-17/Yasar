import * as THREE from 'three';

export class GlyphDisplay {
  constructor(glyphTextureManager, finishConfig = {}) {
    this.group = new THREE.Group();
    this.group.name = "GlyphDisplay";

    const cx = 0.82;
    const cy = 2.25;

    // 1. CNC-Machined Outer Aluminum Bezel Ring
    const bezelOuterRadius = 0.72;
    const bezelInnerRadius = 0.63;
    const bezelGeom = new THREE.RingGeometry(bezelInnerRadius, bezelOuterRadius, 64);
    const bezelMat = new THREE.MeshStandardMaterial({
      color: 0x303b4a,
      metalness: 0.92,
      roughness: 0.22,
      side: THREE.DoubleSide,
    });
    const bezelMesh = new THREE.Mesh(bezelGeom, bezelMat);
    bezelMesh.position.set(cx, cy, 0.018);
    this.group.add(bezelMesh);

    // 2. Chamfered Accent Ring
    const chamferGeom = new THREE.RingGeometry(bezelInnerRadius - 0.015, bezelInnerRadius, 64);
    const chamferMat = new THREE.MeshStandardMaterial({
      color: 0x7a8ba3,
      metalness: 0.96,
      roughness: 0.12,
      side: THREE.DoubleSide,
    });
    const chamferMesh = new THREE.Mesh(chamferGeom, chamferMat);
    chamferMesh.position.set(cx, cy, 0.019);
    this.group.add(chamferMesh);

    // 3. Dark Recessed Aperture Chamber Base
    const chamberBaseGeom = new THREE.CircleGeometry(bezelInnerRadius, 64);
    const chamberBaseMat = new THREE.MeshBasicMaterial({ color: 0x06090e });
    const chamberBase = new THREE.Mesh(chamberBaseGeom, chamberBaseMat);
    chamberBase.position.set(cx, cy, 0.014);
    this.group.add(chamberBase);

    // 4. Live 137-LED Emissive Matrix Texture Plane
    const glyphTexture = glyphTextureManager.getTexture();
    const glyphMat = new THREE.MeshBasicMaterial({
      map: glyphTexture,
      transparent: true,
      depthWrite: false,
    });

    const glyphPlaneGeom = new THREE.PlaneGeometry(1.36, 1.36);
    const glyphMesh = new THREE.Mesh(glyphPlaneGeom, glyphMat);
    glyphMesh.position.set(cx, cy, 0.021);
    this.group.add(glyphMesh);

    // 5. Phosphor Micro-Diffuser Dome Glass Overlay
    const diffuserGeom = new THREE.CircleGeometry(bezelInnerRadius - 0.005, 48);
    const diffuserMat = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      transmission: 0.65,
      opacity: 0.8,
      transparent: true,
      roughness: 0.25,
      ior: 1.48,
    });
    const diffuserMesh = new THREE.Mesh(diffuserGeom, diffuserMat);
    diffuserMesh.position.set(cx, cy, 0.023);
    this.group.add(diffuserMesh);

    // 6. Perimeter Alignment Fasteners
    const screwGeom = new THREE.CylinderGeometry(0.028, 0.028, 0.015, 12);
    screwGeom.rotateX(Math.PI / 2);
    const screwMat = new THREE.MeshStandardMaterial({
      color: 0x8a99ad,
      metalness: 0.95,
      roughness: 0.2,
    });

    // 4 cardinal mounting points around the bezel
    const radius = 0.675;
    const angles = [0, Math.PI / 2, Math.PI, (3 * Math.PI) / 2];
    angles.forEach((ang) => {
      const sx = cx + Math.cos(ang) * radius;
      const sy = cy + Math.sin(ang) * radius;
      const screw = new THREE.Mesh(screwGeom, screwMat);
      screw.position.set(sx, sy, 0.024);
      this.group.add(screw);
    });
  }

  getGroup() {
    return this.group;
  }
}
