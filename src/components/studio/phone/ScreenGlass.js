import * as THREE from 'three';
import { PHONE_WIDTH, PHONE_HEIGHT, PHONE_DEPTH, CORNER_RADIUS, createRoundedRectShape } from './PhoneDimensions';

export class ScreenGlass {
  constructor() {
    this.group = new THREE.Group();
    this.group.name = "ScreenGlass";

    const phoneShape = createRoundedRectShape(PHONE_WIDTH, PHONE_HEIGHT, CORNER_RADIUS);

    // Front Display Bezel (Z = +PHONE_DEPTH / 2 + 0.015)
    const bezelMat = new THREE.MeshBasicMaterial({ color: 0x080b0f });
    const bezelGeom = new THREE.ShapeGeometry(phoneShape);
    const bezelMesh = new THREE.Mesh(bezelGeom, bezelMat);
    bezelMesh.position.z = PHONE_DEPTH / 2 + 0.015;
    this.group.add(bezelMesh);

    // Dynamic Island / Centered Punch-Hole Camera
    const punchHoleGeom = new THREE.CylinderGeometry(0.06, 0.06, 0.01, 24);
    punchHoleGeom.rotateX(Math.PI / 2);
    const punchHoleMat = new THREE.MeshBasicMaterial({ color: 0x020305 });
    const punchHole = new THREE.Mesh(punchHoleGeom, punchHoleMat);
    punchHole.position.set(0, 3.65, PHONE_DEPTH / 2 + 0.02);
    this.group.add(punchHole);
  }

  getGroup() {
    return this.group;
  }
}

