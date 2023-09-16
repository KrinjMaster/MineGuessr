
<script>
  import { onMount } from 'svelte'
  import OLmap from './ol'
  import { Regions } from './ol.regions'
  import ThreeJs from '../ThreeJS/ThreeJs.svelte'

  onMount(() => {
    OLmap('map', Regions);
  })
</script>

<div class="absolute flex flex-col gap-2.5 bottom-0 right-0 h-96 w-96 p-2.5 hover:h-[35rem] hover:w-[35rem] transition-all duration-150 ease-linear z-[100]">
  <div id="map" class="w-full h-full bg-white"></div>
  <button class="btn btn-secondary">Take a guess!</button>
</div>