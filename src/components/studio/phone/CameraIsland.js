import * as THREE from 'three';

export class CameraIsland {
  constructor(milledRingMat, lensMat) {
    this.group = new THREE.Group();
    this.group.name = "CameraIsland";

    // Premium dark metal finish for camera housings
    const bezelMat = new THREE.MeshStandardMaterial({
      color: 0x1b2029,
      metalness: 0.90,
      roughness: 0.25,
    });

    const innerKnurlMat = new THREE.MeshStandardMaterial({
      color: 0x101318,
      metalness: 0.85,
      roughness: 0.35,
    });

    const pupilMat = new THREE.MeshBasicMaterial({ color: 0x020406 });
    const glintMat = new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.75 });

    // -------------------------------------------------------------------------
    // 1. Upper Visor Sculpted Glass Shield (Spans Camera + Display Pod)
    // -------------------------------------------------------------------------
    const visorShape = new THREE.Shape();
    const vw = 3.12;
    const vh = 2.05;
    const vr = 0.38;
    visorShape.moveTo(-vw / 2 + vr, -vh / 2);
    visorShape.lineTo(vw / 2 - vr, -vh / 2);
    visorShape.quadraticCurveTo(vw / 2, -vh / 2, vw / 2, -vh / 2 + vr);
    visorShape.lineTo(vw / 2, vh / 2 - vr);
    visorShape.quadraticCurveTo(vw / 2, vh / 2, vw / 2 - vr, vh / 2);
    visorShape.lineTo(-vw / 2 + vr, vh / 2);
    visorShape.quadraticCurveTo(-vw / 2, vh / 2, -vw / 2, vh / 2 - vr);
    visorShape.lineTo(-vw / 2, -vh / 2 + vr);
    visorShape.quadraticCurveTo(-vw / 2, -vh / 2, -vw / 2 + vr, -vh / 2);

    const visorExtrude = {
      depth: 0.038,
      bevelEnabled: true,
      bevelSegments: 4,
      bevelSize: 0.025,
      bevelThickness: 0.025,
    };
    const visorGeom = new THREE.ExtrudeGeometry(visorShape, visorExtrude);
    visorGeom.center();

    const visorMat = new THREE.MeshPhysicalMaterial({
      color: 0x080c12,
      transmission: 0.82,
      opacity: 0.92,
      transparent: true,
      roughness: 0.08,
      ior: 1.54,
      thickness: 0.18,
      clearcoat: 1.0,
      clearcoatRoughness: 0.04,
    });

    const visorMesh = new THREE.Mesh(visorGeom, visorMat);
    visorMesh.position.set(0, 1.95, 0.022);
    visorMesh.castShadow = true;
    this.group.add(visorMesh);

    // -------------------------------------------------------------------------
    // 2. Large Primary Main Camera Lens (Top Left: x = -0.72, y = 2.25)
    // -------------------------------------------------------------------------
    const mainCamGroup = new THREE.Group();
    mainCamGroup.position.set(-0.72, 2.25, 0.045);

    // Outer Milled CNC Bezel Ring
    const mainOuterGeom = new THREE.CylinderGeometry(0.48, 0.48, 0.048, 48);
    mainOuterGeom.rotateX(Math.PI / 2);
    const mainOuterRing = new THREE.Mesh(mainOuterGeom, bezelMat);
    mainOuterRing.castShadow = true;
    mainCamGroup.add(mainOuterRing);

    // Stepped Inner Bezel Ring
    const mainInnerGeom = new THREE.CylinderGeometry(0.38, 0.38, 0.055, 48);
    mainInnerGeom.rotateX(Math.PI / 2);
    const mainInnerRing = new THREE.Mesh(mainInnerGeom, innerKnurlMat);
    mainCamGroup.add(mainInnerRing);

    // Optical Sapphire Glass Lens
    const mainLensGeom = new THREE.CylinderGeometry(0.30, 0.30, 0.060, 48);
    mainLensGeom.rotateX(Math.PI / 2);
    const mainLens = new THREE.Mesh(mainLensGeom, lensMat);
    mainCamGroup.add(mainLens);

    // Center Pupil Aperture
    const mainPupilGeom = new THREE.CircleGeometry(0.14, 32);
    const mainPupil = new THREE.Mesh(mainPupilGeom, pupilMat);
    mainPupil.position.z = 0.032;
    mainCamGroup.add(mainPupil);

    // White Specular Lens Glint Dot
    const mainGlintGeom = new THREE.CircleGeometry(0.045, 16);
    const mainGlint = new THREE.Mesh(mainGlintGeom, glintMat);
    mainGlint.position.set(0.08, 0.08, 0.033);
    mainCamGroup.add(mainGlint);

    this.group.add(mainCamGroup);

    // -------------------------------------------------------------------------
    // 3. Horizontal Pill Dual-Camera Capsule (Bottom Left: x = -0.72, y = 1.48)
    // -------------------------------------------------------------------------
    const pillGroup = new THREE.Group();
    pillGroup.position.set(-0.72, 1.48, 0.045);

    // Pill Bezel Housing
    const pillShape = new THREE.Shape();
    const pw = 0.52;
    const pr = 0.28;
    pillShape.absarc(-pw / 2, 0, pr, Math.PI / 2, -Math.PI / 2, false);
    pillShape.absarc(pw / 2, 0, pr, -Math.PI / 2, Math.PI / 2, false);

    const pillExtrude = {
      depth: 0.045,
      bevelEnabled: true,
      bevelSegments: 3,
      bevelSize: 0.018,
      bevelThickness: 0.018,
    };
    const pillGeom = new THREE.ExtrudeGeometry(pillShape, pillExtrude);
    pillGeom.center();
    const pillMesh = new THREE.Mesh(pillGeom, bezelMat);
    pillMesh.castShadow = true;
    pillGroup.add(pillMesh);

    // Dual Circular Lenses Inside the Pill
    const subLensPositions = [-0.25, 0.25]; // Relative to pill center
    subLensPositions.forEach((lx) => {
      // Stepped Lens Ring
      const ringGeom = new THREE.CylinderGeometry(0.17, 0.17, 0.052, 32);
      ringGeom.rotateX(Math.PI / 2);
      const ringMesh = new THREE.Mesh(ringGeom, innerKnurlMat);
      ringMesh.position.x = lx;
      pillGroup.add(ringMesh);

      // Lens Glass
      const subLensGeom = new THREE.CylinderGeometry(0.13, 0.13, 0.056, 32);
      subLensGeom.rotateX(Math.PI / 2);
      const subLens = new THREE.Mesh(subLensGeom, lensMat);
      subLens.position.x = lx;
      pillGroup.add(subLens);

      // Pupil
      const pupilGeom = new THREE.CircleGeometry(0.065, 24);
      const pupil = new THREE.Mesh(pupilGeom, pupilMat);
      pupil.position.set(lx, 0, 0.030);
      pillGroup.add(pupil);

      // Specular Glint
      const glintGeom = new THREE.CircleGeometry(0.022, 16);
      const glint = new THREE.Mesh(glintGeom, glintMat);
      glint.position.set(lx + 0.035, 0.035, 0.031);
      pillGroup.add(glint);
    });

    this.group.add(pillGroup);

    // -------------------------------------------------------------------------
    // 4. Pinhole Microphone / Ambient Sensor
    // -------------------------------------------------------------------------
    const micGeom = new THREE.CylinderGeometry(0.035, 0.035, 0.02, 16);
    micGeom.rotateX(Math.PI / 2);
    const micMesh = new THREE.Mesh(micGeom, pupilMat);
    micMesh.position.set(-0.12, 2.22, 0.038);
    this.group.add(micMesh);

    // -------------------------------------------------------------------------
    // 5. Iconic Red Status Square (Bottom Right of Upper Visor)
    // -------------------------------------------------------------------------
    const redMat = new THREE.MeshStandardMaterial({
      color: 0xD71921,
      roughness: 0.35,
      metalness: 0.1,
    });
    const redGeom = new THREE.BoxGeometry(0.14, 0.14, 0.015);
    const redMesh = new THREE.Mesh(redGeom, redMat);
    redMesh.position.set(1.24, 1.28, 0.035);
    this.group.add(redMesh);

    // Dual Micro-Sensor Dots beside red square
    const pinGeom = new THREE.CylinderGeometry(0.025, 0.025, 0.015, 12);
    pinGeom.rotateX(Math.PI / 2);
    const pin1 = new THREE.Mesh(pinGeom, pupilMat);
    pin1.position.set(1.42, 1.34, 0.035);
    const pin2 = new THREE.Mesh(pinGeom, pupilMat);
    pin2.position.set(1.42, 1.22, 0.035);
    this.group.add(pin1);
    this.group.add(pin2);

    // -------------------------------------------------------------------------
    // 6. Horizontal Alignment Grooves Extending to Chassis Rails
    // -------------------------------------------------------------------------
    const grooveMat = new THREE.MeshStandardMaterial({
      color: 0x181c24,
      metalness: 0.8,
      roughness: 0.4,
    });

    // Left & Right horizontal transition grooves matching reference image
    const grooveCoords = [
      { x: -1.70, y: 2.75, w: 0.28 },
      { x: 1.70, y: 2.75, w: 0.28 },
      { x: -1.70, y: 1.15, w: 0.28 },
      { x: 1.70, y: 1.15, w: 0.28 },
    ];
    grooveCoords.forEach((g) => {
      const gGeom = new THREE.BoxGeometry(g.w, 0.04, 0.01);
      const gMesh = new THREE.Mesh(gGeom, grooveMat);
      gMesh.position.set(g.x, g.y, 0.015);
      this.group.add(gMesh);
    });
  }

  getGroup() {
    return this.group;
  }
}
