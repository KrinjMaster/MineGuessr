<script lang="ts">
  import { onMount } from "svelte"
  import { Regions } from "../../utils/OL/ol.regions"
  import ResultOLmap from "../../utils/OL/result.ol"
  import { gameParams, setGameParams } from "../../stores/params/store"
  import { location, setNewRandomLocation } from "../../stores/location/store.ts"
  import { t } from '../../lib/lang'
  import { olConfig } from "../../stores/ol/store.ts"
  import { goto } from "$app/navigation"
  
  export let map: string;

  onMount(() => {
    if ($olConfig) {
      ResultOLmap('map_result', Regions, $location, $olConfig)
    
      localStorage.removeItem('location')
      setNewRandomLocation(map);
    }
  })

  const handleContinueGame = (map: string | null) => {
    if (map && $gameParams.round && $olConfig) {
      $gameParams.isGuessed = false;
      $olConfig.markers = []
      $gameParams.round = $gameParams.round++;

      localStorage.setItem('game-params', JSON.stringify({  
        round: $gameParams.round++, 
        totalRounds: $gameParams.totalRounds, 
        map: $gameParams.map,
      }))
    }
  }

  const handleGoBack = () => {
    setGameParams({
      isGuessed: false,
      round: null,
      totalRounds: null,
      map: null,
      distance: null,
    })
    $location = null;

    goto('/')
  }

</script>

<section class={`h-screen w-screen bg-base-100 flex flex-col justify-center items-center z-[40] ${$gameParams.isGuessed ? 'absolute' : 'hidden'}`}>
  <div id="map_result" class="w-1/2 h-96 bg-white"></div>
  <h1 class="text-8xl">{$t('game.result-title')}</h1>
  <h2 class="text-8xl">{$gameParams.distance} {$t('game.result-subheader')}</h2>
  {#if $gameParams.round && $gameParams.totalRounds && $gameParams?.round < $gameParams.totalRounds}
    <button class="btn btn-secondary" on:click={() => handleContinueGame($gameParams.map)}>Continue</button>
  {:else}
    <button class="btn btn-secondary" on:click={handleGoBack}>Close game</button>
  {/if}
</section>