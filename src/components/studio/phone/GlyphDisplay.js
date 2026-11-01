import * as THREE from 'three';

export class GlyphDisplay {
  constructor(glyphTextureManager) {
    this.group = new THREE.Group();
    this.group.name = "GlyphDisplay";

    const glyphTexture = glyphTextureManager.getTexture();
    const glyphMat = new THREE.MeshBasicMaterial({
      map: glyphTexture,
      transparent: true,
    });

    const glyphPlaneGeom = new THREE.PlaneGeometry(1.25, 1.25);
    const glyphMesh = new THREE.Mesh(glyphPlaneGeom, glyphMat);
    glyphMesh.position.set(0.85, 2.35, 0.015);
    this.group.add(glyphMesh);
  }

  getGroup() {
    return this.group;
  }
}
