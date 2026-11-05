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
    // 1. Procedural High-Res Texture Plate (Satin Backplate + Dial + Markings)
    // -------------------------------------------------------------------------
    this.graphicTextureManager = new RearGraphicTexture(finishConfig);
    const graphicTex = this.graphicTextureManager.getTexture();

    const graphicMat = new THREE.MeshStandardMaterial({
      map: graphicTex,
      metalness: 0.25,
      roughness: 0.38,
      side: THREE.FrontSide,
    });
    this.graphicMat = graphicMat;

    const innerShape = createRoundedRectShape(W - 0.04, H - 0.04, R - 0.02);
    const innerExtrude = {
      depth: 0.015,
      bevelEnabled: true,
      bevelSegments: 3,
      bevelSize: 0.015,
      bevelThickness: 0.015,
    };
    const innerGeom = new THREE.ExtrudeGeometry(innerShape, innerExtrude);
    innerGeom.center();

    const innerMesh = new THREE.Mesh(innerGeom, graphicMat);
    innerMesh.position.set(0, 0, 0.010);
    innerMesh.receiveShadow = true;
    this.group.add(innerMesh);

    // -------------------------------------------------------------------------
    // 2. Physical 3D Tactile Debossed Circular Dial at Bottom-Left
    // -------------------------------------------------------------------------
    const dialGroup = new THREE.Group();
    dialGroup.position.set(-1.18, -2.95, 0.024);

    // Outer Debossed Ring Collar
    const dialOuterGeom = new THREE.RingGeometry(0.24, 0.34, 48);
    const dialRingMat = new THREE.MeshStandardMaterial({
      color: 0x303a48,
      metalness: 0.90,
      roughness: 0.25,
      side: THREE.DoubleSide,
    });
    const dialRing = new THREE.Mesh(dialOuterGeom, dialRingMat);
    dialRing.position.z = 0.003;
    dialGroup.add(dialRing);

    // Debossed Inner Center Floor
    const dialCenterGeom = new THREE.CircleGeometry(0.24, 48);
    const dialCenterMat = new THREE.MeshStandardMaterial({
      color: 0x12161e,
      metalness: 0.35,
      roughness: 0.55,
    });
    const dialCenter = new THREE.Mesh(dialCenterGeom, dialCenterMat);
    dialCenter.position.z = 0.001;
    dialGroup.add(dialCenter);

    this.group.add(dialGroup);
  }

  updateFinish(finishConfig) {
    this.finishConfig = finishConfig;
    if (this.graphicTextureManager) {
      this.graphicTextureManager.updateFinish(finishConfig);
    }
  }

  getGroup() {
    return this.group;
  }
}
