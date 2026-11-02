import * as THREE from 'three';
import { PHONE_WIDTH, PHONE_HEIGHT, PHONE_DEPTH, CORNER_RADIUS } from './PhoneDimensions';

export class RearHousing {
  constructor(aluminumMat, glassVisorMat, chamberMat, chamferMat) {
    this.group = new THREE.Group();
    this.group.name = "RearHousing";

    const W = PHONE_WIDTH;
    const H = PHONE_HEIGHT;
    const R = CORNER_RADIUS;

    // 1. Lower Satin Silver Plate
    const lowerPlateShape = new THREE.Shape();
    lowerPlateShape.moveTo(-W / 2 + R, -H / 2);
    lowerPlateShape.lineTo(W / 2 - R, -H / 2);
    lowerPlateShape.quadraticCurveTo(W / 2, -H / 2, W / 2, -H / 2 + R);
    lowerPlateShape.lineTo(W / 2, 0.4);
    lowerPlateShape.lineTo(-W / 2, 0.4);
    lowerPlateShape.lineTo(-W / 2, -H / 2 + R);
    lowerPlateShape.quadraticCurveTo(-W / 2, -H / 2, -W / 2 + R, -H / 2);

    const lowerPlateGeom = new THREE.ShapeGeometry(lowerPlateShape);
    const lowerPlateMesh = new THREE.Mesh(lowerPlateGeom, aluminumMat);
    lowerPlateMesh.receiveShadow = true;
    this.group.add(lowerPlateMesh);

    // Circular Tactile Dial Indentation at Bottom Left
    const dialGeom = new THREE.CylinderGeometry(0.32, 0.32, 0.02, 32);
    dialGeom.rotateX(Math.PI / 2);
    const dialMesh = new THREE.Mesh(dialGeom, chamferMat);
    dialMesh.position.set(-1.15, -2.9, 0.005);
    this.group.add(dialMesh);

    // 2. Upper Transparent Crystal Visor Chamber
    const upperChamberShape = new THREE.Shape();
    upperChamberShape.moveTo(-W / 2 + 0.12, 0.48);
    upperChamberShape.lineTo(W / 2 - 0.12, 0.48);
    upperChamberShape.lineTo(W / 2 - 0.12, H / 2 - R);
    upperChamberShape.quadraticCurveTo(W / 2 - 0.12, H / 2 - 0.12, W / 2 - R, H / 2 - 0.12);
    upperChamberShape.lineTo(-W / 2 + R, H / 2 - 0.12);
    upperChamberShape.quadraticCurveTo(-W / 2 + 0.12, H / 2 - 0.12, -W / 2 + 0.12, H / 2 - R);
    upperChamberShape.lineTo(-W / 2 + 0.12, 0.48);

    // Dark Interior Chamber Base
    const chamberBaseGeom = new THREE.ShapeGeometry(upperChamberShape);
    const chamberBaseMesh = new THREE.Mesh(chamberBaseGeom, chamberMat);
    chamberBaseMesh.position.z = 0.002;
    this.group.add(chamberBaseMesh);

    // Transparent Crystal Glass Dome Visor
    const glassVisorGeom = new THREE.ShapeGeometry(upperChamberShape);
    const glassVisorMesh = new THREE.Mesh(glassVisorGeom, glassVisorMat);
    glassVisorMesh.position.z = 0.035;
    this.group.add(glassVisorMesh);

    // Red Status Indicator Element
    const redStatusMat = new THREE.MeshBasicMaterial({ color: 0xD71921 });
    const redSquareGeom = new THREE.PlaneGeometry(0.12, 0.12);
    const redSquareMesh = new THREE.Mesh(redSquareGeom, redStatusMat);
    redSquareMesh.position.set(0.95, 1.25, 0.018);
    this.group.add(redSquareMesh);

    // Internal Micro-Fasteners / Torx Screws
    const screwGeom = new THREE.CylinderGeometry(0.04, 0.04, 0.01, 16);
    screwGeom.rotateX(Math.PI / 2);
    const screwMat = new THREE.MeshStandardMaterial({ color: 0x4a5568, metalness: 0.9, roughness: 0.3 });
    const screwCoords = [
      [-1.3, 3.4],
      [1.3, 3.4],
      [-1.3, 0.65],
      [1.3, 0.65],
    ];
    screwCoords.forEach(([sx, sy]) => {
      const screw = new THREE.Mesh(screwGeom, screwMat);
      screw.position.set(sx, sy, 0.01);
      this.group.add(screw);
    });
  }

  getGroup() {
    return this.group;
  }
}

