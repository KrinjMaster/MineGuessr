<script>
  import { onMount } from "svelte"
  import { Regions } from "../../utils/OL/ol.regions"
  import ResultOLmap from "../../utils/OL/result.ol"
  import { gameParams } from "../../stores/params/store"
  import { location } from "../../stores/location/store.ts"

  onMount(() => {
    ResultOLmap('map', Regions, $location)
  })
</script>

<section class="h-screen w-screen bg-base-100 flex flex-col justify-center items-center">
  <div id="map" class="w-1/2 h-96 bg-white"></div>
  <h1 class="text-8xl">Round result {$gameParams.distance}m</h1>
</section>