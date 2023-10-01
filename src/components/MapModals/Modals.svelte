<script lang="ts">
  import { setGameParams, gameParams } from "../../stores/params/store"
  import { goto } from '$app/navigation';
  import { t } from '../../lib/lang';

  let rounds: string = '1';
  let time: string = '1';


  const handleStartGame = (id: string) => {
    setGameParams({...$gameParams, round: 1, totalRounds: Number(rounds), map: id});

    localStorage.setItem('game-params', JSON.stringify({
      round: 1, 
      totalRounds: Number(rounds), 
      map: id,
      points: 0,
    }))

    goto(id);
  }
</script>

<dialog id="sp1_modal" class="modal font-bold text-white">
  <div class="modal-box flex flex-col w-full h-full bg-gradient-to-br from-primary to-secondary">
    <h1 class="font-bold text-8xl">#{$t('game.sp1_title')}</h1>
    <p class="text-3xl">{$t('game.game-options-title')}</p>
    <!-- selectors -->
    <div class="flex flex-col gap-2.5 my-auto">
      <p class="text-xl">{$t('game.rounds-title')}</p>
      <select bind:value={rounds} class="select select-lg border-2 border-white/25 w-full max-w-xs bg-transparent">
        <option selected>1</option>
        <option>5</option>
        <option>10</option>
        <option>15</option>
        <option>20</option>
      </select>
      <p class="text-xl">{$t('game.time-limit-title')}</p>
      <select bind:value={time} class="select select-lg border-2 border-white/25 w-full max-w-xs bg-transparent">
        <option selected>1</option>
        <option>2</option>
        <option>3</option>
        <option>4</option>
        <option>5</option>
      </select>
    </div>
    <a href="/sp1"><button class="btn btn-ghost btn-active w-full mt-auto" on:click={() => handleStartGame('sp1')}>{$t('game.start-game-title')}</button></a>
    <form method="dialog">
      <button class="btn btn-lg btn-circle btn-ghost absolute right-2 top-2 text-xl">✕</button>
    </form>
  </div>
  <form method="dialog" class="modal-backdrop">
    <button>close</button>
  </form>
</dialog>