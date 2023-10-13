<script lang="ts">
  import { t, locales, setLocale } from "../../../lib/lang";
  import { gameParams, setGameParams } from "../../../stores/params/store"
  import { page } from "$app/stores";
  import { goto } from "$app/navigation"
  import { useLocation } from "../../../stores/location/store"
  import { themes } from "$lib/data"
  import GoogleLogin from "../LoginButtons/GoogleLogin.svelte"
  import HeaderProfile from "./HeaderProfile.svelte"
  import { useUser } from "../../../stores/user"
  import { useAuth } from "../../../stores/auth/store"

  let isInGame = false;
  let mapTitle = "";

  $: if ($t(`game.${$gameParams.map}_title`)) {
    mapTitle = $t(`game.${$gameParams.map}_title`)
  }

  $: if ($page.url.pathname === "/") {
    isInGame = false;
  } else {
    isInGame = true;
  }

  const handleChange = ({ currentTarget }: {
    currentTarget: {
      value: string;
    }
  }) => {
    const { value } = currentTarget;
    setLocale(value);
    document.cookie = `lang=${value} ; HttpOnly; Secure; SameSite=lax`;
  };

  const handleGoBack = () => {
    if ($page.url.pathname === "/") {
      goto("/")
    } else {
      setGameParams({
        isGuessed: false,
        round: null,
        totalRounds: null,
        map: null,
        distance: null,
        points: null,
      })

      localStorage.removeItem("gape-params")
      $useLocation = null;

      goto("/")
    }
  }

</script>

<div class="navbar flex items-center justify-between bg-base-100 bg-opacity-25 fixed backdrop-blur-3xl text-white px-5 z-[100]">
  <button class="font-extrabold text-3xl" on:click={handleGoBack}>MineGuessr<div class="badge badge-primary font-bold p-2.5 text-white">dev</div></button>
  {#if isInGame}
    <div class="flex gap-3.5 font-bold">
      <div class="flex flex-col items-center">
        <h1>{$t("menu.map-title")}</h1>
        <p>#{mapTitle}</p>
      </div>
      <div class="flex flex-col items-center">
        <h1>{$t("menu.round-title")}</h1>
        <p>{$gameParams.round}/{$gameParams.totalRounds}</p>
      </div>
      <div class="flex flex-col items-center">
        <h1>{$t("menu.points-title")}</h1>
        <p>{$gameParams.points}</p>
      </div>
    </div>
  {/if}
  {#key $useAuth?.isLoggedIn}
    <HeaderProfile />
  {/key}
</div>