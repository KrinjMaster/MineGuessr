
<script lang="ts">
  import { onMount } from 'svelte'
  import OLmap from '../../utils/OL/ol.ts'
  import { Regions } from '../../utils/OL/ol.regions.ts'
  import { olConfig } from '../../stores/ol/store.ts'
  import { location } from '../../stores/location/store.ts'
  import type { Marker } from '../../utils/OL/ol.ts'
  import type { PageData } from '../../routes/[mapId]/$types'
  import { LineString, Point } from 'ol/geom'
  import { getLength } from 'ol/sphere'
  import { setGameParams, gameParams } from '../../stores/params/store.ts'
  import { t } from '../../lib/lang';
  import { Map } from 'ol'

  let map: Map | null = null;

  $: if ($gameParams.round && map) {
    const verctorLayer = map.getAllLayers()[1]
    map.removeLayer(verctorLayer);
  }

  onMount(() => {
    map = OLmap('map_main', Regions, $olConfig)
  })

  const handleGuessLocation = (param: Marker | undefined, location: PageData | null) => {
    if (param && location?.cords && $olConfig && $gameParams.round) {
      const guess = new Point([param.x, param.z]);
      const loc = new Point([location.cords.x, location.cords.z]);

      const line = new LineString([guess.getCoordinates(), loc.getCoordinates()]);

      setGameParams({ ...$gameParams, isGuessed: true, distance: Math.round(getLength(line)) })
    }
  }
</script>

<div class="absolute flex flex-col gap-2.5 bottom-0 right-0 h-96 w-96 p-2.5 hover:h-[35rem] hover:w-[35rem] transition-all duration-150 ease-linear z-[20]">
  <div id="map_main" class="w-full h-full bg-white"></div>
  <button class="btn btn-secondary" on:click={() => handleGuessLocation($olConfig?.markers[0], $location)}>{$t('game.guess-button')}</button>
</div>

