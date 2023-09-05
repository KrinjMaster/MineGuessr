import * as THREE from "three";
import { SVGLoader } from 'three/examples/jsm/loaders/SVGLoader';
import type { NearbyLocation } from "../types/Locations";

export const SVGRender = (locations: NearbyLocation[] | undefined, scene: THREE.Scene) => {
  const loader = new SVGLoader();

  if (locations) {
    for (let i = 0; i < locations.length; i++) {
      loader.load(
        '/src/lib/icons/Arrow.svg',
        function ( paths: any ) {
          const group = new THREE.Group();

          for ( let j = 0; j < paths.paths.length; j ++ ) {
            const path = paths.paths[j];
            
            const material = new THREE.MeshBasicMaterial({
              color: path.color,
              side: THREE.DoubleSide,
              depthWrite: false
            });
            
            const shapes = path.toShapes( true );
            
            for ( let k = 0; k < shapes.length; k ++ ) {
              const extrudeSettings = {
                steps: 1,
                depth: 1,
                bevelEnabled: false
              }
    
              const shape = shapes[ k ];
              const geometry = new THREE.ExtrudeGeometry( shape, extrudeSettings );
              const mesh = new THREE.Mesh( geometry, material );
              const rotateZ = locations[i].direction;
              const angle = ((rotateZ - 0.5) * 180 ) * Math.PI / 180;
              const x = Math.cos(angle) * 0.2;
              const z = Math.sin(angle) * 0.2;

              mesh.userData = locations[i]

              mesh.name = 'arrow';

              mesh.scale.x = 0.01;
              mesh.scale.y = 0.01;
              mesh.scale.z = 0.01;

              mesh.position.y -= 0.2;
              mesh.position.x = x;
              mesh.position.z = z;

              mesh.geometry.center();

              mesh.rotation.z = Math.PI * rotateZ;
              
              mesh.rotation.x = Math.PI / 180 * 90;
    
              group.add( mesh );
            }
          }
          
          scene.add(group);
        },
        function ( xhr ) {
          console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
        },
        function ( error ) {
          console.log( 'An error happened' );
        }
      );
    }
  }
}
