<!-- svelte-ignore non-top-level-reactive-declaration -->
<script lang="ts">
  import { onMount } from 'svelte'
  import * as THREE from 'three';
  import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

  let location: number = 2;

  onMount(() => {
    const scene = new THREE.Scene();
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

    const render = (locationNum: number) => {
      const object = new THREE.Mesh(
        new THREE.BoxGeometry( 2, 2, 2 ),
        [
          new THREE.MeshLambertMaterial( { map: new THREE.TextureLoader().load(`/src/models/Loc${locationNum}/HR/4.jpg`), side: THREE.BackSide } ),
          new THREE.MeshLambertMaterial( { map: new THREE.TextureLoader().load(`/src/models/Loc${locationNum}/HR/2.jpg`), side: THREE.BackSide } ),
          new THREE.MeshLambertMaterial( { map: new THREE.TextureLoader().load(`/src/models/Loc${locationNum}/HR/5.jpg`), side: THREE.BackSide } ),
          new THREE.MeshLambertMaterial( { map: new THREE.TextureLoader().load(`/src/models/Loc${locationNum}/HR/6.jpg`), side: THREE.BackSide } ),
          new THREE.MeshLambertMaterial( { map: new THREE.TextureLoader().load(`/src/models/Loc${locationNum}/HR/3.jpg`), side: THREE.BackSide } ),
          new THREE.MeshLambertMaterial( { map: new THREE.TextureLoader().load(`/src/models/Loc${locationNum}/HR/1.jpg`), side: THREE.BackSide } ),
        ]
      );

      scene.add( object );
    }

    render(location);
    
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

<div class="flex justify-center items-center gap-5 w-full h-fit absolut absolute bottom-0">
  <button>
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="w-16 h-16 fill-white rotate-90 hover:fill-violet-500" viewBox="0 0 16 16">
      <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"/>
    </svg>
  </button>
  <div class="flex flex-col">
    <button>
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="w-16 h-16 fill-white -rotate-180 hover:fill-violet-500" viewBox="0 0 16 16">
        <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"/>
      </svg>
    </button>
    <button>
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="w-16 h-16 fill-white hover:fill-violet-500" viewBox="0 0 16 16">
        <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"/>
      </svg>
    </button>
  </div>
  <button>
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="w-16 h-16 fill-white -rotate-90 hover:fill-violet-500" viewBox="0 0 16 16">
      <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"/>
    </svg>
  </button>
</div>