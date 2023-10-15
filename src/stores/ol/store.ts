import { writable, type Writable } from 'svelte/store';
import type { MarkersConfig } from '../../types/OL';

export const useOl: Writable<MarkersConfig | null> = writable({
  isEnabled: true,
  markers: []
}); 

export function setOlConfig(data: MarkersConfig) {
 useOl.set(data);
}