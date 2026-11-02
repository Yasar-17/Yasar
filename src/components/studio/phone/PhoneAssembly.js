import * as THREE from 'three';
import { PHONE_DEPTH } from './PhoneDimensions';
import { ChassisFrame } from './ChassisFrame';
import { SideButtons } from './SideButtons';
import { BottomPorts } from './BottomPorts';
import { RearHousing } from './RearHousing';
import { CameraIsland } from './CameraIsland';
import { GlyphDisplay } from './GlyphDisplay';
import { ScreenGlass } from './ScreenGlass';

export class PhoneAssembly {
  constructor(glyphTextureManager) {
    this.glyphTextureManager = glyphTextureManager;
    this.materials = {};
    this.group = new THREE.Group();
    this.group.name = "PhoneAssembly";
  }

  build(finishConfig) {
    // 1. Shared Materials
    this.materials.aluminum = new THREE.MeshStandardMaterial({
      color: new THREE.Color(finishConfig.aluminum),
      metalness: 0.88,
      roughness: 0.24,
    });

    this.materials.chamfer = new THREE.MeshStandardMaterial({
      color: new THREE.Color(0xffffff),
      metalness: 0.95,
      roughness: 0.12,
    });

    this.materials.glassVisor = new THREE.MeshPhysicalMaterial({
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

    this.materials.chamber = new THREE.MeshStandardMaterial({
      color: 0x0c1015,
      metalness: 0.4,
      roughness: 0.6,
    });

    this.materials.milledRing = new THREE.MeshStandardMaterial({
      color: 0x2b3542,
      metalness: 0.85,
      roughness: 0.35,
    });

    this.materials.lens = new THREE.MeshPhysicalMaterial({
      color: 0x05070a,
      roughness: 0.1,
      metalness: 0.9,
      clearcoat: 1.0,
      clearcoatRoughness: 0.04,
    });

    // 2. Instantiate Separate Components
    // Component 1: Unibody Chassis Frame
    this.chassisFrame = new ChassisFrame(this.materials.aluminum, this.materials.chamfer);
    this.group.add(this.chassisFrame.getGroup());

    // Component 2: Physical Side Rails & Hardware Buttons
    this.sideButtons = new SideButtons(this.materials.aluminum, this.materials.chamfer);
    this.group.add(this.sideButtons.getGroup());

    // Component 3: Bottom Ports & Acoustic CNC Slits
    this.bottomPorts = new BottomPorts(this.materials.chamber);
    this.group.add(this.bottomPorts.getGroup());

    // Component 4: Front Screen Glass & Bezel
    this.screenGlass = new ScreenGlass();
    this.group.add(this.screenGlass.getGroup());

    // Component 5, 6, 7: Rear Assembly (Positioned at Z = -PHONE_DEPTH/2 - 0.015, Face Outwards)
    const rearGroup = new THREE.Group();
    rearGroup.name = "RearAssemblyGroup";
    rearGroup.position.z = -PHONE_DEPTH / 2 - 0.015;
    rearGroup.rotation.y = Math.PI;

    // Rear Housing (Lower plate & Upper crystal dome)
    this.rearHousing = new RearHousing(
      this.materials.aluminum,
      this.materials.glassVisor,
      this.materials.chamber,
      this.materials.chamfer
    );
    rearGroup.add(this.rearHousing.getGroup());

    // Camera Island (50MP Circular & Pill Dual)
    this.cameraIsland = new CameraIsland(this.materials.milledRing, this.materials.lens);
    rearGroup.add(this.cameraIsland.getGroup());

    // 137-Mini-LED Live Emissive Glyph Matrix Window
    this.glyphDisplay = new GlyphDisplay(this.glyphTextureManager);
    rearGroup.add(this.glyphDisplay.getGroup());

    this.group.add(rearGroup);

    return this.group;
  }

  updateFinish(finishConfig) {
    if (this.materials.aluminum) {
      this.materials.aluminum.color.set(finishConfig.aluminum);
    }
    if (this.materials.glassVisor) {
      this.materials.glassVisor.color.set(finishConfig.tint);
    }
  }

  getGroup() {
    return this.group;
  }
}

