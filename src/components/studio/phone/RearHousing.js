import * as THREE from 'three';
import { PHONE_WIDTH, PHONE_HEIGHT, PHONE_DEPTH, CORNER_RADIUS, createRoundedRectShape } from './PhoneDimensions';
import { RearGraphicTexture } from './RearGraphicTexture';

export class RearHousing {
  constructor(aluminumMat, glassVisorMat, chamberMat, chamferMat, finishConfig = {}) {
    this.group = new THREE.Group();
    this.group.name = "RearHousing";

    this.aluminumMat = aluminumMat;
    this.glassVisorMat = glassVisorMat;
    this.chamberMat = chamberMat;
    this.chamferMat = chamferMat;
    this.finishConfig = finishConfig;

    const W = PHONE_WIDTH;
    const H = PHONE_HEIGHT;
    const R = CORNER_RADIUS;

    // -------------------------------------------------------------------------
    // 1. Procedural High-Res Internal Graphic Texture Plate (Layer 0)
    // -------------------------------------------------------------------------
    this.graphicTextureManager = new RearGraphicTexture(finishConfig);
    const graphicTex = this.graphicTextureManager.getTexture();

    const graphicMat = new THREE.MeshStandardMaterial({
      map: graphicTex,
      metalness: 0.35,
      roughness: 0.55,
      side: THREE.FrontSide,
    });
    this.graphicMat = graphicMat;

    const innerShape = createRoundedRectShape(W - 0.12, H - 0.12, R - 0.05);
    const innerGeom = new THREE.ShapeGeometry(innerShape);
    const innerMesh = new THREE.Mesh(innerGeom, graphicMat);
    innerMesh.position.z = 0.002;
    innerMesh.receiveShadow = true;
    this.group.add(innerMesh);

    // -------------------------------------------------------------------------
    // 2. Lower Structural Satin Aluminum Plate (Layer 1)
    // -------------------------------------------------------------------------
    const lowerPlateShape = new THREE.Shape();
    lowerPlateShape.moveTo(-W / 2 + R, -H / 2 + 0.06);
    lowerPlateShape.lineTo(W / 2 - R, -H / 2 + 0.06);
    lowerPlateShape.quadraticCurveTo(W / 2 - 0.06, -H / 2 + 0.06, W / 2 - 0.06, -H / 2 + R);
    lowerPlateShape.lineTo(W / 2 - 0.06, -0.95);
    lowerPlateShape.lineTo(-W / 2 + 0.06, -0.95);
    lowerPlateShape.lineTo(-W / 2 + 0.06, -H / 2 + R);
    lowerPlateShape.quadraticCurveTo(-W / 2 + 0.06, -H / 2 + 0.06, -W / 2 + R, -H / 2 + 0.06);

    const lowerPlateGeom = new THREE.ShapeGeometry(lowerPlateShape);
    const lowerPlateMesh = new THREE.Mesh(lowerPlateGeom, aluminumMat);
    lowerPlateMesh.position.z = 0.006;
    lowerPlateMesh.receiveShadow = true;
    this.group.add(lowerPlateMesh);

    // -------------------------------------------------------------------------
    // 3. Iconic Central Wireless Charging & Magnetic Coil Architecture (Layer 2)
    // -------------------------------------------------------------------------
    const coilGroup = new THREE.Group();
    coilGroup.position.set(0, -0.22, 0.008);

    // Dark Matte Coil Substrate Disc
    const coilBaseGeom = new THREE.CircleGeometry(1.08, 64);
    const coilBaseMat = new THREE.MeshStandardMaterial({
      color: 0x0a0e14,
      metalness: 0.5,
      roughness: 0.6,
    });
    const coilBase = new THREE.Mesh(coilBaseGeom, coilBaseMat);
    coilGroup.add(coilBase);

    // Precision Concentric Copper Induction Coil Tracks
    const copperCoilMat = new THREE.MeshStandardMaterial({
      color: finishConfig.id === 'copper' ? 0xe58b47 : finishConfig.id === 'obsidian' ? 0x8a6c42 : 0xd2a55b,
      metalness: 0.95,
      roughness: 0.18,
      side: THREE.DoubleSide,
    });
    this.copperCoilMat = copperCoilMat;

    // 5 Nested Concentric Conductive Copper Ribbons
    const trackRadii = [
      [0.98, 1.04],
      [0.86, 0.92],
      [0.74, 0.80],
      [0.62, 0.68],
      [0.50, 0.56],
    ];

    trackRadii.forEach(([innerR, outerR]) => {
      const ringGeom = new THREE.RingGeometry(innerR, outerR, 64);
      const ringMesh = new THREE.Mesh(ringGeom, copperCoilMat);
      ringMesh.position.z = 0.003;
      coilGroup.add(ringMesh);
    });

    // Central Core Magnetic Alignment Ring
    const coreRingGeom = new THREE.RingGeometry(0.24, 0.38, 48);
    const coreRingMat = new THREE.MeshStandardMaterial({
      color: 0x364354,
      metalness: 0.95,
      roughness: 0.15,
      side: THREE.DoubleSide,
    });
    const coreRing = new THREE.Mesh(coreRingGeom, coreRingMat);
    coreRing.position.z = 0.004;
    coilGroup.add(coreRing);

    // Center Core Aluminum Rivet
    const centerCapGeom = new THREE.CylinderGeometry(0.14, 0.14, 0.015, 32);
    centerCapGeom.rotateX(Math.PI / 2);
    const centerCap = new THREE.Mesh(centerCapGeom, chamferMat);
    centerCap.position.z = 0.007;
    coilGroup.add(centerCap);

    this.group.add(coilGroup);

    // -------------------------------------------------------------------------
    // 4. Exposed 3D Flexible Printed Circuit (FPC) Ribbon Cables (Layer 3)
    // -------------------------------------------------------------------------
    const fpcRibbonMat = new THREE.MeshStandardMaterial({
      color: 0x151c26,
      metalness: 0.6,
      roughness: 0.4,
    });

    const copperTraceMat = new THREE.MeshStandardMaterial({
      color: 0xc99c54,
      metalness: 0.95,
      roughness: 0.2,
    });

    // FPC 1: Central Vertical Ribbon connecting Coil to Bottom Ports
    const lowerFpcGeom = new THREE.PlaneGeometry(0.32, 1.85);
    const lowerFpcMesh = new THREE.Mesh(lowerFpcGeom, fpcRibbonMat);
    lowerFpcMesh.position.set(0, -1.95, 0.009);
    this.group.add(lowerFpcMesh);

    // Dual Copper Trace Strips on Lower FPC
    const trace1Geom = new THREE.PlaneGeometry(0.045, 1.85);
    const trace1 = new THREE.Mesh(trace1Geom, copperTraceMat);
    trace1.position.set(-0.08, -1.95, 0.011);
    const trace2 = new THREE.Mesh(trace1Geom, copperTraceMat);
    trace2.position.set(0.08, -1.95, 0.011);
    this.group.add(trace1);
    this.group.add(trace2);

    // FPC 2: Diagonal Upper Origami Ribbon (Camera to Mainboard)
    const upperFpcShape = new THREE.Shape();
    upperFpcShape.moveTo(-0.15, 0.95);
    upperFpcShape.lineTo(0.18, 0.95);
    upperFpcShape.lineTo(0.38, 0.42);
    upperFpcShape.lineTo(0.05, 0.42);
    const upperFpcGeom = new THREE.ShapeGeometry(upperFpcShape);
    const upperFpcMesh = new THREE.Mesh(upperFpcGeom, fpcRibbonMat);
    upperFpcMesh.position.z = 0.009;
    this.group.add(upperFpcMesh);

    // Surface-Mount Micro SMD Components (Tiny realistic IC chips on FPC)
    const chipMat = new THREE.MeshStandardMaterial({ color: 0x06080c, roughness: 0.3 });
    const silverContactMat = new THREE.MeshStandardMaterial({ color: 0xccd6e0, metalness: 0.9, roughness: 0.15 });

    const smdPositions = [
      [-0.10, -1.35],
      [0.08, -1.48],
      [-0.08, -2.25],
      [0.10, -2.40],
      [0.15, 0.72],
      [0.24, 0.58],
    ];

    smdPositions.forEach(([cx, cy]) => {
      const chipGeom = new THREE.BoxGeometry(0.07, 0.045, 0.012);
      const chip = new THREE.Mesh(chipGeom, chipMat);
      chip.position.set(cx, cy, 0.013);
      this.group.add(chip);

      // Silver Terminal Ends
      const termGeom = new THREE.BoxGeometry(0.018, 0.045, 0.013);
      const termL = new THREE.Mesh(termGeom, silverContactMat);
      termL.position.set(cx - 0.038, cy, 0.013);
      const termR = new THREE.Mesh(termGeom, silverContactMat);
      termR.position.set(cx + 0.038, cy, 0.013);
      this.group.add(termL);
      this.group.add(termR);
    });

    // -------------------------------------------------------------------------
    // 5. Tactile Knurled Circular Dial (Bottom Left)
    // -------------------------------------------------------------------------
    const dialGroup = new THREE.Group();
    dialGroup.position.set(-1.18, -2.92, 0.009);

    // Knurled Base Collar
    const dialBaseGeom = new THREE.CylinderGeometry(0.35, 0.35, 0.025, 48);
    dialBaseGeom.rotateX(Math.PI / 2);
    const dialBaseMesh = new THREE.Mesh(dialBaseGeom, chamferMat);
    dialGroup.add(dialBaseMesh);

    // Recessed Radial Flutes Ring
    const dialFluteGeom = new THREE.RingGeometry(0.20, 0.31, 32);
    const dialFluteMat = new THREE.MeshStandardMaterial({
      color: 0x18202c,
      metalness: 0.88,
      roughness: 0.35,
      side: THREE.DoubleSide,
    });
    const dialFluteMesh = new THREE.Mesh(dialFluteGeom, dialFluteMat);
    dialFluteMesh.position.z = 0.014;
    dialGroup.add(dialFluteMesh);

    // Polished Silver Center Rivet
    const dialPinGeom = new THREE.CylinderGeometry(0.10, 0.10, 0.03, 24);
    dialPinGeom.rotateX(Math.PI / 2);
    const dialPin = new THREE.Mesh(dialPinGeom, chamferMat);
    dialPin.position.z = 0.012;
    dialGroup.add(dialPin);

    this.group.add(dialGroup);

    // -------------------------------------------------------------------------
    // 6. Perimeter Torx Screws & Mechanical Anchors (Layer 4)
    // -------------------------------------------------------------------------
    const torxScrewGeom = new THREE.CylinderGeometry(0.04, 0.04, 0.018, 16);
    torxScrewGeom.rotateX(Math.PI / 2);
    const torxScrewMat = new THREE.MeshStandardMaterial({
      color: 0x9fb0c4,
      metalness: 0.95,
      roughness: 0.18,
    });

    const chassisScrewCoords = [
      [-1.48, 3.65], [1.48, 3.65],   // Top corners
      [-1.52, 0.65], [1.52, 0.65],   // Mid quadrants
      [-1.52, -1.05], [1.52, -1.05], // Above battery
      [-1.48, -3.65], [1.48, -3.65], // Bottom corners
      [-0.45, -3.65], [0.45, -3.65], // Bottom dock anchors
    ];

    chassisScrewCoords.forEach(([sx, sy]) => {
      const screw = new THREE.Mesh(torxScrewGeom, torxScrewMat);
      screw.position.set(sx, sy, 0.012);
      this.group.add(screw);
    });

    // -------------------------------------------------------------------------
    // 7. Full-Body 2.5D Crystal Transparent Glass Backplate (Layer 5 - Outermost)
    // -------------------------------------------------------------------------
    const glassBackShape = createRoundedRectShape(W, H, R);
    const glassBackExtrude = {
      depth: 0.035,
      bevelEnabled: true,
      bevelSegments: 4,
      bevelSize: 0.022,
      bevelThickness: 0.022,
    };
    const glassBackGeom = new THREE.ExtrudeGeometry(glassBackShape, glassBackExtrude);
    glassBackGeom.center();

    const glassBackMesh = new THREE.Mesh(glassBackGeom, glassVisorMat);
    glassBackMesh.position.set(0, 0, 0.032);
    glassBackMesh.castShadow = true;
    glassBackMesh.receiveShadow = true;
    this.group.add(glassBackMesh);
  }

  updateFinish(finishConfig) {
    this.finishConfig = finishConfig;
    if (this.graphicTextureManager) {
      this.graphicTextureManager.updateFinish(finishConfig);
    }
    if (this.copperCoilMat) {
      const isCopper = finishConfig.id === 'copper';
      const isObsidian = finishConfig.id === 'obsidian';
      this.copperCoilMat.color.set(isCopper ? 0xe58b47 : isObsidian ? 0x8a6c42 : 0xd2a55b);
    }
  }

  getGroup() {
    return this.group;
  }
}
