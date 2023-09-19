import { writable, type Writable } from 'svelte/store';

interface Store {
  isGuessed: boolean;
  round: number | null;
  distance: number | null;
}

export const gameParams: Writable<Store> = writable({
  isGuessed: false,
  round: null,
  distance: null,
}); 

export function setGameParams(data: Store) {
 gameParams.set(data);
}
