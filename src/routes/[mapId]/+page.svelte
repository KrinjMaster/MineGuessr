<script lang="ts">
  import MiniMap from "../../components/MiniMap/MiniMap.svelte"
  import ResultScreen from "../../components/ResultScreen/ResultScreen.svelte"
  import ThreeJs from "../../components/ThreeJS/ThreeJs.svelte";
  import { setLocation } from "../../stores/location/store.ts"
  import { page } from '$app/stores';
  import { gameParams } from "../../stores/params/store.ts"

  export let data;

  $: setLocation(data)
</script>

{#if $gameParams.isGuessed}
  <ResultScreen map={$page.params.mapId} />
{/if}
<MiniMap />
<ThreeJs />
