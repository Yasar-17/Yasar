import * as THREE from 'three';

export class CameraIsland {
  constructor(milledRingMat, lensMat) {
    this.group = new THREE.Group();
    this.group.name = "CameraIsland";

    // 1. Large 50MP Circular Main Camera Island (Left)
    const mainCamGroup = new THREE.Group();
    mainCamGroup.position.set(-0.82, 2.45, 0.04);

    // Milled Outer Ring
    const mainCamRingGeom = new THREE.CylinderGeometry(0.55, 0.55, 0.05, 48);
    mainCamRingGeom.rotateX(Math.PI / 2);
    const mainCamRing = new THREE.Mesh(mainCamRingGeom, milledRingMat);
    mainCamRing.castShadow = true;
    mainCamGroup.add(mainCamRing);

    // Optical Sapphire Lens
    const mainLensGeom = new THREE.CylinderGeometry(0.38, 0.38, 0.055, 48);
    mainLensGeom.rotateX(Math.PI / 2);
    const mainLens = new THREE.Mesh(mainLensGeom, lensMat);
    mainCamGroup.add(mainLens);

    // Aperture pupil
    const irisGeom = new THREE.CylinderGeometry(0.18, 0.18, 0.06, 32);
    irisGeom.rotateX(Math.PI / 2);
    const irisMesh = new THREE.Mesh(irisGeom, new THREE.MeshBasicMaterial({ color: 0x000000 }));
    mainCamGroup.add(irisMesh);

    this.group.add(mainCamGroup);

    // 2. Secondary Horizontal Pill Dual-Camera Capsule (Left, beneath main)
    const pillCamGroup = new THREE.Group();
    pillCamGroup.position.set(-0.62, 1.35, 0.035);

    // Pill Bezel
    const pillShape = new THREE.Shape();
    pillShape.absarc(-0.35, 0, 0.32, Math.PI / 2, -Math.PI / 2, false);
    pillShape.absarc(0.35, 0, 0.32, -Math.PI / 2, Math.PI / 2, false);
    const pillExtrude = { depth: 0.04, bevelEnabled: true, bevelSegments: 3, bevelSize: 0.015, bevelThickness: 0.015 };
    const pillGeom = new THREE.ExtrudeGeometry(pillShape, pillExtrude);
    pillGeom.center();
    const pillMesh = new THREE.Mesh(pillGeom, milledRingMat);
    pillMesh.castShadow = true;
    pillCamGroup.add(pillMesh);

    // Lens 2
    const subLens1Geom = new THREE.CylinderGeometry(0.22, 0.22, 0.05, 32);
    subLens1Geom.rotateX(Math.PI / 2);
    const subLens1 = new THREE.Mesh(subLens1Geom, lensMat);
    subLens1.position.x = -0.35;
    pillCamGroup.add(subLens1);

    // Lens 3
    const subLens2Geom = new THREE.CylinderGeometry(0.22, 0.22, 0.05, 32);
    subLens2Geom.rotateX(Math.PI / 2);
    const subLens2 = new THREE.Mesh(subLens2Geom, lensMat);
    subLens2.position.x = 0.35;
    pillCamGroup.add(subLens2);

    this.group.add(pillCamGroup);
  }

  getGroup() {
    return this.group;
  }
}

