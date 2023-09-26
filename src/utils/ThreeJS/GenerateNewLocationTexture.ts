import * as THREE from "three";
import type { PageData } from "../../routes/[mapId]/$types"

export const GenerateNewLocationTexture = (location: PageData) => {
  if (location && location.image) {
    return [
      new THREE.MeshLambertMaterial( { map: new THREE.TextureLoader().load(location.image[3]), side: THREE.BackSide } ),
      new THREE.MeshLambertMaterial( { map: new THREE.TextureLoader().load(location.image[1]), side: THREE.BackSide } ),
      new THREE.MeshLambertMaterial( { map: new THREE.TextureLoader().load(location.image[4]), side: THREE.BackSide } ),
      new THREE.MeshLambertMaterial( { map: new THREE.TextureLoader().load(location.image[5]), side: THREE.BackSide } ),
      new THREE.MeshLambertMaterial( { map: new THREE.TextureLoader().load(location.image[2]), side: THREE.BackSide } ),
      new THREE.MeshLambertMaterial( { map: new THREE.TextureLoader().load(location.image[0]), side: THREE.BackSide } ),
    ]
  }
}