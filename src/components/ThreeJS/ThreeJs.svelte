<script lang="ts">
  import { onMount } from "svelte"
  import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"
  import * as THREE from "three"
  import { setNewLocation, location, isNeededToRefresh } from "../../stores/location/store.ts"
  import { gameParams } from "../../stores/params/store.ts"
  import { RenderScene } from "../../utils/ThreeJS/RenderScene.ts"
  import { ChangeLocation } from "../../utils/ThreeJS/ChangeLocation.ts"

  let intersects: THREE.Mesh<THREE.ExtrudeGeometry, THREE.MeshBasicMaterial>[] | [] = [];
  let hovered: THREE.Mesh<THREE.ExtrudeGeometry, THREE.MeshBasicMaterial> | null = null;

  const scene = new THREE.Scene();
  
  $: if ($location && $isNeededToRefresh) {
    ChangeLocation(scene, $location)
    
    isNeededToRefresh.set(false);
  }
  
  onMount(() => {
    if ($location && $location.id) {
      RenderScene(scene, $location);
    }
    const container = document.getElementById("map")
    const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
    const renderer = new THREE.WebGLRenderer();
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2(100, 100);
    
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );
    
    const controls = new OrbitControls( camera, renderer.domElement );
    controls.enableZoom = false;
    controls.enablePan = false;
    controls.rotateSpeed = 0.25;
    
    const light = new THREE.AmbientLight( "white", 2 );
    
    controls.target.set( 0, 0, 0 );
    camera.position.set( 0.5, 0, 0 );
    
    scene.add( light );
    
    const handleArrowClick = (object: THREE.Mesh, map: string) => {
      setNewLocation(object.userData.locationId, map);
      intersects = []
      hovered = null;
    };
    
    document.getElementsByTagName("canvas").item(0)?.addEventListener( "wheel", (event) => {
      const scroll = event.deltaY / 25;
      
      if (camera.fov + scroll < 75 && camera.fov + scroll > 10) {
        camera.fov += scroll
        controls.rotateSpeed = camera.fov / 225
        
        camera.updateProjectionMatrix();
      }
    });
    
    window.addEventListener( "resize", () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      
      renderer.setSize( window.innerWidth, window.innerHeight );
    }, false );
    
    document.addEventListener("mousemove", (e) => {
      mouse.set((e.clientX / window.innerWidth) * 2 - 1, -(e.clientY / window.innerHeight) * 2 + 1)
      raycaster.setFromCamera(mouse, camera)

      const raycasterArray: THREE.Intersection<THREE.Mesh<THREE.ExtrudeGeometry, THREE.MeshBasicMaterial>>[] = raycaster.intersectObjects(scene.children, true)

      if (hovered) {
        hovered.material.color.set(1,1,1);
      }

      if (raycasterArray[0].object.name === "arrow") {
        raycasterArray[0].object.material.color.set("#ad69fa")
        hovered = raycasterArray[0].object;
      } else {
        hovered = null;
      }
    })
    
    window.addEventListener("click", () => {
      if (hovered) {
        if (hovered.name === "arrow" && $gameParams.map) {
          handleArrowClick(hovered, $gameParams.map);
        }
      }
    })
    
    function animate() {
      requestAnimationFrame( animate );
      
      controls.update();
      
      renderer.render( scene, camera );

      container?.appendChild(renderer.domElement)
    }

    animate();
  })
</script>

<div id='map'></div>