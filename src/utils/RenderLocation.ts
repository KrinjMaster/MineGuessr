import * as THREE from "three";
import type { PageData } from "../routes/testing/$types";

export const RenderLocation = (scene: THREE.Scene, location: PageData) => {
  const prevArrow = scene.getObjectByName("LocationMesh");

  if (prevArrow) {
    scene.remove(prevArrow);
  }

  if (location && location.image) {
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

    object.name = "LocationMesh"

    scene.add( object );
  }
}