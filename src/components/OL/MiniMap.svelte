
<script>
  import { onMount } from 'svelte'
  import OLmap from './ol'

  onMount(() => {
    OLmap('map');
  })
</script>

<div id="map" class="absolute top-0 bottom-0 w-screen"></div>