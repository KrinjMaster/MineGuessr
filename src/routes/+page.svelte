<script lang="ts">
  import { onMount } from 'svelte'
  import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
  import * as THREE from "three";

  export let data;

  const scene = new THREE.Scene();

  console.log(data)
  
  onMount(() => {
    const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
    const renderer = new THREE.WebGLRenderer();

    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );

    const controls = new OrbitControls( camera, renderer.domElement );
    controls.enableZoom = false;

    const light = new THREE.AmbientLight( 'white', 2 );
    
    controls.target.set( 0, 0, 0 );
    camera.position.set( 0, -0.5, 0 );

    scene.add( light );

    const render = () => {
      if (data.image) {
        const object = new THREE.Mesh(
          new THREE.BoxGeometry( 3, 3, 3 ),
          [
            new THREE.MeshLambertMaterial( { map: new THREE.TextureLoader().load(data.image[3]), side: THREE.BackSide } ),
            new THREE.MeshLambertMaterial( { map: new THREE.TextureLoader().load(data.image[1]), side: THREE.BackSide } ),
            new THREE.MeshLambertMaterial( { map: new THREE.TextureLoader().load(data.image[4]), side: THREE.BackSide } ),
            new THREE.MeshLambertMaterial( { map: new THREE.TextureLoader().load(data.image[5]), side: THREE.BackSide } ),
            new THREE.MeshLambertMaterial( { map: new THREE.TextureLoader().load(data.image[2]), side: THREE.BackSide } ),
            new THREE.MeshLambertMaterial( { map: new THREE.TextureLoader().load(data.image[0]), side: THREE.BackSide } ),
          ]
        );

        scene.add( object );
      }
    }

    render();

    document.addEventListener( 'wheel', (event) => {
      const scroll =  event.deltaY / 25;
      
      if (camera.fov + scroll < 75 && camera.fov + scroll > 10) {
        camera.fov += scroll
        camera.updateProjectionMatrix();
      }
    });
    
    window.addEventListener( 'resize', () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      
      renderer.setSize( window.innerWidth, window.innerHeight );
    }, false );
    
    function animate() {
      requestAnimationFrame( animate );
      
      controls.update();
      
      renderer.render( scene, camera );
    }
    
    animate();
  })
</script>