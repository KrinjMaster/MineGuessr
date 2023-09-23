import { writable, type Writable } from 'svelte/store';

interface Store {
  isGuessed: boolean;
  round: number | null;
  totalRounds: number | null;
  distance: number | null;
  map: string | null;
}

export const gameParams: Writable<Store> = writable({
  isGuessed: false,
  round: null,
  totalRounds: null,
  map: null,
  distance: null,
}); 

export function setGameParams(data: Store) {
 gameParams.set(data);
}

export function setGameParamsFromLS() {
  const object = localStorage.getItem('game-params')

  if (object) {
    const GameParams = JSON.parse(object);

    if (GameParams.round && GameParams.totalRounds && GameParams.map) {
      gameParams.set({
        isGuessed: false,
        distance: null,
        round: GameParams.round,
        totalRounds: GameParams.totalRounds,
        map: GameParams.map,
      })
    }
  }
}
