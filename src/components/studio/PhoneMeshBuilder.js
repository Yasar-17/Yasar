import * as THREE from 'three';

// Exact proportional dimensions matching 372px x 806px display
const W = 3.72;
const H = 8.06;
const D = 0.42;
const R = 0.46; // 48px corner radius equivalent

export function createRoundedRectShape(w, h, r) {
  const shape = new THREE.Shape();
  const x = -w / 2;
  const y = -h / 2;

  shape.moveTo(x + r, y);
  shape.lineTo(x + w - r, y);
  shape.quadraticCurveTo(x + w, y, x + w, y + r);
  shape.lineTo(x + w, y + h - r);
  shape.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  shape.lineTo(x + r, y + h);
  shape.quadraticCurveTo(x, y + h, x, y + h - r);
  shape.lineTo(x, y + r);
  shape.quadraticCurveTo(x, y, x + r, y);

  return shape;
}

export class PhoneMeshBuilder {
  constructor(glyphTextureManager) {
    this.glyphTextureManager = glyphTextureManager;
    this.materials = {};
  }

  build(finishConfig) {
    const group = new THREE.Group();
    group.name = "PhoneModelGroup";

    // --- MATERIALS SETUP ---
    // 1. Anodized Aluminum (Frame & Lower Plate)
    const aluminumMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color(finishConfig.aluminum),
      metalness: 0.88,
      roughness: 0.24,
    });
    this.materials.aluminum = aluminumMat;

    // 2. Diamond-Cut Chamfer Bevel Highlight
    const chamferMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color(0xffffff),
      metalness: 0.95,
      roughness: 0.12,
    });

    // 3. Transparent Crystal Glass Visor (Upper Chamber)
    const glassVisorMat = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color(finishConfig.tint),
      transmission: 0.94,
      opacity: 1.0,
      transparent: true,
      roughness: 0.08,
      ior: 1.52,
      thickness: 0.25,
      specularIntensity: 1.0,
      clearcoat: 1.0,
      clearcoatRoughness: 0.05,
    });
    this.materials.glassVisor = glassVisorMat;

    // 4. Dark Camera Interior Chamber
    const chamberMat = new THREE.MeshStandardMaterial({
      color: 0x0c1015,
      metalness: 0.4,
      roughness: 0.6,
    });

    // 5. Optical Sapphire Camera Lens
    const lensMat = new THREE.MeshPhysicalMaterial({
      color: 0x05070a,
      roughness: 0.1,
      metalness: 0.9,
      clearcoat: 1.0,
      clearcoatRoughness: 0.04,
    });

    // 6. Camera Concentric CD Milled Ring
    const milledRingMat = new THREE.MeshStandardMaterial({
      color: 0x2b3542,
      metalness: 0.85,
      roughness: 0.35,
    });

    // 7. Live Emissive Glyph Matrix Material
    const glyphTexture = this.glyphTextureManager.getTexture();
    const glyphMat = new THREE.MeshBasicMaterial({
      map: glyphTexture,
      transparent: true,
    });

    // 8. Red Status Square Element
    const redStatusMat = new THREE.MeshBasicMaterial({
      color: 0xD71921,
    });

    // 9. Black Screen Border
    const screenBezelMat = new THREE.MeshBasicMaterial({
      color: 0x080b0f,
    });

    // --- GEOMETRY CONSTRUCTION ---
    const phoneShape = createRoundedRectShape(W, H, R);

    // A. Solid Extruded Aluminum Unibody Chassis
    const extrudeSettings = {
      depth: D,
      bevelEnabled: true,
      bevelSegments: 5,
      steps: 1,
      bevelSize: 0.025,
      bevelThickness: 0.025,
    };
    const chassisGeom = new THREE.ExtrudeGeometry(phoneShape, extrudeSettings);
    // Center extrusion along Z-axis
    chassisGeom.center();
    const chassisMesh = new THREE.Mesh(chassisGeom, aluminumMat);
    chassisMesh.castShadow = true;
    chassisMesh.receiveShadow = true;
    group.add(chassisMesh);

    // B. Bevel Chamfer Highlight Rim
    const chamferGeom = new THREE.EdgesGeometry(chassisGeom, 35);
    const chamferLines = new THREE.LineSegments(
      chamferGeom,
      new THREE.LineBasicMaterial({ color: 0xffffff, opacity: 0.35, transparent: true })
    );
    group.add(chamferLines);

    // C. FRONT DISPLAY BEZEL (Z = +D/2 + 0.002)
    const bezelGeom = new THREE.ShapeGeometry(phoneShape);
    const bezelMesh = new THREE.Mesh(bezelGeom, screenBezelMat);
    bezelMesh.position.z = D / 2 + 0.015;
    group.add(bezelMesh);

    // D. REAR FACE (Z = -D/2 - 0.002)
    const rearFaceGroup = new THREE.Group();
    rearFaceGroup.position.z = -D / 2 - 0.015;
    rearFaceGroup.rotation.y = Math.PI; // Face outwards
    group.add(rearFaceGroup);

    // Lower Satin Silver Plate
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
    rearFaceGroup.add(lowerPlateMesh);

    // Lower Plate Tactile Circular Dial Indentation (Bottom Left)
    const dialGeom = new THREE.CylinderGeometry(0.32, 0.32, 0.02, 32);
    dialGeom.rotateX(Math.PI / 2);
    const dialMesh = new THREE.Mesh(dialGeom, chamferMat);
    dialMesh.position.set(-1.15, -2.9, 0.005);
    rearFaceGroup.add(dialMesh);

    // UPPER TRANSPARENT CRYSTAL VISOR CHAMBER
    const upperChamberShape = new THREE.Shape();
    upperChamberShape.moveTo(-W / 2 + 0.12, 0.48);
    upperChamberShape.lineTo(W / 2 - 0.12, 0.48);
    upperChamberShape.lineTo(W / 2 - 0.12, H / 2 - R);
    upperChamberShape.quadraticCurveTo(W / 2 - 0.12, H / 2 - 0.12, W / 2 - R, H / 2 - 0.12);
    upperChamberShape.lineTo(-W / 2 + R, H / 2 - 0.12);
    upperChamberShape.quadraticCurveTo(-W / 2 + 0.12, H / 2 - 0.12, -W / 2 + 0.12, H / 2 - R);
    upperChamberShape.lineTo(-W / 2 + 0.12, 0.48);

    // Chamber Dark Interior Base
    const chamberBaseGeom = new THREE.ShapeGeometry(upperChamberShape);
    const chamberBaseMesh = new THREE.Mesh(chamberBaseGeom, chamberMat);
    chamberBaseMesh.position.z = 0.002;
    rearFaceGroup.add(chamberBaseMesh);

    // Transparent Glass Dome Visor
    const glassVisorGeom = new THREE.ShapeGeometry(upperChamberShape);
    const glassVisorMesh = new THREE.Mesh(glassVisorGeom, glassVisorMat);
    glassVisorMesh.position.z = 0.035;
    rearFaceGroup.add(glassVisorMesh);

    // 1. Large 50MP Circular Main Camera Island (Left)
    const mainCamGroup = new THREE.Group();
    mainCamGroup.position.set(-0.82, 2.45, 0.04);

    // Milled Outer Ring
    const mainCamRingGeom = new THREE.CylinderGeometry(0.55, 0.55, 0.05, 48);
    mainCamRingGeom.rotateX(Math.PI / 2);
    const mainCamRing = new THREE.Mesh(mainCamRingGeom, milledRingMat);
    mainCamRing.castShadow = true;
    mainCamGroup.add(mainCamRing);

    // Optical Sapphire Lens
    const mainLensGeom = new THREE.CylinderGeometry(0.38, 0.38, 0.055, 48);
    mainLensGeom.rotateX(Math.PI / 2);
    const mainLens = new THREE.Mesh(mainLensGeom, lensMat);
    mainCamGroup.add(mainLens);

    // Aperture pupil
    const irisGeom = new THREE.CylinderGeometry(0.18, 0.18, 0.06, 32);
    irisGeom.rotateX(Math.PI / 2);
    const irisMesh = new THREE.Mesh(irisGeom, new THREE.MeshBasicMaterial({ color: 0x000000 }));
    mainCamGroup.add(irisMesh);

    rearFaceGroup.add(mainCamGroup);

    // 2. Secondary Horizontal Pill Dual-Camera Capsule (Left, beneath main)
    const pillCamGroup = new THREE.Group();
    pillCamGroup.position.set(-0.62, 1.35, 0.035);

    // Pill Bezel
    const pillShape = new THREE.Shape();
    pillShape.absarc(-0.35, 0, 0.32, Math.PI / 2, -Math.PI / 2, false);
    pillShape.absarc(0.35, 0, 0.32, -Math.PI / 2, Math.PI / 2, false);
    const pillExtrude = { depth: 0.04, bevelEnabled: true, bevelSegments: 3, bevelSize: 0.015, bevelThickness: 0.015 };
    const pillGeom = new THREE.ExtrudeGeometry(pillShape, pillExtrude);
    pillGeom.center();
    const pillMesh = new THREE.Mesh(pillGeom, milledRingMat);
    pillMesh.castShadow = true;
    pillCamGroup.add(pillMesh);

    // Lens 2
    const subLens1Geom = new THREE.CylinderGeometry(0.22, 0.22, 0.05, 32);
    subLens1Geom.rotateX(Math.PI / 2);
    const subLens1 = new THREE.Mesh(subLens1Geom, lensMat);
    subLens1.position.x = -0.35;
    pillCamGroup.add(subLens1);

    // Lens 3
    const subLens2Geom = new THREE.CylinderGeometry(0.22, 0.22, 0.05, 32);
    subLens2Geom.rotateX(Math.PI / 2);
    const subLens2 = new THREE.Mesh(subLens2Geom, lensMat);
    subLens2.position.x = 0.35;
    pillCamGroup.add(subLens2);

    rearFaceGroup.add(pillCamGroup);

    // 3. 137-Mini-LED Live Emissive Glyph Matrix (Right)
    const glyphPlaneGeom = new THREE.PlaneGeometry(1.25, 1.25);
    const glyphMesh = new THREE.Mesh(glyphPlaneGeom, glyphMat);
    glyphMesh.position.set(0.85, 2.35, 0.015);
    rearFaceGroup.add(glyphMesh);

    // 4. Red Status Element
    const redSquareGeom = new THREE.PlaneGeometry(0.12, 0.12);
    const redSquareMesh = new THREE.Mesh(redSquareGeom, redStatusMat);
    redSquareMesh.position.set(0.95, 1.25, 0.018);
    rearFaceGroup.add(redSquareMesh);

    // E. PHYSICAL HARDWARE BUTTONS & CNC CUTOUTS
    // 1. Left Rail: Volume Up (y = 1.6)
    const volUpGeom = new THREE.BoxGeometry(0.04, 0.45, 0.12);
    const volUp = new THREE.Mesh(volUpGeom, aluminumMat);
    volUp.position.set(-W / 2 - 0.02, 1.6, 0);
    group.add(volUp);

    // 2. Left Rail: Volume Down (y = 1.05)
    const volDownGeom = new THREE.BoxGeometry(0.04, 0.45, 0.12);
    const volDown = new THREE.Mesh(volDownGeom, aluminumMat);
    volDown.position.set(-W / 2 - 0.02, 1.05, 0);
    group.add(volDown);

    // 3. Left Rail: Dedicated Essential Key (y = 0.25)
    const essentialGeom = new THREE.BoxGeometry(0.05, 0.48, 0.13);
    const essentialKey = new THREE.Mesh(essentialGeom, chamferMat);
    essentialKey.position.set(-W / 2 - 0.025, 0.25, 0);
    group.add(essentialKey);

    // 4. Right Rail: Power Button (y = 1.35)
    const powerGeom = new THREE.BoxGeometry(0.04, 0.65, 0.12);
    const powerBtn = new THREE.Mesh(powerGeom, aluminumMat);
    powerBtn.position.set(W / 2 + 0.02, 1.35, 0);
    group.add(powerBtn);

    // 5. Bottom Rail: Centered USB-C Port
    const usbGeom = new THREE.BoxGeometry(0.32, 0.02, 0.08);
    const usbMesh = new THREE.Mesh(usbGeom, chamberMat);
    usbMesh.position.set(0, -H / 2 - 0.01, 0);
    group.add(usbMesh);

    // 6. Bottom Rail: CNC Speaker Slits
    for (let i = 0; i < 4; i++) {
      const slitGeom = new THREE.BoxGeometry(0.05, 0.02, 0.03);
      const slit = new THREE.Mesh(slitGeom, chamberMat);
      slit.position.set(0.65 + i * 0.12, -H / 2 - 0.01, 0);
      group.add(slit);
    }

    return group;
  }

  updateFinish(finishConfig) {
    if (this.materials.aluminum) {
      this.materials.aluminum.color.set(finishConfig.aluminum);
    }
    if (this.materials.glassVisor) {
      this.materials.glassVisor.color.set(finishConfig.tint);
    }
  }
}
