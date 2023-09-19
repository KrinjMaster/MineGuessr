<script>
  import MiniMap from "../../components/MiniMap/MiniMap.svelte"
  import ResultScreen from "../../components/ResultScreen/ResultScreen.svelte"
  import ThreeJs from "../../components/ThreeJS/ThreeJs.svelte";
  import { setLocation } from "../../stores/location/store.ts"
  import { gameParams } from "../../stores/params/store.ts"

  export let data;

  let isGuessed = false;

  $: isGuessed = $gameParams.isGuessed

  $: setLocation(data);
</script>

{#if isGuessed}
  <ResultScreen/>
{:else} 
  <MiniMap />
  <ThreeJs />
{/if}
