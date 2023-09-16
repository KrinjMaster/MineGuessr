<script>
  import MiniMap from "../../components/OL/MiniMap.svelte"
  import ThreeJs from "../../components/ThreeJS/ThreeJs.svelte";
  import { setLocation, location } from "../../stores/location/store.ts"

  export let data;
  
  $: setLocation(data);
</script>

<MiniMap />
<ThreeJs />