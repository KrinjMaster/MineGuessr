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
  let percent: number = 0;

  onMount(() => {
    if ($olConfig && $gameParams.distance) {
      1500 - $gameParams.distance - 25 > 0 ? percent = (1500 - $gameParams.distance + 25) * 100 / 1500 : percent = 0
      
      Math.round(percent / 100 * 5000) <= 5000 ? $gameParams.points = Math.round(percent / 100 * 5000) : $gameParams.points = 5000

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
    if ($olConfig?.markers) {
      setGameParams({
        isGuessed: false,
        round: null,
        totalRounds: null,
        map: null,
        distance: null,
        points: 0,
      })
      
      $location = null;
      $olConfig.markers = []
      localStorage.removeItem('game-params')
      
      goto('/')
    }
  }
</script>

<section class={`h-screen w-screen bg-base-100 flex flex-col gap-5 px-[25%] py-24 justify-between items-center z-[40] ${$gameParams.isGuessed ? 'absolute' : 'hidden'}`}>
  <div class="flex flex-col gap-2.5 w-full">
    <h1 class="text-8xl font-bold text-center">{$t('game.result-title')} {$gameParams.round}</h1>
    <div id="map_result" class="w-full h-96 bg-white"></div>
    <div class="flex justify-between w-full">
      <h2 class="text-2xl font-bold">{$gameParams.distance} {$t('game.result-subheader')}</h2>
      <h2 class="text-2xl font-bold">{ Math.round(percent / 100 * 5000) <= 5000 ? Math.round(percent / 100 * 5000) : 5000} {$t('game.score-title')}</h2>
    </div>
    <progress class="progress progress-primary w-full h-12" value={percent} max="100"></progress>
  </div>
  {#if $gameParams.round && $gameParams.totalRounds && $gameParams?.round < $gameParams.totalRounds}
    <button class="btn btn-secondary w-1/2 " on:click={() => handleContinueGame($gameParams.map)}>{$t('game.continue-game-title')}</button>
  {:else}
    <button class="btn btn-secondary w-1/2" on:click={handleGoBack}>{$t('game.end-game-title')}</button>
  {/if}
</section>