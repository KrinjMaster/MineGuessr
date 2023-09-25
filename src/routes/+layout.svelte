<script>
  import { onMount } from 'svelte'
  import { themeChange } from 'theme-change'
  import "../styles/app.css";
  import Header from "../components/UI/Header/Header.svelte";
  import WebGL from 'three/examples/jsm/capabilities/WebGL.js';
  import { setGameParamsFromLS } from '../stores/params/store'
  
  onMount(() => {
    if ( WebGL.isWebGLAvailable() ) {
      // its all good
    } else {
      const warning = WebGL.getWebGLErrorMessage();
      alert( warning );
    }

    setGameParamsFromLS()
    themeChange(false)
  })
</script>

<Header/>
<slot />