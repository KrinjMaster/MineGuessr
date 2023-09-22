<script lang="ts">
  import { t } from '../lib/lang';
</script>

<section class="h-screen w-screen flex flex-col items-center justify-center">
  <h1 class="font-extrabold text-8xl">MineGuessr</h1>
  <p class="text-xl">{$t('home.title')}</p>
  <!-- maps selection -->
  <div class="h-fit w-full flex justify-center items-start p-10">
    <div class="card flex flex-col items-center justify-between gap-5 w-96 h-96 p-3">
      <div class="flex flex-col w-full text-start">
        <h1 class="text-5xl font-extrabold">{$t('home.test-map-title')}</h1>
        <p>{$t('home.test-map-description')}</p>
      </div>
      <span class="w-full h-full bg-gray-500 rounded-xl"/>
      <a class="btn btn-secondary btn-outline w-full text-white text-xl" href="/sp1">{$t('home.start-button')}</a>
    </div>
  </div>
  <!-- blobs -->
  <div class="absolute bg-violet-500 h-96 w-96 -top-16 left-0 -z-10 rounded-full blur-3xl animate-blob_pulse"></div>
  <div class="absolute bg-gradient-to-tl from-violet-500 to-red-500 h-96 w-96 -bottom-16 right-0 -z-10 rounded-full blur-3xl animate-blob_pulse2"></div>
</section>