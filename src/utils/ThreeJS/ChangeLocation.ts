import * as THREE from "three";
import type { PageData } from "../../routes/[mapId]/$types";
import { SVGRender } from "./SVGRender";
import { GenerateNewLocationTexture } from "./GenerateNewLocationTexture";

export const ChangeLocation = (scene: THREE.Scene, location: PageData) => {
  const locCube = scene.getObjectByName('LocationMesh')
  const textures = GenerateNewLocationTexture(location)

  if (textures) {
    if (locCube instanceof THREE.Mesh){
      locCube.material = textures
      locCube.material.needsUpdate = true
    }
  }

  if (location.nearbyLocations && location.nearbyLocations.length > 0) {
    SVGRender(scene, location.nearbyLocations);
  }
}