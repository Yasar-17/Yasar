import * as THREE from 'three';
import { PHONE_WIDTH, PHONE_HEIGHT } from './PhoneDimensions';

export class SideButtons {
  constructor(aluminumMat, chamferMat) {
    this.group = new THREE.Group();
    this.group.name = "SideButtons";

    // 1. Left Rail: Volume Up (y = 1.6)
    const volUpGeom = new THREE.BoxGeometry(0.04, 0.45, 0.12);
    const volUp = new THREE.Mesh(volUpGeom, aluminumMat);
    volUp.position.set(-PHONE_WIDTH / 2 - 0.02, 1.6, 0);
    this.group.add(volUp);

    // 2. Left Rail: Volume Down (y = 1.05)
    const volDownGeom = new THREE.BoxGeometry(0.04, 0.45, 0.12);
    const volDown = new THREE.Mesh(volDownGeom, aluminumMat);
    volDown.position.set(-PHONE_WIDTH / 2 - 0.02, 1.05, 0);
    this.group.add(volDown);

    // 3. Left Rail: Dedicated Essential Key (y = 0.25)
    // Tactile ridged key with diamond-cut chamfer
    const essentialGeom = new THREE.BoxGeometry(0.05, 0.48, 0.13);
    const essentialKey = new THREE.Mesh(essentialGeom, chamferMat);
    essentialKey.position.set(-PHONE_WIDTH / 2 - 0.025, 0.25, 0);
    this.group.add(essentialKey);

    // 4. Right Rail: Power Button (y = 1.35)
    const powerGeom = new THREE.BoxGeometry(0.04, 0.65, 0.12);
    const powerBtn = new THREE.Mesh(powerGeom, aluminumMat);
    powerBtn.position.set(PHONE_WIDTH / 2 + 0.02, 1.35, 0);
    this.group.add(powerBtn);

    // 5. Top Rail: Secondary Mic Pinhole
    const micGeom = new THREE.CylinderGeometry(0.02, 0.02, 0.03, 16);
    const micMesh = new THREE.Mesh(micGeom, new THREE.MeshBasicMaterial({ color: 0x05070a }));
    micMesh.position.set(0, PHONE_HEIGHT / 2 + 0.015, 0);
    this.group.add(micMesh);
  }

  getGroup() {
    return this.group;
  }
}
