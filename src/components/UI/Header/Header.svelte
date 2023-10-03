<!-- svelte-ignore a11y-missing-attribute -->
<!-- svelte-ignore a11y-label-has-associated-control -->
<!-- svelte-ignore a11y-no-noninteractive-tabindex -->

<script lang="ts">
  import { t, locales, setLocale } from '../../../lib/lang';
  import { gameParams, setGameParams } from '../../../stores/params/store'
  import { page } from '$app/stores';
  import { goto } from '$app/navigation'
  import { location } from '../../../stores/location/store'
  import { themes } from '$lib/data'

  let isInGame = false;
  let mapTitle = '';

  $: if ($t(`game.${$gameParams.map}_title`)) {
    mapTitle = $t(`game.${$gameParams.map}_title`)
  }

  $: if ($page.url.pathname === '/') {
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
    if ($page.url.pathname === '/') {
      goto('/')
    } else {
      setGameParams({
        isGuessed: false,
        round: null,
        totalRounds: null,
        map: null,
        distance: null,
        points: null,
      })

      localStorage.removeItem('gape-params')
      $location = null;

      goto('/')
    }
  }

</script>

<div class="navbar flex items-center justify-between bg-base-100 bg-opacity-25 fixed backdrop-blur-3xl text-white px-5 z-[100]">
  <button class="font-extrabold text-3xl" on:click={handleGoBack}>MineGuessr <div class="badge badge-primary font-bold p-2.5 text-white">dev</div></button>
  {#if isInGame}
    <div class="flex gap-3.5 font-bold">
      <div class="flex flex-col items-center">
        <h1>{$t('menu.map-title')}</h1>
        <p>#{mapTitle}</p>
      </div>
      <div class="flex flex-col items-center">
        <h1>{$t('menu.round-title')}</h1>
        <p>{$gameParams.round}/{$gameParams.totalRounds}</p>
      </div>
      <div class="flex flex-col items-center">
        <h1>{$t('menu.points-title')}</h1>
        <p>{$gameParams.points}</p>
      </div>
    </div>
  {/if}
  <div class="flex gap-2.5">
    <div class="dropdown dropdown-hover dropdown-end">
      <label tabindex="0" class={`m-1 btn btn-outline ${isInGame ? 'btn-neutral' : 'btn-secondary'}`}>
        <svg class="fill-current" width="20" height="20" viewBox="0 0 512 512"><path d="M363,176,246,464h47.24l24.49-58h90.54l24.49,58H480ZM336.31,362,363,279.85,389.69,362Z"></path><path d="M272,320c-.25-.19-20.59-15.77-45.42-42.67,39.58-53.64,62-114.61,71.15-143.33H352V90H214V48H170V90H32v44H251.25c-9.52,26.95-27.05,69.5-53.79,108.36-32.68-43.44-47.14-75.88-47.33-76.22L143,152l-38,22,6.87,13.86c.89,1.56,17.19,37.9,54.71,86.57.92,1.21,1.85,2.39,2.78,3.57-49.72,56.86-89.15,79.09-89.66,79.47L64,368l23,36,19.3-11.47c2.2-1.67,41.33-24,92-80.78,24.52,26.28,43.22,40.83,44.3,41.67L255,362Z"></path></svg>
      </label>
      <ul tabindex="0" class="dropdown-content z-[1] menu menu-lg p-2 shadow bg-base-200 rounded-box w-44 gap-1.5">
        {#each $locales as value}
          <button class="btn hover:bg-base-100" value="{value}" on:click={handleChange}>
            <div class="badge badge-secondary badge-outline">{value}</div>
            {$t(`lang.${value}`)}
          </button>
        {/each}
      </ul>
    </div>
    <div class="dropdown dropdown-hover dropdown-end">
      <label tabindex="0" class={`m-1 btn btn-outline ${isInGame ? 'btn-neutral' : 'btn-secondary'}`}>{$t('menu.theme')}</label>
      <ul tabindex="0" class="dropdown-content z-[1] menu menu-lg p-2 shadow bg-base-200 rounded-box w-fit gap-1.5">
        {#each themes as theme}
          <button class="btn hover:bg-base-100" data-set-theme={theme.id}>{$t(`menu.theme-${theme.id}`)}</button>
        {/each}
      </ul>
    </div>
    <!-- github logo -->
    <a href="https://github.com/KrinjMaster/MineGuessr" target="_blank">
      <svg width="24" height="24" viewBox="0 0 24 24" class="w-10 h-10 fill-base-content">
        <path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5c.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34c-.46-1.16-1.11-1.47-1.11-1.47c-.91-.62.07-.6.07-.6c1 .07 1.53 1.03 1.53 1.03c.87 1.52 2.34 1.07 2.91.83c.09-.65.35-1.09.63-1.34c-2.22-.25-4.55-1.11-4.55-4.92c0-1.11.38-2 1.03-2.71c-.1-.25-.45-1.29.1-2.64c0 0 .84-.27 2.75 1.02c.79-.22 1.65-.33 2.5-.33c.85 0 1.71.11 2.5.33c1.91-1.29 2.75-1.02 2.75-1.02c.55 1.35.2 2.39.1 2.64c.65.71 1.03 1.6 1.03 2.71c0 3.82-2.34 4.66-4.57 4.91c.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2Z"/>
      </svg>
    </a>
  </div>
</div>