<!-- svelte-ignore a11y-missing-attribute -->
<!-- svelte-ignore a11y-label-has-associated-control -->
<!-- svelte-ignore a11y-no-noninteractive-tabindex -->

<script lang="ts">
  import { onMount } from 'svelte'
  import { t, locales, setLocale  } from '../../../lib/lang';
  import { gameParams } from '../../../stores/params/store'
  import { page } from '$app/stores';

  let isHUDShown = false;

  const handleChange = ({ currentTarget }: {
    currentTarget: {
      value: string;
    }
  }) => {
    const { value } = currentTarget;
    setLocale(value);
    document.cookie = `lang=${value} ; HttpOnly; Secure; SameSite=lax`;
  };

  $: if ($page.url.pathname === '/') {
    isHUDShown = false;
  } else {
    isHUDShown = true;
  }

</script>

<div class="navbar flex items-center justify-between bg-base-100 bg-opacity-25 fixed backdrop-blur-3xl text-white px-5 z-[100]">
  <a class="font-extrabold text-3xl" href="/">MineGuessr</a>
  {#if isHUDShown}
    <div class="flex gap-3.5 font-bold">
      <div class="flex flex-col items-center">
        <h1>Map</h1>
        <p>#{$gameParams.map?.toUpperCase()}</p>
      </div>
      <div class="flex flex-col items-center">
        <h1>Round</h1>
        <p>{$gameParams.round}/{$gameParams.totalRounds}</p>
      </div>
      <div class="flex flex-col items-center">
        <h1>Points</h1>
        <p>0</p>
      </div>
    </div>
  {/if}
  <div class="flex gap-2.5">
    <div class="dropdown dropdown-hover dropdown-end">
      <label tabindex="0" class="m-1 btn btn-secondary btn-outline">
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
      <label tabindex="0" class="m-1 btn btn-secondary btn-outline">{$t('menu.theme')}</label>
      <ul tabindex="0" class="dropdown-content z-[1] menu menu-lg p-2 shadow bg-base-200 rounded-box w-fit gap-1.5">
        <button class="btn hover:bg-base-100" data-toggle-theme="light" data-act-class="ACTIVECLASS">{$t('menu.theme-light')}</button>
        <button class="btn hover:bg-base-100" data-toggle-theme="dark" data-act-class="ACTIVECLASS">{$t('menu.theme-dark')}</button>
      </ul>
    </div>
  </div>
</div>