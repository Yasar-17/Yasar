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
      metalness: 0.12,
      roughness: 0.62,
      side: THREE.FrontSide,
    });
    this.graphicMat = graphicMat;

    const innerShape = createRoundedRectShape(W - 0.08, H - 0.08, R - 0.04);
    const innerGeom = new THREE.ShapeGeometry(innerShape);
    const innerMesh = new THREE.Mesh(innerGeom, graphicMat);
    innerMesh.position.z = 0.002;
    innerMesh.receiveShadow = true;
    this.group.add(innerMesh);

    // -------------------------------------------------------------------------
    // 2. Physical 3D Tactile Debossed Circular Dial at Bottom-Left
    // -------------------------------------------------------------------------
    const dialGroup = new THREE.Group();
    dialGroup.position.set(-1.18, -2.95, 0.005);

    // Outer Debossed Ring Collar
    const dialOuterGeom = new THREE.RingGeometry(0.24, 0.33, 48);
    const dialRingMat = new THREE.MeshStandardMaterial({
      color: 0x181e26,
      metalness: 0.85,
      roughness: 0.35,
      side: THREE.DoubleSide,
    });
    const dialRing = new THREE.Mesh(dialOuterGeom, dialRingMat);
    dialRing.position.z = 0.003;
    dialGroup.add(dialRing);

    // Debossed Inner Center Floor
    const dialCenterGeom = new THREE.CircleGeometry(0.24, 48);
    const dialCenterMat = new THREE.MeshStandardMaterial({
      color: 0x11141a,
      metalness: 0.2,
      roughness: 0.7,
    });
    const dialCenter = new THREE.Mesh(dialCenterGeom, dialCenterMat);
    dialCenter.position.z = 0.001;
    dialGroup.add(dialCenter);

    this.group.add(dialGroup);

    // -------------------------------------------------------------------------
    // 3. Full-Body 2.5D Crystal Transparent Glass Backplate (Layer 3 - Outermost)
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
  }

  getGroup() {
    return this.group;
  }
}
