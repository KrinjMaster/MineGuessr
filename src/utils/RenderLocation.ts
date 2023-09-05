import type { PageData } from "../routes/$types";
import * as THREE from "three";

export const RenderLocation = (location: PageData, scene: THREE.Scene) => {
  if (location.image) {
    const object = new THREE.Mesh(
      new THREE.BoxGeometry( 3, 3, 3 ),
      [
        new THREE.MeshLambertMaterial( { map: new THREE.TextureLoader().load(location.image[3]), side: THREE.BackSide } ),
        new THREE.MeshLambertMaterial( { map: new THREE.TextureLoader().load(location.image[1]), side: THREE.BackSide } ),
        new THREE.MeshLambertMaterial( { map: new THREE.TextureLoader().load(location.image[4]), side: THREE.BackSide } ),
        new THREE.MeshLambertMaterial( { map: new THREE.TextureLoader().load(location.image[5]), side: THREE.BackSide } ),
        new THREE.MeshLambertMaterial( { map: new THREE.TextureLoader().load(location.image[2]), side: THREE.BackSide } ),
        new THREE.MeshLambertMaterial( { map: new THREE.TextureLoader().load(location.image[0]), side: THREE.BackSide } ),
      ]
    );

    scene.add( object );
  }
}