<script>
  import { onMount } from "svelte"
  import { themeChange } from "theme-change"
  import "../styles/app.css";
  import Header from "../components/UI/Header/Header.svelte";
  import WebGL from "three/examples/jsm/capabilities/WebGL.js";
  import { setGameParamsFromLS } from "../stores/params/store"
  import { setUserOnMount } from "../stores/auth/store"
  import Footer from "../components/UI/Footer/Footer.svelte"
  
  onMount(() => {
    if ( WebGL.isWebGLAvailable() ) {
      // its all good
    } else {
      const warning = WebGL.getWebGLErrorMessage();
      alert( warning );
    }

    setUserOnMount();

    setGameParamsFromLS()
    themeChange(false)
  })
</script>

<Header/>
<slot />
<Footer />