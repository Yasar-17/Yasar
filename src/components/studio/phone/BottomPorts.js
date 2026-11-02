import * as THREE from 'three';
import { PHONE_HEIGHT } from './PhoneDimensions';

export class BottomPorts {
  constructor(chamberMat) {
    this.group = new THREE.Group();
    this.group.name = "BottomPorts";

    const yPos = -PHONE_HEIGHT / 2 - 0.01;

    // 1. Center USB-C Port Outer Housing
    const usbOuterGeom = new THREE.BoxGeometry(0.32, 0.02, 0.08);
    const usbOuter = new THREE.Mesh(usbOuterGeom, chamberMat);
    usbOuter.position.set(0, yPos, 0);
    this.group.add(usbOuter);

    // USB-C Internal Gold Contact Pin
    const goldMat = new THREE.MeshStandardMaterial({
      color: 0xd4af37,
      metalness: 0.9,
      roughness: 0.2,
    });
    const pinGeom = new THREE.BoxGeometry(0.18, 0.015, 0.015);
    const pin = new THREE.Mesh(pinGeom, goldMat);
    pin.position.set(0, yPos - 0.002, 0);
    this.group.add(pin);

    // 2. CNC Speaker Acoustic Slits (Right side)
    for (let i = 0; i < 4; i++) {
      const slitGeom = new THREE.BoxGeometry(0.05, 0.02, 0.03);
      const slit = new THREE.Mesh(slitGeom, chamberMat);
      slit.position.set(0.65 + i * 0.12, yPos, 0);
      this.group.add(slit);
    }

    // 3. Primary Microphone Hole (Left side)
    const micGeom = new THREE.CylinderGeometry(0.02, 0.02, 0.03, 16);
    const mic = new THREE.Mesh(micGeom, chamberMat);
    mic.position.set(-0.55, yPos, 0);
    this.group.add(mic);

    // 4. SIM Tray Pinhole (Far Left)
    const simHoleGeom = new THREE.CylinderGeometry(0.015, 0.015, 0.03, 16);
    const simHole = new THREE.Mesh(simHoleGeom, chamberMat);
    simHole.position.set(-1.15, yPos, 0);
    this.group.add(simHole);
  }

  getGroup() {
    return this.group;
  }
}

