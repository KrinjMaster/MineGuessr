<script lang="ts">
  import { onMount } from 'svelte'
  import * as THREE from 'three';
  import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
  import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'
  import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader'

  onMount(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
    const renderer = new THREE.WebGLRenderer();
    const loader = new OBJLoader();
    const mtlLoader = new MTLLoader()

    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );
    
    const controls = new OrbitControls( camera, renderer.domElement );

    const hemiLight = new THREE.HemisphereLight( 0xffffff, 0xffffff, 2 );
    hemiLight.color.setHSL( 0.6, 1, 0.6 );
    hemiLight.groundColor.setHSL( 0.095, 1, 0.75 );
    hemiLight.position.set( 0, 50, 0 );
    
    const hemiLightHelper = new THREE.HemisphereLightHelper( hemiLight, 10 );

    const playerPosition = new THREE.Vector3(0, 6, 15);

    const playerMaterial = new THREE.MeshBasicMaterial({ color: 'white' });
    const playerGeometry = new THREE.SphereGeometry(0.5);
    
    const player = new THREE.Mesh(playerGeometry, playerMaterial);

    player.position.set( 0, 2, 16)
    
    controls.target.set( player.position.x + 0.1, player.position.y, player.position.z );
    
    scene.add( hemiLight );
    scene.add( hemiLightHelper );
    scene.add( player );

    scene.background = new THREE.Color('#87CEEB')
    scene.fog = new THREE.Fog( scene.background, 1, 5000 );

    camera.position.copy( player.position );

    mtlLoader.load(
        '/src/models/World1/World1.mtl',
        (materials) => {
            materials.preload()
            console.log(materials)

            loader.setMaterials(materials)
            loader.load(
                '/src/models/World1/World1.obj',
                (object) => {
                  object.position.set(0, -3.5, 0)
                  scene.add(object)
                },
                (xhr) => {
                    console.log((xhr.loaded / xhr.total) * 100 + '% loaded')
                },
                (error) => {
                    console.log('An error happened')
                }
            )
        },
        (xhr) => {
            console.log((xhr.loaded / xhr.total) * 100 + '% loaded')
        },
        (error) => {
            console.log('An error happened')
        }
    )

    function animate() {
      requestAnimationFrame( animate );

      controls.update();

      renderer.render( scene, camera );
    }

    animate();
  })
</script>
