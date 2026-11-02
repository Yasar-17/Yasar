import * as THREE from 'three';
import { PHONE_WIDTH, PHONE_HEIGHT, PHONE_DEPTH, CORNER_RADIUS, createRoundedRectShape } from './PhoneDimensions';

export class ChassisFrame {
  constructor(aluminumMat, chamferMat) {
    this.group = new THREE.Group();
    this.group.name = "ChassisFrame";

    const phoneShape = createRoundedRectShape(PHONE_WIDTH, PHONE_HEIGHT, CORNER_RADIUS);

    // Extruded Unibody Rail with Smooth Bevel
    const extrudeSettings = {
      depth: PHONE_DEPTH,
      bevelEnabled: true,
      bevelSegments: 5,
      steps: 1,
      bevelSize: 0.025,
      bevelThickness: 0.025,
    };
    const chassisGeom = new THREE.ExtrudeGeometry(phoneShape, extrudeSettings);
    chassisGeom.center();

    const chassisMesh = new THREE.Mesh(chassisGeom, aluminumMat);
    chassisMesh.castShadow = true;
    chassisMesh.receiveShadow = true;
    this.group.add(chassisMesh);

    // Diamond-Cut CNC Specular Chamfer Edge Highlights
    const chamferGeom = new THREE.EdgesGeometry(chassisGeom, 35);
    const chamferLines = new THREE.LineSegments(
      chamferGeom,
      new THREE.LineBasicMaterial({ color: 0xffffff, opacity: 0.38, transparent: true })
    );
    this.group.add(chamferLines);

    // Antenna Isolation Breaks (Frosted polymer slits on rails)
    const antennaMat = new THREE.MeshBasicMaterial({ color: 0x5a6370 });
    const positions = [
      { x: -PHONE_WIDTH / 2 - 0.005, y: 2.8, z: 0, w: 0.03, h: 0.04, d: PHONE_DEPTH + 0.02 },
      { x: -PHONE_WIDTH / 2 - 0.005, y: -2.8, z: 0, w: 0.03, h: 0.04, d: PHONE_DEPTH + 0.02 },
      { x: PHONE_WIDTH / 2 + 0.005, y: 2.8, z: 0, w: 0.03, h: 0.04, d: PHONE_DEPTH + 0.02 },
      { x: PHONE_WIDTH / 2 + 0.005, y: -2.8, z: 0, w: 0.03, h: 0.04, d: PHONE_DEPTH + 0.02 },
    ];
    positions.forEach((pos) => {
      const geom = new THREE.BoxGeometry(pos.w, pos.h, pos.d);
      const mesh = new THREE.Mesh(geom, antennaMat);
      mesh.position.set(pos.x, pos.y, pos.z);
      this.group.add(mesh);
    });
  }

  getGroup() {
    return this.group;
  }
}

