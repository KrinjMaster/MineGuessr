<script>
  import MiniMap from "../../components/OL/MiniMap.svelte"
  import ThreeJs from "../../components/ThreeJS/ThreeJs.svelte";
  import { setLocation } from "../../stores/location/store.ts"

  export let data;

  $: setLocation(data);
</script>

<ThreeJs />
<MiniMap />