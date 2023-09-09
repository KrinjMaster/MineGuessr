<script>
  import { onMount } from 'svelte'
  import { themeChange } from 'theme-change'
  import "../styles/app.css";
  import Header from "../components/UI/Header.svelte";
  // import WebGL from 'three/addons/capabilities/WebGL.js';
  
  // onMount(() => {
  //   if ( WebGL.isWebGLAvailable() ) {
  //     // its all good
  //   } else {
  //     const warning = WebGL.getWebGLErrorMessage();
  //     alert( warning );
  //   }
  // })

  onMount(() => {
    themeChange(false)
  })
</script>

<Header/>
<slot />