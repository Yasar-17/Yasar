import * as THREE from 'three';

export class CameraIsland {
  constructor(milledRingMat, lensMat) {
    this.group = new THREE.Group();
    this.group.name = "CameraIsland";

    // Common shared materials for intricate camera hardware
    const darkHousingMat = new THREE.MeshStandardMaterial({
      color: 0x121720,
      metalness: 0.85,
      roughness: 0.28,
    });

    const knurledRingMat = new THREE.MeshStandardMaterial({
      color: 0x242d3b,
      metalness: 0.92,
      roughness: 0.22,
    });

    const goldContactMat = new THREE.MeshStandardMaterial({
      color: 0xd4af37,
      metalness: 0.95,
      roughness: 0.15,
    });

    const periscopeMirrorMat = new THREE.MeshPhysicalMaterial({
      color: 0x050c18,
      metalness: 0.95,
      roughness: 0.05,
      clearcoat: 1.0,
      clearcoatRoughness: 0.03,
    });

    // -------------------------------------------------------------------------
    // 1. Transparent Nano-Injection Molded Camera Visor Platform
    // -------------------------------------------------------------------------
    const visorShape = new THREE.Shape();
    // Rounded rectangular visor shape covering the left camera pod
    const vw = 1.62;
    const vh = 2.45;
    const vr = 0.35;
    visorShape.moveTo(-vw / 2 + vr, -vh / 2);
    visorShape.lineTo(vw / 2 - vr, -vh / 2);
    visorShape.quadraticCurveTo(vw / 2, -vh / 2, vw / 2, -vh / 2 + vr);
    visorShape.lineTo(vw / 2, vh / 2 - vr);
    visorShape.quadraticCurveTo(vw / 2, vh / 2, vw / 2 - vr, vh / 2);
    visorShape.lineTo(-vw / 2 + vr, vh / 2);
    visorShape.quadraticCurveTo(-vw / 2, vh / 2, -vw / 2, vh / 2 - vr);
    visorShape.lineTo(-vw / 2, -vh / 2 + vr);
    visorShape.quadraticCurveTo(-vw / 2, -vh / 2, -vw / 2 + vr, -vh / 2);

    const visorExtrude = { depth: 0.035, bevelEnabled: true, bevelSegments: 3, bevelSize: 0.02, bevelThickness: 0.02 };
    const visorGeom = new THREE.ExtrudeGeometry(visorShape, visorExtrude);
    visorGeom.center();

    const visorGlassMat = new THREE.MeshPhysicalMaterial({
      color: 0x111620,
      transmission: 0.75,
      opacity: 0.9,
      transparent: true,
      roughness: 0.12,
      ior: 1.54,
      thickness: 0.15,
      clearcoat: 1.0,
      clearcoatRoughness: 0.05,
    });

    const visorMesh = new THREE.Mesh(visorGeom, visorGlassMat);
    visorMesh.position.set(-0.76, 2.05, 0.02);
    visorMesh.castShadow = true;
    this.group.add(visorMesh);

    // Dark Internal Visor Bezel Plate
    const visorPlateGeom = new THREE.PlaneGeometry(vw - 0.05, vh - 0.05);
    const visorPlate = new THREE.Mesh(visorPlateGeom, darkHousingMat);
    visorPlate.position.set(-0.76, 2.05, 0.005);
    this.group.add(visorPlate);

    // -------------------------------------------------------------------------
    // 2. Primary 50MP Sony IMX Sensor with Concentric Knurled Ring (Top Left)
    // -------------------------------------------------------------------------
    const mainCamGroup = new THREE.Group();
    mainCamGroup.position.set(-0.78, 2.65, 0.045);

    // Outer CNC Beveled Ring
    const mainCamOuterGeom = new THREE.CylinderGeometry(0.54, 0.54, 0.045, 48);
    mainCamOuterGeom.rotateX(Math.PI / 2);
    const mainCamOuterRing = new THREE.Mesh(mainCamOuterGeom, milledRingMat);
    mainCamOuterRing.castShadow = true;
    mainCamGroup.add(mainCamOuterRing);

    // Stepped Inner Knurled Ring
    const mainCamKnurlGeom = new THREE.CylinderGeometry(0.44, 0.44, 0.055, 48);
    mainCamKnurlGeom.rotateX(Math.PI / 2);
    const mainCamKnurl = new THREE.Mesh(mainCamKnurlGeom, knurledRingMat);
    mainCamGroup.add(mainCamKnurl);

    // Optical Sapphire Lens
    const mainLensGeom = new THREE.CylinderGeometry(0.36, 0.36, 0.06, 48);
    mainLensGeom.rotateX(Math.PI / 2);
    const mainLens = new THREE.Mesh(mainLensGeom, lensMat);
    mainCamGroup.add(mainLens);

    // Internal Aperture & Pupil
    const irisGeom = new THREE.CylinderGeometry(0.19, 0.19, 0.065, 32);
    irisGeom.rotateX(Math.PI / 2);
    const irisMesh = new THREE.Mesh(irisGeom, new THREE.MeshBasicMaterial({ color: 0x020406 }));
    mainCamGroup.add(irisMesh);

    // Anti-reflective Violet Coating Core
    const arCoreGeom = new THREE.CylinderGeometry(0.08, 0.08, 0.068, 24);
    arCoreGeom.rotateX(Math.PI / 2);
    const arCoreMat = new THREE.MeshBasicMaterial({ color: 0x1b1433 });
    const arCoreMesh = new THREE.Mesh(arCoreGeom, arCoreMat);
    mainCamGroup.add(arCoreMesh);

    this.group.add(mainCamGroup);

    // -------------------------------------------------------------------------
    // 3. World's First 140x Periscope Ultra Zoom Aperture (Square Tetraprism)
    // -------------------------------------------------------------------------
    const periscopeGroup = new THREE.Group();
    periscopeGroup.position.set(-1.12, 1.62, 0.04);

    // Square Outer Metallic Frame with Beveled Edges
    const periFrameShape = new THREE.Shape();
    const pw = 0.52;
    const ph = 0.52;
    const pr = 0.08;
    periFrameShape.moveTo(-pw / 2 + pr, -ph / 2);
    periFrameShape.lineTo(pw / 2 - pr, -ph / 2);
    periFrameShape.quadraticCurveTo(pw / 2, -ph / 2, pw / 2, -ph / 2 + pr);
    periFrameShape.lineTo(pw / 2, ph / 2 - pr);
    periFrameShape.quadraticCurveTo(pw / 2, ph / 2, pw / 2 - pr, ph / 2);
    periFrameShape.lineTo(-pw / 2 + pr, ph / 2);
    periFrameShape.quadraticCurveTo(-pw / 2, ph / 2, -pw / 2, ph / 2 - pr);
    periFrameShape.lineTo(-pw / 2, -ph / 2 + pr);
    periFrameShape.quadraticCurveTo(-pw / 2, -ph / 2, -pw / 2 + pr, -ph / 2);

    const periExtrude = { depth: 0.045, bevelEnabled: true, bevelSegments: 2, bevelSize: 0.015, bevelThickness: 0.015 };
    const periGeom = new THREE.ExtrudeGeometry(periFrameShape, periExtrude);
    periGeom.center();
    const periFrameMesh = new THREE.Mesh(periGeom, milledRingMat);
    periscopeGroup.add(periFrameMesh);

    // Deep Tetraprism Mirror Chamber (Angled internal prism reflection)
    const prismOpeningGeom = new THREE.BoxGeometry(0.34, 0.34, 0.04);
    const prismOpeningMesh = new THREE.Mesh(prismOpeningGeom, periscopeMirrorMat);
    prismOpeningMesh.position.z = 0.01;
    periscopeGroup.add(prismOpeningMesh);

    // Periscope Internal Glass Prism Element (folds light 90 degrees)
    const prismGlassGeom = new THREE.BoxGeometry(0.24, 0.24, 0.02);
    const prismGlassMesh = new THREE.Mesh(prismGlassGeom, lensMat);
    prismGlassMesh.position.z = 0.025;
    periscopeGroup.add(prismGlassMesh);

    this.group.add(periscopeGroup);

    // -------------------------------------------------------------------------
    // 4. Secondary 50MP Ultra-Wide Macro Camera (Beside Periscope)
    // -------------------------------------------------------------------------
    const uwCamGroup = new THREE.Group();
    uwCamGroup.position.set(-0.46, 1.62, 0.04);

    const uwRingGeom = new THREE.CylinderGeometry(0.28, 0.28, 0.045, 36);
    uwRingGeom.rotateX(Math.PI / 2);
    const uwRing = new THREE.Mesh(uwRingGeom, milledRingMat);
    uwCamGroup.add(uwRing);

    const uwLensGeom = new THREE.CylinderGeometry(0.20, 0.20, 0.052, 36);
    uwLensGeom.rotateX(Math.PI / 2);
    const uwLens = new THREE.Mesh(uwLensGeom, lensMat);
    uwCamGroup.add(uwLens);

    const uwIrisGeom = new THREE.CylinderGeometry(0.09, 0.09, 0.056, 24);
    uwIrisGeom.rotateX(Math.PI / 2);
    const uwIris = new THREE.Mesh(uwIrisGeom, new THREE.MeshBasicMaterial({ color: 0x020406 }));
    uwCamGroup.add(uwIris);

    this.group.add(uwCamGroup);

    // -------------------------------------------------------------------------
    // 5. Film Camera-Inspired Red Video Recording Tally Light
    // -------------------------------------------------------------------------
    const tallyGroup = new THREE.Group();
    tallyGroup.position.set(-0.18, 2.92, 0.038);

    // Polished Chrome/Silver Bezel Collar
    const tallyBezelGeom = new THREE.CylinderGeometry(0.055, 0.055, 0.035, 24);
    tallyBezelGeom.rotateX(Math.PI / 2);
    const tallyBezel = new THREE.Mesh(tallyBezelGeom, milledRingMat);
    tallyGroup.add(tallyBezel);

    // Ruby Red Emissive Convex Jewel Lens
    const tallyLensGeom = new THREE.SphereGeometry(0.04, 16, 16);
    const tallyMat = new THREE.MeshStandardMaterial({
      color: 0xff1122,
      emissive: 0xff0022,
      emissiveIntensity: 0.95,
      roughness: 0.15,
      metalness: 0.1,
    });
    const tallyLens = new THREE.Mesh(tallyLensGeom, tallyMat);
    tallyLens.position.z = 0.015;
    tallyGroup.add(tallyLens);

    this.group.add(tallyGroup);

    // -------------------------------------------------------------------------
    // 6. Laser ToF Autofocus & Color Sensor Capsule
    // -------------------------------------------------------------------------
    const sensorShape = new THREE.Shape();
    sensorShape.absarc(-0.08, 0, 0.065, Math.PI / 2, -Math.PI / 2, false);
    sensorShape.absarc(0.08, 0, 0.065, -Math.PI / 2, Math.PI / 2, false);
    const sensorGeom = new THREE.ShapeGeometry(sensorShape);
    const sensorMat = new THREE.MeshBasicMaterial({ color: 0x070a0f });
    const sensorMesh = new THREE.Mesh(sensorGeom, sensorMat);
    sensorMesh.position.set(-1.22, 2.38, 0.025);
    this.group.add(sensorMesh);

    // Dual Micro Infrared Lenses inside ToF capsule
    const irGeom = new THREE.CylinderGeometry(0.03, 0.03, 0.01, 16);
    irGeom.rotateX(Math.PI / 2);
    const irMat = new THREE.MeshBasicMaterial({ color: 0x141f2e });
    const ir1 = new THREE.Mesh(irGeom, irMat);
    ir1.position.set(-1.30, 2.38, 0.03);
    const ir2 = new THREE.Mesh(irGeom, irMat);
    ir2.position.set(-1.14, 2.38, 0.03);
    this.group.add(ir1);
    this.group.add(ir2);

    // -------------------------------------------------------------------------
    // 7. True-Tone Dual LED Flash with Concentric Fresnel Diffuser
    // -------------------------------------------------------------------------
    const flashGroup = new THREE.Group();
    flashGroup.position.set(-0.24, 2.38, 0.03);

    const flashRingGeom = new THREE.CylinderGeometry(0.14, 0.14, 0.03, 32);
    flashRingGeom.rotateX(Math.PI / 2);
    const flashRing = new THREE.Mesh(flashRingGeom, milledRingMat);
    flashGroup.add(flashRing);

    // Cool White & Warm Amber Dual Emitters
    const flashEmitGeom = new THREE.CircleGeometry(0.10, 24);
    const flashEmitMat = new THREE.MeshBasicMaterial({ color: 0xfbf1d8 });
    const flashEmit = new THREE.Mesh(flashEmitGeom, flashEmitMat);
    flashEmit.position.z = 0.016;
    flashGroup.add(flashEmit);

    this.group.add(flashGroup);

    // -------------------------------------------------------------------------
    // 8. Precision Miniature Torx Fasteners (Camera Pod Mounts)
    // -------------------------------------------------------------------------
    const screwGeom = new THREE.CylinderGeometry(0.035, 0.035, 0.02, 16);
    screwGeom.rotateX(Math.PI / 2);
    const screwMat = new THREE.MeshStandardMaterial({
      color: 0x8a99ad,
      metalness: 0.95,
      roughness: 0.2,
    });

    const screwPositions = [
      [-1.42, 3.10],
      [-0.15, 3.10],
      [-1.42, 1.02],
      [-0.15, 1.02],
    ];

    screwPositions.forEach(([sx, sy]) => {
      const screwMesh = new THREE.Mesh(screwGeom, screwMat);
      screwMesh.position.set(sx, sy, 0.025);
      this.group.add(screwMesh);
    });
  }

  getGroup() {
    return this.group;
  }
}
