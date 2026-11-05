import * as THREE from 'three';

export class CameraIsland {
  constructor(milledRingMat, lensMat) {
    this.group = new THREE.Group();
    this.group.name = "CameraIsland";

    // Premium dark metal finish for camera housings (anodized titanium sheen)
    const bezelMat = new THREE.MeshStandardMaterial({
      color: 0x3e4b5d,
      metalness: 0.92,
      roughness: 0.22,
    });

    const innerKnurlMat = new THREE.MeshStandardMaterial({
      color: 0x202734,
      metalness: 0.88,
      roughness: 0.32,
    });

    const pupilMat = new THREE.MeshBasicMaterial({ color: 0x010204 });
    const glintMat = new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.90 });

    // -------------------------------------------------------------------------
    // 1. Upper Visor Sculpted Glass Shield (Spans Camera + Display Pod)
    // -------------------------------------------------------------------------
    const visorShape = new THREE.Shape();
    const vw = 3.12;
    const vh = 2.02;
    const vr = 0.40;
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
      depth: 0.026,
      bevelEnabled: true,
      bevelSegments: 4,
      bevelSize: 0.022,
      bevelThickness: 0.022,
    };
    const visorGeom = new THREE.ExtrudeGeometry(visorShape, visorExtrude);
    visorGeom.center();

    // Base dark metallic visor plateau
    const visorPlateauMat = new THREE.MeshStandardMaterial({
      color: 0x12161f,
      metalness: 0.82,
      roughness: 0.26,
    });
    const visorMesh = new THREE.Mesh(visorGeom, visorPlateauMat);
    visorMesh.position.set(0, 1.95, 0.024);
    visorMesh.castShadow = true;
    this.group.add(visorMesh);

    // Visor Outer Metallic Bevel Rim
    const rimShape = new THREE.Shape();
    const rimExtrude = {
      depth: 0.008,
      bevelEnabled: true,
      bevelSegments: 2,
      bevelSize: 0.015,
      bevelThickness: 0.015,
    };
    const rimGeom = new THREE.ExtrudeGeometry(visorShape, rimExtrude);
    rimGeom.center();
    const rimMat = new THREE.MeshStandardMaterial({
      color: 0x48566a,
      metalness: 0.95,
      roughness: 0.16,
    });
    const rimMesh = new THREE.Mesh(rimGeom, rimMat);
    rimMesh.position.set(0, 1.95, 0.038);
    this.group.add(rimMesh);

    // -------------------------------------------------------------------------
    // 2. Large Primary Main Camera Lens (Top Left: x = -0.72, y = 2.25)
    // -------------------------------------------------------------------------
    const mainCamGroup = new THREE.Group();
    mainCamGroup.position.set(-0.72, 2.25, 0.046);

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
    const mainGlintGeom = new THREE.CircleGeometry(0.048, 16);
    const mainGlint = new THREE.Mesh(mainGlintGeom, glintMat);
    mainGlint.position.set(0.09, 0.09, 0.034);
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
      roughness: 0.25,
      metalness: 0.2,
      emissive: 0xD71921,
      emissiveIntensity: 0.55,
    });
    const redGeom = new THREE.BoxGeometry(0.14, 0.14, 0.015);
    const redMesh = new THREE.Mesh(redGeom, redMat);
    redMesh.position.set(1.24, 1.28, 0.045);
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
